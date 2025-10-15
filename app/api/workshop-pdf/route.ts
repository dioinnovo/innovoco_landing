import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  try {
    // Launch Puppeteer with optimized settings for high-quality PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-font-subpixel-positioning', // Better font rendering
        '--disable-lcd-text',                   // Cleaner text
        '--print-to-pdf-no-header',            // Cleaner output
        '--disable-web-security',              // Allow local fonts
        '--font-render-hinting=none',          // Better font quality
        '--disable-gpu',                       // More consistent rendering
        '--run-all-compositor-stages-before-draw' // Ensure full rendering
      ]
    });

    const page = await browser.newPage();

    // Get the base URL from the request
    const baseUrl = request.nextUrl.origin;
    const workshopUrl = `${baseUrl}/projects/ai-discovery-workshop`;

    // Set ultra high-quality viewport for sharp rendering
    await page.setViewport({ 
      width: 2880,  // 4K resolution
      height: 1800,
      deviceScaleFactor: 3 // Ultra high-DPI rendering
    });

    // Navigate to the workshop page
    console.log('🌐 Navigating to workshop URL:', workshopUrl);
    await page.goto(workshopUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000 // Longer timeout for high-quality rendering
    });
    
    console.log('📷 Taking screenshot 1: Initial page load');
    await page.screenshot({ 
      path: 'debug-1-initial.png', 
      fullPage: true,
      type: 'png'
    });

    // Generate PDF with print media type
    await page.emulateMediaType('print');
    
    // Disable all animations in print mode only
    await page.addStyleTag({
      content: `
        @media print {
          /* Disable ALL animations and transitions */
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
            animation-iteration-count: 1 !important;
            animation-fill-mode: both !important;
          }
          
          /* Force all motion elements visible immediately */
          [data-framer-name] {
            opacity: 1 !important;
            transform: none !important;
            visibility: visible !important;
          }
          
          /* Ensure motion divs are visible */
          div[style*="opacity"] {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
          }
          
          /* Force phase headers to be visible with specific styling */
          .bg-gradient-to-r {
            background: #0A58D0 !important;
            color: white !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          /* Ensure phase card headers are visible */
          div[class*="bg-gradient-to-r"] {
            background: #0A58D0 !important;
            color: white !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
          
          /* Phase badge and text */
          .bg-white\/20 {
            background: rgba(255, 255, 255, 0.3) !important;
          }
          
          .text-white {
            color: white !important;
          }
          
          .text-white\/90 {
            color: rgba(255, 255, 255, 0.9) !important;
          }
          
          .text-white\/80 {
            color: rgba(255, 255, 255, 0.8) !important;
          }
        }
      `
    });
    console.log('✅ Print animations disabled');
    
    console.log('📷 Taking screenshot 2: After print media emulation');
    await page.screenshot({ 
      path: 'debug-2-print-media.png', 
      fullPage: true,
      type: 'png'
    });
    
    // Wait for fonts and styles to fully load
    await page.evaluateHandle('document.fonts.ready');
    console.log('✅ Fonts loaded');
    
    console.log('📷 Taking screenshot 3: After fonts loaded');
    await page.screenshot({ 
      path: 'debug-3-fonts-loaded.png', 
      fullPage: true,
      type: 'png'
    });
    
    // Critical fix: Wait for ALL content to actually load
    console.log('🔧 Implementing ACTUAL content loading fix...');
    
    // Step 1: Wait for the page to be truly ready  
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Step 2: Force trigger ALL motion animations immediately
    await page.evaluate(() => {
      console.log('🎭 Forcing ALL animations to complete state...');
      
      // Find ALL elements with Framer Motion and force them visible
      const allMotionElements = Array.from(document.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        const hasOpacity = style.opacity === '0' || el.style.opacity === '0';
        const hasTransform = style.transform !== 'none' || el.style.transform;
        return hasOpacity || hasTransform;
      });
      
      console.log(`Found ${allMotionElements.length} elements that need fixing`);
      
      allMotionElements.forEach((el: HTMLElement) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
        el.style.display = el.style.display || 'block';
      });
      
      // Force intersection observers to fire
      if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.target) {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.visibility = 'visible';
            }
          });
        });
        
        document.querySelectorAll('[data-framer-name], div[class*="motion"]').forEach(el => {
          observer.observe(el);
          // Immediately trigger as intersecting
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.visibility = 'visible';
        });
      }
      
      return true;
    });
    
    console.log('✅ All animations forced to visible state');
    
    // Step 3: Aggressive section waiting with scroll triggering  
    const criticalSections = [
      'Executive Summary',
      'Workshop Philosophy',
      'The 18-Month Window',
      'Pre-Workshop Preparation'
    ];
    
    for (const sectionText of criticalSections) {
      console.log(`🎯 Aggressively waiting for section: ${sectionText}`);
      
      let found = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        // Trigger scroll and viewport changes that might load content
        await page.evaluate(() => {
          window.scrollTo(0, 0);
          window.scrollTo(0, document.body.scrollHeight / 4);
          window.scrollTo(0, document.body.scrollHeight / 2);
          window.scrollTo(0, 0);
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          await page.waitForFunction((section) => {
            // Check headings
            const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            const foundInHeading = headings.some(h => h.textContent?.includes(section));
            
            // Check CardTitle components and other common title elements
            const titles = Array.from(document.querySelectorAll('[class*="title"], [class*="Title"], .card-title, .text-3xl, .font-bold'));
            const foundInTitle = titles.some(t => t.textContent?.includes(section));
            
            // Check if text exists anywhere in the page
            const allText = document.body.innerText || document.body.textContent || '';
            const foundInText = allText.includes(section);
            
            return foundInHeading || foundInTitle || foundInText;
          }, { timeout: 3000 }, sectionText);
          
          found = true;
          console.log(`✅ Found section: ${sectionText}`);
          break;
        } catch (error) {
          console.log(`⚠️  Section "${sectionText}" attempt ${attempt + 1} failed`);
        }
      }
      
      if (!found) {
        console.log(`❌ Section "${sectionText}" remains missing after all attempts`);
      }
    }
    
    // Step 4: Ensure all motion components are loaded
    console.log('🎭 Ensuring Framer Motion components are ready...');
    await page.evaluate(() => {
      // Trigger intersection observer events that might load motion components
      const viewportHeight = window.innerHeight;
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section, index) => {
        // Simulate scrolling into view for each section
        section.scrollIntoView({ behavior: 'instant' });
      });
      
      // Scroll back to top
      window.scrollTo(0, 0);
    });
    
    // Step 5: Final comprehensive wait
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('✅ Enhanced hydration and content loading complete');
    
    // Enhanced debugging and forcing of Framer Motion elements
    await page.evaluate(() => {
      console.log('🔍 PDF DEBUG: Starting comprehensive element analysis...');
      
      // Step 1: Analyze initial DOM state
      const allSections = document.querySelectorAll('section');
      console.log(`📊 Found ${allSections.length} sections in DOM`);
      
      const allDivs = document.querySelectorAll('div');
      console.log(`📊 Found ${allDivs.length} total div elements`);
      
      const motionDivs = document.querySelectorAll('div[style*="opacity"]');
      console.log(`📊 Found ${motionDivs.length} divs with opacity styles`);
      
      // Step 2: Check for specific sections
      const criticalSections = [
        'Executive Summary',
        'Workshop Philosophy', 
        'The 18-Month Window',
        'Pre-Workshop Preparation',
        'Workshop Structure'
      ];
      
      const sectionAnalysis: any = {};
      criticalSections.forEach(sectionName => {
        // Check headings
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const foundInHeading = headings.find(h => h.textContent?.includes(sectionName));
        
        // Check CardTitle and other title elements
        const titles = Array.from(document.querySelectorAll('[class*="title"], [class*="Title"], .card-title, .text-3xl, .font-bold'));
        const foundInTitle = titles.find(t => t.textContent?.includes(sectionName));
        
        // Use the first found element
        const found = foundInHeading || foundInTitle;
        
        sectionAnalysis[sectionName] = {
          found: !!found,
          element: found,
          parentSection: found?.closest('section'),
          foundIn: foundInHeading ? 'heading' : foundInTitle ? 'title' : 'none'
        };
        
        const status = found ? 'FOUND' : 'MISSING';
        const location = found ? ` (in ${foundInHeading ? 'heading' : 'title'})` : '';
        console.log(`🔍 Section "${sectionName}": ${status}${location}`);
        
        if (found) {
          const parentMotion = found.closest('div[style*="opacity"]');
          if (parentMotion) {
            const styles = window.getComputedStyle(parentMotion);
            console.log(`  └─ Motion parent opacity: ${styles.opacity} (inline: ${(parentMotion as HTMLElement).style.opacity})`);
          }
        }
      });
      
      // Step 3: Disable all animations with enhanced CSS while preserving print styles
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
            animation-iteration-count: 1 !important;
          }
          
          /* Force all motion elements visible */
          [data-framer-name] {
            opacity: 1 !important;
            transform: none !important;
            visibility: visible !important;
          }
          
          /* Ensure motion divs are visible but keep print layout classes intact */
          div[style*="opacity"]:not([class*="print:"]) {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
          }
          
          /* Preserve all Tailwind print utilities */
          .print\\:break-before-page { break-before: page !important; }
          .print\\:pt-6 { padding-top: 1.5rem !important; }
          .print\\:pb-3 { padding-bottom: 0.75rem !important; }
          .print\\:pt-4 { padding-top: 1rem !important; }
          .print\\:pb-4 { padding-bottom: 1rem !important; }
          .print\\:mb-3 { margin-bottom: 0.75rem !important; }
          .print\\:mb-4 { margin-bottom: 1rem !important; }
          .print\\:text-xl { font-size: 1.25rem !important; }
          .print\\:text-sm { font-size: 0.875rem !important; }
          .print\\:text-xs { font-size: 0.75rem !important; }
          .print\\:text-\\[10px\\] { font-size: 10px !important; }
          .print\\:leading-tight { line-height: 1.25 !important; }
          .print\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .print\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          .print\\:gap-2 { gap: 0.5rem !important; }
          .print\\:gap-3 { gap: 0.75rem !important; }
          .print\\:w-8 { width: 2rem !important; }
          .print\\:h-8 { height: 2rem !important; }
          .print\\:w-6 { width: 1.5rem !important; }
          .print\\:h-6 { height: 1.5rem !important; }
          .print\\:p-2 { padding: 0.5rem !important; }
          .print\\:p-3 { padding: 0.75rem !important; }
        }
      `;
      document.head.appendChild(style);
      console.log('✅ Enhanced CSS styles applied');
      
      // Step 4: Selective element forcing - preserve print styles
      let elementsFixed = 0;
      allDivs.forEach((div: HTMLElement, index) => {
        const computedStyle = window.getComputedStyle(div);
        const inlineOpacity = div.style.opacity;
        const hasOpacityIssue = computedStyle.opacity === '0' || inlineOpacity === '0';
        const isMotionDiv = div.className.includes('mx-auto') || div.className.includes('max-w-');
        const hasPrintClasses = div.className.includes('print:');
        
        // Only fix elements that don't have print-specific styles
        if ((hasOpacityIssue || isMotionDiv) && !hasPrintClasses) {
          const before = {
            opacity: computedStyle.opacity,
            visibility: computedStyle.visibility,
            display: computedStyle.display
          };
          
          // Fix visibility without overriding display
          div.style.opacity = '1';
          div.style.visibility = 'visible';
          div.style.transform = 'none';
          // Don't force display to block as it breaks grid layouts
          if (computedStyle.display === 'none') {
            div.style.display = '';
          }
          
          elementsFixed++;
          
          if (index < 10 || isMotionDiv) { // Log first 10 or all motion divs
            console.log(`🔧 Fixed element ${index}: opacity ${before.opacity} → 1, visibility ${before.visibility} → visible`);
          }
        }
      });
      
      console.log(`✅ Fixed ${elementsFixed} elements with visibility issues`);
      
      // Step 5: Targeted section forcing with parent traversal
      criticalSections.forEach(sectionText => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const targetHeading = headings.find(h => h.textContent?.includes(sectionText));
        if (targetHeading) {
          console.log(`🎯 Forcing section: ${sectionText}`);
          
          let parent: HTMLElement | null = targetHeading.closest('div');
          let level = 0;
          while (parent && level < 10) {
            const beforeOpacity = window.getComputedStyle(parent).opacity;
            parent.style.opacity = '1';
            parent.style.visibility = 'visible';
            parent.style.transform = 'none';
            
            console.log(`  └─ Level ${level}: opacity ${beforeOpacity} → 1`);
            
            parent = parent.parentElement as HTMLElement;
            if (parent && parent.tagName === 'SECTION') break;
            level++;
          }
        } else {
          console.warn(`⚠️  Section "${sectionText}" heading not found in DOM!`);
        }
      });
      
      // Step 5b: Force phase headers to be visible
      console.log('🎯 Forcing phase headers to be visible...');
      const phaseHeaders = document.querySelectorAll('div.bg-gradient-to-r, [class*="bg-gradient-to-r"]');
      phaseHeaders.forEach((header, index) => {
        const headerEl = header as HTMLElement;
        headerEl.style.backgroundColor = '#0A58D0';
        headerEl.style.color = 'white';
        headerEl.style.opacity = '1';
        headerEl.style.visibility = 'visible';
        headerEl.style.display = 'block';
        
        // Force all text inside to be white
        const textElements = headerEl.querySelectorAll('*');
        textElements.forEach((el) => {
          (el as HTMLElement).style.color = 'white';
        });
        
        console.log(`✅ Fixed phase header ${index + 1}`);
      });
      
      // Also check for phase badges - use text content instead of :has-text
      const allSpansForPhase = document.querySelectorAll('span');
      const allDivsForPhase = document.querySelectorAll('div');
      const phaseElements = [...allSpansForPhase, ...allDivsForPhase].filter(el => 
        el.textContent && el.textContent.includes('Phase')
      );
      
      phaseElements.forEach((badge) => {
        const parent = badge.closest('div.bg-gradient-to-r, [class*="bg-gradient-to-r"]');
        if (parent) {
          (parent as HTMLElement).style.backgroundColor = '#0A58D0';
          (parent as HTMLElement).style.color = 'white';
          (parent as HTMLElement).style.opacity = '1';
          (parent as HTMLElement).style.visibility = 'visible';
        }
      });
      
      // Step 6: Final verification
      const finalMotionDivs = document.querySelectorAll('div[style*="opacity"]');
      console.log(`📊 Final check: ${finalMotionDivs.length} divs still have opacity styles`);
      
      finalMotionDivs.forEach((div, index) => {
        const opacity = window.getComputedStyle(div).opacity;
        if (index < 5) { // Log first 5
          console.log(`  └─ Motion div ${index}: final opacity = ${opacity}`);
        }
      });
      
      console.log('🎉 PDF DEBUG: Element analysis and forcing complete!');
      
      return Promise.resolve();
    });
    
    console.log('📷 Taking screenshot 4: After element forcing');
    await page.screenshot({ 
      path: 'debug-4-elements-forced.png', 
      fullPage: true,
      type: 'png'
    });
    
    // Wait for any remaining rendering
    await new Promise(resolve => setTimeout(resolve, 3000)); // Longer buffer for rendering
    console.log('⏱️  Final render wait complete');
    
    console.log('📷 Taking screenshot 5: Final state before PDF');
    await page.screenshot({ 
      path: 'debug-5-final-state.png', 
      fullPage: true,
      type: 'png'
    });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      scale: 1.0,              // Full scale for sharp text
      margin: {
        top: '15mm',
        right: '10mm', 
        bottom: '15mm',
        left: '10mm'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="width: 100%; font-size: 10px; padding: 8px 0; text-align: center; color: #4a5568; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <span style="font-weight: 500;">AI Transformation Discovery Workshop</span>
        </div>
      `,
      footerTemplate: `
        <div style="width: 100%; font-size: 10px; padding: 8px 0; text-align: center; color: #4a5568; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <span>© 2025 Innovoco AI & Automation | Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
      tagged: true // For accessibility and structure
    });

    await browser.close();

    // Return the PDF
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="AI-Discovery-Workshop-Executive-Brief.pdf"'
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}