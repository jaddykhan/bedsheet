const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const dir = path.join(__dirname, '../public/images/references');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  for (const f of files) {
    const meta = await sharp(path.join(dir, f)).metadata();
    console.log(`${f}: ${meta.width}x${meta.height}`);
  }
}
main();
