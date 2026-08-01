import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  BookOpen,
  Target,
  Zap,
  Briefcase,
  Code
} from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { Card } from '../dashboard/Card';

interface SummaryCardsProps {
  theme: ThemeMode;
  counts?: {
    courses: number;
    modules: number;
    outcomes: number;
    skills: number;
    roles: number;
    technologies: number;
  };
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  theme,
  counts = {
    courses: 48,
    modules: 156,
    outcomes: 312,
    skills: 1248,
    roles: 286,
    technologies: 642,
  },
}) => {
  const tokens = getThemeTokens(theme);

  const cardItems = [
    {
      title: 'Courses',
      count: counts.courses.toLocaleString(),
      icon: GraduationCap,
      color: '#43D854', // Green
      bg: 'rgba(67, 216, 84, 0.15)',
    },
    {
      title: 'Modules',
      count: counts.modules.toLocaleString(),
      icon: BookOpen,
      color: '#3B82F6', // Blue
      bg: 'rgba(59, 130, 246, 0.15)',
    },
    {
      title: 'Course Outcomes',
      count: counts.outcomes.toLocaleString(),
      icon: Target,
      color: '#8B5CF6', // Purple
      bg: 'rgba(139, 92, 246, 0.15)',
    },
    {
      title: 'Skills',
      count: counts.skills.toLocaleString(),
      icon: Zap,
      color: '#F59E0B', // Yellow
      bg: 'rgba(245, 158, 11, 0.15)',
    },
    {
      title: 'Industry Roles',
      count: counts.roles.toLocaleString(),
      icon: Briefcase,
      color: '#06B6D4', // Cyan
      bg: 'rgba(6, 182, 212, 0.15)',
    },
    {
      title: 'Technologies',
      count: counts.technologies.toLocaleString(),
      icon: Code,
      color: '#A855F7', // Violet
      bg: 'rgba(168, 85, 247, 0.15)',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {cardItems.map((item, idx) => {
        const Icon = item.icon;

        return (
          <Card
            key={idx}
            theme={theme}
            hoverEffect={true}
            className="p-4 border flex flex-col justify-between h-full relative overflow-hidden group"
          >
            {/* Hover Glow */}
            <div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none blur-lg"
              style={{ backgroundColor: item.color }}
            />

            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: item.bg,
                  color: item.color,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className="text-xs font-semibold block truncate"
                  style={{ color: tokens.textSecondary }}
                >
                  {item.title}
                </span>
                <span
                  className="text-2xl font-bold font-mono tracking-tight block leading-tight mt-0.5"
                  style={{ color: tokens.textPrimary }}
                >
                  {item.count}
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
