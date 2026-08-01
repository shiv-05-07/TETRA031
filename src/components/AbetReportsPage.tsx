import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomSelect } from './CustomSelect';
import {
  FileText,
  Download,
  Share2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Building2,
  Layers,
  BookOpen,
  BrainCircuit,
  Network,
  Award,
  Check,
  X,
  Copy,
  ExternalLink,
  Printer,
  FileSpreadsheet,
  FileCode,
  Users,
  Search,
  Filter,
  ArrowRight,
  RefreshCw,
  Eye,
  Sliders,
  Send,
  Lock,
  ChevronRight,
  Info,
  CheckSquare,
  History
} from 'lucide-react';
import { ThemeMode } from '../types';

interface AbetReportsPageProps {
  theme: ThemeMode;
  onNavigateWorkspace?: (courseCode?: string) => void;
  onNavigateGraph?: () => void;
}

// Interface for Report Cards
interface ReportCategoryCard {
  id: string;
  title: string;
  description: string;
  category: 'Accreditation' | 'Industry' | 'Outcomes' | 'Executive';
  icon: React.ElementType;
  generatedDate: string;
  status: 'Compliant' | 'Ready' | 'Updated' | 'Audit Passed';
  fileFormat: 'PDF' | 'ZIP' | 'XLSX';
  fileSize: string;
}

const REPORT_CATEGORIES: ReportCategoryCard[] = [
  {
    id: 'rep-1',
    title: 'Industry Alignment Report',
    description: 'Comprehensive evaluation of curriculum skills vs 12,400+ live enterprise job postings.',
    category: 'Industry',
    icon: TrendingUp,
    generatedDate: 'Aug 1, 2026 • 10:45 AM',
    status: 'Ready',
    fileFormat: 'PDF',
    fileSize: '4.2 MB'
  },
  {
    id: 'rep-2',
    title: 'Skill Gap Report',
    description: 'Detailed analysis of missing industry skills, deprecated topics, and emerging technologies.',
    category: 'Industry',
    icon: BarChart3,
    generatedDate: 'Aug 1, 2026 • 09:30 AM',
    status: 'Updated',
    fileFormat: 'PDF',
    fileSize: '3.1 MB'
  },
  {
    id: 'rep-3',
    title: 'AI Modernization Report',
    description: 'Pull Request style summary of all AI-generated curriculum enhancements & committee diffs.',
    category: 'Executive',
    icon: Sparkles,
    generatedDate: 'Jul 31, 2026 • 04:15 PM',
    status: 'Ready',
    fileFormat: 'PDF',
    fileSize: '5.8 MB'
  },
  {
    id: 'rep-4',
    title: 'Course Outcome Mapping',
    description: 'Direct mapping matrix of Course Outcomes (COs) to unit topics and practical lab credits.',
    category: 'Outcomes',
    icon: BookOpen,
    generatedDate: 'Jul 30, 2026 • 11:20 AM',
    status: 'Compliant',
    fileFormat: 'PDF',
    fileSize: '2.4 MB'
  },
  {
    id: 'rep-5',
    title: 'Program Outcome Mapping',
    description: 'High-level alignment of Program Outcomes (POs) and Program Educational Objectives (PEOs).',
    category: 'Outcomes',
    icon: Layers,
    generatedDate: 'Jul 30, 2026 • 02:00 PM',
    status: 'Compliant',
    fileFormat: 'PDF',
    fileSize: '2.9 MB'
  },
  {
    id: 'rep-6',
    title: "Bloom's Taxonomy Analysis",
    description: 'Cognitive level breakdown from Remember to Create across all semester assessment items.',
    category: 'Outcomes',
    icon: BrainCircuit,
    generatedDate: 'Jul 29, 2026 • 05:40 PM',
    status: 'Audit Passed',
    fileFormat: 'PDF',
    fileSize: '1.8 MB'
  },
  {
    id: 'rep-7',
    title: 'Department Performance',
    description: 'Aggregated health metrics, alignment scores, and gap velocity across 5 engineering departments.',
    category: 'Executive',
    icon: Building2,
    generatedDate: 'Jul 28, 2026 • 08:15 AM',
    status: 'Ready',
    fileFormat: 'XLSX',
    fileSize: '6.4 MB'
  },
  {
    id: 'rep-8',
    title: 'Executive Summary',
    description: 'High-level synthesis for Deans, University Board, and Academic Senate approval.',
    category: 'Executive',
    icon: FileText,
    generatedDate: 'Aug 1, 2026 • 08:00 AM',
    status: 'Ready',
    fileFormat: 'PDF',
    fileSize: '1.4 MB'
  },
  {
    id: 'rep-9',
    title: 'Accreditation Audit (ABET)',
    description: 'Formal self-study compliance document for ABET Criterion 3 Student Outcomes & Continuous Improvement.',
    category: 'Accreditation',
    icon: ShieldCheck,
    generatedDate: 'Jul 31, 2026 • 01:10 PM',
    status: 'Audit Passed',
    fileFormat: 'ZIP',
    fileSize: '18.5 MB'
  },
  {
    id: 'rep-10',
    title: 'Knowledge Graph Report',
    description: 'Neo4j export dump & relationship matrix mapping Course ➔ Outcome ➔ Skill ➔ Job Role.',
    category: 'Industry',
    icon: Network,
    generatedDate: 'Jul 27, 2026 • 03:50 PM',
    status: 'Updated',
    fileFormat: 'PDF',
    fileSize: '8.2 MB'
  }
];

