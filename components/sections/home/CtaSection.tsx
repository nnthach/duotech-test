import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CtaSection() {
  return (
    <section className="px-6 py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r from-red-700 to-red-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1400&auto=format&fit=crop"
            alt="CTA background"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative flex flex-col items-start justify-between gap-6 px-8 py-12 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to Transform
              <br />
              Your Life?
            </h2>
            <p className="mt-2 max-w-md text-white/80">
              Join today and enjoy exclusive special offers for new members!
            </p>
          </div>

          <Link href={"/signin"}>
            <Button
              variant={"default"}
              size={"lg"}
              className="bg-white text-black hover:bg-white/90 gap-2 font-semibold"
            >
              Join IronFit Now <ArrowRight className="h-4 w-4 text-red-700" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
