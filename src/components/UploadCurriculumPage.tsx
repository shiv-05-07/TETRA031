import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  FileText,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Play,
  Sparkles,
  Cpu,
  Network,
  RefreshCw,
  ArrowRight,
  FileCode
} from 'lucide-react';
import { ThemeMode } from '../types';
import { getThemeTokens } from '../theme/tokens';
import { Card } from './dashboard/Card';
import { AnalyzingCurriculumPage } from './AnalyzingCurriculumPage';
import { AnalysisResultsPage } from './AnalysisResultsPage';

interface UploadCurriculumPageProps {
  theme: ThemeMode;
  onNavigateGraph: () => void;
  onNavigateRecommendations: () => void;
  onNavigateDashboard: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'docx' | 'other';
  status: 'Ready' | 'Uploading';
}

export const UploadCurriculumPage: React.FC<UploadCurriculumPageProps> = ({
  theme,
  onNavigateGraph,
  onNavigateRecommendations,
  onNavigateDashboard,
}) => {
  const tokens = getThemeTokens(theme);

  // Workflow states: 'form' -> 'processing' -> 'results'
  const [workflowState, setWorkflowState] = useState<'form' | 'processing' | 'results'>('form');

  // Form State
  const [courseName, setCourseName] = useState('Data Structures and Algorithms');
  const [department, setDepartment] = useState('Computer Science and Engineering');
  const [semester, setSemester] = useState('IV');
  const [academicYear, setAcademicYear] = useState('2024 - 2025');
  const [curriculumVersion, setCurriculumVersion] = useState('1.0');

  // File Upload State
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: 'f1',
      name: 'CS2020_Data_Structures_Curriculum.pdf',
      size: '2.4 MB',
      type: 'pdf',
      status: 'Ready',
    },
    {
      id: 'f2',
      name: 'Course_Outcomes_and_Syllabus.docx',
      size: '1.1 MB',
      type: 'docx',
      status: 'Ready',
    },
  ]);

  const [isDragging, setIsDragging] = useState(false);

  // File Handlers
  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const isPdf = file.name.endsWith('.pdf');
      const isDocx = file.name.endsWith('.docx') || file.name.endsWith('.doc');

      const newFile: UploadedFile = {
        id: `f_${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: isPdf ? 'pdf' : isDocx ? 'docx' : 'other',
        status: 'Ready',
      };
      setFiles((prev) => [...prev, newFile]);
    }
  };

  // Start analysis pipeline simulation
  const handleStartAnalysis = () => {
    if (files.length === 0) return;
    setWorkflowState('processing');
  };

  // Render AI Processing Screen
  if (workflowState === 'processing') {
    return (
      <AnalyzingCurriculumPage
        theme={theme}
        courseTitle={courseName}
        onComplete={() => {
          setWorkflowState('results');
        }}
      />
    );
  }

  // Render Temporary Analysis Results Workflow Screen
  if (workflowState === 'results') {
    return (
      <AnalysisResultsPage
        theme={theme}
        courseTitle={courseName}
        onNavigateGraph={onNavigateGraph}
        onNavigateRecommendations={onNavigateRecommendations}
        onNavigateDashboard={onNavigateDashboard}
        onExportReport={() => window.print()}
      />
    );
  }

  // Render Upload Curriculum Form
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header Title */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
          style={{ color: tokens.textPrimary }}
        >
          Upload Curriculum
        </h1>
        <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
          Upload syllabus documents to extract skills and compare against real-time industry demands.
        </p>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Drag & Drop Zone + Uploaded Files List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Drag & Drop File Card */}
          <Card
            theme={theme}
            hoverEffect={false}
            className={`p-8 border-2 border-dashed text-center relative overflow-hidden transition-all duration-300 ${
              isDragging ? 'border-[#5BE16A] bg-[#5BE16A]/5' : ''
            }`}
            style={{
              borderColor: isDragging ? tokens.primaryAccent : tokens.border,
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="max-w-md mx-auto space-y-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-md transition-transform hover:scale-105"
                style={{
                  backgroundColor: 'rgba(91, 225, 106, 0.12)',
                  color: tokens.primaryAccent,
                  border: `1px solid ${tokens.primaryAccent}30`,
                }}
              >
                <Upload className="w-8 h-8 text-[#5BE16A]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                  Drag & Drop Syllabus Document
                </h3>
                <p className="text-xs" style={{ color: tokens.textSecondary }}>
                  Supports PDF, DOCX, or plain text syllabus files up to 25MB.
                </p>
              </div>

              <div className="pt-2">
                <label className="inline-block">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        const isPdf = file.name.endsWith('.pdf');
                        const isDocx = file.name.endsWith('.docx') || file.name.endsWith('.doc');

                        const newFile: UploadedFile = {
                          id: `f_${Date.now()}`,
                          name: file.name,
                          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                          type: isPdf ? 'pdf' : isDocx ? 'docx' : 'other',
                          status: 'Ready',
                        };
                        setFiles((prev) => [...prev, newFile]);
                      }
                    }}
                    className="hidden"
                  />
                  <span
                    className="px-5 py-2.5 rounded-[12px] text-xs font-bold border inline-flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 shadow-sm"
                    style={{
                      backgroundColor: tokens.inputBg,
                      borderColor: tokens.border,
                      color: tokens.textPrimary,
                    }}
                  >
                    <FileText className="w-4 h-4 text-[#5BE16A]" />
                    <span>Browse Files</span>
                  </span>
                </label>
              </div>
            </div>
          </Card>

          {/* Uploaded Files Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                Attached Files ({files.length})
              </h3>
              {files.length > 0 && (
                <button
                  onClick={() => setFiles([])}
                  className="text-xs font-medium text-red-400 hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {files.length === 0 ? (
              <div
                className="p-6 rounded-[18px] border text-center text-xs font-medium"
                style={{ backgroundColor: tokens.cardBg, borderColor: tokens.border, color: tokens.textMuted }}
              >
                No files uploaded yet. Upload a syllabus document to begin analysis.
              </div>
            ) : (
              <div className="space-y-2.5">
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-[16px] border flex items-center justify-between gap-4 transition-colors"
                    style={{
                      backgroundColor: tokens.cardBg,
                      borderColor: tokens.border,
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor:
                            file.type === 'pdf'
                              ? 'rgba(239, 68, 68, 0.15)'
                              : 'rgba(59, 130, 246, 0.15)',
                          color: file.type === 'pdf' ? '#EF4444' : '#3B82F6',
                        }}
                      >
                        <FileCode className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        <span
                          className="text-xs font-bold block truncate"
                          style={{ color: tokens.textPrimary }}
                        >
                          {file.name}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span className="text-[#5BE16A] font-semibold">{file.status}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Course Metadata Form + Start Button */}
        <div className="lg:col-span-5 space-y-6">
          <Card theme={theme} hoverEffect={false} className="p-6 border space-y-5">
            <div className="border-b pb-4" style={{ borderColor: tokens.border }}>
              <h3 className="text-base font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                Course Metadata
              </h3>
              <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                Enter metadata to contextualize AI skill gap analysis.
              </p>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: tokens.textSecondary }}>
                  Course Title
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium rounded-[12px] border outline-none transition-all"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                    color: tokens.textPrimary,
                  }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: tokens.textSecondary }}>
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium rounded-[12px] border outline-none transition-all"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                    color: tokens.textPrimary,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: tokens.textSecondary }}>
                    Semester
                  </label>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-medium rounded-[12px] border outline-none transition-all"
                    style={{
                      backgroundColor: tokens.inputBg,
                      borderColor: tokens.border,
                      color: tokens.textPrimary,
                    }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: tokens.textSecondary }}>
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-medium rounded-[12px] border outline-none transition-all"
                    style={{
                      backgroundColor: tokens.inputBg,
                      borderColor: tokens.border,
                      color: tokens.textPrimary,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Start Analysis Primary CTA Button */}
            <div className="pt-3 border-t" style={{ borderColor: tokens.border }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartAnalysis}
                disabled={files.length === 0}
                className={`w-full py-3.5 rounded-[14px] font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{
                  backgroundColor: tokens.primaryAccent,
                  color: '#000000',
                  boxShadow: files.length > 0 ? `0 4px 14px ${tokens.primaryAccent}40` : 'none',
                }}
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Analyze Curriculum</span>
              </motion.button>
            </div>
          </Card>

          {/* Security Banner Card */}
          <div
            className="p-4 rounded-[18px] border flex items-center gap-3 text-xs"
            style={{
              backgroundColor: tokens.cardBg,
              borderColor: tokens.border,
            }}
          >
            <ShieldCheck className="w-5 h-5 text-[#5BE16A] flex-shrink-0" />
            <span style={{ color: tokens.textSecondary }}>
              Encrypted processing with Neo4j ontology mapping & vector search.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
