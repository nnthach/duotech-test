import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function CtaSection() {
  return (
    <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-charcoal px-6 py-24 text-center">
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[14vw] font-extrabold uppercase leading-none tracking-tight text-transparent"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
      >
        Get Started
      </p>

      <div className="relative z-10 mx-auto max-w-2xl">
        <SectionLabel label="Ready When You Are" />
        <h2 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
          Your Strongest Years
          <br />
          <span className="text-white/40">Start Now.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-white/60">
          Whether you&apos;re looking for a trainer or ready to become one,
          Trainly makes the match.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href={"/signup"}>
            <Button
              variant="accent"
              size={"lg"}
              className="gap-2 font-semibold"
            >
              Find a Trainer <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button
              variant="outline"
              size={"lg"}
              className="gap-2 border-white/30 bg-transparent font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              Join As A Trainer <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
