import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  FileCheck, 
  BrainCircuit, 
  Target, 
  TableProperties, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Download,
  Copy,
  Check,
  Zap,
  BarChart2,
  FileSpreadsheet
} from 'lucide-react';
import { ThemeMode } from '../types';
import { FEATURES_LIST } from '../data';

interface FeatureShowcaseProps {
  theme: ThemeMode;
  onOpenGetStarted: () => void;
  onExportPdf: () => void;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  theme,
  onOpenGetStarted,
  onExportPdf
}) => {
  const isDark = theme === 'dark';
  const [activeFeatureId, setActiveFeatureId] = useState<string>('semantic-analysis');
  const [copied, setCopied] = useState(false);

  const activeFeature = FEATURES_LIST.find(f => f.id === activeFeatureId) || FEATURES_LIST[0];

  const handleCopySample = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="features" className={`py-20 lg:py-28 transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Institutional Feature Suite</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Engineered for Academic Rigor & Industry Relevance
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Transform raw educational requirements into accredited, Bloom's Taxonomy-aligned courseware with a single AI workflow.
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar justify-start sm:justify-center">
          {FEATURES_LIST.map((feature) => {
            const isActive = feature.id === activeFeatureId;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeatureId(feature.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#10B981] text-white border-[#10B981] shadow-md shadow-[#10B981]/20'
                    : isDark
                      ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                      : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
                }`}
              >
                <span>{feature.title}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </button>
            );
          })}
        </div>

        {/* Active Feature Deep-Dive Card */}
        <div className={`rounded-[24px] border p-6 lg:p-10 transition-colors ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Description Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                {activeFeature.badge}
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">
                {activeFeature.title}
              </h3>

              <p className="text-base font-medium text-[#10B981]">
                {activeFeature.subtitle}
              </p>

              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                {activeFeature.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-2">
                {activeFeature.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#10B981]/15 flex items-center justify-center text-[#10B981] flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className={isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={onOpenGetStarted}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-[14px] bg-[#10B981] hover:bg-[#34D399] transition-colors shadow-md"
                >
                  <span>Try {activeFeature.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleCopySample}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-[14px] border transition-colors ${
                    isDark ? 'border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]' : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Sample Copied' : 'Copy Sample'}</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Live Preview Column */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-[18px] border p-6 space-y-4 shadow-xl ${
                    isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
                  }`}
                >
                  {/* Header of Preview Box */}
                  <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#10B981]">
                        {activeFeature.title} Live Preview
                      </span>
                    </div>

                    <button
                      onClick={onExportPdf}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/25 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export PDF</span>
                    </button>
                  </div>

                  {/* Feature-Specific Mock Payload Display */}
                  {activeFeature.id === 'semantic-analysis' && (
                    <div className="space-y-3 text-xs font-mono">
                      <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <div className="text-[#10B981] font-bold">Deep Parse: CS-8042 Advanced Machine Learning</div>
                        <p className={`mt-1 font-sans ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                          Extracted 42 topics, 14 course outcomes, 8 prerequisite chains. Cognitive depth detected: 35% Lower-Order, 65% Higher-Order.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 font-sans">
                        <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                          <span className="text-[#10B981] font-semibold block text-[11px]">Primary Focus:</span>
                          <span className={isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}>Deep Learning Architectures & Vector Spaces</span>
                        </div>
                        <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                          <span className="text-[#10B981] font-semibold block text-[11px]">Prerequisites:</span>
                          <span className={isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}>Linear Algebra, PyTorch & GPU Basics</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFeature.id === 'skill-gap' && (
                    <div className="space-y-3 text-xs">
                      <div className={`p-3 rounded-xl border space-y-1.5 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#EF4444]">Skill Deficiency Alert: Model Context Protocol (MCP)</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#EF4444]/20 text-[#EF4444] font-mono">Critical Gap</span>
                        </div>
                        <p className={isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}>
                          Present in 84% of AI engineering job specs across Silicon Valley & Europe, but absent in current CS-8042 syllabus.
                        </p>
                      </div>

                      <div className={`p-2.5 rounded-xl border flex items-center justify-between font-mono text-[11px] ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <span>120,000+ Job Spec Cross-Reference</span>
                        <span className="text-[#10B981]">98.4% Confidence</span>
                      </div>
                    </div>
                  )}

                  {activeFeature.id === 'knowledge-graph' && (
                    <div className="space-y-2 text-xs font-mono">
                      <div className={`p-3 rounded-xl border space-y-2 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <span className="font-bold text-[#10B981]">Neo4j Ontological Trajectory:</span>
                        <p className={`font-sans text-[11px] ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                          Course (CS-8042) ➔ Outcome (Multimodal Search) ➔ Skill (Vector DB) ➔ Tech (Milvus) ➔ Target Role (AI Infra Engineer)
                        </p>
                      </div>
                    </div>
                  )}

                  {activeFeature.id === 'market-intelligence' && (
                    <div className="space-y-2 text-xs">
                      <div className={`p-2.5 rounded-xl border space-y-1 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <div className="flex justify-between font-bold text-[#10B981]">
                          <span>MCP & Agent Runtime Demand</span>
                          <span>+340% Growth YOY</span>
                        </div>
                        <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>
                          High hiring velocity across enterprise software companies requiring standard agentic protocols.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeFeature.id === 'emerging-tech' && (
                    <div className="space-y-2 text-xs">
                      <div className={`p-2.5 rounded-xl border flex items-center justify-between ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <div>
                          <span className="font-bold text-[#10B981]">Surging Tech: vLLM & PagedAttention</span>
                          <span className="block text-[11px] text-[#FAFAFA]">Production inference bottleneck optimization</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#10B981]/20 text-[#10B981] font-semibold">
                          High Priority
                        </span>
                      </div>
                    </div>
                  )}

                  {activeFeature.id === 'ai-modernization' && (
                    <div className="space-y-2 text-xs">
                      <div className={`p-2.5 rounded-xl border space-y-1 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <span className="font-bold text-[#10B981]">AI Modernization Recommendation:</span>
                        <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>
                          Replace Unit 3 "Monolithic Hadoop MapReduce" with "Distributed Vector Search & Milvus Cluster Architecture".
                        </p>
                      </div>
                    </div>
                  )}

                  {activeFeature.id === 'case-studies' && (
                    <div className="space-y-2 text-xs">
                      <div className={`p-2.5 rounded-xl border space-y-1 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <span className="font-bold text-[#10B981]">Case Study Attached: Netflix Multimodal Recommendation Engine</span>
                        <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>
                          Architecture paper breakdown on low-latency vector indexing for 200M concurrent streams.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeFeature.id === 'industry-projects' && (
                    <div className="space-y-2 text-xs">
                      <div className={`p-2.5 rounded-xl border space-y-1 ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <span className="font-bold text-[#10B981]">Capstone Project: Enterprise RAG Service with FastAPI</span>
                        <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>
                          Dockerized starter repo, ChromaDB vector store, Prometheus monitoring dashboard, and GitHub Actions CI autograder.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeFeature.id === 'export-syllabus' && (
                    <div className="space-y-2 text-xs">
                      <div className={`p-2.5 rounded-xl border flex items-center justify-between ${isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                        <div>
                          <span className="font-bold text-[#10B981]">ABET & NBA Compliance Package</span>
                          <span className="block text-[11px] text-[#FAFAFA]">PDF, Canvas QTI, Word & LaTeX Bundle</span>
                        </div>
                        <button onClick={onExportPdf} className="px-3 py-1 rounded bg-[#10B981] text-white font-bold text-xs">
                          Export Now
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
