"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, X, Check, Eye } from "lucide-react";
import { REAL_BEDROOMS } from "@/data/products";
import { useToast } from "@/components/ui/Toast";

export function RealBedrooms() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const { toast } = useToast();

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Thank you! Your setup photo has been submitted for our customer gallery review.");
    setSubmissionOpen(false);
    setCustomerName("");
    setCustomerCity("");
  };

  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267]">
                Our Happy Customers
              </span>
              <span className="w-8 h-[1px] bg-[#6B7267]/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#292D29] tracking-tight mt-1">
              Real Bedrooms, Real Customers
            </h2>
            <p className="text-sm text-[#6B7267] mt-1">
              See how our customers style our bedsheets in their homes across Pakistan.
            </p>
          </div>

          <button
            onClick={() => setSubmissionOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#292D29] bg-white text-[#292D29] text-xs sm:text-sm font-semibold hover:bg-[#2F4325] hover:text-white hover:border-[#2F4325] transition-all shadow-xs group shrink-0"
          >
            <Camera className="w-4 h-4 text-[#B88B72] group-hover:text-white transition-colors" />
            <span>Share Your Setup</span>
          </button>
        </div>

        {/* 4 Large Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {REAL_BEDROOMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item.image)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#E8DED0] cursor-pointer shadow-xs hover:shadow-lg transition-all border border-[#E8DED0]"
            >
              <Image
                src={item.image}
                alt={`${item.customer}'s bedroom in ${item.city}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 640px) 50vw, 25vw"
              />

              {/* Hover overlay with customer credit */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <span className="text-white text-xs font-bold">{item.customer}</span>
                <span className="text-[#E8DED0] text-[10px]">{item.city}</span>
                <span className="text-[#B88B72] text-[10px] font-medium mt-0.5">{item.product}</span>
              </div>

              {/* Quick eye icon on hover */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 text-[#292D29] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[4/3] w-full bg-[#1E2C18]">
              <Image
                src={lightboxImage}
                alt="Enlarged Customer Setup"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Share Your Setup Submission Modal */}
      {submissionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#F8F6F1] rounded-2xl p-6 border border-[#E8DED0] shadow-2xl">
            <button
              onClick={() => setSubmissionOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-[#6B7267] hover:text-[#292D29]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#292D29]">Share Your Setup</h3>
            <p className="text-xs text-[#6B7267] mt-1">
              Tag your bedroom photos with #LoomAndLiving or upload below to be featured on our website and win a Rs. 2,000 gift voucher.
            </p>

            <form onSubmit={handleShareSubmit} className="space-y-4 mt-5">
              <div>
                <label className="text-xs font-semibold text-[#292D29] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Fatima Tariq"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#292D29] block mb-1">City in Pakistan</label>
                <input
                  type="text"
                  required
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  placeholder="e.g. Lahore, Karachi, Islamabad..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#292D29] block mb-1">Upload Photo</label>
                <div className="border-2 border-dashed border-[#E8DED0] rounded-xl p-4 text-center bg-white cursor-pointer hover:border-[#2F4325]">
                  <Camera className="w-6 h-6 text-[#B88B72] mx-auto mb-1" />
                  <span className="text-xs font-medium text-[#292D29]">Click to choose bedsheet image</span>
                  <span className="text-[10px] text-[#6B7267] block">PNG, JPG up to 10MB</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2F4325] text-white text-xs font-semibold hover:bg-[#24351c] transition-colors"
              >
                Submit Setup for Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
