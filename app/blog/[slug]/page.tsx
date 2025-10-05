import Link from 'next/link';

async function getPost(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/post/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) {
    return (
      <main className="container">
        <nav>
          <Link href="/blog">Blog</Link>
          <Link href="/">Home</Link>
        </nav>
        <p>Post not found.</p>
      </main>
    );
  }
  return (
    <main className="container">
      <nav>
        <Link href="/blog">Blog</Link>
        <Link href="/">Home</Link>
      </nav>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      {post.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImageUrl} alt={post.title} style={{ maxWidth: '100%', height: 'auto' }} />
      )}
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
