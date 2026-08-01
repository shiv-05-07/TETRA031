import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Layers, Sparkles, ChevronRight, ExternalLink, Cpu, BookOpen, Briefcase, Zap } from 'lucide-react';
import { ThemeMode } from '../types';

interface KnowledgeGraphPreviewProps {
  theme: ThemeMode;
  onOpenExplorer?: () => void;
}

export const KnowledgeGraphPreview: React.FC<KnowledgeGraphPreviewProps> = ({ theme, onOpenExplorer }) => {
  const isDark = theme === 'dark';
  const [activeNode, setActiveNode] = useState<number>(3);

  const GRAPH_NODES = [
    {
      type: 'Course Node',
      title: 'CS-8042 Advanced Machine Learning',
      desc: 'Master of Science Core Curriculum Module',
      color: '#10B981',
      icon: BookOpen,
      meta: '4 Credit Hours · Semester 6'
    },
    {
      type: 'Outcome Node',
      title: 'CO-2: Vector Similarity & Multimodal Search',
      desc: 'Formulate HNSW indexing for high-dimensional embeddings',
      color: '#34D399',
      icon: Zap,
      meta: 'ABET Criterion 3 (SO-1 & SO-6)'
    },
    {
      type: 'Skill Node',
      title: 'Approximate Nearest Neighbor (ANN)',
      desc: 'Sub-10ms vector search across 100M+ embeddings',
      color: '#10B981',
      icon: Cpu,
      meta: 'Bloom Level: Analyzing / Evaluating'
    },
    {
      type: 'Technology Node',
      title: 'Milvus Cluster & pgvector',
      desc: 'Distributed GPU-accelerated vector storage engine',
      color: '#059669',
      icon: Layers,
      meta: 'Missing in current syllabus'
    },
    {
      type: 'Target Job Role',
      title: 'AI Infrastructure Engineer ($180k Avg)',
      desc: 'Silicon Valley & Global Tech Employer Requirement',
      color: '#A7F3D0',
      icon: Briefcase,
      meta: '3,400+ Active Employer Openings'
    }
  ];

  return (
    <div className={`rounded-[24px] border p-6 sm:p-8 space-y-6 transition-all ${
      isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-lg'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#262626]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/15 text-[#10B981] mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>Neo4j Ontological Knowledge Graph</span>
          </div>
          <h2 className="font-heading font-bold text-2xl tracking-tight">Interactive Curriculum Graph Ontology</h2>
          <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Traces the exact dependency chain from course topics down to high-paying target job roles.
          </p>
        </div>

        <button
          onClick={onOpenExplorer}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-2 shadow-md shadow-[#10B981]/20 cursor-pointer"
        >
          <span>Open Full Graph Explorer</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Node Pipeline Chain */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative pt-2">
        {GRAPH_NODES.map((node, idx) => {
          const IconComp = node.icon;
          const isActive = activeNode === idx;

          return (
            <div key={idx} className="relative">
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setActiveNode(idx)}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all h-full flex flex-col justify-between ${
                  isActive
                    ? 'border-[#10B981] bg-[#10B981]/10 shadow-lg shadow-[#10B981]/10'
                    : isDark
                      ? 'bg-[#171717] border-[#262626] hover:border-[#10B981]/50'
                      : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#10B981]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981]">
                      {node.type}
                    </span>
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#10B981] text-white' : 'bg-[#10B981]/15 text-[#10B981]'}`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xs sm:text-sm leading-snug">{node.title}</h3>
                  <p className={`text-[11px] leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    {node.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#262626]/30 text-[10px] font-mono text-[#10B981] font-semibold mt-3">
                  {node.meta}
                </div>
              </motion.div>

              {/* Connecting Connector Arrow for desktop */}
              {idx < GRAPH_NODES.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#10B981]">
                  <ChevronRight className="w-5 h-5 opacity-60" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs ${
            isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F0FDF4] border-[#BBF7D0]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#10B981]/20 text-[#10B981] font-bold">
              NODE DETAILS
            </span>
            <span className="font-sans font-semibold text-sm">
              {GRAPH_NODES[activeNode].title}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Ontological Path:</span>
            <span className="text-[#10B981] font-bold">Course ➔ CO-2 ➔ ANN ➔ Milvus ➔ AI Infra Eng</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
