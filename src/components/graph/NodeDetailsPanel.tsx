import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, X, Network, BookOpen, Briefcase, Zap, Code } from 'lucide-react';
import { ThemeMode } from '../../types';
import { getThemeTokens } from '../../theme/tokens';
import { Card } from '../dashboard/Card';

export interface SelectedNodeDetails {
  id: string;
  name: string;
  type: string;
  nodeId?: string;
  description: string;
  relatedSkills?: string[];
  relatedCourses?: string[];
  relatedRoles?: string[];
  connectedTechnologies?: string[];
}

interface NodeDetailsPanelProps {
  theme: ThemeMode;
  node?: SelectedNodeDetails | null;
  onClose?: () => void;
  onSelectRelatedNode?: (nodeName: string) => void;
}

export const NodeDetailsPanel: React.FC<NodeDetailsPanelProps> = ({
  theme,
  node,
  onClose,
  onSelectRelatedNode,
}) => {
  const tokens = getThemeTokens(theme);

  // Default node data matching user screenshot if no node is explicitly selected
  const defaultNode: SelectedNodeDetails = {
    id: 'sk_gt',
    name: 'Graph Traversal',
    type: 'Skill',
    nodeId: 'ID: SKILL_00345',
    description: 'Techniques to visit all vertices and edges in a graph systematically.',
    relatedSkills: [
      'Depth First Search',
      'Breadth First Search',
      'Topological Sort',
      'Shortest Path',
      'Minimum Spanning Tree',
    ],
    relatedCourses: [
      'Data Structures and Algorithms',
      'Discrete Mathematics',
      'Graph Theory',
    ],
    relatedRoles: [
      'Software Engineer',
      'Data Scientist',
      'ML Engineer',
      'Research Engineer',
    ],
    connectedTechnologies: ['Python', 'C++', 'NetworkX'],
  };

  const activeNode = node || defaultNode;

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'course':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'module':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'course outcome':
      case 'outcome':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'skill':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'industry role':
      case 'role':
      case 'job role':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'technology':
        return 'bg-violet-500/15 text-violet-400 border-violet-500/30';
      case 'market demand':
      case 'demand':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      default:
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <Card
      theme={theme}
      hoverEffect={false}
      className="p-6 border flex flex-col justify-between h-full space-y-6 overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: tokens.border }}>
          <h3 className="text-lg font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
            Node Details
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-colors cursor-pointer"
              style={{ color: tokens.textSecondary }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Selected Node Badge & Metadata */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${getTypeBadgeColor(
                activeNode.type
              )}`}
            >
              {activeNode.type}
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
            {activeNode.name}
          </h2>

          {activeNode.nodeId && (
            <span className="text-[11px] font-mono block" style={{ color: tokens.textMuted }}>
              {activeNode.nodeId}
            </span>
          )}

          <p className="text-xs leading-relaxed pt-1" style={{ color: tokens.textSecondary }}>
            {activeNode.description}
          </p>
        </div>

        {/* Related Skills Section */}
        {activeNode.relatedSkills && activeNode.relatedSkills.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold" style={{ color: tokens.textPrimary }}>
              <span>Related Skills ({activeNode.relatedSkills.length})</span>
            </div>

            <div className="space-y-1.5">
              {activeNode.relatedSkills.map((sk, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectRelatedNode && onSelectRelatedNode(sk)}
                  className="p-2.5 rounded-[12px] border flex items-center justify-between gap-2 text-xs font-medium cursor-pointer transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                    color: tokens.textPrimary,
                  }}
                >
                  <span className="truncate">{sk}</span>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tokens.textMuted }} />
                </div>
              ))}
            </div>
            <button className="text-[11px] font-semibold text-[#43D854] hover:underline cursor-pointer">
              View all
            </button>
          </div>
        )}

        {/* Related Courses Section */}
        {activeNode.relatedCourses && activeNode.relatedCourses.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold" style={{ color: tokens.textPrimary }}>
              <span>Related Courses ({activeNode.relatedCourses.length})</span>
            </div>

            <div className="space-y-1.5">
              {activeNode.relatedCourses.map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectRelatedNode && onSelectRelatedNode(c)}
                  className="p-2.5 rounded-[12px] border flex items-center justify-between gap-2 text-xs font-medium cursor-pointer transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                    color: tokens.textPrimary,
                  }}
                >
                  <span className="truncate">{c}</span>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tokens.textMuted }} />
                </div>
              ))}
            </div>
            <button className="text-[11px] font-semibold text-[#43D854] hover:underline cursor-pointer">
              View all
            </button>
          </div>
        )}

        {/* Related Roles Section */}
        {activeNode.relatedRoles && activeNode.relatedRoles.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold" style={{ color: tokens.textPrimary }}>
              <span>Related Roles ({activeNode.relatedRoles.length})</span>
            </div>

            <div className="space-y-1.5">
              {activeNode.relatedRoles.map((r, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectRelatedNode && onSelectRelatedNode(r)}
                  className="p-2.5 rounded-[12px] border flex items-center justify-between gap-2 text-xs font-medium cursor-pointer transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    backgroundColor: tokens.inputBg,
                    borderColor: tokens.border,
                    color: tokens.textPrimary,
                  }}
                >
                  <span className="truncate">{r}</span>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tokens.textMuted }} />
                </div>
              ))}
            </div>
            <button className="text-[11px] font-semibold text-[#43D854] hover:underline cursor-pointer">
              View all
            </button>
          </div>
        )}

        {/* Connected Technologies Section */}
        {activeNode.connectedTechnologies && activeNode.connectedTechnologies.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold" style={{ color: tokens.textPrimary }}>
              <span>Connected Technologies ({activeNode.connectedTechnologies.length})</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeNode.connectedTechnologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Primary CTA Button */}
      <div className="pt-4 border-t" style={{ borderColor: tokens.border }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-[14px] font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer text-black"
          style={{
            backgroundColor: tokens.primaryAccent,
            boxShadow: `0 4px 14px ${tokens.primaryAccent}40`,
          }}
        >
          <Network className="w-4 h-4 text-black" />
          <span>Explore Connections</span>
        </motion.button>
      </div>
    </Card>
  );
};
