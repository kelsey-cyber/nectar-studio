import { useState } from "react";

const BRAND_DNA = {
  identity: `You are Dr. Lisa Glow, Nectar Life's brand voice. Nectar Life (DBA Nectar Bath Treats, nectarusa.com) is a Las Vegas-based handcrafted, plant-based bath and body brand. Tagline: "Beyond Sweet." Founded by Tom Taicher.

VOICE: Warm, trusted confidant. Friendly, approachable, optimistic. Banters with wit but never lectures. Uplifts without preaching. Genuine and sophisticated, always inclusive.

COPY RULES:
- Lead with the feeling, not the feature
- Permission-to-indulge framing
- One idea per sentence. Short, punchy, scannable
- Use "you" and "your" at every opportunity
- Warmth over urgency
- No jargon
- Celebrate the ritual, not just the result
- Inclusive of all women and all self-care styles
- NEVER mention Black Ice scent
- NEVER call out fragrance negatively
- NEVER mention competitor brands
- NEVER use em-dashes

APPROVED CLAIMS: Vegan, Cruelty-Free, Paraben-Free, Sulfate-Free, Phthalate-Free, Microplastic-Free, Plant-Based, Handmade in USA

WE ARE: Welcoming, Intentional, Clever, Compassionate, Colorful, Light-Hearted, Playful, Genuine
WE ARE NOT: Intimidating, Random, High-Brow, Preachy, Overwhelming, Overly Serious, Conventional, Forced

PERSONAS:
- CARRIE (Gen X, 40s, Suburban Mom): Quality, authenticity, sustainability. 15 minutes to herself and earned every one.
- EMILY (Millennial, Late 20s, Urban Professional): Eco-conscious, aesthetic-first. Clean and cute framing.

CEO PRIORITY: Always lead with ritual stories, ingredient origin stories, and the brand's why.`,

  photoDirection: `NECTAR LIFE PHOTOGRAPHY DIRECTION:
- Lifestyle shots: Playful, vibrant, bright. Product in use, not staged.
- Ingredient shots: Real botanicals, clean and tactile, soft natural light.
- Texture shots: Elegant close-ups, lather, cream, rich color.
- On-Figure: Hands relaxed with pastel manicure, diverse skin tones, authentic.
- Settings: Modern minimalist bathroom, natural lighting ALWAYS.
- Mood references: Gisou (ritual-forward, sensory), Chanel (editorial restraint).
- Brand colors: Pink #FCAFC0, Hot Pink #F05380, Cream #FCF4EE, Coral #EE817E, Blush #FFE3EC.
- Never: Harsh artificial lighting, cluttered backgrounds, overly staged setups.`,

  bathBombPhysics: `BATH BOMB FIZZING — VISUAL REFERENCE FOR AI PROMPTS:
A bath bomb in water undergoes a specific, predictable visual sequence that AI models must replicate accurately:

FIZZING MECHANICS:
- The bomb sits ON TOP of the water surface, it does NOT sink immediately
- Fizzing begins instantly at the water-contact point: rapid, fine micro-effervescence (tiny CO2 bubbles, not large soap bubbles)
- The surface of the bomb appears to "melt" and "crackle" — like a carbonated tablet dissolving
- The bomb slowly spins and rotates as it loses mass unevenly
- White foam and froth accumulate at the waterline around the bomb
- The bomb gradually shrinks over 3-5 minutes until fully dissolved

COLOR DISPERSION:
- Rich saturated color (pink, coral, lavender, teal, etc.) bleeds outward from the bomb in organic swirling tendrils
- The color spreads in flowing, tie-dye-like plumes — NOT a uniform wash
- Multiple colors may swirl simultaneously if the bomb is multi-colored
- The water transitions from clear to richly pigmented starting from the center outward
- Color swirls are visible as 3D depth in the water, not just surface color

LIGHT AND TEXTURE:
- Iridescent shimmer or glitter particles float upward and outward from the bomb
- Dried botanicals (rose petals, calendula, chamomile) float to the surface and spread
- The effervescence creates a fine, sparkling interference pattern on the water surface
- Backlit or side-lit setups show the color swirls dramatically in translucent water
- Bubbles catch light and create micro-highlights

VISUAL PROMPT KEYWORDS FOR AI GENERATORS:
Use these precise descriptors: "bath bomb actively fizzing in water", "fine micro-effervescence at waterline", "swirling pigment plumes in water", "saturated color dispersion in bathtub", "dissolving bath bomb with rising shimmer particles", "foamy waterline fizz", "organic dye tendrils spreading through clear water", "iridescent glitter rising through bath water", "dried petals floating on surface", "bomb spinning slowly as it dissolves", "effervescent crackle on bomb surface", "CO2 micro-bubbles streaming upward"

WHAT TO AVOID TELLING THE AI:
- Never just say "bath bomb in water" — AI will generate a static, already-dissolved product
- Avoid "bubbles" alone — AI generates large soap bubbles, not fine effervescence
- Never say "bath water" without specifying the color and fizzing action`,

  socialPillars: [
    { id: "ritual", label: "Ritual Story", desc: "The moment, the routine, the feeling" },
    { id: "ingredient", label: "Ingredient Origin", desc: "Where it comes from, why it matters" },
    { id: "seasonal", label: "Seasonal Moment", desc: "Tied to a time of year or occasion" },
    { id: "proof", label: "Social Proof", desc: "UGC, reviews, community love" },
    { id: "values", label: "Brand Values", desc: "Clean, handmade, transparent, joyful" },
  ],
};

const NECTAR_PLAYBOOK = `NECTAR LIFE PERFORMANCE PLAYBOOK — Built from real campaign data (Dec 2025 – Mar 2026)

## EMAIL (Klaviyo — 90 days)

SEGMENTATION RULES:
- Super Engaged sends (~2k recipients): 60–79% open rate, 0.25–0.44% conversion — ALWAYS segment before blasting
- Intermediary Engaged: 63–72% open rate — strong secondary tier
- All Opt In blasts (40k+ recipients): low conversion (0.06%) but highest absolute revenue ($1,943 on 60% OFF send) — use only for major events
- Engaged 180 (~12k): outperforms All Opt In on rate, use for mid-tier sends

TOP CONVERTING EMAIL TYPES (by conversion rate):
1. Transactional / policy updates (Shipping Change): 2.86% conversion — informational emails convert extremely well, don't skip them
2. Targeted product launches to Super Engaged (Berry Rose, Valentine's): 0.25–0.44% conversion
3. Last Chance / urgency sends to Super Engaged (MLK Last Chance): 0.44% conversion, $747 revenue from 2k recipients

WHAT WORKS IN SUBJECT LINES:
- Specific product names ("Berry Rose", "Valentine's") outperform generic subject lines
- Last Chance / urgency framing works on Super Engaged — not needed on cold lists
- Face Care campaigns hit 79% open on reminder segments — reminder sequencing is high value

WHAT TO AVOID:
- Broad blasts without segmentation on standard campaigns — high deliveries, low conversion
- "Scrub vs Soak" editorial framing: 0.01% conversion on 83k recipients — avoid editorial/educational framing for conversion campaigns

## FLOWS (Klaviyo — last 30 days)

TOP FLOWS (do not turn off, do not edit without testing):
1. Abandoned Cart Email 1: 45–52% open rate, 1.82–1.85% conversion — highest ROI flow in the account
2. Abandoned Cart SMS: 2.13% conversion — SMS follow-up after email is additive, keep both active
3. Birthday / Loyalty Email: 77.8% open rate, 5.56% conversion rate — best converting flow message in entire account
   → Only 18 recipients in period — PRIORITY: grow loyalty program enrollment to scale this

FLOW SEQUENCING THAT WORKS:
- Abandoned Cart: Email → Email → SMS sequence is proven (all three variants convert)
- Birthday timing: timely, personal = massive lift

## META ADS (last 30 days: Feb 25 – Mar 26, 2026)

CAMPAIGN WINNER — USE AS TEMPLATE:
- WKND TOF Catalogue CBO: 4.44x ROAS, $15.12 cost per purchase, 99 purchases, $1,497 spend
- CPM $11.21 — most efficient CPM in account
- Rule: Catalogue CBO at TOF beats all other structures. Scale budget here first.

UNDERPERFORMERS — DO NOT SCALE:
- Creative Test ABO: 1.45x ROAS, $54 cost per purchase — ABO underperforms CBO consistently
- Adv+ All Creative Testing CBO: 1.15x ROAS, $61 cost per purchase — broad Adv+ not efficient
- New Product Launch CBO: 0.69x ROAS — product launches don't convert cold traffic, gate to warm audiences

PROMOTIONAL CAMPAIGNS:
- B2G1 Easter Sale CBO: 1.99x ROAS — B2G1 mechanic works at 2x+ ROAS, is viable for scale
- B2G1 ABO: 1.36x ROAS — same offer, worse structure. Always use CBO for promos.

STRUCTURE RULES:
- CBO always outperforms ABO for this account
- TOF Catalogue is the evergreen engine — keep it funded above all others
- B2G1 is the best promotional mechanic (vs. % off) based on ROAS data

## PRODUCTS (Shopify — top converting landing pages, 90 days)

FEATURE THESE IN ADS AND EMAILS FIRST:
1. Sugar Plum Whipped Soap: 16.67% conversion
2. Sugar Plum Snowman Bath Bomb: 16.67% conversion
3. Jumbo Shea Moisturizing Body Butter: 13.04% conversion
4. Essential Oil Benefit Bomb (Soothe/Recover/Magnesium): 12.50% conversion
5. Customizable Shea Body Butter 16oz Mix & Match: 8.19% conversion — high conversion + customization = strong hook
6. Sweet Indulgence Gift Set: 6.78% conversion
7. Ultra Hydrating Face Cream 50ml: 6.49% conversion

AVOID AS COLD TRAFFIC ENTRY POINTS:
- Collections pages, gift sets with 0% conversion — they leak traffic. Send to product PDPs, not collections.
- Custom body lotion, shower steamers, shave kits: 0% conversion in period

CATALOGUE ADS: Prioritize Whipped Soaps, Body Butter, Essential Oil Bath Bombs in product feed — these close.`;

const C = {
  primaryPink: "#FCAFC0", hotPink: "#F05380", cream: "#FCF4EE",
  coral: "#EE817E", blush: "#FFE3EC", charcoal: "#434343",
  white: "#FFFFFF", gray100: "#F9F5F2", gray200: "#EDE8E3",
  gray400: "#BDB6AD", gray600: "#7A7068",
};

async function callClaude(system, user) {
  const r = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  const d = await r.json();
  return d.content?.[0]?.text || "Generation failed.";
}

async function generateImageStability(prompt, apiKey, ratio = "1:1") {
  const fd = new FormData();
  fd.append("prompt", prompt);
  fd.append("output_format", "jpeg");
  fd.append("aspect_ratio", ratio);
  const r = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, Accept: "image/*" },
    body: fd,
  });
  if (!r.ok) { const e = await r.json().catch(() => ({})); throw new Error(e?.message || `Error ${r.status}`); }
  return URL.createObjectURL(await r.blob());
}

async function generateImageDalle(prompt, apiKey, ratio = "1:1") {
  const sizeMap={"1:1":"1024x1024","4:5":"1024x1024","9:16":"1024x1792","16:9":"1792x1024","3:2":"1792x1024"};
  const r = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: "dalle", prompt, apiKey, size: sizeMap[ratio]||"1024x1024" }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d?.error || `Error ${r.status}`);
  return d.url;
}

async function generateImageFal(prompt, apiKey, ratio = "1:1") {
  const sizeMap={"1:1":"square_hd","4:5":"portrait_4_3","9:16":"portrait_16_9","16:9":"landscape_16_9","3:2":"landscape_4_3"};
  const r = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: "fal", prompt, apiKey, imageSize: sizeMap[ratio]||"square_hd" }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d?.error || `Error ${r.status}`);
  return d.url;
}

function downloadText(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── BASE COMPONENTS ────────────────────────────────────────────────────────────

function Dots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, borderRadius:"50%", background:C.hotPink, animation:"pulse 1.2s ease-in-out infinite", animationDelay:`${i*0.2}s` }} />)}
    </span>
  );
}

function Card({ label, content, onCopy, copied }) {
  return (
    <div style={{ background:C.white, border:`1px solid ${C.gray200}`, borderRadius:12, overflow:"hidden", marginBottom:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 16px", background:C.cream, borderBottom:`1px solid ${C.gray200}` }}>
        <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", color:C.gray600, textTransform:"uppercase" }}>{label}</span>
        <button onClick={onCopy} style={{ fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:6, border:`1px solid ${copied?C.hotPink:C.gray400}`, background:copied?C.blush:C.white, color:copied?C.hotPink:C.gray600, cursor:"pointer", transition:"all 0.2s" }}>{copied?"Copied!":"Copy"}</button>
      </div>
      <pre style={{ margin:0, padding:"14px 16px", fontSize:13.5, lineHeight:1.65, color:C.charcoal, whiteSpace:"pre-wrap", fontFamily:"inherit" }}>{content}</pre>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, area, hint }) {
  const base = { width:"100%", padding:"10px 12px", borderRadius:8, border:`1.5px solid ${C.gray200}`, fontSize:13.5, color:C.charcoal, fontFamily:"inherit", background:C.white, boxSizing:"border-box", outline:"none" };
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:12, fontWeight:700, color:C.gray600, marginBottom:5, letterSpacing:"0.05em", textTransform:"uppercase" }}>{label}</label>
      {hint && <p style={{ fontSize:11.5, color:C.gray400, marginBottom:6, marginTop:-2 }}>{hint}</p>}
      {area ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...base, resize:"vertical", lineHeight:1.5 }} /> : <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={base} />}
    </div>
  );
}

