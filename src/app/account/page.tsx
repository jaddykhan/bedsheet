"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { INITIAL_ORDERS, StoredOrder } from "@/lib/orderStorage";
import { formatPrice } from "@/lib/utils";
import { User, Package, MapPin, Heart, Truck, LogOut } from "lucide-react";

export default function AccountPage() {
  const [orders] = useState<StoredOrder[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("loom_living_orders") || "[]");
      return [...stored, ...INITIAL_ORDERS];
    } catch {
      return INITIAL_ORDERS;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-4xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DED0]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#EBF0EA] flex items-center justify-center text-[#2F4325] border border-[#d4ded2]">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#292D29]">
                  Welcome back, Ayesha
                </h1>
                <p className="text-xs text-[#6B7267]">ayesha.malik@example.com • +92 321 8765432</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/wishlist"
                className="px-4 py-2 rounded-xl bg-white border border-[#E8DED0] text-xs font-semibold text-[#292D29] hover:bg-[#F8F6F1]"
              >
                Wishlist
              </Link>
              <Link
                href="/track-order"
                className="px-4 py-2 rounded-xl bg-[#2F4325] text-white text-xs font-semibold hover:bg-[#24351c]"
              >
                Track Parcels
              </Link>
            </div>
          </div>

          {/* Orders History */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#292D29]">
              Recent Orders & Fulfillment
            </h2>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-[#E8DED0]">
                <p className="text-xs text-[#6B7267]">You haven&apos;t placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-2xl p-5 border border-[#E8DED0] shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F8F6F1] text-xs">
                      <div>
                        <span className="font-bold text-[#2F4325] text-sm">{ord.orderNumber}</span>
                        <span className="text-[#6B7267] ml-2">
                          Placed on {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#EBF0EA] text-[#2F4325] text-[11px]">
                          {ord.fulfillmentStatus}
                        </span>
                        <span className="font-bold text-[#292D29]">{formatPrice(ord.total)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-[#292D29]">
                            {it.title} ({it.size}) × {it.quantity}
                          </span>
                          <span className="font-semibold text-[#6B7267]">
                            {formatPrice(it.price * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-[#6B7267]">
                      <span>Delivering to: {ord.city}, {ord.province}</span>
                      <Link
                        href={`/order-confirmation/${ord.orderNumber}`}
                        className="text-[#2F4325] font-semibold hover:underline"
                      >
                        View Order Receipt &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
