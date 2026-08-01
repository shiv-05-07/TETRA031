import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomSelect } from './CustomSelect';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  BarChart3,
  Sparkles,
  RefreshCw,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  BrainCircuit,
  GitPullRequest,
  ArrowUpRight,
  Layers,
  Database,
  Cpu,
  Terminal,
  Globe,
  Briefcase,
  SlidersHorizontal,
  ChevronRight,
  Check,
  FileText,
  Download,
  ExternalLink,
  Code,
  Info,
  BookOpen,
  UserCheck,
  Search,
  X
} from 'lucide-react';
import { ThemeMode } from '../types';

interface SkillGapAnalyzerPageProps {
  theme: ThemeMode;
  onOpenWorkspace?: (courseCode: string) => void;
  onExportReport?: () => void;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA DEFINITIONS FOR AI SKILL GAP ANALYZER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HEATMAP_DATA = [
  { skill: 'Python & Data Science Stack', category: 'Programming', current: 95, demand: 98, gap: -3, priority: 'Optimal' },
  { skill: 'SQL & Relational DBs', category: 'Data', current: 92, demand: 90, gap: 2, priority: 'Optimal' },
  { skill: 'Docker Containerization', category: 'Cloud & DevOps', current: 42, demand: 91, gap: -49, priority: 'High' },
  { skill: 'Kubernetes Orchestration', category: 'Cloud & DevOps', current: 18, demand: 82, gap: -64, priority: 'Critical' },
  { skill: 'Git & GitHub Actions CI/CD', category: 'DevOps', current: 70, demand: 88, gap: -18, priority: 'Moderate' },
  { skill: 'Linux Kernel & BPF', category: 'Systems', current: 65, demand: 75, gap: -10, priority: 'Moderate' },
  { skill: 'Cloud Architecture (AWS/GCP)', category: 'Cloud', current: 58, demand: 85, gap: -27, priority: 'High' },
  { skill: 'Prompt Engineering & Context', category: 'GenAI', current: 22, demand: 80, gap: -58, priority: 'Critical' },
  { skill: 'RAG Architecture & Hybrid Search', category: 'GenAI', current: 20, demand: 84, gap: -64, priority: 'Critical' },
  { skill: 'Vector Databases (Milvus/pgvector)', category: 'Data & AI', current: 8, demand: 74, gap: -66, priority: 'Critical' },
  { skill: 'AI Agents & Tool Calling', category: 'GenAI', current: 12, demand: 82, gap: -70, priority: 'Critical' },
  { skill: 'LangGraph & Stateful Workflows', category: 'GenAI', current: 5, demand: 68, gap: -63, priority: 'Critical' },
  { skill: 'Model Context Protocol (MCP)', category: 'Emerging AI', current: 0, demand: 63, gap: -63, priority: 'Emerging' },
  { skill: 'Apache Spark & Distributed Data', category: 'Data', current: 35, demand: 72, gap: -37, priority: 'High' },
  { skill: 'Ray & Distributed Training', category: 'AI Infrastructure', current: 10, demand: 60, gap: -50, priority: 'High' },
  { skill: 'vLLM & LLM Serving', category: 'AI Infrastructure', current: 0, demand: 58, gap: -58, priority: 'Emerging' }
];

const ALIGNMENT_TIMELINE = [
  { year: '2022', current: 72, industry: 75, projected: 75 },
  { year: '2023', current: 70, industry: 81, projected: 82 },
  { year: '2024', current: 68, industry: 86, projected: 88 },
  { year: '2025', current: 66, industry: 89, projected: 92 },
  { year: '2026', current: 64, industry: 94, projected: 97 }
];

const MISSING_TECH_CARDS = [
  {
    tech: 'Docker Containerization',
    coverage: 42,
    demand: 91,
    priority: 'High',
    affectedSyllabus: 'CS-5090 Cloud Native',
    suggestedModule: 'Containerization Lab & Image Layering Optimization',
    reason: 'Appears in 82% of Cloud & DevOps job descriptions.'
  },
  {
    tech: 'Kubernetes Orchestration',
    coverage: 18,
    demand: 82,
    priority: 'Critical',
    affectedSyllabus: 'CS-5090 Cloud Native',
    suggestedModule: 'k8s StatefulSets, Ingress Controllers & Helm Charts',
    reason: 'Required skill for 76% of Senior Systems Engineers.'
  },
  {
    tech: 'Vector Databases (Milvus/pgvector)',
    coverage: 8,
    demand: 74,
    priority: 'Critical',
    affectedSyllabus: 'CS-4080 Modern Databases',
    suggestedModule: 'HNSW Indexing, Distance Metrics & Hybrid Retrieval',
    reason: '+195% surge in Enterprise AI database postings.'
  },
  {
    tech: 'Model Context Protocol (MCP)',
    coverage: 0,
    demand: 63,
    priority: 'Emerging',
    affectedSyllabus: 'CS-8042 Advanced ML',
    suggestedModule: 'MCP Client-Server Specs & Secure Tool Execution',
    reason: '+340% rapid adoption in Enterprise AI Agent infrastructure.'
  },
  {
    tech: 'LangGraph & Multi-Agent Loops',
    coverage: 5,
    demand: 68,
    priority: 'Critical',
    affectedSyllabus: 'CS-8042 Advanced ML',
    suggestedModule: 'Stateful Graph Routing, Human-in-the-loop & Checkpoints',
    reason: 'Essential pattern for 65% of AI Engineer hiring tests.'
  },
  {
    tech: 'vLLM & LLM Serving',
    coverage: 0,
    demand: 58,
    priority: 'High',
    affectedSyllabus: 'CS-8042 Advanced ML',
    suggestedModule: 'PagedAttention, Paged KV Cache & Distributed Inference',
    reason: 'Industry standard for low-latency LLM serving.'
  }
];

const JOB_ROLES = [
  {
    title: 'AI Engineer',
    alignment: 88,
    required: ['Python', 'PyTorch', 'Vector DBs', 'RAG', 'MCP'],
    missing: ['MCP', 'vLLM', 'LangGraph'],
    improvement: 'Add Unit 4 MCP Tool Calling & vLLM Serving'
  },
  {
    title: 'MLOps Engineer',
    alignment: 82,
    required: ['Docker', 'Kubernetes', 'MLflow', 'Ray', 'PyTorch'],
    missing: ['Ray Distributed', 'Kubeflow'],
    improvement: 'Integrate Ray Cluster orchestration lab'
  },
  {
    title: 'Cloud Engineer',
    alignment: 78,
    required: ['AWS/GCP', 'Terraform', 'Kubernetes', 'Docker'],
    missing: ['Terraform IaC', 'Istio Service Mesh'],
    improvement: 'Upgrade CS-5090 with Terraform modules'
  },
  {
    title: 'Backend Engineer',
    alignment: 85,
    required: ['Python/Go', 'PostgreSQL', 'Redis', 'Docker'],
    missing: ['Vector Indexing', 'Async Architecture'],
    improvement: 'Add pgvector indexing lab in CS-4080'
  },
  {
    title: 'DevOps Engineer',
    alignment: 74,
    required: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'eBPF'],
    missing: ['eBPF Observability', 'Helm Charts'],
    improvement: 'Introduce eBPF kernel tracing unit'
  },
  {
    title: 'Data Engineer',
    alignment: 80,
    required: ['SQL', 'Python', 'Apache Spark', 'Iceberg', 'Kafka'],
    missing: ['Apache Spark 3.5', 'Apache Iceberg'],
    improvement: 'Replace MapReduce with Spark DataFrames'
  },
  {
    title: 'Cybersecurity Engineer',
    alignment: 86,
    required: ['Zero Trust', 'Linux', 'Cryptography', 'Cloud Sec'],
    missing: ['Zero Trust IAM', 'eBPF Security'],
    improvement: 'Add Zero Trust API Policy unit'
  },
  {
    title: 'Software Engineer (General)',
    alignment: 90,
    required: ['Algorithms', 'System Design', 'Git', 'SQL'],
    missing: ['Modern System Design with Caching'],
    improvement: 'Update System Design case studies'
  }
];

