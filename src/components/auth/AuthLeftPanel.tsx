import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Sparkle, 
  Brain, 
  ShieldCheck, 
  Network, 
  Cpu, 
  Quote, 
  GraduationCap, 
  Building2,
  BarChart3,
  Search,
  Check
} from 'lucide-react';
import { ThemeMode } from '../../types';

interface AuthLeftPanelProps {
  theme: ThemeMode;
}

export const AuthLeftPanel: React.FC<AuthLeftPanelProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  // Floating Cards configuration as requested
  const floatingCards = [
    {
      id: 'analysis',
      title: 'Curriculum Analysis',
      subtitle: 'Real-time ABET & Bloom Taxonomy audit',
      icon: FileText,
      delay: 0,
      badge: '99.4% Accuracy'
    },
    {
      id: 'skillgap',
      title: 'Skill Gap Detection',
      subtitle: 'Cross-referenced with 120,000+ job specs',
      icon: Search,
      delay: 0.2,
      badge: 'Live Industry Index'
    },
    {
      id: 'graph',
      title: 'Knowledge Graph',
      subtitle: 'Prerequisite dependency & outcome mapping',
      icon: Network,
      delay: 0.4,
      badge: '3D Node Map'
    },
    {
      id: 'modernization',
      title: 'AI Modernization',
      subtitle: 'Generates QTI, slide decks & lab guides',
      icon: Cpu,
      delay: 0.6,
      badge: 'Auto-Generated'
    },
    {
      id: 'accreditation',
      title: 'Accreditation Ready',
      subtitle: 'Export ABET Criterion 3 & 5 dossiers',
      icon: ShieldCheck,
      delay: 0.8,
      badge: '1-Click Audit'
    }
  ];

  const institutions = [
    { name: 'MIT', location: 'Cambridge, MA', badge: 'EECS' },
    { name: 'Stanford', location: 'Stanford, CA', badge: 'Engineering' },
    { name: 'Oxford', location: 'Oxford, UK', badge: 'CS Dept' },
    { name: 'NIT Surat', location: 'Surat, IN', badge: 'Tier-1' },
    { name: 'Harvard', location: 'Cambridge, MA', badge: 'SEAS' },
    { name: 'ETH Zurich', location: 'Zurich, CH', badge: 'Computer Science' }
  ];

  return (
    <div className={`p-8 lg:p-12 xl:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r relative overflow-hidden transition-colors ${
      isDark 
        ? 'bg-[#0E0E0E] border-[#262626]' 
        : 'bg-[#F8FAFC] border-[#E5E7EB]'
    }`}>
      
      {/* Background Subtle Grid & Emerald Gradient Glow */}
      <div 
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#10B981' : '#059669'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#10B981]/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#34D399]/10 blur-[130px] pointer-events-none" />

      {/* Floating Animated Particle Dots (Minimal & Subtle) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8
          }}
          style={{
            top: `${15 + i * 14}%`,
            left: `${10 + (i * 15) % 80}%`
          }}
          className="absolute w-2 h-2 rounded-full bg-[#10B981]/40 blur-[1px] pointer-events-none"
        />
      ))}

      <div className="space-y-8 relative z-10">
        
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 backdrop-blur-sm shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Lumini</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-3">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-4xl xl:text-5xl tracking-tight leading-[1.12]">
            Welcome to <span className="text-[#10B981]">Lumini</span>
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${isDark ? 'text-[#A3A3A3]' : 'text-[#4B5563]'}`}>
            AI-Powered Curriculum Gap Analysis
          </p>
        </div>

        {/* Animated Enterprise Illustration Panel */}
        <div className={`p-6 rounded-[22px] border relative overflow-hidden backdrop-blur-md transition-all ${
          isDark ? 'bg-[#121212]/90 border-[#262626] shadow-2xl shadow-black/60' : 'bg-[#FFFFFF]/90 border-[#E5E7EB] shadow-xl'
        }`}>
          {/* Header Bar inside Diagram */}
          <div className="flex items-center justify-between pb-4 border-b border-current/10 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className={`text-[11px] font-mono ml-2 font-medium ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                lumini://curriculum-engine.v3
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] font-semibold border border-[#10B981]/30">
              ACTIVE NODE MATRIX
            </span>
          </div>

          {/* Interactive Flow Visualizer */}
          <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#181818] border-[#262626]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
              <Brain className="w-5 h-5 text-[#10B981] mx-auto mb-1.5" />
              <div className="text-[11px] font-bold">Bloom's Taxonomy</div>
              <div className={`text-[9px] mt-0.5 ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>Higher Order 68%</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#181818] border-[#262626]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
              <BarChart3 className="w-5 h-5 text-[#10B981] mx-auto mb-1.5" />
              <div className="text-[11px] font-bold">ABET Criterion 3</div>
              <div className={`text-[9px] mt-0.5 ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>100% Compliant</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#181818] border-[#262626]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
              <ShieldCheck className="w-5 h-5 text-[#10B981] mx-auto mb-1.5" />
              <div className="text-[11px] font-bold">Skill Gap Match</div>
              <div className={`text-[9px] mt-0.5 ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>94.8% Aligned</div>
            </div>
          </div>

          {/* Floating Cards List (Requested 5 Cards) */}
          <div className="space-y-2.5">
            {floatingCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: card.delay }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isDark 
                      ? 'bg-[#181818]/80 border-[#262626] hover:border-[#10B981]/50' 
                      : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#10B981]/50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-xs flex items-center gap-1.5">
                        <span>{card.title}</span>
                      </div>
                      <div className={`text-[10px] ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                        {card.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#10B981]/10 text-[#10B981] font-medium hidden sm:inline-block">
                    {card.badge}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Institutional Trust Badges */}
        <div className="space-y-2">
          <div className={`text-[11px] font-mono uppercase tracking-wider ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
            Trusted by Leaders at Accredited Institutions
          </div>
          <div className="flex flex-wrap gap-2">
            {institutions.map((inst, idx) => (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
                  isDark 
                    ? 'bg-[#111111] border-[#262626] text-[#D4D4D4]' 
                    : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#374151] shadow-2xs'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{inst.name}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-current/10 opacity-75 font-mono">
                  {inst.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Professor Endorsement Quote */}
      <div className={`mt-8 pt-5 border-t ${isDark ? 'border-[#262626]' : 'border-[#E5E7EB]'}`}>
        <div className={`p-4 rounded-xl border relative ${
          isDark ? 'bg-[#121212] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-xs'
        }`}>
          <Quote className="w-5 h-5 text-[#10B981]/30 absolute top-3 right-3" />
          <p className={`text-xs italic leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#4B5563]'}`}>
            "Lumini reduced our computer science accreditation review prep from 4 months to under 2 hours. It is indispensable for modern deans and faculty."
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center font-bold text-xs text-[#10B981]">
              HV
            </div>
            <div>
              <div className="font-heading font-semibold text-xs">Prof. H. V. Sharma</div>
              <div className={`text-[10px] ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                Chair, Curriculum Committee · NIT Surat & Harvard Visiting Scholar
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
