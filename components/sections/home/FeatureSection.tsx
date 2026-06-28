"use client";

import { useInView } from "@/hooks/useInView";
import { HOME_FEATURES } from "@/lib/content";
import React from "react";

export default function FeatureSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="feature" className="border-b border-white/10 px-6 pt-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
          Why Choose IronFit?
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Everything You Need
          <br />
          to Succeed
        </h2>

        <div
          ref={ref}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HOME_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`rounded-xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-red-600/50
  ${inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"}
`}
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10">
                  <Icon className="h-5 w-5 text-red-500" />
                </span>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-white/60">
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