const EMERGING_TRENDS = [
  { name: 'Model Context Protocol (MCP)', growth: '+340%', status: 'Emerging', update: 'Add Unit 4: Client-Server MCP Protocols' },
  { name: 'Generative AI Architectures', growth: '+285%', status: 'High Demand', update: 'Expand Transformer Attention Mechanism' },
  { name: 'AI Agents & Swarms', growth: '+250%', status: 'Critical', update: 'Add LangGraph & Multi-agent Orchestration' },
  { name: 'Prompt Engineering & Context', growth: '+220%', status: 'Critical', update: 'Add System Prompting & Few-shot Lab' },
  { name: 'Vector Databases (Milvus/pgvector)', growth: '+195%', status: 'High Demand', update: 'Add Vector Indexing & Hybrid Search' },
  { name: 'RAG Architecture', growth: '+180%', status: 'High Demand', update: 'Add Chunking Strategies & Reranking' },
  { name: 'LangGraph Workflows', growth: '+175%', status: 'Emerging', update: 'Add Cyclic Graph Workflows' }
];

const PR_RECOMMENDATIONS = [
  {
    id: 'PR-104',
    title: 'Introduce Docker & Kubernetes Module in CS-5090',
    alignmentGain: '+11%',
    confidence: '96%',
    unit: 'Unit 4: Cloud Infrastructure',
    reason: 'Observed in 82% of Cloud Engineering job descriptions globally.',
    applied: false
  },
  {
    id: 'PR-105',
    title: 'Replace Legacy Hadoop Practical with Apache Spark & Ray in CS-4080',
    alignmentGain: '+15%',
    confidence: '95%',
    unit: 'Unit 5: Distributed Data Processing',
    reason: 'Hadoop demand dropped 68% while Spark/Ray demand grew 210%.',
    applied: false
  },
  {
    id: 'PR-106',
    title: 'Introduce Prompt Engineering & MCP Tool Calling Lab in CS-8042',
    alignmentGain: '+13%',
    confidence: '98%',
    unit: 'Unit 2: LLM Interaction Models',
    reason: 'MCP protocol requirement detected in 340% more enterprise job specs.',
    applied: false
  }
];

