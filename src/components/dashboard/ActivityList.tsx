import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { Card } from './Card';

export interface ActivityItem {
  id: string;
  courseCode: string;
  title: string;
  status: 'completed' | 'in_progress' | 'pending';
  timestamp: string;
}

interface ActivityListProps {
  theme: ThemeMode;
  activities: ActivityItem[];
  onViewAll?: () => void;
}

export const ActivityList: React.FC<ActivityListProps> = ({
  theme,
  activities,
  onViewAll,
}) => {
  const tokens = getThemeTokens(theme);

  const getStatusIcon = (status: ActivityItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-[#43D854] flex-shrink-0" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />;
      case 'pending':
      default:
        return <AlertCircle className="w-4 h-4 text-[#FBBF24] flex-shrink-0" />;
    }
  };

  return (
    <Card theme={theme} hoverEffect={true} className="p-6 border flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3
            className="text-lg font-bold tracking-tight"
            style={{ color: tokens.textPrimary }}
          >
            Recent Analyses
          </h3>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-mono font-semibold"
            style={{
              backgroundColor: tokens.inputBg,
              color: tokens.textSecondary,
            }}
          >
            Live Activity
          </span>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-inherit" style={{ color: tokens.border }}>
          {activities.map((item) => (
            <div key={item.id} className="relative flex items-start gap-3 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[23px] top-0.5 p-1 rounded-full bg-inherit" style={{ backgroundColor: tokens.cardBg }}>
                {getStatusIcon(item.status)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: tokens.primaryAccent }}
                  >
                    {item.courseCode}
                  </span>
                  <span className="text-[11px]" style={{ color: tokens.textSecondary }}>
                    {item.timestamp}
                  </span>
                </div>
                <p
                  className="text-xs font-medium truncate mt-0.5"
                  style={{ color: tokens.textPrimary }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer view all */}
      <div className="pt-4 mt-6 border-t" style={{ borderColor: tokens.border }}>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold flex items-center justify-between w-full group cursor-pointer"
          style={{ color: tokens.textSecondary }}
        >
          <span className="group-hover:text-emerald-500 transition-colors">View all activity</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500" />
        </button>
      </div>
    </Card>
  );
};
