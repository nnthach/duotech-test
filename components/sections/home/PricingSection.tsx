"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { COACHING_PLANS } from "@/lib/content";
import { Check, Star } from "lucide-react";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function PricingSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="pricing"
      className="relative z-10 flex min-h-screen flex-col justify-center border-t border-charcoal/10 bg-sand-100 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl text-center">
        <SectionLabel label="Coaching Plans" />
        <h2 className="mt-4 text-4xl font-bold text-charcoal sm:text-5xl">
          Pay For Coaching,
          <br />
          <span className="text-charcoal/40">Not A Membership</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-charcoal/60">
          Book a single session or commit to ongoing coaching — every plan
          connects you directly with your trainer.
        </p>

        <div
          ref={ref}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {COACHING_PLANS.map((plan, index) => (
            <div
              key={plan.name}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`relative flex flex-col rounded-2xl border p-8 text-left transition ${
                plan.popular
                  ? "border-charcoal bg-charcoal text-white shadow-xl"
                  : "border-charcoal/10 bg-white text-charcoal hover:border-coral/40"
              } ${
                inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-coral px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  <Star className="h-3 w-3 fill-white" /> Most Popular
                </span>
              )}

              <p className="text-sm font-bold uppercase tracking-wide">
                {plan.name}
              </p>
              <p
                className={`mt-2 text-sm ${
                  plan.popular ? "text-white/60" : "text-charcoal/60"
                }`}
              >
                {plan.description}
              </p>

              <p className="mt-6 text-3xl font-extrabold">
                {plan.price}
                <span className="text-base font-bold text-coral">đ</span>
              </p>
              <p
                className={`text-xs ${
                  plan.popular ? "text-white/50" : "text-charcoal/50"
                }`}
              >
                {plan.period}
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-coral">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "accent" : "accentOutline"}
                className="mt-6 font-semibold"
              >
                Choose This Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
