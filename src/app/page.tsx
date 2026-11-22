import React from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";

// Homepage Sections
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBenefitsStrip } from "@/components/home/TrustBenefitsStrip";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { BestsellingBedsheets } from "@/components/home/BestsellingBedsheets";
import { BuildYourBedSet } from "@/components/home/BuildYourBedSet";
import { ShopByFabric } from "@/components/home/ShopByFabric";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { BedroomInspiration } from "@/components/home/BedroomInspiration";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { RealBedrooms } from "@/components/home/RealBedrooms";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { SizeGuideSection } from "@/components/home/SizeGuideSection";
import { CustomerSupportSection } from "@/components/home/CustomerSupportSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      {/* 1. ANNOUNCEMENT BAR + NAVBAR */}
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO CAROUSEL & BANNER */}
        <HeroSection />

        {/* 2. TRUST BENEFITS STRIP */}
        <TrustBenefitsStrip />

        {/* 3. SHOP BY CATEGORY */}
        <ShopByCategory />

        {/* 4. BESTSELLING BEDSHEETS */}
        <BestsellingBedsheets />

        {/* 5. INTERACTIVE BUILD YOUR BED SET */}
        <BuildYourBedSet />

        {/* 6. SHOP BY FABRIC */}
        <ShopByFabric />

        {/* 7. CUSTOMER REVIEWS */}
        <CustomerReviews />

        {/* 8. BEDROOM INSPIRATION */}
        <BedroomInspiration />

        {/* 9. WHY CHOOSE US */}
        <WhyChooseUs />

        {/* 10. REAL BEDROOMS, REAL CUSTOMERS */}
        <RealBedrooms />

        {/* 11. NEWSLETTER */}
        <NewsletterBanner />

        {/* 12. BEDSHEET SIZE GUIDE */}
        <SizeGuideSection />

        {/* 13. CUSTOMER SUPPORT & WHATSAPP */}
        <CustomerSupportSection />
      </main>

      {/* 14. FULL PREMIUM FOOTER */}
      <Footer />

      {/* GLOBAL CART DRAWER */}
      <CartDrawer />
    </div>
  );
}
