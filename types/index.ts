import { LucideIcon } from "lucide-react";

export interface HomeFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BakeryReason {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BakeryStandard {
  image: string;
  title: string;
  description: string;
}

export interface BakeryProduct {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
}

export type MenuCategoryId = "bread" | "cake" | "sweet";

export interface MenuProduct extends BakeryProduct {
  category: MenuCategoryId;
  ingredients: string[];
}

export interface MenuCategory {
  id: MenuCategoryId | "all";
  label: string;
}
