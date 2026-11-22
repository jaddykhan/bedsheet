"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { PRODUCTS, Product } from "@/data/products";
import { INITIAL_ORDERS, StoredOrder } from "@/lib/orderStorage";
import { useToast } from "@/components/ui/Toast";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  ShieldAlert,
  Search,
  CheckCircle,
  Truck,
  Plus,
  RefreshCw,
  Edit3,
  Trash2,
  Tag,
  ArrowUpRight,
  Eye,
  Sliders,
  DollarSign,
  Star,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "reviews" | "coupons">("orders");
  const [orders, setOrders] = useState<StoredOrder[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("loom_living_orders") || "[]");
      return [...stored, ...INITIAL_ORDERS];
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [orderSearch, setOrderSearch] = useState("");

  // Statistics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const aov = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const inStockProducts = productsList.filter((p) => p.inStock).length;

  const handleStatusChange = (orderNumber: string, newStatus: StoredOrder["fulfillmentStatus"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNumber ? { ...o, fulfillmentStatus: newStatus } : o))
    );
    toast(`Order ${orderNumber} status updated to: ${newStatus}`);
  };

  const handleStockToggle = (productId: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
    toast("Inventory availability toggled");
  };

  const handleStockUpdate = (productId: string, newCount: number) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockCount: Math.max(0, newCount) } : p))
    );
    toast("Stock quantity updated");
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.city.toLowerCase().includes(orderSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#292D29]">
      {/* Admin Top Header */}
      <header className="bg-[#1E2C18] text-white py-4 px-6 border-b border-[#2F4325] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <BrandLogo variant="dark" size="sm" showTagline={false} />
              <span className="text-[10px] uppercase font-sans tracking-widest bg-[#B88B72] text-white px-2 py-0.5 rounded-full font-bold">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-block text-[#C8BFB3]">
              Role: <strong>Super Administrator</strong>
            </span>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-lg bg-[#2F4325] hover:bg-[#3d5730] text-white font-medium transition-colors"
            >
              View Live Store &rarr;
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DED0] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#6B7267] text-xs">
              <span>Total Revenue (PKR)</span>
              <DollarSign className="w-4 h-4 text-[#2F4325]" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#2F4325]">
              {formatPrice(totalRevenue)}
            </div>
            <span className="text-[11px] text-green-700 font-medium">↑ +14.2% this week</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DED0] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#6B7267] text-xs">
              <span>Total Orders Placed</span>
              <ShoppingBag className="w-4 h-4 text-[#2F4325]" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#292D29]">
              {totalOrdersCount} Orders
            </div>
            <span className="text-[11px] text-[#6B7267]">Nationwide deliveries active</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DED0] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#6B7267] text-xs">
              <span>Average Order Value (AOV)</span>
              <TrendingUp className="w-4 h-4 text-[#2F4325]" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#292D29]">
              {formatPrice(aov)}
            </div>
            <span className="text-[11px] text-[#6B7267]">Bundles & sets preference</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DED0] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#6B7267] text-xs">
              <span>Active Catalog Products</span>
              <Package className="w-4 h-4 text-[#2F4325]" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#292D29]">
              {inStockProducts} / {productsList.length} Active
            </div>
            <span className="text-[11px] text-[#6B7267]">All fabrics covered</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E8DED0] gap-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-[#2F4325] text-[#2F4325]"
                : "border-transparent text-[#6B7267] hover:text-[#292D29]"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Fulfillment ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "products"
                ? "border-[#2F4325] text-[#2F4325]"
                : "border-transparent text-[#6B7267] hover:text-[#292D29]"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Inventory ({productsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "reviews"
                ? "border-[#2F4325] text-[#2F4325]"
                : "border-transparent text-[#6B7267] hover:text-[#292D29]"
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Customer Reviews Moderation</span>
          </button>
        </div>

        {/* TAB 1: ORDERS & FULFILLMENT */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-[#E8DED0] overflow-hidden shadow-xs space-y-4">
            <div className="p-5 border-b border-[#E8DED0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#292D29]">Live Customer Orders</h3>
                <p className="text-xs text-[#6B7267]">Manage COD, JazzCash and courier dispatches.</p>
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-[#6B7267] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by Order ID, name, city..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#E8DED0] text-xs focus:outline-none focus:border-[#2F4325]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F6F1] text-[#6B7267] uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">City / Address</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DED0] text-[#292D29]">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#F8F6F1]/50">
                      <td className="p-4 font-bold text-[#2F4325]">
                        {ord.orderNumber}
                        <span className="block text-[10px] text-[#6B7267]">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <strong className="block">{ord.customerName}</strong>
                        <span className="text-[11px] text-[#6B7267]">{ord.customerPhone}</span>
                      </td>
                      <td className="p-4">
                        <strong className="block">{ord.city}</strong>
                        <span className="text-[11px] text-[#6B7267] truncate max-w-[180px] block">
                          {ord.address}
                        </span>
                      </td>
                      <td className="p-4">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="text-[11px]">
                            {it.title} ({it.size}) × {it.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-md font-semibold bg-[#EBF0EA] text-[#2F4325]">
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-[#2F4325]">
                        {formatPrice(ord.total)}
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.fulfillmentStatus}
                          onChange={(e) =>
                            handleStatusChange(ord.orderNumber, e.target.value as any)
                          }
                          className="px-2.5 py-1 rounded-lg border border-[#E8DED0] bg-white text-xs font-semibold focus:outline-none focus:border-[#2F4325]"
                        >
                          <option value="PLACED">Placed</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="DISPATCHED">Dispatched (TCS)</option>
                          <option value="DELIVERED">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT INVENTORY */}
        {activeTab === "products" && (
          <div className="bg-white rounded-3xl border border-[#E8DED0] overflow-hidden shadow-xs space-y-4">
            <div className="p-5 border-b border-[#E8DED0] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#292D29]">Bedsheet Inventory & SKUs</h3>
                <p className="text-xs text-[#6B7267]">Adjust stock counts and toggle product availability.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F6F1] text-[#6B7267] uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-4">Bedsheet</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Fabric</th>
                    <th className="p-4">Price (PKR)</th>
                    <th className="p-4">Stock Units</th>
                    <th className="p-4">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DED0]">
                  {productsList.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8F6F1]/50">
                      <td className="p-4 flex items-center gap-3">
                        <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-[#E8DED0] shrink-0">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <strong className="block text-[#292D29]">{p.name}</strong>
                          <span className="text-[10px] text-[#6B7267]">{p.threadCount}</span>
                        </div>
                      </td>
                      <td className="p-4 text-[#6B7267]">{p.category}</td>
                      <td className="p-4 font-semibold text-[#2F4325]">{p.fabric}</td>
                      <td className="p-4 font-bold text-[#292D29]">{formatPrice(p.price)}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={p.stockCount}
                          onChange={(e) => handleStockUpdate(p.id, Number(e.target.value))}
                          className="w-16 px-2 py-1 rounded-lg border border-[#E8DED0] text-xs font-bold"
                        />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleStockToggle(p.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            p.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS MODERATION */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-3xl border border-[#E8DED0] p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#292D29]">Customer Feedback Moderation</h3>
            <p className="text-xs text-[#6B7267]">
              Review verified customer feedback from Lahore, Karachi, Islamabad, and Faisalabad.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  id: "1",
                  name: "Areeba K.",
                  city: "Lahore",
                  rating: 5,
                  text: "Fabric bohat soft hai aur print bilkul waise hi hai jaisa pictures mein tha.",
                  product: "Meadow Bloom Bedsheet Set",
                  status: "Approved",
                },
                {
                  id: "2",
                  name: "Hira M.",
                  city: "Karachi",
                  rating: 5,
                  text: "Quality zabardast hai, size bhi perfect fit hai. Highly recommended!",
                  product: "Indigo Heritage Bedsheet Set",
                  status: "Approved",
                },
                {
                  id: "3",
                  name: "Mariam S.",
                  city: "Islamabad",
                  rating: 5,
                  text: "Delivery time par mil gayi aur packing bhi bohat achhi thi.",
                  product: "Rose Garden Bedsheet Set",
                  status: "Approved",
                },
              ].map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E8DED0] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#292D29]">{rev.name} ({rev.city})</span>
                      <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-bold">Verified Buyer</span>
                    </div>
                    <p className="text-xs text-[#6B7267] italic">&ldquo;{rev.text}&rdquo;</p>
                    <span className="text-[10px] text-[#2F4325] font-semibold block">Product: {rev.product}</span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBF0EA] text-[#2F4325]">
                    {rev.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
