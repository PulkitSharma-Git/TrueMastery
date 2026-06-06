import { prisma } from './prisma';

export function calculateQuestionScore(q: { revisionStep: number; status: string }) {
  let longevityScore = 0;
  if (q.revisionStep >= 6) longevityScore = 75;
  else if (q.revisionStep === 5) longevityScore = 60;
  else if (q.revisionStep === 4) longevityScore = 45;
  else if (q.revisionStep === 3) longevityScore = 30;
  else if (q.revisionStep === 2) longevityScore = 20;
  else if (q.revisionStep === 1) longevityScore = 10;

  let colorScore = 0;
  if (q.status === 'Solid') colorScore = 25;
  else if (q.status === 'Still Solid') colorScore = 18;
  else if (q.status === 'Maybe U remember') colorScore = 8;

  return longevityScore + colorScore;
}

export async function recordMasteryScore(userId: string) {
  try {
    // Fetch all questions for this user across all patterns
    const questions = await prisma.question.findMany({
      where: {
        pattern: {
          userId: userId,
        },
      },
      select: {
        revisionStep: true,
        status: true,
      },
    });

    const totalQuestions = questions.length;
    const totalScore = questions.reduce((acc, q) => acc + calculateQuestionScore(q), 0);
    const masteryPercentage = totalQuestions === 0 ? 0 : Math.round(totalScore / totalQuestions);

    // Get the latest log entry to check for changes
    const latestLog = await prisma.masteryLog.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    // Write a new log if the score, total questions, or total score has changed, or if no logs exist
    if (
      !latestLog ||
      latestLog.score !== masteryPercentage ||
      latestLog.totalQuestions !== totalQuestions ||
      latestLog.totalScore !== totalScore
    ) {
      return await prisma.masteryLog.create({
        data: {
          userId,
          score: masteryPercentage,
          totalQuestions,
          totalScore,
        },
      });
    }

    return latestLog;
  } catch (error) {
    console.error('Error recording mastery score:', error);
    return null;
  }
}
