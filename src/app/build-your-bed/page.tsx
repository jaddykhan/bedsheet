import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { BuildYourBedSet } from "@/components/home/BuildYourBedSet";
import { SizeGuideSection } from "@/components/home/SizeGuideSection";

export default function BuildYourBedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <div className="bg-[#E8DED0]/50 py-10 border-b border-[#E8DED0]">
          <div className="container-custom max-w-4xl text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F4325]">
              Interactive Customization
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292D29]">
              Custom Bed Set Builder
            </h1>
            <p className="text-sm text-[#6B7267] max-w-lg mx-auto">
              Design your personalized Pakistani bed setup by combining your favorite fabric, matching bedsheet size, and exact pillowcase and comforter pieces.
            </p>
          </div>
        </div>

        <BuildYourBedSet />
        <SizeGuideSection />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
