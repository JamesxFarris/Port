export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
  accentColor: string;
};

export const projects: Project[] = [
  {
    id: 'inklink',
    name: 'InkLink',
    tagline: 'Tattoo Shop Directory',
    description:
      '3,000+ U.S. tattoo shops. Smart SEO with LocalBusiness schema, timezone-aware "Open Now" badges, fuzzy-match duplicate prevention, Stripe premium upgrades, and an embeddable ratings widget shops can drop on their own sites.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Cloudinary', 'Google Places API'],
    github: 'https://github.com/JamesxFarris/InkLinkTattooFinder',
    live: 'https://inklinktattoofinder.com',
    accentColor: '#6B21A8',
  },
  {
    id: 'rolestack',
    name: 'RoleStack',
    tagline: 'Job Discovery Platform',
    description:
      'Aggregates listings from multiple sources, tailors resumes with AI keyword matching, and redirects to original job postings — no middleman. All resume changes require explicit approval.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Node.js'],
    github: 'https://github.com/JamesxFarris/RoleStack',
    live: 'https://rolestack.vercel.app',
    accentColor: '#0E7490',
  },
  {
    id: 'hsn',
    name: 'Holiday Sands North',
    tagline: 'Oceanfront Hotel Website',
    description:
      'Full website for a family-owned Myrtle Beach boardwalk hotel. Integrated booking system, interactive room gallery, event calendar — built vanilla for maximum load performance.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/JamesxFarris/HSN',
    live: 'https://holidaysandsnorth.com',
    accentColor: '#0F766E',
  },
  {
    id: 'tactracker',
    name: 'TacTracker',
    tagline: 'TFT Ranked Analytics',
    description:
      'Teamfight Tactics stats platform that surfaces gameplay trends across ranked matches — win-rate by comp, stage-by-stage decisions, and augment performance tracking.',
    tech: ['TypeScript', 'React', 'Riot API'],
    github: 'https://github.com/JamesxFarris/tac-tracker',
    live: null,
    accentColor: '#7C3AED',
  },
  {
    id: 'bestbook',
    name: 'Best Book',
    tagline: 'Hotel Management Software',
    description:
      'Reservation processing and financial reporting system for hotels of all sizes. Designed for third-party integration with a clean operator UI for managing room availability and reports.',
    tech: ['JavaScript', 'Node.js', 'SQL'],
    github: 'https://github.com/JamesxFarris/Best_Book',
    live: null,
    accentColor: '#1D4ED8',
  },
  {
    id: 'jsquared',
    name: 'JSquared Photography',
    tagline: 'Photography Portfolio',
    description:
      'Sleek photography portfolio with a client-facing user portal for downloading high-resolution images. Designed to feel classy, not cluttered.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/JamesxFarris/JSquared_Photography',
    live: null,
    accentColor: '#9D174D',
  },
];

export const skills = {
  Languages: ['TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML / CSS'],
  Frameworks: ['Next.js', 'React', 'React Native', 'Node.js', 'Express', 'Prisma'],
  'Data & Cloud': ['PostgreSQL', 'MongoDB', 'Vercel', 'Railway', 'Linux'],
  'Tools & APIs': ['Stripe', 'Google Maps & Places APIs', 'REST APIs', 'Git', 'GitHub'],
};
