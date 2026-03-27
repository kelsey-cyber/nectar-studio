export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { provider, ...params } = req.body;
  try {
    if (provider === "meta") return await metaHandler(params, res);
    if (provider === "klaviyo") return await klaviyoHandler(params, res);
    return res.status(400).json({ error: "Unknown provider" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

async function metaHandler({ token, accountId, datePreset = "last_30d" }, res) {
  const fields = [
    "campaign_name", "spend", "impressions", "clicks", "ctr",
    "reach", "frequency", "actions", "action_values", "cost_per_action_type"
  ].join(",");
  const base = `https://graph.facebook.com/v19.0/act_${accountId}`;

  const [summaryRes, campaignsRes] = await Promise.all([
    fetch(`${base}/insights?fields=${fields}&date_preset=${datePreset}&access_token=${token}`),
    fetch(`${base}/insights?fields=${fields}&date_preset=${datePreset}&level=campaign&sort=spend_descending&limit=6&access_token=${token}`)
  ]);

  const [summary, campaigns] = await Promise.all([summaryRes.json(), campaignsRes.json()]);

  if (summary.error) return res.status(400).json({ error: summary.error.message });

  return res.status(200).json({
    summary: summary.data?.[0] || null,
    campaigns: campaigns.data || []
  });
}

async function klaviyoHandler({ apiKey, channel = "email", timeframe = "last_30_days" }, res) {
  const headers = {
    "Authorization": `Klaviyo-API-Key ${apiKey}`,
    "revision": "2024-07-15",
    "Content-Type": "application/json",
  };

  const stats = channel === "email"
    ? ["opens", "open_rate", "clicks", "click_rate", "delivered", "recipients", "revenue", "click_to_open_rate"]
    : ["clicks", "click_rate", "delivered", "recipients", "revenue"];

  const reportBody = {
    data: {
      type: "campaign-values-report",
      attributes: {
        timeframe: { key: timeframe },
        filter: `equals(send_channel,'${channel}')`,
        statistics: stats,
        sort: "-revenue",
        page_size: 20,
      }
    }
  };

  const [reportRes, campaignsRes] = await Promise.all([
    fetch("https://a.klaviyo.com/api/campaign-values-reports/", {
      method: "POST", headers, body: JSON.stringify(reportBody)
    }),
    fetch(`https://a.klaviyo.com/api/campaigns/?filter=equals(messages.channel,'${channel}')&sort=-created_at&page%5Bsize%5D=6`, {
      headers
    })
  ]);

  const [report, campaigns] = await Promise.all([reportRes.json(), campaignsRes.json()]);

  if (!reportRes.ok) {
    return res.status(reportRes.status).json({
      error: report?.errors?.[0]?.detail || `Klaviyo error ${reportRes.status}`
    });
  }

  return res.status(200).json({
    report: report.data || null,
    campaigns: campaigns.data || []
  });
}
