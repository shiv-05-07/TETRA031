import React, { useState } from 'react';
import { Sparkles, Sun, Moon, ArrowRight, Menu, X, ShieldCheck, GraduationCap } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenSignIn: () => void;
  onOpenGetStarted: () => void;
  onOpenDemo: () => void;
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenSignIn,
  onOpenGetStarted,
  onOpenDemo,
  onOpenDashboard
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 h-[72px] w-full border-b transition-colors duration-200 glass-nav ${
      isDark
        ? 'bg-[#0A0A0A]/85 border-[#262626] text-[#FAFAFA]'
        : 'bg-[#FFFFFF]/85 border-[#E5E7EB] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
              isDark ? 'bg-[#0A0A0A]' : 'bg-[#FFFFFF]'
            }`}>
              <GraduationCap className="w-5 h-5 text-[#10B981]" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-xl tracking-tight">Lumini</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                v2.5
              </span>
            </div>
            <span className={`text-[10px] tracking-wider uppercase font-mono ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
              Enterprise Ed
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className={`text-sm font-medium transition-colors ${
            isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'
          }`}>
            Features
          </a>
          <a href="#sandbox" className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
            isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'
          }`}>
            <span>Interactive Demo</span>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#10B981]/10 text-[#10B981]">Live</span>
          </a>
          <a href="#solutions" className={`text-sm font-medium transition-colors ${
            isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'
          }`}>
            Solutions
          </a>
          <a href="#pricing" className={`text-sm font-medium transition-colors ${
            isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'
          }`}>
            Pricing
          </a>
          <a href="#faq" className={`text-sm font-medium transition-colors ${
            isDark ? 'text-[#B3B3B3] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'
          }`}>
            FAQ
          </a>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-xl border transition-all duration-200 ${
              isDark
                ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#34D399]" /> : <Moon className="w-4 h-4 text-[#111827]" />}
          </button>

          {/* Dashboard Button */}
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className={`px-3 py-2 text-xs font-mono font-bold rounded-[14px] border transition-all ${
                isDark
                  ? 'bg-[#10B981]/15 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/25'
                  : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#059669] hover:bg-[#DCFCE7]'
              }`}
            >
              Dashboard
            </button>
          )}

          {/* Sign In Button */}
          <button
            onClick={onOpenSignIn}
            className={`px-3.5 py-2 text-sm font-medium rounded-[14px] transition-colors ${
              isDark
                ? 'text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]'
                : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
            }`}
          >
            Sign In
          </button>

          {/* Get Started Button */}
          <button
            onClick={onOpenGetStarted}
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-[14px] bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-md shadow-[#10B981]/20 hover:shadow-lg hover:shadow-[#10B981]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border ${
              isDark ? 'bg-[#111111] border-[#262626] text-[#B3B3B3]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#34D399]" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border ${
              isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-6 space-y-4 shadow-xl ${
          isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
        }`}>
          <nav className="flex flex-col gap-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium px-3 py-2 rounded-lg ${
                isDark ? 'text-[#FAFAFA] hover:bg-[#111111]' : 'text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              Features
            </a>
            <a
              href="#sandbox"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium px-3 py-2 rounded-lg flex items-center justify-between ${
                isDark ? 'text-[#FAFAFA] hover:bg-[#111111]' : 'text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              <span>Interactive Demo</span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#10B981]/10 text-[#10B981]">Live</span>
            </a>
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium px-3 py-2 rounded-lg ${
                isDark ? 'text-[#FAFAFA] hover:bg-[#111111]' : 'text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              Solutions
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium px-3 py-2 rounded-lg ${
                isDark ? 'text-[#FAFAFA] hover:bg-[#111111]' : 'text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium px-3 py-2 rounded-lg ${
                isDark ? 'text-[#FAFAFA] hover:bg-[#111111]' : 'text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              FAQ
            </a>
          </nav>

          <div className="pt-4 border-t border-[#262626]/50 flex flex-col gap-2.5">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSignIn(); }}
              className={`w-full py-2.5 text-sm font-medium rounded-[14px] border ${
                isDark ? 'border-[#262626] text-[#FAFAFA]' : 'border-[#E5E7EB] text-[#111827]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenGetStarted(); }}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-[14px] bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
