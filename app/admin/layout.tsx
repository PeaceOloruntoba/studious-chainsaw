import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '@/lib/auth';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const user = getUserFromCookie();
  if (!user) redirect('/admin/login');
  return (
    <section className="container">
      <h2>Admin</h2>
      {children}
    </section>
  );
}
