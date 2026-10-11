import { skills } from '@/data/projects';

const CATEGORY_COLORS: Record<string, string> = {
  Languages: '#9D8CFF',
  Frameworks: '#38BDF8',
  'Data & Cloud': '#2DD4BF',
  'Tools & APIs': '#F472B6',
  'IT & Support': '#F39A3D',
};

export default function Skills() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
      {Object.entries(skills).map(([category, items]) => {
        const color = CATEGORY_COLORS[category] ?? 'var(--indigo)';
        return (
          <div key={category}>
            <h3 className="subhead" style={{ color, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
              {category}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(items as string[]).map(skill => (
                <li
                  key={skill}
                  style={{
                    padding: '4px 10px',
                    border: '1px solid var(--line)',
                    background: 'var(--surface)',
                    color: 'var(--platinum)',
                    fontSize: '0.88rem',
                    borderRadius: 4,
                  }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
