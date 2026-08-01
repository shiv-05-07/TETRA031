import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';

interface PrimaryButtonProps extends HTMLMotionProps<'button'> {
  theme: ThemeMode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  theme,
  children,
  icon,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const tokens = getThemeTokens(theme);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`px-5 py-3 rounded-[14px] font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2.5 cursor-pointer text-black ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      style={{
        backgroundColor: tokens.primaryAccent,
        color: '#090909',
        boxShadow: `0 4px 14px ${tokens.primaryAccent}40`,
      }}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="leading-none">{children}</span>
    </motion.button>
  );
};
