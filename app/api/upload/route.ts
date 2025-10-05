import { NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';
import { Buffer } from 'node:buffer';
import { requireAuth } from '@/lib/requireAuth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { user, response } = requireAuth();
  if (!user) return response!;
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const res = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'brand-portfolio' }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
      stream.end(buffer);
    });

    return NextResponse.json({ url: res.secure_url, public_id: res.public_id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Upload failed' }, { status: 500 });
  }
}
