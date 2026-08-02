import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Star } from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { Card } from '../dashboard/Card';

export interface PrioritySkill {
  id: string;
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  industryDemand: number; // 1 to 5
  academicCoverage: number; // 1 to 5
  technologyRelevance: number; // 1 to 5
}

interface SkillPriorityTableProps {
  theme: ThemeMode;
  customSkills?: string[];
}

export const SkillPriorityTable: React.FC<SkillPriorityTableProps> = ({ theme, customSkills }) => {
  const tokens = getThemeTokens(theme);
  const [sortBy, setSortBy] = useState<'Priority' | 'Skill' | 'Demand'>('Priority');

  const initialSkills: PrioritySkill[] = (customSkills && customSkills.length > 0)
    ? customSkills.map((skillName, index) => ({
        id: `s_${index}`,
        skill: skillName,
        priority: index < 3 ? 'High' : index < 7 ? 'Medium' : 'Low',
        industryDemand: index < 3 ? 5 : index < 7 ? 4 : 3,
        academicCoverage: 1,
        technologyRelevance: index < 3 ? 5 : 4,
      }))
    : [
        {
          id: '1',
          skill: 'Kubernetes',
          priority: 'High',
          industryDemand: 5,
          academicCoverage: 1,
          technologyRelevance: 5,
        },
        {
          id: '2',
          skill: 'Docker',
          priority: 'High',
          industryDemand: 5,
          academicCoverage: 2,
          technologyRelevance: 5,
        },
        {
          id: '3',
          skill: 'Prompt Engineering',
          priority: 'High',
          industryDemand: 5,
          academicCoverage: 1,
          technologyRelevance: 5,
        },
        {
          id: '4',
          skill: 'MLOps',
          priority: 'Medium',
          industryDemand: 4,
          academicCoverage: 2,
          technologyRelevance: 4,
        },
      ];

  const renderStars = (count: number, activeColor = tokens.primaryAccent) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= count
                ? 'fill-current text-[#43D854]'
                : 'text-gray-600/40 fill-transparent'
            }`}
          />
        ))}
      </div>
    );
  };

  const getPriorityBadge = (priority: PrioritySkill['priority']) => {
    switch (priority) {
      case 'High':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-500 border border-red-500/30">
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Medium
          </span>
        );
      case 'Low':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
            Low
          </span>
        );
    }
  };

  return (
    <Card theme={theme} hoverEffect={false} className="p-6 border space-y-6">
      {/* Header with Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#43D854]/20 text-[#43D854] flex items-center justify-center text-xs font-bold font-mono">
              5
            </span>
            <h3 className="text-xl font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
              Skill Priority
            </h3>
          </div>
          <p className="text-xs mt-1" style={{ color: tokens.textSecondary }}>
            Skills ranked according to current market demand and academic gap impact.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: tokens.textMuted }}>
            Sort by:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3.5 py-2 text-xs font-semibold rounded-[12px] border outline-none appearance-none cursor-pointer pr-8"
              style={{
                backgroundColor: tokens.inputBg,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            >
              <option value="Priority">Priority</option>
              <option value="Skill">Skill Name</option>
              <option value="Demand">Industry Demand</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-3 pointer-events-none" style={{ color: tokens.textMuted }} />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr
              className="border-b text-xs font-semibold uppercase tracking-wider"
              style={{ borderColor: tokens.border, color: tokens.textMuted }}
            >
              <th className="py-3.5 px-4">Skill</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4">Industry Demand</th>
              <th className="py-3.5 px-4">Academic Coverage</th>
              <th className="py-3.5 px-4">Technology Relevance</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: tokens.border }}>
            {initialSkills.map((item) => (
              <tr
                key={item.id}
                className="group transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <td className="py-4 px-4 font-bold text-sm" style={{ color: tokens.textPrimary }}>
                  {item.skill}
                </td>
                <td className="py-4 px-4">{getPriorityBadge(item.priority)}</td>
                <td className="py-4 px-4">{renderStars(item.industryDemand)}</td>
                <td className="py-4 px-4">{renderStars(item.academicCoverage)}</td>
                <td className="py-4 px-4">{renderStars(item.technologyRelevance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
