import { useState } from "react";
import { DoodleArrow, DoodleStar, PaperPlane, Sparkle, Squiggle } from "./Doodles";

interface Props {
  total: number;
  initialName: string;
  onStart: (name: string) => void;
}

const plural = (n: number, one: string, few: string, many: string) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

export default function StartScreen({ total, initialName, onStart }: Props) {
  const [name, setName] = useState(initialName);
  const trimmed = name.trim();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmed) onStart(trimmed);
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center overflow-hidden px-6 pb-24 pt-14 sm:pt-10">
      {/* декоративные дудлы по углам */}
      <PaperPlane
        className="float-soft doodle pointer-events-none absolute right-2 top-20 hidden h-16 w-16 rotate-6 select-none sm:block md:right-6"
      />
      <DoodleStar
        className="doodle doodle-red pointer-events-none absolute bottom-36 left-3 hidden h-8 w-8 -rotate-12 select-none md:block"
      />
      <Sparkle
        className="doodle doodle-blue pointer-events-none absolute right-10 top-40 hidden h-4 w-4 select-none md:block"
      />
      <Sparkle
        className="doodle pointer-events-none absolute bottom-40 right-24 hidden h-3 w-3 select-none lg:block"
        style={{ animationDelay: "0.6s" }}
      />

      {/* верхняя строка: форма + вариант */}
      <div className="fade-up flex items-center justify-between gap-3">
        <span className="chip">Форма опроса № 23</span>
        <span className="hand hidden text-xl text-[var(--ink-soft)] sm:block" style={{ transform: "rotate(2deg)" }}>
          вариант «честный»
        </span>
      </div>

      {/* заголовок */}
      <header className="fade-up mt-8" style={{ animationDelay: "80ms" }}>
        <p className="kicker">Всё, что ты хотел знать о школе</p>
        <h1 className="hand mt-2 text-7xl font-bold leading-[0.95] tracking-tight text-[var(--ink)] sm:text-8xl">
          Коч&#8209;<span className="highlight">опрос</span>
        </h1>
        <Squiggle className="doodle doodle-blue mt-3 w-56 sm:w-64" />
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)]">
          {total} {plural(total, "вопрос", "вопроса", "вопросов")} в случайном
          порядке — про школу, учителей и соседнюю параллель. Отвечай как есть:
          в конце получишь ведомость «вопрос — ответ» со своей подписью.
        </p>
      </header>

      {/* карточка с формой */}
      <form
        onSubmit={submit}
        className="card fade-up relative mt-8 p-6 sm:p-7"
        style={{ animationDelay: "160ms" }}
      >
        <div className="flex items-baseline justify-between gap-3">
          <label
            htmlFor="coch-name"
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]"
          >
            Подпись в ведомости
          </label>
          <span className="hand text-lg leading-none text-[var(--pen-red)]" style={{ transform: "rotate(-3deg)" }}>
            обязательно!
          </span>
        </div>
        <input
          id="coch-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Иванов Пётр, 8 «Б»"
          maxLength={60}
          autoComplete="off"
          autoFocus
          className="field mt-2"
        />

        <button
          type="submit"
          disabled={!trimmed}
          className="btn-ink btn-primary mt-6 w-full justify-center text-base disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          Приступить к опросу
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        <div className="mt-3 flex items-center justify-center gap-2 text-[var(--ink-soft)]">
          <DoodleArrow className="h-4 w-9 rotate-6" />
          <p className="hand text-lg leading-none">Enter — тоже сработает</p>
        </div>
      </form>

      {/* подвал */}
      <p className="fade-up mt-8 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ink-soft)]" style={{ animationDelay: "240ms" }}>
        кабинет 204 · ОБЗР · вторая смена · отметка: <span className="text-[var(--pen-red)]">зачёт</span>
      </p>
    </main>
  );
}
