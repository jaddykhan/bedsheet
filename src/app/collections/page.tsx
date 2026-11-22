"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS, CATEGORIES, FABRICS } from "@/data/products";
import { SlidersHorizontal, ChevronDown, X, Sparkles, Filter } from "lucide-react";

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFabric, setSelectedFabric] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedSheetType, setSelectedSheetType] = useState<string>("All");
  const [selectedPattern, setSelectedPattern] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedFabric !== "All") {
      result = result.filter((p) => p.fabric === selectedFabric);
    }
    if (selectedSize !== "All") {
      result = result.filter((p) => p.sizes.includes(selectedSize as any));
    }
    if (selectedSheetType !== "All") {
      result = result.filter((p) => p.sheetTypes.includes(selectedSheetType as any));
    }
    if (selectedPattern !== "All") {
      result = result.filter((p) => p.pattern === selectedPattern);
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedFabric, selectedSize, selectedSheetType, selectedPattern, sortBy]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedFabric !== "All" ||
    selectedSize !== "All" ||
    selectedSheetType !== "All" ||
    selectedPattern !== "All";

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedFabric("All");
    setSelectedSize("All");
    setSelectedSheetType("All");
    setSelectedPattern("All");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Collection Hero Header */}
        <div className="bg-[#E8DED0]/50 py-10 lg:py-14 border-b border-[#E8DED0]">
          <div className="container-custom">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267] block mb-1">
                Loom & Living Collections
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292D29] tracking-tight">
                {selectedCategory === "All" ? "All Premium Bedsheets & Bed Sets" : selectedCategory}
              </h1>
              <p className="text-sm text-[#6B7267] mt-2 leading-relaxed">
                Explore Pakistani combed cotton, 300 TC hotel satin stripe, and bridal trousseau sets. Filter by size, flat or fitted sheet type, and weave.
              </p>
            </div>
          </div>
        </div>

        <div className="container-custom pt-8">
          {/* Controls Bar: Mobile filter button, active filter tags, Sort dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DED0]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8DED0] text-xs font-semibold text-[#292D29]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#2F4325]" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-[#2F4325]" />
                )}
              </button>

              <span className="text-xs text-[#6B7267] font-medium">
                Showing <strong>{filteredProducts.length}</strong> items
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B7267] whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E8DED0] rounded-xl px-3 py-1.5 text-xs text-[#292D29] font-medium focus:outline-none focus:border-[#2F4325]"
              >
                <option value="featured">Featured Favorites</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <span className="text-xs text-[#6B7267]">Active:</span>
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2F4325] text-white">
                  <span>{selectedCategory}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
                </span>
              )}
              {selectedSize !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2F4325] text-white">
                  <span>Size: {selectedSize}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSize("All")} />
                </span>
              )}
              {selectedSheetType !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2F4325] text-white">
                  <span>Type: {selectedSheetType}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSheetType("All")} />
                </span>
              )}
              {selectedPattern !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2F4325] text-white">
                  <span>Pattern: {selectedPattern}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPattern("All")} />
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-[#B88B72] hover:underline font-semibold ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Content Layout: Desktop Sidebar + Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Desktop Filters Sidebar (The Linen Co & Bedsheet.com.pk Style) */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6">
              {/* Bed Size Filter */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DED0]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#292D29] mb-3">
                  Bed Size
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {["All", "Single", "Double", "King", "Super King"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                        selectedSize === size
                          ? "bg-[#2F4325] text-white border-[#2F4325]"
                          : "bg-white text-[#292D29] border-[#E8DED0] hover:border-[#2F4325]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sheet Type (Flat vs Fitted) */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DED0]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#292D29] mb-3">
                  Sheet Type
                </h3>
                <div className="space-y-1.5">
                  {["All", "Flat Sheet Set", "Fitted Sheet Set", "Complete Bed-in-Bag"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedSheetType(type)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedSheetType === type ? "bg-[#2F4325] text-white" : "text-[#292D29] hover:bg-[#F8F6F1]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DED0]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#292D29] mb-3">
                  Collection Category
                </h3>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === "All"
                        ? "bg-[#2F4325] text-white"
                        : "text-[#292D29] hover:bg-[#F8F6F1]"
                    }`}
                  >
                    All Collections
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.title}
                      onClick={() => setSelectedCategory(cat.title)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedCategory === cat.title
                          ? "bg-[#2F4325] text-white"
                          : "text-[#292D29] hover:bg-[#F8F6F1]"
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pattern Filter */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DED0]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#292D29] mb-3">
                  Design Pattern
                </h3>
                <div className="space-y-1.5">
                  {["All", "Floral", "Stripes", "Traditional Ajrak", "Plain Dyed", "Embroidered Damask"].map((pat) => (
                    <button
                      key={pat}
                      onClick={() => setSelectedPattern(pat)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedPattern === pat ? "bg-[#2F4325] text-white" : "text-[#292D29] hover:bg-[#F8F6F1]"
                      }`}
                    >
                      {pat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Product Grid Area */}
            <div className="lg:col-span-9">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DED0] space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#F8F6F1] flex items-center justify-center text-[#6B7267]">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#292D29]">
                    No matching bedsheets found
                  </h3>
                  <p className="text-xs text-[#6B7267] max-w-sm mx-auto">
                    Try adjusting or clearing your filters to see more of our Pakistani home textile range.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2.5 rounded-full bg-[#2F4325] text-white text-xs font-semibold"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-[#F8F6F1] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DED0]">
                <h3 className="font-serif text-lg font-bold text-[#292D29]">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-md text-[#6B7267]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 pt-4">
                {/* Size */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#292D29] mb-2">Size</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["All", "Single", "Double", "King", "Super King"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border ${
                          selectedSize === s ? "bg-[#2F4325] text-white border-[#2F4325]" : "bg-white text-[#292D29]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sheet Type */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#292D29] mb-2">Sheet Type</h4>
                  <div className="space-y-1">
                    {["All", "Flat Sheet Set", "Fitted Sheet Set", "Complete Bed-in-Bag"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSheetType(type)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                          selectedSheetType === type ? "bg-[#2F4325] text-white" : "text-[#292D29]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#292D29] mb-2">Category</h4>
                  <div className="space-y-1">
                    {["All", ...CATEGORIES.map((c) => c.title)].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                          selectedCategory === cat ? "bg-[#2F4325] text-white" : "text-[#292D29]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DED0] flex gap-2">
              <button
                onClick={clearFilters}
                className="flex-1 py-2.5 rounded-xl border border-[#E8DED0] text-xs font-semibold text-[#292D29]"
              >
                Clear
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#2F4325] text-white text-xs font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <CartDrawer />
    </div>
  );
}
