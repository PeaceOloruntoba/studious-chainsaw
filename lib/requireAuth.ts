import { NextResponse } from 'next/server';
import { getUserFromCookie } from '@/lib/auth';

export function requireAuth() {
  const user = getUserFromCookie();
  if (!user) {
    return { user: null as null, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  return { user, response: null as null };
}
