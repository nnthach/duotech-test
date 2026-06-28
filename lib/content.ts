import {
  ContactInfo,
  HomeFeature,
  HomePlan,
  HomePlanFeature,
  HomeProgram,
  HomeStat,
  HomeTestimonial,
  PricingHighlight,
} from "@/types";
import {
  Calendar,
  Clock,
  Dumbbell,
  Heart,
  Infinity as InfinityIcon,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

export const HOME_FEATURES: HomeFeature[] = [
  {
    icon: Dumbbell,
    title: "Modern Equipment",
    description:
      "State-of-the-art equipment meeting international standards, regularly maintained for optimal performance.",
  },
  {
    icon: Users,
    title: "Expert Coaches",
    description:
      "Highly experienced and dedicated trainers committed to helping you reach your fitness goals.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description:
      "24/7 flexible training schedules designed to fit your busy lifestyle.",
  },
  {
    icon: Heart,
    title: "Supportive Community",
    description:
      "A positive and motivating fitness community that supports you every step of the way.",
  },
];

export const HOME_STATS: HomeStat[] = [
  { value: "10,000+", label: "Satisfied Members" },
  { value: "50+", label: "Expert Coaches" },
  { value: "5+", label: "Years of Excellence" },
];
export const HOME_PROGRAMS: HomeProgram[] = [
  {
    title: "Body Building",
    description:
      "Build muscle mass, increase strength, and improve overall physique.",
    image:
      "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Weight Loss",
    description:
      "Burn excess fat and achieve safe, effective weight loss results.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Strength Training",
    description:
      "Enhance strength, endurance, and overall physical performance.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Yoga & Flexibility",
    description:
      "Improve flexibility, reduce stress, and achieve mental balance.",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
  },
];

export const HOME_PLANS: HomePlan[] = [
  {
    duration: "1 Month",
    price: "799.000",
    popular: false,
  },
  {
    duration: "3 Months",
    price: "699.000",
    popular: false,
  },
  {
    duration: "6 Months",
    price: "599.000",
    popular: true,
  },
  {
    duration: "12 Months",
    price: "499.000",
    popular: false,
  },
];

export const HOME_PLAN_FEATURES: HomePlanFeature[] = [
  "Unlimited training access",
  "Full access to all equipment",
  "Basic nutrition consultation",
  "Group class participation",
];

export const PRICING_HIGHLIGHTS: PricingHighlight[] = [
  {
    icon: InfinityIcon,
    title: "No Limits",
    description: "Train without limits anytime",
  },
  {
    icon: Dumbbell,
    title: "Premium Equipment",
    description: "Access to all premium machines",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Professional trainers always here",
  },
  {
    icon: ShieldCheck,
    title: "Cancel Anytime",
    description: "No long-term contracts, cancel anytime",
  },
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Our Location",
    lines: ["123 Nguyen Hue Street", "District 1, Ho Chi Minh City"],
  },
  {
    icon: Phone,
    title: "Phone Number",
    lines: ["+84 28 1234 5678", "+84 90 123 4567"],
  },
  {
    icon: Mail,
    title: "Email Address",
    lines: ["info@ironfit.vn", "support@ironfit.com"],
  },
  {
    icon: Clock,
    title: "Operating Hours",
    lines: ["Mon - Sat: 05:00 - 23:00", "Sunday: 07:00 - 21:00"],
  },
];

export const HOME_TESTIMONIAL: HomeTestimonial[] = [
  {
    name: "Nguyen Minh Anh",
    role: "Member - 6 months",
    quote:
      "IronFit completely changed my life. I feel more confident, healthier, and stronger every day.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Tran Quoc Bao",
    role: "Member - 1 year",
    quote:
      "The equipment is modern, the environment is clean and professional. I really enjoy every training session here.",
    avatar: "https://i.pravatar.cc/100?img=33",
  },
  {
    name: "Emily Johnson",
    role: "Member - 3 months",
    quote:
      "I lost 10kg in just 3 months. IronFit helped me stay motivated and completely transform my lifestyle.",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
];
