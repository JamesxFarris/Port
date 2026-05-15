'use client';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';

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
          color: 'rgba(180,150,255,0.5)',
          marginBottom: 20,
          textTransform: 'uppercase',
        }}
      >
        {projects.length} Projects
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className="memory-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            style={{ padding: '14px 16px', cursor: 'default' }}
          >
            {/* Top color bar */}
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 2,
                background: p.accentColor,
                opacity: 0.8,
              }}
            />

            <div style={{ display: 'flex', gap: 14 }}>
              {/* Screenshot thumbnail — only for projects without a live link */}
              {p.screenshot && !p.live && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on GitHub"
                  style={{ flexShrink: 0, display: 'block' }}
                >
                  <img
                    src={p.screenshot}
                    alt={`${p.name} screenshot`}
                    style={{
                      width: 90,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: '1px solid rgba(120,80,220,0.25)',
                      opacity: 0.85,
                      display: 'block',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => ((e.target as HTMLImageElement).style.opacity = '1')}
                    onMouseLeave={e => ((e.target as HTMLImageElement).style.opacity = '0.85')}
                  />
                </a>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: '#f0eaff',
                        fontFamily: 'Courier New, monospace',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.65rem',
                        color: 'rgba(180,150,255,0.5)',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginTop: 2,
                      }}
                    >
                      {p.tagline}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0, marginLeft: 8 }}>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.6rem',
                          letterSpacing: '0.15em',
                          color: 'rgba(100,220,200,0.8)',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          border: '1px solid rgba(100,220,200,0.3)',
                          padding: '2px 8px',
                        }}
                      >
                        Live
                      </a>
                    )}
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        color: 'rgba(180,150,255,0.6)',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(120,80,220,0.3)',
                        padding: '2px 8px',
                      }}
                    >
                      Code
                    </a>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(180,165,220,0.65)',
                    lineHeight: 1.6,
                    marginBottom: 10,
                    fontFamily: 'Courier New, monospace',
                  }}
                >
                  {p.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.tech.map(t => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                        color: 'rgba(160,130,255,0.6)',
                        background: 'rgba(80,40,160,0.15)',
                        border: '1px solid rgba(100,70,200,0.2)',
                        padding: '1px 8px',
                        borderRadius: 2,
                      }}
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
