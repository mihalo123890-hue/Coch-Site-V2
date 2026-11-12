import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => {
  // Для продакшн сборки (GitHub Pages): /Coch-Site-V2/
  // Для локального dev-сервера и превью: /
  const base =
    process.env.BASE_PATH ?? (command === "build" ? "/Coch-Site-V2/" : "/");

  return {
    base,
    build: {
      outDir: "docs",
    },
    preview: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
    plugins: [react(), tailwindcss(), viteSingleFile()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
