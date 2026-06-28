"use client";

import { useState, useEffect } from 'react';
import { Pattern, Question } from '@prisma/client';
import Header from './Header';
import SeedPopup from './dashboard/SeedPopup';
import ConfirmDialog from './dashboard/ConfirmDialog';
import DashboardOverview from './dashboard/DashboardOverview';
import PatternsTab from './dashboard/PatternsTab';
import QuestionsTab from './dashboard/QuestionsTab';
import { calculateQuestionScore } from '../lib/mastery';

type PatternWithQuestions = Pattern & { questions: Question[] };

interface HistoryPoint {
  id?: string;
  score: number;
  totalQuestions: number;
  totalScore: number;
  createdAt: string;
}

export default function DashboardClient({ 
  initialPatterns, 
  userId, 
  userName, 
  userImage,
  initialHistory = []
}: { 
  initialPatterns: PatternWithQuestions[], 
  userId: string, 
  userName: string, 
  userImage: string,
  initialHistory?: HistoryPoint[]
}) {
  const [patterns, setPatterns] = useState(initialPatterns);
  const [activeTab, setActiveTab] = useState<'overview' | 'patterns' | 'questions'>('overview');
  
  const [confirmAction, setConfirmAction] = useState<{message: string, action: () => void} | null>(null);
  const [showSeedPopup, setShowSeedPopup] = useState(initialPatterns.length === 0);
  const [isSeeding, setIsSeeding] = useState(false);
  const [updatingQuestionSteps, setUpdatingQuestionSteps] = useState<{ [key: string]: boolean }>({});
  const [history, setHistory] = useState<HistoryPoint[]>(initialHistory);

  // Compute stats
  const flatQuestions = patterns.flatMap(p => p.questions);
  const totalQuestions = flatQuestions.length;
  const totalScore = flatQuestions.reduce((acc, q) => acc + calculateQuestionScore(q), 0);
  const masteryPercentage = totalQuestions === 0 ? 0 : Math.round(totalScore / totalQuestions);

  useEffect(() => {
    if (totalQuestions === 0) return;
    const latestPoint = history[history.length - 1];
    if (
      !latestPoint ||
      latestPoint.score !== masteryPercentage ||
      latestPoint.totalQuestions !== totalQuestions ||
      latestPoint.totalScore !== totalScore
    ) {
      const newPoint: HistoryPoint = {
        score: masteryPercentage,
        totalQuestions,
        totalScore,
        createdAt: new Date().toISOString()
      };
      setHistory(prev => [...prev, newPoint]);
    }
  }, [masteryPercentage, totalQuestions, totalScore, history]);

  const getScoreBreakdown = () => {
    let longevity = 0;
    let confidence = 0;
    flatQuestions.forEach(q => {
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
      
      longevity += longevityScore;
      confidence += colorScore;
    });
    return { longevity, confidence };
  };

  const { longevity: totalLongevity, confidence: totalConfidence } = getScoreBreakdown();

  const handleSeedA2Z = async () => {
    setIsSeeding(true);
    try {
      const res = await fetch('/api/patterns/seed', { method: 'POST' });
      if (res.ok) {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      setIsSeeding(false);
    }
  };

  const handleAddPattern = async (name: string) => {
    try {
      const res = await fetch('/api/patterns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        const added = await res.json();
        setPatterns([...patterns, { ...added, questions: [] }]);
      }
    } catch (err) { console.error(err); }
  };

  const handleDeletePattern = (id: string) => {
    setConfirmAction({
      message: 'Are you sure you want to delete this pattern and all its questions?',
      action: async () => {
        setPatterns(patterns.filter(p => p.id !== id));
        try {
          await fetch(`/api/patterns/${id}`, { method: 'DELETE' });
        } catch (err) { console.error(err); }
        setConfirmAction(null);
      }
    });
  };

  const handleRenamePattern = async (id: string, name: string) => {
    setPatterns(patterns.map(p => p.id === id ? { ...p, name } : p));
    try {
      await fetch(`/api/patterns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
    } catch (err) { console.error(err); }
  };

  const handleAddQuestion = async (patternId: string, title: string, url: string) => {
    try {
      const res = await fetch(`/api/patterns/${patternId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url })
      });
      if (res.ok) {
        const added = await res.json();
        setPatterns(patterns.map(p => p.id === patternId ? { ...p, questions: [...p.questions, added] } : p));
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteQuestion = (patternId: string, questionId: string) => {
    setConfirmAction({
      message: 'Are you sure you want to delete this question?',
      action: async () => {
        setPatterns(patterns.map(p => p.id === patternId ? {
          ...p, questions: p.questions.filter(q => q.id !== questionId)
        } : p));
        try {
          await fetch(`/api/questions/${questionId}`, { method: 'DELETE' });
        } catch (err) { console.error(err); }
        setConfirmAction(null);
      }
    });
  };

  const handlePauseToggle = async (questionId: string, currentPaused: boolean) => {
    setPatterns(patterns.map(p => ({
      ...p,
      questions: p.questions.map(q => q.id === questionId ? { ...q, isPaused: !currentPaused } : q)
    })));
    try {
      await fetch(`/api/questions/${questionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPaused: !currentPaused })
      });
    } catch (err) { console.error(err); }
  };

  const handleStatusChange = async (questionId: string, status: string) => {
    setPatterns(patterns.map(p => ({
      ...p,
      questions: p.questions.map(q => q.id === questionId ? { ...q, status } : q)
    })));

    try {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updatedQ = await res.json();
        setPatterns(prevPatterns => prevPatterns.map(p => ({
          ...p,
          questions: p.questions.map(q => q.id === questionId ? updatedQ : q)
        })));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveQuestionEdit = async (patternId: string, questionId: string, title: string, url: string) => {
    setPatterns(prev => prev.map(p => p.id === patternId ? {
      ...p,
      questions: p.questions.map(q => q.id === questionId ? { ...q, title, url } : q)
    } : p));

    try {
      await fetch(`/api/questions/${questionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleStepChange = async (patternId: string, questionId: string, currentStep: number, increment: boolean) => {
    if (updatingQuestionSteps[questionId]) return;

    const newStep = increment ? currentStep + 1 : currentStep - 1;
    if (newStep < 0 || newStep > 6) return;

    setUpdatingQuestionSteps(prev => ({ ...prev, [questionId]: true }));

    const INTERVALS = [1, 3, 7, 14, 30, 60];
    let newStatus = 'Need to revise';
    let nextDate = new Date();
    if (newStep > 0) {
      const p = patterns.find(pat => pat.id === patternId);
      const q = p?.questions.find(quest => quest.id === questionId);
      if (q) {
        newStatus = q.status === 'Need to revise' ? 'Still Solid' : q.status;
      } else {
        newStatus = 'Still Solid';
      }
      const daysToAdd = INTERVALS[Math.min(newStep - 1, INTERVALS.length - 1)];
      nextDate.setDate(nextDate.getDate() + daysToAdd);
    }

    setPatterns(prev => prev.map(p => p.id === patternId ? {
      ...p,
      questions: p.questions.map(q => q.id === questionId ? { ...q, revisionStep: newStep, status: newStatus, nextReviewDate: nextDate } : q)
    } : p));

    try {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revisionStep: newStep })
      });
      if (res.ok) {
        const updatedQ = await res.json();
        setPatterns(prev => prev.map(p => p.id === patternId ? {
          ...p,
          questions: p.questions.map(q => q.id === questionId ? updatedQ : q)
        } : p));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingQuestionSteps(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const handleDrop = async (e: React.DragEvent, targetQuestionId: string, targetPatternId: string) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const { questionId: draggedQId, patternId: sourcePatId } = JSON.parse(dataStr);
      if (draggedQId === targetQuestionId) return;

      if (sourcePatId === targetPatternId) {
        const pattern = patterns.find(p => p.id === targetPatternId);
        if (!pattern) return;
        const sourceIndex = pattern.questions.findIndex(q => q.id === draggedQId);
        const targetIndex = pattern.questions.findIndex(q => q.id === targetQuestionId);
        if (sourceIndex === -1 || targetIndex === -1) return;

        const reorderedQuestions = [...pattern.questions];
        const [movedQuestion] = reorderedQuestions.splice(sourceIndex, 1);
        reorderedQuestions.splice(targetIndex, 0, movedQuestion);

        setPatterns(prev => prev.map(p => p.id === targetPatternId ? { ...p, questions: reorderedQuestions } : p));

        await fetch(`/api/patterns/${targetPatternId}/reorder`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionIds: reorderedQuestions.map(q => q.id) })
        });
      } else {
        const sourcePattern = patterns.find(p => p.id === sourcePatId);
        const targetPattern = patterns.find(p => p.id === targetPatternId);
        if (!sourcePattern || !targetPattern) return;

        const questionToMove = sourcePattern.questions.find(q => q.id === draggedQId);
        if (!questionToMove) return;

        const targetIndex = targetPattern.questions.findIndex(q => q.id === targetQuestionId);

        const newSourceQuestions = sourcePattern.questions.filter(q => q.id !== draggedQId);
        const newTargetQuestions = [...targetPattern.questions];
        if (targetIndex === -1) {
          newTargetQuestions.push({ ...questionToMove, patternId: targetPatternId });
        } else {
          newTargetQuestions.splice(targetIndex, 0, { ...questionToMove, patternId: targetPatternId });
        }

        setPatterns(prev => prev.map(p => {
          if (p.id === sourcePatId) return { ...p, questions: newSourceQuestions };
          if (p.id === targetPatternId) return { ...p, questions: newTargetQuestions };
          return p;
        }));

        const res = await fetch(`/api/questions/${draggedQId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patternId: targetPatternId })
        });
        if (res.ok) {
          await fetch(`/api/patterns/${targetPatternId}/reorder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questionIds: newTargetQuestions.map(q => q.id) })
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDropOnPattern = async (e: React.DragEvent, targetPatternId: string) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const { questionId: draggedQId, patternId: sourcePatId } = JSON.parse(dataStr);
      if (sourcePatId === targetPatternId) return;

      const sourcePattern = patterns.find(p => p.id === sourcePatId);
      const targetPattern = patterns.find(p => p.id === targetPatternId);
      if (!sourcePattern || !targetPattern) return;

      const questionToMove = sourcePattern.questions.find(q => q.id === draggedQId);
      if (!questionToMove) return;

      setPatterns(prev => prev.map(p => {
        if (p.id === sourcePatId) return { ...p, questions: p.questions.filter(q => q.id !== draggedQId) };
        if (p.id === targetPatternId) return { ...p, questions: [...p.questions, { ...questionToMove, patternId: targetPatternId }] };
        return p;
      }));

      const res = await fetch(`/api/questions/${draggedQId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patternId: targetPatternId })
      });
      if (res.ok) {
        const updatedQ = await res.json();
        setPatterns(prev => prev.map(p => {
          if (p.id === targetPatternId) {
            const reordered = p.questions.map(q => q.id === draggedQId ? updatedQ : q);
            fetch(`/api/patterns/${targetPatternId}/reorder`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ questionIds: reordered.map(x => x.id) })
            });
            return { ...p, questions: reordered };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <SeedPopup 
        isOpen={showSeedPopup} 
        isSeeding={isSeeding} 
        onSeed={handleSeedA2Z} 
        onClose={() => setShowSeedPopup(false)} 
      />

      <ConfirmDialog 
        confirmAction={confirmAction} 
        onCancel={() => setConfirmAction(null)} 
      />

      <Header 
        title="True Mastery" 
        userName={userName} 
        userImage={userImage} 
        rightAddon={
          <a 
            href="/feedback" 
            className="header-feedback-link"
            style={{ 
              textDecoration: 'none', 
              fontSize: '12px', 
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 0.45)',
              transition: 'color 0.2s ease',
              marginRight: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)';
            }}
          >
            Feedback
          </a>
        }
      />

      <div className="tabs">
        <button className={activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'patterns' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('patterns')}>Patterns</button>
        <button className={activeTab === 'questions' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('questions')}>Questions</button>
      </div>

      {activeTab === 'overview' && (
        <DashboardOverview
          patterns={patterns}
          questions={flatQuestions}
          masteryPercentage={masteryPercentage}
          totalQuestions={totalQuestions}
          totalScore={totalScore}
          totalLongevity={totalLongevity}
          totalConfidence={totalConfidence}
          history={history}
          onStatusChange={handleStatusChange}
        />
      )}

      {activeTab === 'patterns' && (
        <PatternsTab
          patterns={patterns}
          onAddPattern={handleAddPattern}
          onRenamePattern={handleRenamePattern}
          onDeletePattern={handleDeletePattern}
        />
      )}

      {activeTab === 'questions' && (
        <QuestionsTab
          patterns={patterns}
          onAddQuestion={handleAddQuestion}
          onDeleteQuestion={handleDeleteQuestion}
          onPauseToggle={handlePauseToggle}
          onStatusChange={handleStatusChange}
          onSaveQuestionEdit={handleSaveQuestionEdit}
          onStepChange={handleStepChange}
          updatingQuestionSteps={updatingQuestionSteps}
          onDrop={handleDrop}
          onDropOnPattern={handleDropOnPattern}
        />
      )}
    </div>
  );
}
