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
  name: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  is_active: boolean;
  slug: string;
  created_at: string;
  updated_at: string | null;
}

export interface RawProduct {
  id: string;
  price: number;
  image_url: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
  categories: { id: string; name: string } | null;
  product_translations: ProductTranslation[];
  product_ingredients: ProductIngredientRow[];
}

export interface ProductIngredientRow {
  ingredients: IngredientItem;
}

export interface IngredientItem {
  id: string;
  name: {
    en: string;
    vi: string;
  };
  is_active: boolean;
  slug: string;
  created_at: string;
  updated_at: string | null;
}

export interface ProductTranslation {
  name: string;
  slug: string;
  description: string;
  locale: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  image_url: string[];
  category_id: string;
  category_name: string;
  category: CategoryItem;
  categories: CategoryItem;
  product_translations: ProductTranslation[];
  product_ingredients: IngredientItem[];
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}
