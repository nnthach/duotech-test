import { Dumbbell } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-red-600">
            <Dumbbell className="h-5 w-5 text-white" />
          </span>
          IRONFIT
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/pricing" className="transition hover:text-white">
            Pricing
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>

          <Button variant="red" className="font-semibold py-1" size="sm">
            Join Now
          </Button>
        </nav>
      </div>
    </header>
  );
}
