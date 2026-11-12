import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
// base — обязательно для GitHub Pages project-site:
// сайт будет доступен по адресу https://<логин>.github.io/Coch-Site-V2/
// (в песочнице/превью можно переопределить переменной окружения BASE_PATH=/)
const base = process.env.BASE_PATH ?? "/Coch-Site-V2/";

// GitHub Pages публикует ветку "main" из папки "/docs",
// поэтому сборка кладёт самодостаточный index.html именно туда.
// (dist/ больше не используется; в репозитории хранится готовый результат.)
export default defineConfig({
  base,
  build: {
    outDir: "docs",
  },
  preview: {
    // превью-хост песочницы отличается от localhost — разрешаем любые хосты
    allowedHosts: true,
  },
  server: {
    allowedHosts: true,
  },
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
