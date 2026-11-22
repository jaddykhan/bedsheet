"use client";

import React from "react";
import { Sparkles, Truck, RotateCcw, ShieldCheck } from "lucide-react";

export function TrustBenefitsStrip() {
  const benefits = [
    {
      icon: Sparkles,
      title: "Premium Fabrics",
      description: "Soft, durable & comfortable",
    },
    {
      icon: Truck,
      title: "Nationwide Delivery",
      description: "All across Pakistan",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "7-day hassle-free returns",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "COD, JazzCash, Easypaisa & Cards",
    },
  ];

  return (
    <section className="w-full bg-[#F8F6F1] py-8 border-b border-[#E8DED0]/60">
      <div className="container-custom">
        <div className="bg-white/80 backdrop-blur-xs rounded-2xl border border-[#E8DED0] p-6 lg:py-7 lg:px-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className={`flex items-center gap-4 lg:px-6 ${
                    idx !== 0 ? "lg:border-l lg:border-[#E8DED0]" : ""
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F8F6F1] flex items-center justify-center text-[#2F4325] shrink-0 border border-[#E8DED0]/60">
                    <Icon className="w-6 h-6 stroke-[1.6]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#292D29] leading-tight">
                      {b.title}
                    </h3>
                    <p className="text-xs text-[#6B7267] mt-0.5">
                      {b.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
