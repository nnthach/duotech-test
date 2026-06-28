import { HOME_PLAN_FEATURES, HOME_PLANS } from "@/lib/content";
import { Star } from "lucide-react";
import React from "react";

export default function PricingSection() {
  return (
    <section id="pricing" className="border-b border-white/10 px-6">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
          Pricing Plans
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Choose Your Plan
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_PLANS.map((plan) => (
            <div
              key={plan.duration}
              className={`relative flex flex-col rounded-xl border p-6 text-left ${
                plan.popular
                  ? "border-red-600 bg-gradient-to-b from-red-700 to-red-900"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-700">
                  <Star className="h-3 w-3 fill-red-700" /> Most Popular
                </span>
              )}
              <p className="text-sm font-medium text-white/70">
                {plan.duration}
              </p>
              <p className="mt-2 text-3xl font-bold">
                {plan.price}
                <span className="text-base font-medium text-white/60">đ</span>
              </p>
              <p className="text-xs text-white/50">/month</p>

              <ul className="mt-6 flex-1 space-y-3 text-sm text-white/80">
                {HOME_PLAN_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-red-400">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-6 rounded-md px-4 py-2 text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-white text-red-700 hover:bg-white/90"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Choose this plan
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/40">
          * Prices include VAT. No hidden fees.
        </p>
      </div>
    </section>
  );
}
