"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { formatPrice } from "@/lib/utils";
import { CheckCircle2, Truck, Package, MessageSquare, ArrowRight, Printer } from "lucide-react";
import { StoredOrder, INITIAL_ORDERS } from "@/lib/orderStorage";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const localOrders = JSON.parse(localStorage.getItem("loom_living_orders") || "[]");
      const found = localOrders.find((o: StoredOrder) => o.orderNumber === orderId) ||
        INITIAL_ORDERS.find((o) => o.orderNumber === orderId);

      if (found) {
        setOrder(found);
      } else {
        // Fallback demo order representation
        setOrder({
          id: orderId,
          orderNumber: orderId,
          customerName: "Valued Customer",
          customerEmail: "customer@example.com",
          customerPhone: "03001234567",
          province: "Punjab",
          city: "Lahore",
          address: "House 12, Street 4",
          paymentMethod: "COD",
          paymentStatus: "PENDING",
          fulfillmentStatus: "PLACED",
          subtotal: 3290,
          shippingFee: 0,
          discount: 0,
          total: 3290,
          courier: "TCS Express",
          trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
          createdAt: new Date().toISOString(),
          items: [
            {
              productId: "prod-1",
              title: "Meadow Bloom Bedsheet Set",
              image: "/images/products/meadow-bloom.jpg",
              size: "Double",
              fabric: "Pure Cotton",
              quantity: 1,
              price: 3290,
            },
          ],
        });
      }
    } catch {
      // ignore
    }
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-custom max-w-3xl">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DED0] shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EBF0EA] flex items-center justify-center text-[#2F4325] mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#2F4325] bg-[#EBF0EA] px-3 py-1 rounded-full">
              Order Confirmed & Received
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292D29]">
              Shukriya for Shopping with Loom & Living!
            </h1>

            <p className="text-sm text-[#6B7267] max-w-lg mx-auto">
              Your order has been received and our textile fulfillment team in Faisalabad is preparing your package. A confirmation message has been logged.
            </p>

            <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E8DED0] max-w-sm mx-auto flex items-center justify-between text-xs">
              <span className="text-[#6B7267]">Your Order Number:</span>
              <strong className="text-sm font-bold text-[#2F4325]">{order?.orderNumber || orderId}</strong>
            </div>

            {/* Tracking & Timeline */}
            <div className="pt-6 border-t border-[#E8DED0] text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#292D29] mb-4">
                Estimated Delivery Timeline
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#EBF0EA] border border-[#d8e2d6]">
                  <span className="font-bold text-[#2F4325] block">1. Order Placed</span>
                  <span className="text-[11px] text-[#6B7267]">Confirmed & logged in system</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8DED0]">
                  <span className="font-bold text-[#292D29] block">2. Quality Check & Packing</span>
                  <span className="text-[11px] text-[#6B7267]">Within 24 hours</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8DED0]">
                  <span className="font-bold text-[#292D29] block">3. Courier Dispatch</span>
                  <span className="text-[11px] text-[#6B7267]">2-4 business days nationwide</span>
                </div>
              </div>
            </div>

            {/* Order Items Summary */}
            {order && (
              <div className="pt-6 border-t border-[#E8DED0] text-left space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#292D29]">
                  Ordered Bedsheet Items
                </h3>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F6F1]">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-[#E8DED0] shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#292D29]">{item.title}</p>
                          <p className="text-[11px] text-[#6B7267]">
                            Size: {item.size} • Fabric: {item.fabric} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#2F4325]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E8DED0] space-y-1.5 text-xs text-[#6B7267]">
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <strong className="text-[#292D29]">{order.paymentMethod}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Address:</span>
                    <strong className="text-[#292D29]">{order.address}, {order.city}, {order.province}</strong>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#292D29] pt-2 border-t border-[#F8F6F1]">
                    <span>Total Paid/Payable:</span>
                    <span className="text-[#2F4325]">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
              <Link
                href="/track-order"
                className="px-6 py-2.5 rounded-full bg-[#2F4325] text-white text-xs font-bold hover:bg-[#24351c] transition-colors flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Order Live</span>
              </Link>

              <a
                href={`https://wa.me/923001234567?text=Assalam-o-Alaikum%20Loom%20%26%20Living%2C%20I%20have%20an%20inquiry%20regarding%20my%20order%20${orderId}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full border border-[#25D366] text-[#128C7E] bg-green-50 text-xs font-bold hover:bg-green-100 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Support</span>
              </a>

              <Link
                href="/"
                className="px-6 py-2.5 rounded-full border border-[#E8DED0] text-[#292D29] text-xs font-bold hover:bg-[#E8DED0] transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
