"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

export interface TrustBenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const HERO_SLIDES: HeroSlideData[] = [
  {
    id: "slide-1",
    badge: "NEW SEASON COLLECTION",
    titleLine1: "Comfort in",
    titleLine2: "Every Thread",
    subtitle:
      "Discover everyday luxury with beautifully crafted cotton bedsheets.",
    image: "/images/hero/hero-slide-1.jpg",
    primaryCta: { label: "Shop Collection", href: "/collections" },
    secondaryCta: { label: "Explore Lookbook", isVideo: true },
  },
  {
    id: "slide-2",
    badge: "NEW SEASON COLLECTION",
    titleLine1: "Elevate Your",
    titleLine2: "Everyday",
    subtitle:
      "Discover breathable combed cotton woven for pure comfort and peaceful sleep.",
    image: "/images/hero/hero-slide-2.jpg",
    primaryCta: { label: "Shop Collection", href: "/collections/plain-essentials" },
    secondaryCta: { label: "Explore Lookbook", isVideo: true },
  },
  {
    id: "slide-3",
    badge: "HERITAGE & LUXURY SUITES",
    titleLine1: "Tradition Meets",
    titleLine2: "Elegance",
    subtitle:
      "Discover heritage-inspired patterns celebrating authentic Pakistani craftsmanship.",
    image: "/images/hero/hero-slide-3.jpg",
    primaryCta: { label: "Shop Collection", href: "/collections/luxury-collection" },
    secondaryCta: { label: "Explore Lookbook", href: "/fabric-guide" },
  },
];

const TRUST_BENEFITS: TrustBenefitItem[] = [
  {
    icon: Sparkles,
    title: "Premium Fabrics",
    description: "Soft, breathable & durable",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "All across Pakistan",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free returns",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "COD, JazzCash & Easypaisa",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lookbookModalOpen, setLookbookModalOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Mobile Touch Swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_INTERVAL = 6000; // 6 seconds auto slide
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

  // Autoplay management with pause-on-hover / pause-on-focus
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

  // Mobile touch swipe handling
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
      className="relative isolate overflow-hidden w-full select-none bg-[#FAF8F5] h-[clamp(620px,calc(100svh-128px),760px)] min-h-[580px] md:h-[660px] lg:h-[730px]"
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
      {/* LAYER 1: SEAMLESS BACKGROUND PHOTOGRAPHY (z-0) */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-800 ease-in-out ${
                isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
            </div>
          );
        })}
      </div>

      {/* LAYER 2: SUBTLE NATURAL-LOOKING GRADIENT OVERLAY (z-1)
          Covers the hero image smoothly without any rectangular card or hard edge */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(248,246,241,0.92) 0%, rgba(248,246,241,0.68) 28%, rgba(248,246,241,0.15) 58%, transparent 76%)",
        }}
        aria-hidden="true"
      />

      {/* LAYER 3: STABLE TEXT CONTENT CONTAINER (z-2) */}
      <div className="relative z-2 h-full container-custom flex flex-col justify-between pt-10 sm:pt-14 md:pt-16 pb-24 sm:pb-28">
        {/* Animated Single Active Slide Content with mode="wait" to prevent duplication */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentData.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-[560px] pl-2 sm:pl-4"
          >
            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#3B4238]">
                {currentData.badge}
              </span>
              <span className="w-10 h-[1.5px] bg-[#3B4238]/40" />
            </div>

            {/* Large Serif Headline */}
            <h1 className="font-serif text-[44px] sm:text-[56px] md:text-[68px] lg:text-[78px] font-normal text-[#1F2E19] leading-[1.02] tracking-tight mb-4">
              <span className="block">{currentData.titleLine1}</span>
              <span className="block font-medium">{currentData.titleLine2}</span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg md:text-[19px] text-[#3B4238] font-normal leading-relaxed max-w-[480px] mb-7 sm:mb-8">
              {currentData.subtitle}
            </p>

            {/* CTA Buttons (Height 52-56px, Border Radius 14px, Gap 16px) */}
            <div className="flex flex-wrap items-center gap-4 mb-6 sm:mb-8">
              {/* Primary Dark Olive Button */}
              <Link
                href={currentData.primaryCta.href}
                className="inline-flex items-center gap-2.5 px-7 h-[52px] sm:h-[56px] rounded-[14px] bg-[#2F4325] text-white text-sm font-semibold hover:bg-[#203118] transition-all shadow-md hover:shadow-lg active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325]"
              >
                <span>{currentData.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary Explore Lookbook Button */}
              {currentData.secondaryCta.isVideo ? (
                <button
                  onClick={() => setLookbookModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-6 h-[52px] sm:h-[56px] rounded-[14px] bg-[#F8F6F1] hover:bg-white text-[#292D29] text-sm font-medium border border-[#D5C7B6] transition-all shadow-xs hover:shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325]"
                >
                  <Play className="w-3.5 h-3.5 fill-[#292D29] translate-x-0.5" />
                  <span>{currentData.secondaryCta.label}</span>
                </button>
              ) : (
                <Link
                  href={currentData.secondaryCta.href || "/collections"}
                  className="inline-flex items-center gap-2.5 px-6 h-[52px] sm:h-[56px] rounded-[14px] bg-[#F8F6F1] hover:bg-white text-[#292D29] text-sm font-medium border border-[#D5C7B6] transition-all shadow-xs hover:shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325]"
                >
                  <Play className="w-3.5 h-3.5 fill-[#292D29] translate-x-0.5" />
                  <span>{currentData.secondaryCta.label}</span>
                </Link>
              )}
            </div>

            {/* Small Pagination Dots under content */}
            <div className="flex items-center gap-2.5 pl-1">
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LAYER 4: RIGHT-SIDE NAVIGATION CONTROLS (z-3) */}
      <div className="absolute right-4 sm:right-7 lg:right-10 top-[40%] -translate-y-1/2 flex flex-col items-center gap-2.5 z-3 pointer-events-auto">
        {/* Next Arrow (Top) */}
        <button
          onClick={nextSlide}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-[#E8DED0]/80 flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all duration-200 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Prev Arrow (Bottom) */}
        <button
          onClick={prevSlide}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-[#E8DED0]/80 flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all duration-200 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* 01 / 03 Counter */}
        <span className="text-[11px] sm:text-xs font-semibold text-[#292D29] tracking-wider mt-0.5 select-none bg-white/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#E8DED0]/70 shadow-xs">
          0{currentSlide + 1} / 0{totalSlides}
        </span>
      </div>

      {/* LAYER 5: FLOATING TRUST BENEFITS BAR (z-4)
          Centered horizontally, Width min(90%, 1450px), Bottom 28px, Radius 28px */}
      <div className="absolute bottom-6 sm:bottom-7 md:bottom-7 inset-x-0 mx-auto w-[92%] max-w-[1450px] z-4 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-[24px] md:rounded-[28px] py-3.5 sm:py-4 px-5 sm:px-8 border border-[#E8DED0]/90 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:divide-x md:divide-[#E8DED0]/80">
            {TRUST_BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-2.5 sm:gap-3 px-1 md:px-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DED0] flex items-center justify-center text-[#2F4325] shrink-0">
                    <Icon className="w-4 h-4 text-[#2F4325]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#292D29] block truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#6B7267] block truncate">
                      {item.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LOOKBOOK MODAL (High z-index: z-50) */}
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
                src="/images/hero/hero-slide-1.jpg"
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
