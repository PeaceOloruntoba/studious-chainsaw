import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  console.warn('JWT_SECRET not set. Authentication will not work until configured.');
}

export type JwtPayload = { uid: string; email: string };

export function signJwt(payload: JwtPayload) {
  if (!JWT_SECRET) throw new Error('JWT_SECRET not configured');
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token: string): JwtPayload | null {
  if (!JWT_SECRET) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
