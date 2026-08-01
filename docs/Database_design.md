# Database Design

# CurricuAlign AI

**Version:** 1.0

**Status:** Draft

---

# Table of Contents

1. Database Overview
2. Database Technologies
3. Overall Data Architecture
4. Database Design Principles
5. Database Responsibilities
6. Data Flow Across Databases
7. Database Summary

---

# 1. Database Overview

CurricuAlign AI employs a polyglot persistence architecture, leveraging multiple databases optimized for different data storage and retrieval requirements. Rather than relying on a single database for every operation, the platform uses specialized storage systems to maximize performance, scalability, and maintainability.

Each database has a clearly defined responsibility:

- **Supabase PostgreSQL** stores structured application and user data.
- **Neo4j** models curriculum knowledge as interconnected graphs.
- **ChromaDB** enables semantic similarity search using vector embeddings.

This architecture allows each component to perform the tasks it is best suited for while minimizing unnecessary complexity.

---

# 2. Database Technologies

| Database | Technology | Purpose |
|-----------|------------|---------|
| Relational Database | Supabase PostgreSQL | Structured application data |
| Authentication | Supabase Auth | User authentication and authorization |
| File Storage | Supabase Storage | Curriculum PDFs and generated reports |
| Graph Database | Neo4j Aura | Knowledge graph and relationship analysis |
| Vector Database | ChromaDB | Embedding storage and semantic search |

---

# Why Multiple Databases?

Different types of data require different storage models.

| Data Type | Best Storage |
|------------|--------------|
| User Accounts | PostgreSQL |
| Uploaded Curriculum | PostgreSQL + Storage |
| Curriculum Relationships | Neo4j |
| Semantic Embeddings | ChromaDB |
| Generated Reports | PostgreSQL + Storage |

Using specialized databases improves:

- Query performance
- AI retrieval accuracy
- Graph traversal efficiency
- System scalability
- Maintainability

---

# 3. Overall Data Architecture

```text
                    User

                     │

                     ▼

               FastAPI Backend

      ┌──────────────┼───────────────┐
      │              │               │
      ▼              ▼               ▼

Supabase        Neo4j Aura      ChromaDB

(PostgreSQL)   (Knowledge)      (Vectors)

      │              │               │

      └──────────────┼───────────────┘

                     ▼

             Recommendation Engine

                     │

                     ▼

              Next.js Dashboard
```

The FastAPI backend serves as the orchestration layer between all databases. Each request is routed only to the services required for that operation, reducing unnecessary database communication.

---

# 4. Database Design Principles

The database architecture follows several guiding principles.

## Single Responsibility

Each database stores only the information it is optimized to manage.

Examples:

- PostgreSQL stores structured records.
- Neo4j stores relationships.
- ChromaDB stores embeddings.

No database duplicates another database's responsibilities.

---

## Normalization

Structured application data follows relational normalization wherever practical to reduce redundancy and improve consistency.

Examples include:

- Users
- Curricula
- Analyses
- Reports

---

## Relationship-Centric Modeling

Complex curriculum relationships are stored within Neo4j instead of relational tables.

Examples:

- Course prerequisites
- Skill dependencies
- Topic relationships
- Learning outcome mappings

This enables efficient graph traversal and explainable reasoning.

---

## Semantic Retrieval

Natural language similarity is performed using vector embeddings stored in ChromaDB instead of SQL text matching.

This allows the system to retrieve semantically similar:

- Skills
- Courses
- Industry technologies
- Recommendations

---

## Data Integrity

All databases enforce validation rules to ensure consistency.

Examples include:

- UUID primary keys
- Foreign key relationships
- Required fields
- Unique constraints
- Type validation

---

## Scalability

Each storage component can scale independently without requiring changes to the rest of the architecture.

Examples:

- Increase PostgreSQL capacity
- Upgrade Neo4j instance
- Expand ChromaDB collections

---

# 5. Database Responsibilities

## Supabase PostgreSQL

Stores structured application data including:

