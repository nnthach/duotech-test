"use client";

import { useInView } from "@/hooks/useInView";
import { HOME_PROGRAMS } from "@/lib/content";
import { Dumbbell } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ProgramSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="border-b border-white/10 px-6 pt-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
          Our Programs
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Programs For Every Goal
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_PROGRAMS.map((program, index) => (
            <div
              key={program.title}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`group relative h-72 overflow-hidden rounded-xl text-left ${inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"}`}
            >
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="mb-2 flex h-8 w-8 items-center justify-center rounded bg-red-600">
                  <Dumbbell className="h-4 w-4" />
                </span>
                <h3 className="text-lg font-semibold">{program.title}</h3>
                <p className="mt-1 text-sm text-white/70">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
