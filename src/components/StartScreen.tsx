import { useState } from "react";

interface Props {
  total: number;
  initialName: string;
  onStart: (name: string) => void;
}

export default function StartScreen({ total, initialName, onStart }: Props) {
  const [name, setName] = useState(initialName);
  const trimmed = name.trim();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmed) onStart(trimmed);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
      <div className="fade-up">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500">
          notes
        </p>
        <h1 className="text-4xl font-light tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl">
          Опрос
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          {total} вопросов в случайном порядке. В конце появится список «вопрос —
          ответ» с твоей подписью.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs text-stone-500 dark:text-stone-400">
              Твоё имя
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как тебя зовут?"
              maxLength={60}
              autoComplete="off"
              autoFocus
              className="w-full rounded-xl border border-stone-200 bg-white/70 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-300 focus:border-stone-400 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-100 dark:placeholder:text-stone-600 dark:focus:border-stone-600"
            />
          </label>

          <button
            type="submit"
            disabled={!trimmed}
            className="w-full cursor-pointer rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            Начать опрос
          </button>
        </form>
      </div>
    </div>
  );
}
