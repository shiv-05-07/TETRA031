import { FeatureItem, PricingPlan, Testimonial, FAQItem, CurriculumData } from './types';

export const SAMPLE_CURRICULUM: CurriculumData = {
  title: "Advanced Machine Learning & Scalable MLOps",
  code: "CS-8042",
  level: "Graduate / Master's Degree",
  credits: 4,
  bloomMapping: {
    remembering: "15% - Mathematical definitions & neural network terminology",
    understanding: "20% - Optimization loss landscapes & backpropagation theory",
    applying: "25% - PyTorch tensor programming & GPU model training",
    analyzing: "20% - Latent space representation & model error diagnostics",
    evaluating: "10% - Model benchmarking, ethics & inference trade-off analysis",
    creating: "10% - Novel architecture engineering & capstone MLOps pipeline"
  },
  learningOutcomes: [
    "Formulate and evaluate deep learning architectures for high-dimensional multimodal datasets.",
    "Implement scalable distributed training pipelines using Docker, Kubernetes, and Ray Cluster.",
    "Construct MLOps observability engines to track model drift, latency spikes, and data bias.",
    "Design ethical AI governance frameworks adhering to IEEE 2025 and EU AI Act compliance standards."
  ],
  units: [
    {
      unitNumber: 1,
      title: "Foundations & High-Dimensional Vector Spaces",
      topics: ["Tensor Algebra & Autograd Mechanisms", "Loss Surface Topography & AdamW Mechanics", "Latent Space Mapping", "Dimensionality Reduction"],
      practicalLab: "Construct an autograd engine from scratch using Python and NumPy",
      durationWeeks: 3
    },
    {
      unitNumber: 2,
      title: "Modern Transformer & Attention Architectures",
      topics: ["Scaled Dot-Product Self-Attention", "Multi-Head Projection Dynamics", "Positional Encodings", "FlashAttention & KV-Cache Optimization"],
      practicalLab: "Train a 10M parameter mini-GPT model on domain-specific academic literature",
      durationWeeks: 4
    },
    {
      unitNumber: 3,
      title: "MLOps, Containerization & High-Throughput Inference",
      topics: ["Docker & Kubernetes Orchestration", "vLLM & TensorRT Acceleration", "Model Drift & Evidentiary Metrics", "CI/CD Model Registry"],
      practicalLab: "Deploy an LLM API behind Nginx reverse proxy with Prometheus monitoring",
      durationWeeks: 4
    },
    {
      unitNumber: 4,
      title: "AI Governance, Alignment & Industry Capstone",
      topics: ["RLHF & Direct Preference Optimization (DPO)", "Red Teaming & Jailbreak Mitigation", "Model Auditing & Ethics", "Enterprise RAG Architectures"],
      practicalLab: "Build an Enterprise Knowledge Retrieval RAG System with ChromaDB & FastAPI",
      durationWeeks: 4
    }
  ],
  assessmentMatrix: [
    { component: "Practical Labs & Coding Assignments", weight: "30%", format: "GitHub Repositories + Automated CI/CD Autograding" },
    { component: "Mid-Term Technical Examination", weight: "20%", format: "Theoretical Formulation & Mathematical Proofs" },
    { component: "Industry Capstone Project", weight: "35%", format: "Peer-reviewed Code, Architecture Paper & Live Demo" },
    { component: "Bloom's Reflective Quizzes", weight: "15%", format: "Weekly AI-generated adaptive question papers" }
  ],
  industryToolsCoverage: ["PyTorch", "Docker", "vLLM", "Ray Cluster", "Weights & Biases", "FastAPI", "Prometheus", "ChromaDB"]
};

