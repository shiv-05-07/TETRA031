import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomSelect } from './CustomSelect';
import {
  Network,
  Search,
  RefreshCw,
  Zap,
  SlidersHorizontal,
  Download,
  Share2,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Layers,
  Cpu,
  BookOpen,
  Briefcase,
  Globe,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  ChevronDown,
  X,
  ShieldCheck,
  TrendingUp,
  Award,
  Filter,
  Code,
  ArrowRight,
  Database,
  Grid,
  Eye,
  Sliders,
  Share,
  FileCode,
  GitMerge,
  HelpCircle,
  BrainCircuit
} from 'lucide-react';
import { ThemeMode } from '../types';

interface KnowledgeGraphExplorerPageProps {
  theme: ThemeMode;
  onOpenWorkspace?: (courseCode: string) => void;
  onExportGraph?: () => void;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GRAPH DATA MODEL & ONTOLOGY TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type NodeType =
  | 'Course'
  | 'Course Outcome'
  | 'Program Outcome'
  | 'Skill'
  | 'Technology'
  | 'Framework'
  | 'Tool'
  | 'Certification'
  | 'Job Role'
  | 'Industry';

export interface GraphNode {
  id: string;
  name: string;
  type: NodeType;
  department?: string;
  semester?: string;
  description: string;
  demand: number; // 0-100
  coverage: number; // 0-100
  isMissing?: boolean;
  isEmerging?: boolean;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  coursesUsing?: string[];
  missingDepts?: string[];
  aiRecommendation?: string;
  confidence?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type?: 'core' | 'missing' | 'emerging' | 'outcome';
  confidence?: number;
  evidence?: string;
}

// Node Type Color Palette
export const NODE_TYPE_COLORS: Record<NodeType, { bg: string; border: string; text: string; hex: string; lightHex: string }> = {
  Course: { bg: 'bg-slate-500/20', border: 'border-slate-500', text: 'text-slate-400', hex: '#64748B', lightHex: '#475569' },
  'Course Outcome': { bg: 'bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400', hex: '#06B6D4', lightHex: '#0284C7' },
  'Program Outcome': { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', hex: '#3B82F6', lightHex: '#2563EB' },
  Skill: { bg: 'bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-400', hex: '#10B981', lightHex: '#059669' },
  Technology: { bg: 'bg-emerald-400/20', border: 'border-emerald-400', text: 'text-emerald-300', hex: '#34D399', lightHex: '#10B981' },
  Framework: { bg: 'bg-teal-500/20', border: 'border-teal-500', text: 'text-teal-400', hex: '#14B8A6', lightHex: '#0D9488' },
  Tool: { bg: 'bg-sky-500/20', border: 'border-sky-500', text: 'text-sky-400', hex: '#0EA5E9', lightHex: '#0284C7' },
  Certification: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400', hex: '#F59E0B', lightHex: '#D97706' },
  'Job Role': { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400', hex: '#8B5CF6', lightHex: '#7C3AED' },
  Industry: { bg: 'bg-indigo-500/20', border: 'border-indigo-500', text: 'text-indigo-400', hex: '#6366F1', lightHex: '#4F46E5' },
};

// INITIAL GRAPH DATASET
const INITIAL_NODES: GraphNode[] = [
  // COURSES
  {
    id: 'c1',
    name: 'CS-3010 Operating Systems',
    type: 'Course',
    department: 'Computer Engineering',
    semester: 'Sem 4',
    description: 'Fundamental OS concepts: process management, virtual memory, concurrency, and Linux kernel internals.',
    demand: 88,
    coverage: 82,
    x: 120,
    y: 180,
    coursesUsing: ['CS-3010 Operating Systems'],
    missingDepts: ['Mechanical Engineering'],
    aiRecommendation: 'Introduce Linux eBPF kernel tracing lab.',
    confidence: 96
  },
  {
    id: 'c2',
    name: 'CS-8042 Advanced ML & GenAI',
    type: 'Course',
    department: 'Computer Engineering',
    semester: 'Sem 6',
    description: 'Deep learning architectures, transformers, RAG systems, and enterprise LLM deployment pipelines.',
    demand: 98,
    coverage: 68,
    x: 120,
    y: 380,
    coursesUsing: ['CS-8042 Advanced ML & GenAI'],
    missingDepts: ['Civil Engineering', 'Electrical Engineering'],
    aiRecommendation: 'Add Unit 4: Model Context Protocol (MCP) & vLLM serving.',
    confidence: 98
  },
  {
    id: 'c3',
    name: 'CS-4080 Modern Database Systems',
    type: 'Course',
    department: 'Information Technology',
    semester: 'Sem 5',
    description: 'Relational query engines, indexing, distributed NoSQL, and high-dimensional vector databases.',
    demand: 92,
    coverage: 74,
    x: 120,
    y: 580,
    coursesUsing: ['CS-4080 Modern Database Systems'],
    missingDepts: ['Electronics'],
    aiRecommendation: 'Incorporate pgvector & Milvus indexing module.',
    confidence: 95
  },
  {
    id: 'c4',
    name: 'CS-5090 Cloud Native Computing',
    type: 'Course',
    department: 'Computer Engineering',
    semester: 'Sem 6',
    description: 'Microservices architecture, containerization, Kubernetes orchestration, and CI/CD pipelines.',
    demand: 95,
    coverage: 45,
    isMissing: true,
    x: 120,
    y: 780,
    coursesUsing: ['CS-5090 Cloud Native Computing'],
    missingDepts: ['Mechanical Engineering'],
    aiRecommendation: 'Upgrade Kubernetes lab from 2 credits to 4 credits.',
    confidence: 97
  },

  // COURSE OUTCOMES
  {
    id: 'co1',
    name: 'CO-1: Kernel Subsystems & Syscalls',
    type: 'Course Outcome',
    description: 'Demonstrate proficiency in process context switching and virtual memory paging.',
    demand: 85,
    coverage: 90,
    x: 320,
    y: 180,
    coursesUsing: ['CS-3010 Operating Systems']
  },
  {
    id: 'co2',
    name: 'CO-2: Vector Similarity & HNSW',
    type: 'Course Outcome',
    description: 'Construct sub-10ms nearest-neighbor indices for dense high-dimensional text embeddings.',
    demand: 96,
    coverage: 32,
    isMissing: true,
    x: 320,
    y: 380,
    coursesUsing: ['CS-8042 Advanced ML & GenAI']
  },
  {
    id: 'co3',
    name: 'CO-3: ACID Transactions & Indexing',
    type: 'Course Outcome',
    description: 'Design B-Tree and LSM-Tree storage structures with crash recovery logging.',
    demand: 90,
    coverage: 88,
    x: 320,
    y: 580,
    coursesUsing: ['CS-4080 Modern Database Systems']
  },
  {
    id: 'co4',
    name: 'CO-4: Microservice Container Layering',
    type: 'Course Outcome',
    description: 'Optimize multi-stage Dockerfiles and Helm chart deployments for production clusters.',
    demand: 94,
    coverage: 40,
    isMissing: true,
    x: 320,
    y: 780,
    coursesUsing: ['CS-5090 Cloud Native Computing']
  },

  // SKILLS
  {
    id: 'sk1',
    name: 'Linux Kernel & Process Control',
    type: 'Skill',
    description: 'Mastery of POSIX syscalls, cgroups v2, and memory mapping primitives.',
    demand: 88,
    coverage: 85,
    x: 520,
    y: 180,
    coursesUsing: ['CS-3010 Operating Systems']
  },
  {
    id: 'sk2',
    name: 'Approximate Nearest Neighbor (ANN)',
    type: 'Skill',
    description: 'Fast cosine and L2 distance calculation over millions of float vectors.',
    demand: 94,
    coverage: 28,
    isMissing: true,
    x: 520,
    y: 340,
    coursesUsing: ['CS-8042 Advanced ML & GenAI']
  },
  {
    id: 'sk3',
    name: 'Prompt Engineering & Context Window',
    type: 'Skill',
    description: 'System prompting, zero/few-shot in-context learning, and token budget management.',
    demand: 95,
    coverage: 22,
    isMissing: true,
    isEmerging: true,
    x: 520,
    y: 440,
    coursesUsing: ['CS-8042 Advanced ML & GenAI']
  },
  {
    id: 'sk4',
    name: 'Container Layer Optimization',
    type: 'Skill',
    description: 'Minimizing image size, cache mounting, and distroless runtime security.',
    demand: 91,
    coverage: 42,
    isMissing: true,
    x: 520,
    y: 740,
    coursesUsing: ['CS-5090 Cloud Native Computing']
  },

  // TECHNOLOGIES
  {
    id: 't1',
    name: 'Linux (Debian/Ubuntu/eBPF)',
    type: 'Technology',
    description: 'Enterprise server operating system kernel with eBPF tracing hooks.',
    demand: 92,
    coverage: 88,
    x: 720,
    y: 180,
    coursesUsing: ['CS-3010 Operating Systems']
  },
  {
    id: 't2',
    name: 'Vector Databases (Milvus/pgvector)',
    type: 'Technology',
    description: 'Dedicated GPU & CPU similarity search infrastructure for enterprise RAG.',
    demand: 95,
    coverage: 12,
    isMissing: true,
    isEmerging: true,
    x: 720,
    y: 340,
    coursesUsing: ['CS-8042 Advanced ML & GenAI', 'CS-4080 Modern Database Systems'],
    missingDepts: ['Information Technology', 'Electronics'],
    aiRecommendation: 'High Priority: Add dedicated vector search lab.',
    confidence: 99
  },
  {
    id: 't3',
    name: 'Model Context Protocol (MCP)',
    type: 'Technology',
    description: 'Open standard protocol connecting AI models with local/remote data tools securely.',
    demand: 88,
    coverage: 0,
    isMissing: true,
    isEmerging: true,
    x: 720,
    y: 460,
    coursesUsing: [],
    missingDepts: ['All Departments'],
    aiRecommendation: 'Emerging protocol: Add 1-week hands-on MCP server lab.',
    confidence: 97
  },
  {
    id: 't4',
    name: 'Docker & OCI Containers',
    type: 'Technology',
    description: 'Standard container virtualization engine for application isolation.',
    demand: 94,
    coverage: 48,
    isMissing: true,
    x: 720,
    y: 700,
    coursesUsing: ['CS-5090 Cloud Native Computing']
  },
  {
    id: 't5',
    name: 'PyTorch & Transformers',
    type: 'Technology',
    description: 'De-facto deep learning framework for training and fine-tuning neural nets.',
    demand: 96,
    coverage: 80,
    x: 720,
    y: 260,
    coursesUsing: ['CS-8042 Advanced ML & GenAI']
  },

  // FRAMEWORKS & TOOLS
  {
    id: 'fw1',
    name: 'Kubernetes Orchestration (k8s)',
    type: 'Framework',
    description: 'Automated deployment, scaling, and management of containerized applications.',
    demand: 92,
    coverage: 18,
    isMissing: true,
    x: 920,
    y: 720,
    coursesUsing: ['CS-5090 Cloud Native Computing'],
    missingDepts: ['Computer Engineering'],
    aiRecommendation: 'Connect Kubernetes with CS-3010 Operating Systems.',
    confidence: 96
  },
  {
    id: 'fw2',
    name: 'LangGraph & Multi-Agent Swarms',
    type: 'Framework',
    description: 'Stateful graph-based routing framework for complex LLM agent workflows.',
    demand: 86,
    coverage: 5,
    isMissing: true,
    isEmerging: true,
    x: 920,
    y: 420,
    coursesUsing: ['CS-8042 Advanced ML & GenAI']
  },
  {
    id: 'fw3',
    name: 'vLLM Serving Engine',
    type: 'Tool',
    description: 'High-throughput low-latency LLM serving engine with PagedAttention.',
    demand: 82,
    coverage: 0,
    isMissing: true,
    isEmerging: true,
    x: 920,
    y: 520,
    coursesUsing: []
  },

  // CERTIFICATIONS
  {
    id: 'cert1',
    name: 'Certified Kubernetes Administrator (CKA)',
    type: 'Certification',
    description: 'Linux Foundation official certification for k8s cluster administration.',
    demand: 88,
    coverage: 40,
    x: 1080,
    y: 760,
    coursesUsing: ['CS-5090 Cloud Native Computing']
  },
  {
    id: 'cert2',
    name: 'AWS Certified AI Practitioner',
    type: 'Certification',
    description: 'Validation of foundational GenAI & machine learning cloud services.',
    demand: 85,
    coverage: 50,
    x: 1080,
    y: 300,
    coursesUsing: ['CS-8042 Advanced ML & GenAI']
  },

  // JOB ROLES
  {
    id: 'jr1',
    name: 'Cloud Infrastructure Engineer',
    type: 'Job Role',
    description: 'Builds and maintains scalable AWS/GCP cloud environments and k8s platforms.',
    demand: 94,
    coverage: 72,
    x: 1240,
    y: 700,
    coursesUsing: ['CS-5090 Cloud Native Computing', 'CS-3010 Operating Systems']
  },
  {
    id: 'jr2',
    name: 'AI / LLM Systems Engineer',
    type: 'Job Role',
    description: 'Designs enterprise RAG systems, agentic loops, and vector database pipelines.',
    demand: 98,
    coverage: 64,
    x: 1240,
    y: 380,
    coursesUsing: ['CS-8042 Advanced ML & GenAI']
  },
  {
    id: 'jr3',
    name: 'Senior Data Platform Engineer',
    type: 'Job Role',
    description: 'Engineers distributed relational, document, and vector data processing engines.',
    demand: 91,
    coverage: 78,
    x: 1240,
    y: 560,
    coursesUsing: ['CS-4080 Modern Database Systems']
  },

  // INDUSTRIES
  {
    id: 'ind1',
    name: 'Cloud & SaaS Enterprises',
    type: 'Industry',
    description: 'Global cloud platforms, SaaS companies, and Fortune 500 IT infrastructure.',
    demand: 96,
    coverage: 85,
    x: 1420,
    y: 680
  },
  {
    id: 'ind2',
    name: 'Artificial Intelligence & GenAI',
    type: 'Industry',
    description: 'Frontier AI labs, enterprise GenAI applications, and autonomous agents.',
    demand: 99,
    coverage: 70,
    x: 1420,
    y: 380
  }
];

// INITIAL GRAPH EDGES
const INITIAL_EDGES: GraphEdge[] = [
  // Course -> Outcome
  { id: 'e1', source: 'c1', target: 'co1', label: 'teaches', type: 'core' },
  { id: 'e2', source: 'c2', target: 'co2', label: 'teaches', type: 'missing' },
  { id: 'e3', source: 'c3', target: 'co3', label: 'teaches', type: 'core' },
  { id: 'e4', source: 'c4', target: 'co4', label: 'teaches', type: 'missing' },

  // Outcome -> Skill
  { id: 'e5', source: 'co1', target: 'sk1', label: 'develops', type: 'core' },
  { id: 'e6', source: 'co2', target: 'sk2', label: 'develops', type: 'missing' },
  { id: 'e7', source: 'co2', target: 'sk3', label: 'requires', type: 'emerging' },
  { id: 'e8', source: 'co4', target: 'sk4', label: 'develops', type: 'missing' },

  // Skill -> Technology
  { id: 'e9', source: 'sk1', target: 't1', label: 'utilizes', type: 'core' },
  { id: 'e10', source: 'sk2', target: 't2', label: 'implemented_in', type: 'missing' },
  { id: 'e11', source: 'sk3', target: 't3', label: 'standardized_by', type: 'emerging' },
  { id: 'e12', source: 'sk4', target: 't4', label: 'built_on', type: 'missing' },
  { id: 'e13', source: 'co2', target: 't5', label: 'uses_framework', type: 'core' },

  // Technology -> Framework/Tool
  { id: 'e14', source: 't4', target: 'fw1', label: 'orchestrated_by', type: 'missing' },
  { id: 'e15', source: 't3', target: 'fw2', label: 'executed_in', type: 'emerging' },
  { id: 'e16', source: 't5', target: 'fw3', label: 'served_via', type: 'emerging' },

  // Framework/Tech -> Certification
  { id: 'e17', source: 'fw1', target: 'cert1', label: 'prepares_for', type: 'core' },
  { id: 'e18', source: 't5', target: 'cert2', label: 'prepares_for', type: 'core' },

  // Framework/Tech -> Job Role
  { id: 'e19', source: 'fw1', target: 'jr1', label: 'qualifies_for', type: 'core' },
  { id: 'e20', source: 't2', target: 'jr2', label: 'essential_for', type: 'missing' },
  { id: 'e21', source: 'fw2', target: 'jr2', label: 'essential_for', type: 'emerging' },
  { id: 'e22', source: 'co3', target: 'jr3', label: 'qualifies_for', type: 'core' },

  // Job Role -> Industry
  { id: 'e23', source: 'jr1', target: 'ind1', label: 'employed_in', type: 'core' },
  { id: 'e24', source: 'jr2', target: 'ind2', label: 'employed_in', type: 'core' },

  // Missing Link Recommendations
  { id: 'e25', source: 'c1', target: 't4', label: 'should_connect_to', type: 'missing', confidence: 96, evidence: '82% of OS course syllabi in Tier-1 universities include Docker containerization labs.' },
  { id: 'e26', source: 'c3', target: 't2', label: 'missing_vector_db', type: 'missing', confidence: 98, evidence: '+195% growth in modern DB job roles requiring pgvector/Milvus indexing.' }
];

export const KnowledgeGraphExplorerPage: React.FC<KnowledgeGraphExplorerPageProps> = ({
  theme,
  onOpenWorkspace,
  onExportGraph
}) => {
  const isDark = theme === 'dark';

  // Canvas & Physics State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<GraphEdge[]>(INITIAL_EDGES);

  // Interaction State
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('t2'); // Vector DBs default selected
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>('e26');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isPhysicsRunning, setIsPhysicsRunning] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 20, y: 20 });
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Hold and Move (Canvas Panning State)
  const [isPanningCanvas, setIsPanningCanvas] = useState<boolean>(false);
  const [panStartPos, setPanStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panStartOffset, setPanStartOffset] = useState<{ x: number; y: number }>({ x: 20, y: 20 });
  const [draggedDistance, setDraggedDistance] = useState<number>(0);

