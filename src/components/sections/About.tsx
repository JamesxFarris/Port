'use client';
import { motion } from 'framer-motion';

const lines = [
  "Full-stack developer.",
  "I build things that are useful, then try to make them fast.",
  "Mostly TypeScript and React. Sometimes C++ or Lua when the project calls for it.",
  "When I'm not writing code I'm probably thinking about game systems,",
  "photography, or what the right data model should have been.",
];

export default function About() {
  return (
    <motion.div
      className="section-enter content-scroll"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ height: '100%', padding: '0 8px', paddingRight: 0 }}
    >
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: 'rgba(180,150,255,0.5)',
            marginBottom: 8,
            textTransform: 'uppercase',
          }}
        >
          James Farris
        </div>
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#f0eaff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontFamily: 'Courier New, monospace',
          }}
        >
          Developer.
          <br />
          Builder.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
            style={{
              color: i === 0 ? 'rgba(220,200,255,0.9)' : 'rgba(180,160,230,0.65)',
              fontSize: i === 0 ? '1.1rem' : '0.875rem',
              lineHeight: 1.7,
              fontFamily: 'Courier New, monospace',
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <a
          href="https://github.com/JamesxFarris"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            border: '1px solid rgba(120,80,220,0.4)',
            color: 'rgba(200,180,255,0.8)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            background: 'rgba(80,40,160,0.1)',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.borderColor = 'rgba(160,120,255,0.8)';
            (e.target as HTMLElement).style.color = '#fff';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.borderColor = 'rgba(120,80,220,0.4)';
            (e.target as HTMLElement).style.color = 'rgba(200,180,255,0.8)';
          }}
        >
          GitHub
        </a>
      </div>
    </motion.div>
  );
}
