import React from 'react';
import { motion } from 'motion/react';
import { LogOut, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';

interface UserProfileProps {
  theme: ThemeMode;
  userName?: string;
  userRole?: string;
  collapsed?: boolean;
  onSignOut?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  theme,
  userName = 'Dr. Ananya Sharma',
  userRole = 'Curriculum HOD',
  collapsed = false,
  onSignOut,
}) => {
  const tokens = getThemeTokens(theme);

  return (
    <div
      className={`p-2.5 rounded-[16px] border flex items-center transition-all ${
        collapsed ? 'justify-center' : 'justify-between gap-3'
      }`}
      style={{
        backgroundColor: tokens.inputBg,
        borderColor: tokens.border,
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
          style={{
            backgroundColor: `${tokens.primaryAccent}20`,
            color: tokens.primaryAccent,
            border: `1px solid ${tokens.primaryAccent}40`,
          }}
        >
          AS
        </div>

        {!collapsed && (
          <div className="min-w-0 flex-1">
            <div
              className="text-xs font-semibold truncate leading-tight"
              style={{ color: tokens.textPrimary }}
            >
              {userName}
            </div>
            <div
              className="text-[11px] truncate mt-0.5"
              style={{ color: tokens.textSecondary }}
            >
              {userRole}
            </div>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="flex items-center gap-1">
          {onSignOut ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onSignOut}
              title="Sign Out"
              className="p-1.5 rounded-lg cursor-pointer transition-colors"
              style={{ color: tokens.textSecondary }}
            >
              <LogOut className="w-3.5 h-3.5 hover:text-red-400" />
            </motion.button>
          ) : (
            <ChevronDown className="w-3.5 h-3.5" style={{ color: tokens.textSecondary }} />
          )}
        </div>
      )}
    </div>
  );
};
