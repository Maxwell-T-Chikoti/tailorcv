import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/app-header';

export const metadata: Metadata = {
  title: 'TailorCV',
  description: 'AI-powered CV builder with matching cover letters and PDF export.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}