# Коч-Site-V2

**Коч-опрос** — школьный опрос в стиле тетрадного листа (светлая тема) и школьной доски (тёмная тема).
23 вопроса идут в случайном порядке, в конце собирается ведомость «вопрос — ответ» с твоей подписью — её можно скопировать или скачать `.txt`-файлом.

🌐 После публикации сайт откроется по адресу: **https://mihalo123890-hue.github.io/Coch-Site-V2/**

## Что внутри

- React 19 + TypeScript + Vite 7
- Tailwind CSS 4 (через `@tailwindcss/vite`)
- `vite-plugin-singlefile` — сборка в один самодостаточный `index.html` (идеально для GitHub Pages)
- Тёмная/светлая тема (сохраняется в `localStorage`, ключ `coch-theme`)
- Перемешивание вопросов криптографическим ГСЧ (`crypto.getRandomValues`, Fisher–Yates)

## Команды

```bash
npm install        # установить зависимости
npm run dev        # dev-сервер
npm run build      # production-сборка в dist/ (base = /Coch-Site-V2/)
npm run preview    # локальный просмотр сборки
npm run typecheck  # проверка типов (tsc --noEmit)
```

> Локальная сборка для превью с корневым base: `BASE_PATH=/ npm run build`

## GitHub Pages

Сайт публикуется автоматически из ветки через **GitHub Actions**:

- workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- срабатывает на `push` в `main` и на ручной запуск (`workflow_dispatch`)
- шаги: `npm ci` → `npm run build` → загрузка `dist/` в Pages
- в `vite.config.ts` задан `base: "/Coch-Site-V2/"` — обязательно для project-site Pages

### Как включить (один раз)

В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions** → сохранить.
После этого мёрдж в `main` сам опубликует сайт на `https://mihalo123890-hue.github.io/Coch-Site-V2/`.

> Примечание: включить Pages через API может только токен с админ-правами на Pages
> (у обычного Actions-токена их нет: `gh api …/pages -X POST` вернёт `403 Resource not accessible`),
> поэтому надёжный путь — переключить Source в настройках репозитория вручную.

## Вопросы

Все вопросы лежат в [`src/data/questions.ts`](src/data/questions.ts) — просто правь массив.
Порядок в файле не важен: при каждом запуске опроса они перемешиваются заново.

## Структура

```
src/
  App.tsx                  # переключение экранов: старт → опрос → ведомость
  main.tsx
  index.css                # дизайн-система «Тетрадь / Доска»
  data/questions.ts        # список вопросов
  hooks/useTheme.ts        # светлая / тёмная тема
  components/
    StartScreen.tsx        # стартовый экран (форма «Подпись»)
    QuizScreen.tsx         # экран вопроса («билет» + прогресс-маркер)
    ResultScreen.tsx       # ведомость «вопрос — ответ» + печать «ЗАЧЁТ»
    ThemeToggle.tsx        # переключатель темы
    Doodles.tsx            # рукописные SVG-декорации
  utils/shuffle.ts         # Fisher–Yates на криптостойком ГСЧ
  utils/cn.ts              # clsx + tailwind-merge
```
