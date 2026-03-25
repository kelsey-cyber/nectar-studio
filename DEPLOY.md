# Nectar Studio v2 — Deploy Guide

## What changed from v1
The Anthropic API call now goes through a secure server-side proxy (/api/generate.js).
This fixes the CORS issue that caused generation to hang in v1.
Your API key never touches the browser.

---

## Files to upload to GitHub — replace ALL existing files

```
nectar-studio/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── api/
│   └── generate.js        ← NEW — the proxy function
└── src/
    ├── main.jsx
    └── App.jsx             ← UPDATED — calls /api/generate instead of Anthropic directly
```

Upload everything. Replace any files that already exist in the repo.

---

## Step 1 — Update GitHub repo (5 minutes)

1. Go to your GitHub repo
2. Upload all files from this folder, replacing existing ones
3. Make sure the api/ folder uploads with generate.js inside it
4. Commit the changes
5. Vercel will automatically redeploy within 60 seconds

---

## Step 2 — Fix the environment variable name (2 minutes)

v1 used VITE_ANTHROPIC_API_KEY. v2 uses ANTHROPIC_API_KEY (no VITE_ prefix).
The proxy runs server-side so it uses a plain env var, not a Vite one.

1. In Vercel, go to Settings > Environment Variables
2. DELETE the old variable named VITE_ANTHROPIC_API_KEY (if you added it)
3. Add a new variable:
   - Name:  ANTHROPIC_API_KEY
   - Value: your Anthropic API key (starts with sk-ant-)
4. Click Save
5. Go to Deployments, click the three dots on the latest deploy, click Redeploy

---

## Step 3 — Test it

Open your live Vercel URL, go to the Campaign tab, fill in a quick test,
run guardrails, and hit Generate. Should respond within 10-15 seconds.

---

## Stability AI key (image generation)

No change here. Still entered directly in the Visuals tab by the user.
Get a key at: platform.stability.ai

---

## Custom domain (optional)

In Vercel: Settings > Domains > Add studio.nectarusa.com
Then add the CNAME record Vercel gives you to your DNS provider.

---

## Cost

- GitHub: Free
- Vercel: Free (serverless functions included on free tier)
- Anthropic API: ~$0.003 per generation
- Stability AI: ~$0.03 per image
