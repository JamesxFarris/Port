'use client';
import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
  // Flare lifecycle: a brief, brighter sparkle on a random star.
  flare: number; // 0 = none, otherwise remaining ms
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number; // remaining ms
  maxLife: number;
};

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let animId: number;
    let prev = performance.now();
    const stars: Star[] = [];
    const shooters: Shooter[] = [];
    // ms until the next shooting star / next flare.
    let nextShooter = rand(2500, 6000);
    let nextFlare = rand(1500, 4000);

    function rand(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      stars.length = 0;
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.2,
          speed: Math.random() * 0.3 + 0.05,
          phase: Math.random() * Math.PI * 2,
          flare: 0,
        });
      }
    };

    const spawnShooter = () => {
      // Start near the top, off the left/right edge, streak down-across.
      const fromLeft = Math.random() < 0.5;
      const speed = rand(0.45, 0.75); // px per ms
      const angle = rand(0.32, 0.52); // radians below horizontal
      const dir = fromLeft ? 1 : -1;
      shooters.push({
        x: fromLeft ? rand(-80, canvas.width * 0.3) : rand(canvas.width * 0.7, canvas.width + 80),
        y: rand(-40, canvas.height * 0.35),
        vx: dir * speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        len: rand(80, 160),
        life: 0,
        maxLife: rand(700, 1100),
      });
    };

    const draw = (now: number) => {
      const dt = Math.min(now - prev, 50); // clamp after tab switches
      prev = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Twinkling field.
      for (const s of stars) {
        let o = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(s.phase + now * s.speed * 0.001));
        let r = s.r;
        if (s.flare > 0) {
          s.flare -= dt;
          // Ease the flare in then out over its lifetime.
          const k = Math.max(0, s.flare) / 900;
          const pulse = Math.sin((1 - k) * Math.PI);
          o = Math.min(1, o + 0.7 * pulse);
          r = s.r + 1.6 * pulse;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 180, 255, ${o})`;
        ctx.fill();
      }

      if (!reduceMotion) {
        // Schedule + draw shooting stars.
        nextShooter -= dt;
        if (nextShooter <= 0) {
          spawnShooter();
          nextShooter = rand(5000, 13000);
        }
        for (let i = shooters.length - 1; i >= 0; i--) {
          const sh = shooters[i];
          sh.life += dt;
          sh.x += sh.vx * dt;
          sh.y += sh.vy * dt;
          const k = 1 - sh.life / sh.maxLife;
          if (
            k <= 0 ||
            sh.x < -200 ||
            sh.x > canvas.width + 200 ||
            sh.y > canvas.height + 200
          ) {
            shooters.splice(i, 1);
            continue;
          }
          // Fade in quickly, fade out toward the end.
          const alpha = Math.sin(Math.min(1, sh.life / sh.maxLife) * Math.PI) * 0.9;
          const mag = Math.hypot(sh.vx, sh.vy) || 1;
          const tailX = sh.x - (sh.vx / mag) * sh.len;
          const tailY = sh.y - (sh.vy / mag) * sh.len;
          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, `rgba(225, 215, 255, ${alpha})`);
          grad.addColorStop(1, 'rgba(225, 215, 255, 0)');
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.stroke();
          // Bright head.
          ctx.beginPath();
          ctx.arc(sh.x, sh.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 240, 255, ${alpha})`;
          ctx.fill();
        }

        // Occasionally make a random star flare.
        nextFlare -= dt;
        if (nextFlare <= 0 && stars.length) {
          const s = stars[(Math.random() * stars.length) | 0];
          if (s.flare <= 0) s.flare = 900;
          nextFlare = rand(2200, 6000);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    init();
    animId = requestAnimationFrame(draw);
    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
