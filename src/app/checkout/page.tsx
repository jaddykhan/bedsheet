"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { formatPrice, isValidPakistaniPhone, PAKISTAN_CITIES, PAKISTAN_PROVINCES } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Banknote,
  Smartphone,
  CreditCard,
  AlertCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, shipping, total, giftWrap, giftWrapFee, orderNotes, clearCart } = useCart();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "Punjab",
    city: "Lahore",
    address: "",
    landmark: "",
    notes: orderNotes || "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"COD" | "JazzCash" | "Easypaisa" | "Card">("COD");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) err.email = "Valid email is required";
    if (!formData.phone.trim() || !isValidPakistaniPhone(formData.phone)) {
      err.phone = "Valid Pakistani mobile number is required (e.g. 03001234567)";
    }
    if (!formData.address.trim()) err.address = "Complete delivery address is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast("Please fix the highlighted errors before submitting", "error");
      return;
    }

    if (items.length === 0) {
      toast("Your shopping bag is empty", "error");
      router.push("/collections");
      return;
    }

    setSubmitting(true);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `LL-PK-${randomNum}`;

    const newOrder = {
      id: `ord-${randomNum}`,
      orderNumber,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      province: formData.province,
      city: formData.city,
      address: formData.address,
      landmark: formData.landmark,
      orderNotes: formData.notes,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PAID",
      fulfillmentStatus: "PLACED",
      subtotal,
      shippingFee: shipping,
      discount,
      total,
      courier: "TCS Express",
      trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
      createdAt: new Date().toISOString(),
      items: items.map((i) => ({
        productId: i.productId,
        title: i.title,
        image: i.image,
        size: i.size,
        fabric: i.fabric,
        sheetType: i.sheetType,
        selectedAddOns: i.selectedAddOns,
        quantity: i.quantity,
        price: i.price,
      })),
    };

    // Store in localStorage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem("loom_living_orders") || "[]");
      localStorage.setItem("loom_living_orders", JSON.stringify([newOrder, ...existing]));
      localStorage.setItem("loom_living_latest_order", JSON.stringify(newOrder));
    } catch {
      // ignore
    }

    setTimeout(() => {
      clearCart();
      toast(`Order placed successfully! Order ID: ${orderNumber}`);
      router.push(`/order-confirmation/${orderNumber}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-10 lg:py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 mb-8 text-xs text-[#6B7267]">
            <Link href="/cart" className="hover:text-[#292D29]">
              Bag
            </Link>
            <span>&rarr;</span>
            <span className="text-[#292D29] font-bold">Secure Checkout</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Delivery & Payment Details */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Contact Information */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0] space-y-4 shadow-xs">
                  <h2 className="font-serif text-xl font-bold text-[#292D29] flex items-center gap-2">
                    <span>1. Customer & Contact Information</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#292D29] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ayesha Malik"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs text-[#292D29] focus:outline-none ${
                          errors.name ? "border-red-500 bg-red-50/30" : "border-[#E8DED0] focus:border-[#2F4325]"
                        }`}
                      />
                      {errors.name && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#292D29] block mb-1">
                        Mobile Number * (For Delivery SMS & Calls)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0300-1234567"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs text-[#292D29] focus:outline-none ${
                          errors.phone ? "border-red-500 bg-red-50/30" : "border-[#E8DED0] focus:border-[#2F4325]"
                        }`}
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.phone}</span>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-[#292D29] block mb-1">
                        Email Address * (For Order Confirmation & Tracking)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs text-[#292D29] focus:outline-none ${
                          errors.email ? "border-red-500 bg-red-50/30" : "border-[#E8DED0] focus:border-[#2F4325]"
                        }`}
                      />
                      {errors.email && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.email}</span>}
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0] space-y-4 shadow-xs">
                  <h2 className="font-serif text-xl font-bold text-[#292D29]">
                    2. Delivery Address in Pakistan
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#292D29] block mb-1">
                        Province / Territory *
                      </label>
                      <select
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325] bg-white"
                      >
                        {PAKISTAN_PROVINCES.map((prov) => (
                          <option key={prov} value={prov}>
                            {prov}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#292D29] block mb-1">
                        City *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325] bg-white"
                      >
                        {PAKISTAN_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-[#292D29] block mb-1">
                        Complete Street Address (House/Flat #, Street, Block, Phase) *
                      </label>
                      <textarea
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. House 42, Street 7, Phase 5 DHA"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs text-[#292D29] focus:outline-none ${
                          errors.address ? "border-red-500 bg-red-50/30" : "border-[#E8DED0] focus:border-[#2F4325]"
                        }`}
                      />
                      {errors.address && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.address}</span>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-[#292D29] block mb-1">
                        Famous Landmark / Area (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                        placeholder="e.g. Near Jalal Sons or Behind Total Petrol Pump"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DED0] text-xs text-[#292D29] focus:outline-none focus:border-[#2F4325]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0] space-y-4 shadow-xs">
                  <h2 className="font-serif text-xl font-bold text-[#292D29]">
                    3. Select Payment Method
                  </h2>

                  <div className="space-y-3">
                    {/* Cash on Delivery */}
                    <label
                      onClick={() => setPaymentMethod("COD")}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "COD"
                          ? "border-[#2F4325] bg-[#EBF0EA]/60 ring-1 ring-[#2F4325]"
                          : "border-[#E8DED0] hover:bg-[#F8F6F1]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="mt-1 accent-[#2F4325]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-[#2F4325]" />
                          <span className="text-sm font-bold text-[#292D29]">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2F4325] text-white">
                            Popular
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7267] mt-1">
                          Pay cash to the TCS or Leopards courier rider when your bedsheet package arrives at your door.
                        </p>
                      </div>
                    </label>

                    {/* JazzCash / Easypaisa */}
                    <label
                      onClick={() => setPaymentMethod("JazzCash")}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "JazzCash" || paymentMethod === "Easypaisa"
                          ? "border-[#2F4325] bg-[#EBF0EA]/60 ring-1 ring-[#2F4325]"
                          : "border-[#E8DED0] hover:bg-[#F8F6F1]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "JazzCash" || paymentMethod === "Easypaisa"}
                        onChange={() => setPaymentMethod("JazzCash")}
                        className="mt-1 accent-[#2F4325]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-[#2F4325]" />
                          <span className="text-sm font-bold text-[#292D29]">
                            JazzCash / Easypaisa Mobile Account
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7267] mt-1">
                          Direct mobile wallet transfer. Account details and reference code will be generated on order submission.
                        </p>
                      </div>
                    </label>

                    {/* Debit / Credit Cards */}
                    <label
                      onClick={() => setPaymentMethod("Card")}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "Card"
                          ? "border-[#2F4325] bg-[#EBF0EA]/60 ring-1 ring-[#2F4325]"
                          : "border-[#E8DED0] hover:bg-[#F8F6F1]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "Card"}
                        onChange={() => setPaymentMethod("Card")}
                        className="mt-1 accent-[#2F4325]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#2F4325]" />
                          <span className="text-sm font-bold text-[#292D29]">
                            Debit / Credit Card (Visa & MasterCard)
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7267] mt-1">
                          Secure 256-bit encrypted card gateway integration.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Place Order CTA */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DED0] space-y-6 shadow-xs sticky top-24">
                <h3 className="font-serif text-xl font-bold text-[#292D29]">
                  Order Items ({items.length})
                </h3>

                {/* Items preview */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-[#E8DED0] shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#292D29] truncate">{item.title}</p>
                        <p className="text-[11px] text-[#6B7267]">
                          {item.size} • {item.sheetType || "Flat"} • Qty: {item.quantity}
                        </p>
                        {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                          <p className="text-[10px] text-[#526453] font-medium truncate">
                            +{item.selectedAddOns.join(", ")}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-bold text-[#2F4325]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 pt-4 border-t border-[#E8DED0] text-xs text-[#6B7267]">
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
                  {giftWrap && (
                    <div className="flex justify-between">
                      <span>Luxury Keepsake Gift Box</span>
                      <span>{formatPrice(giftWrapFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Nationwide Delivery</span>
                    <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#292D29] pt-3 border-t border-[#E8DED0]">
                    <span>Total Due (PKR)</span>
                    <span className="text-[#2F4325] text-xl">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={submitting || items.length === 0}
                  className="w-full py-4 px-6 rounded-2xl bg-[#2F4325] text-white text-sm font-bold hover:bg-[#24351c] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="animate-pulse">Placing Your Order...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirm & Place Order ({formatPrice(total)})</span>
                    </>
                  )}
                </button>

                <div className="p-3 bg-[#F8F6F1] rounded-xl text-[11px] text-[#6B7267] space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#292D29]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2F4325]" />
                    <span>Loom & Living Guarantee:</span>
                  </div>
                  <p>• Verified genuine Pakistani home textile fabrics</p>
                  <p>• Inspection allowed upon arrival with delivery courier</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
