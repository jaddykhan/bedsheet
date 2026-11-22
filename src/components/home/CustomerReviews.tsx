"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/data/products";

export function CustomerReviews() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const prevReview = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(0, REVIEWS.length - itemsPerPage) : Math.max(0, prev - 1)
    );
  };

  const nextReview = () => {
    setStartIndex((prev) =>
      prev + itemsPerPage >= REVIEWS.length ? 0 : prev + 1
    );
  };

  const visibleReviews = REVIEWS.slice(startIndex, startIndex + itemsPerPage);

  // If near the end, wrap around to fill 3 cards
  if (visibleReviews.length < itemsPerPage) {
    visibleReviews.push(...REVIEWS.slice(0, itemsPerPage - visibleReviews.length));
  }

  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/70 overflow-hidden">
      <div className="container-custom">
        {/* Header with Score Overview */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#6B7267] block mb-1">
              Loved by Our Customers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#292D29] tracking-tight">
              Customer Reviews
            </h2>
            <p className="text-sm text-[#6B7267] mt-1">
              Real experience from our happy customers across Pakistan.
            </p>
          </div>

          {/* Aggregate Rating Pill */}
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-[#E8DED0] shadow-xs shrink-0">
            <span className="font-serif text-2xl font-bold text-[#292D29]">4.8</span>
            <span className="text-sm font-medium text-[#6B7267]">/5</span>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#6B7267] border-l border-[#E8DED0] pl-3">
              (12,400+ Reviews)
            </span>
          </div>
        </div>

        {/* Reviews Carousel Wrapper */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all shadow-md active:scale-95"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextReview}
            className="absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all shadow-md active:scale-95"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Review Cards Grid - Matching Reference Design (Horizontal Card with Thumbnail on Left) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-3 sm:px-6">
            {visibleReviews.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DED0] shadow-xs flex gap-4 items-center hover:shadow-md transition-all group"
              >
                {/* Real Bedroom Thumbnail */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-[#E8DED0] shrink-0 border border-[#E8DED0]/50">
                  <Image
                    src={review.productImage}
                    alt={review.productName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Review Content */}
                <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-0.5">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 text-amber-500 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    {/* Feedback quote */}
                    <p className="text-xs sm:text-[13px] text-[#292D29] leading-relaxed line-clamp-3">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  {/* Customer Name, City & Verified Indicator */}
                  <div className="flex items-center gap-1.5 mt-2.5 text-xs font-semibold text-[#292D29] whitespace-nowrap">
                    <span className="truncate">
                      — {review.author} ({review.city})
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(REVIEWS.length / itemsPerPage) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx * itemsPerPage)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(startIndex / itemsPerPage) === idx
                    ? "w-7 bg-[#2F4325]"
                    : "w-2 bg-[#D1C7BA] hover:bg-[#8F877C]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
