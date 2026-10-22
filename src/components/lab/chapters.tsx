import { useEffect, useMemo, useState, type ReactNode } from "react";

type P = { next: () => void };

function Section({ kicker, title, intro, children, tone = "dark" }: { kicker: string; title: string; intro?: ReactNode; children: ReactNode; tone?: "dark" | "acid" | "cobalt" | "paper" | "red" }) {
  const bg = { dark: "bg-background text-foreground", acid: "bg-acid text-ink", cobalt: "bg-cobalt text-paper", paper: "bg-paper text-ink", red: "bg-red text-paper" }[tone];
  return (
    <section className={`${bg} min-h-[calc(100vh-120px)] px-4 md:px-10 py-8`}>
      <div className="max-w-6xl mx-auto">
        <span className="tag bg-ink text-acid border-ink">{kicker}</span>
        <h2 className="text-5xl md:text-7xl mt-3">{title}</h2>
        {intro && <p className="mt-3 max-w-2xl text-lg font-medium">{intro}</p>}
        <div className="mt-6 space-y-6">{children}</div>
      </div>
    </section>
  );
}
const Aha = ({ children }: { children: ReactNode }) => <div className="aha pop">💡 AHA! {children}</div>;
const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`brut p-4 ${className}`}>{children}</div>;
const Again = ({ onClick }: { onClick: () => void }) => <button className="btn btn-paper text-sm" onClick={onClick}>↻ Try it again</button>;
const WWW = ({ what, why, where }: { what: string; why: string; where: string }) => (
  <div className="grid sm:grid-cols-3 gap-2 text-sm">
    {[["WHAT?", what, "bg-acid"], ["WHY?", why, "bg-volt"], ["WHERE?", where, "bg-paper"]].map(([k, v, c]) => (
      <div key={k} className={`${c} text-ink border-[3px] border-ink p-2`}><b className="display text-base">{k}</b><div>{v}</div></div>
    ))}
  </div>
);

/* 1 LANDING */
function Landing({ next }: P) {
  const full = "AI is not coming. AI is already here.";
  const [n, setN] = useState(0);
  useEffect(() => { if (n < full.length) { const t = setTimeout(() => setN(n + 1), 55); return () => clearTimeout(t); } }, [n]);
  const uses = ["Phone unlock (Face ID)", "YouTube recommendations", "Google Maps traffic", "Spam filter", "Autocorrect keyboard", "Instagram filters"];
  const [picked, setPicked] = useState<string[]>([]);
  return (
    <section className="min-h-[calc(100vh-120px)] flex flex-col justify-center px-4 md:px-10 py-10 bg-background">
      <div className="max-w-6xl mx-auto w-full">
        <span className="tag bg-red text-paper">THE WORLD HAS ALREADY CHANGED</span>
        <h1 className="text-6xl md:text-[8.5rem] mt-4 text-foreground">
          {full.slice(0, n)}<span className="cursor-blink text-acid">█</span>
        </h1>
        <p className="text-xl md:text-2xl mt-6 font-medium max-w-3xl">How many times did you use AI today <span className="bg-acid text-ink px-1">without noticing?</span> Tap karo jo aaj use kiya:</p>
        <div className="flex flex-wrap gap-3 mt-4">
          {uses.map((u) => (
            <button key={u} onClick={() => setPicked((p) => p.includes(u) ? p.filter((x) => x !== u) : [...p, u])}
              className={`btn text-sm btn-on-dark ${picked.includes(u) ? "btn-green" : "btn-paper"}`}>{picked.includes(u) ? "✓ " : ""}{u}</button>
          ))}
        </div>
        <p className="mt-4 font-mono text-acid text-lg">AI COUNTER: {picked.length} / {uses.length} {picked.length >= 3 && "— dekha? AI already tumhari life mein hai."}</p>
        <button className="btn btn-red btn-on-dark text-3xl mt-8 px-8 py-4" onClick={next}>ENTER THE LAB →</button>
      </div>
    </section>
  );
}

