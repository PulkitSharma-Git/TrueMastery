"use client";

import { signOut } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import HeaderLogo from './HeaderLogo';

interface HeaderProps {
  title: string;
  userName: string;
  userImage?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export default function Header({ 
  title, 
  userName, 
  userImage, 
  leftAddon, 
  rightAddon 
}: HeaderProps) {
  const firstName = userName ? userName.split(' ')[0] : '';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isSignOutHovered, setIsSignOutHovered] = useState(false);

  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 200, y: 30 });
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClose = () => setIsDropdownOpen(false);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [isDropdownOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const getRandomCoords = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        return {
          x: Math.floor(Math.random() * (rect.width - 100)) + 50,
          y: Math.floor(Math.random() * (rect.height - 20)) + 10,
        };
      }
      return { x: 200, y: 30 };
    };

    setGlowPos(getRandomCoords());

    if (isHeaderHovered) return;

    let target = getRandomCoords();
    let current = { ...glowPos };

    const interval = setInterval(() => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 10) {
        target = getRandomCoords();
      } else {
        const speed = 0.8; // slower header drift
        current.x += (dx / dist) * speed;
        current.y += (dy / dist) * speed;
        setGlowPos({ x: current.x, y: current.y });
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isHeaderHovered]);

  const renderProfileDropdown = (isMobile: boolean = false) => {
    return (
      <div style={{ position: 'relative' }}>
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '6px 10px 6px 6px',
            background: isProfileHovered || isDropdownOpen ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            borderRadius: '10px',
            border: '1px solid transparent',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {userImage ? (
            <img 
              src={userImage} 
              alt="Avatar" 
              style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.2s ease',
              }} 
            />
          ) : (
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.15)' }} />
          )}
          <span style={{ fontWeight: '700', fontSize: '13px', color: '#fff' }}>{firstName}</span>
          <svg 
            width="10" 
            height="10" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ 
              opacity: 0.6, 
              transform: isDropdownOpen ? (isMobile ? 'rotate(180deg)' : 'rotate(180deg)') : (isMobile ? 'rotate(180deg)' : 'rotate(0deg)'), 
              transition: 'transform 0.2s ease',
              marginLeft: '2px'
            }}
          >
            <polyline points={isMobile ? "6 15 12 9 18 15" : "6 9 12 15 18 9"}></polyline>
          </svg>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div 
            style={{
              position: 'absolute',
              bottom: isMobile ? 'calc(100% + 8px)' : 'auto',
              top: isMobile ? 'auto' : 'calc(100% + 8px)',
              right: 0,
              backgroundColor: 'rgba(20, 20, 20, 0.9)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 0 L24 12 L12 24 L0 12 Z' fill='none' stroke='rgba(255, 255, 255, 0.04)' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.6)',
              padding: '6px',
              minWidth: '135px',
              zIndex: 1010,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => signOut()} 
              onMouseEnter={() => setIsSignOutHovered(true)}
              onMouseLeave={() => setIsSignOutHovered(false)}
              className="header-signout-btn"
              style={{ 
                width: '100%',
                padding: '8px 12px', 
                background: isSignOutHovered ? 'rgba(231, 76, 60, 0.1)' : 'transparent', 
                color: 'var(--color-red)', 
                borderRadius: '6px', 
                border: 'none',
                textAlign: 'left',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer', 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div 
        ref={headerRef}
        className="header" 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        style={{ 
          position: 'sticky',
          top: '12px',
          zIndex: 1000,
          display: 'flex', 
          justifyContent: isMobileViewport ? 'center' : 'space-between', 
          alignItems: 'center', 
          padding: '24px 40px', 
          backgroundColor: 'rgba(20, 20, 20, 0.75)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 0 L24 12 L12 24 L0 12 Z' fill='none' stroke='rgba(255, 255, 255, 0.04)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          margin: '0 auto 40px auto',
          maxWidth: '1100px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Cursor Spotlight Overlay (brightens background wires near cursor) */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 0 L24 12 L12 24 L0 12 Z' fill='none' stroke='rgba(255, 255, 255, 0.35)' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundSize: '24px 24px',
            WebkitMaskImage: `radial-gradient(circle 350px at ${isHeaderHovered ? mousePos.x : glowPos.x}px ${isHeaderHovered ? mousePos.y : glowPos.y}px, white 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`,
            maskImage: `radial-gradient(circle 350px at ${isHeaderHovered ? mousePos.x : glowPos.x}px ${isHeaderHovered ? mousePos.y : glowPos.y}px, white 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`,
            opacity: isHeaderHovered ? 1 : 0.4,
            transition: isHeaderHovered ? 'opacity 0.3s ease' : 'opacity 0.8s ease',
            pointerEvents: 'none',
            borderRadius: '15px',
            zIndex: 1,
          }}
        />

        {isMobileViewport ? (
          <>
            {/* Left Addon (absolute on the left side) */}
            {leftAddon && (
              <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 3, display: 'flex', alignItems: 'center' }}>
                {leftAddon}
              </div>
            )}

            {/* Center Logo Typography */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeaderLogo title={title} />
            </div>
          </>
        ) : (
          <>
            {/* Logo and Left Addon on the left side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 2 }}>
              <HeaderLogo title={title} />
              {leftAddon}
            </div>

            {/* Desktop Header Controls on the right side */}
            <div className="header-right-desktop" style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 2 }}>
              {rightAddon}
              {renderProfileDropdown(false)}
            </div>
          </>
        )}
      </div>

      {/* Mobile Sticky Bottom Bar (visible only on mobile via React state) */}
      {isMobileViewport && (
        <div 
          className="header-right-mobile-bar"
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '16px',
            right: '16px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 16px',
            backgroundColor: 'rgba(20, 20, 20, 0.85)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 0 L24 12 L12 24 L0 12 Z' fill='none' stroke='rgba(255, 255, 255, 0.04)' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '24px 24px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {rightAddon}
          </div>
          <div>
            {renderProfileDropdown(true)}
          </div>
        </div>
      )}
    </>
  );
}
