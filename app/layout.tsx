import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brand Portfolio',
  description: 'Brand portfolio with blog and newsletter'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
