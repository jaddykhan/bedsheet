"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
  MessageSquare,
  Check,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  CheckSquare,
  Square,
  Zap,
} from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice, PAKISTAN_CITIES } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<"Single" | "Double" | "King" | "Super King">(
    product.sizes.includes("King") ? "King" : product.sizes[0]
  );
  const [selectedSheetType, setSelectedSheetType] = useState<"Flat Sheet Set" | "Fitted Sheet Set" | "Complete Bed-in-Bag">(
    product.sheetTypes[0] || "Flat Sheet Set"
  );
  const [selectedSwatch, setSelectedSwatch] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"dimensions" | "care" | "specifications">("dimensions");

  // Add-ons toggles (The Linen Company Style)
  const [addExtraPillows, setAddExtraPillows] = useState(false);
  const [addProtector, setAddProtector] = useState(false);
  const [addCushions, setAddCushions] = useState(false);

  // City-wise Delivery Estimator
  const [selectedCity, setSelectedCity] = useState("Lahore");

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  // Dynamic price calculation with sheet type & add-ons
  let basePrice = product.price;
  if (selectedSheetType === "Fitted Sheet Set") {
    basePrice += 200; // Fitted sheet elasticized finish
  } else if (selectedSheetType === "Complete Bed-in-Bag") {
    basePrice += 3200; // Includes heavy quilted comforter
  }

  // Size adjustment
  if (selectedSize === "Single") {
    basePrice -= 400;
  } else if (selectedSize === "Super King") {
    basePrice += 600;
  }

  // Add-ons prices
  let addOnTotal = 0;
  const selectedAddOnLabels: string[] = [];
  if (addExtraPillows && product.addOns) {
    addOnTotal += product.addOns.extraPillowsPrice;
    selectedAddOnLabels.push("Extra Pair of Pillowcases (+Rs. 890)");
  }
  if (addProtector && product.addOns) {
    addOnTotal += product.addOns.protectorPrice;
    selectedAddOnLabels.push("Waterproof Mattress Protector (+Rs. 1,490)");
  }
  if (addCushions && product.addOns) {
    addOnTotal += product.addOns.cushionPrice;
    selectedAddOnLabels.push("Filled Cushions Pair (+Rs. 690)");
  }

  const finalUnitPrice = basePrice + addOnTotal;

  // Delivery estimate
  const getEstimatedDate = () => {
    const days = selectedCity === "Lahore" || selectedCity === "Karachi" || selectedCity === "Islamabad" || selectedCity === "Rawalpindi" ? 2 : 4;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" });
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.name,
      price: finalUnitPrice,
      comparePrice: product.compareAtPrice ? product.compareAtPrice + addOnTotal : undefined,
      image: product.images[selectedImage] || product.images[0],
      size: selectedSize,
      fabric: product.fabric,
      sheetType: selectedSheetType,
      quantity,
      pieces: [
        selectedSheetType === "Fitted Sheet Set" ? "1 Fitted Sheet" : "1 Flat Sheet",
        selectedSize === "Single" ? "1 Pillowcase" : "2 Pillowcases",
        ...(selectedSheetType === "Complete Bed-in-Bag" ? ["1 Quilted Comforter", "2 Filled Cushions"] : []),
        ...selectedAddOnLabels,
      ],
      selectedAddOns: selectedAddOnLabels,
    });
  };

  const whatsappInquiryUrl = `https://wa.me/923001234567?text=Assalam-o-Alaikum%20Loom%20%26%20Living%2C%20I%20want%20to%20order%20the%20${encodeURIComponent(
    product.name
  )}%0A%E2%80%A2%20Size%3A%20${selectedSize}%0A%E2%80%A2%20Type%3A%20${selectedSheetType}%0A%E2%80%A2%20Price%3A%20${formatPrice(
    finalUnitPrice * quantity
  )}%0A%E2%80%A2%20Destination%20City%3A%20${selectedCity}`;

  const currentDimensions = product.dimensions[selectedSize.toLowerCase() as keyof typeof product.dimensions] || product.dimensions.king;

  return (
    <div className="container-custom py-6 lg:py-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#6B7267] mb-6">
        <Link href="/" className="hover:text-[#292D29]">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/collections" className="hover:text-[#292D29]">
          Bedsheets
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href={`/collections/${product.category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
          className="hover:text-[#292D29]"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#292D29] font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery with High-Definition Zoom */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[#E8DED0] border border-[#E8DED0] shadow-sm group">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 text-[#2F4325] shadow-sm">
                {product.badge}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id, product.name)}
              className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md ${
                inWishlist ? "bg-white text-red-600" : "bg-white/90 text-[#292D29] hover:bg-white"
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
            </button>

            {/* Live Viewers Indicator */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{product.viewersCount || 24} people viewing this set right now</span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-24 h-28 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx
                      ? "border-[#2F4325] scale-102 shadow-md ring-2 ring-[#2F4325]/20"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Buying Box & The Linen Co. Style Customizer */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#6B7267]">
                {product.category}
              </span>
              <span className="text-xs text-[#6B7267]">•</span>
              <span className="text-xs font-bold text-[#2F4325] bg-[#EBF0EA] px-2.5 py-0.5 rounded-full">
                {product.threadCount}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#292D29] mt-2 leading-tight">
              {product.name}
            </h1>
            {product.urduName && (
              <p className="font-serif text-sm text-[#6B7267] mt-0.5">{product.urduName}</p>
            )}

            {/* Reviews Stars */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#292D29]">{product.rating}</span>
              <span className="text-xs text-[#6B7267]">({product.reviewCount} verified Pakistani reviews)</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8DED0] flex items-baseline justify-between shadow-xs">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#2F4325]">
                {formatPrice(finalUnitPrice)}
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-[#6B7267] line-through">
                  {formatPrice(product.compareAtPrice + addOnTotal)}
                </span>
              )}
            </div>

            <span className="text-xs font-bold text-[#B88B72] bg-[#F4EFEA] px-2.5 py-1 rounded-full">
              In Stock • Dispatches in 24h
            </span>
          </div>

          {/* 1. Sheet Type Selector (The Linen Co. Convention) */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-[#292D29]">Choose Sheet Type:</span>
              <span className="text-[11px] text-[#6B7267]">
                {selectedSheetType === "Fitted Sheet Set" ? "Elastic border for snug fit" : "Traditional tuck-in sheet"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.sheetTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedSheetType(type)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                    selectedSheetType === type
                      ? "bg-[#2F4325] text-white border-[#2F4325] shadow-xs"
                      : "bg-white text-[#292D29] border-[#E8DED0] hover:border-[#2F4325]"
                  }`}
                >
                  {type === "Flat Sheet Set" && "Flat Sheet Set"}
                  {type === "Fitted Sheet Set" && "Fitted (+Rs. 200)"}
                  {type === "Complete Bed-in-Bag" && "With Comforter"}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Bed Size Selector */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-[#292D29]">Select Bed Size:</span>
              <Link href="/size-guide" className="text-[#2F4325] underline text-xs font-semibold">
                Pakistani Size Guide &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 px-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                    selectedSize === size
                      ? "bg-[#2F4325] text-white border-[#2F4325] shadow-xs"
                      : "bg-white text-[#292D29] border-[#E8DED0] hover:border-[#2F4325]"
                  }`}
                >
                  <span className="block">{size}</span>
                  <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                    {size === "Single" ? "60x90 in" : size === "Double" ? "90x95 in" : size === "King" ? "108x95 in" : "108x102 in"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Color Swatches */}
          {product.swatches && (
            <div>
              <span className="text-xs font-bold text-[#292D29] block mb-2">
                Color Pattern: <span className="font-normal">{product.swatches[selectedSwatch]?.name}</span>
              </span>
              <div className="flex gap-2.5">
                {product.swatches.map((swatch, idx) => (
                  <button
                    key={swatch.name}
                    onClick={() => setSelectedSwatch(idx)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedSwatch === idx ? "scale-115 border-[#2F4325] shadow-xs" : "border-white"
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. Cross-Sell Add-ons (The Linen Company & Bedsheet.com.pk feature) */}
          {product.addOns && (
            <div className="p-4 rounded-2xl bg-white border border-[#E8DED0] space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#292D29] block">
                Complete Your Bed Setup (Recommended Add-ons)
              </span>

              {/* Extra Pillows */}
              <label
                onClick={() => setAddExtraPillows(!addExtraPillows)}
                className="flex items-center justify-between p-2 rounded-xl border border-[#F8F6F1] hover:bg-[#F8F6F1] cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2">
                  {addExtraPillows ? (
                    <CheckSquare className="w-4 h-4 text-[#2F4325]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#6B7267]" />
                  )}
                  <span>+ Extra Pair of Matching Pillowcases</span>
                </div>
                <strong className="text-[#2F4325]">+{formatPrice(product.addOns.extraPillowsPrice)}</strong>
              </label>

              {/* Mattress Protector */}
              <label
                onClick={() => setAddProtector(!addProtector)}
                className="flex items-center justify-between p-2 rounded-xl border border-[#F8F6F1] hover:bg-[#F8F6F1] cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2">
                  {addProtector ? (
                    <CheckSquare className="w-4 h-4 text-[#2F4325]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#6B7267]" />
                  )}
                  <span>+ Fitted Waterproof Mattress Protector</span>
                </div>
                <strong className="text-[#2F4325]">+{formatPrice(product.addOns.protectorPrice)}</strong>
              </label>

              {/* Filled Cushions */}
              <label
                onClick={() => setAddCushions(!addCushions)}
                className="flex items-center justify-between p-2 rounded-xl border border-[#F8F6F1] hover:bg-[#F8F6F1] cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2">
                  {addCushions ? (
                    <CheckSquare className="w-4 h-4 text-[#2F4325]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#6B7267]" />
                  )}
                  <span>+ Matching Filled Decorative Cushions (2 Pcs)</span>
                </div>
                <strong className="text-[#2F4325]">+{formatPrice(product.addOns.cushionPrice)}</strong>
              </label>
            </div>
          )}

          {/* 5. City-wise Delivery Estimator */}
          <div className="p-4 rounded-2xl bg-[#EBF0EA] border border-[#d8e2d6] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#2F4325] font-bold">
                <Truck className="w-4 h-4" />
                <span>Estimated Delivery to:</span>
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white border border-[#d8e2d6] rounded-lg px-2.5 py-1 text-xs font-bold text-[#2F4325] focus:outline-none"
              >
                {PAKISTAN_CITIES.slice(0, 10).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#292D29]">
              <Calendar className="w-4 h-4 text-[#2F4325]" />
              <span>
                Order today & receive by <strong>{getEstimatedDate()}</strong> via TCS Express (COD Available)
              </span>
            </div>
          </div>

          {/* Quantity & Buy Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <div className="flex items-center border border-[#E8DED0] rounded-xl bg-white px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-[#292D29] hover:text-[#2F4325]"
                  aria-label="Decrease"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-bold text-[#292D29]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-[#292D29] hover:text-[#2F4325]"
                  aria-label="Increase"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-xl bg-[#2F4325] text-white text-sm font-bold hover:bg-[#24351c] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • {formatPrice(finalUnitPrice * quantity)}</span>
              </button>
            </div>

            {/* 1-Click WhatsApp Quick Order */}
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl border-2 border-[#25D366] bg-green-50 text-[#128C7E] text-xs font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
              <span>Order via WhatsApp in 1-Click</span>
            </a>
          </div>

          {/* Guarantees */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8DED0] space-y-2 text-xs text-[#292D29]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#2F4325]" />
              <span>
                <strong>100% Genuine Pakistani Combed Cotton</strong> (No synthetic blends)
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#2F4325]" />
              <span><strong>7-Day Hassle-Free Exchange Policy</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#2F4325]" />
              <span><strong>Free Delivery</strong> on orders above Rs. 3,000</span>
            </div>
          </div>

          {/* Specifications Accordion */}
          <div className="bg-white rounded-2xl border border-[#E8DED0] p-5 space-y-4">
            <div className="flex border-b border-[#E8DED0] gap-4">
              <button
                onClick={() => setActiveTab("dimensions")}
                className={`pb-2 text-xs font-bold transition-colors border-b-2 ${
                  activeTab === "dimensions"
                    ? "border-[#2F4325] text-[#2F4325]"
                    : "border-transparent text-[#6B7267] hover:text-[#292D29]"
                }`}
              >
                Dimensions ({selectedSize})
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`pb-2 text-xs font-bold transition-colors border-b-2 ${
                  activeTab === "care"
                    ? "border-[#2F4325] text-[#2F4325]"
                    : "border-transparent text-[#6B7267] hover:text-[#292D29]"
                }`}
              >
                Wash Care
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`pb-2 text-xs font-bold transition-colors border-b-2 ${
                  activeTab === "specifications"
                    ? "border-[#2F4325] text-[#2F4325]"
                    : "border-transparent text-[#6B7267] hover:text-[#292D29]"
                }`}
              >
                Fabric Specs
              </button>
            </div>

            {activeTab === "dimensions" && (
              <div className="text-xs text-[#292D29] space-y-2">
                <div className="flex justify-between py-1 border-b border-[#F8F6F1]">
                  <span className="text-[#6B7267]">Flat Sheet:</span>
                  <span className="font-semibold">{currentDimensions.flat}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F8F6F1]">
                  <span className="text-[#6B7267]">Fitted Sheet (Elastic Skirt):</span>
                  <span className="font-semibold">{currentDimensions.fitted}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#6B7267]">Pillowcases:</span>
                  <span className="font-semibold">{currentDimensions.pillows}</span>
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <ul className="text-xs text-[#6B7267] space-y-1.5 list-disc pl-4">
                {product.careInstructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            )}

            {activeTab === "specifications" && (
              <div className="text-xs text-[#292D29] space-y-2">
                <p><strong>Thread Count:</strong> {product.threadCount}</p>
                <p><strong>Weave:</strong> {product.fabric}</p>
                <p><strong>Pattern:</strong> {product.pattern}</p>
                <ul className="list-disc pl-4 text-[#6B7267] space-y-1">
                  {product.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[#E8DED0]">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#292D29] mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Add-to-Cart Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-[#E8DED0] p-3 shadow-2xl lg:hidden z-30 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-xs font-bold text-[#292D29] truncate block">{product.name}</span>
          <span className="text-sm font-bold text-[#2F4325]">{formatPrice(finalUnitPrice)}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-5 py-2.5 rounded-xl bg-[#2F4325] text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
