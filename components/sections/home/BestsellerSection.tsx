"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { BESTSELLER_PRODUCTS } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function BestsellerSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="bestsellers" className="relative z-10 bg-sand px-6 py-24">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-script text-3xl text-amber sm:text-4xl">
          Baked Daily
        </p>
        <h2 className="mt-2 text-3xl font-bold text-charcoal sm:text-4xl">
          Customer Favorites, Baked Fresh
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-charcoal/60">
          Handcrafted favorites, loved by generations.
        </p>

        <div
          ref={ref}
          className="mt-14 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3"
        >
          {BESTSELLER_PRODUCTS.map((product, index) => (
            <div
              key={product.name}
              style={{ animationDelay: `${index * 80}ms` }}
              className={`group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                inView
                  ? "animate-fadeUp opacity-100"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl italic text-charcoal">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-charcoal/55">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-charcoal">
                    {product.price}
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-amber transition hover:text-coral"
                  >
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Button variant="accent" size="lg" className="font-semibold">
            Explore Menu <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
