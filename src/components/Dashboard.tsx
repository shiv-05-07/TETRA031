import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomSelect } from './CustomSelect';
import {
  GraduationCap,
  LayoutDashboard,
  FolderKanban,
  Upload,
  BrainCircuit,
  BarChart3,
  TrendingUp,
  Sparkles,
  FileText,
  Sun,
  Moon,
  Search,
  Bell,
  User,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Layers,
  Cpu,
  Download,
  Share2,
  X,
  Check,
  BarChart2,
  RefreshCw,
  LogOut,
  ExternalLink,
  Home,
  CheckSquare,
  Square,
  Network
} from 'lucide-react';
import { ThemeMode, InstitutionWorkspace } from '../types';
import { useAuth } from '../hooks/useAuth';

import { HeroMorningBrief } from './HeroMorningBrief';
import { SkillGapHeatmap } from './SkillGapHeatmap';
import { KnowledgeGraphPreview } from './KnowledgeGraphPreview';
import { LiveIndustryFeed } from './LiveIndustryFeed';
import { RecommendationsTimeline } from './RecommendationsTimeline';
import { DepartmentOverview } from './DepartmentOverview';
import { IndustryAlignmentChart } from './IndustryAlignmentChart';
import { AiAnalysisWorkspace } from './AiAnalysisWorkspace';
import { SyllabusLibrary } from './SyllabusLibrary';
import { SkillGapAnalyzerPage } from './SkillGapAnalyzerPage';
import { KnowledgeGraphExplorerPage } from './KnowledgeGraphExplorerPage';
import { AiModernizationPage } from './AiModernizationPage';
import { AbetReportsPage } from './AbetReportsPage';

interface DashboardProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onNavigateLanding: () => void;
  onNavigateAuth: () => void;
  activeWorkspace?: InstitutionWorkspace;
}

