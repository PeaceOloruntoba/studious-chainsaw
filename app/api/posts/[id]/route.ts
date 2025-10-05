import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { requireAuth } from '@/lib/requireAuth';
import { slugify } from '@/utils/slug';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { user, response } = requireAuth();
  if (!user) return response!;
  await dbConnect();
  const updates = await req.json();
  if (updates.title) updates.slug = slugify(updates.title);
  const doc = await Post.findByIdAndUpdate(params.id, updates, { new: true });
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(doc);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { user, response } = requireAuth();
  if (!user) return response!;
  await dbConnect();
  const res = await Post.findByIdAndDelete(params.id);
  if (!res) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
