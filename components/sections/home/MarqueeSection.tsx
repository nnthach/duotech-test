import React from "react";

const MARQUEE_ITEMS = [
  "Find Your Trainer",
  "Train Smarter",
  "Track Real Progress",
  "Book In Minutes",
];

export default function MarqueeSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative z-10 overflow-hidden bg-sand-100 py-4">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mx-6 flex items-center gap-6 whitespace-nowrap text-sm font-bold uppercase tracking-widest text-charcoal"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-charcoal/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
