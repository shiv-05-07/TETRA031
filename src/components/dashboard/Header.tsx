import React from 'react';
import { Sparkles } from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { ThemeToggle } from './ThemeToggle';
import { PrimaryButton } from './PrimaryButton';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onAnalyzeNewCurriculum: () => void;
  greetingName?: string;
  subtitle?: string;
}

import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onAnalyzeNewCurriculum,
  greetingName = 'Dr. Ananya',
  subtitle = "Here's an overview of your curriculum analyses.",
}) => {
  const tokens = getThemeTokens(theme);
  const { user, profile } = useAuth();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
      <div>
        <h1
          className="text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-tight leading-tight flex items-center gap-2"
          style={{ color: tokens.textPrimary }}
        >
          Good evening, {profile?.full_name || user?.user_metadata?.full_name || greetingName} <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p
          className="text-sm sm:text-base mt-1"
          style={{ color: tokens.textSecondary }}
        >
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

        <PrimaryButton
          theme={theme}
          onClick={onAnalyzeNewCurriculum}
          icon={<Sparkles className="w-4 h-4 text-black" />}
        >
          Analyze New Curriculum
        </PrimaryButton>
      </div>
    </header>
  );
};
