'use client';
import { motion } from 'framer-motion';

const bio = [
  "Self-taught full-stack developer based in Conway, South Carolina.",
  "I build and ship production software — two live sites serving real users right now.",
  "Finishing a B.S. in Computer Science at WGU, currently picking up Java alongside my usual TypeScript stack.",
];

const linkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 20px',
  border: '1px solid rgba(120,80,220,0.4)',
  color: 'rgba(200,180,255,0.8)',
  fontSize: '0.72rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  background: 'rgba(80,40,160,0.1)',
  transition: 'border-color 0.2s, color 0.2s',
  borderRadius: 2,
  cursor: 'pointer',
  fontFamily: 'Courier New, monospace',
};

function HoverLink({ href, download, children }: { href: string; download?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download}
      style={linkStyle}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(160,120,255,0.8)';
        el.style.color = '#fff';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(120,80,220,0.4)';
        el.style.color = 'rgba(200,180,255,0.8)';
      }}
    >
      {children}
    </a>
  );
}

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
            color: 'rgba(180,150,255,0.5)',
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
            fontFamily: 'Courier New, monospace',
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
              color: i === 0 ? 'rgba(220,200,255,0.88)' : 'rgba(180,160,230,0.62)',
              fontSize: i === 0 ? '1rem' : '0.875rem',
              lineHeight: 1.75,
              fontFamily: 'Courier New, monospace',
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <HoverLink href="/resume.pdf" download>
          Download Resume
        </HoverLink>
        <HoverLink href="https://github.com/JamesxFarris">
          GitHub
        </HoverLink>
        <HoverLink href="https://linkedin.com/in/james-farris">
          LinkedIn
        </HoverLink>
      </div>
    </motion.div>
  );
}
