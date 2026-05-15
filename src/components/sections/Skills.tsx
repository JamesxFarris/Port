'use client';
import { motion } from 'framer-motion';
import { skills } from '@/data/projects';

const CATEGORY_COLORS: Record<string, string> = {
  Languages: '#7C3AED',
  Frameworks: '#0E7490',
  'Data & Cloud': '#0F766E',
  'Tools & APIs': '#9D174D',
};

export default function Skills() {
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
          marginBottom: 24,
          textTransform: 'uppercase',
        }}
      >
        Technical Skills
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {Object.entries(skills).map(([category, items], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.08 }}
          >
            <div
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                color: CATEGORY_COLORS[category] ?? 'rgba(180,150,255,0.5)',
                textTransform: 'uppercase',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 20,
                  height: 1,
                  background: CATEGORY_COLORS[category] ?? 'rgba(180,150,255,0.5)',
                  opacity: 0.6,
                }}
              />
              {category}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(items as string[]).map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: ci * 0.08 + si * 0.04 }}
                  style={{
                    padding: '5px 14px',
                    border: `1px solid ${CATEGORY_COLORS[category]}44`,
                    background: `${CATEGORY_COLORS[category]}14`,
                    color: 'rgba(210,190,255,0.75)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    borderRadius: 2,
                    fontFamily: 'Courier New, monospace',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
