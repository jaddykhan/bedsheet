"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck, ChevronDown, MapPin } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#2F4325] text-[#F8F6F1] text-[11px] sm:text-xs h-10 flex items-center px-4 border-b border-[#24351c] tracking-wide select-none">
      <div className="container-custom flex items-center justify-between w-full">
        {/* Left / Center announcement items */}
        <div className="flex-1 flex items-center justify-center gap-3 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Truck className="w-3.5 h-3.5 text-[#E8DED0]" />
            <span className="font-medium text-white/95">Free Delivery Across Pakistan on Orders Above Rs. 3,000</span>
          </div>

          <span className="text-[#526453]/80">|</span>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <RotateCcw className="w-3.5 h-3.5 text-[#E8DED0]" />
            <span className="text-white/90">Easy Returns &amp; Exchanges (7 Days)</span>
          </div>

          <span className="hidden md:inline-block text-[#526453]/80">|</span>

          <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E8DED0]" />
            <span className="text-white/90">100% Original &amp; Premium Quality</span>
          </div>
        </div>

        {/* Currency selector */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs cursor-pointer hover:text-white transition-colors pl-4 border-l border-[#526453]/80 ml-4">
          <MapPin className="w-3.5 h-3.5 text-[#E8DED0]" />
          <span className="font-semibold text-white/95 tracking-wider">PKR</span>
          <ChevronDown className="w-3 h-3 text-[#E8DED0]" />
        </div>
      </div>
    </div>
  );
}