export const SkillGapAnalyzerPage: React.FC<SkillGapAnalyzerPageProps> = ({
  theme,
  onOpenWorkspace,
  onExportReport
}) => {
  const isDark = theme === 'dark';

  // Filters State
  const [selectedDept, setSelectedDept] = useState('Computer Engineering');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJobRole, setSelectedJobRole] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [analysisRun, setAnalysisRun] = useState(false);

  // Recommendations State
  const [prList, setPrList] = useState(PR_RECOMMENDATIONS);

  // Applied Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Successfully synchronized live data across 12,400 global job postings!');
    }, 1200);
  };

  const handleRunAnalysis = () => {
    setAnalysisRun(true);
    showToast('Re-evaluated curriculum vector embeddings against 2026 industry benchmark!');
  };

  const handleApplyPR = (id: string, title: string) => {
    setPrList(prev =>
      prev.map(item => (item.id === id ? { ...item, applied: true } : item))
    );
    showToast(`Merged ${id}: ${title} into active syllabus repository!`);
  };

  // Filter Heatmap Data
  const filteredHeatmap = useMemo(() => {
    return HEATMAP_DATA.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchCat;
    });
  }, [selectedCategory]);

  return (
    <div className={`min-h-screen p-4 sm:p-8 font-sans transition-colors max-w-[1700px] mx-auto space-y-8 ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAFAFA] text-[#111827]'
    }`}>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#10B981] text-white font-semibold text-xs shadow-2xl flex items-center gap-2 border border-white/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. PAGE HEADER & CONTROL ACTIONS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#262626]/30">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">
              AI Skill Gap Analyzer
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Semantic Gap Engine v4.2</span>
            </span>
          </div>
          <p className={`text-sm mt-1.5 max-w-2xl ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
            Compare academic curriculum against live industry requirements and identify modernization opportunities in real time. Powered by continuous NLP analysis of 12,400+ job descriptions.
          </p>
        </div>

        {/* Top-Right Control Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white hover:bg-[#202020]' : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] shadow-sm'
            }`}
          >
            <RefreshCw className={`w-4 h-4 text-[#10B981] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing Feeds...' : 'Refresh Industry Data'}</span>
          </button>

          <button
            onClick={handleRunAnalysis}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-2 shadow-lg shadow-[#10B981]/20 cursor-pointer"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>{analysisRun ? 'Analysis Updated' : 'Run Full Analysis'}</span>
          </button>

          <button
            onClick={onExportReport || (() => window.print())}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white hover:bg-[#202020]' : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] shadow-sm'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Executive Report</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. FILTER BAR
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-4 rounded-[20px] border flex flex-wrap items-center gap-3 text-xs font-mono ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-sm'
      }`}>
        <div className="flex items-center gap-2 pr-2 border-r border-[#262626]/40 text-[#10B981] font-bold">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters:</span>
        </div>

        {/* Department Filter */}
        <div className="w-48">
          <CustomSelect
            size="sm"
            theme={theme}
            value={selectedDept}
            onChange={(val) => setSelectedDept(val)}
            options={[
              { value: "Computer Engineering", label: "Dept: Computer Eng." },
              { value: "Information Technology", label: "Dept: Info Tech" },
              { value: "Electronics", label: "Dept: Electronics" },
              { value: "Mechanical", label: "Dept: Mechanical" },
              { value: "Civil", label: "Dept: Civil" },
              { value: "Electrical", label: "Dept: Electrical" }
            ]}
          />
        </div>

        {/* Course Filter */}
        <div className="w-52">
          <CustomSelect
            size="sm"
            theme={theme}
            value={selectedCourse}
            onChange={(val) => setSelectedCourse(val)}
            options={[
              { value: "All", label: "Course: All Syllabi" },
              { value: "CS-8042", label: "CS-8042 Advanced ML" },
              { value: "CS-5090", label: "CS-5090 Cloud Native" },
              { value: "CS-4080", label: "CS-4080 Modern DBs" },
              { value: "CS-3010", label: "CS-3010 Operating Sys" }
            ]}
          />
        </div>

        {/* Category Filter */}
        <div className="w-48">
          <CustomSelect
            size="sm"
            theme={theme}
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
            options={[
              { value: "All", label: "Category: All Tech" },
              { value: "GenAI", label: "GenAI & LLMs" },
              { value: "Cloud", label: "Cloud & DevOps" },
              { value: "Data", label: "Data & Vector DBs" },
              { value: "Systems", label: "Systems & Security" }
            ]}
          />
        </div>

        {/* Job Role Filter */}
        <div className="w-48">
          <CustomSelect
            size="sm"
            theme={theme}
            value={selectedJobRole}
            onChange={(val) => setSelectedJobRole(val)}
            options={[
              { value: "All", label: "Role: All 16 Roles" },
              { value: "AI Engineer", label: "AI Engineer" },
              { value: "MLOps Engineer", label: "MLOps Engineer" },
              { value: "Cloud Engineer", label: "Cloud Engineer" },
              { value: "Backend Engineer", label: "Backend Engineer" },
              { value: "DevOps Engineer", label: "DevOps Engineer" },
              { value: "Data Engineer", label: "Data Engineer" }
            ]}
          />
        </div>

        <div className="ml-auto text-[11px] text-[#10B981] font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>Sync Live: 12,400 Jobs Mapped</span>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. SUMMARY METRICS CARDS (ANIMATED COUNTERS)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Overall Alignment', val: '84%', sub: '+3.2% vs last term', icon: ShieldCheck, color: '#10B981' },
          { label: 'Critical Skill Gaps', val: '17', sub: 'Immediate Unit Fix', icon: AlertTriangle, color: '#EF4444' },
          { label: 'Skills Covered', val: '138', sub: 'ABET Outcome Met', icon: CheckCircle2, color: '#10B981' },
          { label: 'Emerging Skills Missing', val: '24', sub: 'MCP, LangGraph, etc', icon: Zap, color: '#F59E0B' },
          { label: 'Job Roles Mapped', val: '16', sub: '85%+ Suitability', icon: Briefcase, color: '#34D399' },
          { label: 'Modernization Score', val: '87%', sub: 'Tier-1 Benchmark', icon: TrendingUp, color: '#8B5CF6' }
        ].map((m, idx) => {
          const IconComp = m.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-[18px] border flex flex-col justify-between space-y-3 ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                  {m.label}
                </span>
                <div className="p-1.5 rounded-lg bg-[#10B981]/10 text-[#10B981]">
                  <IconComp className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <span className="font-heading font-bold text-2xl lg:text-3xl tracking-tight block" style={{ color: m.color }}>
                  {m.val}
                </span>
                <span className={`text-[10px] font-mono block mt-1 ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                  {m.sub}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. AI CRITICAL FINDINGS (LARGE HERO INTELLIGENCE CARD)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-6 sm:p-8 rounded-[24px] border relative overflow-hidden space-y-6 ${
        isDark ? 'bg-gradient-to-br from-[#121212] via-[#111111] to-[#0A1A14] border-[#10B981]/40' : 'bg-gradient-to-br from-white via-emerald-50/20 to-emerald-100/30 border-[#10B981]/40 shadow-lg'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#262626]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center font-bold shadow-lg shadow-[#10B981]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl tracking-tight">
                AI Intelligence Critical Findings
              </h2>
              <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
                Extracted from 12,400 live global job descriptions (LinkedIn, Naukri, Indeed, GitHub)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold border border-[#10B981]/30">
              Confidence Score: 97%
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              Action Priority: Tier-1
            </span>
          </div>
        </div>

        {/* Bulleted Findings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Prompt Engineering Absent',
              desc: 'Appears in 78% of AI job postings globally but is completely absent from syllabus units.',
              badge: 'Critical Gap',
              color: 'text-red-400'
            },
            {
              title: 'Vector Databases Surge +195%',
              desc: 'Milvus & pgvector indexing required in 74% of Enterprise RAG systems.',
              badge: 'High Surge',
              color: 'text-amber-400'
            },
            {
              title: 'Kubernetes Orchestration +145%',
              desc: 'Kubernetes StatefulSets required for 82% of Cloud Engineering positions.',
              badge: 'High Demand',
              color: 'text-amber-400'
            },
            {
              title: 'Docker in 82% Cloud Roles',
              desc: 'Container layer optimization and Docker Compose essential for entry-level developers.',
              badge: 'Core Requirement',
              color: 'text-[#10B981]'
            },
            {
              title: 'Model Context Protocol (MCP)',
              desc: 'Emerging rapidly (+340% demand) for enterprise AI tool calling and agent orchestration.',
              badge: 'Emerging AI',
              color: 'text-purple-400'
            },
            {
              title: 'Recommended Action',
              desc: 'Curriculum requires moderate modernization. Applying 3 1-click PR updates raises alignment to 97%.',
              badge: 'Action Plan',
              color: 'text-[#10B981]'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-heading font-bold text-sm ${item.color}`}>{item.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981]">
                  {item.badge}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. SKILL COVERAGE HEATMAP TABLE
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`rounded-[24px] border p-6 sm:p-8 space-y-6 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#262626]/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/15 text-[#10B981] mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Skill Coverage Matrix</span>
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">
              Academic Coverage vs Industry Demand Heatmap
            </h2>
            <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
              Quantitative comparison across 16 core technology verticals.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Optimal
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Moderate
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Critical Deficit
            </span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b font-mono uppercase text-[10px] tracking-wider ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#737373]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#6B7280]'
            }`}>
              <tr>
                <th className="p-3.5">Technology / Skill Focus</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5 text-center">Curriculum Coverage</th>
                <th className="p-3.5 text-center">Industry Demand</th>
                <th className="p-3.5 text-center">Deficit Gap</th>
                <th className="p-3.5 text-right">Priority Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]/30 font-medium">
              {filteredHeatmap.map((item, idx) => (
                <tr key={idx} className={`transition-colors ${isDark ? 'hover:bg-[#171717]' : 'hover:bg-[#F9FAFB]'}`}>
                  <td className="p-3.5 font-bold font-heading text-sm">
                    {item.skill}
                  </td>

                  <td className="p-3.5 text-[#737373] font-mono text-[11px]">
                    {item.category}
                  </td>

                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-mono font-bold text-xs">{item.current}%</span>
                      <div className="w-16 bg-[#262626] h-1.5 rounded-full overflow-hidden hidden md:block">
                        <div className="bg-[#10B981] h-full" style={{ width: `${item.current}%` }} />
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#10B981]">{item.demand}%</span>
                      <div className="w-16 bg-[#262626] h-1.5 rounded-full overflow-hidden hidden md:block">
                        <div className="bg-[#34D399] h-full" style={{ width: `${item.demand}%` }} />
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 text-center">
                    <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-lg ${
                      item.gap >= 0
                        ? 'bg-[#10B981]/20 text-[#10B981]'
                        : item.gap > -25
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}>
                      {item.gap >= 0 ? `+${item.gap}%` : `${item.gap}%`}
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      item.priority === 'Optimal'
                        ? 'bg-[#10B981]/15 text-[#10B981]'
                        : item.priority === 'Moderate'
                          ? 'bg-amber-500/15 text-amber-400'
                          : item.priority === 'High'
                            ? 'bg-orange-500/15 text-orange-400'
                            : 'bg-red-500/15 text-red-400'
                    }`}>
                      {item.priority === 'Optimal' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      <span>{item.priority}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. CURRICULUM VS INDUSTRY ALIGNMENT (RECHARTS)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-6 sm:p-8 rounded-[24px] border space-y-6 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#262626]/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/15 text-[#10B981] mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Historical & Projected Alignment</span>
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">
              Curriculum Alignment vs Industry Standard Trend (2022–2026)
            </h2>
            <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
              Projected alignment climbs to 97% following 1-click AI modernization.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-0.5 bg-gray-400" /> Current Curriculum
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-0.5 bg-amber-400" /> Industry Demand
            </span>
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <span className="w-3 h-0.5 bg-[#10B981]" /> Projected Modernized
            </span>
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ALIGNMENT_TIMELINE} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorIndustry" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#262626" : "#E5E7EB"} />
              <XAxis dataKey="year" stroke={isDark ? "#A3A3A3" : "#6B7280"} fontSize={12} />
              <YAxis stroke={isDark ? "#A3A3A3" : "#6B7280"} fontSize={12} domain={[50, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#171717' : '#FFFFFF',
                  borderColor: isDark ? '#262626' : '#E5E7EB',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              />
              <Area type="monotone" dataKey="current" stroke="#9CA3AF" fill="none" strokeWidth={2} name="Current Curriculum" />
              <Area type="monotone" dataKey="industry" stroke="#F59E0B" fillOpacity={1} fill="url(#colorIndustry)" strokeWidth={2.5} name="Industry Standard" />
              <Area type="monotone" dataKey="projected" stroke="#10B981" fillOpacity={1} fill="url(#colorProjected)" strokeWidth={3} name="Projected After AI Fix" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. MISSING TECHNOLOGIES CARDS GRID
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#10B981]" />
            <span>Missing Technology Modules</span>
          </h2>
          <span className="text-xs font-mono text-[#10B981] font-bold">
            6 Critical Gaps Identified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MISSING_TECH_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className={`p-5 rounded-[22px] border space-y-4 flex flex-col justify-between ${
                isDark ? 'bg-[#111111] border-[#262626] hover:border-[#10B981]/50' : 'bg-white border-[#E5E7EB] hover:border-[#10B981]/50 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-xs text-[#10B981]">{card.affectedSyllabus}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    card.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {card.priority} Priority
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base mt-2">{card.tech}</h3>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  {card.reason}
                </p>
              </div>

              <div className={`p-3 rounded-xl border grid grid-cols-2 gap-2 text-center font-mono ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}>
                <div>
                  <span className="text-[9px] block text-[#737373] uppercase">Coverage</span>
                  <span className="font-bold text-xs text-red-400">{card.coverage}%</span>
                </div>
                <div>
                  <span className="text-[9px] block text-[#737373] uppercase">Market Demand</span>
                  <span className="font-bold text-xs text-[#10B981]">{card.demand}%</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#262626]/30">
                <span className="text-[10px] font-mono font-bold text-[#10B981] block">
                  💡 Suggested Module Add:
                </span>
                <p className="text-xs font-semibold leading-snug">{card.suggestedModule}</p>

                <button
                  onClick={() => onOpenWorkspace && onOpenWorkspace(card.affectedSyllabus)}
                  className="w-full mt-2 py-2 rounded-xl text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inject into Syllabus</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. JOB ROLE MAPPING
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-6 sm:p-8 rounded-[24px] border space-y-6 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#10B981]" />
              <span>Job Role Suitability Mapping</span>
            </h2>
            <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
              Graduate employability index mapped against 8 top industry job titles.
            </p>
          </div>
          <span className="text-xs font-mono text-[#10B981] font-bold">
            85.2% Avg Role Readiness
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {JOB_ROLES.map((role, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm">{role.title}</h3>
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981]">
                  {role.alignment}% Match
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#737373] uppercase block">Missing Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {role.missing.map((m, mIdx) => (
                    <span key={mIdx} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-red-500/10 text-red-400 font-semibold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-[#10B981] font-mono pt-2 border-t border-[#262626]/30">
                Fix: {role.improvement}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. EMERGING TECHNOLOGIES & MARKET TRENDS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Emerging Technology Market Trends</span>
          </h2>
          <span className="text-xs font-mono text-amber-400 font-bold">
            2026 Hiring Demand Surges
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {EMERGING_TRENDS.map((trend, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border text-center space-y-2 ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-sm'
              }`}
            >
              <span className="font-heading font-bold text-lg text-[#10B981] block">{trend.growth}</span>
              <h4 className="font-heading font-semibold text-xs leading-tight line-clamp-2">{trend.name}</h4>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 font-bold inline-block">
                {trend.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          10. AI MODERNIZATION RECOMMENDATIONS (GITHUB PULL REQUEST STYLE)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-6 sm:p-8 rounded-[24px] border space-y-6 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight flex items-center gap-2">
              <GitPullRequest className="w-5 h-5 text-[#10B981]" />
              <span>AI Modernization Pull Requests</span>
            </h2>
            <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
              Automated curriculum patches ready for committee review and 1-click merge.
            </p>
          </div>
          <span className="text-xs font-mono text-[#10B981] font-bold">
            3 Ready for Approval
          </span>
        </div>

        <div className="space-y-4">
          {prList.map((pr) => (
            <div
              key={pr.id}
              className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                pr.applied
                  ? isDark ? 'bg-[#141414] border-[#10B981]/50 opacity-80' : 'bg-[#F0FDF4] border-[#10B981]/50'
                  : isDark ? 'bg-[#171717] border-[#262626] hover:border-[#10B981]' : 'bg-white border-[#E5E7EB] hover:border-[#10B981] shadow-sm'
              }`}
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="font-bold text-[#10B981]">{pr.id}</span>
                  <span className="text-[#737373]">•</span>
                  <span className="text-emerald-400 font-bold">{pr.alignmentGain} Alignment</span>
                  <span className="text-[#737373]">•</span>
                  <span className="text-[#737373]">{pr.unit}</span>
                </div>

                <h3 className="font-heading font-bold text-base">{pr.title}</h3>
                <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  {pr.reason}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                {pr.applied ? (
                  <span className="px-4 py-2 rounded-xl bg-[#10B981]/20 text-[#10B981] font-bold text-xs flex items-center gap-1.5 border border-[#10B981]/30">
                    <Check className="w-4 h-4" />
                    <span>Merged to Syllabus</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleApplyPR(pr.id, pr.title)}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-1.5 shadow-md shadow-[#10B981]/20 cursor-pointer"
                  >
                    <GitPullRequest className="w-3.5 h-3.5" />
                    <span>1-Click Merge Fix</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          11. LIVE INDUSTRY DATA SOURCES FEED
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-4 rounded-[20px] border flex flex-wrap items-center justify-between gap-4 font-mono text-xs ${
        isDark ? 'bg-[#111111] border-[#262626] text-[#A3A3A3]' : 'bg-white border-[#E5E7EB] text-[#4B5563] shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-[#10B981]" />
          <span>Active Data Feeds:</span>
          <span className="font-bold text-white">LinkedIn (4.2k)</span>
          <span>•</span>
          <span className="font-bold text-white">Naukri (3.8k)</span>
          <span>•</span>
          <span className="font-bold text-white">Indeed (2.1k)</span>
          <span>•</span>
          <span className="font-bold text-white">GitHub Trends (1.5k)</span>
        </div>

        <div className="flex items-center gap-2 text-[#10B981] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Last synchronized 12 minutes ago</span>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          12. EXECUTIVE CONCLUSION & INSIGHT SUMMARY
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-6 sm:p-8 rounded-[24px] border space-y-4 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
      }`}>
        <h3 className="font-heading font-bold text-lg text-[#10B981] flex items-center gap-2">
          <Info className="w-5 h-5" />
          <span>Executive Intelligence Conclusion</span>
        </h3>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#4B5563]'}`}>
          The Computer Engineering curriculum currently achieves an 84% baseline industry alignment. While foundational topics in Python, SQL, and Operating Systems are well-represented, critical gaps exist in container orchestration (Docker/Kubernetes), vector search infrastructure, and AI tool calling (MCP/LangGraph). Executing the 3 proposed pull requests will elevate total alignment to 97%, satisfy ABET Criterion 3 Outcome 1 requirements, and improve graduate placement readiness by +24.6%.
        </p>
      </div>

    </div>
  );
};
