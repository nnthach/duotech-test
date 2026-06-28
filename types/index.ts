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

export interface HomePainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface Specialty {
  label: string;
  icon: LucideIcon;
}

export interface Trainer {
  name: string;
  specialty: string;
  tags: string[];
  rating: number;
  sessions: number;
  price: string;
  image: string;
}

export interface CoachingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
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
