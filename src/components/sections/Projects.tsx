'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects, type Project } from '@/data/projects';

function Thumbnail({ p }: { p: Project }) {
  const [failed, setFailed] = useState(false);
  const href = p.live ?? p.github;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={p.live ? 'View live site' : 'View on GitHub'}
      style={{
        flexShrink: 0,
        width: '100%',
        maxWidth: 260,
        aspectRatio: '260 / 168',
        display: 'block',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid rgba(120,80,220,0.2)',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(160,120,255,0.5)')}
      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(120,80,220,0.2)')}
    >
      {p.screenshot && !failed ? (
        <img
          src={p.screenshot}
          alt={`${p.name} screenshot`}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: 0.88 }}
        />
      ) : (
        /* Placeholder — shows until screenshot file is dropped in */
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${p.accentColor}28 0%, ${p.accentColor}10 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            color: `${p.accentColor}88`,
          }}
        >
          ↗
        </div>
      )}
    </a>
  );
}

export default function Projects() {
  return (
    <motion.div
      className="content-scroll"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ height: '100%', paddingRight: 4 }}
    >
      <div
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          color: 'rgba(196,180,240,0.72)',
          marginBottom: 20,
          textTransform: 'uppercase',
        }}
      >
        {projects.length} Projects
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className="memory-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            style={{ padding: '12px 14px' }}
          >
            {/* Top accent bar */}
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 2,
                background: p.accentColor,
                opacity: 0.75,
              }}
            />

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Thumbnail p={p} />

              <div style={{ flex: 1, minWidth: 220 }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', color: '#f0eaff', fontFamily: 'Courier New, monospace', fontWeight: 600, letterSpacing: '0.04em' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(190,172,238,0.72)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 1 }}>
                      {p.tagline}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0, marginLeft: 8 }}>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(100,220,200,0.8)', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid rgba(100,220,200,0.3)', padding: '2px 7px', borderRadius: 2 }}
                      >
                        Live
                      </a>
                    )}
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(180,150,255,0.6)', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid rgba(120,80,220,0.3)', padding: '2px 7px', borderRadius: 2 }}
                    >
                      Code
                    </a>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'rgba(220,214,238,0.92)', lineHeight: 1.65, marginBottom: 8, fontFamily: 'Courier New, monospace' }}>
                  {p.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {p.tech.map(t => (
                    <span
                      key={t}
                      style={{ fontSize: '0.58rem', letterSpacing: '0.08em', color: 'rgba(208,198,246,0.82)', background: 'rgba(80,40,160,0.2)', border: '1px solid rgba(120,90,210,0.3)', padding: '1px 7px', borderRadius: 2 }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
