import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Award, Heart, Sparkles, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="container-custom max-w-4xl space-y-12">
          {/* Hero */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F4325]">
              Our Heritage & Vision
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292D29] tracking-tight">
              Bedsheets Thoughtfully Designed for Pakistani Homes
            </h1>
            <p className="text-sm sm:text-base text-[#6B7267] max-w-2xl mx-auto leading-relaxed">
              Founded on a simple belief: every bedroom in Pakistan deserves premium comfort without exorbitant luxury markups or synthetic shortcuts.
            </p>
          </div>

          {/* Story Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DED0]">
            <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#E8DED0]">
              <Image src="/images/hero/hero-bedroom.jpg" alt="Loom and living textiles" fill className="object-cover" />
            </div>
            <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-[#6B7267] leading-relaxed">
              <h2 className="font-serif text-2xl font-bold text-[#292D29]">The Loom & Living Journey</h2>
              <p>
                Pakistan is the 5th largest producer of cotton globally, yet finding genuine, beautifully printed combed cotton bedsheets with proper sizing has long been a frustration.
              </p>
              <p>
                From rotary pigment printers in Faisalabad to long-staple cotton farms in Southern Punjab, we oversee each stage of yarn spinning, dyeing, and tailored finishing. We don&apos;t just sell bedsheets; we bring comfort and timeless aesthetic warmth to your sanctuary.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#2F4325]">
                <MapPin className="w-4 h-4 text-[#B88B72]" />
                <span>Textile Mills: Faisalabad & Multan • Design Studio: Lahore</span>
              </div>
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="quality">
            <div className="bg-white rounded-3xl p-6 border border-[#E8DED0] space-y-2 text-center">
              <Award className="w-8 h-8 text-[#2F4325] mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-[#292D29]">100% Genuine Yarns</h3>
              <p className="text-xs text-[#6B7267]">
                Zero inflated synthetic counts. Honest combed cotton, fine cambric, and pure silk satin.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8DED0] space-y-2 text-center">
              <Sparkles className="w-8 h-8 text-[#2F4325] mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-[#292D29]">Generous Tucking Cut</h3>
              <p className="text-xs text-[#6B7267]">
                Engineered specifically for thick Pakistani mattresses with deep 12-inch side drops.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8DED0] space-y-2 text-center">
              <Heart className="w-8 h-8 text-[#2F4325] mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-[#292D29]">Direct to Customer</h3>
              <p className="text-xs text-[#6B7267]">
                Fair pricing by eliminating middleman distributors and heavy retail mall overheads.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
