import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-3xl bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DED0] space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292D29] border-b border-[#E8DED0] pb-4">
            Privacy Policy
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-[#6B7267] leading-relaxed">
            <h3 className="text-sm font-bold text-[#292D29]">1. Information We Collect</h3>
            <p>
              When you make a purchase or browse Loom & Living, we collect necessary contact information (name, delivery address, Pakistani phone number, and email) solely to process your orders and provide delivery updates.
            </p>

            <h3 className="text-sm font-bold text-[#292D29]">2. Use of Mobile Numbers</h3>
            <p>
              Your phone number is shared only with our logistics couriers (TCS, Leopards) so riders can coordinate doorstep parcel delivery in your city. We never sell or share customer data for third-party advertising.
            </p>

            <h3 className="text-sm font-bold text-[#292D29]">3. Payment Security</h3>
            <p>
              All card transactions are processed through encrypted, certified Pakistani payment gateway providers. Loom & Living never stores your credit card number or CVV on our servers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
