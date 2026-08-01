import React from 'react';
import { motion } from 'motion/react';
import { BarChart2, AlertCircle, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface SkillGapHeatmapProps {
  theme: ThemeMode;
}

export const SkillGapHeatmap: React.FC<SkillGapHeatmapProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const HEATMAP_SKILLS = [
    { skill: 'Python & Data Stack', current: 95, demand: 98, gap: -3, status: 'Optimal' },
    { skill: 'SQL & Relational DBs', current: 91, demand: 90, gap: +1, status: 'Optimal' },
    { skill: 'Docker Containerization', current: 62, demand: 88, gap: -26, status: 'Moderate Gap' },
    { skill: 'Kubernetes Orchestration', current: 38, demand: 76, gap: -38, status: 'Major Gap' },
    { skill: 'Model Context Protocol (MCP)', current: 12, demand: 85, gap: -73, status: 'Critical Gap' },
    { skill: 'Vector Databases (Milvus/pgvector)', current: 18, demand: 78, gap: -60, status: 'Critical Gap' },
    { skill: 'AI Agents & Orchestration', current: 15, demand: 82, gap: -67, status: 'Critical Gap' },
    { skill: 'Prompt Engineering & Context', current: 25, demand: 80, gap: -55, status: 'Critical Gap' },
    { skill: 'LangGraph & Multi-Agent Workflows', current: 10, demand: 70, gap: -60, status: 'Critical Gap' },
    { skill: 'RAG Architecture & Hybrid Search', current: 22, demand: 84, gap: -62, status: 'Critical Gap' }
  ];

  return (
    <div className={`rounded-[24px] border p-6 sm:p-8 space-y-6 transition-all ${
      isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-lg'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#262626]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/15 text-[#10B981] mb-2">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Quantitative Skill Heatmap</span>
          </div>
          <h2 className="font-heading font-bold text-2xl tracking-tight">Academic Syllabus vs Industry Demand</h2>
          <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Cross-referenced with 120,000+ live enterprise job postings to highlight missing technology.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-[#10B981]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Optimal (&lt;10% gap)
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Moderate (10-30%)
          </span>
          <span className="flex items-center gap-1.5 text-red-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Critical (&gt;30%)
          </span>
        </div>
      </div>

      {/* Heatmap Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className={`border-b font-mono uppercase text-[10px] tracking-wider ${
            isDark ? 'bg-[#0E0E0E] border-[#262626] text-[#737373]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'
          }`}>
            <tr>
              <th className="p-3.5">Technology / Skill Focus</th>
              <th className="p-3.5 text-center">Current Syllabus Coverage</th>
              <th className="p-3.5 text-center">Industry Market Demand</th>
              <th className="p-3.5 text-center">Skill Deficit Gap</th>
              <th className="p-3.5 text-right">Status & Risk Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-inherit border-inherit font-medium">
            {HEATMAP_SKILLS.map((item, idx) => (
              <tr key={idx} className={`transition-colors ${isDark ? 'hover:bg-[#171717]' : 'hover:bg-[#F8FAFC]'}`}>
                <td className="p-3.5">
                  <span className="font-heading font-semibold text-sm block">{item.skill}</span>
                </td>

                <td className="p-3.5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-mono font-bold text-xs">{item.current}%</span>
                    <div className="w-20 bg-[#262626] h-1.5 rounded-full overflow-hidden hidden md:block">
                      <div className="bg-[#10B981] h-full" style={{ width: `${item.current}%` }} />
                    </div>
                  </div>
                </td>

                <td className="p-3.5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#10B981]">{item.demand}%</span>
                    <div className="w-20 bg-[#262626] h-1.5 rounded-full overflow-hidden hidden md:block">
                      <div className="bg-[#34D399] h-full" style={{ width: `${item.demand}%` }} />
                    </div>
                  </div>
                </td>

                <td className="p-3.5 text-center">
                  <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-lg ${
                    item.gap >= 0
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : item.gap > -30
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                  }`}>
                    {item.gap >= 0 ? `+${item.gap}%` : `${item.gap}%`}
                  </span>
                </td>

                <td className="p-3.5 text-right">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    item.status === 'Optimal'
                      ? 'bg-[#10B981]/15 text-[#10B981]'
                      : item.status === 'Moderate Gap'
                        ? 'bg-amber-500/15 text-amber-400'
                        : 'bg-red-500/15 text-red-400'
                  }`}>
                    {item.status === 'Optimal' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    <span>{item.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