- User profiles
- Universities
- Departments
- Curricula
- Analysis metadata
- Reports
- Recommendations
- Processing status
- Audit information

---

## Supabase Storage

Stores binary assets including:

- Uploaded curriculum PDFs
- Generated reports
- Supporting files

Metadata for these files is maintained within PostgreSQL.

---

## Neo4j

Stores graph-based educational knowledge.

Examples:

- Courses
- Topics
- Skills
- Learning outcomes
- Projects
- Assessments

Relationships include:

- Covers
- Requires
- Depends On
- Related To
- Uses

Neo4j enables graph traversal algorithms for prerequisite analysis and curriculum dependency mapping.

---

## ChromaDB

Stores vector embeddings generated from curriculum and industry data.

Primary collections include:

- Curriculum embeddings
- Industry skill embeddings
- Recommendation embeddings

ChromaDB enables semantic retrieval during:

- Gap analysis
- Similarity search
- Recommendation generation
- Context retrieval

---

# 6. Data Flow Across Databases

The following illustrates how information moves through the persistence layer.

```text
                Upload PDF

                     │

                     ▼

           Supabase Storage

                     │

                     ▼

              PDF Extraction

                     │

                     ▼

           Structured JSON Output

                     │

      ┌──────────────┼──────────────┐

      ▼              ▼              ▼

 PostgreSQL       Neo4j        ChromaDB

 Metadata        Graph         Embeddings

      │              │              │

      └──────────────┼──────────────┘

                     ▼

          Recommendation Engine

                     │

                     ▼

          Analysis & PDF Report
```

Each database contributes a different perspective:

- PostgreSQL provides structured metadata.
- Neo4j provides relationship intelligence.
- ChromaDB provides semantic intelligence.

Together, they enable explainable AI-driven curriculum analysis.

---

# 7. Database Summary

CurricuAlign AI adopts a polyglot persistence architecture that combines relational, graph, and vector databases to address different categories of educational data efficiently.

By assigning a single responsibility to each database, the platform achieves:

- High-performance structured queries
- Efficient relationship traversal
- Accurate semantic retrieval
- Better maintainability
- Scalability for future growth

Subsequent sections define the detailed schemas for PostgreSQL, Neo4j, and ChromaDB, including entities, relationships, indexes, validation rules, and example records.

---

# 8. PostgreSQL Schema Design

Supabase PostgreSQL serves as the primary relational database for CurricuAlign AI. It stores structured application data, user information, curriculum metadata, analysis records, recommendations, and report references.

The schema follows normalization principles to reduce redundancy while maintaining efficient query performance.

---

# 8.1 Database Schema Overview

The relational database consists of the following primary entities:

| Table | Purpose |
|---------|---------|
| users | User profiles and roles |
| universities | University information |
| departments | Department information |
| curricula | Uploaded curriculum metadata |
| analyses | AI analysis results |
| recommendations | Generated recommendations |
| reports | Generated report metadata |
| audit_logs | System activity logs |

---

# 8.2 Entity Relationship Overview

```text
Users

│
├──────────────< Curricula
│
│                     │
│                     ▼
│               Analyses
│                     │
│         ┌───────────┴────────────┐
│         ▼                        ▼
│ Recommendations             Reports
│
└──────────────< Audit Logs

Universities

│

└──────────────< Departments

                     │

                     └──────────< Curricula
```

---

# 8.3 Users Table

Stores authenticated user information.

| Column | Type | Constraints |
|---------|------|-------------|
| id | UUID | Primary Key |
| full_name | TEXT | NOT NULL |
| email | TEXT | UNIQUE |
| role | TEXT | NOT NULL |
| university_id | UUID | Foreign Key |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

## Supported Roles

- Professor
- Curriculum Designer
- Department Head
- Administrator

---

# 8.4 Universities Table

Stores participating universities.

| Column | Type |
|---------|------|
| id | UUID |
| name | TEXT |
| country | TEXT |
| website | TEXT |
| created_at | TIMESTAMP |

---

# 8.5 Departments Table

Each department belongs to one university.

