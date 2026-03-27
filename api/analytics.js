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

  // Fetch campaigns list (works for both email and SMS)
  const campaignsRes = await fetch(
    `https://a.klaviyo.com/api/campaigns/?filter=equals(messages.channel,'${channel}')&sort=-created_at`,
    { headers }
  );
  const campaignsData = await campaignsRes.json();
  if (!campaignsRes.ok) return res.status(campaignsRes.status).json({ error: campaignsData?.errors?.[0]?.detail || `Klaviyo error ${campaignsRes.status}` });

  // Fetch all metrics pages to find conversion metric (used by both email and SMS)
  let allMetrics = [];
  let nextMetricsUrl = `https://a.klaviyo.com/api/metrics/`;
  while (nextMetricsUrl) {
    const r = await fetch(nextMetricsUrl, { headers });
    const d = await r.json();
    if (!r.ok) break;
    allMetrics = allMetrics.concat(d.data || []);
    nextMetricsUrl = d.links?.next || null;
  }

  const ORDER_NAMES = ["placed order", "ordered product", "purchase", "order placed", "checkout completed", "order completed"];
  const conversionMetric = allMetrics.find(m =>
    ORDER_NAMES.some(n => m.attributes?.name?.toLowerCase().includes(n))
  );

  if (!conversionMetric) {
    return res.status(200).json({
      report: null,
      campaigns: campaignsData.data || [],
      availableMetrics: allMetrics.map(m => m.attributes?.name).filter(Boolean),
    });
  }

  const isEmail = channel === "email";
  const reportBody = {
    data: {
      type: "campaign-values-report",
      attributes: {
        timeframe: { key: timeframe },
        conversion_metric_id: conversionMetric.id,
        filter: `equals(send_channel,'${channel}')`,
        statistics: isEmail
          ? ["opens", "open_rate", "clicks", "click_rate", "delivered", "recipients"]
          : ["clicks", "click_rate", "delivered", "recipients"],
      }
    }
  };

  const reportRes = await fetch("https://a.klaviyo.com/api/campaign-values-reports/", {
    method: "POST", headers, body: JSON.stringify(reportBody)
  });
  const report = await reportRes.json();

  if (!reportRes.ok) {
    return res.status(200).json({
      report: null,
      campaigns: campaignsData.data || [],
      reportError: report?.errors?.[0]?.detail,
    });
  }

  return res.status(200).json({
    report: report.data || null,
    campaigns: campaignsData.data || [],
    conversionMetricName: conversionMetric.attributes?.name,
  });
}
