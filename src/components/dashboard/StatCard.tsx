import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { Card } from './Card';

interface StatCardProps {
  theme: ThemeMode;
  icon: React.ReactNode;
  title: string;
  metric: string | number;
  subtitle: string;
  trendData?: number[];
  trendColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  theme,
  icon,
  title,
  metric,
  subtitle,
  trendData = [20, 35, 30, 45, 40, 60, 75],
  trendColor,
}) => {
  const tokens = getThemeTokens(theme);
  const strokeColor = trendColor || tokens.primaryAccent;

  // Generate SVG path for sparkline
  const generateSparklinePath = (data: number[], width = 100, height = 30) => {
    if (!data.length) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  const sparklinePath = generateSparklinePath(trendData);

  return (
    <Card
      theme={theme}
      hoverEffect={true}
      className="p-5 flex flex-col justify-between h-full relative overflow-hidden group border"
    >
      {/* Soft Glow on hover */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none blur-xl"
        style={{ backgroundColor: tokens.primaryAccent }}
      />

      {/* Header: Title & Icon */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-sm font-medium truncate"
          style={{ color: tokens.textSecondary }}
        >
          {title}
        </span>
        <div
          className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
          style={{
            backgroundColor: tokens.statIconBg,
            color: tokens.primaryAccent,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Metric & Mini Trendline */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <span
            className="text-[42px] font-bold leading-none tracking-tight font-sans"
            style={{ color: tokens.textPrimary }}
          >
            {metric}
          </span>

          {/* Mini trend line */}
          <div className="w-20 h-8 flex-shrink-0">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d={sparklinePath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p
          className="text-xs font-medium truncate"
          style={{ color: tokens.textSecondary }}
        >
          {subtitle}
        </p>
      </div>
    </Card>
  );
};