| Column | Type |
|---------|------|
| id | UUID |
| university_id | UUID |
| name | TEXT |
| created_at | TIMESTAMP |

Relationship

```text
University

1

↓

Many

Departments
```

---

# 8.6 Curricula Table

Stores uploaded curriculum metadata.

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary Key |
| department_id | UUID | Foreign Key |
| uploaded_by | UUID | User ID |
| title | TEXT | Curriculum Title |
| academic_year | TEXT | Example: 2025-26 |
| semester | INTEGER | Semester Number |
| program | TEXT | Degree Program |
| pdf_url | TEXT | Storage URL |
| status | TEXT | Processing Status |
| uploaded_at | TIMESTAMP | Upload Time |

---

## Processing Status Values

- Uploaded
- Processing
- Completed
- Failed

---

# 8.7 Analyses Table

Stores analysis metadata generated by the AI pipeline.

| Column | Type |
|---------|------|
| id | UUID |
| curriculum_id | UUID |
| health_score | DECIMAL |
| alignment_score | DECIMAL |
| practical_score | DECIMAL |
| emerging_tech_score | DECIMAL |
| recommendation_count | INTEGER |
| processing_time | INTEGER |
| created_at | TIMESTAMP |

Scores are stored separately to enable dashboard analytics.

---

# 8.8 Recommendations Table

Stores every recommendation generated by the AI.

| Column | Type |
|---------|------|
| id | UUID |
| analysis_id | UUID |
| category | TEXT |
| title | TEXT |
| description | TEXT |
| priority | TEXT |
| confidence | DECIMAL |
| evidence | TEXT |
| status | TEXT |
| created_at | TIMESTAMP |

---

## Recommendation Categories

- New Course
- Skill Addition
- Technology Update
- Lab Improvement
- Assessment
- Project
- Industry Alignment

---

## Priority Levels

- Critical
- High
- Medium
- Low

---

# 8.9 Reports Table

Stores generated reports.

| Column | Type |
|---------|------|
| id | UUID |
| analysis_id | UUID |
| report_url | TEXT |
| generated_at | TIMESTAMP |
| version | INTEGER |

Actual PDF files are stored in Supabase Storage.

---

# 8.10 Audit Logs Table

Stores important application events.

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| action | TEXT |
| entity | TEXT |
| entity_id | UUID |
| timestamp | TIMESTAMP |

Examples:

- Login
- Upload
- Analysis
- Report Download

---

# 8.11 Primary Keys

Every table uses UUID Version 4 as the primary key.

Benefits include:

- Global uniqueness
- Secure identifiers
- Easy distributed deployment

---

# 8.12 Foreign Key Relationships

| Parent Table | Child Table |
|---------------|------------|
| universities | departments |
| universities | users |
| departments | curricula |
| users | curricula |
| curricula | analyses |
| analyses | recommendations |
| analyses | reports |
| users | audit_logs |

---

# 8.13 Indexing Strategy

Indexes improve query performance.

## Users

- email (Unique)

---

## Curricula

Indexes:

- uploaded_by
- department_id
- uploaded_at

---

## Analyses

Indexes:

- curriculum_id
- created_at

---

## Recommendations

Indexes:

- analysis_id
- priority
- category

---

## Reports

Indexes:

- analysis_id

---

# 8.14 Constraints

Examples include:

## Users

- Email must be unique.
- Role must be valid.

---

## Curricula

- Semester must be between 1 and 8.
- PDF URL cannot be null.

---

## Analysis

Scores must satisfy:

- 0 ≤ score ≤ 100

---

## Recommendations

Confidence must satisfy:

- 0 ≤ confidence ≤ 100

Priority must be one of:

- Critical
- High
- Medium
- Low

---

# 8.15 Example Records

## User

```json
{
  "id": "b2a8f3f7...",
  "full_name": "Dr. Priya Sharma",
  "email": "priya@example.edu",
  "role": "Professor"
}
```

---

## Curriculum

```json
{
  "title": "B.Tech Artificial Intelligence",
  "semester": 5,
  "program": "B.Tech",
  "status": "Completed"
}
```

