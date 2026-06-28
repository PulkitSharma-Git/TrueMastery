"use client";

import React from 'react';

interface ConfirmAction {
  message: string;
  action: () => void;
}

interface ConfirmDialogProps {
  confirmAction: ConfirmAction | null;
  onCancel: () => void;
}

export default function ConfirmDialog({ confirmAction, onCancel }: ConfirmDialogProps) {
  if (!confirmAction) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
      <div style={{ background: '#222', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid #444' }}>
        <p style={{ marginBottom: '20px', fontSize: '18px' }}>{confirmAction.message}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            onClick={() => {
              confirmAction.action();
              onCancel();
            }} 
            style={{ padding: '8px 20px', background: 'var(--color-red)', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Confirm
          </button>
          <button 
            onClick={onCancel} 
            style={{ padding: '8px 20px', background: '#444', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
