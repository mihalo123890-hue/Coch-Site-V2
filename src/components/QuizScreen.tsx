import { useRef, useState } from "react";

interface Props {
  questions: string[];
  onFinish: (answers: string[]) => void;
}

/** Псевдо-штрихкод из «типографии» */
const BARS = [3, 1, 2, 1, 4, 1, 1, 2, 5, 1, 2, 2, 1, 3, 1, 1, 4, 2, 1, 2, 1, 3];

export default function QuizScreen({ questions, onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const total = questions.length;
  const isLast = index === total - 1;
  const progress = (index / total) * 100;

  const submit = () => {
    const next = [...answers, value.trim()];
    setAnswers(next);
    setValue("");
    if (isLast) {
      onFinish(next);
    } else {
      setIndex(index + 1);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // не отправлять, пока идёт ввод через IME (китайский, японский и т.д.)
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-5 py-16 sm:px-6">
      {/* прогресс-маркер сверху */}
      <div
        className="meter-track fixed left-0 right-0 top-0 z-30 h-2"
        role="progressbar"
        aria-valuenow={index}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Прогресс опроса"
      >
        <div className="meter-fill" style={{ width: `${progress}%` }} />
      </div>

      <div key={index} className="fade-up w-full">
        {/* счётчик */}
        <div className="flex items-end justify-between gap-4">
          <p className="hand text-2xl leading-none text-[var(--ink-soft)]">
            вопрос <span className="text-[var(--pen-blue)]">{index + 1}</span>
            <span className="text-[var(--ink-soft)]"> из {total}</span>
          </p>
          <p className="kicker text-[10px]">Билет № {String(index + 1).padStart(2, "0")}</p>
        </div>

        {/* «билет» с вопросом */}
        <section className="ticket mt-3 p-6 sm:p-8" style={{ transform: "rotate(-0.4deg)" }}>
          <div className="flex items-start justify-between gap-6 pl-1">
            <h2 className="text-xl font-medium leading-snug text-[var(--ink)] sm:text-2xl">
              {questions[index]}
            </h2>
            <svg
              className="mt-1 hidden shrink-0 text-[var(--pen-red)] sm:block"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 12.5l2 2 3.5-4" />
            </svg>
          </div>

          {/* типографский низ билета */}
          <div className="mt-6 flex items-end justify-between gap-4 pl-1 opacity-70">
            <div className="flex h-6 items-end gap-[3px] text-[var(--ink)]" aria-hidden="true">
              {BARS.map((w, i) => (
                <span
                  key={i}
                  className="inline-block bg-current"
                  style={{ width: `${w * 1.6}px`, height: i % 4 === 0 ? "100%" : "78%" }}
                />
              ))}
            </div>
            <p className="hand text-lg leading-none text-[var(--ink-soft)]">коч-опрос · 2026</p>
          </div>
        </section>

        {/* ответ */}
        <div className="mt-6 flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            autoFocus
            placeholder="Твой ответ… (или прочеркни, если «не знаю»)"
            aria-label="Ответ"
            className="answer-area max-h-48 min-h-[3.25rem] flex-1 resize-none px-4 py-3.5 text-base leading-relaxed text-[var(--ink)] placeholder:text-[var(--ink-soft)] [field-sizing:content]"
          />
          <button
            type="button"
            onClick={submit}
            aria-label={isLast ? "Завершить и получить ведомость" : "Следующий вопрос"}
            title={isLast ? "Завершить (Enter)" : "Дальше (Enter)"}
            className="btn-icon"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isLast ? (
                <path d="M4 12.5l5.2 5L20 6.5" />
              ) : (
                <path d="M5 12h14M13 6l6 6-6 6" />
              )}
            </svg>
          </button>
        </div>

        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          Enter — дальше · Shift + Enter — новая строка
        </p>
      </div>
    </main>
  );
}
