import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { ThemeMode } from '../types';

interface IndustryAlignmentChartProps {
  theme: ThemeMode;
}

export const IndustryAlignmentChart: React.FC<IndustryAlignmentChartProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const SEMESTERS = ['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026', 'Fall 2026 (Now)'];

  return (
    <div className={`rounded-[24px] border p-6 sm:p-8 space-y-6 transition-all ${
      isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-lg'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#262626]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/15 text-[#10B981] mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Longitudinal Alignment Chart</span>
          </div>
          <h2 className="font-heading font-bold text-2xl tracking-tight">Curriculum Alignment Projection</h2>
          <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Comparing legacy static syllabus trajectory vs live industry expectation and AI modernization path.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span>Legacy Curriculum (68%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span>Projected After AI (92%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#34D399]" />
            <span>Industry Expectation (95%)</span>
          </div>
        </div>
      </div>

      {/* SVG Line Graph Visualizer */}
      <div className="relative w-full h-64 sm:h-72 pt-4">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="40" x2="500" y2="40" stroke={isDark ? '#262626' : '#E5E7EB'} strokeDasharray="4 4" />
          <line x1="0" y1="90" x2="500" y2="90" stroke={isDark ? '#262626' : '#E5E7EB'} strokeDasharray="4 4" />
          <line x1="0" y1="140" x2="500" y2="140" stroke={isDark ? '#262626' : '#E5E7EB'} strokeDasharray="4 4" />

          {/* Area Fill for AI Modernization Path */}
          <polygon
            points="0,150 125,140 250,110 375,60 500,25 500,200 0,200"
            fill="url(#emeraldGradient)"
            opacity="0.25"
          />

          <defs>
            <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Line 1: Legacy Path (Amber) */}
          <path
            d="M 0 160 Q 125 155, 250 150 T 375 145 T 500 142"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeDasharray="6 3"
          />

          {/* Line 2: Industry Target (Light Emerald / Mint) */}
          <path
            d="M 0 120 Q 125 90, 250 60 T 375 30 T 500 20"
            fill="none"
            stroke="#34D399"
            strokeWidth="2.5"
            strokeDasharray="2 2"
          />

          {/* Line 3: AI Modernized Path (Main Accent Emerald) */}
          <path
            d="M 0 150 Q 125 140, 250 110 T 375 60 T 500 25"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
          />

          {/* Data Points */}
          <circle cx="0" cy="150" r="5" fill="#10B981" />
          <circle cx="125" cy="140" r="5" fill="#10B981" />
          <circle cx="250" cy="110" r="5" fill="#10B981" />
          <circle cx="375" cy="60" r="6" fill="#10B981" />
          <circle cx="500" cy="25" r="7" fill="#10B981" className="animate-pulse" />
        </svg>

        {/* X-Axis Labels */}
        <div className="flex justify-between items-center text-[10px] font-mono font-semibold pt-4 text-[#737373]">
          {SEMESTERS.map((sem, idx) => (
            <span key={idx} className={idx === 4 ? 'text-[#10B981] font-bold' : ''}>
              {sem}
            </span>
          ))}
        </div>
      </div>

      {/* Stats summary bar */}
      <div className={`p-4 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs ${
        isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
      }`}>
        <div>
          <span className={`text-[10px] block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Legacy Curriculum</span>
          <span className="font-bold text-amber-400 text-sm">68% Alignment</span>
        </div>
        <div>
          <span className={`text-[10px] block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Industry Benchmark</span>
          <span className="font-bold text-[#34D399] text-sm">95% Market Standard</span>
        </div>
        <div>
          <span className={`text-[10px] block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Projected After 1-Click AI</span>
          <span className="font-bold text-[#10B981] text-sm">92% Target Achieved</span>
        </div>
      </div>
    </div>
  );
};
