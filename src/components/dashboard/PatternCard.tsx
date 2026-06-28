"use client";

import React, { useState } from 'react';
import { Pattern, Question } from '@prisma/client';
import Card from '../Card';

type PatternWithQuestions = Pattern & { questions: Question[] };

interface PatternCardProps {
  pattern: PatternWithQuestions;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

export default function PatternCard({ pattern, onRename, onDelete }: PatternCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(pattern.name);

  const pTotal = pattern.questions.length;
  const pSolid = pattern.questions.filter(q => q.status === 'Solid' || q.status === 'Still Solid').length;
  const pPerc = pTotal === 0 ? 0 : Math.round((pSolid / pTotal) * 100);
  const isPatternSolid = pPerc > 50;

  const handleSave = () => {
    if (editName.trim() && editName.trim() !== pattern.name) {
      onRename(pattern.id, editName);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(pattern.name);
    setIsEditing(false);
  };

  return (
    <Card 
      className={`card ${isPatternSolid ? 'border-green' : ''}`}
      style={isPatternSolid ? { borderColor: 'var(--color-green)' } : undefined}
    >
      {isEditing ? (
        <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
          <input 
            type="text" 
            value={editName} 
            onChange={e => setEditName(e.target.value)}
            style={{ flex: 1, padding: '5px', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
          <button 
            onClick={handleSave} 
            style={{ padding: '4px 8px', fontSize: '12px', background: 'var(--color-green)', color: '#000', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Save
          </button>
          <button 
            onClick={handleCancel} 
            style={{ padding: '4px 8px', fontSize: '12px', background: '#555', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {pattern.name}
          <button 
            onClick={() => {
              setIsEditing(true);
              setEditName(pattern.name);
            }} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '16px', padding: '0' }} 
            title="Rename Pattern"
          >
            ✎
          </button>
        </h3>
      )}
      <div style={{ background: '#333', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{ background: 'var(--color-green)', height: '100%', width: `${pPerc}%` }}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ marginTop: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>{pSolid}/{pTotal} Solid</p>
        <button 
          type="button" 
          onClick={(e) => { 
            e.stopPropagation(); 
            onDelete(pattern.id); 
          }} 
          style={{ padding: '4px 8px', fontSize: '12px', background: 'var(--color-red)', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer', marginTop: '10px' }}
        >
          Delete
        </button>
      </div>
    </Card>
  );
}