---

## Analysis

```json
{
  "health_score": 84.5,
  "alignment_score": 88.3,
  "practical_score": 79.2
}
```

---

## Recommendation

```json
{
  "category": "Technology Update",
  "priority": "High",
  "confidence": 94.6,
  "title": "Introduce Docker Fundamentals"
}
```

---

# 8.16 Design Rationale

The relational schema is intentionally limited to structured application data.

Complex curriculum relationships are delegated to Neo4j, while semantic embeddings are stored separately in ChromaDB.

This separation ensures:

- Efficient SQL queries
- Minimal redundancy
- Easier maintenance
- Better scalability
- Clear ownership of data across storage systems

The next section describes the Neo4j knowledge graph schema, including node types, relationships, graph constraints, and traversal patterns used for curriculum intelligence.

---

# 9. Neo4j Knowledge Graph Design

Neo4j serves as the knowledge graph database for CurricuAlign AI. It models curriculum entities as interconnected nodes and relationships, allowing the platform to analyze dependencies, identify knowledge gaps, and generate explainable recommendations.

Unlike relational databases, which excel at storing structured records, Neo4j efficiently represents complex many-to-many relationships between educational concepts.

---

# 9.1 Knowledge Graph Overview

The curriculum is transformed into a graph where every educational entity becomes a node, and every dependency or association becomes a relationship.

```text
Course

│

├──────── covers ───────► Topic

│                          │

│                          ├──────── requires ─────► Skill

│                          │

│                          └──────── assessed_by ─► Assessment

│

├──────── has_project ────► Project

│

├──────── achieves ───────► Learning Outcome

│

└──────── belongs_to ─────► Semester
```

This graph enables multi-hop reasoning across curriculum components.

---

# 9.2 Node Types

The graph consists of the following node labels.

| Node Label | Description |
|------------|-------------|
| Course | Academic course |
| Topic | Individual teaching topic |
| Skill | Technical or soft skill |
| IndustrySkill | Industry-demanded skill |
| LearningOutcome | Course learning outcome |
| Assessment | Exam, assignment, quiz |
| Project | Practical project |
| Lab | Laboratory exercise |
| Semester | Academic semester |
| Department | Academic department |
| Program | Degree program |

---

# 9.3 Node Properties

## Course

| Property | Type |
|----------|------|
| id | UUID |
| code | String |
| name | String |
| credits | Integer |
| semester | Integer |
| description | Text |

---

## Topic

| Property | Type |
|----------|------|
| id | UUID |
| name | String |
| description | Text |

---

## Skill

| Property | Type |
|----------|------|
| id | UUID |
| name | String |
| category | String |
| difficulty | String |

Examples:

- Python
- Machine Learning
- Docker
- Git
- SQL

---

## IndustrySkill

| Property | Type |
|----------|------|
| id | UUID |
| name | String |
| source | String |
| demand_score | Float |

---

## LearningOutcome

| Property | Type |
|----------|------|
| id | UUID |
| description | Text |
| bloom_level | String |

---

## Project

| Property | Type |
|----------|------|
| id | UUID |
| title | String |
| complexity | String |

---

## Lab

| Property | Type |
|----------|------|
| id | UUID |
| title | String |
| duration | Integer |

---

## Assessment

| Property | Type |
|----------|------|
| id | UUID |
| type | String |
| weightage | Float |

---

# 9.4 Relationship Types

The following relationships define how educational entities interact.

| Relationship | Meaning |
|--------------|---------|
| COVERS | Course covers Topic |
| REQUIRES | Topic requires Skill |
| RELATED_TO | Skill related to another Skill |
| BELONGS_TO | Course belongs to Semester |
| HAS_PROJECT | Course contains Project |
| HAS_LAB | Course contains Lab |
| HAS_ASSESSMENT | Course contains Assessment |
| ACHIEVES | Course achieves Learning Outcome |
| MATCHES | Skill aligns with Industry Skill |
| DEPENDS_ON | Topic prerequisite relationship |

---

