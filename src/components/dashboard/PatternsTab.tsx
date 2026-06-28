"use client";

import React, { useState } from 'react';
import { Pattern, Question } from '@prisma/client';
import PatternCard from './PatternCard';

type PatternWithQuestions = Pattern & { questions: Question[] };

interface PatternsTabProps {
  patterns: PatternWithQuestions[];
  onAddPattern: (name: string) => Promise<void>;
  onRenamePattern: (id: string, newName: string) => void;
  onDeletePattern: (id: string) => void;
}

export default function PatternsTab({
  patterns,
  onAddPattern,
  onRenamePattern,
  onDeletePattern,
}: PatternsTabProps) {
  const [newPatternName, setNewPatternName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatternName.trim()) return;
    await onAddPattern(newPatternName);
    setNewPatternName('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
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
        {patterns.map(p => (
          <PatternCard
            key={p.id}
            pattern={p}
            onRename={onRenamePattern}
            onDelete={onDeletePattern}
          />
        ))}
      </div>
    </div>
  );
}
