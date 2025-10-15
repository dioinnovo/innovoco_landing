import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

// GET endpoint for generating PDF from the case studies page
export async function GET(request: NextRequest) {
  try {
    // Launch headless Chrome
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
    
    // Set viewport to A4 width for better rendering
    await page.setViewport({ width: 1200, height: 1600 });

    // Navigate to the case studies page
    const url = request.nextUrl.searchParams.get('url') || 
                `${request.nextUrl.origin}/case-studies`;
    
    // IMPORTANT: Set print media type BEFORE navigating
    await page.emulateMediaType('print');
    
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for content to load
    await page.waitForSelector('main', { timeout: 5000 });
    
    // Apply print-specific Tailwind utilities and custom print styles
    await page.addStyleTag({
      content: `
        /* Activate all Tailwind print utilities by removing the @media print wrapper */
        /* Since we're already in print mode, apply these directly */
        
        /* Hide elements with print:hidden */
        .print\\:hidden {
          display: none !important;
        }
        
        /* Grid layouts for print */
        .print\\:grid-cols-1 {
          display: grid !important;
          grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
        }
        .print\\:grid-cols-2 {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
        .print\\:grid-cols-3 {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }
        
        /* Spacing utilities for print */
        .print\\:gap-1 { gap: 0.25rem !important; }
        .print\\:gap-2 { gap: 0.5rem !important; }
        .print\\:gap-3 { gap: 0.75rem !important; }
        .print\\:gap-4 { gap: 1rem !important; }
        
        .print\\:p-0 { padding: 0 !important; }
        .print\\:p-2 { padding: 0.5rem !important; }
        .print\\:p-4 { padding: 1rem !important; }
        
        .print\\:m-0 { margin: 0 !important; }
        .print\\:m-2 { margin: 0.5rem !important; }
        
        /* Typography for print */
        .print\\:text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
        .print\\:text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
        .print\\:text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
        .print\\:text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
        .print\\:text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
        .print\\:text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
        
        /* Colors for print */
        .print\\:text-black { color: #000000 !important; }
        .print\\:text-gray-700 { color: #374151 !important; }
        .print\\:text-gray-900 { color: #111827 !important; }
        .print\\:bg-white { background-color: #ffffff !important; }
        .print\\:bg-gray-50 { background-color: #f9fafb !important; }
        
        /* Borders for print */
        .print\\:border { border-width: 1px !important; }
        .print\\:border-gray-300 { border-color: #d1d5db !important; }
        
        /* Page break utilities */
        .print\\:break-before-page {
          break-before: page !important;
          page-break-before: always !important;
        }
        .print\\:break-after-page {
          break-after: page !important;
          page-break-after: always !important;
        }
        .print\\:break-inside-avoid {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .print\\:break-inside-avoid-page {
          break-inside: avoid-page !important;
          page-break-inside: avoid !important;
        }
        
        /* Landscape orientation for specific pages */
        .print\\:landscape {
          size: landscape !important;
        }
        
        /* Base print optimizations */
        @page {
          size: A4;
          margin: 15mm;
        }
        
        @page landscape {
          size: A4 landscape;
          margin: 10mm;
        }
        
        body {
          background: white !important;
          color: #0f172a !important;
          font-size: 11pt !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
        
        /* Enhanced typography */
        h1 {
          color: #0f172a !important;
          font-weight: 700 !important;
        }
        
        h2 {
          color: #1e293b !important;
          font-weight: 600 !important;
        }
        
        h3 {
          color: #334155 !important;
          font-weight: 600 !important;
        }
        
        /* Badge styling */
        .badge,
        [class*="badge"] {
          background: #f1f5f9 !important;
          color: #475569 !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          padding: 0.25rem 0.5rem !important;
          font-size: 0.75rem !important;
          font-weight: 500 !important;
        }
        
        /* Icon enhancements */
        [class*="lucide"] {
          color: inherit !important;
        }
        
        /* Table enhancements */
        th {
          background: #f8fafc !important;
          color: #374151 !important;
          font-weight: 600 !important;
          border-bottom: 2px solid #e5e7eb !important;
        }
        
        /* Section backgrounds */
        section {
          margin-bottom: 1rem !important;
        }
        
        /* Color-coded elements */
        .text-green-600 { color: #059669 !important; }
        .text-blue-600 { color: #2563eb !important; }
        .text-purple-600 { color: #7c3aed !important; }
        .text-amber-600 { color: #d97706 !important; }
        .text-red-600 { color: #dc2626 !important; }
        .text-gray-600 { color: #4b5563 !important; }
        
        .bg-green-600 { background-color: #059669 !important; }
        .bg-blue-600 { background-color: #2563eb !important; }
        .bg-purple-600 { background-color: #7c3aed !important; }
        .bg-amber-600 { background-color: #d97706 !important; }
        .bg-red-600 { background-color: #dc2626 !important; }
        .bg-gray-600 { background-color: #4b5563 !important; }
        
        /* Brand color preservation */
        [style*="#0A58D0"] {
          background-color: #0a58d0 !important;
        }
        
        .text-\\[\\#0A58D0\\] {
          color: #0a58d0 !important;
        }
        
        /* Workflow card icons */
        .bg-green-600 { background: linear-gradient(135deg, #10b981, #059669) !important; }
        .bg-blue-600 { background: linear-gradient(135deg, #3b82f6, #2563eb) !important; }
        .bg-amber-600 { background: linear-gradient(135deg, #f59e0b, #d97706) !important; }
        .bg-purple-600 { background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important; }
        .bg-gray-600 { background: linear-gradient(135deg, #6b7280, #4b5563) !important; }
        .bg-red-600 { background: linear-gradient(135deg, #ef4444, #dc2626) !important; }
        
        /* Enhanced workflow cards styling */
        [class*="group"] {
          transition: none !important;
        }
        
        /* Preserve some visual hierarchy */
        .font-bold {
          font-weight: 700 !important;
        }
        
        .font-semibold {
          font-weight: 600 !important;
        }
        
        .font-medium {
          font-weight: 500 !important;
        }
        
        /* Better spacing for print */
        .space-y-4 > * + * {
          margin-top: 1rem !important;
        }
        
        .space-y-6 > * + * {
          margin-top: 1.5rem !important;
        }
        
        /* Hide unnecessary elements but keep essential content */
        .print\\:hidden {
          display: none !important;
        }
        
        /* Ensure proper text contrast */
        .text-white {
          color: white !important;
        }
        
        .text-muted-foreground {
          color: #64748b !important;
        }
        
        /* Preserve more design elements for PDF */
        
        /* Convert gradient backgrounds to subtle solid colors */
        .bg-gradient-to-br {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
        }
        
        [class*="from-"][class*="to-"] {
          background: #f8fafc !important;
        }
        
        /* Preserve rounded corners but make them print-friendly */
        [class*="rounded-[22px]"] {
          border-radius: 16px !important;
        }
        
        [class*="rounded-[16px]"] {
          border-radius: 12px !important;
        }
        
        [class*="rounded-[12px]"] {
          border-radius: 8px !important;
        }
        
        /* Enhanced card styling */
        .card, 
        [class*="rounded-"],
        [class*="bg-white/"] {
          background: #ffffff !important;
          border: 1px solid #e5e7eb !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        }
        
        /* Preserve some shadow effects for depth */
        [class*="shadow-[0_2px_8px"] {
          box-shadow: 0 2px 4px rgba(0,0,0,0.06) !important;
        }
        
        [class*="shadow-[0_4px_20px"] {
          box-shadow: 0 4px 6px rgba(0,0,0,0.08) !important;
        }
        
        /* Style specific gradient elements */
        .bg-gradient-to-r.from-\\[\\#D1FAE5\\]\\/50 {
          background: linear-gradient(to right, #dcfce7, #bbf7d0) !important;
          border-color: #10b981 !important;
        }
        
        .bg-gradient-to-r.from-\\[\\#EDE9FE\\]\\/50 {
          background: linear-gradient(to right, #f3e8ff, #ddd6fe) !important;
          border-color: #8b5cf6 !important;
        }
        
        .bg-gradient-to-r.from-\\[\\#DBEAFE\\]\\/50 {
          background: linear-gradient(to right, #dbeafe, #bfdbfe) !important;
          border-color: #0a58d0 !important;
        }
        
        /* Optimize images for print */
        img {
          max-width: 100% !important;
          height: auto !important;
        }
        
        /* Ensure tables are readable */
        table {
          border-collapse: collapse !important;
          width: 100% !important;
        }
        
        th {
          background-color: #f3f4f6 !important;
          font-weight: 600 !important;
        }
        
        td, th {
          border: 1px solid #e5e7eb !important;
          padding: 0.5rem !important;
        }
      `
    });
    
    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate PDF with enhanced settings for design preservation
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,  // Allow print CSS to control backgrounds
      margin: {
        top: '12mm',
        bottom: '12mm',
        left: '8mm',
        right: '8mm'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true,  // Use CSS page size if defined
      scale: 0.98,  // Slightly smaller to ensure content fits
      tagged: true,  // Generate accessible PDF
      omitBackground: false  // Keep backgrounds for design
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="innovoco-ai-stack-report.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
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

// POST endpoint for custom PDF generation with options
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageUrl, options = {} } = body;

    if (!pageUrl) {
      return NextResponse.json(
        { error: "pageUrl is required" },
        { status: 400 }
      );
    }

    // Launch headless Chrome
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
    
    // Set viewport to Letter width
    await page.setViewport({ width: 816, height: 1056 }); // Letter at 96 DPI

    // Navigate to the specified page FIRST
    await page.goto(pageUrl, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for content to load
    await page.waitForSelector('main', { timeout: 5000 });
    
    // NOW set print media type after page is loaded
    await page.emulateMediaType('print');
    
    // Apply print-specific Tailwind utilities and custom print styles
    await page.addStyleTag({
      content: `
        /* Activate all Tailwind print utilities by removing the @media print wrapper */
        /* Since we're already in print mode, apply these directly */
        
        /* Hide elements with print:hidden */
        .print\\:hidden {
          display: none !important;
        }
        
        /* Grid layouts for print */
        .print\\:grid-cols-1 {
          display: grid !important;
          grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
        }
        .print\\:grid-cols-2 {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
        .print\\:grid-cols-3 {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }
        
        /* Spacing utilities for print */
        .print\\:gap-1 { gap: 0.25rem !important; }
        .print\\:gap-2 { gap: 0.5rem !important; }
        .print\\:gap-3 { gap: 0.75rem !important; }
        .print\\:gap-4 { gap: 1rem !important; }
        
        .print\\:p-0 { padding: 0 !important; }
        .print\\:p-2 { padding: 0.5rem !important; }
        .print\\:p-4 { padding: 1rem !important; }
        
        .print\\:m-0 { margin: 0 !important; }
        .print\\:m-2 { margin: 0.5rem !important; }
        
        /* Typography for print */
        .print\\:text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
        .print\\:text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
        .print\\:text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
        .print\\:text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
        .print\\:text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
        .print\\:text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
        
        /* Colors for print */
        .print\\:text-black { color: #000000 !important; }
        .print\\:text-gray-700 { color: #374151 !important; }
        .print\\:text-gray-900 { color: #111827 !important; }
        .print\\:bg-white { background-color: #ffffff !important; }
        .print\\:bg-gray-50 { background-color: #f9fafb !important; }
        
        /* Borders for print */
        .print\\:border { border-width: 1px !important; }
        .print\\:border-gray-300 { border-color: #d1d5db !important; }
        
        /* Page break utilities */
        .print\\:break-before-page {
          break-before: page !important;
          page-break-before: always !important;
        }
        .print\\:break-after-page {
          break-after: page !important;
          page-break-after: always !important;
        }
        .print\\:break-inside-avoid {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .print\\:break-inside-avoid-page {
          break-inside: avoid-page !important;
          page-break-inside: avoid !important;
        }
        
        /* Landscape orientation for specific pages */
        .print\\:landscape {
          size: landscape !important;
        }
        
        /* Base print optimizations */
        @page {
          size: A4;
          margin: 15mm;
        }
        
        @page landscape {
          size: A4 landscape;
          margin: 10mm;
        }
        
        body {
          background: white !important;
          color: #0f172a !important;
          font-size: 11pt !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
        
        /* Enhanced typography */
        h1 {
          color: #0f172a !important;
          font-weight: 700 !important;
        }
        
        h2 {
          color: #1e293b !important;
          font-weight: 600 !important;
        }
        
        h3 {
          color: #334155 !important;
          font-weight: 600 !important;
        }
        
        /* Badge styling */
        .badge,
        [class*="badge"] {
          background: #f1f5f9 !important;
          color: #475569 !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          padding: 0.25rem 0.5rem !important;
          font-size: 0.75rem !important;
          font-weight: 500 !important;
        }
        
        /* Icon enhancements */
        [class*="lucide"] {
          color: inherit !important;
        }
        
        /* Table enhancements */
        th {
          background: #f8fafc !important;
          color: #374151 !important;
          font-weight: 600 !important;
          border-bottom: 2px solid #e5e7eb !important;
        }
        
        /* Section backgrounds */
        section {
          margin-bottom: 1rem !important;
        }
        
        /* Color-coded elements */
        .text-green-600 { color: #059669 !important; }
        .text-blue-600 { color: #2563eb !important; }
        .text-purple-600 { color: #7c3aed !important; }
        .text-amber-600 { color: #d97706 !important; }
        .text-red-600 { color: #dc2626 !important; }
        .text-gray-600 { color: #4b5563 !important; }
        
        .bg-green-600 { background-color: #059669 !important; }
        .bg-blue-600 { background-color: #2563eb !important; }
        .bg-purple-600 { background-color: #7c3aed !important; }
        .bg-amber-600 { background-color: #d97706 !important; }
        .bg-red-600 { background-color: #dc2626 !important; }
        .bg-gray-600 { background-color: #4b5563 !important; }
        
        /* Brand color preservation */
        [style*="#0A58D0"] {
          background-color: #0a58d0 !important;
        }
        
        .text-\\[\\#0A58D0\\] {
          color: #0a58d0 !important;
        }
        
        /* Workflow card icons */
        .bg-green-600 { background: linear-gradient(135deg, #10b981, #059669) !important; }
        .bg-blue-600 { background: linear-gradient(135deg, #3b82f6, #2563eb) !important; }
        .bg-amber-600 { background: linear-gradient(135deg, #f59e0b, #d97706) !important; }
        .bg-purple-600 { background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important; }
        .bg-gray-600 { background: linear-gradient(135deg, #6b7280, #4b5563) !important; }
        .bg-red-600 { background: linear-gradient(135deg, #ef4444, #dc2626) !important; }
        
        /* Enhanced workflow cards styling */
        [class*="group"] {
          transition: none !important;
        }
        
        /* Preserve some visual hierarchy */
        .font-bold {
          font-weight: 700 !important;
        }
        
        .font-semibold {
          font-weight: 600 !important;
        }
        
        .font-medium {
          font-weight: 500 !important;
        }
        
        /* Better spacing for print */
        .space-y-4 > * + * {
          margin-top: 1rem !important;
        }
        
        .space-y-6 > * + * {
          margin-top: 1.5rem !important;
        }
        
        /* Hide unnecessary elements but keep essential content */
        .print\\:hidden {
          display: none !important;
        }
        
        /* Ensure proper text contrast */
        .text-white {
          color: white !important;
        }
        
        .text-muted-foreground {
          color: #64748b !important;
        }
        
        /* Preserve more design elements for PDF */
        
        /* Convert gradient backgrounds to subtle solid colors */
        .bg-gradient-to-br {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
        }
        
        [class*="from-"][class*="to-"] {
          background: #f8fafc !important;
        }
        
        /* Preserve rounded corners but make them print-friendly */
        [class*="rounded-[22px]"] {
          border-radius: 16px !important;
        }
        
        [class*="rounded-[16px]"] {
          border-radius: 12px !important;
        }
        
        [class*="rounded-[12px]"] {
          border-radius: 8px !important;
        }
        
        /* Enhanced card styling */
        .card, 
        [class*="rounded-"],
        [class*="bg-white/"] {
          background: #ffffff !important;
          border: 1px solid #e5e7eb !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        }
        
        /* Preserve some shadow effects for depth */
        [class*="shadow-[0_2px_8px"] {
          box-shadow: 0 2px 4px rgba(0,0,0,0.06) !important;
        }
        
        [class*="shadow-[0_4px_20px"] {
          box-shadow: 0 4px 6px rgba(0,0,0,0.08) !important;
        }
        
        /* Style specific gradient elements */
        .bg-gradient-to-r.from-\\[\\#D1FAE5\\]\\/50 {
          background: linear-gradient(to right, #dcfce7, #bbf7d0) !important;
          border-color: #10b981 !important;
        }
        
        .bg-gradient-to-r.from-\\[\\#EDE9FE\\]\\/50 {
          background: linear-gradient(to right, #f3e8ff, #ddd6fe) !important;
          border-color: #8b5cf6 !important;
        }
        
        .bg-gradient-to-r.from-\\[\\#DBEAFE\\]\\/50 {
          background: linear-gradient(to right, #dbeafe, #bfdbfe) !important;
          border-color: #0a58d0 !important;
        }
        
        /* Optimize images for print */
        img {
          max-width: 100% !important;
          height: auto !important;
        }
        
        /* Ensure tables are readable */
        table {
          border-collapse: collapse !important;
          width: 100% !important;
        }
        
        th {
          background-color: #f3f4f6 !important;
          font-weight: 600 !important;
        }
        
        td, th {
          border: 1px solid #e5e7eb !important;
          padding: 0.5rem !important;
        }
      `
    });
    
    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate PDF with Letter size and white background
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: false,
      margin: {
        top: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
        right: '0.5in'
      },
      ...options
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="innovoco-report.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
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