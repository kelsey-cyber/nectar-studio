export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.META_ACCESS_TOKEN;
  const accountId = process.env.META_AD_ACCOUNT_ID;
  if (!token || !accountId) return res.status(500).json({ error: "Meta credentials not configured" });

  const now = new Date();
  const d7 = new Date(now - 7 * 864e5);
  const since = d7.toISOString().split("T")[0];
  const until = now.toISOString().split("T")[0];
  const base = `https://graph.facebook.com/v19.0`;

  try {
    // Account-level summary
    const summaryRes = await fetch(
      `${base}/act_${accountId}/insights?fields=spend,purchase_roas,actions,action_values,impressions,clicks,ctr,frequency&date_preset=last_7d&access_token=${token}`
    );
    const summaryData = await summaryRes.json();
    const summary = summaryData.data?.[0] || {};

    const purchases = (summary.actions || []).find(a => a.action_type === "purchase")?.value || 0;
    const purchaseValue = (summary.action_values || []).find(a => a.action_type === "purchase")?.value || 0;
    const spend = parseFloat(summary.spend || 0);
    const roas = spend > 0 ? (parseFloat(purchaseValue) / spend).toFixed(2) : 0;
    const cpa = purchases > 0 ? (spend / parseInt(purchases)).toFixed(2) : 0;

    // Campaign-level breakdown
    const campaignsRes = await fetch(
      `${base}/act_${accountId}/campaigns?fields=id,name,status&limit=50&access_token=${token}`
    );
    const campaignsData = await campaignsRes.json();
    const activeCampaigns = (campaignsData.data || []).filter(c => c.status === "ACTIVE").slice(0, 10);

    const campaignStats = await Promise.all(
      activeCampaigns.map(async c => {
        const r = await fetch(
          `${base}/${c.id}/insights?fields=spend,purchase_roas,actions,action_values,impressions,clicks,ctr,frequency&date_preset=last_7d&access_token=${token}`
        );
        const d = await r.json();
        const data = d.data?.[0] || {};
        const cSpend = parseFloat(data.spend || 0);
        const cPurchases = (data.actions || []).find(a => a.action_type === "purchase")?.value || 0;
        const cPurchaseValue = (data.action_values || []).find(a => a.action_type === "purchase")?.value || 0;
        const cRoas = cSpend > 0 ? (parseFloat(cPurchaseValue) / cSpend).toFixed(2) : 0;
        const cCpa = cPurchases > 0 ? (cSpend / parseInt(cPurchases)).toFixed(2) : 0;
        return {
          id: c.id,
          name: c.name,
          spend: cSpend.toFixed(2),
          roas: cRoas,
          cpa: cCpa,
          purchases: cPurchases,
          impressions: data.impressions,
          ctr: data.ctr,
          frequency: data.frequency
        };
      })
    );

    // Top 3 by ROAS, bottom 3 by CPA
    const sorted = [...campaignStats].filter(c => parseFloat(c.spend) > 0);
    const top3Roas = [...sorted].sort((a, b) => parseFloat(b.roas) - parseFloat(a.roas)).slice(0, 3);
    const bottom3Cpa = [...sorted].filter(c => parseFloat(c.cpa) > 0).sort((a, b) => parseFloat(b.cpa) - parseFloat(a.cpa)).slice(0, 3);
    const highFrequency = campaignStats.filter(c => parseFloat(c.frequency) > 3.0);

    return res.status(200).json({
      summary: {
        spend: spend.toFixed(2),
        roas,
        cpa,
        purchases,
        purchaseValue: parseFloat(purchaseValue).toFixed(2),
        impressions: summary.impressions,
        ctr: summary.ctr,
        frequency: summary.frequency
      },
      campaigns: campaignStats,
      top3Roas,
      bottom3Cpa,
      highFrequency
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