function Dropdown({ label, value, onChange, opts }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:12, fontWeight:700, color:C.gray600, marginBottom:5, letterSpacing:"0.05em", textTransform:"uppercase" }}>{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1.5px solid ${C.gray200}`, fontSize:13.5, color:C.charcoal, fontFamily:"inherit", background:C.white, boxSizing:"border-box", outline:"none", cursor:"pointer" }}>
        {opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
}

function Btn({ onClick, loading, label, disabled }) {
  const off = loading || disabled;
  return (
    <button onClick={onClick} disabled={off} style={{ width:"100%", padding:"14px 20px", background:off?C.gray200:`linear-gradient(135deg,${C.hotPink},${C.coral})`, color:off?C.gray400:C.white, border:"none", borderRadius:10, fontSize:14, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", cursor:off?"not-allowed":"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:off?"none":`0 4px 16px ${C.hotPink}40` }}>
      {loading?<><Dots/><span style={{fontSize:13}}>Generating...</span></>:label}
    </button>
  );
}

function Pill({ label, active, onClick }) {
  return <button onClick={onClick} style={{ padding:"7px 14px", borderRadius:20, border:`1.5px solid ${active?C.hotPink:C.gray200}`, background:active?C.blush:C.white, color:active?C.hotPink:C.gray600, fontSize:12.5, fontWeight:active?700:500, cursor:"pointer", transition:"all 0.15s" }}>{label}</button>;
}

// ── NEW SHARED COMPONENTS ──────────────────────────────────────────────────────

// Instagram-style post preview (Zeely-inspired)
function InstaPreview({ caption, hashtags }) {
  return (
    <div style={{ border:`1px solid ${C.gray200}`, borderRadius:14, overflow:"hidden", marginBottom:16, fontFamily:"'Helvetica Neue',Arial,sans-serif", background:C.white, boxShadow:`0 4px 20px rgba(0,0,0,0.06)` }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderBottom:`1px solid ${C.gray200}` }}>
        <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${C.hotPink},${C.coral})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:14, fontWeight:700, flexShrink:0 }}>N</div>
        <div style={{ flex:1 }}>
          <p style={{ margin:0, fontSize:13, fontWeight:700, color:"#000" }}>nectarlifeusa</p>
          <p style={{ margin:0, fontSize:10.5, color:"#8e8e8e" }}>Las Vegas, Nevada</p>
        </div>
        <span style={{ fontSize:20, color:"#8e8e8e", lineHeight:1, cursor:"default" }}>•••</span>
      </div>
      {/* Image placeholder */}
      <div style={{ height:240, background:`linear-gradient(145deg,${C.blush} 0%,${C.cream} 50%,${C.primaryPink}40 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative" }}>
        <span style={{ fontSize:36, opacity:0.35, marginBottom:8 }}>✿</span>
        <p style={{ margin:0, fontSize:12, color:C.gray400, fontStyle:"italic" }}>Your visual here</p>
        <div style={{ position:"absolute", bottom:10, right:12, background:"rgba(255,255,255,0.88)", borderRadius:6, padding:"4px 9px", fontSize:10, color:C.gray600, fontWeight:600 }}>Photo placeholder</div>
      </div>
      {/* Actions */}
      <div style={{ padding:"12px 14px 6px", background:C.white }}>
        <div style={{ display:"flex", gap:14, marginBottom:10 }}>
          <span style={{ fontSize:24, cursor:"default", lineHeight:1 }}>🤍</span>
          <span style={{ fontSize:24, cursor:"default", lineHeight:1 }}>💬</span>
          <span style={{ fontSize:24, cursor:"default", lineHeight:1 }}>📤</span>
          <span style={{ marginLeft:"auto", fontSize:24, cursor:"default", lineHeight:1 }}>🔖</span>
        </div>
        {/* Caption */}
        <p style={{ margin:"0 0 6px", fontSize:13.5, color:"#000", lineHeight:1.55 }}>
          <strong style={{ fontWeight:700 }}>nectarlifeusa</strong>{" "}{caption}
        </p>
        {hashtags && (
          <p style={{ margin:"0 0 8px", fontSize:13, color:"#00376B", lineHeight:1.5 }}>{hashtags}</p>
        )}
        <p style={{ margin:"0 0 4px", fontSize:11.5, color:"#8e8e8e" }}>View all comments</p>
        <p style={{ margin:"0 0 12px", fontSize:10.5, color:"#8e8e8e", textTransform:"uppercase", letterSpacing:"0.04em" }}>Just now</p>
      </div>
    </div>
  );
}

// Active campaign context banner — shown in Social, Photo Brief, Visuals (Jasper-inspired)
function CtxBanner({ ctx, onFill }) {
  if (!ctx) return null;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background:C.blush, border:`1.5px solid ${C.primaryPink}`, borderRadius:10, marginBottom:16 }}>
      <span style={{ fontSize:15, flexShrink:0, color:C.hotPink }}>◈</span>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ margin:0, fontSize:12, fontWeight:700, color:C.charcoal, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Active Campaign: {ctx.name}</p>
        <p style={{ margin:"2px 0 0", fontSize:11, color:C.gray600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ctx.products}</p>
      </div>
      <button onClick={onFill} style={{ padding:"6px 12px", borderRadius:8, background:C.hotPink, color:C.white, border:"none", fontSize:11.5, fontWeight:700, cursor:"pointer", flexShrink:0, whiteSpace:"nowrap" }}>Fill Fields</button>
    </div>
  );
}

