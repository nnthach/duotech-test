"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { FEATURED_TRAINERS, SPECIALTIES } from "@/lib/content";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function TrainersSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="trainers"
      className="relative z-10 flex min-h-screen flex-col justify-center bg-sand-100 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl text-center">
        <SectionLabel label="Browse Trainers" />
        <h2 className="mt-4 text-4xl font-bold text-charcoal sm:text-5xl">
          Find Your <span className="text-charcoal/40">Perfect Match</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-charcoal/60">
          Filter by specialty to see trainers who already know how to get you
          the results you&apos;re after.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SPECIALTIES.map((specialty) => {
            const Icon = specialty.icon;
            return (
              <span
                key={specialty.label}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-charcoal/15 bg-white px-4 py-2 text-sm font-medium text-charcoal/70 transition hover:border-coral/60 hover:bg-coral/10 hover:text-coral"
              >
                <Icon className="h-4 w-4" />
                {specialty.label}
              </span>
            );
          })}
        </div>

        <div
          ref={ref}
          className="mt-14 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURED_TRAINERS.map((trainer, index) => (
            <div
              key={trainer.name}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`group overflow-hidden rounded-2xl border border-charcoal/10 bg-white text-charcoal shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                inView
                  ? "animate-fadeUp opacity-100"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-charcoal">
                  <Star className="h-3.5 w-3.5 fill-amber text-amber" />
                  {trainer.rating}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{trainer.name}</h3>
                <p className="text-sm text-charcoal/60">{trainer.specialty}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {trainer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-coral/10 px-2.5 py-1 text-xs font-medium text-coral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <p>
                    <span className="text-base font-bold">
                      {trainer.price}đ
                    </span>
                    <span className="text-xs text-charcoal/50"> /session</span>
                  </p>
                  <Button variant="accentOutline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
