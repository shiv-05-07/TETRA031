import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Layers, 
  FileQuestion, 
  FolderKanban, 
  Check, 
  ArrowRight,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { ThemeMode } from '../types';

interface ProductShowcaseProps {
  theme: ThemeMode;
  onOpenGetStarted: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ theme, onOpenGetStarted }) => {
  const isDark = theme === 'dark';
  const [activeView, setActiveView] = useState<'gaps' | 'graph' | 'alignment' | 'comparison' | 'recommendations' | 'version'>('gaps');

  return (
    <section id="solutions" className={`py-20 lg:py-28 transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#10B981]">
            Product Showcase
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Designed for Enterprise Academic Workspaces
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Explore the unified interface built for department deans, curriculum committees, and individual course instructors.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveView('gaps')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap ${
              activeView === 'gaps'
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-md'
                : isDark
                  ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Skill Gap Analysis</span>
          </button>

          <button
            onClick={() => setActiveView('graph')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap ${
              activeView === 'graph'
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-md'
                : isDark
                  ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Knowledge Graph</span>
          </button>

          <button
            onClick={() => setActiveView('alignment')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap ${
              activeView === 'alignment'
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-md'
                : isDark
                  ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Industry Alignment</span>
          </button>

          <button
            onClick={() => setActiveView('comparison')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap ${
              activeView === 'comparison'
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-md'
                : isDark
                  ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <FileQuestion className="w-4 h-4" />
            <span>Curriculum Comparison</span>
          </button>

          <button
            onClick={() => setActiveView('recommendations')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap ${
              activeView === 'recommendations'
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-md'
                : isDark
                  ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>AI Recommendations</span>
          </button>

          <button
            onClick={() => setActiveView('version')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap ${
              activeView === 'version'
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-md'
                : isDark
                  ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Version Comparison</span>
          </button>
        </div>

        {/* Product Workspace Screen Container */}
        <div className={`rounded-[24px] border p-6 lg:p-8 shadow-2xl transition-all ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
        }`}>
          {activeView === 'gaps' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl">Departmental Skill Gap Analytics</h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    Real-time alignment against 120,000+ tech job requirements across Silicon Valley, Europe & Asia-Pacific.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/15 text-[#10B981]">
                  Live Market Feed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                  <span className="text-xs font-semibold text-[#EF4444] block mb-1">Critical Deficient Technology</span>
                  <span className="font-heading font-bold text-lg block">MCP Protocol & Vector DBs</span>
                  <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Present in 84% of AI engineering job specs, missing in 78% of CS syllabi.</p>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                  <span className="text-xs font-semibold text-[#F59E0B] block mb-1">Outdated Frameworks Flagged</span>
                  <span className="font-heading font-bold text-lg block">Hadoop MapReduce / Monolithic C++</span>
                  <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Recommended replacement: PyTorch Distributed GPU & Milvus Cluster.</p>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                  <span className="text-xs font-semibold text-[#10B981] block mb-1">Accreditation Preparedness</span>
                  <span className="font-heading font-bold text-lg block text-[#10B981]">98% ABETS Ready</span>
                  <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Course Outcomes fully mapped to ABET Student Outcome Criteria.</p>
                </div>
              </div>
            </div>
          )}

          {activeView === 'graph' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl">Neo4j Skill Ontology & Knowledge Graph</h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    Interactive graph mapping prerequisite chains, course outcomes, and career trajectories.
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-xl border font-mono space-y-4 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                <div className="text-[#10B981] font-bold text-sm">Graph Node Path Preview:</div>
                <div className="flex items-center gap-3 flex-wrap text-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-[#10B981]/20 text-[#10B981] font-bold">CS-8042 (Advanced ML)</span>
                  <span>➔</span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#10B981]/20 text-[#10B981] font-bold">CO-2 (Multimodal Search)</span>
                  <span>➔</span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#34D399]/20 text-[#34D399] font-bold">Vector DB Indexing</span>
                  <span>➔</span>
                  <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 font-bold">AI Infrastructure Engineer ($180k Avg)</span>
                </div>
              </div>
            </div>
          )}

          {activeView === 'alignment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl">Real-Time Industry Hiring Alignment</h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    Automated scoring of course syllabi against global engineering job posts.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                  <div className="flex items-center justify-between font-bold text-sm text-[#10B981]">
                    <span>School of Computer Science</span>
                    <span>88% Industry Aligned</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full w-[88%]" />
                  </div>
                </div>

                <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                  <div className="flex items-center justify-between font-bold text-sm text-[#10B981]">
                    <span>Department of Data Science</span>
                    <span>94% Industry Aligned</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#34D399] h-full w-[94%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'comparison' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl">Curriculum vs Industry Benchmark Comparison</h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    Side-by-side breakdown of academic syllabus vs. current employer tech stack requirements.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                  <span className="font-bold text-sm text-[#EF4444]">Current Academic Syllabus (2022)</span>
                  <ul className="space-y-1 list-disc list-inside text-[#B3B3B3]">
                    <li>Hadoop MapReduce Monolith</li>
                    <li>Traditional Lucene Keyword Search</li>
                    <li>Basic Convolutional Networks</li>
                  </ul>
                </div>

                <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                  <span className="font-bold text-sm text-[#10B981]">Industry Standard Benchmark (2025)</span>
                  <ul className="space-y-1 list-disc list-inside text-[#FAFAFA]">
                    <li>Apache Spark & Distributed GPU Clusters</li>
                    <li>Vector Databases & Milvus Embeddings</li>
                    <li>Model Context Protocol (MCP) & Agents</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeView === 'recommendations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl">AI Curriculum Modernization Recommendations</h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    Prioritized AI suggestions with 1-click syllabus unit replacement.
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#10B981]">Recommendation 1: Add Model Context Protocol (MCP)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10B981] text-white">High Impact</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Incorporate 2-week practical lab on building MCP clients and tools in Python & FastAPI.
                </p>
              </div>
            </div>
          )}

          {activeView === 'version' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl">Syllabus Version Comparison & Audit Trail</h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    Compare v1.0 (Original) vs v2.0 (AI Modernized) with full diff highlighting.
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                <div className="text-red-400">- Unit 3: Hadoop MapReduce Basics (Removed)</div>
                <div className="text-[#10B981]">+ Unit 3: Model Context Protocol & Vector Databases (Added)</div>
                <div className="text-[#34D399]">+ Practical Lab: ChromaDB Vector Indexing with Docker</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
