import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

async function run() {
  console.log('🚀 Starting screenshot capture session...');
  
  // Ensure public/assets directory exists
  await mkdir('public/assets', { recursive: true });
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  // Navigate to local dev server
  console.log('📡 Connecting to local dev server at http://localhost:5173/...');
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 8000 });
  } catch (e) {
    console.error('❌ Error: Could not connect to http://localhost:5173/.');
    console.error('👉 Please make sure the local dev server is running (npm run dev) before running this script.');
    await browser.close();
    process.exit(1);
  }
  
  // 1. Capture landing hero in Dark Mode
  console.log('📸 Capturing landing-hero.png (Dark Mode)...');
  await page.screenshot({ path: 'public/assets/landing-hero.png' });
  
  // 2. Scroll to presets section
  console.log('⬇️ Scrolling to presets catalog...');
  const gallery = page.locator('#gallery');
  if (await gallery.count() > 0) {
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    console.log('📸 Capturing landing-presets.png...');
    await page.screenshot({ path: 'public/assets/landing-presets.png' });
  }
  
  // 3. Launch playground via Open Studio
  console.log('⚡ Launching workspace playground...');
  const openStudioBtn = page.getByRole('button', { name: 'Open Studio' });
  if (await openStudioBtn.count() > 0) {
    await openStudioBtn.click();
  } else {
    // Fallback: Click first preset card
    const firstCard = page.locator('.group.flex.flex-col').first();
    await firstCard.click();
  }
  
  await page.waitForTimeout(3500); // Wait for workspace canvas and iframe elements preview
  
  // Capture playground workspace
  console.log('📸 Capturing workspace-split-view.png...');
  await page.screenshot({ path: 'public/assets/workspace-split-view.png' });
  
  // 4. Switch to Unlayer editor
  console.log('🎨 Switching to Unlayer Drag & Drop Editor...');
  const editorBtn = page.getByRole('button', { name: 'Launch Drag & Drop Editor' });
  if (await editorBtn.count() > 0) {
    await editorBtn.click();
    await page.waitForTimeout(6000); // Wait for Unlayer editor to fetch scripts and load iframe canvas
    console.log('📸 Capturing unlayer-editor.png...');
    await page.screenshot({ path: 'public/assets/unlayer-editor.png' });
  }
  
  await browser.close();
  console.log('✅ Screenshots captured and saved successfully in public/assets/!');
}

run().catch(err => {
  console.error('❌ Capture failed:', err);
  process.exit(1);
});
