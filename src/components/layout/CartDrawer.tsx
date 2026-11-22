"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  ShoppingBag,
  ShieldCheck,
  Gift,
  FileText,
  Sparkles,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    shipping,
    total,
    giftWrap,
    setGiftWrap,
    giftWrapFee,
    orderNotes,
    setOrderNotes,
    addToCart,
    freeShippingThreshold,
    freeShippingRemaining,
    freeShippingProgress,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F8F6F1] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DED0] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2F4325]" />
              <h2 className="font-serif text-xl font-bold text-[#292D29]">Your Shopping Bag</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8DED0] font-semibold text-[#292D29]">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-[#6B7267] hover:text-[#292D29] hover:bg-[#F8F6F1]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter (The Linen Co Style) */}
          <div className="bg-[#EBF0EA] px-5 py-3 border-b border-[#d8e2d6]">
            <div className="flex items-center gap-2 text-xs font-medium text-[#2F4325]">
              <Truck className="w-4 h-4 shrink-0 text-[#2F4325]" />
              {freeShippingRemaining > 0 ? (
                <span>
                  Add <strong className="font-bold">{formatPrice(freeShippingRemaining)}</strong> more to get{" "}
                  <strong>Free Nationwide Delivery!</strong>
                </span>
              ) : (
                <span className="font-bold text-[#2F4325]">
                  🎉 You unlocked FREE Nationwide Delivery across Pakistan!
                </span>
              )}
            </div>
            <div className="mt-2 w-full bg-[#d8e2d6] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#2F4325] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E8DED0]/60 flex items-center justify-center text-[#6B7267]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#292D29]">Your bag is empty</h3>
                <p className="text-xs text-[#6B7267] max-w-xs mx-auto">
                  Explore our luxury printed bedsheets, 300 TC hotel satin stripe, and custom bed set builder.
                </p>
                <button
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2F4325] text-white text-sm font-medium hover:bg-[#24351c] transition-colors"
                >
                  <Link href="/collections" onClick={closeCart}>
                    Start Shopping
                  </Link>
                </button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E8DED0] relative group shadow-2xs"
                  >
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#E8DED0] shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="text-xs sm:text-sm font-bold text-[#292D29] hover:text-[#2F4325] line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#6B7267] hover:text-red-600 transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-[#6B7267] mt-0.5">
                          Size: <strong className="text-[#292D29]">{item.size}</strong> • {item.fabric}
                        </p>

                        {item.sheetType && (
                          <span className="inline-block mt-0.5 text-[10px] font-bold text-[#2F4325] bg-[#EBF0EA] px-2 py-0.2 rounded-md">
                            {item.sheetType}
                          </span>
                        )}

                        {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                          <div className="text-[10px] text-[#526453] mt-1 space-y-0.5">
                            {item.selectedAddOns.map((addOn, i) => (
                              <p key={i}>✓ {addOn}</p>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F8F6F1]">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#E8DED0] rounded-lg overflow-hidden bg-[#F8F6F1]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 text-[#292D29] hover:bg-[#E8DED0]"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#292D29]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 text-[#292D29] hover:bg-[#E8DED0]"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-[#2F4325]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Frequently Bought Together / Cross-Sell (The Linen Company feature) */}
                <div className="p-3.5 bg-white rounded-2xl border border-[#E8DED0] space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#292D29] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B88B72]" /> Frequently Added Together
                  </span>
                  <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-[#F8F6F1]">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-[#E8DED0] shrink-0">
                        <Image src="/images/fabrics/pure-cotton.jpg" alt="Mattress protector" fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#292D29] block line-clamp-1">Waterproof Mattress Protector</span>
                        <span className="text-[11px] text-[#2F4325] font-semibold">Rs. 1,890</span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        addToCart({
                          productId: "prod-8",
                          slug: "quilted-waterproof-mattress-protector",
                          title: "Quilted Waterproof Mattress Protector",
                          price: 1890,
                          image: "/images/fabrics/pure-cotton.jpg",
                          size: "King",
                          fabric: "100% Combed Cotton",
                          quantity: 1,
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-[#2F4325] text-white text-[11px] font-bold hover:bg-[#24351c] shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                {/* Gift Wrap & Delivery Notes Checkbox */}
                <div className="p-3.5 bg-white rounded-2xl border border-[#E8DED0] space-y-2 text-xs">
                  <label
                    onClick={() => setGiftWrap(!giftWrap)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#B88B72]" />
                      <span className="font-semibold text-[#292D29]">Add Luxury Keepsake Gift Box (+Rs. 300)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={() => {}}
                      className="accent-[#2F4325]"
                    />
                  </label>

                  <div className="pt-2 border-t border-[#F8F6F1]">
                    <button
                      onClick={() => setShowNotes(!showNotes)}
                      className="text-[11px] text-[#2F4325] font-bold hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{showNotes ? "Hide Delivery Instructions" : "+ Add Special Delivery Instructions"}</span>
                    </button>
                    {showNotes && (
                      <textarea
                        rows={2}
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="e.g. Please call before delivery, leave with guard..."
                        className="w-full mt-1.5 p-2 rounded-lg border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325]"
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Checkout Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8DED0] bg-white space-y-4">
              {/* Promo code */}
              <div className="flex gap-2">
                {couponCode ? (
                  <div className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg bg-[#EBF0EA] border border-[#d8e2d6] text-xs">
                    <span className="text-[#2F4325] font-semibold">Coupon &apos;{couponCode}&apos; Applied (-{formatPrice(discount)})</span>
                    <button onClick={removeCoupon} className="text-[#6B7267] hover:text-red-600 font-bold">
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DED0] text-xs text-[#292D29] uppercase focus:outline-none focus:border-[#2F4325]"
                    />
                    <button
                      onClick={() => {
                        if (applyCoupon(inputCoupon)) setInputCoupon("");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#E8DED0] text-[#292D29] text-xs font-semibold hover:bg-[#2F4325] hover:text-white transition-colors"
                    >
                      Apply
                    </button>
                  </>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6B7267]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#292D29]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between">
                    <span>Luxury Gift Packaging</span>
                    <span>{formatPrice(giftWrapFee)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery across Pakistan</span>
                  <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#292D29] pt-2 border-t border-[#E8DED0]">
                  <span>Estimated Total</span>
                  <span className="text-[#2F4325]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Proceed to Checkout */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2F4325] text-white text-sm font-bold hover:bg-[#24351c] transition-all shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between text-xs text-[#6B7267] pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2F4325]" />
                    <span>Cash on Delivery & Secure Pay</span>
                  </div>
                  <Link href="/cart" onClick={closeCart} className="underline hover:text-[#292D29]">
                    View Bag Details
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
