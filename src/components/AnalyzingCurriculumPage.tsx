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
  Lock
} from 'lucide-react';
import { ThemeMode } from '../types';
import { getThemeTokens } from '../theme/tokens';
import { Card } from './dashboard/Card';

interface AnalyzingCurriculumPageProps {
  theme: ThemeMode;
  courseTitle?: string;
  onComplete: () => void;
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
  onComplete,
}) => {
  const tokens = getThemeTokens(theme);

  const steps: PipelineStep[] = [
    {
      id: 1,
      title: '1. Upload',
      shortTitle: 'Upload',
      icon: UploadCloud,
      completedDesc: 'File uploaded successfully.',
      inProgressDesc: 'Uploading files...',
      pendingDesc: 'Pending file upload.',
    },
    {
      id: 2,
      title: '2. Text Extraction',
      shortTitle: 'Text Extraction',
      icon: FileText,
      completedDesc: 'Extracted text from curriculum.',
      inProgressDesc: 'Extracting course outcomes...',
      pendingDesc: 'Pending text extraction.',
    },
    {
      id: 3,
      title: '3. Embeddings',
      shortTitle: 'Embeddings',
      icon: Cpu,
      completedDesc: 'Generated text embeddings.',
      inProgressDesc: 'Generating text embeddings...',
      pendingDesc: 'Pending embeddings.',
    },
    {
      id: 4,
      title: '4. Neo4j Skill Mapping',
      shortTitle: 'Neo4j Skill Mapping',
      icon: Network,
      completedDesc: 'Mapped skills to ontology graph.',
      inProgressDesc: 'Matching ontology graph...',
      pendingDesc: 'Pending skill graph.',
    },
    {
      id: 5,
      title: '5. Vector Similarity Search',
      shortTitle: 'Vector Similarity Search',
      icon: Database,
      completedDesc: 'Compared against industry database.',
      inProgressDesc: 'Comparing against industry database...',
      pendingDesc: 'Pending market search.',
    },
    {
      id: 6,
      title: '6. LLM Recommendation Generation',
      shortTitle: 'LLM Recommendation Generation',
      icon: Brain,
      completedDesc: 'Generated AI recommendations.',
      inProgressDesc: 'Generating recommendations...',
      pendingDesc: 'Pending recommendations.',
    },
  ];

  // Live status fading messages
  const liveStatusMessages = [
    'Extracting course outcomes...',
    'Generating text embeddings...',
    'Matching ontology graph...',
    'Comparing against industry database...',
    'Generating recommendations...',
  ];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [countdown, setCountdown] = useState<number>(28);
  const [statusMsgIndex, setStatusMsgIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Live message cycle
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setStatusMsgIndex((prev) => (prev + 1) % liveStatusMessages.length);
    }, 2200);
    return () => clearInterval(msgInterval);
  }, [liveStatusMessages.length]);

  // Step progression sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(2), 1200);
    const timer2 = setTimeout(() => setCurrentStep(3), 3000);
    const timer3 = setTimeout(() => setCurrentStep(4), 4800);
    const timer4 = setTimeout(() => setCurrentStep(5), 6800);
    const timer5 = setTimeout(() => setCurrentStep(6), 9000);
    const timer6 = setTimeout(() => {
      setCurrentStep(7);
      setIsFinished(true);
    }, 11200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (countdown <= 0 || isFinished) return;
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 400);

    return () => clearInterval(interval);
  }, [countdown, isFinished]);

  // Transition to completion automatically
  useEffect(() => {
    if (isFinished && !isExiting) {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 750); // 750ms Vercel ease-in-out transition duration
      return () => clearTimeout(exitTimer);
    }
  }, [isFinished, isExiting, onComplete]);

  // Progress percentage calculation
  const progressPercentage = isFinished
    ? 100
    : Math.min(99, Math.round(((Math.min(currentStep, 6) - 0.2) / 6) * 100));

  const getStepStatus = (stepId: number): StepStatus => {
    if (currentStep > stepId) return 'Completed';
    if (currentStep === stepId) return 'In Progress';
    return 'Pending';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 0.98 : 1,
        y: isExiting ? -12 : 0,
      }}
      transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen flex flex-col justify-center items-center py-8 px-4 max-w-[1600px] mx-auto space-y-6 relative overflow-hidden"
    >
      {/* Vercel Expanding Neon Line on Exit */}
      {isExiting && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          className="fixed top-0 left-0 h-1 bg-[#5BE16A] shadow-[0_0_15px_#5BE16A] z-50 pointer-events-none"
        />
      )}

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

        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ color: tokens.textPrimary }}
        >
          Analyzing Curriculum
        </h1>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: tokens.textSecondary }}>
          Our AI is comparing your curriculum with real-world industry requirements.
        </p>
      </div>

      {/* Main Full-Screen Glassmorphism Card */}
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
                {/* Stepper Node Circle */}
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

                    {/* Animated Checkmark Badge for Completed */}
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

                {/* Step Title & Status Description */}
                <div className="space-y-1 w-full">
                  <h4
                    className="text-xs font-bold truncate px-1"
                    style={{ color: isPending ? tokens.textMuted : tokens.textPrimary }}
                  >
                    {step.title}
                  </h4>

                  {/* Status Label */}
                  <div>
                    {isCompleted ? (
                      <span className="text-[11px] font-semibold text-[#5BE16A]">
                        Completed
                      </span>
                    ) : isInProgress ? (
                      <span className="text-[11px] font-semibold text-[#5BE16A] animate-pulse">
                        In Progress
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold" style={{ color: tokens.textMuted }}>
                        Pending
                      </span>
                    )}
                  </div>

                  <p
                    className="text-[11px] leading-snug px-1"
                    style={{ color: isPending ? tokens.textMuted : tokens.textSecondary }}
                  >
                    {isCompleted
                      ? step.completedDesc
                      : isInProgress
                        ? step.inProgressDesc
                        : step.pendingDesc}
                  </p>
                </div>

                {/* Animated Connecting Line from Left to Right */}
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

        {/* Animated Progress Bar & Live Percentage */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-gray-400">Overall Progress</span>
            <span className="font-mono text-[#5BE16A] font-bold text-base">
              {progressPercentage}%
            </span>
          </div>

          <div
            className="w-full h-3.5 rounded-full overflow-hidden p-0.5"
            style={{ backgroundColor: tokens.inputBg }}
          >
            <motion.div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                backgroundColor: '#5BE16A',
                boxShadow: '0 0 15px rgba(91, 225, 106, 0.8)',
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          {/* Live Status Fading Message */}
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

        {/* Info Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Estimated Time Remaining Card */}
          <div
            className="p-4 rounded-[16px] border flex items-center gap-4"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: tokens.border,
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(91, 225, 106, 0.15)',
                color: '#5BE16A',
              }}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-medium block" style={{ color: tokens.textSecondary }}>
                Estimated remaining time
              </span>
              <span className="text-base font-bold font-mono" style={{ color: tokens.textPrimary }}>
                {isFinished ? 'Analysis Complete!' : `${countdown} seconds`}
              </span>
            </div>
          </div>

          {/* Automatic Redirect Notice Card */}
          <div
            className="p-4 rounded-[16px] border flex items-center gap-4"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: tokens.border,
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(91, 225, 106, 0.15)',
                color: '#5BE16A',
              }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold block" style={{ color: tokens.textPrimary }}>
                Automatic Route Transition
              </span>
              <span className="text-[11px] leading-tight block mt-0.5" style={{ color: tokens.textSecondary }}>
                You will automatically be redirected once analysis completes.
              </span>
            </div>
          </div>
        </div>

        {/* Security Notice Footer */}
        <div className="flex items-center justify-center gap-2 text-xs pt-2" style={{ color: tokens.textMuted }}>
          <Lock className="w-3.5 h-3.5 text-[#5BE16A]" />
          <span>Your curriculum is securely processed. We never share your information.</span>
        </div>
      </Card>
    </motion.div>
  );
};
