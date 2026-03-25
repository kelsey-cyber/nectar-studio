export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Anthropic API key not configured" });
  }

  const keyDebug = {
    len: apiKey.length,
    start: apiKey.slice(0, 14),
    end: apiKey.slice(-4),
    hasWhitespace: apiKey !== apiKey.trim(),
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey.trim(),
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ ...data, _debug: keyDebug });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message, _debug: keyDebug });
  }
}
