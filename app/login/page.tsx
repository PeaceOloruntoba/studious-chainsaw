"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (!res.ok) {
      const j = await res.json();
      setError(j.error || 'Login failed');
      return;
    }
    router.push('/admin');
  };

  return (
    <main className="container">
      <h1>Admin Login</h1>
      <form className="card" onSubmit={onSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
