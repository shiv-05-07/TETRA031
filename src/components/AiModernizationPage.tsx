import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Edit3,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  Clock,
  Briefcase,
  Building2,
  Network,
  History,
  FileText,
  Download,
  Share2,
  ChevronRight,
  Filter,
  Search,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Zap,
  Eye,
  Sliders,
  Award,
  Layers,
  BookOpen,
  Users,
  BarChart3,
  ExternalLink,
  MessageSquareText,
  Info
} from 'lucide-react';
import { ThemeMode } from '../types';

interface AiModernizationPageProps {
  theme: ThemeMode;
  onNavigateWorkspace?: (courseCode?: string) => void;
  onNavigateGraph?: () => void;
  onExportReport?: () => void;
}

// Recommendation Queue Item Model
export interface ModernizationRecommendation {
  id: string;
  prNumber: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  courseCode: string;
  courseTitle: string;
  department: string;
  suggestedImprovement: string;
  summaryText: string;
  expectedAlignmentGain: number; // e.g. +12
  confidenceScore: number; // e.g. 97
  estimatedReviewTime: string; // e.g. '3 min'
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Modified';
  originalUnit: {
    unitNumber: string;
    unitTitle: string;
    topics: string[];
    textbooks: string[];
    outcomes: string[];
  };
  modernizedUnit: {
    unitNumber: string;
    unitTitle: string;
    addedTopics: { name: string; reason: string; confidence: number; alignmentGain: number }[];
    modifiedTopics: { name: string; changeText: string }[];
    removedTopics: { name: string; reason: string }[];
    updatedReferences: string[];
    outcomes: string[];
  };
  aiReasoning: {
    primaryJustification: string;
    industryDemandTrend: string;
    affectedJobRoles: string[];
    employabilityImprovement: string;
  };
  industryEvidence: {
    hiringGrowth: string;
    openJobPostings: string;
    demandIncreasePercent: number;
    adoptingCompanies: string[];
    keySkillsMatched: string[];
  };
  knowledgeGraphNodes: {
    course: string;
    outcome: string;
    skill: string;
    technology: string;
    jobRole: string;
  };
  userCustomNote?: string;
}

