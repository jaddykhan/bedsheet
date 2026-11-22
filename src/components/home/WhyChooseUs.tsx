"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Truck, PackageCheck, ShieldCheck, Headphones } from "lucide-react";

export function WhyChooseUs() {
  const cards = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Durable, soft & long lasting combed yarn",
    },
    {
      icon: Truck,
      title: "Nationwide Delivery",
      description: "Fast doorstep delivery across all cities of Pakistan",
    },
    {
      icon: PackageCheck,
      title: "Easy Returns",
      description: "7-day hassle-free exchange & money-back promise",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "Cash on Delivery, JazzCash & Easypaisa verified",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Dedicated WhatsApp assistance & quick resolution",
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden border-b border-[#E8DED0]/60">
      {/* Background warm bedroom image with soft overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-bedroom.jpg"
          alt="Warm Bedroom Backdrop"
          fill
          className="object-cover object-top opacity-20 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F6F1] via-[#F8F6F1]/90 to-[#F8F6F1]" />
      </div>

      <div className="container-custom">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267]">
                The Loom & Living Promise
              </span>
              <span className="w-8 h-[1px] bg-[#6B7267]/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-medium text-[#292D29] tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-sm sm:text-base text-[#6B7267] max-w-lg leading-relaxed">
              A better bedsheet shopping experience with quality, comfort and complete trust for Pakistani families.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2F4325] text-white text-xs sm:text-sm font-semibold hover:bg-[#24351c] transition-all shadow-md group shrink-0"
          >
            <span>Our Commitment</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5 Benefits Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-[#E8DED0] shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center group hover:bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] group-hover:bg-[#2F4325] group-hover:text-white transition-colors mb-4 border border-[#E8DED0]/60">
                  <Icon className="w-6 h-6 stroke-[1.6]" />
                </div>
                <h3 className="text-sm font-bold text-[#292D29] mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-[#6B7267] leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
