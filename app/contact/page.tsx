"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainSection from "@/components/sections/contact/MainSection";
import React from "react";

export default function ContactPage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Header />

      <main className="min-h-screen">
        <MainSection />
      </main>

      <Footer />
    </div>
  );
}
