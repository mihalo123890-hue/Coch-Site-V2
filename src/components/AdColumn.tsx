import type { AdSlot } from "../types/ads";
import AdCard from "./AdCard";

interface Props {
  side: "left" | "right";
  items: AdSlot[];
}

export default function AdColumn({ side, items }: Props) {
  return (
    <div className="flex flex-col gap-3.5 sm:gap-4">
      {items.map((slot, index) => (
        <AdCard
          key={`${side}-${index}`}
          slot={slot}
          side={side}
          index={index}
        />
      ))}
    </div>
  );
}
