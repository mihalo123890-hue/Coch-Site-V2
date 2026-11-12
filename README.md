# Коч-Site-V2

**Коч-опрос** — школьный опрос в стиле тетрадного листа (светлая тема) и школьной доски (тёмная тема).
23 вопроса идут в случайном порядке, в конце собирается ведомость «вопрос — ответ» с твоей подписью — её можно скопировать или скачать `.txt`-файлом.

🌐 Сайт: **https://mihalo123890-hue.github.io/Coch-Site-V2/**

## Что внутри

- React 19 + TypeScript + Vite 7
- Tailwind CSS 4 (через `@tailwindcss/vite`)
- `vite-plugin-singlefile` — вся сборка (JS + CSS) инлайнится в один `docs/index.html`
- Тёмная/светлая тема (сохраняется в `localStorage`, ключ `coch-theme`)
- Перемешивание вопросов криптографическим ГСЧ (`crypto.getRandomValues`, Fisher–Yates)

## Команды

```bash
npm install        # установить зависимости
npm run dev        # dev-сервер
npm run build      # сборка в docs/ (основа для GitHub Pages)
npm run preview    # локальный просмотр сборки
npm run typecheck  # проверка типов (tsc --noEmit)
```

> Локальная сборка для превью с корневым base: `BASE_PATH=/ npm run build`

## GitHub Pages — как это устроено

Сайт публикуется через **Deploy from a branch** (без GitHub Actions):

- **Ветка:** `main` · **Папка:** `/docs`
- Источник — готовый собранный файл `docs/index.html` (весь CSS/JS внутри, внешних ассетов нет — только Google Fonts)
- Пустой `docs/.nojekyll` отключает обработку Jekyll, чтобы GitHub отдавал файлы как есть

Настройка (один раз): **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
**Branch: `main`**, **Folder: `/docs`** → **Save**. Через ~минуту сайт обновится.

### Почему раньше была белая страница

Pages отдавал корень репозитория, а там лежит «сырой» `index.html` для разработки:
в нём `<script type="module" src="/src/main.tsx">` — TypeScriptX браузер исполнить не может,
поэтому React не запускался и страница оставалась пустой. Теперь Pages отдаёт из `/docs`
уже собранный самодостаточный файл — страница работает сразу.

### После изменения сайта

```bash
npm run build          # пересобрать docs/
git add docs/ && git commit -m "Rebuild" && git push
```

(Пуш в `main` сам обновит Pages — сборка в CI не нужна.)

## Вопросы

Все вопросы лежат в [`src/data/questions.ts`](src/data/questions.ts) — просто правь массив.
Порядок в файле не важен: при каждом запуске опроса они перемешиваются заново.

## Структура

```
docs/                    # ← готовая сборка, которую отдаёт GitHub Pages
  index.html             #    один самодостаточный файл
  .nojekyll              #    отключение Jekyll
src/
  App.tsx                # переключение экранов: старт → опрос → ведомость
  main.tsx
  index.css              # дизайн-система «Тетрадь / Доска»
  data/questions.ts      # список вопросов
  hooks/useTheme.ts      # светлая / тёмная тема
  components/
    StartScreen.tsx      # стартовый экран (форма «Подпись»)
    QuizScreen.tsx       # экран вопроса («билет» + прогресс-маркер)
    ResultScreen.tsx     # ведомость «вопрос — ответ» + печать «ЗАЧЁТ»
    ThemeToggle.tsx      # переключатель темы
    Doodles.tsx          # рукописные SVG-декорации
  utils/shuffle.ts       # Fisher–Yates на криптостойком ГСЧ
  utils/cn.ts            # clsx + tailwind-merge
```
