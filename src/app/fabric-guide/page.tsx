import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { FABRICS } from "@/data/products";
import { Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function FabricGuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-4xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F4325]">
              Mastery in Pakistani Textiles
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292D29] tracking-tight">
              The Loom & Living Fabric Guide
            </h1>
            <p className="text-sm text-[#6B7267] max-w-lg mx-auto">
              Learn how we select, weave and finish raw cotton into luxurious Pakistani bedsheets that stay soft wash after wash.
            </p>
          </div>

          {/* 4 Fabrics Detailed Cards */}
          <div className="space-y-8">
            {FABRICS.map((fab, idx) => (
              <div
                key={fab.name}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DED0] shadow-xs grid grid-cols-1 md:grid-cols-12 items-center"
              >
                <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:h-full bg-[#E8DED0]">
                  <Image src={fab.image} alt={fab.name} fill className="object-cover" />
                </div>
                <div className="md:col-span-7 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2F4325] bg-[#EBF0EA] px-3 py-1 rounded-full">
                      {fab.tagline}
                    </span>
                    <span className="text-xs font-semibold text-[#6B7267]">{fab.threadCounts}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292D29]">
                    {fab.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#6B7267] leading-relaxed">
                    {fab.description}
                  </p>

                  <div className="pt-2 border-t border-[#F8F6F1] text-xs">
                    <strong className="text-[#292D29]">Best For:</strong>{" "}
                    <span className="text-[#6B7267]">{fab.bestFor}</span>
                  </div>

                  <Link
                    href={`/collections?fabric=${encodeURIComponent(fab.name)}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#2F4325] hover:underline"
                  >
                    <span>Browse {fab.name} Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Thread Count Reality in Pakistan */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0] space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#292D29]">
              Understanding Thread Count (TC) in Pakistan
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7267] leading-relaxed">
              In Pakistan, many sellers market fake 800 or 1000 TC claims using multi-ply polyester yarns. At Loom & Living, we use true single-ply combed cotton yarns. A genuine 200–250 TC cotton sheet is substantially more breathable, durable, and luxurious than inflated synthetic numbers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
