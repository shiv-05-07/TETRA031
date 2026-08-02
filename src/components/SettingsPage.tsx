import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Building2,
  Sliders,
  Cpu,
  Link2,
  Bell,
  Lock,
  Shield,
  AlertTriangle,
  HelpCircle,
  Edit,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  KeyRound,
  ShieldCheck,
  Globe,
  Database,
  Layers,
  Trash2,
  ExternalLink,
  Sun,
  Moon,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  X
} from 'lucide-react';
import { ThemeMode } from '../types';
import { getThemeTokens } from '../theme/tokens';
import { Card } from './dashboard/Card';
import { ThemeToggle } from './dashboard/ThemeToggle';

interface SettingsPageProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onNavigateHelp?: () => void;
}

export type SettingsSection =
  | 'profile'
  | 'organization'
  | 'preferences'
  | 'ai_settings'
  | 'integrations'
  | 'notifications'
  | 'privacy'
  | 'security'
  | 'danger';

export const SettingsPage: React.FC<SettingsPageProps> = ({
  theme,
  onToggleTheme,
  onNavigateHelp,
}) => {
  const tokens = getThemeTokens(theme);
  const isDark = theme === 'dark';

  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);

  // Editable Profile Form State
  const [profileName, setProfileName] = useState('Dr. Ananya Rao');
  const [profileRole, setProfileRole] = useState('Dean, Computer Science & Engineering');
  const [profileEmail, setProfileEmail] = useState('ananya.rao@greenfield.edu.in');
  const [profilePhone, setProfilePhone] = useState('+91 98765 43210');

  // Preferences State
  const [language, setLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeZone, setTimeZone] = useState('(GMT+05:30) Asia/Kolkata');

  // AI Settings State
  const [llmProvider, setLlmProvider] = useState('OpenAI (GPT-4o)');
  const [embeddingModel, setEmbeddingModel] = useState('text-embedding-3-large');
  const [vectorDatabase, setVectorDatabase] = useState('ChromaDB');
  const [analysisDepth, setAnalysisDepth] = useState('Standard (Recommended)');

  const [aiToggles, setAiToggles] = useState({
    skillOntology: true,
    semanticSimilarity: true,
    neo4jGraph: true,
    autoReport: true,
  });

  // Integrations State
  const [integrations, setIntegrations] = useState([
    { id: 'neo4j', name: 'Neo4j Database', desc: 'Graph Database for Skill Ontology', connected: true },
    { id: 'openai', name: 'OpenAI API', desc: 'GPT-4o & Embedding Models', connected: true },
    { id: 'chroma', name: 'ChromaDB Vector Store', desc: 'Vector Search for Syllabi', connected: true },
    { id: 'gdrive', name: 'Google Drive', desc: 'Cloud Syllabus Import', connected: false },
    { id: 'onedrive', name: 'Microsoft OneDrive', desc: 'Enterprise Document Sync', connected: false },
  ]);

  // Notification Toggles State
  const [notificationToggles, setNotificationToggles] = useState({
    email: true,
    analysisCompleted: true,
    weeklyReports: false,
    systemUpdates: true,
    securityAlerts: true,
  });

  // Data & Privacy Toggles State
  const [privacyToggles, setPrivacyToggles] = useState({
    encryption: true,
    anonymizeData: true,
  });
  const [retentionPeriod, setRetentionPeriod] = useState('12 Months');

  // Secondary Left Settings Menu Items
  const menuItems = [
    { id: 'profile', label: 'Profile & Account', icon: User },
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
    { id: 'ai_settings', label: 'AI & Analysis Settings', icon: Cpu },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Data & Privacy', icon: Lock },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, isDanger: true },
  ];

  // Scrollspy logic: Observe section elements on scroll
  const isClickNavigatingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickNavigatingRef.current) return;

      const sectionIds: SettingsSection[] = [
        'profile',
        'organization',
        'preferences',
        'ai_settings',
        'integrations',
        'notifications',
        'privacy',
        'security',
        'danger',
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: SettingsSection) => {
    setActiveSection(id);
    isClickNavigatingRef.current = true;

    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }

    setTimeout(() => {
      isClickNavigatingRef.current = false;
    }, 800);
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item))
    );
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
            style={{ color: tokens.textPrimary }}
          >
            Settings
          </h1>
          <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
            Manage your preferences, account, and application configuration.
          </p>
        </div>

        {/* Top Right Header Quick Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={onNavigateHelp}
            className="px-3.5 py-2 rounded-[12px] text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-colors"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: tokens.border,
              color: tokens.textSecondary,
            }}
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <span>Need Help?</span>
          </button>

          <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

          {/* User Avatar Circle */}
          <div
            className="w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center border shadow-sm text-black"
            style={{
              backgroundColor: tokens.primaryAccent,
              borderColor: tokens.primaryAccent,
            }}
          >
            DR
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN SETTINGS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SECONDARY SETTINGS MENU (3 COLS - STICKY) */}
        <div className="lg:col-span-3">
          <Card theme={theme} hoverEffect={false} className="p-3 border sticky top-6 z-10">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isDanger = item.isDanger;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as SettingsSection)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-[12px] text-xs font-semibold transition-all cursor-pointer relative ${
                      isDanger ? 'hover:bg-red-500/10' : ''
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? isDanger
                          ? 'rgba(239, 68, 68, 0.15)'
                          : `${tokens.primaryAccent}1F`
                        : 'transparent',
                      color: isActive
                        ? isDanger
                          ? '#EF4444'
                          : tokens.primaryAccent
                        : isDanger
                        ? '#EF4444'
                        : tokens.textSecondary,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeSettingsIndicator"
                        className="w-1.5 h-4 rounded-full"
                        style={{
                          backgroundColor: isDanger ? '#EF4444' : tokens.primaryAccent,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* RIGHT SETTINGS CONTENT PANELS (9 COLS) */}
        <div className="lg:col-span-9 space-y-6">
          {/* SECTION 1: PROFILE & ACCOUNT */}
          <div id="profile" className="space-y-4">
            <Card theme={theme} hoverEffect={false} className="p-6 border space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: tokens.border }}>
                <div>
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                    Profile & Account
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                    Manage your personal information and account details.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowEditProfileModal(true)}
                  className="px-4 py-2 rounded-[12px] text-xs font-bold border flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  style={{
                    borderColor: `${tokens.primaryAccent}60`,
                    color: tokens.primaryAccent,
                    backgroundColor: `${tokens.primaryAccent}10`,
                  }}
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </motion.button>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full font-bold text-xl flex items-center justify-center border-2 text-black shadow-md flex-shrink-0"
                    style={{
                      backgroundColor: tokens.primaryAccent,
                      borderColor: tokens.primaryAccent,
                    }}
                  >
                    DR
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold" style={{ color: tokens.textPrimary }}>
                      {profileName}
                    </h4>
                    <p className="text-xs font-medium" style={{ color: tokens.textSecondary }}>
                      {profileRole}
                    </p>
                    <span className="text-[11px] font-mono block" style={{ color: tokens.textMuted }}>
                      {profileEmail}
                    </span>
                    <span className="text-[11px] font-mono block" style={{ color: tokens.textMuted }}>
                      {profilePhone}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-7 grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-gray-400 block">Role</span>
                    <span className="px-2.5 py-1 rounded-full font-bold text-[11px] inline-block bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Administrator
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 block">Member Since</span>
                    <span className="font-semibold block" style={{ color: tokens.textPrimary }}>
                      Mar 18, 2025
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 block">Last Login</span>
                    <span className="font-semibold block" style={{ color: tokens.textPrimary }}>
                      May 18, 2025, 10:24 AM
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* SECTION 2: ORGANIZATION */}
          <div id="organization" className="space-y-4">
            <Card theme={theme} hoverEffect={false} className="p-6 border space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: tokens.border }}>
                <div>
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                    Organization
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                    View and manage your organization details.
                  </p>
                </div>

                <button
                  className="px-4 py-2 rounded-[12px] text-xs font-bold border flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  style={{
                    borderColor: tokens.border,
                    backgroundColor: tokens.inputBg,
                    color: tokens.textPrimary,
                  }}
                >
                  <span>Manage Organization</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{
                    backgroundColor: 'rgba(91, 225, 106, 0.15)',
                    color: tokens.primaryAccent,
                  }}
                >
                  <Building2 className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold" style={{ color: tokens.textPrimary }}>
                    Greenfield University
                  </h4>
                  <p className="text-xs font-medium" style={{ color: tokens.textSecondary }}>
                    Higher Education Institution
                  </p>
                  <p className="text-xs" style={{ color: tokens.textMuted }}>
                    Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* SECTION 3: PREFERENCES, AI SETTINGS, PRIVACY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Preferences Card */}
            <Card id="preferences" theme={theme} hoverEffect={false} className="p-5 border flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="border-b pb-3" style={{ borderColor: tokens.border }}>
                  <h4 className="font-bold text-base" style={{ color: tokens.textPrimary }}>
                    Preferences
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                    Customize your application experience.
                  </p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Theme</span>
                    <select
                      value={theme}
                      onChange={(e) => {
                        if (e.target.value !== theme) onToggleTheme();
                      }}
                      className="px-2.5 py-1.5 rounded-lg border outline-none font-semibold text-xs cursor-pointer"
                      style={{
                        backgroundColor: tokens.inputBg,
                        borderColor: tokens.border,
                        color: tokens.textPrimary,
                      }}
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Language</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border outline-none font-semibold text-xs cursor-pointer"
                      style={{
                        backgroundColor: tokens.inputBg,
                        borderColor: tokens.border,
                        color: tokens.textPrimary,
                      }}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Date Format</span>
                    <span className="font-mono font-semibold" style={{ color: tokens.textPrimary }}>
                      {dateFormat}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Time Zone</span>
                    <span className="font-mono text-[11px] font-semibold truncate max-w-[120px]" style={{ color: tokens.textPrimary }}>
                      Asia/Kolkata
                    </span>
                  </div>
                </div>
              </div>

              <button className="text-xs font-bold text-[#5BE16A] hover:underline flex items-center gap-1 cursor-pointer pt-2">
                <span>Manage Preferences</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </Card>

            {/* AI & Analysis Settings Card */}
            <Card id="ai_settings" theme={theme} hoverEffect={false} className="p-5 border flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="border-b pb-3" style={{ borderColor: tokens.border }}>
                  <h4 className="font-bold text-base" style={{ color: tokens.textPrimary }}>
                    AI & Analysis Settings
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                    Configure AI models and analysis options.
                  </p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>LLM Provider</span>
                    <select
                      value={llmProvider}
                      onChange={(e) => setLlmProvider(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border outline-none font-semibold text-xs cursor-pointer"
                      style={{
                        backgroundColor: tokens.inputBg,
                        borderColor: tokens.border,
                        color: tokens.textPrimary,
                      }}
                    >
                      <option value="OpenAI (GPT-4o)">OpenAI (GPT-4o)</option>
                      <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Embedding Model</span>
                    <span className="font-mono text-[11px] font-semibold" style={{ color: tokens.textPrimary }}>
                      text-embedding-3
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Vector Database</span>
                    <span className="font-mono text-[11px] font-semibold" style={{ color: tokens.textPrimary }}>
                      ChromaDB
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Analysis Depth</span>
                    <span className="font-semibold text-emerald-400">Standard</span>
                  </div>
                </div>
              </div>

              <button className="text-xs font-bold text-[#5BE16A] hover:underline flex items-center gap-1 cursor-pointer pt-2">
                <span>Manage AI Settings</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </Card>

            {/* Data & Privacy Card */}
            <Card id="privacy" theme={theme} hoverEffect={false} className="p-5 border flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="border-b pb-3" style={{ borderColor: tokens.border }}>
                  <h4 className="font-bold text-base" style={{ color: tokens.textPrimary }}>
                    Data & Privacy
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                    Control data and privacy preferences.
                  </p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Data Encryption</span>
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Enabled
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Data Retention</span>
                    <select
                      value={retentionPeriod}
                      onChange={(e) => setRetentionPeriod(e.target.value)}
                      className="px-2 py-1 rounded-lg border outline-none font-semibold text-xs cursor-pointer"
                      style={{ backgroundColor: tokens.inputBg, borderColor: tokens.border, color: tokens.textPrimary }}
                    >
                      <option value="6 Months">6 Months</option>
                      <option value="12 Months">12 Months</option>
                      <option value="24 Months">24 Months</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Anonymize Data</span>
                    <button
                      onClick={() => setPrivacyToggles((p) => ({ ...p, anonymizeData: !p.anonymizeData }))}
                      className="px-2 py-0.5 rounded-full font-bold text-[10px] cursor-pointer"
                      style={{
                        backgroundColor: privacyToggles.anonymizeData ? 'rgba(91, 225, 106, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                        color: privacyToggles.anonymizeData ? '#5BE16A' : tokens.textMuted,
                      }}
                    >
                      {privacyToggles.anonymizeData ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: tokens.textSecondary }}>Audit Logs</span>
                    <button
                      onClick={() => setShowLogsModal(true)}
                      className="font-semibold cursor-pointer text-[#5BE16A] hover:underline"
                    >
                      View Logs &gt;
                    </button>
                  </div>
                </div>
              </div>

              <button className="text-xs font-bold text-[#5BE16A] hover:underline flex items-center gap-1 cursor-pointer pt-2">
                <span>Manage Privacy Settings</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </Card>
          </div>

          {/* SECTION 4: INTEGRATIONS CARD */}
          <div id="integrations" className="space-y-4">
            <Card theme={theme} hoverEffect={false} className="p-6 border space-y-6">
              <div className="border-b pb-4" style={{ borderColor: tokens.border }}>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                  Integrations
                </h3>
                <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                  Connected external services and educational databases.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-[14px] border flex items-center justify-between gap-3"
                    style={{
                      backgroundColor: tokens.inputBg,
                      borderColor: tokens.border,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold" style={{ color: tokens.textPrimary }}>
                          {item.name}
                        </h4>
                        <p className="text-[11px]" style={{ color: tokens.textMuted }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleIntegration(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        item.connected
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : 'bg-white/5 text-gray-400 border-gray-600/30 hover:bg-white/10'
                      }`}
                    >
                      {item.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* SECTION 5: NOTIFICATIONS CARD */}
          <div id="notifications" className="space-y-4">
            <Card theme={theme} hoverEffect={false} className="p-6 border space-y-6">
              <div className="border-b pb-4" style={{ borderColor: tokens.border }}>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                  Notifications
                </h3>
                <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                  Manage email and in-app notification preferences.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive analysis reports via email' },
                  { key: 'analysisCompleted', label: 'Analysis Completed Alerts', desc: 'Instant notification when curriculum audit finishes' },
                  { key: 'weeklyReports', label: 'Weekly Digest', desc: 'Weekly summary of curriculum gap updates' },
                  { key: 'systemUpdates', label: 'System Updates & Features', desc: 'News about platform improvements' },
                  { key: 'securityAlerts', label: 'Security & Access Alerts', desc: 'Notifications for login activities' },
                ].map((item) => {
                  const isChecked = (notificationToggles as any)[item.key];
                  return (
                    <div key={item.key} className="flex items-center justify-between py-1">
                      <div>
                        <span className="font-bold block" style={{ color: tokens.textPrimary }}>
                          {item.label}
                        </span>
                        <span className="text-[11px]" style={{ color: tokens.textMuted }}>
                          {item.desc}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          setNotificationToggles((prev) => ({
                            ...prev,
                            [item.key]: !(prev as any)[item.key],
                          }))
                        }
                        className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                          isChecked ? 'bg-[#5BE16A] justify-end' : 'bg-gray-700 justify-start'
                        }`}
                      >
                        <motion.div
                          layout
                          className="w-4 h-4 rounded-full bg-black shadow-md"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* SECTION 6: SECURITY CARD */}
          <div id="security" className="space-y-4">
            <Card theme={theme} hoverEffect={false} className="p-6 border space-y-6">
              <div className="border-b pb-4" style={{ borderColor: tokens.border }}>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                  Security
                </h3>
                <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary }}>
                  Manage your account security preferences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="p-4 rounded-[14px] border flex flex-col justify-between space-y-3"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <KeyRound className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-xs font-bold block" style={{ color: tokens.textPrimary }}>
                        Password
                      </span>
                      <span className="text-[11px] font-mono text-gray-400">Protected</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full py-2 rounded-lg text-xs font-bold border cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                    style={{ borderColor: tokens.border, color: tokens.textPrimary }}
                  >
                    Change
                  </button>
                </div>

                <div
                  className="p-4 rounded-[14px] border flex flex-col justify-between space-y-3"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-xs font-bold block" style={{ color: tokens.textPrimary }}>
                        Two-Factor Authentication
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400">Enabled</span>
                    </div>
                  </div>
                  <button
                    className="w-full py-2 rounded-lg text-xs font-bold border cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                    style={{ borderColor: tokens.border, color: tokens.textPrimary }}
                  >
                    Manage
                  </button>
                </div>

                <div
                  className="p-4 rounded-[14px] border flex flex-col justify-between space-y-3"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <div>
                      <span className="text-xs font-bold block" style={{ color: tokens.textPrimary }}>
                        Active Sessions
                      </span>
                      <span className="text-[11px] font-bold text-blue-400">2 Active</span>
                    </div>
                  </div>
                  <button
                    className="w-full py-2 rounded-lg text-xs font-bold border cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                    style={{ borderColor: tokens.border, color: tokens.textPrimary }}
                  >
                    View
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* SECTION 7: DANGER ZONE CARD */}
          <div id="danger" className="space-y-4">
            <Card
              theme={theme}
              hoverEffect={false}
              className="p-6 border space-y-4 bg-red-500/5 border-red-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-red-500 font-bold text-base">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Danger Zone</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Irreversible and destructive actions.
                  </p>
                </div>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2.5 rounded-[12px] text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 cursor-pointer self-start sm:self-auto flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </Card>
          </div>

          {/* BOTTOM SECURITY FOOTER NOTICE */}
          <div className="flex items-center justify-center gap-2 text-xs pt-4" style={{ color: tokens.textMuted }}>
            <Lock className="w-3.5 h-3.5 text-[#5BE16A]" />
            <span>Your data is secure and encrypted. We never share your information.</span>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {showEditProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditProfileModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-[18px] border p-6 shadow-2xl z-10 space-y-4"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            >
              <h3 className="text-lg font-bold">Edit Profile Information</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block mb-1 font-semibold text-gray-400">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border outline-none"
                    style={{ backgroundColor: tokens.inputBg, borderColor: tokens.border, color: tokens.textPrimary }}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-400">Role / Designation</label>
                  <input
                    type="text"
                    value={profileRole}
                    onChange={(e) => setProfileRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border outline-none"
                    style={{ backgroundColor: tokens.inputBg, borderColor: tokens.border, color: tokens.textPrimary }}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-400">Email Address</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border outline-none"
                    style={{ backgroundColor: tokens.inputBg, borderColor: tokens.border, color: tokens.textPrimary }}
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer"
                  style={{ borderColor: tokens.border, color: tokens.textSecondary }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer shadow-md"
                  style={{ backgroundColor: tokens.primaryAccent }}
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHANGE PASSWORD MODAL */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasswordModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-[18px] border p-6 shadow-2xl z-10 space-y-4"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            >
              <h3 className="text-lg font-bold">Change Password</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block mb-1 font-semibold text-gray-400">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-lg border outline-none"
                    style={{ backgroundColor: tokens.inputBg, borderColor: tokens.border, color: tokens.textPrimary }}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-400">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-lg border outline-none"
                    style={{ backgroundColor: tokens.inputBg, borderColor: tokens.border, color: tokens.textPrimary }}
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer"
                  style={{ borderColor: tokens.border, color: tokens.textSecondary }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer shadow-md"
                  style={{ backgroundColor: tokens.primaryAccent }}
                >
                  Update Password
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-[18px] border p-6 shadow-2xl z-10 space-y-4 border-red-500/30 bg-red-950/20 text-white"
            >
              <div className="flex items-center gap-3 text-red-500">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-bold">Delete Account</h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Are you sure you want to delete your Lumini account? This action is permanent and will remove all uploaded curricula, knowledge graph nodes, and AI recommendations.
              </p>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-700 text-xs font-semibold cursor-pointer hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-red-600 text-white cursor-pointer shadow-md hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
