"use client";

import React, { useState } from 'react';
import { Question } from '@prisma/client';

interface SearchQuestionsProps {
  questions: Question[];
  onStatusChange: (questionId: string, status: string) => void;
}

export default function SearchQuestions({ questions, onStatusChange }: SearchQuestionsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = searchQuery.trim() === ''
    ? []
    : questions.filter(q => q.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Solid': return 'var(--color-green)';
      case 'Still Solid': return 'var(--color-light-green)';
      case 'Maybe U remember': return 'var(--color-yellow)';
      default: return 'var(--color-red)';
    }
  };

  return (
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
          {filteredQuestions.map(q => (
            <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #333' }}>
              <div style={{ flex: 1, marginRight: '15px' }}>
                <a href={q.url || '#'} target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', color: '#fff' }}>{q.title}</a>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  <span style={{ 
                    display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '6px',
                    background: getStatusColor(q.status)
                  }}></span>
                  {q.status} • Step {q.revisionStep}
                </div>
              </div>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onStatusChange(q.id, 'Solid'); 
                  setSearchQuery(''); 
                }}
                style={{ padding: '8px 12px', fontSize: '11px', background: 'var(--color-green)', color: '#000', borderRadius: '4px', border: '1px solid #000', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
              >
                Mark Revised
              </button>
            </div>
          ))}
          {filteredQuestions.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No matches found.</div>
          )}
        </div>
      )}
    </div>
  );
}