// Sample Recommendations Dataset (Rich Enterprise Quality)
const INITIAL_RECOMMENDATIONS: ModernizationRecommendation[] = [
  {
    id: 'rec-1',
    prNumber: 104,
    priority: 'Critical',
    courseCode: 'CS-3010',
    courseTitle: 'Operating Systems & Linux Kernel',
    department: 'Computer Science',
    suggestedImprovement: 'Add Docker & Kubernetes Cloud-Native Containerization Labs',
    summaryText: 'Replaces legacy static VM configurations with hands-on OCI containerization and K8s Pod orchestration.',
    expectedAlignmentGain: 12,
    confidenceScore: 97,
    estimatedReviewTime: '3 min',
    status: 'Pending',
    originalUnit: {
      unitNumber: 'Unit 4',
      unitTitle: 'Distributed Processes & Virtual Machine Management',
      topics: [
        'Static Virtual Machines & Hypervisors',
        'Traditional Process Isolation (chroot)',
        'MapReduce Process Scheduling',
        'Legacy Hadoop Cluster Setup XML',
        'Manual Socket IPC Programming'
      ],
      textbooks: [
        'Silberschatz - Operating System Concepts (9th Ed, 2018)'
      ],
      outcomes: [
        'Students manage virtual machines using VMware ESXi CLI.'
      ]
    },
    modernizedUnit: {
      unitNumber: 'Unit 4',
      unitTitle: 'Cloud-Native Virtualization, Containers & Kubernetes Orchestration',
      addedTopics: [
        {
          name: 'Docker & OCI Container Engine Architecture',
          reason: 'Required in 82% of Cloud Engineering & Infrastructure job postings.',
          confidence: 98,
          alignmentGain: 7
        },
        {
          name: 'Kubernetes Pod Scheduling, Ingress & Helm Deployments',
          reason: 'De-facto industry standard for cloud-native distributed systems.',
          confidence: 96,
          alignmentGain: 5
        },
        {
          name: 'Cloud Native Labs & eBPF Linux Kernel Observability',
          reason: 'High demand for Linux performance engineering roles.',
          confidence: 94,
          alignmentGain: 4
        }
      ],
      modifiedTopics: [
        {
          name: 'Process Isolation & Namespaces',
          changeText: 'Updated from legacy chroot to Linux cgroups v2, namespaces, and SECCOMP security profiles.'
        }
      ],
      removedTopics: [
        {
          name: 'Hadoop XML Configurations',
          reason: 'Deprecated technology; modern stacks utilize Kubernetes Operators.'
        }
      ],
      updatedReferences: [
        'Kubernetes Up & Running (3rd Ed, O\'Reilly 2024)',
        'Linux Kernel Programming (Packt 2025)'
      ],
      outcomes: [
        'Students containerize distributed microservices and deploy auto-scaling Kubernetes workloads.'
      ]
    },
    aiReasoning: {
      primaryJustification: 'Current syllabus focuses heavily on legacy hypervisors and manual VM setups. Modern cloud engineering teams mandate OCI container knowledge and Kubernetes cluster management.',
      industryDemandTrend: '82% of enterprise Cloud & DevOps job listings explicitly require Docker and Kubernetes experience.',
      affectedJobRoles: ['Cloud Systems Engineer', 'DevOps Specialist', 'Site Reliability Engineer (SRE)', 'Platform Engineer'],
      employabilityImprovement: '+24% higher interview callback rate for graduates with hands-on K8s lab credits.'
    },
    industryEvidence: {
      hiringGrowth: '+340% YoY increase in Cloud-Native Infrastructure job postings',
      openJobPostings: '142,500+ active global vacancies',
      demandIncreasePercent: 340,
      adoptingCompanies: ['Google Cloud', 'AWS', 'Microsoft Azure', 'Uber', 'Datadog', 'Stripe'],
      keySkillsMatched: ['Docker', 'Kubernetes', 'Helm', 'eBPF', 'Linux Kernel cgroups']
    },
    knowledgeGraphNodes: {
      course: 'CS-3010 Operating Systems',
      outcome: 'Design Cloud-Native Systems',
      skill: 'Container Orchestration',
      technology: 'Docker & Kubernetes',
      jobRole: 'Site Reliability Engineer'
    }
  },

  {
    id: 'rec-2',
    prNumber: 105,
    priority: 'Critical',
    courseCode: 'CS-4080',
    courseTitle: 'Modern Database Systems & Distributed Storage',
    department: 'Information Technology',
    suggestedImprovement: 'Introduce Vector Databases & RAG Search Architectures',
    summaryText: 'Complements relational SQL with HNSW index algorithms, Milvus/Pinecone vector databases, and Hybrid RAG retrieval.',
    expectedAlignmentGain: 18,
    confidenceScore: 98,
    estimatedReviewTime: '4 min',
    status: 'Pending',
    originalUnit: {
      unitNumber: 'Unit 3',
      unitTitle: 'Unstructured Data & Hadoop MapReduce Indexing',
      topics: [
        'Hadoop Distributed File System (HDFS)',
        'MapReduce Inverted Indexing',
        'Basic MongoDB Document Aggregation',
        'Legacy Relational B-Tree Tuning'
      ],
      textbooks: [
        'Database System Concepts (Silberschatz 7th Ed)'
      ],
      outcomes: [
        'Students write MapReduce jobs for inverted text indexing.'
      ]
    },
    modernizedUnit: {
      unitNumber: 'Unit 3',
      unitTitle: 'Vector Search, Embeddings & RAG Knowledge Retrieval Infrastructure',
      addedTopics: [
        {
          name: 'Vector Database Architecture & HNSW / IVF Indexing Algorithms',
          reason: 'Crucial for GenAI, Semantic Search, and Recommendation Systems.',
          confidence: 99,
          alignmentGain: 10
        },
        {
          name: 'Apache Spark Distributed Analytics Engine',
          reason: 'Replaces legacy MapReduce in 91% of modern data lakehouse architectures.',
          confidence: 97,
          alignmentGain: 5
        },
        {
          name: 'Hybrid Retrieval: Dense Vector + Sparse BM25 RAG Pipeline',
          reason: 'Top requested skill in Enterprise AI Database Engineering.',
          confidence: 95,
          alignmentGain: 3
        }
      ],
      modifiedTopics: [
        {
          name: 'Distributed Indexing',
          changeText: 'Updated from single-node B-Trees to distributed PGVector, Milvus, and Qdrant clusters.'
        }
      ],
      removedTopics: [
        {
          name: 'MapReduce v1 Inverted Indexing',
          reason: 'Obsolete in commercial Big Data processing pipelines.'
        }
      ],
      updatedReferences: [
        'Designing Data-Intensive Applications (Kleppmann 2025 Ed)',
        'Vector Search in Production (O\'Reilly 2025)'
      ],
      outcomes: [
        'Students build high-performance vector retrieval pipelines with PGVector and Milvus clusters.'
      ]
    },
    aiReasoning: {
      primaryJustification: 'Generative AI applications rely heavily on high-dimensional vector embeddings and nearest-neighbor search. Database engineering curricula without vector indexing leave students unprepared for modern AI data stack roles.',
      industryDemandTrend: 'Demand for Vector Database engineers grew by 410% following the rapid enterprise adoption of Retrieval-Augmented Generation (RAG).',
      affectedJobRoles: ['AI Data Engineer', 'Database Architect', 'Search & Information Retrieval Engineer', 'ML Infrastructure Engineer'],
      employabilityImprovement: '+28% increase in industry alignment for modern database tracks.'
    },
    industryEvidence: {
      hiringGrowth: '+410% surge in Vector Search & RAG postings',
      openJobPostings: '88,200+ open positions globally',
      demandIncreasePercent: 410,
      adoptingCompanies: ['Pinecone', 'MongoDB', 'PostgreSQL', 'Databricks', 'OpenAI', 'Elastic'],
      keySkillsMatched: ['PGVector', 'Milvus', 'HNSW Algorithms', 'Apache Spark', 'Hybrid RAG']
    },
    knowledgeGraphNodes: {
      course: 'CS-4080 Database Systems',
      outcome: 'Implement AI Search Engines',
      skill: 'High-Dimensional Vector Retrieval',
      technology: 'PGVector & Apache Spark',
      jobRole: 'AI Data Infrastructure Engineer'
    }
  },

  {
    id: 'rec-3',
    prNumber: 106,
    priority: 'High',
    courseCode: 'CS-8042',
    courseTitle: 'Advanced ML & Autonomous AI Agents',
    department: 'Computer Engineering',
    suggestedImprovement: 'Add AI Agents & LangGraph Multi-Agent Workflows',
    summaryText: 'Upgrades static prompt engineering to stateful, multi-agent orchestrations with LangGraph and autonomous tool-calling loops.',
    expectedAlignmentGain: 15,
    confidenceScore: 95,
    estimatedReviewTime: '3 min',
    status: 'Pending',
    originalUnit: {
      unitNumber: 'Unit 5',
      unitTitle: 'Sequence-to-Sequence NLP & Basic Prompt Templates',
      topics: [
        'RNNs and LSTMs for Language Translation',
        'Basic Zero-shot & Few-shot Prompting',
        'Static Rule-based Chatbots'
      ],
      textbooks: [
        'Speech and Language Processing (Jurafsky & Martin 2020 Draft)'
      ],
      outcomes: [
        'Students configure single-turn prompt templates.'
      ]
    },
    modernizedUnit: {
      unitNumber: 'Unit 5',
      unitTitle: 'Stateful Autonomous AI Agents, Tool Use & LangGraph Workflows',
      addedTopics: [
        {
          name: 'LangGraph Cyclic Agent State Graphs & Persistence',
          reason: 'Industry standard for complex, fault-tolerant multi-agent systems.',
          confidence: 96,
          alignmentGain: 8
        },
        {
          name: 'Model Context Protocol (MCP) Client/Server Specification',
          reason: 'Emerging open standard for connecting AI models to enterprise databases & tools.',
          confidence: 95,
          alignmentGain: 5
        },
        {
          name: 'Human-in-the-Loop Approval Nodes & Memory Checkpoints',
          reason: 'Critical safety requirement for enterprise agent deployments.',
          confidence: 93,
          alignmentGain: 2
        }
      ],
      modifiedTopics: [
        {
          name: 'Prompt Engineering',
          changeText: 'Upgraded to Context Window Optimization, Structured Outputs (Pydantic/JSON Schema), and ReAct Reasoning.'
        }
      ],
      removedTopics: [
        {
          name: 'Legacy Rule-based Chatbot Frameworks',
          reason: 'Replaced entirely by LLM agent orchestration architectures.'
        }
      ],
      updatedReferences: [
        'Building Autonomous AI Agents with LangGraph (2026)',
        'Anthropic Model Context Protocol (MCP) Standard Specification'
      ],
      outcomes: [
        'Students construct multi-agent networks that execute real-world tool calls with Human-in-the-Loop checkpoints.'
      ]
    },
    aiReasoning: {
      primaryJustification: 'Single-turn prompt engineering is no longer sufficient for complex enterprise tasks. Companies are deploying autonomous agents with memory, cyclic graph loops, and standardized tool protocols (MCP).',
      industryDemandTrend: 'Agentic AI framework adoption rose 520% in Q1 2026 across Fortune 500 engineering teams.',
      affectedJobRoles: ['AI Systems Engineer', 'GenAI Solutions Architect', 'Agentic AI Developer', 'NLP Specialist'],
      employabilityImprovement: '+32% salary premium for candidates with stateful agent graph engineering skills.'
    },
    industryEvidence: {
      hiringGrowth: '+520% explosion in AI Agent & MCP roles',
      openJobPostings: '64,000+ specialized engineering openings',
      demandIncreasePercent: 520,
      adoptingCompanies: ['Anthropic', 'OpenAI', 'LangChain', 'Cognition', 'Salesforce', 'Microsoft'],
      keySkillsMatched: ['LangGraph', 'MCP Protocol', 'ReAct Pattern', 'Pydantic Output Parsing']
    },
    knowledgeGraphNodes: {
      course: 'CS-8042 Advanced ML',
      outcome: 'Orchestrate Agent Workflows',
      skill: 'Cyclic Graph State Management',
      technology: 'LangGraph & MCP',
      jobRole: 'Agentic AI Engineer'
    }
  },

  {
    id: 'rec-4',
    prNumber: 107,
    priority: 'Medium',
    courseCode: 'CS-5090',
    courseTitle: 'Cloud Security & DevSecOps Engineering',
    department: 'Cybersecurity & Infrastructure',
    suggestedImprovement: 'Integrate eBPF Runtime Observability & Supply Chain Security',
    summaryText: 'Adds kernel-level eBPF tracing, Sigstore container signing, and automated SBOM vulnerability scanning to CI/CD pipelines.',
    expectedAlignmentGain: 14,
    confidenceScore: 94,
    estimatedReviewTime: '2 min',
    status: 'Pending',
    originalUnit: {
      unitNumber: 'Unit 2',
      unitTitle: 'Network Firewalls & Static File Hash Security',
      topics: [
        'Static Anti-Virus Scanners',
        'Basic IPTables Firewall Rules',
        'Manual Vulnerability Patching'
      ],
      textbooks: [
        'Network Security Essentials (Stallings 6th Ed)'
      ],
      outcomes: [
        'Students configure IPTables packet filtering rules.'
      ]
    },
    modernizedUnit: {
      unitNumber: 'Unit 2',
      unitTitle: 'Zero-Trust Cloud Security, eBPF Observability & Supply Chain Shielding',
      addedTopics: [
        {
          name: 'eBPF Kernel-level Security & Cilium Runtime Defense',
          reason: 'Provides zero-overhead packet filtering and container runtime security.',
          confidence: 95,
          alignmentGain: 7
        },
        {
          name: 'Software Bill of Materials (SBOM) & Cosign Supply Chain Verification',
          reason: 'Mandated by federal cybersecurity compliance frameworks.',
          confidence: 93,
          alignmentGain: 7
        }
      ],
      modifiedTopics: [
        {
          name: 'Firewall Management',
          changeText: 'Upgraded from legacy IPTables to Cilium eBPF mesh firewalls and Zero-Trust identity policies.'
        }
      ],
      removedTopics: [
        {
          name: 'Static File Hash Verification',
          reason: 'Inadequate for modern dynamic container image registries.'
        }
      ],
      updatedReferences: [
        'Learning eBPF (O\'Reilly 2024)',
        'DevSecOps & Supply Chain Security (Manning 2025)'
      ],
      outcomes: [
        'Students verify SBOMs and deploy eBPF-based security sensors in Kubernetes environments.'
      ]
    },
    aiReasoning: {
      primaryJustification: 'Supply chain attacks and container vulnerabilities require zero-trust runtime defenses rather than perimeter firewalls.',
      industryDemandTrend: 'Zero-Trust and SBOM compliance mandatory across all cloud security hiring directives.',
      affectedJobRoles: ['Cloud Security Architect', 'DevSecOps Specialist', 'Cyber Defense Lead'],
      employabilityImprovement: '+19% increase in accreditation alignment for security tracks.'
    },
    industryEvidence: {
      hiringGrowth: '+280% increase in DevSecOps & eBPF postings',
      openJobPostings: '51,200+ security roles',
      demandIncreasePercent: 280,
      adoptingCompanies: ['Isovalent', 'Cisco', 'Palo Alto Networks', 'CrowdStrike'],
      keySkillsMatched: ['eBPF', 'Cilium', 'Cosign', 'Trivy SBOM', 'Zero-Trust Architecture']
    },
    knowledgeGraphNodes: {
      course: 'CS-5090 Cloud Security',
      outcome: 'Enforce Runtime Security',
      skill: 'Kernel-level Observability',
      technology: 'eBPF & Cilium',
      jobRole: 'DevSecOps Architect'
    }
  }
];