# 9.5 Graph Relationship Model

```text
Course

├── COVERS ─────────► Topic

│                      │

│                      ├── REQUIRES ─────► Skill

│                      │

│                      └── DEPENDS_ON ──► Topic

│

├── HAS_PROJECT ─────► Project

│

├── HAS_LAB ─────────► Lab

│

├── HAS_ASSESSMENT ─► Assessment

│

└── ACHIEVES ───────► Learning Outcome


Skill

│

└── MATCHES ─────────► Industry Skill
```

---

# 9.6 Example Graph

```text
Course

Machine Learning

│

├── covers

▼

Neural Networks

│

├── requires

▼

Python

│

├── related_to

▼

NumPy

│

├── related_to

▼

TensorFlow


Course

│

└── has_project

▼

Image Classification System
```

This graph clearly explains why a recommendation exists.

---

# 9.7 Graph Constraints

Neo4j enforces uniqueness on important nodes.

Examples:

| Node | Unique Property |
|------|-----------------|
| Course | code |
| Skill | name |
| Topic | name |
| Project | title |

These constraints prevent duplicate nodes during repeated analyses.

---

# 9.8 Graph Indexes

Indexes improve traversal performance.

Recommended indexes:

```text
Course(code)

Course(name)

Topic(name)

Skill(name)

IndustrySkill(name)

Project(title)
```

---

# 9.9 Graph Traversal Examples

## Find all skills taught by a course

```text
Course

↓

COVERS

↓

Topic

↓

REQUIRES

↓

Skill
```

---

## Find prerequisite chain

```text
Topic

↓

DEPENDS_ON

↓

Topic

↓

DEPENDS_ON

↓

Topic
```

---

## Find missing industry skills

```text
Course Skills

↓

MATCHES

↓

Industry Skills

↓

Missing Skills
```

---

## Generate project recommendations

```text
Course

↓

Skills

↓

Related Skills

↓

Existing Projects

↓

Suggested Project
```

---

# 9.10 Explainable AI

One of the primary goals of the knowledge graph is explainability.

Instead of simply recommending a new technology, the graph provides the reasoning path.

Example:

```text
Docker

↓

RELATED_TO

↓

Containers

↓

Required By

↓

Cloud Computing

↓

Industry Demand

↓

Recommendation:
Add Docker Fundamentals Lab
```

This makes every recommendation transparent and traceable.

---

# 9.11 Graph Update Strategy

Whenever a new curriculum is analyzed:

1. Existing nodes are checked.
2. Duplicate nodes are avoided.
3. New nodes are inserted.
4. Missing relationships are created.
5. Graph indexes are refreshed if required.

This incremental approach keeps the knowledge graph consistent while minimizing duplication.

---

# 9.12 Integration with PostgreSQL

Neo4j stores only graph-oriented educational knowledge.

The relational database stores metadata and references.

Example mapping:

| PostgreSQL | Neo4j |
|------------|--------|
| Curriculum ID | Course Node |
| Analysis ID | Graph Metadata |
| User ID | Not stored |
| Recommendation ID | Generated externally |

The graph database never replaces the relational database; instead, it complements it.

---

# 9.13 Design Rationale

Neo4j was selected because curriculum structures naturally form graphs rather than tables.

Benefits include:

- Fast prerequisite traversal
- Efficient dependency analysis
- Explainable recommendations
- Skill relationship discovery
- Knowledge visualization
- Extensible educational ontology

The knowledge graph forms the reasoning layer of CurricuAlign AI, enabling the platform to move beyond keyword matching and perform relationship-aware curriculum intelligence.

---

# 10. ChromaDB Vector Database Design

ChromaDB serves as the semantic retrieval layer for CurricuAlign AI. It stores vector embeddings generated from curriculum content, industry skills, recommendations, and supporting educational resources.

Unlike traditional keyword search, vector search retrieves information based on semantic similarity, allowing the platform to identify conceptually related content even when different terminology is used.

---

# 10.1 Vector Database Overview

Every important textual artifact is converted into an embedding using a sentence embedding model.

