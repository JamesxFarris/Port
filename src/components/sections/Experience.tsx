import { experience, education } from '@/data/projects';

const meta: React.CSSProperties = {
  fontSize: '0.88rem',
  color: 'var(--text-muted)',
  marginTop: 2,
};

const roleTitle: React.CSSProperties = {
  fontFamily: 'var(--font-mono), monospace',
  fontSize: '1rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
};

export default function Experience() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Timeline: a rail with one marker per role, newest first */}
      <ol style={{ listStyle: 'none', margin: '0 0 0 5px', padding: 0, borderLeft: '1px solid var(--line)' }}>
        {experience.map((r, i) => (
          <li
            key={r.org}
            style={{ position: 'relative', paddingLeft: 24, paddingBottom: i === experience.length - 1 ? 0 : 28 }}
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
                background: r.current ? 'var(--spice)' : 'var(--bg)',
                border: `1px solid ${r.current ? 'var(--spice)' : 'var(--indigo)'}`,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <h3 style={roleTitle}>{r.title}</h3>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.82rem',
                  color: r.current ? 'var(--spice)' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {r.dates}
              </span>
            </div>
            <div style={meta}>
              {r.org}
              {r.place && `, ${r.place}`}
            </div>
            {r.points.length > 0 && (
              <ul style={{ margin: '10px 0 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {r.points.map(pt => (
                  <li key={pt} style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--platinum)' }}>
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>

      <div>
        <h3 className="subhead">Education and certifications</h3>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {education.map(e => (
            <li key={e.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ ...roleTitle, fontSize: '0.95rem', fontWeight: 500 }}>{e.name}</div>
                <div style={meta}>{e.org}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {e.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
