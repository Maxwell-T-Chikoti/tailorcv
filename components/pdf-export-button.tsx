"use client";

import { Download } from 'lucide-react';

type Props = {
  targetId: string;
  fileName: string;
};

export function PdfExportButton({ targetId, fileName }: Props) {
  const handleExport = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    try {
      const mod = await import('html2pdf.js');
      const html2pdf = mod.default;
      await html2pdf().set({
        margin: 8,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save();
    } catch {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-ink/90"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
}