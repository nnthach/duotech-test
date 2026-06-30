"use client";

import ProductCard from "@/components/custom/ProductCard";
import { cn } from "@/lib/utils";
import { CategoryItem } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";

interface FetchedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  image_url: string[];
  is_active: boolean;
  category: { id: string; name: { en: string; vi: string } } | null;
}

export default function MenuSection() {
  const { t, locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [products, setProducts] = useState<FetchedProduct[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories?is_active=true&sort_by=created_at&order=asc");
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.data) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, []);

  const fetchProducts = useCallback(async (categoryId: string) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        is_active: "true",
        sort_by: "created_at",
        order: "asc",
        locale,
      });
      if (categoryId !== "all") {
        params.set("category_id", categoryId);
      }
      const res = await fetch(`/api/admin/products?${params.toString()}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.data) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [fetchProducts, activeCategory]);

  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN") + " đ";

  return (
    <section className="relative z-10 bg-sand px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Category filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleSelectCategory("all")}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition",
              activeCategory === "all"
                ? "border-amber bg-amber text-white shadow-sm"
                : "border-charcoal/15 bg-white text-charcoal/60 hover:border-amber/50 hover:text-charcoal",
            )}
          >
            {t("menuPage.menuFilter.all")}
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleSelectCategory(category.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition",
                activeCategory === category.id
                  ? "border-amber bg-amber text-white shadow-sm"
                  : "border-charcoal/15 bg-white text-charcoal/60 hover:border-amber/50 hover:text-charcoal",
              )}
            >
              {category.name[locale as "en" | "vi"] ?? category.name.vi}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {isLoading ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-white/60" />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-16 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.slug,
                    image: product.image_url?.[0] ?? "/images/placeholder.webp",
                    name: product.name,
                    description: product.description,
                    price: formatPrice(product.price),
                  }}
                  animation={false}
                />
              ))}
            </div>

            {products.length === 0 && (
              <p className="mt-12 text-center text-charcoal/50">
                {t("menuPage.menuFilter.empty")}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
