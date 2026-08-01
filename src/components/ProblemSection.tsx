import React from 'react';
import { motion } from 'motion/react';
import { XCircle, CheckCircle2, Clock, Users, AlertTriangle, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { ThemeMode } from '../types';

interface ProblemSectionProps {
  theme: ThemeMode;
  onOpenGetStarted: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ theme, onOpenGetStarted }) => {
  const isDark = theme === 'dark';

  const PAIN_POINTS = [
    {
      title: "Months of Manual Committee Meetings",
      problem: "Syllabus revision takes 3–6 months of faculty committee debate, leading to bureaucratic fatigue.",
      solution: "AI generates fully accredited, Bloom's-aligned course proposals in under 60 seconds."
    },
    {
      title: "Outdated Tech Stacks & Skill Gaps",
      problem: "Graduates are taught legacy frameworks like monolithic C++ or outdated tools while industry uses vLLM and Ray.",
      solution: "Cross-references live job market data from 120k+ tech positions to flag missing industry tools."
    },
    {
      title: "Accreditation & CO-PO Mapping Anxiety",
      problem: "Mapping Course Outcomes to Program Outcomes for ABET or IEEE reviews requires manual spreadsheets.",
      solution: "Automated CO-PO matrix generation with instant 1-click accreditation audit exports."
    },
    {
      title: "Unbalanced Cognitive Rigor",
      problem: "Exams frequently over-index on passive recall (remembering) rather than higher-order evaluation and creation.",
      solution: "Quantifies Bloom's Revised Taxonomy levels automatically across lectures, labs, and question banks."
    }
  ];

  return (
    <section className={`py-20 lg:py-28 transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The Higher Education Bottleneck</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Curriculum Design Shouldn't Take Weeks.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Technology evolves every 6 months, but academic course syllabi often remain frozen for years. Here is how CirrculAI bridges the gap between academia and industry.
          </p>
        </div>

        {/* Problem vs Solution Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PAIN_POINTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`rounded-[22px] border p-6 sm:p-8 space-y-5 transition-all ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
              }`}
            >
              <h3 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">
                {item.title}
              </h3>

              {/* Traditional Pain Point Box */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                isDark ? 'bg-[#171717]/80 border-[#EF4444]/30' : 'bg-[#FEF2F2] border-[#FCA5A5]'
              }`}>
                <XCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EF4444] block font-mono">
                    Traditional Process
                  </span>
                  <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#7F1D1D]'}`}>
                    {item.problem}
                  </p>
                </div>
              </div>

              {/* CirrculAI Solution Box */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                isDark ? 'bg-[#10B981]/10 border-[#10B981]/30' : 'bg-[#ECFDF5] border-[#6EE7B7]'
              }`}>
                <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] block font-mono">
                    The CirrculAI Engine
                  </span>
                  <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-[#FAFAFA]' : 'text-[#065F46]'}`}>
                    {item.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className={`p-8 rounded-[24px] border text-center space-y-4 max-w-4xl mx-auto ${
          isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F3F4F6] border-[#E5E7EB]'
        }`}>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#10B981]">
            <Sparkles className="w-4 h-4" />
            <span>Turn 12 Weeks of Administration into 60 Seconds of Intelligence</span>
          </div>
          <h3 className="font-heading font-bold text-2xl sm:text-3xl">
            Upgrade Your Department to AI Curriculum Intelligence
          </h3>
          <button
            onClick={onOpenGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-[14px] bg-[#10B981] hover:bg-[#34D399] transition-all shadow-md"
          >
            <span>Modernize Syllabus Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
