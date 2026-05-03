import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

const INTERVALS = [1, 3, 7, 14, 30, 60];

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status, isPaused } = await request.json();
    const { id } = await params;

    const question = await prisma.question.findUnique({ where: { id } });
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    if (typeof isPaused === 'boolean') {
      const updated = await prisma.question.update({
        where: { id },
        data: { isPaused },
      });
      return NextResponse.json(updated);
    }

    let nextStep = question.revisionStep;
    let daysToAdd = 1;

    if (status === 'Solid' || status === 'Still Solid') {
      daysToAdd = INTERVALS[Math.min(nextStep, INTERVALS.length - 1)];
      nextStep = Math.min(nextStep + 1, INTERVALS.length);
    } else if (status === 'Maybe U remember') {
      daysToAdd = 1;
    } else if (status === 'Need to revise') {
      nextStep = 0;
      daysToAdd = 0;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daysToAdd);

    const updated = await prisma.question.update({
      where: { id },
      data: {
        status,
        revisionStep: nextStep,
        nextReviewDate: nextDate,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.question.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
