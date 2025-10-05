import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';

export default function HomePage() {
  return (
    <main className="container">
      <nav>
        <Link href="/admin">Admin</Link>
        <Link href="/blog">Blog</Link>
      </nav>
      <h1>Brand Portfolio</h1>
      <p>Welcome to the brand portfolio website.</p>
      <NewsletterForm />
    </main>
  );
}
