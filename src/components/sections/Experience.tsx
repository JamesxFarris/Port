'use client';
import { motion } from 'framer-motion';
import { experience, earlierRoles, education } from '@/data/projects';

const heading: React.CSSProperties = {
  fontFamily: 'var(--font-mono), monospace',
  fontSize: '0.82rem',
  fontWeight: 500,
  color: 'rgba(206,196,244,0.85)',
  margin: '0 0 14px',
};

const meta: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'rgba(200,190,236,0.75)',
};

export default function Experience() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, paddingBottom: 8 }}>
      <section>
        <h2 style={heading}>Work history</h2>
        {/* Timeline: a rail with one marker per role, newest first */}
        <ol style={{ listStyle: 'none', margin: '0 0 0 6px', padding: 0, borderLeft: '1px solid rgba(120,80,220,0.35)' }}>
          {experience.map((r, i) => (
            <motion.li
              key={r.org}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              style={{ position: 'relative', paddingLeft: 22, paddingBottom: 22 }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: -5,
                  top: 6,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: r.current ? 'var(--spice)' : '#2a1d55',
                  border: `1px solid ${r.current ? 'var(--spice)' : 'rgba(160,130,255,0.6)'}`,
                  boxShadow: r.current ? '0 0 10px rgba(243,154,61,0.6)' : 'none',
                }}
              />
              <h3 style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.98rem', fontWeight: 600, color: '#f4efff', margin: 0 }}>
                {r.title}
              </h3>
              <div style={{ ...meta, marginTop: 2 }}>
                {r.org}, {r.place}
                <span style={{ color: r.current ? '#ffd2a1' : undefined, marginLeft: 10 }}>{r.dates}</span>
              </div>
              <ul style={{ margin: '10px 0 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {r.points.map(pt => (
                  <li key={pt} style={{ fontSize: '0.88rem', lineHeight: 1.55, color: 'rgba(232,228,246,0.92)' }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
          <li style={{ position: 'relative', paddingLeft: 22 }}>
            <span
              aria-hidden="true"
              style={{ position: 'absolute', left: -4, top: 7, width: 7, height: 7, borderRadius: '50%', background: 'rgba(160,130,255,0.45)' }}
            />
            <h3 style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(230,224,250,0.9)', margin: 0 }}>
              Earlier roles
            </h3>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.55, color: 'rgba(220,214,240,0.85)', margin: '4px 0 0', maxWidth: '68ch' }}>
              {earlierRoles}
            </p>
          </li>
        </ol>
      </section>

      <section>
        <h2 style={heading}>Education and certifications</h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {education.map(e => (
            <li key={e.name}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.9rem', fontWeight: 500, color: '#f0eaff' }}>{e.name}</div>
              <div style={meta}>
                {e.org}
                <span style={{ marginLeft: 10 }}>{e.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
