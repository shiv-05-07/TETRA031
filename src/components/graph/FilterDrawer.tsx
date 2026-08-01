import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';

interface FilterDrawerProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (activeCategories: Record<string, boolean>) => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  theme,
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const tokens = getThemeTokens(theme);

  const [categories, setCategories] = useState<Record<string, boolean>>({
    Courses: true,
    Modules: true,
    'Course Outcomes': true,
    Skills: true,
    'Industry Roles': true,
    Technologies: true,
    'Market Demand': true,
  });

  const toggleCategory = (cat: string) => {
    setCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleReset = () => {
    const allTrue: Record<string, boolean> = {
      Courses: true,
      Modules: true,
      'Course Outcomes': true,
      Skills: true,
      'Industry Roles': true,
      Technologies: true,
      'Market Demand': true,
    };
    setCategories(allTrue);
    onApplyFilters(allTrue);
  };

  const handleApply = () => {
    onApplyFilters(categories);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full shadow-2xl p-6 overflow-y-auto space-y-6 z-10 border-l"
            style={{
              backgroundColor: tokens.cardBg,
              borderColor: tokens.border,
              color: tokens.textPrimary,
            }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: tokens.border }}>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5" style={{ color: tokens.primaryAccent }} />
                <h3 className="font-bold text-lg" style={{ color: tokens.textPrimary }}>
                  Filter Ontology Nodes
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl border cursor-pointer"
                style={{
                  backgroundColor: tokens.inputBg,
                  borderColor: tokens.border,
                  color: tokens.textSecondary,
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Checkboxes */}
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: tokens.textMuted }}>
                Node Categories
              </span>

              <div className="space-y-2.5">
                {Object.keys(categories).map((cat) => {
                  const isActive = categories[cat];

                  return (
                    <div
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        isActive
                          ? 'border-[#43D854]/40 bg-[#43D854]/10'
                          : 'border-inherit hover:border-gray-500'
                      }`}
                      style={{
                        backgroundColor: isActive ? `${tokens.primaryAccent}15` : tokens.inputBg,
                        borderColor: isActive ? `${tokens.primaryAccent}40` : tokens.border,
                      }}
                    >
                      <span className="text-xs font-semibold" style={{ color: tokens.textPrimary }}>
                        {cat}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isActive
                            ? 'bg-[#43D854] border-[#43D854] text-black font-bold'
                            : 'border-gray-500 bg-transparent'
                        }`}
                      >
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t flex items-center gap-3" style={{ borderColor: tokens.border }}>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer"
                style={{
                  backgroundColor: tokens.inputBg,
                  borderColor: tokens.border,
                  color: tokens.textSecondary,
                }}
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer shadow-md"
                style={{ backgroundColor: tokens.primaryAccent }}
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
