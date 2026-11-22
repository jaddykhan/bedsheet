import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-3xl bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DED0] space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292D29] border-b border-[#E8DED0] pb-4">
            Terms & Conditions
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-[#6B7267] leading-relaxed">
            <h3 className="text-sm font-bold text-[#292D29]">1. Agreement to Terms</h3>
            <p>
              By accessing or purchasing from Loom & Living (Pakistan Home Textiles), you agree to be bound by these Terms of Service and our transparent 7-day exchange and delivery policies.
            </p>

            <h3 className="text-sm font-bold text-[#292D29]">2. Pricing & Currency</h3>
            <p>
              All prices displayed across the platform are in Pakistani Rupees (PKR) and include standard textile taxes. We reserve the right to correct any typographical pricing errors prior to shipment fulfillment.
            </p>

            <h3 className="text-sm font-bold text-[#292D29]">3. Fabric Specifications & Tolerances</h3>
            <p>
              Due to natural cotton yarn characteristics, dimensions may vary up to &plusmn;1-2 inches after cutting. Fabric colors viewed on mobile/desktop screens may have slight hue variations depending on your display warmth.
            </p>

            <h3 className="text-sm font-bold text-[#292D29]">4. Governing Law</h3>
            <p>
              These terms are governed in accordance with the commercial and consumer protection laws of the Islamic Republic of Pakistan.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
