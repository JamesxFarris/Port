import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'James Farris — Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a2a 0%, #1a1040 100%)',
          fontFamily: 'monospace',
        }}
      >
        <svg width="150" height="150" viewBox="0 0 32 32">
          <g transform="translate(16 16)">
            <path d="M0 -9 L8 -4.5 L0 0 L-8 -4.5 Z" fill="#8b5cf6" />
            <path d="M-8 -4.5 L0 0 L0 9 L-8 4.5 Z" fill="#4c1d95" />
            <path d="M8 -4.5 L0 0 L0 9 L8 4.5 Z" fill="#0d7a7a" />
          </g>
        </svg>
        <div style={{ fontSize: 72, fontWeight: 700, color: '#f0eaff', marginTop: 36 }}>
          James Farris
        </div>
        <div style={{ fontSize: 30, letterSpacing: 8, color: '#cec6ec', marginTop: 12 }}>
          FULL-STACK DEVELOPER
        </div>
        <div style={{ fontSize: 24, color: '#8b5cf6', marginTop: 28 }}>
          Available for full-stack roles
        </div>
      </div>
    ),
    size,
  );
}
