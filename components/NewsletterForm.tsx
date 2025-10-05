"use client";
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const res = await fetch('/api/newsletter/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, name }) });
    if (res.ok) setStatus('Subscribed!'); else setStatus('Failed to subscribe');
  };

  return (
    <form onSubmit={onSubmit} className="card">
      <h3>Subscribe to our newsletter</h3>
      <label>Name (optional)</label>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
      <button type="submit">Subscribe</button>
      {status && <p>{status}</p>}
    </form>
  );
}
