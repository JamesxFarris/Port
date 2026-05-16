import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'James Farris — Full-Stack Developer',
  description:
    'Full-stack developer who ships production software — live sites serving real users. TypeScript, React, Next.js, Node. Available for full-stack roles.',
  keywords: [
    'James Farris',
    'full-stack developer',
    'software engineer',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'portfolio',
  ],
  authors: [{ name: 'James Farris' }],
  openGraph: {
    type: 'website',
    title: 'James Farris — Full-Stack Developer',
    description:
      'Full-stack developer who ships production software. TypeScript, React, Next.js, Node. Available for full-stack roles.',
    siteName: 'James Farris',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'James Farris — Full-Stack Developer',
    description:
      'Full-stack developer who ships production software. Available for full-stack roles.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scanlines">{children}</body>
    </html>
  );
}
