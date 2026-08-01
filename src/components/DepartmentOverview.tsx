import React from 'react';
import { motion } from 'motion/react';
import { Building2, TrendingUp, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { ThemeMode } from '../types';

interface DepartmentOverviewProps {
  theme: ThemeMode;
}

export const DepartmentOverview: React.FC<DepartmentOverviewProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const DEPARTMENTS = [
    {
      name: 'Computer Engineering',
      alignment: 91,
      skillGap: 'Minor Gaps (3 skills)',
      trend: '+4.2% This Term',
      coursesCount: 24,
      status: 'Optimal'
    },
    {
      name: 'Information Technology',
      alignment: 88,
      skillGap: 'Minor Gaps (4 skills)',
      trend: '+3.8% This Term',
      coursesCount: 18,
      status: 'Optimal'
    },
    {
      name: 'Electrical Engineering',
      alignment: 75,
      skillGap: 'Moderate Gaps (6 skills)',
      trend: '+1.5% This Term',
      coursesCount: 20,
      status: 'Review Needed'
    },
    {
      name: 'Mechanical Engineering',
      alignment: 71,
      skillGap: 'Major Gaps (8 skills)',
      trend: '+0.8% This Term',
      coursesCount: 22,
      status: 'Review Needed'
    },
    {
      name: 'Civil Engineering',
      alignment: 67,
      skillGap: 'Critical Gaps (11 skills)',
      trend: '-1.2% Lagging',
      coursesCount: 16,
      status: 'Action Required'
    }
  ];

  return (
    <div className={`rounded-[24px] border p-6 sm:p-8 space-y-6 transition-all ${
      isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-lg'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#262626]/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/15 text-[#10B981] mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Institutional Scope</span>
          </div>
          <h2 className="font-heading font-bold text-2xl tracking-tight">University Departmental Overview</h2>
          <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
            Curriculum modernization status and industry alignment benchmark across all faculties.
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-[#10B981]">5 Faculties Audited</span>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {DEPARTMENTS.map((dept, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className={`p-5 rounded-[20px] border space-y-4 flex flex-col justify-between transition-all ${
              isDark ? 'bg-[#171717] border-[#262626] hover:border-[#10B981]/50' : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#10B981]/50 shadow-sm'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  dept.status === 'Optimal'
                    ? 'bg-[#10B981]/20 text-[#10B981]'
                    : dept.status === 'Review Needed'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-red-500/20 text-red-400'
                }`}>
                  {dept.status}
                </span>
                <span className={`text-[10px] font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                  {dept.coursesCount} Courses
                </span>
              </div>

              <h3 className="font-heading font-bold text-sm leading-snug">{dept.name}</h3>

              <div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-heading font-bold text-3xl text-[#10B981]">{dept.alignment}%</span>
                  <span className="text-[10px] font-mono text-[#10B981] font-semibold">{dept.trend}</span>
                </div>
                <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-[#10B981] h-full" style={{ width: `${dept.alignment}%` }} />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#262626]/30 space-y-1 text-[11px]">
              <span className={`block font-medium ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                {dept.skillGap}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
