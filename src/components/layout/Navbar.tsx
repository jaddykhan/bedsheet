"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchModal } from "./SearchModal";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#F8F6F1] border-b ${
          isScrolled
            ? "border-[#E8DED0] shadow-sm bg-[#F8F6F1]/95 backdrop-blur-md py-3"
            : "border-[#E5DFD5] py-4"
        }`}
      >
        <div className="container-custom flex items-center justify-between gap-4">
          {/* Mobile menu toggle & search */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#292D29] hover:text-[#2F4325] focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#292D29] hover:text-[#2F4325]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <BrandLogo variant="light" size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#292D29]">
            {/* Bedsheets with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("bedsheets")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#2F4325] py-2 transition-colors">
                <span>Bedsheets</span>
                <ChevronDown className="w-4 h-4 text-[#6B7267]" />
              </button>

              {activeDropdown === "bedsheets" && (
                <div className="absolute top-full left-0 w-64 bg-white border border-[#E8DED0] rounded-xl shadow-xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/collections"
                    className="block px-3 py-2 text-sm text-[#292D29] hover:bg-[#F8F6F1] hover:text-[#2F4325] rounded-lg transition-colors font-semibold"
                  >
                    All Bedsheets
                  </Link>
                  <Link
                    href="/collections/printed-bedsheets"
                    className="block px-3 py-2 text-sm text-[#292D29] hover:bg-[#F8F6F1] hover:text-[#2F4325] rounded-lg transition-colors"
                  >
                    Printed Bedsheets
                  </Link>
                  <Link
                    href="/collections/plain-essentials"
                    className="block px-3 py-2 text-sm text-[#292D29] hover:bg-[#F8F6F1] hover:text-[#2F4325] rounded-lg transition-colors"
                  >
                    Plain & Essentials
                  </Link>
                  <Link
                    href="/collections/luxury-collection"
                    className="block px-3 py-2 text-sm text-[#292D29] hover:bg-[#F8F6F1] hover:text-[#2F4325] rounded-lg transition-colors"
                  >
                    Luxury Collection
                  </Link>
                  <Link
                    href="/collections/bridal-collection"
                    className="block px-3 py-2 text-sm text-[#292D29] hover:bg-[#F8F6F1] hover:text-[#2F4325] rounded-lg transition-colors"
                  >
                    Bridal Collection
                  </Link>
                  <div className="pt-2 mt-2 border-t border-[#E8DED0]">
                    <Link
                      href="/build-your-bed"
                      className="flex items-center justify-between px-3 py-2 text-sm text-[#2F4325] bg-[#EBF0EA] font-semibold rounded-lg hover:bg-[#2F4325] hover:text-white transition-colors"
                    >
                      <span>Custom Bed Set Builder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Collections with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("collections")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#2F4325] py-2 transition-colors">
                <span>Collections</span>
                <ChevronDown className="w-4 h-4 text-[#6B7267]" />
              </button>

              {activeDropdown === "collections" && (
                <div className="absolute top-full left-0 w-60 bg-white border border-[#E8DED0] rounded-xl shadow-xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/collections/printed-bedsheets"
                    className="block px-3 py-2 text-sm text-[#292D29] hover:bg-[#F8F6F1] hover:text-[#2F4325] rounded-lg transition-colors"
                  >
                    Spring Bloom 2026
                  </Link>
                  <Link
                    href="/collections/luxury-collection"
                    className="block px-3 py-2 text-sm text-[#292D29] hover:bg-[#F8F6F1] hover:text-[#2F4325] rounded-lg transition-colors"
                  >
                    Heritage Ajrak & Indigo
                  </Link>
                  <Link
                    href="/collections/bridal-collection"
                    className="block px-3 py-2 text-sm text-[#292D29] hover:bg-[#F8F6F1] hover:text-[#2F4325] rounded-lg transition-colors"
                  >
                    Trousseau & Bridal Sets
                  </Link>
                  <Link
                    href="/lookbook"
                    className="block px-3 py-2 text-sm text-[#2F4325] font-medium hover:bg-[#F8F6F1] rounded-lg transition-colors"
                  >
                    Bedroom Lookbook
                  </Link>
                </div>
              )}
            </div>

            <Link href="/size-guide" className="hover:text-[#2F4325] transition-colors">
              Shop by Size
            </Link>

            <Link href="/fabric-guide" className="hover:text-[#2F4325] transition-colors">
              Shop by Fabric
            </Link>

            <Link href="/collections?filter=new" className="hover:text-[#2F4325] transition-colors">
              New Arrivals
            </Link>

            <Link
              href="/collections?filter=sale"
              className="text-[#B88B72] hover:text-[#966750] font-semibold transition-colors flex items-center gap-1"
            >
              <span>Sale</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B88B72]" />
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex p-2 text-[#292D29] hover:text-[#2F4325] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/account"
              className="hidden sm:flex p-2 text-[#292D29] hover:text-[#2F4325] transition-colors"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/wishlist"
              className="relative p-2 text-[#292D29] hover:text-[#2F4325] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B88B72] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              className="relative p-2 text-[#292D29] hover:text-[#2F4325] transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2F4325] text-white text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[82%] max-w-sm bg-[#F8F6F1] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DED0]">
                <BrandLogo variant="light" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-[#292D29] hover:bg-[#E8DED0]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                <Link
                  href="/collections"
                  className="block px-3 py-2 text-base font-medium text-[#292D29] hover:bg-[#E8DED0]/60 rounded-lg"
                >
                  All Bedsheets
                </Link>
                <Link
                  href="/collections/printed-bedsheets"
                  className="block px-3 py-2 text-base font-medium text-[#292D29] hover:bg-[#E8DED0]/60 rounded-lg pl-6"
                >
                  • Printed Bedsheets
                </Link>
                <Link
                  href="/collections/plain-essentials"
                  className="block px-3 py-2 text-base font-medium text-[#292D29] hover:bg-[#E8DED0]/60 rounded-lg pl-6"
                >
                  • Plain & Essentials
                </Link>
                <Link
                  href="/collections/luxury-collection"
                  className="block px-3 py-2 text-base font-medium text-[#292D29] hover:bg-[#E8DED0]/60 rounded-lg pl-6"
                >
                  • Luxury Collection
                </Link>
                <Link
                  href="/collections/bridal-collection"
                  className="block px-3 py-2 text-base font-medium text-[#292D29] hover:bg-[#E8DED0]/60 rounded-lg pl-6"
                >
                  • Bridal Collection
                </Link>

                <div className="my-2 border-t border-[#E8DED0]" />

                <Link
                  href="/build-your-bed"
                  className="block px-3 py-2 text-base font-semibold text-[#2F4325] bg-[#EBF0EA] rounded-lg"
                >
                  Build Your Bed Set
                </Link>
                <Link
                  href="/size-guide"
                  className="block px-3 py-2 text-base font-medium text-[#292D29] hover:bg-[#E8DED0]/60 rounded-lg"
                >
                  Bedsheet Size Guide
                </Link>
                <Link
                  href="/fabric-guide"
                  className="block px-3 py-2 text-base font-medium text-[#292D29] hover:bg-[#E8DED0]/60 rounded-lg"
                >
                  Fabric Guide (Cotton, Cambric, Satin)
                </Link>
                <Link
                  href="/collections?filter=new"
                  className="block px-3 py-2 text-base font-medium text-[#292D29] hover:bg-[#E8DED0]/60 rounded-lg"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/collections?filter=sale"
                  className="block px-3 py-2 text-base font-semibold text-[#B88B72] hover:bg-[#E8DED0]/60 rounded-lg"
                >
                  Sale & Promotions
                </Link>
                <Link
                  href="/track-order"
                  className="block px-3 py-2 text-base font-medium text-[#292D29] hover:bg-[#E8DED0]/60 rounded-lg"
                >
                  Track Your Order
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DED0] space-y-3">
              <a
                href="https://wa.me/923001234567?text=Assalam-o-Alaikum%20Loom%20%26%20Living%2C%20I%20have%20an%20inquiry%20regarding%20bedsheets"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#2F4325] text-white text-sm font-medium hover:bg-[#24351c] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#B88B72]" />
                <span>WhatsApp Customer Help</span>
              </a>
              <div className="flex items-center justify-between text-xs text-[#6B7267] pt-2">
                <span>Nationwide Pakistan Delivery</span>
                <span>COD Available</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
