"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export default function Card({
  children,
  style,
  className,
  onClick,
  draggable,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDragEnd,
  onDrop,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 150, y: 80 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const getRandomCoords = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        return {
          x: Math.floor(Math.random() * (rect.width - 60)) + 30,
          y: Math.floor(Math.random() * (rect.height - 40)) + 20,
        };
      }
      return { x: 150, y: 80 };
    };

    setGlowPos(getRandomCoords());

    if (isHovered) return;

    let target = getRandomCoords();
    let current = { ...glowPos };

    const interval = setInterval(() => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 10) {
        target = getRandomCoords();
      } else {
        const speed = 1.0; // slow ambient drift speed
        current.x += (dx / dist) * speed;
        current.y += (dy / dist) * speed;
        setGlowPos({ x: current.x, y: current.y });
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isHovered]);

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'rgba(20, 20, 20, 0.75)',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 0 L24 12 L12 24 L0 12 Z' fill='none' stroke='rgba(255, 255, 255, 0.04)' stroke-width='1'/%3E%3C/svg%3E")`,
    backgroundSize: '24px 24px',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
  };

  return (
    <div
      ref={cardRef}
      className={className || "card"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      style={{
        ...baseStyle,
        ...style,
      }}
    >
      {/* Spotlight Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 0 L24 12 L12 24 L0 12 Z' fill='none' stroke='rgba(255, 255, 255, 0.16)' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px',
          WebkitMaskImage: `radial-gradient(circle 180px at ${isHovered ? mousePos.x : glowPos.x}px ${isHovered ? mousePos.y : glowPos.y}px, white 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`,
          maskImage: `radial-gradient(circle 180px at ${isHovered ? mousePos.x : glowPos.x}px ${isHovered ? mousePos.y : glowPos.y}px, white 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`,
          opacity: isHovered ? 1 : 0.35,
          transition: isHovered ? 'opacity 0.3s ease' : 'opacity 0.8s ease',
          pointerEvents: 'none',
          borderRadius: '15px',
          zIndex: 1,
        }}
      />
      {/* Children Wrapper */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', width: '100%', gap: 'inherit' }}>
        {children}
      </div>
    </div>
  );
}
