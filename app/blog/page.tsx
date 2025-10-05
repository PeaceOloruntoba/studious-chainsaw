import Link from 'next/link';

async function getPosts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/posts`, { next: { revalidate: 60 } });
  if (!res.ok) return { items: [] };
  return res.json();
}

export default async function BlogListPage() {
  const { items } = await getPosts();
  return (
    <main className="container">
      <nav>
        <Link href="/">Home</Link>
      </nav>
      <h1>Blog</h1>
      {items.length === 0 && <p>No posts yet.</p>}
      {items.map((p: any) => (
        <div key={p._id} className="card">
          <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
          <p>{p.description}</p>
        </div>
      ))}
    </main>
  );
}
