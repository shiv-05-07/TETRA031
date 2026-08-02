import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Brain,
  Network,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  BarChart2,
  Tag
} from 'lucide-react';
import { ThemeMode } from '../types';
import { getThemeTokens } from '../theme/tokens';
import { Card } from './dashboard/Card';

export interface PastAnalysisRecord {
  id: string;
  courseCode: string;
  courseTitle: string;
  department: string;
  semester: string;
  academicYear: string;
  curriculumVersion: string;
  date: string;
  alignmentScore: number;
  coveragePercentage: number;
  totalSkills: number;
  coveredSkills: number;
  missingSkillsCount: number;
  outdatedSkillsCount: number;
  status: 'Completed' | 'In Progress' | 'Needs Review';
  missingSkills: string[];
  outdatedSkills: string[];
  backendAnalysis?: any;
  gapReport?: any;
}

interface PastAnalysisPageProps {
  theme: ThemeMode;
  records: PastAnalysisRecord[];
  onSelectAnalysis: (record: PastAnalysisRecord) => void;
  onNavigateGraph: () => void;
  onNavigateRecommendations: () => void;
  onOpenUpload: () => void;
  onDeleteRecord?: (id: string) => void;
}

export const PastAnalysisPage: React.FC<PastAnalysisPageProps> = ({
  theme,
  records,
  onSelectAnalysis,
  onNavigateGraph,
  onNavigateRecommendations,
  onOpenUpload,
  onDeleteRecord,
}) => {
  const tokens = getThemeTokens(theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filtered Records
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchesSearch =
        rec.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.missingSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDept = selectedDepartment === 'All' || rec.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'All' || rec.status === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [records, searchQuery, selectedDepartment, selectedStatus]);

  // Aggregate Stats
  const totalAnalyses = records.length;
  const avgAlignment = totalAnalyses > 0
    ? Math.round(records.reduce((acc, r) => acc + r.alignmentScore, 0) / totalAnalyses)
    : 0;
  const totalSkillsIdentified = records.reduce((acc, r) => acc + r.totalSkills, 0);
  const completedCount = records.filter((r) => r.status === 'Completed').length;

  const getStatusBadge = (status: PastAnalysisRecord['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span
            className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              backgroundColor: tokens.pillBgCompleted,
              color: tokens.pillTextCompleted,
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>In Progress</span>
          </span>
        );
      case 'Needs Review':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Needs Review</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-16">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight flex items-center gap-2.5"
            style={{ color: tokens.textPrimary }}
          >
            Past Curriculum Analyses
          </h1>
          <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
            Review, compare, and re-examine all previously executed AI curriculum gap reports.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenUpload}
          className="px-4 py-2.5 rounded-[14px] font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer text-black self-start md:self-auto"
          style={{
            backgroundColor: tokens.primaryAccent,
            boxShadow: `0 4px 14px ${tokens.primaryAccent}40`,
          }}
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Analyze New Curriculum</span>
        </motion.button>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <Card theme={theme} hoverEffect={true} className="p-5 border flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: tokens.textSecondary }}>
              Total Analyses Run
            </span>
            <FileText className="w-4 h-4" style={{ color: tokens.primaryAccent }} />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono tracking-tight" style={{ color: tokens.textPrimary }}>
              {totalAnalyses}
            </span>
            <span className="text-xs font-semibold text-emerald-400">
              {completedCount} Verified
            </span>
          </div>
        </Card>

        {/* Metric 2 */}
        <Card theme={theme} hoverEffect={true} className="p-5 border flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: tokens.textSecondary }}>
              Average Alignment Score
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono tracking-tight text-emerald-400">
              {avgAlignment}%
            </span>
            <span className="text-xs font-semibold text-emerald-400">+5.4% overall</span>
          </div>
        </Card>

        {/* Metric 3 */}
        <Card theme={theme} hoverEffect={true} className="p-5 border flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: tokens.textSecondary }}>
              Total Skills Audited
            </span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono tracking-tight text-blue-400">
              {totalSkillsIdentified}
            </span>
            <span className="text-xs font-semibold text-blue-400">Across {totalAnalyses} courses</span>
          </div>
        </Card>

        {/* Metric 4 */}
        <Card theme={theme} hoverEffect={true} className="p-5 border flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: tokens.textSecondary }}>
              Accreditation Ready
            </span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono tracking-tight text-purple-400">
              {completedCount} / {totalAnalyses}
            </span>
            <span className="text-xs font-semibold text-purple-400">ABET Criterion 3</span>
          </div>
        </Card>
      </div>

      {/* SEARCH AND FILTERS */}
      <Card theme={theme} hoverEffect={false} className="p-4 border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course code, title, department, or missing skills..."
              className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-[12px] border outline-none transition-all"
              style={{
                backgroundColor: tokens.inputBg,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3.5 py-2.5 text-xs font-semibold rounded-[12px] border outline-none cursor-pointer"
              style={{
                backgroundColor: tokens.inputBg,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            >
              <option value="All">All Departments</option>
              <option value="Computer Science and Engineering">Computer Science</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2.5 text-xs font-semibold rounded-[12px] border outline-none cursor-pointer"
              style={{
                backgroundColor: tokens.inputBg,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Needs Review">Needs Review</option>
            </select>
          </div>
        </div>
      </Card>

      {/* ANALYSIS CARDS LIST */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <Card theme={theme} hoverEffect={false} className="p-12 text-center border">
            <p className="text-sm font-medium" style={{ color: tokens.textSecondary }}>
              No past curriculum analyses found matching your filter criteria.
            </p>
          </Card>
        ) : (
          filteredRecords.map((record) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="rounded-[20px] border p-6 transition-all hover:shadow-xl space-y-4"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.border,
              }}
            >
              {/* Card Header: Course Code, Title & Status */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: tokens.border }}>
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0 font-bold font-mono text-sm"
                    style={{
                      backgroundColor: `${tokens.primaryAccent}15`,
                      color: tokens.primaryAccent,
                    }}
                  >
                    {record.courseCode.split('-')[1] || 'CS'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-gray-800/40 text-gray-300 border border-gray-700/50">
                        {record.courseCode}
                      </span>
                      <span className="text-xs font-medium" style={{ color: tokens.textMuted }}>
                        v{record.curriculumVersion}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold tracking-tight mt-0.5 cursor-pointer hover:underline"
                      style={{ color: tokens.textPrimary }}
                      onClick={() => onSelectAnalysis(record)}
                    >
                      {record.courseTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto">
                  {getStatusBadge(record.status)}
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>{record.date}</span>
                  </span>
                </div>
              </div>

              {/* Card Body: Department, Metrics, Skills */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left 5 Cols: Course Metadata & Alignment */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: tokens.textSecondary }}>
                    <span className="font-semibold">{record.department}</span>
                    <span>•</span>
                    <span>Semester {record.semester}</span>
                    <span>•</span>
                    <span>{record.academicYear}</span>
                  </div>

                  {/* Alignment Score Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span style={{ color: tokens.textMuted }}>Industry Alignment Score</span>
                      <span className="font-bold font-mono text-emerald-400">{record.alignmentScore}%</span>
                    </div>
                    <div className="w-full bg-gray-800/40 h-2 rounded-full overflow-hidden border border-gray-700/30">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${record.alignmentScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Middle 4 Cols: Key Identified Missing Skills */}
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: tokens.textMuted }}>
                    Missing Industry Skills ({record.missingSkillsCount})
                  </span>

                  <div className="flex flex-wrap gap-1.5">
                    {record.missingSkills.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {record.missingSkills.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-gray-800 text-gray-400">
                        +{record.missingSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Right 3 Cols: Actions */}
                <div className="lg:col-span-3 flex items-center lg:justify-end gap-2.5 pt-2 lg:pt-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectAnalysis(record)}
                    className="flex-1 lg:flex-none px-4 py-2.5 rounded-[12px] font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer text-black"
                    style={{
                      backgroundColor: tokens.primaryAccent,
                    }}
                  >
                    <span>View Analysis Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>

                  {onDeleteRecord && (
                    <button
                      onClick={() => onDeleteRecord(record.id)}
                      className="p-2.5 rounded-[12px] text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 cursor-pointer"
                      title="Delete Analysis"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
