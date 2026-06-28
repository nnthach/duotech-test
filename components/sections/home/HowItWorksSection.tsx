"use client";

import { useInView } from "@/hooks/useInView";
import { HOW_IT_WORKS_STEPS } from "@/lib/content";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function HowItWorksSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="how-it-works"
      className="relative z-10 flex min-h-screen flex-col justify-center bg-sand px-6 py-24"
    >
      <div className="mx-auto max-w-7xl text-center">
        <SectionLabel label="How It Works" />
        <h2 className="mt-4 text-4xl font-bold text-charcoal sm:text-5xl">
          Three Steps To Your
          <br />
          <span className="text-charcoal/40">Perfect Trainer Match</span>
        </h2>

        <div
          ref={ref}
          className="relative mt-20 grid gap-12 sm:grid-cols-3 sm:gap-6"
        >
          <div className="absolute left-[16.5%] right-[16.5%] top-7 hidden h-px bg-coral/30 sm:block" />

          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.number}
              style={{ animationDelay: `${index * 150}ms` }}
              className={`relative flex flex-col items-center text-center ${
                inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-coral text-lg font-bold text-white shadow-lg shadow-coral/30">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-charcoal/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
