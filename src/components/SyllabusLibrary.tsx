import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomSelect } from './CustomSelect';
import {
  Search,
  Filter,
  Plus,
  Upload,
  FolderPlus,
  Layers,
  Sparkles,
  BrainCircuit,
  BarChart2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  SlidersHorizontal,
  Grid,
  List,
  Kanban,
  Eye,
  MoreVertical,
  Download,
  GitPullRequest,
  GitCompare,
  RotateCcw,
  Tag,
  BookOpen,
  UserCheck,
  ShieldCheck,
  X,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Trash2,
  User,
  Building,
  Calendar,
  Zap,
  Network,
  Folder,
  ArrowUpRight,
  Check,
  RefreshCw,
  HelpCircle,
  AlertCircle,
  FileUp,
  Sparkle
} from 'lucide-react';
import { ThemeMode } from '../types';

interface SyllabusLibraryProps {
  theme: ThemeMode;
  onOpenWorkspace?: (courseCode: string) => void;
  onOpenUpload?: () => void;
  onExportPdf?: () => void;
}

export interface SyllabusItem {
  id: string;
  code: string;
  title: string;
  department: string;
  semester: string;
  faculty: string;
  alignmentScore: number;
  skillGapLevel: 'None' | 'Minor' | 'Moderate' | 'Critical';
  aiHealth: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical';
  version: string;
  lastAnalysis: string;
  missingSkills: string[];
  smartTags: string[];
  status: 'Uploaded' | 'Analyzing' | 'Needs Review' | 'Modernized' | 'Approved' | 'Exported';
  accreditationReady: boolean;
  hasAiSuggestions: boolean;
  folder?: string;
  description: string;
}

