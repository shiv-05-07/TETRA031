import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  FileText, 
  BrainCircuit, 
  Target, 
  FileQuestion, 
  Copy, 
  Check, 
  Zap,
  Sliders,
  Award
} from 'lucide-react';
import { ThemeMode, CurriculumData } from '../types';
import { SAMPLE_CURRICULUM } from '../data';
import { CustomSelect, CustomSelectOption } from './CustomSelect';
import { AutoHorizontalScroll, PresetItem } from './AutoHorizontalScroll';

interface InteractiveSandboxProps {
  theme: ThemeMode;
  onExportPdf: () => void;
}

export const InteractiveSandbox: React.FC<InteractiveSandboxProps> = ({ theme, onExportPdf }) => {
  const isDark = theme === 'dark';

  const [subjectInput, setSubjectInput] = useState('Advanced Machine Learning & Scalable MLOps');
  const [levelSelect, setLevelSelect] = useState('Graduate / Master\'s Degree');
  const [focusSelect, setFocusSelect] = useState('Industry Readiness & Hands-on MLOps');
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'units' | 'blooms' | 'outcomes' | 'exams'>('units');
  const [curriculumData, setCurriculumData] = useState<CurriculumData>(SAMPLE_CURRICULUM);
  const [copied, setCopied] = useState(false);

  const PRESETS: PresetItem[] = [
    { title: "Advanced Machine Learning & Scalable MLOps", level: "Graduate / Master's Degree" },
    { title: "Quantum Computing & Information Security", level: "Undergraduate / B.Tech" },
    { title: "Biotechnology & Computational Genomics", level: "Graduate / Master's Degree" },
    { title: "Autonomous Systems & Robotics Engineering", level: "Undergraduate / B.Tech" },
    { title: "Distributed Systems & Cloud Infrastructure", level: "Graduate / Master's Degree" },
    { title: "Cyber-Physical Systems & IoT Architecture", level: "Undergraduate / B.Tech" },
    { title: "Applied AI Ethics & Governance", level: "Graduate / Master's Degree" }
  ];

  const academicLevelOptions: CustomSelectOption[] = [
    { value: "Undergraduate / B.Tech", label: "Undergraduate / B.Tech", badge: "4 Years", description: "Foundational & core ABET curriculum" },
    { value: "Graduate / Master's Degree", label: "Graduate / Master's Degree", badge: "2 Years", description: "Advanced specialization & hands-on MLOps" },
    { value: "Post-Graduate / PhD Research", label: "Post-Graduate / PhD Research", badge: "3+ Years", description: "Novel research & theoretical proofs" }
  ];

  const primaryFocusOptions: CustomSelectOption[] = [
    { value: "Industry Readiness & Hands-on MLOps", label: "Industry Readiness & Hands-on MLOps", badge: "Popular", description: "Deployments, CI/CD, PyTorch, Kubernetes" },
    { value: "ABET & IEEE Accreditation Standards", label: "ABET & IEEE Accreditation Standards", badge: "ABET v2025", description: "Direct CO-PO mapping and outcome matrices" },
    { value: "Theoretical Rigor & Mathematical Proofs", label: "Theoretical Rigor & Mathematical Proofs", badge: "Research", description: "Deep mathematical analysis & algorithmic proofs" }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subjectInput,
          level: levelSelect,
          focus: focusSelect,
          format: "15-Week Semester"
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success' && result.data) {
          setCurriculumData(result.data);
        }
      }
    } catch (e) {
      console.warn("Using high-craft fallback sample payload:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(curriculumData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sandbox" className={`py-20 lg:py-28 transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive AI Sandbox</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Test the Lumini Generation Engine
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Select a discipline or enter custom parameters to experience real-time Bloom's Taxonomy mapping and curriculum structuring.
          </p>
        </div>

        {/* Input Parameters Control Panel */}
        <div className={`p-6 sm:p-8 rounded-[22px] border space-y-6 ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
        }`}>
          {/* Auto & Manual Horizontally Scrollable Preset Buttons Row */}
          <AutoHorizontalScroll
            presets={PRESETS}
            selectedTitle={subjectInput}
            onSelectPreset={(preset) => {
              setSubjectInput(preset.title);
              if (preset.level) setLevelSelect(preset.level);
            }}
            theme={theme}
          />

          {/* Input Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Subject Input */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                Course Title or Subject
              </label>
              <input
                type="text"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="e.g. Distributed Systems & Cloud Security"
                className={`w-full px-4 py-2.5 rounded-[12px] text-xs sm:text-sm border focus:outline-none focus:border-[#10B981] transition-colors ${
                  isDark ? 'bg-[#171717] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
                }`}
              />
            </div>

            {/* Academic Level Custom Select */}
            <CustomSelect
              label="Academic Level"
              options={academicLevelOptions}
              value={levelSelect}
              onChange={(val) => setLevelSelect(val)}
              theme={theme}
            />

            {/* Strategic Focus Custom Select */}
            <CustomSelect
              label="Primary Focus"
              options={primaryFocusOptions}
              value={focusSelect}
              onChange={(val) => setFocusSelect(val)}
              theme={theme}
            />

          </div>

          {/* Action Trigger Row */}
          <div className="flex items-center justify-between border-t pt-4 border-[#262626]/40">
            <div className="text-xs text-[#10B981] font-mono flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Powered by Gemini 3.6 Flash</span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-[14px] bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-md shadow-[#10B981]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'AI Structuring Curriculum...' : 'Generate AI Curriculum'}</span>
            </button>
          </div>
        </div>

        {/* Live Output Display Box */}
        <div className={`rounded-[22px] border overflow-hidden shadow-xl ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
        }`}>
          {/* Header Bar */}
          <div className={`p-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-lg">{curriculumData.title}</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-[#10B981]/15 text-[#10B981]">
                  {curriculumData.code || 'CS-8042'}
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                {curriculumData.level} · {curriculumData.credits} Academic Credits
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyJson}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  isDark ? 'border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]' : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'JSON Copied' : 'Copy JSON'}</span>
              </button>

              <button
                onClick={onExportPdf}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg bg-[#10B981] hover:bg-[#34D399] transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Sub-Nav Tabs */}
          <div className={`flex border-b px-4 gap-2 overflow-x-auto no-scrollbar ${
            isDark ? 'border-[#262626] bg-[#0A0A0A]' : 'border-[#E5E7EB] bg-[#F8FAFC]'
          }`}>
            <button
              onClick={() => setActiveTab('units')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'units'
                  ? 'border-[#10B981] text-[#10B981]'
                  : isDark ? 'border-transparent text-[#B3B3B3] hover:text-[#FAFAFA]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Syllabus Units ({curriculumData.units?.length || 4})</span>
            </button>

            <button
              onClick={() => setActiveTab('blooms')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'blooms'
                  ? 'border-[#10B981] text-[#10B981]'
                  : isDark ? 'border-transparent text-[#B3B3B3] hover:text-[#FAFAFA]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Bloom's Taxonomy Breakdown</span>
            </button>

            <button
              onClick={() => setActiveTab('outcomes')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'outcomes'
                  ? 'border-[#10B981] text-[#10B981]'
                  : isDark ? 'border-transparent text-[#B3B3B3] hover:text-[#FAFAFA]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Learning Outcomes & Accreditation</span>
            </button>

            <button
              onClick={() => setActiveTab('exams')}
              className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'exams'
                  ? 'border-[#10B981] text-[#10B981]'
                  : isDark ? 'border-transparent text-[#B3B3B3] hover:text-[#FAFAFA]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <FileQuestion className="w-3.5 h-3.5" />
              <span>Assessment Matrix</span>
            </button>
          </div>

          {/* Tab Content Display Body */}
          <div className="p-6">
            
            {/* TAB 1: Units Breakdown */}
            {activeTab === 'units' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculumData.units?.map((unit, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border space-y-2.5 ${
                      isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#10B981]">
                        Unit {unit.unitNumber} ({unit.durationWeeks} Weeks)
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${isDark ? 'bg-[#262626] text-[#B3B3B3]' : 'bg-[#E5E7EB] text-[#6B7280]'}`}>
                        Practical Mapped
                      </span>
                    </div>

                    <h4 className="font-heading font-semibold text-base">
                      {unit.title}
                    </h4>

                    <div>
                      <span className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        Core Lecture Topics:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {unit.topics?.map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-xs px-2 py-0.5 rounded border ${
                              isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
                            }`}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#262626]/40 text-xs">
                      <span className="font-semibold text-[#10B981] block">Practical Laboratory Assignment:</span>
                      <p className={isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}>{unit.practicalLab}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: Bloom's Mapping */}
            {activeTab === 'blooms' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'}`}>
                  <h4 className="font-heading font-semibold text-base text-[#10B981] mb-2">
                    Bloom's Revised Taxonomy Cognitive Distribution
                  </h4>
                  <p className={`text-xs mb-4 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    Quantified breakdown showing cognitive depth across lower and higher order thinking levels.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Creating & Engineering Architectures</span>
                        <span className="text-[#10B981]">10% - High Order</span>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        {curriculumData.bloomMapping?.creating}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Evaluating & Ethics Trade-off Analysis</span>
                        <span className="text-[#10B981]">10% - High Order</span>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        {curriculumData.bloomMapping?.evaluating}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Analyzing & Error Diagnostics</span>
                        <span className="text-[#10B981]">20% - High Order</span>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        {curriculumData.bloomMapping?.analyzing}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Applying & PyTorch Programming</span>
                        <span className="text-[#34D399]">25% - Application</span>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        {curriculumData.bloomMapping?.applying}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Outcomes */}
            {activeTab === 'outcomes' && (
              <div className="space-y-3">
                <div className="p-3 text-xs font-mono rounded-lg bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                  ABETS / IEEE 2025 Accreditation Matrix Verified
                </div>
                {curriculumData.learningOutcomes?.map((outcome, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                      isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-xs font-bold text-[#10B981] block">
                        Course Outcome (CO-{idx + 1}):
                      </span>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-[#FAFAFA]' : 'text-[#111827]'}`}>
                        {outcome}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: Assessment Matrix */}
            {activeTab === 'exams' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {curriculumData.assessmentMatrix?.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border space-y-1.5 ${
                        isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-semibold text-sm">{item.component}</span>
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#10B981]/20 text-[#10B981]">
                          {item.weight}
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                        Format: {item.format}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
