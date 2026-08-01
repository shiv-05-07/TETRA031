import React from 'react';
import { GraduationCap, Github, Linkedin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ThemeMode } from '../types';

interface FooterProps {
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t py-12 lg:py-16 transition-colors ${
      isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] p-0.5">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                  isDark ? 'bg-[#0A0A0A]' : 'bg-[#FFFFFF]'
                }`}>
                  <GraduationCap className="w-4 h-4 text-[#10B981]" />
                </div>
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">
                Cirrcul<span className="text-[#10B981]">AI</span>
              </span>
            </a>

            <p className={`text-xs leading-relaxed max-w-sm ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
              Enterprise AI curriculum intelligence platform for higher education, accreditation boards, and modern university departments.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={`p-2 rounded-xl border transition-colors ${
                  isDark ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={`p-2 rounded-xl border transition-colors ${
                  isDark ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#features" className={`transition-colors ${isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}>Features & AI Engine</a></li>
              <li><a href="#sandbox" className={`transition-colors ${isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}>Interactive Sandbox</a></li>
              <li><a href="#solutions" className={`transition-colors ${isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}>Department Solutions</a></li>
              <li><a href="#pricing" className={`transition-colors ${isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}>Pricing & Tiers</a></li>
              <li><a href="#faq" className={`transition-colors ${isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}>FAQ</a></li>
            </ul>
          </div>

          {/* Resources & Standards (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] block">
              Accreditation Standards
            </span>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className={`transition-colors ${isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}>ABET Criterion 3 Framework</a></li>
              <li><a href="#" className={`transition-colors ${isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}>IEEE 2025 Computer Science Guidelines</a></li>
              <li><a href="#" className={`transition-colors ${isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}>Bloom's Taxonomy Cognitive Mapping</a></li>
              <li><a href="#" className={`transition-colors ${isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}>LMS QTI Integration Guide</a></li>
            </ul>
          </div>

          {/* Compliance Badge (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] block">
              Enterprise Trust
            </span>
            <div className={`p-3 rounded-xl border space-y-2 text-xs ${
              isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-[#10B981]">
                <ShieldCheck className="w-4 h-4" />
                <span>FERPA Compliant</span>
              </div>
              <p className={`text-[11px] ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                SOC2 Type II certified data security architecture.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262626]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className={isDark ? 'text-[#737373]' : 'text-[#6B7280]'}>
            © {new Date().getFullYear()} CirrculAI Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className={isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}>Privacy Policy</a>
            <a href="#" className={isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}>Terms of Service</a>
            <a href="#" className={isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}>Security Audit</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
