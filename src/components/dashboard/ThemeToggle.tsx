import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggleTheme,
  showLabel = false,
}) => {
  const tokens = getThemeTokens(theme);
  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggleTheme}
      aria-label="Toggle Theme"
      className="p-2.5 rounded-[12px] transition-colors flex items-center gap-2 cursor-pointer"
      style={{
        backgroundColor: tokens.inputBg,
        borderColor: tokens.border,
        borderWidth: '1px',
        color: tokens.textPrimary,
      }}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#43D854] flex-shrink-0" />
      ) : (
        <Moon className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
      )}
      {showLabel && (
        <span className="text-xs font-medium" style={{ color: tokens.textSecondary }}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </motion.button>
  );
};
