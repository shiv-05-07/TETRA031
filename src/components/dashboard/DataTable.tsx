import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, MoreVertical, ArrowRight, BookOpen } from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { Card } from './Card';
import { SearchBar } from './SearchBar';
import { StatusBadge } from './StatusBadge';

export interface CurriculumItem {
  id: string;
  code: string;
  courseName: string;
  department: string;
  semester: string;
  uploadDate: string;
  status: 'Completed' | 'In Progress' | 'Pending' | string;
}

interface DataTableProps {
  theme: ThemeMode;
  items: CurriculumItem[];
  onRowClick?: (item: CurriculumItem) => void;
  onViewAll?: () => void;
  onFilterClick?: () => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  theme,
  items,
  onRowClick,
  onViewAll,
  onFilterClick,
}) => {
  const tokens = getThemeTokens(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredItems = items.filter(
    (item) =>
      item.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card theme={theme} hoverEffect={false} className="p-6 border flex flex-col justify-between">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2
            className="text-[28px] font-bold tracking-tight leading-none"
            style={{ color: tokens.textPrimary }}
          >
            Curricula Overview
          </h2>
          <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
            Review status, department coverage, and latest gap analysis updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            theme={theme}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full sm:w-64"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onFilterClick}
            aria-label="Filter"
            className="px-3.5 py-2.5 rounded-[12px] text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: tokens.border,
              borderWidth: '1px',
              color: tokens.textSecondary,
            }}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </motion.button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr
              className="border-b text-xs font-semibold uppercase tracking-wider"
              style={{
                borderColor: tokens.border,
                color: tokens.textMuted,
              }}
            >
              <th className="py-3.5 px-4 font-mono">Course Name</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Semester</th>
              <th className="py-3.5 px-4">Upload Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: tokens.border }}>
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick && onRowClick(item)}
                className="group cursor-pointer transition-colors duration-150"
                style={{
                  color: tokens.textPrimary,
                }}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                      style={{
                        backgroundColor: `${tokens.primaryAccent}15`,
                        color: tokens.primaryAccent,
                      }}
                    >
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm group-hover:underline" style={{ color: tokens.textPrimary }}>
                        {item.courseName}
                      </div>
                      <div className="text-xs font-mono" style={{ color: tokens.textSecondary }}>
                        {item.code}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-medium" style={{ color: tokens.textSecondary }}>
                  {item.department}
                </td>
                <td className="py-4 px-4 text-sm font-medium" style={{ color: tokens.textSecondary }}>
                  {item.semester}
                </td>
                <td className="py-4 px-4 text-sm font-mono" style={{ color: tokens.textSecondary }}>
                  {item.uploadDate}
                </td>
                <td className="py-4 px-4">
                  <StatusBadge theme={theme} status={item.status} />
                </td>
                <td className="py-4 px-4 text-right relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === item.id ? null : item.id);
                    }}
                    aria-label="Actions Menu"
                    className="p-1.5 rounded-lg transition-colors cursor-pointer"
                    style={{ color: tokens.textSecondary }}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {activeMenuId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 5 }}
                        className="absolute right-4 top-12 z-20 w-44 rounded-xl border p-1.5 shadow-xl text-left text-xs font-medium"
                        style={{
                          backgroundColor: tokens.cardBg,
                          borderColor: tokens.border,
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(null);
                            if (onRowClick) onRowClick(item);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                          style={{ color: tokens.textPrimary }}
                        >
                          Open Workspace
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                          style={{ color: tokens.textPrimary }}
                        >
                          Download Syllabus
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </td>
              </tr>
            ))}

            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm" style={{ color: tokens.textSecondary }}>
                  No curricula match your search filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="pt-6 mt-4 border-t flex items-center justify-between" style={{ borderColor: tokens.border }}>
        <button
          onClick={onViewAll}
          className="text-sm font-semibold flex items-center gap-2 group cursor-pointer transition-colors"
          style={{ color: tokens.primaryAccent }}
        >
          <span>View all curricula</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <span className="text-xs" style={{ color: tokens.textSecondary }}>
          Showing {filteredItems.length} of {items.length} curricula
        </span>
      </div>
    </Card>
  );
};
