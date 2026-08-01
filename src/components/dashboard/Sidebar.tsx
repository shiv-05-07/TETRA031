import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Upload,
  Network,
  Sparkles,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  FileText
} from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { UserProfile } from './UserProfile';

interface SidebarProps {
  theme: ThemeMode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenUpload: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigateLanding?: () => void;
  onSignOut?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  theme,
  activeTab,
  onTabChange,
  onOpenUpload,
  collapsed,
  onToggleCollapse,
  onNavigateLanding,
  onSignOut,
}) => {
  const tokens = getThemeTokens(theme);

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Curriculum', icon: Upload, isUpload: true },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'recommendations', label: 'AI Recommendations', icon: Sparkles },
  ];

  const systemNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'reports', label: 'ABET Reports', icon: FileText },
    { id: 'help', label: 'Help / About', icon: HelpCircle },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col justify-between transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      style={{
        backgroundColor: tokens.sidebarBg,
        borderColor: tokens.border,
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
      }}
    >
      {/* Top Section: Logo & Subtitle */}
      <div>
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: tokens.border }}>
          <div
            onClick={onNavigateLanding}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div
              className="w-10 h-10 rounded-[14px] p-0.5 flex-shrink-0 flex items-center justify-center shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${tokens.primaryAccent}, #34D399)`,
              }}
            >
              <div
                className="w-full h-full rounded-[12px] flex items-center justify-center"
                style={{ backgroundColor: tokens.sidebarBg }}
              >
                <GraduationCap className="w-5 h-5" style={{ color: tokens.primaryAccent }} />
              </div>
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span
                  className="font-bold text-lg tracking-tight leading-none"
                  style={{ color: tokens.textPrimary }}
                >
                  Lumini
                </span>
                <span
                  className="text-[10px] font-medium tracking-wide mt-1 truncate"
                  style={{ color: tokens.textSecondary }}
                >
                  AI-Powered Curriculum Gap Analysis
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            aria-label="Collapse Sidebar"
            className="p-1.5 rounded-lg transition-colors hidden lg:flex cursor-pointer"
            style={{
              backgroundColor: tokens.inputBg,
              color: tokens.textSecondary,
              borderColor: tokens.border,
              borderWidth: '1px',
            }}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Navigation Menu Links */}
        <div className="p-3 space-y-6">
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.isUpload) {
                      onOpenUpload();
                    } else {
                      onTabChange(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-[14px] text-sm font-medium transition-all cursor-pointer relative ${
                    collapsed ? 'justify-center' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? `${tokens.primaryAccent}1F` : 'transparent',
                    color: isActive ? tokens.primaryAccent : tokens.textSecondary,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1.5 h-6 rounded-r-full"
                      style={{ backgroundColor: tokens.primaryAccent }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: isActive ? tokens.primaryAccent : tokens.textSecondary }}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Divider & System Section */}
          <div className="pt-2 border-t" style={{ borderColor: tokens.border }}>
            {!collapsed && (
              <span
                className="text-[11px] font-semibold tracking-wider uppercase px-3.5 mb-2 block"
                style={{ color: tokens.textMuted }}
              >
                SYSTEM
              </span>
            )}
            <div className="space-y-1">
              {systemNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-sm font-medium transition-all cursor-pointer ${
                      collapsed ? 'justify-center' : ''
                    }`}
                    style={{
                      backgroundColor: isActive ? `${tokens.primaryAccent}1F` : 'transparent',
                      color: isActive ? tokens.primaryAccent : tokens.textSecondary,
                    }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Promo Card & User Profile */}
      <div className="p-3 border-t space-y-3" style={{ borderColor: tokens.border }}>
        {!collapsed && (
          <div
            className="p-4 rounded-[18px] border relative overflow-hidden text-left space-y-2"
            style={{
              backgroundColor: tokens.cardBg,
              borderColor: tokens.border,
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center relative shadow-lg"
              style={{
                backgroundColor: '#0F1811',
                border: `1px solid ${tokens.primaryAccent}40`,
                boxShadow: `0 0 20px ${tokens.primaryAccent}30`,
              }}
            >
              <GraduationCap className="w-8 h-8" style={{ color: tokens.primaryAccent }} />
            </div>

            <p className="text-xs font-bold leading-tight" style={{ color: tokens.textPrimary }}>
              Bridge the gap between academia and industry with AI.
            </p>
            <p className="text-[10px] font-medium" style={{ color: tokens.textMuted }}>
              Keep your curriculum future-ready.
            </p>
          </div>
        )}

        <UserProfile
          theme={theme}
          collapsed={collapsed}
          onSignOut={onSignOut}
        />
      </div>
    </aside>
  );
};
