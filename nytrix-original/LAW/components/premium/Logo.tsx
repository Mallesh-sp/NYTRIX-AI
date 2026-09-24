import React from 'react';

const Logo: React.FC<{size?: number}> = ({ size = 48 }) => (
  <svg
    width={size * 2.5}
    height={size}
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
  >
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    {/* NYTRIX Text */}
    <text 
      x="10" 
      y="48" 
      fontFamily="'Courier New', monospace" 
      fontSize="52" 
      fontWeight="900"
      fill="url(#logoGrad)"
      letterSpacing="-2"
    >
      NYTRIX
    </text>
    
    {/* Accent line under text */}
    <line x1="10" y1="52" x2="190" y2="52" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.8" />
  </svg>
);

export default Logo;
