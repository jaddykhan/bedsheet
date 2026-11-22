"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { formatPrice } from "@/lib/utils";
import { INITIAL_ORDERS, StoredOrder } from "@/lib/orderStorage";
import { Search, Truck, CheckCircle2, Clock, Package, MapPin, ArrowRight, MessageSquare } from "lucide-react";

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const q = query.trim().toUpperCase();
    const cleanPhone = query.replace(/[\s\-\(\)]/g, "");

    let allOrders: StoredOrder[] = [...INITIAL_ORDERS];
    try {
      const stored = JSON.parse(localStorage.getItem("loom_living_orders") || "[]");
      allOrders = [...stored, ...INITIAL_ORDERS];
    } catch {
      // ignore
    }

    const found = allOrders.find(
      (o) =>
        o.orderNumber.toUpperCase() === q ||
        o.trackingNumber?.toUpperCase() === q ||
        o.customerPhone.replace(/[\s\-\(\)]/g, "").includes(cleanPhone)
    );

    setOrder(found || null);
    setSearched(true);
  };

  const getStepStatus = (step: string, currentStatus: string) => {
    const sequence = ["PLACED", "PROCESSING", "DISPATCHED", "DELIVERED"];
    const currentIndex = sequence.indexOf(currentStatus);
    const stepIndex = sequence.indexOf(step);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="container-custom max-w-2xl">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6B7267]">
              Real-Time Tracking
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292D29] tracking-tight">
              Track Your Order
            </h1>
            <p className="text-sm text-[#6B7267] max-w-md mx-auto">
              Enter your Order Number (e.g. LL-PK-10491) or your mobile number to view live dispatch status across Pakistan.
            </p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mb-10">
            <div className="flex gap-2 bg-white p-2 rounded-2xl border border-[#E8DED0] shadow-md">
              <div className="flex items-center gap-3 px-3 flex-1">
                <Search className="w-5 h-5 text-[#6B7267]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Order ID (e.g. LL-PK-10491) or Phone (0300...)"
                  className="w-full text-xs sm:text-sm text-[#292D29] bg-transparent focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#2F4325] text-white text-xs sm:text-sm font-bold hover:bg-[#24351c] transition-colors shrink-0"
              >
                Track Order
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#6B7267] px-2 pt-2">
              <span>Try sample orders: LL-PK-10491 or LL-PK-10492</span>
            </div>
          </form>

          {/* Search Results */}
          {searched && order && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0] shadow-md space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8DED0]">
                <div>
                  <span className="text-xs text-[#6B7267]">Order Reference:</span>
                  <h2 className="font-serif text-2xl font-bold text-[#2F4325]">{order.orderNumber}</h2>
                </div>
                <div className="text-sm font-semibold text-[#292D29]">
                  Courier: <strong className="text-[#2F4325]">{order.courier}</strong> ({order.trackingNumber})
                </div>
              </div>

              {/* Step Progress Tracker */}
              <div className="py-4">
                <div className="grid grid-cols-4 gap-2 text-center relative">
                  {[
                    { label: "Order Placed", step: "PLACED" },
                    { label: "Processing", step: "PROCESSING" },
                    { label: "Dispatched", step: "DISPATCHED" },
                    { label: "Delivered", step: "DELIVERED" },
                  ].map((s) => {
                    const status = getStepStatus(s.step, order.fulfillmentStatus);
                    return (
                      <div key={s.step} className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all ${
                            status === "completed"
                              ? "bg-[#2F4325] text-white"
                              : status === "current"
                              ? "bg-[#2F4325] text-white ring-4 ring-[#EBF0EA]"
                              : "bg-[#F8F6F1] text-[#6B7267] border border-[#E8DED0]"
                          }`}
                        >
                          {status === "completed" ? "✓" : status === "current" ? "●" : "○"}
                        </div>
                        <span className="text-[11px] font-bold text-[#292D29] leading-tight">
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E8DED0] text-xs text-[#292D29] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#6B7267]">Recipient Name:</span>
                  <span className="font-semibold">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7267]">Destination City:</span>
                  <span className="font-semibold">{order.city}, {order.province}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7267]">Payment Mode:</span>
                  <span className="font-semibold">{order.paymentMethod} ({order.paymentStatus})</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#2F4325] pt-1">
                  <span>Order Total:</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-xs font-bold uppercase text-[#292D29] mb-3">Order Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-[#E8DED0] bg-white">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-[#E8DED0]">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <span className="text-xs font-medium text-[#292D29]">{item.title} ({item.size})</span>
                      </div>
                      <span className="text-xs font-bold text-[#2F4325]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp direct help for this order */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/923001234567?text=Assalam-o-Alaikum%2C%20I%20am%20tracking%20my%20order%20${order.orderNumber}.%20Can%20you%20share%20an%20update%3F`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-green-50 border border-[#25D366] text-[#128C7E] text-xs font-bold flex items-center justify-center gap-2 hover:bg-green-100 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                  <span>Ask support about this order on WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {searched && !order && (
            <div className="bg-white rounded-3xl p-8 border border-[#E8DED0] text-center space-y-3">
              <p className="text-sm font-bold text-[#292D29]">
                No order found matching &quot;{query}&quot;
              </p>
              <p className="text-xs text-[#6B7267] max-w-sm mx-auto">
                Please double-check your order number or phone number. If you just placed the order, give our system a few moments to sync.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
