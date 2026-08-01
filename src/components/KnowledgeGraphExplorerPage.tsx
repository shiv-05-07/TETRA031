import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Settings,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Maximize,
  GraduationCap,
  BookOpen,
  Target,
  Zap,
  Briefcase,
  Code,
  Network,
  Lock,
  Plus,
  Minus
} from 'lucide-react';
import { ThemeMode } from '../types';
import { getThemeTokens } from '../theme/tokens';
import { ThemeToggle } from './dashboard/ThemeToggle';
import { SummaryCards } from './graph/SummaryCards';
import { GraphToolbar } from './graph/GraphToolbar';
import { NodeDetailsPanel, SelectedNodeDetails } from './graph/NodeDetailsPanel';
import { FilterDrawer } from './graph/FilterDrawer';

interface KnowledgeGraphExplorerPageProps {
  theme: ThemeMode;
  onOpenWorkspace?: (courseCode: string) => void;
  onExportGraph?: () => void;
  onToggleTheme?: () => void;
}

export type GraphCategory =
  | 'Course'
  | 'Module'
  | 'Course Outcome'
  | 'Skill'
  | 'Industry Role'
  | 'Technology'
  | 'Market Demand';

export interface NeoNode {
  id: string;
  name: string;
  category: GraphCategory;
  nodeId?: string;
  description: string;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  demandPercent?: string;
  relatedSkills?: string[];
  relatedCourses?: string[];
  relatedRoles?: string[];
  connectedTechnologies?: string[];
}

export interface NeoEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  color?: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COLOR MAPPING FOR NODE CATEGORIES & EDGES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const CATEGORY_COLORS: Record<
  GraphCategory,
  { bg: string; border: string; hex: string; glow: string; text: string }
> = {
  Course: {
    bg: 'rgba(67, 216, 84, 0.15)',
    border: '#43D854',
    hex: '#43D854',
    glow: 'rgba(67, 216, 84, 0.4)',
    text: '#43D854',
  },
  Module: {
    bg: 'rgba(59, 130, 246, 0.15)',
    border: '#3B82F6',
    hex: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.4)',
    text: '#60A5FA',
  },
  'Course Outcome': {
    bg: 'rgba(139, 92, 246, 0.15)',
    border: '#8B5CF6',
    hex: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.4)',
    text: '#A78BFA',
  },
  Skill: {
    bg: 'rgba(245, 158, 11, 0.15)',
    border: '#F59E0B',
    hex: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.4)',
    text: '#FBBF24',
  },
  'Industry Role': {
    bg: 'rgba(6, 182, 212, 0.15)',
    border: '#06B6D4',
    hex: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.4)',
    text: '#22D3EE',
  },
  Technology: {
    bg: 'rgba(168, 85, 247, 0.15)',
    border: '#A855F7',
    hex: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.4)',
    text: '#C084FC',
  },
  'Market Demand': {
    bg: 'rgba(239, 68, 68, 0.15)',
    border: '#EF4444',
    hex: '#EF4444',
    glow: 'rgba(239, 68, 68, 0.4)',
    text: '#F87171',
  },
};