Examples include:

- Curriculum descriptions
- Course outcomes
- Topics
- Skills
- Projects
- Labs
- Industry job requirements
- AI-generated recommendations

These embeddings are stored in ChromaDB and queried using cosine similarity.

---

# 10.2 Semantic Search Workflow

```text
               Curriculum PDF

                      │

                      ▼

               Text Extraction

                      │

                      ▼

             Text Cleaning

                      │

                      ▼

             Text Chunking

                      │

                      ▼

            Embedding Generation

                      │

                      ▼

                ChromaDB

                      │

        Similarity Search Query

                      │

                      ▼

          Relevant Curriculum

          Relevant Skills

          Relevant Jobs

          Relevant Recommendations
```

---

# 10.3 Embedding Model

For the MVP, a lightweight embedding model will be used to generate dense vector representations.

Recommended options include:

| Model | Purpose |
|---------|---------|
| BAAI/bge-small-en-v1.5 | General semantic embeddings |
| BAAI/bge-base-en-v1.5 | Higher accuracy |
| multilingual-e5-small | Multilingual support |

Embedding generation occurs after text extraction and before recommendation generation.

---

# 10.4 Collections

The vector database is organized into logical collections.

| Collection | Purpose |
|------------|---------|
| curriculum_embeddings | Curriculum chunks |
| industry_embeddings | Industry skills and technologies |
| recommendation_embeddings | Generated recommendations |
| project_embeddings | Practical project ideas |
| lab_embeddings | Laboratory activities |

Each collection stores vectors independently to improve retrieval performance.

---

# 10.5 Curriculum Embeddings

Stores semantic representations of curriculum content.

Each document chunk includes:

- Course descriptions
- Module descriptions
- Learning outcomes
- Topics
- Assessment descriptions

Example metadata:

```json
{
  "curriculum_id": "uuid",
  "course_code": "AI501",
  "semester": 5,
  "chunk_number": 12,
  "type": "topic"
}
```

---

# 10.6 Industry Embeddings

Stores embeddings extracted from:

- Industry skill datasets
- Technology trends
- Job descriptions
- Certification frameworks

Example metadata:

```json
{
  "skill": "Docker",
  "category": "DevOps",
  "source": "Industry Dataset",
  "demand_score": 92
}
```

These vectors are used during curriculum alignment.

---

# 10.7 Recommendation Embeddings

Stores previously generated recommendations.

Benefits include:

- Similar recommendation retrieval
- Recommendation deduplication
- Faster report generation
- Improved consistency

Example metadata:

```json
{
  "analysis_id": "uuid",
  "category": "Technology Update",
  "priority": "High"
}
```

---

# 10.8 Project Embeddings

Stores project descriptions and implementation summaries.

Examples:

- Image Classification
- Chatbot
- Smart Attendance System
- IoT Monitoring

Allows retrieval of projects matching curriculum skills.

---

# 10.9 Lab Embeddings

Stores laboratory activities.

Examples:

- Docker Installation Lab
- REST API Development
- Git Version Control
- Kubernetes Deployment

Supports practical curriculum recommendations.

---

# 10.10 Chunking Strategy

Large curriculum documents are divided into manageable chunks before embedding generation.

Recommended configuration:

| Parameter | Value |
|-----------|-------|
| Chunk Size | 500–800 words |
| Chunk Overlap | 100 words |
| Strategy | Recursive text splitting |

Chunking improves retrieval precision while preserving context.

---

# 10.11 Metadata Schema

Every vector stores metadata alongside its embedding.

Common metadata fields include:

| Field | Description |
|--------|-------------|
| id | Unique identifier |
| curriculum_id | Parent curriculum |
| course | Course name |
| semester | Semester |
| chunk_number | Chunk index |
| type | Topic, Skill, Project, Lab |
| source | Curriculum or Industry |
| created_at | Timestamp |

Metadata enables filtering before similarity search.

---

# 10.12 Similarity Search Process

When analyzing a curriculum:

