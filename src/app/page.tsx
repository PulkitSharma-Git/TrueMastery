import { prisma } from '../lib/prisma';
import DashboardClient from '../components/DashboardClient';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { recordMasteryScore } from '../lib/mastery';

import LandingClient from '../components/LandingClient';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <LandingClient />;
  }

  const patterns = await prisma.pattern.findMany({
    where: { userId: session.user.id },
    include: {
      questions: {
        orderBy: [
          { position: 'asc' },
          { id: 'asc' }
        ]
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  const now = new Date();
  let hasDegraded = false;
  for (const pattern of patterns) {
    for (const q of pattern.questions) {
      if (!(q as any).isPaused && q.nextReviewDate < now && q.status !== 'Need to revise') {
        let newStatus = q.status;
        if (q.status === 'Solid') newStatus = 'Still Solid';
        else if (q.status === 'Still Solid') newStatus = 'Maybe U remember';
        else if (q.status === 'Maybe U remember') newStatus = 'Need to revise';

        const INTERVALS = [1, 3, 7, 14, 30, 60];
        const currentInterval = q.revisionStep > 0 ? INTERVALS[Math.min(q.revisionStep - 1, INTERVALS.length - 1)] : 1;
        const gracePeriod = Math.max(1, Math.floor(currentInterval / 3));

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + gracePeriod);

        await prisma.question.update({
          where: { id: q.id },
          data: { status: newStatus, nextReviewDate: nextDate }
        });
        q.status = newStatus;
        q.nextReviewDate = nextDate;
        hasDegraded = true;
      }
    }
  }

  // Record initial score or updated score after degradation
  await recordMasteryScore(session.user.id);

  // Fetch score history
  const logs = await prisma.masteryLog.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'asc' }
  });

  const serializedHistory = logs.map(log => ({
    id: log.id,
    score: log.score,
    totalQuestions: log.totalQuestions,
    totalScore: log.totalScore,
    createdAt: log.createdAt.toISOString()
  }));

  return (
    <main>
      <DashboardClient 
        initialPatterns={patterns} 
        userId={session.user.id} 
        userName={session.user.name || ''} 
        userImage={session.user.image || ''} 
        initialHistory={serializedHistory}
      />
    </main>
  );
}
