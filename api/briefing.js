const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-4-6";

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
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: `Today is ${today}. Here is the data for your analysis:\n\n${JSON.stringify(data, null, 2)}\n\nReturn only valid JSON matching the required schema. No preamble, no markdown fences.`
      }]
    })
  });
  const result = await r.json();
  const text = result.content?.find(b => b.type === "text")?.text || "{}";
  try { return JSON.parse(text); }
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

  paidMedia: `You are the Paid Media analyst for Nectar Life, a handcrafted bath and body brand.

Your job is to analyze last week's Meta and Google Ads performance and return the top 3 action items ranked by revenue impact.

NECTAR LIFE BENCHMARKS:
- ROAS floor: 3.5x minimum. Flag anything below.
- CPA alert threshold: $50 (flag any campaign above this)
- Ad frequency: Flag any creative above 3.0 (creative fatigue)
- Mobile is 76% of spend and 82% of conversions — flag any mobile CPA spike
- Known negative keyword gap: "semrush" has not been added as a negative keyword in Google Ads — flag this every week until confirmed resolved

Priority logic:
- RED: ROAS below 3.5x, CPA above $50, frequency above 4.0
- YELLOW: ROAS 3.5x-5x, frequency 3.0-4.0, any creative showing declining CTR
- GREEN: ROAS above 5x, healthy creative performance

Return a JSON object with this exact structure:
{"agent":"Paid Media","dataWindow":"Last 7 days","actions":[{"priority":"red"|"yellow"|"green","title":"Short action title","detail":"One sentence with specific number that triggered it.","metric":"The specific number"}],"summary":"2-3 sentence plain-language summary."}

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

  execSynthesis: `You are synthesizing a weekly executive briefing for Tom Taicher, CEO of Nectar Life.

You will receive the outputs from five analyst agents: Email/CRM, Paid Media, Merchandising, Retention, and Finance/Guardrails.

Your job is to produce a concise executive summary. Tom is the decision-maker. He needs to know: what happened, what matters most, and what decision (if any) requires his attention.

Return a JSON object with this exact structure:
{"weekOf":"Week of [date range]","headline":"One sentence capturing the most important thing from this week.","metrics":{"revenue":"Last 7 days revenue vs prior week (% change)","roas":"Blended ROAS across Meta + Google","emailRPR":"Email RPR for the week"},"topActions":[{"area":"e.g. Email / Paid Media / Inventory","action":"One plain-language sentence. What needs to happen and why.","priority":"red"|"yellow"|"green"}],"ceoDecisionNeeded":"Either 'None this week' or a single sentence describing a decision that requires Tom's input."}

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
    const [shopifyRes, klaviyoRes, metaRes, googleRes] = await Promise.all([
      fetch(`${baseUrl}/api/briefing-shopify`, { method: "POST", headers: { "Content-Type": "application/json" } }),
      fetch(`${baseUrl}/api/briefing-klaviyo`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ klaviyoKey }) }),
      fetch(`${baseUrl}/api/briefing-meta`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ metaToken, metaAccountId }) }),
      fetch(`${baseUrl}/api/briefing-google`, { method: "POST", headers: { "Content-Type": "application/json" } })
    ]);

    const [shopifyData, klaviyoData, metaData, googleData] = await Promise.all([
      shopifyRes.json(),
      klaviyoRes.json(),
      metaRes.json(),
      googleRes.json()
    ]);

    // 2. Run all five agents in parallel
    const [emailCRM, paidMedia, merch, retention, finance] = await Promise.all([
      callAgent(PROMPTS.emailCRM, { klaviyo: klaviyoData }),
      callAgent(PROMPTS.paidMedia, { meta: metaData, google: googleData }),
      callAgent(PROMPTS.merchandising, { shopify: shopifyData }),
      callAgent(PROMPTS.retention, { shopify: shopifyData, klaviyo: klaviyoData }),
      callAgent(PROMPTS.finance, { shopify: shopifyData, klaviyo: klaviyoData, meta: metaData, google: googleData })
    ]);

    // 3. Run synthesis agent
    const execSummary = await callAgent(PROMPTS.execSynthesis, { emailCRM, paidMedia, merch, retention, finance });

    return res.status(200).json({
      agents: { emailCRM, paidMedia, merch, retention, finance },
      execSummary,
      rawData: { shopify: shopifyData, klaviyo: klaviyoData, meta: metaData, google: googleData },
      generatedAt: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
