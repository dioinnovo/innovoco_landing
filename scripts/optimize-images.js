const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const basename = path.basename(inputPath, ext);
  
  try {
    // Create WebP version
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(path.join(OUTPUT_DIR, `${basename}.webp`));
    
    // Create AVIF version (smaller but slower)
    await sharp(inputPath)
      .avif({ quality: 80 })
      .toFile(path.join(OUTPUT_DIR, `${basename}.avif`));
    
    // Optimize original format
    if (ext === '.png') {
      await sharp(inputPath)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(path.join(OUTPUT_DIR, `${basename}-optimized.png`));
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(OUTPUT_DIR, `${basename}-optimized.jpg`));
    }
    
    console.log(`✅ Optimized: ${basename}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error);
  }
}

// Process all images
async function processImages(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'optimized') {
      await processImages(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        await optimizeImage(filePath, OUTPUT_DIR);
      }
    }
  }
}

// Run optimization
console.log('🖼️  Starting image optimization...');
processImages(IMAGES_DIR)
  .then(() => console.log('✨ Image optimization complete!'))
  .catch(console.error);