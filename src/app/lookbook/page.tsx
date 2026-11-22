import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { BEDROOM_INSPIRATION, REAL_BEDROOMS } from "@/data/products";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LookbookPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="container-custom space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F4325]">
              Editorial Lookbook 2026
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292D29] tracking-tight">
              Bedroom Styling Inspiration
            </h1>
            <p className="text-sm text-[#6B7267]">
              Curated bedsheet pairings, lighting nuances, and textile compositions styled for contemporary Pakistani architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BEDROOM_INSPIRATION.map((item) => (
              <div key={item.title} className="bg-white rounded-3xl overflow-hidden border border-[#E8DED0] shadow-xs group">
                <div className="relative aspect-[4/3] bg-[#E8DED0]">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B88B72]">{item.tag}</span>
                  <h2 className="font-serif text-xl font-bold text-[#292D29]">{item.title}</h2>
                  <p className="text-xs text-[#6B7267] leading-relaxed">{item.description}</p>
                  <Link
                    href={`/collections/${item.collectionSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F4325] hover:underline pt-2"
                  >
                    <span>Shop This Look</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292D29] mb-6 text-center">
              Customer Bedroom Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {REAL_BEDROOMS.map((bed) => (
                <div key={bed.id} className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#E8DED0] border border-[#E8DED0]">
                  <Image src={bed.image} alt={bed.customer} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex flex-col justify-end text-white">
                    <span className="text-xs font-bold">{bed.customer}</span>
                    <span className="text-[10px] text-[#E8DED0]">{bed.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
