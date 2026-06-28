import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[680px] flex-col items-center justify-center overflow-hidden px-6 pt-16"
    >
      <div className="absolute inset-0 animate-imageFade">
        <Image
          src="/images/banner1.jpg"
          alt="Personal trainer coaching a client"
          fill
          priority
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/85 via-charcoal-900/70 to-charcoal-900/90" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center animate-fadeInUp">
        <div className="mb-5">
          <SectionLabel label="Personal Training" />
        </div>
        <h1 className="text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          Generic Workouts
          <br />
          Get Generic <span className="text-white/40">Results.</span>
        </h1>
        <p className="mt-6 max-w-lg text-balance text-white/75">
          Trainly matches you with certified personal trainers who build a
          plan around your body, your goals, and your schedule — not a
          one-size-fits-all program.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#trainers">
            <Button variant="accent" size={"lg"} className="font-semibold">
              Find Your Trainer <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="#how-it-works">
            <Button
              variant="outline"
              size={"lg"}
              className="border-white/30 bg-transparent font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              See How It Works
            </Button>
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral/20 text-coral">
              <Star className="h-4 w-4 fill-coral" />
            </span>
            <div className="text-left">
              <p className="text-sm font-bold text-white">4.9 / 5</p>
              <p className="text-xs text-white/60">Average rating</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber/20 text-amber">
              <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
            </span>
            <div className="text-left">
              <p className="text-sm font-bold text-white">500+</p>
              <p className="text-xs text-white/60">Certified trainers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
