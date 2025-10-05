import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug, status: 'published' });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}
