'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects, type Project } from '@/data/projects';

const featured = projects.filter(p => p.featured);
const more = projects.filter(p => !p.featured);

function Screenshot({ p, ratio }: { p: Project; ratio: string }) {
  const [failed, setFailed] = useState(false);
  const href = p.live ?? p.github;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${p.name}: ${p.live ? 'open live site' : 'view on GitHub'}`}
      style={{
        display: 'block',
        width: '100%',
        aspectRatio: ratio,
        overflow: 'hidden',
        borderRadius: 3,
        border: `1px solid ${p.accentColor}66`,
        background: `linear-gradient(135deg, ${p.accentColor}30 0%, ${p.accentColor}10 100%)`,
      }}
    >
      {p.screenshot && !failed && (
        <img
          src={p.screenshot}
          alt=""
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
      )}
    </a>
  );
}

function Links({ p }: { p: Project }) {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '0.72rem',
    textDecoration: 'none',
    padding: '3px 9px',
    borderRadius: 3,
  };
  return (
    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...base, color: 'var(--live)', border: '1px solid rgba(79,209,189,0.4)' }}
        >
          Live site
        </a>
      )}
      <a
        href={p.github}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...base, color: 'rgba(200,180,255,0.85)', border: '1px solid rgba(120,80,220,0.4)' }}
      >
        Code
      </a>
    </div>
  );
}

function Tech({ p }: { p: Project }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
      {p.tech.map(t => (
        <span
          key={t}
          style={{
            fontSize: '0.7rem',
            color: 'rgba(224,218,246,0.88)',
            background: `${p.accentColor}26`,
            border: `1px solid ${p.accentColor}55`,
            padding: '1px 8px',
            borderRadius: 3,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Header({ p }: { p: Project }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '1rem', fontWeight: 600, color: '#f4efff', margin: 0 }}>
          {p.name}
        </h3>
        <div style={{ fontSize: '0.78rem', color: 'rgba(200,190,236,0.75)', marginTop: 2 }}>
          {p.tagline}, {p.year}
        </div>
      </div>
      <Links p={p} />
    </div>
  );
}

const CASE_ROWS = [
  ['Problem', 'problem'],
  ['What I built', 'built'],
  ['Result', 'result'],
] as const;

function FeaturedCard({ p, i }: { p: Project; i: number }) {
  const cs = p.caseStudy;
  return (
    <motion.article
      className="memory-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.3 }}
      style={{ padding: 16, ['--accent' as string]: p.accentColor } as React.CSSProperties}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <Screenshot p={p} ratio="16 / 10" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Header p={p} />
          {cs && (
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: 0 }}>
              {CASE_ROWS.map(([label, key]) => (
                <div key={key}>
                  <dt
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.72rem',
                      color: key === 'result' ? 'var(--spice)' : 'rgba(196,182,244,0.8)',
                      marginBottom: 1,
                    }}
                  >
                    {label}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.55, color: 'rgba(232,228,246,0.93)' }}>
                    {cs[key]}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <Tech p={p} />
      </div>
    </motion.article>
  );
}

function CompactCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article
      className="memory-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16 + i * 0.06, duration: 0.3 }}
      style={{ padding: 12, ['--accent' as string]: p.accentColor } as React.CSSProperties}
    >
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ width: 150, flexShrink: 0, maxWidth: '100%' }}>
          <Screenshot p={p} ratio="16 / 10" />
        </div>
        <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Header p={p} />
          <p style={{ fontSize: '0.84rem', lineHeight: 1.55, color: 'rgba(226,222,242,0.9)', margin: 0 }}>{p.description}</p>
          <Tech p={p} />
        </div>
      </div>
    </motion.article>
  );
}

const groupHeading: React.CSSProperties = {
  fontFamily: 'var(--font-mono), monospace',
  fontSize: '0.82rem',
  fontWeight: 500,
  color: 'rgba(206,196,244,0.85)',
  margin: '0 0 12px',
};

export default function Projects() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 8 }}>
      <section>
        <h2 style={groupHeading}>Production work</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {featured.map((p, i) => <FeaturedCard key={p.id} p={p} i={i} />)}
        </div>
      </section>
      <section>
        <h2 style={groupHeading}>More projects</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {more.map((p, i) => <CompactCard key={p.id} p={p} i={i} />)}
        </div>
      </section>
    </div>
  );
}
