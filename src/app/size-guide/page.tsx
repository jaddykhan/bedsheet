"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SIZE_SPECIFICATIONS } from "@/data/products";
import { Bed, Sparkles, CheckCircle2, ArrowRight, Info, ShieldCheck, Check } from "lucide-react";

export default function SizeGuidePage() {
  const [mattressWidth, setMattressWidth] = useState(72);
  const [mattressDepth, setMattressDepth] = useState(12);

  const getRecommendation = () => {
    if (mattressWidth <= 42) {
      return {
        size: "Single",
        flat: "60 × 90 in (152 × 228 cm)",
        fitted: "42 × 78 + 14 in (107 × 198 + 35 cm)",
        pillows: "1 Pillowcase (19 × 29 in + 8 in flap)",
        advice: "Fits single bed mattresses up to 42 inches wide with ample tuck-in on both sides.",
      };
    } else if (mattressWidth <= 60) {
      return {
        size: "Double / Queen",
        flat: "90 × 95 in (228 × 241 cm)",
        fitted: "66 × 78 + 14 in (168 × 198 + 35 cm)",
        pillows: "2 Pillowcases (19 × 29 in + 8 in flap)",
        advice: "Recommended for standard Pakistani 5-foot (60-inch) queen beds and double mattresses.",
      };
    } else if (mattressWidth <= 78) {
      return {
        size: "King",
        flat: "108 × 95 in (274 × 241 cm)",
        fitted: "72 × 78 + 14 in (183 × 198 + 35 cm)",
        pillows: "2 Pillowcases (19 × 29 in + 8 in flap)",
        advice: "Generous 108-inch width designed specifically for Master King mattresses up to 78 inches wide.",
      };
    } else {
      return {
        size: "Super King / Oversized",
        flat: "108 × 102 in (274 × 259 cm)",
        fitted: "78 × 84 + 16 in (198 × 213 + 40 cm)",
        pillows: "2 Oxford Pillowcases (19 × 29 in + 2 in border)",
        advice: "For extra-wide imported spring beds with 14–16 inch mattress depth.",
      };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-4xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F4325]">
              Pakistani Bed Sizing Architecture
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292D29] tracking-tight">
              Bedsheet & Mattress Size Guide
            </h1>
            <p className="text-sm text-[#6B7267] max-w-xl mx-auto leading-relaxed">
              Standard Pakistani sizes calibrated against The Linen Company and leading mattress makers (Master MoltyFoam, Diamond Supreme Foam, Dura Foam).
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0] shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-[#E8DED0] pb-4">
              <Sparkles className="w-5 h-5 text-[#B88B72]" />
              <h2 className="font-serif text-2xl font-bold text-[#292D29]">
                Interactive Mattress Compatibility Calculator
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-[#292D29] block mb-2">
                  Mattress Width: <strong className="text-[#2F4325] text-sm">{mattressWidth} inches</strong>
                </label>
                <input
                  type="range"
                  min={36}
                  max={82}
                  step={2}
                  value={mattressWidth}
                  onChange={(e) => setMattressWidth(Number(e.target.value))}
                  className="w-full accent-[#2F4325]"
                />
                <div className="flex justify-between text-[11px] text-[#6B7267] mt-1">
                  <span>36&quot; (Single)</span>
                  <span>60&quot; (Double)</span>
                  <span>72-78&quot; (King)</span>
                  <span>80&quot;+ (Super King)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#292D29] block mb-2">
                  Mattress Height / Thickness: <strong className="text-[#2F4325] text-sm">{mattressDepth} inches</strong>
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
                <div className="flex justify-between text-[11px] text-[#6B7267] mt-1">
                  <span>6&quot; (Basic Foam)</span>
                  <span>10-12&quot; (Standard Pillowtop)</span>
                  <span>14-16&quot; (Extra Thick Spring)</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#EBF0EA] border border-[#d8e2d6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#2F4325] shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#6B7267] block">Recommended Size:</span>
                  <span className="font-serif text-2xl font-bold text-[#2F4325] block">{rec.size}</span>
                  <p className="text-xs text-[#292D29] mt-0.5">
                    <strong>Flat:</strong> {rec.flat} • <strong>Fitted:</strong> {rec.fitted}
                  </p>
                  <p className="text-[11px] text-[#6B7267] mt-0.5">{rec.advice}</p>
                </div>
              </div>

              <Link
                href="/collections"
                className="px-5 py-2.5 rounded-full bg-[#2F4325] text-white text-xs font-bold hover:bg-[#24351c] transition-colors whitespace-nowrap shrink-0"
              >
                Shop {rec.size} Sets &rarr;
              </Link>
            </div>
          </div>

          {/* Sizing Comparison Chart (Flat Sheet vs Fitted Sheet) */}
          <div className="bg-white rounded-3xl border border-[#E8DED0] overflow-hidden shadow-xs">
            <div className="p-6 border-b border-[#E8DED0]">
              <h3 className="font-serif text-xl font-bold text-[#292D29]">
                Flat Sheet vs Fitted Sheet Sizing Specifications
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F6F1] text-[#6B7267] uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-4">Size Name</th>
                    <th className="p-4">Flat Sheet</th>
                    <th className="p-4">Fitted Sheet (All-Around Elastic)</th>
                    <th className="p-4">Mattress Fit</th>
                    <th className="p-4">Included Pillowcases</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DED0] text-[#292D29]">
                  {SIZE_SPECIFICATIONS.map((s) => (
                    <tr key={s.id} className="hover:bg-[#F8F6F1]/50">
                      <td className="p-4 font-bold text-[#2F4325]">{s.name}</td>
                      <td className="p-4 font-semibold">{s.flatDimensions}</td>
                      <td className="p-4">{s.fittedDimensions}</td>
                      <td className="p-4 text-[#6B7267]">{s.mattressWidth}</td>
                      <td className="p-4">{s.includes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sizing Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E8DED0] space-y-2">
              <h4 className="font-serif text-lg font-bold text-[#292D29]">What is a Fitted Sheet?</h4>
              <p className="text-xs text-[#6B7267] leading-relaxed">
                A fitted sheet has stitched elastic around all 4 corners that securely hugs your mattress. Unlike flat sheets that need to be tucked in each morning, a fitted sheet stays tight, wrinkle-free, and in place even if you toss and turn.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8DED0] space-y-2">
              <h4 className="font-serif text-lg font-bold text-[#292D29]">Pillowcase Flap Construction</h4>
              <p className="text-xs text-[#6B7267] leading-relaxed">
                All Loom & Living pillowcases feature an oversized <strong>8-inch inner envelope flap</strong>. This ensures your white pillow insert remains 100% hidden inside, delivering a sleek hotel look on your bed.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
