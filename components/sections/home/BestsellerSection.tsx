"use client";

import ProductCard from "@/components/custom/ProductCard";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { BESTSELLER_PRODUCTS } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
            <ProductCard
              key={product.name}
              product={product}
              index={index}
              inView={inView}
              animation
            />
          ))}
        </div>

        <div className="mt-14">
          <Link href={"/menu"}>
            <Button variant="accent" size="lg" className="font-semibold">
              Explore Menu <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
