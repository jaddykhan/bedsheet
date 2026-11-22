import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://loomandliving.pk"),
  title: "Loom & Living | Premium Pakistani Home Textiles & Bedsheets",
  description:
    "Discover luxurious printed, bridal, and luxury bedsheet sets crafted from pure cotton, polycotton, and satin. Fast nationwide delivery across Pakistan with COD, JazzCash, and Easypaisa.",
  keywords: [
    "bedsheet Pakistan",
    "pure cotton bedsheets",
    "printed bedsheets Lahore Karachi Islamabad",
    "luxury bridal bedsheets",
    "Loom and Living",
    "chaddar",
    "bed set",
  ],
  openGraph: {
    title: "Loom & Living — Bedsheets for Every Home",
    description:
      "Premium Pakistani bedsheets in beautiful prints, soft fabrics and perfect fits.",
    images: ["/images/hero/hero-bedroom.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292D29] font-sans antialiased selection:bg-[#2F4325] selection:text-white">
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
