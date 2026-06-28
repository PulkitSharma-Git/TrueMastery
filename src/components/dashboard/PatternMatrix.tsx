"use client";

import React, { useState, useEffect } from 'react';
import { Pattern, Question } from '@prisma/client';
import Card from '../Card';

type PatternWithQuestions = Pattern & { questions: Question[] };

interface PatternMatrixProps {
  patterns: PatternWithQuestions[];
}

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default function PatternMatrix({ patterns }: PatternMatrixProps) {
  const [showPatternInfo, setShowPatternInfo] = useState(false);

  // Close info card on outside click (for mobile tap dismissal)
  useEffect(() => {
    if (!showPatternInfo) return;
    const handleClose = () => setShowPatternInfo(false);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [showPatternInfo]);

  const getPatternStatus = (p: PatternWithQuestions) => {
    const total = p.questions.length;
    const solid = p.questions.filter(q => q.status === 'Solid').length;
    const stillSolid = p.questions.filter(q => q.status === 'Still Solid').length;
    const maybe = p.questions.filter(q => q.status === 'Maybe U remember').length;
    
    let bgColor = 'var(--color-red)';
    let statusText = 'Needs Focus';

    if (total > 0) {
      if (solid > total / 2) {
        bgColor = 'var(--color-green)';
        statusText = 'Solid';
      } else if ((solid + stillSolid) > total / 2) {
        bgColor = 'var(--color-light-green)';
        statusText = 'Still Solid';
      } else if ((maybe > total / 2) || (solid + stillSolid + maybe > total / 2)) {
        bgColor = 'var(--color-yellow)';
        statusText = 'Learning';
      }
    }

    return { bgColor, statusText };
  };

  return (
    <Card style={{ width: '100%', maxWidth: '1100px', padding: '24px', margin: '0 auto 30px auto' }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
        <h2 style={{ margin: 0 }}>Pattern Mastery Matrix</h2>
        <div 
          onMouseEnter={() => setShowPatternInfo(true)}
          onMouseLeave={() => setShowPatternInfo(false)}
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowPatternInfo(!showPatternInfo);
            }}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-secondary)', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              padding: '5px',
              transition: 'color 0.2s' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            title="How it works"
          >
            <InfoIcon />
          </button>
          
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              position: 'absolute', 
              top: '30px', 
              right: 0, 
              backgroundColor: 'rgba(25, 25, 25, 0.92)', 
              border: '1px solid rgba(255, 255, 255, 0.12)', 
              borderRadius: '12px', 
              padding: '16px 20px', 
              width: '320px', 
              boxShadow: '0 12px 40px rgba(0,0,0,0.7)', 
              zIndex: 100, 
              textAlign: 'left',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              opacity: showPatternInfo ? 1 : 0,
              visibility: showPatternInfo ? 'visible' : 'hidden',
              pointerEvents: showPatternInfo ? 'auto' : 'none',
              transform: showPatternInfo ? 'translateY(0)' : 'translateY(-8px)',
              transition: 'opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease',
            }}
          >
            <div style={{ marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <h3 style={{ fontSize: '14px', margin: 0, color: '#fff', fontWeight: 'bold' }}>Pattern Mastery Guide</h3>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
              Each block aggregates an entire category pattern. A pattern only turns Green if strictly &gt;50% of its questions are fully Solid.
            </p>
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '4px', 
        width: '100%',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(0,0,0,0.2)',
        padding: '3px',
        boxSizing: 'border-box'
      }}>
        {patterns.map(p => {
          const { bgColor, statusText } = getPatternStatus(p);

          return (
            <div 
              key={p.id} 
              title={`${p.name} - ${statusText}`}
              style={{
                flexGrow: 1,
                minWidth: '32px',
                height: '24px',
                borderRadius: '3px',
                backgroundColor: bgColor,
                transition: 'transform 0.15s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          );
        })}
      </div>
    </Card>
  );
}
