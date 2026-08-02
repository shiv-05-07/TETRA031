import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  FileText,
  CheckCircle2,
  BookOpen,
  Zap,
  Package,
  FolderKanban,
  Code,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  FileCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ThemeMode } from '../types';
import { getThemeTokens } from '../theme/tokens';
import { Card } from './dashboard/Card';

interface AiModernizationPageProps {
  theme: ThemeMode;
  onNavigateWorkspace?: (courseCode?: string) => void;
  onNavigateGraph?: () => void;
  onExportReport?: () => void;
}

export const AiModernizationPage: React.FC<AiModernizationPageProps> = ({
  theme,
  onNavigateWorkspace,
  onNavigateGraph,
  onExportReport,
}) => {
  const tokens = getThemeTokens(theme);
  const isDark = theme === 'dark';

  const [selectedCourse, setSelectedCourse] = useState('Data Structures & Algorithms');

  // Technology Chips Data with Brand Colors & Icons
  const techChips = [
    { name: 'GitHub Copilot', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    { name: 'Docker', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    { name: 'LangChain', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    { name: 'Hugging Face', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
    { name: 'FastAPI', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    { name: 'TensorFlow', color: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30' },
    { name: 'PyTorch', color: 'bg-red-500/15 text-red-400 border-red-500/30' },
    { name: 'MongoDB', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    { name: 'PostgreSQL', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    { name: 'Streamlit', color: 'bg-red-500/15 text-red-400 border-red-500/30' },
    { name: 'GitHub Actions', color: 'bg-gray-500/15 text-gray-300 border-gray-500/30' },
    { name: 'Kubernetes', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    { name: 'Neo4j', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    { name: 'Milvus', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    { name: 'Redis', color: 'bg-red-500/15 text-red-400 border-red-500/30' },
    { name: 'Kafka', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
    { name: 'ChromaDB', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    { name: 'OpenAI API', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  ];

  // Modern Case Studies List
  const caseStudies = [
    {
      title: 'Netflix Recommendation System',
      description: 'Using ML and collaborative filtering',
    },
    {
      title: 'Spotify Music Recommendation',
      description: 'Using embeddings and ANN search',
    },
    {
      title: 'ChatGPT – The Power of LLMs',
      description: 'How large language models work in real applications',
    },
    {
      title: 'Fraud Detection in Banking',
      description: 'ML-based anomaly detection in transactions',
    },
  ];

  // Project Ideas List
  const projectIdeas = [
    {
      title: 'AI Resume Analyzer',
      description: 'Extracts and scores resumes using NLP',
    },
    {
      title: 'Smart Attendance System',
      description: 'Face recognition-based attendance system',
    },
    {
      title: 'Career Recommendation Engine',
      description: 'Suggests career paths based on skills and interests',
    },
    {
      title: 'AI Tutor',
      description: 'Personalized learning assistant using LLMs',
    },
    {
      title: 'Fraud Detection Platform',
      description: 'Detect and prevent fraudulent transactions',
    },
  ];

  const handleDownloadReport = (format: 'pdf' | 'docx') => {
    if (onExportReport) {
      onExportReport();
    } else {
      window.print();
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
            style={{ color: tokens.textPrimary }}
          >
            AI Recommendations
          </h1>
          <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
            AI-generated suggestions to enhance and modernize your curriculum.
          </p>
        </div>

        {/* Top Right Action Buttons: Export PDF & Export DOCX */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleDownloadReport('pdf')}
            className="px-4 py-2.5 rounded-[14px] font-bold text-xs border flex items-center gap-2 cursor-pointer transition-colors"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: `${tokens.primaryAccent}60`,
              color: tokens.primaryAccent,
            }}
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleDownloadReport('docx')}
            className="px-4 py-2.5 rounded-[14px] font-bold text-xs border flex items-center gap-2 cursor-pointer transition-colors text-black"
            style={{
              backgroundColor: tokens.primaryAccent,
              borderColor: tokens.primaryAccent,
            }}
          >
            <Download className="w-4 h-4 text-black" />
            <span>Export DOCX</span>
          </motion.button>
        </div>
      </div>

      {/* COMPACT CURRICULUM SUMMARY BAR */}
      <Card theme={theme} hoverEffect={false} className="p-4 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(91, 225, 106, 0.15)',
                color: tokens.primaryAccent,
              }}
            >
              <BookOpen className="w-5 h-5 text-[#5BE16A]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight" style={{ color: tokens.textPrimary }}>
                  {selectedCourse}
                </span>
                <span className="text-gray-400 text-xs">▼</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs" style={{ color: tokens.textSecondary }}>
                <span>Computer Science & Engineering</span>
                <span>•</span>
                <span>Semester IV</span>
                <span>•</span>
                <span>Academic Year 2024–25</span>
              </div>
            </div>
          </div>

          <span
            className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
            style={{
              backgroundColor: tokens.pillBgCompleted,
              color: tokens.pillTextCompleted,
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        </div>
      </Card>

      {/* MAIN CONTENT GRID (3 COLUMNS × 2 ROWS ON DESKTOP) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CARD 1: UPDATED SYLLABUS */}
        <Card theme={theme} hoverEffect={false} className="p-6 border flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: tokens.border }}>
              <div className="w-8 h-8 rounded-lg bg-[#5BE16A]/15 text-[#5BE16A] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight" style={{ color: tokens.textPrimary }}>
                  UPDATED SYLLABUS
                </h3>
                <p className="text-xs" style={{ color: tokens.textSecondary }}>
                  AI-suggested improvements to existing topics.
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 font-bold pb-1 text-gray-400 border-b border-gray-700/20">
                <span>Current Topic</span>
                <span>Recommended Improvement</span>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-2 items-start py-1 border-b border-gray-700/10">
                <span className="font-medium" style={{ color: tokens.textPrimary }}>
                  Machine Learning Basics
                </span>
                <div className="space-y-0.5">
                  <div className="font-bold text-[#5BE16A] flex items-center gap-1">
                    <span>→</span> Machine Learning Fundamentals
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold pl-3">
                    + Transformers
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold pl-3">
                    + Prompt Engineering
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-2 items-start py-1 border-b border-gray-700/10">
                <span className="font-medium" style={{ color: tokens.textPrimary }}>
                  Web Development
                </span>
                <div className="space-y-0.5">
                  <div className="font-bold text-[#5BE16A] flex items-center gap-1">
                    <span>→</span> Full Stack Development
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold pl-3">
                    + RESTful APIs
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold pl-3">
                    + FastAPI
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 gap-2 items-start py-1 border-b border-gray-700/10">
                <span className="font-medium" style={{ color: tokens.textPrimary }}>
                  Database Systems
                </span>
                <div className="space-y-0.5">
                  <div className="font-bold text-[#5BE16A] flex items-center gap-1">
                    <span>→</span> SQL & NoSQL Databases
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold pl-3">
                    + Vector Databases
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold pl-3">
                    + Database Optimization
                  </div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-2 gap-2 items-start py-1">
                <span className="font-medium" style={{ color: tokens.textPrimary }}>
                  Software Testing
                </span>
                <div className="space-y-0.5">
                  <div className="font-bold text-[#5BE16A] flex items-center gap-1">
                    <span>→</span> Test Automation
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold pl-3">
                    + CI/CD Pipelines
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold pl-3">
                    + DevOps Basics
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="text-xs font-bold text-[#5BE16A] hover:underline flex items-center gap-1 cursor-pointer pt-2">
            <span>View full updated syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        {/* CARD 2: SUGGESTED NEW TOPICS */}
        <Card theme={theme} hoverEffect={false} className="p-6 border flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: tokens.border }}>
              <div className="w-8 h-8 rounded-lg bg-[#5BE16A]/15 text-[#5BE16A] flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight" style={{ color: tokens.textPrimary }}>
                  SUGGESTED NEW TOPICS
                </h3>
                <p className="text-xs" style={{ color: tokens.textSecondary }}>
                  Modern topics to include in the curriculum.
                </p>
              </div>
            </div>

            {/* Bulleted List */}
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                'Generative AI',
                'Responsible AI',
                'Retrieval-Augmented Generation (RAG)',
                'AI Agents and Agentic Workflows',
                'Cloud Computing Fundamentals',
                'MLOps and LLMOps',
                'Data Engineering Basics',
                'Cybersecurity Essentials',
              ].map((topic, idx) => (
                <li key={idx} className="flex items-center gap-2 cursor-pointer hover:text-[#5BE16A] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5BE16A] flex-shrink-0" />
                  <span style={{ color: tokens.textPrimary }}>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="text-xs font-bold text-[#5BE16A] hover:underline flex items-center gap-1 cursor-pointer pt-2">
            <span>View all topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        {/* CARD 3: RECOMMENDED TOOLS & TECHNOLOGIES */}
        <Card theme={theme} hoverEffect={false} className="p-6 border flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: tokens.border }}>
              <div className="w-8 h-8 rounded-lg bg-[#5BE16A]/15 text-[#5BE16A] flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight" style={{ color: tokens.textPrimary }}>
                  RECOMMENDED TOOLS & TECHNOLOGIES
                </h3>
                <p className="text-xs" style={{ color: tokens.textSecondary }}>
                  Industry-relevant tools and technologies.
                </p>
              </div>
            </div>

            {/* Chips Grid */}
            <div className="flex flex-wrap gap-2 max-h-[260px] overflow-y-auto pr-1">
              {techChips.map((chip, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${chip.color} shadow-sm transition-transform hover:scale-105 cursor-pointer`}
                >
                  {chip.name}
                </span>
              ))}
            </div>
          </div>

          <button className="text-xs font-bold text-[#5BE16A] hover:underline flex items-center gap-1 cursor-pointer pt-2">
            <span>View all tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        {/* CARD 4: MODERN CASE STUDIES */}
        <Card theme={theme} hoverEffect={false} className="p-6 border flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: tokens.border }}>
              <div className="w-8 h-8 rounded-lg bg-[#5BE16A]/15 text-[#5BE16A] flex items-center justify-center">
                <FolderKanban className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight" style={{ color: tokens.textPrimary }}>
                  MODERN CASE STUDIES
                </h3>
                <p className="text-xs" style={{ color: tokens.textSecondary }}>
                  Real-world examples to make learning relevant.
                </p>
              </div>
            </div>

            {/* Case Studies List */}
            <div className="space-y-2">
              {caseStudies.map((cs, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                  }}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <FileText className="w-4 h-4 text-[#5BE16A] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate" style={{ color: tokens.textPrimary }}>
                        {cs.title}
                      </h4>
                      <p className="text-[11px] truncate" style={{ color: tokens.textMuted }}>
                        {cs.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <button className="text-xs font-bold text-[#5BE16A] hover:underline flex items-center gap-1 cursor-pointer pt-2">
            <span>View all case studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        {/* CARD 5: PROJECT IDEAS */}
        <Card theme={theme} hoverEffect={false} className="p-6 border flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: tokens.border }}>
              <div className="w-8 h-8 rounded-lg bg-[#5BE16A]/15 text-[#5BE16A] flex items-center justify-center">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight" style={{ color: tokens.textPrimary }}>
                  PROJECT IDEAS
                </h3>
                <p className="text-xs" style={{ color: tokens.textSecondary }}>
                  Hands-on projects to build industry-ready skills.
                </p>
              </div>
            </div>

            {/* Project List */}
            <div className="space-y-2">
              {projectIdeas.map((pj, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                  }}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Sparkles className="w-4 h-4 text-[#5BE16A] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate" style={{ color: tokens.textPrimary }}>
                        {pj.title}
                      </h4>
                      <p className="text-[11px] truncate" style={{ color: tokens.textMuted }}>
                        {pj.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <button className="text-xs font-bold text-[#5BE16A] hover:underline flex items-center gap-1 cursor-pointer pt-2">
            <span>View all projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        {/* CARD 6: EXPORT RECOMMENDATIONS */}
        <Card theme={theme} hoverEffect={false} className="p-6 border flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: tokens.border }}>
              <div className="w-8 h-8 rounded-lg bg-[#5BE16A]/15 text-[#5BE16A] flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight" style={{ color: tokens.textPrimary }}>
                  EXPORT RECOMMENDATIONS
                </h3>
                <p className="text-xs" style={{ color: tokens.textSecondary }}>
                  Download AI-generated recommendations.
                </p>
              </div>
            </div>

            {/* Export Blocks */}
            <div className="space-y-3">
              {/* PDF Option */}
              <div
                className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                style={{
                  backgroundColor: tokens.inputBg,
                  borderColor: tokens.border,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    PDF
                  </div>
                  <div>
                    <h4 className="text-xs font-bold" style={{ color: tokens.textPrimary }}>
                      Export as PDF
                    </h4>
                    <p className="text-[11px]" style={{ color: tokens.textMuted }}>
                      Download complete recommendations in PDF.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownloadReport('pdf')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                  style={{ borderColor: tokens.border, color: tokens.textPrimary }}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>

              {/* DOCX Option */}
              <div
                className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                style={{
                  backgroundColor: tokens.inputBg,
                  borderColor: tokens.border,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    DOCX
                  </div>
                  <div>
                    <h4 className="text-xs font-bold" style={{ color: tokens.textPrimary }}>
                      Export as DOCX
                    </h4>
                    <p className="text-[11px]" style={{ color: tokens.textMuted }}>
                      Download editable recommendations.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownloadReport('docx')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                  style={{ borderColor: tokens.border, color: tokens.textPrimary }}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export DOCX</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="flex items-center gap-2 text-[11px] pt-2 border-t" style={{ borderColor: tokens.border, color: tokens.textMuted }}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#5BE16A] flex-shrink-0" />
            <span>All exports include syllabus updates, topics, tools, case studies, and project ideas.</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
