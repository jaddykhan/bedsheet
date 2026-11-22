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
      ? "w-7 h-7"
      : size === "lg"
      ? "w-11 h-11"
      : "w-8 h-8 lg:w-9 lg:h-9";

  const titleSize =
    size === "sm"
      ? "text-lg tracking-tight"
      : size === "lg"
      ? "text-3xl tracking-tight"
      : "text-2xl lg:text-[26px] tracking-tight";

  const subSize =
    size === "sm"
      ? "text-[8px] tracking-[0.24em]"
      : size === "lg"
      ? "text-[10px] tracking-[0.28em]"
      : "text-[9px] tracking-[0.26em]";

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Handcrafted Emblem: Lotus Blossom & Artisan Weaving Loom Motif */}
      <div
        className={`${iconDimensions} shrink-0 transition-transform duration-300 ease-out group-hover:scale-105`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Central Petal / Cotton Pod Apex */}
          <path
            d="M20 4.5C17.5 11 17.5 21 20 28.5C22.5 21 22.5 11 20 4.5Z"
            stroke={isDark ? "#F8F6F1" : "#2F4325"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left Intermediate Petal */}
          <path
            d="M18.2 9.5C13.2 13.5 11 19.5 13 26.5C14.8 28 17.2 28.5 19 28.5"
            stroke={isDark ? "#F8F6F1" : "#2F4325"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Intermediate Petal */}
          <path
            d="M21.8 9.5C26.8 13.5 29 19.5 27 26.5C25.2 28 22.8 28.5 21 28.5"
            stroke={isDark ? "#F8F6F1" : "#2F4325"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left Wing / Outer Calyx */}
          <path
            d="M13 17.5C7.2 19.5 5.5 25.2 7.8 29C10.2 31.2 14.5 30.5 18 29.2"
            stroke={isDark ? "#B88B72" : "#526453"}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Wing / Outer Calyx */}
          <path
            d="M27 17.5C32.8 19.5 34.5 25.2 32.2 29C29.8 31.2 25.5 30.5 22 29.2"
            stroke={isDark ? "#B88B72" : "#526453"}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cradle Loom Arc / Base Foundation */}
          <path
            d="M10.5 32C15.8 35 24.2 35 29.5 32"
            stroke={isDark ? "#B88B72" : "#B88B72"}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Precious Artisan Seed / Core Gem Accent */}
          <circle
            cx="20"
            cy="21.5"
            r="1.4"
            fill={isDark ? "#B88B72" : "#B88B72"}
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline leading-none">
          <span
            className={`font-serif ${titleSize} font-semibold ${
              isDark ? "text-white" : "text-[#292D29]"
            }`}
          >
            Loom
          </span>
          <span
            className={`font-serif ${titleSize} font-normal italic mx-1.5 ${
              isDark ? "text-[#B88B72]" : "text-[#B88B72]"
            }`}
          >
            &amp;
          </span>
          <span
            className={`font-serif ${titleSize} font-semibold ${
              isDark ? "text-white" : "text-[#292D29]"
            }`}
          >
            Living
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-sans ${subSize} font-semibold uppercase mt-1 leading-none ${
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
      <Link href={href} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F4325] rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
