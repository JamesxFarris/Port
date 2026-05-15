'use client';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(40,20,80,0.3)',
  border: '1px solid rgba(120,80,220,0.3)',
  color: '#f0eaff',
  padding: '10px 14px',
  fontSize: '0.82rem',
  fontFamily: 'Courier New, monospace',
  outline: 'none',
  borderRadius: 2,
  transition: 'border-color 0.2s',
};

const label = (text: string) => (
  <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(180,150,255,0.5)', marginBottom: 6, textTransform: 'uppercase' as const }}>
    {text}
  </label>
);

export default function Contact() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
        }),
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ height: '100%' }}
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
        Get in Touch
      </div>

      {state === 'sent' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: 'rgba(100,220,180,0.8)', fontSize: '0.85rem', fontFamily: 'Courier New, monospace', lineHeight: 1.8 }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>✓</div>
          <div>Message sent.</div>
          <div style={{ color: 'rgba(180,150,255,0.5)', fontSize: '0.75rem', marginTop: 8 }}>
            I'll get back to you at jafarris.exe@gmail.com.
          </div>
        </motion.div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div>
            {label('Name')}
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(160,120,255,0.7)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(120,80,220,0.3)')}
            />
          </div>
          <div>
            {label('Email')}
            <input
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(160,120,255,0.7)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(120,80,220,0.3)')}
            />
          </div>
          <div>
            {label('Message')}
            <textarea
              name="message"
              required
              rows={4}
              placeholder="What are you building?"
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(160,120,255,0.7)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(120,80,220,0.3)')}
            />
          </div>

          {state === 'error' && (
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,100,100,0.8)', letterSpacing: '0.1em' }}>
              Something went wrong — try emailing jafarris.exe@gmail.com directly.
            </div>
          )}

          <button
            type="submit"
            disabled={state === 'sending'}
            style={{
              padding: '10px 24px',
              background: 'rgba(80,40,160,0.3)',
              border: '1px solid rgba(120,80,220,0.5)',
              color: state === 'sending' ? 'rgba(180,150,255,0.4)' : 'rgba(220,200,255,0.9)',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: state === 'sending' ? 'default' : 'pointer',
              fontFamily: 'Courier New, monospace',
              transition: 'background 0.2s, border-color 0.2s',
              borderRadius: 2,
              alignSelf: 'flex-start',
            }}
            onMouseEnter={e => {
              if (state === 'sending') return;
              const el = e.currentTarget;
              el.style.background = 'rgba(100,50,200,0.4)';
              el.style.borderColor = 'rgba(160,120,255,0.8)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(80,40,160,0.3)';
              el.style.borderColor = 'rgba(120,80,220,0.5)';
            }}
          >
            {state === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(100,70,180,0.2)' }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(180,150,255,0.4)', marginBottom: 12, textTransform: 'uppercase' }}>
          Also find me
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { label: 'github.com/JamesxFarris', href: 'https://github.com/JamesxFarris' },
            { label: 'linkedin.com/in/james-farris', href: 'https://linkedin.com/in/james-farris' },
          ].map(({ label: lbl, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(180,150,255,0.55)', fontSize: '0.75rem', textDecoration: 'none', letterSpacing: '0.08em' }}
            >
              {lbl}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
