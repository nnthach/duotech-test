"use client";

import { useInView } from "@/hooks/useInView";
import { HOME_TESTIMONIAL } from "@/lib/content";
import { Star } from "lucide-react";
import React from "react";

export default function TestimonialSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="border-b border-white/10 px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
          What Our Members Say
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Real Results, Real People
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_TESTIMONIAL.map((testimonial, index) => (
            <div
              key={testimonial.name}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`rounded-xl border border-white/10 bg-white/5 p-6 text-left ${inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"}`}
            >
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400" />
                ))}
              </div>
              <p className="mt-4 text-sm text-white/70">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
