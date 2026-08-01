import React, { useState, useEffect } from 'react';
import { ThemeMode, InstitutionWorkspace } from './types';
import { useAuth } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { ProblemSection } from './components/ProblemSection';
import { LiveAiWorkspace } from './components/LiveAiWorkspace';
import { FeatureShowcase } from './components/FeatureShowcase';
import { HowItWorks } from './components/HowItWorks';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { ProductShowcase } from './components/ProductShowcase';
import { Benefits } from './components/Benefits';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { AuthPage, AuthTab } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [viewMode, setViewMode] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [authTab, setAuthTab] = useState<AuthTab>('signIn');
  const [activeModal, setActiveModal] = useState<'none' | 'signIn' | 'getStarted' | 'watchDemo' | 'bookDemo' | 'pdfExport'>('none');
  const [activeWorkspace, setActiveWorkspace] = useState<InstitutionWorkspace | undefined>();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (session && viewMode === 'auth') {
        setViewMode('dashboard');
      } else if (!session && viewMode === 'dashboard') {
        setViewMode('landing');
      }
    }
  }, [session, isLoading, viewMode]);

  useEffect(() => {
    // Synchronize HTML element background and theme
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#0A0A0A';
      document.body.style.color = '#FAFAFA';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#111827';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenAuth = (tab: AuthTab) => {
    setAuthTab(tab);
    setViewMode('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateDashboard = (workspace?: InstitutionWorkspace) => {
    if (workspace) {
      setActiveWorkspace(workspace);
    }
    setViewMode('dashboard');
  };

  if (viewMode === 'dashboard') {
    return (
      <Dashboard
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigateLanding={() => setViewMode('landing')}
        onNavigateAuth={() => setViewMode('auth')}
        activeWorkspace={activeWorkspace}
      />
    );
  }

  if (viewMode === 'auth') {
    return (
      <AuthPage
        theme={theme}
        onToggleTheme={toggleTheme}
        onBackToHome={() => setViewMode('landing')}
        onNavigateDashboard={handleNavigateDashboard}
        initialTab={authTab}
      />
    );
  }

  return (
    <div className={`min-h-screen font-inter transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FFFFFF] text-[#111827]'
    }`}>
      
      {/* 1. Header Navigation */}
      <Navbar
        theme={theme}
        session={session}
        onToggleTheme={toggleTheme}
        onOpenSignIn={() => handleOpenAuth('signIn')}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
        onOpenDemo={() => setActiveModal('watchDemo')}
        onOpenDashboard={() => setViewMode('dashboard')}
      />

      {/* 2. Hero Section */}
      <Hero
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
        onOpenWatchDemo={() => setActiveModal('watchDemo')}
        onExportPdf={() => setActiveModal('pdfExport')}
      />

      {/* 3. Trust Section */}
      <TrustSection theme={theme} />

      {/* 4. Problem Section */}
      <ProblemSection
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
      />

      {/* 5. Live Signature AI Workspace */}
      <LiveAiWorkspace
        theme={theme}
        onExportPdf={() => setActiveModal('pdfExport')}
      />

      {/* 6. Core Features Showcase */}
      <FeatureShowcase
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
        onExportPdf={() => setActiveModal('pdfExport')}
      />

      {/* 7. How It Works (4-Step Timeline) */}
      <HowItWorks
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
      />

      {/* 8. Live Interactive Sandbox */}
      <InteractiveSandbox
        theme={theme}
        onExportPdf={() => setActiveModal('pdfExport')}
      />

      {/* 9. Enterprise Product Showcase */}
      <ProductShowcase
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
      />

      {/* 10. Institutional Benefits */}
      <Benefits
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
      />

      {/* 11. Pricing & Tiers */}
      <Pricing
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
        onOpenBookDemo={() => setActiveModal('bookDemo')}
      />

      {/* 12. Deans & Faculty Endorsements */}
      <Testimonials theme={theme} />

      {/* 13. FAQ Accordion */}
      <FAQ theme={theme} />

      {/* 14. Final Call to Action */}
      <FinalCTA
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
        onOpenBookDemo={() => setActiveModal('bookDemo')}
      />

      {/* 15. Footer */}
      <Footer theme={theme} />

      {/* 16. Interactive Dialog Modals */}
      <Modals
        theme={theme}
        activeModal={activeModal}
        onClose={() => setActiveModal('none')}
      />

    </div>
  );
}

