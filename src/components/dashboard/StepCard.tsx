import React from 'react';
import { motion } from 'motion/react';
import {
  UploadCloud,
  Cpu,
  Database,
  Brain,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText
} from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { Card } from './Card';

interface StepCardProps {
  theme: ThemeMode;
  onUploadClick?: () => void;
}

export const GettingStartedCard: React.FC<StepCardProps> = ({
  theme,
  onUploadClick,
}) => {
  const tokens = getThemeTokens(theme);

  const steps = [
    { num: '01', title: 'Upload Curriculum', desc: 'Drop PDF/DOCX syllabi' },
    { num: '02', title: 'AI Processing', desc: 'Extract topics & vector embeddings' },
    { num: '03', title: 'View Results', desc: 'Skill gap report & recommendations' },
  ];

  return (
    <Card theme={theme} hoverEffect={true} className="p-6 border relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-4">
          <div>
            <h3
              className="text-lg font-bold tracking-tight"
              style={{ color: tokens.textPrimary }}
            >
              Getting Started
            </h3>
            <p className="text-xs mt-1" style={{ color: tokens.textSecondary }}>
              Follow 3 simple steps to complete curriculum gap analysis.
            </p>
          </div>

          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                  style={{
                    backgroundColor: tokens.inputBg,
                    color: tokens.primaryAccent,
                    borderColor: tokens.border,
                    borderWidth: '1px',
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: tokens.textPrimary }}>
                    {step.title}
                  </div>
                  <div className="text-[11px]" style={{ color: tokens.textSecondary }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Graphic Illustration on Right */}
        <div className="w-24 h-24 rounded-2xl flex-shrink-0 flex items-center justify-center p-3 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${tokens.primaryAccent}15, ${tokens.primaryAccent}30)`,
            border: `1px solid ${tokens.primaryAccent}30`,
          }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <Brain className="w-12 h-12" style={{ color: tokens.primaryAccent }} />
        </div>
      </div>
    </Card>
  );
};

export const HowLuminiWorksCard: React.FC<StepCardProps> = ({
  theme,
}) => {
  const tokens = getThemeTokens(theme);

  const steps = [
    {
      step: 'Step 1',
      title: 'Upload',
      icon: UploadCloud,
      bullets: ['PDF/DOCX Syllabus files'],
    },
    {
      step: 'Step 2',
      title: 'AI Processing',
      icon: Cpu,
      bullets: ['Extract text', 'Generate embeddings', 'Map skills'],
    },
    {
      step: 'Step 3',
      title: 'Semantic Analysis',
      icon: Database,
      bullets: ['Compare curriculum', 'Match industry skills'],
    },
    {
      step: 'Step 4',
      title: 'AI Recommendations',
      icon: Brain,
      bullets: ['Generate recommendations', 'Modernize syllabus'],
    },
  ];

  return (
    <Card theme={theme} hoverEffect={false} className="p-6 sm:p-8 border">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span
          className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-2"
          style={{
            backgroundColor: `${tokens.primaryAccent}15`,
            color: tokens.primaryAccent,
          }}
        >
          Architecture Workflow
        </span>
        <h2
          className="text-[28px] font-bold tracking-tight"
          style={{ color: tokens.textPrimary }}
        >
          How Lumini Works
        </h2>
        <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
          End-to-end automated pipeline powered by deep semantic vector matching.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          const isLast = idx === steps.length - 1;

          return (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              {/* Clean Circular Icon */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-4 relative z-10 transition-transform"
                style={{
                  backgroundColor: tokens.inputBg,
                  borderColor: tokens.border,
                  borderWidth: '2px',
                  boxShadow: `0 8px 20px -6px ${tokens.primaryAccent}30`,
                }}
              >
                <Icon className="w-8 h-8" style={{ color: tokens.primaryAccent }} />
              </motion.div>

              <span className="text-xs font-mono font-bold" style={{ color: tokens.textMuted }}>
                {item.step}
              </span>

              <h4 className="text-base font-bold mt-1" style={{ color: tokens.textPrimary }}>
                {item.title}
              </h4>

              <ul className="mt-3 space-y-1 text-xs" style={{ color: tokens.textSecondary }}>
                {item.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="font-medium">
                    {b}
                  </li>
                ))}
              </ul>

              {/* Connector Arrow for desktop */}
              {!isLast && (
                <div className="hidden lg:block absolute top-8 -right-3 z-0 translate-x-1/2">
                  <ArrowRight className="w-5 h-5" style={{ color: tokens.textMuted }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
