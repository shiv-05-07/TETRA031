import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Brain,
  Zap,
  Target,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Network,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ThemeMode } from '../types';
import { getThemeTokens } from '../theme/tokens';
import { Card } from './dashboard/Card';
import { CircularProgress } from './analysis/CircularProgress';
import { SkillPriorityTable } from './analysis/SkillPriorityTable';
import { PastAnalysisRecord } from './PastAnalysisPage';

interface AnalysisResultsPageProps {
  theme: ThemeMode;
  courseTitle?: string;
  department?: string;
  semester?: string;
  academicYear?: string;
  record?: PastAnalysisRecord;
  onNavigateGraph: () => void;
  onNavigateRecommendations: () => void;
  onNavigateDashboard?: () => void;
  onNavigatePastAnalysis?: () => void;
  onExportReport?: () => void;
}

export const AnalysisResultsPage: React.FC<AnalysisResultsPageProps> = ({
  theme,
  courseTitle,
  department,
  semester,
  academicYear,
  record,
  onNavigateGraph,
  onNavigateRecommendations,
  onNavigateDashboard,
  onNavigatePastAnalysis,
  onExportReport,
}) => {
  const tokens = getThemeTokens(theme);

  const displayTitle = record?.courseTitle || courseTitle || 'Data Structures and Algorithms';
  const displayDepartment = record?.department || department || 'Computer Science & Engineering';
  const displaySemester = record?.semester || semester || 'IV';
  const displayAcademicYear = record?.academicYear || academicYear || '2025–2026';
  const displayDate = record?.date || 'Just now';

  // Missing Skills Chips
  const missingSkills = record?.missingSkills || [
    'Docker',
    'Kubernetes',
    'LangChain',
    'GraphRAG',
    'Neo4j',
    'Prompt Engineering',
    'TensorFlow',
    'FastAPI',
    'CrewAI',
    'LLMOps',
    'Vector Databases',
    'Kafka',
    'Redis',
    'CI/CD',
    'MLOps',
    'PyTorch',
  ];

  // Outdated Skills Chips
  const outdatedSkills = record?.outdatedSkills || [
    'jQuery',
    'SOAP',
    'AngularJS',
    'Bootstrap 3',
    'Visual Basic',
    'Flash',
    'SVN',
    'Traditional PHP',
    'Oracle Forms',
    'Silverlight',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-8 max-w-[1600px] mx-auto pb-16"
    >
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-3">
          {onNavigatePastAnalysis && (
            <button
              onClick={onNavigatePastAnalysis}
              className="p-2.5 rounded-[12px] border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: tokens.inputBg,
                borderColor: tokens.border,
                color: tokens.textSecondary,
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Past Analysis</span>
            </button>
          )}
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
              style={{ color: tokens.textPrimary }}
            >
              Analysis Results
            </h1>
            <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
              Generated insights from your uploaded curriculum.
            </p>
          </div>
        </div>

        {/* Right CTA: Export Summary Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onExportReport || (() => window.print())}
          className="px-4 py-2.5 rounded-[14px] font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer text-black self-start md:self-auto"
          style={{
            backgroundColor: tokens.primaryAccent,
            boxShadow: `0 4px 14px ${tokens.primaryAccent}40`,
          }}
        >
          <Download className="w-4 h-4 text-black" />
          <span>Export Summary</span>
        </motion.button>
      </div>

      {/* CURRICULUM SUMMARY CARD */}
      <Card theme={theme} hoverEffect={false} className="p-6 border space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: `${tokens.primaryAccent}1F`,
                color: tokens.primaryAccent,
              }}
            >
              <FileText className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                {displayTitle}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: tokens.textSecondary }}>
                <span>{displayDepartment}</span>
                <span>•</span>
                <span>Semester {displaySemester}</span>
                <span>•</span>
                <span>Academic Year {displayAcademicYear}</span>
                <span>•</span>
                <span>Version 1.0</span>
              </div>
            </div>
          </div>

          {/* Completed Badge & Timestamp */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{
                backgroundColor: tokens.pillBgCompleted,
                color: tokens.pillTextCompleted,
              }}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed</span>
            </span>
            <span className="text-[11px] font-medium" style={{ color: tokens.textMuted }}>
              Analyzed on {displayDate}
            </span>
          </div>
        </div>
      </Card>

      {/* SECTION 1: AI ANALYSIS OVERVIEW (5 EQUAL CARDS) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.textMuted }}>
          1. Skill Coverage
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Skills */}
          <Card theme={theme} hoverEffect={true} className="p-5 border flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: tokens.textSecondary }}>
                Total Skills Identified
              </span>
              <Layers className="w-4 h-4" style={{ color: tokens.textMuted }} />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold font-mono tracking-tight" style={{ color: tokens.textPrimary }}>
                162
              </span>
            </div>
          </Card>

          {/* Card 2: Covered Skills */}
          <Card theme={theme} hoverEffect={true} className="p-5 border flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: tokens.textSecondary }}>
                Covered Skills
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono tracking-tight text-emerald-400">
                92
              </span>
              <span className="text-xs font-semibold text-emerald-400">56.8% of total</span>
            </div>
          </Card>

          {/* Card 3: Missing Skills */}
          <Card theme={theme} hoverEffect={true} className="p-5 border flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: tokens.textSecondary }}>
                Missing Skills
              </span>
              <AlertCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono tracking-tight text-red-400">
                48
              </span>
              <span className="text-xs font-semibold text-red-400">29.6% of total</span>
            </div>
          </Card>

          {/* Card 4: Outdated Skills */}
          <Card theme={theme} hoverEffect={true} className="p-5 border flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: tokens.textSecondary }}>
                Outdated Skills
              </span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono tracking-tight text-amber-400">
                22
              </span>
              <span className="text-xs font-semibold text-amber-400">13.6% of total</span>
            </div>
          </Card>

          {/* Card 5: Coverage Percentage Circular Gauge */}
          <Card theme={theme} hoverEffect={true} className="p-5 border flex flex-col items-center justify-center h-full text-center">
            <span className="text-xs font-semibold mb-2" style={{ color: tokens.textSecondary }}>
              Coverage Percentage
            </span>
            <CircularProgress percentage={56.8} size={72} strokeWidth={7} theme={theme} color="#5BE16A" />
          </Card>
        </div>
      </div>

      {/* SECTION 2: SEMANTIC GAP ANALYSIS (4 COLUMNS) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.textMuted }}>
          2. Semantic Gap Analysis
        </h3>

        <Card theme={theme} hoverEffect={false} className="p-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-800">
            {/* Card 1: Curriculum Similarity */}
            <div className="space-y-3 pt-4 lg:pt-0 lg:pr-6">
              <span className="text-xs font-bold block" style={{ color: tokens.textSecondary }}>
                Curriculum Similarity Score
              </span>
              <span className="text-3xl font-bold font-mono text-emerald-400 block">58%</span>
              <div className="w-full h-2 rounded-full bg-gray-700/30 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '58%' }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: tokens.textMuted }}>
                Text similarity alignment score comparing course syllabus topics against standard academic benchmarking.
              </p>
            </div>

            {/* Card 2: Industry Similarity */}
            <div className="space-y-3 pt-4 lg:pt-0 lg:px-6">
              <span className="text-xs font-bold block" style={{ color: tokens.textSecondary }}>
                Industry Similarity Score
              </span>
              <span className="text-3xl font-bold font-mono text-blue-400 block">86%</span>
              <div className="w-full h-2 rounded-full bg-gray-700/30 overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '86%' }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: tokens.textMuted }}>
                Industry relevance alignment based on real-time job market requirements and hiring trends.
              </p>
            </div>

            {/* Card 3: Overall Gap Gauge */}
            <div className="space-y-3 pt-4 lg:pt-0 lg:px-6 flex flex-col items-center text-center">
              <span className="text-xs font-bold block w-full text-left" style={{ color: tokens.textSecondary }}>
                Overall Gap Score
              </span>
              <div className="relative flex items-center justify-center my-1">
                <CircularProgress percentage={42} size={84} strokeWidth={8} theme={theme} color="#F59E0B" />
              </div>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                Moderate Gap
              </span>
              <p className="text-xs leading-relaxed" style={{ color: tokens.textMuted }}>
                Skills & topics to bridge for optimal industry alignment.
              </p>
            </div>

            {/* Card 4: Top Domain Gap */}
            <div className="space-y-3 pt-4 lg:pt-0 lg:pl-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: tokens.textSecondary }}>
                  Top Domain Gap
                </span>
                <span className="text-xs font-bold text-amber-400">Cloud Computing</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span style={{ color: tokens.textMuted }}>Curriculum Coverage</span>
                    <span className="font-semibold" style={{ color: tokens.textPrimary }}>60%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-700/30 overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: '60%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span style={{ color: tokens.textMuted }}>Industry Demand</span>
                    <span className="font-semibold" style={{ color: tokens.textPrimary }}>100%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-700/30 overflow-hidden">
                    <div className="h-full bg-blue-400" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="pt-1 flex justify-between font-bold">
                  <span style={{ color: tokens.textSecondary }}>Skill Gap</span>
                  <span className="text-red-400">40%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* SECTION 3: MISSING SKILLS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
              Missing Skills
            </h3>
            <p className="text-xs" style={{ color: tokens.textSecondary }}>
              Skills required by industry but absent from the uploaded curriculum.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30">
            {missingSkills.length} Missing
          </span>
        </div>

        <Card theme={theme} hoverEffect={false} className="p-6 border">
          <div className="flex flex-wrap gap-2.5">
            {missingSkills.map((skill, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 shadow-sm cursor-pointer"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </Card>
      </div>

      {/* SECTION 4: OUTDATED SKILLS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
              Outdated Skills & Technologies
            </h3>
            <p className="text-xs" style={{ color: tokens.textSecondary }}>
              Skills and technologies that are no longer industry relevant.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            {outdatedSkills.length} Outdated
          </span>
        </div>

        <Card theme={theme} hoverEffect={false} className="p-6 border">
          <div className="flex flex-wrap gap-2.5">
            {outdatedSkills.map((tech, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm cursor-pointer"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </Card>
      </div>

      {/* SECTION 5: SKILL PRIORITY TABLE */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.textMuted }}>
          5. Skill Priority
        </h3>
        <SkillPriorityTable theme={theme} />
      </div>

      {/* BOTTOM ACTION BAR (ONLY TWO BUTTONS AS SPECIFIED) */}
      <div
        className="p-6 rounded-[18px] border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
        style={{
          backgroundColor: tokens.cardBg,
          borderColor: tokens.border,
        }}
      >
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold" style={{ color: tokens.textPrimary }}>
            Explore AI Curriculum Workflows
          </h4>
          <p className="text-xs" style={{ color: tokens.textSecondary }}>
            Continue to the interactive Neo4j Knowledge Graph or view AI Recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Secondary Button: View AI Recommendations */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateRecommendations}
            className="flex-1 sm:flex-none px-5 py-3 rounded-[14px] text-xs font-bold border flex items-center justify-center gap-2 cursor-pointer transition-colors"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: tokens.border,
              color: tokens.textPrimary,
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>View AI Recommendations</span>
          </motion.button>

          {/* Primary Button: View Knowledge Graph */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateGraph}
            className="flex-1 sm:flex-none px-6 py-3 rounded-[14px] text-xs font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer text-black"
            style={{
              backgroundColor: tokens.primaryAccent,
              boxShadow: `0 4px 14px ${tokens.primaryAccent}40`,
            }}
          >
            <Network className="w-4 h-4 text-black" />
            <span>View Knowledge Graph</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
