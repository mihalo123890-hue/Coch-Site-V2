import { useRef, useState } from "react";

interface Props {
  questions: string[];
  onFinish: (answers: string[]) => void;
}

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
    <div className="mx-auto flex w-full max-w-2xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20">
      {/* прогресс */}
      <div className="fixed left-0 right-0 top-0 z-30 h-0.5 bg-stone-200/60 dark:bg-stone-800/60">
        <div
          className="h-full bg-stone-500 transition-all duration-500 dark:bg-stone-400"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div key={index} className="fade-up w-full">
        <p className="mb-6 text-xs tabular-nums tracking-widest text-stone-400 dark:text-stone-500">
          {index + 1} / {total}
        </p>

        <h2 className="text-xl font-light leading-relaxed text-stone-900 dark:text-stone-100 sm:text-2xl">
          {questions[index]}
        </h2>

        <div className="mt-10 flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            autoFocus
            placeholder="Твой ответ…"
            aria-label="Ответ"
            className="max-h-48 min-h-[3rem] flex-1 resize-none rounded-xl border border-stone-200 bg-white/70 px-4 py-3 text-base text-stone-900 outline-none transition [field-sizing:content] placeholder:text-stone-300 focus:border-stone-400 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-100 dark:placeholder:text-stone-600 dark:focus:border-stone-600"
          />
          <button
            type="button"
            onClick={submit}
            aria-label={isLast ? "Завершить" : "Далее"}
            title="Enter"
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-stone-900 text-stone-50 transition hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <p className="mt-3 text-xs text-stone-400 dark:text-stone-600">
          Enter — дальше · Shift + Enter — новая строка
        </p>
      </div>
    </div>
  );
}
