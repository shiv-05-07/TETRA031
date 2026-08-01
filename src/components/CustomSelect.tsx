import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

export interface CustomSelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  icon?: React.ElementType;
}

interface CustomSelectProps {
  options: (string | CustomSelectOption)[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  theme?: ThemeMode;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  label,
  theme = 'dark',
  className = '',
  disabled = false,
  size = 'md'
}) => {
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to object format
  const normalizedOptions: CustomSelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2.5 text-xs sm:text-sm rounded-[12px]',
    lg: 'px-4 py-3 text-sm rounded-xl'
  };

  return (
    <div className={`relative w-full text-left ${className}`} ref={containerRef}>
      {label && (
        <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
          {label}
        </label>
      )}

      {/* Select Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full ${sizeClasses[size]} flex items-center justify-between gap-2 border transition-all cursor-pointer font-medium outline-none select-none ${
          isOpen
            ? 'border-[#10B981] ring-2 ring-[#10B981]/20 shadow-md'
            : isDark
            ? 'bg-[#171717] border-[#262626] text-[#FAFAFA] hover:border-[#333333]'
            : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#111827] hover:border-[#D1D5DB] shadow-2xs'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <selectedOption.icon className="w-4 h-4 text-[#10B981] flex-shrink-0" />
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {selectedOption?.badge && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#10B981]/15 text-[#10B981]">
              {selectedOption.badge}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-[#10B981] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </button>

      {/* Enhanced Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 left-0 right-0 w-full rounded-[14px] border shadow-2xl overflow-hidden backdrop-blur-md max-h-60 overflow-y-auto ${
              isDark
                ? 'bg-[#141414]/98 border-[#262626] text-[#FAFAFA] divide-y divide-[#262626]/40'
                : 'bg-[#FFFFFF]/98 border-[#E5E7EB] text-[#111827] divide-y divide-[#E5E7EB]/40 shadow-xl'
            }`}
            style={{
              boxShadow: isDark 
                ? '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 8px 10px -6px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(16, 185, 129, 0.15)' 
                : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(16, 185, 129, 0.2)'
            }}
          >
            <div className="p-1 space-y-0.5">
              {normalizedOptions.map((option) => {
                const isSelected = option.value === value;
                const OptionIcon = option.icon;

                return (
                  <div
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                      isSelected
                        ? isDark
                          ? 'bg-[#10B981]/20 text-[#34D399] font-semibold'
                          : 'bg-[#10B981]/15 text-[#059669] font-semibold'
                        : isDark
                        ? 'hover:bg-[#1F1F1F] text-[#D4D4D4] hover:text-[#FAFAFA]'
                        : 'hover:bg-[#F1F5F9] text-[#374151] hover:text-[#111827]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {OptionIcon ? (
                        <OptionIcon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#10B981]' : isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                      ) : null}
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm truncate leading-tight">{option.label}</div>
                        {option.description && (
                          <div className={`text-[10px] mt-0.5 truncate ${
                            isSelected 
                              ? isDark ? 'text-[#34D399]/80' : 'text-[#059669]/80' 
                              : isDark ? 'text-[#737373]' : 'text-[#6B7280]'
                          }`}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {option.badge && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-medium ${
                          isSelected 
                            ? 'bg-[#10B981] text-white' 
                            : isDark ? 'bg-[#262626] text-[#A3A3A3]' : 'bg-[#E2E8F0] text-[#475569]'
                        }`}>
                          {option.badge}
                        </span>
                      )}

                      {isSelected && (
                        <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
