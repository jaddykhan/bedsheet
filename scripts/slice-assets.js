const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const refDir = path.join(__dirname, '../public/images/references');
const outBase = path.join(__dirname, '../public/images');

const ensureDir = (p) => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
};

async function slice() {
  ensureDir(path.join(outBase, 'hero'));
  ensureDir(path.join(outBase, 'categories'));
  ensureDir(path.join(outBase, 'products'));
  ensureDir(path.join(outBase, 'fabrics'));
  ensureDir(path.join(outBase, 'reviews'));
  ensureDir(path.join(outBase, 'inspiration'));
  ensureDir(path.join(outBase, 'ugc'));
  ensureDir(path.join(outBase, 'banners'));

  const img1 = path.join(refDir, 'media_1795255382375_73d2789f.jpg');
  const img2 = path.join(refDir, 'media_1795255393234_f11c8ac1.jpg');
  const img3 = path.join(refDir, 'media_1795255399808_74396b99.jpg');
  const img4 = path.join(refDir, 'media_1795255408352_a9a1e454.jpg');

  // Hero main image
  await sharp(img1)
    .extract({ left: 330, top: 88, width: 605, height: 288 })
    .toFile(path.join(outBase, 'hero', 'hero-bedroom.jpg'));

  // Categories (Image 1)
  // 1: Printed Bedsheets
  await sharp(img1)
    .extract({ left: 24, top: 525, width: 220, height: 140 })
    .toFile(path.join(outBase, 'categories', 'printed-bedsheets.jpg'));

  // 2: Plain & Essentials
  await sharp(img1)
    .extract({ left: 256, top: 525, width: 206, height: 140 })
    .toFile(path.join(outBase, 'categories', 'plain-essentials.jpg'));

  // 3: Luxury Collection
  await sharp(img1)
    .extract({ left: 474, top: 525, width: 212, height: 140 })
    .toFile(path.join(outBase, 'categories', 'luxury-collection.jpg'));

  // 4: Bridal Collection
  await sharp(img1)
    .extract({ left: 698, top: 525, width: 212, height: 140 })
    .toFile(path.join(outBase, 'categories', 'bridal-collection.jpg'));

  // Products (Image 1)
  // Meadow Bloom Bedsheet Set
  await sharp(img1)
    .extract({ left: 25, top: 760, width: 225, height: 175 })
    .toFile(path.join(outBase, 'products', 'meadow-bloom.jpg'));

  // Urban Stripe Bedsheet Set
  await sharp(img1)
    .extract({ left: 260, top: 760, width: 206, height: 175 })
    .toFile(path.join(outBase, 'products', 'urban-stripe.jpg'));

  // Indigo Heritage Bedsheet Set
  await sharp(img1)
    .extract({ left: 478, top: 760, width: 208, height: 175 })
    .toFile(path.join(outBase, 'products', 'indigo-heritage.jpg'));

  // Rose Garden Bedsheet Set
  await sharp(img1)
    .extract({ left: 698, top: 760, width: 212, height: 175 })
    .toFile(path.join(outBase, 'products', 'rose-garden.jpg'));

  // Build Your Bed Set Preview (Image 2)
  await sharp(img2)
    .extract({ left: 280, top: 28, width: 430, height: 255 })
    .toFile(path.join(outBase, 'hero', 'customizer-bed.jpg'));

  // Fabrics (Image 2)
  // Pure Cotton
  await sharp(img2)
    .extract({ left: 16, top: 372, width: 222, height: 162 })
    .toFile(path.join(outBase, 'fabrics', 'pure-cotton.jpg'));

  // Polycotton
  await sharp(img2)
    .extract({ left: 250, top: 372, width: 214, height: 162 })
    .toFile(path.join(outBase, 'fabrics', 'polycotton.jpg'));

  // Satin
  await sharp(img2)
    .extract({ left: 472, top: 372, width: 216, height: 162 })
    .toFile(path.join(outBase, 'fabrics', 'satin.jpg'));

  // Cambric
  await sharp(img2)
    .extract({ left: 695, top: 372, width: 222, height: 162 })
    .toFile(path.join(outBase, 'fabrics', 'cambric.jpg'));

  // Reviews thumbnails (Image 2)
  await sharp(img2)
    .extract({ left: 64, top: 658, width: 118, height: 100 })
    .toFile(path.join(outBase, 'reviews', 'review-areeba.jpg'));

  await sharp(img2)
    .extract({ left: 368, top: 658, width: 106, height: 100 })
    .toFile(path.join(outBase, 'reviews', 'review-hira.jpg'));

  await sharp(img2)
    .extract({ left: 654, top: 658, width: 120, height: 100 })
    .toFile(path.join(outBase, 'reviews', 'review-mariam.jpg'));

  // Bedroom Inspiration (Image 2)
  await sharp(img2)
    .extract({ left: 252, top: 805, width: 216, height: 175 })
    .toFile(path.join(outBase, 'inspiration', 'floral-elegance.jpg'));

  await sharp(img2)
    .extract({ left: 480, top: 805, width: 215, height: 175 })
    .toFile(path.join(outBase, 'inspiration', 'modern-minimal.jpg'));

  await sharp(img2)
    .extract({ left: 706, top: 805, width: 214, height: 175 })
    .toFile(path.join(outBase, 'inspiration', 'traditional-charm.jpg'));

  // Real Bedrooms, Real Customers (Image 3)
  await sharp(img3)
    .extract({ left: 14, top: 495, width: 220, height: 225 })
    .toFile(path.join(outBase, 'ugc', 'bedroom-1.jpg'));

  await sharp(img3)
    .extract({ left: 245, top: 495, width: 218, height: 225 })
    .toFile(path.join(outBase, 'ugc', 'bedroom-2.jpg'));

  await sharp(img3)
    .extract({ left: 472, top: 495, width: 218, height: 225 })
    .toFile(path.join(outBase, 'ugc', 'bedroom-3.jpg'));

  await sharp(img3)
    .extract({ left: 700, top: 495, width: 220, height: 225 })
    .toFile(path.join(outBase, 'ugc', 'bedroom-4.jpg'));

  // Newsletter folded bedsheet stack (Image 3)
  await sharp(img3)
    .extract({ left: 0, top: 765, width: 275, height: 195 })
    .toFile(path.join(outBase, 'banners', 'folded-bedsheets.jpg'));

  console.log('Successfully cropped and saved all reference assets!');
}

slice().catch(console.error);
