"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  image: string;
  specPill: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href?: string; isVideo?: boolean };
}

const SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "NEW SEASON 2026",
    title: "Bedsheets for",
    titleHighlight: "Every Home",
    description:
      "Crafted with 100% long-staple Pakistani combed cotton. Breathable, vibrant botanicals, and deep-pocket fitted cuts made for Pakistani mattresses.",
    image: "/images/hero/hero-bedroom.jpg",
    specPill: "100% Long-Staple Combed Cotton • 200 TC Percale",
    primaryCta: { label: "Shop Bedsheets", href: "/collections" },
    secondaryCta: { label: "Watch Craftsmanship", isVideo: true },
  },
  {
    id: "slide-2",
    badge: "WINTER & ALL-SEASON LUXURY",
    title: "Thermal Waffle",
    titleHighlight: "Blankets & Throws",
    description:
      "Dimensional honeycomb waffle knits and plush cloud sherpa throws. Engineered for perfect temperature regulation under AC or cool winter nights.",
    image: "/images/products/waffle-cotton-blanket.jpg",
    specPill: "350 GSM Breathable Thermal Knit • Pure Cotton",
    primaryCta: { label: "Explore Blankets", href: "/collections/blankets-throws" },
    secondaryCta: { label: "View Bed Sets", href: "/build-your-bed" },
  },
  {
    id: "slide-3",
    badge: "HOTEL SIGNATURE COLLECTION",
    title: "5-Star Luxury",
    titleHighlight: "Satin Stripe Sets",
    description:
      "Woven with a silky four-over-one sateen float yarn. The exact opulent crisp hotel bed linen chosen by Pakistan's premier 5-star suites.",
    image: "/images/categories/luxury-collection.jpg",
    specPill: "400 TC Egyptian Sateen Feel • Anti-Frizz Luster",
    primaryCta: { label: "Shop Hotel Sateen", href: "/collections/hotel-white-stripes" },
    secondaryCta: { label: "Explore Bridal", href: "/collections/bridal-collection" },
  },
  {
    id: "slide-4",
    badge: "CLOUD SLEEP ESSENTIALS",
    title: "Gusseted Down",
    titleHighlight: "Pillows & Silk Cases",
    description:
      "2-inch structural gusset pillows with siliconized micro-down fibers paired with pure Grade 6A Mulberry silk pillowcases for anti-wrinkle beauty rest.",
    image: "/images/products/hotel-down-pillows.jpg",
    specPill: "Ergonomic Neck Cradle • Hypoallergenic Microfiber",
    primaryCta: { label: "Shop Pillows", href: "/collections/pillows-cushions" },
    secondaryCta: { label: "Size Guide", href: "/size-guide" },
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [nextSlide, isPaused]);

  const slide = SLIDES[currentSlide];

  return (
    <section
      className="relative w-full bg-[#F8F6F1] overflow-hidden border-b border-[#E8DED0]/70 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Loom & Living Featured Hero Carousel"
    >
      <div className="container-custom pt-4 pb-12 lg:pt-8 lg:pb-16">
        <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden bg-[#FAF7F2] border border-[#E8DED0] shadow-sm">
          {/* Main Slide Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] sm:min-h-[540px] lg:min-h-[620px] items-center">
            {/* Left Content Area */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 z-20 flex flex-col justify-between h-full">
              <div className="space-y-4 sm:space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DED0]/60 border border-[#D5C7B6] w-fit animate-in fade-in duration-500">
                  <Sparkles className="w-3.5 h-3.5 text-[#B88B72]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#526453]">
                    {slide.badge}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-medium text-[#292D29] leading-[1.08] tracking-tight">
                  {slide.title}{" "}
                  <span className="italic font-normal text-[#2F4325] block sm:inline">
                    {slide.titleHighlight}
                  </span>
                </h1>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-base lg:text-lg text-[#5C6656] max-w-md font-normal leading-relaxed">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <Link
                    href={slide.primaryCta.href}
                    className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#2F4325] text-white text-sm font-semibold hover:bg-[#203118] transition-all shadow-md active:scale-95 group"
                  >
                    <span>{slide.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {slide.secondaryCta.isVideo ? (
                    <button
                      onClick={() => setVideoModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-[#292D29]/30 bg-white/60 hover:bg-white text-[#292D29] text-sm font-medium transition-all shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#292D29]" />
                      <span>{slide.secondaryCta.label}</span>
                    </button>
                  ) : (
                    <Link
                      href={slide.secondaryCta.href || "/collections"}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-[#292D29]/30 bg-white/60 hover:bg-white text-[#292D29] text-sm font-medium transition-all shadow-xs"
                    >
                      <span>{slide.secondaryCta.label}</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Slide Counter & Progress Controls */}
              <div className="flex items-center justify-between pt-8 mt-6 border-t border-[#E8DED0]/80">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-lg font-bold text-[#292D29]">
                    0{currentSlide + 1}
                  </span>
                  <span className="text-xs text-[#8C9388]">/ 0{SLIDES.length}</span>

                  {/* Progress Line Bars */}
                  <div className="flex items-center gap-1.5 ml-2">
                    {SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentSlide === idx
                            ? "w-8 bg-[#2F4325]"
                            : "w-2.5 bg-[#D5C7B6] hover:bg-[#8C9388]"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-9 h-9 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-colors shadow-xs active:scale-95"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-9 h-9 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-colors shadow-xs active:scale-95"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Photographic Showcase */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[620px] w-full overflow-hidden bg-[#E8DED0]">
              {SLIDES.map((s, idx) => (
                <div
                  key={s.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    currentSlide === idx ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    priority={idx === 0}
                    className="object-cover transition-transform duration-1000 scale-100 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Spec Pill */}
                  <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:bottom-6 sm:left-6 bg-white/92 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/60 shadow-lg flex items-center gap-2.5 text-xs font-semibold text-[#292D29] max-w-fit">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                    <span className="truncate">{s.specPill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Trust Highlights below Slider */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#E8DED0] text-[#292D29]">
            <Truck className="w-5 h-5 text-[#2F4325] shrink-0" />
            <div className="text-xs">
              <span className="font-bold block">Free Shipping</span>
              <span className="text-[#6B7267] text-[11px]">Orders over Rs. 3,000</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#E8DED0] text-[#292D29]">
            <RotateCcw className="w-5 h-5 text-[#2F4325] shrink-0" />
            <div className="text-xs">
              <span className="font-bold block">7-Day Returns</span>
              <span className="text-[#6B7267] text-[11px]">Hassle-free nationwide</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#E8DED0] text-[#292D29]">
            <ShieldCheck className="w-5 h-5 text-[#2F4325] shrink-0" />
            <div className="text-xs">
              <span className="font-bold block">100% Genuine Cotton</span>
              <span className="text-[#6B7267] text-[11px]">Certified combed yarn</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#E8DED0] text-[#292D29]">
            <span className="w-5 h-5 rounded-full bg-[#2F4325] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              COD
            </span>
            <div className="text-xs">
              <span className="font-bold block">Cash on Delivery</span>
              <span className="text-[#6B7267] text-[11px]">JazzCash & Cards accepted</span>
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
