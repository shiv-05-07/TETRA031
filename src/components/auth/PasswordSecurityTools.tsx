import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, ShieldCheck, AlertTriangle, Lock, Check, X } from 'lucide-react';
import { ThemeMode } from '../../types';

interface PasswordSecurityToolsProps {
  password: string;
  theme: ThemeMode;
  showDetails?: boolean;
}

export const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (!password) return { score: 0, label: 'Empty', color: 'gray', checks: [] };

  const checks = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains a number', met: /[0-9]/.test(password) },
    { label: 'Contains special symbol (!@#$%)', met: /[^A-Za-z0-9]/.test(password) }
  ];

  const metCount = checks.filter(c => c.met).length;
  score = (metCount / checks.length) * 100;

  let label = 'Weak';
  let color = '#EF4444'; // Red

  if (score >= 100) {
    label = 'Enterprise Grade';
    color = '#10B981'; // Emerald
  } else if (score >= 80) {
    label = 'Strong';
    color = '#10B981';
  } else if (score >= 60) {
    label = 'Medium';
    color = '#F59E0B'; // Amber
  } else if (score >= 40) {
    label = 'Fair';
    color = '#F59E0B';
  }

  return { score, label, color, checks };
};

export const PasswordStrengthMeter: React.FC<PasswordSecurityToolsProps> = ({
  password,
  theme,
  showDetails = true
}) => {
  const isDark = theme === 'dark';
  const { score, label, color, checks } = calculatePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-2 mt-1.5">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className={isDark ? 'text-[#888888]' : 'text-[#6B7280]'}>Password Strength:</span>
          <span className="font-semibold" style={{ color }}>{label}</span>
        </div>
        <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-[#262626]' : 'bg-[#E5E7EB]'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      {/* Checklist details */}
      {showDetails && (
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {checks.map((check, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[10px]">
              {check.met ? (
                <Check className="w-3 h-3 text-[#10B981] flex-shrink-0" />
              ) : (
                <X className={`w-3 h-3 flex-shrink-0 ${isDark ? 'text-[#525252]' : 'text-[#9CA3AF]'}`} />
              )}
              <span className={check.met ? (isDark ? 'text-[#FAFAFA]' : 'text-[#111827]') : (isDark ? 'text-[#737373]' : 'text-[#6B7280]')}>
                {check.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Hook to detect Caps Lock
export const useCapsLock = () => {
  const [capsLockOn, setCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      const isCapsLock = e.getModifierState && e.getModifierState('CapsLock');
      setCapsLockOn(isCapsLock);
    };

    window.addEventListener('keydown', handleKeyEvent);
    window.addEventListener('keyup', handleKeyEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
      window.removeEventListener('keyup', handleKeyEvent);
    };
  }, []);

  return capsLockOn;
};

// Caps Lock Warning Indicator
export const CapsLockWarning: React.FC<{ theme: ThemeMode }> = ({ theme }) => {
  const isCapsLockOn = useCapsLock();
  if (!isCapsLockOn) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="p-1.5 px-2.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-semibold flex items-center gap-1.5 mt-1"
    >
      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
      <span>Caps Lock is ON</span>
    </motion.div>
  );
};
