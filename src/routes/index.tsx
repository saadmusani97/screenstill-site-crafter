import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, FlaskConical, List, MessageSquare, Mic } from "lucide-react";
import { CHAPTERS } from "@/components/lab/chapters";
import { LESSONS, SESSION_MINUTES, lessonStart } from "@/components/lab/curriculum";
import { TeachingPanel, PracticePanel } from "@/components/lab/teaching-panel";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI: From Curiosity to Creation — 90-Minute Deep-Dive Workshop" },
      { name: "description", content: "Detailed 90-minute Hinglish AI workshop with step-by-step LLM, token, embedding, RAG and agent explanations, worked examples, practice and presenter notes." },
      { property: "og:title", content: "AI Lab — 90-Minute Deep-Dive Workshop" },
      { property: "og:description", content: "Concept-by-concept Hinglish AI lessons, interactive demos, classroom exercises and detailed teaching notes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type View = "concept" | "demo" | "practice";
const VIEWS = [{ id: "concept" as const, label: "Samjho", icon: BookOpen }, { id: "demo" as const, label: "Demo", icon: FlaskConical }, { id: "practice" as const, label: "Practice", icon: MessageSquare }];

function Index() {
  const [i, setI] = useState(0);
  const [view, setView] = useState<View>("concept");
  const [presenter, setPresenter] = useState(false);
  const [agenda, setAgenda] = useState(false);
  const total = CHAPTERS.length;
  const go = useCallback((n: number) => {
    setI(Math.max(0, Math.min(total - 1, n)));
    setView("concept");
    setAgenda(false);
    window.scrollTo({ top: 0 });
  }, [total]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof HTMLElement && (t.matches("input,textarea,select,button,summary") || t.isContentEditable)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
      if (e.key.toLowerCase() === "p") setPresenter((p) => !p);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [i, go]);
  const ch = CHAPTERS[i];
  const lesson = LESSONS[i];
  if (!ch || !lesson) return null;
  const Body = ch.Component;
  const start = lessonStart(i);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-background border-b-4 border-acid">
        <div className="max-w-6xl mx-auto flex items-center gap-3 px-4 py-3 flex-wrap">
          <span className="display text-acid text-2xl">AI LAB</span>
          <span className="tag bg-acid text-ink">{SESSION_MINUTES} MIN · DEEP DIVE</span>
          <div className="ml-auto flex gap-2">
            <Button variant="lab" size="lab" className="btn-paper text-xs" onClick={() => setAgenda(!agenda)} aria-expanded={agenda}><List /> Session map</Button>
            <Button variant="lab" size="lab" className={`text-xs ${presenter ? "btn-red" : "btn-paper"}`} onClick={() => setPresenter(!presenter)} aria-pressed={presenter}><Mic /> Presenter {presenter ? "ON" : "OFF"}</Button>
          </div>
        </div>
        <div className="flex h-2">
          {CHAPTERS.map((c, k) => <Button variant="ghost" size="lab" key={c.title} title={c.title} aria-label={`Go to chapter ${k + 1}`} aria-current={k === i ? "step" : undefined} onClick={() => go(k)} className={`h-2 p-0 rounded-none flex-1 border-r-2 border-background ${k <= i ? "bg-acid hover:bg-volt" : "bg-foreground/20 hover:bg-foreground/40"}`} />)}
        </div>
      </header>

      {agenda && <section aria-label="90-minute session map" className="bg-paper text-ink border-b-4 border-ink px-4 py-6">
        <div className="max-w-6xl mx-auto"><h2 className="text-3xl">90-minute session map</h2><div className="grid sm:grid-cols-2 gap-3 mt-5">
          {CHAPTERS.map((c, k) => { const l = LESSONS[k]; if (!l) return null; return <Button key={c.title} variant="lab" size="lab" className={`justify-start font-sans normal-case text-left ${k === i ? "btn-green" : "btn-paper"}`} onClick={() => go(k)}><span className="font-mono text-xs shrink-0">{lessonStart(k)}–{lessonStart(k) + l.minutes}m</span><span>{k + 1}. {c.title}</span></Button>; })}
        </div></div>
      </section>}

      <section className="max-w-6xl mx-auto w-full px-4 pt-7 md:pt-10 pb-5">
        <div className="flex flex-wrap gap-2 font-mono text-xs text-acid"><span>CHAPTER {String(i + 1).padStart(2, "0")} / {total}</span><span>·</span><span>{lesson.minutes} MIN</span><span>·</span><span>SESSION {start}–{start + lesson.minutes} MIN</span></div>
        <h1 className="text-4xl md:text-6xl mt-4 leading-tight">{ch.title}</h1>
        <p className="text-lg mt-4 leading-relaxed max-w-3xl text-foreground/80">{lesson.objective}</p>
        <div role="tablist" aria-label="Chapter views" className="flex gap-1 mt-6 border-b-2 border-foreground/20">
          {VIEWS.map(({ id, label, icon: Icon }) => <Button key={id} id={`tab-${id}`} variant="lab" size="lab" role="tab" aria-selected={view === id} aria-controls="chapter-content" className="workshop-tab" onClick={() => setView(id)}><Icon /> {label}</Button>)}
        </div>
      </section>

      {presenter && <aside className="bg-paper text-ink border-y-4 border-acid px-4 py-5">
        <div className="max-w-6xl mx-auto"><h2 className="text-2xl flex items-center gap-2"><Mic /> Presenter notes · {lesson.minutes} min</h2><ol className="list-decimal pl-5 mt-4 space-y-3 text-sm leading-relaxed">{lesson.presenter.map((note) => <li key={note}>{note}</li>)}</ol><p className="mt-4 text-sm"><b>Demo cue:</b> {ch.cue}</p></div>
      </aside>}

      <main id="chapter-content" role="tabpanel" aria-labelledby={`tab-${view}`} key={`${i}-${view}`} className="flex-1 slide-in">
        {view === "demo" ? <Body next={() => go(i + 1)} /> : <div className="max-w-6xl mx-auto px-4 py-7 md:py-10">{view === "concept" ? <TeachingPanel lesson={lesson} /> : <PracticePanel lesson={lesson} />}</div>}
      </main>
      <footer className="sticky bottom-0 z-20 bg-background border-t-4 border-acid px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Button variant="lab" size="lab" className="btn-paper btn-on-dark" disabled={i === 0} onClick={() => go(i - 1)}><ArrowLeft /> Prev</Button>
          <span className="font-mono text-xs opacity-70 hidden sm:inline">Chapter {i + 1} / {total} · {start}–{start + lesson.minutes} min</span>
          <Button variant="lab" size="lab" className="btn-on-dark ml-auto" disabled={i === total - 1} onClick={() => go(i + 1)}>Next <ArrowRight /></Button>
        </div>
      </footer>
    </div>
  );
}
