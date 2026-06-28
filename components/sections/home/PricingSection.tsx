"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { HOME_PLAN_FEATURES, HOME_PLANS } from "@/lib/content";
import { Check, ShieldCheck, Star } from "lucide-react";
import React from "react";

export default function PricingSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="pricing" ref={ref} className="border-b border-white/10 px-6">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
          Pricing Plans
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Choose Your Plan
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_PLANS.map((plan, index) => (
            <div
              key={plan.duration}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`relative flex flex-col rounded-2xl border p-6 text-left transition ${
                plan.popular
                  ? "border-red-600 bg-zinc-950 shadow-[0_0_50px_rgba(220,38,38,0.35)]"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }
              ${inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"}    
              `}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  <Star className="h-3 w-3 fill-white" /> Most Popular
                </span>
              )}

              <p className="text-sm font-bold uppercase tracking-wide text-white">
                {plan.duration}
              </p>
              <span className="mt-2 h-0.5 w-8 bg-red-600" />

              <p className="mt-4 text-3xl font-extrabold">
                {plan.price}
                <span className="text-base font-bold text-red-500">đ</span>
              </p>
              <p className="text-xs text-white/50">/month</p>

              <ul className="mt-6 flex-1 space-y-3 text-sm text-white/80">
                {HOME_PLAN_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "red" : "redOutline"}
                className="mt-6 font-semibold"
              >
                Choose this plan
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-white/40">
          <ShieldCheck className="h-4 w-4 text-red-500" />
          Prices include VAT. No hidden fees.
        </p>
      </div>
    </section>
  );
}
