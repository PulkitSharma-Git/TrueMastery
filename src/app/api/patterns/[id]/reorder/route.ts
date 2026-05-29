import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: patternId } = await params;
    const { questionIds } = await request.json();

    if (!Array.isArray(questionIds)) {
      return NextResponse.json({ error: 'questionIds must be an array' }, { status: 400 });
    }

    // Update position of each question in a transaction to ensure consistency
    await prisma.$transaction(
      questionIds.map((id, index) =>
        prisma.question.update({
          where: { id, patternId },
          data: { position: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