export const Dashboard: React.FC<DashboardProps> = ({
  theme,
  onToggleTheme,
  onNavigateLanding,
  onNavigateAuth,
  activeWorkspace
}) => {
  const isDark = theme === 'dark';
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      onNavigateAuth();
    } catch (err) {
      console.error('Failed to sign out', err);
    }
  };

  // Navigation & View States
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'library' | 'workspace' | 'skillgap' | 'graph' | 'recommendations' | 'reports' | 'settings'>('dashboard');
  
  // Header Controls
  const [selectedInstitution, setSelectedInstitution] = useState(
    activeWorkspace ? `${activeWorkspace.shortName} - ${activeWorkspace.department}` : 'Stanford University - School of Engineering'
  );
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Drawers & Modals
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCourseForWorkspace, setSelectedCourseForWorkspace] = useState<string | null>(null);

  // Upload Modal State
  const [uploadStep, setUploadStep] = useState<'select' | 'processing' | 'complete'>('select');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [courseCodeInput, setCourseCodeInput] = useState('CS-8042');
  const [courseTitleInput, setCourseTitleInput] = useState('Distributed Systems & Cloud Security');

  // Interactive Checklist Tasks
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Review 3 AI Suggestions for CS-5090 Cloud', done: false, priority: 'High' },
    { id: '2', title: 'Approve DBMS Modernization (Vector DB Module)', done: false, priority: 'High' },
    { id: '3', title: 'Generate Accreditation ABET Audit Report', done: true, priority: 'Medium' },
    { id: '4', title: 'Analyze Semester 6 Computer Eng. Syllabi', done: false, priority: 'Medium' },
    { id: '5', title: 'Review Committee Feedback on Operating Systems', done: false, priority: 'Low' }
  ]);

  // Active Curriculum Projects Sample Data
  const [projects, setProjects] = useState([
    {
      id: '1',
      code: 'CS-8042',
      title: 'Advanced Machine Learning & MLOps',
      department: 'Computer Engineering',
      lastAnalysis: 'Overnight Audit (2h ago)',
      alignmentScore: 92,
      skillGapStatus: 'Minor Gaps',
      status: 'Review Needed',
      missingSkills: ['vLLM', 'Ray', 'MCP Protocol']
    },
    {
      id: '2',
      code: 'CS-3010',
      title: 'Operating Systems & Linux Kernel',
      department: 'Information Technology',
      lastAnalysis: 'Overnight Audit (4h ago)',
      alignmentScore: 74,
      skillGapStatus: 'Major Gap',
      status: 'Revision Pending',
      missingSkills: ['Prompt Engineering', 'Containers', 'Linux Kernel Labs']
    },
    {
      id: '3',
      code: 'CS-4080',
      title: 'Database Systems & Distributed Storage',
      department: 'Information Technology',
      lastAnalysis: 'Yesterday',
      alignmentScore: 68,
      skillGapStatus: 'Critical Gap',
      status: 'Committee Review',
      missingSkills: ['Vector Databases', 'Milvus', 'RAG Search']
    },
    {
      id: '4',
      code: 'CS-5090',
      title: 'Cloud Computing & Serverless',
      department: 'Computer Engineering',
      lastAnalysis: 'Yesterday',
      alignmentScore: 95,
      skillGapStatus: 'Optimal',
      status: 'Approved & Active',
      missingSkills: ['Kubernetes 1.30']
    }
  ]);

  // Toggle Task Completion
  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  // Simulate Upload Action
  const handleSimulateUpload = () => {
    if (!uploadedFileName) return;
    setUploadStep('processing');
    setTimeout(() => {
      setUploadStep('complete');
      const newProj = {
        id: Date.now().toString(),
        code: courseCodeInput || 'CS-9010',
        title: courseTitleInput || uploadedFileName.replace('.pdf', ''),
        department: 'Computer Engineering',
        lastAnalysis: 'Just now',
        alignmentScore: 89,
        skillGapStatus: 'Minor Gaps',
        status: 'Review Needed',
        missingSkills: ['Vector DBs', 'MCP Protocol']
      };
      setProjects([newProj, ...projects]);
    }, 2200);
  };

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAFAFA] text-[#111827]'
    }`}>
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className={`fixed top-0 left-0 bottom-0 z-40 border-r flex flex-col justify-between transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } ${
        isDark ? 'bg-[#0E0E0E] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
      }`}>
        
        {/* Brand Header */}
        <div className="p-5 border-b border-inherit flex items-center justify-between">
          <a href="#" onClick={onNavigateLanding} className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] p-0.5 shadow-md flex-shrink-0">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                isDark ? 'bg-[#0A0A0A]' : 'bg-[#FFFFFF]'
              }`}>
                <GraduationCap className="w-5 h-5 text-[#10B981]" />
              </div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg tracking-tight leading-none">
                  Cirrcul<span className="text-[#10B981]">AI</span>
                </span>
                <span className="text-[10px] font-mono text-[#10B981] mt-0.5 font-semibold">
                  MISSION CONTROL
                </span>
              </div>
            )}
          </a>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-1.5 rounded-lg border transition-colors hidden lg:flex ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#737373] hover:text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Navigation Menu Links */}
        <div className="p-3 flex-1 overflow-y-auto space-y-6">
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-3 mb-2 block ${
                isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'
              }`}>
                Core Launchpad
              </span>
            )}

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/20'
                  : isDark
                    ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span>AI Mission Control</span>}
            </button>

            <button
              onClick={() => setActiveTab('workspace')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'workspace'
                  ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/20'
                  : isDark
                    ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              <BrainCircuit className="w-4 h-4 flex-shrink-0 text-[#10B981]" />
              {!sidebarCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>AI Analysis Workspace</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#10B981]/20 text-[#10B981] font-mono font-bold">Flagship</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-[#10B981] text-white shadow-md'
                  : isDark
                    ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              <FolderKanban className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Syllabus Library</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#10B981]/20 text-[#10B981] font-mono">18</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setShowUploadModal(true)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                isDark
                  ? 'bg-[#171717] border-[#262626] text-[#10B981] hover:bg-[#10B981]/15'
                  : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#059669] hover:bg-[#DCFCE7]'
              }`}
            >
              <Upload className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span>Upload Syllabus</span>}
            </button>
          </div>

          <div className="space-y-1">
            {!sidebarCollapsed && (
              <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-3 mb-2 block ${
                isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'
              }`}>
                AI Intelligence
              </span>
            )}

            <button
              onClick={() => setActiveTab('skillgap')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'skillgap'
                  ? 'bg-[#10B981] text-white shadow-md'
                  : isDark
                    ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              <BarChart3 className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span>Skill Gap Heatmap</span>}
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'graph'
                  ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/20'
                  : isDark
                    ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              <Network className="w-4 h-4 flex-shrink-0 text-[#10B981]" />
              {!sidebarCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Knowledge Graph</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#10B981]/20 text-[#10B981] font-mono font-bold">Neo4j</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('recommendations')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'recommendations'
                  ? 'bg-[#10B981] text-white shadow-md'
                  : isDark
                    ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              <BrainCircuit className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>AI Modernization</span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-[#10B981] text-white shadow-md'
                  : isDark
                    ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span>ABET & Reports</span>}
            </button>
          </div>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-inherit space-y-2">
          <button
            onClick={onNavigateLanding}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
            }`}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span>Home</span>}
          </button>

          <button
            onClick={onToggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#34D399] flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
            {!sidebarCollapsed && <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>}
          </button>

          <div className={`p-2 rounded-xl border flex items-center gap-3 ${
            isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
          }`}>
            <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center font-bold text-xs text-[#10B981] flex-shrink-0">
              DS
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden flex-1">
                <div className="font-heading font-semibold text-xs truncate">Dr. Sharma</div>
                <div className={`text-[10px] truncate ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                  Curriculum HOD
                </div>
              </div>
            )}
            {!sidebarCollapsed && (
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className={`p-1 rounded hover:text-red-400 transition-colors ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        
        {/* TOP NAVBAR BAR */}
        <header className={`sticky top-0 z-30 h-16 border-b px-4 sm:px-8 flex items-center justify-between gap-4 backdrop-blur-md transition-colors ${
          isDark ? 'bg-[#0A0A0A]/90 border-[#262626]' : 'bg-[#FFFFFF]/90 border-[#E5E7EB]'
        }`}>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search syllabi, missing skills, ABET topics..."
              className={`w-full text-xs font-medium pl-10 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all ${
                isDark
                  ? 'bg-[#111111] border-[#262626] text-[#FAFAFA] placeholder-[#525252]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
              }`}
            />
          </div>

          {/* Top Controls & Selectors */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block w-64">
              <CustomSelect
                size="sm"
                theme={theme}
                value={selectedInstitution}
                onChange={(val) => setSelectedInstitution(val)}
                options={[
                  { value: "Stanford University - School of Engineering", label: "Stanford - School of Eng." },
                  { value: "MIT - Department of EECS", label: "MIT - Dept of EECS" },
                  { value: "UC Berkeley - College of Computing", label: "UC Berkeley - Computing" }
                ]}
              />
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-xl border relative transition-colors cursor-pointer ${
                showNotifications
                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                  : isDark
                    ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]'
                    : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#10B981]" />
            </button>

            {/* Upload CTA */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-1.5 shadow-md shadow-[#10B981]/20 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload Syllabus</span>
            </button>
          </div>
        </header>

        {/* DASHBOARD BODY CONTAINER */}
        {activeTab === 'workspace' ? (
          <AiAnalysisWorkspace
            theme={theme}
            onNavigateBack={() => setActiveTab('dashboard')}
          />
        ) : activeTab === 'library' ? (
          <SyllabusLibrary
            theme={theme}
            onOpenWorkspace={(code) => {
              setSelectedCourseForWorkspace(code);
              setActiveTab('workspace');
            }}
            onOpenUpload={() => setShowUploadModal(true)}
            onExportPdf={() => window.print()}
          />
        ) : activeTab === 'skillgap' ? (
          <SkillGapAnalyzerPage
            theme={theme}
            onOpenWorkspace={(code) => {
              setSelectedCourseForWorkspace(code);
              setActiveTab('workspace');
            }}
            onExportReport={() => window.print()}
          />
        ) : activeTab === 'graph' ? (
          <KnowledgeGraphExplorerPage
            theme={theme}
            onOpenWorkspace={(code) => {
              setSelectedCourseForWorkspace(code);
              setActiveTab('workspace');
            }}
            onExportGraph={() => window.print()}
          />
        ) : activeTab === 'recommendations' ? (
          <AiModernizationPage
            theme={theme}
            onNavigateWorkspace={(code) => {
              if (code) setSelectedCourseForWorkspace(code);
              setActiveTab('workspace');
            }}
            onNavigateGraph={() => setActiveTab('graph')}
            onExportReport={() => window.print()}
          />
        ) : activeTab === 'reports' ? (
          <AbetReportsPage
            theme={theme}
            onNavigateWorkspace={(code) => {
              if (code) setSelectedCourseForWorkspace(code);
              setActiveTab('workspace');
            }}
            onNavigateGraph={() => setActiveTab('graph')}
          />
        ) : (
          <div className="p-4 sm:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
            
            {/* SECTION 1: HERO AI MORNING BRIEF & SCORE GAUGE WORKFLOW */}
            <HeroMorningBrief
              theme={theme}
              onOpenRecommendations={() => setActiveTab('recommendations')}
              onOpenWorkspace={() => setActiveTab('workspace')}
              onOpenUpload={() => setShowUploadModal(true)}
            />

          {/* SECTION 2: ASYMMETRICAL KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Featured Large KPI Card: Curriculum Health (5 cols) */}
            <div className={`md:col-span-4 p-6 rounded-[22px] border space-y-4 flex flex-col justify-between relative overflow-hidden ${
              isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#10B981] uppercase">Primary Index</span>
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
              </div>
              
              <div>
                <span className={`text-xs font-semibold block ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Curriculum Health Score
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="font-heading font-bold text-4xl lg:text-5xl text-[#10B981]">88%</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981]">
                    +4.2% This Term
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className={isDark ? 'text-[#888888]' : 'text-[#6B7280]'}>ABET Criterion 3 Outcome</span>
                  <span className="font-bold text-[#10B981]">92% Achieved</span>
                </div>
                <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#10B981] h-full w-[88%]" />
                </div>
              </div>
            </div>

            {/* 5 Compact Metric Cards Grid (8 cols) */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              
              <div className={`p-4 rounded-[20px] border space-y-2 transition-all hover:border-[#10B981]/40 ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
              }`}>
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Industry Align</span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <span className="font-heading font-bold text-2xl text-[#10B981]">84%</span>
                <p className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Live Job Spec Match</p>
              </div>

              <div className={`p-4 rounded-[20px] border space-y-2 transition-all hover:border-amber-500/40 ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
              }`}>
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Skill Gaps</span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span className="font-heading font-bold text-2xl text-amber-400">17</span>
                <p className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Across 3 Courses</p>
              </div>

              <div className={`p-4 rounded-[20px] border space-y-2 transition-all hover:border-[#10B981]/40 ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
              }`}>
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Pending Rev</span>
                  <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <span className="font-heading font-bold text-2xl">8</span>
                <p className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Awaiting Sign-off</p>
              </div>

              <div className={`p-4 rounded-[20px] border space-y-2 transition-all hover:border-[#10B981]/40 ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
              }`}>
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>AI Suggestions</span>
                  <BrainCircuit className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <span className="font-heading font-bold text-2xl text-[#10B981]">46</span>
                <p className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>4 Ready to Apply</p>
              </div>

              <div className={`p-4 rounded-[20px] border space-y-2 transition-all hover:border-[#10B981]/40 ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
              }`}>
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Reports</span>
                  <FileText className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <span className="font-heading font-bold text-2xl">132</span>
                <p className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>ABET PDF Exported</p>
              </div>

            </div>

          </div>

          {/* SECTION 3: QUICK LAUNCHPAD ACTION CARDS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-xl tracking-tight">Quick Launch Actions</h2>
                <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  What would the Curriculum Committee like to execute right now?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              
              <button
                onClick={() => setShowUploadModal(true)}
                className={`p-5 rounded-[22px] border text-left space-y-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group ${
                  isDark ? 'bg-[#141414] border-[#262626] hover:border-[#10B981]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#10B981] shadow-sm'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">Upload Syllabus</h3>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                    Drop PDF, Word, or LaTeX for deep parsing.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setSelectedCourseForWorkspace('CS-8042 Advanced Machine Learning & MLOps')}
                className={`p-5 rounded-[22px] border text-left space-y-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group ${
                  isDark ? 'bg-[#141414] border-[#262626] hover:border-[#10B981]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#10B981] shadow-sm'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">AI Analysis</h3>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                    Evaluate Bloom's cognitive depth & topics.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('skillgap')}
                className={`p-5 rounded-[22px] border text-left space-y-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group ${
                  isDark ? 'bg-[#141414] border-[#262626] hover:border-[#10B981]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#10B981] shadow-sm'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">Skill Gap Analysis</h3>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                    Audit missing tech vs 120k live job specs.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('graph')}
                className={`p-5 rounded-[22px] border text-left space-y-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group ${
                  isDark ? 'bg-[#141414] border-[#262626] hover:border-[#10B981]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#10B981] shadow-sm'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">Knowledge Graph</h3>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                    Explore course → outcome → tech chain.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('recommendations')}
                className={`p-5 rounded-[22px] border text-left space-y-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group ${
                  isDark ? 'bg-[#141414] border-[#262626] hover:border-[#10B981]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#10B981] shadow-sm'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">AI Modernization</h3>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                    Generate updated syllabus units in 1-click.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`p-5 rounded-[22px] border text-left space-y-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group ${
                  isDark ? 'bg-[#141414] border-[#262626] hover:border-[#10B981]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#10B981] shadow-sm'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">Generate Report</h3>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                    Export ABET accreditation report PDF.
                  </p>
                </div>
              </button>

            </div>
          </div>

          {/* SECTION 4: ACTIVE PROJECTS + LIVE INDUSTRY FEED */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT 8 COLS: Active Projects Cards */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl tracking-tight">Active Curriculum Projects</h3>
                  <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    Courses currently flagged for modernization or under active committee review.
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className={`p-5 rounded-[22px] border space-y-4 transition-all ${
                      isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#10B981] px-2 py-0.5 rounded bg-[#10B981]/15 text-xs">
                          {proj.code}
                        </span>
                        <h4 className="font-heading font-bold text-base">{proj.title}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          proj.skillGapStatus === 'Optimal'
                            ? 'bg-[#10B981]/20 text-[#10B981]'
                            : proj.skillGapStatus === 'Minor Gaps'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}>
                          {proj.skillGapStatus}
                        </span>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                          {proj.lastAnalysis}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className={`text-[10px] block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Department</span>
                        <span className="font-semibold">{proj.department}</span>
                      </div>

                      <div>
                        <span className={`text-[10px] block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Industry Alignment</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-bold font-mono text-[#10B981]">{proj.alignmentScore}%</span>
                          <div className="w-20 bg-[#262626] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#10B981] h-full" style={{ width: `${proj.alignmentScore}%` }} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className={`text-[10px] block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Status</span>
                        <span className="font-semibold text-[#10B981]">{proj.status}</span>
                      </div>
                    </div>

                    {/* Missing Skills Tags */}
                    <div className="pt-2 border-t border-[#262626]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className={`text-[11px] font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Missing Skills:</span>
                        {proj.missingSkills.map((sk, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[11px] font-semibold border border-amber-500/20">
                            ⚠ {sk}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedCourseForWorkspace(proj.title)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#10B981] hover:bg-[#34D399] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-end sm:self-auto"
                      >
                        <span>Open Workspace</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT 4 COLS: Live Industry Hiring Feed */}
            <div className="lg:col-span-4">
              <LiveIndustryFeed theme={theme} />
            </div>

          </div>

          {/* SECTION 5: SKILL GAP HEATMAP */}
          <SkillGapHeatmap theme={theme} />

          {/* SECTION 6: KNOWLEDGE GRAPH + INDUSTRY ALIGNMENT */}
          <div className="space-y-8">
            <KnowledgeGraphPreview
              theme={theme}
              onOpenExplorer={() => setActiveTab('graph')}
            />
            <IndustryAlignmentChart theme={theme} />
          </div>

          {/* SECTION 7: RECOMMENDATIONS TIMELINE + UPCOMING TASKS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT 8 COLS: Recommendations Timeline */}
            <div className="lg:col-span-8">
              <RecommendationsTimeline
                theme={theme}
                onApplyRecommendation={() => setSelectedCourseForWorkspace('CS-5090 Cloud Computing & Serverless Architecture')}
              />
            </div>

            {/* RIGHT 4 COLS: Upcoming Committee Tasks */}
            <div className="lg:col-span-4">
              <div className={`rounded-[24px] border p-6 space-y-5 transition-all ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-lg'
              }`}>
                <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                  <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#10B981]" />
                    <span>Committee Tasks</span>
                  </h3>
                  <span className="text-xs font-mono text-[#10B981]">
                    {tasks.filter(t => t.done).length}/{tasks.length} Completed
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                        task.done
                          ? isDark ? 'bg-[#141414] border-[#262626] opacity-60' : 'bg-[#F8FAFC] border-[#E5E7EB] opacity-60'
                          : isDark ? 'bg-[#171717] border-[#262626] hover:border-[#10B981]/50' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#10B981]/50'
                      }`}
                    >
                      <div className="mt-0.5 text-[#10B981]">
                        {task.done ? <CheckCircle2 className="w-4 h-4" /> : <Square className="w-4 h-4 text-[#737373]" />}
                      </div>
                      <div className="space-y-1">
                        <span className={`text-xs font-semibold block leading-snug ${
                          task.done ? 'line-through text-[#737373]' : ''
                        }`}>
                          {task.title}
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 block font-bold">
                          {task.priority} Priority
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 8: DEPARTMENT OVERVIEW */}
          <DepartmentOverview theme={theme} />

        </div>
      )}

      </main>

      {/* MODAL 1: UPLOAD SYLLABUS */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className={`relative w-full max-w-xl rounded-[24px] border p-6 sm:p-8 shadow-2xl z-10 ${
                isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className={`absolute top-5 right-5 p-2 rounded-xl border ${
                  isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/15 text-[#10B981] mb-2">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Syllabus File</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl">Drop Course Syllabus</h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    Upload PDF, DOCX, or LaTeX files. AI will extract learning outcomes, missing skills, and ABET rubrics.
                  </p>
                </div>

                {uploadStep === 'select' && (
                  <div className="space-y-4">
                    <div
                      onClick={() => setUploadedFileName('Syllabus_Advanced_MLOps_2026.pdf')}
                      className={`border-2 border-dashed rounded-[18px] p-8 text-center space-y-3 cursor-pointer transition-colors ${
                        uploadedFileName
                          ? 'border-[#10B981] bg-[#10B981]/10'
                          : isDark
                            ? 'border-[#262626] hover:border-[#10B981]/50 bg-[#171717]'
                            : 'border-[#E5E7EB] hover:border-[#10B981]/50 bg-[#F8FAFC]'
                      }`}
                    >
                      <Upload className="w-10 h-10 text-[#10B981] mx-auto" />
                      <div>
                        <p className="font-heading font-bold text-sm">
                          {uploadedFileName ? uploadedFileName : 'Click or Drag & Drop Syllabus File Here'}
                        </p>
                        <p className={`text-xs mt-1 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                          Supports .pdf, .docx, .txt, .tex (Max 25MB)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Course Code</label>
                        <input
                          type="text"
                          value={courseCodeInput}
                          onChange={(e) => setCourseCodeInput(e.target.value)}
                          className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-[#10B981] ${
                            isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Course Title</label>
                        <input
                          type="text"
                          value={courseTitleInput}
                          onChange={(e) => setCourseTitleInput(e.target.value)}
                          className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-[#10B981] ${
                            isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSimulateUpload}
                      disabled={!uploadedFileName}
                      className="w-full py-3 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      Run AI Parsing & Skill Audit
                    </button>
                  </div>
                )}

                {uploadStep === 'processing' && (
                  <div className="text-center py-8 space-y-4">
                    <RefreshCw className="w-10 h-10 text-[#10B981] animate-spin mx-auto" />
                    <div>
                      <h4 className="font-heading font-bold text-lg">AI Engine Processing Syllabus</h4>
                      <p className="text-xs text-[#10B981] font-mono mt-1">Extracting units, matching ABET outcomes, analyzing job market gaps...</p>
                    </div>
                  </div>
                )}

                {uploadStep === 'complete' && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto border border-[#10B981]/40">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xl">Syllabus Analysis Completed!</h4>
                      <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        Added to your active curriculum projects list with 89% alignment score.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowUploadModal(false);
                        setUploadStep('select');
                        setUploadedFileName('');
                      }}
                      className="px-6 py-2.5 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399]"
                    >
                      View in Dashboard
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: COURSE WORKSPACE DRAWER */}
      <AnimatePresence>
        {selectedCourseForWorkspace && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourseForWorkspace(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-2xl h-full shadow-2xl p-6 sm:p-8 overflow-y-auto space-y-6 z-10 ${
                isDark ? 'bg-[#111111] border-l border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-l border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div>
                  <span className="text-xs font-mono text-[#10B981] font-bold">COURSE WORKSPACE</span>
                  <h3 className="font-heading font-bold text-2xl">{selectedCourseForWorkspace}</h3>
                </div>
                <button
                  onClick={() => setSelectedCourseForWorkspace(null)}
                  className={`p-2 rounded-xl border ${
                    isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">Course Outcome Audit Score</span>
                    <span className="font-bold font-mono text-base text-[#10B981]">89 / 100</span>
                  </div>
                  <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>
                    High alignment with ABET Criterion 3 Student Outcomes. Minor gaps detected in modern MLOps telemetry.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-sm text-[#10B981]">1. Extracted Syllabus Units</h4>
                  <div className={`p-3 rounded-lg border space-y-1 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                    <span className="font-bold text-[#10B981]">Unit 1: GPU Cluster Architecture & Parallel CUDA</span>
                    <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>NVIDIA H100 Tensor Cores, NVLink interconnects, Distributed CUDA kernels.</p>
                  </div>
                  <div className={`p-3 rounded-lg border space-y-1 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                    <span className="font-bold text-[#10B981]">Unit 2: Large Model Parallelism & vLLM</span>
                    <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Tensor Parallelism, PagedAttention algorithms, FlashAttention-3 integration.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-sm text-[#10B981]">2. Recommended Industry Additions</h4>
                  <div className="p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 space-y-1 text-[#10B981]">
                    <span className="font-bold">✓ Add Model Context Protocol (MCP)</span>
                    <p className="text-[11px] text-[#34D399]">340% demand surge in tech job listings.</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCourseForWorkspace(null)}
                    className="flex-1 py-3 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] transition-all cursor-pointer"
                  >
                    Export Updated ABET Syllabus PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
