import Image from "next/image";

export default function MenuHeroSection() {
  return (
    <section className="relative flex h-[60vh] min-h-[420px] flex-col items-center justify-center overflow-hidden px-6 pt-16">
      <Image
        src="/images/bread_banner.webp"
        alt="Freshly baked breads on a wooden table"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/40 to-charcoal-900/80" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center animate-fadeInUp">
        <p className="font-script text-4xl text-amber sm:text-5xl">
          Our Menu
        </p>
        <h1 className="mt-1 text-4xl font-bold leading-[1.15] text-white sm:text-5xl">
          Everything We Bake,
          <br />
          In One Place
        </h1>
        <p className="mt-6 max-w-md text-balance text-white/75">
          From crusty loaves to delicate cakes — explore our full selection,
          baked fresh every single day.
        </p>
      </div>
    </section>
  );
}
