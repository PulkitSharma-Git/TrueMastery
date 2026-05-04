"use client";

import { useState } from 'react';
import { Feedback } from '@prisma/client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function FeedbackClient({
  initialFeedbacks,
  userName,
  userImage
}: {
  initialFeedbacks: Feedback[],
  userName: string,
  userImage: string
}) {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('FEATURE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, type })
      });

      if (res.ok) {
        const added = await res.json();
        setFeedbacks([added, ...feedbacks]);
        setDescription('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #333', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 className="title" style={{ margin: 0, fontSize: '24px' }}>Ask Feature / Bug Report</h1>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', border: '1px solid #444', padding: '6px 12px', borderRadius: '6px', transition: 'background 0.2s' }}>
            ← Back to Dashboard
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {userImage && <img src={userImage} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />}
            <span style={{ fontWeight: 'bold' }}>{userName.split(' ')[0]}</span>
          </div>
          <button onClick={() => signOut()} style={{ padding: '6px 12px', background: '#333', color: '#fff', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Sign Out</button>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* Form Section */}
        <div className="card" style={{ padding: '30px', border: '1px solid #333' }}>
          <h2 style={{ marginBottom: '20px' }}>Submit a Request</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#222', color: '#fff', fontSize: '16px' }}
              >
                <option value="FEATURE">Feature Request</option>
                <option value="BUG">Bug Report</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Description</label>
              <textarea 
                placeholder="Detailed description of the feature or bug..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#222', color: '#fff', fontSize: '16px', minHeight: '120px', resize: 'vertical' }}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary" 
              style={{ padding: '12px', fontSize: '16px', marginTop: '10px' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>

        {/* List Section */}
        <div>
          <h2 style={{ marginBottom: '20px' }}>Your Submissions</h2>
          {feedbacks.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>You haven't submitted any features or bug reports yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {feedbacks.map((f) => (
                <div key={f.id} className="card" style={{ border: '1px solid #333', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        background: f.type === 'BUG' ? 'rgba(255,0,0,0.2)' : 'rgba(0,255,0,0.2)',
                        color: f.type === 'BUG' ? 'var(--color-red)' : 'var(--color-green)'
                      }}>
                        {f.type}
                      </span>
                      <span style={{ 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#ddd'
                      }}>
                        {f.status}
                      </span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-wrap', margin: 0 }}>
                    {f.description}
                  </p>
                  <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
                    Submitted on {new Date(f.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
