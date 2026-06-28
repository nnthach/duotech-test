"use client";

import { useInView } from "@/hooks/useInView";
import { HOME_TESTIMONIAL } from "@/lib/content";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function TestimonialSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-screen flex-col justify-center border-t border-charcoal/10 bg-white px-6 py-24"
    >
      <div className="mx-auto max-w-7xl text-center">
        <SectionLabel label="Client Stories" />
        <h2 className="mt-4 text-4xl font-bold text-charcoal sm:text-5xl">
          Real Trainers, <span className="text-charcoal/40">Real Results</span>
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_TESTIMONIAL.map((testimonial, index) => (
            <div
              key={testimonial.name}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`rounded-xl border border-charcoal/10 bg-sand p-6 text-left ${inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"}`}
            >
              <div className="flex gap-1 text-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber" />
                ))}
              </div>
              <p className="mt-4 text-sm text-charcoal/70">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-charcoal/50">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
