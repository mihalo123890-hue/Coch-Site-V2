/**
 * Типы для рекламных блоков (3 слева и 3 справа)
 */

export interface AdSlot {
  /** Изображение, GIF или видео (URL или путь к файлу в папке ads/) */
  image: string;
  /** Текст / надпись под картинкой */
  text: string;
  /** Общая ссылка при клике на картинку или текст */
  link?: string;
  /** Отдельная ссылка только при клике на картинку (если отличается от link) */
  imageLink?: string;
  /** Отдельная ссылка только при клике на текст (если отличается от link) */
  textLink?: string;
}

export interface SideAdsSeparated {
  /** 1, 2, 3: Картинки (URL или путь) */
  images?: string[];
  /** 1, 2, 3: Тексты под картинками */
  texts?: string[];
  /** 1, 2, 3: Ссылки для перехода */
  links?: string[];
  /** 1, 2, 3: Отдельные ссылки для картинок */
  imageLinks?: string[];
  /** 1, 2, 3: Отдельные ссылки для текста */
  textLinks?: string[];

  // Русскоязычные ключи (для максимального удобства при редактировании на GitHub)
  картинки?: string[];
  текст_под_ними?: string[];
  ссылки?: string[];
  отдельные_ссылки_для_картинок?: string[];
  отдельные_ссылки_для_текста?: string[];
}

export type SideAdsInput = SideAdsSeparated | AdSlot[];

export interface AdsConfigRaw {
  _комментарий?: string;
  _инструкция?: string;
  _help?: string;

  left?: SideAdsInput;
  right?: SideAdsInput;

  // Русскоязычные секции
  слева?: SideAdsInput;
  справа?: SideAdsInput;
}

export interface NormalizedAds {
  left: AdSlot[];
  right: AdSlot[];
}
