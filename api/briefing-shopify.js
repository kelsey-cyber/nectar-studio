export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.SHOPIFY_ACCESS_TOKEN;
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!token || !domain) return res.status(500).json({ error: "Shopify credentials not configured" });

  const base = `https://${domain}/admin/api/2024-01`;
  const headers = { "X-Shopify-Access-Token": token, "Content-Type": "application/json" };

  const now = new Date();
  const d7 = new Date(now - 7 * 864e5).toISOString();
  const d30 = new Date(now - 30 * 864e5).toISOString();

  try {
    // Fetch last 7 days orders
    async function fetchOrders(since) {
      let orders = [], url = `${base}/orders.json?status=any&created_at_min=${since}&limit=250&fields=id,total_price,financial_status,customer,line_items,refunds,created_at&customer_fields=id,orders_count,email`;
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

    const [orders7, orders30] = await Promise.all([fetchOrders(d7), fetchOrders(d30)]);

    // Build set of customer emails/ids that ordered BEFORE the 7-day window (i.e. in days 8-30)
    const prior30Ids = new Set(
      orders30
        .filter(o => !orders7.some(o7 => o7.id === o.id))
        .map(o => o.customer?.id || o.customer?.email)
        .filter(Boolean)
    );

    function summarizeOrders(orders, isWeekly = false) {
      const revenue = orders.reduce((s, o) => s + parseFloat(o.total_price || 0), 0);
      const count = orders.length;
      const aov = count > 0 ? revenue / count : 0;
      const returningCustomers = isWeekly
        ? orders.filter(o => {
            const key = o.customer?.id || o.customer?.email;
            return key && prior30Ids.has(key);
          }).length
        : orders.filter(o => !o.customer || parseInt(o.customer?.orders_count || 0) <= 1 ? false : true).length;
      const newCustomers = count - returningCustomers;
      const refunds = orders.filter(o => o.financial_status === "refunded" || o.financial_status === "partially_refunded").length;
      const refundRate = count > 0 ? (refunds / count * 100).toFixed(1) : 0;

      // Top SKUs by revenue
      const skuMap = {};
      orders.forEach(o => {
        (o.line_items || []).forEach(item => {
          const sku = item.sku || item.title;
          if (!skuMap[sku]) skuMap[sku] = { revenue: 0, units: 0, title: item.title };
          skuMap[sku].revenue += parseFloat(item.price) * item.quantity;
          skuMap[sku].units += item.quantity;
        });
      });
      const topSkus = Object.entries(skuMap)
        .sort((a, b) => b[1].revenue - a[1].revenue)
        .slice(0, 10)
        .map(([sku, d]) => ({ sku, title: d.title, revenue: d.revenue.toFixed(2), units: d.units }));

      return { revenue: revenue.toFixed(2), orders: count, aov: aov.toFixed(2), newCustomers, returningCustomers, refundRate, topSkus };
    }

    // Fetch inventory for top SKUs
    async function fetchInventory() {
      const r = await fetch(`${base}/products.json?limit=250&fields=id,title,variants`, { headers });
      const d = await r.json();
      const low = [];
      (d.products || []).forEach(p => {
        (p.variants || []).forEach(v => {
          if (v.inventory_quantity !== null && v.inventory_quantity < 20) {
            low.push({ product: p.title, sku: v.sku, inventory: v.inventory_quantity });
          }
        });
      });
      return low;
    }

    const [summary7, summary30, lowInventory] = await Promise.all([
      Promise.resolve(summarizeOrders(orders7, true)),
      Promise.resolve(summarizeOrders(orders30, false)),
      fetchInventory()
    ]);

    return res.status(200).json({ last7Days: summary7, last30Days: summary30, lowInventory });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
