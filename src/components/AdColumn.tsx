import type { AdSlot } from "../types/ads";
import AdCard from "./AdCard";

interface Props {
  side: "left" | "right";
  items: AdSlot[];
}

export default function AdColumn({ side, items }: Props) {
  const sideTitle = side === "left" ? "Реклама слева" : "Реклама справа";

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
          {sideTitle}
        </h3>
        <span className="text-[10px] tabular-nums text-stone-400/80 dark:text-stone-500/80">
          {items.length} блока
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {items.map((slot, index) => (
          <AdCard
            key={`${side}-${index}`}
            slot={slot}
            side={side}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
