import React, { useState, useEffect } from 'react';
import { ThemeMode, InstitutionWorkspace } from './types';
import { useAuth } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CapabilityCards } from './components/CapabilityCards';
import { HowItWorks } from './components/HowItWorks';
import { PlatformMetrics } from './components/PlatformMetrics';
import { TechnologyStack } from './components/TechnologyStack';
import { EducatorValue } from './components/EducatorValue';
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
        onToggleTheme={toggleTheme}
        onOpenSignIn={() => handleOpenAuth('signIn')}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
        onOpenDemo={() => setActiveModal('watchDemo')}
        session={session}
        onOpenDashboard={() => setViewMode('dashboard')}
      />

      {/* 2. Hero Section */}
      <Hero
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
        onOpenWatchDemo={() => setActiveModal('watchDemo')}
      />

      {/* 3. Capability Cards */}
      <CapabilityCards theme={theme} />

      {/* 4. How It Works Pipeline */}
      <HowItWorks theme={theme} />

      {/* 5. Platform Metrics */}
      <PlatformMetrics theme={theme} />

      {/* 6. Technology Stack */}
      <TechnologyStack theme={theme} />

      {/* 7. Educator Value & Dashboard Preview */}
      <EducatorValue theme={theme} />

      {/* 8. Final Call to Action */}
      <FinalCTA 
        theme={theme}
        onOpenGetStarted={() => handleOpenAuth('signUp')}
      />

      {/* 9. Footer */}
      <Footer theme={theme} />

      {/* 10. Interactive Dialog Modals */}
      <Modals
        theme={theme}
        activeModal={activeModal}
        onClose={() => setActiveModal('none')}
      />

    </div>
  );
}

