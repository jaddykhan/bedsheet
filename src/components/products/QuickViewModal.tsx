"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, Star, Check, ShoppingBag, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<"Single" | "Double" | "King" | "Super King">("King");
  const [selectedSheetType, setSelectedSheetType] = useState<"Flat Sheet Set" | "Fitted Sheet Set" | "Complete Bed-in-Bag">("Flat Sheet Set");
  const [selectedSwatch, setSelectedSwatch] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);

  let finalPrice = product.price;
  if (selectedSheetType === "Fitted Sheet Set") finalPrice += 200;
  if (selectedSheetType === "Complete Bed-in-Bag") finalPrice += 3200;
  if (selectedSize === "Single") finalPrice -= 400;
  if (selectedSize === "Super King") finalPrice += 600;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.name,
      price: finalPrice,
      comparePrice: product.compareAtPrice,
      image: product.images[selectedImage] || product.images[0],
      size: selectedSize,
      fabric: product.fabric,
      sheetType: selectedSheetType,
      quantity,
      pieces: [
        selectedSheetType === "Fitted Sheet Set" ? "1 Fitted Sheet" : "1 Flat Sheet",
        selectedSize === "Single" ? "1 Pillowcase" : "2 Pillowcases",
      ],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#F8F6F1] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DED0] max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 text-[#292D29] hover:bg-white flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image Gallery */}
        <div className="md:w-1/2 p-5 flex flex-col justify-between bg-white border-b md:border-b-0 md:border-r border-[#E8DED0]">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#E8DED0]">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#2F4325] shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-[#2F4325]" : "border-transparent opacity-70"
                  }`}
                >
                  <Image src={img} alt="Thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Form */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#6B7267] font-medium">
                {product.category}
              </span>
              <span className="text-xs text-[#6B7267]">•</span>
              <span className="text-xs text-[#2F4325] font-semibold">{product.threadCount}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#292D29] mt-1">
              {product.name}
            </h3>
            {product.urduName && (
              <p className="text-xs font-serif text-[#6B7267]">{product.urduName}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#292D29]">{product.rating}</span>
              <span className="text-xs text-[#6B7267]">({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-2xl font-bold text-[#2F4325]">
              {formatPrice(finalPrice)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-[#6B7267] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Sheet Type */}
          <div>
            <span className="text-xs font-bold text-[#292D29] block mb-1.5">Sheet Type:</span>
            <div className="grid grid-cols-2 gap-2">
              {product.sheetTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedSheetType(t)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border ${
                    selectedSheetType === t ? "bg-[#2F4325] text-white border-[#2F4325]" : "bg-white text-[#292D29] border-[#E8DED0]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-[#292D29]">Choose Size:</span>
              <Link href="/size-guide" className="text-[#2F4325] underline text-[11px]">
                Size Guide
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all border ${
                    selectedSize === size
                      ? "bg-[#2F4325] text-white border-[#2F4325]"
                      : "bg-white text-[#292D29] border-[#E8DED0] hover:border-[#2F4325]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Swatches */}
          {product.swatches && (
            <div>
              <span className="text-xs font-semibold text-[#292D29] block mb-1.5">
                Color: {product.swatches[selectedSwatch]?.name}
              </span>
              <div className="flex gap-2">
                {product.swatches.map((swatch, idx) => (
                  <button
                    key={swatch.name}
                    onClick={() => setSelectedSwatch(idx)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedSwatch === idx ? "scale-110 border-[#2F4325] shadow-xs" : "border-white"
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 rounded-xl bg-[#2F4325] text-white text-sm font-semibold hover:bg-[#24351c] transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id, product.name)}
              className={`p-3 rounded-xl border transition-colors flex items-center justify-center ${
                inWishlist
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-white border-[#E8DED0] text-[#292D29] hover:bg-[#F8F6F1]"
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* View Full Details Link */}
          <div className="text-center pt-1">
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="text-xs font-semibold text-[#2F4325] hover:underline"
            >
              View Full Product Details & Dimensions &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
