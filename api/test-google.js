export default async function handler(req, res) {
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

  // Step 1: check all vars present
  const vars = { developerToken: !!developerToken, clientId: !!clientId, clientSecret: !!clientSecret, refreshToken: !!refreshToken, customerId: customerId || "MISSING", loginCustomerId: loginCustomerId || "MISSING" };

  // Step 2: try OAuth token exchange
  let accessToken = null, tokenError = null;
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: "refresh_token" })
    });
    const tokenData = await tokenRes.json();
    if (tokenData.access_token) accessToken = tokenData.access_token;
    else tokenError = tokenData;
  } catch(e) { tokenError = e.message; }

  // Step 3: try a simple API call
  let apiResult = null, apiError = null;
  if (accessToken) {
    try {
      const r = await fetch(`https://googleads.googleapis.com/v19/customers/${customerId}/googleAds:search`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "developer-token": developerToken,
          "Content-Type": "application/json",
          ...(loginCustomerId ? { "login-customer-id": loginCustomerId } : {})
        },
        body: JSON.stringify({ query: "SELECT customer.id FROM customer LIMIT 1" })
      });
      const text = await r.text();
      try { apiResult = JSON.parse(text); } catch { apiError = `HTML response (${r.status}): ${text.slice(0, 200)}`; }
    } catch(e) { apiError = e.message; }
  }

  return res.status(200).json({ vars, tokenStatus: accessToken ? "OK" : tokenError, apiResult, apiError });
}