export const EDGE_COLORS: Record<string, string> = {
  HAS_MODULE: '#43D854',
  HAS_OUTCOME: '#3B82F6',
  REQUIRES_SKILL: '#F59E0B',
  LEADS_TO: '#06B6D4',
  USES_TECHNOLOGY: '#8B5CF6',
  IN_DEMAND_FOR: '#EF4444',
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIAL NEO4J ONTOLOGY GRAPH DATASET
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const NEO_NODES: NeoNode[] = [
  // Layer 1: Course (Green)
  {
    id: 'c1',
    name: 'Data Structures and Algorithms',
    category: 'Course',
    nodeId: 'ID: COURSE_001',
    description: 'Core computer science course covering fundamental data structures, graph algorithms, and time complexity.',
    x: 500,
    y: 90,
  },

  // Layer 2: Modules (Blue)
  {
    id: 'm1',
    name: 'Arrays & Linked Lists',
    category: 'Module',
    nodeId: 'ID: MOD_010',
    description: 'Linear data structures, memory allocation, and contiguous storage techniques.',
    x: 250,
    y: 200,
  },
  {
    id: 'm2',
    name: 'Trees & Graphs',
    category: 'Module',
    nodeId: 'ID: MOD_020',
    description: 'Hierarchical tree topologies, binary search trees, and adjacency graphs.',
    x: 500,
    y: 200,
  },
  {
    id: 'm3',
    name: 'Sorting & Searching',
    category: 'Module',
    nodeId: 'ID: MOD_030',
    description: 'Divide-and-conquer algorithms, quicksort, mergesort, and binary search.',
    x: 750,
    y: 200,
  },

  // Layer 3: Course Outcomes (Purple)
  {
    id: 'o1',
    name: 'Understand linear data structures',
    category: 'Course Outcome',
    nodeId: 'ID: OUTCOME_101',
    description: 'Ability to construct and evaluate dynamic linked lists and stack/queue primitives.',
    x: 250,
    y: 310,
  },
  {
    id: 'o2',
    name: 'Apply tree and graph concepts',
    category: 'Course Outcome',
    nodeId: 'ID: OUTCOME_102',
    description: 'Formulate tree traversals and graph pathfinding algorithms for complex networks.',
    x: 500,
    y: 310,
  },
  {
    id: 'o3',
    name: 'Analyze algorithm efficiency',
    category: 'Course Outcome',
    nodeId: 'ID: OUTCOME_103',
    description: 'Evaluate Big-O time and space asymptotic bounds for recursive routines.',
    x: 750,
    y: 310,
  },

  // Layer 4: Skills (Yellow)
  {
    id: 's1',
    name: 'Problem Solving',
    category: 'Skill',
    nodeId: 'ID: SKILL_00101',
    description: 'Analytical decomposition of complex technical problems into algorithmic components.',
    x: 170,
    y: 440,
  },
  {
    id: 's2',
    name: 'Data Structure Design',
    category: 'Skill',
    nodeId: 'ID: SKILL_00102',
    description: 'Designing space-efficient custom data structures tailored for high-throughput I/O.',
    x: 300,
    y: 440,
  },
  {
    id: 's3',
    name: 'Graph Traversal',
    category: 'Skill',
    nodeId: 'ID: SKILL_00345',
    description: 'Techniques to visit all vertices and edges in a graph systematically.',
    x: 430,
    y: 440,
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
  },
  {
    id: 's4',
    name: 'Tree Traversal',
    category: 'Skill',
    nodeId: 'ID: SKILL_00346',
    description: 'In-order, pre-order, post-order, and level-order search strategies on N-ary trees.',
    x: 560,
    y: 440,
  },
  {
    id: 's5',
    name: 'Algorithm Analysis',
    category: 'Skill',
    nodeId: 'ID: SKILL_00347',
    description: 'Proving correctness and worst-case mathematical runtime complexity bounds.',
    x: 690,
    y: 440,
  },
  {
    id: 's6',
    name: 'Time & Space Complexity',
    category: 'Skill',
    nodeId: 'ID: SKILL_00348',
    description: 'Profiling auxiliary space allocation and CPU instruction cycles in production code.',
    x: 820,
    y: 440,
  },

  // Layer 5: Industry Roles (Cyan)
  {
    id: 'r1',
    name: 'Software Engineer',
    category: 'Industry Role',
    nodeId: 'ID: ROLE_501',
    description: 'Builds enterprise software applications, backend microservices, and client systems.',
    x: 350,
    y: 570,
  },
  {
    id: 'r2',
    name: 'Data Scientist',
    category: 'Industry Role',
    nodeId: 'ID: ROLE_502',
    description: 'Extracts statistical insights, builds predictive models, and analyzes graph datasets.',
    x: 500,
    y: 570,
  },
  {
    id: 'r3',
    name: 'ML Engineer',
    category: 'Industry Role',
    nodeId: 'ID: ROLE_503',
    description: 'Deploys machine learning models, vector similarity indices, and neural networks at scale.',
    x: 650,
    y: 570,
  },

  // Layer 6: Market Demand (Red)
  {
    id: 'd1',
    name: 'High Demand (85%)',
    category: 'Market Demand',
    nodeId: 'ID: DEMAND_01',
    demandPercent: '85%',
    description: 'High market hiring frequency across tech startups and enterprise firms.',
    x: 350,
    y: 690,
  },
  {
    id: 'd2',
    name: 'Very High Demand (92%)',
    category: 'Market Demand',
    nodeId: 'ID: DEMAND_02',
    demandPercent: '92%',
    description: 'Extremely high demand surge in tech job listings and cloud software sectors.',
    x: 500,
    y: 690,
  },
  {
    id: 'd3',
    name: 'Very High Demand (90%)',
    category: 'Market Demand',
    nodeId: 'ID: DEMAND_03',
    demandPercent: '90%',
    description: 'Top hiring priority in AI and machine learning engineering domains.',
    x: 650,
    y: 690,
  },

  // Side Nodes: Technologies (Violet)
  {
    id: 't1',
    name: 'Python',
    category: 'Technology',
    nodeId: 'ID: TECH_801',
    description: 'High-level programming language widely used in AI, data science, and scripting.',
    x: 930,
    y: 280,
  },
  {
    id: 't2',
    name: 'C++',
    category: 'Technology',
    nodeId: 'ID: TECH_802',
    description: 'High-performance systems programming language for low-level memory control.',
    x: 930,
    y: 370,
  },
  {
    id: 't3',
    name: 'Java',
    category: 'Technology',
    nodeId: 'ID: TECH_803',
    description: 'Object-oriented language popular for enterprise systems and Android backends.',
    x: 930,
    y: 460,
  },
  {
    id: 't4',
    name: 'NetworkX',
    category: 'Technology',
    nodeId: 'ID: TECH_804',
    description: 'Python library for the creation, manipulation, and study of complex networks.',
    x: 930,
    y: 550,
  },
];

const NEO_EDGES: NeoEdge[] = [
  // Course -> Modules
  { id: 'e1', source: 'c1', target: 'm1', label: 'HAS_MODULE' },
  { id: 'e2', source: 'c1', target: 'm2', label: 'HAS_MODULE' },
  { id: 'e3', source: 'c1', target: 'm3', label: 'HAS_MODULE' },

  // Modules -> Outcomes
  { id: 'e4', source: 'm1', target: 'o1', label: 'HAS_OUTCOME' },
  { id: 'e5', source: 'm2', target: 'o2', label: 'HAS_OUTCOME' },
  { id: 'e6', source: 'm3', target: 'o3', label: 'HAS_OUTCOME' },

  // Outcomes -> Skills
  { id: 'e7', source: 'o1', target: 's1', label: 'REQUIRES_SKILL' },
  { id: 'e8', source: 'o1', target: 's2', label: 'REQUIRES_SKILL' },
  { id: 'e9', source: 'o2', target: 's3', label: 'REQUIRES_SKILL' },
  { id: 'e10', source: 'o2', target: 's4', label: 'REQUIRES_SKILL' },
  { id: 'e11', source: 'o3', target: 's5', label: 'REQUIRES_SKILL' },
  { id: 'e12', source: 'o3', target: 's6', label: 'REQUIRES_SKILL' },

  // Skills -> Roles
  { id: 'e13', source: 's1', target: 'r1', label: 'LEADS_TO' },
  { id: 'e14', source: 's2', target: 'r1', label: 'LEADS_TO' },
  { id: 'e15', source: 's3', target: 'r2', label: 'LEADS_TO' },
  { id: 'e16', source: 's4', target: 'r2', label: 'LEADS_TO' },
  { id: 'e17', source: 's5', target: 'r3', label: 'LEADS_TO' },
  { id: 'e18', source: 's6', target: 'r3', label: 'LEADS_TO' },

  // Roles -> Market Demand
  { id: 'e19', source: 'r1', target: 'd1', label: 'IN_DEMAND_FOR' },
  { id: 'e20', source: 'r2', target: 'd2', label: 'IN_DEMAND_FOR' },
  { id: 'e21', source: 'r3', target: 'd3', label: 'IN_DEMAND_FOR' },

  // Outcomes / Skills -> Technologies
  { id: 'e22', source: 'o3', target: 't1', label: 'USES_TECHNOLOGY' },
  { id: 'e23', source: 's3', target: 't2', label: 'USES_TECHNOLOGY' },
  { id: 'e24', source: 's6', target: 't3', label: 'USES_TECHNOLOGY' },
  { id: 'e25', source: 's3', target: 't4', label: 'USES_TECHNOLOGY' },
];

export const KnowledgeGraphExplorerPage: React.FC<KnowledgeGraphExplorerPageProps> = ({
  theme,
  onOpenWorkspace,
  onExportGraph,
  onToggleTheme,
}) => {
  const tokens = getThemeTokens(theme);
  const isDark = theme === 'dark';

  // Interactive Graph Controls State
  const [nodes, setNodes] = useState<NeoNode[]>(NEO_NODES);
  const [edges] = useState<NeoEdge[]>(NEO_EDGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('s3'); // Default: Graph Traversal
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('Skill Ontology');

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Category Visibility Filter
  const [activeCategories, setActiveCategories] = useState<Record<string, boolean>>({
    Courses: true,
    Modules: true,
    'Course Outcomes': true,
    Skills: true,
    'Industry Roles': true,
    Technologies: true,
    'Market Demand': true,
  });

  // Filtered Nodes & Edges
  const visibleNodes = useMemo(() => {
    return nodes.filter((n) => {
      // Category filter
      let catKey = n.category as string;
      if (catKey === 'Course') catKey = 'Courses';
      if (catKey === 'Module') catKey = 'Modules';
      if (catKey === 'Course Outcome') catKey = 'Course Outcomes';
      if (catKey === 'Skill') catKey = 'Skills';
      if (catKey === 'Industry Role') catKey = 'Industry Roles';
      if (catKey === 'Technology') catKey = 'Technologies';
      if (catKey === 'Market Demand') catKey = 'Market Demand';

      if (activeCategories[catKey] === false) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          n.name.toLowerCase().includes(query) ||
          n.category.toLowerCase().includes(query) ||
          (n.nodeId && n.nodeId.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [nodes, activeCategories, searchQuery]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() => {
    return edges.filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
  }, [edges, visibleNodeIds]);

  // Selected Node Details
  const selectedNode = useMemo(() => {
    const found = nodes.find((n) => n.id === selectedNodeId);
    if (!found) return null;
    return {
      id: found.id,
      name: found.name,
      type: found.category,
      nodeId: found.nodeId,
      description: found.description,
      relatedSkills: found.relatedSkills || [
        'Depth First Search',
        'Breadth First Search',
        'Topological Sort',
      ],
      relatedCourses: found.relatedCourses || ['Data Structures and Algorithms'],
      relatedRoles: found.relatedRoles || ['Software Engineer', 'Data Scientist'],
      connectedTechnologies: found.connectedTechnologies || ['Python', 'C++'],
    };
  }, [nodes, selectedNodeId]);

  // Zoom / Fit handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(2.5, prev + 0.15));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(0.5, prev - 0.15));
  const handleFitGraph = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Node Dragging Handler
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setIsDraggingNode(nodeId);
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingNode) {
      const dx = (e.clientX - dragStartPos.x) / zoomLevel;
      const dy = (e.clientY - dragStartPos.y) / zoomLevel;
      setDragStartPos({ x: e.clientX, y: e.clientY });

      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === isDraggingNode ? { ...n, x: n.x + dx, y: n.y + dy } : n
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDraggingNode(null);
  };

  return (
    <div
      className="space-y-6 max-w-[1600px] mx-auto pb-12"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* HEADER WITH CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
            style={{ color: tokens.textPrimary }}
          >
            Knowledge Graph
          </h1>
          <p className="text-sm mt-1" style={{ color: tokens.textSecondary }}>
            Visualize the skill ontology and curriculum relationships generated from AI analysis.
          </p>
        </div>

        {/* Top Right Controls: Search, Filter, Settings, Theme Toggle */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nodes (course, skill, role...)"
              className="w-full text-xs font-medium pl-10 pr-8 py-2.5 rounded-[12px] border outline-none transition-all"
              style={{
                backgroundColor: tokens.inputBg,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 p-0.5 rounded text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsFilterOpen(true)}
            className="px-3.5 py-2.5 rounded-[12px] text-xs font-semibold border flex items-center gap-2 cursor-pointer transition-colors"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: tokens.border,
              color: tokens.textSecondary,
            }}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </motion.button>

          {/* Settings Icon Button */}
          <button
            className="p-2.5 rounded-[12px] border transition-colors cursor-pointer"
            style={{
              backgroundColor: tokens.inputBg,
              borderColor: tokens.border,
              color: tokens.textSecondary,
            }}
            title="Graph Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          {onToggleTheme && (
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
          )}
        </div>
      </div>

      {/* 6 SUMMARY METRIC CARDS */}
      <SummaryCards theme={theme} />

      {/* MAIN GRAPH AREA + RIGHT NODE DETAILS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols (or 9 Cols): Main Canvas Wrapper */}
        <div className="lg:col-span-8 flex flex-col rounded-[18px] border overflow-hidden shadow-2xl relative"
          style={{
            backgroundColor: isDark ? '#111214' : '#FFFFFF',
            borderColor: tokens.border,
          }}
        >
          {/* Graph Toolbar */}
          <GraphToolbar
            theme={theme}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onFitGraph={handleFitGraph}
            selectedView={selectedView}
            onViewChange={setSelectedView}
          />

          {/* Interactive SVG / Canvas Area */}
          <div className="relative w-full h-[620px] overflow-hidden select-none cursor-grab active:cursor-grabbing">
            {/* Grid Pattern Background */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Main Animated SVG Container */}
            <div
              className="w-full h-full transition-transform duration-100 ease-out origin-center"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              }}
            >
              <svg className="w-full h-full overflow-visible">
                <defs>
                  {/* Glowing Filter for Selected / Hovered Nodes */}
                  <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. EDGES */}
                <g className="edges">
                  {visibleEdges.map((edge) => {
                    const sourceNode = visibleNodes.find((n) => n.id === edge.source);
                    const targetNode = visibleNodes.find((n) => n.id === edge.target);
                    if (!sourceNode || !targetNode) return null;

                    const edgeColor = EDGE_COLORS[edge.label] || '#64748B';
                    const isHighlighted =
                      selectedNodeId === sourceNode.id ||
                      selectedNodeId === targetNode.id ||
                      hoveredNodeId === sourceNode.id ||
                      hoveredNodeId === targetNode.id;

                    const midX = (sourceNode.x + targetNode.x) / 2;
                    const midY = (sourceNode.y + targetNode.y) / 2;

                    return (
                      <g key={edge.id} className="transition-opacity duration-300">
                        <line
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke={edgeColor}
                          strokeWidth={isHighlighted ? 2.5 : 1.5}
                          strokeOpacity={isHighlighted ? 0.9 : 0.4}
                          strokeDasharray={edge.label === 'USES_TECHNOLOGY' ? '4 4' : 'none'}
                        />
                        {/* Edge Label (visible at normal zoom) */}
                        {zoomLevel >= 0.8 && (
                          <text
                            x={midX}
                            y={midY - 4}
                            textAnchor="middle"
                            fill={edgeColor}
                            fontSize="9"
                            fontWeight="bold"
                            className="font-mono pointer-events-none opacity-80"
                          >
                            {edge.label}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* 2. NODES */}
                <g className="nodes">
                  {visibleNodes.map((node) => {
                    const styleConfig = CATEGORY_COLORS[node.category] || CATEGORY_COLORS.Course;
                    const isSelected = selectedNodeId === node.id;
                    const isHovered = hoveredNodeId === node.id;

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNodeId(node.id)}
                        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                        className="cursor-pointer group"
                      >
                        {/* Soft Outer Glow Circle */}
                        <circle
                          r={isSelected ? 32 : isHovered ? 28 : 24}
                          fill={styleConfig.hex}
                          fillOpacity={isSelected ? 0.35 : isHovered ? 0.25 : 0.15}
                          stroke={styleConfig.hex}
                          strokeWidth={isSelected ? 2.5 : 1.5}
                          strokeOpacity={isSelected ? 1 : 0.6}
                          className="transition-all duration-200"
                        />

                        {/* Center Icon Indicator */}
                        <circle
                          r={isSelected ? 18 : 15}
                          fill={isDark ? '#111214' : '#FFFFFF'}
                          stroke={styleConfig.hex}
                          strokeWidth="2"
                        />

                        {/* Node Label Text */}
                        <text
                          y={36}
                          textAnchor="middle"
                          fill={isDark ? '#FFFFFF' : '#111827'}
                          fontSize="11"
                          fontWeight={isSelected ? 'bold' : '600'}
                          className="pointer-events-none tracking-tight transition-colors"
                        >
                          {node.name}
                        </text>

                        {/* Demand percentage badge for Market Demand nodes */}
                        {node.demandPercent && (
                          <text
                            y={50}
                            textAnchor="middle"
                            fill="#EF4444"
                            fontSize="9"
                            fontWeight="bold"
                            className="font-mono pointer-events-none"
                          >
                            {node.demandPercent}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* GRAPH MINI MAP (Bottom Left) */}
            <div
              className="absolute bottom-4 left-4 p-2 rounded-xl border flex flex-col items-center gap-2 shadow-lg backdrop-blur-md z-20"
              style={{
                backgroundColor: isDark ? 'rgba(17, 18, 20, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: tokens.border,
              }}
            >
              <div className="w-24 h-16 rounded-lg border bg-black/40 relative overflow-hidden flex items-center justify-center">
                <div className="w-8 h-6 border border-[#43D854] rounded bg-[#43D854]/20 animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handleZoomIn} className="p-1 text-gray-400 hover:text-white">
                  <Plus className="w-3 h-3" />
                </button>
                <button onClick={handleZoomOut} className="p-1 text-gray-400 hover:text-white">
                  <Minus className="w-3 h-3" />
                </button>
                <button onClick={handleFitGraph} className="p-1 text-gray-400 hover:text-white">
                  <Lock className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Node Details Panel */}
        <div className="lg:col-span-4">
          <NodeDetailsPanel
            theme={theme}
            node={selectedNode}
            onSelectRelatedNode={(nodeName) => {
              const matched = nodes.find((n) => n.name.toLowerCase().includes(nodeName.toLowerCase()));
              if (matched) setSelectedNodeId(matched.id);
            }}
          />
        </div>
      </div>

      {/* FILTER DRAWER */}
      <FilterDrawer
        theme={theme}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={setActiveCategories}
      />
    </div>
  );
};
