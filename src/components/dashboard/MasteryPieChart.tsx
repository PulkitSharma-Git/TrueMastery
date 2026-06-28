"use client";

import React, { useState, useEffect } from 'react';
import Card from '../Card';

interface MasteryPieChartProps {
  masteryPercentage: number;
  totalQuestions: number;
  totalScore: number;
  totalLongevity: number;
  totalConfidence: number;
}

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default function MasteryPieChart({
  masteryPercentage,
  totalQuestions,
  totalScore,
  totalLongevity,
  totalConfidence,
}: MasteryPieChartProps) {
  const [showMasteryInfo, setShowMasteryInfo] = useState(false);
  const [showRawScore, setShowRawScore] = useState(false);

  // Close info card on outside click (for mobile tap dismissal)
  useEffect(() => {
    if (!showMasteryInfo) return;
    const handleClose = () => setShowMasteryInfo(false);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [showMasteryInfo]);

  return (
    <Card className="card stat-card" style={{ zIndex: 50, justifyContent: 'space-between', minHeight: '340px', maxWidth: '100%' }}>
      <div 
        onMouseEnter={() => setShowMasteryInfo(true)}
        onMouseLeave={() => setShowMasteryInfo(false)}
        style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 100 }}
      >
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowMasteryInfo(!showMasteryInfo);
          }}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}
          title="View Info"
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
            padding: '20px', 
            width: '320px', 
            boxShadow: '0 12px 40px rgba(0,0,0,0.7)', 
            zIndex: 100, 
            textAlign: 'left',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            opacity: showMasteryInfo ? 1 : 0,
            visibility: showMasteryInfo ? 'visible' : 'hidden',
            pointerEvents: showMasteryInfo ? 'auto' : 'none',
            transform: showMasteryInfo ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease',
          }}
        >
          <div style={{ marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
            <h3 style={{ fontSize: '14px', margin: 0, color: '#fff', fontWeight: 'bold' }}>The Science of Memory</h3>
          </div>
          
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: '0 0 15px 0' }}>
            <strong>Spaced Repetition:</strong> Memory decays exponentially. Build permanent pathways by reviewing at expanding intervals (Days 1, 3, 7, 14, 30, 60).
          </p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '15px' }}>
            <h3 style={{ fontSize: '13px', margin: '0 0 10px 0', color: 'var(--color-green)', fontWeight: 'bold' }}>True Mastery Algorithm</h3>
            <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.6', margin: 0 }}>
              A question is 100% mastered only if it survives a full 60-day interval.<br/><br/>
              • <strong>Longevity (75%)</strong>: Day 1 (10pt) → Day 3 (20pt) → Day 7 (30pt) → Day 14 (45pt) → Day 30 (60pt) → Day 60 (75pt).<br/>
              • <strong>Confidence (25%)</strong>: Dark Green (+25) | Light Green (+18) | Yellow (+8) | Red (0).
            </p>
          </div>
        </div>
      </div>

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
      <p style={{marginTop: '20px', color: 'var(--text-secondary)', fontSize: '14px'}}>Your mathematically weighted mastery score across {totalQuestions} questions.</p>
    </Card>
  );
}
