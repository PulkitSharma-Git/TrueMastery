import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { title, url } = await req.json();
    const question = await prisma.question.create({
      data: {
        title,
        url,
        status: "Need to revise",
        revisionStep: 0,
        nextReviewDate: new Date(),
        patternId: id
      }
    });
    return NextResponse.json(question);
  } catch (e) {
    return NextResponse.json({ error: 'Error creating question' }, { status: 500 });
  }
}
