export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body || {};
  const apiKey = body.klaviyoKey || process.env.KLAVIYO_API_KEY;
  if (!apiKey) return res.status(200).json({ unavailable: true, reason: "Klaviyo API key not configured" });

  const headers = {
    "Authorization": `Klaviyo-API-Key ${apiKey}`,
    "revision": "2024-10-15",
    "Content-Type": "application/json"
  };

  const now = new Date();
  const d7 = new Date(now - 7 * 864e5).toISOString();

  try {
    // Fetch recent sent campaigns
    async function fetchCampaigns(channel) {
      let campaigns = [], url = `https://a.klaviyo.com/api/campaigns/?filter=equals(messages.channel,'${channel}')&sort=-scheduled_at`;
      while (url) {
        const r = await fetch(url, { headers });
        const d = await r.json();
        campaigns = campaigns.concat(d.data || []);
        url = d.links?.next || null;
        if (campaigns.length >= 20) break;
      }
      return campaigns;
    }

    // Fetch flow revenue for specified flow IDs
    const FLOW_IDS = ["Thnjbn", "Rw6KuL", "T8B2FQ", "UhURgB", "YjCpZ9"];
    async function fetchFlows() {
      const results = [];
      for (const id of FLOW_IDS) {
        try {
          const r = await fetch(`https://a.klaviyo.com/api/flows/${id}`, { headers });
          const d = await r.json();
          results.push({ id, name: d.data?.attributes?.name, status: d.data?.attributes?.status });
        } catch { results.push({ id, error: true }); }
        await new Promise(resolve => setTimeout(resolve, 400));
      }
      return results;
    }

    // Fetch list health
    async function fetchListHealth() {
      const r = await fetch(`https://a.klaviyo.com/api/lists/?fields[list]=name,profile_count`, { headers });
      const d = await r.json();
      return (d.data || []).slice(0, 5).map(l => ({ name: l.attributes?.name, profiles: l.attributes?.profile_count }));
    }

    // Fetch campaign stats — single request for all campaigns
    async function fetchCampaignStats(campaignIds) {
      if (!campaignIds.length) return [];
      const ids = campaignIds.slice(0, 10);
      try {
        const filterStr = ids.length === 1
          ? `equals(campaign_id,'${ids[0]}')`
          : `contains-any(campaign_id,["${ids.join('","')}"])`;
        const r = await fetch(`https://a.klaviyo.com/api/campaign-values-reports/`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            data: {
              type: "campaign-values-report",
              attributes: {
                timeframe: { key: "last_7_days" },
                conversion_metric_id: "QNJkRq",
                filter: filterStr,
                statistics: ["opens", "open_rate", "clicks", "click_rate", "delivered", "recipients", "unsubscribe_rate"]
              }
            }
          })
        });
        const d = await r.json();
        if (d.errors) return [{ error: d.errors[0]?.detail }];
        return (d.data?.attributes?.results || []).map(r => ({
          campaignId: r.groupings?.campaign_id,
          ...r.statistics
        }));
      } catch(e) { return [{ error: e.message }]; }
    }

    const [emailCampaigns, smsCampaigns, flows, listHealth] = await Promise.all([
      fetchCampaigns("email"),
      fetchCampaigns("sms"),
      fetchFlows(),
      fetchListHealth()
    ]);

    const emailIds = emailCampaigns.map(c => c.id);
    const emailStats = await fetchCampaignStats(emailIds);

    return res.status(200).json({
      emailCampaigns: emailCampaigns.slice(0, 10).map(c => ({
        id: c.id,
        name: c.attributes?.name,
        status: c.attributes?.status,
        scheduledAt: c.attributes?.scheduled_at
      })),
      smsCampaigns: smsCampaigns.slice(0, 10).map(c => ({
        id: c.id,
        name: c.attributes?.name,
        status: c.attributes?.status,
        scheduledAt: c.attributes?.scheduled_at
      })),
      emailStats,
      flows,
      listHealth
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
