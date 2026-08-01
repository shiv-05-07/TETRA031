import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  Download, 
  BrainCircuit, 
  FileText, 
  Target, 
  ShieldCheck, 
  RefreshCcw, 
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ThemeMode } from '../types';

interface LiveAiWorkspaceProps {
  theme: ThemeMode;
  onExportPdf: () => void;
}

export const LiveAiWorkspace: React.FC<LiveAiWorkspaceProps> = ({ theme, onExportPdf }) => {
  const isDark = theme === 'dark';

  const [activeStep, setActiveStep] = useState(0);
  const [promptText, setPromptText] = useState("Generate a 15-week Master's curriculum for 'Distributed AI Infrastructure & GPU Clusters' aligned with ABET Criterion 3 & Bloom's Taxonomy.");

  const STEPS = [
    { label: "AI Reasoning", icon: BrainCircuit, desc: "Analyzing 120k industry job specs & IEEE 2025 guidelines..." },
    { label: "Curriculum Verified", icon: CheckCircle2, desc: "Constructing 5 modular syllabus units & lab assignments..." },
    { label: "Accreditation Ready", icon: ShieldCheck, desc: "Mapping CO-PO outcomes to ABET Criterion 3 standards..." },
    { label: "PDF Generated", icon: Download, desc: "Formatting institutional LaTeX & Canvas LMS export..." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`py-20 lg:py-28 border-y transition-colors ${
      isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Interactive Experience</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Live AI Curriculum Generation Session
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Watch Gemini 3.6 Flash reasoning construct courseware, balance Bloom's Taxonomy cognitive depth, and verify accreditation in real-time.
          </p>
        </div>

        {/* Floating Status Chips Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = activeStep === idx;
            const isDone = activeStep > idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer px-4 py-2 rounded-full border text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#10B981] text-white border-[#10B981] shadow-lg shadow-[#10B981]/25 scale-105'
                    : isDone
                      ? 'bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981]'
                      : isDark
                        ? 'bg-[#171717] border-[#262626] text-[#737373]'
                        : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#6B7280]'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>✓ {step.label}</span>
              </div>
            );
          })}
        </div>

        {/* MacBook-Style Window Frame Container */}
        <div className={`rounded-[24px] border shadow-2xl overflow-hidden relative transition-all ${
          isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
        }`}>
          {/* Top Window Navigation Header */}
          <div className={`px-4 py-3 border-b flex items-center justify-between ${
            isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F3F4F6] border-[#E5E7EB]'
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className={`text-xs font-mono ml-2 font-medium ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                lumini-workspace.university.edu — Gemini 3.6 Flash Active
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
                SOC2 TYPE II VERIFIED
              </span>
            </div>
          </div>

          {/* Interactive Workspace Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Prompt Bar Input */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${
              isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
            }`}>
              <Terminal className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className={`w-full text-xs sm:text-sm font-mono bg-transparent focus:outline-none ${
                  isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'
                }`}
              />
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg bg-[#10B981] hover:bg-[#34D399] flex-shrink-0 flex items-center gap-1.5"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Re-run AI</span>
              </button>
            </div>

            {/* Step Explanation Banner */}
            <div className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#10B981]" />
                <span className="font-mono font-bold text-[#10B981] uppercase">Step {activeStep + 1}: {STEPS[activeStep].label}</span>
                <span className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>— {STEPS[activeStep].desc}</span>
              </div>
              <span className="font-mono text-[10px] text-[#34D399]">Latency: 140ms</span>
            </div>

            {/* Generated Workspace Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Syllabus Units (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#10B981]" />
                    <span>Generated Syllabus Units (CS-8042)</span>
                  </h4>
                  <span className="text-xs font-mono text-[#10B981] font-semibold">15 Weeks · 4 Credits</span>
                </div>

                <div className="space-y-3">
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
                  }`}>
                    <div className="flex items-center justify-between font-mono text-xs font-bold text-[#10B981]">
                      <span>Unit 1: GPU Cluster Architecture & CUDA Acceleration</span>
                      <span>Weeks 1–4</span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                      Topics: NVIDIA H100 Tensor Cores, NVLink interconnects, Distributed CUDA kernels, Memory Bandwidth Optimization.
                    </p>
                    <div className="pt-2 border-t border-[#262626]/40 text-[11px]">
                      <span className="font-semibold text-[#10B981]">Practical Lab:</span> Build a multi-GPU kernel benchmarker in PyTorch C++ Extensions.
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border space-y-2 ${
                    isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
                  }`}>
                    <div className="flex items-center justify-between font-mono text-xs font-bold text-[#10B981]">
                      <span>Unit 2: Large-Scale Model Parallelism (Megatron-LM & vLLM)</span>
                      <span>Weeks 5–9</span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                      Topics: Tensor Parallelism vs Pipeline Parallelism, PagedAttention algorithms, FlashAttention-3 integration.
                    </p>
                    <div className="pt-2 border-t border-[#262626]/40 text-[11px]">
                      <span className="font-semibold text-[#10B981]">Practical Lab:</span> Deploy a 70B parameter model cluster with sub-10ms time-to-first-token.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bloom's Taxonomy & ABET Matrix (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-base flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#10B981]" />
                    <span>Bloom's Revised Taxonomy</span>
                  </h4>
                  <span className="text-xs font-mono text-[#10B981] font-semibold">100% Balanced</span>
                </div>

                <div className={`p-4 rounded-xl border space-y-3 ${
                  isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
                }`}>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Creating & Architectural Design</span>
                      <span className="text-[#10B981]">10%</span>
                    </div>
                    <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#10B981] h-full w-[10%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Evaluating & Trade-off Benchmarks</span>
                      <span className="text-[#10B981]">20%</span>
                    </div>
                    <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#10B981] h-full w-[20%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Analyzing & Fault Diagnostics</span>
                      <span className="text-[#34D399]">30%</span>
                    </div>
                    <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#34D399] h-full w-[30%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Applying & Hands-on Coding</span>
                      <span className="text-[#34D399]">40%</span>
                    </div>
                    <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#34D399] h-full w-[40%]" />
                    </div>
                  </div>
                </div>

                {/* Export Action Card */}
                <div className={`p-4 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                }`}>
                  <div className="space-y-0.5">
                    <span className="font-heading font-bold text-sm block">Export Institutional PDF</span>
                    <span className={`text-[11px] block ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                      Includes ABET Criterion 3 outcome matrix & rubric.
                    </span>
                  </div>

                  <button
                    onClick={onExportPdf}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] shadow-md transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
