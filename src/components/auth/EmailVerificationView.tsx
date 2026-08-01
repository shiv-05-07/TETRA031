import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Inbox, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  ArrowLeft, 
  Loader2, 
  Sparkles,
  Check
} from 'lucide-react';
import { ThemeMode } from '../../types';

interface EmailVerificationViewProps {
  email: string;
  theme: ThemeMode;
  onVerificationComplete: () => void;
  onBackToLogin: () => void;
}

export const EmailVerificationView: React.FC<EmailVerificationViewProps> = ({
  email,
  theme,
  onVerificationComplete,
  onBackToLogin
}) => {
  const isDark = theme === 'dark';
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(45);

  useEffect(() => {
    let timer: any;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste of code
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newCode = [...code];
      digits.forEach((d, i) => {
        if (i < 6) newCode[i] = d;
      });
      setCode(newCode);
      const nextIndex = Math.min(digits.length, 5);
      document.getElementById(`otp-input-${nextIndex}`)?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (code.some(digit => digit === '')) {
      setErrorMsg('Please enter all 6 digits of your verification code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onVerificationComplete();
      }, 1500);
    }, 1200);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(60);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6 text-center py-2">
      {/* Animated Mail Illustration */}
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 rounded-full bg-[#10B981]/20 animate-ping opacity-30" />
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#34D399] p-0.5 shadow-xl shadow-[#10B981]/20 flex items-center justify-center">
          <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
            isDark ? 'bg-[#0A0A0A]' : 'bg-[#FFFFFF]'
          }`}>
            <Inbox className="w-10 h-10 text-[#10B981] animate-bounce" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Institutional Domain Check</span>
        </div>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">Check Your Inbox</h2>
        <p className={`text-xs sm:text-sm max-w-sm mx-auto leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-[#4B5563]'}`}>
          We have dispatched a 6-digit verification code to <span className="font-mono text-[#10B981] font-semibold">{email || 'faculty@university.edu'}</span>
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs text-center">
          {errorMsg}
        </div>
      )}

      {!isSuccess ? (
        <form onSubmit={handleVerify} className="space-y-5">
          {/* OTP Code Inputs */}
          <div className="space-y-2">
            <label className={`text-[11px] font-mono uppercase tracking-wider block ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
              Enter 6-Digit Code
            </label>
            <div className="flex items-center justify-center gap-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-11 h-13 text-center text-lg font-bold font-mono rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all ${
                    isDark ? 'bg-[#0A0A0A] border-[#262626] text-[#FAFAFA]' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                  }`}
                />
              ))}
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
                <span>Verifying Institutional Token...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Activate Workspace</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0}
              className="text-[#10B981] font-semibold hover:underline flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{resendTimer > 0 ? `Resend email in ${resendTimer}s` : 'Resend Email'}</span>
            </button>

            <button
              type="button"
              onClick={onBackToLogin}
              className={`flex items-center gap-1 font-medium ${isDark ? 'text-[#888888] hover:text-[#FAFAFA]' : 'text-[#6B7280] hover:text-[#111827]'}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </div>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] space-y-2"
        >
          <Check className="w-8 h-8 mx-auto" />
          <div className="font-heading font-bold text-base">Institutional Email Verified!</div>
          <p className="text-xs text-current/80">
            Welcome to Lumini. Redirecting to your workspace...
          </p>
        </motion.div>
      )}
    </div>
  );
};
