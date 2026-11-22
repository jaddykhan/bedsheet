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
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

export interface HeroSlideData {
  id: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  image: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href?: string; isVideo?: boolean };
}

const HERO_SLIDES: HeroSlideData[] = [
  {
    id: "slide-1",
    badge: "NEW SEASON COLLECTION",
    titleLine1: "Comfort in",
    titleLine2: "Every Thread",
    subtitle:
      "Discover everyday luxury with beautifully crafted cotton bedsheets.",
    image: "/images/hero/hero-slide-reference-clean.jpg",
    primaryCta: { label: "Shop Collection", href: "/collections" },
    secondaryCta: { label: "Explore Lookbook", isVideo: true },
  },
  {
    id: "slide-2",
    badge: "NEW SEASON COLLECTION",
    titleLine1: "Bedsheets for",
    titleLine2: "Every Home",
    subtitle:
      "Premium Pakistani bedsheets in beautiful prints, soft fabrics and perfect fits.",
    image: "/images/hero/hero-slide-2-landscape.jpg",
    primaryCta: { label: "Shop Collection", href: "/collections/printed-bedsheets" },
    secondaryCta: { label: "Explore Lookbook", isVideo: true },
  },
  {
    id: "slide-3",
    badge: "HERITAGE & LUXURY SUITES",
    titleLine1: "A Touch of",
    titleLine2: "Timeless Elegance",
    subtitle:
      "Discover heritage-inspired patterns for your beautiful home.",
    image: "/images/hero/hero-slide-3-landscape.jpg",
    primaryCta: { label: "Discover More", href: "/collections/luxury-collection" },
    secondaryCta: { label: "Explore Lookbook", href: "/fabric-guide" },
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lookbookModalOpen, setLookbookModalOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Touch Swipe coordinates
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_INTERVAL = 6000; // 6 seconds auto-transition
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Autoplay with pause-on-hover / pause-on-focus
  useEffect(() => {
    if (isPaused || lookbookModalOpen) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_INTERVAL);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [nextSlide, isPaused, lookbookModalOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lookbookModalOpen) return;
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, lookbookModalOpen]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentData = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full h-[calc(100vh-96px)] min-h-[560px] max-h-[calc(100vh-96px)] overflow-hidden select-none bg-[#FAF8F5]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Loom & Living Luxury Hero Slider"
    >
      {/* 1. EDGE-TO-EDGE PHOTOGRAPHY BACKGROUND */}
      <div className="absolute inset-0 w-full h-full">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-900 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.image}
                alt={`${slide.titleLine1} ${slide.titleLine2}`}
                fill
                priority={index === 0}
                className={`object-cover object-right sm:object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                sizes="100vw"
                quality={92}
              />

              {/* Editorial Left-to-Right Ambient Wash: Ensures Pristine Typography Legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/70 sm:via-[#FAF8F5]/40 to-transparent w-full lg:w-[62%] pointer-events-none"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      {/* 2. RIGHT-SIDE VERTICALLY STACKED SLIDER CONTROLS (Matching Screenshot) */}
      <div className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-30 pointer-events-auto">
        {/* Next Arrow (Top) */}
        <button
          onClick={nextSlide}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-[#E8DED0]/80 flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all duration-200 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Prev Arrow (Bottom) */}
        <button
          onClick={prevSlide}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-[#E8DED0]/80 flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all duration-200 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Numerical Slide Counter */}
        <span className="text-[11px] sm:text-xs font-semibold text-[#292D29] tracking-wider mt-0.5 select-none bg-white/60 px-2 py-0.5 rounded-full">
          0{currentSlide + 1} / 0{totalSlides}
        </span>
      </div>

      {/* 3. HERO CONTENT CONTAINER (Fills 100% of first viewport cleanly) */}
      <div className="relative z-20 h-full container-custom flex flex-col justify-between pt-6 sm:pt-10 md:pt-12 pb-4 sm:pb-5">
        {/* Left Editorial Content */}
        <div className="max-w-md sm:max-w-lg lg:max-w-xl pl-2 sm:pl-4">
          {/* Badge with horizontal line */}
          <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#3B4238]">
              {currentData.badge}
            </span>
            <span className="w-10 h-[1.5px] bg-[#3B4238]/40" />
          </div>

          {/* Large Editorial Serif Headline */}
          <h1 className="font-serif text-[40px] sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[76px] font-normal text-[#1F2E19] leading-[1.04] tracking-tight mb-3 sm:mb-4">
            <span className="block">{currentData.titleLine1}</span>
            <span className="block font-medium">{currentData.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#3B4238] font-normal leading-relaxed max-w-sm sm:max-w-md mb-5 sm:mb-6">
            {currentData.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-5 sm:mb-6">
            {/* Primary Dark Olive Pill Button */}
            <Link
              href={currentData.primaryCta.href}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#2F4325] text-white text-xs sm:text-sm font-semibold hover:bg-[#203118] transition-all shadow-md hover:shadow-lg active:scale-95 group"
            >
              <span>{currentData.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Secondary Explore Lookbook Button */}
            {currentData.secondaryCta.isVideo ? (
              <button
                onClick={() => setLookbookModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#FDFBF7] hover:bg-white text-[#292D29] text-xs sm:text-sm font-medium border border-[#D5C7B6] transition-all shadow-xs hover:shadow-sm active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-[#292D29] translate-x-0.5" />
                <span>{currentData.secondaryCta.label}</span>
              </button>
            ) : (
              <Link
                href={currentData.secondaryCta.href || "/collections"}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#FDFBF7] hover:bg-white text-[#292D29] text-xs sm:text-sm font-medium border border-[#D5C7B6] transition-all shadow-xs hover:shadow-sm active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-[#292D29] translate-x-0.5" />
                <span>{currentData.secondaryCta.label}</span>
              </Link>
            )}
          </div>

          {/* Left Pagination Dots (Under the buttons, exactly as in reference) */}
          <div className="flex items-center gap-2 pl-1">
            {HERO_SLIDES.map((_, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325] ${
                    isActive
                      ? "w-2.5 h-2.5 bg-[#2F4325] shadow-xs"
                      : "w-2 h-2 bg-[#C7BFB5] hover:bg-[#8F877C]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={isActive ? "true" : "false"}
                />
              );
            })}
          </div>
        </div>

        {/* 4. FLOATING UNIFIED TRUST CAPSULE BAR (Inside the hero at the bottom) */}
        <div className="w-full max-w-6xl mx-auto z-20">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full py-3 sm:py-3.5 px-4 sm:px-8 border border-[#E8DED0]/90 shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:divide-x md:divide-[#E8DED0]/80">
              {/* Feature 1: Premium Fabrics */}
              <div className="flex items-center gap-2.5 sm:gap-3 px-1 md:px-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#2F4325] shrink-0">
                  <Sparkles className="w-4 h-4 text-[#2F4325]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#292D29] block truncate">
                    Premium Fabrics
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#6B7267] block truncate">
                    Soft, breathable &amp; durable
                  </span>
                </div>
              </div>

              {/* Feature 2: Nationwide Delivery */}
              <div className="flex items-center gap-2.5 sm:gap-3 px-1 md:px-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#2F4325] shrink-0">
                  <Truck className="w-4 h-4 text-[#2F4325]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#292D29] block truncate">
                    Nationwide Delivery
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#6B7267] block truncate">
                    All across Pakistan
                  </span>
                </div>
              </div>

              {/* Feature 3: Easy Returns */}
              <div className="flex items-center gap-2.5 sm:gap-3 px-1 md:px-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#2F4325] shrink-0">
                  <RotateCcw className="w-4 h-4 text-[#2F4325]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#292D29] block truncate">
                    Easy Returns
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#6B7267] block truncate">
                    7-day hassle-free returns
                  </span>
                </div>
              </div>

              {/* Feature 4: Secure Payments */}
              <div className="flex items-center gap-2.5 sm:gap-3 px-1 md:px-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#2F4325] shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#2F4325]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#292D29] block truncate">
                    Secure Payments
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#6B7267] block truncate">
                    COD, JazzCash &amp; Easypaisa
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. WATCH LOOKBOOK MODAL */}
      {lookbookModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Loom & Living Craftsmanship Story"
        >
          <div className="relative w-full max-w-3xl bg-[#1E2C18] rounded-3xl overflow-hidden shadow-2xl border border-[#2F4325]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#2F4325] text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight">
                  Loom &amp; Living Textile Lookbook
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                  aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                >
                  {isVideoMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => setLookbookModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                  aria-label="Close lookbook preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Showcase Area */}
            <div className="relative aspect-video w-full bg-[#121A0F] flex items-center justify-center overflow-hidden">
              <Image
                src="/images/hero/hero-slide-reference-clean.jpg"
                alt="Craftsmanship Video Showcase"
                fill
                className="object-cover opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

              <div className="relative z-10 text-center p-6 space-y-4 max-w-lg">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#2F4325] border-2 border-[#B88B72] flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-105 transition-transform">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 text-white" />
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#F8F6F1] font-medium leading-snug">
                  Artisanal Weaving &amp; Pure Combed Cotton
                </h4>
                <p className="text-xs sm:text-sm text-[#C8BFB3] leading-relaxed">
                  Experience how Pakistan&apos;s finest long-staple cotton is woven into breathable 200–400 thread count bedsheets in Faisalabad, then tailored with deep 14-inch tuck-in drops.
                </p>
                <div className="pt-2">
                  <Link
                    href="/collections"
                    onClick={() => setLookbookModalOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#B88B72] hover:bg-[#a2745d] text-white text-xs font-semibold transition-all shadow-md"
                  >
                    <span>Explore All 2026 Collections</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
