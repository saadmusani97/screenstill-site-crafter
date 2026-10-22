import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lesson } from "./curriculum";

export function TeachingPanel({ lesson }: { lesson: Lesson }) {
  const [index, setIndex] = useState(0);
  const current = lesson.steps[index];
  if (!current) return null;
  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-8">
      <nav aria-label="Concepts" className="flex lg:flex-col gap-2 flex-wrap content-start">
        {lesson.steps.map((step, i) => <Button key={step.title} variant="lab" size="lab" aria-current={index === i ? "step" : undefined} className={`concept-link ${index === i ? "btn-green" : "btn-paper"}`} onClick={() => setIndex(i)}><span className="font-mono shrink-0">{String(i + 1).padStart(2, "0")}</span><span>{step.title}</span></Button>)}
      </nav>
      <article className="min-w-0" key={index}>
        <span className="font-mono text-sm text-acid">CONCEPT {index + 1} / {lesson.steps.length}</span>
        <h2 className="text-3xl md:text-5xl mt-3 leading-tight">{current.title}</h2>
        <p className="mt-5 text-lg leading-relaxed max-w-3xl">{current.explanation}</p>
        <div className="border-l-4 border-volt pl-5 my-7"><h3 className="text-xl text-volt flex items-center gap-2"><Lightbulb size={20} /> Simple analogy</h3><p className="mt-2 leading-relaxed">{current.analogy}</p></div>
        <div className="border-y-2 border-foreground/20 py-6"><h3 className="text-xl text-acid">Worked example</h3><p className="mt-3 text-lg leading-relaxed max-w-3xl">{current.example}</p></div>
        <p className="mt-5 text-sm leading-relaxed"><b className="text-acid">Dhyaan rahe: </b>{current.caution}</p>
        <div className="flex justify-between gap-4 mt-8">
          <Button variant="lab" size="lab" className="btn-paper btn-on-dark" disabled={index === 0} onClick={() => setIndex(index - 1)} aria-label="Previous concept"><ArrowLeft /> Pichhla</Button>
          <Button variant="lab" size="lab" className="btn-on-dark" disabled={index === lesson.steps.length - 1} onClick={() => setIndex(index + 1)}>Agla concept <ArrowRight /></Button>
        </div>
      </article>
    </div>
  );
}

export function PracticePanel({ lesson }: { lesson: Lesson }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  return <div className="max-w-4xl space-y-8">
    <section className="border-l-4 border-acid pl-5"><h2 className="text-3xl text-acid">Classroom activity</h2><p className="text-lg leading-relaxed mt-3">{lesson.activity}</p></section>
    {lesson.practice.map((q, i) => <section key={q.question} className="border-t-2 border-foreground/20 pt-6">
      <span className="font-mono text-sm text-volt">CHECKPOINT {i + 1}</span><h3 className="text-2xl mt-3 leading-tight normal-case">{q.question}</h3>
      <div className="grid gap-3 mt-5">{q.options.map((option, k) => <Button key={option} variant="lab" size="lab" aria-pressed={answers[i] === k} onClick={() => setAnswers({ ...answers, [i]: k })} className={`justify-start btn-on-dark ${answers[i] === k ? (k === q.correct ? "btn-green" : "btn-red") : "btn-paper"}`}><span className="font-mono">{String.fromCharCode(65 + k)}.</span>{option}</Button>)}</div>
      {answers[i] !== undefined && <p role="status" className="mt-5 border-l-4 border-volt pl-4 leading-relaxed"><b>{answers[i] === q.correct ? "Sahi! " : "Dobara socho. "}</b>{q.reason}</p>}
    </section>)}
    <details className="border-t-2 border-foreground/20 pt-5"><summary className="cursor-pointer flex gap-2 items-center text-acid font-bold"><Check size={18} /> Discussion wrap-up <ChevronDown size={18} /></summary><p className="mt-3 leading-relaxed">{lesson.objective}</p></details>
  </div>;
}