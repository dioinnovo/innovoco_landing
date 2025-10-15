const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Enable console logging
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    
    if (text.includes('Analytics') || text.includes('Qualification') || text.includes('Conversation')) {
      console.log(`[${type.toUpperCase()}] ${text}`);
      
      // Try to get the actual object
      msg.args().forEach(async (arg) => {
        try {
          const val = await arg.jsonValue();
          if (typeof val === 'object' && val !== null) {
            console.log('DATA:', JSON.stringify(val, null, 2));
          }
        } catch (e) {
          // Ignore serialization errors
        }
      });
    }
  });
  
  // Log network requests to /api/orchestrate
  page.on('request', request => {
    if (request.url().includes('/api/orchestrate')) {
      console.log('\n📤 REQUEST:', request.method(), request.url());
      if (request.method() === 'POST') {
        console.log('BODY:', request.postData());
      }
    }
  });
  
  page.on('response', response => {
    if (response.url().includes('/api/orchestrate')) {
      response.text().then(body => {
        try {
          const data = JSON.parse(body);
          console.log('\n📥 RESPONSE:', response.status());
          console.log('DATA:', JSON.stringify(data, null, 2));
        } catch (e) {
          console.log('Response:', body);
        }
      }).catch(() => {});
    }
  });
  
  // Navigate to the site
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  // Wait for and click the chat orb
  await page.waitForSelector('button[aria-label="Open virtual assistant"]', { timeout: 5000 });
  await page.click('button[aria-label="Open virtual assistant"]');
  
  console.log('✅ Chat opened - monitoring...\n');
  
  // Keep the browser open
  await new Promise(() => {});
})();