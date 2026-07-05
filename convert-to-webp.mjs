import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public', 'sequence');
const outputDir = path.join(process.cwd(), 'public', 'sequence_webp');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} images to convert.`);
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));
    
    await sharp(inputPath)
      .webp({ quality: 80 }) // 80 is a good balance between size and quality
      .toFile(outputPath);
      
    process.stdout.write(`\rConverted: ${file}`);
  }
  console.log('\nConversion complete.');
}

convertImages().catch(console.error);
