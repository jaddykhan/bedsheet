"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToBag = (product: any) => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.name,
      price: product.price,
      comparePrice: product.compareAtPrice,
      image: product.images[0],
      size: "Double",
      fabric: product.fabric,
      quantity: 1,
      pieces: ["Flat Sheet (1)", "Pillowcases (2)"],
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-10 lg:py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8DED0]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7267]">
                Saved Favorites
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#292D29] mt-1">
                My Wishlist ({wishlistProducts.length})
              </h1>
            </div>
            <Link
              href="/collections"
              className="text-xs sm:text-sm font-semibold text-[#2F4325] hover:underline"
            >
              Continue Shopping &rarr;
            </Link>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DED0] max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F8F6F1] flex items-center justify-center text-[#6B7267] mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#292D29]">
                Your wishlist is empty
              </h2>
              <p className="text-xs text-[#6B7267]">
                Save your favorite Pakistani bedsheets and sets to review them anytime.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2F4325] text-white text-xs font-bold hover:bg-[#24351c] transition-colors"
              >
                <span>Explore Bedsheet Range</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E8DED0] shadow-xs flex flex-col justify-between group"
                >
                  <div className="relative aspect-[4/5] bg-[#E8DED0]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id, product.name)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center shadow-xs"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6B7267]">
                        {product.category} • {product.fabric}
                      </span>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm font-bold text-[#292D29] hover:text-[#2F4325] block mt-1 line-clamp-1"
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F8F6F1] flex items-center justify-between">
                      <span className="text-base font-bold text-[#2F4325]">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="px-3 py-1.5 rounded-lg bg-[#2F4325] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#24351c] transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
