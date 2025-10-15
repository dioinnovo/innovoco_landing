import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

// Simplified PDF generation that preserves website design
export async function GET(request: NextRequest) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport to standard web size
    await page.setViewport({ width: 1200, height: 800 });

    const url = request.nextUrl.searchParams.get('url') || 
                `${request.nextUrl.origin}/case-studies`;
    
    // Navigate to page
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for content
    await page.waitForSelector('main', { timeout: 5000 });
    
    // Set print media type AFTER page loads to trigger print styles
    await page.emulateMediaType('print');
    
    // Apply comprehensive print styles to preserve design while making it PDF-friendly
    await page.addStyleTag({
      content: `
        /* Activate ALL print classes since we're in print mode */
        .print\\:hidden { display: none !important; }
        .print\\:block { display: block !important; }
        .print\\:grid-cols-2 { 
          display: grid !important; 
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
        .print\\:grid-cols-3 { 
          display: grid !important; 
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }
        .print\\:gap-1 { gap: 0.25rem !important; }
        .print\\:gap-2 { gap: 0.5rem !important; }
        .print\\:gap-3 { gap: 0.75rem !important; }
        .print\\:py-3 { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
        .print\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
        .print\\:py-6 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
        .print\\:px-2 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
        .print\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
        .print\\:p-3 { padding: 0.75rem !important; }
        .print\\:mb-2 { margin-bottom: 0.5rem !important; }
        .print\\:mb-3 { margin-bottom: 0.75rem !important; }
        .print\\:mb-4 { margin-bottom: 1rem !important; }
        .print\\:mb-6 { margin-bottom: 1.5rem !important; }
        .print\\:mt-2 { margin-top: 0.5rem !important; }
        .print\\:mt-4 { margin-top: 1rem !important; }
        
        /* Typography - Keep text readable but not tiny */
        .print\\:text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
        .print\\:text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
        .print\\:text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
        .print\\:text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
        .print\\:text-2xl { 
          font-size: 1.5rem !important; 
          line-height: 2rem !important; 
        }
        .print\\:font-bold { font-weight: 700 !important; }
        .print\\:font-semibold { font-weight: 600 !important; }
        
        /* Colors */
        .print\\:text-black { color: #000000 !important; }
        .print\\:text-gray-600 { color: #4b5563 !important; }
        .print\\:text-gray-700 { color: #374151 !important; }
        .print\\:text-blue-600 { color: #2563eb !important; }
        .print\\:text-red-600 { color: #dc2626 !important; }
        .print\\:text-purple-600 { color: #7c3aed !important; }
        .print\\:text-green-600 { color: #059669 !important; }
        .print\\:bg-white { background-color: #ffffff !important; }
        .print\\:bg-gray-50 { background-color: #f9fafb !important; }
        .print\\:bg-gray-100 { background-color: #f3f4f6 !important; }
        .print\\:bg-blue-100 { background-color: #dbeafe !important; }
        .print\\:bg-blue-600 { background-color: #2563eb !important; }
        .print\\:bg-red-600 { background-color: #dc2626 !important; }
        .print\\:bg-green-600 { background-color: #059669 !important; }
        .print\\:bg-orange-500 { background-color: #f97316 !important; }
        .print\\:bg-sky-500 { background-color: #0ea5e9 !important; }
        .print\\:bg-pink-500 { background-color: #ec4899 !important; }
        .print\\:bg-gray-600 { background-color: #4b5563 !important; }
        
        /* Borders and spacing */
        .print\\:border { border-width: 1px !important; }
        .print\\:border-0 { border-width: 0 !important; }
        .print\\:border-gray-200 { border-color: #e5e7eb !important; }
        .print\\:border-gray-300 { border-color: #d1d5db !important; }
        .print\\:rounded-lg { border-radius: 0.5rem !important; }
        .print\\:rounded-md { border-radius: 0.375rem !important; }
        .print\\:rounded-full { border-radius: 9999px !important; }
        .print\\:shadow-none { 
          box-shadow: none !important; 
        }
        
        /* Layout and positioning */
        .print\\:w-1 { width: 0.25rem !important; }
        .print\\:h-1 { height: 0.25rem !important; }
        .print\\:w-6 { width: 1.5rem !important; }
        .print\\:h-6 { height: 1.5rem !important; }
        .print\\:w-8 { width: 2rem !important; }
        .print\\:h-8 { height: 2rem !important; }
        .print\\:max-w-full { max-width: 100% !important; }
        
        /* Page breaks */
        .print\\:break-before-page {
          break-before: page !important;
          page-break-before: always !important;
        }
        .print\\:break-inside-avoid {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .print\\:page-break-inside-avoid {
          page-break-inside: avoid !important;
        }
        
        /* Remove hover effects and transforms for PDF */
        .print\\:hover\\:transform-none:hover {
          transform: none !important;
        }
        .print\\:landscape {
          /* Landscape orientation hint for certain sections */
        }
        
        /* Ensure clean backgrounds and proper rendering */
        body {
          background: white !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        /* Remove animations for PDF but keep design */
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        
        /* Better text sizing for PDF - not too small but readable */
        html {
          font-size: 14px !important;
        }
        
        /* Base text should be readable */
        body, p, div {
          font-size: 14px !important;
          line-height: 1.4 !important;
        }
        
        /* Headings should be properly sized */
        h1 { font-size: 28px !important; line-height: 1.2 !important; }
        h2 { font-size: 24px !important; line-height: 1.3 !important; }
        h3 { font-size: 20px !important; line-height: 1.4 !important; }
        
        /* Ensure proper spacing */
        .container {
          max-width: none !important;
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }
        
        /* Ensure cards are visible and properly styled */
        [class*="grid"]:has([class*="rounded-"]) {
          display: grid !important;
        }
        
        /* Force visibility of card-like elements */
        [class*="rounded-"][class*="bg-white"], 
        [class*="rounded-"][class*="border"] {
          border: 1px solid #d1d5db !important;
          background: white !important;
          padding: 1rem !important;
          margin-bottom: 1rem !important;
        }
      `
    });
    
    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate PDF with settings that preserve design and ensure readability
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,  // Keep backgrounds and colors
      margin: {
        top: '15mm',
        bottom: '15mm', 
        left: '12mm',
        right: '12mm'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      scale: 1.0,  // Full scale for better text readability
      tagged: false
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="innovoco-case-studies.pdf"',
        'Cache-Control': 'no-cache'
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { 
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}