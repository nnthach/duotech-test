import Image from "next/image";
import React from "react";
import SectionLabel from "./SectionLabel";

export default function WhyItWorkSection() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="absolute inset-0">
        <Image
          src="/images/gymroom1.jpg"
          alt="Trainer guiding a client through a session"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-charcoal-900/80" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionLabel label="Why It Works" />

        <p className="mt-6 text-3xl font-medium italic leading-snug text-white sm:text-4xl lg:text-5xl">
          &ldquo;Because progress needs a witness — someone who notices when you
          get stronger, and tells you before you doubt it.&rdquo;
        </p>
        <p className="mt-8 text-sm uppercase tracking-widest text-white/50">
          The Trainly Promise
        </p>
      </div>
    </section>
  );
}
