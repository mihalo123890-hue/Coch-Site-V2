import { cn } from "../utils/cn";

/** Волнистая линия, как будто нарисована ручкой */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 14"
      fill="none"
      aria-hidden="true"
      className={cn("h-3 w-44", className)}
    >
      <path
        d="M3 9c18-6 30 4 48 0s32 4 52 0 30 4 52 0 32 4 62-2"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Четырёхлучевая искорка */
export function Sparkle({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={style}
      className={cn("h-5 w-5", className)}
    >
      <path d="M12 0c.9 6.9 4.2 10.2 12 12-7.8 1.8-11.1 5.1-12 12-.9-6.9-4.2-10.2-12-12C7.8 10.2 11.1 6.9 12 0Z" />
    </svg>
  );
}

/** Звезда, нарисованная от руки */
export function DoodleStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <path
        d="M24 4l5.6 13.4L44 17l-11 9.6 3.6 13.9L24 32.4 11.3 40.5 14.9 26.6 4 17l14.3-.4L24 4Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Бумажный самолётик */
export function PaperPlane({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("h-12 w-12", className)}
    >
      <path
        d="M4 25.5 44 6 28 44l-4.5-15L4 25.5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M23.5 29 44 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Учебная стрелка → */
export function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-6 w-14", className)}
    >
      <path
        d="M4 20c12-10 30-12 46-6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M42 6l9 8-11 4"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