```text
Curriculum Chunk

↓

Generate Embedding

↓

Search ChromaDB

↓

Top-K Similar Results

↓

Return Context

↓

Recommendation Engine
```

The retrieved context provides supporting evidence for AI-generated recommendations.

---

# 10.13 Retrieval Strategy

The recommendation engine combines multiple retrieval sources.

```text
Curriculum

↓

Semantic Search

↓

Industry Skills

↓

Knowledge Graph

↓

Recommendation Engine

↓

Final Recommendations
```

This hybrid retrieval approach improves relevance by combining semantic similarity with graph-based reasoning.

---

# 10.14 Distance Metric

Cosine similarity is used to compare vector embeddings.

Benefits:

- Scale independent
- Efficient computation
- Widely adopted for sentence embeddings
- High semantic retrieval accuracy

Higher cosine similarity indicates stronger conceptual alignment.

---

# 10.15 Vector Lifecycle

The lifecycle of a vector follows these stages:

```text
Extract Text

↓

Chunk Text

↓

Generate Embedding

↓

Store Vector

↓

Semantic Search

↓

Recommendation

↓

Archive or Delete (if curriculum removed)
```

Vectors are regenerated whenever a curriculum is reprocessed.

---

# 10.16 Indexing Strategy

To optimize retrieval performance:

- Separate collections by document type
- Filter using metadata before similarity search
- Limit search to Top-K nearest neighbors
- Cache frequently queried embeddings when appropriate

This reduces search latency and improves scalability.

---

# 10.17 Integration with Other Databases

ChromaDB works alongside PostgreSQL and Neo4j.

| Database | Responsibility |
|----------|----------------|
| PostgreSQL | Structured metadata |
| Neo4j | Relationship intelligence |
| ChromaDB | Semantic similarity |

Example workflow:

```text
Curriculum

↓

PostgreSQL

↓

Retrieve Metadata

↓

Neo4j

↓

Relationship Analysis

↓

ChromaDB

↓

Semantic Context

↓

Recommendation Engine
```

---

# 10.18 Design Rationale

ChromaDB was selected because it provides a lightweight, open-source vector database suitable for AI-powered semantic retrieval.

Key benefits include:

- Fast similarity search
- Metadata filtering
- Simple deployment
- Tight integration with Python
- Efficient storage of dense embeddings

Together with Neo4j and PostgreSQL, ChromaDB forms the semantic intelligence layer of CurricuAlign AI, enabling the platform to understand curriculum content beyond exact keyword matching and generate context-aware recommendations.

---

# 11. Data Synchronization Strategy

CurricuAlign AI maintains consistency across PostgreSQL, Neo4j, and ChromaDB by treating PostgreSQL as the source of truth for application metadata, while Neo4j and ChromaDB act as derived data stores.

## Synchronization Flow

```text
Upload PDF

↓

Extract Curriculum

↓

Store Metadata (PostgreSQL)

↓

Build Knowledge Graph (Neo4j)

↓

Generate Embeddings (ChromaDB)

↓

Generate Recommendations

↓

Store Analysis Results (PostgreSQL)
```

Only metadata is synchronized between databases. Actual graph structures and embeddings remain isolated within their respective storage systems.

---

## Synchronization Rules

| Database | Responsibility |
|----------|----------------|
| PostgreSQL | Primary metadata store |
| Neo4j | Graph representation |
| ChromaDB | Vector representations |

Whenever a curriculum is reprocessed:

- PostgreSQL metadata is updated.
- Existing graph nodes are merged or updated.
- Existing embeddings are replaced.
- Previous recommendations are archived.

---

# 12. Data Validation Rules

Every stage of the pipeline validates incoming data before persistence.

## PDF Validation

Requirements:

- PDF format only
- Maximum size: 25 MB
- Readable text layer preferred
- Virus scan before processing
- Duplicate uploads detected using file hash

---

## Curriculum Validation

Required fields:

- Program
- Semester
- Course title

Optional fields:

- Credits
- Learning outcomes
- Assessment details

Invalid or incomplete records are flagged for review.

---

## Graph Validation

