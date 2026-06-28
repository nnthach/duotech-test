import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Dumbbell, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10 h-screen pt-10 px-6"
    >
      <div className="absolute inset-0 animate-pan animate-imageFade">
        <Image
          src="/images/banner1.jpg"
          alt="Athlete"
          fill
          priority
          className="object-cover object-center md:object-left-top md:ml-[200px]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/0" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center">
        <div className="max-w-xl animate-fadeInUp">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-500">
            Build Strength. Build Confidence.
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            TRANSFORM
            <br />
            YOUR BODY
            <br />
            <span className="text-red-600">TRANSFORM</span>
            <br />
            <span className="text-red-600">YOUR LIFE.</span>
          </h1>
          <p className="mt-6 max-w-md text-white/70">
            IronFit Gym offers a professional training environment, dedicated
            coaches, and highly effective workout programs designed to help you
            reach your fitness goals.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#feature">
              <Button variant="red" size={"lg"} className="font-semibold">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#pricing">
              <Button
                variant="outline"
                size={"lg"}
                className="border border-white/30 font-semibold hover:bg-white/10"
              >
                View Pricing
              </Button>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-red-500" /> Modern Equipment
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-red-500" /> Expert Trainers
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-red-500" /> Flexible Plans
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
