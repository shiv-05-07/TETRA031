import React from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Users, 
  GitBranch, 
  Building2, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { ThemeMode } from '../types';

interface BenefitsProps {
  theme: ThemeMode;
  onOpenGetStarted: () => void;
}

export const Benefits: React.FC<BenefitsProps> = ({ theme, onOpenGetStarted }) => {
  const isDark = theme === 'dark';

  const BENEFITS_LIST = [
    {
      icon: Clock,
      title: "Reduce Curriculum Obsolescence",
      desc: "Automatically spot outdated tools, obsolete frameworks, and legacy coursework before students graduate."
    },
    {
      icon: TrendingUp,
      title: "Bridge Industry Skill Gaps",
      desc: "Align course outcomes directly with live industry demand from 120,000+ real employer job descriptions."
    },
    {
      icon: Users,
      title: "Improve Graduate Employability",
      desc: "Equip students with hands-on, modern tech skills that top recruiters and Silicon Valley firms actually hire for."
    },
    {
      icon: ShieldCheck,
      title: "Support NBA & ABET Accreditation",
      desc: "Ensure seamless compliance with international accreditation criteria, Course Outcome (CO) & Program Outcome (PO) mapping."
    },
    {
      icon: Building2,
      title: "Data-Driven Curriculum Decisions",
      desc: "Replace opinion-driven faculty debates with quantitative skill market intelligence and graph analytics."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Modernization",
      desc: "Generate 1-click unit updates, capstone projects, and real-world case studies matched to academic levels."
    },
    {
      icon: GitBranch,
      title: "Future-Proof Academic Programs",
      desc: "Maintain continuous curriculum refresh loops across academic cycles with complete version history audit trails."
    }
  ];

  return (
    <section className={`py-20 lg:py-28 border-y transition-colors ${
      isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Dashboard Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className={`p-6 sm:p-8 rounded-[22px] border space-y-6 shadow-xl ${
              isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="font-heading font-bold text-lg">Curriculum Audit Insights</span>
                </div>
                <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-[#10B981]/15 text-[#10B981]">
                  Verified
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">Course Outcome Audit Score</span>
                    <span className="font-bold text-base text-[#10B981]">95 / 100</span>
                  </div>
                  <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>
                    High alignment with industry demand and Bloom's Revised Taxonomy.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span>Faculty Hours Saved This Term</span>
                    <span className="text-[#10B981]">140+ Hours</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full w-[88%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span>Accreditation Audit Readiness</span>
                    <span className="text-[#10B981]">100% ABETS Compliant</span>
                  </div>
                  <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#34D399] h-full w-[100%]" />
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={onOpenGetStarted}
                  className="w-full py-3 text-sm font-semibold text-white rounded-[14px] bg-[#10B981] hover:bg-[#34D399] transition-colors shadow-md"
                >
                  Transform Your Department Now
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Institutional Benefits List */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#10B981]">
                Institutional Value
              </p>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                Why Universities Upgrade to Lumini
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                Eliminate administrative friction while raising the bar for educational quality and accreditation readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS_LIST.map((benefit, idx) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-[16px] border space-y-2 transition-all hover:border-[#10B981]/40 ${
                      isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-base tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                      {benefit.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