export const AiModernizationPage: React.FC<AiModernizationPageProps> = ({
  theme,
  onNavigateWorkspace,
  onNavigateGraph,
  onExportReport
}) => {
  const isDark = theme === 'dark';

  // State
  const [recommendations, setRecommendations] = useState<ModernizationRecommendation[]>(INITIAL_RECOMMENDATIONS);
  const [selectedRecId, setSelectedRecId] = useState<string>(INITIAL_RECOMMENDATIONS[0].id);
  const [activeTab, setActiveTab] = useState<'reasoning' | 'evidence' | 'graph' | 'history'>('reasoning');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [showModifyModal, setShowModifyModal] = useState<boolean>(false);
  const [modifyTopicInput, setModifyTopicInput] = useState<string>('');
  const [modifyReasonInput, setModifyReasonInput] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState<boolean>(false);

  // Active Selected Recommendation
  const selectedRec = useMemo(() => {
    return recommendations.find(r => r.id === selectedRecId) || recommendations[0];
  }, [recommendations, selectedRecId]);

  // Toast Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Recommendation Queue
  const filteredRecommendations = useMemo(() => {
    return recommendations.filter(rec => {
      const matchesPriority = filterPriority === 'All' || rec.priority === filterPriority;
      const matchesSearch =
        rec.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.suggestedImprovement.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPriority && matchesSearch;
    });
  }, [recommendations, filterPriority, searchQuery]);

  // Approval Summary Metrics
  const summaryMetrics = useMemo(() => {
    const total = recommendations.length;
    const accepted = recommendations.filter(r => r.status === 'Accepted').length;
    const modified = recommendations.filter(r => r.status === 'Modified').length;
    const rejected = recommendations.filter(r => r.status === 'Rejected').length;
    const pending = recommendations.filter(r => r.status === 'Pending').length;

    // Projected alignment increases dynamically as items are accepted
    const baseAlignment = 84;
    const gainedAlignment = recommendations
      .filter(r => r.status === 'Accepted' || r.status === 'Modified')
      .reduce((acc, curr) => acc + curr.expectedAlignmentGain, 0);

    const projectedAlignment = Math.min(99, baseAlignment + gainedAlignment);

    return {
      total,
      accepted,
      modified,
      rejected,
      pending,
      projectedAlignment,
      employabilityGain: 21,
      healthStatus: projectedAlignment >= 92 ? 'Excellent' : 'Good'
    };
  }, [recommendations]);

  // Handle Recommendation Action (Accept / Reject)
  const handleUpdateStatus = (recId: string, status: 'Accepted' | 'Rejected' | 'Modified') => {
    setRecommendations(prev =>
      prev.map(r => (r.id === recId ? { ...r, status } : r))
    );
    const actionText = status === 'Accepted' ? 'APPROVED' : status === 'Rejected' ? 'REJECTED' : 'MODIFIED';
    triggerToast(`Recommendation PR #${selectedRec.prNumber} ${actionText} by Committee.`);
  };

  // Handle Approve All
  const handleApproveAll = () => {
    setRecommendations(prev =>
      prev.map(r => ({ ...r, status: 'Accepted' }))
    );
    triggerToast('All 4 AI Curriculum Improvements Approved by Committee!');
  };

  // Save Custom Modification
  const handleSaveModification = () => {
    if (!selectedRec) return;
    setRecommendations(prev =>
      prev.map(r => {
        if (r.id === selectedRec.id) {
          return {
            ...r,
            status: 'Modified',
            modernizedUnit: {
              ...r.modernizedUnit,
              addedTopics: [
                ...r.modernizedUnit.addedTopics,
                {
                  name: modifyTopicInput || 'Custom Faculty Module Addition',
                  reason: modifyReasonInput || 'Faculty Committee Customized Requirement',
                  confidence: 100,
                  alignmentGain: 4
                }
              ]
            }
          };
        }
        return r;
      })
    );
    setShowModifyModal(false);
    setModifyTopicInput('');
    setModifyReasonInput('');
    triggerToast(`Custom faculty module added to ${selectedRec.courseCode}!`);
  };

  return (
    <div className={`p-4 sm:p-8 space-y-6 max-w-[1750px] w-full mx-auto font-sans transition-colors ${
      isDark ? 'bg-[#0A0A0A] text-[#FAFAFA]' : 'bg-[#FAFAFA] text-[#111827]'
    }`}>
      
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-8 z-50 bg-[#10B981] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-semibold text-xs border border-white/20"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <div className={`p-6 sm:p-8 rounded-[24px] border relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all ${
        isDark ? 'bg-[#111111] border-[#262626] shadow-2xl' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-md'
      }`}>
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1.5">
              <GitPullRequest className="w-3.5 h-3.5" /> AI Review Workspace
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
              Target: Fall 2026 Curriculum Review
            </span>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            AI Curriculum Modernization
          </h1>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-[#4B5563]'}`}>
            Review AI-generated curriculum improvements before publishing. Seamlessly compare proposed diffs, inspect real-time hiring evidence, and retain human committee authority over final syllabus updates.
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={handleApproveAll}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-2 shadow-lg shadow-[#10B981]/25 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve All ({summaryMetrics.pending})</span>
          </button>

          <button
            onClick={() => onExportReport ? onExportReport() : window.print()}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#FAFAFA] hover:bg-[#222222]'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F1F5F9]'
            }`}
          >
            <Download className="w-4 h-4 text-[#10B981]" />
            <span>Export Preview</span>
          </button>

          <button
            onClick={() => setShowApprovalModal(true)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#FAFAFA] hover:bg-[#222222]'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F1F5F9]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#10B981]" />
            <span>Generate Report</span>
          </button>

          <button
            onClick={() => setShowHistoryDrawer(true)}
            className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:text-white'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            }`}
            title="View Audit Version History"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Version History</span>
          </button>
        </div>
      </div>

      {/* MAIN 3-COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= COLUMN 1: RECOMMENDATION QUEUE (3 COLS) ================= */}
        <div className={`lg:col-span-3 rounded-[24px] border p-4 space-y-4 flex flex-col justify-between ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
        }`}>
          <div>
            {/* Queue Title & Filters */}
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]/40">
              <div className="flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-[#10B981]" />
                <h3 className="font-heading font-bold text-sm">Recommendation Queue</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
                {filteredRecommendations.length} PRs
              </span>
            </div>

            {/* Search and Priority Filter Bar */}
            <div className="space-y-2 mt-3">
              <div className="relative">
                <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by course or skill..."
                  className={`w-full text-[11px] pl-8 pr-3 py-1.5 rounded-xl border focus:outline-none focus:border-[#10B981] ${
                    isDark ? 'bg-[#171717] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827]'
                  }`}
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
                {['All', 'Critical', 'High', 'Medium'].map(p => (
                  <button
                    key={p}
                    onClick={() => setFilterPriority(p)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                      filterPriority === p
                        ? 'bg-[#10B981] text-white font-bold'
                        : isDark ? 'bg-[#171717] text-[#A3A3A3] hover:text-white' : 'bg-[#F3F4F6] text-[#4B5563]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Queue Cards List */}
            <div className="space-y-3 mt-3 max-h-[680px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredRecommendations.map(rec => {
                const isSelected = rec.id === selectedRecId;
                const isApproved = rec.status === 'Accepted';
                const isRejected = rec.status === 'Rejected';
                const isModified = rec.status === 'Modified';

                return (
                  <button
                    key={rec.id}
                    onClick={() => setSelectedRecId(rec.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'bg-[#10B981]/10 border-[#10B981] shadow-lg shadow-[#10B981]/10'
                        : isDark
                          ? 'bg-[#171717] border-[#262626] hover:border-[#404040]'
                          : 'bg-[#F9FAFB] border-[#E5E7EB] hover:border-[#CBD5E1]'
                    }`}
                  >
                    {/* Active Selection Glow Bar */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#10B981]" />
                    )}

                    {/* PR Header Info */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-[#10B981] font-bold">PR #{rec.prNumber}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono ${
                          rec.priority === 'Critical'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : rec.priority === 'High'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>

                      {/* Status Indicator */}
                      <span className={`text-[10px] font-bold flex items-center gap-1 font-mono ${
                        isApproved
                          ? 'text-[#10B981]'
                          : isRejected
                            ? 'text-red-400'
                            : isModified
                              ? 'text-amber-400'
                              : 'text-[#737373]'
                      }`}>
                        {isApproved && <CheckCircle2 className="w-3 h-3" />}
                        {isRejected && <XCircle className="w-3 h-3" />}
                        {isModified && <Edit3 className="w-3 h-3" />}
                        {!isApproved && !isRejected && !isModified && 'Pending'}
                      </span>
                    </div>

                    {/* Affected Course */}
                    <div className="font-heading font-bold text-xs truncate text-[#10B981]">
                      {rec.courseCode} • {rec.courseTitle}
                    </div>

                    {/* Suggested Improvement */}
                    <p className={`text-[11px] font-medium line-clamp-2 mt-1 leading-snug ${
                      isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'
                    }`}>
                      {rec.suggestedImprovement}
                    </p>

                    {/* Card Footer Badges */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#262626]/40 text-[10px] font-mono">
                      <span className="text-[#10B981] font-bold">
                        Alignment +{rec.expectedAlignmentGain}%
                      </span>
                      <span className={isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}>
                        Conf: {rec.confidenceScore}% • ~{rec.estimatedReviewTime}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: SIDE-BY-SIDE DIFF COMPARISON (6 COLS) ================= */}
        <div className={`lg:col-span-6 rounded-[24px] border p-5 space-y-5 flex flex-col justify-between ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
        }`}>
          <div>
            {/* PR Title & Metadata Bar */}
            <div className="border-b pb-4 border-[#262626]/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-[#10B981] text-white flex items-center gap-1 shadow-sm">
                    <GitPullRequest className="w-3.5 h-3.5" /> OPEN PR #{selectedRec.prNumber}
                  </span>
                  <span className="font-mono text-xs text-[#10B981] font-bold">
                    {selectedRec.courseCode}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#10B981] font-bold bg-[#10B981]/15 px-2 py-0.5 rounded-lg border border-[#10B981]/30">
                    AI Confidence: {selectedRec.confidenceScore}%
                  </span>
                  <span className="text-amber-400 font-bold bg-amber-500/15 px-2 py-0.5 rounded-lg border border-amber-500/30">
                    +{selectedRec.expectedAlignmentGain}% Alignment
                  </span>
                </div>
              </div>

              <h2 className="font-heading font-bold text-lg sm:text-xl">
                {selectedRec.suggestedImprovement}
              </h2>
              <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#4B5563]'}`}>
                {selectedRec.summaryText}
              </p>
            </div>

            {/* SIDE-BY-SIDE DIFF PANELS */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* LEFT: ORIGINAL CURRICULUM */}
              <div className={`rounded-2xl border p-4 space-y-3 ${
                isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}>
                <div className="flex items-center justify-between border-b pb-2 border-[#262626]/40">
                  <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Original Syllabus
                  </span>
                  <span className="text-[10px] font-mono text-[#737373]">
                    {selectedRec.originalUnit.unitNumber}
                  </span>
                </div>

                <div className="font-heading font-bold text-xs text-red-300">
                  {selectedRec.originalUnit.unitTitle}
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className={`text-[10px] font-mono block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                    CURRENT TOPICS:
                  </span>
                  {selectedRec.originalUnit.topics.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-[11px] font-mono leading-tight flex items-start gap-1.5"
                    >
                      <span className="text-red-400 font-bold flex-shrink-0">-</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Textbooks */}
                <div className="pt-2 border-t border-[#262626]/40 space-y-1">
                  <span className={`text-[10px] font-mono block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                    TEXTBOOK REFERENCE:
                  </span>
                  {selectedRec.originalUnit.textbooks.map((b, idx) => (
                    <div key={idx} className="text-[10px] text-[#A3A3A3] italic">
                      • {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: AI MODERNIZED CURRICULUM */}
              <div className={`rounded-2xl border p-4 space-y-3 ${
                isDark ? 'bg-[#0E1F18] border-[#10B981]/40' : 'bg-[#F0FDF4] border-[#86EFAC]'
              }`}>
                <div className="flex items-center justify-between border-b pb-2 border-[#10B981]/30">
                  <span className="text-[11px] font-mono font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> AI Modernized Syllabus
                  </span>
                  <span className="text-[10px] font-mono text-[#10B981] font-bold">
                    PROPOSED DIFF
                  </span>
                </div>

                <div className="font-heading font-bold text-xs text-[#10B981]">
                  {selectedRec.modernizedUnit.unitTitle}
                </div>

                {/* ADDED TOPICS (GREEN DIFF) */}
                <div className="space-y-2 text-xs">
                  <span className="text-[10px] font-mono block text-[#10B981] font-bold uppercase">
                    + Added Modern Modules:
                  </span>
                  {selectedRec.modernizedUnit.addedTopics.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-[11px] space-y-1"
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <span className="font-mono text-xs">+</span> {item.name}
                        </span>
                        <span className="text-[9px] font-mono bg-[#10B981]/20 px-1.5 py-0.5 rounded">
                          +{item.alignmentGain}%
                        </span>
                      </div>
                      <p className="text-[10px] opacity-85 leading-snug">
                        {item.reason}
                      </p>
                    </div>
                  ))}

                  {/* MODIFIED TOPICS (YELLOW DIFF) */}
                  {selectedRec.modernizedUnit.modifiedTopics.map((mItem, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] space-y-0.5"
                    >
                      <span className="font-bold font-mono text-xs">~ Modified: {mItem.name}</span>
                      <p className="text-[10px] opacity-90">{mItem.changeText}</p>
                    </div>
                  ))}

                  {/* REMOVED TOPICS (RED STRIKETHROUGH DIFF) */}
                  {selectedRec.modernizedUnit.removedTopics.map((rItem, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] line-through opacity-75"
                    >
                      - Removed: {rItem.name} ({rItem.reason})
                    </div>
                  ))}

                  {/* UPDATED REFERENCES (BLUE DIFF) */}
                  <div className="pt-2 border-t border-[#10B981]/30 space-y-1">
                    <span className="text-[10px] font-mono block text-blue-400 font-bold">
                      ★ Updated Modern Literature:
                    </span>
                    {selectedRec.modernizedUnit.updatedReferences.map((ref, idx) => (
                      <div key={idx} className="text-[10px] text-blue-300 font-mono">
                        • {ref}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* INLINE CHANGE EXPLANATION CARD */}
            <div className={`mt-4 p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-[#141414] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#10B981] flex items-center gap-1.5 uppercase">
                  <BrainCircuit className="w-4 h-4" /> Why AI Recommends This Change
                </span>
                <span className="text-[10px] font-mono text-[#737373]">
                  Evidence Confidence: {selectedRec.confidenceScore}%
                </span>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                {selectedRec.aiReasoning.primaryJustification}
              </p>

              {/* Action Buttons: Accept / Reject / Modify */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#262626]/40">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedRec.id, 'Accepted')}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedRec.status === 'Accepted'
                        ? 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/30'
                        : 'bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981] hover:text-white'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Suggestion</span>
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedRec.id, 'Rejected')}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedRec.status === 'Rejected'
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                        : isDark ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => {
                      setModifyTopicInput(selectedRec.modernizedUnit.addedTopics[0]?.name || '');
                      setModifyReasonInput(selectedRec.modernizedUnit.addedTopics[0]?.reason || '');
                      setShowModifyModal(true);
                    }}
                    className={`px-3.5 py-2 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedRec.status === 'Modified'
                        ? 'bg-amber-500 text-black font-bold'
                        : isDark ? 'bg-[#262626] text-[#A3A3A3] hover:text-white' : 'bg-[#E5E7EB] text-[#4B5563] hover:text-[#111827]'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Modify</span>
                  </button>
                </div>

                <span className="text-[10px] font-mono text-[#10B981] font-bold">
                  Status: {selectedRec.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 3: TABBED INSPECTOR INTERFACE (3 COLS) ================= */}
        <div className={`lg:col-span-3 rounded-[24px] border p-4 space-y-4 flex flex-col justify-between ${
          isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
        }`}>
          <div>
            {/* Inspector Navigation Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-[#171717]/80 border border-[#262626]">
              <button
                onClick={() => setActiveTab('reasoning')}
                className={`py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'reasoning'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                AI Reason
              </button>
              <button
                onClick={() => setActiveTab('evidence')}
                className={`py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'evidence'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                Evidence
              </button>
              <button
                onClick={() => setActiveTab('graph')}
                className={`py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'graph'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                Graph
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                History
              </button>
            </div>

            {/* TAB CONTENT 1: AI REASONING */}
            {activeTab === 'reasoning' && (
              <div className="space-y-4 mt-4 text-xs">
                <div className={`p-3.5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                }`}>
                  <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase block">
                    Core AI Justification
                  </span>
                  <p className={isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}>
                    {selectedRec.aiReasoning.primaryJustification}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                }`}>
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">
                    Industry Demand Trend
                  </span>
                  <p className={isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}>
                    {selectedRec.aiReasoning.industryDemandTrend}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className={`text-[10px] font-mono block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                    AFFECTED JOB ROLES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRec.aiReasoning.affectedJobRoles.map((role, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl text-[10px] font-mono bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-semibold"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-between text-[#10B981] font-mono">
                  <span>Employability Boost:</span>
                  <span className="font-bold text-sm">{selectedRec.aiReasoning.employabilityImprovement}</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: INDUSTRY EVIDENCE */}
            {activeTab === 'evidence' && (
              <div className="space-y-4 mt-4 text-xs">
                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className={`p-3 rounded-2xl border ${isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'}`}>
                    <span className="text-[9px] text-[#737373] block">Hiring Growth</span>
                    <span className="font-bold text-xs text-[#10B981]">+{selectedRec.industryEvidence.demandIncreasePercent}%</span>
                  </div>
                  <div className={`p-3 rounded-2xl border ${isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'}`}>
                    <span className="text-[9px] text-[#737373] block">Active Postings</span>
                    <span className="font-bold text-xs text-amber-400">{selectedRec.industryEvidence.openJobPostings}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className={`text-[10px] font-mono block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                    ADOPTING COMPANIES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRec.industryEvidence.adoptingCompanies.map((comp, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-mono border ${
                          isDark ? 'bg-[#171717] border-[#262626] text-[#D4D4D4]' : 'bg-[#F3F4F6] border-[#E5E7EB] text-[#374151]'
                        }`}
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className={`text-[10px] font-mono block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                    KEY SKILLS MATCHED:
                  </span>
                  <div className="space-y-1">
                    {selectedRec.industryEvidence.keySkillsMatched.map((sk, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#10B981]/10 text-[#10B981] font-mono text-[10px] font-semibold flex items-center justify-between"
                      >
                        <span>✓ {sk}</span>
                        <span className="text-[9px] text-[#34D399]">98% Match</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: KNOWLEDGE GRAPH */}
            {activeTab === 'graph' && (
              <div className="space-y-4 mt-4 text-xs">
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
                }`}>
                  <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase flex items-center gap-1">
                    <Network className="w-3.5 h-3.5" /> Neo4j Knowledge Chain
                  </span>

                  {/* Flow Chain */}
                  <div className="space-y-2 font-mono text-[10px]">
                    <div className="p-2 rounded-xl bg-[#171717] border border-[#262626] text-[#10B981]">
                      Course: <span className="font-bold text-white">{selectedRec.knowledgeGraphNodes.course}</span>
                    </div>
                    <div className="text-center text-[#10B981]">↓</div>
                    <div className="p-2 rounded-xl bg-[#171717] border border-[#262626] text-amber-400">
                      Outcome: <span className="font-bold text-white">{selectedRec.knowledgeGraphNodes.outcome}</span>
                    </div>
                    <div className="text-center text-[#10B981]">↓</div>
                    <div className="p-2 rounded-xl bg-[#171717] border border-[#262626] text-blue-400">
                      Skill: <span className="font-bold text-white">{selectedRec.knowledgeGraphNodes.skill}</span>
                    </div>
                    <div className="text-center text-[#10B981]">↓</div>
                    <div className="p-2 rounded-xl bg-[#171717] border border-[#262626] text-[#10B981]">
                      Tech: <span className="font-bold text-white">{selectedRec.knowledgeGraphNodes.technology}</span>
                    </div>
                    <div className="text-center text-[#10B981]">↓</div>
                    <div className="p-2 rounded-xl bg-[#10B981] text-white font-bold text-center">
                      Role: {selectedRec.knowledgeGraphNodes.jobRole}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onNavigateGraph}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#10B981] hover:bg-[#34D399] text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Network className="w-4 h-4" />
                  <span>Open Full Knowledge Graph Explorer</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT 4: CHANGE HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-3 mt-4 text-xs font-mono">
                <span className={`text-[10px] block ${isDark ? 'text-[#737373]' : 'text-[#9CA3AF]'}`}>
                  TODAY'S AUDIT LOG:
                </span>

                <div className="space-y-2 border-l-2 border-[#10B981]/40 ml-2 pl-3">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-[#10B981] font-bold">11:42 AM • AI Agent</span>
                    <p className={`text-[11px] ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Generated 4 modernization PR recommendations.
                    </p>
                  </div>

                  <div className="space-y-0.5 pt-2">
                    <span className="text-[9px] text-amber-400 font-bold">12:15 PM • Dr. Sharma</span>
                    <p className={`text-[11px] ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Reviewed CS-3010 Docker & Kubernetes PR #104.
                    </p>
                  </div>

                  <div className="space-y-0.5 pt-2">
                    <span className="text-[9px] text-blue-400 font-bold">Yesterday • Committee</span>
                    <p className={`text-[11px] ${isDark ? 'text-[#D4D4D4]' : 'text-[#374151]'}`}>
                      Approved CS-4080 Vector DBs update.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION 1: MODERNIZATION TIMELINE PROGRESS PIPELINE */}
      <div className={`p-6 rounded-[24px] border space-y-4 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#10B981] uppercase flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Modernization Progress Pipeline
          </span>
          <span className="text-xs font-mono text-[#737373]">
            Stage 3 of 5 • Committee Review Active
          </span>
        </div>

        {/* Steps Visualizer */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {[
            { step: '1', title: 'Syllabus Parsed', status: 'Complete', time: 'Yesterday' },
            { step: '2', title: 'AI PRs Generated', status: 'Complete', time: '11:42 AM' },
            { step: '3', title: 'Committee Review', status: 'Active', time: 'In Progress' },
            { step: '4', title: 'Faculty Approval', status: 'Pending', time: 'Next Stage' },
            { step: '5', title: 'Ready to Export', status: 'Pending', time: 'Final Step' }
          ].map((st, idx) => {
            const isActive = st.status === 'Active';
            const isDone = st.status === 'Complete';

            return (
              <div
                key={idx}
                className={`p-3 rounded-2xl border transition-all text-center space-y-1 ${
                  isActive
                    ? 'bg-[#10B981]/15 border-[#10B981] shadow-lg shadow-[#10B981]/15'
                    : isDone
                      ? 'bg-[#10B981]/5 border-[#10B981]/30 opacity-90'
                      : isDark ? 'bg-[#171717] border-[#262626] opacity-60' : 'bg-[#F9FAFB] border-[#E5E7EB] opacity-60'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                    isActive ? 'bg-[#10B981] text-white' : isDone ? 'bg-[#10B981]/30 text-[#10B981]' : 'bg-[#262626] text-[#737373]'
                  }`}>
                    {st.step}
                  </span>
                  <span className={`text-xs font-heading font-bold ${
                    isActive ? 'text-[#10B981]' : isDone ? 'text-white' : 'text-[#737373]'
                  }`}>
                    {st.title}
                  </span>
                </div>
                <span className="text-[9px] font-mono block text-[#737373]">
                  {st.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SECTION 2: APPROVAL SUMMARY & PUBLISH PANEL */}
      <div className={`p-6 sm:p-8 rounded-[24px] border relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 ${
        isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-md'
      }`}>
        {/* Metric Pill Clusters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
          <div className={`p-3.5 rounded-2xl border text-center space-y-0.5 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className="text-[10px] font-mono text-[#737373] block">PR Status</span>
            <span className="font-heading font-bold text-lg text-white">
              {summaryMetrics.accepted} Acc / {summaryMetrics.rejected} Rej
            </span>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center space-y-0.5 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className="text-[10px] font-mono text-[#737373] block">Industry Alignment</span>
            <span className="font-heading font-bold text-lg text-[#10B981]">
              84% ➔ {summaryMetrics.projectedAlignment}%
            </span>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center space-y-0.5 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className="text-[10px] font-mono text-[#737373] block">Employability</span>
            <span className="font-heading font-bold text-lg text-amber-400">
              +{summaryMetrics.employabilityGain}% Boost
            </span>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center space-y-0.5 ${
            isDark ? 'bg-[#151515] border-[#262626]' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className="text-[10px] font-mono text-[#737373] block">Curriculum Health</span>
            <span className="font-heading font-bold text-lg text-[#10B981]">
              {summaryMetrics.healthStatus}
            </span>
          </div>
        </div>

        {/* Final Committee Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          <button
            onClick={() => onNavigateWorkspace ? onNavigateWorkspace() : null}
            className={`px-5 py-3 rounded-2xl font-semibold text-xs border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#171717] border-[#262626] text-[#FAFAFA] hover:bg-[#222222]'
                : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#111827] hover:bg-[#F1F5F9]'
            }`}
          >
            Return to Workspace
          </button>

          <button
            onClick={() => setShowApprovalModal(true)}
            className="px-6 py-3 rounded-2xl font-bold text-xs text-white bg-[#10B981] hover:bg-[#34D399] transition-all flex items-center gap-2 shadow-xl shadow-[#10B981]/30 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approve Curriculum</span>
          </button>
        </div>
      </div>

      {/* MODAL: CUSTOMIZE / MODIFY RECOMMENDATION */}
      <AnimatePresence>
        {showModifyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModifyModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-lg p-6 rounded-[24px] border shadow-2xl space-y-4 z-10 ${
                isDark ? 'bg-[#111111] border-[#262626] text-white' : 'bg-white border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-[#262626]/40">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#10B981]" />
                  <h3 className="font-heading font-bold text-lg">Modify AI Recommendation</h3>
                </div>
                <button
                  onClick={() => setShowModifyModal(false)}
                  className="p-1 rounded-lg hover:bg-[#262626] text-[#737373] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
                Customize the suggested syllabus module topic and justification for {selectedRec.courseCode} before committee approval.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-[#10B981]">Custom Module Name / Topic</label>
                  <input
                    type="text"
                    value={modifyTopicInput}
                    onChange={(e) => setModifyTopicInput(e.target.value)}
                    placeholder="e.g. Hands-on Ray Cluster & Model Serving Labs"
                    className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-[#10B981] ${
                      isDark ? 'bg-[#171717] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#10B981]">Faculty Justification Note</label>
                  <textarea
                    rows={3}
                    value={modifyReasonInput}
                    onChange={(e) => setModifyReasonInput(e.target.value)}
                    placeholder="Provide context for why this topic was tweaked by the department committee..."
                    className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-[#10B981] ${
                      isDark ? 'bg-[#171717] border-[#262626] text-white' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowModifyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#262626] text-[#A3A3A3]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModification}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] shadow-md"
                >
                  Save Modified PR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: APPROVAL CONFIRMATION & PUBLISH SUMMARY */}
      <AnimatePresence>
        {showApprovalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowApprovalModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-xl p-8 rounded-[28px] border shadow-2xl text-center space-y-6 z-10 ${
                isDark ? 'bg-[#111111] border-[#10B981]/40 text-white' : 'bg-white border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto border border-[#10B981]/40 shadow-xl shadow-[#10B981]/20">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-heading font-bold text-2xl">Approve & Publish Modernized Syllabus</h3>
                <p className={`text-xs mt-2 ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B7280]'}`}>
                  You are about to sign off on the Fall 2026 Curriculum Modernization batch. ABET outcome mapping and industry alignment report will be generated automatically.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border grid grid-cols-3 gap-3 text-center ${
                isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
              }`}>
                <div>
                  <span className="text-[10px] font-mono text-[#737373] block">Approved PRs</span>
                  <span className="font-heading font-bold text-lg text-[#10B981]">
                    {summaryMetrics.accepted + summaryMetrics.modified} / {summaryMetrics.total}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#737373] block">Final Alignment</span>
                  <span className="font-heading font-bold text-lg text-[#10B981]">
                    {summaryMetrics.projectedAlignment}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#737373] block">ABET Status</span>
                  <span className="font-heading font-bold text-lg text-amber-400">
                    Compliant
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="flex-1 py-3 rounded-2xl text-xs font-semibold border border-[#262626] hover:bg-[#171717]"
                >
                  Back to Review
                </button>

                <button
                  onClick={() => {
                    setShowApprovalModal(false);
                    triggerToast('Curriculum Modernization Published to Stanford Registrar & ABET Portal!');
                  }}
                  className="flex-1 py-3 rounded-2xl text-xs font-bold text-white bg-[#10B981] hover:bg-[#34D399] shadow-xl shadow-[#10B981]/30 cursor-pointer"
                >
                  Confirm & Publish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DRAWER: VERSION HISTORY */}
      <AnimatePresence>
        {showHistoryDrawer && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistoryDrawer(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-md h-full shadow-2xl p-6 overflow-y-auto space-y-6 z-10 ${
                isDark ? 'bg-[#111111] border-l border-[#262626] text-white' : 'bg-white border-l border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-4 border-[#262626]/40">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-[#10B981]" />
                  <h3 className="font-heading font-bold text-lg">Curriculum Audit Timeline</h3>
                </div>
                <button
                  onClick={() => setShowHistoryDrawer(false)}
                  className="p-1 rounded-lg hover:bg-[#262626] text-[#737373] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
                  <span className="font-bold">v2.4 Current Working Draft</span>
                  <p className="text-[10px] text-[#34D399] mt-0.5">Updated 10 minutes ago with Docker & Kubernetes labs PR #104.</p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-[#737373] font-bold block uppercase">Historical Revisions</span>
                  
                  {[
                    { ver: 'v2.3', title: 'Added Model Context Protocol (MCP) Module', author: 'AI Engine', date: 'Today, 11:42 AM' },
                    { ver: 'v2.2', title: 'Vector Database & RAG Search Upgrade', author: 'Dr. Sharma', date: 'Yesterday' },
                    { ver: 'v2.1', title: 'MapReduce Deprecation & Spark Addition', author: 'Prof. Williams', date: '3 days ago' },
                    { ver: 'v2.0', title: 'Fall 2026 Semester Baseline Parse', author: 'Syllabus Parser', date: 'Jul 28, 2026' }
                  ].map((hist, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border space-y-1 ${
                        isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[#10B981]">{hist.ver}</span>
                        <span className="text-[#737373]">{hist.date}</span>
                      </div>
                      <div className="font-bold text-white text-[11px]">{hist.title}</div>
                      <div className="text-[10px] text-[#737373]">Author: {hist.author}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
