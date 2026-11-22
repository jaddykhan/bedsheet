import React from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/data/products";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    // If not direct category, match all
    return notFound();
  }

  const categoryProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase().replace(/[^a-z0-9]/g, "-") === slug || p.category === category.title
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pb-16">
        <div className="bg-[#E8DED0]/50 py-10 lg:py-14 border-b border-[#E8DED0]">
          <div className="container-custom">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7267] block mb-1">
              Category
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#292D29] tracking-tight">
              {category.title}
            </h1>
            <p className="text-sm text-[#6B7267] mt-2 max-w-xl">
              {category.description}
            </p>
          </div>
        </div>

        <div className="container-custom pt-8">
          <div className="flex items-center justify-between pb-6 border-b border-[#E8DED0]">
            <span className="text-xs text-[#6B7267] font-medium">
              Showing {categoryProducts.length} bedsheets in {category.title}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
