import { Button } from "@/components/ui/button";
import { HOME_STATS } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function AboutSection() {
  return (
    <section className="border-b border-white/10 px-6 pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative h-[380px] overflow-hidden rounded-2xl">
          <Image
            src="/images/about.jpg"
            alt="Gym interior"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
            About IronFit
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            More Than Just
            <br />a Gym
          </h2>
          <p className="mt-6 text-white/60">
            At IronFit, we’re more than just a gym—we’re a supportive fitness
            community where people push past their limits and transform their
            lifestyles. Our mission is to help every member unlock their
            potential and become their strongest self, both physically and
            mentally.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {HOME_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-red-500 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>

          <Button variant="red" size={"lg"} className="font-semibold mt-8">
            Learn More About Us <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
