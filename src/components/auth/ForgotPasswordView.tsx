import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, KeyRound, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { ThemeMode } from '../../types';

interface ForgotPasswordViewProps {
  theme: ThemeMode;
  onBackToLogin: () => void;
  onTestResetPasswordFlow: (email: string) => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  theme,
  onBackToLogin,
  onTestResetPasswordFlow
}) => {
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email) {
      setErrorMsg('Please enter your university email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={onBackToLogin}
          className={`p-2 rounded-xl border transition-all ${
            isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#A3A3A3] hover:text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-black'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">Forgot Password</h2>
          <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
            Enter your university email to receive password reset instructions
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
          {errorMsg}
        </div>
      )}

      {!isSent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold block ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
              Institutional Email Address
            </label>
            <div className="relative">
              <Mail className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="professor@stanford.edu"
                className={`w-full text-xs font-medium pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] ${
                  isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 text-xs font-bold text-white rounded-xl bg-[#10B981] hover:bg-[#34D399] shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Send Reset Link</span>
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onBackToLogin}
              className={`text-xs font-semibold ${isDark ? 'text-[#888888] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}
            >
              Remember your password? Sign In
            </button>
          </div>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4 space-y-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mx-auto border border-[#10B981]/30">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg">Reset Link Dispatched</h3>
            <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-[#4B5563]'}`}>
              We've dispatched password reset instructions to <span className="font-mono text-[#10B981] font-semibold">{email}</span>.
            </p>
          </div>

          <div className={`p-3 rounded-xl border text-left text-xs space-y-2 ${
            isDark ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
          }`}>
            <div className="font-semibold text-[#10B981] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Reset Link Demo</span>
            </div>
            <p className={`text-[11px] ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
              You can immediately test setting a new password for this demo workspace.
            </p>
            <button
              type="button"
              onClick={() => onTestResetPasswordFlow(email)}
              className="w-full py-2 px-3 text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] rounded-lg transition-all"
            >
              Simulate Reset Link Click
            </button>
          </div>

          <button
            type="button"
            onClick={onBackToLogin}
            className={`text-xs font-semibold ${isDark ? 'text-[#888888] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}
          >
            Return to Sign In
          </button>
        </motion.div>
      )}
    </div>
  );
};
