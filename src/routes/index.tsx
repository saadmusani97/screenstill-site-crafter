import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { CHAPTERS } from "@/components/lab/chapters";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI: From Curiosity to Creation — Interactive Lab" },
      { name: "description", content: "90-minute interactive Hinglish AI lab: LLMs, tokens, embeddings, RAG, agents and the AI engineer roadmap." },
      { property: "og:title", content: "AI: From Curiosity to Creation" },
      { property: "og:description", content: "Interactive Hinglish AI lab for absolute beginners — learn by clicking, not reading slides." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [i, setI] = useState(0);
  const [presenter, setPresenter] = useState(false);
  const total = CHAPTERS.length;
  const go = useCallback((n: number) => {
    setI(Math.max(0, Math.min(total - 1, n)));
    window.scrollTo({ top: 0 });
  }, [total]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
      if (e.key.toLowerCase() === "p") setPresenter((p) => !p);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [i, go]);

  const ch = CHAPTERS[i]!;
  const Body = ch.Component;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-background border-b-4 border-acid">
        <div className="flex items-center gap-3 px-4 py-2 flex-wrap">
          <span className="display text-acid text-xl">AI LAB</span>
          <span className="tag bg-acid text-ink">Chapter {i + 1} of {total}</span>
          <span className="hidden md:inline font-mono text-sm opacity-80 truncate">{ch.title}</span>
          <div className="ml-auto flex gap-2">
            <button className={`btn text-xs ${presenter ? "btn-red" : "btn-paper"}`} onClick={() => setPresenter(!presenter)} aria-pressed={presenter}>
              Presenter {presenter ? "ON" : "OFF"}
            </button>
          </div>
        </div>
        <div className="flex h-2">
          {CHAPTERS.map((c, k) => (
            <button key={c.title} aria-label={`Go to chapter ${k + 1}`} onClick={() => go(k)}
              className={`flex-1 border-r-2 border-background ${k <= i ? "bg-acid" : "bg-foreground/20"}`} />
          ))}
        </div>
      </header>

      {presenter && (
        <aside className="bg-red text-paper border-b-4 border-ink px-4 py-2 font-mono text-sm slide-in">
          <b>🎤 CUE:</b> {ch.cue}
        </aside>
      )}

      <main key={i} className="flex-1 slide-in">
        <Body next={() => go(i + 1)} />
      </main>

      <footer className="sticky bottom-0 bg-background border-t-4 border-acid px-4 py-2 flex items-center gap-3">
        <button className="btn btn-paper btn-on-dark" disabled={i === 0} onClick={() => go(i - 1)}>← Prev</button>
        <span className="font-mono text-xs opacity-70 hidden sm:inline">Use ← → keys · P = presenter</span>
        <button className="btn btn-on-dark ml-auto" disabled={i === total - 1} onClick={() => go(i + 1)}>Next →</button>
      </footer>
    </div>
  );
}
