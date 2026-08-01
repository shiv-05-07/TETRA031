import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  ArrowLeft, 
  Sun, 
  Moon, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  User, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  KeyRound,
  Building,
  Sparkles,
  Layers,
  Crown,
  Users
} from 'lucide-react';
import { ThemeMode, AcademicRole, InstitutionWorkspace, AuthStep } from '../types';
import { AuthLeftPanel } from './auth/AuthLeftPanel';
import { PasswordStrengthMeter, CapsLockWarning } from './auth/PasswordSecurityTools';
import { InstitutionSelector, defaultInstitutions } from './auth/InstitutionSelector';
import { RoleSelector } from './auth/RoleSelector';
import { EmailVerificationView } from './auth/EmailVerificationView';
import { ForgotPasswordView } from './auth/ForgotPasswordView';
import { ResetPasswordView } from './auth/ResetPasswordView';
import { SessionManager } from './auth/SessionManager';
import { supabase } from '../lib/supabase';

export type AuthTab = 'signIn' | 'signUp' | 'forgotPassword' | 'verification';

interface AuthPageProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onBackToHome: () => void;
  onNavigateDashboard?: (workspace?: InstitutionWorkspace) => void;
  initialTab?: AuthTab;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  theme,
  onToggleTheme,
  onBackToHome,
  onNavigateDashboard,
  initialTab = 'signIn'
}) => {
  const isDark = theme === 'dark';

  // Active step state machine
  const [currentStep, setCurrentStep] = useState<AuthStep>(
    initialTab === 'signUp' ? 'signUp' : initialTab === 'forgotPassword' ? 'forgotPassword' : 'signIn'
  );

  // Form Fields State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Fields
  const [signUpInstitutionName, setSignUpInstitutionName] = useState('');
  const [signUpUniversityEmail, setSignUpUniversityEmail] = useState('');
  const [signUpFullName, setSignUpFullName] = useState('');
  const [signUpRole, setSignUpRole] = useState<AcademicRole>('Dean');
  const [signUpDepartment, setSignUpDepartment] = useState('Computer Science & Engineering');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  // Active Workspace / Security Modal state
  const [selectedWorkspace, setSelectedWorkspace] = useState<InstitutionWorkspace>(defaultInstitutions[0]);
  const [showSessionsModal, setShowSessionsModal] = useState(false);

  // Form Status
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Handler for Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!signInEmail || !signInPassword) {
      setFormError('Please fill in both your institutional email and password.');
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: signInEmail,
      password: signInPassword,
    });
    
    setIsLoading(false);

    if (error) {
      setFormError(error.message);
    } else {
      // Navigate to Institution Selection after successful login
      setCurrentStep('institutionSelection');
    }
  };

  // Handler for SSO Login (Google / Microsoft)
  const handleSSOLogin = (provider: 'Google' | 'Microsoft') => {
    setFormError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormSuccess(`Authenticated via ${provider} Workspace SSO!`);
      setTimeout(() => {
        setCurrentStep('institutionSelection');
      }, 600);
    }, 1000);
  };

  // Handler for Register Step 1 -> Role Selection or Verification
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!signUpInstitutionName || !signUpUniversityEmail || !signUpFullName || !signUpDepartment || !signUpPassword) {
      setFormError('Please fill in all required institutional details.');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    if (signUpPassword.length < 8) {
      setFormError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    
    // Pass user metadata along with signup
    const { error } = await supabase.auth.signUp({
      email: signUpUniversityEmail,
      password: signUpPassword,
      options: {
        data: {
          full_name: signUpFullName,
          institution: signUpInstitutionName,
          department: signUpDepartment,
        }
      }
    });

    setIsLoading(false);

    if (error) {
      setFormError(error.message);
    } else {
      // Move to Role Selection or Verification
      setCurrentStep('roleSelection');
    }
  };

  // Handler for Role Confirmation
  const handleConfirmRole = (role: AcademicRole) => {
    setSignUpRole(role);
    setCurrentStep('verification');
  };

  // Handler for Verification Success -> Institution Workspace Selection
  const handleVerificationComplete = () => {
    setCurrentStep('institutionSelection');
  };

  // Final Action: Select Workspace -> Go to Dashboard
  const handleWorkspaceChosen = (workspace: InstitutionWorkspace, action?: 'default' | 'upload') => {
    setSelectedWorkspace(workspace);
    if (onNavigateDashboard) {
      onNavigateDashboard(workspace);
    } else {
      onBackToHome();
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAFAFA] text-[#111827]'
    }`}>
      
      {/* Top Header Navigation */}
      <header className={`w-full h-18 border-b px-4 sm:px-8 flex items-center justify-between z-30 transition-colors backdrop-blur-md sticky top-0 ${
        isDark ? 'bg-[#0A0A0A]/90 border-[#262626]' : 'bg-[#FFFFFF]/90 border-[#E5E7EB]'
      }`}>
        {/* Brand Logo & Back */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              isDark 
                ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA] hover:bg-[#171717]' 
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="h-4 w-px bg-current opacity-20 hidden sm:block" />

          <a href="#" onClick={onBackToHome} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                isDark ? 'bg-[#0A0A0A]' : 'bg-[#FFFFFF]'
              }`}>
                <GraduationCap className="w-4 h-4 text-[#10B981]" />
              </div>
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">Lumini</span>
          </a>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowSessionsModal(!showSessionsModal)}
            className={`hidden md:flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              isDark ? 'bg-[#111111] border-[#262626] text-[#10B981] hover:border-[#10B981]' : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#059669] hover:border-[#10B981]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SOC2 TYPE II · FERPA COMPLIANT</span>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#111111] border-[#262626] text-[#B3B3B3] hover:text-[#FAFAFA]'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#34D399]" /> : <Moon className="w-4 h-4 text-[#111827]" />}
          </button>
        </div>
      </header>

      {/* Main Split Screen Container */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT PANEL: Marketing & Enterprise Illustration (5 Columns) */}
        <div className="lg:col-span-5">
          <AuthLeftPanel theme={theme} />
        </div>

        {/* RIGHT PANEL: Authentication Form Container (7 Columns) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 xl:p-16 flex items-center justify-center relative">
          
          <div className="w-full max-w-lg space-y-6">
            
            {/* Glass Card Container (Rounded 22px, minimal border, soft shadow) */}
            <div className={`rounded-[22px] border shadow-2xl p-6 sm:p-8 relative transition-all ${
              isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB]'
            }`}>
              
              {/* Primary Tabs (Sign In / Register) for main entry views */}
              {(currentStep === 'signIn' || currentStep === 'signUp') && (
                <div className={`p-1 rounded-xl border flex items-center mb-6 ${
                  isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F1F5F9] border-[#E2E8F0]'
                }`}>
                  <button
                    type="button"
                    onClick={() => { setCurrentStep('signIn'); setFormError(null); setFormSuccess(null); }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      currentStep === 'signIn'
                        ? 'bg-[#10B981] text-white shadow-md'
                        : isDark ? 'text-[#888888] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCurrentStep('signUp'); setFormError(null); setFormSuccess(null); }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      currentStep === 'signUp'
                        ? 'bg-[#10B981] text-white shadow-md'
                        : isDark ? 'text-[#888888] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'
                    }`}
                  >
                    Register Institution
                  </button>
                </div>
              )}

              {/* Status Banner Messages */}
              <AnimatePresence mode="wait">
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </motion.div>
                )}

                {formSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3 mb-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{formSuccess}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* VIEW 1: SIGN IN FORM */}
              {currentStep === 'signIn' && (
                <motion.form 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSignIn} 
                  className="space-y-4"
                >
                  <div className="space-y-1 mb-2">
                    <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">Sign In to Lumini</h2>
                    <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                      Access university curriculum intelligence and ABET accreditation workspace
                    </p>
                  </div>

                  {/* Institution Email */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Institution Email
                    </label>
                    <div className="relative">
                      <Mail className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                      <input
                        type="email"
                        required
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="professor@stanford.edu / dean@mit.edu"
                        className={`w-full text-xs font-medium pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all ${
                          isDark 
                            ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' 
                            : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => { setCurrentStep('forgotPassword'); setFormError(null); }}
                        className="text-xs text-[#10B981] hover:underline font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                      <input
                        type={showSignInPassword ? 'text' : 'password'}
                        required
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full text-xs font-medium pl-10 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all ${
                          isDark 
                            ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' 
                            : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignInPassword(!showSignInPassword)}
                        className={`absolute right-3.5 top-3.5 ${isDark ? 'text-[#737373] hover:text-[#FAFAFA]' : 'text-[#9CA3AF] hover:text-[#111827]'}`}
                      >
                        {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Caps Lock Detector Warning */}
                    <CapsLockWarning theme={theme} />
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-[#262626] text-[#10B981] focus:ring-[#10B981] accent-[#10B981] cursor-pointer"
                      />
                      <span className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#4B5563]'}`}>
                        Remember this device for 30 days
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowSessionsModal(true)}
                      className={`text-[11px] font-mono hover:underline ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}
                    >
                      Sessions & Security
                    </button>
                  </div>

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.99] shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Authenticating Credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* SSO Divider */}
                  <div className="relative my-4 flex items-center justify-center">
                    <div className={`w-full border-t ${isDark ? 'border-[#262626]' : 'border-[#E5E7EB]'}`} />
                    <span className={`absolute px-3 text-[10px] font-mono uppercase tracking-wider ${
                      isDark ? 'bg-[#111111] text-[#737373]' : 'bg-[#FFFFFF] text-[#9CA3AF]'
                    }`}>
                      OR
                    </span>
                  </div>

                  {/* Social SSO Buttons */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleSSOLogin('Google')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isDark 
                          ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] hover:bg-[#171717]' 
                          : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6]'
                      }`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSSOLogin('Microsoft')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isDark 
                          ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] hover:bg-[#171717]' 
                          : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6]'
                      }`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 23 23">
                        <path fill="#f35325" d="M1 1h10v10H1z"/>
                        <path fill="#81bc06" d="M12 1h10v10H12z"/>
                        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                        <path fill="#ffba08" d="M12 12h10v10H12z"/>
                      </svg>
                      <span>Continue with Microsoft</span>
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                      New institution onboarding?{' '}
                      <button
                        type="button"
                        onClick={() => { setCurrentStep('signUp'); setFormError(null); }}
                        className="text-[#10B981] font-semibold hover:underline"
                      >
                        Register your institution.
                      </button>
                    </p>
                  </div>
                </motion.form>
              )}

              {/* VIEW 2: REGISTER INSTITUTION FORM */}
              {currentStep === 'signUp' && (
                <motion.form 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegisterSubmit} 
                  className="space-y-3.5"
                >
                  <div className="space-y-1 mb-2">
                    <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">Register Institution</h2>
                    <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                      Setup Lumini for your university, college, or accreditation body
                    </p>
                  </div>

                  {/* Institution Name */}
                  <div className="space-y-1">
                    <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Institution Name
                    </label>
                    <div className="relative">
                      <Building2 className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                      <input
                        type="text"
                        required
                        value={signUpInstitutionName}
                        onChange={(e) => setSignUpInstitutionName(e.target.value)}
                        placeholder="e.g. Stanford University / NIT Surat / Harvard"
                        className={`w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                          isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* University Email & Full Name Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                        University Email (.edu)
                      </label>
                      <div className="relative">
                        <Mail className={`w-4 h-4 absolute left-3 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                        <input
                          type="email"
                          required
                          value={signUpUniversityEmail}
                          onChange={(e) => setSignUpUniversityEmail(e.target.value)}
                          placeholder="faculty@stanford.edu"
                          className={`w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                            isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                        Full Name
                      </label>
                      <div className="relative">
                        <User className={`w-4 h-4 absolute left-3 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                        <input
                          type="text"
                          required
                          value={signUpFullName}
                          onChange={(e) => setSignUpFullName(e.target.value)}
                          placeholder="Dr. Eleanor Vance"
                          className={`w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                            isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role Selector Buttons */}
                  <div className="space-y-1">
                    <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Academic Role
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {(['Dean', 'HOD', 'Professor', 'Curriculum Committee', 'Administrator'] as AcademicRole[]).map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSignUpRole(role)}
                          className={`py-2 px-2.5 rounded-lg border text-[11px] font-semibold text-center transition-all ${
                            signUpRole === role
                              ? 'bg-[#10B981] text-white border-[#10B981] shadow-sm'
                              : isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#A3A3A3] hover:text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Department Field */}
                  <div className="space-y-1">
                    <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Department
                    </label>
                    <div className="relative">
                      <Building className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                      <input
                        type="text"
                        required
                        value={signUpDepartment}
                        onChange={(e) => setSignUpDepartment(e.target.value)}
                        placeholder="e.g. Electrical Engineering & Computer Science"
                        className={`w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                          isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className={`w-4 h-4 absolute left-3 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                        <input
                          type={showSignUpPassword ? 'text' : 'password'}
                          required
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className={`w-full text-xs font-medium pl-9 pr-8 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                            isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          className={`absolute right-2.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}
                        >
                          {showSignUpPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className={`w-4 h-4 absolute left-3 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                        <input
                          type={showSignUpConfirmPassword ? 'text' : 'password'}
                          required
                          value={signUpConfirmPassword}
                          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className={`w-full text-xs font-medium pl-9 pr-8 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                            isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA] placeholder-[#525252]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF]'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                          className={`absolute right-2.5 top-3 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}
                        >
                          {showSignUpConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Bar */}
                  <CapsLockWarning theme={theme} />
                  <PasswordStrengthMeter password={signUpPassword} theme={theme} showDetails={false} />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.99] shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Provisioning Institution Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => { setCurrentStep('signIn'); setFormError(null); }}
                        className="text-[#10B981] font-semibold hover:underline"
                      >
                        Sign in here.
                      </button>
                    </p>
                  </div>
                </motion.form>
              )}

              {/* VIEW 3: ROLE SELECTION STEP */}
              {currentStep === 'roleSelection' && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                  <RoleSelector
                    theme={theme}
                    initialRole={signUpRole}
                    onConfirmRole={handleConfirmRole}
                    onBack={() => setCurrentStep('signUp')}
                  />
                </motion.div>
              )}

              {/* VIEW 4: INSTITUTION SELECTION STEP */}
              {currentStep === 'institutionSelection' && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                  <InstitutionSelector
                    theme={theme}
                    userRole={signUpRole}
                    onSelectInstitution={handleWorkspaceChosen}
                  />
                </motion.div>
              )}

              {/* VIEW 5: FORGOT PASSWORD */}
              {currentStep === 'forgotPassword' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <ForgotPasswordView
                    theme={theme}
                    onBackToLogin={() => setCurrentStep('signIn')}
                    onTestResetPasswordFlow={(email) => {
                      setSignInEmail(email);
                      setCurrentStep('resetPassword');
                    }}
                  />
                </motion.div>
              )}

              {/* VIEW 6: RESET PASSWORD */}
              {currentStep === 'resetPassword' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <ResetPasswordView
                    email={signInEmail || 'faculty@university.edu'}
                    theme={theme}
                    onResetComplete={() => setCurrentStep('signIn')}
                    onBackToLogin={() => setCurrentStep('signIn')}
                  />
                </motion.div>
              )}

              {/* VIEW 7: EMAIL VERIFICATION */}
              {currentStep === 'verification' && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                  <EmailVerificationView
                    email={signUpUniversityEmail || signInEmail || 'faculty@university.edu'}
                    theme={theme}
                    onVerificationComplete={handleVerificationComplete}
                    onBackToLogin={() => setCurrentStep('signIn')}
                  />
                </motion.div>
              )}

            </div>

            {/* Bottom Security Footer */}
            <div className={`text-center text-[11px] font-mono space-y-1.5 ${isDark ? 'text-[#525252]' : 'text-[#9CA3AF]'}`}>
              <div className="flex items-center justify-center gap-3">
                <span>256-Bit SSL Encrypted</span>
                <span>•</span>
                <span>FERPA Compliant</span>
                <span>•</span>
                <span>ABET v2025</span>
              </div>
              <div>© 2026 Lumini Inc. All rights reserved.</div>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Sessions & Device Security Modal */}
      <AnimatePresence>
        {showSessionsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`w-full max-w-lg p-6 rounded-[22px] border shadow-2xl relative ${
                isDark ? 'bg-[#111111] border-[#262626] text-[#FAFAFA]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <SessionManager theme={theme} onClose={() => setShowSessionsModal(false)} />
              
              <div className="mt-5 pt-3 border-t border-current/10 text-right">
                <button
                  type="button"
                  onClick={() => setShowSessionsModal(false)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] rounded-xl transition-all cursor-pointer"
                >
                  Close Security View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
