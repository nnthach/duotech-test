import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CtaSection() {
  return (
    <section className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-sand px-6 py-24 text-center">
      <Image
        src="/images/cake_banner.webp"
        alt="Fresh pastries on the counter"
        fill
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-sand" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <p className="font-script text-3xl text-amber sm:text-4xl">
          From Our Hearts To Your Table
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
          Baked With Passion,
          <br />
          <span className="text-charcoal/40">Shared With Love.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-charcoal/60">
          At Petit Bakery, every loaf and pastry carries the care of real hands
          and honest ingredients — because you deserve nothing less.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href={"/#bestsellers"}>
            <Button
              variant="accent"
              size={"lg"}
              className="gap-2 font-semibold"
            >
              Explore Our Menu <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={"/#contact"}>
            <Button
              variant="outline"
              size={"lg"}
              className="gap-2 border-charcoal/25 bg-transparent font-semibold text-charcoal hover:bg-charcoal/5 hover:text-charcoal"
            >
              Visit Our Bakery <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
