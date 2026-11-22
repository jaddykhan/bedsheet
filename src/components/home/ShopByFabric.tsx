"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Wind, Waves, Feather } from "lucide-react";
import { FABRICS } from "@/data/products";

export function ShopByFabric() {
  const fabricIcons = {
    "Pure Cotton": Sparkles,
    "Polycotton": Wind,
    "Satin": Waves,
    "Cambric": Feather,
  };

  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267] block mb-1">
              Shop by Fabric
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#292D29] tracking-tight">
              Find Your Perfect Fabric
            </h2>
          </div>

          <Link
            href="/fabric-guide"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#292D29] hover:text-[#2F4325] transition-colors group"
          >
            <span>Fabric Guide</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Macro Fabric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FABRICS.map((fab) => {
            const Icon = fabricIcons[fab.name as keyof typeof fabricIcons] || Sparkles;
            return (
              <Link
                key={fab.name}
                href={`/collections?fabric=${encodeURIComponent(fab.name)}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 block border border-[#E8DED0]/70"
              >
                {/* Texture Image */}
                <Image
                  src={fab.image}
                  alt={fab.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                {/* Bottom Pill Badge */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                  <div className="bg-[#F8F6F1]/92 backdrop-blur-md rounded-2xl px-3.5 py-2.5 flex items-center justify-between border border-white/60 shadow-md group-hover:bg-white transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#E8DED0] flex items-center justify-center text-[#2F4325] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm font-bold text-[#292D29] block truncate">
                          {fab.name}
                        </span>
                        <span className="text-[10px] text-[#6B7267] block truncate">
                          {fab.tagline}
                        </span>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#2F4325] shadow-xs group-hover:bg-[#2F4325] group-hover:text-white transition-all shrink-0 ml-1">
                      <ArrowRight className="w-3.5 h-3.5" />
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
