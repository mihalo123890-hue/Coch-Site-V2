import { useState } from "react";
import type { AdSlot } from "../types/ads";
import { isVideoUrl, resolveMediaUrl } from "../data/ads";

interface Props {
  slot: AdSlot;
  side: "left" | "right";
  index: number;
}

export default function AdCard({ slot }: Props) {
  const [hasError, setHasError] = useState(false);
  const resolvedMedia = resolveMediaUrl(slot.image);
  const isVideo = isVideoUrl(resolvedMedia);

  const imageLink = slot.imageLink || slot.link;
  const textLink = slot.textLink || slot.link;

  return (
    <article className="group flex flex-col rounded-2xl border border-stone-200/80 bg-white/75 p-3 shadow-xs backdrop-blur-xs transition hover:border-stone-400/80 hover:shadow-md dark:border-stone-800/80 dark:bg-stone-900/60 dark:hover:border-stone-700">
      {/* Метка слота */}
      <div className="mb-2 flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-stone-400 dark:text-stone-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-stone-400 dark:bg-stone-500" />
          Реклама
        </span>
        {(imageLink || textLink) && (
          <svg
            className="h-3 w-3 opacity-60 transition group-hover:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        )}
      </div>

      {/* Медиа-блок: фото, GIF или видео */}
      {imageLink ? (
        <a
          href={imageLink}
          target="_blank"
          rel="noopener noreferrer"
          title={`Открыть ссылку: ${imageLink}`}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 dark:bg-stone-800/80"
        >
          <MediaContent
            url={resolvedMedia}
            isVideo={isVideo}
            hasError={hasError}
            onError={() => setHasError(true)}
            alt={slot.text || "Реклама"}
          />
        </a>
      ) : (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800/80">
          <MediaContent
            url={resolvedMedia}
            isVideo={isVideo}
            hasError={hasError}
            onError={() => setHasError(true)}
            alt={slot.text || "Реклама"}
          />
        </div>
      )}

      {/* Текст / подпись под картинкой */}
      {textLink ? (
        <a
          href={textLink}
          target="_blank"
          rel="noopener noreferrer"
          title={`Открыть ссылку: ${textLink}`}
          className="mt-2.5 block text-xs font-medium leading-snug text-stone-700 transition hover:text-stone-950 hover:underline dark:text-stone-300 dark:hover:text-stone-100"
        >
          {slot.text || "Реклама"}
        </a>
      ) : (
        <p className="mt-2.5 text-xs font-medium leading-snug text-stone-600 dark:text-stone-400">
          {slot.text || "Реклама"}
        </p>
      )}
    </article>
  );
}

function MediaContent({
  url,
  isVideo,
  hasError,
  onError,
  alt,
}: {
  url: string;
  isVideo: boolean;
  hasError: boolean;
  onError: () => void;
  alt: string;
}) {
  if (!url || hasError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center text-stone-400 dark:text-stone-500">
        <svg
          className="h-8 w-8 stroke-1 text-stone-300 dark:text-stone-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        <span className="mt-1 text-[11px] font-medium">Свободное место</span>
      </div>
    );
  }

  if (isVideo) {
    return (
      <video
        src={url}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      onError={onError}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
    />
  );
}
