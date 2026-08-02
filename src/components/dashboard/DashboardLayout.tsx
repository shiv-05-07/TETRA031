import React from 'react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  theme: ThemeMode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenUpload: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onToggleTheme: () => void;
  onNavigateLanding?: () => void;
  onSignOut?: () => void;
  children: React.ReactNode;
  headerGreeting?: string;
  headerSubtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  theme,
  activeTab,
  onTabChange,
  onOpenUpload,
  collapsed,
  onToggleCollapse,
  onToggleTheme,
  onNavigateLanding,
  onSignOut,
  children,
  headerGreeting,
  headerSubtitle,
}) => {
  const tokens = getThemeTokens(theme);

  return (
    <div
      className="min-h-screen flex font-sans transition-colors duration-200"
      style={{ backgroundColor: tokens.bg, color: tokens.textPrimary }}
    >
      {/* Left Fixed Sidebar */}
      <Sidebar
        theme={theme}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onOpenUpload={onOpenUpload}
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
        onNavigateLanding={onNavigateLanding}
        onSignOut={onSignOut}
      />

      {/* Main Content Outer Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Top Sticky Header */}
        <Header
          theme={theme}
          onToggleTheme={onToggleTheme}
          onOpenUpload={onOpenUpload}
          onNavigateLanding={onNavigateLanding}
          greeting={headerGreeting}
          subtitle={headerSubtitle}
        />

        {/* Dynamic Main Workspace Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
};
