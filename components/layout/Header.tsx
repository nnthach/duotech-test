"use client";

import { Dumbbell, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link href={"/"}>
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-red-600">
              <Dumbbell className="h-5 w-5 text-white" />
            </span>
            IRONFIT
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <Link href={"/signin"}>
            <Button variant="red" className="font-semibold py-1" size="sm">
              Join Now
            </Button>
          </Link>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 p-0 text-white hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-10 w-10" strokeWidth={2.5} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-3/4 border-l border-white/10 bg-black text-white sm:max-w-sm"
          >
            <SheetTitle className="text-left text-lg font-bold text-white">
              IRONFIT
            </SheetTitle>
            <nav className="mt-8 flex flex-col gap-6 text-base font-medium text-white/80">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}

              <SheetClose asChild>
                <Link href={"/signin"}>
                  <Button variant="red" className="font-semibold">
                    Join Now
                  </Button>
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