Before inserting nodes:

- Check for duplicate nodes.
- Normalize names.
- Remove whitespace.
- Standardize capitalization.

Example:

```text
python

↓

Python

↓

Single Skill Node
```

---

## Embedding Validation

Before storing vectors:

- Text must not be empty.
- Chunk size must remain within configured limits.
- Metadata must contain required identifiers.
- Embedding generation must complete successfully.

---

# 13. Backup & Recovery

The platform should support recovery of both structured and AI-generated data.

## PostgreSQL

Backup strategy:

- Daily automated backups
- Point-in-time recovery (where supported)
- Versioned database migrations

---

## Supabase Storage

Files:

- Curriculum PDFs
- Generated reports

Recovery:

- Redundant cloud storage
- Object versioning (future enhancement)

---

## Neo4j

Backup frequency:

- Daily snapshots
- Export graph periodically

Recovery:

- Restore graph snapshot
- Rebuild graph from PostgreSQL if necessary

---

## ChromaDB

Embeddings can be regenerated.

Therefore:

- Periodic backups are recommended.
- If lost, vectors are recreated by rerunning the embedding pipeline.

---

# 14. Security & Access Control

Security is enforced across all persistence layers.

---

## Authentication

Handled by Supabase Auth.

Supported mechanisms:

- Email & Password
- OAuth providers (future)
- JWT tokens

---

## Authorization

Role-based access control (RBAC).

| Role | Permissions |
|------|-------------|
| Professor | Upload and analyze curricula |
| Curriculum Designer | Manage recommendations |
| Department Head | View department reports |
| Administrator | Full access |

---

## Database Security

PostgreSQL

- Row-Level Security (RLS)
- Foreign key enforcement
- Parameterized queries

Neo4j

- Authenticated connections
- Restricted write access

ChromaDB

- Backend-only access
- Not exposed publicly

---

## Secrets Management

Sensitive values are stored using environment variables.

Examples:

```env
SUPABASE_SERVICE_ROLE_KEY
GEMINI_API_KEY
NEO4J_PASSWORD
DATABASE_URL
```

No secrets are committed to source control.

---

# 15. Performance Optimization

Several optimization strategies improve responsiveness.

---

## PostgreSQL

- Indexed foreign keys
- Connection pooling
- Efficient joins
- Pagination for dashboard queries

---

## Neo4j

- Indexed node properties
- Merge operations to avoid duplicates
- Efficient relationship traversal

---

## ChromaDB

- Metadata filtering
- Top-K similarity search
- Collection separation
- Cached embedding model

---

## Backend

- Asynchronous processing
- Background tasks
- Lazy loading
- Batch insert operations

---

# 16. End-to-End Data Flow

The following illustrates how all databases cooperate during curriculum analysis.

```text
User

↓

Upload Curriculum PDF

↓

Supabase Storage

↓

PyMuPDF

↓

Text Cleaning

↓

Chunking

↓

Embedding Model

↓

Gemini Extraction

↓

Structured JSON

↓

──────────────────────────────────────

↓

PostgreSQL

Store Metadata

↓

Neo4j

Create Knowledge Graph

↓

ChromaDB

Store Embeddings

↓

Recommendation Engine

↓

Generate Report

↓

Supabase Storage

↓

Dashboard
```

---

# 17. Database Design Summary

CurricuAlign AI adopts a polyglot persistence architecture that combines relational, graph, and vector databases to support intelligent curriculum analysis.

Each database has a dedicated responsibility:

| Database | Responsibility |
|----------|----------------|
| PostgreSQL | Structured application data |
| Neo4j | Educational knowledge graph |
| ChromaDB | Semantic embeddings |
| Supabase Storage | PDFs and generated reports |

This separation provides several advantages:

- High-performance structured queries
- Explainable graph traversal
- Semantic curriculum comparison
- Scalable architecture
- Reduced data redundancy
- Easier maintenance

The database layer forms the foundation of the application, enabling the AI pipeline to generate transparent, evidence-based curriculum recommendations while remaining extensible for future enhancements.
