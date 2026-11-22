"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export function ShopByCategory() {
  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267] block mb-1">
              Explore Our Range
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#292D29] tracking-tight">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#292D29] hover:text-[#2F4325] transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 block border border-[#E8DED0]/70"
            >
              {/* Category Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Pill Overlay Badge */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5">
                <div className="bg-[#F8F6F1]/90 backdrop-blur-md rounded-full px-4 py-2.5 flex items-center justify-between border border-white/60 shadow-md group-hover:bg-white transition-colors">
                  <span className="text-sm font-semibold text-[#292D29] tracking-tight">
                    {cat.title}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#2F4325] shadow-xs group-hover:bg-[#2F4325] group-hover:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
