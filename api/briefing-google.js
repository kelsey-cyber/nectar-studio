export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;

  if (!developerToken || !clientId || !clientSecret || !refreshToken || !customerId) {
    return res.status(200).json({ unavailable: true, reason: "Google Ads credentials not fully configured" });
  }

  try {
    // Get access token via OAuth2
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      })
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return res.status(200).json({ unavailable: true, reason: "OAuth token exchange failed", details: tokenData });
    }
    const accessToken = tokenData.access_token;

    const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "developer-token": developerToken,
      "Content-Type": "application/json"
    };

    const gaqlBase = `https://googleads.googleapis.com/v20/customers/${customerId}/googleAds:search`;

    async function query(gaql) {
      const r = await fetch(gaqlBase, {
        method: "POST",
        headers,
        body: JSON.stringify({ query: gaql })
      });
      const d = await r.json();
      if (d.error) throw new Error(JSON.stringify(d.error));
      return d.results || [];
    }

    // Last 7 days date range
    const now = new Date();
    const until = now.toISOString().split("T")[0];
    const since = new Date(now - 7 * 864e5).toISOString().split("T")[0];

    // Account summary
    const summaryResults = await query(`
      SELECT
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value,
        metrics.clicks,
        metrics.impressions,
        metrics.ctr
      FROM customer
      WHERE segments.date BETWEEN '${since}' AND '${until}'
    `);

    const spend = summaryResults.reduce((s, r) => s + (parseInt(r.metrics?.cost_micros || 0) / 1e6), 0);
    const convValue = summaryResults.reduce((s, r) => s + parseFloat(r.metrics?.conversions_value || 0), 0);
    const conversions = summaryResults.reduce((s, r) => s + parseFloat(r.metrics?.conversions || 0), 0);
    const roas = spend > 0 ? (convValue / spend).toFixed(2) : 0;
    const cpa = conversions > 0 ? (spend / conversions).toFixed(2) : 0;

    // Campaign breakdown
    const campaignResults = await query(`
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value,
        metrics.clicks,
        metrics.ctr
      FROM campaign
      WHERE segments.date BETWEEN '${since}' AND '${until}'
        AND metrics.cost_micros > 0
      ORDER BY metrics.cost_micros DESC
      LIMIT 10
    `);

    const campaigns = campaignResults.map(r => {
      const rawCost = r.metrics?.cost_micros;
      const cSpend = Number(rawCost || 0) / 1e6;
      const cConv = parseFloat(r.metrics?.conversions || 0);
      const cConvValue = parseFloat(r.metrics?.conversions_value || 0);
      return {
        id: r.campaign?.id,
        name: r.campaign?.name,
        rawCostMicros: rawCost,
        spend: cSpend.toFixed(2),
        conversions: cConv,
        conversionValue: cConvValue.toFixed(2),
        roas: cSpend > 0 ? (cConvValue / cSpend).toFixed(2) : 0,
        cpa: cConv > 0 ? (cSpend / cConv).toFixed(2) : 0,
        ctr: r.metrics?.ctr
      };
    });

    const highCpa = campaigns.filter(c => parseFloat(c.cpa) > 50);

    // Top search terms
    const searchTermResults = await query(`
      SELECT
        search_term_view.search_term,
        metrics.cost_micros,
        metrics.clicks,
        metrics.conversions
      FROM search_term_view
      WHERE segments.date BETWEEN '${since}' AND '${until}'
      ORDER BY metrics.cost_micros DESC
      LIMIT 10
    `);

    const topSearchTerms = searchTermResults.map(r => ({
      term: r.search_term_view?.search_term,
      spend: (parseInt(r.metrics?.cost_micros || 0) / 1e6).toFixed(2),
      clicks: r.metrics?.clicks,
      conversions: r.metrics?.conversions
    }));

    return res.status(200).json({
      summary: { spend: spend.toFixed(2), roas, cpa, conversions, conversionValue: convValue.toFixed(2) },
      campaigns,
      highCpa,
      topSearchTerms,
      negativeKeywordAlert: "semrush not confirmed as negative keyword — verify in Google Ads"
    });
  } catch (err) {
    return res.status(200).json({ unavailable: true, reason: err.message });
  }
}
