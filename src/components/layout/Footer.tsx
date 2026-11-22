"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { BrandLogo } from "@/components/ui/BrandLogo";

// Clean social SVGs
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast("Please enter a valid email address", "error");
      return;
    }
    setSubscribed(true);
    toast("Thank you for subscribing to Loom & Living!");
    setEmail("");
  };

  return (
    <footer className="bg-[#1E2C18] text-[#F8F6F1] pt-16 pb-8 border-t border-[#2F4325]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#2F4325]">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="dark" size="lg" />

            <p className="text-sm text-[#C8BFB3] max-w-sm leading-relaxed">
              Premium bedsheets, thoughtfully designed for every home in Pakistan. Crafted with combed cotton, cambric, and rich heritage prints.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2F4325] flex items-center justify-center text-[#E8DED0] hover:text-white hover:bg-[#3d5730] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2F4325] flex items-center justify-center text-[#E8DED0] hover:text-white hover:bg-[#3d5730] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2F4325] flex items-center justify-center text-[#E8DED0] hover:text-white hover:bg-[#3d5730] transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2F4325] flex items-center justify-center text-[#E8DED0] hover:text-white hover:bg-[#3d5730] transition-colors font-bold text-xs"
                aria-label="TikTok"
              >
                TK
              </a>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2F4325] flex items-center justify-center text-[#E8DED0] hover:text-white hover:bg-[#3d5730] transition-colors font-bold text-xs"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-[#C8BFB3]">
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  All Bedsheets
                </Link>
              </li>
              <li>
                <Link href="/collections/printed-bedsheets" className="hover:text-white transition-colors">
                  Printed Bedsheets
                </Link>
              </li>
              <li>
                <Link href="/collections/plain-essentials" className="hover:text-white transition-colors">
                  Plain & Essentials
                </Link>
              </li>
              <li>
                <Link href="/collections/luxury-collection" className="hover:text-white transition-colors">
                  Luxury Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/bridal-collection" className="hover:text-white transition-colors">
                  Bridal Collection
                </Link>
              </li>
              <li>
                <Link href="/collections?filter=sale" className="text-[#B88B72] hover:text-white transition-colors font-medium">
                  Sale & Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">
              Help
            </h4>
            <ul className="space-y-2 text-sm text-[#C8BFB3]">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/fabric-guide" className="hover:text-white transition-colors">
                  Fabric Guide
                </Link>
              </li>
              <li>
                <Link href="/help/shipping-policy" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/help/faqs" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">
              About
            </h4>
            <ul className="space-y-2 text-sm text-[#C8BFB3]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about#quality" className="hover:text-white transition-colors">
                  Quality Promise
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/help/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-xs text-[#C8BFB3] hover:text-[#B88B72] transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">
              Newsletter
            </h4>
            <p className="text-xs text-[#C8BFB3] leading-relaxed">
              Subscribe to get the latest collections, exclusive offers and styling tips.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white text-xs text-[#292D29] placeholder:text-[#6B7267] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#2F4325] text-white flex items-center justify-center hover:bg-[#24351c] transition-colors"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#C8BFB3]">
          <div>
            &copy; {new Date().getFullYear()} Loom & Living. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <span className="w-4 h-4 rounded-full bg-[#00401A] flex items-center justify-center text-[9px] text-white font-bold">
                🇵🇰
              </span>
              <span>Proudly Pakistani</span>
            </div>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B88B72]" />
              <span>Secure Shopping (COD, JazzCash, Easypaisa)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
