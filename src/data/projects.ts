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
  year: string;
  /** Featured projects get a full case-study card. */
  featured?: boolean;
  caseStudy?: { problem: string; built: string; result: string };
};

export const projects: Project[] = [
  {
    id: 'inklink',
    year: '2024 – now',
    featured: true,
    caseStudy: {
      problem: 'Finding a tattoo shop means digging through scattered listings with stale hours and no way to compare nearby options.',
      built: 'A searchable directory of 3,000+ U.S. shops with map discovery, "Open now" status calculated across time zones, duplicate detection on new submissions, and Stripe subscriptions for shop owners.',
      result: 'Live in production with ~400 monthly users, indexed through structured-data SEO.',
    },
    name: 'InkLink',
    tagline: 'Tattoo Shop Directory',
    description:
      'Live in production with ~400 monthly users. 3,000+ U.S. tattoo shops searchable by location with real-time "Open Now" status across US time zones. End-to-end build: Next.js frontend, PostgreSQL + Prisma, Google Maps & Places, duplicate detection, Stripe subscriptions, and SEO with structured data.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Google Maps & Places API'],
    github: 'https://github.com/JamesxFarris/InkLinkTattooFinder',
    live: 'https://inklinktattoofinder.com',
    screenshot: '/photos/inklink.png',
    accentColor: '#6B21A8',
  },
  {
    id: 'hsn',
    year: '2025',
    featured: true,
    caseStudy: {
      problem: 'A family-owned boardwalk hotel needed a site guests could actually book from, and that staff could keep current without an agency.',
      built: 'A fast, framework-free site with a third-party reservation engine, an event calendar filtered by month, and responsive galleries for 15+ room types.',
      result: "The hotel's main booking site. I host it, manage its DNS, and ship content updates as part of my job there.",
    },
    name: 'Holiday Sands North',
    tagline: 'Oceanfront Hotel Website',
    description:
      'Production marketing and booking site for a family-owned Myrtle Beach boardwalk hotel. Third-party reservation engine integration, dynamic event calendar with month filtering, responsive galleries across 15+ room types.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/JamesxFarris/HSN',
    live: 'https://holidaysandsnorth.com',
    screenshot: '/photos/holiday_sands.png',
    accentColor: '#0F766E',
  },
  {
    id: 'j2dev',
    year: '2025',
    name: 'J2 Development',
    tagline: 'Web Studio Site',
    description:
      'Marketing and portfolio site for J2 Development, a web development studio. Designed and built to be lightweight — no framework overhead on a purely informational site.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/JamesxFarris/J-Development',
    live: 'https://j2webdevelopment.com/',
    screenshot: '/photos/J2.png',
    accentColor: '#1D4ED8',
  },
  {
    id: 'castle-clicker',
    year: '2025',
    name: 'Castle Clicker',
    tagline: 'Browser Incremental Game',
    description:
      'Incremental clicker game with a medieval castle-building theme — built as a PWA so it installs and runs offline. Developed under the J2 Development studio using React and Vite.',
    tech: ['React', 'JavaScript', 'Vite', 'PWA'],
    github: 'https://github.com/J2-Development/Castle-Clicker',
    live: 'https://j2-development.github.io/Castle-Clicker/',
    screenshot: '/photos/Castle_clicker.png',
    accentColor: '#92400E',
  },
  {
    id: 'somniary',
    year: '2023',
    name: 'Somniary',
    tagline: 'Dream Journal App',
    description:
      'Full-stack journaling app built in a team of three using Agile with two-week sprints. Users log private dreams and share to a public "Dreamspace Collective" feed. User auth, daily reflection feature, account settings.',
    tech: ['Node.js', 'Express', 'MySQL', 'Sequelize', 'Handlebars'],
    github: 'https://github.com/JamesxFarris/somniary',
    live: 'https://sparkling-luck-production-37ef.up.railway.app/',
    screenshot: '/photos/Somniary.png',
    accentColor: '#1E3A5F',
  },
];

export type Role = {
  title: string;
  org: string;
  place: string;
  dates: string;
  current?: boolean;
  points: string[];
};

// Newest first.
export const experience: Role[] = [
  {
    title: 'Front Desk & Web Developer',
    org: 'Holiday Sands North',
    place: 'Myrtle Beach, SC',
    dates: 'Apr 2025 – now',
    current: true,
    points: [
      'Designed, built, and maintain holidaysandsnorth.com, including hosting, DNS, and ongoing content updates.',
      'Maintain the print server, Wi-Fi network, and DNS configuration; first-line tech support for staff hardware and connectivity issues.',
      'Handle reservations, check-ins, and guest issue resolution.',
    ],
  },
  {
    title: 'Operations Team Member',
    org: 'Target',
    place: '',
    dates: '2022 – 2025',
    points: [],
  },
  {
    title: 'Shift Supervisor',
    org: 'CVS Health',
    place: '',
    dates: '2020 – 2021',
    points: [],
  },
  {
    title: 'Technical Support Specialist',
    org: 'Startek / ACT WorkKeys',
    place: 'Remote (contract)',
    dates: 'Sep 2019 – Mar 2020',
    points: [
      'Tier 1 and Tier 2 support for the ACT WorkKeys testing platform; resolved data integrity issues and managed student data seeding.',
      'Worked tickets in Salesforce Service Cloud and maintained internal SharePoint training docs.',
    ],
  },
  {
    title: 'Manager',
    org: 'Rite Aid',
    place: '',
    dates: '2018 – 2019',
    points: [],
  },
];

export const education = [
  { name: 'B.S. Computer Science', org: 'Western Governors University', date: 'Expected 2027' },
  { name: 'ITIL 4 Foundation', org: 'PeopleCert', date: 'Mar 2026' },
  { name: 'Full Stack Web Development Certificate', org: 'University of Minnesota', date: 'Aug 2023' },
];

export const skills = {
  Languages: ['TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML / CSS'],
  Frameworks: ['Next.js', 'React', 'React Native', 'Node.js', 'Express', 'Prisma'],
  'Data & Cloud': ['PostgreSQL', 'MongoDB', 'Vercel', 'Railway', 'Linux'],
  'Tools & APIs': ['Stripe', 'Google Maps & Places APIs', 'REST APIs', 'Git', 'GitHub'],
  'IT & Support': ['DNS', 'Wi-Fi networking', 'Print servers', 'Windows', 'Linux', 'Tier 1/2 support', 'Salesforce Service Cloud', 'ITIL 4'],
};
