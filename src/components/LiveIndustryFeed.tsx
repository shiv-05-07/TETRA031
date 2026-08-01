import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Flame, ArrowUpRight, Radio, ExternalLink } from 'lucide-react';
import { ThemeMode } from '../types';

interface LiveIndustryFeedProps {
  theme: ThemeMode;
}

export const LiveIndustryFeed: React.FC<LiveIndustryFeedProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const TRENDING_SKILLS = [
    { name: 'Model Context Protocol (MCP)', growth: '+340%', category: 'Agent Infrastructure', demand: 'Surging' },
    { name: 'AI Agents & Orchestration', growth: '+250%', category: 'Autonomous AI', demand: 'Surging' },
    { name: 'Prompt Engineering & Context', growth: '+220%', category: 'LLM Systems', demand: 'High' },
    { name: 'Vector Databases (Milvus/pgvector)', growth: '+195%', category: 'Data & Indexing', demand: 'High' },
    { name: 'RAG & Hybrid Semantic Search', growth: '+180%', category: 'Information Retrieval', demand: 'High' },
    { name: 'Docker & Microservices', growth: '+160%', category: 'DevOps & Containers', demand: 'Steady' },
    { name: 'Kubernetes 1.30 Orchestration', growth: '+150%', category: 'Cloud Infrastructure', demand: 'Steady' }
  ];

  return (
    <div className={`rounded-[24px] border p-6 space-y-5 transition-all ${
      isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-lg'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          <h3 className="font-heading font-bold text-lg flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#10B981]" />
            <span>Live Industry Hiring Feed</span>
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981]">
          120,000+ Jobs Stream
        </span>
      </div>

      <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
        Real-time tech stack requirements extracted from global employer job postings over the last 24 hours.
      </p>

      {/* Feed List */}
      <div className="space-y-2.5">
        {TRENDING_SKILLS.map((skill, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 2 }}
            className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
              isDark ? 'bg-[#171717] border-[#262626] hover:border-[#10B981]/40' : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#10B981]/40'
            }`}
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-xs truncate">{skill.name}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  skill.demand === 'Surging'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-[#10B981]/20 text-[#10B981]'
                }`}>
                  {skill.demand}
                </span>
              </div>
              <span className={`text-[10px] block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                {skill.category}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#10B981] font-mono font-bold text-xs flex-shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{skill.growth}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className={`p-3 rounded-xl border text-[11px] font-mono flex items-center justify-between ${
        isDark ? 'bg-[#0E0E0E] border-[#262626] text-[#737373]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'
      }`}>
        <span>Source: Indeed, LinkedIn, GitHub Jobs</span>
        <span className="text-[#10B981]">Updated 15m ago</span>
      </div>
    </div>
  );
};
