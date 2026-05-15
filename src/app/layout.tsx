import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'James Farris — Portfolio',
  description: 'Full-stack developer. TypeScript, React, Next.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scanlines">{children}</body>
    </html>
  );
}