const INITIAL_SYLLABI: SyllabusItem[] = [
  {
    id: 'syl-1',
    code: 'CS-8042',
    title: 'Advanced Machine Learning & MLOps',
    department: 'Computer Engineering',
    semester: 'Semester 7',
    faculty: 'Dr. Sharma',
    alignmentScore: 92,
    skillGapLevel: 'Minor',
    aiHealth: 'Excellent',
    version: 'v3.4',
    lastAnalysis: '2 hours ago',
    missingSkills: ['Vector Databases', 'MCP', 'AI Agents'],
    smartTags: ['Generative AI', 'MCP', 'Vector DB', 'Industry Ready', 'vLLM'],
    status: 'Modernized',
    accreditationReady: true,
    hasAiSuggestions: true,
    folder: 'Fall 2026 Core',
    description: 'Advanced study of neural architectures, distributed PyTorch, LLM fine-tuning, and production model serving with vLLM and MCP.'
  },
  {
    id: 'syl-2',
    code: 'CS-3010',
    title: 'Operating Systems & Distributed Kernels',
    department: 'Computer Engineering',
    semester: 'Semester 4',
    faculty: 'Prof. Chen',
    alignmentScore: 74,
    skillGapLevel: 'Critical',
    aiHealth: 'Needs Attention',
    version: 'v1.2',
    lastAnalysis: '5 hours ago',
    missingSkills: ['Prompt Engineering', 'eBPF', 'Rust Kernels'],
    smartTags: ['Linux', 'Kernel', 'C++', 'System Prog'],
    status: 'Needs Review',
    accreditationReady: false,
    hasAiSuggestions: true,
    folder: 'Undergrad Core',
    description: 'Core concepts of operating system design, process synchronization, memory management, and modern Linux eBPF observability.'
  },
  {
    id: 'syl-3',
    code: 'CS-4080',
    title: 'Modern Database Systems & Vector Search',
    department: 'Computer Engineering',
    semester: 'Semester 5',
    faculty: 'Dr. Patel',
    alignmentScore: 68,
    skillGapLevel: 'Critical',
    aiHealth: 'Critical',
    version: 'v2.0',
    lastAnalysis: '1 day ago',
    missingSkills: ['Milvus', 'pgvector', 'RAG Architecture'],
    smartTags: ['Vector DB', 'RAG', 'SQL', 'NoSQL'],
    status: 'Analyzing',
    accreditationReady: false,
    hasAiSuggestions: true,
    folder: 'Data Engineering',
    description: 'Relational data structures, SQL optimization, distributed database clusters, and hybrid vector indexing for AI retrieval.'
  },
  {
    id: 'syl-4',
    code: 'CS-5090',
    title: 'Cloud Native Computing & Kubernetes',
    department: 'Computer Engineering',
    semester: 'Semester 6',
    faculty: 'Dr. Vance',
    alignmentScore: 88,
    skillGapLevel: 'Moderate',
    aiHealth: 'Good',
    version: 'v2.8',
    lastAnalysis: '3 hours ago',
    missingSkills: ['Kubernetes 1.30', 'Service Mesh', 'Istio'],
    smartTags: ['Cloud Native', 'Docker', 'Kubernetes', 'DevOps'],
    status: 'Needs Review',
    accreditationReady: true,
    hasAiSuggestions: true,
    folder: 'Fall 2026 Core',
    description: 'Containerization fundamentals, microservices orchestration with Kubernetes, Helm deployments, and CI/CD automation.'
  },
  {
    id: 'syl-5',
    code: 'IT-6020',
    title: 'Cyber Security & Zero Trust Architecture',
    department: 'Information Technology',
    semester: 'Semester 6',
    faculty: 'Prof. Rossi',
    alignmentScore: 95,
    skillGapLevel: 'None',
    aiHealth: 'Excellent',
    version: 'v4.1',
    lastAnalysis: '30 mins ago',
    missingSkills: [],
    smartTags: ['Cyber Security', 'Zero Trust', 'Accreditation Ready', 'Cloud Security'],
    status: 'Approved',
    accreditationReady: true,
    hasAiSuggestions: false,
    folder: 'IT Security',
    description: 'Enterprise security models, identity verification, modern cryptographic protocols, and Zero Trust cloud network posture.'
  },
  {
    id: 'syl-6',
    code: 'EC-4010',
    title: 'Embedded AI & Edge Microcontrollers',
    department: 'Electronics',
    semester: 'Semester 5',
    faculty: 'Dr. Miller',
    alignmentScore: 81,
    skillGapLevel: 'Minor',
    aiHealth: 'Good',
    version: 'v2.1',
    lastAnalysis: '1 day ago',
    missingSkills: ['TinyML', 'Edge TPU'],
    smartTags: ['Embedded', 'Edge AI', 'C++', 'IoT'],
    status: 'Modernized',
    accreditationReady: true,
    hasAiSuggestions: true,
    folder: 'Hardware AI',
    description: 'Hardware architectures for edge execution, ARM Cortex-M optimization, TinyML neural quantization, and sensor fusion.'
  },
  {
    id: 'syl-7',
    code: 'ME-3020',
    title: 'Robotics & Autonomous Control Systems',
    department: 'Mechanical',
    semester: 'Semester 6',
    faculty: 'Prof. Gupta',
    alignmentScore: 86,
    skillGapLevel: 'Moderate',
    aiHealth: 'Good',
    version: 'v1.9',
    lastAnalysis: '4 hours ago',
    missingSkills: ['ROS 2', 'Digital Twins'],
    smartTags: ['Robotics', 'ROS 2', 'Automation', 'Simulink'],
    status: 'Needs Review',
    accreditationReady: true,
    hasAiSuggestions: true,
    folder: 'Robotics Lab',
    description: 'Kinematics, dynamic feedback control, trajectory planning, and robot operating system (ROS 2) simulation environments.'
  },
  {
    id: 'syl-8',
    code: 'CE-5010',
    title: 'Smart Infrastructure & BIM Modeling',
    department: 'Civil',
    semester: 'Semester 7',
    faculty: 'Dr. Davis',
    alignmentScore: 90,
    skillGapLevel: 'Minor',
    aiHealth: 'Excellent',
    version: 'v3.0',
    lastAnalysis: 'Yesterday',
    missingSkills: ['Digital Twin IoT'],
    smartTags: ['Smart Cities', 'BIM', 'Infrastructure', 'GIS'],
    status: 'Approved',
    accreditationReady: true,
    hasAiSuggestions: false,
    folder: 'Civil Smart Systems',
    description: 'Building Information Modeling (BIM), IoT structural health monitoring sensors, and sustainable smart city infrastructure.'
  },
  {
    id: 'syl-9',
    code: 'CS-7010',
    title: 'Natural Language Processing & LLMs',
    department: 'Computer Engineering',
    semester: 'Semester 8',
    faculty: 'Dr. Sharma',
    alignmentScore: 94,
    skillGapLevel: 'Minor',
    aiHealth: 'Excellent',
    version: 'v3.2',
    lastAnalysis: '1 hour ago',
    missingSkills: ['vLLM', 'LangGraph'],
    smartTags: ['Generative AI', 'LLMs', 'LangGraph', 'RAG'],
    status: 'Exported',
    accreditationReady: true,
    hasAiSuggestions: true,
    folder: 'Fall 2026 Core',
    description: 'Transformer architecture internals, tokenization, attention mechanisms, fine-tuning, and multi-agent AI orchestration.'
  },
  {
    id: 'syl-10',
    code: 'EE-4030',
    title: 'Smart Power Grids & Renewable Storage',
    department: 'Electrical',
    semester: 'Semester 5',
    faculty: 'Dr. Thorne',
    alignmentScore: 78,
    skillGapLevel: 'Moderate',
    aiHealth: 'Needs Attention',
    version: 'v1.8',
    lastAnalysis: '2 days ago',
    missingSkills: ['Smart Metering IoT', 'Grid AI'],
    smartTags: ['Smart Grid', 'Renewable Energy', 'Power Electronics'],
    status: 'Uploaded',
    accreditationReady: false,
    hasAiSuggestions: true,
    folder: 'Power Systems',
    description: 'Grid stability analysis, renewable integration dynamics, battery storage management, and smart grid automation.'
  }
];

