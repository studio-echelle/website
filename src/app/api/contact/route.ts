import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, projectType, location, budget, message } = body;

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const emailBody = [
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Project Type: ${projectType}`,
      location ? `Project Location: ${location}` : null,
      budget ? `Budget Range: ${budget}` : null,
      '',
      'Message:',
      message,
    ]
      .filter(Boolean)
      .join('\n');

    await resend.emails.send({
      from: 'Studio Échelle <onboarding@resend.dev>',
      to: 'hello@studioechelle.com',
      subject: `New Enquiry — ${projectType} — ${name}`,
      text: emailBody,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Failed to send enquiry. Please try again.' },
      { status: 500 },
    );
  }
}
