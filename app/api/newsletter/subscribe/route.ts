import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/models/NewsletterSubscriber';
import emailUtils from '@/utils/email';

export async function POST(req: Request) {
  await dbConnect();
  const { email, name } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const existing = await Subscriber.findOne({ email });
  if (existing) return NextResponse.json({ ok: true, already: true });

  const doc = await Subscriber.create({ email, name });

  // Send welcome email using nodemailer with Brevo SMTP
  try {
    await emailUtils.sendNewsletterEmail(email, name, {
      subject: 'Welcome to Our Newsletter!',
      brandName: 'Brand Portfolio',
      message: 'Thank you for subscribing to our newsletter! You\'ll receive regular updates about our latest blog posts, insights, and exclusive content.',
      ctaLink: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog`,
      isWelcome: true,
      showFeatures: true,
      socialLinks: [
        { platform: 'Twitter', icon: '🐦', url: 'https://twitter.com/yourbrand' },
        { platform: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/yourbrand' }
      ],
      unsubscribeLink: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/newsletter/unsubscribe?email=${email}`
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't fail the subscription if email fails
  }

  return NextResponse.json({ ok: true, id: doc._id });
}
