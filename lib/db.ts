import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI');
}

interface GlobalWithMongoose {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

declare const global: GlobalWithMongoose & typeof globalThis;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: 'brand_portfolio' });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
