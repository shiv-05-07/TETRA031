import React from 'react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';

export type StatusType = 'Completed' | 'In Progress' | 'Pending';

interface StatusBadgeProps {
  theme: ThemeMode;
  status: StatusType | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  theme,
  status,
  className = '',
}) => {
  const tokens = getThemeTokens(theme);

  let bg = tokens.pillBgPending;
  let color = tokens.pillTextPending;

  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes('completed') || normalizedStatus.includes('approved') || normalizedStatus.includes('optimal')) {
    bg = tokens.pillBgCompleted;
    color = tokens.pillTextCompleted;
  } else if (normalizedStatus.includes('progress') || normalizedStatus.includes('review') || normalizedStatus.includes('active')) {
    bg = tokens.pillBgInProgress;
    color = tokens.pillTextInProgress;
  } else if (normalizedStatus.includes('pending') || normalizedStatus.includes('revision') || normalizedStatus.includes('gap')) {
    bg = tokens.pillBgPending;
    color = tokens.pillTextPending;
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap ${className}`}
      style={{
        backgroundColor: bg,
        color: color,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {status}
    </span>
  );
};
