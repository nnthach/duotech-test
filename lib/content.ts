import {
  CoachingPlan,
  HomePainPoint,
  HomePlan,
  HomePlanFeature,
  HomeStat,
  HomeTestimonial,
  HowItWorksStep,
  PricingHighlight,
  Specialty,
  Trainer,
} from "@/types";
import {
  Award,
  Calendar,
  Dumbbell,
  Flame,
  HeartPulse,
  Infinity as InfinityIcon,
  Laptop,
  Salad,
  SearchCheck,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

export const HOME_PAIN_POINTS: HomePainPoint[] = [
  {
    icon: SearchCheck,
    title: "No Personalization",
    description:
      "Generic workout plans ignore your body, your injuries, and your actual goals — so progress stalls fast.",
  },
  {
    icon: Users,
    title: "No Accountability",
    description:
      "Without someone tracking your progress, it's easy to skip sessions and lose motivation within weeks.",
  },
  {
    icon: TrendingUp,
    title: "No Real Feedback",
    description:
      "Apps and videos can't correct your form in real time — small mistakes turn into plateaus or injuries.",
  },
];

export const HOME_STATS: HomeStat[] = [
  { value: "500+", label: "Certified Trainers" },
  { value: "10,000+", label: "Sessions Booked" },
  { value: "4.9/5", label: "Average Rating" },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    title: "Tell Us Your Goals",
    description:
      "Share your fitness goals, schedule, and preferences — it takes less than two minutes.",
  },
  {
    number: "02",
    title: "Get Matched With Trainers",
    description:
      "Browse certified trainers who fit your goals, compare profiles, and pick the right one for you.",
  },
  {
    number: "03",
    title: "Book & Start Training",
    description:
      "Schedule your first session online or in person, and start training with real, ongoing guidance.",
  },
];

export const SPECIALTIES: Specialty[] = [
  { label: "Weight Loss", icon: Flame },
  { label: "Strength & Muscle", icon: Dumbbell },
  { label: "Yoga & Mobility", icon: HeartPulse },
  { label: "Sports Performance", icon: TrendingUp },
  { label: "Online Coaching", icon: Laptop },
  { label: "Nutrition Coaching", icon: Salad },
];

export const FEATURED_TRAINERS: Trainer[] = [
  {
    name: "Daniel Carter",
    specialty: "Strength & Conditioning",
    tags: ["Strength", "Muscle Gain"],
    rating: 4.9,
    sessions: 320,
    price: "350,000",
    image: "/images/program1.jpg",
  },
  {
    name: "Sophia Nguyen",
    specialty: "Weight Loss Coach",
    tags: ["Weight Loss", "Nutrition"],
    rating: 5.0,
    sessions: 410,
    price: "300,000",
    image: "/images/program2.jpg",
  },
  {
    name: "Marcus Lee",
    specialty: "Sports Performance",
    tags: ["Performance", "Speed"],
    rating: 4.8,
    sessions: 275,
    price: "400,000",
    image: "/images/program3.jpg",
  },
  {
    name: "Olivia Tran",
    specialty: "Yoga & Mobility",
    tags: ["Yoga", "Recovery"],
    rating: 4.9,
    sessions: 198,
    price: "280,000",
    image: "/images/program4.jpg",
  },
];

export const WHY_TRAINLY: HomePainPoint[] = [
  {
    icon: Award,
    title: "Verified & Certified",
    description:
      "Every trainer is background-checked and holds a recognized certification before joining Trainly.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Book sessions around your life, not the other way around — early mornings, late nights, weekends.",
  },
  {
    icon: Laptop,
    title: "In-Person or Online",
    description:
      "Train at a gym, at home, outdoors, or over video call — whatever fits your routine best.",
  },
  {
    icon: ShieldCheck,
    title: "Money-Back Guarantee",
    description:
      "Not the right match? Get paired with a new trainer or your money back, no questions asked.",
  },
];

export const COACHING_PLANS: CoachingPlan[] = [
  {
    name: "Single Session",
    price: "300,000",
    period: "/session",
    description: "Try a certified trainer with zero commitment.",
    features: [
      "One 60-minute session",
      "Choose any trainer",
      "In-person or online",
    ],
    popular: false,
  },
  {
    name: "Monthly Coaching",
    price: "2,400,000",
    period: "/month",
    description: "4 sessions a month plus check-ins between workouts.",
    features: [
      "4 sessions per month",
      "Progress tracking",
      "Chat with your trainer",
      "Reschedule anytime",
    ],
    popular: true,
  },
  {
    name: "Elite 1:1",
    price: "4,800,000",
    period: "/month",
    description: "Weekly sessions with a dedicated nutrition plan.",
    features: [
      "Weekly sessions",
      "Custom nutrition plan",
      "Unlimited messaging",
      "Priority rescheduling",
    ],
    popular: false,
  },
];

export const AVAILABLE_CITIES: string[] = [
  "Ho Chi Minh City",
  "Hanoi",
  "Da Nang",
  "Can Tho",
  "Nha Trang",
  "Online, Anywhere",
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

export const HOME_TESTIMONIAL: HomeTestimonial[] = [
  {
    name: "Minh Anh Nguyen",
    role: "Matched with a trainer - 6 months ago",
    quote:
      "Trainly matched me with a coach who actually understood my schedule and my injuries. I've made more progress in 6 months than in 2 years on my own.",
    avatar: "/images/program1.jpg",
  },
  {
    name: "Bao Quoc Tran",
    role: "Matched with a trainer - 1 year ago",
    quote:
      "Comparing trainer profiles and reviews before booking made all the difference. I found the right coach on the first try.",
    avatar: "/images/program3.jpg",
  },
  {
    name: "Emily Johnson",
    role: "Matched with a trainer - 3 months ago",
    quote:
      "I lost 10kg in 3 months because someone was finally checking in on me every week. Booking sessions online took two minutes.",
    avatar: "/images/program4.jpg",
  },
];
