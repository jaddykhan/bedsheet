"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, X } from "lucide-react";

export function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      subtitle: "NEW SEASON COLLECTION",
      title: "Bedsheets for Every Home",
      description:
        "Premium Pakistani bedsheets in beautiful prints, soft fabrics and perfect fits.",
      image: "/images/hero/hero-bedroom.jpg",
      primaryCta: { label: "Shop Now", href: "/collections" },
      secondaryCta: { label: "Watch Collection" },
    },
    {
      subtitle: "HERITAGE AJRAK & INDIGO",
      title: "Timeless Cultural Elegance",
      description:
        "Artisanal patterns inspired by Multan and Sindh block printing on fine sateen cotton.",
      image: "/images/products/indigo-heritage.jpg",
      primaryCta: { label: "Explore Heritage", href: "/collections/luxury-collection" },
      secondaryCta: { label: "Watch Collection" },
    },
    {
      subtitle: "SUMMER ESSENTIALS 2026",
      title: "Breezy Cambric & Percale",
      description:
        "Featherlight, breathable weaves crafted specifically for warm Pakistani summers.",
      image: "/images/inspiration/modern-minimal.jpg",
      primaryCta: { label: "View Essentials", href: "/collections/plain-essentials" },
      secondaryCta: { label: "Watch Collection" },
    },
  ];

  const banner = banners[currentSlide];

  return (
    <section className="relative w-full bg-[#F8F6F1] overflow-hidden pt-4 pb-12 lg:pt-8 lg:pb-16 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-5 space-y-6 lg:pr-4 z-10">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267]">
                {banner.subtitle}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-medium text-[#292D29] leading-[1.1] tracking-tight">
              {banner.title}
            </h1>

            <p className="text-base sm:text-lg text-[#6B7267] max-w-md font-normal leading-relaxed">
              {banner.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={banner.primaryCta.href}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2F4325] text-white text-sm font-medium hover:bg-[#24351c] transition-all shadow-md group"
              >
                <span>{banner.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#292D29]/40 text-[#292D29] text-sm font-medium hover:bg-[#E8DED0]/50 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-[#292D29]" />
                <span>{banner.secondaryCta.label}</span>
              </button>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center gap-2.5 pt-4">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? "w-8 bg-[#2F4325]"
                      : "w-2.5 bg-[#C8BFB3] hover:bg-[#966750]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/10] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-[#E8DED0]/80">
              <Image
                src={banner.image}
                alt="Loom & Living Pakistani Floral Bedsheet Set"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Floating feature pill */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-lg flex items-center gap-2 text-xs font-medium text-[#292D29]">
                <span className="w-2 h-2 rounded-full bg-[#2F4325] animate-pulse" />
                <span>100% Combed Pakistani Cotton • 200 TC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#1E2C18] rounded-2xl overflow-hidden shadow-2xl border border-[#2F4325]">
            <div className="p-4 flex items-center justify-between border-b border-[#2F4325] text-white">
              <h3 className="font-serif text-lg font-bold">Loom & Living Collection Craftsmanship</h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#2F4325] flex items-center justify-center text-white shadow-lg">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
                <h4 className="font-serif text-xl text-white">The Loom & Living Textile Story</h4>
                <p className="text-xs text-[#C8BFB3] max-w-md mx-auto">
                  From cotton fields in Southern Punjab to traditional rotary printing in Faisalabad, discover the artisan dedication behind each bedsheet.
                </p>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="px-5 py-2 rounded-full bg-[#B88B72] text-white text-xs font-semibold hover:bg-[#966750]"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
