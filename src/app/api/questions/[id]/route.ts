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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, url, patternId, revisionStep } = body;

    const data: any = {};
    if (typeof title === 'string') data.title = title;
    if (typeof url === 'string') data.url = url;
    if (typeof patternId === 'string') {
      data.patternId = patternId;
      const lastQuestion = await prisma.question.findFirst({
        where: { patternId },
        orderBy: { position: 'desc' },
        select: { position: true }
      });
      data.position = lastQuestion ? lastQuestion.position + 1 : 0;
    }

    if (typeof revisionStep === 'number') {
      const currentQuestion = await prisma.question.findUnique({ where: { id } });
      if (currentQuestion) {
        data.revisionStep = Math.max(0, Math.min(6, revisionStep));
        if (data.revisionStep === 0) {
          data.status = "Need to revise";
          data.nextReviewDate = new Date();
        } else {
          if (currentQuestion.status === "Need to revise") {
            data.status = "Still Solid";
          }
          const daysToAdd = INTERVALS[Math.min(data.revisionStep - 1, INTERVALS.length - 1)];
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + daysToAdd);
          data.nextReviewDate = nextDate;
        }
      }
    }

    const updated = await prisma.question.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