export const AbetReportsPage: React.FC<AbetReportsPageProps> = ({
  theme,
  onNavigateWorkspace,
  onNavigateGraph
}) => {
  const isDark = theme === 'dark';

  // Interactive States
  const [selectedReportCategory, setSelectedReportCategory] = useState<string>('All');
  const [previewReportModal, setPreviewReportModal] = useState<ReportCategoryCard | null>(null);
  const [generatingReportId, setGeneratingReportId] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<'Ready' | 'Approved' | 'Changes Requested'>('Ready');

  // Schedule Modal Inputs
  const [scheduleFrequency, setScheduleFrequency] = useState<string>('Monthly');
  const [scheduleEmail, setScheduleEmail] = useState<string>('curriculum-committee@stanford.edu');
  const [targetDept, setTargetDept] = useState<string>('Computer Science & Engineering');
  const [reportType, setReportType] = useState<string>('Full ABET Accreditation Self-Study Package');

  // Toast Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Simulate Report Generation
  const handleGenerateReport = (report: ReportCategoryCard) => {
    setGeneratingReportId(report.id);
    setTimeout(() => {
      setGeneratingReportId(null);
      triggerToast(`Fresh ${report.title} successfully generated & verified!`);
    }, 2000);
  };

  // Filtered Reports
  const filteredReports = REPORT_CATEGORIES.filter(r => {
    if (selectedReportCategory === 'All') return true;
    return r.category === selectedReportCategory;
  });

  return (
    <div className={`p-4 sm:p-8 space-y-8 max-w-[1750px] w-full mx-auto font-sans transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAFAFA] text-[#111827]'
    }`}>
      
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-8 z-50 bg-[#10B981] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-semibold text-xs border border-white/20"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. PAGE HEADER */}
      <div className={`p-6 sm:p-8 rounded-[24px] border relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all ${
        isDark ? 'bg-[#111111] border-[#262626] shadow-2xl' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-md'
      }`}>
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Accreditation & Executive Center
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
              ABET 2026 Audit Ready
            </span>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            ABET & Reports Center
          </h1>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-[#4B5563]'}`}>
            Generate accreditation-ready reports, executive summaries, curriculum modernization documents, and export packages for Deans, HODs, and Accreditation Committees.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-2 shadow-lg shadow-[#10B981]/25 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Generate Report</span>
          </button>

          <button
            onClick={() => triggerToast('Exporting complete ABET 2026 accreditation ZIP archive...')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#FAFAFA] hover:bg-[#222222]'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F1F5F9]'
            }`}
          >
            <Download className="w-4 h-4 text-[#10B981]" />
            <span>Export All (ZIP)</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#FAFAFA] hover:bg-[#222222]'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F1F5F9]'
            }`}
          >
            <Share2 className="w-4 h-4 text-[#10B981]" />
            <span>Share</span>
          </button>

          <button
            onClick={() => setShowScheduleModal(true)}
            className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:text-white'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Schedule</span>
          </button>
        </div>
      </div>

      {/* 2. TOP SUMMARY - EXECUTIVE SUMMARY CARD */}
      <div className={`p-6 sm:p-8 rounded-[24px] border relative overflow-hidden space-y-6 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-md'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-[#262626]/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
              <span className="font-mono text-xs font-bold text-[#10B981] uppercase tracking-wider">
                CURRICULUM STATUS: READY FOR COMMITTEE APPROVAL
              </span>
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl mt-1">
              Executive Curriculum Modernization Summary
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
              Confidence: 97%
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              12,400 Job Specs Audited
            </span>
          </div>
        </div>

        {/* 5 KEY SUMMARY METRIC GAUGES */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          
          <div className={`p-4 rounded-2xl border space-y-1.5 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className={`text-[11px] font-mono font-semibold block ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
              Industry Alignment
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-bold text-3xl text-[#10B981]">96%</span>
              <span className="text-[10px] font-mono text-[#10B981] font-bold">+15%</span>
            </div>
            <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#10B981] h-full w-[96%]" />
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1.5 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className={`text-[11px] font-mono font-semibold block ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
              Modernization Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-bold text-3xl text-emerald-400">94%</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">+18%</span>
            </div>
            <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[94%]" />
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1.5 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className={`text-[11px] font-mono font-semibold block ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
              Skill Coverage
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-bold text-3xl text-blue-400">91%</span>
              <span className="text-[10px] font-mono text-blue-400 font-bold">+19%</span>
            </div>
            <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full w-[91%]" />
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1.5 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className={`text-[11px] font-mono font-semibold block ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
              Accreditation Readiness
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-bold text-3xl text-[#10B981]">98%</span>
              <span className="text-[10px] font-mono text-[#10B981] font-bold">ABET Compliant</span>
            </div>
            <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#10B981] h-full w-[98%]" />
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1.5 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className={`text-[11px] font-mono font-semibold block ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
              Critical Gaps Remaining
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-bold text-3xl text-amber-400">2</span>
              <span className="text-[10px] font-mono text-amber-400 font-bold">Electives</span>
            </div>
            <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full w-[15%]" />
            </div>
          </div>

        </div>

        {/* Executive Summary Narrative Text */}
        <div className={`p-4 rounded-2xl border leading-relaxed text-xs sm:text-sm space-y-2 ${
          isDark ? 'bg-[#161616] border-[#262626] text-[#D4D4D4]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#374151]'
        }`}>
          <p className="font-medium">
            <strong className="text-[#10B981]">AI Modernization Assessment:</strong> The curriculum has been compared against <strong>12,400 enterprise job postings</strong> across Fortune 500 tech teams. AI identified <strong>18 modernization opportunities</strong>, of which <strong>16 recommendations were accepted</strong> by the Curriculum Committee.
          </p>
          <p className="opacity-90">
            Industry alignment improved from 81% to 96%. Coverage of emerging AI technologies increased by 38%. Key modern frameworks including <strong>Docker & Kubernetes</strong>, <strong>Model Context Protocol (MCP)</strong>, <strong>LangGraph Multi-Agent Workflows</strong>, and <strong>Vector Databases (PGVector)</strong> have been incorporated into core syllabus units. Expected graduate employability has improved significantly (+21%).
          </p>
        </div>
      </div>

      {/* 3. ACCREDITATION FRAMEWORKS PANEL */}
      <div className={`p-6 sm:p-8 rounded-[24px] border space-y-6 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-[#262626]/40">
          <div>
            <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Global Accreditation Standards Compliance
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl mt-1">
              Accreditation Readiness Frameworks
            </h2>
          </div>

          <button
            onClick={() => triggerToast('Generating complete Accreditation Compliance Audit Package...')}
            className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-2 shadow-md shadow-[#10B981]/20 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Generate Accreditation Package</span>
          </button>
        </div>

        {/* 4 Supported Frameworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* ABET Card */}
          <div className={`p-5 rounded-2xl border space-y-4 relative overflow-hidden transition-all hover:border-[#10B981]/50 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <div className="flex items-center justify-between">
              <div className="font-heading font-bold text-lg text-[#10B981]">ABET</div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
                Fully Compliant
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>Readiness Score</span>
                <span className="font-heading font-bold text-2xl text-[#10B981]">98%</span>
              </div>
              <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                <div className="bg-[#10B981] h-full w-[98%]" />
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-[#262626]/40">
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Mapped Outcomes:</span>
                <span className="font-bold text-[#10B981]">12/12 Criteria</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Missing Criteria:</span>
                <span className="font-bold text-emerald-400">0 Critical</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Self-Study Audit:</span>
                <span className="font-bold text-[#10B981]">Passed</span>
              </div>
            </div>
          </div>

          {/* NBA Card */}
          <div className={`p-5 rounded-2xl border space-y-4 relative overflow-hidden transition-all hover:border-[#10B981]/50 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <div className="flex items-center justify-between">
              <div className="font-heading font-bold text-lg text-emerald-400">NBA (India)</div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
                Fully Compliant
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>Readiness Score</span>
                <span className="font-heading font-bold text-2xl text-emerald-400">96%</span>
              </div>
              <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[96%]" />
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-[#262626]/40">
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Course Outcomes:</span>
                <span className="font-bold text-[#10B981]">10/10 Mapped</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Missing Criteria:</span>
                <span className="font-bold text-emerald-400">0 Critical</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>SAR Report:</span>
                <span className="font-bold text-[#10B981]">Ready</span>
              </div>
            </div>
          </div>

          {/* NAAC Card */}
          <div className={`p-5 rounded-2xl border space-y-4 relative overflow-hidden transition-all hover:border-amber-500/50 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <div className="flex items-center justify-between">
              <div className="font-heading font-bold text-lg text-blue-400">NAAC Grade A++</div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400">
                Near Compliant
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>Readiness Score</span>
                <span className="font-heading font-bold text-2xl text-blue-400">95%</span>
              </div>
              <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full w-[95%]" />
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-[#262626]/40">
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Criteria Met:</span>
                <span className="font-bold text-blue-400">7/7 Criteria</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Missing Items:</span>
                <span className="font-bold text-amber-400">1 Internship Gap</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>SSR Metric:</span>
                <span className="font-bold text-blue-400">3.82 CGPA</span>
              </div>
            </div>
          </div>

          {/* Washington Accord Card */}
          <div className={`p-5 rounded-2xl border space-y-4 relative overflow-hidden transition-all hover:border-[#10B981]/50 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <div className="flex items-center justify-between">
              <div className="font-heading font-bold text-lg text-[#10B981]">Washington Accord</div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
                Global Recognized
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>Readiness Score</span>
                <span className="font-heading font-bold text-2xl text-[#10B981]">97%</span>
              </div>
              <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                <div className="bg-[#10B981] h-full w-[97%]" />
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-[#262626]/40">
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Graduate Attributes:</span>
                <span className="font-bold text-[#10B981]">100% Satisfied</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Missing Criteria:</span>
                <span className="font-bold text-emerald-400">0 Critical</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Equivalence Audit:</span>
                <span className="font-bold text-[#10B981]">Approved</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. REPORT CATEGORIES GRID */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">
              Enterprise Report Library
            </h2>
            <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
              Select any report card to preview document details, regenerate live metrics, or export clean PDF/XLSX packages.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {['All', 'Accreditation', 'Industry', 'Outcomes', 'Executive'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedReportCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedReportCategory === cat
                    ? 'bg-[#10B981] text-white font-bold shadow-md shadow-[#10B981]/20'
                    : isDark ? 'bg-[#171717] text-[#A3A3A3] hover:text-white' : 'bg-[#F3F4F6] text-[#4B5563]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredReports.map(rep => {
            const IconComponent = rep.icon;
            const isGenerating = generatingReportId === rep.id;

            return (
              <div
                key={rep.id}
                className={`p-5 rounded-[22px] border space-y-4 flex flex-col justify-between transition-all hover:scale-[1.01] ${
                  isDark ? 'bg-[#111111] border-[#262626] hover:border-[#10B981]/50' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#10B981]/50 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center font-bold">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
                      {rep.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-heading font-bold text-sm leading-snug">
                      {rep.title}
                    </h3>
                    <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                      {rep.description}
                    </p>
                  </div>
                </div>

                {/* Footer Controls & Date */}
                <div className="space-y-3 pt-3 border-t border-[#262626]/40">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#737373]">
                    <span>{rep.generatedDate}</span>
                    <span className="font-bold text-[#10B981]">{rep.fileFormat} • {rep.fileSize}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleGenerateReport(rep)}
                      disabled={isGenerating}
                      className="px-2.5 py-1.5 rounded-xl font-bold text-[11px] bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981] hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3 fill-current" />
                      )}
                      <span>{isGenerating ? 'Building...' : 'Generate'}</span>
                    </button>

                    <button
                      onClick={() => setPreviewReportModal(rep)}
                      className={`px-2.5 py-1.5 rounded-xl font-semibold text-[11px] border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        isDark ? 'bg-[#171717] border-[#262626] text-white hover:bg-[#222222]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      <Eye className="w-3 h-3 text-[#10B981]" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. COURSE IMPROVEMENT COMPARISON REPORT & DEPARTMENT REPORTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 7 COLS: COURSE IMPROVEMENT COMPARISON REPORT */}
        <div className={`lg:col-span-7 rounded-[24px] border p-6 space-y-5 ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-md'
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
            <div>
              <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" /> Before vs. After AI Modernization
              </span>
              <h2 className="font-heading font-bold text-xl mt-1">
                Course Improvement Delta Report
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
              CS-8042 Advanced ML
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Original Syllabus Metric Box */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-red-400 font-bold uppercase">Original Syllabus</span>
                <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Fall 2024</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}>Industry Alignment</span>
                    <span className="font-bold font-mono text-red-400">82%</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-red-400 h-full w-[82%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}>Skill Coverage</span>
                    <span className="font-bold font-mono text-red-400">74%</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-red-400 h-full w-[74%]" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#262626]/40 font-mono">
                  <span className={isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}>Missing Technologies:</span>
                  <span className="font-bold text-red-400">12 Deprecated</span>
                </div>
              </div>
            </div>

            {/* AI Modernized Syllabus Metric Box */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-[#0E1F18] border-[#10B981]/40' : 'bg-[#F0FDF4] border-[#86EFAC]'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#10B981] font-bold uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Modernized Syllabus
                </span>
                <span className="text-[#10B981] font-bold">Fall 2026 Target</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}>Industry Alignment</span>
                    <span className="font-bold font-mono text-[#10B981]">96% (+14%)</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full w-[96%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}>Skill Coverage</span>
                    <span className="font-bold font-mono text-[#10B981]">93% (+19%)</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full w-[93%]" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#10B981]/30 font-mono">
                  <span className={isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}>Remaining Gaps:</span>
                  <span className="font-bold text-[#10B981]">2 Minor Electives</span>
                </div>
              </div>
            </div>

          </div>

          <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
            Top improvements integrated: <strong>Docker & Kubernetes Labs</strong>, <strong>Vector Databases (PGVector/Milvus)</strong>, <strong>Model Context Protocol (MCP)</strong>, <strong>LangGraph Multi-Agent Workflows</strong>.
          </p>
        </div>

        {/* RIGHT 5 COLS: DEPARTMENT PERFORMANCE BREAKDOWN */}
        <div className={`lg:col-span-5 rounded-[24px] border p-6 space-y-4 ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-md'
        }`}>
          <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
            <h3 className="font-heading font-bold text-lg flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#10B981]" />
              <span>Department Performance</span>
            </h3>
            <span className="text-xs font-mono text-[#10B981]">5 Engineering Depts</span>
          </div>

          <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin text-xs">
            {[
              { name: 'Computer Engineering', align: '96%', health: 'Excellent', reports: '24 Reports' },
              { name: 'Information Technology', align: '94%', health: 'Excellent', reports: '18 Reports' },
              { name: 'Electrical Engineering', align: '91%', health: 'Excellent', reports: '15 Reports' },
              { name: 'Mechanical Engineering', align: '88%', health: 'Good', reports: '12 Reports' },
              { name: 'Civil Engineering', align: '85%', health: 'Good', reports: '10 Reports' }
            ].map((dept, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                }`}
              >
                <div>
                  <div className="font-bold text-xs">{dept.name}</div>
                  <div className={`text-[10px] font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                    {dept.reports} • Health: {dept.health}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs text-[#10B981]">{dept.align}</span>
                  <button
                    onClick={() => triggerToast(`Downloaded ${dept.name} Department Audit PDF.`)}
                    className="p-1.5 rounded-lg bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981] hover:text-white transition-all cursor-pointer"
                    title="Download Department Report"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. EXPORT CENTER FORMATS & GENERATED FILES TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 6 COLS: EXPORT CENTER FORMATS */}
        <div className={`lg:col-span-6 rounded-[24px] border p-6 space-y-5 ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-md'
        }`}>
          <div className="border-b pb-3 border-[#262626]/40">
            <h3 className="font-heading font-bold text-lg flex items-center gap-2">
              <Download className="w-4 h-4 text-[#10B981]" />
              <span>Export Center Formats</span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
              Export curriculum packages in standard university and accreditation formats.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { format: 'PDF Document', ext: '.PDF', icon: FileText, size: 'Ready (Vector Print)' },
              { format: 'Word Document', ext: '.DOCX', icon: FileText, size: 'Editable Template' },
              { format: 'Excel Outcome Matrix', ext: '.XLSX', icon: FileSpreadsheet, size: 'ABET CO-PO Tables' },
              { format: 'CSV Data Raw', ext: '.CSV', icon: FileSpreadsheet, size: 'Skill Gap Datasets' },
              { format: 'JSON API Spec', ext: '.JSON', icon: FileCode, size: 'LMS Sync Format' },
              { format: 'Print Ready', ext: 'PRINT', icon: Printer, size: 'Clean Layout 300DPI' }
            ].map((exp, idx) => {
              const ExpIcon = exp.icon;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border space-y-2 flex flex-col justify-between ${
                    isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <ExpIcon className="w-4 h-4 text-[#10B981]" />
                    <span className="font-mono font-bold text-[10px] text-[#10B981] px-1.5 py-0.5 rounded bg-[#10B981]/15">
                      {exp.ext}
                    </span>
                  </div>

                  <div>
                    <div className="font-bold text-xs">{exp.format}</div>
                    <div className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                      {exp.size}
                    </div>
                  </div>

                  <button
                    onClick={() => triggerToast(`Exported ${exp.format} package.`)}
                    className="w-full py-1 rounded-xl bg-[#10B981]/20 hover:bg-[#10B981] hover:text-white text-[#10B981] font-bold text-[10px] font-mono transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" /> Export
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT 6 COLS: RECENT GENERATED FILES AUDIT TIMELINE */}
        <div className={`lg:col-span-6 rounded-[24px] border p-6 space-y-4 ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-md'
        }`}>
          <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
            <h3 className="font-heading font-bold text-lg flex items-center gap-2">
              <History className="w-4 h-4 text-[#10B981]" />
              <span>Generated Files Audit Timeline</span>
            </h3>
            <span className="text-xs font-mono text-[#10B981]">Recent Exports</span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Modernization_Report_CS8042.pdf', time: '2 minutes ago', size: '4.2 MB', user: 'Dr. Sharma' },
              { name: 'Industry_Alignment_Q3_2026.pdf', time: 'Today, 10:30 AM', size: '3.1 MB', user: 'Prof. Patel' },
              { name: 'ABET_Accreditation_Package_2026.zip', time: 'Yesterday, 04:15 PM', size: '18.5 MB', user: 'Dr. Shah' },
              { name: 'Executive_Summary_Stanford_Eng.pdf', time: 'Yesterday, 02:00 PM', size: '1.4 MB', user: 'System AI' }
            ].map((file, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                  isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs">{file.name}</div>
                    <div className={`text-[10px] font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                      {file.time} • {file.size} • By {file.user}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => triggerToast(`Downloading ${file.name}...`)}
                  className="px-2.5 py-1 rounded-xl bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981] hover:text-white font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 7. COMMITTEE APPROVAL & SIGN-OFF CARD */}
      <div className={`p-6 sm:p-8 rounded-[24px] border space-y-6 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-lg'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-[#262626]/40">
          <div>
            <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Curriculum Committee Final Sign-Off
            </span>
            <h2 className="font-heading font-bold text-2xl mt-1">
              Faculty & Committee Approval Panel
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border ${
              approvalStatus === 'Approved'
                ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40'
                : approvalStatus === 'Changes Requested'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
            }`}>
              Status: {approvalStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Member 1 */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm">Dr. Sharma</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] flex items-center gap-1">
                <Check className="w-3 h-3" /> Signed
              </span>
            </div>
            <p className={`text-xs ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
              Department Chair & HOD Computer Science
            </p>
            <span className="text-[10px] font-mono text-[#10B981] block">Approved Aug 1, 2026</span>
          </div>

          {/* Member 2 */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm">Prof. Patel</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] flex items-center gap-1">
                <Check className="w-3 h-3" /> Signed
              </span>
            </div>
            <p className={`text-xs ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
              Industry Advisory Council Chair (Google / Cloud)
            </p>
            <span className="text-[10px] font-mono text-[#10B981] block">Approved Jul 31, 2026</span>
          </div>

          {/* Member 3 */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm">Dr. Shah</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] flex items-center gap-1">
                <Check className="w-3 h-3" /> Signed
              </span>
            </div>
            <p className={`text-xs ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
              Accreditation & ABET Audit Lead
            </p>
            <span className="text-[10px] font-mono text-[#10B981] block">Approved Jul 31, 2026</span>
          </div>

        </div>

        {/* Action Buttons Bar */}
        <div className="pt-4 border-t border-[#262626]/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setApprovalStatus('Approved');
                triggerToast('Curriculum Modernization Officially Approved by Committee!');
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all shadow-lg shadow-[#10B981]/30 flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Curriculum</span>
            </button>

            <button
              onClick={() => {
                setApprovalStatus('Changes Requested');
                triggerToast('Revision requested sent back to HOD.');
              }}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-2 cursor-pointer ${
                isDark ? 'bg-[#171717] border-[#262626] text-amber-400 hover:bg-[#222222]' : 'bg-[#FFFBEB] border-[#FDE68A] text-amber-700 hover:bg-[#FEF3C7]'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              <span>Request Changes</span>
            </button>
          </div>

          <button
            onClick={() => triggerToast('Finalizing publication export...')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-2 cursor-pointer ${
              isDark ? 'bg-[#171717] border-[#262626] text-white hover:bg-[#222222]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F1F5F9]'
            }`}
          >
            <Download className="w-4 h-4 text-[#10B981]" />
            <span>Export Final Version</span>
          </button>
        </div>
      </div>

      {/* ================= MODALS & DRAWERS ================= */}

      {/* REPORT PREVIEW MODAL */}
      <AnimatePresence>
        {previewReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[24px] border p-6 sm:p-8 space-y-6 shadow-2xl ${
                isDark ? 'bg-[#111111] border-[#262626] text-white' : 'bg-white border-[#E5E7EB] text-[#111827]'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl">{previewReportModal.title}</h3>
                    <p className={`text-xs ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                      Document Preview • Generated {previewReportModal.generatedDate}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setPreviewReportModal(null)}
                  className={`p-2 rounded-xl border hover:bg-[#262626] transition-all cursor-pointer ${
                    isDark ? 'border-[#262626] text-[#A3A3A3]' : 'border-[#E5E7EB] text-[#4B5563]'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Mock Viewer Body */}
              <div className={`p-6 rounded-2xl border space-y-5 font-mono text-xs ${
                isDark ? 'bg-[#0E0E0E] border-[#262626] text-[#D4D4D4]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#374151]'
              }`}>
                <div className="flex items-center justify-between text-[11px] pb-3 border-b border-[#262626]/40">
                  <span className="text-[#10B981] font-bold">LUMINI EXECUTIVE DOCUMENT SPECIFICATION</span>
                  <span>STANFORD ENGINEERING • CS-8042</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[#10B981] font-bold block uppercase">1. EXECUTIVE SUMMARY</span>
                  <p className="leading-relaxed">
                    The Stanford School of Engineering Curriculum Committee performed an automated AI modernization audit on syllabus code <strong>CS-8042 Advanced Machine Learning</strong>. The course was mapped against 12,400 active job postings across enterprise cloud & AI organizations.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[#10B981] font-bold block uppercase">2. TOP IMPROVEMENTS ACCEPTED</span>
                  <div className="space-y-1.5 pl-2 text-[11px]">
                    <div className="text-[#10B981]">✓ Docker & Container Isolation Added (+7% Alignment)</div>
                    <div className="text-[#10B981]">✓ Kubernetes Pod Orchestration Added (+5% Alignment)</div>
                    <div className="text-[#10B981]">✓ Vector Databases (PGVector/Milvus) Added (+10% Alignment)</div>
                    <div className="text-[#10B981]">✓ Prompt Engineering & Context Optimization (+4% Alignment)</div>
                    <div className="text-[#10B981]">✓ AI Agents & LangGraph Multi-Agent Workflows (+8% Alignment)</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-amber-400 font-bold block uppercase">3. ACCREDITATION COMPLIANCE</span>
                  <p>
                    ABET Criterion 3 (Student Outcomes) 100% satisfied. ABET Self-Study Report generated cleanly. Zero critical outcome deficiencies detected.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#262626]/40 flex items-center justify-between text-[11px]">
                  <span className="text-[#10B981] font-bold">COMMITTEE RECOMMENDATION: APPROVE SYLLABUS UPDATE</span>
                  <span>PAGE 1 OF 12</span>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-[#10B981]">Format: {previewReportModal.fileFormat} • {previewReportModal.fileSize}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      triggerToast(`Downloaded ${previewReportModal.title}`);
                      setPreviewReportModal(null);
                    }}
                    className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Full Document
                  </button>
                  <button
                    onClick={() => setPreviewReportModal(null)}
                    className={`px-4 py-2 rounded-xl font-semibold text-xs border transition-all cursor-pointer ${
                      isDark ? 'bg-[#171717] border-[#262626] text-white' : 'bg-[#F3F4F6] border-[#E5E7EB] text-[#111827]'
                    }`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHARE MODAL */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-[24px] border p-6 space-y-5 shadow-2xl ${
                isDark ? 'bg-[#111111] border-[#262626] text-white' : 'bg-white border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#10B981]" />
                  <h3 className="font-heading font-bold text-lg">Share ABET Report Package</h3>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 rounded-lg hover:bg-[#262626] text-[#737373]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Email Committee Members</label>
                  <input
                    type="email"
                    defaultValue="committee-chair@stanford.edu"
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#10B981] ${
                      isDark ? 'bg-[#171717] border-[#262626] text-white' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Secure Shareable Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="https://lumini.ai/reports/abet-2026-stanford-cs8042"
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                        isDark ? 'bg-[#171717] border-[#262626] text-[#10B981]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#059669]'
                      }`}
                    />
                    <button
                      onClick={() => triggerToast('Secure share link copied to clipboard!')}
                      className="p-2.5 rounded-xl bg-[#10B981] text-white font-bold cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    triggerToast('Email invitation sent to committee!');
                    setShowShareModal(false);
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#10B981] cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCHEDULE MODAL */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-[24px] border p-6 space-y-5 shadow-2xl ${
                isDark ? 'bg-[#111111] border-[#262626] text-white' : 'bg-white border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#10B981]" />
                  <h3 className="font-heading font-bold text-lg">Schedule Recurring Reports</h3>
                </div>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="p-1 rounded-lg hover:bg-[#262626] text-[#737373]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <CustomSelect
                  label="Frequency"
                  size="sm"
                  theme={theme}
                  value={scheduleFrequency}
                  onChange={(val) => setScheduleFrequency(val)}
                  options={[
                    { value: "Weekly", label: "Weekly Digest" },
                    { value: "Monthly", label: "Monthly Executive Briefing" },
                    { value: "End of Semester", label: "End of Semester Audit" }
                  ]}
                />

                <div>
                  <label className="font-semibold block mb-1">Recipient Email</label>
                  <input
                    type="email"
                    value={scheduleEmail}
                    onChange={(e) => setScheduleEmail(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      isDark ? 'bg-[#171717] border-[#262626] text-white' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    triggerToast(`Scheduled ${scheduleFrequency} report updates to ${scheduleEmail}`);
                    setShowScheduleModal(false);
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#10B981] cursor-pointer"
                >
                  Save Schedule
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUICK GENERATE MODAL */}
      <AnimatePresence>
        {showGenerateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-lg rounded-[24px] border p-6 space-y-5 shadow-2xl ${
                isDark ? 'bg-[#111111] border-[#262626] text-white' : 'bg-white border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#10B981]" />
                  <h3 className="font-heading font-bold text-lg">Generate Custom Report</h3>
                </div>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="p-1 rounded-lg hover:bg-[#262626] text-[#737373]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <CustomSelect
                  label="Select Target Department"
                  size="sm"
                  theme={theme}
                  value={targetDept}
                  onChange={(val) => setTargetDept(val)}
                  options={[
                    { value: "Computer Science & Engineering", label: "Computer Science & Engineering" },
                    { value: "Information Technology", label: "Information Technology" },
                    { value: "Electrical Engineering", label: "Electrical Engineering" }
                  ]}
                />

                <CustomSelect
                  label="Select Report Type"
                  size="sm"
                  theme={theme}
                  value={reportType}
                  onChange={(val) => setReportType(val)}
                  options={[
                    { value: "Full ABET Accreditation Self-Study Package", label: "Full ABET Accreditation Package" },
                    { value: "Executive Board Briefing", label: "Executive Board Briefing" },
                    { value: "Course Outcome to Job Role Skill Gap Matrix", label: "Course Outcome to Skill Gap Matrix" }
                  ]}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    triggerToast('Custom AI Report generated successfully!');
                    setShowGenerateModal(false);
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#10B981] cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" /> Build Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
