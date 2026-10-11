'use client';
import { useEffect, useState } from 'react';
import GameCube, { type Section } from '@/components/GameCube';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

// Page order, top to bottom.
const SECTIONS: { id: Section; title: string; Component: React.ComponentType }[] = [
  { id: 'about', title: 'About', Component: About },
  { id: 'projects', title: 'Projects', Component: Projects },
  { id: 'experience', title: 'Experience', Component: Experience },
  { id: 'skills', title: 'Skills', Component: Skills },
  { id: 'contact', title: 'Contact', Component: Contact },
];

const LINKEDIN = 'https://www.linkedin.com/in/james-farris-9b4b33166/';

/** Which section is crossing the upper-middle of the viewport. */
function useScrollSpy(ids: Section[]) {
  const [current, setCurrent] = useState<Section>(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(e.target.id as Section);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return current;
}

/** Cube edge length that fits the viewport: smaller on phones and short screens. */
function useCubeSize() {
  const [size, setSize] = useState(200);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 1024) setSize(120);
      else setSize(h < 760 ? 140 : h < 880 ? 170 : 200);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

function Identity() {
  return (
    <div style={{ maxWidth: 440 }}>
      <h1
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 'clamp(2rem, 4vw, 2.6rem)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        James Farris
      </h1>
      <div
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '1rem',
          color: 'var(--indigo)',
          marginTop: 8,
        }}
      >
        Full-stack developer &amp; IT support
      </div>
      <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: 'var(--text-muted)', marginTop: 16 }}>
        I build and run production web apps, including a 3,000+ listing directory with Stripe
        payments and the booking site for a Myrtle Beach hotel.
      </p>
      <div className="identity-links" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
        <a className="pill-link primary" href="/resume.pdf" download>
          Resume
        </a>
        <a className="pill-link" href="https://github.com/JamesxFarris" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="pill-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const current = useScrollSpy(SECTIONS.map(s => s.id));
  const cubeSize = useCubeSize();
  const compact = cubeSize < 150;

  const goTo = (id: Section) => {
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
  };

  return (
    <main className="page">
      <header className="rail">
        <Identity />
        <div style={{ alignSelf: 'center', marginTop: 24 }}>
          {/* At the top of the page the cube idles; further down it faces the current section. */}
          <GameCube
            active={current === 'about' ? null : current}
            onNavigate={goTo}
            compact={compact}
            size={cubeSize}
          />
        </div>
      </header>

      <div className="content">
        {SECTIONS.map(({ id, title, Component }) => (
          <section key={id} id={id} aria-labelledby={`${id}-title`}>
            <h2 id={`${id}-title`} className="section-title">
              {title}
            </h2>
            <Component />
          </section>
        ))}
        <footer style={{ marginTop: 72, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Built with Next.js by James Farris. The cube is a nod to the GameCube menu.
        </footer>
      </div>
    </main>
  );
}
