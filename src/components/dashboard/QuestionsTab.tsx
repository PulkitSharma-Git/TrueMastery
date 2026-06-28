"use client";

import React, { useState } from 'react';
import { Pattern, Question } from '@prisma/client';
import QuestionCard from './QuestionCard';

type PatternWithQuestions = Pattern & { questions: Question[] };

interface QuestionsTabProps {
  patterns: PatternWithQuestions[];
  onAddQuestion: (patternId: string, title: string, url: string) => Promise<void>;
  onDeleteQuestion: (patternId: string, questionId: string) => void;
  onPauseToggle: (questionId: string, currentPaused: boolean) => void;
  onStatusChange: (questionId: string, status: string) => void;
  onSaveQuestionEdit: (patternId: string, questionId: string, title: string, url: string) => void;
  onStepChange: (patternId: string, questionId: string, currentStep: number, increment: boolean) => void;
  updatingQuestionSteps: { [key: string]: boolean };
  onDrop: (e: React.DragEvent, targetQuestionId: string, targetPatternId: string) => void;
  onDropOnPattern: (e: React.DragEvent, targetPatternId: string) => void;
}

export default function QuestionsTab({
  patterns,
  onAddQuestion,
  onDeleteQuestion,
  onPauseToggle,
  onStatusChange,
  onSaveQuestionEdit,
  onStepChange,
  updatingQuestionSteps,
  onDrop,
  onDropOnPattern,
}: QuestionsTabProps) {
  const [activeControlsCardId, setActiveControlsCardId] = useState<string | null>(null);
  
  // Drag states
  const [isDraggingQuestionId, setIsDraggingQuestionId] = useState<string | null>(null);
  const [dragOverQuestionId, setDragOverQuestionId] = useState<string | null>(null);
  const [dragOverPatternId, setDragOverPatternId] = useState<string | null>(null);

  // New question form state
  const [newQuestionState, setNewQuestionState] = useState<{ [key: string]: { title: string, url: string } }>({});

  const handleAddQuestionSubmit = async (patternId: string, e: React.FormEvent) => {
    e.preventDefault();
    const data = newQuestionState[patternId];
    if (!data || !data.title.trim()) return;
    await onAddQuestion(patternId, data.title, data.url || '');
    setNewQuestionState(prev => ({
      ...prev,
      [patternId]: { title: '', url: '' }
    }));
  };

  const updateNewQuestionState = (patternId: string, field: 'title' | 'url', value: string) => {
    setNewQuestionState(prev => ({
      ...prev,
      [patternId]: {
        title: prev[patternId]?.title || '',
        url: prev[patternId]?.url || '',
        [field]: value
      }
    }));
  };

  return (
    <div>
      {patterns.map(p => (
        <details 
          key={p.id} 
          style={{
            marginBottom: '20px', 
            background: '#1a1a1a', 
            border: '2px solid rgba(0,0,0,0.8)', 
            borderRadius: '8px', 
            padding: '0', 
            boxShadow: '4px 4px 0px rgba(0,0,0,0.5)'
          }}
        >
          <summary 
            style={{ 
              padding: '20px', 
              fontSize: '1.2rem', 
              fontWeight: '900', 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              cursor: 'pointer', 
              outline: 'none', 
              display: 'flex', 
              alignItems: 'center' 
            }}
          >
            <span style={{ marginRight: '15px' }}>{p.name}</span>
            <span 
              style={{ 
                fontSize: '12px', 
                background: 'rgba(255,255,255,0.1)', 
                padding: '4px 10px', 
                borderRadius: '12px', 
                fontWeight: 'bold', 
                letterSpacing: '0px' 
              }}
            >
              {p.questions.length} QUESTIONS
            </span>
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
                onDropOnPattern(e, p.id);
              }}
              style={{ 
                paddingTop: '20px', 
                borderTop: '1px solid #333',
                background: dragOverPatternId === p.id ? 'rgba(46, 204, 113, 0.04)' : 'transparent',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease'
              }}
            >
              {p.questions.map(q => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  patternId={p.id}
                  isActive={activeControlsCardId === q.id}
                  isDraggingQuestion={isDraggingQuestionId === q.id}
                  dragOverQuestionId={dragOverQuestionId}
                  onToggleActive={() => setActiveControlsCardId(activeControlsCardId === q.id ? null : q.id)}
                  onSaveEdit={(id, title, url) => onSaveQuestionEdit(p.id, id, title, url)}
                  onDelete={() => onDeleteQuestion(p.id, q.id)}
                  onPauseToggle={onPauseToggle}
                  onStatusChange={onStatusChange}
                  onStepChange={onStepChange}
                  isUpdatingStep={!!updatingQuestionSteps[q.id]}
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
                    onDrop(e, q.id, p.id);
                  }}
                />
              ))}
            </div>
            
            <form onSubmit={(e) => handleAddQuestionSubmit(p.id, e)} style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="New Question Title..." 
                value={newQuestionState[p.id]?.title || ''}
                onChange={e => updateNewQuestionState(p.id, 'title', e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #333', background: 'var(--card-bg)', color: '#fff' }}
              />
              <input 
                type="text" 
                placeholder="URL (optional)..." 
                value={newQuestionState[p.id]?.url || ''}
                onChange={e => updateNewQuestionState(p.id, 'url', e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #333', background: 'var(--card-bg)', color: '#fff' }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '10px 20px' }}>Add</button>
            </form>
          </div>
        </details>
      ))}
    </div>
  );
}
