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
      {/* Brand-New Luxury Emblem: Lotus & Cotton Blossom Seal (matching reference design) */}
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
          {/* Central Stem */}
          <path
            d="M18 24.5V31.5"
            stroke={isDark ? "#D4AF37" : "#2F4325"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Center Pointed Petal */}
          <path
            d="M18 5.5C16.2 11 16.2 19 18 25C19.8 19 19.8 11 18 5.5Z"
            stroke={isDark ? "#F8F6F1" : "#2F4325"}
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill={isDark ? "#2F4325" : "#FAF8F5"}
          />

          {/* Left Main Curved Petal */}
          <path
            d="M16 10C11.5 13.5 10.5 19 14.5 24C15.8 21 16.2 16 16 10Z"
            stroke={isDark ? "#F8F6F1" : "#2F4325"}
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill={isDark ? "#2F4325" : "#FAF8F5"}
          />

          {/* Right Main Curved Petal */}
          <path
            d="M20 10C24.5 13.5 25.5 19 21.5 24C20.2 21 19.8 16 20 10Z"
            stroke={isDark ? "#F8F6F1" : "#2F4325"}
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill={isDark ? "#2F4325" : "#FAF8F5"}
          />

          {/* Left Base Wing Petal */}
          <path
            d="M13.5 21C9 21.5 7.5 25.5 13.5 27.5C14.5 25.5 14.2 23 13.5 21Z"
            stroke={isDark ? "#B88B72" : "#2F4325"}
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill={isDark ? "#2F4325" : "#FAF8F5"}
          />

          {/* Right Base Wing Petal */}
          <path
            d="M22.5 21C27 21.5 28.5 25.5 22.5 27.5C21.5 25.5 21.8 23 22.5 21Z"
            stroke={isDark ? "#B88B72" : "#2F4325"}
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill={isDark ? "#2F4325" : "#FAF8F5"}
          />

          {/* Base Calyx Notch */}
          <circle
            cx="18"
            cy="25"
            r="1"
            fill={isDark ? "#D4AF37" : "#B88B72"}
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
