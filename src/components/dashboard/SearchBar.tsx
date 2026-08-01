import React from 'react';
import { Search } from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';

interface SearchBarProps {
  theme: ThemeMode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  theme,
  value,
  onChange,
  placeholder = 'Search curricula...',
  className = '',
}) => {
  const tokens = getThemeTokens(theme);

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        className="w-4 h-4 absolute left-3.5 pointer-events-none"
        style={{ color: tokens.textMuted }}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-sm font-medium pl-10 pr-4 py-2.5 rounded-[12px] transition-all outline-none"
        style={{
          backgroundColor: tokens.inputBg,
          borderColor: tokens.border,
          borderWidth: '1px',
          borderStyle: 'solid',
          color: tokens.textPrimary,
        }}
      />
    </div>
  );
};
