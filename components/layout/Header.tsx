"use client";

import { Croissant, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const NAV_LINKS = [
  { href: "/#story", label: "Our Story" },
  { href: "/#bestsellers", label: "Baked Daily" },
  { href: "/menu", label: "Menu" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        scrolled ? "bg-sand/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link href={"/"}>
          <div
            className={`flex items-center gap-2 text-xl font-bold transition-colors ${
              scrolled ? "text-charcoal" : "text-white"
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber">
              <Croissant className="h-5 w-5 text-white" />
            </span>
            <span className="font-serif">Petit Bakery</span>
          </div>
        </Link>

        <nav
          className={`hidden items-center gap-8 text-sm font-medium md:flex ${
            scrolled ? "text-charcoal/70" : "text-white/80"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                scrolled ? "hover:text-charcoal" : "hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link href={"/#bestsellers"}>
            <Button variant="accent" className="font-semibold py-1" size="sm">
              Order Now
            </Button>
          </Link>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-12 w-12 p-0 md:hidden ${
                scrolled
                  ? "text-charcoal hover:bg-charcoal/10"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <Menu className="h-10 w-10" strokeWidth={2.5} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-3/4 border-l border-charcoal/10 bg-sand text-charcoal sm:max-w-sm"
          >
            <SheetTitle className="text-left text-lg font-bold text-charcoal">
              Petit Bakery
            </SheetTitle>
            <nav className="mt-8 flex flex-col gap-6 text-base font-medium text-charcoal/70">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-charcoal"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}

              <SheetClose asChild>
                <Link href={"/#bestsellers"}>
                  <Button variant="accent" className="font-semibold">
                    Order Now
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
