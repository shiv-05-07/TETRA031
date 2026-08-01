import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Network,
  Binary,
  Cpu
} from 'lucide-react';
import { ThemeMode } from '../types';

interface HeroProps {
  theme: ThemeMode;
  onOpenGetStarted: () => void;
  onOpenWatchDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  theme,
  onOpenGetStarted,
  onOpenWatchDemo,
}) => {
  const isDark = theme === 'dark';

  return (
    <section className={`relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: 50% */}
          <div className="flex flex-col justify-center space-y-6">
            
            {/* Top Pill / Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25 self-start"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered • Data-Driven • Industry-Aligned</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-tight"
            >
              Bridge the Gap Between Academia and Industry with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">AI</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'
              }`}
            >
              CurricuAlign AI analyzes university curricula, identifies missing and outdated skills, and compares academic content with evolving industry requirements to keep courses relevant and future-ready.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4"
            >
              <button
                onClick={onOpenGetStarted}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white rounded-[14px] bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-lg shadow-[#10B981]/25 hover:shadow-xl hover:shadow-[#10B981]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Analyze New Curriculum</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={onOpenWatchDemo}
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-medium rounded-[14px] border transition-all duration-200 ${
                  isDark
                    ? 'bg-[#111111] border-[#262626] text-[#FAFAFA] hover:bg-[#171717] hover:border-[#10B981]/40'
                    : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] hover:border-[#10B981]/40'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-[#10B981]/15 flex items-center justify-center text-[#10B981]">
                  <Play className="w-3.5 h-3.5 fill-[#10B981]" />
                </div>
                <span>Explore How It Works</span>
              </button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Custom Hero Visual */}
          <div className="relative w-full h-[450px] lg:h-[500px] flex items-center justify-center">
            
            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/10 to-[#34D399]/20 rounded-full blur-3xl -z-10 opacity-60" />

            {/* Custom Visual Structure */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-full flex flex-col items-center justify-center"
            >
              
              {/* Central Flow visualization */}
              <div className="w-full flex items-center justify-between px-4 sm:px-10">
                
                {/* 1. Academic Curriculum */}
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-20 h-24 rounded-lg flex items-center justify-center shadow-lg border relative z-10 ${
                    isDark ? 'bg-[#171717] border-[#262626]' : 'bg-white border-[#E5E7EB]'
                  }`}>
                    <FileText className="w-10 h-10 text-[#10B981]" />
                    {/* Simulated Text Lines */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1.5 opacity-50">
                      <div className="h-1 bg-current rounded-full w-full"></div>
                      <div className="h-1 bg-current rounded-full w-4/5"></div>
                      <div className="h-1 bg-current rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Curriculum</span>
                </div>

                {/* Flow Line 1 */}
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#10B981] to-transparent relative opacity-50">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#10B981] rounded-full blur-sm" />
                </div>

                {/* 2. AI Analysis Core */}
                <div className="flex flex-col items-center gap-3 z-10 relative">
                  <div className="absolute -inset-4 bg-[#10B981]/20 rounded-full blur-xl animate-pulse" />
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]">
                    <Cpu className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#10B981]">AI Analysis</span>
                </div>

                {/* Flow Line 2 */}
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#10B981] to-transparent relative opacity-50">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#10B981] rounded-full blur-sm" />
                </div>

                {/* 3. Industry Skills */}
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-20 h-24 rounded-lg flex items-center justify-center shadow-lg border relative z-10 ${
                    isDark ? 'bg-[#171717] border-[#262626]' : 'bg-white border-[#E5E7EB]'
                  }`}>
                    <Network className="w-10 h-10 text-[#34D399]" />
                    {/* Simulated skill nodes */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="w-1.5 h-1.5 bg-current rounded-full absolute top-4 left-4" />
                      <div className="w-1.5 h-1.5 bg-current rounded-full absolute bottom-4 right-4" />
                      <div className="w-1.5 h-1.5 bg-current rounded-full absolute top-10 right-6" />
                    </div>
                  </div>
                  <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Industry Skills</span>
                </div>
              </div>

              {/* Technology Labels Container (floating around) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Tech Label 1 */}
                <div className={`absolute top-8 left-12 px-3 py-1.5 rounded-lg border shadow-sm flex items-center gap-2 backdrop-blur-md ${
                  isDark ? 'bg-[#171717]/80 border-[#262626]' : 'bg-white/80 border-[#E5E7EB]'
                }`}>
                  <Network className="w-3.5 h-3.5 text-[#10B981]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold">Skill Ontology</span>
                    <span className={`text-[9px] font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Neo4j</span>
                  </div>
                </div>

                {/* Tech Label 2 */}
                <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg border shadow-sm flex items-center gap-2 backdrop-blur-md ${
                  isDark ? 'bg-[#171717]/80 border-[#262626]' : 'bg-white/80 border-[#E5E7EB]'
                }`}>
                  <Binary className="w-3.5 h-3.5 text-[#10B981]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold">Semantic Analysis</span>
                    <span className={`text-[9px] font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>Vector Search</span>
                  </div>
                </div>

                {/* Tech Label 3 */}
                <div className={`absolute top-20 right-6 px-3 py-1.5 rounded-lg border shadow-sm flex items-center gap-2 backdrop-blur-md ${
                  isDark ? 'bg-[#171717]/80 border-[#262626]' : 'bg-white/80 border-[#E5E7EB]'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold">AI Recommendations</span>
                    <span className={`text-[9px] font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>LLM</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
