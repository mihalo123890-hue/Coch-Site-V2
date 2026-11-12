import { useState } from "react";

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
    a.download = `опрос — ${name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const btn =
    "cursor-pointer rounded-xl border border-stone-200 bg-white/70 px-4 py-2.5 text-sm text-stone-700 transition hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:border-stone-600";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="fade-up">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500">
          готово
        </p>
        <h1 className="text-3xl font-light tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
          Вопрос — Ответ
        </h1>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={copy} className={btn}>
            {copied ? "Скопировано ✓" : "Скопировать всё"}
          </button>
          <button type="button" onClick={download} className={btn}>
            Скачать .txt
          </button>
        </div>

        <ol className="mt-10 divide-y divide-stone-200 dark:divide-stone-800/80">
          {questions.map((q, i) => (
            <li key={i} className="flex gap-4 py-5">
              <span className="w-6 shrink-0 pt-0.5 text-right text-xs tabular-nums text-stone-400 dark:text-stone-600">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                  {q}
                </p>
                <p className="mt-2 whitespace-pre-wrap break-words text-base text-stone-900 dark:text-stone-100">
                  <span className="mr-2 text-stone-300 dark:text-stone-600">
                    —
                  </span>
                  {answers[i] || EMPTY}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 border-t border-stone-200 pt-6 text-right dark:border-stone-800/80">
          <p className="text-xs text-stone-400 dark:text-stone-500">Подпись</p>
          <p className="mt-1 text-lg font-light italic text-stone-800 dark:text-stone-200">
            {name}
          </p>
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="cursor-pointer text-xs text-stone-400 underline-offset-4 transition hover:text-stone-700 hover:underline dark:text-stone-600 dark:hover:text-stone-300"
          >
            Пройти заново
          </button>
        </div>
      </div>
    </div>
  );
}
