export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
  screenshot: string | null;
  accentColor: string;
};

export const projects: Project[] = [
  {
    id: 'inklink',
    name: 'InkLink',
    tagline: 'Tattoo Shop Directory',
    description:
      '3,000+ U.S. tattoo shops searchable by location with real-time "Open Now" status across US time zones. End-to-end build: Next.js frontend, PostgreSQL + Prisma, Google Maps & Places, duplicate detection, Stripe subscriptions, and SEO with structured data.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Google Maps & Places API'],
    github: 'https://github.com/JamesxFarris/InkLinkTattooFinder',
    live: 'https://inklinktattoofinder.com',
    screenshot: '/photos/inklink.png',
    accentColor: '#6B21A8',
  },
  {
    id: 'hsn',
    name: 'Holiday Sands North',
    tagline: 'Oceanfront Hotel Website',
    description:
      'Production marketing and booking site for a family-owned Myrtle Beach boardwalk hotel. Third-party reservation engine integration, dynamic event calendar with month filtering, responsive galleries across 15+ room types.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/JamesxFarris/HSN',
    live: 'https://holidaysandsnorth.com',
    screenshot: '/photos/hsn.png',
    accentColor: '#0F766E',
  },
  {
    id: 'j2dev',
    name: 'J2 Development',
    tagline: 'Web Studio Site',
    description:
      'Marketing and portfolio site for J2 Development, a web development studio. Designed and built to be lightweight — no framework overhead on a purely informational site.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/JamesxFarris/J-Development',
    live: 'https://loving-alignment-production.up.railway.app/',
    screenshot: '/photos/j2dev.png',
    accentColor: '#1D4ED8',
  },
  {
    id: 'castle-clicker',
    name: 'Castle Clicker',
    tagline: 'Browser Incremental Game',
    description:
      'Incremental clicker game with a medieval castle-building theme — built as a PWA so it installs and runs offline. Developed under the J2 Development studio using React and Vite.',
    tech: ['React', 'JavaScript', 'Vite', 'PWA'],
    github: 'https://github.com/J2-Development/Castle-Clicker',
    live: 'https://j2-development.github.io/Castle-Clicker/',
    screenshot: '/photos/castle-clicker.png',
    accentColor: '#92400E',
  },
  {
    id: 'somniary',
    name: 'Somniary',
    tagline: 'Dream Journal App',
    description:
      'Full-stack journaling app built in a team of three using Agile with two-week sprints. Users log private dreams and share to a public "Dreamspace Collective" feed. User auth, daily reflection feature, account settings.',
    tech: ['Node.js', 'Express', 'MySQL', 'Sequelize', 'Handlebars'],
    github: 'https://github.com/JamesxFarris/somniary',
    live: null,
    screenshot: '/photos/somniary.png',
    accentColor: '#1E3A5F',
  },
  {
    id: 'trivia-feev',
    name: 'feev.io Trivia',
    tagline: 'Multiplayer Trivia Platform',
    description:
      'Trivia platform built with a team of five over two Agile sprints. Multiple categories, leaderboards, user auth. Used GraphQL + Apollo as a deliberate alternative to REST — scoped and shipped within the sprint.',
    tech: ['React', 'GraphQL', 'Apollo', 'MongoDB', 'Node.js', 'Express'],
    github: 'https://github.com/Cat-Scratch-Feev/trivia-feev',
    live: null,
    screenshot: '/photos/trivia-feev.png',
    accentColor: '#14532D',
  },
];

export const skills = {
  Languages: ['TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML / CSS'],
  Frameworks: ['Next.js', 'React', 'React Native', 'Node.js', 'Express', 'Prisma'],
  'Data & Cloud': ['PostgreSQL', 'MongoDB', 'Vercel', 'Railway', 'Linux'],
  'Tools & APIs': ['Stripe', 'Google Maps & Places APIs', 'REST APIs', 'Git', 'GitHub'],
};
