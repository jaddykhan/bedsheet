"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { QuickViewModal } from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState(0);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes.includes("King")
      ? "King"
      : product.sizes.includes("Double")
      ? "Double"
      : product.sizes[0];

    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.name,
      price: product.price,
      comparePrice: product.compareAtPrice,
      image: product.images[0],
      size: defaultSize,
      fabric: product.fabric,
      sheetType: "Flat Sheet Set",
      quantity: 1,
      pieces: ["Flat Sheet (1)", defaultSize === "Single" ? "Pillowcase (1)" : "Pillowcases (2)"],
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case "Bestseller":
        return "bg-[#FFF4D9] text-[#7A5B0B] border-[#F2E2B4]";
      case "New Arrival":
        return "bg-[#EBF0EA] text-[#2F4325] border-[#d4ded2]";
      case "Top Rated":
        return "bg-[#FFF4D9] text-[#7A5B0B] border-[#F2E2B4]";
      case "Hotel Luxury":
        return "bg-[#EBF0EA] text-[#2F4325] border-[#2F4325]";
      case "Bridal":
        return "bg-[#FDECE7] text-[#A24831] border-[#F7D2C7]";
      case "Limited Stock":
        return "bg-[#FDECE7] text-[#A24831] border-[#F7D2C7]";
      default:
        return "bg-white text-[#292D29] border-[#E8DED0]";
    }
  };

  return (
    <>
      <div className="group relative flex flex-col">
        {/* Image Container with 4:5 Aspect Ratio */}
        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#E8DED0]/50 border border-[#E8DED0]/60 transition-all duration-300 group-hover:shadow-md">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </Link>

          {/* Floating Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs z-10 ${
              inWishlist
                ? "bg-white text-red-600 scale-105"
                : "bg-white/90 backdrop-blur-xs text-[#292D29] hover:bg-white hover:text-red-600"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>

          {/* Floating Badge (bottom left of photo) */}
          {product.badge && (
            <div className="absolute bottom-3 left-3 z-10">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-xs backdrop-blur-xs ${getBadgeStyle(
                  product.badge
                )}`}
              >
                {product.badge === "Bestseller" && "⭐"}
                {product.badge === "New Arrival" && "🍃"}
                {product.badge === "Top Rated" && "⭐"}
                {product.badge === "Hotel Luxury" && "👑"}
                {product.badge === "Bridal" && "💍"}
                {product.badge === "Limited Stock" && "🔥"}
                <span>{product.badge}</span>
              </span>
            </div>
          )}

          {/* Quick View Button on Desktop Hover */}
          <div className="absolute inset-x-3 bottom-12 z-10 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setQuickViewOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-white/95 backdrop-blur-md text-[#292D29] text-xs font-semibold hover:bg-[#2F4325] hover:text-white transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="pt-3 pb-1 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#6B7267] font-semibold uppercase tracking-wider mb-0.5">
              <span>{product.fabric}</span>
              <span>•</span>
              <span className="text-[#2F4325]">{product.pattern}</span>
            </div>

            <Link
              href={`/products/${product.slug}`}
              className="font-medium text-sm sm:text-[15px] text-[#292D29] hover:text-[#2F4325] line-clamp-1 transition-colors"
            >
              {product.name}
            </Link>

            {/* Subtle swatches preview */}
            {product.swatches && product.swatches.length > 0 && (
              <div className="flex items-center gap-1.5 mt-1.5">
                {product.swatches.map((swatch, idx) => (
                  <button
                    key={swatch.name}
                    onClick={() => setActiveSwatch(idx)}
                    className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                      activeSwatch === idx ? "scale-125 border-[#2F4325]" : "border-black/10"
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Price and Add to Bag Row */}
          <div className="flex items-center justify-between mt-2 pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-bold text-[#292D29]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-[#6B7267] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Dark olive add to bag button */}
            <button
              onClick={handleQuickAdd}
              className="w-8 h-8 rounded-lg bg-[#2F4325] hover:bg-[#24351c] text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label={`Add ${product.name} to bag`}
              title="Add to Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
