import type { AdSlot, AdsConfigRaw, NormalizedAds, SideAdsInput, SideAdsSeparated } from "../types/ads";

/**
 * Стандартные настройки рекламы по умолчанию (3 слева и 3 справа).
 * Если ads.json не загружен или не настроен, используются эти значения.
 */
export const DEFAULT_ADS_RAW: AdsConfigRaw = {
  _инструкция: "Настройки рекламы: 3 блока слева и 3 блока справа. Можно указывать внешнюю ссылку (https://...) или путь к файлу в папке ads/ (например ads/my-photo.jpg или ads/my-gif.gif).",
  слева: {
    картинки: [
      "ads/left-1.svg",
      "ads/left-2.svg",
      "ads/left-3.svg",
    ],
    текст_под_ними: [
      "Реклама 1 · Наш Telegram канал",
      "Реклама 2 · Свежие мемы и гифки",
      "Реклама 3 · Партнёрский сервис",
    ],
    ссылки: [
      "https://github.com/mihalo123890-hue/Coch-Site-V2",
      "https://github.com/mihalo123890-hue/Coch-Site-V2",
      "https://github.com/mihalo123890-hue/Coch-Site-V2",
    ],
    отдельные_ссылки_для_картинок: ["", "", ""],
    отдельные_ссылки_для_текста: ["", "", ""],
  },
  справа: {
    картинки: [
      "ads/right-1.svg",
      "ads/right-2.svg",
      "ads/right-3.svg",
    ],
    текст_под_ними: [
      "Реклама 1 · Официальный чат",
      "Реклама 2 · Школьный мерч и стикеры",
      "Реклама 3 · Спонсор опросника",
    ],
    ссылки: [
      "https://github.com/mihalo123890-hue/Coch-Site-V2",
      "https://github.com/mihalo123890-hue/Coch-Site-V2",
      "https://github.com/mihalo123890-hue/Coch-Site-V2",
    ],
    отдельные_ссылки_для_картинок: ["", "", ""],
    отдельные_ссылки_для_текста: ["", "", ""],
  },
};

/**
 * Проверяет, является ли ссылка видеофайлом (.mp4, .webm, .ogg, .mov)
 */
export function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  const clean = url.split("?")[0].split("#")[0].toLowerCase();
  return /\.(mp4|webm|ogg|mov)$/i.test(clean);
}

/**
 * Разрешает путь к медиа-файлу с учётом базового пути сайта (GitHub Pages / субдомен)
 */
export function resolveMediaUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) return "";
  const trimmed = pathOrUrl.trim();
  if (!trimmed) return "";

  // Абсолютные URL, data URI или blob оставляем как есть
  if (/^(https?:|\/\/|data:|blob:)/i.test(trimmed)) {
    return trimmed;
  }

  // Очищаем от ведущих слэшей и точек
  const clean = trimmed.replace(/^\.?\/+/, "");

  // Базовый путь из vite (например "/Coch-Site-V2/" или "/")
  const baseUrl =
    (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  // Если путь не содержит префикса "ads/" и это просто имя файла, добавим "ads/"
  if (!clean.startsWith("ads/") && !clean.includes("/")) {
    return `${normalizedBase}ads/${clean}`;
  }

  return `${normalizedBase}${clean}`;
}

/**
 * Нормализует одну сторону (слева или справа) к строгому массиву из 3 элементов.
 */
function normalizeSide(input?: SideAdsInput, fallbackItems?: AdSlot[]): AdSlot[] {
  const result: AdSlot[] = [];

  if (Array.isArray(input)) {
    // Формат: массив объектов
    for (let i = 0; i < 3; i++) {
      const item = input[i];
      const fallback = fallbackItems?.[i];
      const image = item?.image || fallback?.image || "";
      const text = item?.text || fallback?.text || "";
      const link = item?.link || fallback?.link || "";
      const imageLink = item?.imageLink || fallback?.imageLink || link;
      const textLink = item?.textLink || fallback?.textLink || link;

      result.push({ image, text, link, imageLink, textLink });
    }
    return result;
  }

  const separated = (input || {}) as SideAdsSeparated;
  const images = separated.картинки || separated.images || [];
  const texts = separated.текст_под_ними || separated.texts || [];
  const links = separated.ссылки || separated.links || [];
  const imageLinks = separated.отдельные_ссылки_для_картинок || separated.imageLinks || [];
  const textLinks = separated.отдельные_ссылки_для_текста || separated.textLinks || [];

  for (let i = 0; i < 3; i++) {
    const fallback = fallbackItems?.[i];
    const image = images[i] !== undefined && images[i] !== "" ? images[i] : (fallback?.image || "");
    const text = texts[i] !== undefined && texts[i] !== "" ? texts[i] : (fallback?.text || "");
    const link = links[i] !== undefined ? links[i] : (fallback?.link || "");
    const explicitImageLink = imageLinks[i] !== undefined && imageLinks[i] !== "" ? imageLinks[i] : undefined;
    const explicitTextLink = textLinks[i] !== undefined && textLinks[i] !== "" ? textLinks[i] : undefined;

    const finalLink = link || "";
    const imageLink = explicitImageLink !== undefined ? explicitImageLink : finalLink;
    const textLink = explicitTextLink !== undefined ? explicitTextLink : finalLink;

    result.push({
      image,
      text,
      link: finalLink,
      imageLink,
      textLink,
    });
  }

  return result;
}

/**
 * Нормализует конфигурацию рекламы с поддержкой обоих языков (русский / английский)
 * и гарантирует наличие 3 элементов слева и 3 справа.
 */
export function normalizeAds(raw?: AdsConfigRaw | null): NormalizedAds {
  const defaultLeft = normalizeSide(DEFAULT_ADS_RAW.слева);
  const defaultRight = normalizeSide(DEFAULT_ADS_RAW.справа);

  if (!raw) {
    return { left: defaultLeft, right: defaultRight };
  }

  const leftSource = raw.слева || raw.left;
  const rightSource = raw.справа || raw.right;

  return {
    left: normalizeSide(leftSource, defaultLeft),
    right: normalizeSide(rightSource, defaultRight),
  };
}
