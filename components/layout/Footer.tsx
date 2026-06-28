import { Clock, Dumbbell, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M23.5 6.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.94-2.36-1C16.9 3 12 3 12 3h-.01s-4.9 0-8.19.14c-.47.05-1.47.06-2.36 1C.73 4.86.5 6.5.5 6.5S.27 8.42.27 10.34v1.32C.27 13.58.5 15.5.5 15.5s.23 1.64.94 2.36c.89.94 2.06.91 2.58 1.01 1.87.18 8 .14 8 .14s4.9-.01 8.19-.15c.47-.06 1.47-.06 2.36-1.01.71-.72.94-2.36.94-2.36s.23-1.92.23-3.84v-1.32c0-1.92-.23-3.84-.23-3.84ZM9.55 14.6V8.4L15.5 11.5l-5.95 3.1Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-red-600">
              <Dumbbell className="h-5 w-5 text-white" />
            </span>
            IRONFIT
          </div>
          <p className="mt-4 text-sm text-white/60">
            IronFit Gym — where your transformation begins and you start
            achieving your fitness goals.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="transition hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Programs</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>Body Building</li>
            <li>Weight Loss</li>
            <li>Strength Training</li>
            <li>Yoga &amp; Flexibility</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact Info</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-red-500" /> 123 ABC Street,
              District 1, Ho Chi Minh City
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-red-500" /> 0123 456 789
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-red-500" /> info@ironfit.vn
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-500" /> 05:00 - 23:00
              (Everyday)
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © 2026 IronFit Gym. All rights reserved.
      </div>
    </footer>
  );
}
