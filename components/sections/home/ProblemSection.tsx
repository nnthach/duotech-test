"use client";

import { useInView } from "@/hooks/useInView";
import { HOME_PAIN_POINTS } from "@/lib/content";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function ProblemSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="problems"
      className="relative z-10 flex min-h-screen flex-col justify-center bg-sand px-6 py-24"
    >
      <div className="mx-auto max-w-7xl text-center">
        <SectionLabel label="The Problem" />
        <h2 className="mt-4 text-4xl font-bold text-charcoal sm:text-5xl">
          Why Most Fitness Journeys
          <br />
          <span className="text-charcoal/40">Stall Before They Start</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-charcoal/60">
          Motivation gets you to day one. What actually gets you results is
          someone who knows your body, watches your form, and keeps you
          accountable.
        </p>

        <div ref={ref} className="mt-16 grid gap-6 text-left sm:grid-cols-3">
          {HOME_PAIN_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`rounded-2xl border border-charcoal/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg ${
                  inView
                    ? "animate-fadeUp opacity-100"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <p className="mb-4 text-xs font-semibold tracking-widest text-charcoal/30">
                  0{index + 1} / 0{HOME_PAIN_POINTS.length}
                </p>
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-coral/10 text-coral">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-charcoal">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal/60">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
