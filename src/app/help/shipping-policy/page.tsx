import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Truck, ShieldCheck, MapPin } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-3xl bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DED0] space-y-6">
          <div className="space-y-2 border-b border-[#E8DED0] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F4325]">
              Nationwide Delivery
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292D29]">
              Shipping Policy & Courier Timelines
            </h1>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#6B7267] leading-relaxed">
            <h3 className="text-sm font-bold text-[#292D29]">1. Free Shipping Threshold</h3>
            <p>
              We offer <strong>Free Delivery across all of Pakistan</strong> on all orders totaling <strong>Rs. 3,000 or more</strong>. For orders below Rs. 3,000, a flat shipping charge of Rs. 250 is applied at checkout.
            </p>

            <h3 className="text-sm font-bold text-[#292D29]">2. Delivery Timelines</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Major Metros (Lahore, Karachi, Islamabad, Rawalpindi):</strong> 2 to 3 business days.</li>
              <li><strong>Secondary Cities (Faisalabad, Multan, Sialkot, Peshawar, Gujranwala):</strong> 3 to 4 business days.</li>
              <li><strong>Remote Districts & Interior Sindh/Balochistan/KPK/AJK:</strong> 4 to 6 business days.</li>
            </ul>

            <h3 className="text-sm font-bold text-[#292D29]">3. Logistics Partners</h3>
            <p>
              Parcels are dispatched with tracking through Pakistan&apos;s leading logistics providers: TCS Express, Leopards Courier, Trax, and Call Courier.
            </p>

            <h3 className="text-sm font-bold text-[#292D29]">4. Cash on Delivery (COD)</h3>
            <p>
              Cash on Delivery orders are verified via automated SMS or WhatsApp confirmation prior to dispatch to ensure swift, prompt delivery.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