export const FEATURES_LIST: FeatureItem[] = [
  {
    id: "semantic-analysis",
    iconName: "FileCheck",
    title: "Semantic Syllabus Analysis",
    subtitle: "Extract topics, learning outcomes, and prerequisites with deep LLM parsing",
    description: "Upload existing PDF, Word, or LaTeX course syllabi. Semantic AI extracts core concepts, cognitive depth, and structural dependencies in seconds.",
    highlights: ["Automatic topic & outcome extraction", "Bloom's taxonomy level detection", "Prerequisite dependency mapping"],
    badge: "Core AI Engine"
  },
  {
    id: "skill-gap",
    iconName: "BarChart3",
    title: "Industry Skill Gap Detection",
    subtitle: "Compare syllabi against 120,000+ live enterprise job postings",
    description: "Continuously audit course content against real-time industry demand across tech hubs, revealing missing frameworks, outdated tools, and skill deficiencies.",
    highlights: ["Real-time tech stack comparison", "Outdated topic identification", "Industry coverage percentage"],
    badge: "Market Intelligence"
  },
  {
    id: "knowledge-graph",
    iconName: "BrainCircuit",
    title: "Neo4j Knowledge Graph Mapping",
    subtitle: "Map course outcomes to industry skills, technologies, and career roles",
    description: "Visualize how course modules connect to real-world software engineering roles, industry certifications, and enterprise tech stacks using graph database ontologies.",
    highlights: ["Interactive graph visualization", "Skill-to-job trajectory mapping", "Cross-department prerequisite graphs"],
    badge: "Graph Intelligence"
  },
  {
    id: "market-intelligence",
    iconName: "Compass",
    title: "Job Market Intelligence",
    subtitle: "Track hiring demand, emerging tools, and skill shift velocity",
    description: "Monitor live market signals from top tech employers to know exactly when skills like MCP, Vector DBs, or RAG shift from niche to mandatory.",
    highlights: ["Surging skill indicators", "Regional hiring demand filters", "Employer requirement benchmarks"],
    badge: "Real-Time Feeds"
  },
  {
    id: "emerging-tech",
    iconName: "Sparkles",
    title: "Emerging Technology Detection",
    subtitle: "Detect rapid shifts like MCP, AI Agents, Vector DBs, and Edge AI",
    description: "Proactively flag cutting-edge technologies entering production so university curricula stay 3-5 years ahead of standard textbook cycles.",
    highlights: ["Early adoption trend alerts", "Technology lifecycle tracking", "Curriculum update triggers"],
    badge: "Future-Proofing"
  },
  {
    id: "ai-modernization",
    iconName: "Zap",
    title: "AI Curriculum Modernization",
    subtitle: "Generate modern module replacements and modernized syllabus versions",
    description: "Receive AI-crafted syllabus revisions that replace obsolete units (e.g. MapReduce) with modern industry standards (e.g. Vector DBs & Spark).",
    highlights: ["1-click unit modernization", "Balanced credit allocation", "Seamless version comparisons"],
    badge: "LLM Modernizer"
  },
  {
    id: "case-studies",
    iconName: "TableProperties",
    title: "Case Study Recommendations",
    subtitle: "Integrate real enterprise engineering case studies and architecture papers",
    description: "Enrich theoretical lectures with curated real-world engineering case studies from leading tech companies like Google, Meta, and Netflix.",
    highlights: ["Production incident breakdowns", "Architecture pattern analysis", "Industry guest lecture notes"],
    badge: "Practical Pedagogy"
  },
  {
    id: "industry-projects",
    iconName: "Target",
    title: "Industry Project Suggestions",
    subtitle: "Generate practical capstone and laboratory assignments matching hiring needs",
    description: "Provide students with hands-on coding repositories, Dockerized lab setups, and capstone briefs modeled on actual engineering team tasks.",
    highlights: ["GitHub repository lab templates", "Automated grading rubric guidelines", "Industry-grade capstone specs"],
    badge: "Applied Learning"
  },
  {
    id: "export-syllabus",
    iconName: "TableProperties",
    title: "Export Updated Syllabus & ABET Reports",
    subtitle: "Export accreditation-ready PDF, Word, Canvas LMS, and QTI packages",
    description: "Generate official department-ready syllabus documents complete with ABET, NBA, and IEEE outcome matrices in one click.",
    highlights: ["ABET & NBA compliance matrices", "Canvas & Moodle LMS exports", "Version-controlled PDF reports"],
    badge: "Accreditation"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "educator",
    name: "Educator Free",
    priceMonthly: 0,
    priceAnnual: 0,
    description: "Ideal for individual professors and teaching assistants modernizing single courses.",
    features: [
      "Up to 3 Course Syllabi Audits / mo",
      "AI Lesson Plan & Slide Outline Generator",
      "Basic Bloom's Taxonomy Mapping",
      "Standard PDF & Markdown Export",
      "Community Support & Templates"
    ],
    ctaText: "Get Started Free"
  },
  {
    id: "department",
    name: "Department Pro",
    priceMonthly: 299,
    priceAnnual: 239,
    description: "For academic departments seeking continuous curriculum alignment and standardized grading.",
    isPopular: true,
    badge: "Most Popular",
    features: [
      "Unlimited Syllabi & Course Audits",
      "ABETS / IEEE Accreditation Matrix",
      "Automated Question Paper Generator",
      "Custom Rubrics & CO-PO Mapping",
      "Export to PDF, LaTeX, Canvas & Word",
      "Priority Gemini 3.6 Flash Processing",
      "Dedicated Department Workspace"
    ],
    ctaText: "Start 14-Day Trial"
  },
  {
    id: "university",
    name: "University Enterprise",
    priceMonthly: 899,
    priceAnnual: 719,
    description: "Custom deployment for university systems, multi-campus institutions, and accreditation boards.",
    features: [
      "All Department Pro Capabilities",
      "University-wide Analytics Dashboard",
      "Custom Skill Ontology & Knowledge Graph",
      "Single Sign-On (SAML / Okta / Azure AD)",
      "LMS Integration (Canvas, Blackboard, Moodle)",
      "Dedicated Academic Success Director",
      "Custom AI Fine-Tuning & On-Premises Option",
      "SOC2 Type II & FERPA Compliant"
    ],
    ctaText: "Contact Sales"
  }
];

