"use client";

import React from 'react';

interface HeaderLogoProps {
  title: string;
}

export default function HeaderLogo({ title }: HeaderLogoProps) {
  return (
    <h1 
      className="header-logo"
      style={{ 
        margin: 0, 
        paddingLeft: '8px',
        fontSize: '18px',
        fontFamily: '"Rock Salt", cursive',
        fontWeight: 'normal',
        letterSpacing: 'normal',
        textTransform: 'none',
        color: 'rgba(255, 255, 255, 0.55)',
        overflow: 'visible',
      }}
    >
      {title}
    </h1>
  );
}
