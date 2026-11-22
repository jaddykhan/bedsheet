"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export function BestsellingBedsheets() {
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Single" | "Double" | "King">("All");

  const filterOptions: ("All" | "Single" | "Double" | "King")[] = ["All", "Single", "Double", "King"];

  // Filter products based on selected size pill
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedFilter === "All") return true;
    return p.sizes.includes(selectedFilter);
  });

  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        {/* Section Header with Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267] block mb-1">
              Customer Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#292D29] tracking-tight">
              Bestselling Bedsheets
            </h2>
          </div>

          {/* Filter Pills and View All */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#E8DED0]/50 border border-[#E8DED0]">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedFilter(opt)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedFilter === opt
                      ? "bg-[#2F4325] text-white shadow-xs"
                      : "text-[#292D29] hover:text-[#2F4325] hover:bg-white/60"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#292D29] hover:text-[#2F4325] transition-colors ml-2 group"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
