import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  FileText,
  Cpu,
  Network,
  Database,
  Brain,
  Check,
  Clock,
  Sparkles,
  Lock,
  FileCheck
} from 'lucide-react';
import { ThemeMode } from '../types';
import { getThemeTokens } from '../theme/tokens';
import { Card } from './dashboard/Card';

interface AnalyzingCurriculumPageProps {
  theme: ThemeMode;
  courseTitle?: string;
  onComplete?: () => void;
}

export type StepStatus = 'Completed' | 'In Progress' | 'Pending';

export interface PipelineStep {
  id: number;
  title: string;
  shortTitle: string;
  icon: React.ElementType;
  completedDesc: string;
  inProgressDesc: string;
  pendingDesc: string;
}

export const AnalyzingCurriculumPage: React.FC<AnalyzingCurriculumPageProps> = ({
  theme,
  courseTitle = 'Data Structures & Algorithms',
}) => {
  const tokens = getThemeTokens(theme);

  const steps: PipelineStep[] = [
    {
      id: 1,
      title: '1. Storage Upload',
      shortTitle: 'Upload',
      icon: UploadCloud,
      completedDesc: 'File uploaded to Supabase Storage.',
      inProgressDesc: 'Uploading curriculum to storage...',
      pendingDesc: 'Pending storage upload.',
    },
    {
      id: 2,
      title: '2. Text Extraction',
      shortTitle: 'Extraction',
      icon: FileText,
      completedDesc: 'Extracted PDF text content.',
      inProgressDesc: 'Extracting syllabus text...',
      pendingDesc: 'Pending text extraction.',
    },
    {
      id: 3,
      title: '3. Gemini Analysis',
      shortTitle: 'Gemini',
      icon: Cpu,
      completedDesc: 'Extracted structured course units.',
      inProgressDesc: 'Analyzing curriculum with Gemini...',
      pendingDesc: 'Pending Gemini extraction.',
    },
    {
      id: 4,
      title: '4. Neo4j Graph',
      shortTitle: 'Neo4j Graph',
      icon: Network,
      completedDesc: 'Created Neo4j Knowledge Graph.',
      inProgressDesc: 'Creating Neo4j Knowledge Graph...',
      pendingDesc: 'Pending graph mapping.',
    },
    {
      id: 5,
      title: '5. Gap Analysis',
      shortTitle: 'Gap Analysis',
      icon: Database,
      completedDesc: 'Matched against Industry Graph.',
      inProgressDesc: 'Running Curriculum Gap Analysis...',
      pendingDesc: 'Pending gap report.',
    },
    {
      id: 6,
      title: '6. AI Recommendations',
      shortTitle: 'Recommendations',
      icon: Brain,
      completedDesc: 'Generated GraphRAG recommendations.',
      inProgressDesc: 'Generating AI Recommendations...',
      pendingDesc: 'Pending recommendations.',
    },
  ];

  // Real pipeline progress status messages
  const liveStatusMessages = [
    'Uploading curriculum to Supabase Storage...',
    'Extracting syllabus text from PDF...',
    'Analyzing curriculum structure with Gemini...',
    'Generating text embeddings & vector indexing...',
    'Creating Neo4j Knowledge Graph relationships...',
    'Comparing against Industry Benchmarks...',
    'Running Curriculum Gap Analysis...',
    'Generating AI Recommendations (GraphRAG)...',
    'Building Revised Syllabus & downloadable PDF...',
    'Finalizing Report...',
  ];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [statusMsgIndex, setStatusMsgIndex] = useState<number>(0);

  // Smooth step advancement
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < 6 ? prev + 1 : prev));
    }, 4500);

    const msgInterval = setInterval(() => {
      setStatusMsgIndex((prev) => (prev + 1) % liveStatusMessages.length);
    }, 2500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(msgInterval);
    };
  }, [liveStatusMessages.length]);

  const progressPercentage = Math.min(95, Math.round((currentStep / 6) * 100));

  const getStepStatus = (stepId: number): StepStatus => {
    if (currentStep > stepId) return 'Completed';
    if (currentStep === stepId) return 'In Progress';
    return 'Pending';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center py-8 px-4 max-w-[1600px] mx-auto space-y-6 relative overflow-hidden"
    >
      {/* Header Sparkle & Titles */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
          style={{
            backgroundColor: 'rgba(91, 225, 106, 0.12)',
            color: '#5BE16A',
            border: '1px solid rgba(91, 225, 106, 0.3)',
            boxShadow: '0 0 25px rgba(91, 225, 106, 0.2)',
          }}
        >
          <Sparkles className="w-7 h-7" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
          Analyzing Curriculum Pipeline
        </h1>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: tokens.textSecondary }}>
          Executing end-to-end AI Curriculum Gap Analysis & Neo4j Knowledge Graph pipeline for <span className="font-semibold text-emerald-400">{courseTitle}</span>.
        </p>
      </div>

      {/* Main Full-Screen Card */}
      <Card
        theme={theme}
        hoverEffect={false}
        className="w-full p-6 sm:p-10 border space-y-8 backdrop-blur-xl relative overflow-hidden shadow-2xl rounded-[20px]"
      >
        {/* Soft Background Neon Glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: '#5BE16A' }}
        />

        {/* 6-Step Horizontal Pipeline Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const status = getStepStatus(step.id);
            const isCompleted = status === 'Completed';
            const isInProgress = status === 'In Progress';
            const isPending = status === 'Pending';
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.id} className="relative flex flex-col items-center text-center space-y-3 group">
                <div className="relative z-10">
                  <motion.div
                    animate={isInProgress ? { scale: [1, 1.08, 1] } : {}}
                    transition={isInProgress ? { repeat: Infinity, duration: 1.5 } : {}}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                      isCompleted
                        ? 'border-2 border-[#5BE16A] bg-[#5BE16A]/15 text-[#5BE16A] shadow-[0_0_15px_rgba(91,225,106,0.3)]'
                        : isInProgress
                        ? 'border-2 border-[#5BE16A] bg-[#5BE16A]/25 text-[#5BE16A] shadow-[0_0_25px_rgba(91,225,106,0.6)]'
                        : 'border-2 border-dashed border-gray-600/50 bg-transparent text-gray-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />

                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#5BE16A] text-black flex items-center justify-center font-bold text-xs shadow-md"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                <div className="space-y-1 w-full">
                  <h4
                    className="text-xs font-bold truncate px-1"
                    style={{ color: isPending ? tokens.textMuted : tokens.textPrimary }}
                  >
                    {step.title}
                  </h4>

                  <div>
                    {isCompleted ? (
                      <span className="text-[11px] font-semibold text-[#5BE16A]">Completed</span>
                    ) : isInProgress ? (
                      <span className="text-[11px] font-semibold text-[#5BE16A] animate-pulse">In Progress</span>
                    ) : (
                      <span className="text-[11px] font-semibold" style={{ color: tokens.textMuted }}>Pending</span>
                    )}
                  </div>

                  <p className="text-[11px] leading-snug px-1" style={{ color: isPending ? tokens.textMuted : tokens.textSecondary }}>
                    {isCompleted ? step.completedDesc : isInProgress ? step.inProgressDesc : step.pendingDesc}
                  </p>
                </div>

                {!isLast && (
                  <div className="hidden lg:block absolute top-7 -right-1/2 w-full h-[2px] z-0 -translate-y-1/2 pointer-events-none">
                    <div
                      className="h-full transition-all duration-700 ease-out"
                      style={{
                        backgroundColor: currentStep > step.id ? '#5BE16A' : 'rgba(100, 116, 139, 0.25)',
                        boxShadow: currentStep > step.id ? '0 0 10px rgba(91, 225, 106, 0.5)' : 'none',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Animated Progress Bar & Live Status Message */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-gray-400">Pipeline Execution Progress</span>
            <span className="font-mono text-[#5BE16A] font-bold text-base">{progressPercentage}%</span>
          </div>

          <div className="w-full h-3.5 rounded-full overflow-hidden p-0.5" style={{ backgroundColor: tokens.inputBg }}>
            <motion.div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                backgroundColor: '#5BE16A',
                boxShadow: '0 0 15px rgba(91, 225, 106, 0.8)',
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          {/* Live Progress Status Message */}
          <div className="h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={statusMsgIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-xs font-mono font-medium text-[#5BE16A]"
              >
                {liveStatusMessages[statusMsgIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Info Card Footer */}
        <div className="flex items-center justify-center gap-2 text-xs pt-2" style={{ color: tokens.textMuted }}>
          <Lock className="w-3.5 h-3.5 text-[#5BE16A]" />
          <span>Curriculum processing in progress. You will automatically be navigated to Analysis Results upon completion.</span>
        </div>
      </Card>
    </motion.div>
  );
};