export const TESTIMONIALS_LIST: Testimonial[] = [
  {
    id: "t1",
    quote: "Lumini reduced our annual curriculum modernization review from a 4-month committee marathon to under 30 minutes. The industry skill gap detection pinpointed our missing vector database modules immediately.",
    author: "Dr. Aris Thorne",
    role: "Dean of Engineering & Computer Science",
    institution: "Stanford University",
    rating: 5
  },
  {
    id: "t2",
    quote: "As Academic Council Chair, ensuring our software engineering syllabus keeps pace with industry standard frameworks like MCP and Kubernetes was challenging. Lumini provides the exact data backing we need for accreditation.",
    author: "Prof. Elena Rostova",
    role: "Curriculum Committee Chair",
    institution: "Imperial College London",
    rating: 5
  },
  {
    id: "t3",
    quote: "Mapping Course Outcomes to ABET and NBA requirements used to take hundreds of faculty hours. Lumini auto-maps our outcomes to live industry skill graphs and generates audit-ready compliance matrices.",
    author: "Dr. Marcus Vance",
    role: "Head of Department, Data Science",
    institution: "ETH Zürich",
    rating: 5
  },
  {
    id: "t4",
    quote: "The Knowledge Graph visualization showed our department how our prerequisite chains connect to actual job roles in AI infrastructure. It has transformed how our Academic Council plans course updates.",
    author: "Dr. Priya Sharma",
    role: "Academic Council Member",
    institution: "IIT Bombay",
    rating: 5
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What is Lumini and how does it help universities?",
    answer: "Lumini is an enterprise AI-powered curriculum intelligence platform. It analyzes course syllabi, maps learning outcomes against Bloom's Revised Taxonomy, identifies industry skill gaps against live market data, and generates lesson plans, question papers, rubrics, and accreditation reports in minutes."
  },
  {
    id: "faq-2",
    category: "Accreditation",
    question: "Does Lumini support accreditation standards like ABET, IEEE, or AACSB?",
    answer: "Yes. Lumini includes built-in templates for ABET, IEEE, ACM, and AACSB frameworks. It automatically maps Course Outcomes (COs) to Program Outcomes (POs) and generates exportable matrices formatted for accreditation review boards."
  },
  {
    id: "faq-3",
    category: "Security",
    question: "Is university data kept confidential and secure?",
    answer: "Absolutely. Lumini adheres to strict enterprise data protection policies (FERPA compliant, SOC2 Type II standard architecture). Your uploaded syllabi, question banks, and internal curriculum documents are never used to train public AI models."
  },
  {
    id: "faq-4",
    category: "Integrations",
    question: "Can Lumini export to LMS platforms like Canvas, Moodle, or Blackboard?",
    answer: "Yes. You can export generated lesson plans, question banks, and rubrics directly in PDF, Word, LaTeX, JSON, or QTI formats compatible with Canvas, Moodle, Blackboard, and Google Classroom."
  },
  {
    id: "faq-5",
    category: "AI Technology",
    question: "Which AI models power Lumini's reasoning engine?",
    answer: "Lumini utilizes Google DeepMind's Gemini 3.6 Flash model combined with custom Neo4j Skill Ontology Knowledge Graphs and ChromaDB vector search to ensure grounded, hallucination-free educational recommendations."
  }
];
