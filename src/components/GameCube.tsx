'use client';
import { motion, useMotionValue, useAnimationFrame, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export type Section = 'about' | 'projects' | 'skills' | 'contact' | 'experience';

type Props = {
  active: Section | null;
  onNavigate: (s: Section) => void;
  compact?: boolean;
  showLabels?: boolean;
  /** Edge length in px; defaults to 100 (compact) or 220. */
  size?: number;
};

// Each face is mounted on a real side of the cube that matches where its
// nav label sits: ABOUT on top, SKILLS on bottom, CONTACT/PROJECTS on the
// sides, EXPERIENCE on the back. `cube` is the cube rotation that brings
// that face flat to the viewer.
const FACES: {
  face: Section;
  label: string;
  rotY: number;
  rotX: number;
  cube: { rotX: number; rotY: number };
}[] = [
  { face: 'about',    label: 'ABOUT',    rotY: 0,   rotX: 90,  cube: { rotX: -90, rotY: 0 } },
  { face: 'skills',   label: 'SKILLS',   rotY: 0,   rotX: -90, cube: { rotX: 90,  rotY: 0 } },
  { face: 'projects', label: 'PROJECTS', rotY: 90,  rotX: 0,   cube: { rotX: 0,   rotY: -90 } },
  { face: 'contact',  label: 'CONTACT',  rotY: -90, rotX: 0,   cube: { rotX: 0,   rotY: 90 } },
  { face: 'experience', label: 'EXPERIENCE', rotY: 180, rotX: 0, cube: { rotX: 0, rotY: 180 } },
];

// Resting pose when nothing is selected — a gentle 3/4 view of the front face.
const IDLE_POSE = { rotX: -14, rotY: -16 };

const faceStyle = (rotY: number, rotX: number, size: number): React.CSSProperties => ({
  position: 'absolute',
  width: size,
  height: size,
  transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${size / 2}px)`,
});

export default function GameCube({ active, onNavigate, compact = false, showLabels = true, size: sizeProp }: Props) {
  const size = sizeProp ?? (compact ? 100 : 220);
  const half = size / 2;

  const rotateX = useMotionValue(IDLE_POSE.rotX);
  const rotateY = useMotionValue(IDLE_POSE.rotY);
  const [hovered, setHovered] = useState(false);

  // Idle turntable spin: a full revolution every 20s, only while no
  // section is selected and the cube isn't hovered.
  useAnimationFrame((_, delta) => {
    if (active === null && !hovered) {
      rotateY.set(rotateY.get() - (delta * 360) / 20000);
    }
  });

  // On select, ease toward that face (rotating in its label's direction);
  // on deselect, ease the tilt back and let the idle spin resume.
  useEffect(() => {
    const ease = [0.25, 0.46, 0.45, 0.94] as const;
    // Shortest angular path from the (possibly multi-turn) current angle.
    const nearest = (current: number, target: number) =>
      current + (((target - current) % 360) + 540) % 360 - 180;
    if (active) {
      const target = FACES.find(f => f.face === active)?.cube ?? IDLE_POSE;
      animate(rotateX, nearest(rotateX.get(), target.rotX), { duration: 0.75, ease });
      animate(rotateY, nearest(rotateY.get(), target.rotY), { duration: 0.75, ease });
    } else {
      animate(rotateX, IDLE_POSE.rotX, { duration: 0.6, ease });
    }
  }, [active, rotateX, rotateY]);

  const sceneMargin = !showLabels
    ? (compact ? '18px' : '28px')
    : compact
      ? '30px 26px'
      : '44px 56px';

  const Root = showLabels ? 'nav' : 'div';

  return (
    <Root
      className="flex flex-col items-center gap-0 select-none"
      aria-label={showLabels ? 'Site sections' : undefined}
    >
      {/* Top nav label */}
      {showLabels && (
        <NavLabel
          label="ABOUT"
          isActive={active === 'about' || active === null}
          onClick={() => onNavigate('about')}
          compact={compact}
        />
      )}

      <div className="flex items-center gap-0">
        {/* Left label */}
        {showLabels && (
          <NavLabel
            label="CONTACT"
            isActive={active === 'contact'}
            onClick={() => onNavigate('contact')}
            compact={compact}
            vertical
            flip
          />
        )}

        {/* The 3D cube */}
        <div
          className="scene"
          style={{ width: size, height: size, margin: sceneMargin }}
        >
          <motion.div
            className="cube"
            aria-hidden="true"
            style={{ width: size, height: size, transformStyle: 'preserve-3d', rotateX, rotateY }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {FACES.map(({ face, label, rotY: fy, rotX: fx }) => (
              <div
                key={face}
                className="cube-face"
                style={{
                  ...faceStyle(fy, fx, size),
                  width: size,
                  height: size,
                  cursor: 'pointer',
                }}
                onClick={() => onNavigate(face)}
              >
                <span
                  style={{
                    color: active === face || (active === null && face === 'about')
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(180,150,255,0.35)',
                    fontSize: compact ? '0.55rem' : '0.85rem',
                    letterSpacing: '0.2em',
                    fontFamily: 'var(--font-mono), monospace',
                    textTransform: 'uppercase',
                    textShadow:
                      active === face
                        ? '0 0 16px rgba(200,160,255,0.9)'
                        : 'none',
                    transition: 'color 0.4s, text-shadow 0.4s',
                    userSelect: 'none',
                  }}
                >
                  {label}
                </span>
                {/* Corner dots like GameCube face */}
                {!compact && (
                  <>
                    {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([dx, dy], i) => (
                      <span
                        key={i}
                        style={{
                          position: 'absolute',
                          width: 4, height: 4,
                          borderRadius: '50%',
                          background: 'rgba(180,150,255,0.25)',
                          left: dx === -1 ? 12 : 'auto',
                          right: dx === 1 ? 12 : 'auto',
                          top: dy === -1 ? 12 : 'auto',
                          bottom: dy === 1 ? 12 : 'auto',
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            ))}

            {/* Front face: shown at rest, carries the monogram */}
            <div
              className="cube-face"
              style={{
                position: 'absolute',
                width: size, height: size,
                transform: `translateZ(${half}px)`,
              }}
            >
              <span
                style={{
                  color: 'rgba(230,222,255,0.55)',
                  fontSize: size * 0.24,
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.04em',
                }}
              >
                JF
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right label */}
        {showLabels && (
          <NavLabel
            label="PROJECTS"
            isActive={active === 'projects'}
            onClick={() => onNavigate('projects')}
            compact={compact}
            vertical
          />
        )}
      </div>

      {/* Bottom nav label */}
      {showLabels && (
        <NavLabel
          label="SKILLS"
          isActive={active === 'skills'}
          onClick={() => onNavigate('skills')}
          compact={compact}
        />
      )}

      {/* Back face: the cube spins around to reach it */}
      {showLabels && (
        <div style={{ marginTop: compact ? 4 : 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span aria-hidden="true" style={{ color: 'rgba(243,154,61,0.75)', fontSize: '0.9rem' }}>⊙</span>
          <NavLabel
            label="EXPERIENCE"
            isActive={active === 'experience'}
            onClick={() => onNavigate('experience')}
            compact={compact}
          />
        </div>
      )}
    </Root>
  );
}

function NavLabel({
  label,
  isActive,
  onClick,
  compact,
  vertical = false,
  flip = false,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  compact: boolean;
  vertical?: boolean;
  flip?: boolean;
}) {
  const style: React.CSSProperties = {
    writingMode: vertical ? 'vertical-rl' : undefined,
    transform: vertical ? (flip ? 'rotate(180deg)' : 'rotate(0deg)') : undefined,
    padding: compact ? '4px 8px' : '8px 16px',
    minWidth: compact ? undefined : vertical ? undefined : 120,
    textAlign: 'center',
    background: 'none',
    border: 0,
    fontFamily: 'inherit',
  };

  return (
    <button
      type="button"
      className={`nav-label ${isActive ? 'active' : 'inactive'}`}
      style={style}
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
    >
      {label}
    </button>
  );
}
