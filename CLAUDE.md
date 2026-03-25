# Nectar Studio — Claude Instructions

## ⚠️ ALWAYS edit files in this directory
**Correct repo path:** `/c/Users/Alex/OneDrive/Documents/GitHub/nectar-studio/`

This is the git repo connected to GitHub Desktop and Vercel. All edits must go here.

## ❌ NEVER edit these — they are NOT connected to git or Vercel
- `/c/Users/Alex/OneDrive/Desktop/nectar-studio/`
- `/c/Users/Alex/OneDrive/Desktop/nectar-studio-v2/`

## Project structure
- `src/App.jsx` — main app (all UI + logic in one file)
- `api/generate.js` — Anthropic/Claude proxy
- `api/generate-image.js` — image generation proxy (DALL·E 3 + fal.ai)
- `vite.config.js` — Vite config
- `index.html` — entry point

## Deploy
Pushing to `main` on GitHub auto-deploys to Vercel.
Live URL: https://nectar-studio-yrgp.vercel.app/
