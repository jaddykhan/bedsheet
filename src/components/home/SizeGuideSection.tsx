"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bed, HelpCircle, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { SIZE_SPECIFICATIONS } from "@/data/products";

export function SizeGuideSection() {
  // Smart size finder states
  const [mattressWidth, setMattressWidth] = useState<number>(72);
  const [mattressLength, setMattressLength] = useState<number>(78);
  const [mattressDepth, setMattressDepth] = useState<number>(12);
  const [showFinder, setShowFinder] = useState(false);

  // Calculate recommendation
  const getRecommendation = () => {
    if (mattressWidth <= 42) {
      return {
        size: "Single",
        sheetSize: "60 × 90 in (Flat) / 42 × 78 in (Fitted)",
        fitNote: "Provides 9-12 inches of drop on each side for tucking under single mattresses.",
      };
    } else if (mattressWidth <= 60) {
      return {
        size: "Double",
        sheetSize: "90 × 95 in (Flat) / 66 × 78 in (Fitted)",
        fitNote: "Ideal for Pakistani queen/double beds, ensuring ample drape and coverage.",
      };
    } else if (mattressWidth <= 78) {
      return {
        size: "King",
        sheetSize: "108 × 95 in (Flat) / 72 × 78 in (Fitted)",
        fitNote: "Spacious master bedroom king fit with generous tucking even for thick 12-14 in mattresses.",
      };
    } else {
      return {
        size: "Super King",
        sheetSize: "108 × 102 in (Flat) / 78 × 84 in (Fitted)",
        fitNote: "Extra-wide imported luxury mattresses with 14-16 in depth.",
      };
    }
  };

  const rec = getRecommendation();

  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Heading & Size Cards */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267]">
                    Size Guide
                  </span>
                  <span className="w-8 h-[1px] bg-[#6B7267]/40" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#292D29] tracking-tight mt-1">
                  Find Your Perfect Fit
                </h2>
                <p className="text-sm text-[#6B7267] mt-1 max-w-md">
                  Not sure about the size? Check our verified Pakistani standard measurements or calculate your mattress match.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFinder(!showFinder)}
                  className="px-4 py-2 rounded-full border border-[#2F4325] text-xs font-semibold text-[#2F4325] hover:bg-[#2F4325] hover:text-white transition-colors"
                >
                  {showFinder ? "Hide Calculator" : "⚡ Smart Size Finder"}
                </button>
                <Link
                  href="/size-guide"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#2F4325] text-white text-xs sm:text-sm font-semibold hover:bg-[#24351c] transition-all shadow-md group shrink-0"
                >
                  <span>View Size Guide</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Smart Size Finder Interactive Tool */}
            {showFinder && (
              <div className="p-6 rounded-2xl bg-white border border-[#2F4325]/30 shadow-md space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-[#E8DED0] pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B88B72]" />
                    <h4 className="text-sm font-bold text-[#292D29]">Smart Mattress Compatibility Calculator</h4>
                  </div>
                  <span className="text-xs text-[#6B7267]">Units: Inches</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#6B7267] block mb-1">
                      Mattress Width: <strong className="text-[#292D29]">{mattressWidth}&quot;</strong>
                    </label>
                    <input
                      type="range"
                      min={36}
                      max={80}
                      step={2}
                      value={mattressWidth}
                      onChange={(e) => setMattressWidth(Number(e.target.value))}
                      className="w-full accent-[#2F4325]"
                    />
                    <div className="flex justify-between text-[10px] text-[#6B7267] mt-1">
                      <span>36&quot; (Single)</span>
                      <span>60&quot; (Double)</span>
                      <span>78&quot; (King)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6B7267] block mb-1">
                      Mattress Length: <strong className="text-[#292D29]">{mattressLength}&quot;</strong>
                    </label>
                    <input
                      type="range"
                      min={72}
                      max={84}
                      step={1}
                      value={mattressLength}
                      onChange={(e) => setMattressLength(Number(e.target.value))}
                      className="w-full accent-[#2F4325]"
                    />
                    <div className="flex justify-between text-[10px] text-[#6B7267] mt-1">
                      <span>72&quot; (Standard)</span>
                      <span>84&quot; (Extra Long)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6B7267] block mb-1">
                      Mattress Depth: <strong className="text-[#292D29]">{mattressDepth}&quot;</strong>
                    </label>
                    <input
                      type="range"
                      min={6}
                      max={16}
                      step={1}
                      value={mattressDepth}
                      onChange={(e) => setMattressDepth(Number(e.target.value))}
                      className="w-full accent-[#2F4325]"
                    />
                    <div className="flex justify-between text-[10px] text-[#6B7267] mt-1">
                      <span>6&quot; (Slim)</span>
                      <span>14&quot; (Pillow-top)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#EBF0EA] border border-[#d8e2d6] flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2F4325] shrink-0" />
                  <div className="text-xs text-[#292D29]">
                    <span>Recommended Size: </span>
                    <strong className="text-sm font-bold text-[#2F4325]">{rec.size} ({rec.sheetSize})</strong>
                    <span className="block text-[#6B7267] mt-0.5">{rec.fitNote}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Size Outline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SIZE_SPECIFICATIONS.slice(0, 3).map((spec) => (
                <div
                  key={spec.id}
                  className="bg-white rounded-2xl p-6 border border-[#E8DED0] shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center group hover:border-[#2F4325]/40"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] mb-4 border border-[#E8DED0]/70 group-hover:bg-[#EBF0EA] transition-colors">
                    <div className="relative">
                      <Bed className="w-7 h-7 stroke-[1.5]" />
                      {spec.name.includes("King") && (
                        <span className="absolute -top-1 -right-1 text-[9px] bg-[#2F4325] text-white px-1 rounded-full font-bold">
                          K
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#292D29]">
                    {spec.name}
                  </h3>

                  <span className="text-xs font-semibold text-[#2F4325] mt-1 bg-[#EBF0EA] px-2.5 py-1 rounded-full">
                    {spec.flatDimensions}
                  </span>

                  <span className="text-[11px] text-[#6B7267] mt-1">
                    Fitted: {spec.fittedDimensions}
                  </span>

                  <div className="pt-3 mt-3 border-t border-[#F8F6F1] w-full text-[11px] text-[#6B7267] space-y-0.5">
                    <p>{spec.includes}</p>
                    <p className="text-[10px]">Pillows: {spec.pillowSize}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Shortcut Links */}
          <div className="lg:col-span-4 space-y-3 pt-2 lg:pt-14">
            <Link
              href="/fabric-guide"
              className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#E8DED0] shadow-xs hover:border-[#2F4325] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] group-hover:bg-[#2F4325] group-hover:text-white transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#292D29]">Fabric Guide</h4>
                  <p className="text-xs text-[#6B7267]">Cotton, Cambric & Satin guide</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6B7267] group-hover:text-[#2F4325] group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/size-guide#care"
              className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#E8DED0] shadow-xs hover:border-[#2F4325] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] group-hover:bg-[#2F4325] group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#292D29]">Care Instructions</h4>
                  <p className="text-xs text-[#6B7267]">Washing, drying & softness tips</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6B7267] group-hover:text-[#2F4325] group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/help/faqs"
              className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#E8DED0] shadow-xs hover:border-[#2F4325] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] group-hover:bg-[#2F4325] group-hover:text-white transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#292D29]">Frequently Asked Questions</h4>
                  <p className="text-xs text-[#6B7267]">Returns, COD, and delivery queries</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6B7267] group-hover:text-[#2F4325] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
