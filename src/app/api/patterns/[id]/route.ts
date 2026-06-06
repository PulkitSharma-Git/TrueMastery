import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { recordMasteryScore } from '../../../../lib/mastery';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const pattern = await prisma.pattern.findUnique({
      where: { id }
    });
    if (!pattern) {
      return NextResponse.json({ error: 'Pattern not found' }, { status: 404 });
    }

    await prisma.question.deleteMany({ where: { patternId: id } });
    await prisma.pattern.delete({ where: { id } });

    await recordMasteryScore(pattern.userId);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Error deleting pattern' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name } = await req.json();
    const updated = await prisma.pattern.update({
      where: { id },
      data: { name }
    });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: 'Error updating pattern' }, { status: 500 });
  }
}
