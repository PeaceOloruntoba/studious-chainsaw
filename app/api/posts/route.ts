import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { requireAuth } from '@/lib/requireAuth';
import { slugify } from '@/utils/slug';
import { calculateReadingTime } from '@/utils/readingTime';
import cloudinary from '@/utils/cloudinary';

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || 'published';
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '10');

  const query: any = {};
  if (status) query.status = status;

  // Only allow public access to published posts; other statuses require auth
  if (status !== 'published') {
    const { user, response } = requireAuth();
    if (!user) return response!;
  }

  const [items, total] = await Promise.all([
    Post.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Post.countDocuments(query)
  ]);

  return NextResponse.json({ items, total, page, limit });
}

export async function POST(req: Request) {
  const { user, response } = requireAuth();
  if (!user) return response!;
  await dbConnect();

  const body = await req.json();
  const { title, description, content, coverImageUrl, status } = body || {};
  if (!title || !description || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const slug = slugify(title);
  const readingTime = calculateReadingTime(content);

  let finalCover = coverImageUrl as string | undefined;
  if (!finalCover) {
    const pubId = process.env.CLOUDINARY_DEFAULT_LANDSCAPE_PUBLIC_ID;
    const cloud = process.env.CLOUDINARY_CLOUD_NAME;
    if (pubId && cloud) {
      finalCover = cloudinary.url(pubId, { secure: true });
    }
  }

  const doc = await Post.create({ title, description, content, coverImageUrl: finalCover, slug, status: status === 'published' ? 'published' : 'draft', readingTime });
  return NextResponse.json(doc, { status: 201 });
}
