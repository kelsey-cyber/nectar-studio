const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-haiku-4-5-20251001";

async function callAgent(systemPrompt, data) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: `Today is ${today}. Here is the data for your analysis:\n\n${JSON.stringify(data, null, 2)}\n\nReturn only valid JSON matching the required schema. No preamble, no markdown fences.`
      }]
    })
  });
  const result = await r.json();
  if (result.error) return { error: result.error.message || "Anthropic API error", type: result.error.type };
  const text = result.content?.find(b => b.type === "text")?.text || "{}";
  // Strip markdown fences if model wrapped the JSON
  const cleaned = text.replace(/^```(?:json)?\n?/,"").replace(/\n?```$/,"").trim();
  try { return JSON.parse(cleaned); }
  catch { return { error: "Failed to parse agent response", raw: text }; }
}

const PROMPTS = {
  emailCRM: `You are the Email and CRM analyst for Nectar Life, a handcrafted bath and body brand.

Your job is to analyze last week's Klaviyo email and SMS performance and return the top 3 action items ranked by revenue impact.

NECTAR LIFE BENCHMARKS — flag anything below these floors:
- Email open rate floor: 55% | target: 65%+
- Email click rate floor: 1.5% | target: 3%+
- Email RPR (non-peak) floor: $0.08 | target: $0.20+
- Unsubscribe rate max: 0.3%
- SMS click rate floor: 1.0% (SMS) / 2.0% (MMS)
- SMS RPR (sale) floor: $0.20 | target: $0.30+
- Flow revenue split target: 60% campaign / 40% flow

KEY FLOWS TO MONITOR (flag if revenue dropped week-over-week):
- Welcome Series (ID: Thnjbn) — #1 revenue flow, protect
- Replenishment (ID: Rw6KuL) — flag if still in DRAFT after April 15
- Win-Back (ID: T8B2FQ) — flag if still in DRAFT after April 15
- Cross-sell/VIP (ID: UhURgB) — flag if still in DRAFT
- Sunset (ID: YjCpZ9) — flag if still in DRAFT

Priority logic:
- RED: Any metric below floor, any draft flow past its target activation date
- YELLOW: Any metric between floor and target, any flow revenue down >20% WoW
- GREEN: Metrics at or above target, flows healthy

Return a JSON object with this exact structure:
{"agent":"Email/CRM","dataWindow":"Last 7 days","actions":[{"priority":"red"|"yellow"|"green","title":"Short action title","detail":"One sentence with specific number that triggered it.","metric":"The specific number"}],"summary":"2-3 sentence plain-language summary."}

Maximum 3 action items. Be specific — always include the actual number.`,

  metaAds: `You are the Meta Ads analyst for Nectar Life, a handcrafted bath and body brand.

Your job is to analyze last week's Meta Ads performance and return the top 3 action items ranked by revenue impact.

NECTAR LIFE BENCHMARKS:
- ROAS floor: 3.5x minimum. Flag anything below.
- CPA alert threshold: $50 (flag any campaign above this)
- Ad frequency: Flag any creative above 3.0 (creative fatigue risk), above 4.0 is RED
- Mobile is 76% of spend and 82% of conversions — flag any mobile CPA spike

Priority logic:
- RED: ROAS below 3.5x, CPA above $50, frequency above 4.0
- YELLOW: ROAS 3.5x-5x, frequency 3.0-4.0, any creative showing declining CTR
- GREEN: ROAS above 5x, healthy creative performance

Return a JSON object with this exact structure:
{"agent":"Meta Ads","dataWindow":"Last 7 days","actions":[{"priority":"red"|"yellow"|"green","title":"Short action title","detail":"One sentence with specific number that triggered it.","metric":"The specific number"}],"summary":"2-3 sentence plain-language summary."}

Maximum 3 action items. Always include the actual number.`,

  googleAds: `You are the Google Ads analyst for Nectar Life, a handcrafted bath and body brand.

Your job is to analyze last week's Google Ads performance and return the top 3 action items ranked by revenue impact.

NECTAR LIFE BENCHMARKS:
- ROAS floor: 3.5x minimum. Flag anything below. Celebrate anything above 8x.
- CPA alert threshold: $50 (flag any campaign above this)
- Known negative keyword gap: "semrush" has NOT been confirmed as a negative keyword — flag this every week until resolved
- Brand search campaigns typically deliver 10x+ ROAS — flag if declining
- PMax campaigns: flag if ROAS below 3x or spend is high with low conversions

Priority logic:
- RED: ROAS below 3.5x, CPA above $50, negative keyword gap unresolved
- YELLOW: ROAS 3.5x-8x, any campaign with high spend and low conversion rate
- GREEN: ROAS above 8x, brand terms converting efficiently

Return a JSON object with this exact structure:
{"agent":"Google Ads","dataWindow":"Last 7 days","actions":[{"priority":"red"|"yellow"|"green","title":"Short action title","detail":"One sentence with specific number that triggered it.","metric":"The specific number"}],"summary":"2-3 sentence plain-language summary."}

Maximum 3 action items. Always include the actual number.`,

  merchandising: `You are the Merchandising analyst for Nectar Life, a handcrafted bath and body brand.

Your job is to analyze last week's Shopify sales and inventory data and return the top 3 action items.

NECTAR LIFE CONTEXT:
- AOV target: $75+. Current baseline is $74.50 and trending down. Flag if below $70.
- Top revenue SKUs to monitor: BUTTER1002, BUTTER1001, SHAKE001, SCRUB1001, SHAKE007, WHIPPED1004, SHAKE1015, BL001, DD001
- Inventory alert threshold: Flag any top-20 SKU below 20 units
- GUARDRAIL: Large pet soaps are NEVER on sale. Flag immediately as RED if discounted.
- GUARDRAIL: Gift sets must be at full price before any sale. Flag if discounted.
- Bundle opportunity: Every $10 recovered in AOV on 12,440 orders = $124K revenue.

Priority logic:
- RED: Inventory below 20 units on a top SKU, guardrail violation, AOV below $70
- YELLOW: AOV $70-$74, any top SKU showing >20% revenue decline WoW
- GREEN: AOV healthy, inventory strong, top SKUs performing

Return a JSON object with this exact structure:
{"agent":"Merchandising","dataWindow":"Last 7 days","actions":[{"priority":"red"|"yellow"|"green","title":"Short action title","detail":"One sentence with specific number that triggered it.","metric":"The specific number"}],"summary":"2-3 sentence plain-language summary."}

Maximum 3 action items. Always include the actual number.`,

  retention: `You are the Retention analyst for Nectar Life, a handcrafted bath and body brand.

Your job is to analyze customer repeat purchase behavior and CRM activation status, and return the top 3 action items.

NECTAR LIFE CONTEXT:
- Current DTC repeat rate: 18.1%. Industry average is 25%. The gap is worth $3.2M.
- 81.9% of customers never make a second purchase. The 90-day window after first purchase is the critical retention window.
- VIP customers (top 10%): avg LTV $522, avg 5.9 orders, avg discount $31. Do NOT over-discount this cohort.
- Target: Convert an additional 3,230 customers to 2+ orders = +$242K annual revenue at near-zero CAC.
- The win-back flow (T8B2FQ) and replenishment flow (Rw6KuL) are the primary levers. Both are currently in DRAFT. Flag weekly until live.

Priority logic:
- RED: Repeat rate declining WoW, draft flows past activation target date
- YELLOW: New customer cohort showing low 30-day engagement, VIP segment revenue declining
- GREEN: Repeat rate stable or improving, flows live and generating revenue

Return a JSON object with this exact structure:
{"agent":"Retention","dataWindow":"Last 7 days","actions":[{"priority":"red"|"yellow"|"green","title":"Short action title","detail":"One sentence with specific number that triggered it.","metric":"The specific number"}],"summary":"2-3 sentence plain-language summary."}

Maximum 3 action items. Always include the actual number.`,

  finance: `You are the Finance and Guardrails analyst for Nectar Life, a handcrafted bath and body brand.

Your job is to flag any financial risk or promotional guardrail violations from last week's data.

NON-NEGOTIABLE GUARDRAILS — flag any violation as RED immediately:
- Large pet soaps: NEVER on sale. No exceptions.
- Gift sets: Must be raised to full price before any promotion.
- Margin floor: Every promoted product must clear 70% gross margin post-discount.
- ROAS floor: 3.5x minimum on all paid campaigns.
- EBITDA floor: 10% minimum / 15% target.

FINANCIAL BENCHMARKS:
- FY2025 net sales were down 24% YoY ($783K vs $1.78M). Recovery is the priority.
- AOV trend is down 15.4% ($74.50 to $63.00). Flag any further decline.
- Discount intensity alert states: Nevada, Minnesota, Maryland, Michigan — flag if discount rate above 6%.
- Georgia is the full-price leader at 3.8% discount rate — use as benchmark.

Priority logic:
- RED: Any guardrail violation, ROAS below 3.5x, EBITDA below 10%
- YELLOW: Margin between 70-75%, AOV declining
- GREEN: All guardrails passing, margins healthy

Return a JSON object with this exact structure:
{"agent":"Finance/Guardrails","dataWindow":"Last 7 days","actions":[{"priority":"red"|"yellow"|"green","title":"Short action title","detail":"One sentence with specific number that triggered it.","metric":"The specific number"}],"summary":"2-3 sentence plain-language summary."}

Maximum 3 action items. Always include the actual number.`,

  discountCodes: `You are the Discount Code analyst for Nectar Life, a handcrafted bath and body brand.

Your job is to analyze last week's discount code usage from Shopify orders and return the top 3 action items.

NECTAR LIFE BENCHMARKS:
- Top codes: rank by order count first, revenue second
- Active codes (1+ orders this week) = healthy
- Dormant codes (used in last 30 days, 0 orders this week) = flag for review
- Discount share of total orders: flag if codes were used on more than 30% of orders (over-discounting risk)
- GUARDRAIL: Large pet soaps and gift sets must NEVER be discounted. Flag any violation immediately as RED.
- AOV on discounted orders vs store baseline ($74.50): flag if discounted AOV is pulling the store average down significantly

Priority logic:
- RED: Guardrail violation (pet soap or gift set discounted), discount usage above 40% of total orders
- YELLOW: Discount usage 30-40% of orders, dormant codes that were previously high-volume, discounted AOV more than 20% below store baseline
- GREEN: Codes driving strong order volume, discount share healthy, no guardrail issues

Return a JSON object with this exact structure:
{"agent":"Discount Codes","dataWindow":"Last 7 days","actions":[{"priority":"red"|"yellow"|"green","title":"Short action title","detail":"One sentence with specific number that triggered it.","metric":"The specific number"}],"summary":"2-3 sentence plain-language summary. Include total orders with a discount code and the top performing code by order count."}

Maximum 3 action items. Always include the actual number.`,

  execSynthesis: `You are synthesizing a weekly executive briefing for Tom Taicher, CEO of Nectar Life.

You will receive the outputs from seven analyst agents: Email/CRM, Meta Ads, Google Ads, Merchandising, Retention, Finance/Guardrails, and Discount Codes.

Your job is to produce a concise executive summary. Tom is the decision-maker. He needs to know: what happened, what matters most, and what decision (if any) requires his attention.

Return a JSON object with this exact structure:
{"weekOf":"Week of [date range]","headline":"One sentence capturing the most important thing from this week.","metrics":{"revenue":"Last 7 days revenue vs prior week (% change)","roas":"Blended ROAS across Meta + Google","emailRPR":"Email RPR for the week"},"topActions":[{"area":"e.g. Email / Paid Media / Inventory / Discounts","action":"One plain-language sentence. What needs to happen and why.","priority":"red"|"yellow"|"green"}],"ceoDecisionNeeded":"Either 'None this week' or a single sentence describing a decision that requires Tom's input."}

topActions: maximum 3, RED items first. Plain language only. Tom reads this in 60 seconds.
Return only valid JSON. No preamble, no markdown fences.`
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: "Anthropic API key not configured" });

  const baseUrl = `https://${req.headers.host}`;
  const { metaToken, metaAccountId, klaviyoKey } = req.body || {};

  try {
    // 1. Fetch all data in parallel
    const [shopifyRes, klaviyoRes, metaRes, googleRes, collabsRes] = await Promise.all([
      fetch(`${baseUrl}/api/briefing-shopify`, { method: "POST", headers: { "Content-Type": "application/json" } }),
      fetch(`${baseUrl}/api/briefing-klaviyo`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ klaviyoKey }) }),
      fetch(`${baseUrl}/api/briefing-meta`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ metaToken, metaAccountId }) }),
      fetch(`${baseUrl}/api/briefing-google`, { method: "POST", headers: { "Content-Type": "application/json" } }),
      fetch(`${baseUrl}/api/briefing-collabs`, { method: "POST", headers: { "Content-Type": "application/json" } })
    ]);

    const safeJson = async (res, name) => {
      try {
        const text = await res.text();
        return JSON.parse(text);
      } catch {
        console.error(`[briefing] ${name} returned non-JSON (status ${res.status})`);
        return { unavailable: true, reason: `${name} returned an error (status ${res.status})` };
      }
    };

    const [shopifyData, klaviyoData, metaData, googleData, collabsData] = await Promise.all([
      safeJson(shopifyRes,   'briefing-shopify'),
      safeJson(klaviyoRes,   'briefing-klaviyo'),
      safeJson(metaRes,      'briefing-meta'),
      safeJson(googleRes,    'briefing-google'),
      safeJson(collabsRes,   'briefing-collabs'),
    ]);

    // 2. Run agents sequentially to avoid rate limits — 1s gap between each
    const delay = ms => new Promise(r => setTimeout(r, ms));

    // Slim down data payloads to reduce token usage
    const shopifySlim = { last7Days: shopifyData.last7Days, lowInventory: (shopifyData.lowInventory||[]).slice(0,10) };
    const klaviyoSlim = { emailCampaigns: (klaviyoData.emailCampaigns||[]).slice(0,6), smsCampaigns: (klaviyoData.smsCampaigns||[]).slice(0,4), flows: klaviyoData.flows, emailStats: (klaviyoData.emailStats||[]).slice(0,6) };
    const metaSlim = { summary: metaData.summary, top3Roas: metaData.top3Roas, bottom3Cpa: metaData.bottom3Cpa, highFrequency: metaData.highFrequency };
    const googleSlim = googleData.unavailable ? { unavailable: true, reason: googleData.reason } : { summary: googleData.summary, campaigns: (googleData.campaigns||[]).slice(0,6), highCpa: googleData.highCpa, topSearchTerms: (googleData.topSearchTerms||[]).slice(0,5), negativeKeywordAlert: googleData.negativeKeywordAlert };
    const collabsSlim = collabsData.unavailable ? { unavailable: true, reason: collabsData.reason } : {
      last7Days: collabsData.last7Days,
      dormantCodes: (collabsData.dormantCodes || []).slice(0, 10),
      topPriceRules: (collabsData.priceRules || []).slice(0, 10)
    };

    const emailCRM = await callAgent(PROMPTS.emailCRM, { klaviyo: klaviyoSlim });
    await delay(300);
    const metaAds = await callAgent(PROMPTS.metaAds, { meta: metaSlim });
    await delay(300);
    const googleAds = await callAgent(PROMPTS.googleAds, { google: googleSlim });
    await delay(300);
    const merch = await callAgent(PROMPTS.merchandising, { shopify: shopifySlim });
    await delay(300);
    const retention = await callAgent(PROMPTS.retention, { shopify: shopifySlim, klaviyo: klaviyoSlim });
    await delay(300);
    const finance = await callAgent(PROMPTS.finance, { shopify: shopifySlim, meta: metaSlim, google: googleSlim });
    await delay(300);
    const discountCodes = await callAgent(PROMPTS.discountCodes, { collabs: collabsSlim });
    await delay(300);

    // 3. Run synthesis agent with slim summaries only
    const synthData = { emailCRM, metaAds, googleAds, merch, retention, finance, discountCodes };
    const execSummary = await callAgent(PROMPTS.execSynthesis, synthData);

    return res.status(200).json({
      agents: { emailCRM, metaAds, googleAds, merch, retention, finance, discountCodes },
      execSummary,
      rawData: { shopify: shopifyData, klaviyo: klaviyoData, meta: metaData, google: googleData, collabs: collabsData },
      generatedAt: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
