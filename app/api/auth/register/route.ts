import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { email, password, name } = body || {};
  if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, name });
  return NextResponse.json({ id: user._id, email: user.email, name: user.name }, { status: 201 });
}
