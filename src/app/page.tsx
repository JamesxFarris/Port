'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StarField from '@/components/StarField';
import GameCube, { type Section } from '@/components/GameCube';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

const SECTION_COMPONENTS: Record<Section, React.ComponentType> = {
  about: About,
  projects: Projects,
  skills: Skills,
  contact: Contact,
};

export default function Home() {
  const [active, setActive] = useState<Section | null>(null);

  const handleNavigate = (s: Section) => {
    setActive(prev => (prev === s ? null : s));
  };

  const SectionContent = active ? SECTION_COMPONENTS[active] : null;

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StarField />

      {/* Ambient glow behind cube */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(80,30,160,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          left: active ? '22%' : '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      {/* Main layout */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1400,
          padding: '0 40px',
          gap: 0,
        }}
      >
        {/* Cube panel */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          animate={{ x: active ? 0 : '18vw' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Name — shown when no section is active */}
          <AnimatePresence>
            {!active && (
              <motion.div
                key="name"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center', marginBottom: 32 }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#f0eaff',
                    fontFamily: 'Courier New, monospace',
                    lineHeight: 1.1,
                  }}
                >
                  James Farris
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    color: 'rgba(180,150,255,0.45)',
                    marginTop: 8,
                    textTransform: 'uppercase',
                  }}
                >
                  Full-Stack Developer
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <GameCube
            active={active}
            onNavigate={handleNavigate}
            compact={false}
          />
        </motion.div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          {active && SectionContent && (
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                flex: 1,
                height: '78vh',
                maxHeight: 640,
                marginLeft: 48,
                paddingLeft: 48,
                borderLeft: '1px solid rgba(100,70,180,0.25)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Section header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                  paddingBottom: 16,
                  borderBottom: '1px solid rgba(100,70,180,0.2)',
                }}
              >
                <div
                  style={{
                    fontSize: '1.1rem',
                    color: '#f0eaff',
                    fontFamily: 'Courier New, monospace',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  {active}
                </div>
                <button
                  onClick={() => setActive(null)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(120,80,220,0.3)',
                    color: 'rgba(180,150,255,0.5)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    padding: '4px 12px',
                    cursor: 'pointer',
                    fontFamily: 'Courier New, monospace',
                    textTransform: 'uppercase',
                    borderRadius: 2,
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = 'rgba(220,200,255,0.8)';
                    (e.target as HTMLElement).style.borderColor = 'rgba(160,120,255,0.6)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = 'rgba(180,150,255,0.5)';
                    (e.target as HTMLElement).style.borderColor = 'rgba(120,80,220,0.3)';
                  }}
                >
                  ✕ Close
                </button>
              </div>

              {/* Scrollable content */}
              <div className="content-scroll" style={{ flex: 1, overflowY: 'auto', paddingRight: 8 }}>
                <SectionContent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
