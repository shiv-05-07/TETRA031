import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Smartphone, Laptop, Globe, LogOut, CheckCircle2, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import { ThemeMode, UserSession } from '../../types';

interface SessionManagerProps {
  theme: ThemeMode;
  onClose?: () => void;
}

export const SessionManager: React.FC<SessionManagerProps> = ({ theme, onClose }) => {
  const isDark = theme === 'dark';

  const [sessions, setSessions] = useState<UserSession[]>([
    {
      id: 's1',
      device: 'MacBook Pro 16" (Apple M3 Max)',
      browser: 'Chrome v122.0 · macOS Sonoma',
      location: 'Stanford, CA, USA',
      ipAddress: '171.67.215.8 (University Network)',
      lastActive: 'Active Now',
      isCurrent: true
    },
    {
      id: 's2',
      device: 'iPad Pro 12.9" (Faculty Edition)',
      browser: 'Safari v17.2 · iPadOS',
      location: 'Palo Alto, CA, USA',
      ipAddress: '171.67.215.12',
      lastActive: '2 hours ago',
      isCurrent: false
    },
    {
      id: 's3',
      device: 'Dell XPS 15 (Laboratory Workstation)',
      browser: 'Firefox v123.0 · Ubuntu Linux',
      location: 'Cambridge, MA, USA (MIT Campus)',
      ipAddress: '18.9.22.4',
      lastActive: '3 days ago',
      isCurrent: false
    }
  ]);

  const [revokedMsg, setRevokedMsg] = useState<string | null>(null);

  const handleRevoke = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    setRevokedMsg('Session revoked. Secondary device logged out.');
    setTimeout(() => setRevokedMsg(null), 3000);
  };

  const handleRevokeAllOthers = () => {
    setSessions(prev => prev.filter(s => s.isCurrent));
    setRevokedMsg('All other active sessions have been terminated.');
    setTimeout(() => setRevokedMsg(null), 3000);
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-current/10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#10B981]/15 text-[#10B981]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base">Active Enterprise Sessions</h3>
            <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
              Device authorization & FERPA audit trail
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRevokeAllOthers}
          className="text-[11px] font-semibold text-red-500 hover:underline flex items-center gap-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Revoke Other Sessions</span>
        </button>
      </div>

      {revokedMsg && (
        <div className="p-2.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{revokedMsg}</span>
        </div>
      )}

      <div className="space-y-2.5">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
              sess.isCurrent
                ? 'bg-[#10B981]/10 border-[#10B981]'
                : isDark
                ? 'bg-[#0A0A0A] border-[#262626]'
                : 'bg-[#F8FAFC] border-[#E5E7EB]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg mt-0.5 ${
                sess.isCurrent ? 'bg-[#10B981] text-white' : isDark ? 'bg-[#1C1C1C] text-[#A3A3A3]' : 'bg-[#E2E8F0] text-[#475569]'
              }`}>
                {sess.device.includes('MacBook') || sess.device.includes('Dell') ? (
                  <Laptop className="w-4 h-4" />
                ) : (
                  <Smartphone className="w-4 h-4" />
                )}
              </div>

              <div className="space-y-0.5">
                <div className="font-heading font-bold text-xs flex items-center gap-2">
                  <span>{sess.device}</span>
                  {sess.isCurrent && (
                    <span className="text-[9px] px-2 py-0.2 rounded-full bg-[#10B981] text-white font-mono font-bold">
                      THIS DEVICE
                    </span>
                  )}
                </div>

                <div className={`text-[11px] ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                  {sess.browser}
                </div>

                <div className={`text-[10px] font-mono flex items-center gap-2 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#10B981]" />
                    {sess.location}
                  </span>
                  <span>•</span>
                  <span>{sess.ipAddress}</span>
                </div>
              </div>
            </div>

            {!sess.isCurrent && (
              <button
                type="button"
                onClick={() => handleRevoke(sess.id)}
                className="px-2.5 py-1 text-[11px] font-semibold text-red-500 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition-all"
              >
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={`p-3 rounded-xl border text-[11px] flex items-center justify-between ${
        isDark ? 'bg-[#121212] border-[#262626] text-[#A3A3A3]' : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#475569]'
      }`}>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#10B981]" />
          <span>Hardware Key / TOTP 2FA Enforcement: <strong className="text-[#10B981]">ACTIVE</strong></span>
        </div>
        <span className="font-mono text-[10px]">SOC2 ID: #882-SOC-SF</span>
      </div>
    </div>
  );
};
