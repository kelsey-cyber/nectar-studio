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

  socialPillars: [
    { id: "ritual", label: "Ritual Story", desc: "The moment, the routine, the feeling" },
    { id: "ingredient", label: "Ingredient Origin", desc: "Where it comes from, why it matters" },
    { id: "seasonal", label: "Seasonal Moment", desc: "Tied to a time of year or occasion" },
    { id: "proof", label: "Social Proof", desc: "UGC, reviews, community love" },
    { id: "values", label: "Brand Values", desc: "Clean, handmade, transparent, joyful" },
  ],
};

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
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  const d = await r.json();
  return d.content?.[0]?.text || "Generation failed.";
}

async function generateImage(prompt, apiKey, ratio = "1:1") {
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

// ── SOCIAL ────────────────────────────────────────────────────────────────────
function Social() {
  const [pillar,setPillar]=useState("ritual");
  const [platform,setPlatform]=useState("instagram");
  const [product,setProduct]=useState("");
  const [angle,setAngle]=useState("");
  const [tone,setTone]=useState("warm");
  const [loading,setLoading]=useState(false);
  const [out,setOut]=useState(null);
  const [cp,setCp]=useState({});
  const sp=BRAND_DNA.socialPillars.find(p=>p.id===pillar);

  async function go() {
    setLoading(true); setOut(null);
    const sys=`${BRAND_DNA.identity}\n\nGenerate social media content for Nectar Life. Elevated and intentional, not promotional. Benchmarks: Gisou and Chanel. No em-dashes.`;
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
      {out&&<div style={{marginTop:24}}><div style={{height:1,background:C.gray200,marginBottom:20}}/>
        {out.raw?<Card label="Output" content={out.raw} onCopy={()=>copy("raw",out.raw)} copied={cp.raw}/>:<>
          {out.c1&&<Card label="Caption Option 1" content={out.c1} onCopy={()=>copy("c1",out.c1)} copied={cp.c1}/>}
          {out.c2&&<Card label="Caption Option 2" content={out.c2} onCopy={()=>copy("c2",out.c2)} copied={cp.c2}/>}
          {out.ht&&<Card label="Hashtags" content={out.ht} onCopy={()=>copy("ht",out.ht)} copied={cp.ht}/>}
          {out.vd&&<Card label="Visual Direction" content={out.vd} onCopy={()=>copy("vd",out.vd)} copied={cp.vd}/>}
        </>}
      </div>}
    </div>
  );
}

// ── CAMPAIGN ──────────────────────────────────────────────────────────────────
function Campaign() {
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
    setLoading(true); setOut(null);
    const chl=Object.entries(ch).filter(([,v])=>v).map(([k])=>k).join(", ");
    const sys=`${BRAND_DNA.identity}\n\nGenerate campaign copy. Always lead with ritual/ingredient stories, never the discount. Warmth over urgency. No em-dashes.`;
    const usr=`Generate all campaign outputs.\nCAMPAIGN: ${name}\nMECHANIC: ${mech}\nPRODUCTS: ${prods}\nGOAL: ${goal}\nANGLE: ${angle||"Permission-to-indulge, warm, ritual-forward"}\nCHANNELS: ${chl}\n\nReturn EXACTLY:\nEMAIL SUBJECT LINE OPTIONS:\n1. [option]\n2. [option]\n3. [option]\n\nEMAIL PREVIEW TEXT:\n[under 90 chars]\n\nEMAIL BODY COPY (Send 1):\n[150-200 words, ritual story first, offer second, clear CTA]\n\nEMAIL BODY COPY (Non-Opener Resend):\n[80-100 words, different angle]\n\nRESEND SUBJECT LINE OPTIONS:\n1. [option]\n2. [option]\n3. [option]\n\nSMS OPTION 1 (under 160 chars):\n[sms]\n\nSMS OPTION 2 (under 160 chars):\n[sms]\n\nMETA AD HEADLINES (3):\n1. [headline]\n2. [headline]\n3. [headline]\n\nAD BODY COPY:\n[2-3 sentences, mobile-first]\n\nCTA BUTTON TEXT:\n[ALL CAPS, 2-4 words]`;
    const res=await callClaude(sys,usr);
    setLoading(false);
    const keys=["EMAIL SUBJECT LINE OPTIONS:","EMAIL PREVIEW TEXT:","EMAIL BODY COPY (Send 1):","EMAIL BODY COPY (Non-Opener Resend):","RESEND SUBJECT LINE OPTIONS:","SMS OPTION 1","SMS OPTION 2","META AD HEADLINES","AD BODY COPY:","CTA BUTTON TEXT:"];
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

  return (
    <div>
      <p style={{fontSize:13.5,color:C.gray600,lineHeight:1.6,margin:"0 0 20px"}}>Generate email copy, SMS, and ad headlines from a campaign brief. Guardrails checked before any copy is produced.</p>
      <Field label="Campaign Name" value={name} onChange={setName} placeholder="e.g. Mother's Day Collection, National Pet Day B2G1"/>
      <Field label="Promo Mechanic" value={mech} onChange={setMech} placeholder="e.g. B2G1 small soaps, 25% off body care, no discount"/>
      <Field label="Featured Products" value={prods} onChange={setProds} placeholder="e.g. Body Butter, Body Scrub, Bath Bombs" area/>
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
      {out&&<div style={{marginTop:24}}><div style={{height:1,background:C.gray200,marginBottom:20}}/>
        {out.raw?<Card label="Campaign Outputs" content={out.raw} onCopy={()=>copy("raw",out.raw)} copied={cp.raw}/>:Object.entries(out).map(([k,v])=><Card key={k} label={k.replace(":","").replace("(","").replace(")","")} content={v} onCopy={()=>copy(k,v)} copied={cp[k]}/>)}
      </div>}
    </div>
  );
}

// ── PHOTO BRIEF ───────────────────────────────────────────────────────────────
function PhotoBrief() {
  const [cname,setCname]=useState("");
  const [prods,setProds]=useState("");
  const [shot,setShot]=useState("lifestyle");
  const [hook,setHook]=useState("");
  const [assets,setAssets]=useState({emailHeader:true,saleBanner:false,metaSquare:true,metaStory:true,googleDisplay:false});
  const [loading,setLoading]=useState(false);
  const [out,setOut]=useState(null);
  const [cp,setCp]=useState({});
  const assetMap={emailHeader:"Email header (1080px wide)",saleBanner:"Sale page banner",metaSquare:"Meta ad 1:1 (1080x1080px)",metaStory:"Meta Stories/Reels 9:16 (1080x1920px)",googleDisplay:"Google Display (300x250px)"};

  async function go(){
    setLoading(true); setOut(null);
    const al=Object.entries(assets).filter(([,v])=>v).map(([k])=>assetMap[k]).join(" · ");
    const sys=`${BRAND_DNA.identity}\n\n${BRAND_DNA.photoDirection}\n\nGenerate a creative asset brief. Be specific, visual, actionable. No em-dashes.`;
    const usr=`Generate a complete creative asset brief.\nCAMPAIGN: ${cname}\nPRODUCTS: ${prods}\nSHOT TYPE: ${shot}\nKEY MESSAGE: ${hook||"Ritual-forward, seasonal, self-care moment"}\nASSETS: ${al||"Email header, Meta square and story"}\n\nReturn EXACTLY:\nCAMPAIGN ASSET BRIEF\nCampaign: ${cname}\nDue Date: [fill in]\n\nKEY MESSAGE:\n[Single most important feeling. One sentence.]\n\nHERO PRODUCTS:\n[List with visual priority notes]\n\nSHOT DIRECTION:\n[3-4 specific, visual, actionable shot descriptions]\n\nCOLOR AND MOOD:\n[Brand colors + mood description]\n\nASSETS NEEDED:\n${al}\n\nCOPY OVERLAYS:\n[Headline, offer, CTA. Gelica for headlines, Museo Sans 700 ALL CAPS for callouts.]\n\nSALE PAGE ORDER (if applicable):\nHSL, Dry Body Oil, Round Bath Bomb at top\n\nREFERENCE AESTHETIC:\n[One benchmark brand matching the mood]\n\nNOTES:\n[Any flags or constraints]`;
    const res=await callClaude(sys,usr);
    setLoading(false); setOut(res);
  }

  function copy(k,t){navigator.clipboard.writeText(t);setCp(p=>({...p,[k]:true}));setTimeout(()=>setCp(p=>({...p,[k]:false})),2000);}

  return (
    <div>
      <p style={{fontSize:13.5,color:C.gray600,lineHeight:1.6,margin:"0 0 20px"}}>Generate a camera-ready asset brief. Includes shot direction, copy overlays, asset specs, and visual references.</p>
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
function Visuals() {
  const [key,setKey]=useState(()=>localStorage.getItem("stabilityKey")||"");
  const [keySet,setKeySet]=useState(()=>!!localStorage.getItem("stabilityKey"));
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
    if(!key){setErr("Enter your Stability AI API key first.");return;}
    setErr(""); setGenPrompt(true); setImgs([]);
    const sys=`${BRAND_DNA.photoDirection}\n\nYou generate precise Stability AI image prompts for a premium handcrafted bath and body brand. Never include faces. Focus on hands, products, ingredients, lifestyle atmosphere. Always specify: lighting, setting, color palette, mood, camera style. Output prompts as comma-separated descriptors.`;
    const usr=`Generate a Stability AI image prompt for Nectar Life.\nPRODUCT: ${product||"body care products"}\nSHOT TYPE: ${shot} — ${shots[shot]}\nMOOD: ${mood} — ${moods[mood]}\nSEASON: ${season}\nRATIO: ${ratio}\nNOTES: ${notes||"none"}\n\nReturn EXACTLY:\nIMAGE PROMPT:\n[80-150 words, comma-separated descriptors, end with style references]\n\nNEGATIVE PROMPT:\n[Things to exclude]`;
    const res=await callClaude(sys,usr);
    setGenPrompt(false);
    let p="";
    const pts=res.split(/\n(?=NEGATIVE PROMPT:)/);
    if(pts[0]) p=pts[0].replace("IMAGE PROMPT:","").trim();
    setPrompt(p);
    setGenImg(true);
    try{
      const url=await generateImage(p,key,ratio);
      setImgs(prev=>[{url,prompt:p,ratio,label:`${shot} / ${mood}`},...prev]);
    } catch(e){setErr(`Image generation failed: ${e.message}`);}
    setGenImg(false);
  }

  async function regen(){
    if(!prompt||!key) return;
    setGenImg(true); setErr("");
    try{
      const url=await generateImage(prompt,key,ratio);
      setImgs(prev=>[{url,prompt,ratio,label:`${shot} / ${mood}`},...prev]);
    } catch(e){setErr(`Regeneration failed: ${e.message}`);}
    setGenImg(false);
  }

  const busy=genPrompt||genImg;
  const ratioSz=ratioSizes[ratio]||{w:220,h:220};

  return (
    <div>
      <p style={{fontSize:13.5,color:C.gray600,lineHeight:1.6,margin:"0 0 20px"}}>Generate real on-brand images using AI. Powered by Stability AI. Every prompt is built from Nectar Life's photography direction.</p>

      {!keySet?(
        <div style={{background:C.blush,border:`1.5px solid ${C.primaryPink}`,borderRadius:12,padding:"18px 20px",marginBottom:24}}>
          <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:C.charcoal}}>Stability AI API Key Required</p>
          <p style={{margin:"0 0 14px",fontSize:12.5,color:C.gray600,lineHeight:1.5}}>Get a free key at <strong>platform.stability.ai</strong>. Stored only in this browser session.</p>
          <div style={{display:"flex",gap:10}}>
            <input type="password" value={key} onChange={e=>setKey(e.target.value)} placeholder="sk-..." onKeyDown={e=>e.key==="Enter"&&(key.startsWith("sk-")?setKeySet(true):setErr("Key should start with sk-"))} style={{flex:1,padding:"10px 12px",borderRadius:8,border:`1.5px solid ${C.gray200}`,fontSize:13.5,fontFamily:"inherit",outline:"none"}}/>
            <button onClick={()=>{if(key.startsWith("sk-")){localStorage.setItem("stabilityKey",key);setKeySet(true);}else setErr("Key should start with sk-");}} style={{padding:"10px 18px",borderRadius:8,background:C.hotPink,color:C.white,border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>Save</button>
          </div>
          {err&&<p style={{margin:"8px 0 0",fontSize:12,color:"#C0392B"}}>{err}</p>}
        </div>
      ):(
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#F0FFF4",border:`1px solid #34C759`,borderRadius:8,marginBottom:20}}>
          <span style={{fontSize:12.5,color:"#1A7A35",fontWeight:600}}>Stability AI connected</span>
          <button onClick={()=>{localStorage.removeItem("stabilityKey");setKeySet(false);setKey("");}} style={{fontSize:11.5,color:C.gray600,background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>Change key</button>
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
      <Btn onClick={go} loading={busy} disabled={!keySet} label={genPrompt?"Crafting prompt...":genImg?"Generating image...":"Generate Image"}/>

      {err&&!busy&&<p style={{margin:"12px 0 0",fontSize:12.5,color:"#C0392B",fontWeight:600}}>{err}</p>}

      {prompt&&(
        <div style={{marginTop:16}}>
          <div style={{padding:"12px 14px",background:C.cream,borderRadius:8,border:`1px solid ${C.gray200}`,marginBottom:8}}>
            <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,color:C.gray600,letterSpacing:"0.06em",textTransform:"uppercase"}}>Generated Image Prompt</p>
            <p style={{margin:0,fontSize:11.5,color:C.gray400}}>Edit below and regenerate, or copy for use in Midjourney or other tools.</p>
          </div>
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={4} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:`1.5px solid ${C.gray200}`,fontSize:12.5,color:C.charcoal,resize:"vertical",fontFamily:"inherit",background:C.white,boxSizing:"border-box",outline:"none",lineHeight:1.5,marginBottom:8}}/>
          <button onClick={regen} disabled={genImg} style={{padding:"9px 18px",borderRadius:8,background:genImg?C.gray200:C.blush,color:genImg?C.gray400:C.hotPink,border:`1.5px solid ${genImg?C.gray200:C.primaryPink}`,fontSize:13,fontWeight:700,cursor:genImg?"not-allowed":"pointer"}}>
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
                  <span style={{fontSize:11,fontWeight:700,color:C.gray600,letterSpacing:"0.06em",textTransform:"uppercase"}}>{img.label} · {img.ratio}</span>
                  <a href={img.url} download={`nectar-${i}.jpg`} style={{fontSize:11.5,fontWeight:700,color:C.hotPink,textDecoration:"none",padding:"4px 10px",borderRadius:6,border:`1px solid ${C.primaryPink}`,background:C.blush}}>Download</a>
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

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab,setTab]=useState("social");
  const tabs=[
    {id:"social",label:"Social",icon:"✦",sub:"Captions + direction"},
    {id:"campaign",label:"Campaign",icon:"◈",sub:"Email · SMS · Ads"},
    {id:"photo",label:"Photo Brief",icon:"◉",sub:"Asset brief"},
    {id:"visuals",label:"Visuals",icon:"✿",sub:"AI image generation"},
  ];
  const Comp={social:Social,campaign:Campaign,photo:PhotoBrief,visuals:Visuals}[tab];
  const active=tabs.find(t=>t.id===tab);

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
        <Comp/>
      </div>
    </div>
  );
}