export const SyllabusLibrary: React.FC<SyllabusLibraryProps> = ({
  theme,
  onOpenWorkspace,
  onOpenUpload,
  onExportPdf
}) => {
  const isDark = theme === 'dark';

  // State Management
  const [syllabi, setSyllabi] = useState<SyllabusItem[]>(INITIAL_SYLLABI);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedSem, setSelectedSem] = useState<string>('All');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedGap, setSelectedGap] = useState<string>('All');
  const [onlyAccreditation, setOnlyAccreditation] = useState(false);
  const [onlyAiSuggestions, setOnlyAiSuggestions] = useState(false);
  const [activeSavedFilter, setActiveSavedFilter] = useState<string | null>(null);

  // View Mode: grid | repository (list) | kanban | compact
  const [viewMode, setViewMode] = useState<'grid' | 'repository' | 'kanban' | 'compact'>('grid');

  // Preview Drawer State
  const [previewSyllabus, setPreviewSyllabus] = useState<SyllabusItem | null>(null);

  // Modals
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState<SyllabusItem | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState(['Fall 2026 Core', 'Undergrad Core', 'Data Engineering', 'IT Security', 'Hardware AI']);

  // Filter Logic
  const filteredSyllabi = useMemo(() => {
    return syllabi.filter(item => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q) ||
        item.faculty.toLowerCase().includes(q) ||
        item.semester.toLowerCase().includes(q) ||
        item.missingSkills.some(s => s.toLowerCase().includes(q)) ||
        item.smartTags.some(t => t.toLowerCase().includes(q));

      // Filters
      const matchesDept = selectedDept === 'All' || item.department === selectedDept;
      const matchesSem = selectedSem === 'All' || item.semester === selectedSem;
      const matchesFaculty = selectedFaculty === 'All' || item.faculty === selectedFaculty;
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      const matchesGap = selectedGap === 'All' || item.skillGapLevel === selectedGap;
      const matchesAccreditation = !onlyAccreditation || item.accreditationReady;
      const matchesAiSuggestions = !onlyAiSuggestions || item.hasAiSuggestions;

      return (
        matchesSearch &&
        matchesDept &&
        matchesSem &&
        matchesFaculty &&
        matchesStatus &&
        matchesGap &&
        matchesAccreditation &&
        matchesAiSuggestions
      );
    });
  }, [
    syllabi,
    searchQuery,
    selectedDept,
    selectedSem,
    selectedFaculty,
    selectedStatus,
    selectedGap,
    onlyAccreditation,
    onlyAiSuggestions
  ]);

  // Bulk Selection Handlers
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSyllabi.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSyllabi.map(s => s.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkAnalyze = () => {
    setSyllabi(prev =>
      prev.map(item =>
        selectedIds.includes(item.id)
          ? { ...item, status: 'Analyzing', lastAnalysis: 'Just now' }
          : item
      )
    );
    setSelectedIds([]);
  };

  const handleBulkApprove = () => {
    setSyllabi(prev =>
      prev.map(item =>
        selectedIds.includes(item.id)
          ? { ...item, status: 'Approved', aiHealth: 'Excellent' }
          : item
      )
    );
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    setSyllabi(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  // Kanban Columns
  const KANBAN_STAGES: SyllabusItem['status'][] = [
    'Uploaded',
    'Analyzing',
    'Needs Review',
    'Modernized',
    'Approved',
    'Exported'
  ];

  // Helper colors
  const getGapColor = (gap: SyllabusItem['skillGapLevel']) => {
    switch (gap) {
      case 'None':
        return 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/30';
      case 'Minor':
        return 'text-blue-400 bg-blue-500/15 border-blue-500/30';
      case 'Moderate':
        return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
      case 'Critical':
        return 'text-red-400 bg-red-500/15 border-red-500/30';
    }
  };

  const getStatusBadge = (status: SyllabusItem['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/40';
      case 'Modernized':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
      case 'Needs Review':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/40';
      case 'Analyzing':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/40';
      case 'Exported':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/40';
      default:
        return 'bg-gray-500/15 text-gray-400 border-gray-500/40';
    }
  };

  return (
    <div className={`min-h-screen p-4 sm:p-8 font-sans transition-colors max-w-[1700px] mx-auto space-y-8 ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAFAFA] text-[#111827]'
    }`}>
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. PAGE HEADER & PRIMARY ACTION CTA
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#262626]/30">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">
              Syllabus Library
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>AI Repository Engine Active</span>
            </span>
          </div>
          <p className={`text-sm mt-1.5 max-w-2xl ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
            Manage, organize, analyze, and modernize every curriculum across your institution. Every syllabus is monitored continuously for industry relevance and accreditation alignment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowFolderModal(true)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white hover:bg-[#202020]' : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] shadow-sm'
            }`}
          >
            <FolderPlus className="w-4 h-4 text-[#10B981]" />
            <span>Create Folder</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white hover:bg-[#202020]' : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] shadow-sm'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Import Multiple</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-2 shadow-lg shadow-[#10B981]/25 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Upload Syllabus</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SUMMARY KPI CARDS WITH ANIMATED COUNTERS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Syllabi', count: 248, icon: BookOpen, color: '#10B981', badge: 'Active Database', filterKey: 'All' },
          { label: 'Recently Updated', count: 19, icon: RefreshCw, color: '#34D399', badge: 'Last 7 Days', filterKey: 'Modernized' },
          { label: 'Require Review', count: 14, icon: AlertTriangle, color: '#F59E0B', badge: 'Action Required', filterKey: 'Needs Review' },
          { label: 'Industry Ready', count: 172, icon: ShieldCheck, color: '#10B981', badge: '90%+ Score', filterKey: 'Approved' },
          { label: 'Critical Skill Gaps', count: 28, icon: Zap, color: '#EF4444', badge: 'Needs Upgrade', filterKey: 'Critical' },
          { label: 'Pending Approval', count: 11, icon: UserCheck, color: '#8B5CF6', badge: 'Committee Queue', filterKey: 'Needs Review' }
        ].map((kpi, idx) => {
          const IconComp = kpi.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              onClick={() => {
                if (kpi.filterKey === 'Critical') setSelectedGap('Critical');
                else if (kpi.filterKey !== 'All') setSelectedStatus(kpi.filterKey);
                else {
                  setSelectedGap('All');
                  setSelectedStatus('All');
                }
              }}
              className={`p-4 rounded-[18px] border transition-all cursor-pointer flex flex-col justify-between ${
                isDark ? 'bg-[#111111] border-[#262626] hover:border-[#10B981]/40' : 'bg-white border-[#E5E7EB] hover:border-[#10B981]/40 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                  {kpi.label}
                </span>
                <div className="p-1.5 rounded-lg bg-[#10B981]/10 text-[#10B981]">
                  <IconComp className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-heading font-bold text-2xl lg:text-3xl tracking-tight">
                  {kpi.count}
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#10B981]">
                  {kpi.badge}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. GLOBAL SEARCH + FILTER BAR + SAVED FILTERS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-5 rounded-[22px] border space-y-4 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-sm'
      }`}>
        
        {/* Search Bar Row */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Search by course name, code (e.g. "CS-8042"), department, skill, faculty, outcome...'
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-mono transition-all outline-none border ${
                isDark
                  ? 'bg-[#171717] border-[#262626] text-white focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]'
                  : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Saved Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs font-mono">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
              Saved:
            </span>
            {[
              { name: '2026 ABET Audit', dept: 'Computer Engineering', status: 'All', gap: 'All' },
              { name: 'High Priority Gaps', dept: 'All', status: 'Needs Review', gap: 'Critical' },
              { name: 'Modernized', dept: 'All', status: 'Modernized', gap: 'All' }
            ].map((sf, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveSavedFilter(sf.name);
                  setSelectedDept(sf.dept);
                  setSelectedStatus(sf.status);
                  setSelectedGap(sf.gap);
                }}
                className={`px-2.5 py-1 rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                  activeSavedFilter === sf.name
                    ? 'bg-[#10B981] text-white border-[#10B981] font-bold'
                    : isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white' : 'bg-[#F3F4F6] border-[#E5E7EB] text-[#4B5563]'
                }`}
              >
                {sf.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Dropdowns & Toggle Chips Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#262626]/30 text-xs">
          
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Dept Filter */}
            <div className="w-44">
              <CustomSelect
                size="sm"
                theme={theme}
                value={selectedDept}
                onChange={(val) => setSelectedDept(val)}
                options={[
                  { value: "All", label: "All Departments" },
                  { value: "Computer Engineering", label: "Computer Eng." },
                  { value: "Information Technology", label: "Info Tech" },
                  { value: "Electronics", label: "Electronics" },
                  { value: "Mechanical", label: "Mechanical" },
                  { value: "Civil", label: "Civil" },
                  { value: "Electrical", label: "Electrical" }
                ]}
              />
            </div>

            {/* Status Filter */}
            <div className="w-38">
              <CustomSelect
                size="sm"
                theme={theme}
                value={selectedStatus}
                onChange={(val) => setSelectedStatus(val)}
                options={[
                  { value: "All", label: "All Statuses" },
                  { value: "Uploaded", label: "Uploaded" },
                  { value: "Analyzing", label: "Analyzing" },
                  { value: "Needs Review", label: "Needs Review" },
                  { value: "Modernized", label: "Modernized" },
                  { value: "Approved", label: "Approved" },
                  { value: "Exported", label: "Exported" }
                ]}
              />
            </div>

            {/* Gap Filter */}
            <div className="w-40">
              <CustomSelect
                size="sm"
                theme={theme}
                value={selectedGap}
                onChange={(val) => setSelectedGap(val)}
                options={[
                  { value: "All", label: "All Skill Gaps" },
                  { value: "None", label: "None" },
                  { value: "Minor", label: "Minor" },
                  { value: "Moderate", label: "Moderate" },
                  { value: "Critical", label: "Critical" }
                ]}
              />
            </div>

            {/* Faculty Filter */}
            <div className="w-36">
              <CustomSelect
                size="sm"
                theme={theme}
                value={selectedFaculty}
                onChange={(val) => setSelectedFaculty(val)}
                options={[
                  { value: "All", label: "All Faculty" },
                  { value: "Dr. Sharma", label: "Dr. Sharma" },
                  { value: "Prof. Chen", label: "Prof. Chen" },
                  { value: "Dr. Patel", label: "Dr. Patel" },
                  { value: "Prof. Vance", label: "Prof. Vance" },
                  { value: "Dr. Vance", label: "Dr. Vance" },
                  { value: "Prof. Rossi", label: "Prof. Rossi" }
                ]}
              />
            </div>

            {/* Checkbox Toggles */}
            <button
              onClick={() => setOnlyAccreditation(prev => !prev)}
              className={`px-3 py-1.5 rounded-lg border font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                onlyAccreditation
                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981] font-bold'
                  : isDark ? 'bg-[#171717] border-[#262626] text-[#737373]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Accreditation Ready</span>
            </button>

            <button
              onClick={() => setOnlyAiSuggestions(prev => !prev)}
              className={`px-3 py-1.5 rounded-lg border font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                onlyAiSuggestions
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold'
                  : isDark ? 'bg-[#171717] border-[#262626] text-[#737373]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Has AI Suggestions</span>
            </button>
          </div>

          {/* View Toggle Buttons */}
          <div className={`p-1 rounded-xl border flex items-center gap-1 ${
            isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F3F4F6] border-[#E5E7EB]'
          }`}>
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#10B981] text-white shadow-sm' : 'text-[#737373] hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('repository')}
              title="Repository / List View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'repository' ? 'bg-[#10B981] text-white shadow-sm' : 'text-[#737373] hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              title="Kanban Board View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'kanban' ? 'bg-[#10B981] text-white shadow-sm' : 'text-[#737373] hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. BULK ACTIONS FLOATING TOOLBAR (WHEN SELECTED)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`sticky top-4 z-30 p-3.5 rounded-2xl border shadow-xl flex flex-wrap items-center justify-between gap-4 backdrop-blur-md ${
              isDark ? 'bg-[#141414]/95 border-[#10B981]' : 'bg-white/95 border-[#10B981] shadow-emerald-500/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-[#10B981] text-white font-bold text-xs flex items-center justify-center font-mono">
                {selectedIds.length}
              </span>
              <span className="font-heading font-bold text-sm">Syllabi Selected</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <button
                onClick={handleBulkAnalyze}
                className="px-3 py-1.5 rounded-xl bg-[#10B981] text-white hover:bg-[#34D399] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Bulk Analyze</span>
              </button>

              <button
                onClick={handleBulkApprove}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark ? 'bg-[#171717] border-[#262626] text-[#10B981]' : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#059669]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bulk Committee Review</span>
              </button>

              <button
                onClick={onExportPdf}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#4B5563]'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Bulk Export ABET PDF</span>
              </button>

              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Bulk Delete</span>
              </button>

              <button
                onClick={() => setSelectedIds([])}
                className="p-1.5 rounded-xl text-[#737373] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. MAIN CONTENT AREA (GRID / REPOSITORY / KANBAN VIEWS) + RIGHT SIDE PANELS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT / CENTER MAIN LIST (8 or 9 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Row above Syllabus Cards */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSelectAll}
                className={`p-1 rounded border transition-colors cursor-pointer ${
                  selectedIds.length > 0 && selectedIds.length === filteredSyllabi.length
                    ? 'bg-[#10B981] border-[#10B981] text-white'
                    : isDark ? 'bg-[#171717] border-[#262626]' : 'bg-white border-[#E5E7EB]'
                }`}
              >
                <Check className="w-3 h-3" />
              </button>
              <span className={isDark ? 'text-[#737373]' : 'text-[#6B7280]'}>
                Showing <strong>{filteredSyllabi.length}</strong> of {syllabi.length} syllabi
              </span>
            </div>

            <span className="text-[#10B981] font-bold">
              Sorted by Last AI Analysis
            </span>
          </div>

          {/* VIEW MODE 1: GRID VIEW (REPOSITORY CARDS) */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredSyllabi.map(item => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3 }}
                  className={`p-5 rounded-[22px] border transition-all flex flex-col justify-between space-y-4 relative ${
                    selectedIds.includes(item.id)
                      ? 'border-[#10B981] ring-1 ring-[#10B981]'
                      : isDark ? 'bg-[#111111] border-[#262626] hover:border-[#10B981]/50' : 'bg-white border-[#E5E7EB] hover:border-[#10B981]/50 shadow-sm'
                  }`}
                >
                  {/* Top Bar: Code, Dept, Select Checkbox & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelectOne(item.id)}
                        className="rounded border-[#262626] accent-[#10B981] cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#10B981]">{item.code}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <span className={`text-[11px] block ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                          {item.department} • {item.semester}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setPreviewSyllabus(item)}
                      className={`p-1.5 rounded-lg border text-xs text-[#737373] hover:text-white transition-colors cursor-pointer ${
                        isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                      }`}
                      title="Quick Preview Drawer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-heading font-bold text-base leading-snug tracking-tight">
                      {item.title}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Key Metrics Row: Industry Alignment, Skill Gap, Version */}
                  <div className={`p-3 rounded-xl border grid grid-cols-3 gap-2 text-center font-mono ${
                    isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                  }`}>
                    <div>
                      <span className={`text-[9px] block uppercase ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Alignment</span>
                      <span className="font-bold text-sm text-[#10B981]">{item.alignmentScore}%</span>
                    </div>

                    <div>
                      <span className={`text-[9px] block uppercase ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Skill Gap</span>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded border inline-block mt-0.5 ${getGapColor(item.skillGapLevel)}`}>
                        {item.skillGapLevel}
                      </span>
                    </div>

                    <div>
                      <span className={`text-[9px] block uppercase ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Version</span>
                      <span className="font-bold text-xs text-white bg-[#10B981]/20 text-[#10B981] px-1.5 py-0.5 rounded inline-block mt-0.5">
                        {item.version}
                      </span>
                    </div>
                  </div>

                  {/* Missing Skills Alert Badges */}
                  {item.missingSkills.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-red-400 block">
                        ⚠ Missing Skills Identified:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.missingSkills.map((sk, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 font-semibold">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Smart Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.smartTags.map((tag, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        isDark ? 'bg-[#1A1A1A] border-[#262626] text-[#A3A3A3]' : 'bg-[#F3F4F6] border-[#E5E7EB] text-[#4B5563]'
                      }`}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-[#262626]/30 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#737373]">
                      <User className="w-3 h-3 text-[#10B981]" />
                      <span>{item.faculty}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setShowCompareModal(item)}
                        className={`p-1.5 rounded-lg border text-xs text-[#737373] hover:text-white cursor-pointer ${
                          isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                        }`}
                        title="Compare Versions"
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenWorkspace && onOpenWorkspace(item.code)}
                        className="px-3 py-1.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Workspace</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: REPOSITORY / TABULAR LIST VIEW */}
          {viewMode === 'repository' && (
            <div className={`rounded-[22px] border overflow-hidden ${
              isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-sm'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className={`border-b text-[10px] uppercase tracking-wider ${
                    isDark ? 'bg-[#171717] border-[#262626] text-[#737373]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#6B7280]'
                  }`}>
                    <tr>
                      <th className="p-3.5 w-8">
                        <input
                          type="checkbox"
                          checked={selectedIds.length > 0 && selectedIds.length === filteredSyllabi.length}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="p-3.5">Code & Title</th>
                      <th className="p-3.5">Department</th>
                      <th className="p-3.5">Faculty</th>
                      <th className="p-3.5">Alignment</th>
                      <th className="p-3.5">Skill Gap</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]/30">
                    {filteredSyllabi.map(item => (
                      <tr key={item.id} className={`transition-colors ${
                        isDark ? 'hover:bg-[#171717]' : 'hover:bg-[#F9FAFB]'
                      }`}>
                        <td className="p-3.5">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item.id)}
                            onChange={() => toggleSelectOne(item.id)}
                          />
                        </td>
                        <td className="p-3.5">
                          <div className="font-sans font-bold text-sm text-[#FAFAFA]">{item.title}</div>
                          <div className="text-[10px] text-[#10B981] font-mono">{item.code} • {item.version}</div>
                        </td>
                        <td className="p-3.5 text-[#B3B3B3]">{item.department}</td>
                        <td className="p-3.5 text-[#B3B3B3]">{item.faculty}</td>
                        <td className="p-3.5 font-bold text-[#10B981]">{item.alignmentScore}%</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getGapColor(item.skillGapLevel)}`}>
                            {item.skillGapLevel}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => setPreviewSyllabus(item)}
                            className="px-2.5 py-1 rounded-lg bg-[#10B981]/15 text-[#10B981] font-bold hover:bg-[#10B981] hover:text-white transition-all cursor-pointer"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => onOpenWorkspace && onOpenWorkspace(item.code)}
                            className="px-2.5 py-1 rounded-lg bg-[#10B981] text-white font-bold hover:bg-[#34D399] transition-all cursor-pointer"
                          >
                            Workspace
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW MODE 3: KANBAN BOARD VIEW */}
          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
              {KANBAN_STAGES.map(stage => {
                const stageItems = filteredSyllabi.filter(s => s.status === stage);
                return (
                  <div
                    key={stage}
                    className={`p-3 rounded-[18px] border min-w-[240px] flex flex-col justify-between space-y-3 ${
                      isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                    }`}
                  >
                    {/* Stage Header */}
                    <div className="flex items-center justify-between font-mono text-xs font-bold pb-2 border-b border-[#262626]/30">
                      <span>{stage}</span>
                      <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] flex items-center justify-center">
                        {stageItems.length}
                      </span>
                    </div>

                    {/* Stage Card Items */}
                    <div className="space-y-3 flex-1">
                      {stageItems.map(item => (
                        <div
                          key={item.id}
                          onClick={() => setPreviewSyllabus(item)}
                          className={`p-3.5 rounded-xl border text-xs space-y-2 cursor-pointer transition-all hover:-translate-y-1 ${
                            isDark ? 'bg-[#171717] border-[#262626] hover:border-[#10B981]' : 'bg-white border-[#E5E7EB] hover:border-[#10B981] shadow-sm'
                          }`}
                        >
                          <div className="flex justify-between font-mono text-[10px]">
                            <span className="text-[#10B981] font-bold">{item.code}</span>
                            <span className="text-[#737373]">{item.version}</span>
                          </div>

                          <h4 className="font-heading font-bold text-xs leading-snug">{item.title}</h4>

                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-[#10B981] font-bold">{item.alignmentScore}% Align</span>
                            <span className="text-[#737373]">{item.faculty}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* EMPTY STATE IF NO SYLLABI MATCH */}
          {filteredSyllabi.length === 0 && (
            <div className={`p-12 rounded-[22px] border text-center space-y-4 ${
              isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB]'
            }`}>
              <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg">No Syllabi Match Search Filter</h3>
              <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                Upload your first syllabus or reset your active filters to view all institution courses.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('All');
                  setSelectedStatus('All');
                  setSelectedGap('All');
                }}
                className="px-4 py-2 rounded-xl bg-[#10B981] text-white font-bold text-xs hover:bg-[#34D399] transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            RIGHT SIDE PANELS: AI RECOMMENDATION WIDGET + RECENT ACTIVITY
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI RECOMMENDATION WIDGET */}
          <div className={`p-6 rounded-[22px] border space-y-4 relative overflow-hidden ${
            isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#10B981] uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                AI Modernization Alert
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                14 High Priority
              </span>
            </div>

            <h3 className="font-heading font-bold text-base leading-snug">
              AI detected 14 syllabi requiring urgent modernization
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className={`p-3 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}>
                <div className="flex justify-between font-bold text-amber-400">
                  <span>CS-4080 Database Systems</span>
                  <span>Missing Vector DB</span>
                </div>
                <p className="text-[11px] text-[#888888]">Shift from flat SQL indexing to Milvus / pgvector RAG pipeline.</p>
              </div>

              <div className={`p-3 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}>
                <div className="flex justify-between font-bold text-red-400">
                  <span>CS-3010 Operating Systems</span>
                  <span>Prompt Eng Absent</span>
                </div>
                <p className="text-[11px] text-[#888888]">Missing system-level eBPF observability & LLM kernel scripts.</p>
              </div>

              <div className={`p-3 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}>
                <div className="flex justify-between font-bold text-[#10B981]">
                  <span>CS-5090 Cloud Computing</span>
                  <span>Kubernetes 1.30</span>
                </div>
                <p className="text-[11px] text-[#888888]">Needs service mesh orchestration module upgrade.</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedGap('Critical')}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#10B981]/20"
            >
              <span>Review All 14 Modernization Alerts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RECENT ACTIVITY AUDIT LOG */}
          <div className={`p-6 rounded-[22px] border space-y-4 ${
            isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-sm'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-[#262626]/30">
              <h3 className="font-heading font-bold text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#10B981]" />
                <span>Live Repository Activity</span>
              </h3>
              <span className="text-[10px] font-mono text-[#10B981]">Real-time Audit</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { course: 'CS-8042 Machine Learning', action: 'AI analysis completed (92% Score)', time: '2h ago', user: 'Gemini Engine' },
                { course: 'CS-3010 Operating Systems', action: 'Exported ABET PDF report', time: '5h ago', user: 'Prof. Chen' },
                { course: 'CS-4080 Database Systems', action: 'Updated draft to v2.0', time: '1d ago', user: 'Dr. Patel' },
                { course: 'IT-6020 Cyber Security', action: 'Committee approved curriculum', time: '1d ago', user: 'Dean Board' },
                { course: 'CS-5090 Cloud Computing', action: 'Accepted 4 AI suggestions', time: '2d ago', user: 'Dr. Vance' }
              ].map((act, idx) => (
                <div key={idx} className="flex items-start gap-2.5 pb-2.5 border-b border-[#262626]/20">
                  <div className="w-2 h-2 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <span className="font-bold block text-[#FAFAFA]">{act.course}</span>
                    <p className={`text-[11px] ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>{act.action}</p>
                    <span className="text-[9px] text-[#737373] block">{act.time} • by {act.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. QUICK PREVIEW DRAWER (SLIDE-OVER PANEL)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {previewSyllabus && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`w-full max-w-xl h-full border-l p-6 overflow-y-auto space-y-6 ${
                isDark ? 'bg-[#0E0E0E] border-[#262626] text-[#FAFAFA]' : 'bg-white border-[#E5E7EB] text-[#111827]'
              }`}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#262626]/30">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#10B981]">{previewSyllabus.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getStatusBadge(previewSyllabus.status)}`}>
                      {previewSyllabus.status}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-lg mt-1">{previewSyllabus.title}</h2>
                </div>

                <button
                  onClick={() => setPreviewSyllabus(null)}
                  className="p-2 rounded-xl text-[#737373] hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Course Info Summary */}
              <div className={`p-4 rounded-xl border grid grid-cols-2 gap-3 text-xs font-mono ${
                isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}>
                <div>
                  <span className="text-[10px] text-[#737373] block">DEPARTMENT</span>
                  <span className="font-bold">{previewSyllabus.department}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] block">FACULTY IN-CHARGE</span>
                  <span className="font-bold">{previewSyllabus.faculty}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] block">VERSION</span>
                  <span className="font-bold text-[#10B981]">{previewSyllabus.version}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] block">ALIGNMENT SCORE</span>
                  <span className="font-bold text-[#10B981]">{previewSyllabus.alignmentScore}%</span>
                </div>
              </div>

              {/* Course Overview */}
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#10B981]">
                  Course Overview & Outcomes
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  {previewSyllabus.description}
                </p>
              </div>

              {/* Missing Skills Warning Box */}
              {previewSyllabus.missingSkills.length > 0 && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
                  <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Identified Industry Skill Gaps
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {previewSyllabus.missingSkills.map((sk, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 font-mono text-xs font-bold">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Drawer Actions CTA */}
              <div className="pt-4 border-t border-[#262626]/30 flex items-center justify-between gap-3">
                <button
                  onClick={onExportPdf}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer ${
                    isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#4B5563]'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Export ABET PDF</span>
                </button>

                <button
                  onClick={() => {
                    const code = previewSyllabus.code;
                    setPreviewSyllabus(null);
                    if (onOpenWorkspace) onOpenWorkspace(code);
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#10B981]/25"
                >
                  <span>Open Full AI Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. MODALS (CREATE FOLDER / IMPORT MULTIPLE / COMPARE)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Modal: Create Folder */}
      <AnimatePresence>
        {showFolderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md p-6 rounded-[22px] border space-y-4 ${
                isDark ? 'bg-[#141414] border-[#262626] text-white' : 'bg-white border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-[#262626]">
                <h3 className="font-heading font-bold text-base flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-[#10B981]" />
                  Create Curriculum Folder
                </h3>
                <button onClick={() => setShowFolderModal(false)} className="text-[#737373] hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-[#10B981]">Folder Name</label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={e => setNewFolderName(e.target.value)}
                  placeholder="e.g. 2026 ABET Accreditation Batch"
                  className={`w-full p-2.5 rounded-xl text-xs font-mono outline-none border ${
                    isDark ? 'bg-[#171717] border-[#262626] text-white' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]'
                  }`}
                />
              </div>

              <div className="pt-3 border-t border-[#262626] flex justify-end gap-2">
                <button
                  onClick={() => setShowFolderModal(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold border-[#262626] text-[#737373]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newFolderName) setFolders(prev => [...prev, newFolderName]);
                    setNewFolderName('');
                    setShowFolderModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#10B981] text-white font-bold text-xs hover:bg-[#34D399]"
                >
                  Create Folder
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
