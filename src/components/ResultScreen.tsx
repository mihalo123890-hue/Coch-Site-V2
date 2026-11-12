import { useState } from "react";
import { Squiggle } from "./Doodles";

interface Props {
  name: string;
  questions: string[];
  answers: string[];
  onRestart: () => void;
}

const EMPTY = "—";

export default function ResultScreen({
  name,
  questions,
  answers,
  onRestart,
}: Props) {
  const [copied, setCopied] = useState(false);

  const buildText = () => {
    const lines = questions.map(
      (q, i) => `${i + 1}. ${q}\n   — ${answers[i] || EMPTY}`
    );
    return `${lines.join("\n\n")}\n\nПодпись: ${name}\n`;
  };

  const copy = async () => {
    const text = buildText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const download = () => {
    const blob = new Blob(["\uFEFF" + buildText()], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `коч-опрос — ${name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const answered = answers.filter((a) => a.trim().length > 0).length;
  const dateStr = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-6 sm:py-20">
      <div className="fade-up">
        {/* шапка ведомости */}
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="kicker">Ведомость ответов</p>
            <h1 className="hand mt-2 text-6xl font-bold leading-none text-[var(--ink)] sm:text-7xl">
              Вопрос&nbsp;—<br />
              <span className="highlight">ответ</span>
            </h1>
            <Squiggle className="doodle doodle-blue mt-4" />
          </div>
          <div className="stamp mt-2 shrink-0 select-none text-4xl sm:text-5xl" aria-hidden="true">
            ЗАЧЁТ
          </div>
        </div>

        {/* мета: дата и счётчик */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          <span>{dateStr}</span>
          <span aria-hidden="true">·</span>
          <span>
            отвечено: {answered} из {questions.length}
          </span>
        </div>

        {/* действия */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={copy} className="btn-ink">
            {copied ? (
              <>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4.5 12.5l5 5L19.5 6" />
                </svg>
                Скопировано
              </>
            ) : (
              <>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="8" y="8" width="12" height="12" rx="2.5" />
                  <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4H6.5A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
                </svg>
                Скопировать всё
              </>
            )}
          </button>
          <button type="button" onClick={download} className="btn-ink">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4v11M7.5 11 12 15.5 16.5 11" />
              <path d="M4.5 19.5h15" />
            </svg>
            Скачать .txt
          </button>
        </div>

        {/* список «вопрос — ответ» */}
        <ol className="mt-8 divide-y divide-[var(--ink-faint)] border-y-2 border-[var(--ink)]">
          {questions.map((q, i) => (
            <li key={i} className="flex gap-4 py-4 sm:gap-5">
              <span className="hand w-8 shrink-0 select-none pt-0.5 text-right text-2xl font-semibold leading-none text-[var(--pen-blue)]">
                {i + 1}.
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-relaxed text-[var(--ink-soft)]">
                  {q}
                </p>
                <p className="mt-1.5 whitespace-pre-wrap break-words text-[15px] font-medium leading-relaxed text-[var(--ink)]">
                  <span className="mr-2 font-normal text-[var(--pen-red)]">—</span>
                  {answers[i] || EMPTY}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* подпись */}
        <div className="mt-8 flex items-end justify-between gap-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
            Подпись
            <span className="mt-1 block h-px w-28 bg-[var(--ink-faint)]" />
          </p>
          <p
            className="hand max-w-[60%] break-words text-right text-4xl font-semibold leading-tight text-[var(--pen-blue)]"
            style={{ transform: "rotate(-2deg)" }}
          >
            {name}
          </p>
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)] underline decoration-[var(--pen-red)] decoration-2 underline-offset-8 transition-colors hover:text-[var(--ink)]"
          >
            Пройти заново
          </button>
        </div>
      </div>
    </main>
  );
}
