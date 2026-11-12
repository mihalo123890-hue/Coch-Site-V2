import type { Theme } from "../hooks/useTheme";
import { cn } from "../utils/cn";

interface Props {
  theme: Theme;
  onToggle: () => void;
  /** Где показывать кнопку: на старте — справа снизу, дальше — справа сверху */
  position: "bottom-right" | "top-right";
}

export default function ThemeToggle({ theme, onToggle, position }: Props) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
      className={cn(
        "fixed z-30 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 cursor-pointer",
        "border-stone-200 bg-white/80 text-stone-600 backdrop-blur hover:border-stone-300 hover:text-stone-900",
        "dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-400 dark:hover:border-stone-700 dark:hover:text-stone-100",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60 shadow-xs",
        position === "bottom-right" ? "bottom-5 right-5" : "right-5 top-5"
      )}
    >
      {isDark ? (
        // луна
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      ) : (
        // солнце
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.64 5.64l1.06 1.06M17.3 17.3l1.06 1.06M5.64 18.36l1.06-1.06M17.3 6.7l1.06-1.06" />
        </svg>
      )}
    </button>
  );
}
