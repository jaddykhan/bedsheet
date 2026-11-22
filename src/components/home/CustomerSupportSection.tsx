"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, PhoneCall, Truck, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export function CustomerSupportSection() {
  const WHATSAPP_NUMBER = "923001234567";
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Assalam-o-Alaikum%20Loom%20%26%20Living%2C%20I%20need%20assistance%20with%20my%20bedsheet%20order`;

  return (
    <section className="w-full bg-[#F8F6F1] py-14 lg:py-20 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        <div className="rounded-3xl bg-white border border-[#E8DED0] shadow-sm p-6 sm:p-10 lg:p-12 overflow-hidden relative">
          {/* Subtle floral watermark bg */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-96 h-96 fill-[#2F4325]">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#2F4325]">
                  Live WhatsApp Assistance • Online Now
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#292D29] tracking-tight">
                Need Help Choosing the Right Bedsheet?
              </h2>

              <p className="text-sm sm:text-base text-[#6B7267] max-w-lg leading-relaxed">
                Our Pakistani textile specialists are ready on WhatsApp to assist with size compatibility, fabric drape, custom sizing, and order tracking.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] text-white text-sm font-bold hover:bg-[#20ba59] transition-all shadow-md group"
                >
                  <MessageSquare className="w-5 h-5 fill-white text-white" />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <Link
                  href="/track-order"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#292D29] text-[#292D29] text-sm font-semibold hover:bg-[#F8F6F1] transition-colors"
                >
                  <Truck className="w-4 h-4 text-[#2F4325]" />
                  <span>Track Your Order</span>
                </Link>
              </div>
            </div>

            {/* Right Support Badges Card */}
            <div className="lg:col-span-5 bg-[#F8F6F1] rounded-2xl p-6 border border-[#E8DED0] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2F4325] shadow-xs">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#6B7267] block">Helpline & WhatsApp:</span>
                  <span className="text-sm font-bold text-[#292D29]">+92 (300) 123-4567</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2F4325] shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#6B7267] block">Operating Hours:</span>
                  <span className="text-sm font-medium text-[#292D29]">Monday – Saturday, 9:00 AM – 9:00 PM PKT</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2F4325] shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#B88B72]" />
                </div>
                <div>
                  <span className="text-xs text-[#6B7267] block">Assurance:</span>
                  <span className="text-sm font-medium text-[#292D29]">7-Day Hassle-Free Exchange Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
