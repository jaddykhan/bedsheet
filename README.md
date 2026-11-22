# Loom & Living — Premium Pakistani Bedsheets & Home Textiles

Loom & Living is an elegant, sophisticated Pakistani bedsheet e-commerce platform built with Next.js App Router, TypeScript, Tailwind CSS, Radix UI primitives, Lucide Icons, and Prisma ORM.

The platform is visually faithful to the uploaded reference designs, recreating the warm editorial atmosphere, typography hierarchy, responsive layouts, Pakistani textile specifications, and frictionless checkout flows.

---

## 🎨 Visual Design System

- **Background Canvas**: `#F8F6F1` (warm natural cream)
- **Secondary Surfaces**: `#E8DED0` (warm sand / linen)
- **Primary Dark Olive**: `#2F4325` (rich heritage dark olive)
- **Sage Green**: `#526453`
- **Accent Terracotta**: `#B88B72`
- **Primary Text**: `#292D29`
- **Heading Typography**: Cormorant Garamond (refined serif)
- **Body Typography**: DM Sans
- **Container Max-Width**: `1320px` (desktop padding 40-48px, tablet 24-32px, mobile 16-20px)
- **Card Radius**: `12px – 24px` | **Button Radius**: `8px – 9999px`

---

## 🏛 Homepage Architecture (Built in Exact Order)

1. **Announcement Bar + Premium Navbar + Hero**:
   - Dark olive top bar with nationwide shipping perks and currency picker.
   - Lotus/flower emblem logo, Bedsheets & Collections dropdowns, search modal, wishlist badge, cart drawer badge, sticky scroll behavior.
   - Hero banner: *"Bedsheets for Every Home"*, *"Shop Now ->"*, interactive *"Watch Collection"* video modal, and carousel pagination.
2. **Trust Benefits Strip**:
   - Premium Fabrics, Nationwide Delivery, Easy Returns, Secure Payments.
3. **Shop by Category**:
   - 4 lifestyle cards: *Printed Bedsheets*, *Plain & Essentials*, *Luxury Collection*, *Bridal Collection* with hover zoom and circular arrow pills.
4. **Bestselling Bedsheets**:
   - 4-column responsive grid with real filtering pills (*All*, *Single*, *Double*, *King*).
   - Product cards: *Meadow Bloom*, *Urban Stripe*, *Indigo Heritage*, *Rose Garden* with badges, swatches, quick view modal, and quick add-to-bag.
5. **Interactive Build Your Bed Set**:
   - Split layout with bedroom preview and 3-step configurator:
     - 1. Choose Fabric (*Pure Cotton*, *Polycotton*, *Satin*)
     - 2. Choose Size (*Single*, *Double*, *King*)
     - 3. Choose Pieces (*Bedsheet*, *Pillow Covers*, *Comforter*)
   - Live price calculation, real inventory validation, and bundle add-to-cart.
6. **Shop by Fabric**:
   - Macro photography cards for *Pure Cotton*, *Polycotton*, *Satin*, and *Cambric* with direct link to Fabric Guide.
7. **Customer Reviews**:
   - Overall rating pill: `4.8/5` with 5 stars (`12,400+ Reviews`).
   - Customer bedroom photo cards with Roman Urdu & English verified buyer feedback from Lahore, Karachi, and Islamabad with carousel navigation.
8. **Bedroom Inspiration**:
   - Lookbook styling cards: *Floral Elegance*, *Modern Minimal*, *Traditional Charm*.
9. **Why Choose Us**:
   - Warm bedroom backdrop with 5 floating benefit cards (*Premium Quality*, *Nationwide Delivery*, *Easy Returns*, *Secure Payments*, *Customer Support*).
10. **Real Bedrooms, Real Customers**:
    - 4-photo customer bedroom gallery with interactive Lightbox and *"Share Your Setup"* modal.
11. **Newsletter**:
    - Full-width dark olive banner with folded bedsheet stack image, email validation, and perks.
12. **Bedsheet Size Guide**:
    - *Single (60x90 in)*, *Double (90x95 in)*, *King (108x95 in)* cards with bed outline icons.
    - Interactive **Smart Size Finder** calculator for mattress width, length, and depth.
13. **Customer Support**:
    - Dedicated WhatsApp assistance section with prefilled inquiry message, phone helpline, and order tracking links.
14. **Full Premium Footer**:
    - Dark olive background, Pakistan Home Textiles brand story, column links, social icons, and *"Proudly Pakistani"* badge.

---

## 🇵🇰 Pakistan-Specific Shopping Features

- **PKR Currency**: Formatted as `Rs. 3,290` across all cards, drawers, and checkout screens.
- **Payment Methods**:
  - Cash on Delivery (COD) with courier inspection assurance.
  - Architecture and configuration points for JazzCash, Easypaisa, and Debit/Credit cards.
- **Delivery Rules**:
  - Free Nationwide Delivery on orders above **Rs. 3,000**.
  - Dynamic free delivery progress meter in cart drawer and checkout.
  - Standard flat delivery fee (Rs. 250) for orders below threshold.
- **Address & Phone Validation**:
  - Pakistani provinces and all major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, etc.).
  - Pakistani mobile number validation (`03xx-xxxxxxx` or `+923xxxxxxxxx`).
- **Roman Urdu & English Search**:
  - Synonyms recognized: `chaddar`, `chadar`, `bed set`, `shadi`, `floral`, `ajrak`, `cotton`, etc.
- **Live Order Tracking**:
  - Track by Order Number (`LL-PK-10491`) or phone number across 4 fulfillment stages: *Placed*, *Processing*, *Dispatched (TCS/Leopards)*, *Delivered*.

---

## 🛠 Additional Pages Included

- `/collections` & `/collections/[slug]` — Real category, fabric, size, and price filters
- `/products/[slug]` — Product detail with zoomable gallery, size pills, dimension table, care instructions, WhatsApp inquiry
- `/build-your-bed` — Dedicated customizer page
- `/cart` — Dedicated cart page
- `/checkout` — Pakistan-specific checkout with COD and mobile wallet options
- `/order-confirmation/[orderId]` — Order success screen with timeline and receipt
- `/track-order` — Live tracking portal
- `/wishlist` — Persistent saved items with one-click Add to Bag
- `/size-guide` — Detailed mattress guide and smart compatibility calculator
- `/fabric-guide` — Guide to Pakistani cotton weaves, thread counts, cambric, and satin
- `/lookbook` — Editorial bedroom gallery
- `/account` — Customer profile and order history
- `/admin` — Full Admin Dashboard with sales KPIs, order fulfillment status, inventory stock controls, and review moderation
- `/help/returns`, `/help/shipping-policy`, `/help/privacy-policy`, `/help/faqs`, `/about`, `/contact`, `/help/terms`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Start
```bash
npm run build
npm start
```
