"use client";

import React, { useState, useEffect } from 'react';
import { Question } from '@prisma/client';
import Card from '../Card';

interface RevisionMatrixProps {
  questions: Question[];
}

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default function RevisionMatrix({ questions }: RevisionMatrixProps) {
  const [showGridInfo, setShowGridInfo] = useState(false);

  // Close info card on outside click (for mobile tap dismissal)
  useEffect(() => {
    if (!showGridInfo) return;
    const handleClose = () => setShowGridInfo(false);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [showGridInfo]);

  const getQuestionBgColor = (status: string) => {
    switch (status) {
      case 'Solid': return 'var(--color-green)';
      case 'Still Solid': return 'var(--color-light-green)';
      case 'Maybe U remember': return 'var(--color-yellow)';
      default: return 'var(--color-red)';
    }
  };

  return (
    <Card style={{ width: '100%', maxWidth: '1100px', padding: '24px', margin: '0 auto 30px auto' }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
        <h2 style={{ margin: 0 }}>Revision Matrix</h2>
        <div 
          onMouseEnter={() => setShowGridInfo(true)}
          onMouseLeave={() => setShowGridInfo(false)}
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowGridInfo(!showGridInfo);
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
              opacity: showGridInfo ? 1 : 0,
              visibility: showGridInfo ? 'visible' : 'hidden',
              pointerEvents: showGridInfo ? 'auto' : 'none',
              transform: showGridInfo ? 'translateY(0)' : 'translateY(-8px)',
              transition: 'opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease',
            }}
          >
            <div style={{ marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <h3 style={{ fontSize: '14px', margin: 0, color: '#fff', fontWeight: 'bold' }}>Revision Matrix Guide</h3>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
              This grid is a 1:1 pixel map of the complete curriculum. Hover over any pixel to see the question name and its status.<br/><br/>
              <strong style={{color: 'var(--color-light-green)'}}>Auto-Degradation Math:</strong> If a question passes its Next Review Date, it degrades gracefully (Solid ➔ Still Solid ➔ Maybe ➔ Red). You are then given a <strong>grace period exactly equal to 1/3 of its current interval</strong> to review it before it drops again!
            </p>
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '2px', 
        width: '100%',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(0,0,0,0.2)',
        padding: '3px',
        boxSizing: 'border-box'
      }}>
        {questions.map(q => (
          <div 
            key={q.id} 
            title={`${q.title} - ${q.status}`}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '2px',
              backgroundColor: getQuestionBgColor(q.status),
              transition: 'transform 0.15s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ))}
      </div>

      {/* Legend inside matrix card */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', fontSize: '12px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--color-red)' }}></div> Need to revise
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--color-yellow)' }}></div> Maybe
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--color-light-green)' }}></div> Still Solid
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--color-green)' }}></div> Solid
        </div>
      </div>
    </Card>
  );
}
