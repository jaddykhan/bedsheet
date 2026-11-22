export interface Product {
  id: string;
  slug: string;
  name: string;
  urduName?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  badge?: "Bestseller" | "New Arrival" | "Top Rated" | "Limited Stock" | "Sale" | "Hotel Luxury" | "Bridal";
  category: "Printed Bedsheets" | "Plain & Essentials" | "Luxury Collection" | "Bridal Collection" | "Hotel White & Stripes";
  fabric: "100% Combed Cotton" | "Cotton Sateen" | "Cotton Percale" | "Fine Cambric" | "Silk Satin" | "Easy-Care Polycotton";
  threadCount: string; // e.g. "300 TC Cotton Sateen", "200 TC Crisp Percale", "400 TC Egyptian Cotton feel"
  sheetTypes: ("Flat Sheet Set" | "Fitted Sheet Set" | "Complete Bed-in-Bag")[];
  sizes: ("Single" | "Double" | "King" | "Super King")[];
  images: string[];
  swatches: { name: string; hex: string }[];
  pattern: "Floral" | "Stripes" | "Plain Dyed" | "Traditional Ajrak" | "Geometric" | "Embroidered Damask";
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  viewersCount: number;
  features: string[];
  dimensions: {
    single: { flat: string; fitted: string; pillows: string };
    double: { flat: string; fitted: string; pillows: string };
    king: { flat: string; fitted: string; pillows: string };
  };
  careInstructions: string[];
  addOns?: {
    extraPillowsPrice: number;
    protectorPrice: number;
    cushionPrice: number;
  };
}

