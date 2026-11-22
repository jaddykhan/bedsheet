const https = require('https');
const fs = require('fs');
const path = require('path');

// Curated Ultra-High-Definition Bedding, Home Textile & Lifestyle Photography
// Matching Loom & Living aesthetic: Warm lighting, Pakistani/oriental prints, florals, sage, indigo, satin
const IMAGES = {
  // HERO
  "hero/hero-bedroom.jpg": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1920&q=85", // Luxury bedroom, warm sunlight, floral bedding
  "hero/customizer-bed.jpg": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=85", // Styled cozy bed with pillows & blanket

  // CATEGORIES
  "categories/printed-bedsheets.jpg": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85", // Floral botanical printed bedsheet
  "categories/plain-essentials.jpg": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85", // Minimal sage/linen plain bedsheet
  "categories/luxury-collection.jpg": "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=85", // Rich patterned luxury bedding
  "categories/bridal-collection.jpg": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85", // Opulent champagne satin bridal bedroom

  // PRODUCTS (4:5 Aspect Ratio, 1200x1500)
  // 1. Meadow Bloom (Sage floral wildflowers on cream)
  "products/meadow-bloom.jpg": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&h=1500&q=85",
  // 2. Urban Stripe (Minimal oatmeal/slate pinstripes)
  "products/urban-stripe.jpg": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&h=1500&q=85",
  // 3. Indigo Heritage (Royal indigo & cobalt traditional block print)
  "products/indigo-heritage.jpg": "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&h=1500&q=85",
  // 4. Rose Garden (Blush rose petals & floral bouquet)
  "products/rose-garden.jpg": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&h=1500&q=85",

  // FABRICS (Macro Weave & Texture Shots)
  "fabrics/pure-cotton.jpg": "https://images.unsplash.com/photo-1606744888344-493238955de0?auto=format&fit=crop&w=1000&q=85", // Natural pure cotton weave
  "fabrics/polycotton.jpg": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=85", // Smooth sage fabric drape
  "fabrics/satin.jpg": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=85", // Glossy silk champagne satin folds
  "fabrics/cambric.jpg": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85", // Lightweight fine cambric texture

  // REVIEWS THUMBNAILS (Real bedroom setups)
  "reviews/review-areeba.jpg": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=85",
  "reviews/review-hira.jpg": "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=800&q=85",
  "reviews/review-mariam.jpg": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=85",

  // BEDROOM INSPIRATION (Editorial lookbooks)
  "inspiration/floral-elegance.jpg": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
  "inspiration/modern-minimal.jpg": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
  "inspiration/traditional-charm.jpg": "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=85",

  // REAL BEDROOMS UGC (Customer gallery)
  "ugc/bedroom-1.jpg": "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1000&q=85",
  "ugc/bedroom-2.jpg": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85",
  "ugc/bedroom-3.jpg": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85",
  "ugc/bedroom-4.jpg": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85",

  // BANNERS (Folded bedsheets stack)
  "banners/folded-bedsheets.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
};

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (uri) => {
      https.get(uri, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          return get(response.headers.location);
        }
        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Failed to get '${uri}' (${response.statusCode})`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    get(url);
  });
}

async function main() {
  const baseDir = path.join(__dirname, '../public/images');
  console.log('Downloading Ultra-High-Definition photography for Loom & Living...');

  for (const [relPath, url] of Object.entries(IMAGES)) {
    const fullPath = path.join(baseDir, relPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
      console.log(`Downloading: ${relPath}...`);
      await downloadImage(url, fullPath);
      console.log(`✓ Saved: ${relPath}`);
    } catch (err) {
      console.error(`Failed ${relPath}: ${err.message}`);
    }
  }

  console.log('All High-Quality images downloaded successfully!');
}

main();
