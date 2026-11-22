const https = require('https');
const fs = require('fs');
const path = require('path');

const REMAINING = {
  // Traditional Royal Indigo Blue Patterned Luxury Bedding
  "categories/luxury-collection.jpg": "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=85",
  "products/indigo-heritage.jpg": "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&h=1500&q=85",
  "inspiration/traditional-charm.jpg": "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=85",
  "ugc/bedroom-1.jpg": "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1000&q=85",
  "reviews/review-hira.jpg": "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=85",

  // Pure Cotton Macro Texture
  "fabrics/pure-cotton.jpg": "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=85",
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
  for (const [relPath, url] of Object.entries(REMAINING)) {
    const fullPath = path.join(baseDir, relPath);
    try {
      await downloadImage(url, fullPath);
      console.log(`✓ Successfully downloaded: ${relPath}`);
    } catch (e) {
      console.error(`Failed ${relPath}: ${e.message}`);
    }
  }
}

main();
