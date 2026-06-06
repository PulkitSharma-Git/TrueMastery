import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { recordMasteryScore } from '../../../../lib/mastery';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = session.user.id as string;

    const dataPath = path.join(process.cwd(), 'src', 'lib', 'a2z-curriculum.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const curriculum = JSON.parse(rawData);

    for (const pattern of curriculum) {
      const newPattern = await prisma.pattern.create({
        data: { name: pattern.name, userId }
      });

      if (pattern.questions && pattern.questions.length > 0) {
        await prisma.question.createMany({
          data: pattern.questions.map((q: any, idx: number) => ({
            title: q.title,
            url: q.url,
            patternId: newPattern.id,
            position: idx
          }))
        });
      }
    }

    await recordMasteryScore(userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
