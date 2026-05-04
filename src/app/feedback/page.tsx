import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import FeedbackClient from '@/components/FeedbackClient';
import LandingClient from '@/components/LandingClient';

export default async function FeedbackPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <LandingClient />;
  }

  const feedbacks = await prisma.feedback.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main>
      <FeedbackClient initialFeedbacks={feedbacks} userName={session.user.name || ''} userImage={session.user.image || ''} />
    </main>
  );
}
