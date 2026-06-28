"use client";

import React from 'react';
import { Pattern, Question } from '@prisma/client';
import SearchQuestions from './SearchQuestions';
import MasteryPieChart from './MasteryPieChart';
import MasteryHistoryChart from '../MasteryHistoryChart';
import RevisionMatrix from './RevisionMatrix';
import PatternMatrix from './PatternMatrix';
import Card from '../Card';

type PatternWithQuestions = Pattern & { questions: Question[] };

interface HistoryPoint {
  id?: string;
  score: number;
  totalQuestions: number;
  totalScore: number;
  createdAt: string;
}

interface DashboardOverviewProps {
  patterns: PatternWithQuestions[];
  questions: Question[];
  masteryPercentage: number;
  totalQuestions: number;
  totalScore: number;
  totalLongevity: number;
  totalConfidence: number;
  history: HistoryPoint[];
  onStatusChange: (questionId: string, status: string) => void;
}

export default function DashboardOverview({
  patterns,
  questions,
  masteryPercentage,
  totalQuestions,
  totalScore,
  totalLongevity,
  totalConfidence,
  history,
  onStatusChange,
}: DashboardOverviewProps) {
  return (
    <>
      <SearchQuestions 
        questions={questions} 
        onStatusChange={onStatusChange} 
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        maxWidth: '1100px',
        margin: '0 auto 30px auto',
        width: '100%'
      }}>
        {/* Pie Chart Card */}
        <MasteryPieChart
          masteryPercentage={masteryPercentage}
          totalQuestions={totalQuestions}
          totalScore={totalScore}
          totalLongevity={totalLongevity}
          totalConfidence={totalConfidence}
        />

        {/* Mastery History Chart Card */}
        <Card className="card" style={{ zIndex: 50, justifyContent: 'space-between', minHeight: '340px', maxWidth: '100%' }}>
          <MasteryHistoryChart history={history} />
        </Card>
      </div>
      
      {/* Matrix Cards Stack */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: '1100px',
        margin: '40px auto 0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <RevisionMatrix questions={questions} />
        
        <PatternMatrix patterns={patterns} />
      </div>
    </>
  );
}
