import { LucideIcon } from "lucide-react";

export interface HomeFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HomeStat {
  value: string;
  label: string;
}

export interface HomeProgram {
  title: string;
  description: string;
  image: string;
}

export interface HomePlan {
  duration: string;
  price: string;
  popular: boolean;
}

export type HomePlanFeature = string;

export interface PricingHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  lines: string[];
}

export interface HomeTestimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface SignInFormState {
  email: string;
  password: string;
}

export interface SignUpFormState {
  fullName: string;
  email: string;
  password: string;
}
