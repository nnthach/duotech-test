import {
  BakeryReason,
  BakeryStandard,
  MenuCategory,
  MenuProduct,
} from "@/types";
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

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "all", label: "All" },
  { id: "bread", label: "Bread" },
  { id: "cake", label: "Cake" },
  { id: "sweet", label: "Pastry" },
];

export const MENU_PRODUCTS: MenuProduct[] = [
  {
    id: "cream-bread",
    category: "bread",
    image: "/images/bread_list/cream_bread.webp",
    name: "Fresh Cream Bread",
    description: "Soft milk bread, sweet cream swirl.",
    price: "$3.80",
    ingredients: ["Wheat flour", "Fresh milk", "Butter", "Sweet cream", "Yeast"],
  },
  {
    id: "cream-cheese-bread",
    category: "bread",
    image: "/images/bread_list/cream_cheese.png",
    name: "Cream Cheese Bread",
    description: "Soft white bread, cream cheese center.",
    price: "$3.90",
    ingredients: ["Wheat flour", "Cream cheese", "Milk", "Butter", "Sugar"],
  },
  {
    id: "raisin-bread",
    category: "bread",
    image: "/images/bread_list/raisin.webp",
    name: "Raisin Bread",
    description: "Soft milk bread, sweet raisins throughout.",
    price: "$3.60",
    ingredients: ["Wheat flour", "Raisins", "Milk", "Butter", "Honey"],
  },
  {
    id: "frankfurter-roll",
    category: "bread",
    image: "/images/bread_list/frank_roll.png",
    name: "Frankfurter Roll",
    description: "Savory sausage wrapped in soft bread.",
    price: "$4.10",
    ingredients: ["Wheat flour", "Frankfurter sausage", "Butter", "Onion", "Ketchup"],
  },
  {
    id: "purple-sweet-potato-loaf",
    category: "bread",
    image: "/images/bread_list/purple_potato.webp",
    name: "Purple Sweet Potato Loaf",
    description: "Naturally sweet, vibrant purple hue.",
    price: "$4.20",
    ingredients: ["Wheat flour", "Purple sweet potato", "Milk", "Butter", "Sugar"],
  },
  {
    id: "red-bean-bun",
    category: "bread",
    image: "/images/bread_list/redbean.png",
    name: "Red Bean Bun",
    description: "Soft bun, silky red bean filling.",
    price: "$3.50",
    ingredients: ["Wheat flour", "Red bean paste", "Milk", "Butter", "Sugar"],
  },
  {
    id: "green-tea-cream-cake",
    category: "cake",
    image: "/images/cake_list/greentea.webp",
    name: "Green Tea Cream Cake",
    description: "Matcha sponge, light whipped cream.",
    price: "$32.00",
    ingredients: ["Matcha powder", "Sponge cake", "Fresh cream", "Sugar", "Eggs"],
  },
  {
    id: "strawberry-shortcake",
    category: "cake",
    image: "/images/cake_list/strawberry.webp",
    name: "Strawberry Shortcake",
    description: "Classic sponge, fresh strawberries, cream.",
    price: "$34.00",
    ingredients: ["Fresh strawberries", "Sponge cake", "Whipped cream", "Sugar", "Eggs"],
  },
  {
    id: "cloud-cheesecake",
    category: "cake",
    image: "/images/cake_list/cloud.webp",
    name: "Cloud Cheesecake",
    description: "Airy, light Japanese-style cotton cheesecake.",
    price: "$28.00",
    ingredients: ["Cream cheese", "Eggs", "Fresh milk", "Sugar", "Corn starch"],
  },
  {
    id: "triple-berry-cake",
    category: "cake",
    image: "/images/cake_list/tripleberry.png",
    name: "Triple Berry Cake",
    description: "Strawberry, blueberry, raspberry medley.",
    price: "$36.00",
    ingredients: ["Strawberries", "Blueberries", "Raspberries", "Sponge cake", "Fresh cream"],
  },
  {
    id: "almond-croissant",
    category: "sweet",
    image: "/images/sweet_list/almond_croissant.png",
    name: "Almond Croissant",
    description: "Buttery layers, toasted almonds.",
    price: "$4.50",
    ingredients: ["Butter", "Wheat flour", "Almond cream", "Sliced almonds", "Sugar"],
  },
  {
    id: "chocolate-croissant",
    category: "sweet",
    image: "/images/sweet_list/chocolate.webp",
    name: "Chocolate Croissant",
    description: "Rich dark chocolate, crisp layers.",
    price: "$4.80",
    ingredients: ["Butter", "Wheat flour", "Dark chocolate", "Cocoa", "Sugar"],
  },
  {
    id: "strawberry-cream-croissant",
    category: "sweet",
    image: "/images/sweet_list/strawberry.png",
    name: "Strawberry Cream Croissant",
    description: "Fresh strawberries, light cream.",
    price: "$5.20",
    ingredients: ["Butter", "Wheat flour", "Fresh strawberries", "Whipped cream", "Sugar"],
  },
  {
    id: "original-butter-croissant",
    category: "sweet",
    image: "/images/sweet_list/original.webp",
    name: "Original Butter Croissant",
    description: "Classic French recipe, flaky golden layers.",
    price: "$3.90",
    ingredients: ["Butter", "Wheat flour", "Milk", "Yeast", "Salt"],
  },
  {
    id: "garlic-cheese-bread",
    category: "sweet",
    image: "/images/sweet_list/garlic_cheese.jpg",
    name: "Garlic Cheese Bread",
    description: "Savory garlic butter, melted cheese.",
    price: "$4.40",
    ingredients: ["Wheat flour", "Garlic butter", "Mozzarella cheese", "Parsley", "Milk"],
  },
];

const BESTSELLER_IDS = [
  "almond-croissant",
  "chocolate-croissant",
  "strawberry-cream-croissant",
  "cream-bread",
  "purple-sweet-potato-loaf",
  "red-bean-bun",
];

export const BESTSELLER_PRODUCTS: MenuProduct[] = BESTSELLER_IDS.map(
  (id) => MENU_PRODUCTS.find((product) => product.id === id)!,
);

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
