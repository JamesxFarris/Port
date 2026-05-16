'use client';
import { motion, useMotionValue, useAnimationFrame, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export type Section = 'about' | 'projects' | 'skills' | 'contact';

type Props = {
  active: Section | null;
  onNavigate: (s: Section) => void;
  compact?: boolean;
  showLabels?: boolean;
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

// Decorative ASCII for the otherwise-empty front/back cube faces.
const ASCII_CAT = [
  '       _',
  '       \\`*-.',
  '        )  _`-.',
  '       .  : `. .',
  "       : _   '  \\",
  '       ; *` _.   `*-._',
  "       `-.-'          `-.",
  '         ;       `       `.',
  '         :.       .        \\',
  "         . \\  .   :   .-'   .",
  "         '  `+.;  ;  '      :",
  "         :  '  |    ;       ;-.",
  "         ; '   : :`-:     _.`* ;",
  "      .*' /  .*' ; .*`- +'  `*'",
  "      `*-*   `*-*  `*-*'",
].join('\n');

const ASCII_BACK = [
  '             __.-/|',
  "             \\`o_O'",
  '              =( )=  +-------+',
  '                U|   | JAMES |',
  '      /\\  /\\   / |   +-------+',
  '     ) /^\\) ^\\/ _)\\     |',
  '     )   /^\\/   _) \\    |',
  '     )   _ /  / _)  \\___|_',
  ' /\\  )/\\/ ||  | )_)\\___,|))',
  '<  >      |(,,) )__)    |',
  ' ||      /    \\)___)\\',
  ' | \\____(      )___) )____',
  '  \\______(_______;;;)__;;;)',
].join('\n');

function AsciiArt({
  art,
  size,
  color,
  // Glyph width as a fraction of font size. Courier New Latin glyphs are
  // ~0.6em; Braille blocks fall back to a font that renders them ~1em wide.
  charAspect = 0.6,
  lineHeight = 1.1,
  // Fill character used to pad short lines into a clean rectangle. Use a
  // blank Braille cell for Braille art so every cell is the same glyph
  // family (and therefore the same width).
  fill = ' ',
  // 'left' keeps each line's own indentation (good for art drawn on a
  // fixed grid). 'center' strips blank padding from both ends and re-pads
  // symmetrically, so a lopsided figure reads as centered.
  align = 'left',
}: {
  art: string;
  size: number;
  color: string;
  charAspect?: number;
  lineHeight?: number;
  fill?: string;
  align?: 'left' | 'center';
}) {
  const rawLines = art.split('\n');
  // Treat ASCII space and blank Braille (U+2800) as "empty" for trimming.
  const trim = (l: string) => l.replace(/^[ ⠀]+|[ ⠀]+$/g, '');
  const lines = align === 'center' ? rawLines.map(trim) : rawLines;
  const cols = Math.max(...lines.map(l => [...l].length));
  // Pad every line to the same width so the block is a true rectangle.
  const block = lines
    .map(l => {
      const pad = cols - [...l].length;
      if (align === 'center') {
        const left = Math.floor(pad / 2);
        return fill.repeat(left) + l + fill.repeat(pad - left);
      }
      return l + fill.repeat(pad);
    })
    .join('\n');
  // Fit the block within the face with a little padding.
  const fontSize = Math.max(
    4,
    Math.min(
      (size * 0.86) / (cols * charAspect),
      (size * 0.86) / (rawLines.length * lineHeight),
    ),
  );
  return (
    <pre
      aria-hidden="true"
      style={{
        margin: 0,
        color,
        fontFamily: 'Courier New, monospace',
        fontSize,
        lineHeight,
        whiteSpace: 'pre',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {block}
    </pre>
  );
}

const faceStyle = (rotY: number, rotX: number, size: number): React.CSSProperties => ({
  position: 'absolute',
  width: size,
  height: size,
  transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${size / 2}px)`,
});

export default function GameCube({ active, onNavigate, compact = false, showLabels = true }: Props) {
  const size = compact ? 100 : 220;
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
      : '62px 56px';

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
              {compact ? (
                <span
                  style={{
                    color: 'rgba(180,150,255,0.3)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.35em',
                    fontFamily: 'Courier New, monospace',
                  }}
                >
                  ◆
                </span>
              ) : (
                <AsciiArt art={ASCII_CAT} size={size} color="rgba(190,160,255,0.42)" />
              )}
            </div>
            {/* Back face — decorative */}
            <div
              className="cube-face"
              style={{
                position: 'absolute',
                width: size, height: size,
                transform: `rotateY(180deg) translateZ(${half}px)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.55,
              }}
            >
              {!compact && (
                <AsciiArt art={ASCII_BACK} size={size} color="rgba(150,210,180,0.5)" />
              )}
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

      {/* GameCube-style status line */}
      {showLabels && !compact && (
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
