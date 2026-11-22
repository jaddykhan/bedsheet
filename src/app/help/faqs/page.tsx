"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { ChevronDown, MessageSquare } from "lucide-react";

export default function FAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does Loom & Living offer Cash on Delivery (COD)?",
      a: "Yes! Cash on Delivery is available across all cities and towns of Pakistan. You pay in cash directly to the courier delivery rider upon receiving your package.",
    },
    {
      q: "What fabric thread counts do you use?",
      a: "We use genuine 200 TC to 250 TC for our combed cotton and cambric bedsheets, and 300 to 400 TC sateen weave for our luxury and bridal collections. We never use inflated synthetic thread count claims.",
    },
    {
      q: "Will the colors fade after washing in hard water?",
      a: "No. All Loom & Living prints use high-grade reactive dyes that chemically bond to the natural cotton cellulose. Colors stay rich and vibrant for over 50 wash cycles when following care instructions.",
    },
    {
      q: "What is included in a Single, Double, and King set?",
      a: "A Single set includes 1 Flat Bedsheet (60x90 in) and 1 matching Pillowcase (19x29 in). A Double set includes 1 Flat Sheet (90x95 in) and 2 Pillowcases. A King set includes 1 Flat Sheet (108x95 in) and 2 Pillowcases.",
    },
    {
      q: "How can I track my order once dispatched?",
      a: "You will receive a tracking code via SMS and email. You can also visit our Track Your Order page anytime and enter your order number (e.g. LL-PK-10491) or your mobile number.",
    },
    {
      q: "Can I customize the pieces in my bed set?",
      a: "Yes! Use our interactive 'Build Your Bed Set' feature on the homepage to select fabric, size, and pick any combination of bedsheet, pillowcases, and comforter.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F4325]">
              Got Questions?
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292D29]">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-[#6B7267]">
              Everything you need to know about our bedsheets, sizing, delivery, and payments.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0] shadow-xs space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#F8F6F1] last:border-b-0 pb-3">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between text-left py-2 font-serif text-lg font-bold text-[#292D29] hover:text-[#2F4325] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6B7267] transition-transform ${
                      openIdx === i ? "rotate-180 text-[#2F4325]" : ""
                    }`}
                  />
                </button>
                {openIdx === i && (
                  <p className="text-xs sm:text-sm text-[#6B7267] leading-relaxed pt-1 pb-2">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#EBF0EA] rounded-2xl p-6 text-center space-y-3 border border-[#d8e2d6]">
            <h3 className="font-serif text-lg font-bold text-[#292D29]">Still have questions?</h3>
            <p className="text-xs text-[#6B7267]">
              Our customer care team is available on WhatsApp 6 days a week to help you choose the best bedsheet.
            </p>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2F4325] text-white text-xs font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat with Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
