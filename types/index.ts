import { LucideIcon } from "lucide-react";

export interface HomeFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BakeryReason {
  icon: LucideIcon;
  key: string;
}

export interface BakeryStandard {
  image: string;
  key: string;
}

export interface BakeryProduct {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
}

export type MenuCategoryId = "bread" | "cake" | "pastry";

export interface MenuProduct extends BakeryProduct {
  category: MenuCategoryId;
  ingredients: string[];
}

export interface MenuCategory {
  id: MenuCategoryId | "all";
  label: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  slug: string;
  created_at: string;
  updated_at: string | null;
}

export interface IngredientItem {
  id: string;
  name: string;
  is_active: boolean;
  slug: string;
  created_at: string;
  updated_at: string | null;
}
