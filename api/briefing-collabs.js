export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.SHOPIFY_ACCESS_TOKEN;
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!token || !domain) return res.status(500).json({ error: "Shopify credentials not configured" });

  const base = `https://${domain}/admin/api/2024-01`;
  const headers = { "X-Shopify-Access-Token": token, "Content-Type": "application/json" };

  const now = new Date();
  const d7  = new Date(now - 7  * 864e5).toISOString();
  const d30 = new Date(now - 30 * 864e5).toISOString();

  try {
    // Fetch all orders with discount codes in a given window
    async function fetchOrdersWithDiscounts(since) {
      let orders = [];
      let url = `${base}/orders.json?status=any&created_at_min=${since}&limit=250&fields=id,total_price,discount_codes,tags,created_at,customer`;
      while (url) {
        const r = await fetch(url, { headers });
        const d = await r.json();
        orders = orders.concat(d.orders || []);
        const link = r.headers.get("Link") || "";
        const next = link.match(/<([^>]+)>;\s*rel="next"/);
        url = next ? next[1] : null;
      }
      return orders;
    }

    // Fetch all active price rules (discount templates) — proxy for active influencer programs
    async function fetchPriceRules() {
      const r = await fetch(`${base}/price_rules.json?limit=250&fields=id,title,value,value_type,usage_count,target_type,starts_at,ends_at`, { headers });
      const d = await r.json();
      return d.price_rules || [];
    }

    const [orders7, orders30, priceRules] = await Promise.all([
      fetchOrdersWithDiscounts(d7),
      fetchOrdersWithDiscounts(d30),
      fetchPriceRules()
    ]);

    // Build per-code attribution summary
    function buildCodeMap(orders) {
      const map = {};
      orders.forEach(o => {
        (o.discount_codes || []).forEach(dc => {
          const code = dc.code.toUpperCase();
          if (!map[code]) map[code] = { code, orders: 0, revenue: 0, customers: new Set() };
          map[code].orders += 1;
          map[code].revenue += parseFloat(o.total_price || 0);
          if (o.customer?.id) map[code].customers.add(o.customer.id);
        });
      });
      return Object.values(map).map(c => ({
        code: c.code,
        orders: c.orders,
        revenue: c.revenue.toFixed(2),
        uniqueCustomers: c.customers.size,
        aov: c.orders > 0 ? (c.revenue / c.orders).toFixed(2) : "0.00"
      })).sort((a, b) => parseFloat(b.revenue) - parseFloat(a.revenue));
    }

    const codeMap7  = buildCodeMap(orders7);
    const codeMap30 = buildCodeMap(orders30);

    const ordersWithCode7  = orders7.filter(o  => (o.discount_codes || []).length > 0);
    const ordersWithCode30 = orders30.filter(o => (o.discount_codes || []).length > 0);
    const totalRevenue7    = orders7.reduce((s, o)  => s + parseFloat(o.total_price || 0), 0);
    const totalRevenue30   = orders30.reduce((s, o) => s + parseFloat(o.total_price || 0), 0);
    const collabsRevenue7  = ordersWithCode7.reduce((s, o)  => s + parseFloat(o.total_price || 0), 0);
    const collabsRevenue30 = ordersWithCode30.reduce((s, o) => s + parseFloat(o.total_price || 0), 0);

    // Codes active in 30-day window but DORMANT this week (0 orders in 7 days)
    const activeCodes30 = new Set(codeMap30.map(c => c.code));
    const activeCodes7  = new Set(codeMap7.map(c => c.code));
    const dormantCodes  = [...activeCodes30].filter(c => !activeCodes7.has(c));

    // Price rules summary — top 15 by usage
    const topPriceRules = priceRules
      .sort((a, b) => (b.usage_count || 0) - (a.usage_count || 0))
      .slice(0, 15)
      .map(r => ({
        id: r.id,
        title: r.title,
        value: r.value,
        valueType: r.value_type,
        usageCount: r.usage_count || 0,
        startsAt: r.starts_at,
        endsAt: r.ends_at
      }));

    return res.status(200).json({
      last7Days: {
        topCodes: codeMap7.slice(0, 10),
        collabsRevenue: collabsRevenue7.toFixed(2),
        totalRevenue: totalRevenue7.toFixed(2),
        collabsShare: totalRevenue7 > 0 ? ((collabsRevenue7 / totalRevenue7) * 100).toFixed(1) : "0.0",
        ordersWithCode: ordersWithCode7.length,
        totalOrders: orders7.length,
        uniqueCodesUsed: codeMap7.length
      },
      last30Days: {
        topCodes: codeMap30.slice(0, 15),
        collabsRevenue: collabsRevenue30.toFixed(2),
        totalRevenue: totalRevenue30.toFixed(2),
        collabsShare: totalRevenue30 > 0 ? ((collabsRevenue30 / totalRevenue30) * 100).toFixed(1) : "0.0",
        uniqueCodesUsed: codeMap30.length
      },
      dormantCodes,
      priceRules: topPriceRules
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
