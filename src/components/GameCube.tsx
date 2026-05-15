'use client';
import { motion } from 'framer-motion';

export type Section = 'about' | 'projects' | 'skills' | 'contact';

type Props = {
  active: Section | null;
  onNavigate: (s: Section) => void;
  compact?: boolean;
};

// Each face is mounted on a real side of the cube that matches where its
// nav label sits: ABOUT on top, SKILLS on bottom, CONTACT/PROJECTS on the
// sides. `cube` is the cube rotation that brings that face flat to the viewer.
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
];

// Resting pose when nothing is selected — a gentle 3/4 view of the front face.
const IDLE_POSE = { rotX: -14, rotY: -16 };

const faceStyle = (rotY: number, rotX: number, size: number): React.CSSProperties => ({
  position: 'absolute',
  width: size,
  height: size,
  transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${size / 2}px)`,
});

export default function GameCube({ active, onNavigate, compact = false }: Props) {
  const size = compact ? 100 : 220;
  const half = size / 2;

  // Rotation: bring the active face to the front, rotating toward the
  // direction of its label (up for ABOUT, down for SKILLS, etc.).
  const pose = active
    ? FACES.find(f => f.face === active)?.cube ?? IDLE_POSE
    : IDLE_POSE;

  return (
    <div className="flex flex-col items-center gap-0 select-none">
      {/* Top nav label */}
      <NavLabel
        label="ABOUT"
        isActive={active === 'about' || active === null}
        onClick={() => onNavigate('about')}
        compact={compact}
      />

      <div className="flex items-center gap-0">
        {/* Left label */}
        <NavLabel
          label="CONTACT"
          isActive={active === 'contact'}
          onClick={() => onNavigate('contact')}
          compact={compact}
          vertical
          flip
        />

        {/* The 3D cube */}
        <div
          className="scene"
          style={{ width: size, height: size, margin: compact ? '24px 12px' : '48px 24px' }}
        >
          <motion.div
            className="cube"
            style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
            animate={{ rotateX: pose.rotX, rotateY: pose.rotY }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                    fontFamily: 'Courier New, monospace',
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

            {/* Front face — shown at rest, decorative */}
            <div
              className="cube-face"
              style={{
                position: 'absolute',
                width: size, height: size,
                transform: `translateZ(${half}px)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  color: 'rgba(180,150,255,0.3)',
                  fontSize: compact ? '0.5rem' : '0.7rem',
                  letterSpacing: '0.35em',
                  fontFamily: 'Courier New, monospace',
                }}
              >
                ◆
              </span>
            </div>
            {/* Back face — decorative */}
            <div
              className="cube-face"
              style={{
                position: 'absolute',
                width: size, height: size,
                transform: `rotateY(180deg) translateZ(${half}px)`,
                opacity: 0.2,
              }}
            />
          </motion.div>
        </div>

        {/* Right label */}
        <NavLabel
          label="PROJECTS"
          isActive={active === 'projects'}
          onClick={() => onNavigate('projects')}
          compact={compact}
          vertical
        />
      </div>

      {/* Bottom nav label */}
      <NavLabel
        label="SKILLS"
        isActive={active === 'skills'}
        onClick={() => onNavigate('skills')}
        compact={compact}
      />

      {/* GameCube-style status line */}
      {!compact && (
        <div
          style={{
            marginTop: 20,
            color: 'rgba(180,150,255,0.45)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: '0.9rem' }}>⊙</span>
          <span>MENU SELECTION</span>
        </div>
      )}
    </div>
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
  };

  return (
    <span
      className={`nav-label ${isActive ? 'active' : 'inactive'}`}
      style={style}
      onClick={onClick}
    >
      {label}
    </span>
  );
}
