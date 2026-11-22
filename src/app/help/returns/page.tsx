import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { RotateCcw, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-3xl bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DED0] space-y-6">
          <div className="space-y-2 border-b border-[#E8DED0] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F4325]">
              Customer Protection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292D29]">
              7-Day Returns & Exchanges Policy
            </h1>
            <p className="text-xs text-[#6B7267]">Last updated: November 2026</p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#6B7267] leading-relaxed">
            <h3 className="text-sm font-bold text-[#292D29]">1. Our 7-Day Guarantee</h3>
            <p>
              We want you to be 100% satisfied with your Loom & Living bedsheets. If you receive an item with any manufacturing defect, sizing discrepancy, or color mismatch, you may initiate an exchange or return within 7 calendar days of parcel delivery.
            </p>

            <h3 className="text-sm font-bold text-[#292D29]">2. Conditions for Return</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Item must be unwashed and unused in its original packaging.</li>
              <li>Tags and ribbon branding must remain intact.</li>
              <li>Please keep the courier delivery slip as proof of receipt.</li>
            </ul>

            <h3 className="text-sm font-bold text-[#292D29]">3. Exchange Process via WhatsApp</h3>
            <p>
              Simply message our WhatsApp support line at <strong>+92 (300) 123-4567</strong> with your Order ID and photo of the issue. Our team will arrange a reverse pickup with TCS or Leopards Courier.
            </p>

            <h3 className="text-sm font-bold text-[#292D29]">4. Refunds</h3>
            <p>
              Refunds for approved returns are transferred via JazzCash, Easypaisa, or direct bank transfer (IBFT) within 3-5 business days upon receiving the parcel back at our warehouse.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E8DED0] flex items-center justify-between">
            <span className="text-xs text-[#292D29] font-medium">Need help with an exchange?</span>
            <a
              href="https://wa.me/923001234567?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20request%20an%20exchange%20or%20return"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2F4325] text-white text-xs font-bold hover:bg-[#24351c]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Returns Desk</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
