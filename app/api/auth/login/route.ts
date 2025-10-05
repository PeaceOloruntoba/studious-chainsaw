import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { issueToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = issueToken(String(user._id), user.email);
  cookies().set({ name: 'auth_token', value: token, httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60*60*24*7 });
  return NextResponse.json({ id: user._id, email: user.email, name: user.name });
}