export const PRODUCTS: Product[] = [
  // 1. Meadow Bloom (Signature Floral Cotton)
  {
    id: "prod-1",
    slug: "meadow-bloom-bedsheet-set",
    name: "Meadow Bloom 100% Combed Cotton Set",
    urduName: "میڈو بلوم پیور کاٹن بیڈ شیٹ سیٹ",
    description:
      "Inspired by wild springtime blooms in Swat and Hunza. Woven from 100% long-staple Pakistani combed cotton with a breathable 200 TC percale weave that stays cool and gets noticeably softer after every wash.",
    price: 3290,
    compareAtPrice: 3990,
    badge: "Bestseller",
    category: "Printed Bedsheets",
    fabric: "100% Combed Cotton",
    threadCount: "200 TC Combed Cotton Percale",
    sheetTypes: ["Flat Sheet Set", "Fitted Sheet Set", "Complete Bed-in-Bag"],
    sizes: ["Single", "Double", "King"],
    pattern: "Floral",
    images: [
      "/images/products/meadow-bloom.jpg",
      "/images/ugc/bedroom-3.jpg",
      "/images/fabrics/pure-cotton.jpg",
      "/images/hero/hero-bedroom.jpg",
    ],
    swatches: [
      { name: "Sage Wildflower", hex: "#7E8E75" },
      { name: "Cream Botanical", hex: "#F3ECE2" },
      { name: "Blush Rose", hex: "#D8A798" },
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 384,
    viewersCount: 24,
    features: [
      "100% Pure Long-Staple Combed Cotton",
      "Color-fast reactive dyeing resistant to Pakistani hard water washing",
      "Deep 14-inch tuck-in drop prevents sheet slipping off thick mattresses",
      "Overlapping 8-inch envelope flap keeps pillow inserts completely hidden",
    ],
    dimensions: {
      single: {
        flat: "60 × 90 in (152 × 228 cm)",
        fitted: "42 × 78 + 14 in (107 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 1 Pillowcase",
      },
      double: {
        flat: "90 × 95 in (228 × 241 cm)",
        fitted: "66 × 78 + 14 in (168 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Pillowcases",
      },
      king: {
        flat: "108 × 95 in (274 × 241 cm)",
        fitted: "72 × 78 + 14 in (183 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Pillowcases",
      },
    },
    careInstructions: [
      "Machine wash warm with mild liquid detergent",
      "Wash dark prints separately for the first wash cycle",
      "Air dry in soft shade or tumble dry low",
      "Warm iron while damp for crisp boutique look",
    ],
    addOns: {
      extraPillowsPrice: 890,
      protectorPrice: 1490,
      cushionPrice: 690,
    },
  },

  // 2. Hotel White Sateen Stripe (The Linen Co. Style)
  {
    id: "prod-2",
    slug: "hotel-sateen-stripe-white",
    name: "300 TC Hotel Luxury Satin Stripe Set",
    urduName: "ہوٹل سٹن سٹرائپ لگژری بیڈ شیٹ سیٹ",
    description:
      "As seen in 5-star Pakistani luxury hotels. Lustrous 1 cm tone-on-tone sateen stripes woven from 300 thread count Egyptian-grade long staple cotton. Silky-soft hand feel, elegant natural sheen, and durable commercial-grade hemstitching.",
    price: 4490,
    compareAtPrice: 5490,
    badge: "Hotel Luxury",
    category: "Hotel White & Stripes",
    fabric: "Cotton Sateen",
    threadCount: "300 TC Luxury Cotton Sateen",
    sheetTypes: ["Flat Sheet Set", "Fitted Sheet Set", "Complete Bed-in-Bag"],
    sizes: ["Single", "Double", "King", "Super King"],
    pattern: "Stripes",
    images: [
      "/images/products/urban-stripe.jpg",
      "/images/inspiration/modern-minimal.jpg",
      "/images/fabrics/satin.jpg",
    ],
    swatches: [
      { name: "Crisp Hotel White", hex: "#FFFFFF" },
      { name: "Warm Ivory Cream", hex: "#FDFBF7" },
      { name: "Soft Silver Grey", hex: "#E4E4E6" },
    ],
    inStock: true,
    stockCount: 32,
    rating: 5.0,
    reviewCount: 512,
    viewersCount: 37,
    features: [
      "300 Thread Count 100% Mercerized Combed Cotton",
      "Signature 1 cm Woven Satin Stripe Luster",
      "Tailored 2-inch Oxford flange pillow border",
      "Bleach-safe and lint-free commercial grade finish",
    ],
    dimensions: {
      single: {
        flat: "66 × 100 in (168 × 254 cm)",
        fitted: "42 × 78 + 14 in (107 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 1 Oxford Pillowcase",
      },
      double: {
        flat: "90 × 100 in (228 × 254 cm)",
        fitted: "66 × 78 + 14 in (168 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Oxford Pillowcases",
      },
      king: {
        flat: "108 × 102 in (274 × 259 cm)",
        fitted: "72 × 78 + 14 in (183 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Oxford Pillowcases",
      },
    },
    careInstructions: [
      "Machine wash warm or hot with white detergent",
      "Do not use chlorine bleach with color stripes",
      "Steam iron for immaculate 5-star hotel finish",
    ],
    addOns: {
      extraPillowsPrice: 990,
      protectorPrice: 1490,
      cushionPrice: 790,
    },
  },

  // 3. Indigo Heritage (Multani & Sindhi Block Print)
  {
    id: "prod-3",
    slug: "indigo-heritage-bedsheet-set",
    name: "Indigo Heritage Multani Block Print Set",
    urduName: "انڈیگو ہیریٹیج ملتانی بلو بیڈ شیٹ سیٹ",
    description:
      "A tribute to Pakistan's rich textile heritage. Authentic indigo cobalt blue geometric block motifs inspired by Multani pottery and Sindhi ajrak artisans, re-engineered on fine 250 TC sateen weave cotton.",
    price: 3690,
    compareAtPrice: 4290,
    badge: "Top Rated",
    category: "Luxury Collection",
    fabric: "Cotton Sateen",
    threadCount: "250 TC Sateen Weave Cotton",
    sheetTypes: ["Flat Sheet Set", "Fitted Sheet Set", "Complete Bed-in-Bag"],
    sizes: ["Double", "King"],
    pattern: "Traditional Ajrak",
    images: [
      "/images/products/indigo-heritage.jpg",
      "/images/inspiration/traditional-charm.jpg",
      "/images/ugc/bedroom-1.jpg",
    ],
    swatches: [
      { name: "Royal Cobalt Indigo", hex: "#1D3557" },
      { name: "Deep Navy Blue", hex: "#14213D" },
      { name: "Ivory Canvas", hex: "#F8F6F1" },
    ],
    inStock: true,
    stockCount: 14,
    rating: 5.0,
    reviewCount: 452,
    viewersCount: 19,
    features: [
      "Artisanal heritage Ajrak & Multani tile inspired motifs",
      "Subtle sateen luster with weighted luxury drape",
      "Pre-shrunk fabric guaranteed not to lose size after washing",
      "Includes matching patterned decorative pillowcases",
    ],
    dimensions: {
      single: {
        flat: "60 × 90 in (152 × 228 cm)",
        fitted: "42 × 78 + 14 in (107 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 1 Pillowcase",
      },
      double: {
        flat: "90 × 95 in (228 × 241 cm)",
        fitted: "66 × 78 + 14 in (168 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Pillowcases",
      },
      king: {
        flat: "108 × 95 in (274 × 241 cm)",
        fitted: "72 × 78 + 14 in (183 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Pillowcases",
      },
    },
    careInstructions: [
      "First wash separate in cold water with gentle liquid soap",
      "Do not scrub directly on indigo pigments",
      "Line dry in shade to maintain color depth",
    ],
    addOns: {
      extraPillowsPrice: 890,
      protectorPrice: 1490,
      cushionPrice: 690,
    },
  },

  // 4. Rose Garden (Romantic Floral Combed Cotton)
  {
    id: "prod-4",
    slug: "rose-garden-bedsheet-set",
    name: "Rose Garden Vintage Floral Bedsheet Set",
    urduName: "روز گارڈن ونٹیج پھولدار بیڈ شیٹ",
    description:
      "Hand-painted English botanical roses in dusty blush pink and sage olive foliage across warm ivory background. Perfect for master bedrooms, bridal gifting, and summer relaxation.",
    price: 3290,
    compareAtPrice: 3990,
    badge: "Limited Stock",
    category: "Printed Bedsheets",
    fabric: "100% Combed Cotton",
    threadCount: "200 TC Percale Cotton",
    sheetTypes: ["Flat Sheet Set", "Fitted Sheet Set", "Complete Bed-in-Bag"],
    sizes: ["Single", "Double", "King"],
    pattern: "Floral",
    images: [
      "/images/products/rose-garden.jpg",
      "/images/hero/hero-bedroom.jpg",
      "/images/ugc/bedroom-2.jpg",
    ],
    swatches: [
      { name: "Blush Pink Rose", hex: "#C87D7D" },
      { name: "Olive Leaf", hex: "#5E6C54" },
      { name: "Ivory Base", hex: "#FAF6EF" },
    ],
    inStock: true,
    stockCount: 9,
    rating: 4.9,
    reviewCount: 312,
    viewersCount: 28,
    features: [
      "Ultra-soft breathable 100% combed cotton percale",
      "Vibrant fade-resistant pigment printing",
      "Deep 14-inch tuck-in drop",
      "Includes 1 Flat/Fitted Sheet + 2 Matching Pillowcases",
    ],
    dimensions: {
      single: {
        flat: "60 × 90 in (152 × 228 cm)",
        fitted: "42 × 78 + 14 in (107 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 1 Pillowcase",
      },
      double: {
        flat: "90 × 95 in (228 × 241 cm)",
        fitted: "66 × 78 + 14 in (168 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Pillowcases",
      },
      king: {
        flat: "108 × 95 in (274 × 241 cm)",
        fitted: "72 × 78 + 14 in (183 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Pillowcases",
      },
    },
    careInstructions: [
      "Machine wash cold or warm",
      "Turn pillowcases inside out before wash",
      "Iron while slightly damp",
    ],
    addOns: {
      extraPillowsPrice: 890,
      protectorPrice: 1490,
      cushionPrice: 690,
    },
  },

  // 5. Urban Stripe Minimal Cambric
  {
    id: "prod-5",
    slug: "urban-stripe-bedsheet-set",
    name: "Urban Stripe High-Density Cambric Set",
    urduName: "اربن سٹرائپ کیمبرک بیڈ شیٹ سیٹ",
    description:
      "A tailored Scandinavian minimalist stripe pattern woven on fine combed cambric cotton. Ultra-crisp, featherlight hand-feel, specially woven for hot Lahore and Karachi summer nights.",
    price: 3490,
    compareAtPrice: 4190,
    badge: "New Arrival",
    category: "Plain & Essentials",
    fabric: "Fine Cambric",
    threadCount: "220 TC High Density Cambric",
    sheetTypes: ["Flat Sheet Set", "Fitted Sheet Set"],
    sizes: ["Single", "Double", "King"],
    pattern: "Stripes",
    images: [
      "/images/products/urban-stripe.jpg",
      "/images/inspiration/modern-minimal.jpg",
      "/images/fabrics/cambric.jpg",
    ],
    swatches: [
      { name: "Oatmeal Grey", hex: "#D6CEBF" },
      { name: "Charcoal Slate", hex: "#4A4D4A" },
      { name: "Navy Pinstripe", hex: "#3A4A5E" },
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.8,
    reviewCount: 196,
    viewersCount: 15,
    features: [
      "High-density fine cambric yarn with crisp hand feel",
      "Resistant to pill, wrinkle, and fraying",
      "Clean modern tailored pillowcase edges",
      "Hypoallergenic & skin-friendly certified",
    ],
    dimensions: {
      single: {
        flat: "60 × 90 in (152 × 228 cm)",
        fitted: "42 × 78 + 14 in (107 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 1 Pillowcase",
      },
      double: {
        flat: "90 × 95 in (228 × 241 cm)",
        fitted: "66 × 78 + 14 in (168 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Pillowcases",
      },
      king: {
        flat: "108 × 95 in (274 × 241 cm)",
        fitted: "72 × 78 + 14 in (183 × 198 + 35 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 2 Pillowcases",
      },
    },
    careInstructions: [
      "Gentle machine wash under 30°C",
      "Do not bleach",
      "Medium steam iron",
    ],
    addOns: {
      extraPillowsPrice: 890,
      protectorPrice: 1490,
      cushionPrice: 690,
    },
  },

  // 6. Royal Damask 8-Piece Bridal Suite (The Linen Co. Bridal Style)
  {
    id: "prod-6",
    slug: "royal-damask-bridal-collection",
    name: "Royal Damask 8-Piece Embroidered Bridal Suite",
    urduName: "رائل ڈاماسک 8 پیس برائیڈل سیٹ",
    description:
      "Crafted for royal Pakistani weddings, trousseaus, and luxury master bedrooms. 400 TC silk satin sateen featuring gilded cord embroidery, heavy quilted winter comforter, 2 embroidered shams, 2 regular pillowcases, and 2 filled decorative cushions in a luxury zippered keepsake box.",
    price: 11990,
    compareAtPrice: 14990,
    badge: "Bridal",
    category: "Bridal Collection",
    fabric: "Silk Satin",
    threadCount: "400 TC Silk Satin Sheen",
    sheetTypes: ["Complete Bed-in-Bag", "Flat Sheet Set"],
    sizes: ["King", "Super King"],
    pattern: "Embroidered Damask",
    images: [
      "/images/categories/bridal-collection.jpg",
      "/images/fabrics/satin.jpg",
      "/images/hero/hero-bedroom.jpg",
    ],
    swatches: [
      { name: "Champagne Gold", hex: "#E8D8B8" },
      { name: "Royal Bridal Maroon", hex: "#6B1D28" },
      { name: "Pearl Ivory", hex: "#FFFDF6" },
    ],
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewCount: 142,
    viewersCount: 41,
    features: [
      "Complete 8-Piece Luxury Bridal Suite",
      "Includes: 1 King Sheet + 1 Heavy Quilted Comforter (350 GSM) + 2 Embroidered Shams + 2 Pillows + 2 Filled Cushions",
      "High-density silk satin sheen with anti-snag embroidery",
      "Comes packed in branded luxury trousseau zippered bridal case",
    ],
    dimensions: {
      single: {
        flat: "60 × 90 in",
        fitted: "42 × 78 in",
        pillows: "19 × 29 in",
      },
      double: {
        flat: "90 × 95 in",
        fitted: "66 × 78 in",
        pillows: "19 × 29 in",
      },
      king: {
        flat: "108 × 102 in (274 × 259 cm)",
        fitted: "72 × 78 + 16 in (183 × 198 + 40 cm)",
        pillows: "19 × 29 in (48 × 74 cm) — 4 Pillowcases & Shams",
      },
    },
    careInstructions: [
      "Dry clean recommended for bridal embroidery",
      "Delicate cold wash cycle with gentle silk wash detergent",
      "Low steam iron on reverse side",
    ],
    addOns: {
      extraPillowsPrice: 1290,
      protectorPrice: 1490,
      cushionPrice: 890,
    },
  },

  // 7. Olive Grove Solid Dyed Washed Percale
  {
    id: "prod-7",
    slug: "olive-grove-plain-essentials",
    name: "Olive Grove Washed Cotton Percale Set",
    urduName: "اولیو گروو پیور کاٹن پلین بیڈ شیٹ",
    description:
      "Garment washed for casual, lived-in softness. Woven in deep peaceful sage olive from 100% breathable Pakistani cotton that feels like your favorite worn-in vintage tee.",
    price: 3190,
    compareAtPrice: 3890,
    badge: "Sale",
    category: "Plain & Essentials",
    fabric: "100% Combed Cotton",
    threadCount: "200 TC Washed Cotton Percale",
    sheetTypes: ["Flat Sheet Set", "Fitted Sheet Set"],
    sizes: ["Single", "Double", "King"],
    pattern: "Plain Dyed",
    images: [
      "/images/categories/plain-essentials.jpg",
      "/images/fabrics/pure-cotton.jpg",
      "/images/inspiration/modern-minimal.jpg",
    ],
    swatches: [
      { name: "Sage Olive", hex: "#526453" },
      { name: "Earthy Terracotta", hex: "#B88B72" },
      { name: "Linen Sand", hex: "#D6CEBF" },
    ],
    inStock: true,
    stockCount: 26,
    rating: 4.8,
    reviewCount: 218,
    viewersCount: 16,
    features: [
      "Garment pre-washed for velvety matte touch",
      "Naturally wrinkle-friendly — no urgent ironing needed",
      "Pure breathable cotton for restful uninterrupted sleep",
      "Tailored 1-inch hem on flat sheet border",
    ],
    dimensions: {
      single: {
        flat: "60 × 90 in",
        fitted: "42 × 78 + 14 in",
        pillows: "19 × 29 in — 1 Pillowcase",
      },
      double: {
        flat: "90 × 95 in",
        fitted: "66 × 78 + 14 in",
        pillows: "19 × 29 in — 2 Pillowcases",
      },
      king: {
        flat: "108 × 95 in",
        fitted: "72 × 78 + 14 in",
        pillows: "19 × 29 in — 2 Pillowcases",
      },
    },
    careInstructions: [
      "Machine wash warm with like colors",
      "Tumble dry normal or air dry",
      "Steam iron optional",
    ],
    addOns: {
      extraPillowsPrice: 890,
      protectorPrice: 1490,
      cushionPrice: 690,
    },
  },

  // 8. Quilted Waterproof Mattress Protector (The Linen Co. Style Essential)
  {
    id: "prod-8",
    slug: "quilted-waterproof-mattress-protector",
    name: "Quilted Waterproof Breathable Mattress Protector",
    urduName: "واٹر پروف میٹریس پروٹیکٹر",
    description:
      "Protect your mattress from spills, stains, dust mites, and daily perspiration. Features an ultra-soft quilted cotton top with a noiseless 100% waterproof TPU breathable membrane and an all-around elastic fitted skirt.",
    price: 1890,
    compareAtPrice: 2490,
    badge: "Bestseller",
    category: "Plain & Essentials",
    fabric: "100% Combed Cotton",
    threadCount: "Quilted Polyfill with TPU Membrane",
    sheetTypes: ["Fitted Sheet Set"],
    sizes: ["Single", "Double", "King", "Super King"],
    pattern: "Plain Dyed",
    images: [
      "/images/fabrics/pure-cotton.jpg",
      "/images/categories/plain-essentials.jpg",
      "/images/hero/hero-bedroom.jpg",
    ],
    swatches: [
      { name: "Pure White", hex: "#FFFFFF" },
    ],
    inStock: true,
    stockCount: 45,
    rating: 5.0,
    reviewCount: 620,
    viewersCount: 33,
    features: [
      "100% Noiseless Waterproof TPU Underlayer",
      "Quilted 150 GSM plush hypoallergenic fill top",
      "Deep 16-inch elasticized skirt hugs thick mattresses tightly",
      "Machine washable 100+ cycles without cracking membrane",
    ],
    dimensions: {
      single: {
        flat: "42 × 78 + 14 in",
        fitted: "42 × 78 + 14 in (107 × 198 + 35 cm)",
        pillows: "Fitted Protector Skirt",
      },
      double: {
        flat: "66 × 78 + 14 in",
        fitted: "66 × 78 + 14 in (168 × 198 + 35 cm)",
        pillows: "Fitted Protector Skirt",
      },
      king: {
        flat: "72 × 78 + 16 in",
        fitted: "72 × 78 + 16 in (183 × 198 + 40 cm)",
        pillows: "Fitted Protector Skirt",
      },
    },
    careInstructions: [
      "Machine wash warm with mild liquid soap",
      "Do not use bleach or fabric softeners",
      "Air dry or tumble dry low heat only",
    ],
  },
];

export const CATEGORIES = [
  {
    title: "Printed Bedsheets",
    slug: "printed-bedsheets",
    description: "Vibrant botanical, floral and geometric Pakistani cotton prints.",
    image: "/images/categories/printed-bedsheets.jpg",
    itemCount: 24,
  },
  {
    title: "Hotel White & Stripes",
    slug: "hotel-white-stripes",
    description: "300 & 400 TC satin stripe sets used in luxury 5-star hotels across Pakistan.",
    image: "/images/products/urban-stripe.jpg",
    itemCount: 14,
  },
  {
    title: "Plain & Essentials",
    slug: "plain-essentials",
    description: "Serene solid hues and versatile washed percale staples for peaceful bedrooms.",
    image: "/images/categories/plain-essentials.jpg",
    itemCount: 16,
  },
  {
    title: "Luxury Collection",
    slug: "luxury-collection",
    description: "Sateen weaves, high thread counts, and heritage Multani block motifs.",
    image: "/images/categories/luxury-collection.jpg",
    itemCount: 18,
  },
  {
    title: "Bridal Collection",
    slug: "bridal-collection",
    description: "Opulent wedding suites, jacquard embroideries, comforters and trousseau boxes.",
    image: "/images/categories/bridal-collection.jpg",
    itemCount: 12,
  },
];

export const FABRICS = [
  {
    name: "100% Combed Cotton",
    tagline: "Breathable & Skin-Friendly",
    image: "/images/fabrics/pure-cotton.jpg",
    description:
      "100% natural long-staple Pakistani combed cotton. Highly absorbent, hypoallergenic, and naturally regulates sleep temperature throughout hot summers and mild winters.",
    threadCounts: "200 - 250 TC",
    bestFor: "Daily comfort, sensitive skin, Pakistani summer & all seasons",
  },
  {
    name: "Cotton Sateen",
    tagline: "Smooth, Silky Luster",
    image: "/images/fabrics/satin.jpg",
    description:
      "Woven with a lustrous four-over-one float yarn structure that creates a glossy surface and silky drape against the skin. Naturally friction-free for hair and skin.",
    threadCounts: "300 - 400 TC",
    bestFor: "5-Star hotel feel, bridal suites, anti-frizz beauty sleep",
  },
  {
    name: "Cotton Percale",
    tagline: "Crisp, Matte & Cool",
    image: "/images/fabrics/cambric.jpg",
    description:
      "Classic one-under-one-over weave with a crisp, matte hand feel. Extremely breathable and gets softer with every wash cycle.",
    threadCounts: "200 - 240 TC",
    bestFor: "Hot sleepers, crisp hotel linen feel, everyday durability",
  },
  {
    name: "Fine Cambric",
    tagline: "Lightweight Summer Lawn",
    image: "/images/fabrics/cambric.jpg",
    description:
      "Very fine, tightly spun combed cotton weave with a slight crisp finish. Incredibly light, cool, and ideal for breezy air-conditioned comfort.",
    threadCounts: "200 - 220 TC",
    bestFor: "Summer nights, crisp hotel feel, modern minimal looks",
  },
  {
    name: "Silk Satin",
    tagline: "Opulent Festive Luxury",
    image: "/images/categories/bridal-collection.jpg",
    description:
      "High-density bridal fabric with an exquisite radiant gleam. Ideal for wedding gifts, decorative cushions, and formal master bedrooms.",
    threadCounts: "400 TC High Density",
    bestFor: "Pakistani wedding trousseaus, bridal suites, festive gifts",
  },
  {
    name: "Easy-Care Polycotton",
    tagline: "Durable & Wrinkle Free",
    image: "/images/fabrics/polycotton.jpg",
    description:
      "A balanced cotton-polyester blend that withstands heavy family laundering. Quick drying, wrinkle resistant, and requires little to no ironing.",
    threadCounts: "180 - 200 TC",
    bestFor: "Busy households, kids' bedrooms, guest rooms, effortless care",
  },
];

export const REVIEWS = [
  {
    id: "rev-1",
    author: "Areeba K.",
    city: "Lahore (DHA Phase 6)",
    verified: true,
    rating: 5,
    text: "Fabric bohat soft hai aur print bilkul waise hi hai jaisa pictures mein tha. Size fits my 12-inch MoltyFoam mattress perfectly without slipping. Packing was just like The Linen Company!",
    productName: "Meadow Bloom Bedsheet Set",
    productImage: "/images/reviews/review-areeba.jpg",
    date: "14 May, 2026",
  },
  {
    id: "rev-2",
    author: "Hira M.",
    city: "Karachi (Clifton Block 4)",
    verified: true,
    rating: 5,
    text: "Quality zabardast hai, size bhi perfect fit hai. Multani style indigo print is gorgeous and the sateen luster feels genuinely 5-star. Delivery time par mil gayi via TCS.",
    productName: "Indigo Heritage Bedsheet Set",
    productImage: "/images/reviews/review-hira.jpg",
    date: "28 April, 2026",
  },
  {
    id: "rev-3",
    author: "Mariam S.",
    city: "Islamabad (F-8/2)",
    verified: true,
    rating: 5,
    text: "Delivery time par mil gayi aur packing bhi bohat achhi thi. Ordered the 300 TC Hotel Stripe set — identical to Pearl Continental hotel bedsheets! Highly recommend.",
    productName: "Hotel Luxury Satin Stripe Set",
    productImage: "/images/reviews/review-mariam.jpg",
    date: "03 May, 2026",
  },
  {
    id: "rev-4",
    author: "Zainab T.",
    city: "Faisalabad (Kohinoor City)",
    verified: true,
    rating: 5,
    text: "Being from Faisalabad (the textile hub), I'm very picky about bedsheet weave. Loom & Living exceeded my expectations. Thread count and stitch quality is top tier.",
    productName: "Urban Stripe Bedsheet Set",
    productImage: "/images/products/urban-stripe.jpg",
    date: "19 May, 2026",
  },
];

export const BEDROOM_INSPIRATION = [
  {
    title: "Floral Elegance",
    image: "/images/inspiration/floral-elegance.jpg",
    description: "Botanical blossoms paired with rattan furniture and warm lamplight.",
    tag: "Floral Elegance",
    collectionSlug: "printed-bedsheets",
  },
  {
    title: "Modern Minimal",
    image: "/images/inspiration/modern-minimal.jpg",
    description: "Clean architectural stripes on calm cream and wood accents.",
    tag: "Modern Minimal",
    collectionSlug: "plain-essentials",
  },
  {
    title: "Traditional Charm",
    image: "/images/inspiration/traditional-charm.jpg",
    description: "Royal indigo heritage motifs celebrating Pakistani textile roots.",
    tag: "Traditional Charm",
    collectionSlug: "luxury-collection",
  },
];

export const REAL_BEDROOMS = [
  {
    id: "ugc-1",
    customer: "Sana W.",
    city: "Lahore DHA",
    image: "/images/ugc/bedroom-1.jpg",
    product: "Indigo Heritage Bed Set",
  },
  {
    id: "ugc-2",
    customer: "Rabia A.",
    city: "Karachi Clifton",
    image: "/images/ugc/bedroom-2.jpg",
    product: "Rose Garden Blossom Set",
  },
  {
    id: "ugc-3",
    customer: "Nida F.",
    city: "Islamabad F-8",
    image: "/images/ugc/bedroom-3.jpg",
    product: "Meadow Bloom Bed Set",
  },
  {
    id: "ugc-4",
    customer: "Fatima B.",
    city: "Rawalpindi Bahria",
    image: "/images/ugc/bedroom-4.jpg",
    product: "Hotel Luxury Satin Stripe",
  },
];

export const SIZE_SPECIFICATIONS = [
  {
    id: "single",
    name: "Single",
    flatDimensions: "60 × 90 in (152 × 228 cm)",
    fittedDimensions: "42 × 78 + 14 in (107 × 198 + 35 cm)",
    mattressWidth: "36 - 42 in (Single / Twin)",
    mattressLength: "75 - 78 in",
    recommendedFor: "Children, teenagers, single beds, guest rooms",
    includes: "1 Sheet + 1 Pillowcase",
    pillowSize: "19 × 29 in + 8 in flap (48 × 74 cm)",
  },
  {
    id: "double",
    name: "Double / Queen",
    flatDimensions: "90 × 95 in (228 × 241 cm)",
    fittedDimensions: "66 × 78 + 14 in (168 × 198 + 35 cm)",
    mattressWidth: "54 - 60 in (Double / Queen)",
    mattressLength: "75 - 78 in",
    recommendedFor: "Standard double bed, couples, guest suites",
    includes: "1 Sheet + 2 Pillowcases",
    pillowSize: "19 × 29 in + 8 in flap (48 × 74 cm)",
  },
  {
    id: "king",
    name: "King (Standard Pakistani King)",
    flatDimensions: "108 × 95 in (274 × 241 cm)",
    fittedDimensions: "72 × 78 + 14 in (183 × 198 + 35 cm)",
    mattressWidth: "72 - 78 in (King size)",
    mattressLength: "78 - 84 in",
    recommendedFor: "Master bedroom, oversized king mattresses, thick pillowtop beds (Master MoltyFoam / Diamond)",
    includes: "1 Sheet + 2 Pillowcases",
    pillowSize: "19 × 29 in + 8 in flap (48 × 74 cm)",
  },
  {
    id: "super-king",
    name: "Super King / Oversized",
    flatDimensions: "108 × 102 in (274 × 259 cm)",
    fittedDimensions: "78 × 84 + 16 in (198 × 213 + 40 cm)",
    mattressWidth: "78 in+ Extra Wide King",
    mattressLength: "84 in",
    recommendedFor: "Imported oversized beds, super thick spring mattresses",
    includes: "1 Sheet + 2 Oxford Pillowcases",
    pillowSize: "19 × 29 in + 2 in flange (48 × 74 cm)",
  },
];
