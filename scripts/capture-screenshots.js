import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

async function run() {
  console.log('🚀 Starting screenshot capture session for Light/Dark modes & 5 template presets...');
  
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
  console.log('📸 Capturing landing-hero-dark.png...');
  await page.screenshot({ path: 'public/assets/landing-hero-dark.png' });
  
  // 2. Toggle to Light Mode on Landing Page
  console.log('🌓 Toggling to Light Mode...');
  const themeToggle = page.locator('button[title="Switch to Light Mode"]').first();
  if (await themeToggle.count() > 0) {
    await themeToggle.click();
    await page.waitForTimeout(600);
  }
  
  // 3. Capture landing hero in Light Mode
  console.log('📸 Capturing landing-hero-light.png...');
  await page.screenshot({ path: 'public/assets/landing-hero-light.png' });
  
  // 4. Scroll to presets section
  console.log('⬇️ Scrolling to presets catalog...');
  const gallery = page.locator('#gallery');
  if (await gallery.count() > 0) {
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    console.log('📸 Capturing landing-presets-light.png...');
    await page.screenshot({ path: 'public/assets/landing-presets-light.png' });
  }
  
  // 5. Switch back to Dark Mode
  console.log('🌓 Toggling back to Dark Mode...');
  const darkToggle = page.locator('button[title="Switch to Dark Mode"]').first();
  if (await darkToggle.count() > 0) {
    await darkToggle.click();
    await page.waitForTimeout(600);
  }
  console.log('📸 Capturing landing-presets-dark.png...');
  await page.screenshot({ path: 'public/assets/landing-presets-dark.png' });

  // 6. Launch playground via Open Studio
  console.log('⚡ Launching workspace playground...');
  const openStudioBtn = page.getByRole('button', { name: 'Open Studio' });
  if (await openStudioBtn.count() > 0) {
    await openStudioBtn.click();
  } else {
    const firstCard = page.locator('.group.flex.flex-col').first();
    await firstCard.click();
  }
  
  await page.waitForTimeout(3500); // Wait for workspace and iframe previews
  
  // 7. Capture workspace split-view in Dark Mode
  console.log('📸 Capturing workspace-split-view-dark.png...');
  await page.screenshot({ path: 'public/assets/workspace-split-view-dark.png' });
  
  // 8. Toggle workspace to Light Mode
  console.log('🌓 Toggling workspace to Light Mode...');
  const workspaceLightToggle = page.locator('button[title="Switch to Light Mode"]').first();
  if (await workspaceLightToggle.count() > 0) {
    await workspaceLightToggle.click();
    await page.waitForTimeout(800);
  }
  
  // 9. Capture workspace split-view in Light Mode
  console.log('📸 Capturing workspace-split-view-light.png...');
  await page.screenshot({ path: 'public/assets/workspace-split-view-light.png' });
  
  // 10. Capture 5 specific templates from the email client view
  console.log('🔍 Locating select preset dropdown and template preview iframe...');
  const selectDropdown = page.locator('select').first();
  const emailIframe = page.locator('iframe[title="Dashboard Email View"]').first();
  
  if (await selectDropdown.count() > 0 && await emailIframe.count() > 0) {
    const presetsToCapture = [
      { id: 'weekly-digest', filename: 'template-weekly-digest.png' },
      { id: 'founder-letter', filename: 'template-founder-letter.png' },
      { id: 'new-collection', filename: 'template-new-collection.png' },
      { id: 'flash-sale', filename: 'template-flash-sale.png' },
      { id: 'product-launch', filename: 'template-product-launch.png' }
    ];
    
    for (const preset of presetsToCapture) {
      console.log(`📋 Selecting preset: ${preset.id}...`);
      await selectDropdown.selectOption(preset.id);
      await page.waitForTimeout(2000); // Wait for compilation and reload
      
      console.log(`📸 Capturing ${preset.filename} (Iframe element capture)...`);
      await emailIframe.screenshot({ path: `public/assets/${preset.filename}` });
    }
  } else {
    console.warn('⚠️ Could not find select dropdown or preview iframe to capture templates.');
  }
  
  // 11. Switch to Unlayer editor
  console.log('🎨 Switching to Unlayer Drag & Drop Editor...');
  const editorBtn = page.getByRole('button', { name: 'Launch Drag & Drop Editor' });
  if (await editorBtn.count() > 0) {
    await editorBtn.click();
    await page.waitForTimeout(6000); // Wait for Unlayer editor iframe
    console.log('📸 Capturing unlayer-editor.png...');
    await page.screenshot({ path: 'public/assets/unlayer-editor.png' });
  }
  
  await browser.close();
  console.log('✅ All screenshots captured and saved successfully in public/assets/!');
}

run().catch(err => {
  console.error('❌ Capture failed:', err);
  process.exit(1);
});
