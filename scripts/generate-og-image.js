import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

// Ensure public directory exists
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

const outputPath = join(publicDir, 'og-image.png');
const htmlPath = join(publicDir, 'og-preview.html');

console.log('🚀 Starting OG image generation...');
console.log(`📄 HTML file: ${htmlPath}`);
console.log(`💾 Output: ${outputPath}`);

try {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport to exact OG image dimensions
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2 // For retina quality
  });

  // Load the HTML file
  const fileUrl = `file://${htmlPath}`;
  console.log(`📖 Loading: ${fileUrl}`);
  
  await page.goto(fileUrl, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait a bit for fonts and images to load
  await page.waitForTimeout(2000);

  // Take screenshot
  console.log('📸 Taking screenshot...');
  await page.screenshot({
    path: outputPath,
    type: 'png',
    fullPage: false,
    clip: {
      x: 0,
      y: 0,
      width: 1200,
      height: 630
    }
  });

  await browser.close();

  console.log('✅ OG image generated successfully!');
  console.log(`📁 Saved to: ${outputPath}`);
  console.log('\n📝 Next steps:');
  console.log('1. Update index.html meta tags to use /og-image.png');
  console.log('2. Commit and push the changes');
  
} catch (error) {
  console.error('❌ Error generating OG image:', error);
  process.exit(1);
}