// ── SOCIAL ────────────────────────────────────────────────────────────────────
function Social({ ctx, playbook }) {
  const [pillar,setPillar]=useState("ritual");
  const [platform,setPlatform]=useState("instagram");
  const [product,setProduct]=useState("");
  const [angle,setAngle]=useState("");
  const [tone,setTone]=useState("warm");
  const [loading,setLoading]=useState(false);
  const [out,setOut]=useState(null);
  const [cp,setCp]=useState({});
  const [preview,setPreview]=useState(false);
  const sp=BRAND_DNA.socialPillars.find(p=>p.id===pillar);

  function fillFromCtx() {
    if (!ctx) return;
    setProduct(ctx.products || "");
    setAngle(ctx.name ? `${ctx.name} campaign` : "");
  }

  async function go() {
    setLoading(true); setOut(null); setPreview(false);
    const playbookHint = playbook ? `\n\nTop converting products to feature when relevant: Whipped Soaps (16% CVR), Jumbo Body Butter (13%), Essential Oil Bath Bombs (12%), Customizable Body Butter Mix & Match (8%). Lead with ritual stories, not discounts.` : "";
    const sys=`${BRAND_DNA.identity}\n\nGenerate social media content for Nectar Life. Elevated and intentional, not promotional. Benchmarks: Gisou and Chanel. No em-dashes.${playbookHint}`;
    const usr=`Generate social content.\nPILLAR: ${sp.label} — ${sp.desc}\nPLATFORM: ${platform}\nPRODUCT: ${product||"General brand moment"}\nANGLE: ${angle||"Seasonal, elevated, ritual-forward"}\nTONE: ${tone}\n\nReturn EXACTLY:\nCAPTION OPTION 1:\n[3-5 sentences, soft CTA at end]\n\nCAPTION OPTION 2:\n[shorter, punchier]\n\nHASHTAGS:\n[8-12 hashtags, always include #nectarlifeusa]\n\nVISUAL DIRECTION:\n[One sentence for ideal image/video]`;
    const res=await callClaude(sys,usr);
    setLoading(false);
    const s={};
    res.split(/\n(?=CAPTION OPTION 1:|CAPTION OPTION 2:|HASHTAGS:|VISUAL DIRECTION:)/).forEach(p=>{
      if(p.startsWith("CAPTION OPTION 1:")) s.c1=p.replace("CAPTION OPTION 1:","").trim();
      if(p.startsWith("CAPTION OPTION 2:")) s.c2=p.replace("CAPTION OPTION 2:","").trim();
      if(p.startsWith("HASHTAGS:")) s.ht=p.replace("HASHTAGS:","").trim();
      if(p.startsWith("VISUAL DIRECTION:")) s.vd=p.replace("VISUAL DIRECTION:","").trim();
    });
    setOut(s.c1?s:{raw:res});
  }

  function copy(k,t){navigator.clipboard.writeText(t);setCp(p=>({...p,[k]:true}));setTimeout(()=>setCp(p=>({...p,[k]:false})),2000);}

  return (
    <div>
      <p style={{fontSize:13.5,color:C.gray600,lineHeight:1.6,margin:"0 0 20px"}}>Generate on-brand captions and visual direction. Brand DNA and copy rules enforced on every output.</p>
      <CtxBanner ctx={ctx} onFill={fillFromCtx} />
      <div style={{marginBottom:16}}>
        <label style={{display:"block",fontSize:12,fontWeight:700,color:C.gray600,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Content Pillar</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{BRAND_DNA.socialPillars.map(p=><Pill key={p.id} label={p.label} active={pillar===p.id} onClick={()=>setPillar(p.id)}/>)}</div>
        {sp&&<p style={{fontSize:11.5,color:C.gray400,marginTop:6}}>{sp.desc}</p>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
        <Dropdown label="Platform" value={platform} onChange={setPlatform} opts={[{v:"instagram",l:"Instagram / Reels"},{v:"tiktok",l:"TikTok"},{v:"facebook",l:"Facebook"},{v:"all",l:"All Platforms"}]}/>
        <Dropdown label="Tone" value={tone} onChange={setTone} opts={[{v:"warm",l:"Warm & Ritual"},{v:"playful",l:"Playful & Light"},{v:"editorial",l:"Editorial & Elevated"},{v:"educational",l:"Ingredient-Led"},{v:"community",l:"Community & Social Proof"}]}/>
      </div>
      <Field label="Product or Focus" value={product} onChange={setProduct} placeholder="e.g. Body Butter, Bath Bombs, Spring collection..."/>
      <Field label="Campaign Angle or Brief" value={angle} onChange={setAngle} placeholder="e.g. Mother's Day gifting, Earth Day ingredient story, summer skin ritual..." area/>
      <Btn onClick={go} loading={loading} label="Generate Social Content"/>
      {out&&(
        <div style={{marginTop:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div style={{height:1,background:C.gray200,flex:1,marginRight:12}}/>
            {!out.raw&&(
              <button onClick={()=>setPreview(p=>!p)} style={{padding:"5px 14px",borderRadius:20,border:`1.5px solid ${preview?C.hotPink:C.gray200}`,background:preview?C.blush:C.white,color:preview?C.hotPink:C.gray600,fontSize:11.5,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s",flexShrink:0}}>
                {preview?"Hide Preview":"Preview Post"}
              </button>
            )}
          </div>
          {preview&&!out.raw&&<InstaPreview caption={out.c1||""} hashtags={out.ht||""}/>}
          {out.raw?<Card label="Output" content={out.raw} onCopy={()=>copy("raw",out.raw)} copied={cp.raw}/>:<>
            {out.c1&&<Card label="Caption Option 1" content={out.c1} onCopy={()=>copy("c1",out.c1)} copied={cp.c1}/>}
            {out.c2&&<Card label="Caption Option 2" content={out.c2} onCopy={()=>copy("c2",out.c2)} copied={cp.c2}/>}
            {out.ht&&<Card label="Hashtags" content={out.ht} onCopy={()=>copy("ht",out.ht)} copied={cp.ht}/>}
            {out.vd&&<Card label="Visual Direction" content={out.vd} onCopy={()=>copy("vd",out.vd)} copied={cp.vd}/>}
          </>}
        </div>
      )}
    </div>
  );
}

// ── CAMPAIGN ──────────────────────────────────────────────────────────────────
function Campaign({ setCtx, playbook }) {
  const [name,setName]=useState("");
  const [mech,setMech]=useState("");
  const [prods,setProds]=useState("");
  const [goal,setGoal]=useState("revenue");
  const [angle,setAngle]=useState("");
  const [ch,setCh]=useState({email:true,sms:true,ads:false});
  const [passed,setPassed]=useState(false);
  const [loading,setLoading]=useState(false);
  const [out,setOut]=useState(null);
  const [cp,setCp]=useState({});
  const [warns,setWarns]=useState([]);
  const [ctxSet,setCtxSet]=useState(false);
  const [copyAll,setCopyAll]=useState(false);

  function check(){
    const w=[];
    const c=(name+" "+mech+" "+prods).toLowerCase();
    if(c.includes("large pet")||c.includes("big pet")) w.push("BLOCK: Large pet soaps cannot be on sale.");
    if(c.includes("gift set")&&(c.includes("off")||c.includes("discount")||c.includes("sale"))) w.push("BLOCK: Gift sets must be raised to full price before any promotion.");
    if(c.includes("black ice")) w.push("BLOCK: Black Ice scent must not be mentioned.");
    setWarns(w); setPassed(w.length===0);
  }

  async function go(){
    if(!passed) return;
    setLoading(true); setOut(null); setCtxSet(false);
    const chl=Object.entries(ch).filter(([,v])=>v).map(([k])=>k).join(", ");
    const playbookContext = playbook ? `\n\nPERFORMANCE PLAYBOOK (use this to inform copy decisions):\n- B2G1 mechanic outperforms % off on Meta (2x vs lower ROAS)\n- Super Engaged email segments (2k recipients) convert at 0.44% vs 0.06% on full list blasts — recommend segmented sends\n- Last Chance / urgency framing works on engaged segments, not cold lists\n- Top converting products: Whipped Soaps (16%), Jumbo Body Butter (13%), Essential Oil Bath Bombs (12%), Mix & Match Body Butter (8%)\n- Feature specific product names in subject lines — outperforms generic subject lines\n- Abandoned cart emails convert at 1.8–2.1% — always include a cart recovery CTA in campaign copy` : "";
    const sys=`${BRAND_DNA.identity}\n\nGenerate campaign copy. Always lead with ritual/ingredient stories, never the discount. Warmth over urgency. No em-dashes.${playbookContext}`;
    const usr=`Generate all campaign outputs.\nCAMPAIGN: ${name}\nMECHANIC: ${mech}\nPRODUCTS: ${prods}\nGOAL: ${goal}\nANGLE: ${angle||"Permission-to-indulge, warm, ritual-forward"}\nCHANNELS: ${chl}\n\nReturn EXACTLY:\n\n— DESIGNED EMAIL —\n\nSUBJECT LINE OPTIONS:\n1. [option]\n2. [option]\n3. [option]\n\nPREVIEW TEXT:\n[under 90 chars]\n\nTOP BAR:\n[short offer line + free shipping threshold, e.g. "B2G1 This Weekend + FREE Shipping Orders $40+"]\n\nSMALL LABEL:\n[collection or category name in caps, e.g. "THE SPRING COLLECTION"]\n\nHERO HEADLINE:\n[big serif headline, 3-5 words, feeling-first]\n\nHERO SUBHEADLINE:\n[1-2 supporting sentences, ritual-forward, no em-dashes]\n\nHERO CTA:\n[button text, ALL CAPS, 2-4 words]\n\nBADGE:\n[e.g. "LIMITED EDITION!" or "SAVE $18" — write "None" if not applicable]\n\nSECTION HEADLINE:\n[warm section title, e.g. "Refresh & Bloom"]\n\nPRODUCT TILES:\n[list each featured product on its own line as: Product Name → SHOP NOW]\n\n— PLAIN TEXT RESEND —\n\nRESEND SUBJECT LINE OPTIONS:\n1. [option]\n2. [option]\n3. [option]\n\nRESEND BODY:\nHi [Name],\n[80-100 words, conversational, from Kelsey, different angle — urgency or personal, no design needed]\nXO,\nKelsey\n\n— SMS —\n\nSMS OPTION 1:\n[under 160 chars]\n\nSMS OPTION 2:\n[under 160 chars]\n\n— META ADS —\n\nMETA AD HEADLINES:\n1. [headline]\n2. [headline]\n3. [headline]\n\nAD BODY COPY:\n[2-3 sentences, mobile-first]\n\nCTA BUTTON TEXT:\n[ALL CAPS, 2-4 words]`;
    const res=await callClaude(sys,usr);
    setLoading(false);
    const keys=["SUBJECT LINE OPTIONS:","PREVIEW TEXT:","TOP BAR:","SMALL LABEL:","HERO HEADLINE:","HERO SUBHEADLINE:","HERO CTA:","BADGE:","SECTION HEADLINE:","PRODUCT TILES:","RESEND SUBJECT LINE OPTIONS:","RESEND BODY:","SMS OPTION 1:","SMS OPTION 2:","META AD HEADLINES:","AD BODY COPY:","CTA BUTTON TEXT:"];
    const s={};
    for(let i=0;i<keys.length;i++){
      const k=keys[i],nk=keys[i+1],st=res.indexOf(k);
      if(st===-1) continue;
      const en=nk?res.indexOf(nk):res.length;
      s[k]=res.slice(st+k.length,en!==-1?en:undefined).trim();
    }
    setOut(Object.keys(s).length>0?s:{raw:res});
  }

  function copy(k,t){navigator.clipboard.writeText(t);setCp(p=>({...p,[k]:true}));setTimeout(()=>setCp(p=>({...p,[k]:false})),2000);}

  function handleSetCtx() {
    setCtx({ name: name || "Untitled Campaign", products: prods });
    setCtxSet(true);
  }

  function handleDownload() {
    if (!out) return;
    const lines = [
      `NECTAR LIFE — ${(name||"Campaign").toUpperCase()} COPY PACK`,
      `Generated: ${new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}`,
      "═".repeat(52),
      "",
    ];
    if (out.raw) {
      lines.push(out.raw);
    } else {
      Object.entries(out).forEach(([k, v]) => {
        const title = k.replace(/[:()\n]/g," ").replace(/\s+/g," ").trim().toUpperCase();
        lines.push(title);
        lines.push("─".repeat(title.length));
        lines.push(v);
        lines.push("");
      });
    }
    downloadText(`${(name||"campaign").toLowerCase().replace(/\s+/g,"-")}-copy-pack.txt`, lines.join("\n"));
  }

  function handleCopyAll() {
    if (!out) return;
    const text = out.raw
      ? out.raw
      : Object.entries(out).map(([k,v]) => `${k.trim()}\n${v}`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopyAll(true);
    setTimeout(() => setCopyAll(false), 2000);
  }

  return (
    <div>
      <p style={{fontSize:13.5,color:C.gray600,lineHeight:1.6,margin:"0 0 20px"}}>Generate email copy, SMS, and ad headlines from a campaign brief. Guardrails checked before any copy is produced.</p>
      <Field label="Campaign Name" value={name} onChange={v=>{setName(v);setPassed(false);}} placeholder="e.g. Mother's Day Collection, National Pet Day B2G1"/>
      <Field label="Promo Mechanic" value={mech} onChange={v=>{setMech(v);setPassed(false);}} placeholder="e.g. B2G1 small soaps, 25% off body care, no discount"/>
      <Field label="Featured Products" value={prods} onChange={v=>{setProds(v);setPassed(false);}} placeholder="e.g. Body Butter, Body Scrub, Bath Bombs" area/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
        <Dropdown label="Primary Goal" value={goal} onChange={setGoal} opts={[{v:"revenue",l:"Revenue"},{v:"clearance",l:"Clearance / Inventory"},{v:"acquisition",l:"New Customer Acquisition"},{v:"retention",l:"Re-engagement / Retention"},{v:"values",l:"Brand Values / Education"}]}/>
        <div style={{marginBottom:16}}>
          <label style={{display:"block",fontSize:12,fontWeight:700,color:C.gray600,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Channels</label>
          <div style={{display:"flex",gap:8}}>
            {Object.entries({email:"Email",sms:"SMS",ads:"Paid Ads"}).map(([k,l])=>(
              <button key={k} onClick={()=>setCh(p=>({...p,[k]:!p[k]}))} style={{padding:"7px 12px",borderRadius:8,fontSize:12.5,cursor:"pointer",border:`1.5px solid ${ch[k]?C.hotPink:C.gray200}`,background:ch[k]?C.blush:C.white,color:ch[k]?C.hotPink:C.gray600,fontWeight:ch[k]?700:500,transition:"all 0.15s"}}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <Field label="Angle / Tone Brief" value={angle} onChange={setAngle} placeholder="e.g. Permission-to-indulge, gift framing, ritual story around body butter..." area/>
      <div style={{padding:"14px 16px",borderRadius:10,marginBottom:16,background:passed?"#F0FFF4":C.cream,border:`1.5px solid ${passed?"#34C759":C.gray200}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <p style={{margin:0,fontSize:12.5,fontWeight:700,color:passed?"#1A7A35":C.charcoal}}>{passed?"Guardrails: PASS":"Guardrails Check Required"}</p>
            {!passed&&<p style={{margin:"3px 0 0",fontSize:11.5,color:C.gray600}}>Run before generating outputs</p>}
            {warns.map((w,i)=><p key={i} style={{margin:"4px 0 0",fontSize:12,color:"#C0392B",fontWeight:600}}>{w}</p>)}
          </div>
          <button onClick={check} style={{padding:"7px 14px",borderRadius:8,fontSize:12.5,fontWeight:700,background:C.hotPink,color:C.white,border:"none",cursor:"pointer"}}>Check</button>
        </div>
      </div>
      <Btn onClick={go} loading={loading} disabled={!passed} label={passed?"Generate Campaign Outputs":"Run Guardrails First"}/>
      {out&&(
        <div style={{marginTop:24}}>
          <div style={{height:1,background:C.gray200,marginBottom:20}}/>
          {out.raw
            ? <Card label="Campaign Outputs" content={out.raw} onCopy={()=>copy("raw",out.raw)} copied={cp.raw}/>
            : Object.entries(out).map(([k,v])=><Card key={k} label={k.replace(/:|\(|\)/g,"")} content={v} onCopy={()=>copy(k,v)} copied={cp[k]}/>)
          }
          {/* Action toolbar — inspired by Placid/Jasper export patterns */}
          <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap"}}>
            <button onClick={handleCopyAll} style={{flex:1,minWidth:110,padding:"9px 12px",borderRadius:8,border:`1.5px solid ${copyAll?C.hotPink:C.gray200}`,background:copyAll?C.blush:C.white,color:copyAll?C.hotPink:C.gray600,fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s",fontFamily:"inherit"}}>
              {copyAll?"Copied!":"Copy All"}
            </button>
            <button onClick={handleDownload} style={{flex:1,minWidth:110,padding:"9px 12px",borderRadius:8,border:`1.5px solid ${C.gray200}`,background:C.white,color:C.gray600,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              Download Pack
            </button>
            <button onClick={handleSetCtx} style={{flex:1,minWidth:140,padding:"9px 12px",borderRadius:8,border:`1.5px solid ${ctxSet?"#34C759":C.primaryPink}`,background:ctxSet?"#F0FFF4":C.blush,color:ctxSet?"#1A7A35":C.hotPink,fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.15s",fontFamily:"inherit"}}>
              {ctxSet?"Active Campaign Set":"Set as Active Campaign"}
            </button>
          </div>
          {ctxSet&&(
            <p style={{margin:"8px 0 0",fontSize:11.5,color:"#1A7A35",lineHeight:1.5}}>
              Campaign active — Social, Photo Brief, and Visuals tabs will pre-fill from this campaign.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── PHOTO BRIEF ───────────────────────────────────────────────────────────────
function PhotoBrief({ ctx, playbook }) {
  const [cname,setCname]=useState("");
  const [prods,setProds]=useState("");
  const [shot,setShot]=useState("lifestyle");
  const [hook,setHook]=useState("");
  const [assets,setAssets]=useState({emailHeader:true,saleBanner:false,metaSquare:true,metaStory:true,googleDisplay:false});
  const [loading,setLoading]=useState(false);
  const [out,setOut]=useState(null);
  const [cp,setCp]=useState({});
  const assetMap={emailHeader:"Email header (1080px wide)",saleBanner:"Sale page banner",metaSquare:"Meta ad 1:1 (1080x1080px)",metaStory:"Meta Stories/Reels 9:16 (1080x1920px)",googleDisplay:"Google Display (300x250px)"};

  function fillFromCtx() {
    if (!ctx) return;
    setCname(ctx.name || "");
    setProds(ctx.products || "");
  }

  async function go(){
    setLoading(true); setOut(null);
    const al=Object.entries(assets).filter(([,v])=>v).map(([k])=>assetMap[k]).join(" · ");
    const playbookHint = playbook ? `\n\nHero products by conversion rate (prioritize these in shot direction): Whipped Soaps (16%), Jumbo Body Butter (13%), Essential Oil Bath Bombs (12%), Customizable Mix & Match Body Butter (8%), Sweet Indulgence Gift Set (7%), Face Cream (6.5%). Avoid featuring collection pages — send traffic to individual PDPs.` : "";
    const sys=`${BRAND_DNA.identity}\n\n${BRAND_DNA.photoDirection}\n\nGenerate a creative asset brief. Be specific, visual, actionable. No em-dashes.${playbookHint}`;
    const usr=`Generate a complete creative asset brief.\nCAMPAIGN: ${cname}\nPRODUCTS: ${prods}\nSHOT TYPE: ${shot}\nKEY MESSAGE: ${hook||"Ritual-forward, seasonal, self-care moment"}\nASSETS: ${al||"Email header, Meta square and story"}\n\nReturn EXACTLY:\nCAMPAIGN ASSET BRIEF\nCampaign: ${cname}\nDue Date: [fill in]\n\nKEY MESSAGE:\n[Single most important feeling. One sentence.]\n\nHERO PRODUCTS:\n[List with visual priority notes]\n\nSHOT DIRECTION:\n[3-4 specific, visual, actionable shot descriptions]\n\nCOLOR AND MOOD:\n[Brand colors + mood description]\n\nASSETS NEEDED:\n${al}\n\nCOPY OVERLAYS:\n[Headline, offer, CTA. Gelica for headlines, Museo Sans 700 ALL CAPS for callouts.]\n\nSALE PAGE ORDER (if applicable):\nHSL, Dry Body Oil, Round Bath Bomb at top\n\nREFERENCE AESTHETIC:\n[One benchmark brand matching the mood]\n\nNOTES:\n[Any flags or constraints]`;
    const res=await callClaude(sys,usr);
    setLoading(false); setOut(res);
  }

  function copy(k,t){navigator.clipboard.writeText(t);setCp(p=>({...p,[k]:true}));setTimeout(()=>setCp(p=>({...p,[k]:false})),2000);}

  return (
    <div>
      <p style={{fontSize:13.5,color:C.gray600,lineHeight:1.6,margin:"0 0 20px"}}>Generate a camera-ready asset brief. Includes shot direction, copy overlays, asset specs, and visual references.</p>
      <CtxBanner ctx={ctx} onFill={fillFromCtx} />
      <Field label="Campaign Name" value={cname} onChange={setCname} placeholder="e.g. Mother's Day Collection, Summer Body Care Launch"/>
      <Field label="Hero Products" value={prods} onChange={setProds} placeholder="e.g. Body Butter (BUTTER1002), Dry Body Oil, Round Bath Bombs" area/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
        <Dropdown label="Primary Shot Type" value={shot} onChange={setShot} opts={[{v:"lifestyle",l:"Joyful / Lifestyle"},{v:"ingredient",l:"Natural / Ingredient"},{v:"texture",l:"Product / Texture Close-Up"},{v:"onfigure",l:"On-Figure / In-Use"},{v:"mixed",l:"Mixed Campaign Suite"}]}/>
        <div style={{marginBottom:16}}>
          <label style={{display:"block",fontSize:12,fontWeight:700,color:C.gray600,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Assets Needed</label>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {Object.entries({emailHeader:"Email Header",saleBanner:"Sale Banner",metaSquare:"Meta 1:1",metaStory:"Meta 9:16",googleDisplay:"Google Display"}).map(([k,l])=>(
              <button key={k} onClick={()=>setAssets(p=>({...p,[k]:!p[k]}))} style={{padding:"5px 10px",borderRadius:6,fontSize:11.5,cursor:"pointer",border:`1.5px solid ${assets[k]?C.hotPink:C.gray200}`,background:assets[k]?C.blush:C.white,color:assets[k]?C.hotPink:C.gray600,fontWeight:assets[k]?700:500,transition:"all 0.15s"}}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <Field label="Key Message / Hook" value={hook} onChange={setHook} placeholder="e.g. The ritual of giving, body care as the gift she'll actually use..." area/>
      <Btn onClick={go} loading={loading} label="Generate Asset Brief"/>
      {out&&<div style={{marginTop:24}}><div style={{height:1,background:C.gray200,marginBottom:20}}/><Card label="Asset Brief" content={out} onCopy={()=>copy("brief",out)} copied={cp.brief}/></div>}
    </div>
  );
}

// ── VISUALS ───────────────────────────────────────────────────────────────────
function Visuals({ ctx }) {
  const [model,setModel]=useState("stability");
  const [keys,setKeys]=useState({stability:localStorage.getItem("stabilityKey")||"",dalle:localStorage.getItem("dalleKey")||"",fal:localStorage.getItem("falKey")||""});
  const [keysSet,setKeysSet]=useState({stability:!!localStorage.getItem("stabilityKey"),dalle:!!localStorage.getItem("dalleKey"),fal:!!localStorage.getItem("falKey")});
  const [keyInput,setKeyInput]=useState("");
  const [product,setProduct]=useState("");
  const [shot,setShot]=useState("lifestyle");
  const [mood,setMood]=useState("warm");
  const [season,setSeason]=useState("spring");
  const [ratio,setRatio]=useState("1:1");
  const [notes,setNotes]=useState("");
  const [genPrompt,setGenPrompt]=useState(false);
  const [genImg,setGenImg]=useState(false);
  const [prompt,setPrompt]=useState("");
  const [imgs,setImgs]=useState([]);
  const [err,setErr]=useState("");

  const modelCfg={
    stability:{label:"Stability AI",badge:"platform.stability.ai",placeholder:"sk-...",validate:k=>k.startsWith("sk-"),hint:"Get a free key at platform.stability.ai",lsKey:"stabilityKey"},
    dalle:{label:"DALL·E 3",badge:"platform.openai.com",placeholder:"sk-...",validate:k=>k.startsWith("sk-"),hint:"Get a key at platform.openai.com/api-keys",lsKey:"dalleKey"},
    fal:{label:"Flux Pro",badge:"fal.ai/dashboard",placeholder:"xxxxxxxx-xxxx:xxxx",validate:k=>k.length>20,hint:"Get a free key at fal.ai/dashboard",lsKey:"falKey"},
  };
  const mc=modelCfg[model];

  function fillFromCtx(){if(!ctx)return;setProduct(ctx.products||"");}

  function saveKey(){
    const k=keyInput.trim();
    if(!mc.validate(k)){setErr(`Invalid key format for ${mc.label}.`);return;}
    localStorage.setItem(mc.lsKey,k);
    setKeys(p=>({...p,[model]:k}));
    setKeysSet(p=>({...p,[model]:true}));
    setKeyInput("");setErr("");
  }

  function changeKey(){setKeysSet(p=>({...p,[model]:false}));setKeyInput(keys[model]||"");}

  const shots={
    lifestyle:"joyful lifestyle, person using product in a modern minimalist bathroom, natural window light, soft morning atmosphere, hands with pastel manicure, relaxed authentic pose, diverse skin tones",
    ingredient:"flat lay of natural botanical ingredients surrounding the product, clean white marble surface, soft natural side light, fresh flowers and herbs, clean and tactile, editorial",
    texture:"extreme macro close-up of product texture and cream, lather swirls, rich color and pigment, elegant detailed product hero shot, soft studio lighting",
    onfigure:"on-figure beauty shot close-up of hands applying product, relaxed hydrated skin, pastel manicure, diverse skin tone, soft natural light, modern minimalist bathroom",
    flatlay:"top-down flat lay product arrangement, cream background, subtle pink and blush props, soft natural window light, airy editorial beauty aesthetic",
  };
  const moods={
    warm:"warm golden tones, soft inviting morning ritual atmosphere",
    fresh:"crisp whites and creams, fresh energizing, bright natural light",
    luxe:"editorial luxury, high contrast, refined and sophisticated, Chanel-like restraint",
    playful:"vibrant and colorful, joyful energy, pops of pink and coral",
    summer:"sun-drenched warm light, golden hour glow, effortless summer skin care",
  };
  const ratioSizes={"1:1":{w:220,h:220},"4:5":{w:196,h:245},"9:16":{w:155,h:275},"16:9":{w:300,h:169},"3:2":{w:255,h:170}};

  async function go(){
    if(!keysSet[model]){setErr(`Enter your ${mc.label} API key first.`);return;}
    setErr("");setGenPrompt(true);setImgs([]);
    const isBathBomb = /bath.?bomb/i.test(product||"");
    const sys=`${BRAND_DNA.photoDirection}\n\n${isBathBomb?BRAND_DNA.bathBombPhysics+"\n\n":""}You generate precise AI image prompts for a premium handcrafted bath and body brand. Never include faces. Focus on hands, products, ingredients, lifestyle atmosphere. Always specify: lighting, setting, color palette, mood, camera style. Output prompts as comma-separated descriptors.${isBathBomb?" When the product is a bath bomb, always incorporate the fizzing physics and color dispersion language above into the prompt — this is critical for AI generators to render the fizzing action correctly.":""}`;
    const usr=`Generate an image prompt for Nectar Life.\nPRODUCT: ${product||"body care products"}\nSHOT TYPE: ${shot} — ${shots[shot]}\nMOOD: ${mood} — ${moods[mood]}\nSEASON: ${season}\nRATIO: ${ratio}\nNOTES: ${notes||"none"}\n\nReturn EXACTLY:\nIMAGE PROMPT:\n[80-150 words, comma-separated descriptors, end with style references]\n\nNEGATIVE PROMPT:\n[Things to exclude]`;
    const res=await callClaude(sys,usr);
    setGenPrompt(false);
    let p="";
    const pts=res.split(/\n(?=NEGATIVE PROMPT:)/);
    if(pts[0]) p=pts[0].replace("IMAGE PROMPT:","").trim();
    setPrompt(p);
    setGenImg(true);
    try{
      const ck=keys[model];
      let url;
      if(model==="stability") url=await generateImageStability(p,ck,ratio);
      else if(model==="dalle") url=await generateImageDalle(p,ck,ratio);
      else url=await generateImageFal(p,ck,ratio);
      setImgs(prev=>[{url,prompt:p,ratio,label:`${shot} / ${mood}`,model:mc.label},...prev]);
    }catch(e){setErr(`Image generation failed: ${e.message}`);}
    setGenImg(false);
  }

  async function regen(){
    if(!prompt||!keysSet[model])return;
    setGenImg(true);setErr("");
    try{
      const ck=keys[model];
      let url;
      if(model==="stability") url=await generateImageStability(prompt,ck,ratio);
      else if(model==="dalle") url=await generateImageDalle(prompt,ck,ratio);
      else url=await generateImageFal(prompt,ck,ratio);
      setImgs(prev=>[{url,prompt,ratio,label:`${shot} / ${mood}`,model:mc.label},...prev]);
    }catch(e){setErr(`Regeneration failed: ${e.message}`);}
    setGenImg(false);
  }

  const busy=genPrompt||genImg;
  const ratioSz=ratioSizes[ratio]||{w:220,h:220};

  return (
    <div>
      <p style={{fontSize:13.5,color:C.gray600,lineHeight:1.6,margin:"0 0 20px"}}>Generate real on-brand images using AI. Choose your model below. Every prompt is built from Nectar Life's photography direction.</p>

      <CtxBanner ctx={ctx} onFill={fillFromCtx} />

      {/* Model Selector */}
      <div style={{marginBottom:20}}>
        <label style={{display:"block",fontSize:12,fontWeight:700,color:C.gray600,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Image Model</label>
        <div style={{display:"flex",gap:8}}>
          {Object.entries(modelCfg).map(([k,v])=>(
            <button key={k} onClick={()=>{setModel(k);setErr("");}} style={{flex:1,padding:"10px 8px",borderRadius:9,border:`1.5px solid ${model===k?C.hotPink:C.gray200}`,background:model===k?C.blush:C.white,color:model===k?C.hotPink:C.gray600,fontSize:11.5,fontWeight:model===k?700:500,cursor:"pointer",transition:"all 0.15s",lineHeight:1.3,textAlign:"center",position:"relative"}}>
              <span style={{display:"block",fontWeight:700}}>{v.label}</span>
              <span style={{fontSize:9.5,color:model===k?C.coral:C.gray400,letterSpacing:"0.02em"}}>{v.badge}</span>
              {keysSet[k]&&<span style={{position:"absolute",top:5,right:7,width:6,height:6,borderRadius:"50%",background:"#34C759",display:"block"}}/>}
            </button>
          ))}
        </div>
      </div>

      {/* Key Entry */}
      {!keysSet[model]?(
        <div style={{background:C.blush,border:`1.5px solid ${C.primaryPink}`,borderRadius:12,padding:"18px 20px",marginBottom:24}}>
          <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:C.charcoal}}>{mc.label} API Key Required</p>
          <p style={{margin:"0 0 14px",fontSize:12.5,color:C.gray600,lineHeight:1.5}}>{mc.hint}. Stored only in this browser.</p>
          <div style={{display:"flex",gap:10}}>
            <input type="password" value={keyInput} onChange={e=>setKeyInput(e.target.value)} placeholder={mc.placeholder} onKeyDown={e=>e.key==="Enter"&&saveKey()} style={{flex:1,padding:"10px 12px",borderRadius:8,border:`1.5px solid ${C.gray200}`,fontSize:13.5,fontFamily:"inherit",outline:"none"}}/>
            <button onClick={saveKey} style={{padding:"10px 18px",borderRadius:8,background:C.hotPink,color:C.white,border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Save</button>
          </div>
          {err&&<p style={{margin:"8px 0 0",fontSize:12,color:"#C0392B"}}>{err}</p>}
        </div>
      ):(
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#F0FFF4",border:`1px solid #34C759`,borderRadius:8,marginBottom:20}}>
          <span style={{fontSize:12.5,color:"#1A7A35",fontWeight:600}}>{mc.label} connected</span>
          <button onClick={changeKey} style={{fontSize:11.5,color:C.gray600,background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>Change key</button>
        </div>
      )}

      <Field label="Product or Subject" value={product} onChange={setProduct} placeholder="e.g. Body Butter jar with dried florals, Bath Bombs stacked, Dry Body Oil bottle..."/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
        <Dropdown label="Shot Type" value={shot} onChange={setShot} opts={[{v:"lifestyle",l:"Joyful / Lifestyle"},{v:"ingredient",l:"Ingredient / Flat Lay"},{v:"texture",l:"Product / Texture Close-Up"},{v:"onfigure",l:"On-Figure / In-Use"},{v:"flatlay",l:"Top-Down Flat Lay"}]}/>
        <Dropdown label="Mood" value={mood} onChange={setMood} opts={[{v:"warm",l:"Warm & Ritual"},{v:"fresh",l:"Clean & Fresh"},{v:"luxe",l:"Editorial Luxe"},{v:"playful",l:"Playful & Vibrant"},{v:"summer",l:"Summer Glow"}]}/>
        <Dropdown label="Season / Context" value={season} onChange={setSeason} opts={[{v:"spring",l:"Spring / Easter"},{v:"summer",l:"Summer"},{v:"fall",l:"Fall"},{v:"holiday",l:"Holiday / Gift"},{v:"mothers_day",l:"Mother's Day"},{v:"evergreen",l:"Evergreen"}]}/>
        <Dropdown label="Aspect Ratio" value={ratio} onChange={setRatio} opts={[{v:"1:1",l:"1:1 — Meta / Feed"},{v:"4:5",l:"4:5 — Instagram Portrait"},{v:"9:16",l:"9:16 — Stories / Reels"},{v:"16:9",l:"16:9 — Email Header"},{v:"3:2",l:"3:2 — Landscape"}]}/>
      </div>
      <Field label="Custom Notes" value={notes} onChange={setNotes} placeholder="e.g. dried rose petals, coral and blush palette, spring garden setting..." area/>
      <Btn onClick={go} loading={busy} disabled={!keysSet[model]} label={genPrompt?"Crafting prompt...":genImg?"Generating image...":"Generate Image"}/>

      {err&&!busy&&<p style={{margin:"12px 0 0",fontSize:12.5,color:"#C0392B",fontWeight:600}}>{err}</p>}

      {prompt&&(
        <div style={{marginTop:16}}>
          <div style={{padding:"12px 14px",background:C.cream,borderRadius:8,border:`1px solid ${C.gray200}`,marginBottom:8}}>
            <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,color:C.gray600,letterSpacing:"0.06em",textTransform:"uppercase"}}>Generated Image Prompt</p>
            <p style={{margin:0,fontSize:11.5,color:C.gray400}}>Edit below and regenerate, or copy for use in other tools.</p>
          </div>
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={4} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:`1.5px solid ${C.gray200}`,fontSize:12.5,color:C.charcoal,resize:"vertical",fontFamily:"inherit",background:C.white,boxSizing:"border-box",outline:"none",lineHeight:1.5,marginBottom:8}}/>
          <button onClick={regen} disabled={genImg} style={{padding:"9px 18px",borderRadius:8,background:genImg?C.gray200:C.blush,color:genImg?C.gray400:C.hotPink,border:`1.5px solid ${genImg?C.gray200:C.primaryPink}`,fontSize:13,fontWeight:700,cursor:genImg?"not-allowed":"pointer",fontFamily:"inherit"}}>
            {genImg?"Generating...":"Regenerate with Edited Prompt"}
          </button>
        </div>
      )}

      {imgs.length>0&&(
        <div style={{marginTop:24}}>
          <div style={{height:1,background:C.gray200,marginBottom:20}}/>
          <p style={{margin:"0 0 16px",fontSize:12,fontWeight:700,color:C.gray600,letterSpacing:"0.06em",textTransform:"uppercase"}}>Generated Images</p>
          {imgs.map((img,i)=>{
            const d=ratioSizes[img.ratio]||{w:220,h:220};
            return (
              <div key={i} style={{background:C.white,border:`1px solid ${C.gray200}`,borderRadius:12,overflow:"hidden",marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",background:C.cream,borderBottom:`1px solid ${C.gray200}`}}>
                  <span style={{fontSize:11,fontWeight:700,color:C.gray600,letterSpacing:"0.06em",textTransform:"uppercase"}}>{img.label} · {img.ratio} · {img.model||"Stability AI"}</span>
                  <a href={img.url} download={`nectar-${i}.jpg`} target="_blank" rel="noreferrer" style={{fontSize:11.5,fontWeight:700,color:C.hotPink,textDecoration:"none",padding:"4px 10px",borderRadius:6,border:`1px solid ${C.primaryPink}`,background:C.blush}}>Download</a>
                </div>
                <div style={{padding:20,display:"flex",justifyContent:"center",background:C.gray100}}>
                  <img src={img.url} alt={img.label} style={{width:d.w*1.4,height:d.h*1.4,objectFit:"cover",borderRadius:8,display:"block",boxShadow:"0 4px 20px rgba(0,0,0,0.10)"}}/>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── ANALYTICS ─────────────────────────────────────────────────────────────────

const AN = {
  spend:   { color:"#2563EB", bg:"#EFF6FF" },
  roas:    { color:"#16A34A", bg:"#F0FDF4" },
  ctr:     { color:"#D97706", bg:"#FFFBEB" },
  purchase:{ color:"#0891B2", bg:"#ECFEFF" },
  impr:    { color:"#7C3AED", bg:"#F5F3FF" },
  reach:   { color:"#DB2777", bg:"#FDF2F8" },
  email:   { color:"#EA4C89", bg:"#FFF0F6" },
  click:   { color:"#D97706", bg:"#FFFBEB" },
  sms:     { color:"#0891B2", bg:"#ECFEFF" },
};

// Benchmarks: { good, great, label }
const BENCH = {
  roas:       { great:3,    good:2,    bad:1,    fmt:v=>parseFloat(v),  hint:"Good ≥ 2x · Great ≥ 3x" },
  ctr:        { great:2,    good:1,    bad:0.5,  fmt:v=>parseFloat(v),  hint:"Good ≥ 1% · Great ≥ 2%" },
  open_rate:  { great:0.35, good:0.25, bad:0.15, fmt:v=>parseFloat(v),  hint:"Good ≥ 25% · Great ≥ 35%" },
  click_rate: { great:0.05, good:0.03, bad:0.01, fmt:v=>parseFloat(v),  hint:"Good ≥ 3% · Great ≥ 5%" },
};

function getBenchStatus(metricKey, rawValue) {
  const b = BENCH[metricKey];
  if (!b || rawValue == null) return null;
  const v = b.fmt(rawValue);
  if (v >= b.great) return "great";
  if (v >= b.good)  return "good";
  if (v < b.bad)    return "low";
  return "ok";
}

const STATUS_STYLE = {
  great: { bg:"#F0FDF4", color:"#15803D", label:"Great" },
  good:  { bg:"#F0FDF4", color:"#16A34A", label:"Good"  },
  ok:    { bg:"#FFFBEB", color:"#B45309", label:"OK"    },
  low:   { bg:"#FEF2F2", color:"#DC2626", label:"Low"   },
};

function KpiCard({ label, value, scheme, loading, benchKey, rawValue }) {
  const s = AN[scheme]||{color:C.hotPink,bg:C.blush};
  const status = benchKey ? getBenchStatus(benchKey, rawValue) : null;
  const ss = status ? STATUS_STYLE[status] : null;
  return (
    <div style={{background:C.white,borderRadius:10,border:`1px solid ${C.gray200}`,padding:"14px 16px",flex:"1 1 100px",minWidth:0}}>
      <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:8}}>
        <span style={{width:8,height:8,borderRadius:2,background:s.color,display:"inline-block",flexShrink:0}}/>
        <span style={{fontSize:10,color:C.gray600,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap"}}>{label}</span>
      </div>
      {loading
        ? <div style={{height:26,width:60,background:C.gray200,borderRadius:4,animation:"pulse 1.2s ease-in-out infinite"}}/>
        : <p style={{margin:"0 0 6px",fontSize:22,fontWeight:700,color:"#111827",fontFamily:"system-ui,-apple-system,sans-serif",lineHeight:1}}>{value||"—"}</p>
      }
      {ss
        ? <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4,background:ss.bg,color:ss.color}}>{ss.label} · {BENCH[benchKey]?.hint}</span>
        : <span style={{fontSize:10,color:"transparent"}}>·</span>
      }
    </div>
  );
}

function SectionHeader({ title, sub, connected, loading, onRefresh }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
      <div>
        <span style={{fontSize:14,fontWeight:700,color:C.charcoal}}>{title}</span>
        <span style={{fontSize:11.5,color:C.gray400,marginLeft:8}}>{sub}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{width:7,height:7,borderRadius:"50%",background:connected?"#16A34A":C.gray400,display:"inline-block"}}/>
        <span style={{fontSize:11,color:connected?"#16A34A":C.gray400}}>{connected?"Connected":"Not connected"}</span>
        {connected&&<button onClick={onRefresh} disabled={loading} style={{padding:"4px 12px",borderRadius:6,border:`1px solid ${C.gray200}`,background:C.white,fontSize:11,fontWeight:600,color:loading?C.gray400:C.charcoal,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit"}}>{loading?"Loading...":"Refresh"}</button>}
      </div>
    </div>
  );
}

// ── LAUNCH ────────────────────────────────────────────────────────────────────
function Launch({ playbook }) {
  const STEPS = ["Brief", "Copy", "UTMs", "Handoff"];
  const [step, setStep] = useState(0);

  // Step 0 – Brief
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("conversions");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [landingPage, setLandingPage] = useState("https://nectarusa.com");
  const [audience, setAudience] = useState("tof_broad");
  const [products, setProducts] = useState("");
  const [mechanic, setMechanic] = useState("");
  const [channels, setChannels] = useState({ email: true, sms: false, meta: false });
  const [notes, setNotes] = useState("");

  // Step 1 – Copy
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState(null);
  const [editedCopy, setEditedCopy] = useState({});

  // Step 2 – UTMs
  const [utms, setUtms] = useState(null);
  const [cpd, setCpd] = useState({});

  // Step 3 – Handoff
  const [checks, setChecks] = useState({});
  const [exported, setExported] = useState(false);

  const AUDIENCES = [
    { v:"tof_broad",      l:"TOF Broad",      desc:"Cold audience, Advantage+ enabled" },
    { v:"retargeting",    l:"Retargeting",     desc:"Site visitors + social engagers (30d)" },
    { v:"lookalike",      l:"Lookalike",       desc:"1–3% LAL from purchasers" },
    { v:"super_engaged",  l:"Super Engaged",   desc:"Klaviyo top segment (~2k)" },
    { v:"engaged_180",    l:"Engaged 180",     desc:"Klaviyo 180-day engaged (~12k)" },
    { v:"all_list",       l:"Full List",       desc:"Major sends only — all email / SMS" },
  ];

  const CHECKLIST = [
    { k:"lp",     l:"Landing page is live and loads correctly" },
    { k:"copy",   l:"Campaign copy reviewed and approved" },
    { k:"utms",   l:"UTM links tested and working" },
    { k:"pixel",  l:"Pixel firing on landing page (Meta only)" },
    { k:"budget", l:"Budget confirmed and approved" },
    { k:"dates",  l:"Campaign start / end dates confirmed" },
    { k:"assets", l:"Creative assets ready and delivered" },
    { k:"seg",    l:"Segmentation set up in Klaviyo (email / SMS)" },
  ];

  async function generateCopy() {
    setLoadingCopy(true); setGeneratedCopy(null);
    const chl = Object.entries(channels).filter(([,v])=>v).map(([k])=>k).join(", ");
    const aud = AUDIENCES.find(a=>a.v===audience);
    const playbookCtx = playbook ? `\n\nPERFORMANCE PLAYBOOK (use to inform decisions):\n${playbook.slice(0,2000)}` : "";
    const sys = `${BRAND_DNA.identity}\n\nGenerate campaign copy. Lead with ritual/ingredient stories, never the discount. Warmth over urgency. No em-dashes.${playbookCtx}`;
    const usr = `Generate all campaign outputs for this brief:\nCAMPAIGN: ${name}\nMECHANIC: ${mechanic||"none"}\nPRODUCTS: ${products}\nOBJECTIVE: ${objective}\nAUDIENCE: ${aud?.l} — ${aud?.desc}\nCHANNELS: ${chl}\n\nReturn EXACTLY:\n\n— DESIGNED EMAIL —\n\nSUBJECT LINE OPTIONS:\n1. [option]\n2. [option]\n3. [option]\n\nPREVIEW TEXT:\n[under 90 chars]\n\nTOP BAR:\n[short offer line + free shipping threshold, e.g. "B2G1 This Weekend + FREE Shipping Orders $40+"]\n\nSMALL LABEL:\n[collection or category name in caps, e.g. "THE SPRING COLLECTION"]\n\nHERO HEADLINE:\n[big serif headline, 3-5 words, feeling-first]\n\nHERO SUBHEADLINE:\n[1-2 supporting sentences, ritual-forward, no em-dashes]\n\nHERO CTA:\n[button text, ALL CAPS, 2-4 words]\n\nBADGE:\n[e.g. "LIMITED EDITION!" or "SAVE $18" — write "None" if not applicable]\n\nSECTION HEADLINE:\n[warm section title, e.g. "Refresh & Bloom"]\n\nPRODUCT TILES:\n[list each featured product on its own line as: Product Name → SHOP NOW]\n\n— PLAIN TEXT RESEND —\n\nRESEND SUBJECT LINE OPTIONS:\n1. [option]\n2. [option]\n3. [option]\n\nRESEND BODY:\nHi [Name],\n[80-100 words, conversational, from Kelsey, different angle — urgency or personal, no design needed]\nXO,\nKelsey\n\n— SMS —\n\nSMS OPTION 1:\n[under 160 chars]\n\nSMS OPTION 2:\n[under 160 chars]\n\n— META ADS —\n\nMETA AD HEADLINES:\n1. [headline]\n2. [headline]\n3. [headline]\n\nAD BODY COPY:\n[2-3 sentences, mobile-first]\n\nCTA BUTTON TEXT:\n[ALL CAPS, 2-4 words]`;
    const res = await callClaude(sys, usr);
    setLoadingCopy(false);
    const keys = ["SUBJECT LINE OPTIONS:","PREVIEW TEXT:","TOP BAR:","SMALL LABEL:","HERO HEADLINE:","HERO SUBHEADLINE:","HERO CTA:","BADGE:","SECTION HEADLINE:","PRODUCT TILES:","RESEND SUBJECT LINE OPTIONS:","RESEND BODY:","SMS OPTION 1:","SMS OPTION 2:","META AD HEADLINES:","AD BODY COPY:","CTA BUTTON TEXT:"];
    const s = {};
    for (let i=0; i<keys.length; i++) {
      const k=keys[i], nk=keys[i+1], st=res.indexOf(k);
      if (st===-1) continue;
      const en = nk ? res.indexOf(nk) : res.length;
      s[k] = res.slice(st+k.length, en!==-1?en:undefined).trim();
    }
    const parsed = Object.keys(s).length>0 ? s : { raw:res };
    setGeneratedCopy(parsed);
    setEditedCopy({ ...parsed });
  }

  function buildUtms() {
    const date = startDate ? new Date(startDate+"T12:00:00") : new Date();
    const month = date.toLocaleString("en-US",{month:"long"}).toLowerCase();
    const year = date.getFullYear();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
    const camp = `nectar-${month}-${year}-${objective}`;
    const base = landingPage || "https://nectarusa.com";
    const result = {};
    if (channels.meta)  result.meta  = { label:"Meta Ads", source:"meta",    medium:"paid_social", campaign:camp, content:`v1-tof-${slug}`, url:`${base}?utm_source=meta&utm_medium=paid_social&utm_campaign=${camp}&utm_content=v1-tof-${slug}` };
    if (channels.email) result.email = { label:"Email",    source:"klaviyo", medium:"email",       campaign:camp, content:slug,           url:`${base}?utm_source=klaviyo&utm_medium=email&utm_campaign=${camp}&utm_content=${slug}` };
    if (channels.sms)   result.sms   = { label:"SMS",      source:"klaviyo", medium:"sms",         campaign:camp, content:slug,           url:`${base}?utm_source=klaviyo&utm_medium=sms&utm_campaign=${camp}&utm_content=${slug}` };
    setUtms(result);
  }

  function cp(k, text) {
    navigator.clipboard.writeText(text);
    setCpd(p=>({...p,[k]:true}));
    setTimeout(()=>setCpd(p=>({...p,[k]:false})),2000);
  }

  function buildHandoffDoc() {
    const aud = AUDIENCES.find(a=>a.v===audience);
    const lines = [
      `NECTAR LIFE — ${(name||"CAMPAIGN").toUpperCase()} CAMPAIGN BRIEF`,
      `Generated: ${new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}`,
      "═".repeat(56), "",
      "OVERVIEW",
      "─".repeat(24),
      `Campaign:    ${name}`,
      `Objective:   ${objective}`,
      `Budget:      $${budget}/day`,
      `Dates:       ${startDate||"TBD"} → ${endDate||"TBD"}`,
      `Audience:    ${aud?.l} — ${aud?.desc}`,
      `Channels:    ${Object.entries(channels).filter(([,v])=>v).map(([k])=>k.toUpperCase()).join(", ")}`,
      `Products:    ${products}`,
      `Mechanic:    ${mechanic||"None"}`,
      `Landing Page: ${landingPage}`,
      notes ? `Notes:       ${notes}` : "",
      "",
      "COPY ASSETS",
      "─".repeat(24),
    ];
    if (editedCopy?.raw) {
      lines.push(editedCopy.raw);
    } else {
      Object.entries(editedCopy||{}).forEach(([k,v])=>{ lines.push(k.trim()); lines.push(v); lines.push(""); });
    }
    if (utms && Object.keys(utms).length) {
      lines.push("", "TRACKING / UTM URLS", "─".repeat(24));
      Object.values(utms).forEach(u=>{ lines.push(`${u.label}:`); lines.push(u.url); lines.push(""); });
    }
    lines.push("", "ASSET SPECS NEEDED", "─".repeat(24));
    if (channels.meta)  lines.push("Meta Ads:", "  • Reel / Story: 1080 × 1920px (9:16) — video preferred, max 60s", "  • Feed:          1080 × 1080px (1:1)", "  • Landscape:     1920 × 1080px (16:9)", "");
    if (channels.email) lines.push("Email:", "  • Header image: 600px wide, 2:1 ratio, JPG or PNG", "");
    if (channels.sms)   lines.push("SMS:", "  • No image required — link only", "");
    return lines.filter(l=>l!==undefined).join("\n");
  }

  function exportHandoff() {
    downloadText(`${(name||"campaign").toLowerCase().replace(/\s+/g,"-")}-brief.txt`, buildHandoffDoc());
    setExported(true);
    setTimeout(()=>setExported(false), 3000);
  }

  const allChecked = CHECKLIST.every(c=>checks[c.k]);

  // ── STEP INDICATOR ──────────────────────────────────────────────────────────
  function StepBar() {
    return (
      <div style={{display:"flex",alignItems:"center",marginBottom:28}}>
        {STEPS.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",flex:i<STEPS.length-1?1:"none"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div onClick={()=>{ if(i<step) setStep(i); }} style={{width:28,height:28,borderRadius:"50%",background:i<=step?C.hotPink:C.gray200,color:i<=step?C.white:C.gray400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,cursor:i<step?"pointer":"default",transition:"all 0.2s",flexShrink:0}}>
                {i<step ? "✓" : i+1}
              </div>
              <span style={{fontSize:10,fontWeight:i===step?700:500,color:i===step?C.hotPink:C.gray400,whiteSpace:"nowrap",letterSpacing:"0.04em"}}>{s}</span>
            </div>
            {i<STEPS.length-1 && <div style={{flex:1,height:2,background:i<step?C.hotPink:C.gray200,margin:"0 6px",marginBottom:16,transition:"background 0.3s"}}/>}
          </div>
        ))}
      </div>
    );
  }

  // ── NAV BUTTONS ─────────────────────────────────────────────────────────────
  function Nav({ onNext, nextLabel="Next →", nextDisabled=false, onBack=true }) {
    return (
      <div style={{display:"flex",gap:10,marginTop:24}}>
        {step>0 && onBack && (
          <button onClick={()=>setStep(s=>s-1)} style={{padding:"11px 20px",borderRadius:10,border:`1.5px solid ${C.gray200}`,background:C.white,color:C.gray600,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
        )}
        <button onClick={onNext} disabled={nextDisabled} style={{flex:1,padding:"13px 20px",borderRadius:10,border:"none",background:nextDisabled?C.gray200:`linear-gradient(135deg,${C.hotPink},${C.coral})`,color:nextDisabled?C.gray400:C.white,fontSize:13,fontWeight:700,cursor:nextDisabled?"not-allowed":"pointer",transition:"all 0.2s",boxShadow:nextDisabled?"none":`0 4px 16px ${C.hotPink}40`,fontFamily:"inherit"}}>{nextLabel}</button>
      </div>
    );
  }

  // ── STEP 0: BRIEF ───────────────────────────────────────────────────────────
  if (step===0) return (
    <div>
      <StepBar/>
      <Field label="Campaign Name" value={name} onChange={setName} placeholder="e.g. Easter Sale B2G1, Spring Collection Launch"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
        <Dropdown label="Objective" value={objective} onChange={setObjective} opts={[{v:"conversions",l:"Conversions"},{v:"traffic",l:"Traffic"},{v:"awareness",l:"Awareness"},{v:"retention",l:"Re-engagement"},{v:"acquisition",l:"New Customers"}]}/>
        <Field label="Daily Budget ($)" value={budget} onChange={setBudget} placeholder="e.g. 50"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
        <Field label="Start Date" value={startDate} onChange={setStartDate} placeholder="YYYY-MM-DD"/>
        <Field label="End Date" value={endDate} onChange={setEndDate} placeholder="YYYY-MM-DD"/>
      </div>
      <Field label="Landing Page URL" value={landingPage} onChange={setLandingPage} placeholder="https://nectarusa.com/products/..."/>
      <div style={{marginBottom:16}}>
        <label style={{display:"block",fontSize:12,fontWeight:700,color:C.gray600,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Audience</label>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {AUDIENCES.map(a=>(
            <button key={a.v} onClick={()=>setAudience(a.v)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:9,border:`1.5px solid ${audience===a.v?C.hotPink:C.gray200}`,background:audience===a.v?C.blush:C.white,cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
              <div style={{width:14,height:14,borderRadius:"50%",border:`2px solid ${audience===a.v?C.hotPink:C.gray400}`,background:audience===a.v?C.hotPink:"transparent",flexShrink:0,transition:"all 0.15s"}}/>
              <div>
                <span style={{fontSize:12.5,fontWeight:700,color:audience===a.v?C.hotPink:C.charcoal}}>{a.l}</span>
                <span style={{fontSize:11.5,color:C.gray400,marginLeft:8}}>{a.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Field label="Featured Products" value={products} onChange={setProducts} placeholder="e.g. Jumbo Body Butter, Whipped Soap, Essential Oil Bath Bombs" area/>
      <Field label="Promo Mechanic" value={mechanic} onChange={setMechanic} placeholder="e.g. B2G1 small soaps, no discount, 20% off body care"/>
      <div style={{marginBottom:16}}>
        <label style={{display:"block",fontSize:12,fontWeight:700,color:C.gray600,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Channels</label>
        <div style={{display:"flex",gap:8}}>
          {[["email","Email"],["sms","SMS"],["meta","Meta Ads"]].map(([k,l])=>(
            <button key={k} onClick={()=>setChannels(p=>({...p,[k]:!p[k]}))} style={{padding:"8px 14px",borderRadius:8,fontSize:12.5,cursor:"pointer",border:`1.5px solid ${channels[k]?C.hotPink:C.gray200}`,background:channels[k]?C.blush:C.white,color:channels[k]?C.hotPink:C.gray600,fontWeight:channels[k]?700:500,transition:"all 0.15s",fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>
      </div>
      <Field label="Notes for Agency" value={notes} onChange={setNotes} placeholder="Any special instructions, deadlines, or context..." area/>
      <Nav onNext={()=>{ generateCopy(); setStep(1); }} nextLabel="Generate Copy →" nextDisabled={!name||!products}/>
    </div>
  );

  // ── STEP 1: COPY ────────────────────────────────────────────────────────────
  if (step===1) return (
    <div>
      <StepBar/>
      {loadingCopy ? (
        <div style={{textAlign:"center",padding:"60px 0"}}>
          <Dots/>
          <p style={{marginTop:14,fontSize:13,color:C.gray400}}>Writing campaign copy...</p>
        </div>
      ) : generatedCopy ? (
        <div>
          <p style={{fontSize:12.5,color:C.gray400,marginBottom:16}}>All copy is editable — click any field to adjust before moving on.</p>
          {generatedCopy.raw ? (
            <div>
              <textarea value={editedCopy.raw||""} onChange={e=>setEditedCopy({raw:e.target.value})} style={{width:"100%",minHeight:320,padding:"14px",borderRadius:10,border:`1.5px solid ${C.gray200}`,fontSize:13,lineHeight:1.6,fontFamily:"inherit",color:C.charcoal,background:C.white,boxSizing:"border-box",resize:"vertical",outline:"none"}}/>
            </div>
          ) : (
            Object.entries(editedCopy).map(([k,v])=>(
              <div key={k} style={{background:C.white,border:`1px solid ${C.gray200}`,borderRadius:12,overflow:"hidden",marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 14px",background:C.cream,borderBottom:`1px solid ${C.gray200}`}}>
                  <span style={{fontSize:10.5,fontWeight:700,color:C.gray600,letterSpacing:"0.07em",textTransform:"uppercase"}}>{k.replace(/[:()\n]/g," ").replace(/\s+/g," ").trim()}</span>
                  <button onClick={()=>cp(k,v)} style={{fontSize:11,padding:"3px 9px",borderRadius:6,border:`1px solid ${cpd[k]?C.hotPink:C.gray400}`,background:cpd[k]?C.blush:C.white,color:cpd[k]?C.hotPink:C.gray600,cursor:"pointer",fontFamily:"inherit"}}>{cpd[k]?"Copied!":"Copy"}</button>
                </div>
                <textarea value={v} onChange={e=>setEditedCopy(p=>({...p,[k]:e.target.value}))} style={{width:"100%",minHeight:72,padding:"12px 14px",fontSize:13,lineHeight:1.6,color:C.charcoal,border:"none",background:C.white,resize:"vertical",fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
              </div>
            ))
          )}
          <Nav onNext={()=>{ buildUtms(); setStep(2); }} nextLabel="Generate UTMs →"/>
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"40px 0"}}>
          <p style={{color:C.gray400,fontSize:13}}>Something went wrong. <button onClick={()=>{ generateCopy(); }} style={{color:C.hotPink,background:"none",border:"none",cursor:"pointer",fontSize:13,fontFamily:"inherit",textDecoration:"underline"}}>Try again</button></p>
          <Nav onNext={()=>setStep(0)} nextLabel="← Back to Brief" onBack={false}/>
        </div>
      )}
    </div>
  );

  // ── STEP 2: UTMS ────────────────────────────────────────────────────────────
  if (step===2) return (
    <div>
      <StepBar/>
      {utms && Object.keys(utms).length>0 ? (
        <div>
          <p style={{fontSize:12.5,color:C.gray400,marginBottom:16}}>Generated from your brief. Copy each URL and paste into your platform.</p>
          {Object.values(utms).map(u=>(
            <div key={u.label} style={{background:C.white,border:`1px solid ${C.gray200}`,borderRadius:12,padding:"14px 16px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:11,fontWeight:700,color:C.hotPink,letterSpacing:"0.07em",textTransform:"uppercase"}}>{u.label}</span>
                <button onClick={()=>cp(u.label,u.url)} style={{fontSize:11,padding:"3px 9px",borderRadius:6,border:`1px solid ${cpd[u.label]?C.hotPink:C.gray400}`,background:cpd[u.label]?C.blush:C.white,color:cpd[u.label]?C.hotPink:C.gray600,cursor:"pointer",fontFamily:"inherit"}}>{cpd[u.label]?"Copied!":"Copy URL"}</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 16px",marginBottom:10}}>
                {[["Source",u.source],["Medium",u.medium],["Campaign",u.campaign],["Content",u.content]].map(([l,v])=>(
                  <div key={l}>
                    <span style={{fontSize:10,color:C.gray400,textTransform:"uppercase",letterSpacing:"0.05em"}}>{l}: </span>
                    <span style={{fontSize:11,color:C.charcoal,fontWeight:600}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:C.gray100,borderRadius:7,padding:"8px 10px",wordBreak:"break-all"}}>
                <span style={{fontSize:11,color:C.gray600,fontFamily:"monospace"}}>{u.url}</span>
              </div>
            </div>
          ))}
          {channels.meta && (
            <div style={{background:C.blush,border:`1px solid ${C.primaryPink}`,borderRadius:10,padding:"12px 14px",marginTop:4}}>
              <p style={{margin:"0 0 6px",fontSize:11,fontWeight:700,color:C.hotPink,textTransform:"uppercase",letterSpacing:"0.06em"}}>Asset Specs Needed — Meta Ads</p>
              <p style={{margin:"2px 0",fontSize:12,color:C.charcoal}}>• Reel / Story: <strong>1080 × 1920px</strong> (9:16) — video preferred, max 60s</p>
              <p style={{margin:"2px 0",fontSize:12,color:C.charcoal}}>• Feed Square: <strong>1080 × 1080px</strong> (1:1)</p>
              <p style={{margin:"2px 0",fontSize:12,color:C.charcoal}}>• Landscape: <strong>1920 × 1080px</strong> (16:9)</p>
            </div>
          )}
          {channels.email && (
            <div style={{background:C.blush,border:`1px solid ${C.primaryPink}`,borderRadius:10,padding:"12px 14px",marginTop:8}}>
              <p style={{margin:"0 0 6px",fontSize:11,fontWeight:700,color:C.hotPink,textTransform:"uppercase",letterSpacing:"0.06em"}}>Asset Specs Needed — Email</p>
              <p style={{margin:"2px 0",fontSize:12,color:C.charcoal}}>• Header image: <strong>600px wide</strong>, 2:1 ratio, JPG or PNG</p>
            </div>
          )}
        </div>
      ) : (
        <p style={{color:C.gray400,fontSize:13}}>No UTMs generated yet.</p>
      )}
      <Nav onNext={()=>setStep(3)} nextLabel="Pre-Flight Checklist →"/>
    </div>
  );

  // ── STEP 3: HANDOFF ─────────────────────────────────────────────────────────
  return (
    <div>
      <StepBar/>
      <p style={{fontSize:12.5,color:C.gray400,marginBottom:16}}>Check everything off before sending to the agency.</p>
      <div style={{marginBottom:20}}>
        {CHECKLIST.map(c=>(
          <button key={c.k} onClick={()=>setChecks(p=>({...p,[c.k]:!p[c.k]}))} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:9,border:`1.5px solid ${checks[c.k]?C.hotPink:C.gray200}`,background:checks[c.k]?C.blush:C.white,marginBottom:6,cursor:"pointer",textAlign:"left",transition:"all 0.15s",fontFamily:"inherit"}}>
            <div style={{width:18,height:18,borderRadius:5,border:`2px solid ${checks[c.k]?C.hotPink:C.gray400}`,background:checks[c.k]?C.hotPink:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
              {checks[c.k]&&<span style={{color:C.white,fontSize:11,fontWeight:700,lineHeight:1}}>✓</span>}
            </div>
            <span style={{fontSize:13,color:checks[c.k]?C.hotPink:C.charcoal,fontWeight:checks[c.k]?600:400}}>{c.l}</span>
          </button>
        ))}
      </div>
      {allChecked && (
        <div style={{background:"#F0FDF4",border:"1.5px solid #16A34A",borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:16}}>✅</span>
          <span style={{fontSize:13,color:"#15803D",fontWeight:600}}>All clear — ready to hand off</span>
        </div>
      )}
      <div style={{display:"flex",gap:8,marginBottom:8}}>
        <button onClick={exportHandoff} style={{flex:1,padding:"12px 16px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${C.hotPink},${C.coral})`,color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 4px 16px ${C.hotPink}40`}}>
          {exported ? "✓ Exported!" : "⬇ Export Brief (.txt)"}
        </button>
        <button onClick={()=>{ navigator.clipboard.writeText(buildHandoffDoc()); cp("all",""); }} style={{padding:"12px 16px",borderRadius:10,border:`1.5px solid ${C.hotPink}`,background:C.blush,color:C.hotPink,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
          {cpd[""]?"Copied!":"Copy All"}
        </button>
      </div>
      <button onClick={()=>setStep(0)} style={{width:"100%",padding:"10px",borderRadius:10,border:`1.5px solid ${C.gray200}`,background:C.white,color:C.gray400,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginTop:4}}>Start New Campaign</button>
    </div>
  );
}

function CampaignTable({ columns, rows }) {
  if (!rows||!rows.length) return null;
  return (
    <div style={{overflowX:"auto",marginTop:14}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:"system-ui,-apple-system,sans-serif"}}>
        <thead>
          <tr style={{borderBottom:`2px solid ${C.gray200}`}}>
            <th style={{textAlign:"left",padding:"8px 10px",fontSize:10,fontWeight:700,color:C.gray600,letterSpacing:"0.05em",textTransform:"uppercase",whiteSpace:"nowrap"}}>Campaign</th>
            {columns.map(col=>(
              <th key={col.key} style={{textAlign:"right",padding:"8px 10px",fontSize:10,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",whiteSpace:"nowrap",color:AN[col.scheme]?.color||C.gray600}}>
                <span style={{display:"inline-flex",alignItems:"center",gap:4}}>
                  <span style={{width:6,height:6,borderRadius:1,background:AN[col.scheme]?.color||C.gray400,display:"inline-block"}}/>
                  {col.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row,i)=>(
            <tr key={i} style={{borderBottom:`1px solid ${C.gray200}`,background:i%2===0?C.white:"#FAFAF9"}}>
              <td style={{padding:"10px 10px",color:C.charcoal,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{row.name||"(unnamed)"}</td>
              {columns.map(col=>{
                const val = row[col.key];
                const s = AN[col.scheme]||{};
                const hi = col.highlight && val && col.highlight(row);
                return (
                  <td key={col.key} style={{textAlign:"right",padding:"10px 10px",fontWeight:600,whiteSpace:"nowrap",background:hi?s.bg:"transparent",color:hi?s.color:C.charcoal,borderRadius:hi?4:0}}>
                    {val||"—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Analytics({ playbook, savePlaybook }) {
  const RANGES = { "7d":{ meta:"last_7d", kl:"last_7_days" }, "30d":{ meta:"last_30d", kl:"last_30_days" }, "90d":{ meta:"last_90d", kl:"last_90_days" } };
  const [range,setRange] = useState("30d");
  const [showSetup,setShowSetup] = useState(false);
  const [cfg,setCfg] = useState({
    metaToken: localStorage.getItem("anaMetaToken")||"",
    metaAccountId: localStorage.getItem("anaMetaAccId")||"",
    klaviyoKey: localStorage.getItem("anaKlaviyoKey")||"",
  });
  const [metaData,setMetaData] = useState(null);
  const [emailData,setEmailData] = useState(null);
  const [smsData,setSmsData] = useState(null);
  const [loading,setLoading] = useState({meta:false,email:false,sms:false});
  const [errors,setErrors] = useState({});
  const [insights,setInsights] = useState("");
  const [loadingInsights,setLoadingInsights] = useState(false);

  const [extending,setExtending] = useState(false);
  const [extendMsg,setExtendMsg] = useState("");
  const [updatingPlaybook,setUpdatingPlaybook] = useState(false);

  const metaConnected = !!(cfg.metaToken && cfg.metaAccountId);
  const klConnected = !!cfg.klaviyoKey;

  function saveCfg(k,v) {
    const storageKey = k==="metaToken"?"anaMetaToken":k==="metaAccountId"?"anaMetaAccId":k==="metaTokenExpiry"?"anaMetaTokenExpiry":"anaKlaviyoKey";
    localStorage.setItem(storageKey,v);
    setCfg(p=>({...p,[k]:v}));
  }

  async function extendMetaToken() {
    if (!cfg.metaToken) return;
    setExtending(true); setExtendMsg("");
    try {
      const r = await fetch("/api/meta-refresh-token",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ token:cfg.metaToken }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      saveCfg("metaToken", d.access_token);
      const expiry = d.expires_in ? Date.now() + d.expires_in*1000 : null;
      if (expiry) { saveCfg("metaTokenExpiry", String(expiry)); }
      setExtendMsg("Token extended to 60 days and saved.");
    } catch(e) { setExtendMsg("Failed: "+e.message); }
    setExtending(false);
  }

  const metaTokenExpiry = localStorage.getItem("anaMetaTokenExpiry") ? parseInt(localStorage.getItem("anaMetaTokenExpiry")) : null;
  const metaTokenDaysLeft = metaTokenExpiry ? Math.ceil((metaTokenExpiry - Date.now()) / 86400000) : null;

  async function fetchMeta() {
    if (!metaConnected) return;
    setLoading(p=>({...p,meta:true})); setErrors(p=>({...p,meta:""}));
    try {
      const r = await fetch("/api/analytics",{ method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ provider:"meta", token:cfg.metaToken, accountId:cfg.metaAccountId.replace(/^act_/,""), datePreset:RANGES[range].meta }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setMetaData(d);
    } catch(e) { setErrors(p=>({...p,meta:e.message})); }
    setLoading(p=>({...p,meta:false}));
  }

  async function fetchKlaviyo(channel) {
    if (!klConnected) return;
    const key = channel==="email"?"email":"sms";
    const setter = channel==="email"?setEmailData:setSmsData;
    setLoading(p=>({...p,[key]:true})); setErrors(p=>({...p,[key]:""}));
    try {
      const r = await fetch("/api/analytics",{ method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ provider:"klaviyo", apiKey:cfg.klaviyoKey, channel, timeframe:RANGES[range].kl }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setter(d);
    } catch(e) { setErrors(p=>({...p,[key]:e.message})); }
    setLoading(p=>({...p,[key]:false}));
  }

  async function fetchAll() {
    fetchMeta();
    await fetchKlaviyo("email");
    await fetchKlaviyo("sms");
  }

  // ── Meta helpers ──
  const mSum = metaData?.summary;
  const spend = mSum?.spend ? parseFloat(mSum.spend) : null;
  const findAction = (arr,type) => arr?.find(a=>a.action_type===type||a.action_type==="offsite_conversion.fb_pixel_"+type);
  const revenue = (v=>v?parseFloat(v.value):null)(findAction(mSum?.action_values,"purchase"));
  const purchases = (v=>v?parseFloat(v.value):null)(findAction(mSum?.actions,"purchase"));
  const roas = spend&&revenue ? (revenue/spend).toFixed(2) : null;

  // ── Klaviyo helpers ──
  function klSum(data,stat) {
    const rs = data?.report?.attributes?.results;
    if (!rs) return null;
    return rs.reduce((s,r)=>s+(parseFloat(r.statistics?.[stat])||0),0);
  }
  function klAvg(data,stat) {
    const rs = data?.report?.attributes?.results;
    if (!rs||!rs.length) return null;
    const vals = rs.map(r=>parseFloat(r.statistics?.[stat])).filter(v=>!isNaN(v));
    return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null;
  }
  function klCampaigns(data,cols) {
    const rs = data?.report?.attributes?.results;
    if (!rs) return null;
    return rs.slice(0,8).map(r=>{
      const campId = r.groupings?.campaign_id;
      const name = r.groupings?.campaign_name
        || data.campaigns?.find(c=>c.id===campId)?.attributes?.name
        || campId || "—";
      return {
        name,
        ...cols.reduce((o,c)=>({...o,[c.key]:r.statistics?.[c.stat]!=null?c.fmt(r.statistics[c.stat]):null}),{})
      };
    });
  }
  const fmt$ = v=>`$${parseFloat(v).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0})}`;
  const fmtPct = v=>`${(parseFloat(v)*100).toFixed(1)}%`;

  const hasData = metaData||emailData||smsData;

  function buildCampaignDump() {
    const emailCamps = emailData?.report?.attributes?.results?.map(r=>{
      const name = r.groupings?.campaign_name || emailData.campaigns?.find(c=>c.id===r.groupings?.campaign_id)?.attributes?.name || "Unknown";
      return { name, open_rate: r.statistics?.open_rate, click_rate: r.statistics?.click_rate, delivered: r.statistics?.delivered };
    }) || [];
    const smsCamps = smsData?.report?.attributes?.results?.map(r=>{
      const name = r.groupings?.campaign_name || smsData.campaigns?.find(c=>c.id===r.groupings?.campaign_id)?.attributes?.name || "Unknown";
      return { name, click_rate: r.statistics?.click_rate, delivered: r.statistics?.delivered };
    }) || [];
    const metaCamps = metaData?.campaigns?.map(c=>{
      const cRev = (v=>v?parseFloat(v.value):null)(findAction(c?.action_values,"purchase"));
      const cSpend = c.spend?parseFloat(c.spend):null;
      return { name: c.campaign_name, spend: cSpend, roas: cSpend&&cRev?(cRev/cSpend):null, ctr: c.ctr?parseFloat(c.ctr):null };
    }) || [];
    return { email: emailCamps, sms: smsCamps, meta: metaCamps };
  }

  async function updatePlaybook() {
    if (!hasData) return;
    setUpdatingPlaybook(true);
    const dump = buildCampaignDump();
    const sys = `You are a performance marketing analyst for Nectar Life (nectarusa.com) — a handcrafted, plant-based bath and body brand. Your job is to extract a reusable playbook of what actually works for this brand based on real campaign data.`;
    const usr = `Here is Nectar Life's real campaign performance data across Meta Ads, Email, and SMS:\n\n${JSON.stringify(dump,null,2)}\n\nExtract a performance playbook. Identify:\n- Which campaign types/names/themes performed best and why\n- Patterns in what drives high open rates, click rates, ROAS\n- Specific offers, framing styles, or timing patterns that outperform\n- What underperforms and should be avoided\n\nWrite this as a concise bulleted playbook titled "NECTAR LIFE PERFORMANCE PLAYBOOK". Be specific with numbers. This will be used to guide future campaign decisions.`;
    const text = await callClaude(sys, usr);
    savePlaybook(text);
    setUpdatingPlaybook(false);
  }

  async function getInsights() {
    if (!hasData) return;
    setLoadingInsights(true);
    const payload = {
      meta: mSum ? { spend:`$${spend?.toFixed(2)}`, roas:roas?`${roas}x`:null, impressions:mSum.impressions, clicks:mSum.clicks, ctr:mSum.ctr, revenue:revenue?fmt$(revenue):null, purchases } : null,
      email: emailData?.report?.attributes?.results?.length ? {
        campaigns: emailData.report.attributes.results.length,
        avgOpenRate: klAvg(emailData,"open_rate")!=null?fmtPct(klAvg(emailData,"open_rate")):null,
        avgClickRate: klAvg(emailData,"click_rate")!=null?fmtPct(klAvg(emailData,"click_rate")):null,
        totalRecipients: klSum(emailData,"recipients"),
        topCampaigns: emailData.report.attributes.results.slice(0,5).map(r=>({
          name: r.groupings?.campaign_name || emailData.campaigns?.find(c=>c.id===r.groupings?.campaign_id)?.attributes?.name,
          open_rate: r.statistics?.open_rate,
          click_rate: r.statistics?.click_rate,
        })),
      } : null,
      sms: smsData?.report?.attributes?.results?.length ? {
        campaigns: smsData.report.attributes.results.length,
        avgClickRate: klAvg(smsData,"click_rate")!=null?fmtPct(klAvg(smsData,"click_rate")):null,
        totalRecipients: klSum(smsData,"recipients"),
        topCampaigns: smsData.report.attributes.results.slice(0,5).map(r=>({
          name: r.groupings?.campaign_name || smsData.campaigns?.find(c=>c.id===r.groupings?.campaign_id)?.attributes?.name,
          click_rate: r.statistics?.click_rate,
        })),
      } : null,
    };
    const playbookSection = playbook ? `\n\n${playbook}` : "";
    const sys = `${BRAND_DNA.identity}\n\nYou are a blunt, data-driven performance marketing analyst for Nectar Life. You have access to the brand's full historical playbook of what has and hasn't worked. Your job is to give HARD DIRECTIVES — specific actions the team must take, based on proven patterns from the playbook. Do NOT give generic marketing advice. Every recommendation must reference a specific number or pattern from the playbook or the current data. If the current data contradicts the playbook, call it out.${playbookSection}`;
    const usr = `Analyze Nectar Life's live campaign performance for the last ${range.replace("d"," days")}:\n\n${JSON.stringify(payload,null,2)}\n\nReturn EXACTLY this format:\n\nWHAT'S WORKING:\n[2 observations with specific numbers and campaign names]\n\nWHAT NEEDS ATTENTION:\n[2 issues with specific numbers]\n\nDO THIS NOW (3 hard directives):\n[Numbered — each must be a specific action tied to a proven playbook pattern, e.g. "Move budget from X to Y because catalogue CBO has historically delivered 4.4x ROAS vs 1.4x on ABO"]`;
    const text = await callClaude(sys,usr);
    setInsights(text);
    setLoadingInsights(false);
  }

  const metaCols = [
    { key:"spend",  label:"Spend",      scheme:"spend",    highlight: r=>r.spend },
    { key:"roas",   label:"ROAS",       scheme:"roas",     highlight: r=>r.roasRaw&&parseFloat(r.roasRaw)>=2 },
    { key:"ctr",    label:"CTR",        scheme:"ctr",      highlight: r=>r.ctrRaw&&parseFloat(r.ctrRaw)>=1 },
    { key:"purchases", label:"Purchases", scheme:"purchase", highlight: r=>r.purchases },
  ];

  const metaRows = metaData?.campaigns?.map(c=>{
    const cRev = (v=>v?parseFloat(v.value):null)(findAction(c?.action_values,"purchase"));
    const cSpend = c.spend?parseFloat(c.spend):null;
    const cRoas = cSpend&&cRev ? (cRev/cSpend) : null;
    const cPurch = (v=>v?parseFloat(v.value):null)(findAction(c?.actions,"purchase"));
    return {
      name: c.campaign_name,
      spend: cSpend!=null?`$${cSpend.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0})}`:null,
      roas: cRoas!=null?`${cRoas.toFixed(2)}x`:null, roasRaw: cRoas,
      ctr: c.ctr?`${parseFloat(c.ctr).toFixed(2)}%`:null, ctrRaw: c.ctr,
      purchases: cPurch!=null?Math.round(cPurch).toString():null,
    };
  })||null;

  const emailRows = emailData?.report
    ? klCampaigns(emailData,[
        {key:"open_rate",stat:"open_rate",fmt:fmtPct},
        {key:"click_rate",stat:"click_rate",fmt:fmtPct},
        {key:"delivered",stat:"delivered",fmt:v=>Math.round(v).toLocaleString()},
      ])
    : emailData?.campaigns?.slice(0,8).map(c=>({
        name: c.attributes?.name,
        sent: c.attributes?.send_time?new Date(c.attributes.send_time).toLocaleDateString():(c.attributes?.status||"—"),
      }))||null;

  const emailCols = emailData?.report
    ? [
        {key:"open_rate",  label:"Open Rate",  scheme:"email",    highlight:r=>r.open_rateRaw&&parseFloat(r.open_rateRaw)>0.25},
        {key:"click_rate", label:"Click Rate", scheme:"click",    highlight:r=>r.click_rateRaw&&parseFloat(r.click_rateRaw)>0.03},
        {key:"delivered",  label:"Delivered",  scheme:"impr",     highlight:null},
      ]
    : [{key:"sent", label:"Sent", scheme:"email", highlight:null}];

  const smsCols = smsData?.report
    ? [
        {key:"click_rate", label:"Click Rate", scheme:"click", highlight:r=>r.click_rateRaw&&parseFloat(r.click_rateRaw)>0.02},
        {key:"delivered",  label:"Delivered",  scheme:"impr",  highlight:null},
      ]
    : [{key:"sent",label:"Date",scheme:"sms",highlight:null}];

  const smsRows = smsData?.report
    ? klCampaigns(smsData,[
        {key:"click_rate",stat:"click_rate",fmt:fmtPct},
        {key:"delivered",stat:"delivered",fmt:v=>Math.round(v).toLocaleString()},
      ])
    : smsData?.campaigns?.slice(0,8).map(c=>({
        name: c.attributes?.name,
        sent: c.attributes?.send_time?new Date(c.attributes.send_time).toLocaleDateString():(c.attributes?.status||"—"),
      }))||null;

  return (
    <div>
      {/* Top bar */}
      <div style={{display:"flex",gap:8,marginBottom:20,alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:15,fontWeight:700,color:C.charcoal,flex:1}}>Performance</span>
        {[["7d","7d"],["30d","30d"],["90d","90d"]].map(([v,l])=>(
          <button key={v} onClick={()=>setRange(v)} style={{padding:"5px 13px",borderRadius:6,border:`1.5px solid ${range===v?C.hotPink:C.gray200}`,background:range===v?C.blush:C.white,color:range===v?C.hotPink:C.gray600,fontSize:12,fontWeight:range===v?700:500,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>
        ))}
        <button onClick={fetchAll} style={{padding:"6px 16px",borderRadius:6,background:`linear-gradient(135deg,${C.hotPink},${C.coral})`,color:C.white,border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Refresh All</button>
      </div>

      {/* Platform connections */}
      <div style={{marginBottom:20,background:C.white,borderRadius:10,border:`1px solid ${C.gray200}`,overflow:"hidden"}}>
        <button onClick={()=>setShowSetup(s=>!s)} style={{width:"100%",padding:"12px 16px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13,fontWeight:700,color:C.charcoal,fontFamily:"inherit"}}>
          <span style={{display:"flex",alignItems:"center",gap:8}}>
            Platform Connections
            <span style={{display:"inline-flex",gap:5}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:metaConnected?"#16A34A":C.gray400,display:"inline-block"}}/>
              <span style={{width:7,height:7,borderRadius:"50%",background:klConnected?"#16A34A":C.gray400,display:"inline-block"}}/>
            </span>
          </span>
          <span style={{fontSize:11,color:C.gray400,fontWeight:500}}>{showSetup?"Hide":"Show"}</span>
        </button>
        {showSetup&&(
          <div style={{padding:"0 16px 16px",borderTop:`1px solid ${C.gray200}`}}>
            <div style={{paddingTop:16,marginBottom:16}}>
              <p style={{margin:"0 0 3px",fontSize:11,fontWeight:700,color:C.charcoal,letterSpacing:"0.05em",textTransform:"uppercase"}}>Meta Ads</p>
              <p style={{margin:"0 0 8px",fontSize:11.5,color:C.gray400,lineHeight:1.5}}>Paste a short-lived token from Graph API Explorer, then click <strong>Extend to 60 days</strong> to make it last.</p>
              {metaTokenDaysLeft!=null&&(
                <p style={{margin:"0 0 8px",fontSize:12,fontWeight:600,color:metaTokenDaysLeft<=5?"#C0392B":metaTokenDaysLeft<=14?"#D97706":"#16A34A"}}>
                  {metaTokenDaysLeft>0?`Token expires in ${metaTokenDaysLeft} day${metaTokenDaysLeft===1?"":"s"}`:"Token has expired"}
                </p>
              )}
              <input value={cfg.metaToken} onChange={e=>saveCfg("metaToken",e.target.value)} type="password" placeholder="Meta Access Token" style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${C.gray200}`,fontSize:12.5,fontFamily:"inherit",marginBottom:8,boxSizing:"border-box",outline:"none"}}/>
              <button onClick={extendMetaToken} disabled={extending||!cfg.metaToken} style={{width:"100%",padding:"8px 12px",borderRadius:8,background:extending||!cfg.metaToken?C.gray200:`linear-gradient(135deg,${C.hotPink},${C.coral})`,color:extending||!cfg.metaToken?C.gray400:C.white,border:"none",fontSize:12.5,fontWeight:700,cursor:extending||!cfg.metaToken?"not-allowed":"pointer",fontFamily:"inherit",marginBottom:8}}>
                {extending?"Extending...":"Extend to 60 Days"}
              </button>
              {extendMsg&&<p style={{margin:"0 0 8px",fontSize:12,color:extendMsg.startsWith("Failed")?"#C0392B":"#16A34A",fontWeight:600}}>{extendMsg}</p>}
              <input value={cfg.metaAccountId} onChange={e=>saveCfg("metaAccountId",e.target.value)} placeholder="Ad Account ID (numbers only)" style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${C.gray200}`,fontSize:12.5,fontFamily:"inherit",boxSizing:"border-box",outline:"none"}}/>
            </div>
            <div>
              <p style={{margin:"0 0 3px",fontSize:11,fontWeight:700,color:C.charcoal,letterSpacing:"0.05em",textTransform:"uppercase"}}>Klaviyo — Email + SMS</p>
              <p style={{margin:"0 0 8px",fontSize:11.5,color:C.gray400}}>Account → API Keys → Private API Key (Full Access).</p>
              <input value={cfg.klaviyoKey} onChange={e=>saveCfg("klaviyoKey",e.target.value)} type="password" placeholder="Klaviyo Private API Key" style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${C.gray200}`,fontSize:12.5,fontFamily:"inherit",boxSizing:"border-box",outline:"none"}}/>
            </div>
          </div>
        )}
      </div>

      {/* ── Meta Ads ── */}
      <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.gray200}`,padding:"16px 18px",marginBottom:16}}>
        <SectionHeader title="Paid Ads" sub="Meta · Facebook + Instagram" connected={metaConnected} loading={loading.meta} onRefresh={fetchMeta}/>
        {metaTokenDaysLeft!=null&&metaTokenDaysLeft<=5&&<p style={{margin:"0 0 10px",fontSize:12,color:"#C0392B",fontWeight:600,cursor:"pointer"}} onClick={()=>setShowSetup(true)}>{metaTokenDaysLeft<=0?"Token expired — click Platform Connections to refresh.":`Token expires in ${metaTokenDaysLeft} day${metaTokenDaysLeft===1?"":"s"} — click Platform Connections to extend.`}</p>}
        {errors.meta&&<p style={{margin:"0 0 10px",fontSize:12,color:"#C0392B",fontWeight:600}}>{errors.meta}</p>}
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <KpiCard label="Spend"       value={spend!=null?`$${spend.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0})}`:null} scheme="spend"    loading={loading.meta&&!mSum}/>
          <KpiCard label="ROAS"        value={roas?`${roas}x`:null}    scheme="roas"     loading={loading.meta&&!mSum} benchKey="roas"  rawValue={roas}/>
          <KpiCard label="Purchases"   value={purchases!=null?Math.round(purchases).toLocaleString():null} scheme="purchase" loading={loading.meta&&!mSum}/>
          <KpiCard label="CTR"         value={mSum?.ctr?`${parseFloat(mSum.ctr).toFixed(2)}%`:null} scheme="ctr" loading={loading.meta&&!mSum} benchKey="ctr" rawValue={mSum?.ctr}/>
          <KpiCard label="Impressions" value={mSum?.impressions?parseInt(mSum.impressions).toLocaleString():null} scheme="impr"  loading={loading.meta&&!mSum}/>
          <KpiCard label="Reach"       value={mSum?.reach?parseInt(mSum.reach).toLocaleString():null} scheme="reach" loading={loading.meta&&!mSum}/>
        </div>
        {!metaConnected&&<p style={{margin:"12px 0 0",fontSize:12,color:C.gray400,textAlign:"center"}}>Enter Meta credentials in Platform Connections above</p>}
        {metaConnected&&!mSum&&!loading.meta&&<p style={{margin:"12px 0 0",fontSize:12,color:C.gray400,textAlign:"center"}}>Click Refresh to load data</p>}
        <CampaignTable columns={metaCols} rows={metaRows}/>
      </div>

      {/* ── Email ── */}
      <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.gray200}`,padding:"16px 18px",marginBottom:16}}>
        <SectionHeader title="Email" sub="Klaviyo" connected={klConnected} loading={loading.email} onRefresh={()=>fetchKlaviyo("email")}/>
        {errors.email&&<p style={{margin:"0 0 10px",fontSize:12,color:"#C0392B",fontWeight:600}}>{errors.email}</p>}
        {emailData?.reportError&&<p style={{margin:"0 0 10px",fontSize:12,color:"#C0392B",fontWeight:600}}>Report error: {emailData.reportError}</p>}
        {emailData?.availableMetrics&&<p style={{margin:"0 0 10px",fontSize:12,color:"#D97706",fontWeight:600}}>No order metric found. Available: {emailData.availableMetrics.join(", ")}</p>}
        {emailData?.report&&(
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:4}}>
            <KpiCard label="Recipients"    value={klSum(emailData,"recipients")!=null?Math.round(klSum(emailData,"recipients")).toLocaleString():null} scheme="email" loading={false}/>
            <KpiCard label="Avg Open Rate" value={klAvg(emailData,"open_rate")!=null?fmtPct(klAvg(emailData,"open_rate")):null}   scheme="email" loading={false} benchKey="open_rate"  rawValue={klAvg(emailData,"open_rate")}/>
            <KpiCard label="Avg Click Rate" value={klAvg(emailData,"click_rate")!=null?fmtPct(klAvg(emailData,"click_rate")):null} scheme="click" loading={false} benchKey="click_rate" rawValue={klAvg(emailData,"click_rate")}/>
            <KpiCard label="Campaigns"     value={emailData.report?.attributes?.results?.length?.toString()||null} scheme="impr" loading={false}/>
          </div>
        )}
        {!klConnected&&<p style={{fontSize:12,color:C.gray400,textAlign:"center",margin:"8px 0 0"}}>Enter Klaviyo key in Platform Connections above</p>}
        {klConnected&&!emailData&&!loading.email&&<p style={{fontSize:12,color:C.gray400,textAlign:"center",margin:"8px 0 0"}}>Click Refresh to load data</p>}
        <CampaignTable columns={emailCols} rows={emailRows}/>
      </div>

      {/* ── SMS ── */}
      <div style={{background:C.white,borderRadius:12,border:`1px solid ${C.gray200}`,padding:"16px 18px",marginBottom:16}}>
        <SectionHeader title="SMS" sub="Klaviyo" connected={klConnected} loading={loading.sms} onRefresh={()=>fetchKlaviyo("sms")}/>
        {errors.sms&&<p style={{margin:"0 0 10px",fontSize:12,color:"#C0392B",fontWeight:600}}>{errors.sms}</p>}
        {smsData?.reportError&&<p style={{margin:"0 0 10px",fontSize:12,color:"#C0392B",fontWeight:600}}>Report error: {smsData.reportError}</p>}
        {smsData?.availableMetrics&&<p style={{margin:"0 0 10px",fontSize:12,color:"#D97706",fontWeight:600}}>No order metric found. Available: {smsData.availableMetrics.join(", ")}</p>}
        {smsData?.report&&(
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:4}}>
            <KpiCard label="Recipients"    value={klSum(smsData,"recipients")!=null?Math.round(klSum(smsData,"recipients")).toLocaleString():null} scheme="sms" loading={false}/>
            <KpiCard label="Avg Click Rate" value={klAvg(smsData,"click_rate")!=null?fmtPct(klAvg(smsData,"click_rate")):null} scheme="click" loading={false} benchKey="sms_click_rate" rawValue={klAvg(smsData,"click_rate")}/>
            <KpiCard label="Campaigns"     value={smsData.report?.attributes?.results?.length?.toString()||null} scheme="impr" loading={false}/>
          </div>
        )}
        {!klConnected&&<p style={{fontSize:12,color:C.gray400,textAlign:"center"}}>Enter Klaviyo key in Platform Connections above</p>}
        {klConnected&&!smsData&&!loading.sms&&<p style={{fontSize:12,color:C.gray400,textAlign:"center"}}>Click Refresh to load data</p>}
        <CampaignTable columns={smsCols} rows={smsRows}/>
      </div>

      {/* AI Insights */}
      {hasData&&(
        <div style={{marginTop:8}}>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <button onClick={getInsights} disabled={loadingInsights} style={{flex:1,padding:"13px 20px",background:loadingInsights?C.gray200:`linear-gradient(135deg,${C.hotPink},${C.coral})`,color:loadingInsights?C.gray400:C.white,border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:loadingInsights?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:loadingInsights?"none":`0 4px 16px ${C.hotPink}40`,fontFamily:"inherit",letterSpacing:"0.04em"}}>
              {loadingInsights?<><Dots/><span style={{fontSize:13}}>Analyzing campaigns...</span></>:"✦ Generate AI Insights"}
            </button>
            <button onClick={updatePlaybook} disabled={updatingPlaybook} title="Update Strategy Playbook from live data" style={{padding:"13px 16px",borderRadius:10,background:updatingPlaybook?C.gray200:C.blush,color:updatingPlaybook?C.gray400:C.hotPink,border:`1.5px solid ${updatingPlaybook?C.gray200:C.hotPink}`,fontSize:13,fontWeight:700,cursor:updatingPlaybook?"not-allowed":"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
              {updatingPlaybook?<Dots/>:"↺ Playbook"}
            </button>
          </div>
          {insights&&(
            <div style={{marginTop:14,padding:"16px 18px",background:C.white,borderRadius:10,border:`1px solid ${C.gray200}`}}>
              <p style={{margin:"0 0 10px",fontSize:11,fontWeight:700,color:C.gray600,letterSpacing:"0.06em",textTransform:"uppercase"}}>AI Performance Analysis</p>
              <pre style={{margin:0,fontSize:13.5,color:C.charcoal,whiteSpace:"pre-wrap",fontFamily:"inherit",lineHeight:1.75}}>{insights}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── STRATEGY ──────────────────────────────────────────────────────────────────
function Strategy({ playbook, savePlaybook }) {
  const [editing,setEditing] = useState(false);
  const [draft,setDraft] = useState(playbook);
  const [saved,setSaved] = useState(false);

  function handleSave() {
    savePlaybook(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  }

  function handleReset() {
    if (!window.confirm("Reset to the built-in baseline playbook? Any custom edits will be lost.")) return;
    setDraft(NECTAR_PLAYBOOK);
    savePlaybook(NECTAR_PLAYBOOK);
    setEditing(false);
  }

  const sections = playbook.split(/\n## /).filter(Boolean).map((s,i)=>i===0?s:("## "+s));

  return (
    <div>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20,gap:12}}>
        <div>
          <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:C.charcoal}}>Performance Playbook</h2>
          <p style={{margin:0,fontSize:13,color:C.gray400,lineHeight:1.5}}>What works for Nectar Life — injected into every AI generation across the app. Update from live data in the Analytics tab.</p>
        </div>
        <div style={{display:"flex",gap:8,flexShrink:0}}>
          {editing ? (
            <>
              <button onClick={handleReset} style={{padding:"7px 14px",borderRadius:8,background:"none",border:`1.5px solid ${C.gray200}`,color:C.gray400,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Reset</button>
              <button onClick={()=>{setEditing(false);setDraft(playbook);}} style={{padding:"7px 14px",borderRadius:8,background:"none",border:`1.5px solid ${C.gray200}`,color:C.gray600,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
              <button onClick={handleSave} style={{padding:"7px 14px",borderRadius:8,background:`linear-gradient(135deg,${C.hotPink},${C.coral})`,color:C.white,border:"none",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Save</button>
            </>
          ) : (
            <button onClick={()=>{setDraft(playbook);setEditing(true);}} style={{padding:"7px 14px",borderRadius:8,background:C.blush,color:C.hotPink,border:`1.5px solid ${C.hotPink}`,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Edit</button>
          )}
          {saved&&<span style={{fontSize:12,color:"#16A34A",fontWeight:600,alignSelf:"center"}}>Saved</span>}
        </div>
      </div>

      {editing ? (
        <textarea
          value={draft}
          onChange={e=>setDraft(e.target.value)}
          style={{width:"100%",minHeight:520,padding:"16px",borderRadius:10,border:`1.5px solid ${C.hotPink}`,fontSize:12.5,fontFamily:"'Georgia','Times New Roman',serif",lineHeight:1.7,color:C.charcoal,background:C.white,boxSizing:"border-box",resize:"vertical",outline:"none"}}
        />
      ) : (
        <div>
          {sections.map((section,i)=>{
            const lines = section.split("\n");
            const title = lines[0].replace(/^#+\s*/,"").trim();
            const body = lines.slice(1).join("\n").trim();
            const isHeader = section.startsWith("##") || i===0;
            return (
              <div key={i} style={{background:C.white,borderRadius:12,border:`1px solid ${C.gray200}`,padding:"16px 18px",marginBottom:12}}>
                {title&&<p style={{margin:"0 0 10px",fontSize:11,fontWeight:700,color:C.hotPink,letterSpacing:"0.07em",textTransform:"uppercase"}}>{title}</p>}
                <pre style={{margin:0,fontSize:12.5,color:C.charcoal,whiteSpace:"pre-wrap",fontFamily:"'Georgia','Times New Roman',serif",lineHeight:1.75}}>{body}</pre>
              </div>
            );
          })}
        </div>
      )}

      <p style={{marginTop:16,fontSize:11.5,color:C.gray400,textAlign:"center"}}>
        To update with fresh data, go to <strong>Analytics</strong> → load data → click <strong>↺ Playbook</strong>
      </p>
    </div>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab,setTab]=useState("social");
  const [ctx,setCtx]=useState(null);
  const [playbook,setPlaybook]=useState(()=>localStorage.getItem("anaPlaybook")||NECTAR_PLAYBOOK);

  function savePlaybook(text) {
    setPlaybook(text);
    localStorage.setItem("anaPlaybook",text);
  }

  const tabs=[
    {id:"social",label:"Social",icon:"✦",sub:"Captions + direction"},
    {id:"campaign",label:"Campaign",icon:"◈",sub:"Email · SMS · Ads"},
    {id:"launch",label:"Launch",icon:"→",sub:"Brief · UTMs · Handoff"},
    {id:"photo",label:"Photo Brief",icon:"◉",sub:"Asset brief"},
    {id:"visuals",label:"Visuals",icon:"✿",sub:"AI image gen"},
    {id:"analytics",label:"Analytics",icon:"▲",sub:"Live performance"},
    {id:"strategy",label:"Strategy",icon:"◆",sub:"Playbook + learnings"},
  ];

  const active=tabs.find(t=>t.id===tab);

  const tabContent = {
    social:    <Social ctx={ctx} playbook={playbook}/>,
    campaign:  <Campaign setCtx={setCtx} playbook={playbook}/>,
    launch:    <Launch playbook={playbook}/>,
    photo:     <PhotoBrief ctx={ctx} playbook={playbook}/>,
    visuals:   <Visuals ctx={ctx} />,
    analytics: <Analytics playbook={playbook} savePlaybook={savePlaybook}/>,
    strategy:  <Strategy playbook={playbook} savePlaybook={savePlaybook}/>,
  }[tab];

  return (
    <div style={{fontFamily:"'Georgia','Times New Roman',serif",background:C.gray100,minHeight:"100vh",paddingBottom:60}}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
        *{box-sizing:border-box}
        input,textarea,select{font-family:'Georgia','Times New Roman',serif!important}
        input:focus,textarea:focus,select:focus{border-color:#F05380!important;box-shadow:0 0 0 3px #F0538018}
        button{font-family:'Georgia','Times New Roman',serif}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#FCAFC0;border-radius:2px}
      `}</style>

      <div style={{background:C.white,borderBottom:`1px solid ${C.gray200}`,padding:"20px 24px 0",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.primaryPink},${C.coral})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:C.white,flexShrink:0}}>N</div>
            <span style={{fontSize:17,fontWeight:700,color:C.charcoal,letterSpacing:"-0.01em"}}>Nectar Studio</span>
            <span style={{fontSize:12,color:C.gray400,letterSpacing:"0.05em"}}>BEYOND SWEET</span>
            {ctx&&(
              <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:20,background:C.blush,border:`1px solid ${C.primaryPink}`}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:C.hotPink,display:"inline-block",flexShrink:0}}/>
                <span style={{fontSize:11,fontWeight:700,color:C.hotPink,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ctx.name}</span>
                <button onClick={()=>setCtx(null)} style={{fontSize:13,color:C.gray400,background:"none",border:"none",cursor:"pointer",padding:"0 0 0 2px",lineHeight:1}}>×</button>
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:0}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"10px 16px 12px",background:"transparent",border:"none",cursor:"pointer",borderBottom:`2.5px solid ${tab===t.id?C.hotPink:"transparent"}`,color:tab===t.id?C.hotPink:C.gray400,fontWeight:tab===t.id?700:500,fontSize:13,transition:"all 0.15s",display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                <span>{t.label}</span>
                <span style={{fontSize:9.5,letterSpacing:"0.04em",color:tab===t.id?C.coral:C.gray400}}>{t.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:680,margin:"0 auto",padding:"28px 24px 0"}}>
        <div style={{background:`linear-gradient(135deg,${C.blush},${C.cream})`,borderRadius:12,padding:"14px 18px",marginBottom:24,border:`1px solid ${C.primaryPink}40`}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18,color:C.hotPink}}>{active?.icon}</span>
            <div>
              <p style={{margin:0,fontSize:11,fontWeight:700,color:C.coral,letterSpacing:"0.08em",textTransform:"uppercase"}}>{active?.label} Generator</p>
              <p style={{margin:"2px 0 0",fontSize:11.5,color:C.gray600}}>Brand DNA enforced on every generation · Dr. Lisa Glow voice · Guardrails active</p>
            </div>
          </div>
        </div>
        {tabContent}
      </div>
    </div>
  );
}
