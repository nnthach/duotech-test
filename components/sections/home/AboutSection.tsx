"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { HOME_STATS } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function AboutSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="border-b border-white/10 px-6 pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div
          className={`group relative h-[380px] overflow-hidden rounded-2xl transition-all duration-700 ease-out ${
            inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-red-600/20 blur-3xl" />
          <Image
            src="/images/about.jpg"
            alt="Gym interior"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </div>

        <div>
          <p
            style={{ animationDelay: "0ms" }}
            className={`text-sm font-semibold uppercase tracking-widest text-red-500 ${
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            About IronFit
          </p>
          <h2
            style={{ animationDelay: "100ms" }}
            className={`mt-3 text-3xl font-bold sm:text-4xl ${
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            More Than Just
            <br />a Gym
          </h2>
          <p
            style={{ animationDelay: "200ms" }}
            className={`mt-6 text-white/60 ${
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            At IronFit, we’re more than just a gym—we’re a supportive fitness
            community where people push past their limits and transform their
            lifestyles. Our mission is to help every member unlock their
            potential and become their strongest self, both physically and
            mentally.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {HOME_STATS.map((stat, index) => (
              <div
                key={stat.label}
                style={{ animationDelay: `${300 + index * 100}ms` }}
                className={
                  inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
                }
              >
                <p className="text-2xl font-bold text-red-500 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>

          <Button
            variant="red"
            size={"lg"}
            style={{ animationDelay: "600ms" }}
            className={`font-semibold mt-8 ${
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            Learn More About Us <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
