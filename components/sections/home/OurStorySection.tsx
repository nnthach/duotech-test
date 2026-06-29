"use client";

import { useInView } from "@/hooks/useInView";
import { Wheat } from "lucide-react";
import Image from "next/image";

export default function OurStorySection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      id="story"
      className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-[#EAE1D3] via-[#F2EBE0] to-[#E5DBCB] px-6 py-24"
    >
      <Wheat className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rotate-12 text-charcoal/[0.04]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div
          className={`relative mx-auto h-[340px] w-full max-w-lg sm:h-[420px] lg:h-[520px] ${
            inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="absolute left-0 top-0 h-[78%] w-[75%] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/chef2.jpg"
              alt="Hands kneading fresh dough"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[58%] w-[52%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white">
            <Image
              src="/images/chef3.jpg"
              alt="Fresh croissant on display"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <p
            className={`font-script text-3xl text-amber sm:text-4xl ${
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            Our Story
          </p>
          <h2
            style={{ animationDelay: "100ms" }}
            className={`mt-2 text-3xl font-bold leading-tight text-charcoal sm:text-4xl ${
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            Every loaf carries a little piece of our heart.
          </h2>

          <p
            style={{ animationDelay: "250ms" }}
            className={`mt-4 text-charcoal/70 ${
              inView ? "animate-fadeUp opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            We believe a loaf isn&apos;t finished when it leaves the oven —
            it&apos;s finished when someone breaks it open at their table.
            That&apos;s why every batch, big or small, gets the same care, the
            same patience, and the same hands.
            <br />
            <br />
            Whether we&apos;re baking one loaf or one hundred, every batch
            receives the same care and attention. To us, bread is more than
            food—it&apos;s a way to bring people together, creating moments of
            warmth, comfort, and connection around the table.
            <br />
            <br />
            From our hands to yours, every loaf is baked with passion, crafted
            with tradition, and made to be shared.
          </p>
        </div>
      </div>
    </section>
  );
}
