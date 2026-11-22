"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Compass, Feather } from "lucide-react";
import { BEDROOM_INSPIRATION } from "@/data/products";

export function BedroomInspiration() {
  const tagIcons = {
    "Floral Elegance": Sparkles,
    "Modern Minimal": Compass,
    "Traditional Charm": Feather,
  };

  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267] block mb-1">
              Get Inspired
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#292D29] tracking-tight">
              Bedroom Inspiration
            </h2>
            <p className="text-sm text-[#6B7267] mt-1 max-w-md">
              Explore real bedroom looks and get ideas to style your space with our curated bedsheets.
            </p>
          </div>

          <Link
            href="/lookbook"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2F4325] text-white text-xs sm:text-sm font-semibold hover:bg-[#24351c] transition-all shadow-md group shrink-0"
          >
            <span>Explore Lookbook</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BEDROOM_INSPIRATION.map((item) => {
            const Icon = tagIcons[item.tag as keyof typeof tagIcons] || Sparkles;
            return (
              <Link
                key={item.title}
                href={`/collections/${item.collectionSlug}`}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 block border border-[#E8DED0]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Pill Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-[#F8F6F1]/92 backdrop-blur-md rounded-full px-4 py-2.5 flex items-center justify-between border border-white/60 shadow-md group-hover:bg-white transition-colors">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#2F4325]" />
                      <span className="text-sm font-semibold text-[#292D29]">
                        {item.title}
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#2F4325] shadow-xs group-hover:bg-[#2F4325] group-hover:text-white transition-all">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
