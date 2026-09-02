import React from 'react';

interface Med360LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  useImage?: boolean;
}

export const Med360Logo: React.FC<Med360LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  useImage = false
}) => {
  const sizeMap = {
    sm: { container: 'h-9', icon: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { container: 'h-12', icon: 'w-11 h-11', text: 'text-2xl', sub: 'text-xs' },
    lg: { container: 'h-16', icon: 'w-16 h-16', text: 'text-3xl', sub: 'text-sm' },
    xl: { container: 'h-24', icon: 'w-24 h-24', text: 'text-5xl', sub: 'text-base' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D Medical Stethoscope & 360 Badge Icon */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-[#0c1938] via-[#091124] to-[#040814] border border-cyan-500/30 shadow-lg shadow-cyan-950/40 p-1.5 ${currentSize.icon}`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/10 via-transparent to-red-500/15 pointer-events-none" />
        
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <defs>
            <linearGradient id="medBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="redArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>

          {/* 360 Curved Rotation Arrow (Red) */}
          <path
            d="M 50 14 A 36 36 0 0 1 86 50 A 36 36 0 0 1 76 74"
            stroke="url(#redArrowGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <polygon
            points="84,40 92,52 79,52"
            fill="url(#redArrowGrad)"
          />

          {/* Stethoscope Earpieces (Top Left) */}
          <path
            d="M 22 24 C 22 20, 26 18, 28 22 C 30 28, 34 38, 24 45"
            stroke="url(#metalGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 14 24 C 14 20, 18 18, 20 22 C 22 28, 26 38, 16 45"
            stroke="url(#metalGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="28" cy="22" r="3" fill="#ffffff" />
          <circle cx="20" cy="22" r="3" fill="#ffffff" />

          {/* Stethoscope Flexible Tube (Blue) */}
          <path
            d="M 20 44 C 12 55, 14 74, 32 82 C 50 90, 72 86, 80 66"
            stroke="url(#medBlueGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Stethoscope Chest Piece (Metallic Bell on Lower Right) */}
          <circle cx="80" cy="66" r="9" fill="url(#metalGrad)" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="80" cy="66" r="4.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />

          {/* Center Brand Text */}
          <text
            x="48"
            y="48"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="-0.5"
          >
            Med
          </text>
          <text
            x="48"
            y="72"
            textAnchor="middle"
            fill="url(#medBlueGrad)"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="24"
            letterSpacing="-0.5"
          >
            360°
          </text>
        </svg>
      </div>

      {/* Typography Title + Subtitle */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white ${currentSize.text}`}>
            Med <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">360°</span>
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-3 h-0.5 bg-red-500 rounded-full" />
            <span className={`font-semibold tracking-wider uppercase text-slate-300 ${currentSize.sub}`}>
              By Dr. Jaanvi
            </span>
            <span className="w-3 h-0.5 bg-red-500 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
