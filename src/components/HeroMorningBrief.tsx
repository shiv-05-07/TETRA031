import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BrainCircuit,
  Upload,
  Play
} from 'lucide-react';
import { ThemeMode } from '../types';

interface HeroMorningBriefProps {
  theme: ThemeMode;
  onOpenRecommendations: () => void;
  onOpenWorkspace: () => void;
  onOpenUpload: () => void;
}

export const HeroMorningBrief: React.FC<HeroMorningBriefProps> = ({
  theme,
  onOpenRecommendations,
  onOpenWorkspace,
  onOpenUpload
}) => {
  const isDark = theme === 'dark';

  const WORKFLOW_STEPS = [
    { id: '1', title: 'Upload', desc: 'Syllabus PDF/Word', status: 'completed' },
    { id: '2', title: 'Analyze', desc: 'Deep AI Parsing', status: 'completed' },
    { id: '3', title: 'Review', desc: 'Committee Audit', status: 'active' },
    { id: '4', title: 'Approve', desc: 'Dean Sign-off', status: 'pending' },
    { id: '5', title: 'Export', desc: 'ABET & Canvas', status: 'pending' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT 7 COLS: AI Morning Brief (35-40% page width on large screens) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`lg:col-span-7 rounded-[28px] border p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between ${
          isDark
            ? 'bg-gradient-to-br from-[#0F1D17] via-[#111111] to-[#0A0A0A] border-[#10B981]/30 shadow-2xl shadow-[#10B981]/5'
            : 'bg-gradient-to-br from-[#ECFDF5] via-[#FFFFFF] to-[#F0FDF4] border-[#10B981]/30 shadow-xl'
        }`}
      >
        {/* Animated Background Mesh & Floating AI Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#34D399]/5 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />

        <div className="space-y-6 relative z-10">
          
          {/* Header Badge & Title */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <Sparkles className="w-3.5 h-3.5" />
              <span>🤖 AI Morning Brief · Overnight Intelligence Audit</span>
            </div>

            <div className="flex items-center justify-between">
              <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                Good Morning, Dr. Sharma 👋
              </h1>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#4B5563]'}`}>
              Yesterday, Lumini continuously monitored and analyzed <span className="font-bold text-[#10B981]">18 departmental curricula</span> against 120,000+ live enterprise hiring specs across Silicon Valley & Europe.
            </p>
          </div>

          {/* Critical Findings Section */}
          <div className="space-y-2.5 pt-2 border-t border-[#10B981]/20">
            <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${isDark ? 'text-[#10B981]' : 'text-[#059669]'}`}>
              Critical Findings & Live Skill Signals:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                isDark ? 'bg-[#141414]/80 border-[#262626]' : 'bg-[#FFFFFF]/80 border-[#E5E7EB]'
              }`}>
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Database Systems</span>
                  <span className={`text-[11px] ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>Missing Vector DBs & Milvus HNSW</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                isDark ? 'bg-[#141414]/80 border-[#262626]' : 'bg-[#FFFFFF]/80 border-[#E5E7EB]'
              }`}>
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Operating Systems</span>
                  <span className={`text-[11px] ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>Lacks Prompt Eng & eBPF Kernel Labs</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                isDark ? 'bg-[#141414]/80 border-[#262626]' : 'bg-[#FFFFFF]/80 border-[#E5E7EB]'
              }`}>
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Cloud Computing</span>
                  <span className={`text-[11px] ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>Missing Kubernetes 1.30 Orchestration</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                isDark ? 'bg-[#141414]/80 border-[#262626]' : 'bg-[#FFFFFF]/80 border-[#E5E7EB]'
              }`}>
                <TrendingUp className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-[#10B981]">MCP & AI Agents</span>
                  <span className={`text-[11px] ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>+340% demand surge in employer posts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Next Action */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isDark ? 'bg-[#0E0E0E]/90 border-[#10B981]/40' : 'bg-[#F0FDF4] border-[#BBF7D0]'
          }`}>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase tracking-wider block">Recommended Action</span>
              <h3 className="font-heading font-bold text-sm sm:text-base">Run AI Curriculum Modernization</h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B3B3B3]' : 'text-[#4B5563]'}`}>
                Apply 4 prioritized syllabus unit replacements with 1-click committee approval.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
              <button
                onClick={onOpenRecommendations}
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] hover:opacity-95 shadow-md shadow-[#10B981]/20 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>Review AI Recommendations</span>
              </button>

              <button
                onClick={onOpenWorkspace}
                className={`flex-1 sm:flex-none px-3.5 py-2.5 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isDark
                    ? 'bg-[#171717] border-[#262626] text-[#FAFAFA] hover:bg-[#262626]'
                    : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6]'
                }`}
              >
                <span>AI Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </motion.div>

      {/* RIGHT 5 COLS: Curriculum Modernization Score & Workflow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`lg:col-span-5 rounded-[28px] border p-6 sm:p-8 flex flex-col justify-between ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-lg'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase tracking-wider block">
                Institutional Metric
              </span>
              <h2 className="font-heading font-bold text-xl tracking-tight">Curriculum Modernization Score</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
              Very Good
            </span>
          </div>

          {/* Radial Progress Gauge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
            <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className={isDark ? 'text-[#262626]' : 'text-[#E5E7EB]'}
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#10B981] transition-all duration-1000 ease-out"
                  strokeDasharray="87, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-heading font-bold text-3xl sm:text-4xl text-[#10B981]">87%</span>
                <span className={`text-[10px] font-mono font-semibold ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                  +5.8% vs Fall '25
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-left w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span className="font-semibold">ABET Outcome Alignment: 92%</span>
              </div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#10B981]" />
                <span className="font-semibold">Industry Skill Coverage: 84%</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="font-semibold">Pending Revisions: 3 Syllabi</span>
              </div>
            </div>
          </div>

          {/* Continuous Workflow Process */}
          <div className="space-y-3 pt-4 border-t border-[#262626]/40">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
              <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>Curriculum Pipeline Workflow</span>
              <span className="text-[#10B981]">Step 3 of 5 Active</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {WORKFLOW_STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    step.status === 'completed'
                      ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
                      : step.status === 'active'
                        ? 'bg-[#10B981] border-[#10B981] text-white shadow-md'
                        : isDark
                          ? 'bg-[#171717] border-[#262626] text-[#525252]'
                          : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#9CA3AF]'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[10px] font-mono font-bold">{step.id}</span>
                    )}
                  </div>
                  <span className="font-bold text-[10px] block truncate">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>

    </div>
  );
};
