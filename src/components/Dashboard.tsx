import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  X,
  Upload,
  RefreshCw
} from 'lucide-react';
import { ThemeMode, InstitutionWorkspace } from '../types';
import { useAuth } from '../hooks/useAuth';
import { getThemeTokens } from '../theme/tokens';

import { DashboardLayout } from './dashboard/DashboardLayout';
import { StatCard } from './dashboard/StatCard';
import { DataTable, CurriculumItem } from './dashboard/DataTable';
import { ActivityList, ActivityItem } from './dashboard/ActivityList';
import { GettingStartedCard } from './dashboard/StepCard';

import { AiAnalysisWorkspace } from './AiAnalysisWorkspace';
import { SyllabusLibrary } from './SyllabusLibrary';
import { SkillGapAnalyzerPage } from './SkillGapAnalyzerPage';
import { KnowledgeGraphExplorerPage } from './KnowledgeGraphExplorerPage';
import { AiModernizationPage } from './AiModernizationPage';
import { AbetReportsPage } from './AbetReportsPage';
import { UploadCurriculumPage } from './UploadCurriculumPage';
import { AnalysisResultsPage } from './AnalysisResultsPage';
import { PastAnalysisPage, PastAnalysisRecord } from './PastAnalysisPage';
import { SettingsPage } from './SettingsPage';

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
}) => {
  const isDark = theme === 'dark';
  const tokens = getThemeTokens(theme);
  const { signOut, user, profile } = useAuth();

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
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [hasActiveAnalysis, setHasActiveAnalysis] = useState<boolean>(false);
  const [activeAnalysisCourse, setActiveAnalysisCourse] = useState<string>('Data Structures & Algorithms');

  // Past Analyses State
  const [pastAnalyses, setPastAnalyses] = useState<PastAnalysisRecord[]>([
    {
      id: 'p1',
      courseCode: 'CS-8042',
      courseTitle: 'Advanced Machine Learning & MLOps',
      department: 'Computer Engineering',
      semester: 'VII',
      academicYear: '2025 - 2026',
      curriculumVersion: '3.4',
      date: 'May 28, 2025',
      alignmentScore: 92,
      coveragePercentage: 78.4,
      totalSkills: 180,
      coveredSkills: 141,
      missingSkillsCount: 24,
      outdatedSkillsCount: 15,
      status: 'Completed',
      missingSkills: ['vLLM', 'Ray', 'MCP Protocol', 'Kubeflow', 'Triton'],
      outdatedSkills: ['Scikit-Learn 0.20', 'TensorFlow 1.x', 'Keras 2.0'],
    },
    {
      id: 'p2',
      courseCode: 'CS-3010',
      courseTitle: 'Operating Systems & Linux Kernel',
      department: 'Information Technology',
      semester: 'V',
      academicYear: '2025 - 2026',
      curriculumVersion: '2.1',
      date: 'May 24, 2025',
      alignmentScore: 74,
      coveragePercentage: 62.0,
      totalSkills: 140,
      coveredSkills: 87,
      missingSkillsCount: 38,
      outdatedSkillsCount: 15,
      status: 'Needs Review',
      missingSkills: ['eBPF', 'Rust Kernel Modules', 'Container Runtimes', 'CGroups v2'],
      outdatedSkills: ['SysV init', 'Ext3 FS', '32-bit x86 Arch'],
    },
    {
      id: 'p3',
      courseCode: 'CS-5090',
      courseTitle: 'Cloud Computing & Serverless Architecture',
      department: 'Computer Engineering',
      semester: 'VI',
      academicYear: '2024 - 2025',
      curriculumVersion: '1.8',
      date: 'May 18, 2025',
      alignmentScore: 95,
      coveragePercentage: 88.5,
      totalSkills: 160,
      coveredSkills: 142,
      missingSkillsCount: 12,
      outdatedSkillsCount: 6,
      status: 'Completed',
      missingSkills: ['Cloudflare Workers', 'Wasmer', 'OpenTelemetry'],
      outdatedSkills: ['EC2 Classic', 'Docker Swarm'],
    },
    {
      id: 'p4',
      courseCode: 'CS-2020',
      courseTitle: 'Data Structures and Algorithms',
      department: 'Computer Science and Engineering',
      semester: 'IV',
      academicYear: '2024 - 2025',
      curriculumVersion: '1.0',
      date: 'May 10, 2025',
      alignmentScore: 88,
      coveragePercentage: 56.8,
      totalSkills: 162,
      coveredSkills: 92,
      missingSkillsCount: 48,
      outdatedSkillsCount: 22,
      status: 'Completed',
      missingSkills: ['Docker', 'Kubernetes', 'LangChain', 'GraphRAG', 'Neo4j', 'FastAPI'],
      outdatedSkills: ['jQuery', 'SOAP', 'AngularJS', 'Bootstrap 3'],
    },
    {
      id: 'p5',
      courseCode: 'CS-4080',
      courseTitle: 'Database Systems & Distributed Storage',
      department: 'Information Technology',
      semester: 'IV',
      academicYear: '2024 - 2025',
      curriculumVersion: '1.2',
      date: 'Apr 29, 2025',
      alignmentScore: 68,
      coveragePercentage: 52.0,
      totalSkills: 150,
      coveredSkills: 78,
      missingSkillsCount: 52,
      outdatedSkillsCount: 20,
      status: 'In Progress',
      missingSkills: ['Vector Databases', 'Milvus', 'Pinecone', 'RAG Search', 'CockroachDB'],
      outdatedSkills: ['Oracle 10g', 'Sybase', 'MS Access'],
    },
  ]);

  const [selectedAnalysisRecord, setSelectedAnalysisRecord] = useState<PastAnalysisRecord | undefined>();

  // Interactive Drawers & Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCourseForWorkspace, setSelectedCourseForWorkspace] = useState<string | null>(null);

  // Upload Modal State
  const [uploadStep, setUploadStep] = useState<'select' | 'processing' | 'complete'>('select');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [courseCodeInput, setCourseCodeInput] = useState('CS-8042');
  const [courseTitleInput, setCourseTitleInput] = useState('Distributed Systems & Cloud Security');

  // Curricula Overview Table Data
  const [curriculaList, setCurriculaList] = useState<CurriculumItem[]>([
    {
      id: '1',
      code: 'CS-8042',
      courseName: 'Advanced Machine Learning & MLOps',
      department: 'Computer Engineering',
      semester: 'Fall 2026',
      uploadDate: 'Oct 12, 2026',
      status: 'Completed',
    },
    {
      id: '2',
      code: 'CS-3010',
      courseName: 'Operating Systems & Linux Kernel',
      department: 'Information Technology',
      semester: 'Spring 2026',
      uploadDate: 'Oct 10, 2026',
      status: 'In Progress',
    },
    {
      id: '3',
      code: 'CS-4080',
      courseName: 'Database Systems & Distributed Storage',
      department: 'Information Technology',
      semester: 'Fall 2026',
      uploadDate: 'Oct 08, 2026',
      status: 'Pending',
    },
    {
      id: '4',
      code: 'CS-5090',
      courseName: 'Cloud Computing & Serverless Architecture',
      department: 'Computer Engineering',
      semester: 'Spring 2026',
      uploadDate: 'Sep 28, 2026',
      status: 'Completed',
    },
    {
      id: '5',
      code: 'CS-2020',
      courseName: 'Data Structures & Algorithmic Complexity',
      department: 'Computer Science',
      semester: 'Fall 2026',
      uploadDate: 'Sep 20, 2026',
      status: 'Completed',
    },
  ]);

  // Recent Activity Timeline Data
  const activities: ActivityItem[] = [
    {
      id: 'a1',
      courseCode: 'CS-8042',
      title: 'MLOps & GPU Cluster Audit Completed',
      status: 'completed',
      timestamp: '2h ago',
    },
    {
      id: 'a2',
      courseCode: 'CS-3010',
      title: 'Linux Kernel Lab Gap Flagged for Review',
      status: 'pending',
      timestamp: '4h ago',
    },
    {
      id: 'a3',
      courseCode: 'CS-5090',
      title: 'Serverless Unit Modernization Applied',
      status: 'completed',
      timestamp: 'Yesterday',
    },
    {
      id: 'a4',
      courseCode: 'CS-4080',
      title: 'Vector Database Module Under Committee Audit',
      status: 'in_progress',
      timestamp: '2 days ago',
    },
  ];

  // Upload Simulation
  const handleSimulateUpload = () => {
    if (!uploadedFileName) return;
    setUploadStep('processing');
    setTimeout(() => {
      setUploadStep('complete');
      const newItem: CurriculumItem = {
        id: Date.now().toString(),
        code: courseCodeInput || 'CS-9010',
        courseName: courseTitleInput || uploadedFileName.replace('.pdf', ''),
        department: 'Computer Engineering',
        semester: 'Fall 2026',
        uploadDate: 'Just now',
        status: 'In Progress',
      };
      setCurriculaList([newItem, ...curriculaList]);
    }, 2000);
  };

  const handleAddNewAnalysisRecord = (newRecord: PastAnalysisRecord) => {
    setPastAnalyses((prev) => [newRecord, ...prev]);
  };

  const handleDeleteAnalysisRecord = (id: string) => {
    setPastAnalyses((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <DashboardLayout
      theme={theme}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onOpenUpload={() => setActiveTab('upload')}
      collapsed={sidebarCollapsed}
      onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      onToggleTheme={onToggleTheme}
      onNavigateLanding={onNavigateLanding}
      onSignOut={handleSignOut}
      headerGreeting="Dr. Ananya"
      headerSubtitle="Here's an overview of your curriculum analyses."
    >
      {/* Dynamic Sub-Views */}
      {activeTab === 'upload' ? (
        <UploadCurriculumPage
          theme={theme}
          onNavigateGraph={() => setActiveTab('graph')}
          onNavigateRecommendations={() => setActiveTab('recommendations')}
          onNavigateDashboard={() => setActiveTab('dashboard')}
          onNavigatePastAnalysis={() => setActiveTab('past_analysis')}
          onAnalysisComplete={handleAddNewAnalysisRecord}
        />
      ) : activeTab === 'past_analysis' ? (
        <PastAnalysisPage
          theme={theme}
          records={pastAnalyses}
          onSelectAnalysis={(record) => {
            setSelectedAnalysisRecord(record);
            setActiveTab('view_analysis_report');
          }}
          onNavigateGraph={() => setActiveTab('graph')}
          onNavigateRecommendations={() => setActiveTab('recommendations')}
          onOpenUpload={() => setActiveTab('upload')}
          onDeleteRecord={handleDeleteAnalysisRecord}
        />
      ) : activeTab === 'view_analysis_report' ? (
        <AnalysisResultsPage
          theme={theme}
          record={selectedAnalysisRecord}
          onNavigateGraph={() => setActiveTab('graph')}
          onNavigateRecommendations={() => setActiveTab('recommendations')}
          onNavigateDashboard={() => setActiveTab('dashboard')}
          onNavigatePastAnalysis={() => setActiveTab('past_analysis')}
          onExportReport={() => window.print()}
        />
      ) : activeTab === 'workspace' ? (
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
      ) : activeTab === 'settings' ? (
        <SettingsPage
          theme={theme}
          onToggleTheme={onToggleTheme}
          onNavigateHelp={() => setActiveTab('help')}
        />
      ) : (
        /* REDESIGNED DASHBOARD MAIN VIEW */
        <div className="space-y-6">
          {/* SECTION 1: FIVE STAT CARDS IN ONE ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard
              theme={theme}
              title="Total Curricula"
              metric={24}
              subtitle="Active & Archived Curricula"
              icon={<FolderKanban className="w-5 h-5" />}
              trendData={[12, 15, 18, 16, 20, 22, 24]}
            />
            <StatCard
              theme={theme}
              title="Completed"
              metric={18}
              subtitle="Fully Analyzed & Verified"
              icon={<CheckCircle2 className="w-5 h-5 text-[#43D854]" />}
              trendData={[8, 10, 12, 14, 15, 17, 18]}
            />
            <StatCard
              theme={theme}
              title="In Progress"
              metric={4}
              subtitle="Under Active Audit"
              icon={<Clock className="w-5 h-5 text-[#60A5FA]" />}
              trendData={[6, 5, 4, 6, 5, 4, 4]}
              trendColor="#60A5FA"
            />
            <StatCard
              theme={theme}
              title="Pending"
              metric={2}
              subtitle="Action Required"
              icon={<AlertTriangle className="w-5 h-5 text-[#FBBF24]" />}
              trendData={[5, 4, 3, 4, 3, 2, 2]}
              trendColor="#FBBF24"
            />
            <StatCard
              theme={theme}
              title="Average Gap Score"
              metric="88%"
              subtitle="+4.2% overall alignment"
              icon={<TrendingUp className="w-5 h-5 text-[#43D854]" />}
              trendData={[72, 75, 78, 81, 84, 86, 88]}
            />
          </div>

          {/* SECTION 2: MAIN CONTENT TABLE (8 COLS) + RIGHT PANEL CARDS (4 COLS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Large Table Card */}
            <div className="lg:col-span-8">
              <DataTable
                theme={theme}
                items={curriculaList}
                onRowClick={(item) => {
                  setSelectedCourseForWorkspace(`${item.code} - ${item.courseName}`);
                }}
                onViewAll={() => setActiveTab('library')}
                onFilterClick={() => { }}
              />
            </div>

            {/* Right 4 Cols: Information Panel (Recent Analyses & Getting Started) */}
            <div className="lg:col-span-4 space-y-6">
              <ActivityList
                theme={theme}
                activities={activities}
                onViewAll={() => setActiveTab('workspace')}
              />

              <GettingStartedCard
                theme={theme}
                onUploadClick={() => setShowUploadModal(true)}
              />
            </div>
          </div>


        </div>
      )}

      {/* UPLOAD SYLLABUS MODAL */}
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
              className="relative w-full max-w-xl rounded-[18px] border p-6 sm:p-8 shadow-2xl z-10"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl border cursor-pointer"
                style={{
                  backgroundColor: tokens.inputBg,
                  borderColor: tokens.border,
                  color: tokens.textSecondary,
                }}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-2"
                    style={{
                      backgroundColor: `${tokens.primaryAccent}15`,
                      color: tokens.primaryAccent,
                    }}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Syllabus File</span>
                  </div>
                  <h3 className="font-bold text-2xl" style={{ color: tokens.textPrimary }}>
                    Drop Course Syllabus
                  </h3>
                  <p className="text-xs mt-1" style={{ color: tokens.textSecondary }}>
                    Upload PDF, DOCX, or LaTeX files. AI will extract learning outcomes, missing skills, and ABET rubrics.
                  </p>
                </div>

                {uploadStep === 'select' && (
                  <div className="space-y-4">
                    <div
                      onClick={() => setUploadedFileName('Syllabus_Advanced_MLOps_2026.pdf')}
                      className="border-2 border-dashed rounded-[18px] p-8 text-center space-y-3 cursor-pointer transition-colors"
                      style={{
                        borderColor: uploadedFileName ? tokens.primaryAccent : tokens.border,
                        backgroundColor: uploadedFileName ? `${tokens.primaryAccent}10` : tokens.inputBg,
                      }}
                    >
                      <Upload className="w-10 h-10 mx-auto" style={{ color: tokens.primaryAccent }} />
                      <div>
                        <p className="font-bold text-sm" style={{ color: tokens.textPrimary }}>
                          {uploadedFileName ? uploadedFileName : 'Click or Drag & Drop Syllabus File Here'}
                        </p>
                        <p className="text-xs mt-1" style={{ color: tokens.textSecondary }}>
                          Supports .pdf, .docx, .txt, .tex (Max 25MB)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: tokens.textSecondary }}>
                          Course Code
                        </label>
                        <input
                          type="text"
                          value={courseCodeInput}
                          onChange={(e) => setCourseCodeInput(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-[12px] border outline-none"
                          style={{
                            backgroundColor: tokens.inputBg,
                            borderColor: tokens.border,
                            color: tokens.textPrimary,
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: tokens.textSecondary }}>
                          Course Title
                        </label>
                        <input
                          type="text"
                          value={courseTitleInput}
                          onChange={(e) => setCourseTitleInput(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-[12px] border outline-none"
                          style={{
                            backgroundColor: tokens.inputBg,
                            borderColor: tokens.border,
                            color: tokens.textPrimary,
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSimulateUpload}
                      disabled={!uploadedFileName}
                      className="w-full py-3 text-xs font-bold rounded-[14px] shadow-md transition-all cursor-pointer disabled:opacity-50 text-black"
                      style={{
                        backgroundColor: tokens.primaryAccent,
                      }}
                    >
                      Run AI Parsing & Skill Audit
                    </button>
                  </div>
                )}

                {uploadStep === 'processing' && (
                  <div className="text-center py-8 space-y-4">
                    <RefreshCw className="w-10 h-10 animate-spin mx-auto" style={{ color: tokens.primaryAccent }} />
                    <div>
                      <h4 className="font-bold text-lg" style={{ color: tokens.textPrimary }}>
                        AI Engine Processing Syllabus
                      </h4>
                      <p className="text-xs font-mono mt-1" style={{ color: tokens.primaryAccent }}>
                        Extracting units, matching ABET outcomes, analyzing job market gaps...
                      </p>
                    </div>
                  </div>
                )}

                {uploadStep === 'complete' && (
                  <div className="text-center py-6 space-y-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto border"
                      style={{
                        backgroundColor: `${tokens.primaryAccent}20`,
                        borderColor: tokens.primaryAccent,
                        color: tokens.primaryAccent,
                      }}
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl" style={{ color: tokens.textPrimary }}>
                        Syllabus Analysis Completed!
                      </h4>
                      <p className="text-xs mt-1" style={{ color: tokens.textSecondary }}>
                        Added to your active curriculum projects list with 89% alignment score.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowUploadModal(false);
                        setUploadStep('select');
                        setUploadedFileName('');
                      }}
                      className="px-6 py-2.5 text-xs font-bold rounded-[14px] text-black"
                      style={{ backgroundColor: tokens.primaryAccent }}
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

      {/* COURSE WORKSPACE DRAWER */}
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
              className="relative w-full max-w-2xl h-full shadow-2xl p-6 sm:p-8 overflow-y-auto space-y-6 z-10 border-l"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            >
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: tokens.border }}>
                <div>
                  <span className="text-xs font-mono font-bold" style={{ color: tokens.primaryAccent }}>
                    COURSE WORKSPACE
                  </span>
                  <h3 className="font-bold text-2xl" style={{ color: tokens.textPrimary }}>
                    {selectedCourseForWorkspace}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCourseForWorkspace(null)}
                  className="p-2 rounded-xl border cursor-pointer"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                    color: tokens.textSecondary,
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div
                  className="p-4 rounded-[14px] border space-y-2"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">Course Outcome Audit Score</span>
                    <span className="font-bold font-mono text-base" style={{ color: tokens.primaryAccent }}>
                      89 / 100
                    </span>
                  </div>
                  <p style={{ color: tokens.textSecondary }}>
                    High alignment with ABET Criterion 3 Student Outcomes. Minor gaps detected in modern MLOps telemetry.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-sm" style={{ color: tokens.primaryAccent }}>
                    1. Extracted Syllabus Units
                  </h4>
                  <div
                    className="p-3 rounded-xl border space-y-1"
                    style={{ backgroundColor: tokens.bg, borderColor: tokens.border }}
                  >
                    <span className="font-bold" style={{ color: tokens.primaryAccent }}>
                      Unit 1: GPU Cluster Architecture & Parallel CUDA
                    </span>
                    <p style={{ color: tokens.textSecondary }}>
                      NVIDIA H100 Tensor Cores, NVLink interconnects, Distributed CUDA kernels.
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-xl border space-y-1"
                    style={{ backgroundColor: tokens.bg, borderColor: tokens.border }}
                  >
                    <span className="font-bold" style={{ color: tokens.primaryAccent }}>
                      Unit 2: Large Model Parallelism & vLLM
                    </span>
                    <p style={{ color: tokens.textSecondary }}>
                      Tensor Parallelism, PagedAttention algorithms, FlashAttention-3 integration.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-sm" style={{ color: tokens.primaryAccent }}>
                    2. Recommended Industry Additions
                  </h4>
                  <div
                    className="p-3 rounded-xl border space-y-1"
                    style={{
                      backgroundColor: `${tokens.primaryAccent}15`,
                      borderColor: `${tokens.primaryAccent}30`,
                      color: tokens.primaryAccent,
                    }}
                  >
                    <span className="font-bold">✓ Add Model Context Protocol (MCP)</span>
                    <p className="text-[11px]">340% demand surge in tech job listings.</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCourseForWorkspace(null)}
                    className="flex-1 py-3 text-xs font-bold text-black rounded-[14px] shadow-md cursor-pointer"
                    style={{ backgroundColor: tokens.primaryAccent }}
                  >
                    Export Updated ABET Syllabus PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};
