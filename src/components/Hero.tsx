import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  LayoutDashboard, 
  BookOpen, 
  BrainCircuit, 
  FileQuestion, 
  BarChart3, 
  Download, 
  Sliders, 
  Search, 
  Bell, 
  Check, 
  Layers, 
  TrendingUp,
  Award,
  Zap,
  CheckSquare
} from 'lucide-react';
import { ThemeMode } from '../types';

interface HeroProps {
  theme: ThemeMode;
  onOpenGetStarted: () => void;
  onOpenWatchDemo: () => void;
  onExportPdf: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  theme,
  onOpenGetStarted,
  onOpenWatchDemo,
  onExportPdf
}) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'syllabus' | 'gaps' | 'graph' | 'modernization' | 'export'>('gaps');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(142);

  const handleSimulateGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedCount(prev => prev + 1);
    }, 1200);
  };

  return (
    <section className={`relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: 45% (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            
            {/* Top Pill / Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25 self-start"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Curriculum Intelligence Platform</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-[54px] leading-[1.08] tracking-tight"
            >
              Modernize University <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">Curricula</span> with AI
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'
              }`}
            >
              Lumini continuously compares university syllabi against real industry skill requirements, job market trends and emerging technologies to identify skill gaps and generate AI-powered curriculum improvements.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                onClick={onOpenGetStarted}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white rounded-[14px] bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-lg shadow-[#10B981]/25 hover:shadow-xl hover:shadow-[#10B981]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={onOpenWatchDemo}
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-medium rounded-[14px] border transition-all duration-200 ${
                  isDark
                    ? 'bg-[#111111] border-[#262626] text-[#FAFAFA] hover:bg-[#171717] hover:border-[#10B981]/40'
                    : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] hover:border-[#10B981]/40'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-[#10B981]/15 flex items-center justify-center text-[#10B981]">
                  <Play className="w-3.5 h-3.5 fill-[#10B981]" />
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Small Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#262626]/40"
            >
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>AI Powered</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Curriculum Ready</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Institution Friendly</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Export to PDF</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: 55% (7 cols on lg) */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`rounded-[20px] border shadow-2xl overflow-hidden ${
                isDark
                  ? 'bg-[#111111] border-[#262626] shadow-black/80'
                  : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-slate-200/80'
              }`}
            >
              {/* SaaS Top Window Header */}
              <div className={`h-11 px-4 border-b flex items-center justify-between ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
              }`}>
                {/* Traffic Lights */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                  <span className={`ml-3 text-xs font-mono font-medium ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                    Lumini Workstation — CS-8042 Advanced ML
                  </span>
                </div>

                {/* Right Top Status & Export Button */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] text-[11px] font-medium border border-[#10B981]/20">
                    <Zap className="w-3 h-3" />
                    <span>Gemini 3.6 Flash Active</span>
                  </div>

                  <button
                    onClick={onExportPdf}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-[#10B981] text-white hover:bg-[#34D399] transition-colors shadow-sm"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              {/* SaaS Interior Layout: Sidebar + Main Workspace */}
              <div className="grid grid-cols-12 min-h-[460px]">
                
                {/* Micro Sidebar */}
                <div className={`col-span-3 border-r p-3 hidden sm:flex flex-col justify-between ${
                  isDark ? 'bg-[#0A0A0A]/50 border-[#262626]' : 'bg-[#F8FAFC]/50 border-[#E5E7EB]'
                }`}>
                  <div className="space-y-1">
                    <div className="px-2 py-1.5 text-[10px] font-semibold tracking-wider text-[#10B981] uppercase font-mono">
                      Modules
                    </div>

                    <button className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isDark ? 'bg-[#171717] text-[#FAFAFA]' : 'bg-[#E5E7EB] text-[#111827]'
                    }`}>
                      <LayoutDashboard className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Overview</span>
                    </button>

                    <button className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium opacity-80 hover:opacity-100 transition-colors ${
                      isDark ? 'text-[#B3B3B3] hover:bg-[#171717]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                    }`}>
                      <BrainCircuit className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Bloom's Engine</span>
                    </button>

                    <button className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium opacity-80 hover:opacity-100 transition-colors ${
                      isDark ? 'text-[#B3B3B3] hover:bg-[#171717]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                    }`}>
                      <FileQuestion className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Exams & Quizzes</span>
                    </button>

                    <button className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium opacity-80 hover:opacity-100 transition-colors ${
                      isDark ? 'text-[#B3B3B3] hover:bg-[#171717]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                    }`}>
                      <BarChart3 className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Skill Gaps</span>
                    </button>

                    <button className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium opacity-80 hover:opacity-100 transition-colors ${
                      isDark ? 'text-[#B3B3B3] hover:bg-[#171717]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                    }`}>
                      <FileText className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Rubric Builder</span>
                    </button>
                  </div>

                  <div className={`p-2.5 rounded-xl border text-xs space-y-1.5 ${
                    isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
                  }`}>
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span>Curriculum Score</span>
                      <span className="text-[#10B981] font-bold">94%</span>
                    </div>
                    <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#10B981] to-[#34D399] h-full w-[94%]" />
                    </div>
                    <span className={`text-[10px] block ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                      ABETS & IEEE 2025 Verified
                    </span>
                  </div>
                </div>

                {/* Main Workspace Area */}
                <div className="col-span-12 sm:col-span-9 p-4 space-y-4">
                  
                  {/* Top Header Metrics Row */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}>
                      <span className={`text-[11px] block font-medium ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        Health Score
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-heading font-bold text-[#10B981]">94%</span>
                        <span className="text-[10px] text-[#34D399] font-medium">+12% vs avg</span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}>
                      <span className={`text-[11px] block font-medium ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        Industry Fit
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-heading font-bold text-[#10B981]">92%</span>
                        <span className="text-[10px] text-[#10B981]">Top 2%</span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}>
                      <span className={`text-[11px] block font-medium ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        Higher-Order
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-heading font-bold text-[#FAFAFA]">65%</span>
                        <span className="text-[10px] text-[#10B981]">Bloom's</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Sub-Panel Tabs */}
                  <div className={`p-3.5 rounded-xl border space-y-3 ${
                    isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
                  }`}>
                    <div className="flex items-center justify-between border-b pb-2 border-[#262626]/50 overflow-x-auto">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setActiveTab('syllabus')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                            activeTab === 'syllabus'
                              ? 'bg-[#10B981] text-white'
                              : isDark ? 'text-[#B3B3B3] hover:bg-[#262626]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          Syllabus
                        </button>
                        <button
                          onClick={() => setActiveTab('gaps')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                            activeTab === 'gaps'
                              ? 'bg-[#10B981] text-white'
                              : isDark ? 'text-[#B3B3B3] hover:bg-[#262626]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          Skill Gaps
                        </button>
                        <button
                          onClick={() => setActiveTab('graph')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                            activeTab === 'graph'
                              ? 'bg-[#10B981] text-white'
                              : isDark ? 'text-[#B3B3B3] hover:bg-[#262626]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          Knowledge Graph
                        </button>
                        <button
                          onClick={() => setActiveTab('modernization')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                            activeTab === 'modernization'
                              ? 'bg-[#10B981] text-white'
                              : isDark ? 'text-[#B3B3B3] hover:bg-[#262626]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          AI Suggestions
                        </button>
                        <button
                          onClick={() => setActiveTab('export')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                            activeTab === 'export'
                              ? 'bg-[#10B981] text-white'
                              : isDark ? 'text-[#B3B3B3] hover:bg-[#262626]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          Export
                        </button>
                      </div>

                      <button
                        onClick={handleSimulateGeneration}
                        disabled={isGenerating}
                        className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/25 transition-colors flex-shrink-0"
                      >
                        <Sparkles className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                        <span>{isGenerating ? 'Analyzing...' : 'Run Audit'}</span>
                      </button>
                    </div>

                    {/* Tab Content 1: Uploaded Syllabus */}
                    {activeTab === 'syllabus' && (
                      <div className="space-y-2 text-xs">
                        <div className={`p-2.5 rounded-lg border space-y-1 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                          <div className="flex justify-between font-bold text-[#10B981]">
                            <span>Current Upload: CS-8042 Syllabus.pdf</span>
                            <span>Parsed 4 Units · 16 Weeks</span>
                          </div>
                          <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>
                            Extracting topics: High-Dimensional Vectors, Monolithic Hadoop MapReduce, Traditional Search Engines, Convolutional Networks.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tab Content 2: Skill Gaps */}
                    {activeTab === 'gaps' && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[11px] font-semibold">
                          <span className="text-[#EF4444]">⚠ Critical Missing Frameworks Detected:</span>
                          <span className="text-[#10B981]">120k Job Postings Cross-Referenced</span>
                        </div>

                        <div className="space-y-1.5">
                          <div className={`p-2 rounded-lg border flex items-center justify-between ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                            <span className="font-medium">Model Context Protocol (MCP) Runtime</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EF4444]/20 text-[#EF4444]">+340% Market Demand</span>
                          </div>
                          <div className={`p-2 rounded-lg border flex items-center justify-between ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                            <span className="font-medium">Vector Databases (Milvus / ChromaDB)</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B]">+195% Market Demand</span>
                          </div>
                          <div className={`p-2 rounded-lg border flex items-center justify-between ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                            <span className="font-medium">vLLM & PagedAttention GPU Memory</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10B981]/20 text-[#10B981]">+210% Market Demand</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab Content 3: Knowledge Graph */}
                    {activeTab === 'graph' && (
                      <div className="space-y-2 text-xs">
                        <div className={`p-2.5 rounded-lg border font-mono space-y-1.5 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                          <div className="text-[#10B981] font-bold">Neo4j Ontology Trajectory:</div>
                          <div className="flex items-center gap-2 flex-wrap text-[11px]">
                            <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">CS-8042 Course</span>
                            <span>➔</span>
                            <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">CO-2 Multimodal RAG</span>
                            <span>➔</span>
                            <span className="px-2 py-0.5 rounded bg-[#34D399]/20 text-[#34D399]">Vector DB Indexing</span>
                            <span>➔</span>
                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">AI Infrastructure Engineer</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab Content 4: AI Suggestions */}
                    {activeTab === 'modernization' && (
                      <div className="space-y-1.5 text-xs">
                        <div className={`p-2 rounded-lg border flex items-center justify-between ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                          <div>
                            <span className="font-bold text-[#10B981] block">Replace Hadoop MapReduce</span>
                            <span className={`text-[11px] ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Replace with Apache Spark & Vector Search in Unit 3</span>
                          </div>
                          <span className="px-2 py-1 rounded text-[10px] font-bold bg-[#10B981] text-white">1-Click Modernize</span>
                        </div>
                        <div className={`p-2 rounded-lg border flex items-center justify-between ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                          <div>
                            <span className="font-bold text-[#10B981] block">Add Model Context Protocol (MCP)</span>
                            <span className={`text-[11px] ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Add 2-week practical lab on MCP client/server integration</span>
                          </div>
                          <span className="px-2 py-1 rounded text-[10px] font-bold bg-[#10B981] text-white">1-Click Modernize</span>
                        </div>
                      </div>
                    )}

                    {/* Tab Content 5: Export */}
                    {activeTab === 'export' && (
                      <div className="space-y-2 text-xs">
                        <div className={`p-2.5 rounded-lg border flex items-center justify-between ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                          <div>
                            <span className="font-bold text-[#10B981]">ABET & NBA Audit Report Ready</span>
                            <p className={`text-[11px] ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Includes CO-PO Outcome Matrix, Bloom's Radar & Industry Skills Audit</p>
                          </div>
                          <button onClick={onExportPdf} className="px-3 py-1.5 rounded-lg bg-[#10B981] text-white font-bold text-xs hover:bg-[#34D399]">
                            Download PDF
                          </button>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Bottom AI Activity Log Line */}
                  <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
                    isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#B3B3B3]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                      <span>AI Audit Status: Synced with 120+ Top Tech Job Descriptions</span>
                    </div>
                    <span className="text-[#10B981] font-semibold">{generatedCount} Resources Sync'd</span>
                  </div>

                </div>

              </div>
            </motion.div>

            {/* Glowing Accent Ring Behind Frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/10 rounded-[24px] blur-2xl -z-10 opacity-50 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