  // Traversal & Guided Tour State
  const [traversalPath, setTraversalPath] = useState<string[]>(['c2', 'co2', 'sk2', 't2', 'jr2']);
  const [activeTraverseIndex, setActiveTraverseIndex] = useState<number>(3); // Index of 't2'
  const [isAutoTraversing, setIsAutoTraversing] = useState<boolean>(false);
  const [traversalSpeedMs, setTraversalSpeedMs] = useState<number>(2500);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Course',
    'Course Outcome',
    'Skill',
    'Technology',
    'Framework',
    'Tool',
    'Certification',
    'Job Role',
    'Industry'
  ]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [onlyMissingSkills, setOnlyMissingSkills] = useState(false);
  const [onlyEmergingTech, setOnlyEmergingTech] = useState(false);
  const [alignmentThreshold, setAlignmentThreshold] = useState<number>(0);

  // Timeline State: Current | Projected | Future
  const [timelineMode, setTimelineMode] = useState<'current' | 'projected' | 'future'>('current');

  // UI Panel Drawer States
  const [showCypherTerminal, setShowCypherTerminal] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Selected Node Data
  const selectedNode = useMemo(() => {
    return nodes.find(n => n.id === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);

  // Selected Edge Data
  const selectedEdge = useMemo(() => {
    return edges.find(e => e.id === selectedEdgeId) || null;
  }, [edges, selectedEdgeId]);

  // Smooth Camera Focus on Node
  const focusOnNode = (nodeId: string, customZoom?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const targetNode = nodes.find(n => n.id === nodeId);
    if (!targetNode) return;

    const width = canvas.width || 800;
    const height = canvas.height || 600;
    const newZoom = customZoom !== undefined ? customZoom : Math.max(zoomLevel, 1.1);

    const targetPanX = width / 2 - (targetNode.x || 0) * newZoom;
    const targetPanY = height / 2 - (targetNode.y || 0) * newZoom;

    setZoomLevel(newZoom);
    setPanOffset({ x: targetPanX, y: targetPanY });
    setSelectedNodeId(nodeId);
    setSelectedEdgeId(null);
  };

  // Traversal Helper Actions
  const traverseToNode = (targetNodeId: string) => {
    if (!traversalPath.includes(targetNodeId)) {
      const newPath = [...traversalPath.slice(0, activeTraverseIndex + 1), targetNodeId];
      setTraversalPath(newPath);
      setActiveTraverseIndex(newPath.length - 1);
    } else {
      const idx = traversalPath.indexOf(targetNodeId);
      setActiveTraverseIndex(idx);
    }
    focusOnNode(targetNodeId);
    const targetNode = nodes.find(n => n.id === targetNodeId);
    showToast(`Traversed to ${targetNode?.name || targetNodeId}`);
  };

  const stepNextTraversal = () => {
    if (activeTraverseIndex < traversalPath.length - 1) {
      const nextIdx = activeTraverseIndex + 1;
      setActiveTraverseIndex(nextIdx);
      focusOnNode(traversalPath[nextIdx]);
    } else {
      showToast('Reached end of current traversal sequence.');
    }
  };

  const stepPrevTraversal = () => {
    if (activeTraverseIndex > 0) {
      const prevIdx = activeTraverseIndex - 1;
      setActiveTraverseIndex(prevIdx);
      focusOnNode(traversalPath[prevIdx]);
    }
  };

  // Auto-Traversal Loop
  useEffect(() => {
    if (!isAutoTraversing || traversalPath.length === 0) return;

    const timer = setInterval(() => {
      setActiveTraverseIndex(prev => {
        const nextIdx = (prev + 1) % traversalPath.length;
        focusOnNode(traversalPath[nextIdx]);
        const targetNode = nodes.find(n => n.id === traversalPath[nextIdx]);
        showToast(`⚡ Auto-Tour [Step ${nextIdx + 1}/${traversalPath.length}]: ${targetNode?.name || ''}`);
        return nextIdx;
      });
    }, traversalSpeedMs);

    return () => clearInterval(timer);
  }, [isAutoTraversing, traversalPath, traversalSpeedMs, nodes]);

  // Neighbor nodes of current selected node
  const currentNeighbors = useMemo(() => {
    if (!selectedNodeId) return [];
    const list: { node: GraphNode; edge: GraphEdge; direction: 'outgoing' | 'incoming' }[] = [];
    edges.forEach(e => {
      if (e.source === selectedNodeId) {
        const tNode = nodes.find(n => n.id === e.target);
        if (tNode) list.push({ node: tNode, edge: e, direction: 'outgoing' });
      } else if (e.target === selectedNodeId) {
        const sNode = nodes.find(n => n.id === e.source);
        if (sNode) list.push({ node: sNode, edge: e, direction: 'incoming' });
      }
    });
    return list;
  }, [selectedNodeId, edges, nodes]);

  // Toggle Category Filter
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Filtered Nodes
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      // Category match
      if (!selectedCategories.includes(node.type)) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = node.name.toLowerCase().includes(q);
        const matchType = node.type.toLowerCase().includes(q);
        const matchDesc = node.description.toLowerCase().includes(q);
        if (!matchName && !matchType && !matchDesc) return false;
      }

      // Dept match
      if (selectedDept !== 'All' && node.department && node.department !== selectedDept) return false;

      // Semester match
      if (selectedSemester !== 'All' && node.semester && node.semester !== selectedSemester) return false;

      // Only Missing
      if (onlyMissingSkills && !node.isMissing) return false;

      // Only Emerging
      if (onlyEmergingTech && !node.isEmerging) return false;

      // Alignment Threshold
      if (node.coverage < alignmentThreshold) return false;

      return true;
    });
  }, [nodes, selectedCategories, searchQuery, selectedDept, selectedSemester, onlyMissingSkills, onlyEmergingTech, alignmentThreshold]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map(n => n.id)), [filteredNodes]);

  // Connected Node IDs for Selected Node
  const connectedNodeIds = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    const set = new Set<string>();
    set.add(selectedNodeId);
    edges.forEach(e => {
      if (e.source === selectedNodeId) set.add(e.target);
      if (e.target === selectedNodeId) set.add(e.source);
    });
    return set;
  }, [selectedNodeId, edges]);

  // Traversal Edge Set for Rendering Beams
  const traversalEdgeKeys = useMemo(() => {
    const set = new Set<string>();
    for (let i = 0; i < traversalPath.length - 1; i++) {
      const u = traversalPath[i];
      const v = traversalPath[i + 1];
      edges.forEach(e => {
        if ((e.source === u && e.target === v) || (e.source === v && e.target === u)) {
          set.add(e.id);
        }
      });
    }
    return set;
  }, [traversalPath, edges]);

  // Handle Timeline switching node highlights or positions
  useEffect(() => {
    if (timelineMode === 'projected') {
      showToast('Projected Timeline: 1-click AI curriculum fixes applied (+14% alignment gain).');
    } else if (timelineMode === 'future') {
      showToast('Future Trends Timeline: Integrating 2026 emerging skill nodes (MCP, Agentic Swarms, vLLM).');
    }
  }, [timelineMode]);

  // CANVAS FORCE SIMULATION & RENDER ENGINE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      // Handle Resize
      const width = canvas.parentElement?.clientWidth || 1000;
      const height = canvas.parentElement?.clientHeight || 650;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Physics Simulation Step (simple force repulsion and edge tension)
      if (isPhysicsRunning) {
        particleOffset = (particleOffset + 0.8) % 100;
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(panOffset.x, panOffset.y);
      ctx.scale(zoomLevel, zoomLevel);

      // 1. DRAW EDGES
      edges.forEach(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        if (!sourceNode || !targetNode) return;

        // Skip if either node is filtered out
        if (!filteredNodeIds.has(sourceNode.id) || !filteredNodeIds.has(targetNode.id)) return;

        const sx = sourceNode.x || 100;
        const sy = sourceNode.y || 100;
        const tx = targetNode.x || 300;
        const ty = targetNode.y || 300;

        const isConnectedToSelected = selectedNodeId && (edge.source === selectedNodeId || edge.target === selectedNodeId);
        const isEdgeSelected = selectedEdgeId === edge.id;
        const isTraversalEdge = traversalEdgeKeys.has(edge.id);

        // Curve Control Point
        const cx = (sx + tx) / 2;
        const cy = (sy + ty) / 2 - (edge.type === 'missing' ? 30 : 0);

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(cx, cy, tx, ty);

        // Edge Style
        if (isTraversalEdge) {
          ctx.strokeStyle = '#10B981';
          ctx.lineWidth = 4;
          ctx.setLineDash([]);
        } else if (isEdgeSelected || isConnectedToSelected) {
          ctx.strokeStyle = '#34D399';
          ctx.lineWidth = 3;
          ctx.setLineDash([]);
        } else if (edge.type === 'missing') {
          ctx.strokeStyle = isDark ? '#EF4444' : '#DC2626';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
        } else if (edge.type === 'emerging') {
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 2;
          ctx.setLineDash([3, 3]);
        } else {
          ctx.strokeStyle = isDark ? '#333333' : '#E2E8F0';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([]);
        }

        ctx.stroke();

        // Particle Flow Animation along Edges
        if (isPhysicsRunning && (isTraversalEdge || isConnectedToSelected || edge.type === 'core')) {
          const t = (particleOffset / 100) % 1;
          const px = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * tx;
          const py = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * ty;

          ctx.beginPath();
          ctx.arc(px, py, isTraversalEdge ? 5 : 3, 0, Math.PI * 2);
          ctx.fillStyle = isTraversalEdge ? '#34D399' : '#10B981';
          ctx.shadowColor = '#10B981';
          ctx.shadowBlur = isTraversalEdge ? 12 : 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Edge Label (if selected, hovered, or in traversal path)
        if (isEdgeSelected || isConnectedToSelected || isTraversalEdge) {
          ctx.font = '10px Inter, sans-serif';
          ctx.fillStyle = isDark ? '#A3A3A3' : '#4B5563';
          ctx.fillText(edge.label, cx - 15, cy - 5);
        }
      });

      // 2. DRAW NODES
      nodes.forEach(node => {
        if (!filteredNodeIds.has(node.id)) return;

        const nx = node.x || 100;
        const ny = node.y || 100;

        const isSelected = selectedNodeId === node.id;
        const isHovered = hoveredNodeId === node.id;
        const isConnected = connectedNodeIds.has(node.id);
        const isDimmed = selectedNodeId && !isConnected && !traversalPath.includes(node.id);

        const traversalStepIdx = traversalPath.indexOf(node.id);
        const isInTraversal = traversalStepIdx !== -1;
        const isActiveTraversalStep = isInTraversal && activeTraverseIndex === traversalStepIdx;

        const colors = NODE_TYPE_COLORS[node.type] || NODE_TYPE_COLORS.Course;
        const hexColor = isDark ? colors.hex : colors.lightHex;

        const radius = isSelected || isActiveTraversalStep ? 24 : isHovered ? 20 : 16;

        ctx.save();
        if (isDimmed) {
          ctx.globalAlpha = 0.2;
        }

        // Active Traversal Pulsating Ring
        if (isActiveTraversalStep) {
          const pulseR = radius + 10 + Math.sin(particleOffset / 10) * 4;
          ctx.beginPath();
          ctx.arc(nx, ny, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = '#10B981';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Node Glow Effect
        if (isSelected || isHovered || isInTraversal) {
          ctx.beginPath();
          ctx.arc(nx, ny, radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = `${hexColor}33`;
          ctx.fill();
        }

        // Outer Ring for Missing/Emerging
        if (node.isMissing) {
          ctx.beginPath();
          ctx.arc(nx, ny, radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = '#EF4444';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Node Main Circle
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected || isActiveTraversalStep ? hexColor : isDark ? '#171717' : '#FFFFFF';
        ctx.strokeStyle = hexColor;
        ctx.lineWidth = isSelected || isActiveTraversalStep ? 3 : 2;
        ctx.fill();
        ctx.stroke();

        // Node Icon/Indicator Dot
        ctx.beginPath();
        ctx.arc(nx, ny, isSelected || isActiveTraversalStep ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected || isActiveTraversalStep ? '#FFFFFF' : hexColor;
        ctx.fill();

        // Traversal Step Number Badge Above Node
        if (isInTraversal) {
          const badgeX = nx + radius - 4;
          const badgeY = ny - radius + 2;
          ctx.beginPath();
          ctx.arc(badgeX, badgeY, 9, 0, Math.PI * 2);
          ctx.fillStyle = isActiveTraversalStep ? '#10B981' : '#059669';
          ctx.fill();
          ctx.font = 'bold 10px sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText((traversalStepIdx + 1).toString(), badgeX, badgeY);
        }

        // Node Text Label
        ctx.font = isSelected || isActiveTraversalStep ? 'bold 12px Space Grotesk, sans-serif' : '11px Inter, sans-serif';
        ctx.fillStyle = isSelected || isActiveTraversalStep
          ? isDark ? '#FFFFFF' : '#111827'
          : isDark ? '#E5E5E5' : '#1F2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(node.name, nx, ny + radius + 16);

        // Sublabel (Type)
        ctx.font = '9px monospace';
        ctx.fillStyle = hexColor;
        ctx.fillText(node.type.toUpperCase(), nx, ny + radius + 28);

        ctx.restore();
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [nodes, edges, filteredNodeIds, selectedNodeId, selectedEdgeId, hoveredNodeId, isPhysicsRunning, panOffset, zoomLevel, isDark, traversalPath, activeTraverseIndex, traversalEdgeKeys]);

  // Canvas Mouse Click Handling
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // If dragged noticeably, do not count as simple click selection
    if (draggedDistance > 5) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const clickY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    // Check Node Hit
    const clickedNode = nodes.find(node => {
      if (!filteredNodeIds.has(node.id)) return false;
      const dx = (node.x || 0) - clickX;
      const dy = (node.y || 0) - clickY;
      return Math.sqrt(dx * dx + dy * dy) <= 24;
    });

    if (clickedNode) {
      setSelectedNodeId(clickedNode.id);
      setSelectedEdgeId(null);
      return;
    }

    // Check Edge Hit
    const clickedEdge = edges.find(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      if (!sourceNode || !targetNode) return false;
      const sx = sourceNode.x || 0;
      const sy = sourceNode.y || 0;
      const tx = targetNode.x || 0;
      const ty = targetNode.y || 0;

      const l2 = (tx - sx) * (tx - sx) + (ty - sy) * (ty - sy);
      if (l2 === 0) return false;
      let t = ((clickX - sx) * (tx - sx) + (clickY - sy) * (ty - sy)) / l2;
      t = Math.max(0, Math.min(1, t));
      const projX = sx + t * (tx - sx);
      const projY = sy + t * (ty - sy);
      const dist = Math.sqrt((clickX - projX) * (clickX - projX) + (clickY - projY) * (clickY - projY));
      return dist <= 12;
    });

    if (clickedEdge) {
      setSelectedEdgeId(clickedEdge.id);
      setSelectedNodeId(null);
      return;
    }

    // Deselect if background clicked
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  };

  // Canvas Hold and Move (Node Dragging & Canvas Panning)
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const mouseY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    setDraggedDistance(0);

    const hitNode = nodes.find(node => {
      if (!filteredNodeIds.has(node.id)) return false;
      const dx = (node.x || 0) - mouseX;
      const dy = (node.y || 0) - mouseY;
      return Math.sqrt(dx * dx + dy * dy) <= 24;
    });

    if (hitNode) {
      setIsDraggingNode(hitNode.id);
      setDragStartPos({ x: e.clientX, y: e.clientY });
    } else {
      setIsPanningCanvas(true);
      setPanStartPos({ x: e.clientX, y: e.clientY });
      setPanStartOffset({ ...panOffset });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const mouseY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    // Hover detection
    const hoverNode = nodes.find(node => {
      if (!filteredNodeIds.has(node.id)) return false;
      const dx = (node.x || 0) - mouseX;
      const dy = (node.y || 0) - mouseY;
      return Math.sqrt(dx * dx + dy * dy) <= 24;
    });

    setHoveredNodeId(hoverNode ? hoverNode.id : null);

    // Holding and Moving a Node
    if (isDraggingNode) {
      setDraggedDistance(prev => prev + 1);
      setNodes(prev =>
        prev.map(n =>
          n.id === isDraggingNode
            ? { ...n, x: mouseX, y: mouseY }
            : n
        )
      );
    }
    // Holding and Moving the Canvas (Panning)
    else if (isPanningCanvas) {
      setDraggedDistance(prev => prev + 1);
      const dx = e.clientX - panStartPos.x;
      const dy = e.clientY - panStartPos.y;
      setPanOffset({
        x: panStartOffset.x + dx,
        y: panStartOffset.y + dy
      });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingNode(null);
    setIsPanningCanvas(false);
  };

  // Canvas Mouse Wheel Smooth Zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseCanvasX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const mouseCanvasY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.min(2.5, Math.max(0.4, zoomLevel * zoomFactor));

    const newPanX = e.clientX - rect.left - mouseCanvasX * newZoom;
    const newPanY = e.clientY - rect.top - mouseCanvasY * newZoom;

    setZoomLevel(newZoom);
    setPanOffset({ x: newPanX, y: newPanY });
  };

  // Canvas Double Click Traversal
  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const clickY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    const hitNode = nodes.find(node => {
      if (!filteredNodeIds.has(node.id)) return false;
      const dx = (node.x || 0) - clickX;
      const dy = (node.y || 0) - clickY;
      return Math.sqrt(dx * dx + dy * dy) <= 24;
    });

    if (hitNode) {
      traverseToNode(hitNode.id);
    }
  };

  // Run AI Re-mapping
  const handleRunMapping = () => {
    setIsPhysicsRunning(true);
    showToast('Executing Neo4j Cypher semantic recalculation across 12,400 industry nodes...');
    setTimeout(() => {
      showToast('Graph Re-mapping complete! Identified 2 new skill relationships.');
    }, 1500);
  };

  // Export Graph
  const handleExportGraphAction = () => {
    if (onExportGraph) {
      onExportGraph();
    } else {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "cirrculai_neo4j_knowledge_graph.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Exported Neo4j Graph JSON artifact!');
    }
  };

  return (
    <div className={`min-h-screen p-4 sm:p-8 font-sans transition-colors max-w-[1700px] mx-auto space-y-6 ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAFAFA] text-[#111827]'
    }`}>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#10B981] text-white font-semibold text-xs shadow-2xl flex items-center gap-2 border border-white/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HEADER & CONTROL ACTIONS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#262626]/30">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">
              Knowledge Graph Explorer
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" />
              <span>Neo4j Bloom Engine v5.1</span>
            </span>
          </div>
          <p className={`text-sm mt-1.5 max-w-2xl ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
            Visualize relationships between curriculum, industry skills, technologies and career opportunities. Live semantic mapping connects course outcomes directly to market demand.
          </p>
        </div>

        {/* Top Header Control Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsPhysicsRunning(!isPhysicsRunning)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white hover:bg-[#202020]' : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] shadow-sm'
            }`}
          >
            <RefreshCw className={`w-4 h-4 text-[#10B981] ${isPhysicsRunning ? 'animate-spin' : ''}`} />
            <span>{isPhysicsRunning ? 'Pause Physics' : 'Resume Physics'}</span>
          </button>

          <button
            onClick={handleRunMapping}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-2 shadow-lg shadow-[#10B981]/20 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Run Mapping</span>
          </button>

          <button
            onClick={handleExportGraphAction}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white hover:bg-[#202020]' : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] shadow-sm'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Graph</span>
          </button>

          <button
            onClick={() => showToast('Shareable Neo4j Bloom workspace link copied to clipboard!')}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'bg-[#171717] border-[#262626] text-[#B3B3B3] hover:text-white hover:bg-[#202020]' : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] shadow-sm'
            }`}
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SUMMARY GRAPH STATISTICS CARDS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: 'Total Nodes', val: '1,248', icon: Network, color: '#10B981' },
          { label: 'Relationships', val: '6,940', icon: GitMerge, color: '#34D399' },
          { label: 'Courses Mapped', val: '82', icon: BookOpen, color: '#64748B' },
          { label: 'Skills Ontology', val: '194', icon: Cpu, color: '#10B981' },
          { label: 'Technologies', val: '147', icon: Layers, color: '#34D399' },
          { label: 'Job Roles Mapped', val: '36', icon: Briefcase, color: '#8B5CF6' },
          { label: 'Emerging Skills', val: '28', icon: Zap, color: '#F59E0B' },
          { label: 'Graph Alignment', val: '87.4%', icon: ShieldCheck, color: '#10B981' }
        ].map((st, idx) => {
          const IconComp = st.icon;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-[18px] border flex flex-col justify-between space-y-2 ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${isDark ? 'text-[#737373]' : 'text-[#6B7280]'}`}>
                  {st.label}
                </span>
                <IconComp className="w-3.5 h-3.5" style={{ color: st.color }} />
              </div>

              <span className="font-heading font-bold text-xl lg:text-2xl tracking-tight block" style={{ color: st.color }}>
                {st.val}
              </span>
            </div>
          );
        })}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. MAIN WORKSPACE: FILTER PANEL + INTERACTIVE CANVAS + DETAILS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[680px]">

        {/* LEFT FILTER PANEL (3 Cols) */}
        <div className={`lg:col-span-3 p-5 rounded-[24px] border space-y-5 flex flex-col justify-between ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
              <span className="font-heading font-bold text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#10B981]" />
                <span>Ontology Filters</span>
              </span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('All');
                  setSelectedSemester('All');
                  setOnlyMissingSkills(false);
                  setOnlyEmergingTech(false);
                  setAlignmentThreshold(0);
                  setSelectedCategories(Object.keys(NODE_TYPE_COLORS));
                }}
                className="text-[10px] font-mono text-[#10B981] hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Search Input */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
              isDark ? 'bg-[#171717] border-[#262626] text-white' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]'
            }`}>
              <Search className="w-4 h-4 text-[#737373]" />
              <input
                type="text"
                placeholder="Search nodes (Vector DB, Docker...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-[#737373] hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Node Type Category Toggles */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#737373] uppercase block">
                Filter by Node Type ({selectedCategories.length}/10)
              </span>

              <div className="grid grid-cols-2 gap-1.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                {Object.keys(NODE_TYPE_COLORS).map(cat => {
                  const isChecked = selectedCategories.includes(cat);
                  const colors = NODE_TYPE_COLORS[cat as NodeType];
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-mono text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? isDark ? 'bg-[#1A1A1A] border-[#10B981] text-white' : 'bg-[#F0FDF4] border-[#10B981] text-[#111827]'
                          : isDark ? 'bg-[#141414] border-[#262626] text-[#737373] opacity-60' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#9CA3AF]'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      <span className="w-2 h-2 rounded-full flex-shrink-0 ml-1" style={{ backgroundColor: colors.hex }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#737373] uppercase block">Department</span>
              <CustomSelect
                size="sm"
                theme={theme}
                value={selectedDept}
                onChange={(val) => setSelectedDept(val)}
                options={[
                  { value: "All", label: "All Departments" },
                  { value: "Computer Engineering", label: "Computer Engineering" },
                  { value: "Information Technology", label: "Information Technology" },
                  { value: "Electronics", label: "Electronics" },
                  { value: "Mechanical Engineering", label: "Mechanical Engineering" }
                ]}
              />
            </div>

            {/* Specialized Toggles */}
            <div className="space-y-2 pt-2 border-t border-[#262626]/30">
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="font-semibold text-red-400">Only Missing Skills</span>
                <input
                  type="checkbox"
                  checked={onlyMissingSkills}
                  onChange={e => setOnlyMissingSkills(e.target.checked)}
                  className="accent-[#10B981] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="font-semibold text-amber-400">Only Emerging Tech</span>
                <input
                  type="checkbox"
                  checked={onlyEmergingTech}
                  onChange={e => setOnlyEmergingTech(e.target.checked)}
                  className="accent-[#10B981] rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Alignment Threshold Slider */}
            <div className="space-y-2 pt-2 border-t border-[#262626]/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#737373]">Alignment Threshold</span>
                <span className="font-mono font-bold text-[#10B981]">{alignmentThreshold}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={90}
                value={alignmentThreshold}
                onChange={e => setAlignmentThreshold(Number(e.target.value))}
                className="w-full accent-[#10B981] cursor-pointer"
              />
            </div>
          </div>

          {/* Timeline Selector Widget */}
          <div className={`p-3 rounded-2xl border space-y-2 text-xs font-mono ${
            isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className="text-[10px] text-[#10B981] font-bold block uppercase">
              ⏱️ Graph Timeline Horizon
            </span>

            <div className="grid grid-cols-3 gap-1 text-[10px]">
              {(['current', 'projected', 'future'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setTimelineMode(mode)}
                  className={`py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                    timelineMode === mode
                      ? 'bg-[#10B981] text-white shadow-md'
                      : isDark ? 'text-[#A3A3A3] hover:text-white' : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER INTERACTIVE GRAPH CANVAS (6 Cols) */}
        <div className={`lg:col-span-6 rounded-[24px] border relative overflow-hidden flex flex-col justify-between ${
          isDark ? 'bg-[#121212] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
        }`}>
          {/* Top Floating Control Bar */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 bg-[#171717]/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#262626] text-xs font-mono shadow-xl">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 2.0))}
              className="p-1.5 rounded-xl hover:bg-[#262626] text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.4))}
              className="p-1.5 rounded-xl hover:bg-[#262626] text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setPanOffset({ x: 20, y: 20 });
              }}
              className="p-1.5 rounded-xl hover:bg-[#262626] text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-[#737373] px-2 text-[11px]">Zoom: {Math.round(zoomLevel * 100)}%</span>

            <div className="h-4 w-px bg-[#262626] my-auto mx-1" />

            {/* Traversal Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={stepPrevTraversal}
                disabled={activeTraverseIndex <= 0}
                className="px-2 py-1 rounded-xl bg-[#262626] hover:bg-[#333333] disabled:opacity-30 text-white font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer"
                title="Step Backward in Traversal Path"
              >
                <span>◀ Step</span>
              </button>
              <button
                onClick={stepNextTraversal}
                disabled={activeTraverseIndex >= traversalPath.length - 1}
                className="px-2 py-1 rounded-xl bg-[#10B981] hover:bg-[#34D399] disabled:opacity-30 text-white font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer shadow-md shadow-[#10B981]/20"
                title="Step Forward in Traversal Path"
              >
                <span>Step ▶</span>
              </button>
              <button
                onClick={() => {
                  setIsAutoTraversing(!isAutoTraversing);
                  if (!isAutoTraversing) showToast('Started Automated Curriculum Path Tour (2.5s per hop)');
                }}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  isAutoTraversing
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-[#262626] text-[#A3A3A3] hover:text-white'
                }`}
                title="Auto-Tour Guided Traversal"
              >
                {isAutoTraversing ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                <span>{isAutoTraversing ? 'Pause Tour' : 'Auto Tour'}</span>
              </button>
            </div>
          </div>

          {/* Top Right Action Overlay */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setShowCypherTerminal(!showCypherTerminal)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                showCypherTerminal
                  ? 'bg-[#10B981] text-white border-[#10B981]'
                  : isDark ? 'bg-[#171717]/80 border-[#262626] text-[#A3A3A3]' : 'bg-white/80 border-[#E5E7EB] text-[#4B5563]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Neo4j Cypher</span>
            </button>
          </div>

          {/* ACTIVE TRAVERSAL BREADCRUMB OVERLAY */}
          {traversalPath.length > 0 && (
            <div className="absolute top-16 left-4 right-4 z-10 bg-[#171717]/95 backdrop-blur-md p-2.5 rounded-2xl border border-[#10B981]/30 shadow-2xl space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#10B981] font-bold flex items-center gap-1.5 uppercase tracking-wider">
                  <BrainCircuit className="w-3.5 h-3.5" /> Active Traversal Path ({activeTraverseIndex + 1}/{traversalPath.length} hops)
                </span>
                <span className="text-[#737373] text-[9px]">💡 Double-click any node to traverse into it | Hold & Drag canvas to pan</span>
              </div>

              {/* Breadcrumbs List */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
                {traversalPath.map((nodeId, index) => {
                  const pathNode = nodes.find(n => n.id === nodeId);
                  const isActive = index === activeTraverseIndex;
                  return (
                    <React.Fragment key={nodeId}>
                      <button
                        onClick={() => {
                          setActiveTraverseIndex(index);
                          focusOnNode(nodeId);
                        }}
                        className={`px-2.5 py-1 rounded-xl border text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? 'bg-[#10B981] text-white border-[#10B981] shadow-md shadow-[#10B981]/30 scale-105 font-bold'
                            : isDark ? 'bg-[#262626] text-[#A3A3A3] border-[#333333] hover:text-white' : 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]'
                        }`}
                      >
                        <span className="text-[9px] opacity-80">{index + 1}.</span>
                        <span>{pathNode?.name || nodeId}</span>
                      </button>
                      {index < traversalPath.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 animate-pulse" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive HTML5 Canvas */}
          <div className="w-full h-full min-h-[580px] relative cursor-grab active:cursor-grabbing">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
              className="w-full h-full block touch-none"
            />
          </div>

          {/* Bottom Overlay Legend */}
          {showLegend && (
            <div className={`p-3 border-t flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono ${
              isDark ? 'bg-[#111111]/90 border-[#262626] text-[#A3A3A3]' : 'bg-white/90 border-[#E5E7EB] text-[#4B5563]'
            }`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold text-white">Graph Legend:</span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Course
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Skill
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" /> Technology
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Job Role
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Cert
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-red-400 font-bold">--- Missing Link</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">--- Emerging Link</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT DETAILS PANEL (3 Cols) */}
        <div className={`lg:col-span-3 p-5 rounded-[24px] border space-y-5 flex flex-col justify-between ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
        }`}>
          {selectedNode ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> Selected Node Details
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  NODE_TYPE_COLORS[selectedNode.type]?.bg || 'bg-emerald-500/20'
                } ${NODE_TYPE_COLORS[selectedNode.type]?.text || 'text-emerald-400'}`}>
                  {selectedNode.type}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg leading-snug">{selectedNode.name}</h3>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  {selectedNode.description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className={`p-3.5 rounded-2xl border grid grid-cols-2 gap-3 text-center font-mono ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}>
                <div>
                  <span className="text-[9px] text-[#737373] uppercase block">Industry Demand</span>
                  <span className="font-heading font-bold text-base text-[#10B981]">{selectedNode.demand}%</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#737373] uppercase block">Curriculum Coverage</span>
                  <span className={`font-heading font-bold text-base ${
                    selectedNode.coverage < 40 ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {selectedNode.coverage}%
                  </span>
                </div>
              </div>

              {/* Connected Courses */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#737373] uppercase block">Connected Courses:</span>
                {selectedNode.coursesUsing && selectedNode.coursesUsing.length > 0 ? (
                  <div className="space-y-1">
                    {selectedNode.coursesUsing.map((c, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-[#171717] border border-[#262626] text-xs font-semibold text-[#10B981] flex items-center justify-between">
                        <span>{c}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-red-400 italic block">No active course links mapped.</span>
                )}
              </div>

              {/* 1-HOP NEIGHBOR HOPS & TRAVERSAL ENGINE */}
              <div className="space-y-2 pt-2 border-t border-[#262626]/40">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5" /> Direct Neighbor Hops ({currentNeighbors.length})
                  </span>
                  <span className="text-[9px] font-mono text-[#737373]">Click to Traverse</span>
                </div>

                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                  {currentNeighbors.length > 0 ? (
                    currentNeighbors.map(({ node: n, edge: e, direction }) => (
                      <button
                        key={n.id}
                        onClick={() => traverseToNode(n.id)}
                        className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between text-xs cursor-pointer ${
                          isDark
                            ? 'bg-[#171717] hover:bg-[#222222] border-[#262626] text-white hover:border-[#10B981]'
                            : 'bg-[#F9FAFB] hover:bg-[#F0FDF4] border-[#E5E7EB] text-[#111827]'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="font-semibold text-[11px] truncate">{n.name}</div>
                          <div className="text-[9px] font-mono text-[#737373]">
                            {direction === 'outgoing' ? '➔ ' : '⬅ '}{e.label} ({n.type})
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-lg bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold font-mono whitespace-nowrap flex-shrink-0">
                          Traverse ➔
                        </span>
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-[#737373] italic">No direct neighbors found.</span>
                  )}
                </div>
              </div>

              {/* AI Recommendation */}
              {selectedNode.aiRecommendation && (
                <div className="p-3.5 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#10B981] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> AI Recommendation
                    </span>
                    <span className="text-[10px] font-mono text-[#10B981] font-bold">
                      {selectedNode.confidence || 97}% Confidence
                    </span>
                  </div>
                  <p className="text-white text-[11px] leading-relaxed">
                    {selectedNode.aiRecommendation}
                  </p>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => onOpenWorkspace && onOpenWorkspace(selectedNode.coursesUsing?.[0] || 'CS-8042')}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#10B981]/20 cursor-pointer"
              >
                <span>Inject Fix into Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : selectedEdge ? (
            /* RELATIONSHIP INSPECTOR PANEL */
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <GitMerge className="w-3.5 h-3.5" /> Relationship Inspector
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400">
                  {selectedEdge.type?.toUpperCase()}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#737373] uppercase block">Relationship Label</span>
                <h3 className="font-heading font-bold text-lg text-emerald-400 mt-0.5">{selectedEdge.label}</h3>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#171717] border border-[#262626] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#737373]">Source:</span>
                  <span className="font-bold text-white">{selectedEdge.source}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#737373]">Target:</span>
                  <span className="font-bold text-white">{selectedEdge.target}</span>
                </div>
              </div>

              {selectedEdge.evidence && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Real-World Evidence
                  </span>
                  <p className="text-white text-[11px] leading-relaxed">
                    {selectedEdge.evidence}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <Network className="w-10 h-10 text-[#737373] animate-pulse" />
              <span className="font-heading font-bold text-sm">Select Any Node or Relationship</span>
              <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B7280]'}`}>
                Click on any node in the canvas to inspect its syllabus depth, connected courses, and AI recommendation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. CYPHER QUERY TERMINAL DRAWER
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {showCypherTerminal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-6 rounded-[24px] border font-mono text-xs space-y-4 overflow-hidden ${
              isDark ? 'bg-[#0D0D0D] border-[#10B981]/40' : 'bg-[#111827] text-white border-[#10B981]/40'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-3 border-[#262626]">
              <div className="flex items-center gap-2 text-[#10B981] font-bold">
                <Terminal className="w-4 h-4" />
                <span>Neo4j Cypher Console & Graph Querying</span>
              </div>
              <button onClick={() => setShowCypherTerminal(false)} className="text-[#A3A3A3] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#000000] border border-[#262626] text-emerald-400 font-mono text-xs space-y-2">
              <p className="text-[#737373]">// Query missing technology nodes connected to Machine Learning syllabus</p>
              <p className="text-emerald-300">
                MATCH (c:Course &#123;code: 'CS-8042'&#125;)-[:HAS_OUTCOME]-&gt;(co:Outcome)-[:REQUIRES]-&gt;(s:Skill)-[:USES_TECH]-&gt;(t:Technology)
              </p>
              <p className="text-emerald-300">
                WHERE t.curriculumCoverage &lt; 30
              </p>
              <p className="text-emerald-300">
                RETURN c.name, t.name, t.industryDemand ORDER BY t.industryDemand DESC LIMIT 5;
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#A3A3A3]">
              <span>Neo4j Instance: Bolt://neo4j.cirrculai.internal:7687 (Connected)</span>
              <span className="text-[#10B981] font-bold">Query Execution Time: 4.2ms</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. AI INSIGHTS & RELATIONSHIP PATH INSPECTOR
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* AI Insights Large Panel (7 Cols) */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-[24px] border space-y-5 ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#10B981] text-white flex items-center justify-center font-bold shadow-md shadow-[#10B981]/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg sm:text-xl tracking-tight">
                  Graph Topology AI Insights
                </h2>
                <p className={`text-xs ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                  Automated structural pattern recognition across syllabus graph dependencies.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#10B981] bg-[#10B981]/15 px-3 py-1 rounded-full">
              5 Key Insights
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Prompt Engineering has no curriculum dependency.',
                desc: 'Prompt Engineering appears in 78% of GenAI job postings but has 0 outgoing dependencies in CS-8042.',
                status: 'Missing Link',
                color: 'text-red-400'
              },
              {
                title: 'Vector Databases connect to 6 AI courses.',
                desc: 'Milvus & pgvector serve as central hub nodes for CS-8042, CS-4080, and CS-5090.',
                status: 'Hub Node',
                color: 'text-[#10B981]'
              },
              {
                title: 'Docker should connect to Operating Systems (CS-3010).',
                desc: 'Adding containerization to OS elevates kernel scheduling comprehension by +24%.',
                status: 'Suggested Edge',
                color: 'text-amber-400'
              },
              {
                title: 'Cybersecurity lacks Cloud Security skills.',
                desc: 'CS-2020 lacks zero-trust IAM policy modules required for cloud defense roles.',
                status: 'Curriculum Deficit',
                color: 'text-red-400'
              },
              {
                title: 'AI Agents appear in 41% of modern AI roles.',
                desc: 'LangGraph & agent swarms are missing from 100% of undergraduate courses.',
                status: 'Emerging Skill',
                color: 'text-purple-400'
              }
            ].map((insight, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                  isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                }`}
              >
                <div className="space-y-1">
                  <h4 className={`font-heading font-bold text-sm ${insight.color}`}>{insight.title}</h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                    {insight.desc}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#10B981]/15 text-[#10B981] flex-shrink-0">
                  {insight.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Impact & Top Technologies (5 Cols) */}
        <div className={`lg:col-span-5 p-6 sm:p-8 rounded-[24px] border space-y-5 ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-white border-[#E5E7EB] shadow-lg'
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
            <div>
              <h2 className="font-heading font-bold text-lg sm:text-xl tracking-tight flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#10B981]" />
                <span>Industry Impact Technologies</span>
              </h2>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#B3B3B3]' : 'text-[#6B7280]'}`}>
                Top hiring technologies extracted from Neo4j graph nodes.
              </p>
            </div>
            <span className="text-xs font-mono text-[#10B981] font-bold">
              2026 Demand Index
            </span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
            {[
              { name: 'Model Context Protocol (MCP)', demand: 98, growth: '+340%', course: 'CS-8042', status: 'Missing' },
              { name: 'LangGraph Multi-Agent', demand: 95, growth: '+250%', course: 'CS-8042', status: 'Missing' },
              { name: 'Vector Databases (Milvus/pgvector)', demand: 94, growth: '+195%', course: 'CS-4080', status: 'Partial' },
              { name: 'Docker & OCI Containers', demand: 92, growth: '+120%', course: 'CS-5090', status: 'Partial' },
              { name: 'Kubernetes Orchestration', demand: 90, growth: '+145%', course: 'CS-5090', status: 'Missing' },
              { name: 'vLLM Serving Engine', demand: 88, growth: '+210%', course: 'CS-8042', status: 'Missing' }
            ].map((tech, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                }`}
              >
                <div>
                  <h4 className="font-heading font-bold text-xs">{tech.name}</h4>
                  <span className="text-[10px] font-mono text-[#737373]">Target: {tech.course}</span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-emerald-400 font-bold">{tech.growth}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    tech.status === 'Missing' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {tech.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. BOTTOM PANEL: EXECUTIVE AI SUMMARY
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-6 sm:p-8 rounded-[24px] border space-y-4 ${
        isDark ? 'bg-gradient-to-br from-[#111111] via-[#141414] to-[#0A1A14] border-[#10B981]/30' : 'bg-gradient-to-br from-white via-emerald-50/20 to-emerald-100/30 border-[#10B981]/30 shadow-lg'
      }`}>
        <div className="flex items-center gap-3 border-b pb-3 border-[#262626]/40">
          <div className="w-8 h-8 rounded-xl bg-[#10B981] text-white flex items-center justify-center font-bold">
            <BrainCircuit className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base">Executive Neo4j Ontological Summary</h3>
            <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
              Synthesized by CirrculAI Graph Engine for Academic Deans & Committee Chairs
            </p>
          </div>
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed font-sans ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
          The current curriculum graph contains <strong>194 mapped skills</strong> across 82 course modules. However, <strong>28 emerging skills</strong> (including Model Context Protocol, LangGraph, and Vector Search) remain disconnected from existing syllabi. Computer Engineering demonstrates the strongest alignment at 88%, whereas Mechanical and Civil Engineering require higher modernization efforts. Adding Docker, Kubernetes, and Vector Databases to CS-3010 and CS-8042 will improve overall institutional alignment by approximately <strong>14.2%</strong>.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs">
          <div className="flex items-center gap-4">
            <span className="text-[#10B981] font-bold">✓ ABET Criterion 3 Compliant</span>
            <span className="text-emerald-400 font-bold">✓ Tier-1 Benchmark Verified</span>
          </div>

          <button
            onClick={() => onOpenWorkspace && onOpenWorkspace('CS-8042')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#10B981]/20"
          >
            <span>Launch Modernization Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
