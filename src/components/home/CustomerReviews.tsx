"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/data/products";

export function CustomerReviews() {
  const [startIndex, setStartIndex] = useState(0);

  const prevReview = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : REVIEWS.length - 1));
  };

  const nextReview = () => {
    setStartIndex((prev) => (prev < REVIEWS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        {/* Header with Score Overview */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267] block mb-1">
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
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-[#E8DED0] shadow-xs">
            <span className="font-serif text-2xl font-bold text-[#292D29]">4.8</span>
            <span className="text-sm text-[#6B7267]">/5</span>
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
            className="absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all shadow-md"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextReview}
            className="absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E8DED0] flex items-center justify-center text-[#292D29] hover:bg-[#2F4325] hover:text-white transition-all shadow-md"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 sm:px-6">
            {REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-5 border border-[#E8DED0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  {/* Real Bedroom Thumbnail */}
                  <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-[#E8DED0]">
                    <Image
                      src={review.productImage}
                      alt={review.productName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      {review.productName}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Feedback text */}
                  <p className="text-sm text-[#292D29] italic leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 pt-4 mt-2 border-t border-[#F8F6F1]">
                  <span className="text-xs font-bold text-[#292D29]">
                    — {review.author} ({review.city})
                  </span>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-[11px] text-green-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 fill-green-600 text-white" />
                      <span>Verified Buyer</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
