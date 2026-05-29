"use client";

import { useState } from 'react';
import { Pattern, Question } from '@prisma/client';
import { signOut } from 'next-auth/react';

type PatternWithQuestions = Pattern & { questions: Question[] };

export default function DashboardClient({ 
  initialPatterns, 
  userId, 
  userName, 
  userImage 
}: { 
  initialPatterns: PatternWithQuestions[], 
  userId: string, 
  userName: string, 
  userImage: string 
}) {
  const [patterns, setPatterns] = useState(initialPatterns);
  const [activeTab, setActiveTab] = useState<'overview' | 'patterns' | 'questions'>('overview');
  
  const [confirmAction, setConfirmAction] = useState<{message: string, action: () => void} | null>(null);
  const [showSeedPopup, setShowSeedPopup] = useState(initialPatterns.length === 0);
  const [isSeeding, setIsSeeding] = useState(false);
  
  const [newPatternName, setNewPatternName] = useState('');
  const [newQuestionState, setNewQuestionState] = useState<{ [key: string]: { title: string, url: string } }>({});
  
  const [editingPatternId, setEditingPatternId] = useState<string | null>(null);
  const [editingPatternName, setEditingPatternName] = useState('');

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingQuestionTitle, setEditingQuestionTitle] = useState('');
  const [editingQuestionUrl, setEditingQuestionUrl] = useState('');
  const [activeControlsCardId, setActiveControlsCardId] = useState<string | null>(null);
  const [updatingQuestionSteps, setUpdatingQuestionSteps] = useState<{ [key: string]: boolean }>({});
  const [isDraggingQuestionId, setIsDraggingQuestionId] = useState<string | null>(null);
  const [dragOverQuestionId, setDragOverQuestionId] = useState<string | null>(null);
  const [dragOverPatternId, setDragOverPatternId] = useState<string | null>(null);

  const [showMasteryInfo, setShowMasteryInfo] = useState(false);
  const [showRawScore, setShowRawScore] = useState(false);
  const [showGridInfo, setShowGridInfo] = useState(false);
  const [showPatternInfo, setShowPatternInfo] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');

  const InfoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

  const handleAddPattern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatternName.trim()) return;
    try {
      const res = await fetch('/api/patterns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newPatternName })
      });
      if (res.ok) {
        const added = await res.json();
        setPatterns([...patterns, { ...added, questions: [] }]);
        setNewPatternName('');
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

  const handleRenamePattern = async (id: string) => {
    if (!editingPatternName.trim()) {
      setEditingPatternId(null);
      return;
    }
    
    // Optimistic update
    setPatterns(patterns.map(p => p.id === id ? { ...p, name: editingPatternName } : p));
    setEditingPatternId(null);

    try {
      await fetch(`/api/patterns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingPatternName })
      });
    } catch (err) { console.error(err); }
  };

  const handleAddQuestion = async (patternId: string, e: React.FormEvent) => {
    e.preventDefault();
    const data = newQuestionState[patternId];
    if (!data || !data.title.trim()) return;
    
    try {
      const res = await fetch(`/api/patterns/${patternId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const added = await res.json();
        setPatterns(patterns.map(p => p.id === patternId ? { ...p, questions: [...p.questions, added] } : p));
        setNewQuestionState({ ...newQuestionState, [patternId]: { title: '', url: '' } });
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
    // Optimistic update
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
      // rollback if needed
    }
  };

  const handleEditQuestionStart = (question: Question) => {
    setEditingQuestionId(question.id);
    setEditingQuestionTitle(question.title);
    setEditingQuestionUrl(question.url || '');
  };

  const handleSaveQuestionEdit = async (patternId: string, questionId: string) => {
    if (!editingQuestionTitle.trim()) return;

    setPatterns(prev => prev.map(p => p.id === patternId ? {
      ...p,
      questions: p.questions.map(q => q.id === questionId ? { ...q, title: editingQuestionTitle, url: editingQuestionUrl } : q)
    } : p));
    setEditingQuestionId(null);

    try {
      await fetch(`/api/questions/${questionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editingQuestionTitle, url: editingQuestionUrl })
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

  const handleMoveWithinPattern = async (patternId: string, questionId: string, direction: 'up' | 'down') => {
    const pattern = patterns.find(p => p.id === patternId);
    if (!pattern) return;
    const index = pattern.questions.findIndex(q => q.id === questionId);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === pattern.questions.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reorderedQuestions = [...pattern.questions];
    const temp = reorderedQuestions[index];
    reorderedQuestions[index] = reorderedQuestions[targetIndex];
    reorderedQuestions[targetIndex] = temp;

    setPatterns(prev => prev.map(p => p.id === patternId ? { ...p, questions: reorderedQuestions } : p));

    try {
      const res = await fetch(`/api/patterns/${patternId}/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionIds: reorderedQuestions.map(q => q.id) })
      });
      if (!res.ok) {
        console.error("Failed to reorder in database");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveToPattern = async (sourcePatternId: string, questionId: string, targetPatternId: string) => {
    const sourcePattern = patterns.find(p => p.id === sourcePatternId);
    const targetPattern = patterns.find(p => p.id === targetPatternId);
    if (!sourcePattern || !targetPattern) return;

    const questionToMove = sourcePattern.questions.find(q => q.id === questionId);
    if (!questionToMove) return;

    setPatterns(prev => prev.map(p => {
      if (p.id === sourcePatternId) {
        return { ...p, questions: p.questions.filter(q => q.id !== questionId) };
      }
      if (p.id === targetPatternId) {
        return { ...p, questions: [...p.questions, { ...questionToMove, patternId: targetPatternId }] };
      }
      return p;
    }));

    try {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patternId: targetPatternId })
      });
      if (res.ok) {
        const updatedQ = await res.json();
        setPatterns(prev => prev.map(p => {
          if (p.id === targetPatternId) {
            return {
              ...p,
              questions: p.questions.map(q => q.id === questionId ? updatedQ : q)
            };
          }
          return p;
        }));
      } else {
        console.error("Failed to move to pattern in database");
      }
    } catch (err) {
      console.error(err);
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

  const calculateQuestionScore = (q: any) => {
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
  };

  const totalQuestions = patterns.reduce((acc, p) => acc + p.questions.length, 0);
  const totalScore = patterns.flatMap(p => p.questions).reduce((acc, q) => acc + calculateQuestionScore(q), 0);
  const masteryPercentage = totalQuestions === 0 ? 0 : Math.round(totalScore / totalQuestions);

  const getScoreBreakdown = () => {
    let longevity = 0;
    let confidence = 0;
    patterns.flatMap(p => p.questions).forEach(q => {
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

  return (
    <div>
      {showSeedPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ background: '#222', padding: '30px', borderRadius: '12px', textAlign: 'center', maxWidth: '400px', border: '2px solid var(--color-green)' }}>
            <h2 style={{ marginBottom: '15px' }}>Welcome to True Mastery!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.5' }}>
              Your dashboard is currently empty. Would you like to automatically load the complete <strong>Striver A2Z DSA Sheet (474 Questions)</strong> into your tracker?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={handleSeedA2Z} 
                disabled={isSeeding}
                style={{ padding: '10px 20px', background: 'var(--color-green)', color: '#000', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
              >
                {isSeeding ? 'Loading...' : 'Yes, Load A2Z Sheet'}
              </button>
              <button 
                onClick={() => setShowSeedPopup(false)} 
                disabled={isSeeding}
                style={{ padding: '10px 20px', background: 'transparent', color: '#fff', borderRadius: '8px', border: '1px solid #444', cursor: 'pointer' }}
              >
                No, start empty
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmAction && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ background: '#222', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid #444' }}>
            <p style={{ marginBottom: '20px', fontSize: '18px' }}>{confirmAction.message}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => { confirmAction.action(); setConfirmAction(null); }} style={{ padding: '8px 20px', background: 'var(--color-red)', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Confirm</button>
              <button onClick={() => setConfirmAction(null)} style={{ padding: '8px 20px', background: '#444', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #333', marginBottom: '30px' }}>
        <h1 className="title" style={{ margin: 0, fontSize: '24px' }}>DSA Revision Tracker</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <a href="/feedback" className="btn-secondary" style={{ textDecoration: 'none', marginRight: '10px' }}>Bug/Feature Request</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {userImage && <img src={userImage} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />}
            <span style={{ fontWeight: 'bold' }}>{userName.split(' ')[0]}</span>
          </div>
          <button onClick={() => signOut()} style={{ padding: '6px 12px', background: '#333', color: '#fff', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Sign Out</button>
        </div>
      </div>

      <div className="tabs">
        <button className={activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'patterns' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('patterns')}>Patterns</button>
        <button className={activeTab === 'questions' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('questions')}>Questions</button>
      </div>

      {activeTab === 'overview' && (
        <>
        <div style={{ maxWidth: '600px', margin: '0 auto 30px auto', position: 'relative', zIndex: 60 }}>
          <input 
            type="text" 
            placeholder="Search questions quickly..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '15px 20px', borderRadius: '8px', border: '1px solid #444', background: '#222', color: '#fff', fontSize: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}
          />
          {searchQuery.trim() !== '' && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#2a2a2a', border: '1px solid #444', borderRadius: '8px', marginTop: '10px', maxHeight: '350px', overflowY: 'auto', zIndex: 90, boxShadow: '0 15px 40px rgba(0,0,0,0.8)' }}>
              {patterns.flatMap(p => p.questions).filter(q => q.title.toLowerCase().includes(searchQuery.toLowerCase())).map(q => (
                <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #333' }}>
                  <div style={{ flex: 1, marginRight: '15px' }}>
                    <a href={q.url || '#'} target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', color: '#fff' }}>{q.title}</a>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <span style={{ 
                        display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '6px',
                        background: q.status === 'Solid' ? 'var(--color-green)' : q.status === 'Still Solid' ? 'var(--color-light-green)' : q.status === 'Maybe U remember' ? 'var(--color-yellow)' : 'var(--color-red)'
                      }}></span>
                      {q.status} • Step {q.revisionStep}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStatusChange(q.id, 'Solid'); setSearchQuery(''); }}
                    style={{ padding: '8px 12px', fontSize: '11px', background: 'var(--color-green)', color: '#000', borderRadius: '4px', border: '1px solid #000', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                  >
                    Mark Revised
                  </button>
                </div>
              ))}
              {patterns.flatMap(p => p.questions).filter(q => q.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No matches found.</div>
              )}
            </div>
          )}
        </div>        <div className="overview-container">
          <div className="card stat-card" style={{ maxWidth: '600px', position: 'relative', zIndex: 50 }}>
            <button 
              onClick={() => setShowMasteryInfo(!showMasteryInfo)} 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="View Info"
            >
              <InfoIcon />
            </button>
            <h2>True Mastery</h2>
            <div className="pie-chart" style={{ background: `conic-gradient(var(--color-green) ${masteryPercentage}%, var(--color-red) 0)` }}>
              <div className="pie-inner" style={{ padding: 0, overflow: 'hidden' }}>
                <div 
                  className={`flip-container ${showRawScore ? 'flipped' : ''}`}
                  onClick={() => setShowRawScore(!showRawScore)}
                >
                  <div className="flipper">
                    <div className="front">
                      <span className="pie-text">{masteryPercentage}%</span>
                    </div>
                    <div className="back" style={{ padding: '10px' }}>
                      <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#fff', letterSpacing: '-0.02em' }}>
                        {totalQuestions === 0 ? '0/0' : `${totalScore}/${totalQuestions * 100}`}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center', lineHeight: '1.4' }}>
                        <div style={{ borderBottom: '1px solid #333', paddingBottom: '3px', marginBottom: '3px' }}>
                          Longevity: {totalQuestions === 0 ? '0' : totalLongevity}/{totalQuestions * 75}
                        </div>
                        <div>
                          Confidence: {totalQuestions === 0 ? '0' : totalConfidence}/{totalQuestions * 25}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p style={{marginTop: '20px', color: 'var(--text-secondary)'}}>Your mathematically weighted mastery score across {totalQuestions} questions.</p>
            
            {showMasteryInfo && (
              <div style={{ position: 'absolute', top: '45px', right: '15px', background: '#222', border: '1px solid #444', borderRadius: '8px', padding: '20px', width: '380px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)', zIndex: 10, textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '15px', margin: 0, color: '#fff' }}>The Science of Memory</h3>
                  <button onClick={() => setShowMasteryInfo(false)} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '14px', marginTop: '-2px' }}>✖</button>
                </div>
                
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 15px 0' }}>
                  <strong>Spaced Repetition (Ebbinghaus Forgetting Curve):</strong> Science proves that human memory decays exponentially. To build permanent neural pathways, you must review information at precisely expanding intervals just as you're about to forget it (Days 1, 3, 7, 14, 30, 60).
                </p>

                <div style={{ borderTop: '1px solid #444', paddingTop: '15px' }}>
                  <h3 style={{ fontSize: '15px', margin: '0 0 10px 0', color: 'var(--color-green)' }}>True Mastery Algorithm</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    This algorithm mathematically eliminates the "illusion of competence". A question is only 100% mastered if it survives a full 60-day interval.<br/><br/>
                    <strong>Weighted Factors:</strong><br/>
                    • <strong>Longevity (75%)</strong>: Day 1 (10pt) → Day 3 (20pt) → Day 7 (30pt) → Day 14 (45pt) → Day 30 (60pt) → Day 60 (75pt).<br/>
                    • <strong>Confidence (25%)</strong>: Dark Green (+25) | Light Green (+18) | Yellow (+8) | Red (0).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div style={{ 
          padding: '40px 0',
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          backgroundColor: 'var(--bg-color)',
          borderTop: '2px solid #333',
          borderBottom: '2px solid #333',
          marginTop: '60px'
        }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>Revision Matrix</h2>
            <button onClick={() => setShowGridInfo(!showGridInfo)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: '10px', display: 'flex', alignItems: 'center' }}><InfoIcon /></button>
            {showGridInfo && (
              <div style={{ position: 'absolute', top: '35px', background: '#222', padding: '20px', borderRadius: '8px', width: '350px', zIndex: 10, textAlign: 'left', border: '1px solid #444', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  This grid is a 1:1 pixel map of the complete curriculum. Hover over any pixel to see the question name and its status.<br/><br/>
                  <strong style={{color: 'var(--color-light-green)'}}>Auto-Degradation Math:</strong> If a question passes its Next Review Date, it degrades gracefully (Solid ➔ Still Solid ➔ Maybe ➔ Red). You are then given a <strong>grace period exactly equal to 1/3 of its current interval</strong> to review it before it drops again!
                </p>
              </div>
            )}
          </div>
          <div style={{
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0px', 
            width: '100%'
          }}>
            {patterns.flatMap(p => p.questions).map(q => {
              let bgColor = 'var(--color-red)';
              if (q.status === 'Solid') bgColor = 'var(--color-green)';
              if (q.status === 'Still Solid') bgColor = 'var(--color-light-green)';
              if (q.status === 'Maybe U remember') bgColor = 'var(--color-yellow)';

              return (
                <div 
                  key={q.id} 
                  title={`${q.title} - ${q.status}`}
                  style={{
                    flexGrow: 1,
                    minWidth: '20px',
                    height: '20px',
                    backgroundColor: bgColor,
                  }}
                />
              );
            })}
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', marginTop: '60px' }}>
            <h2 style={{ margin: 0 }}>Pattern Mastery Matrix</h2>
            <button onClick={() => setShowPatternInfo(!showPatternInfo)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: '10px', display: 'flex', alignItems: 'center' }}><InfoIcon /></button>
            {showPatternInfo && (
              <div style={{ position: 'absolute', top: '35px', background: '#222', padding: '15px', borderRadius: '8px', width: '300px', zIndex: 10, textAlign: 'left', border: '1px solid #444', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>Each block aggregates an entire category pattern. A pattern only turns Green if strictly &gt;50% of its questions are fully Solid.</p>
              </div>
            )}
          </div>
          <div style={{
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0px', 
            width: '100%'
          }}>
            {patterns.map(p => {
              const total = p.questions.length;
              const solid = p.questions.filter(q => q.status === 'Solid').length;
              const stillSolid = p.questions.filter(q => q.status === 'Still Solid').length;
              const maybe = p.questions.filter(q => q.status === 'Maybe U remember').length;
              
              let bgColor = 'var(--color-red)';
              if (total > 0) {
                if (solid > total / 2) bgColor = 'var(--color-green)';
                else if ((solid + stillSolid) > total / 2) bgColor = 'var(--color-light-green)';
                else if ((maybe > total / 2) || (solid + stillSolid + maybe > total / 2)) bgColor = 'var(--color-yellow)';
              }

              return (
                <div 
                  key={p.id} 
                  title={`${p.name} - ${bgColor === 'var(--color-green)' ? 'Solid' : bgColor === 'var(--color-light-green)' ? 'Still Solid' : bgColor === 'var(--color-yellow)' ? 'Learning' : 'Needs Focus'}`}
                  style={{
                    flexGrow: 1,
                    minWidth: '40px',
                    height: '30px',
                    backgroundColor: bgColor,
                    border: '1px solid rgba(0,0,0,0.3)',
                    boxSizing: 'border-box'
                  }}
                />
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'var(--color-red)' }}></div> Need to revise
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'var(--color-yellow)' }}></div> Maybe
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'var(--color-light-green)' }}></div> Still Solid
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'var(--color-green)' }}></div> Solid
            </div>
          </div>
        </div>
        </>
      )}

      {activeTab === 'patterns' && (
        <div>
          <form onSubmit={handleAddPattern} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="New Pattern Name..." 
              value={newPatternName}
              onChange={e => setNewPatternName(e.target.value)}
              style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #333', background: 'var(--card-bg)', color: '#fff' }}
            />
            <button type="submit" className="btn-primary">Add Pattern</button>
          </form>
          <div className="grid">
            {patterns.map(p => {
            const pTotal = p.questions.length;
            const pSolid = p.questions.filter(q => q.status === 'Solid' || q.status === 'Still Solid').length;
            const pPerc = pTotal === 0 ? 0 : Math.round((pSolid / pTotal) * 100);
            const isPatternSolid = pPerc > 50;

            return (
              <div key={p.id} className={`card ${isPatternSolid ? 'border-green' : ''}`}>
                {editingPatternId === p.id ? (
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                    <input 
                      type="text" 
                      value={editingPatternName} 
                      onChange={e => setEditingPatternName(e.target.value)}
                      style={{ flex: 1, padding: '5px', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                      autoFocus
                    />
                    <button onClick={() => handleRenamePattern(p.id)} style={{ padding: '4px 8px', fontSize: '12px', background: 'var(--color-green)', color: '#000', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Save</button>
                    <button onClick={() => setEditingPatternId(null)} style={{ padding: '4px 8px', fontSize: '12px', background: '#555', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Cancel</button>
                  </div>
                ) : (
                  <h3 style={{marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    {p.name}
                    <button onClick={() => { setEditingPatternId(p.id); setEditingPatternName(p.name); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '16px', padding: '0' }} title="Rename Pattern">✎</button>
                  </h3>
                )}
                <div style={{ background: '#333', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--color-green)', height: '100%', width: `${pPerc}%` }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{marginTop: '10px', fontSize: '14px', color: 'var(--text-secondary)'}}>{pSolid}/{pTotal} Solid</p>
                  <button type="button" onClick={(e) => { e.stopPropagation(); handleDeletePattern(p.id); }} style={{ padding: '4px 8px', fontSize: '12px', background: 'var(--color-red)', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      )}

      {activeTab === 'questions' && (
        <div>
          {patterns.map(p => (
            <details key={p.id} style={{marginBottom: '20px', background: '#1a1a1a', border: '2px solid rgba(0,0,0,0.8)', borderRadius: '8px', padding: '0', boxShadow: '4px 4px 0px rgba(0,0,0,0.5)'}}>
              <summary style={{ padding: '20px', fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', outline: 'none', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '15px' }}>{p.name}</span>
                <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', letterSpacing: '0px' }}>{p.questions.length} QUESTIONS</span>
              </summary>
              <div style={{ padding: '0 20px 20px 20px' }}>
                <div 
                  className="grid" 
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (isDraggingQuestionId) {
                      setDragOverPatternId(p.id);
                    }
                  }}
                  onDragLeave={() => {
                    if (dragOverPatternId === p.id) {
                      setDragOverPatternId(null);
                    }
                  }}
                  onDrop={(e) => {
                    setDragOverPatternId(null);
                    handleDropOnPattern(e, p.id);
                  }}
                  style={{ 
                    paddingTop: '20px', 
                    borderTop: '1px solid #333',
                    background: dragOverPatternId === p.id ? 'rgba(46, 204, 113, 0.04)' : 'transparent',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {p.questions.map(q => {
                  let statusClass = 'status-need';
                  if (q.status === 'Solid') statusClass = 'status-solid';
                  if (q.status === 'Still Solid') statusClass = 'status-still-solid';
                  if (q.status === 'Maybe U remember') statusClass = 'status-maybe';

                  const daysLeft = Math.ceil((new Date(q.nextReviewDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                  const isPaused = (q as any).isPaused;

                  return (
                     <div 
                      key={q.id} 
                      className={`card ${statusClass}`}
                      draggable={activeControlsCardId === q.id && editingQuestionId !== q.id}
                      onDragStart={(e) => {
                        setIsDraggingQuestionId(q.id);
                        e.dataTransfer.setData('text/plain', JSON.stringify({ questionId: q.id, patternId: p.id }));
                        e.dataTransfer.effectAllowed = 'move';
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (isDraggingQuestionId && isDraggingQuestionId !== q.id) {
                          setDragOverQuestionId(q.id);
                        }
                      }}
                      onDragLeave={() => {
                        if (dragOverQuestionId === q.id) {
                          setDragOverQuestionId(null);
                        }
                      }}
                      onDragEnd={() => {
                        setIsDraggingQuestionId(null);
                        setDragOverQuestionId(null);
                        setDragOverPatternId(null);
                      }}
                      onDrop={(e) => {
                        setDragOverQuestionId(null);
                        handleDrop(e, q.id, p.id);
                      }}
                      style={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '12px', 
                        padding: '16px', 
                        boxShadow: '4px 4px 0px rgba(0,0,0,0.3)', 
                        border: dragOverQuestionId === q.id 
                          ? '2px dashed var(--color-green)' 
                          : isDraggingQuestionId === q.id 
                            ? '2px solid #555' 
                            : '2px solid rgba(0,0,0,0.5)',
                        opacity: isDraggingQuestionId === q.id ? 0.4 : 1,
                        cursor: (activeControlsCardId === q.id && editingQuestionId !== q.id) ? 'grab' : 'default',
                        transform: dragOverQuestionId === q.id ? 'scale(1.02)' : 'none',
                        transition: 'transform 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
                      }}
                    >
                      {editingQuestionId === q.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <input 
                            type="text" 
                            value={editingQuestionTitle} 
                            onChange={e => setEditingQuestionTitle(e.target.value)}
                            style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff', fontSize: '14px' }}
                            placeholder="Question Title"
                            autoFocus
                          />
                          <input 
                            type="text" 
                            value={editingQuestionUrl} 
                            onChange={e => setEditingQuestionUrl(e.target.value)}
                            style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff', fontSize: '14px' }}
                            placeholder="URL (optional)"
                          />
                          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                            <button 
                              type="button" 
                              onClick={() => handleSaveQuestionEdit(p.id, q.id)} 
                              style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--color-green)', color: '#000', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                              Save
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setEditingQuestionId(null)} 
                              style={{ padding: '6px 12px', fontSize: '12px', background: '#555', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', flex: 1 }}>
                              <a href={q.url || '#'} target="_blank" rel="noreferrer" style={{fontWeight: '900', fontSize: '1.1rem', lineHeight: '1.3', flex: 1}}>{q.title}</a>
                              {activeControlsCardId === q.id && (
                                <button 
                                  type="button" 
                                  onClick={() => handleEditQuestionStart(q)} 
                                  style={{ 
                                    background: 'transparent', 
                                    border: 'none', 
                                    color: 'inherit', 
                                    cursor: 'pointer', 
                                    padding: '2px', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    opacity: 0.8,
                                    transition: 'opacity 0.15s ease'
                                  }} 
                                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                                  title="Rename/Edit Question"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                </button>
                              )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ padding: '4px 8px', borderRadius: '12px', background: 'rgba(0,0,0,0.25)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                                {q.status}
                              </div>
                              <button 
                                type="button" 
                                onClick={() => setActiveControlsCardId(activeControlsCardId === q.id ? null : q.id)}
                                style={{ 
                                  background: 'transparent', 
                                  border: 'none', 
                                  color: 'inherit', 
                                  cursor: 'pointer', 
                                  padding: '4px', 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  opacity: activeControlsCardId === q.id ? 1 : 0.5,
                                  transition: 'opacity 0.15s ease, transform 0.3s ease',
                                  transform: activeControlsCardId === q.id ? 'rotate(90deg)' : 'none'
                                }} 
                                onMouseEnter={(e) => { if (activeControlsCardId !== q.id) e.currentTarget.style.opacity = '1'; }}
                                onMouseLeave={(e) => { if (activeControlsCardId !== q.id) e.currentTarget.style.opacity = '0.5'; }}
                                title="Toggle management controls"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                                  <circle cx="12" cy="5" r="2"></circle>
                                  <circle cx="12" cy="12" r="2"></circle>
                                  <circle cx="12" cy="19" r="2"></circle>
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          <div style={{fontSize: '13px', opacity: 0.9, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', background: 'rgba(0,0,0,0.1)', padding: '6px 10px', borderRadius: '4px'}}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>Step</span>
                              {activeControlsCardId === q.id && (
                                <button 
                                  type="button" 
                                  onClick={() => handleStepChange(p.id, q.id, q.revisionStep, false)}
                                  disabled={q.revisionStep <= 0 || updatingQuestionSteps[q.id]}
                                  style={{ 
                                    padding: '1px 5px', 
                                    background: 'rgba(0,0,0,0.3)', 
                                    border: '1px solid #555', 
                                    color: '#fff', 
                                    borderRadius: '3px', 
                                    cursor: (q.revisionStep <= 0 || updatingQuestionSteps[q.id]) ? 'not-allowed' : 'pointer', 
                                    fontSize: '11px', 
                                    fontWeight: 'bold', 
                                    lineHeight: 1,
                                    opacity: updatingQuestionSteps[q.id] ? 0.4 : 1
                                  }}
                                >
                                  -
                                </button>
                              )}
                              <span style={{ fontWeight: 'bold', minWidth: '10px', textAlign: 'center', opacity: updatingQuestionSteps[q.id] ? 0.4 : 1 }}>{q.revisionStep}</span>
                              {activeControlsCardId === q.id && (
                                <button 
                                  type="button" 
                                  onClick={() => handleStepChange(p.id, q.id, q.revisionStep, true)}
                                  disabled={q.revisionStep >= 6 || updatingQuestionSteps[q.id]}
                                  style={{ 
                                    padding: '1px 5px', 
                                    background: 'rgba(0,0,0,0.3)', 
                                    border: '1px solid #555', 
                                    color: '#fff', 
                                    borderRadius: '3px', 
                                    cursor: (q.revisionStep >= 6 || updatingQuestionSteps[q.id]) ? 'not-allowed' : 'pointer', 
                                    fontSize: '11px', 
                                    fontWeight: 'bold', 
                                    lineHeight: 1,
                                    opacity: updatingQuestionSteps[q.id] ? 0.4 : 1
                                  }}
                                >
                                  +
                                </button>
                              )}
                              <span>• Score {calculateQuestionScore(q)}</span>
                            </div>
                            {q.status !== 'Need to revise' && (
                              <span style={{ color: daysLeft <= 0 ? '#ffcccc' : 'inherit' }}>
                                {isPaused ? 'PAUSED' : (daysLeft > 0 ? `${daysLeft} DAYS LEFT` : 'EXPIRED')}
                              </span>
                            )}
                          </div>



                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginTop: 'auto', flexWrap: 'wrap', gap: '8px' }}>
                            <button type="button" onClick={(e) => { e.stopPropagation(); handleStatusChange(q.id, 'Solid'); }} style={{ padding: '8px 12px', fontSize: '12px', background: 'var(--color-green)', color: '#000', borderRadius: '4px', border: '1px solid #000', cursor: 'pointer', fontWeight: '900', flex: 1, textTransform: 'uppercase', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                              Mark Revised
                            </button>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button type="button" onClick={(e) => { e.stopPropagation(); handlePauseToggle(q.id, isPaused); }} style={{ padding: '8px', fontSize: '11px', background: isPaused ? 'var(--color-yellow)' : 'rgba(0,0,0,0.6)', color: isPaused ? '#000' : '#fff', borderRadius: '4px', border: '1px solid #000', cursor: 'pointer', fontWeight: 'bold', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                                {isPaused ? 'Resume' : 'Pause'}
                              </button>
                              <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteQuestion(p.id, q.id); }} style={{ padding: '8px', fontSize: '11px', background: 'var(--color-red)', color: '#fff', borderRadius: '4px', border: '1px solid #000', cursor: 'pointer', fontWeight: 'bold', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>Remove</button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              <form onSubmit={(e) => handleAddQuestion(p.id, e)} style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="New Question Title..." 
                  value={newQuestionState[p.id]?.title || ''}
                  onChange={e => setNewQuestionState({...newQuestionState, [p.id]: { ...newQuestionState[p.id], title: e.target.value }})}
                  style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #333', background: 'var(--card-bg)', color: '#fff' }}
                />
                <input 
                  type="text" 
                  placeholder="URL (optional)..." 
                  value={newQuestionState[p.id]?.url || ''}
                  onChange={e => setNewQuestionState({...newQuestionState, [p.id]: { ...newQuestionState[p.id], url: e.target.value }})}
                  style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #333', background: 'var(--card-bg)', color: '#fff' }}
                />
                <button type="submit" className="btn-secondary" style={{ padding: '10px 20px' }}>Add</button>
              </form>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
