declare module 'html2pdf.js' {
  export interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: {
      type?: 'jpeg' | 'png';
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
    };
    jsPDF?: {
      unit?: 'mm' | 'pt' | 'in';
      format?: 'a4' | 'letter' | string;
      orientation?: 'portrait' | 'landscape';
    };
  }

  export default function html2pdf(): {
    set(options: Html2PdfOptions): {
      from(element: HTMLElement): {
        save(): Promise<void>;
      };
    };
  };
}