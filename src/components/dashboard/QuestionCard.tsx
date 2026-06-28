"use client";

import React, { useState } from 'react';
import { Question } from '@prisma/client';
import { calculateQuestionScore } from '../../lib/mastery';

interface QuestionCardProps {
  question: Question;
  patternId: string;
  isActive: boolean;
  isDraggingQuestion: boolean;
  dragOverQuestionId: string | null;
  onToggleActive: () => void;
  onSaveEdit: (id: string, title: string, url: string) => void;
  onDelete: (id: string) => void;
  onPauseToggle: (id: string, isPaused: boolean) => void;
  onStatusChange: (id: string, status: string) => void;
  onStepChange: (patternId: string, id: string, currentStep: number, increment: boolean) => void;
  isUpdatingStep: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent) => void;
}

export default function QuestionCard({
  question,
  patternId,
  isActive,
  isDraggingQuestion,
  dragOverQuestionId,
  onToggleActive,
  onSaveEdit,
  onDelete,
  onPauseToggle,
  onStatusChange,
  onStepChange,
  isUpdatingStep,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDragEnd,
  onDrop,
}: QuestionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(question.title);
  const [editUrl, setEditUrl] = useState(question.url || '');

  let statusClass = 'status-need';
  if (question.status === 'Solid') statusClass = 'status-solid';
  if (question.status === 'Still Solid') statusClass = 'status-still-solid';
  if (question.status === 'Maybe U remember') statusClass = 'status-maybe';

  const daysLeft = Math.ceil((new Date(question.nextReviewDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const isPaused = question.isPaused;

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onSaveEdit(question.id, editTitle, editUrl);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(question.title);
    setEditUrl(question.url || '');
    setIsEditing(false);
  };

  const isDraggedOver = dragOverQuestionId === question.id;

  return (
    <div 
      className={`card ${statusClass}`}
      draggable={isActive && !isEditing}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px', 
        padding: '16px', 
        boxShadow: '4px 4px 0px rgba(0,0,0,0.3)', 
        border: isDraggedOver 
          ? '2px dashed var(--color-green)' 
          : isDraggingQuestion 
            ? '2px solid #555' 
            : '2px solid rgba(0,0,0,0.5)',
        opacity: isDraggingQuestion ? 0.4 : 1,
        cursor: (isActive && !isEditing) ? 'grab' : 'default',
        transform: isDraggedOver ? 'scale(1.02)' : 'none',
        transition: 'transform 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
      }}
    >
      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input 
            type="text" 
            value={editTitle} 
            onChange={e => setEditTitle(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff', fontSize: '14px' }}
            placeholder="Question Title"
            autoFocus
          />
          <input 
            type="text" 
            value={editUrl} 
            onChange={e => setEditUrl(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff', fontSize: '14px' }}
            placeholder="URL (optional)"
          />
          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
            <button 
              type="button" 
              onClick={handleSave} 
              style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--color-green)', color: '#000', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Save
            </button>
            <button 
              type="button" 
              onClick={handleCancel} 
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
              <a href={question.url || '#'} target="_blank" rel="noreferrer" style={{fontWeight: '900', fontSize: '1.1rem', lineHeight: '1.3', flex: 1}}>{question.title}</a>
              {isActive && (
                <button 
                  type="button" 
                  onClick={() => {
                    setIsEditing(true);
                    setEditTitle(question.title);
                    setEditUrl(question.url || '');
                  }} 
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
                {question.status}
              </div>
              <button 
                type="button" 
                onClick={onToggleActive}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'inherit', 
                  cursor: 'pointer', 
                  padding: '4px', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isActive ? 1 : 0.5,
                  transition: 'opacity 0.15s ease, transform 0.3s ease',
                  transform: isActive ? 'rotate(90deg)' : 'none'
                }} 
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.opacity = '0.5'; }}
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
              {isActive && (
                <button 
                  type="button" 
                  onClick={() => onStepChange(patternId, question.id, question.revisionStep, false)}
                  disabled={question.revisionStep <= 0 || isUpdatingStep}
                  style={{ 
                    padding: '1px 5px', 
                    background: 'rgba(0,0,0,0.3)', 
                    border: '1px solid #555', 
                    color: '#fff', 
                    borderRadius: '3px', 
                    cursor: (question.revisionStep <= 0 || isUpdatingStep) ? 'not-allowed' : 'pointer', 
                    fontSize: '11px', 
                    fontWeight: 'bold', 
                    lineHeight: 1,
                    opacity: isUpdatingStep ? 0.4 : 1
                  }}
                >
                  -
                </button>
              )}
              <span style={{ fontWeight: 'bold', minWidth: '10px', textAlign: 'center', opacity: isUpdatingStep ? 0.4 : 1 }}>{question.revisionStep}</span>
              {isActive && (
                <button 
                  type="button" 
                  onClick={() => onStepChange(patternId, question.id, question.revisionStep, true)}
                  disabled={question.revisionStep >= 6 || isUpdatingStep}
                  style={{ 
                    padding: '1px 5px', 
                    background: 'rgba(0,0,0,0.3)', 
                    border: '1px solid #555', 
                    color: '#fff', 
                    borderRadius: '3px', 
                    cursor: (question.revisionStep >= 6 || isUpdatingStep) ? 'not-allowed' : 'pointer', 
                    fontSize: '11px', 
                    fontWeight: 'bold', 
                    lineHeight: 1,
                    opacity: isUpdatingStep ? 0.4 : 1
                  }}
                >
                  +
                </button>
              )}
              <span>• Score {calculateQuestionScore(question)}</span>
            </div>
            {question.status !== 'Need to revise' && (
              <span style={{ color: daysLeft <= 0 ? '#ffcccc' : 'inherit' }}>
                {isPaused ? 'PAUSED' : (daysLeft > 0 ? `${daysLeft} DAYS LEFT` : 'EXPIRED')}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginTop: 'auto', flexWrap: 'wrap', gap: '8px' }}>
            <button 
              type="button" 
              onClick={(e) => { 
                e.stopPropagation(); 
                onStatusChange(question.id, 'Solid'); 
              }} 
              style={{ padding: '8px 12px', fontSize: '12px', background: 'var(--color-green)', color: '#000', borderRadius: '4px', border: '1px solid #000', cursor: 'pointer', fontWeight: '900', flex: 1, textTransform: 'uppercase', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
            >
              Mark Revised
            </button>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                type="button" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onPauseToggle(question.id, isPaused); 
                }} 
                style={{ padding: '8px', fontSize: '11px', background: isPaused ? 'var(--color-yellow)' : 'rgba(0,0,0,0.6)', color: isPaused ? '#000' : '#fff', borderRadius: '4px', border: '1px solid #000', cursor: 'pointer', fontWeight: 'bold', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button 
                type="button" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onDelete(question.id); 
                }} 
                style={{ padding: '8px', fontSize: '11px', background: 'var(--color-red)', color: '#fff', borderRadius: '4px', border: '1px solid #000', cursor: 'pointer', fontWeight: 'bold', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
              >
                Remove
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
