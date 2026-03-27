export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Missing token" });

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;

  if (!appId || !appSecret) {
    return res.status(500).json({ error: "META_APP_ID and META_APP_SECRET not configured in Vercel environment variables" });
  }

  const url = `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${encodeURIComponent(token)}`;

  try {
    const r = await fetch(url);
    const d = await r.json();

    if (d.error) return res.status(400).json({ error: d.error.message });
    if (!d.access_token) return res.status(400).json({ error: "No token returned" });

    return res.status(200).json({
      access_token: d.access_token,
      expires_in: d.expires_in, // seconds (~5183944 = ~60 days)
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
