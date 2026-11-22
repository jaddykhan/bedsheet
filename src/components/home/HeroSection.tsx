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

export interface FloatingCardData {
  title: string;
  slug: string;
  image: string;
}

const HERO_SLIDES: HeroSlideData[] = [
  {
    id: "slide-1",
    badge: "NEW SEASON COLLECTION",
    titleLine1: "Bedsheets for",
    titleLine2: "Every Home",
    subtitle:
      "Premium Pakistani bedsheets in beautiful prints, soft fabrics and perfect fits.",
    image: "/images/hero/hero-slide-1-landscape.jpg",
    primaryCta: { label: "Shop Collection", href: "/collections" },
    secondaryCta: { label: "Watch Lookbook", isVideo: true },
  },
  {
    id: "slide-2",
    badge: "EVERYDAY COTTON ESSENTIALS",
    titleLine1: "Comfort in",
    titleLine2: "Every Thread",
    subtitle:
      "Discover everyday luxury with beautifully crafted cotton bedsheets.",
    image: "/images/hero/hero-slide-2-landscape.jpg",
    primaryCta: { label: "Explore Collection", href: "/collections/plain-essentials" },
    secondaryCta: { label: "Watch Lookbook", isVideo: true },
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
    secondaryCta: { label: "Fabric Guide", href: "/fabric-guide" },
  },
];

const FLOATING_COLLECTION_CARDS: FloatingCardData[] = [
  {
    title: "Printed Collection",
    slug: "printed-bedsheets",
    image: "/images/hero/cards/card-printed.jpg",
  },
  {
    title: "Plain & Essentials",
    slug: "plain-essentials",
    image: "/images/hero/cards/card-plain.jpg",
  },
  {
    title: "Luxury Collection",
    slug: "luxury-collection",
    image: "/images/hero/cards/card-luxury.jpg",
  },
  {
    title: "Bridal Collection",
    slug: "bridal-collection",
    image: "/images/hero/cards/card-bridal.jpg",
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
      // Swiped left -> next
      nextSlide();
    } else if (diff < -50) {
      // Swiped right -> prev
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentData = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full h-[calc(100svh-104px)] min-h-[640px] xl:min-h-[720px] max-h-[920px] overflow-hidden select-none bg-[#FAF8F5]"
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
      {/* 1. EDGE-TO-EDGE PHOTOGRAPHY BACKGROUND SLIDES */}
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
                className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                sizes="100vw"
                quality={90}
              />

              {/* Editorial Left-to-Right Ambient Wash: Ensures Pristine Typography Legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/92 via-[#FAF8F5]/65 sm:via-[#FAF8F5]/45 to-transparent w-full lg:w-[65%] pointer-events-none"
                aria-hidden="true"
              />

              {/* Bottom Subtle Vignette for Floating Cards */}
              <div
                className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      {/* 2. CIRCULAR NAVIGATION ARROWS (Vertically Centered on Edges) */}
      <div className="absolute inset-y-0 left-3 sm:left-6 lg:left-8 flex items-center z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#E8DED0]/80 shadow-md flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all duration-300 pointer-events-auto active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-3 sm:right-6 lg:right-8 flex items-center z-30 pointer-events-none">
        <button
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#E8DED0]/80 shadow-md flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all duration-300 pointer-events-auto active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* 3. MAIN HERO CONTENT AREA (Container Padded on Left) */}
      <div className="relative z-20 h-full container-custom flex flex-col justify-between pt-10 sm:pt-14 md:pt-18 pb-6 sm:pb-8">
        {/* Left Editorial Text & Actions */}
        <div className="max-w-xl lg:max-w-2xl pl-2 sm:pl-4">
          {/* Badge with horizontal decorative line */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#3B4238]">
              {currentData.badge}
            </span>
            <span className="w-10 h-[1.5px] bg-[#3B4238]/40" />
          </div>

          {/* Large Serif Headline */}
          <h1 className="font-serif text-[42px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-normal text-[#1F2E19] leading-[1.04] tracking-tight mb-4 sm:mb-5">
            <span className="block">{currentData.titleLine1}</span>
            <span className="block font-medium">{currentData.titleLine2}</span>
          </h1>

          {/* Subtitle Description */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#3B4238] font-normal leading-relaxed max-w-md sm:max-w-lg mb-6 sm:mb-8">
            {currentData.subtitle}
          </p>

          {/* Primary & Secondary Call To Actions */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary Dark Olive Pill Button */}
            <Link
              href={currentData.primaryCta.href}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#2F4325] text-white text-sm font-semibold hover:bg-[#203118] transition-all shadow-md hover:shadow-lg active:scale-95 group"
            >
              <span>{currentData.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Secondary Watch Lookbook / Video Pill Button */}
            {currentData.secondaryCta.isVideo ? (
              <button
                onClick={() => setLookbookModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#292D29] text-sm font-medium border border-[#D5C7B6] backdrop-blur-sm transition-all shadow-xs hover:shadow-sm active:scale-95"
              >
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[#2F4325]">
                  <Play className="w-3.5 h-3.5 fill-[#2F4325] translate-x-0.5" />
                </div>
                <span>{currentData.secondaryCta.label}</span>
              </button>
            ) : (
              <Link
                href={currentData.secondaryCta.href || "/collections"}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#292D29] text-sm font-medium border border-[#D5C7B6] backdrop-blur-sm transition-all shadow-xs hover:shadow-sm active:scale-95"
              >
                <span>{currentData.secondaryCta.label}</span>
              </Link>
            )}
          </div>
        </div>

        {/* 4. PAGINATION DOTS (Centered horizontally above bottom cards) */}
        <div className="flex items-center justify-center gap-2 my-2 sm:my-3">
          {HERO_SLIDES.map((_, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive
                    ? "w-7 h-2.5 bg-white shadow-md"
                    : "w-2.5 h-2.5 bg-white/60 hover:bg-white/90 border border-black/10"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isActive ? "true" : "false"}
              />
            );
          })}
        </div>

        {/* 5. FLOATING 4 COLLECTION CARDS (Matching Reference Design) */}
        <div className="w-full">
          {/* Desktop 4-Column Grid / Mobile Horizontal Snap Scroll */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar pb-1">
            {FLOATING_COLLECTION_CARDS.map((card) => (
              <Link
                key={card.title}
                href={`/collections/${card.slug}`}
                className="group relative bg-[#FAF7F2]/90 hover:bg-white backdrop-blur-md rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 pr-3 sm:pr-4 border border-white/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between gap-2 sm:gap-3"
              >
                {/* Left Bedding Preview Image */}
                <div className="relative w-16 h-12 sm:w-22 sm:h-16 md:w-24 md:h-16 rounded-xl sm:rounded-2xl overflow-hidden bg-[#E8DED0] shrink-0 border border-white/60 shadow-xs">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                    sizes="(max-width: 640px) 70px, 100px"
                  />
                </div>

                {/* Card Title */}
                <span className="font-serif text-xs sm:text-sm md:text-[15px] font-semibold text-[#292D29] group-hover:text-[#2F4325] transition-colors leading-tight min-w-0 truncate">
                  {card.title}
                </span>

                {/* Circular Arrow Button */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-[#292D29] shadow-xs group-hover:bg-[#2F4325] group-hover:text-white transition-all duration-300 shrink-0">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 6. WATCH LOOKBOOK VIDEO MODAL */}
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
                src="/images/hero/hero-slide-1-landscape.jpg"
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
