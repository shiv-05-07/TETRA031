import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';

interface CardProps extends HTMLMotionProps<'div'> {
  theme: ThemeMode;
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  theme,
  children,
  className = '',
  hoverEffect = true,
  style,
  ...props
}) => {
  const tokens = getThemeTokens(theme);

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={`rounded-[18px] transition-colors duration-200 ${className}`}
      style={{
        backgroundColor: tokens.cardBg,
        borderColor: tokens.border,
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: tokens.cardShadow,
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
