"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, Truck, ShieldCheck, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    shipping,
    total,
    freeShippingRemaining,
    freeShippingProgress,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-10 lg:py-16">
        <div className="container-custom">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#292D29] mb-8">
            Your Shopping Bag
          </h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DED0] max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#F8F6F1] flex items-center justify-center text-[#6B7267]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#292D29]">Your bag is empty</h2>
              <p className="text-xs text-[#6B7267]">
                Discover our bestselling printed bedsheets and custom bed set builder.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#2F4325] text-white text-xs font-semibold hover:bg-[#24351c] transition-colors"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-4">
                {/* Free shipping banner */}
                <div className="p-4 rounded-2xl bg-[#EBF0EA] border border-[#d8e2d6] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2F4325]">
                    <Truck className="w-4 h-4" />
                    {freeShippingRemaining > 0 ? (
                      <span>
                        Add {formatPrice(freeShippingRemaining)} more for FREE Nationwide Delivery!
                      </span>
                    ) : (
                      <span>🎉 Congratulations! Your order qualifies for FREE Delivery across Pakistan.</span>
                    )}
                  </div>
                  <div className="w-full bg-[#d8e2d6] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#2F4325] h-full transition-all duration-300"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-[#E8DED0] overflow-hidden">
                  <div className="p-6 space-y-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F8F6F1] last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#E8DED0] shrink-0">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                          </div>
                          <div>
                            <Link
                              href={`/products/${item.slug}`}
                              className="text-sm font-bold text-[#292D29] hover:text-[#2F4325]"
                            >
                              {item.title}
                            </Link>
                            <p className="text-xs text-[#6B7267] mt-0.5">
                              Size: <strong>{item.size}</strong> • Fabric: {item.fabric}
                            </p>
                            {item.pieces && item.pieces.length > 0 && (
                              <p className="text-[11px] text-[#526453] mt-0.5">
                                Included: {item.pieces.join(", ")}
                              </p>
                            )}
                            <span className="text-sm font-bold text-[#2F4325] block sm:hidden mt-2">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                          <div className="flex items-center border border-[#E8DED0] rounded-xl bg-[#F8F6F1]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2.5 py-1.5 text-[#292D29] hover:bg-[#E8DED0]"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-[#292D29]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2.5 py-1.5 text-[#292D29] hover:bg-[#E8DED0]"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right min-w-[90px]">
                            <span className="text-sm font-bold text-[#2F4325]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#6B7267] hover:text-red-600 transition-colors"
                            aria-label="Delete item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8DED0] p-6 space-y-6 shadow-xs">
                <h2 className="font-serif text-xl font-bold text-[#292D29]">Order Summary</h2>

                {/* Promo Code */}
                <div>
                  {couponCode ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#EBF0EA] border border-[#d8e2d6] text-xs">
                      <span className="text-[#2F4325] font-semibold">
                        Coupon &apos;{couponCode}&apos; Applied (-{formatPrice(discount)})
                      </span>
                      <button onClick={removeCoupon} className="text-[#6B7267] hover:text-red-600 font-bold">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. WELCOME10)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-[#E8DED0] text-xs uppercase text-[#292D29] focus:outline-none focus:border-[#2F4325]"
                      />
                      <button
                        onClick={() => {
                          if (applyCoupon(inputCoupon)) setInputCoupon("");
                        }}
                        className="px-4 py-2 rounded-xl bg-[#E8DED0] text-[#292D29] text-xs font-bold hover:bg-[#2F4325] hover:text-white transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2 text-xs text-[#6B7267]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#292D29]">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Nationwide Delivery</span>
                    <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#292D29] pt-3 border-t border-[#E8DED0]">
                    <span>Total Amount (PKR)</span>
                    <span className="text-[#2F4325] text-lg">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2F4325] text-white text-sm font-bold hover:bg-[#24351c] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-[#6B7267] pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#2F4325]" />
                  <span>Cash on Delivery & Bank Transfer Accepted</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
