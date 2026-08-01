import React from 'react';
import { motion } from 'motion/react';
import { Upload, Cpu, Network, BarChart2, Sparkles, FileDown, ArrowRight } from 'lucide-react';
import { ThemeMode } from '../types';

interface HowItWorksProps {
  theme: ThemeMode;
  onOpenGetStarted: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ theme, onOpenGetStarted }) => {
  const isDark = theme === 'dark';

  const STEPS = [
    {
      stepNumber: "01",
      icon: Upload,
      title: "Upload Syllabus",
      description: "Drop your existing course syllabus, department outline, or accreditation guidelines in PDF, Word, or TXT format."
    },
    {
      stepNumber: "02",
      icon: Cpu,
      title: "AI Semantic Analysis",
      description: "Deep LLM parsing extracts learning outcomes, prerequisite trees, cognitive Bloom's depth, and course modules."
    },
    {
      stepNumber: "03",
      icon: Network,
      title: "Knowledge Graph Mapping",
      description: "Constructs an ontological skill graph connecting course topics directly to industry competencies and job market roles."
    },
    {
      stepNumber: "04",
      icon: BarChart2,
      title: "Industry Skill Gap Analysis",
      description: "Cross-references course topics against 120,000+ live employer postings to spot missing tech and obsolete frameworks."
    },
    {
      stepNumber: "05",
      icon: Sparkles,
      title: "AI Modernization Plan",
      description: "Generates prioritized unit replacements, industry capstones, case study suggestions, and ABET-aligned updates."
    },
    {
      stepNumber: "06",
      icon: FileDown,
      title: "Review & Export",
      description: "Inspect changes, accept AI suggestions, and export fully modernized syllabus packages in PDF, Word, or Canvas QTI."
    }
  ];

  return (
    <section className={`py-20 lg:py-28 border-y transition-colors ${
      isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#10B981]">
            6-Step Intelligence Workflow
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            How Lumini Operates
          </h2>
          <p className={`text-base leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            A systematic intelligence workflow designed to eliminate curriculum obsolescence and streamline academic reviews.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`p-6 rounded-[18px] border relative transition-all duration-200 hover:border-[#10B981]/50 ${
                  isDark
                    ? 'bg-[#171717] border-[#262626]'
                    : 'bg-[#FFFFFF] border-[#E5E7EB]'
                }`}
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="font-mono font-bold text-sm text-[#10B981]">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl tracking-tight mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}

        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-[14px] bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-md shadow-[#10B981]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Start Modernizing Your Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
