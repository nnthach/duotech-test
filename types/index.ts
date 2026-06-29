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
  image: string;
  name: string;
  description: string;
  price: string;
}
