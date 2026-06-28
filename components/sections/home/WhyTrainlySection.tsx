"use client";

import { useInView } from "@/hooks/useInView";
import { WHY_TRAINLY } from "@/lib/content";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function WhyTrainlySection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="why"
      className="relative z-10 flex min-h-screen flex-col justify-center border-t border-charcoal/10 bg-sand px-6 py-24"
    >
      <div className="mx-auto max-w-7xl text-center">
        <SectionLabel label="Why Trainly" />
        <h2 className="mt-4 text-4xl font-bold text-charcoal sm:text-5xl">
          Booking A Trainer
          <br />
          <span className="text-charcoal/40">Should Feel This Easy</span>
        </h2>

        <div
          ref={ref}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WHY_TRAINLY.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`rounded-xl border border-charcoal/10 bg-white p-6 text-left transition hover:border-coral/50 hover:shadow-lg
  ${inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"}
`}
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-coral/10">
                  <Icon className="h-5 w-5 text-coral" />
                </span>
                <h3 className="text-lg font-semibold text-charcoal">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal/60">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
