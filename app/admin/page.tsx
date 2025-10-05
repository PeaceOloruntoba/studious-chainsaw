"use client";
import { useEffect, useState } from 'react';
import AdminPostForm from '@/components/AdminPostForm';
import Link from 'next/link';

export default function AdminDashboard() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [published, setPublished] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);

  const load = async () => {
    const [dRes, pRes, sRes] = await Promise.all([
      fetch('/api/posts?status=draft'),
      fetch('/api/posts?status=published'),
      fetch('/api/newsletter/list')
    ]);
    if (dRes.ok) setDrafts((await dRes.json()).items);
    if (pRes.ok) setPublished((await pRes.json()).items);
    if (sRes.ok) setSubs((await sRes.json()).items);
  };

  useEffect(() => { load(); }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <main className="container">
      <nav>
        <Link href="/">Home</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <h1>Admin Dashboard</h1>
      <AdminPostForm onCreated={load} />

      <section>
        <h2>Drafts</h2>
        {drafts.map(p => (
          <div key={p._id} className="card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Published</h2>
        {published.map(p => (
          <div key={p._id} className="card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <Link href={`/blog/${p.slug}`}>View</Link>
          </div>
        ))}
      </section>

      <section>
        <h2>Newsletter Subscribers</h2>
        {subs.length === 0 && <p>No subscribers yet.</p>}
        {subs.map(s => (
          <div key={s._id} className="card">
            <b>{s.email}</b>
            {s.name && <span> — {s.name}</span>}
          </div>
        ))}
      </section>
    </main>
  );
}
