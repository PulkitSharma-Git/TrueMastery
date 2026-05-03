import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { name } = await req.json();
    const pattern = await prisma.pattern.create({
      data: { 
        name,
        userId: session.user.id
      },
      include: { questions: true }
    });
    return NextResponse.json(pattern);
  } catch (e) {
    return NextResponse.json({ error: 'Error creating pattern' }, { status: 500 });
  }
}
