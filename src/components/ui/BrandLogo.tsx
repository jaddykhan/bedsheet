import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  variant?: "light" | "dark" | "monochrome";
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
  showTagline?: boolean;
}

export function BrandLogo({
  variant = "light",
  size = "md",
  href = "/",
  className = "",
  showTagline = true,
}: BrandLogoProps) {
  const isDark = variant === "dark";

  // Standardized dimensions to prevent hydration mismatches
  const iconDimensions =
    size === "sm"
      ? "w-7 h-7"
      : size === "lg"
      ? "w-11 h-11"
      : "w-9 h-9";

  const titleSize =
    size === "sm"
      ? "text-xl tracking-tight"
      : size === "lg"
      ? "text-3xl tracking-tight"
      : "text-2xl font-bold tracking-tight";

  const subSize =
    size === "sm"
      ? "text-[8px] tracking-[0.24em]"
      : size === "lg"
      ? "text-[10px] tracking-[0.3em]"
      : "text-[9px] tracking-[0.26em]";

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Brand-New Luxury Emblem: Royal Loom Shuttle & Cotton Blossom Seal */}
      <div
        className={`${iconDimensions} shrink-0 transition-transform duration-300 ease-out group-hover:scale-105`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Circular Luxury Ring with Thread Knot Notches */}
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke={isDark ? "#B88B72" : "#2F4325"}
            strokeWidth="1.5"
            strokeDasharray="28 2"
          />

          {/* Central Interlocking Loom Warp & Weft Threads forming 'L' */}
          <path
            d="M13 9V24C13 25.5 14 26.5 15.5 26.5H24"
            stroke={isDark ? "#F8F6F1" : "#2F4325"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cross Shuttle Weave Thread */}
          <path
            d="M23 11V16C23 17 22 18 20.5 18H13"
            stroke={isDark ? "#B88B72" : "#B88B72"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Artisan Weave Diamond Jewel at Golden Ratio */}
          <rect
            x="18"
            y="14"
            width="4.5"
            height="4.5"
            transform="rotate(45 18 14)"
            fill={isDark ? "#D4AF37" : "#B88B72"}
          />

          {/* Top Apex Cotton Blossom Accent */}
          <circle
            cx="18"
            cy="4.5"
            r="1.75"
            fill={isDark ? "#B88B72" : "#2F4325"}
          />

          {/* Bottom Root Stitch Accent */}
          <circle
            cx="18"
            cy="31.5"
            r="1.2"
            fill={isDark ? "#B88B72" : "#B88B72"}
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline leading-none">
          <span
            className={`font-serif ${titleSize} ${
              isDark ? "text-white" : "text-[#1F2E19]"
            }`}
          >
            Loom
          </span>
          <span
            className={`font-serif ${titleSize} font-normal italic mx-1.5 ${
              isDark ? "text-[#D4AF37]" : "text-[#B88B72]"
            }`}
          >
            &amp;
          </span>
          <span
            className={`font-serif ${titleSize} ${
              isDark ? "text-white" : "text-[#1F2E19]"
            }`}
          >
            Living
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-sans ${subSize} font-bold uppercase mt-1 leading-none ${
              isDark ? "text-[#C8BFB3]" : "text-[#6B7267]"
            }`}
          >
            Pakistan Home Textiles
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325] rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
