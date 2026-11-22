"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ArrowRight, Bed, Sparkles, CheckSquare, Square } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function BuildYourBedSet() {
  const [selectedFabric, setSelectedFabric] = useState<"Pure Cotton" | "Polycotton" | "Satin">("Pure Cotton");
  const [selectedSize, setSelectedSize] = useState<"Single" | "Double" | "King">("Double");
  const [includeBedsheet, setIncludeBedsheet] = useState(true);
  const [includePillows, setIncludePillows] = useState(true);
  const [includeComforter, setIncludeComforter] = useState(false);

  const { addToCart } = useCart();

  // Supported inventory combinations & dynamic pricing
  const fabricData = {
    "Pure Cotton": {
      name: "Pure Cotton",
      image: "/images/fabrics/pure-cotton.jpg",
      previewBed: "/images/hero/hero-bedroom.jpg",
      basePrice: 2200, // Bedsheet
      pillowPrice: 600, // 2 Pillows
      comforterPrice: 2800, // Comforter
      productTitle: "Custom Meadow Cotton Bed Set",
      slug: "meadow-bloom-bedsheet-set",
    },
    "Polycotton": {
      name: "Polycotton",
      image: "/images/fabrics/polycotton.jpg",
      previewBed: "/images/categories/plain-essentials.jpg",
      basePrice: 1800,
      pillowPrice: 500,
      comforterPrice: 2200,
      productTitle: "Custom Sage Polycotton Bed Set",
      slug: "olive-grove-plain-essentials",
    },
    "Satin": {
      name: "Satin",
      image: "/images/fabrics/satin.jpg",
      previewBed: "/images/products/indigo-heritage.jpg",
      basePrice: 2900,
      pillowPrice: 900,
      comforterPrice: 3800,
      productTitle: "Custom Royal Satin Bed Set",
      slug: "royal-damask-bridal-collection",
    },
  };

  const sizeMultiplier = {
    Single: 0.85,
    Double: 1.0,
    King: 1.2,
  };

  const currentFab = fabricData[selectedFabric];
  const mult = sizeMultiplier[selectedSize];

  // Calculate dynamic bundle price
  let calculatedPrice = 0;
  const piecesSummary: string[] = [];

  if (includeBedsheet) {
    calculatedPrice += Math.round(currentFab.basePrice * mult);
    piecesSummary.push("Bedsheet (1)");
  }
  if (includePillows) {
    calculatedPrice += Math.round(currentFab.pillowPrice * (selectedSize === "Single" ? 0.6 : 1.0));
    piecesSummary.push(selectedSize === "Single" ? "Pillow Cover (1)" : "Pillow Covers (2)");
  }
  if (includeComforter) {
    calculatedPrice += Math.round(currentFab.comforterPrice * mult);
    piecesSummary.push("Quilted Comforter (1)");
  }

  // Prevent 0 pieces
  const canAddToCart = includeBedsheet || includePillows || includeComforter;

  const handleCreateSet = () => {
    if (!canAddToCart) return;

    addToCart({
      productId: `custom-bundle-${selectedFabric.toLowerCase().replace(" ", "-")}`,
      slug: currentFab.slug,
      title: `${currentFab.productTitle} (${piecesSummary.join(" + ")})`,
      price: calculatedPrice,
      comparePrice: Math.round(calculatedPrice * 1.2),
      image: currentFab.previewBed,
      size: selectedSize,
      fabric: selectedFabric,
      quantity: 1,
      pieces: piecesSummary,
    });
  };

  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E8DED0] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content & Bed Visual */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267]">
                    Customize Your Bed
                  </span>
                  <span className="w-8 h-[1px] bg-[#6B7267]/40" />
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-medium text-[#292D29] leading-tight">
                  Build Your Bed Set
                </h2>

                <p className="text-sm sm:text-base text-[#6B7267] max-w-lg leading-relaxed">
                  Mix & match bedsheet, pillow covers and comforter in your favorite prints and sizes. Read directly from live inventory combinations.
                </p>
              </div>

              {/* Dynamic Bed Photo Preview */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#E8DED0] mt-6 shadow-inner border border-[#E8DED0]">
                <Image
                  src={currentFab.previewBed}
                  alt="Customized Bed Preview"
                  fill
                  className="object-cover transition-all duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-[#2F4325] shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B88B72]" />
                  <span>Preview: {selectedFabric} • {selectedSize}</span>
                </div>
              </div>

              {/* Action Button & Bundle Price on Desktop */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-[#E8DED0]">
                <div>
                  <span className="text-xs text-[#6B7267] block">Configured Bundle Total:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#2F4325]">
                      {formatPrice(calculatedPrice)}
                    </span>
                    <span className="text-xs text-[#6B7267] line-through">
                      {formatPrice(Math.round(calculatedPrice * 1.2))}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCreateSet}
                  disabled={!canAddToCart}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#2F4325] text-white text-sm font-semibold hover:bg-[#24351c] transition-all disabled:opacity-50 shadow-md group"
                >
                  <span>Create Your Set</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Interactive Selection Panel */}
            <div className="lg:col-span-5 bg-[#F8F6F1] p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-[#E8DED0] space-y-6">
              {/* Step 1: Choose Fabric */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292D29] block mb-2.5">
                  1. Choose Fabric
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(["Pure Cotton", "Polycotton", "Satin"] as const).map((fab) => {
                    const isSelected = selectedFabric === fab;
                    return (
                      <button
                        key={fab}
                        onClick={() => setSelectedFabric(fab)}
                        className={`relative rounded-xl p-2 text-center transition-all border flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? "bg-white border-[#2F4325] shadow-xs"
                            : "bg-white/70 border-[#E8DED0] hover:border-[#2F4325]/50"
                        }`}
                      >
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#E8DED0]">
                          <Image
                            src={fabricData[fab].image}
                            alt={fab}
                            fill
                            className="object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2F4325] text-white flex items-center justify-center shadow-xs">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-semibold text-[#292D29]">
                          {fab}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Choose Size */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292D29] block mb-2.5">
                  2. Choose Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Single", "Double", "King"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 rounded-full text-xs font-semibold transition-all border ${
                        selectedSize === size
                          ? "bg-[#2F4325] text-white border-[#2F4325] shadow-xs"
                          : "bg-white text-[#292D29] border-[#E8DED0] hover:border-[#2F4325]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Choose Pieces */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#292D29] block mb-2.5">
                  3. Choose Pieces
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {/* Bedsheet */}
                  <button
                    onClick={() => setIncludeBedsheet(!includeBedsheet)}
                    className={`p-3 rounded-xl border flex flex-col items-center text-center justify-between transition-all bg-white ${
                      includeBedsheet
                        ? "border-[#2F4325] ring-1 ring-[#2F4325]"
                        : "border-[#E8DED0] opacity-60"
                    }`}
                  >
                    <div className="w-full flex justify-end">
                      {includeBedsheet ? (
                        <Check className="w-3.5 h-3.5 text-[#2F4325]" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-[#6B7267]" />
                      )}
                    </div>
                    <Bed className="w-6 h-6 text-[#2F4325] my-1" />
                    <div>
                      <span className="text-xs font-bold text-[#292D29] block">Bedsheet</span>
                      <span className="text-[10px] text-[#6B7267]">(1)</span>
                    </div>
                  </button>

                  {/* Pillow Covers */}
                  <button
                    onClick={() => setIncludePillows(!includePillows)}
                    className={`p-3 rounded-xl border flex flex-col items-center text-center justify-between transition-all bg-white ${
                      includePillows
                        ? "border-[#2F4325] ring-1 ring-[#2F4325]"
                        : "border-[#E8DED0] opacity-60"
                    }`}
                  >
                    <div className="w-full flex justify-end">
                      {includePillows ? (
                        <Check className="w-3.5 h-3.5 text-[#2F4325]" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-[#6B7267]" />
                      )}
                    </div>
                    <div className="w-6 h-6 border-2 border-[#2F4325] rounded-md my-1 flex items-center justify-center text-[10px] font-bold text-[#2F4325]">
                      枕
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#292D29] block">Pillow Covers</span>
                      <span className="text-[10px] text-[#6B7267]">
                        ({selectedSize === "Single" ? "1" : "2"})
                      </span>
                    </div>
                  </button>

                  {/* Comforter */}
                  <button
                    onClick={() => setIncludeComforter(!includeComforter)}
                    className={`p-3 rounded-xl border flex flex-col items-center text-center justify-between transition-all bg-white ${
                      includeComforter
                        ? "border-[#2F4325] ring-1 ring-[#2F4325]"
                        : "border-[#E8DED0] opacity-60"
                    }`}
                  >
                    <div className="w-full flex justify-end">
                      {includeComforter ? (
                        <Check className="w-3.5 h-3.5 text-[#2F4325]" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-[#6B7267]" />
                      )}
                    </div>
                    <div className="w-6 h-6 border-2 border-dashed border-[#2F4325] rounded my-1 flex items-center justify-center text-[9px] font-bold text-[#2F4325]">
                      퀼트
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#292D29] block">Comforter</span>
                      <span className="text-[10px] text-[#6B7267]">(1)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Supported Inventory Notice */}
              <div className="p-3 bg-white rounded-xl border border-[#E8DED0] text-[11px] text-[#6B7267] space-y-1">
                <p className="font-semibold text-[#292D29]">Included in this configuration:</p>
                <p>• {piecesSummary.length > 0 ? piecesSummary.join(", ") : "No items selected"}</p>
                <p className="text-[#2F4325] font-medium">✓ In stock and ready to ship within 24-48 hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
