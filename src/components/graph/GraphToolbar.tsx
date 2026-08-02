import React from 'react';
import { motion } from 'motion/react';
import {
  ChevronDown,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Maximize,
  RefreshCw,
  Eye
} from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';

interface GraphToolbarProps {
  theme: ThemeMode;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitGraph: () => void;
  onToggleFullscreen?: () => void;
  selectedView?: string;
  onViewChange?: (view: string) => void;
}

export const GraphToolbar: React.FC<GraphToolbarProps> = ({
  theme,
  onZoomIn,
  onZoomOut,
  onFitGraph,
  onToggleFullscreen,
  selectedView = 'Skill Ontology',
  onViewChange,
}) => {
  const tokens = getThemeTokens(theme);

  const legendItems = [
    { label: 'Course', color: '#43D854' },
    { label: 'Module', color: '#3B82F6' },
    { label: 'Outcome', color: '#8B5CF6' },
    { label: 'Skill', color: '#F59E0B' },
    { label: 'Role', color: '#06B6D4' },
    { label: 'Technology', color: '#A855F7' },
    { label: 'Demand', color: '#EF4444' },
  ];

  return (
    <div
      className="p-3.5 rounded-t-[18px] border-b flex flex-col md:flex-row md:items-center justify-between gap-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111214' : '#FFFFFF',
        borderColor: tokens.border,
      }}
    >
      {/* Left: View Dropdown & Legend Indicators */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* View Select */}
        <div className="relative">
          <select
            value={selectedView}
            onChange={(e) => onViewChange && onViewChange(e.target.value)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl border outline-none appearance-none cursor-pointer pr-8"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: tokens.border,
              color: tokens.textPrimary,
            }}
          >
            <option value="Skill Ontology">View: Skill Ontology</option>
            <option value="Curriculum Coverage">View: Curriculum Coverage</option>
            <option value="Market Alignment">View: Market Alignment</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 pointer-events-none" style={{ color: tokens.textMuted }} />
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center gap-3 flex-wrap">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span style={{ color: tokens.textSecondary }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Graph Control Buttons */}
      <div className="flex items-center gap-1.5 self-end md:self-auto">
        <button
          onClick={onFitGraph}
          title="Fit Graph"
          className="p-2 rounded-lg border transition-colors cursor-pointer"
          style={{
            backgroundColor: tokens.inputBg,
            borderColor: tokens.border,
            color: tokens.textSecondary,
          }}
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          onClick={onZoomIn}
          title="Zoom In"
          className="p-2 rounded-lg border transition-colors cursor-pointer"
          style={{
            backgroundColor: tokens.inputBg,
            borderColor: tokens.border,
            color: tokens.textSecondary,
          }}
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={onZoomOut}
          title="Zoom Out"
          className="p-2 rounded-lg border transition-colors cursor-pointer"
          style={{
            backgroundColor: tokens.inputBg,
            borderColor: tokens.border,
            color: tokens.textSecondary,
          }}
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            title="Fullscreen"
            className="p-2 rounded-lg border transition-colors cursor-pointer"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: tokens.border,
              color: tokens.textSecondary,
            }}
          >
            <Maximize className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
