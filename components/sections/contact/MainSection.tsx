"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { CONTACT_INFO } from "@/lib/content";
import { ContactFormState } from "@/types";
import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";

const INITIAL_FORM: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function MainSection() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setForm(INITIAL_FORM);
  };
  return (
    <section className="border-b border-white/10 px-6 pb-20 mt-28">
      <div className="mx-auto max-w-7xl">
        <div className="animate-fadeUp text-center opacity-0">
          <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-widest text-red-500">
            <span className="h-px w-8 bg-red-500/60" />
            Get In Touch
            <span className="h-px w-8 bg-red-500/60" />
          </p>
          <h1 className="mt-4 text-4xl font-extrabold uppercase leading-tight sm:text-5xl">
            Contact <span className="text-red-600">Us</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Have a question or ready to start your fitness journey? Reach out
            and our team will get back to you shortly.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left: Contact Info */}
          <div className="flex flex-col gap-8">
            <div className="space-y-8">
              {CONTACT_INFO.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-red-600/40 hover:-translate-y-0.5 ${
                      gridInView
                        ? "animate-fadeUp opacity-100"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600/10">
                      <Icon className="h-5 w-5 text-red-500" />
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide">
                        {item.title}
                      </p>
                      {item.lines.map((line) => (
                        <p key={line} className="mt-1 text-sm text-white/60">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            style={{
              animationDelay: `${CONTACT_INFO.length * 100}ms`,
            }}
            className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${
              gridInView
                ? "animate-fadeUp opacity-100"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-xl font-bold uppercase tracking-wide">
              Send a Message
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Fill out the form below and we will respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold uppercase tracking-wide text-white/60"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-xs font-semibold uppercase tracking-wide text-white/60"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+84 90 123 4567"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wide text-white/60"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-wide text-white/60"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <Button
                type="submit"
                variant="red"
                disabled={status === "loading"}
                className="w-full gap-2 py-5 font-semibold uppercase tracking-wide transition disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              {status === "success" && (
                <p className="text-center text-sm font-medium text-red-500">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainSection;
