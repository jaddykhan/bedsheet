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

  // Sizing definitions
  const iconDimensions =
    size === "sm"
      ? "w-8 h-8"
      : size === "lg"
      ? "w-12 h-12"
      : "w-10 h-10";

  const titleSize =
    size === "sm"
      ? "text-lg tracking-tight"
      : size === "lg"
      ? "text-3xl tracking-tight"
      : "text-2xl lg:text-[27px] tracking-tight";

  const subSize =
    size === "sm"
      ? "text-[8px] tracking-[0.28em]"
      : size === "lg"
      ? "text-[10px] tracking-[0.32em]"
      : "text-[9px] tracking-[0.3em]";

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Newly Redesigned Bespoke Monogram: Interlocking Loom & Cotton Crest */}
      <div
        className={`${iconDimensions} shrink-0 transition-transform duration-300 ease-out group-hover:scale-105`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Subtle Outer Medallion Diamond Frame */}
          <rect
            x="24"
            y="4"
            width="28"
            height="28"
            rx="5"
            transform="rotate(45 24 4)"
            stroke={isDark ? "#B88B72" : "#B88B72"}
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.6"
          />

          {/* Solid Inner Diamond Shield */}
          <rect
            x="24"
            y="7"
            width="24"
            height="24"
            rx="4"
            transform="rotate(45 24 7)"
            stroke={isDark ? "#F8F6F1" : "#2F4325"}
            strokeWidth="1.8"
            fill={isDark ? "#24351D" : "#FAF8F5"}
          />

          {/* Interlocking Monogram: Left 'L' (Loom) */}
          <path
            d="M19 14V29C19 30.5 20.2 31.5 22 31.5H27"
            stroke={isDark ? "#F8F6F1" : "#2F4325"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interlocking Monogram: Right 'L' (Living - Inverted & Weaved) */}
          <path
            d="M29 34V19C29 17.5 27.8 16.5 26 16.5H21"
            stroke={isDark ? "#B88B72" : "#B88B72"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Warp & Weft Thread Knot */}
          <circle
            cx="24"
            cy="24"
            r="2"
            fill={isDark ? "#D4AF37" : "#B88B72"}
          />

          {/* Top Apex: Royal Cotton Blossom Crown */}
          <path
            d="M21 7.5C22.2 6 24 5.2 24 5.2C24 5.2 25.8 6 27 7.5"
            stroke={isDark ? "#B88B72" : "#526453"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Bottom Foundation Accent */}
          <path
            d="M22 41C23 41.8 24 42.2 24 42.2C24 42.2 25 41.8 26 41"
            stroke={isDark ? "#B88B72" : "#B88B72"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline leading-none">
          <span
            className={`font-serif ${titleSize} font-bold ${
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
            className={`font-serif ${titleSize} font-bold ${
              isDark ? "text-white" : "text-[#1F2E19]"
            }`}
          >
            Living
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-sans ${subSize} font-bold uppercase mt-1 leading-none ${
              isDark ? "text-[#C8BFB3]" : "text-[#5C6656]"
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
