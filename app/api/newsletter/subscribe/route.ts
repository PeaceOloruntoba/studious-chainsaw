import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/models/NewsletterSubscriber';
import { contacts, getSender, brevo } from '@/utils/brevo';

export async function POST(req: Request) {
  await dbConnect();
  const { email, name } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const existing = await Subscriber.findOne({ email });
  if (existing) return NextResponse.json({ ok: true, already: true });

  const doc = await Subscriber.create({ email, name });

  // Try to add to Brevo contacts (best-effort)
  try {
    await contacts.createContact({ email, attributes: { FIRSTNAME: name || '' }, updateEnabled: true });
  } catch {}

  // Send a simple confirmation email (best-effort)
  try {
    const sender = getSender();
    await brevo.sendTransacEmail({
      to: [{ email, name: name || email }],
      subject: 'Subscription confirmed',
      htmlContent: `<p>Thanks for subscribing!</p>`,
      sender
    });
  } catch {}

  return NextResponse.json({ ok: true, id: doc._id });
}
