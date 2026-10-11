'use client';
import { useState } from 'react';

const EMAIL = 'jafarris.exe@gmail.com';

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  marginBottom: 6,
};

export default function Contact() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
    <div style={{ maxWidth: 560 }}>
      <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--platinum)', marginBottom: 24 }}>
        Hiring, or need a site built? Send a message or email me at{' '}
        <a href={`mailto:${EMAIL}`} style={{ color: 'var(--indigo)' }}>
          {EMAIL}
        </a>
        .
      </p>

      {state === 'sent' ? (
        <p role="status" style={{ color: 'var(--live)', fontSize: '1rem', lineHeight: 1.6 }}>
          Message sent. I&apos;ll reply to the email you gave.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label htmlFor="contact-name" style={labelStyle}>Name</label>
            <input id="contact-name" name="name" type="text" required className="field" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="contact-email" style={labelStyle}>Email</label>
            <input id="contact-email" name="email" type="email" required className="field" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="contact-message" style={labelStyle}>Message</label>
            <textarea id="contact-message" name="message" required rows={5} className="field" style={{ resize: 'vertical' }} />
          </div>

          {state === 'error' && (
            <p role="alert" style={{ fontSize: '0.9rem', color: '#ff8a8a' }}>
              The message didn&apos;t send. Email me directly at {EMAIL}.
            </p>
          )}

          <button
            type="submit"
            className="pill-link primary"
            disabled={state === 'sending'}
            style={{ alignSelf: 'flex-start' }}
          >
            {state === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </div>
  );
}
