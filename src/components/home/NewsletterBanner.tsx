"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Tag, Percent, Gift, Mail, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast("Please enter a valid email address", "error");
      return;
    }
    setSubscribed(true);
    toast("Welcome! Check your inbox for your 10% welcome coupon (WELCOME10).");
    setEmail("");
  };

  return (
    <section className="w-full bg-[#F8F6F1] py-10 lg:py-16">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden bg-[#35492A] text-white shadow-xl border border-[#2b3c22]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Image: Folded Bedsheet Stack */}
            <div className="lg:col-span-4 relative aspect-[4/3] lg:aspect-auto lg:h-full w-full bg-[#27381F] overflow-hidden">
              <Image
                src="/images/banners/folded-bedsheets.jpg"
                alt="Stack of folded printed cotton bedsheets"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#35492A]/90 lg:to-[#35492A]" />
            </div>

            {/* Right Form & Content */}
            <div className="lg:col-span-8 p-6 sm:p-10 lg:p-12 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E8DED0]">
                    Stay in Touch
                  </span>
                  <span className="w-8 h-[1px] bg-[#E8DED0]/40" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-medium text-white tracking-tight leading-tight">
                  Get Exclusive Offers
                </h2>
                <p className="text-sm sm:text-base text-[#E8DED0] max-w-lg leading-relaxed">
                  Be the first to know about new collections, seasonal sales and special discounts across Pakistan.
                </p>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="max-w-xl">
                <div className="flex flex-col sm:flex-row gap-2.5 bg-white p-1.5 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2.5 px-3 flex-1">
                    <Mail className="w-4 h-4 text-[#6B7267]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full text-xs sm:text-sm text-[#292D29] placeholder:text-[#6B7267] bg-transparent focus:outline-none py-2"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2F4325] text-white text-xs sm:text-sm font-semibold hover:bg-[#24351c] transition-colors shrink-0"
                  >
                    {subscribed ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* 3 Value Perks */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/15 max-w-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2">
                  <Tag className="w-4 h-4 text-[#B88B72] shrink-0" />
                  <span className="text-xs text-[#E8DED0] leading-tight">New Arrivals Alerts</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 border-l border-white/15 pl-3">
                  <Percent className="w-4 h-4 text-[#B88B72] shrink-0" />
                  <span className="text-xs text-[#E8DED0] leading-tight">Exclusive Deals</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 border-l border-white/15 pl-3">
                  <Gift className="w-4 h-4 text-[#B88B72] shrink-0" />
                  <span className="text-xs text-[#E8DED0] leading-tight">Special Offers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
