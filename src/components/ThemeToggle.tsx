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
      aria-label={isDark ? "Включить светлую тему (тетрадь)" : "Включить тёмную тему (доска)"}
      title={isDark ? "Светлая тема — тетрадь" : "Тёмная тема — доска"}
      className={cn(
        "fixed z-40 flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all duration-200",
        "border-[var(--ink)] bg-[var(--panel)] text-[var(--ink)] shadow-[3px_3px_0_var(--ink)]",
        "hover:-translate-y-0.5 hover:shadow-[4px_5px_0_var(--ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--ink)]",
        position === "bottom-right" ? "bottom-5 right-5" : "right-4 top-4 sm:right-6 sm:top-6"
      )}
    >
      {isDark ? (
        // луна — «доска выключена»
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          <path d="M15.5 4.5h.01M18 8h.01M13.5 2.8h.01" strokeWidth="2.4" />
        </svg>
      ) : (
        // солнце — «урок начался»
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
        </svg>
      )}
    </button>
  );
}
