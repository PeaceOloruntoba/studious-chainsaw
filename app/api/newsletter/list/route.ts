import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/models/NewsletterSubscriber';
import { requireAuth } from '@/lib/requireAuth';

export async function GET() {
  const { user, response } = requireAuth();
  if (!user) return response!;
  await dbConnect();
  const subs = await Subscriber.find().sort({ createdAt: -1 });
  return NextResponse.json({ items: subs });
}
