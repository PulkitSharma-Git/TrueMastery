import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { title, url } = await req.json();

    const lastQuestion = await prisma.question.findFirst({
      where: { patternId: id },
      orderBy: { position: 'desc' },
      select: { position: true }
    });
    const position = lastQuestion ? lastQuestion.position + 1 : 0;

    const question = await prisma.question.create({
      data: {
        title,
        url,
        status: "Need to revise",
        revisionStep: 0,
        nextReviewDate: new Date(),
        patternId: id,
        position
      }
    });
    return NextResponse.json(question);
  } catch (e) {
    return NextResponse.json({ error: 'Error creating question' }, { status: 500 });
  }
}
