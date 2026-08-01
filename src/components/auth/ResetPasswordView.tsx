import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { ThemeMode } from '../../types';
import { PasswordStrengthMeter, CapsLockWarning } from './PasswordSecurityTools';

interface ResetPasswordViewProps {
  email?: string;
  theme: ThemeMode;
  onResetComplete: () => void;
  onBackToLogin: () => void;
}

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({
  email = 'faculty@university.edu',
  theme,
  onResetComplete,
  onBackToLogin
}) => {
  const isDark = theme === 'dark';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!newPassword || !confirmPassword) {
      setErrorMsg('Please fill in both password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onResetComplete();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Security Token Verified</span>
        </div>
        <h2 className="font-heading font-bold text-2xl tracking-tight">Set New Password</h2>
        <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
          Updating password for <span className="font-mono text-[#10B981] font-semibold">{email}</span>
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
          {errorMsg}
        </div>
      )}

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="space-y-1">
            <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
              New Password
            </label>
            <div className="relative">
              <Lock className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
              <input
                type={showNewPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full text-xs font-medium pl-10 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                  isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={`absolute right-3.5 top-3.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Live Strength Meter & Caps Lock Indicator */}
            <CapsLockWarning theme={theme} />
            <PasswordStrengthMeter password={newPassword} theme={theme} />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full text-xs font-medium pl-10 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                  isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3.5 top-3.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.99] shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating Password Credentials...</span>
              </>
            ) : (
              <>
                <span>Reset Password & Login</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-center space-y-2"
        >
          <CheckCircle2 className="w-8 h-8 mx-auto" />
          <div className="font-heading font-bold text-base">Password Updated Successfully</div>
          <p className="text-xs text-current/80">
            Your security credentials have been updated across all active devices. Redirecting...
          </p>
        </motion.div>
      )}
    </div>
  );
};
