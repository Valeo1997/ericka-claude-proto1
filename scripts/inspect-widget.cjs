const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // Wait for widget to load
  await page.waitForTimeout(3000);
  
  const cssVars = await page.evaluate(() => {
    const el = document.querySelector('elevenlabs-convai');
    if (!el) return 'No widget found';
    
    // Check shadow DOM
    const shadow = el.shadowRoot;
    if (!shadow) return 'No shadow DOM';
    
    // Get all styles in shadow DOM
    const styles = Array.from(shadow.querySelectorAll('style')).map(s => s.textContent).join('\n');
    return styles;
  });
  
  console.log(cssVars);
  await browser.close();
})();
