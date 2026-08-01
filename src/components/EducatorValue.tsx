import React from 'react';
import { motion } from 'motion/react';
import { Check, Target, Zap, AlertTriangle, Network, BarChart2 } from 'lucide-react';
import { ThemeMode } from '../types';

interface EducatorValueProps {
  theme: ThemeMode;
}

export const EducatorValue: React.FC<EducatorValueProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 lg:py-28 transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#F8FAFC] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* LEFT: Content & Benefits */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                Built for Educators. Designed for Industry Alignment.
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                Give curriculum committees and academic leaders the intelligence they need to identify skill gaps and make evidence-driven curriculum improvements.
              </p>
            </div>

            <ul className="space-y-4 pt-4">
              {[
                "Identify missing industry skills",
                "Detect outdated technologies",
                "Align courses with evolving market requirements",
                "Generate actionable curriculum improvements"
              ].map((benefit, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#10B981]" />
                  </div>
                  <span className={`font-medium ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Dashboard Preview */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`rounded-[20px] border shadow-2xl overflow-hidden ${
                isDark
                  ? 'bg-[#111111] border-[#262626] shadow-black/80'
                  : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-slate-200/80'
              }`}
            >
              {/* Fake Window Header */}
              <div className={`h-11 px-4 border-b flex items-center gap-2 ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
              }`}>
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className={`ml-3 text-xs font-mono font-semibold ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                  Analysis Results — CS 301
                </span>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 sm:p-6 space-y-6">
                
                {/* 1. Skill Coverage Row */}
                <div>
                  <h3 className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                    Skill Coverage
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-[#10B981]" />
                        <span className={`text-[11px] font-medium ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Coverage Percentage</span>
                      </div>
                      <div className="text-3xl font-heading font-bold">78%</div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Network className="w-4 h-4 text-[#10B981]" />
                        <span className={`text-[11px] font-medium ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Covered Skills</span>
                      </div>
                      <div className="text-3xl font-heading font-bold">42</div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                        <span className={`text-[11px] font-medium ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Missing Skills</span>
                      </div>
                      <div className="text-3xl font-heading font-bold">12</div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-[#EF4444]" />
                        <span className={`text-[11px] font-medium ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>Outdated Skills</span>
                      </div>
                      <div className="text-3xl font-heading font-bold">3</div>
                    </div>
                  </div>
                </div>

                {/* 2. Semantic Gap Analysis */}
                <div>
                  <h3 className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                    Semantic Gap Analysis
                  </h3>
                  <div className={`p-4 rounded-xl border space-y-4 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                    
                    <div>
                      <div className="flex justify-between text-[11px] font-medium mb-1">
                        <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Curriculum Similarity</span>
                        <span>0.82</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
                        <div className="h-full bg-[#34D399] w-[82%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-medium mb-1">
                        <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Industry Similarity</span>
                        <span>0.95</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
                        <div className="h-full bg-[#10B981] w-[95%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-medium mb-1">
                        <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>Overall Gap</span>
                        <span className="text-[#EF4444]">0.13</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
                        <div className="h-full bg-[#EF4444] w-[13%]" />
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>

            {/* Glowing Accent Ring Behind Frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#10B981]/10 to-[#34D399]/10 rounded-[24px] blur-3xl -z-10 opacity-60 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
