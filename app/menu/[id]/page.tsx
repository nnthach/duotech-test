import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/custom/ProductCard";
import { Button } from "@/components/ui/button";
import { MENU_CATEGORIES, MENU_PRODUCTS } from "@/lib/content";
import { ChevronLeft, Wheat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return MENU_PRODUCTS.map((product) => ({ id: product.id }));
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = MENU_PRODUCTS.find((item) => item.id === params.id);

  if (!product) notFound();

  const categoryLabel = MENU_CATEGORIES.find(
    (category) => category.id === product.category,
  )?.label;

  const relatedProducts = MENU_PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  ).slice(0, 3);

  return (
    <div className="bg-sand">
      <Header />

      <section className="bg-charcoal-900 px-6 pb-8 pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1 text-sm font-semibold text-white/70 transition hover:text-amber"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Menu
          </Link>
          <p className="mt-4 font-script text-3xl text-amber">
            {categoryLabel}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
            {product.name}
          </h1>
        </div>
      </section>

      <section className="relative z-10 px-6 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative mx-auto h-72 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-md sm:h-96">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <p className="mt-8 text-2xl font-bold text-amber">{product.price}</p>
          <p className="mx-auto mt-4 max-w-md text-charcoal/60">
            {product.description}
          </p>

          <div className="mx-auto mt-10 max-w-sm text-left">
            <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-charcoal">
              <Wheat className="h-4 w-4 text-amber" /> Ingredients
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-charcoal/60">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <Link href="/#contact">
              <Button variant="accent" size="lg" className="font-semibold">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="relative z-10 bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-center font-script text-2xl text-amber">
              You Might Also Like
            </p>
            <div className="mt-10 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} animation={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
