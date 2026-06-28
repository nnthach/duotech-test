"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { HOME_STATS } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function DifferentSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      id="difference"
      className="relative z-10 flex min-h-screen flex-col justify-center bg-sand-100 px-6 py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div
          className={`group relative h-[380px] overflow-hidden rounded-2xl transition-all duration-700 ease-out ${
            inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-coral/15 blur-3xl" />
          <Image
            src="/images/gymroom1.jpg"
            alt="Personal trainer guiding a client"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-charcoal/10" />
        </div>

        <div>
          <div
            style={{ animationDelay: "0ms" }}
            className={
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }
          >
            <SectionLabel label="The Difference" align="left" />
          </div>
          <h2
            style={{ animationDelay: "100ms" }}
            className={`mt-4 text-4xl font-bold text-charcoal sm:text-5xl ${
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            This Is Where
            <br />
            <span className="text-charcoal/40">Everything Changes</span>
          </h2>
          <p
            style={{ animationDelay: "200ms" }}
            className={`mt-6 text-charcoal/60 ${
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            Trainly isn&apos;t another workout app. It&apos;s a curated network
            of certified personal trainers — vetted, rated, and ready to build a
            program around exactly where you are and where you want to go.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {HOME_STATS.map((stat, index) => (
              <div
                key={stat.label}
                style={{ animationDelay: `${300 + index * 100}ms` }}
                className={
                  inView
                    ? "animate-fadeUp opacity-100"
                    : "opacity-0 translate-y-6"
                }
              >
                <p className="text-3xl font-bold text-coral sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-charcoal/50">{stat.label}</p>
              </div>
            ))}
          </div>

          <a href="#trainers">
            <Button
              variant="accent"
              size={"lg"}
              style={{ animationDelay: "600ms" }}
              className={`font-semibold mt-8 ${
                inView
                  ? "animate-fadeUp opacity-100"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Meet Our Trainers <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
