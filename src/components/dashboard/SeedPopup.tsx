"use client";

import React from 'react';

interface SeedPopupProps {
  isOpen: boolean;
  isSeeding: boolean;
  onSeed: () => void;
  onClose: () => void;
}

export default function SeedPopup({ isOpen, isSeeding, onSeed, onClose }: SeedPopupProps) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
      <div style={{ background: '#222', padding: '30px', borderRadius: '12px', textAlign: 'center', maxWidth: '400px', border: '2px solid var(--color-green)' }}>
        <h2 style={{ marginBottom: '15px' }}>Welcome to True Mastery!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.5' }}>
          Your dashboard is currently empty. Would you like to automatically load the complete <strong>Striver A2Z DSA Sheet (474 Questions)</strong> into your tracker?
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            onClick={onSeed} 
            disabled={isSeeding}
            style={{ padding: '10px 20px', background: 'var(--color-green)', color: '#000', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
          >
            {isSeeding ? 'Loading...' : 'Yes, Load A2Z Sheet'}
          </button>
          <button 
            onClick={onClose} 
            disabled={isSeeding}
            style={{ padding: '10px 20px', background: 'transparent', color: '#fff', borderRadius: '8px', border: '1px solid #444', cursor: 'pointer' }}
          >
            No, start empty
          </button>
        </div>
      </div>
    </div>
  );
}
