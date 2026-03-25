export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { provider, prompt, apiKey, size, imageSize } = req.body;

  if (!provider || !prompt || !apiKey) {
    return res.status(400).json({ error: "Missing required fields: provider, prompt, apiKey" });
  }

  try {
    // ── DALL·E 3 ────────────────────────────────────────────────────────────────
    if (provider === "dalle") {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt,
          n: 1,
          size: size || "1024x1024",
          quality: "standard",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: data?.error?.message || "DALL·E generation failed" });
      }
      return res.status(200).json({ url: data.data[0].url });
    }

    // ── Flux Pro (fal.ai) ───────────────────────────────────────────────────────
    if (provider === "fal") {
      const response = await fetch("https://fal.run/fal-ai/flux-pro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Key ${apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          image_size: imageSize || "square_hd",
          num_inference_steps: 25,
          num_images: 1,
          safety_tolerance: "2",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: data?.detail || data?.message || "Flux generation failed" });
      }
      return res.status(200).json({ url: data.images[0].url });
    }

    return res.status(400).json({ error: "Unknown provider. Use 'dalle' or 'fal'." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