/* 2 TYPES */
const TYPES = [
  { g: "Capability", n: "Narrow AI", s: 0, d: "Ek specific kaam mein expert — ChatGPT, face unlock, Netflix recommendations. Sab AI jo aaj exist karta hai, narrow hai." },
  { g: "Capability", n: "AGI", s: 2, d: "Human-level general intelligence jo koi bhi kaam seekh sake. Abhi tak achieve NAHI hua — research aur debate chal raha hai." },
  { g: "Capability", n: "ASI", s: 2, d: "Humans se zyada smart AI. Purely speculative — science fiction aur philosophy ka topic." },
  { g: "Behaviour", n: "Reactive Machines", s: 0, d: "Sirf current input pe react karta hai, memory nahi. Example: IBM Deep Blue chess." },
  { g: "Behaviour", n: "Limited Memory", s: 0, d: "Recent data/past examples use karta hai. Self-driving cars, chatbots — aaj ka zyada AI yahi hai." },
  { g: "Behaviour", n: "Theory of Mind", s: 1, d: "Emotions, beliefs, intentions ko truly samajhna. Research stage — current AI sirf patterns imitate karta hai." },
  { g: "Behaviour", n: "Self-aware AI", s: 2, d: "Apni consciousness wala AI. Exist nahi karta. Speculative." },
];
const LEVELS = [["EXISTS", "bg-volt"], ["DEVELOPING", "bg-acid"], ["SPECULATIVE", "bg-red"]];
function Types() {
  const [sel, setSel] = useState(0);
  const t = TYPES[sel];
  return (
    <Section kicker="Chapter 02" title="Types of AI" intro="Har 'AI' same nahi hota. Movie wala robot aur tumhara phone ka keyboard — dono AI kehlaate hain, par reality bahut alag hai. Click karke Reality Meter dekho." tone="paper">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {["Capability", "Behaviour"].map((g) => (
            <div key={g}>
              <div className="display text-2xl mb-2">By {g}</div>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((x, k) => x.g === g && (
                  <button key={x.n} className={`btn text-sm ${sel === k ? "btn-ink" : "btn-paper"}`} onClick={() => setSel(k)}>{x.n}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Card className="bg-ink text-paper">
          <div className="display text-4xl text-acid">{t.n}</div>
          <p className="mt-2 text-paper">{t.d}</p>
          <div className="mt-6 font-mono text-xs text-paper">REALITY METER</div>
          <div className="grid grid-cols-3 border-[3px] border-paper mt-1">
            {LEVELS.map(([l, c], k) => (
              <div key={l} className={`p-2 text-center display text-sm ${k === t.s ? `${c} text-ink` : "text-paper/40"}`}>{l}</div>
            ))}
          </div>
          <div className="relative h-6 mt-1">
            <div className="absolute top-0 text-acid text-2xl transition-all duration-500" style={{ left: `${t.s * 33.3 + 14}%` }}>▲</div>
          </div>
        </Card>
      </div>
      <Aha>Aaj jo bhi AI tum use karte ho, woh Narrow AI hai. AGI aur self-aware AI abhi exist nahi karte.</Aha>
    </Section>
  );
}

/* 3 ENGINEER */
const STATIONS = [
  ["Problem", "Pehle real problem samjho: 'Students ko fees ki info 2 min mein chahiye.' Bina problem ke AI bekaar hai."],
  ["Prompt", "Model ko clear instructions likhna — role, format, rules. Achha prompt = achha output."],
  ["Model", "Ready-made model choose karna (GPT, Gemini, Claude, open-source). Speed, cost, quality ka balance."],
  ["Data/Context", "Model ko tumhara private/current data dena — handbook, PDFs, database."],
  ["Tools", "Model ko actions dena — calendar, search, email, calculator."],
  ["Safety", "Galat answers, bias, private data leak rokna. Testing + guardrails + human review."],
  ["AI Product", "Sab jodke real users ke liye app ship karna — aur feedback se improve karna."],
];
function Engineer() {
  const [s, setS] = useState(0);
  return (
    <Section kicker="Chapter 03" title="What does an AI Engineer do?" intro="Socho tum ek factory ke manager ho. Raw idea andar aata hai, useful AI product bahar nikalta hai. Har station click karo." tone="acid">
      <div className="brut p-4">
        <div className="belt h-3 mb-4 border-2 border-ink" />
        <div className="flex flex-wrap gap-2 items-center">
          {STATIONS.map(([n], k) => (
            <div key={n} className="flex items-center gap-2">
              <button onClick={() => setS(k)} className={`btn text-sm ${k === s ? "btn-blue" : k < s ? "btn-green" : "btn-paper"}`}>{k + 1}. {n}</button>
              {k < STATIONS.length - 1 && <span className="display text-xl">→</span>}
            </div>
          ))}
        </div>
        <div key={s} className="pop mt-4 border-[3px] border-ink bg-cobalt text-paper p-4">
          <div className="display text-3xl">STATION {s + 1}: {STATIONS[s][0]}</div>
          <p className="mt-1 text-lg">{STATIONS[s][1]}</p>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn text-sm" onClick={() => setS((s + 1) % STATIONS.length)}>Next station →</button>
        </div>
      </div>
      <Card className="bg-ink text-paper text-xl font-bold">
        "AI Engineer ka kaam model ko zero se train karna zaroori nahi hota. Mostly existing models ko useful, safe aur real-world products mein convert karna hota hai."
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        <Card><div className="display text-2xl text-cobalt">AI Engineer</div><ul className="list-disc ml-5 mt-2"><li>Existing models use karta hai</li><li>Prompts, RAG, agents, apps banata hai</li><li>Focus: product + users</li></ul></Card>
        <Card><div className="display text-2xl text-red">ML Engineer</div><ul className="list-disc ml-5 mt-2"><li>Models train/optimize karta hai</li><li>Data pipelines, training infra</li><li>Focus: model performance</li></ul></Card>
      </div>
      <Aha>AI Engineer = builder. Model ek engine hai; tum poori car banate ho.</Aha>
    </Section>
  );
}

/* 4 TERMS: AI vs AGI + LLM */
const NEXT: Record<string, [string, number][]> = {
  default: [["the", 32], ["a", 21], ["very", 14], ["my", 9]],
  chai: [["hot", 41], ["with", 22], ["and", 18], ["every", 8]],
  cricket: [["match", 46], ["is", 20], ["team", 15], ["fans", 9]],
  exam: [["tomorrow", 38], ["is", 25], ["results", 17], ["paper", 10]],
};
function TermsA() {
  const [stamp, setStamp] = useState(false);
  const [text, setText] = useState("I love drinking chai");
  const [run, setRun] = useState(0);
  const [out, setOut] = useState<string[]>([]);
  const key = Object.keys(NEXT).find((k) => text.toLowerCase().includes(k)) ?? "default";
  const preds = NEXT[key];
  useEffect(() => {
    if (!run) return;
    setOut([]);
    const words = [preds[0][0], "...", "(pattern se)"];
    const ts = words.map((w, k) => setTimeout(() => setOut((o) => [...o, w]), 700 + k * 500));
    return () => ts.forEach(clearTimeout);
  }, [run]); // eslint-disable-line
  return (
    <Section kicker="Chapter 04 · Terminology Lab A–B" title="AI vs AGI · LLM">
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="display text-3xl">4A · AI vs AGI</div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="border-[3px] border-ink bg-acid p-3"><div className="display">AI (today)</div><div className="text-3xl mt-1">🔧🧰📷🗺️</div><p className="text-sm">Specialist toolbox — har tool ek kaam mein expert.</p></div>
            <div className="border-[3px] border-ink border-dashed p-3"><div className="display">AGI</div><div className="text-3xl mt-1 opacity-40">🧠❓</div><p className="text-sm">Ek system jo kuch bhi seekh le, human jaisa. Hypothetical.</p></div>
          </div>
          <button className="btn btn-red mt-3 text-sm" onClick={() => setStamp(!stamp)}>{stamp ? "Hide" : "Stamp"} reality</button>
          {stamp && <div className="mt-3 text-red"><span className="stamp text-lg">AI exists today. AGI remains unachieved.</span></div>}
        </Card>
        <Card>
          <div className="display text-3xl">4B · LLM Machine</div>
          <WWW what="Large Language Model — text ke patterns seekha hua model" why="Language samajhne/likhne ke liye" where="Chatbots, summaries, coding help" />
          <input className="w-full border-[3px] border-ink p-2 mt-3 font-mono bg-paper" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type: chai / cricket / exam..." />
          <button className="btn btn-blue mt-2 text-sm" onClick={() => setRun(run + 1)}>Feed the machine ⚙️</button>
          {run > 0 && (
            <div key={run} className="mt-3 bg-ink text-paper p-3 border-[3px] border-ink">
              <div className="font-mono text-xs text-acid">LLM MACHINE · predicting next token…</div>
              {preds.map(([w, p], k) => (
                <div key={w} className="flex items-center gap-2 mt-1 text-sm">
                  <span className="w-20 font-mono">{w}</span>
                  <div className="h-4 bg-acid transition-all duration-700" style={{ width: `${p * 2}%`, transitionDelay: `${k * 120}ms` }} />
                  <span className="font-mono">{p}%</span>
                </div>
              ))}
              <div className="mt-2 font-mono">{text} <span className="bg-volt text-ink px-1">{out.join(" ")}</span></div>
            </div>
          )}
        </Card>
      </div>
      <Aha>LLM "sochta" nahi — woh language patterns se predict karta hai ki aage kya aayega. Isliye woh confident hoke bhi galat ho sakta hai.</Aha>
    </Section>
  );
}

/* 5 TOKENS + TRAINING/INFERENCE */
function tokenize(s: string) { return s.match(/[A-Za-z]{1,4}|\d+|[^\sA-Za-z\d]|\s+/g)?.filter((t) => t.trim()) ?? []; }
const TOKCOL = ["bg-acid", "bg-volt", "bg-cobalt text-paper", "bg-red text-paper"];
function TermsB() {
  const [p, setP] = useState("Mera naam Riya hai. Main BTech second year mein hoon aur mujhe AI seekhna hai.");
  const [size, setSize] = useState(12);
  const toks = tokenize(p);
  const lost = Math.max(0, toks.length - size);
  const [lane, setLane] = useState(0);
  return (
    <Section kicker="Chapter 05 · Terminology Lab C–D" title="Tokens · Context · Training" tone="paper">
      <Card>
        <div className="display text-3xl">4C · Tokens + Context Window</div>
        <p className="text-sm mt-1">Model words nahi, <b>tokens</b> (chhote pieces) padhta hai. Context window = ek baar mein kitne tokens yaad rakh sakta hai.</p>
        <textarea className="w-full border-[3px] border-ink p-2 mt-2 font-mono bg-paper" rows={2} value={p} onChange={(e) => setP(e.target.value)} />
        <label className="font-mono text-sm flex items-center gap-3 mt-2">Context size: {size} tokens
          <input type="range" min={4} max={40} value={size} onChange={(e) => setSize(+e.target.value)} className="flex-1 accent-current" />
        </label>
        <div className="flex flex-wrap gap-1 mt-3 border-[3px] border-ink p-2 min-h-14 bg-ink">
          {toks.map((t, k) => (
            <span key={k + t} className={`pop px-1.5 py-0.5 border-2 border-ink font-mono text-sm ${k < lost ? "bg-paper/20 text-paper/40 line-through" : TOKCOL[k % 4]}`} style={{ animationDelay: `${k * 25}ms` }}>{t}</span>
          ))}
        </div>
        <p className="font-mono text-sm mt-2">{toks.length} tokens · {lost > 0 ? <span className="text-red font-bold">⚠ {lost} purane tokens ab model ko dikh nahi rahe!</span> : <span>✓ Sab context mein fit hai</span>}</p>
        <p className="text-sm mt-1">Isliye lambi chats/documents mein model shuru ki baatein "bhool" jata hai — summary ya RAG se manage karte hain.</p>
      </Card>
      <Card>
        <div className="display text-3xl">4D · Training vs Inference</div>
        <div className="flex gap-2 mt-2"><button className="btn btn-red text-sm" onClick={() => setLane(1)}>Run Training</button><button className="btn btn-green text-sm" onClick={() => setLane(2)}>Run Inference</button><Again onClick={() => setLane(0)} /></div>
        {[["TRAINING", ["📚 Billions of examples", "🔁 Learning patterns", "🧠 Trained model"], "Weeks · crores ka GPU cost · ek baar", 1, "bg-red text-paper", "4s"],
          ["INFERENCE", ["💬 Your prompt", "🧠 Trained model", "✅ Response"], "Seconds · har user request pe", 2, "bg-volt", "0.8s"]].map(([n, steps, note, id, c, dur]) => (
          <div key={n as string} className="mt-3 border-[3px] border-ink p-2">
            <div className="flex justify-between"><b className="display">{n as string}</b><span className="font-mono text-xs">{note as string}</span></div>
            <div className="grid grid-cols-3 gap-2 mt-2">{(steps as string[]).map((s) => <div key={s} className={`border-2 border-ink p-2 text-sm ${c}`}>{s}</div>)}</div>
            <div className="h-3 border-2 border-ink mt-2 bg-paper"><div className="h-full bg-ink" style={{ width: lane === id ? "100%" : "0%", transition: lane === id ? `width ${dur} linear` : "none" }} /></div>
          </div>
        ))}
      </Card>
      <Aha>Training = school mein padhai (slow, expensive). Inference = exam mein answer likhna (fast). Tum mostly inference use karoge.</Aha>
    </Section>
  );
}

/* 6 EMBEDDINGS + VECTOR DB */
const SENT = [
  { t: "I love football.", v: [0.82, 0.11, 0.67], x: 22, y: 25, c: "bg-acid" },
  { t: "I enjoy playing soccer.", v: [0.79, 0.14, 0.71], x: 30, y: 32, c: "bg-volt" },
  { t: "I need a recipe for pasta.", v: [0.08, 0.91, 0.22], x: 75, y: 75, c: "bg-red text-paper" },
];
const QUERIES = [
  { q: "sports I enjoy", x: 28, y: 20, near: [0, 1], kw: "koi exact match nahi ('sports' kahin nahi likha)" },
  { q: "food ideas", x: 70, y: 66, near: [2], kw: "koi exact match nahi ('food' kahin nahi likha)" },
  { q: "football game", x: 18, y: 34, near: [0, 1], kw: "sirf 'football' wala sentence milega — soccer miss" },
];
function Embeddings() {
  const [placed, setPlaced] = useState<number[]>([]);
  const [q, setQ] = useState<number | null>(null);
  const Q = q !== null ? QUERIES[q] : null;
  return (
    <Section kicker="Chapter 06 · Terminology Lab E–F" title="Embeddings · Vector DB" tone="cobalt" intro="Computer ko meaning kaise samjhaye? Har sentence ko numbers ki list (vector) mein badlo — similar meaning = paas paas points.">
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="display text-2xl">4E · Convert to vectors</div>
          {SENT.map((s, k) => (
            <button key={s.t} onClick={() => setPlaced((p) => p.includes(k) ? p : [...p, k])} className="w-full text-left border-[3px] border-ink p-2 mt-2 hover:bg-acid transition-colors">
              <div className="font-bold">{s.t}</div>
              {placed.includes(k) ? <div className="font-mono text-xs pop">→ [{s.v.join(", ")}, …]</div> : <div className="font-mono text-xs opacity-60">click to embed</div>}
            </button>
          ))}
          <div className="mt-3 flex gap-2"><button className="btn text-sm" onClick={() => setPlaced([0, 1, 2])}>Embed all</button><Again onClick={() => { setPlaced([]); setQ(null); }} /></div>
          <div className="display text-2xl mt-5">4F · Search the Vector DB</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {QUERIES.map((x, k) => <button key={x.q} disabled={placed.length < 3} className={`btn text-sm ${q === k ? "btn-blue" : "btn-paper"} disabled:opacity-40`} onClick={() => setQ(k)}>"{x.q}"</button>)}
          </div>
          {placed.length < 3 && <p className="text-xs font-mono mt-1">Pehle teeno sentences embed karo.</p>}
          {Q && <div className="mt-2 text-sm border-[3px] border-ink p-2 pop"><b>Semantic search:</b> {Q.near.map((n) => SENT[n].t).join(" + ")}<br /><b>Keyword search:</b> {Q.kw}</div>}
        </Card>
        <div className="brut relative aspect-square bg-paper" style={{ backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)", backgroundSize: "10% 10%", backgroundBlendMode: "normal", opacity: 1 }}>
          <span className="absolute top-1 left-2 tag bg-ink text-acid">SEMANTIC SPACE</span>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Q && Q.near.map((n) => <line key={n} x1={Q.x} y1={Q.y} x2={SENT[n].x} y2={SENT[n].y} stroke="var(--cobalt)" strokeWidth="1.2" strokeDasharray="2 1" />)}
          </svg>
          {SENT.map((s, k) => (
            <div key={s.t} className={`absolute -translate-x-1/2 -translate-y-1/2 border-[3px] border-ink px-2 py-1 text-xs font-bold ${s.c} transition-all duration-700`}
              style={{ left: placed.includes(k) ? `${s.x}%` : "50%", top: placed.includes(k) ? `${s.y}%` : "110%", opacity: placed.includes(k) ? 1 : 0, boxShadow: Q?.near.includes(k) ? "0 0 0 4px var(--cobalt)" : undefined }}>{s.t}</div>
          ))}
          {Q && <div key={q} className="absolute -translate-x-1/2 -translate-y-1/2 pop bg-ink text-acid border-[3px] border-ink px-2 py-1 text-xs font-mono" style={{ left: `${Q.x}%`, top: `${Q.y}%` }}>🔍 {Q.q}</div>}
        </div>
      </div>
      <WWW what="Embeddings convert meaning into numbers. Vector DB unhe store karke 'nearest meaning' dhoondhta hai." why="Keyword search synonyms miss karta hai" where="Search, recommendations, RAG" />
      <Aha>Football aur soccer ke words alag hain, par meaning same — isliye vectors paas hain. Yahi semantic search hai.</Aha>
    </Section>
  );
}

/* 7 RAG */
function Rag() {
  const [mode, setMode] = useState<"off" | "on">("off");
  const [step, setStep] = useState(-1);
  const steps = mode === "on" ? ["❓ Question", "📂 Retrieve docs", "➕ Add context", "🧠 LLM", "✅ Answer"] : ["❓ Question", "🧠 LLM", "🤷 Answer"];
  useEffect(() => {
    if (step < 0 || step >= steps.length - 1) return;
    const t = setTimeout(() => setStep(step + 1), 700);
    return () => clearTimeout(t);
  }, [step, steps.length]);
  const done = step === steps.length - 1;
  return (
    <Section kicker="Chapter 07 · Terminology Lab G" title="RAG" intro={<>Retrieval-Augmented Generation = <b>open-book exam</b>. Answer dene se pehle model ko sahi pages dikhao.</>}>
      <Card>
        <div className="font-mono text-sm">Q: "Hamare college mein library kitne baje band hoti hai?"</div>
        <div className="flex gap-2 mt-3 flex-wrap">
          <button className={`btn text-sm ${mode === "off" ? "btn-red" : "btn-paper"}`} onClick={() => { setMode("off"); setStep(-1); }}>Without RAG</button>
          <button className={`btn text-sm ${mode === "on" ? "btn-green" : "btn-paper"}`} onClick={() => { setMode("on"); setStep(-1); }}>With RAG</button>
          <button className="btn btn-blue text-sm" onClick={() => setStep(0)}>▶ Run</button>
          <Again onClick={() => setStep(-1)} />
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {steps.map((s, k) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`border-[3px] border-ink px-3 py-2 font-bold transition-all ${k <= step ? (mode === "on" ? "bg-volt" : "bg-red text-paper") + " -translate-y-1" : "bg-paper"}`}>{s}</div>
              {k < steps.length - 1 && <span className="display">→</span>}
            </div>
          ))}
        </div>
        {mode === "on" && step >= 1 && <div className="mt-3 border-[3px] border-dashed border-ink p-2 font-mono text-xs pop">📄 handbook.pdf p.12: "Central Library: Mon–Sat 8:00 AM – 9:00 PM. Sunday closed."</div>}
        {done && (
          <div className={`mt-3 p-3 border-[3px] border-ink pop ${mode === "on" ? "bg-volt" : "bg-red text-paper"}`}>
            {mode === "on" ? "🤖 Handbook (p.12) ke hisaab se library Mon–Sat raat 9 baje band hoti hai, Sunday closed." : "🤖 Usually college libraries shaam 5–8 baje ke beech band hoti hain... (Guess! Model ko tumhare college ka data pata hi nahi.)"}
          </div>
        )}
      </Card>
      <WWW what="Retrieve → Augment prompt → Generate" why="LLM ko tumhara private/latest data nahi pata" where="College FAQ bot, company docs, customer support" />
      <Aha>RAG model ko naya nahi sikhata — bas sahi information sahi time pe dikhata hai. Phir bhi answer verify karo.</Aha>
    </Section>
  );
}

/* 8 AGENTS + FINE-TUNING */
const AGENT = [
  ["🎯 Goal", "Plan a college tech fest for 200 students, budget ₹50,000"],
  ["🗺️ Plan", "1) Date fix karo 2) Budget split 3) Venue/speakers dhoondo"],
  ["📅 Tool: Calendar", "check_calendar('Nov') → 14 Nov free, 21 Nov exams"],
  ["👀 Observe", "14 Nov best. Next: budget."],
  ["📊 Tool: Budget sheet", "split(50000) → Venue 15k · Food 20k · Prizes 10k · Misc 5k"],
  ["🔎 Tool: Web search", "search('AI speakers near campus') → 3 options found"],
  ["👀 Observe", "Sab info ready. Final plan bana sakta hoon."],
  ["✅ Final answer", "Tech fest on 14 Nov, budget split ready, 3 speakers shortlisted. Human approval chahiye before booking."],
];
const FT = [
  { s: "Chatbot answers bahut lambe aur messy hain.", a: "Prompting", why: "Bas instruction improve karo: 'Answer in 3 bullet points.' Sabse sasta aur fast fix." },
  { s: "Bot ko company ki latest leave policy PDF se answer dena hai.", a: "RAG", why: "Private + changing knowledge — documents retrieve karo. Fine-tune karoge toh har update pe dobara karna padega." },
  { s: "10,000 support replies ek exact brand style mein chahiye, prompts kaafi nahi.", a: "Fine-tuning", why: "Repeated behaviour/style shape karna — tab fine-tuning sense banata hai, pehle prompting try karne ke baad." },
];
function Agents() {
  const [n, setN] = useState(0);
  const [auto, setAuto] = useState(false);
  useEffect(() => { if (!auto || n >= AGENT.length) return; const t = setTimeout(() => setN(n + 1), 900); return () => clearTimeout(t); }, [auto, n]);
  const [ans, setAns] = useState<Record<number, string>>({});
  return (
    <Section kicker="Chapter 08 · Terminology Lab H–I" title="Agents · Fine-tuning" tone="acid">
      <Card>
        <div className="display text-3xl">4H · AI Agent loop</div>
        <p className="text-sm">Chatbot sirf jawab deta hai. Agent <b>goal</b> leke khud steps choose karta hai aur tools use karta hai.</p>
        <div className="flex gap-2 mt-2 flex-wrap"><button className="btn btn-blue text-sm" onClick={() => { setN(0); setAuto(true); }}>▶ Run agent</button><button className="btn btn-paper text-sm" onClick={() => setN(Math.min(n + 1, AGENT.length))}>Step →</button><Again onClick={() => { setN(0); setAuto(false); }} /></div>
        <div className="flex gap-1 mt-3 flex-wrap font-mono text-xs">{["Goal", "Plan", "Tool", "Observe", "Next action", "Final answer"].map((x) => <span key={x} className="tag">{x} ↻</span>)}</div>
        <ol className="mt-3 space-y-1">
          {AGENT.slice(0, n).map(([a, b], k) => (
            <li key={k} className={`slide-in border-[3px] border-ink p-2 text-sm ${a.includes("Tool") ? "bg-cobalt text-paper" : a.includes("Final") ? "bg-volt" : "bg-paper"}`}><b>{a}</b> — {b}</li>
          ))}
        </ol>
      </Card>
      <Card>
        <div className="display text-3xl">4I · Prompting, RAG, ya Fine-tuning?</div>
        {FT.map((f, k) => (
          <div key={k} className="mt-3 border-[3px] border-ink p-2">
            <div className="font-bold">{k + 1}. {f.s}</div>
            <div className="flex gap-2 mt-2 flex-wrap">{["Prompting", "RAG", "Fine-tuning"].map((o) => (
              <button key={o} onClick={() => setAns({ ...ans, [k]: o })} className={`btn text-xs ${ans[k] === o ? (o === f.a ? "btn-green" : "btn-red shake") : "btn-paper"}`}>{o}</button>
            ))}</div>
            {ans[k] && <p className="text-sm mt-2 pop">{ans[k] === f.a ? "✓ Sahi! " : `✗ Best: ${f.a}. `}{f.why}</p>}
          </div>
        ))}
        <p className="mt-3 text-sm font-mono">Prompting = better instructions · RAG = current/private knowledge · Fine-tuning = repeated behaviour/style</p>
      </Card>
      <Aha>Fine-tuning pehla solution nahi hai. Order: Prompting → RAG → (zarurat ho toh) Fine-tuning.</Aha>
    </Section>
  );
}

/* 9 CHALLENGE */
const OPTS = ["Prompting", "RAG", "Fine-tuning", "Agent", "Multimodal AI"];
const CH = [
  { s: "College FAQ bot jo 200-page student handbook se answer de.", a: "RAG", e: "Knowledge ek document mein hai aur update hota rahega — retrieve karke answer do." },
  { s: "Personal study planner jo tumhara calendar check kare, slots block kare, reminders bheje.", a: "Agent", e: "Multiple steps + tools (calendar, reminders) — yeh agent ka kaam hai." },
  { s: "Hazaaron product reviews mein 'battery complaints' search karna.", a: "RAG", e: "Embeddings + vector search meaning se dhoondhta hai, phir LLM summarize karta hai." },
  { s: "Upload ki hui photo ka caption generate karna.", a: "Multimodal AI", e: "Input image hai, output text — dono media samajhne wala model chahiye." },
  { s: "Company emails ko polite, professional tone mein rewrite karna.", a: "Prompting", e: "Clear instructions + examples kaafi hain. Fine-tuning tabhi jab scale pe exact style chahiye." },
];
function Challenge() {
  const [ans, setAns] = useState<Record<number, string>>({});
  const score = useMemo(() => CH.filter((c, k) => ans[k] === c.a).length, [ans]);
  const done = Object.keys(ans).length === CH.length;
  return (
    <Section kicker="Chapter 09" title="Build Challenge" intro="Tum AI Engineer ho. Har problem ke liye sahi approach choose karo — first answer counts." tone="paper">
      <div className="sticky top-16 z-10 inline-block brut bg-ink text-acid px-4 py-2 display text-2xl">SCORE {score} / {CH.length}</div>
      {CH.map((c, k) => (
        <Card key={k}>
          <div className="font-bold text-lg">#{k + 1} {c.s}</div>
          <div className="flex flex-wrap gap-2 mt-2">{OPTS.map((o) => {
            const picked = ans[k] === o, locked = ans[k] !== undefined;
            const cls = locked ? (o === c.a ? "btn-green" : picked ? "btn-red" : "btn-paper opacity-50") : "btn-paper";
            return <button key={o} disabled={locked} onClick={() => setAns({ ...ans, [k]: o })} className={`btn text-xs ${cls}`}>{o}</button>;
          })}</div>
          {ans[k] && <p className="mt-2 text-sm pop"><b>{ans[k] === c.a ? "✓ Correct." : `✗ Better choice: ${c.a}.`}</b> {c.e}</p>}
        </Card>
      ))}
      {done && <Aha>Score {score}/{CH.length}. Real projects mein aksar combination lagta hai — e.g. Agent + RAG. Problem pehle, technique baad mein.</Aha>}
      <Again onClick={() => setAns({})} />
    </Section>
  );
}

/* 10 ROADMAP */
const ROAD = [
  ["Use AI well", "Prompts, capabilities, limits, safety. Daily AI tools smartly use karo.", "bg-acid"],
  ["Build with AI", "APIs aur simple apps — ek chatbot ya summarizer banao.", "bg-volt"],
  ["Give AI knowledge", "Embeddings, vector DBs, RAG — apne documents se answer.", "bg-cobalt text-paper"],
  ["Create AI workflows", "Tools, agents, automation — multi-step kaam.", "bg-red text-paper"],
  ["Work with multiple media", "Text, image, audio, video — multimodal products.", "bg-paper"],
];
function Roadmap() {
  const [s, setS] = useState(0);
  return (
    <Section kicker="Chapter 10" title="How to become an AI Engineer">
      <div className="grid md:grid-cols-5 gap-3">
        {ROAD.map(([n, d, c], k) => (
          <button key={n} onClick={() => setS(k)} className={`text-left border-[3px] border-paper p-3 transition-transform ${c} text-ink ${k === s ? "-translate-y-2 shadow-[6px_6px_0_var(--paper)]" : "opacity-70"}`}>
            <div className="display text-5xl">0{k + 1}</div>
            <div className="display text-xl mt-1">{n}</div>
            {k === s && <p className="text-sm mt-2 pop">{d}</p>}
          </button>
        ))}
      </div>
      <div className="brut bg-red text-paper p-4">
        <b className="display text-2xl">⚠ Safety reminder</b>
        <p>AI galat ho sakta hai, biased ho sakta hai, aur private data ke saath unsafe ho sakta hai. Passwords, personal ya company secrets kabhi paste mat karo. Hamesha verify karo.</p>
      </div>
      <h3 className="text-4xl md:text-6xl text-acid">"Do not aim to understand everything today. Aim to understand enough to start building."</h3>
      <Aha>Aaj ka homework: Step 01 se shuru karo — ek AI tool roz smartly use karo, aur ek chhota project socho.</Aha>
    </Section>
  );
}

export const CHAPTERS = [
  { title: "The world has already changed", Component: Landing, cue: "Room se poocho: aaj kitni baar AI use kiya? Haath raise karwao, phir chips tap karo." },
  { title: "Types of AI", Component: Types, cue: "AGI aur Self-aware click karke dikhao ki meter SPECULATIVE pe jaata hai. Myth bust karo." },
  { title: "What does an AI Engineer do?", Component: Engineer, cue: "Ek student ko har station click karwao. Quote zor se padho." },
  { title: "AI vs AGI · LLM", Component: TermsA, cue: "Audience se ek sentence lo (chai/cricket/exam) aur LLM machine mein daalo." },
  { title: "Tokens · Context · Training", Component: TermsB, cue: "Slider kam karo — dikhao purane tokens kaise gayab hote hain. Phir dono lanes race karwao." },
  { title: "Embeddings · Vector DB", Component: Embeddings, cue: "Teeno embed karo, phir 'sports I enjoy' search — keyword vs semantic contrast highlight karo." },
  { title: "RAG", Component: Rag, cue: "Pehle Without RAG run karo, phir With RAG. Poochho: kaunsa trust karoge?" },
  { title: "Agents · Fine-tuning", Component: Agents, cue: "Agent ko step-by-step chalao. Har tool call pe pause: 'agent ne yeh kyun choose kiya?'" },
  { title: "Build Challenge", Component: Challenge, cue: "Class ko teams mein baanto, har scenario pe vote karwao, phir click karo." },
  { title: "Roadmap", Component: Roadmap, cue: "Har step click karo. Safety reminder pe ruko. Closing quote pe session end karo." },
];
