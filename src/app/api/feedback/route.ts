import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { description, type } = await req.json();

    if (!description || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        description,
        type,
        userId: session.user.id,
      },
    });

    try {
      // Configure your SMTP transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail address
          pass: process.env.EMAIL_PASS, // Your Gmail App Password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER || 'no-reply@tracker.com',
        to: 'pulkit2005sharma@gmail.com',
        subject: `New ${type} submitted by ${session.user.name || 'A User'}`,
        text: `You have received a new ${type === 'BUG' ? 'Bug Report' : 'Feature Request'}!\n\nUser: ${session.user.name} (${session.user.email || 'No email'})\nType: ${type}\n\nDescription:\n${description}\n\nSubmitted at: ${new Date().toLocaleString()}`
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // We don't return an error here so the feedback is still saved successfully even if email fails
    }

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const feedbacks = await prisma.feedback.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
