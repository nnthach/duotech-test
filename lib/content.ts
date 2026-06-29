import { BakeryProduct, BakeryReason, BakeryStandard } from "@/types";
import { Clock, Heart, Leaf, Wheat } from "lucide-react";

export const BAKERY_PRINCIPLES: BakeryStandard[] = [
  {
    image: "/images/banner1.webp",
    title: "100% Natural",
    description: "Real flour, real butter — no preservatives, no shortcuts.",
  },
  {
    image: "/images/banner2.webp",
    title: "Handcrafted Daily",
    description:
      "Every loaf is shaped and kneaded by hand, never machine-pressed.",
  },
  {
    image: "/images/banner3.webp",
    title: "Always Fresh",
    description: "Nothing sits overnight — out of the oven every morning.",
  },
];

export const BESTSELLER_PRODUCTS: BakeryProduct[] = [
  {
    image: "/images/sweet_list/almond_croissant.png",
    name: "Almond Croissant",
    description: "Buttery layers, toasted almonds.",
    price: "$4.50",
  },
  {
    image: "/images/sweet_list/chocolate.webp",
    name: "Chocolate Croissant",
    description: "Rich dark chocolate, crisp layers.",
    price: "$4.80",
  },
  {
    image: "/images/sweet_list/strawberry.png",
    name: "Strawberry Cream Croissant",
    description: "Fresh strawberries, light cream.",
    price: "$5.20",
  },
  {
    image: "/images/bread_list/cream_bread.webp",
    name: "Fresh Cream Bread",
    description: "Soft milk bread, sweet cream swirl.",
    price: "$3.80",
  },
  {
    image: "/images/bread_list/purple_potato.webp",
    name: "Purple Sweet Potato Loaf",
    description: "Naturally sweet, vibrant purple hue.",
    price: "$4.20",
  },
  {
    image: "/images/bread_list/redbean.png",
    name: "Red Bean Bun",
    description: "Soft bun, silky red bean filling.",
    price: "$3.50",
  },
];

export const WHY_RETURN_REASONS: BakeryReason[] = [
  {
    icon: Clock,
    title: "Fresh Daily",
    description:
      "Every pastry is baked before sunrise, ensuring you experience the warmth of fresh-from-the-oven goodness.",
  },
  {
    icon: Leaf,
    title: "Organic Ingredients",
    description:
      "We source only the finest organic flours, European butter, and seasonal ingredients from local farms.",
  },
  {
    icon: Wheat,
    title: "Slow Fermented",
    description:
      "Our breads are fermented for 48–72 hours, developing deep flavors and perfect texture naturally.",
  },
  {
    icon: Heart,
    title: "Handmade Process",
    description:
      "Every loaf is shaped by hand, every croissant folded with care—no machines, just craftsmanship.",
  },
];
