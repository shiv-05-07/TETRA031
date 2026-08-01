import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Mail } from 'lucide-react';
import { ThemeMode } from '../types';

interface FinalCTAProps {
  theme: ThemeMode;
  onOpenGetStarted: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  theme,
  onOpenGetStarted
}) => {
  const isDark = theme === 'dark';

  return (
    <section className={`py-24 lg:py-36 relative overflow-hidden transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      {/* Radial Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#10B981]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25">
          <Sparkles className="w-4 h-4" />
          <span>Start Modernizing Your Curriculum Today</span>
        </div>

        <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
          Ready to Modernize Your Curriculum?
        </h2>

        <p className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${
          isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'
        }`}>
          Join leading universities using CurricuAlign AI to bridge industry skill gaps and construct skill knowledge graphs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenGetStarted}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white rounded-[14px] bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-xl shadow-[#10B981]/25 hover:shadow-2xl hover:shadow-[#10B981]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Analyze Curriculum Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="mailto:sales@curricualign.ai"
            className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-medium rounded-[14px] border transition-all duration-200 ${
              isDark
                ? 'bg-[#111111] border-[#262626] text-[#FAFAFA] hover:bg-[#171717] hover:border-[#10B981]/40'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] hover:border-[#10B981]/40'
            }`}
          >
            <Mail className="w-5 h-5 text-[#10B981]" />
            <span>Contact Sales</span>
          </a>
        </div>

      </div>
    </section>
  );
};
