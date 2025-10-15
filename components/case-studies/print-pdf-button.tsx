'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

export function PrintPDFButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    console.log('Starting PDF download...');
    
    try {
      // Call the simplified Puppeteer API route to generate PDF
      const response = await fetch('/api/pdf-simple', {
        method: 'GET',
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to generate PDF: ${response.status}`);
      }

      // Get the PDF blob
      const blob = await response.blob();
      console.log('PDF Blob size:', blob.size);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'innovoco-ai-stack-report.pdf';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      console.log('PDF download triggered successfully');
    } catch (error) {
      console.error('Error downloading PDF - full error:', error);
      alert('Failed to generate PDF. Using browser print instead.');
      // Fallback to browser print
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      className="bg-[#0A58D0] hover:bg-[#084BB3] active:bg-[#063C8F] text-white font-medium px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1),0_3px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.12),0_5px_15px_rgba(0,0,0,0.2)] print:hidden"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
          <span className="hidden sm:inline">Generating PDF...</span>
          <span className="sm:hidden">Loading...</span>
        </>
      ) : (
        <>
          <Download className="h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </>
      )}
    </Button>
  );
}