'use client';
import { motion } from 'framer-motion';

const bio = [
  "Self-taught full-stack developer in Conway, South Carolina — I design, build, and ship complete products, not just features.",
  "Two production sites are live and serving real users today, including a 3,000+ listing directory with payments, search, and SEO built end to end.",
  "Comfortable across the stack: TypeScript and React on the front; Node, PostgreSQL, and Prisma on the back — deployed and maintained in production.",
  "I'm also the on-site IT person at my day job: Wi-Fi, DNS, the print server, and first-line support for staff.",
  "Finishing a B.S. in Computer Science at WGU and adding Java to a primarily TypeScript toolkit.",
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ height: '100%', padding: '0 8px', paddingRight: 0 }}
    >
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: 'rgba(196,180,240,0.72)',
            marginBottom: 8,
            textTransform: 'uppercase',
          }}
        >
          Conway, SC
        </div>
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#f0eaff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-mono), monospace',
          }}
        >
          James Farris
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
        {bio.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
            style={{
              color: i === 0 ? 'rgba(232,226,250,0.95)' : 'rgba(216,210,236,0.85)',
              fontSize: i === 0 ? '1.05rem' : '0.95rem',
              lineHeight: 1.65,
              maxWidth: '64ch',
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a className="pill-link primary" href="/resume.pdf" download>
          Download resume
        </a>
        <a className="pill-link" href="https://github.com/JamesxFarris" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="pill-link" href="https://www.linkedin.com/in/james-farris-9b4b33166/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </motion.div>
  );
}
