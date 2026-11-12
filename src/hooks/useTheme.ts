import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "notes-theme";

function readInitial(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("coch-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // игнорируем ошибки доступа к storage
  }
  return "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
      localStorage.setItem("coch-theme", theme);
    } catch {
      // storage может быть недоступен
    }
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggle };
}
