'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

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

export default function Contact() {
  const [sent, setSent] = useState(false);

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

      {!sent ? (
        <form
          onSubmit={e => { e.preventDefault(); setSent(true); }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(180,150,255,0.5)', marginBottom: 6, textTransform: 'uppercase' }}>
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Your name"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(160,120,255,0.7)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(120,80,220,0.3)')}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(180,150,255,0.5)', marginBottom: 6, textTransform: 'uppercase' }}>
              Email
            </label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(160,120,255,0.7)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(120,80,220,0.3)')}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(180,150,255,0.5)', marginBottom: 6, textTransform: 'uppercase' }}>
              Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="What are you building?"
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(160,120,255,0.7)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(120,80,220,0.3)')}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 24px',
              background: 'rgba(80,40,160,0.3)',
              border: '1px solid rgba(120,80,220,0.5)',
              color: 'rgba(220,200,255,0.9)',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              transition: 'background 0.2s, border-color 0.2s',
              borderRadius: 2,
              alignSelf: 'flex-start',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = 'rgba(100,50,200,0.4)';
              (e.target as HTMLElement).style.borderColor = 'rgba(160,120,255,0.8)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'rgba(80,40,160,0.3)';
              (e.target as HTMLElement).style.borderColor = 'rgba(120,80,220,0.5)';
            }}
          >
            Send Message
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: 'rgba(100,220,180,0.8)', fontSize: '0.85rem', fontFamily: 'Courier New, monospace', lineHeight: 1.8 }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>✓</div>
          <div>Message received.</div>
          <div style={{ color: 'rgba(180,150,255,0.5)', fontSize: '0.75rem', marginTop: 8 }}>
            I'll get back to you soon.
          </div>
        </motion.div>
      )}

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(100,70,180,0.2)' }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(180,150,255,0.4)', marginBottom: 12, textTransform: 'uppercase' }}>
          Also find me
        </div>
        <a
          href="https://github.com/JamesxFarris"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'rgba(180,150,255,0.6)',
            fontSize: '0.75rem',
            textDecoration: 'none',
            letterSpacing: '0.1em',
          }}
        >
          github.com/JamesxFarris
        </a>
      </div>
    </motion.div>
  );
}
