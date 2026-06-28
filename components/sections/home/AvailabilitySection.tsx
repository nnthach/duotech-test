import { AVAILABLE_CITIES } from "@/lib/content";
import { MapPin } from "lucide-react";
import React from "react";

export default function AvailabilitySection() {
  return (
    <section className="relative z-10 border-t border-charcoal/10 bg-sand-200 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-charcoal">
          <MapPin className="h-4 w-4 text-coral" />
          Available In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {AVAILABLE_CITIES.map((city) => (
            <span
              key={city}
              className="rounded-full border border-charcoal/15 bg-white px-4 py-1.5 text-sm text-charcoal/70"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
