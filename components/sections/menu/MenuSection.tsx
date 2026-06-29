"use client";

import ProductCard from "@/components/custom/ProductCard";
import { cn } from "@/lib/utils";
import { MENU_CATEGORIES, MENU_PRODUCTS } from "@/lib/content";
import { MenuCategoryId } from "@/types";
import { useMemo, useState } from "react";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | "all">(
    "all",
  );

  const filteredProducts = useMemo(
    () =>
      activeCategory === "all"
        ? MENU_PRODUCTS
        : MENU_PRODUCTS.filter(
            (product) => product.category === activeCategory,
          ),
    [activeCategory],
  );

  return (
    <section className="relative z-10 bg-sand px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {MENU_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition",
                activeCategory === category.id
                  ? "border-amber bg-amber text-white shadow-sm"
                  : "border-charcoal/15 bg-white text-charcoal/60 hover:border-amber/50 hover:text-charcoal",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-16 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              animation={false}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-12 text-center text-charcoal/50">
            No items found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
