import ProductDetailClient from "@/components/sections/productDetail/ProductDetailClient";
import { MENU_PRODUCTS } from "@/lib/content";

interface ProductDetailPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return MENU_PRODUCTS.map((product) => ({ id: product.id }));
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductDetailClient params={params} />;
}
