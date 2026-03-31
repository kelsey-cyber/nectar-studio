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

    // Fetch campaign stats via metrics
    async function fetchCampaignStats(campaignIds) {
      if (!campaignIds.length) return [];
      // Get stats for each campaign
      const stats = [];
      for (const id of campaignIds.slice(0, 8)) {
        try {
          const r = await fetch(`https://a.klaviyo.com/api/campaign-values-reports/`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              data: {
                type: "campaign-values-report",
                attributes: {
                  timeframe: { key: "last_7_days" },
                  campaign_ids: [id],
                  statistics: ["opens", "open_rate", "clicks", "click_rate", "delivered", "recipients"]
                }
              }
            })
          });
          const d = await r.json();
          const results = d.data?.attributes?.results?.[0];
          if (results) stats.push({ campaignId: id, ...results.statistics });
        } catch { /* skip */ }
        await new Promise(resolve => setTimeout(resolve, 500)); // rate limit
      }
      return stats;
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
