import { useEffect, useState } from "react";
import { QUESTIONS } from "./data/questions";
import { DEFAULT_ADS_RAW, normalizeAds } from "./data/ads";
import { useTheme } from "./hooks/useTheme";
import { shuffle } from "./utils/shuffle";
import type { NormalizedAds } from "./types/ads";
import ThemeToggle from "./components/ThemeToggle";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import AdColumn from "./components/AdColumn";

type Stage = "start" | "quiz" | "result";

function parseJsonSafely(text: string) {
  try {
    // Удаляем возможные комментарии // и /* */ перед парсингом
    const sanitized = text
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|[^\\:])\/\/.*$/gm, "$1")
      .trim();
    return JSON.parse(sanitized);
  } catch (err) {
    console.warn("Не удалось распарсить ads.json:", err);
    return null;
  }
}

export default function App() {
  const { theme, toggle } = useTheme();
  const [stage, setStage] = useState<Stage>("start");
  const [name, setName] = useState("");
  const [order, setOrder] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [ads, setAds] = useState<NormalizedAds>(() =>
    normalizeAds(DEFAULT_ADS_RAW)
  );

  // Загрузка настроек рекламы из ads.json
  useEffect(() => {
    let isMounted = true;

    async function fetchAds() {
      // 1. Пробуем загрузить ads.json из корня сайта (GitHub Pages docs/ads.json или public/ads.json)
      try {
        const base =
          (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) ||
          "/";
        const normalizedBase = base.endsWith("/") ? base : `${base}/`;
        const localUrl = `${normalizedBase}ads.json?t=${Date.now()}`;
        const res = await fetch(localUrl, { cache: "no-store" });
        if (res.ok) {
          const text = await res.text();
          const parsed = parseJsonSafely(text);
          if (parsed && isMounted) {
            setAds(normalizeAds(parsed));
            return;
          }
        }
      } catch {
        // локальный fetch не сработал
      }

      // 2. Fallback: если пользователь отредактировал ads.json в репозитории на GitHub
      try {
        const ghUrl =
          "https://api.github.com/repos/mihalo123890-hue/Coch-Site-V2/contents/ads.json";
        const res = await fetch(ghUrl, {
          headers: { Accept: "application/vnd.github.raw" },
          cache: "no-store",
        });
        if (res.ok) {
          const text = await res.text();
          const parsed = parseJsonSafely(text);
          if (parsed && isMounted) {
            setAds(normalizeAds(parsed));
          }
        }
      } catch {
        // оставляем DEFAULT_ADS_RAW
      }
    }

    fetchAds();
    return () => {
      isMounted = false;
    };
  }, []);

  const start = (userName: string) => {
    setName(userName);
    // каждый запуск — новый случайный порядок
    setOrder(shuffle(QUESTIONS));
    setAnswers([]);
    setStage("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finish = (result: string[]) => {
    setAnswers(result);
    setStage("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setStage("start");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(120,113,108,0.07),transparent_60%)]">
      <ThemeToggle
        theme={theme}
        onToggle={toggle}
        position={stage === "start" ? "bottom-right" : "top-right"}
      />

      {/* Основной контейнер: 3 рекламы слева | Опрос по центру | 3 рекламы справа */}
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-between px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-8 xl:gap-12">
        {/* Левая колонка рекламы (3 шт.) — на desktop слева, на mobile под опросом */}
        <aside className="order-2 w-full shrink-0 py-6 sm:py-8 lg:order-1 lg:w-60 xl:w-72 2xl:w-80 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:py-10 z-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AdColumn side="left" items={ads.left} />
        </aside>

        {/* Центральный опрос (первичный минималистичный интерфейс) */}
        <main className="order-1 flex w-full flex-1 flex-col justify-center min-h-[calc(100vh-4rem)] py-6 lg:order-2">
          {stage === "start" && (
            <StartScreen
              total={QUESTIONS.length}
              initialName={name}
              onStart={start}
            />
          )}
          {stage === "quiz" && (
            <QuizScreen questions={order} onFinish={finish} />
          )}
          {stage === "result" && (
            <ResultScreen
              name={name}
              questions={order}
              answers={answers}
              onRestart={restart}
            />
          )}
        </main>

        {/* Правая колонка рекламы (3 шт.) — на desktop справа, с отступом под ThemeToggle */}
        <aside className="order-3 w-full shrink-0 py-6 sm:py-8 lg:order-3 lg:w-60 xl:w-72 2xl:w-80 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pt-14 lg:pb-10 z-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AdColumn side="right" items={ads.right} />
        </aside>
      </div>
    </div>
  );
}
