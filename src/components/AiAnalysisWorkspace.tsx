import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  ChevronRight,
  ChevronDown,
  Layers,
  Cpu,
  Database,
  BarChart2,
  Network,
  TrendingUp,
  Download,
  Share2,
  GitPullRequest,
  GitCommit,
  Clock,
  Check,
  X,
  Play,
  RotateCcw,
  ExternalLink,
  BookOpen,
  Zap,
  Target,
  ShieldCheck,
  Flame,
  Radio,
  Search,
  Filter,
  Eye,
  Sliders,
  Terminal,
  ArrowRight,
  HelpCircle,
  Plus,
  RefreshCw,
  Copy,
  Layout,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ThemeMode } from '../types';

interface AiAnalysisWorkspaceProps {
  theme: ThemeMode;
  onNavigateBack?: () => void;
  onExportPdf?: () => void;
}

export const AiAnalysisWorkspace: React.FC<AiAnalysisWorkspaceProps> = ({
  theme,
  onNavigateBack,
  onExportPdf
}) => {
  const isDark = theme === 'dark';

  // Workspace View & Layout Controls
  const [activeTab, setActiveTab] = useState<'insights' | 'skillgap' | 'graph' | 'industry' | 'history'>('insights');
  const [filterType, setFilterType] = useState<'all' | 'addition' | 'warning' | 'obsolete' | 'info'>('all');
  
  // Interactive Document State & Suggestions Status
  const [alignmentScore, setAlignmentScore] = useState(84);
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<Record<string, boolean>>({
    'sug-vector': false,
    'sug-hadoop': false,
    'sug-mcp': false,
    'sug-prompt': false
  });
  const [rejectedSuggestions, setRejectedSuggestions] = useState<Record<string, boolean>>({});
  const [showLearnWhyModal, setShowLearnWhyModal] = useState<string | null>(null);

  // Analysis Progress Modal State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState({
    outcomes: 0,
    ontology: 0,
    jobMarket: 0,
    recommendations: 0
  });

  // Syllabus Explorer Tree Expansion States
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'course-info': true,
    'units': true,
    'unit-1': true,
    'unit-2': true,
    'unit-3': true,
    'unit-4': true,
    'outcomes': true,
    'bloom': false,
    'labs': true,
    'projects': false
  });

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  // Run AI Analysis Simulator
  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress({ outcomes: 0, ontology: 0, jobMarket: 0, recommendations: 0 });

    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev.outcomes < 100) return { ...prev, outcomes: prev.outcomes + 25 };
        if (prev.ontology < 100) return { ...prev, ontology: prev.ontology + 20 };
        if (prev.jobMarket < 100) return { ...prev, jobMarket: prev.jobMarket + 25 };
        if (prev.recommendations < 100) return { ...prev, recommendations: prev.recommendations + 15 };
        clearInterval(interval);
        setTimeout(() => setIsAnalyzing(false), 500);
        return prev;
      });
    }, 250);
  };

  // Handle Accept Suggestion
  const handleAcceptSuggestion = (id: string, impactBoost: number) => {
    if (!acceptedSuggestions[id]) {
      setAcceptedSuggestions(prev => ({ ...prev, [id]: true }));
      setRejectedSuggestions(prev => ({ ...prev, [id]: false }));
      setAlignmentScore(prev => Math.min(98, prev + impactBoost));
    }
  };

  // Handle Reject Suggestion
  const handleRejectSuggestion = (id: string, impactBoost: number) => {
    if (acceptedSuggestions[id]) {
      setAlignmentScore(prev => Math.max(70, prev - impactBoost));
    }
    setAcceptedSuggestions(prev => ({ ...prev, [id]: false }));
    setRejectedSuggestions(prev => ({ ...prev, [id]: true }));
  };

  // Knowledge Graph Selected Node State
  const [selectedGraphNode, setSelectedGraphNode] = useState(2);

  const GRAPH_NODES = [
    { id: 0, label: 'Course', name: 'CS-8042 Adv ML', color: '#10B981', sub: 'Graduate Level' },
    { id: 1, label: 'Outcome', name: 'CO-2 Vector Search', color: '#34D399', sub: 'ABET Criterion 3' },
    { id: 2, label: 'Skill', name: 'Approx Nearest Neighbor', color: '#059669', sub: 'HNSW Indexing' },
    { id: 3, label: 'Technology', name: 'Milvus & pgvector', color: '#10B981', sub: 'Missing in Syllabus' },
    { id: 4, label: 'Target Job', name: 'AI Infra Eng ($180k)', color: '#A7F3D0', sub: '3,400+ Openings' }
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAFAFA] text-[#111827]'
    }`}>
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. TOP TOOLBAR (IDE HEADER)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className={`sticky top-0 z-40 border-b px-4 py-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md transition-colors ${
        isDark ? 'bg-[#0E0E0E]/95 border-[#262626]' : 'bg-[#FFFFFF]/95 border-[#E5E7EB] shadow-sm'
      }`}>
        
        {/* Left Title & Status Badges */}
        <div className="flex items-center gap-3">
          {onNavigateBack && (
            <button
              onClick={onNavigateBack}
              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] font-bold">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-sm sm:text-base tracking-tight leading-none">
                  CS-8042: Advanced Machine Learning & MLOps
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#10B981]">
                  v2.4 (Draft)
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                Fall 2026 • Computer Engineering Dept • Stanford School of Engineering
              </p>
            </div>
          </div>
        </div>

        {/* Middle Live AI Engine Indicators */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-bold">Gemini 2.5 Pro</span>
          </div>
          <div className={`px-2.5 py-1 rounded-full border ${isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'}`}>
            <span>Semantic Analysis Active</span>
          </div>
          <div className={`px-2.5 py-1 rounded-full border ${isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'}`}>
            <span>Knowledge Graph Ready</span>
          </div>
          <div className={`px-2.5 py-1 rounded-full border ${isDark ? 'bg-[#171717] border-[#262626] text-[#10B981]' : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#059669]'}`}>
            <span>120k Jobs Synced</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-1.5 shadow-md shadow-[#10B981]/20 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Re-Analyze Syllabus</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="hidden sm:inline">Compare Diff</span>
          </button>

          <button
            onClick={onExportPdf}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export ABET PDF</span>
          </button>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. THREE-COLUMN IDE WORKSPACE BODY
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* ── LEFT PANEL: SYLLABUS EXPLORER (VS Code Style) (3 Cols) ── */}
        <aside className={`lg:col-span-3 border-r flex flex-col justify-between overflow-y-auto ${
          isDark ? 'bg-[#0E0E0E] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
        }`}>
          <div>
            {/* Panel Header */}
            <div className={`p-3 border-b flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider ${
              isDark ? 'bg-[#141414] border-[#262626] text-[#737373]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'
            }`}>
              <div className="flex items-center gap-2">
                <Folder className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Syllabus Explorer</span>
              </div>
              <span className="text-[10px] text-[#10B981]">CS-8042.json</span>
            </div>

            {/* Tree Navigation List */}
            <div className="p-2 space-y-1 text-xs font-medium">
              
              {/* Course Info Item */}
              <div>
                <div
                  onClick={() => toggleNode('course-info')}
                  className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-[#171717] text-[#FAFAFA]' : 'hover:bg-[#F3F4F6] text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {expandedNodes['course-info'] ? <ChevronDown className="w-3.5 h-3.5 text-[#10B981]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#737373]" />}
                    <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="font-semibold">Course Information</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#737373]">4 Credits</span>
                </div>

                {expandedNodes['course-info'] && (
                  <div className="pl-6 pt-1 space-y-1 text-[11px] text-[#888888]">
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">▸ Prerequisites: CS-3010, CS-4080</div>
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">▸ Level: Master of Science (MS Core)</div>
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">▸ ABET Outcome Criteria: SO-1, SO-2, SO-6</div>
                  </div>
                )}
              </div>

              {/* Units Hierarchy Item */}
              <div>
                <div
                  onClick={() => toggleNode('units')}
                  className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-[#171717] text-[#FAFAFA]' : 'hover:bg-[#F3F4F6] text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {expandedNodes['units'] ? <ChevronDown className="w-3.5 h-3.5 text-[#10B981]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#737373]" />}
                    <Layers className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="font-semibold">Syllabus Units (4)</span>
                  </div>
                  <span className="text-[10px] font-mono bg-[#10B981]/20 text-[#10B981] px-1.5 py-0.2 rounded">Modified</span>
                </div>

                {expandedNodes['units'] && (
                  <div className="pl-5 space-y-1 mt-1 border-l border-[#262626]/40 ml-3">
                    <div className="p-1.5 rounded flex items-center justify-between text-[11px] hover:bg-[#10B981]/10 text-[#10B981] cursor-pointer font-medium">
                      <div className="flex items-center gap-1.5">
                        <FileCode className="w-3 h-3" />
                        <span>Unit 1: Foundations & PyTorch</span>
                      </div>
                      <span className="text-[9px] font-mono">Wk 1-3</span>
                    </div>

                    <div className="p-1.5 rounded flex items-center justify-between text-[11px] hover:bg-amber-500/10 text-amber-400 cursor-pointer font-medium">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Unit 2: Vector Search & Milvus</span>
                      </div>
                      <span className="text-[9px] font-mono text-amber-400 font-bold">Gap</span>
                    </div>

                    <div className="p-1.5 rounded flex items-center justify-between text-[11px] hover:bg-red-500/10 text-red-400 cursor-pointer font-medium">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-3 h-3" />
                        <span>Unit 3: MLOps & Legacy Hadoop</span>
                      </div>
                      <span className="text-[9px] font-mono text-red-400 font-bold">Obsolete</span>
                    </div>

                    <div className="p-1.5 rounded flex items-center justify-between text-[11px] hover:bg-[#10B981]/10 text-[#10B981] cursor-pointer font-medium">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Unit 4: MCP Protocol & AI Agents</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#10B981] font-bold">+New</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Outcomes (COs) */}
              <div>
                <div
                  onClick={() => toggleNode('outcomes')}
                  className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-[#171717] text-[#FAFAFA]' : 'hover:bg-[#F3F4F6] text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {expandedNodes['outcomes'] ? <ChevronDown className="w-3.5 h-3.5 text-[#10B981]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#737373]" />}
                    <Target className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="font-semibold">Course Outcomes (CO-1 to 4)</span>
                  </div>
                </div>

                {expandedNodes['outcomes'] && (
                  <div className="pl-6 space-y-1 text-[11px] text-[#888888] pt-1">
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">CO-1: Neural Nets & CUDA Kernels</div>
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">CO-2: Vector Similarity & HNSW</div>
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">CO-3: Multi-GPU Cluster vLLM</div>
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">CO-4: Model Context Protocol (MCP)</div>
                  </div>
                )}
              </div>

              {/* Bloom Mapping */}
              <div
                onClick={() => toggleNode('bloom')}
                className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                  isDark ? 'hover:bg-[#171717] text-[#FAFAFA]' : 'hover:bg-[#F3F4F6] text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="font-semibold">Bloom's Taxonomy Map</span>
                </div>
                <span className="text-[10px] font-mono text-[#10B981]">High Depth</span>
              </div>

              {/* Labs & Assignments */}
              <div>
                <div
                  onClick={() => toggleNode('labs')}
                  className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-[#171717] text-[#FAFAFA]' : 'hover:bg-[#F3F4F6] text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {expandedNodes['labs'] ? <ChevronDown className="w-3.5 h-3.5 text-[#10B981]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#737373]" />}
                    <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="font-semibold">Practical Labs & Projects</span>
                  </div>
                </div>

                {expandedNodes['labs'] && (
                  <div className="pl-6 space-y-1 text-[11px] text-[#888888] pt-1">
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">Lab 1: Distributed CUDA Benchmark</div>
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">Lab 2: Vector Search in Milvus</div>
                    <div className="p-1 rounded hover:text-[#10B981] cursor-pointer">Lab 3: TypeScript MCP Server</div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Left Footer Info Card */}
          <div className={`p-3 border-t text-[11px] font-mono space-y-1 ${
            isDark ? 'bg-[#111111] border-[#262626] text-[#737373]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'
          }`}>
            <div className="flex justify-between">
              <span>Syllabus Format:</span>
              <span className="text-[#10B981]">Structured JSON</span>
            </div>
            <div className="flex justify-between">
              <span>Parser Confidence:</span>
              <span className="text-[#10B981]">98.2%</span>
            </div>
          </div>
        </aside>

        {/* ── CENTER PANEL: EDITABLE SYLLABUS DOCUMENT + INLINE AI SUGGESTIONS (5 Cols) ── */}
        <main className={`lg:col-span-5 border-r p-6 overflow-y-auto space-y-6 ${
          isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
        }`}>
          
          {/* Editor Header Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#262626]/40">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981]">
                Live AI Curriculum Editor
              </span>
              <h2 className="font-heading font-bold text-lg tracking-tight">Syllabus Specification Document</h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  filterType === 'all'
                    ? 'bg-[#10B981] text-white border-[#10B981]'
                    : isDark ? 'bg-[#171717] border-[#262626] text-[#737373]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'
                }`}
              >
                All (4)
              </button>
              <button
                onClick={() => setFilterType('addition')}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  filterType === 'addition'
                    ? 'bg-[#10B981] text-white border-[#10B981]'
                    : isDark ? 'bg-[#171717] border-[#262626] text-[#10B981]' : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#059669]'
                }`}
              >
                +Additions
              </button>
              <button
                onClick={() => setFilterType('warning')}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  filterType === 'warning'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : isDark ? 'bg-[#171717] border-[#262626] text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'
                }`}
              >
                ⚠Warnings
              </button>
            </div>
          </div>

          {/* DOCUMENT SECTION 1: UNIT 1 */}
          <div className={`p-5 rounded-[20px] border space-y-3 transition-all ${
            isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-[#10B981]">UNIT 1 • WEEKS 1 TO 3</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] font-bold">100% Aligned</span>
            </div>
            <h3 className="font-heading font-bold text-base">Foundations of Deep Learning & Multi-GPU Clusters</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
              Covers PyTorch 2.5 C++ primitives, CUDA tensor core memory layouts, and distributed matrix multiplication algorithms.
            </p>

            {/* Inline Info Badge */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs text-blue-400 font-mono">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>Cognitive depth updated from 'Understand' to 'Evaluate' per ABET SO-1.</span>
              </div>
              <span className="font-bold">Verified</span>
            </div>
          </div>

          {/* DOCUMENT SECTION 2: UNIT 2 + ORANGE WARNING AI SUGGESTION */}
          {(filterType === 'all' || filterType === 'warning') && (
            <div className={`p-5 rounded-[20px] border space-y-4 transition-all relative ${
              acceptedSuggestions['sug-vector']
                ? 'bg-[#10B981]/10 border-[#10B981]'
                : rejectedSuggestions['sug-vector']
                  ? 'bg-red-500/5 border-red-500/30 opacity-60'
                  : 'bg-amber-500/5 border-amber-500/40'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  UNIT 2 • VECTOR DATABASES & HIGH-DIMENSIONAL INDEXING
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                  97% AI Confidence
                </span>
              </div>

              <h3 className="font-heading font-bold text-base">Approximate Nearest Neighbor (ANN) & Milvus Cluster Setup</h3>

              {/* INLINE AI SUGGESTION CARD */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    ⚠ AI MODERNIZATION SUGGESTION
                  </span>
                  <span className="text-xs font-mono font-bold text-[#10B981]">+12% Alignment Impact</span>
                </div>

                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Industry demand indicates <strong>Vector Databases (Milvus / pgvector)</strong> should be introduced. Current syllabus relies on legacy flat relational indexing.
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#262626]/30">
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="text-amber-400 font-bold">Hiring Growth: +195%</span>
                    <button
                      onClick={() => setShowLearnWhyModal('vector-db')}
                      className="text-[#10B981] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3 h-3" /> Learn Why
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRejectSuggestion('sug-vector', 12)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        rejectedSuggestions['sug-vector']
                          ? 'bg-red-500 text-white'
                          : 'bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => handleAcceptSuggestion('sug-vector', 12)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        acceptedSuggestions['sug-vector']
                          ? 'bg-[#10B981] text-white'
                          : 'bg-[#10B981] text-white hover:bg-[#34D399]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{acceptedSuggestions['sug-vector'] ? 'Accepted' : 'Accept Suggestion'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENT SECTION 3: UNIT 3 + RED OBSOLETE WARNING CARD */}
          {(filterType === 'all' || filterType === 'obsolete') && (
            <div className={`p-5 rounded-[20px] border space-y-4 transition-all ${
              acceptedSuggestions['sug-hadoop']
                ? 'bg-[#10B981]/10 border-[#10B981]'
                : 'bg-red-500/5 border-red-500/40'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-red-400 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  UNIT 3 • OBSOLETE CONTENT ALERT
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                  95% Confidence
                </span>
              </div>

              <h3 className="font-heading font-bold text-base">Replace Legacy Hadoop / MapReduce Practical Lab</h3>

              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-red-400">
                    ⛔ RECOMMENDED REPLACEMENT
                  </span>
                  <span className="text-xs font-mono font-bold text-[#10B981]">+15% Industry Relevance</span>
                </div>

                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Current hiring demand has decreased by 78% for Hadoop MapReduce. Recommended upgrade to <strong>Apache Spark 3.5, Delta Lake, and vLLM Memory Management</strong>.
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#262626]/30">
                  <span className="text-[11px] font-mono text-red-400 font-semibold">
                    Triggered by: 4,200 Job Specs Shift
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRejectSuggestion('sug-hadoop', 15)}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white cursor-pointer"
                    >
                      Keep Legacy
                    </button>
                    <button
                      onClick={() => handleAcceptSuggestion('sug-hadoop', 15)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        acceptedSuggestions['sug-hadoop']
                          ? 'bg-[#10B981] text-white'
                          : 'bg-[#10B981] text-white hover:bg-[#34D399]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{acceptedSuggestions['sug-hadoop'] ? 'Replaced' : 'Replace with Spark'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENT SECTION 4: UNIT 4 + GREEN ADDITION CARD */}
          {(filterType === 'all' || filterType === 'addition') && (
            <div className={`p-5 rounded-[20px] border space-y-4 transition-all ${
              acceptedSuggestions['sug-mcp']
                ? 'bg-[#10B981]/15 border-[#10B981]'
                : 'bg-[#10B981]/5 border-[#10B981]/40'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#10B981] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  UNIT 4 • NEW RECOMMENDED MODULE
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
                  98% AI Confidence
                </span>
              </div>

              <h3 className="font-heading font-bold text-base">Model Context Protocol (MCP) & Multi-Agent Orchestration</h3>

              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#10B981]">
                    ✨ SURGING INDUSTRY DEMAND (+340%)
                  </span>
                  <span className="text-xs font-mono font-bold text-[#10B981]">+14% Alignment Boost</span>
                </div>

                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Surging employer demand for engineers capable of building <strong>MCP TypeScript servers, Anthropic tool calling, and LangGraph multi-agent loops</strong>.
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#262626]/30">
                  <span className="text-[11px] font-mono text-[#10B981] font-semibold">
                    Includes 2-Week Hands-on MCP Server Lab
                  </span>

                  <button
                    onClick={() => handleAcceptSuggestion('sug-mcp', 14)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      acceptedSuggestions['sug-mcp']
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#10B981] text-white hover:bg-[#34D399] shadow-md shadow-[#10B981]/20'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{acceptedSuggestions['sug-mcp'] ? 'Unit 4 Added' : '1-Click Insert Unit'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* ── RIGHT PANEL: 5-TAB IDE INSPECTOR (4 Cols) ── */}
        <aside className={`lg:col-span-4 flex flex-col justify-between overflow-y-auto ${
          isDark ? 'bg-[#0E0E0E]' : 'bg-[#FFFFFF]'
        }`}>
          <div>
            {/* Tab Navigation Header */}
            <div className={`p-2 border-b flex items-center justify-between gap-1 overflow-x-auto ${
              isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
            }`}>
              <button
                onClick={() => setActiveTab('insights')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'insights'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : isDark ? 'text-[#737373] hover:text-white' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Insights</span>
              </button>

              <button
                onClick={() => setActiveTab('skillgap')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'skillgap'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : isDark ? 'text-[#737373] hover:text-white' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <BarChart2 className="w-3 h-3" />
                <span>Skill Gap</span>
              </button>

              <button
                onClick={() => setActiveTab('graph')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'graph'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : isDark ? 'text-[#737373] hover:text-white' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Network className="w-3 h-3" />
                <span>Knowledge Graph</span>
              </button>

              <button
                onClick={() => setActiveTab('industry')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'industry'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : isDark ? 'text-[#737373] hover:text-white' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <TrendingUp className="w-3 h-3" />
                <span>Industry</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'history'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : isDark ? 'text-[#737373] hover:text-white' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <GitCommit className="w-3 h-3" />
                <span>History</span>
              </button>
            </div>

            {/* TAB CONTENT 1: INSIGHTS */}
            {activeTab === 'insights' && (
              <div className="p-5 space-y-6">
                
                {/* Alignment Score Gauge Box */}
                <div className={`p-5 rounded-[22px] border space-y-4 ${
                  isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#10B981] uppercase">ALIGNMENT INDEX</span>
                    <span className="text-xs font-mono font-bold text-amber-400">+12% Target Achieved</span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className={`text-[10px] block font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Current Score</span>
                      <span className="font-heading font-bold text-3xl text-amber-400">84%</span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-[#10B981]" />

                    <div className="text-right">
                      <span className={`text-[10px] block font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Projected Alignment</span>
                      <span className="font-heading font-bold text-4xl text-[#10B981]">{alignmentScore}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-[#262626] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full transition-all duration-500" style={{ width: `${alignmentScore}%` }} />
                  </div>
                </div>

                {/* Missing Skills Tags Box */}
                <div className="space-y-3">
                  <h4 className="font-heading font-bold text-sm flex items-center justify-between">
                    <span>Critical Missing Skills</span>
                    <span className="text-xs font-mono text-red-400 font-bold">7 Identified</span>
                  </h4>

                  <div className="flex flex-wrap gap-1.5">
                    {['Docker', 'Kubernetes 1.30', 'MCP Protocol', 'Vector Databases', 'Prompt Engineering', 'AI Agents', 'RAG Search', 'vLLM Memory', 'Ray Clusters'].map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 font-mono text-xs font-bold border border-red-500/20"
                      >
                        ⚠ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Reasoning Console Terminal */}
                <div className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
                  isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#10B981]' : 'bg-[#1E293B] text-[#34D399]'
                }`}>
                  <div className="flex items-center gap-2 border-b border-[#262626] pb-2 text-[10px] text-[#737373]">
                    <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>GEMINI REASONING LOG (280ms)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    &gt; Analyzed 120,400 global job postings for 'AI Infrastructure Engineer'.<br />
                    &gt; Detected 340% surge in Model Context Protocol requirement.<br />
                    &gt; Recommendation confidence score: 98%. ABET Criterion 3 outcome matched.
                  </p>
                </div>

              </div>
            )}

            {/* TAB CONTENT 2: SKILL GAP */}
            {activeTab === 'skillgap' && (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm">Quantified Skill Deficit</h4>
                  <span className="text-xs font-mono text-[#10B981] font-bold">Syllabus vs Market</span>
                </div>

                <div className="space-y-3.5 text-xs font-mono">
                  {[
                    { name: 'Python & Data Stack', current: 95, demand: 98, gap: -3 },
                    { name: 'Docker Containers', current: 62, demand: 88, gap: -26 },
                    { name: 'Kubernetes 1.30', current: 38, demand: 76, gap: -38 },
                    { name: 'MCP Protocol', current: 12, demand: 85, gap: -73 },
                    { name: 'Vector DBs (Milvus)', current: 18, demand: 78, gap: -60 },
                    { name: 'AI Agents & LangGraph', current: 15, demand: 82, gap: -67 },
                    { name: 'Prompt Engineering', current: 25, demand: 80, gap: -55 }
                  ].map((sk, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between font-bold">
                        <span className="font-sans">{sk.name}</span>
                        <span className={sk.gap < -30 ? 'text-red-400' : 'text-amber-400'}>{sk.gap}% Gap</span>
                      </div>
                      <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden flex">
                        <div className="bg-[#10B981] h-full" style={{ width: `${sk.current}%` }} />
                        <div className="bg-red-500 h-full opacity-60" style={{ width: `${Math.abs(sk.gap)}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-[#737373]">
                        <span>Syllabus: {sk.current}%</span>
                        <span>Market: {sk.demand}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: KNOWLEDGE GRAPH */}
            {activeTab === 'graph' && (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm">Neo4j Dependency Graph</h4>
                  <span className="text-xs font-mono text-[#10B981]">5 Active Nodes</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {GRAPH_NODES.map((node, idx) => (
                    <motion.div
                      key={node.id}
                      whileHover={{ x: 2 }}
                      onClick={() => setSelectedGraphNode(node.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedGraphNode === node.id
                          ? 'border-[#10B981] bg-[#10B981]/15'
                          : isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="font-bold text-[#10B981] uppercase">{node.label}</span>
                        <span className="text-[10px] text-[#737373]">{node.sub}</span>
                      </div>
                      <h5 className="font-heading font-bold text-sm mt-1">{node.name}</h5>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: INDUSTRY TRENDS */}
            {activeTab === 'industry' && (
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between border-b pb-3 border-[#262626]">
                  <h4 className="font-heading font-bold text-sm">Live Job Market Feed</h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400">Surging</span>
                </div>

                {[
                  { name: 'Model Context Protocol (MCP)', growth: '+340%', action: 'Add Unit 4 MCP Lab' },
                  { name: 'AI Agents & LangGraph', growth: '+250%', action: 'Insert Autonomous Agent Loop' },
                  { name: 'Vector Databases (Milvus)', growth: '+195%', action: 'Replace Flat SQL Indexing' },
                  { name: 'Prompt Engineering', growth: '+220%', action: 'Add Evaluation Framework' }
                ].map((tr, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border text-xs space-y-1 ${
                    isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}>
                    <div className="flex justify-between font-bold">
                      <span>{tr.name}</span>
                      <span className="text-[#10B981] font-mono">{tr.growth}</span>
                    </div>
                    <p className="text-[11px] text-[#10B981]">💡 {tr.action}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 5: HISTORY & COMMITS */}
            {activeTab === 'history' && (
              <div className="p-5 space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between border-b pb-3 border-[#262626]">
                  <h4 className="font-heading font-bold text-sm font-sans">Version Commit History</h4>
                  <span className="text-[10px] text-[#10B981]">Git PR #42</span>
                </div>

                <div className="space-y-2.5">
                  <div className={`p-3 rounded-xl border space-y-1 ${
                    isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}>
                    <div className="flex justify-between font-bold text-[#10B981]">
                      <span>v2.4 (Current Draft)</span>
                      <span>Just now</span>
                    </div>
                    <p className="text-[11px] text-[#888888]">Applied AI Modernization: Inserted MCP Module & Vector Search.</p>
                  </div>

                  <div className={`p-3 rounded-xl border space-y-1 ${
                    isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}>
                    <div className="flex justify-between font-bold text-[#737373]">
                      <span>v2.3 (Committee Review)</span>
                      <span>2 days ago</span>
                    </div>
                    <p className="text-[11px] text-[#888888]">Reviewed by Dr. Sharma. ABET Criterion 3 verified.</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </aside>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. BOTTOM PANEL: RECOMMENDATION TIMELINE / PULL REQUEST BAR
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`border-t p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${
        isDark ? 'bg-[#0E0E0E] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
      }`}>
        <div className="flex items-center gap-3">
          <GitPullRequest className="w-5 h-5 text-[#10B981] flex-shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xs sm:text-sm">
                PR #104: Introduce Model Context Protocol (MCP) & Vector Search
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
                3 Actions Ready
              </span>
            </div>
            <p className={`text-[11px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
              Generated by Gemini 2.5 Pro • 98% AI Confidence • Boosts Industry Alignment by +14%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleAcceptSuggestion('sug-vector', 12);
              handleAcceptSuggestion('sug-hadoop', 15);
              handleAcceptSuggestion('sug-mcp', 14);
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-1.5 shadow-md shadow-[#10B981]/20 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Apply All 3 Recommendations</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. BOTTOM STATUS BAR (GitHub-Like IDE Footer)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className={`border-t px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono ${
        isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#737373]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#6B7280]'
      }`}>
        <div className="flex items-center gap-4">
          <span>Original: <strong className="text-[#FAFAFA]">v1.0 (PDF)</strong></span>
          <span>➔</span>
          <span>Draft: <strong className="text-[#10B981]">v2.4 (AI Modernized)</strong></span>
          <span>➔</span>
          <span className="text-[#10B981] font-bold">Saved 2m ago</span>
        </div>

        <div className="flex items-center gap-4">
          <span>ABET Criterion 3: <strong className="text-[#10B981]">PASSED</strong></span>
          <span>UTF-8</span>
          <span>TypeScript / JSON</span>
          <span className="text-[#10B981] font-bold">Ready for Institutional Export</span>
        </div>
      </footer>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL: AI ANALYSIS PROGRESS OVERLAY
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {isAnalyzing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              className={`relative w-full max-w-lg rounded-[24px] border p-8 shadow-2xl z-10 space-y-6 ${
                isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="text-center space-y-2">
                <RefreshCw className="w-10 h-10 text-[#10B981] animate-spin mx-auto" />
                <h3 className="font-heading font-bold text-2xl">Gemini 2.5 Pro Analyzing Syllabus</h3>
                <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Extracting learning outcomes, mapping Neo4j ontology, and auditing missing tech skills...
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Extracting Learning Outcomes</span>
                    <span className="text-[#10B981] font-bold">{analysisProgress.outcomes}%</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full transition-all duration-200" style={{ width: `${analysisProgress.outcomes}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Building Skill Ontology</span>
                    <span className="text-[#10B981] font-bold">{analysisProgress.ontology}%</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full transition-all duration-200" style={{ width: `${analysisProgress.ontology}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Comparing Job Market (120k specs)</span>
                    <span className="text-[#10B981] font-bold">{analysisProgress.jobMarket}%</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full transition-all duration-200" style={{ width: `${analysisProgress.jobMarket}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Generating Recommendations</span>
                    <span className="text-[#10B981] font-bold">{analysisProgress.recommendations}%</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full transition-all duration-200" style={{ width: `${analysisProgress.recommendations}%` }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL: LEARN WHY (RATIONALE DRAWER)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {showLearnWhyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLearnWhyModal(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative w-full max-w-lg rounded-[24px] border p-6 shadow-2xl z-10 space-y-4 ${
                isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-[#262626]">
                <div className="flex items-center gap-2 text-[#10B981]">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-heading font-bold text-lg text-white">AI Suggestion Rationale</h4>
                </div>
                <button
                  onClick={() => setShowLearnWhyModal(null)}
                  className="p-1 rounded text-[#737373] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <p>
                  <strong>Why Vector Databases & Milvus?</strong>
                </p>
                <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>
                  Analysis of 120,000+ job postings for Machine Learning and AI Engineers shows that <strong>84% of postings require experience with high-dimensional vector search engines</strong> (Milvus, pgvector, Qdrant).
                </p>
                <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>
                  Current academic syllabi often teach flat B-Tree relational indexing, leaving students with a critical skill gap when building RAG systems and LLM context pipelines.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowLearnWhyModal(null);
                  handleAcceptSuggestion('sug-vector', 12);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all"
              >
                Accept & Insert Vector Search Module
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
