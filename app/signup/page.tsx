"use client";

import { Button } from "@/components/ui/button";
import { SignUpFormState } from "@/types";
import { Dumbbell, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const INITIAL_FORM: SignUpFormState = {
  fullName: "",
  email: "",
  password: "",
};

export default function SignUpPage() {
  const [form, setForm] = useState<SignUpFormState>(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("idle");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 py-10 text-white">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-red-600">
            <Dumbbell className="h-5 w-5 text-white" />
          </span>
          <span className="text-xl font-bold tracking-wide">IRONFIT</span>
        </Link>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-2xl shadow-black/50">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="mt-2 text-sm text-white/50">
              Start your transformation today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="text-xs font-semibold uppercase tracking-wide text-white/60"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wide text-white/60"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wide text-white/60"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 pr-11 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-white/40 transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 pt-1 text-sm text-white/60">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/20 bg-white/5 accent-red-600 outline-none focus:ring-1 focus:ring-red-600"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="#"
                  className="font-medium text-white/80 underline-offset-2 transition hover:text-red-500 hover:underline"
                >
                  Terms and Conditions
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              variant="red"
              disabled={status === "loading" || !agreed}
              className="w-full gap-2 py-5 font-semibold transition disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-white/50">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-red-500 transition hover:text-red-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
