"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck, ChevronDown } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#2F4325] text-[#F8F6F1] text-xs py-2 px-4 border-b border-[#24351c] tracking-wide">
      <div className="container-custom flex items-center justify-between">
        {/* Left / Center announcement items */}
        <div className="flex-1 flex items-center justify-center lg:justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Truck className="w-3.5 h-3.5 text-[#B88B72]" />
            <span className="font-medium">Free Delivery across Pakistan on orders above Rs. 3,000</span>
          </div>

          <span className="hidden sm:inline-block text-[#526453]">|</span>

          <div className="hidden sm:flex items-center gap-2 whitespace-nowrap">
            <RotateCcw className="w-3.5 h-3.5 text-[#B88B72]" />
            <span>Easy Returns & Exchanges</span>
          </div>

          <span className="hidden md:inline-block text-[#526453]">|</span>

          <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B88B72]" />
            <span>100% Original & Premium Quality</span>
          </div>
        </div>

        {/* Currency selector */}
        <div className="hidden lg:flex items-center gap-1 text-xs cursor-pointer hover:text-white transition-colors pl-4">
          <span className="font-semibold text-[#E8DED0]">PKR</span>
          <ChevronDown className="w-3 h-3 text-[#B88B72]" />
        </div>
      </div>
    </div>
  );
}
