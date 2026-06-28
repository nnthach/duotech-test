"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import {
  HOME_PLAN_FEATURES,
  HOME_PLANS,
  PRICING_HIGHLIGHTS,
} from "@/lib/content";
import { Check, ShieldCheck, Star } from "lucide-react";
import React from "react";

export default function PricingPage() {
  const { ref: plansRef, inView: plansInView } = useInView<HTMLDivElement>();
  const { ref: highlightsRef, inView: highlightsInView } =
    useInView<HTMLDivElement>();

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Header />

      <main className="min-h-screen">
        <section className="border-b border-white/10 px-6 pb-20 mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="animate-fadeUp text-center opacity-0">
              <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-widest text-red-500">
                <span className="h-px w-8 bg-red-500/60" />
                Pricing Plans
                <span className="h-px w-8 bg-red-500/60" />
              </p>
              <h1 className="mt-4 text-4xl font-extrabold uppercase leading-tight sm:text-5xl">
                Choose Your <span className="text-red-600">Plan</span>
              </h1>
              <p className="mt-4 text-white/60">
                Flexible options for every fitness goal and lifestyle.
              </p>
            </div>

            <div
              ref={plansRef}
              className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {HOME_PLANS.map((plan, index) => (
                <div
                  key={plan.duration}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`relative flex flex-col rounded-2xl border p-6 text-left transition hover:-translate-y-1 ${
                    plan.popular
                      ? "border-red-600 bg-zinc-950 shadow-[0_0_50px_rgba(220,38,38,0.35)]"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  } ${
                    plansInView
                      ? "animate-fadeUp opacity-100"
                      : "opacity-0 translate-y-6"
                  }`}
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

            <div
              ref={highlightsRef}
              className="mt-16 grid divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
            >
              {PRICING_HIGHLIGHTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`flex items-center gap-4 p-6 text-left ${
                      highlightsInView
                        ? "animate-fadeUp opacity-100"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600/10">
                      <Icon className="h-5 w-5 text-red-500" />
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p
              className={`mt-10 flex items-center justify-center gap-2 text-xs text-white/40 ${
                highlightsInView
                  ? "animate-fadeUp opacity-100"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ animationDelay: `${PRICING_HIGHLIGHTS.length * 100}ms` }}
            >
              <ShieldCheck className="h-4 w-4 text-red-500" />
              Prices include VAT. No hidden fees.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
