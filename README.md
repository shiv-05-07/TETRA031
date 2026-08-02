<div align="center">

# Lumini — AI Curriculum Gap Analysis & Modernization Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000.svg)](https://expressjs.com/)
[![Gemini API](https://img.shields.io/badge/Google_Gemini-3.6_Flash-8E75B2.svg)](https://ai.google.dev/)
[![Neo4j](https://img.shields.io/badge/Neo4j-Graph_Database-45818e.svg)](https://neo4j.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E.svg)](https://supabase.com/)

**Automating syllabus benchmarking, industry skill gap detection, and GraphRAG curriculum modernization with AI and Knowledge Graphs.**

</div>

---

## 📌 Problem Overview

University computer science and engineering curricula often lag behind rapidly evolving tech industry demands. Key modern competencies—such as Cloud Computing, Containerization (Docker/Kubernetes), Vector Databases, MLOps, and LLMOps—are frequently missing or outdated in standard university syllabi.

**Lumini** automates curriculum auditing by converting raw PDF syllabi into structured knowledge graphs, benchmarking them against a real-world Industry Knowledge Graph powered by **Neo4j** and **Google Gemini AI**, and providing actionable **GraphRAG recommendations** for academic modernization.

---

## ✨ Features

### Implemented Features
- 📄 **Multi-Format Syllabus Upload**: Seamless PDF file drag-and-drop with Supabase Storage object retention.
- 🔍 **Automated Text Extraction**: Server-side extraction using `pdf-parse`.
- 🧠 **Gemini Structured Analysis**: Structured JSON extraction of course metadata, semester credits, units, topics, prerequisites, and learning outcomes using Google Gemini AI with automatic 530/503 retry resilience.
- 🕸️ **Neo4j Knowledge Graph Generation**: Automated conversion of extracted course entities into a Neo4j graph using `MERGE` relationships (`:Course`, `:Unit`, `:Topic`, `:Skill`, `:Tool`, `:Book`, `:Prerequisite`).
- 📊 **Industry Knowledge Comparison & Gap Detection**: Direct comparison of course skill graphs against a seeded Industry Knowledge Graph (`:Domain`, `:IndustrySkill`, `:Tool`).
- 📈 **Dynamic Gap Reporting**: Calculation of coverage percentages, overall alignment scores, missing industry skills, and outdated technology identification.
- 💬 **GraphRAG AI Assistant**: Contextual Q&A endpoint (`POST /api/chat`) incorporating vector similarity context and Neo4j graph relationships.
- 🎨 **Modern Futuristic UI**: Dark/Light mode theme system, Vercel-inspired glassmorphism, dynamic progress indicators, circular progress gauges, and priority ranking tables.

### Planned & Roadmap Features
- 📄 **Automated PDF Export**: Server-side compilation of generated modernized syllabi into downloadable PDF files.
- 🔄 **Multi-Syllabus Benchmarking**: Cross-departmental syllabus side-by-side comparative analysis.
- 🤖 **Agentic Automated Course Redesign**: Automated generation of complete lecture slides and lab assignment templates.

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, TailwindCSS v4, Lucide React, Framer Motion |
| **Backend** | Node.js, Express, TypeScript, Multer, `pdf-parse` |
| **AI / LLM** | Google Gemini API (`@google/genai` - `gemini-3.6-flash`) |
| **Graph Database** | Neo4j (`neo4j-driver`) |
| **Relational Database & Storage** | Supabase (PostgreSQL & Storage Buckets) |
| **Vector DB / Embeddings** | ChromaDB / Local Vector Store pipeline |
| **Build & Tooling** | Vite, Esbuild, Concurrently, TSX |

---

## 🏗️ Architecture & Data Flow

```
[User Uploads PDF]
       │
       ▼
[Express Server (/api/upload)]
       │
       ├──► 1. Supabase Storage (PDF retention)
       ├──► 2. Supabase Postgres (Insert documents record)
       ├──► 3. pdf-parse (Extract raw text)
       ├──► 4. Gemini API (Extract structured JSON schema)
       ├──► 5. Neo4j Graph Service (MERGE Course, Unit, Topic, Skill nodes)
       └──► 6. Gap Analysis Service (Compare against Neo4j Industry Graph)
       │
       ▼
[JSON Response returned to React Frontend]
       │
       ▼
[Dynamic Dashboard & Analysis Results Page]
```

---

## 🤖 AI Pipeline

1. **PDF Upload & Storage**: Stores syllabus documents securely in Supabase Storage.
2. **Text Parsing**: `pdf-parse` extracts raw text from PDF buffers.
3. **Structured JSON Extraction**: Gemini AI parses raw text into a strict TypeScript schema (`course`, `units`, `topics`, `prerequisites`, `learningOutcomes`).
4. **Knowledge Graph Construction**: Neo4j driver creates relationships:
   - `(:Course)-[:HAS_UNIT]->(:Unit)-[:HAS_TOPIC]->(:Topic)`
   - `(:Course)-[:DEVELOPS]->(:Skill)`
   - `(:Course)-[:USES_TOOL]->(:Tool)`
5. **Industry Benchmark Alignment**: Compares curriculum graph against seeded domain skills (`Python`, `Docker`, `Kubernetes`, `Git`, `REST APIs`, `NoSQL`, `MLOps`, `Vector DBs`).
6. **Semantic Gap Detection**: Computes coverage percentage (`covered / total * 100`) and lists missing skills and tools.
7. **GraphRAG Recommendation Assistant**: `POST /api/chat` combines Neo4j graph context and vector search to answer user queries with high confidence scores.

---

## 🖼️ Screenshots

> *Placeholder: Screenshots of the dashboard, upload page, gap analysis reports, and graph visualization.*

| Dashboard View | Upload & Analysis Progress |
|---|---|
| ![Dashboard Placeholder](https://via.placeholder.com/600x350?text=Lumini+Dashboard+UI) | ![Upload Progress Placeholder](https://via.placeholder.com/600x350?text=AI+Pipeline+Progress) |

| Gap Analysis & Skill Metrics | Skill Priority Table |
|---|---|
| ![Gap Analysis Placeholder](https://via.placeholder.com/600x350?text=Semantic+Gap+Analysis) | ![Skill Priority Placeholder](https://via.placeholder.com/600x350?text=Skill+Priority+Table) |

---

## ⚡ Installation & Setup

### Prerequisites
- **Node.js** (v20.16.0+ or v22.3.0+)
- **npm** (v10+)
- **Neo4j Database** (Local instance or Neo4j AuraDB)
- **Supabase Account** (Storage bucket `documents` and table `documents`)

### 1. Clone Repository
```bash
git clone https://github.com/your-org/TETRA031.git
cd TETRA031
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=https://your-supabase-id.supabase.co
SUPABASE_KEY=your_supabase_anon_or_service_key
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_neo4j_password
```

### 4. Seed Industry Knowledge Graph
Import the industry skills dataset into Neo4j:
```bash
npm run seed:industry
```

### 5. Run Development Server
Start both Vite frontend and Express server concurrently:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build Project
```bash
npm run build
```

---

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|---|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key for AI extraction & recommendations | **Yes** | — |
| `SUPABASE_URL` | Supabase Project URL | **Yes** | — |
| `SUPABASE_KEY` | Supabase Public / Service Role API Key | **Yes** | — |
| `NEO4J_URI` | Connection URI for Neo4j instance (`bolt://` or `neo4j+s://`) | **Yes** | `bolt://localhost:7687` |
| `NEO4J_USER` | Neo4j database username | **Yes** | `neo4j` |
| `NEO4J_PASSWORD` | Neo4j database password | **Yes** | — |
| `PORT` | Express server port | No | `3000` |

---

## 📡 API Overview

| Method | Route | Description | Payload / Response |
|---|---|---|---|
| `GET` | `/api/health` | Server health check endpoint | `{ status: "ok" }` |
| `POST` | `/api/upload` | Main ingestion pipeline (Storage ➔ Text ➔ Gemini ➔ Graph ➔ Gap Analysis) | **Multipart**: `file` (PDF)<br>**Returns**: `{ success, documentId, fileUrl, analysis, gapReport }` |
| `POST` | `/api/chat` | GraphRAG recommendation assistant | **Body**: `{ documentId, question }`<br>**Returns**: `{ answer, sources, relatedSkills, confidence }` |
| `GET` | `/api/curriculum` | List uploaded curriculum documents | **Returns**: Array of curriculum records |
| `GET` | `/api/curriculum/:id` | Fetch specific document details by ID | **Returns**: Curriculum document record |

---

## 🗄️ Database Schemas

### 1. Supabase PostgreSQL (`public.documents`)
- `id` (`uuid`, Primary Key)
- `title` (`text`)
- `file_url` (`text`)
- `status` (`text`: `UPLOADED` | `PARSED` | `ANALYZED` | `GRAPH_CREATED` | `GAP_ANALYZED`)
- `user_id` (`uuid`, nullable)
- `created_at` (`timestamp`)

### 2. Neo4j Knowledge Graph Nodes & Relationships
```
(:Course {id, name, semester, credits})
  ├─[:HAS_UNIT]──► (:Unit {title}) ──[:HAS_TOPIC]──► (:Topic {name})
  ├─[:DEVELOPS]──► (:Skill {name})
  ├─[:USES_TOOL]──► (:Tool {name})
  ├─[:REQUIRES]──► (:Prerequisite {name})
  └─[:REFERENCES]──► (:Book {title})

(:Domain {name})
  ├─[:HAS_SKILL]──► (:IndustrySkill {name})
  └─[:USES_TOOL]──► (:Tool {name})
```

---

## 📁 Project Structure

```text
TETRA031/
├── backend/
│   ├── data/
│   │   └── industry-skills.json        # Seed industry skill dataset
│   ├── src/
│   │   ├── config/
│   │   │   ├── gemini.ts               # Google Gemini client config
│   │   │   ├── neo4j.ts                # Neo4j driver connection
│   │   │   └── supabase.ts             # Supabase client config
│   │   ├── controllers/
│   │   │   ├── chat.controller.ts      # GraphRAG assistant controller
│   │   │   └── upload.controller.ts    # Syllabus upload controller
│   │   ├── routes/
│   │   │   ├── chat.routes.ts          # Chat API routes
│   │   │   ├── curriculum.routes.ts    # Curriculum CRUD routes
│   │   │   ├── health.routes.ts        # Health check route
│   │   │   ├── index.ts                # API Router aggregator
│   │   │   └── upload.routes.ts        # Upload API routes
│   │   ├── scripts/
│   │   │   └── importIndustry.ts       # Neo4j industry graph seed script
│   │   └── services/
│   │       ├── analysis.service.ts     # Gemini structured extraction
│   │       ├── embeddingService.ts     # Gemini vector embedding generator
│   │       ├── gapAnalysis.service.ts  # Neo4j gap analysis engine
│   │       ├── graph.service.ts        # Neo4j course graph builder
│   │       ├── industry.service.ts     # Industry dataset manager
│   │       ├── pdf.service.ts          # pdf-parse text extraction
│   │       ├── recommendationService.ts# GraphRAG LLM recommendation service
│   │       └── upload.service.ts       # Main pipeline orchestrator
├── src/                                # Frontend React Application
│   ├── components/
│   │   ├── analysis/
│   │   │   └── SkillPriorityTable.tsx  # Skill ranking table
│   │   ├── dashboard/
│   │   │   ├── Card.tsx                # Glassmorphism container component
│   │   │   └── Header.tsx              # Top navigation bar
│   │   ├── AnalysisResultsPage.tsx     # Comprehensive gap analysis dashboard
│   │   ├── AnalyzingCurriculumPage.tsx # Animated pipeline progress stepper
│   │   ├── Dashboard.tsx               # Main user dashboard container
│   │   ├── KnowledgeGraphExplorerPage.tsx # Interactive Neo4j graph explorer
│   │   ├── PastAnalysisPage.tsx        # Past analysis history & records
│   │   └── UploadCurriculumPage.tsx    # Drag-and-drop PDF upload form
│   ├── theme/
│   │   └── tokens.ts                   # Theme colors & design tokens
│   ├── types.ts                        # TypeScript UI definitions
│   └── App.tsx                         # Main app router component
├── server.ts                           # Express application entrypoint
├── package.json                        # Project manifest & scripts
├── tsconfig.json                       # TypeScript compiler configuration
└── vite.config.ts                      # Vite build configuration
```

---

## 🔄 User Workflow

```
1. Upload Curriculum PDF
   └─► Drag & drop PDF syllabus on Upload page.

2. Automated AI Processing
   └─► Watch real-time execution across Storage, PDF Parsing, Gemini Extraction, Neo4j Graphing, & Gap Analysis.

3. Interactive Gap Analysis
   └─► View Coverage percentage gauge, missing industry skills, and outdated technology flags.

4. Skill Priority & Recommendations
   └─► Review high-priority skills needed to align curriculum with current market hiring trends.

5. Knowledge Graph & GraphRAG Chat
   └─► Explore interactive Neo4j graph nodes or chat with the AI assistant for customized syllabus updates.
```

---

## 🚀 Deployment

### Deploying on Vercel / Render / Node host

1. **Build Production Bundle**:
   ```bash
   npm run build
   ```
   This creates minified static assets in `dist/` and a single-file Node server in `dist/server.cjs`.

2. **Environment Configuration**:
   Ensure all required variables (`GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`, `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`) are configured in your deployment platform's environment settings.

3. **Start Command**:
   ```bash
   npm start
   ```
   Runs `node dist/server.cjs` serving Express API endpoints and Vite static production assets on `PORT 3000`.

---

## 🛣️ Roadmap

- [x] Multi-stage PDF ingestion pipeline
- [x] Gemini structured curriculum parsing
- [x] Neo4j Course & Industry Knowledge Graph generation
- [x] Automated skill gap detection & coverage scoring
- [x] GraphRAG recommendation assistant (`/api/chat`)
- [ ] Server-side PDF export of revised modernized syllabi
- [ ] Side-by-side multi-syllabus comparative benchmark view
- [ ] Agentic automated lab assignment generator

---

## 👥 Contributors

Thanks to the contributors who built and maintained this project:

- **Shivam** ([@Shivam](https://github.com/))
- **Mayur Suthar** ([@MayurSuthar](https://github.com/))

---

## 📄 License

This project is licensed under the **Apache-2.0 License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Built for the AI Curriculum Gap Analysis & Modernization Challenge.
- Powered by **Google Gemini 3.6 Flash** for structured curriculum understanding.
- Graph analytics driven by **Neo4j Graph Database**.
- Cloud persistence enabled by **Supabase PostgreSQL & Storage**.
- Designed with **Lucide React**, **Framer Motion**, and **TailwindCSS**.
