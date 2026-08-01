import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Download, Calendar, Mail, GraduationCap, CheckCircle2, Sparkles, Printer } from 'lucide-react';
import { ThemeMode, CurriculumData } from '../types';
import { SAMPLE_CURRICULUM } from '../data';

interface ModalsProps {
  theme: ThemeMode;
  activeModal: 'none' | 'signIn' | 'getStarted' | 'watchDemo' | 'bookDemo' | 'pdfExport';
  onClose: () => void;
  curriculumData?: CurriculumData;
}

export const Modals: React.FC<ModalsProps> = ({
  theme,
  activeModal,
  onClose,
  curriculumData = SAMPLE_CURRICULUM
}) => {
  const isDark = theme === 'dark';

  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (activeModal === 'none') return null;

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full max-w-2xl rounded-[24px] border p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden ${
            isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-xl border transition-colors ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* MODAL 1: WATCH DEMO */}
          {activeModal === 'watchDemo' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#10B981]">
                  <Play className="w-3.5 h-3.5 fill-[#10B981]" />
                  <span>3-Minute Interactive Walkthrough</span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl">
                  CirrculAI Platform Demonstration
                </h3>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Discover how professors and department heads generate accredited course syllabi, Bloom's Taxonomy maps, and question papers.
                </p>
              </div>

              {/* Video Mock Player Canvas */}
              <div className={`aspect-video rounded-[18px] border relative overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-4 ${
                isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
              }`}>
                <div className="w-16 h-16 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-lg shadow-[#10B981]/30 animate-pulse">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg">Interactive Walkthrough Active</h4>
                  <p className="text-xs text-[#10B981] font-mono mt-1">Simulating Gemini 3.6 Flash reasoning & Neo4j graph alignment...</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-semibold text-white rounded-[14px] bg-[#10B981] hover:bg-[#34D399]"
                >
                  Close Walkthrough
                </button>
              </div>
            </div>
          )}

          {/* MODAL 2: GET STARTED / SIGN IN */}
          {(activeModal === 'getStarted' || activeModal === 'signIn') && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-[#10B981]" />
                  <span className="font-heading font-bold text-2xl">
                    {activeModal === 'signIn' ? 'Welcome Back to CirrculAI' : 'Create Enterprise Academic Account'}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Enter your university email to access AI curriculum intelligence.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-[18px] bg-[#10B981]/15 border border-[#10B981]/30 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#10B981] mx-auto" />
                  <h4 className="font-heading font-bold text-lg text-[#10B981]">Access Granted!</h4>
                  <p className="text-xs">Redirecting to your institutional dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                      University / Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. professor@stanford.edu"
                      className={`w-full px-4 py-3 rounded-[12px] text-sm border focus:outline-none focus:border-[#10B981] ${
                        isDark ? 'bg-[#171717] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                      University / Department Name
                    </label>
                    <input
                      type="text"
                      required
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Department of Computer Science, Stanford"
                      className={`w-full px-4 py-3 rounded-[12px] text-sm border focus:outline-none focus:border-[#10B981] ${
                        isDark ? 'bg-[#171717] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-sm font-semibold text-white rounded-[14px] bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-md shadow-[#10B981]/20 hover:scale-[1.01] transition-all"
                  >
                    {activeModal === 'signIn' ? 'Sign In to Workspace' : 'Get Started Free'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* MODAL 3: BOOK DEMO */}
          {activeModal === 'bookDemo' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#10B981]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>University Enterprise Sales</span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl">
                  Schedule an Academic Consultation
                </h3>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Book a 20-minute tailored walkthrough with our Academic Success Director.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-[18px] bg-[#10B981]/15 border border-[#10B981]/30 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#10B981] mx-auto" />
                  <h4 className="font-heading font-bold text-lg text-[#10B981]">Demo Requested!</h4>
                  <p className="text-xs">Our Academic Director will contact your department within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                      Your Name & Academic Role
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Aris Thorne, Department Chair"
                      className={`w-full px-4 py-3 rounded-[12px] text-sm border focus:outline-none focus:border-[#10B981] ${
                        isDark ? 'bg-[#171717] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. dean@imperial.ac.uk"
                      className={`w-full px-4 py-3 rounded-[12px] text-sm border focus:outline-none focus:border-[#10B981] ${
                        isDark ? 'bg-[#171717] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-sm font-semibold text-white rounded-[14px] bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-md shadow-[#10B981]/20 hover:scale-[1.01] transition-all"
                  >
                    Confirm Consultation Request
                  </button>
                </form>
              )}
            </div>
          )}

          {/* MODAL 4: PDF EXPORT PREVIEW */}
          {activeModal === 'pdfExport' && (
            <div className="space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div>
                  <span className="text-xs font-mono text-[#10B981] uppercase font-bold">Institutional Document Export</span>
                  <h3 className="font-heading font-bold text-2xl">{curriculumData.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintPdf}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399]"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>

              {/* Printable Document Sheet Preview */}
              <div className={`p-8 rounded-[18px] border font-sans space-y-6 ${
                isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
              }`}>
                {/* Document Header */}
                <div className="border-b pb-4 border-[#262626]/50 flex justify-between items-start">
                  <div>
                    <h2 className="font-heading font-bold text-xl">{curriculumData.title}</h2>
                    <p className="text-xs font-mono text-[#10B981] mt-0.5">Course Code: {curriculumData.code} · {curriculumData.level}</p>
                  </div>
                  <div className="text-right text-[10px] font-mono opacity-70">
                    <span>CirrculAI Verified Audit</span>
                    <br />
                    <span>ABETS Criterion 3</span>
                  </div>
                </div>

                {/* Bloom's Summary */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-heading font-bold text-sm text-[#10B981]">1. Bloom's Revised Taxonomy Cognitive Distribution</h4>
                  <p className="leading-relaxed opacity-80">{curriculumData.bloomMapping?.creating}</p>
                  <p className="leading-relaxed opacity-80">{curriculumData.bloomMapping?.applying}</p>
                </div>

                {/* Units List */}
                <div className="space-y-3 text-xs">
                  <h4 className="font-heading font-bold text-sm text-[#10B981]">2. Syllabus Units & Practical Assignments</h4>
                  {curriculumData.units?.map((u, i) => (
                    <div key={i} className="p-3 rounded-lg border border-[#262626]/40 space-y-1">
                      <span className="font-bold text-[#10B981]">Unit {u.unitNumber}: {u.title} ({u.durationWeeks} Weeks)</span>
                      <p className="opacity-80">Topics: {u.topics?.join(', ')}</p>
                      <p className="font-mono text-[11px] text-[#34D399]">Practical: {u.practicalLab}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
