import React from 'react';
import { motion } from 'motion/react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  sublabel?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 110,
  strokeWidth = 10,
  color = '#43D854',
  bgColor = 'rgba(255, 255, 255, 0.08)',
  label,
  sublabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle with animated strokeDashoffset */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-bold font-mono tracking-tight leading-none" style={{ color: color }}>
          {percentage}%
        </span>
        {sublabel && <span className="text-[10px] font-medium mt-1 text-gray-400">{sublabel}</span>}
      </div>
    </div>
  );
};
