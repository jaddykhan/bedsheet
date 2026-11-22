"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    // Support English & Roman Urdu synonyms
    const matched = PRODUCTS.filter((p) => {
      const name = p.name.toLowerCase();
      const urdu = (p.urduName || "").toLowerCase();
      const desc = p.description.toLowerCase();
      const cat = p.category.toLowerCase();
      const fab = p.fabric.toLowerCase();
      const badge = (p.badge || "").toLowerCase();

      // Synonym mapping
      const isChaddarSearch = (q.includes("chaddar") || q.includes("chadar") || q.includes("chadran")) && true;
      const isFloralSearch = (q.includes("phool") || q.includes("floral") || q.includes("flower")) && (name.includes("bloom") || name.includes("rose") || cat.includes("printed"));
      const isAjrakSearch = (q.includes("ajrak") || q.includes("sindhi") || q.includes("traditional")) && (name.includes("indigo") || cat.includes("luxury"));
      const isShadiSearch = (q.includes("shadi") || q.includes("shaadi") || q.includes("dulhan") || q.includes("bridal")) && cat.includes("bridal");

      return (
        name.includes(q) ||
        urdu.includes(q) ||
        desc.includes(q) ||
        cat.includes(q) ||
        fab.includes(q) ||
        badge.includes(q) ||
        isChaddarSearch ||
        isFloralSearch ||
        isAjrakSearch ||
        isShadiSearch
      );
    });

    setResults(matched);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F8F6F1] rounded-2xl shadow-2xl border border-[#E8DED0] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[#E8DED0] gap-3 bg-white">
          <Search className="w-5 h-5 text-[#6B7267]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bedsheets, prints, fabric (e.g. Cotton, Indigo, Ajrak, King, Gul...)"
            className="w-full bg-transparent text-base text-[#292D29] placeholder:text-[#6B7267] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#6B7267] hover:text-[#292D29]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#E8DED0] text-[#292D29] hover:bg-[#d8ccbc]"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7267] mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#B88B72]" /> Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Printed Bedsheets",
                "Pure Cotton",
                "Indigo Heritage",
                "King Size",
                "Meadow Bloom",
                "Bridal Set",
                "Plain Essentials",
                "Cambric",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#E8DED0]/60 hover:bg-[#2F4325] hover:text-white text-[#292D29] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
            {results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-white transition-all border border-transparent hover:border-[#E8DED0] group"
                >
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#E8DED0] shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#6B7267]">{product.category}</span>
                      {product.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF0EA] text-[#2F4325] font-semibold">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-[#292D29] truncate group-hover:text-[#2F4325]">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#6B7267] truncate">{product.fabric} • {product.sizes.join(", ")}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-[#2F4325]">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-[#6B7267] line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#6B7267] group-hover:text-[#2F4325] group-hover:translate-x-1 transition-all" />
                </Link>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-[#6B7267]">
                  No bedsheets found matching &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-[#6B7267] mt-1">
                  Try searching for &quot;Cotton&quot;, &quot;Printed&quot;, or &quot;Single&quot;
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
