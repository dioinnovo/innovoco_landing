'use client';

import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export function PrintPDFButton() {
  const handlePrint = () => {
    // Use browser's native print dialog which allows saving as PDF
    // This is more reliable than server-side PDF generation in serverless environments
    window.print();
  };

  return (
    <Button
      onClick={handlePrint}
      className="bg-[#0A58D0] hover:bg-[#084BB3] active:bg-[#063C8F] text-white font-medium px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1),0_3px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.12),0_5px_15px_rgba(0,0,0,0.2)] print:hidden"
      aria-label="Print or save as PDF"
    >
      <Download className="h-3 w-3 md:h-4 md:w-4" />
      <span className="hidden sm:inline">Download PDF</span>
      <span className="sm:hidden">PDF</span>
    </Button>
  );
}