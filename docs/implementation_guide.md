# Implementation Guide

# CurricuAlign AI

**Version:** 1.0

**Status:** Draft

---

# Table of Contents

1. Introduction
2. Technology Stack
3. Repository Structure
4. Frontend Architecture
5. Backend Architecture
6. AI Module Architecture
7. Development Environment
8. Implementation Summary

---

# 1. Introduction

This document describes the implementation details of CurricuAlign AI. It explains how the project is organized, how different modules interact, and how developers can implement and maintain the system efficiently.

The implementation follows a modular architecture with clear separation between the frontend, backend, AI processing, and database layers.

---

# Development Principles

The project follows these principles:

- Modular design
- Separation of concerns
- Reusable components
- Scalable architecture
- Secure by default
- AI-first workflow
- RESTful communication

---

# 2. Technology Stack

The implementation uses modern open-source technologies selected for scalability, developer productivity, and AI integration.

| Layer | Technology |
|--------|------------|
| Frontend | Next.js 15 |
| Language | TypeScript |
| UI | Tailwind CSS |
| Components | shadcn/ui |
| Backend | FastAPI |
| Language | Python 3.12 |
| Authentication | Supabase Auth |
| Database | PostgreSQL |
| Graph Database | Neo4j |
| Vector Database | ChromaDB |
| AI Model | Gemini |
| File Storage | Supabase Storage |
| Deployment | Google Cloud Run |
| Containerization | Docker |
| CI/CD | GitHub Actions |

---

# Why This Stack?

## Next.js

Provides:

- Server Components
- Fast rendering
- Type safety
- Excellent developer experience

---

## FastAPI

Chosen because it offers:

- High performance
- Automatic OpenAPI documentation
- Async support
- Excellent Python AI ecosystem

---

## Gemini

Used for:

- Curriculum understanding
- Information extraction
- Recommendation generation
- Explainability

---

## Neo4j

Represents educational relationships.

Ideal for:

- Prerequisites
- Skill graphs
- Course dependencies

---

## ChromaDB

Stores embeddings for:

- Semantic search
- RAG
- Similarity matching

---

# 3. Repository Structure

The project follows a monorepo structure.

```text
curricualign-ai/

├── frontend/
├── backend/
├── ai/
├── database/
├── infrastructure/
├── docs/
├── docker/
├── scripts/
├── tests/
├── .github/
└── README.md
```

---

## Frontend

```text
frontend/

app/

components/

hooks/

lib/

services/

types/

public/

styles/
```

---

## Backend

```text
backend/

app/

api/

core/

models/

schemas/

services/

repositories/

workers/

utils/
```

---

## AI Module

```text
ai/

prompts/

embeddings/

knowledge_graph/

rag/

recommendation/

evaluation/
```

---

## Database

```text
database/

migrations/

seed/

schema/

queries/
```

---

## Infrastructure

```text
infrastructure/

docker/

terraform/

cloudrun/

monitoring/
```

---

# 4. Frontend Architecture

The frontend is built using Next.js App Router.

Architecture:

```text
Pages

↓

Layouts

↓

Components

↓

Services

↓

API Client

↓

Backend
```

---

## Folder Organization

```text
app/

dashboard/

analysis/

upload/

reports/

settings/
```

---

## Components

Components are categorized as:

- UI Components
- Feature Components
- Layout Components
- Charts
- Forms

---

## State Management

Global state includes:

- User authentication
- Uploaded curriculum
- Analysis status
- Dashboard metrics

Suggested tools:

- React Context
- Zustand

---

## API Layer

All backend communication passes through a centralized API client.

Example:

```text
Dashboard

↓

API Service

↓

FastAPI
```

---

# 5. Backend Architecture

The backend follows Clean Architecture principles.

```text
API

↓

Service

↓

Repository

↓

Database
```

---

## API Layer

Responsibilities:

- Request validation
- Authentication
- Response formatting

---

## Service Layer

Contains business logic:

- Curriculum Service
- Analysis Service
- Recommendation Service
- Report Service

---

## Repository Layer

Responsible for:

- PostgreSQL queries
- Neo4j queries
- ChromaDB operations
- Storage operations

---

## Background Workers

Long-running operations execute asynchronously.

Examples:

- AI analysis
- Embedding generation
- Report generation

---

# 6. AI Module Architecture

The AI module is independent of the REST API.

Architecture:

```text
Upload

↓

Document Processor

↓

Gemini

↓

Embeddings

↓

Neo4j

↓

RAG

↓

Recommendations
```

---

## Modules

### Document Processor

Responsible for:

- PDF extraction
- Cleaning
- Chunking

---

### Embedding Module

Generates vector embeddings.

Stores them in ChromaDB.

---

### Knowledge Graph Module

Creates nodes and relationships inside Neo4j.

---

### Recommendation Module

Uses:

- RAG
- Gemini
- Rule validation

to generate recommendations.

---

# 7. Development Environment

Minimum requirements:

- Python 3.12
- Node.js 22+
- Docker
- Git
- VS Code

---

## Backend Setup

```bash
python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt
```

---

## Frontend Setup

```bash
npm install

npm run dev
```

---

## Start Backend

```bash
uvicorn app.main:app --reload
```

---

## Docker

Start all services.

```bash
docker compose up
```

---

# 8. Implementation Summary

The implementation is divided into independent modules that communicate through well-defined APIs.

Key characteristics include:

- Modular folder structure
- Clean Architecture backend
- Component-based frontend
- Dedicated AI processing module
- Independent data layer
- Containerized deployment

Subsequent sections describe authentication, workflow implementation, deployment, testing, monitoring, and CI/CD.

---

# 9. Authentication Workflow

Authentication is managed using Supabase Auth with JWT-based authorization.

## Authentication Flow

```text
User

↓

Login Page

↓

Supabase Auth

↓

JWT Token

↓

Frontend Storage

↓

Authorization Header

↓

FastAPI

↓

Protected API
```

---

## Login Process

1. User enters email and password.
2. Credentials are sent to Supabase Authentication.
3. Supabase validates the user.
4. Access and refresh tokens are returned.
5. Frontend securely stores the tokens.
6. All subsequent API requests include the access token.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Route Protection

Protected pages include:

- Dashboard
- Upload Curriculum
- Analysis
- Reports
- Settings

Unauthenticated users are redirected to the login page.

---

# 10. File Processing Workflow

Curriculum analysis begins when a PDF is uploaded.

---

## Upload Workflow

```text
User

↓

Select PDF

↓

Frontend Validation

↓

POST /curricula

↓

FastAPI

↓

PDF Validation

↓

Supabase Storage

↓

Metadata Database

↓

Analysis Queue
```

---

## File Validation

Validation checks include:

- PDF format
- File size limit
- Duplicate detection
- Required metadata
- Readability

---

## Storage Strategy

| Component | Storage |
|-----------|----------|
| PDF | Supabase Storage |
| Metadata | PostgreSQL |
| Extracted JSON | PostgreSQL |
| Embeddings | ChromaDB |
| Graph Data | Neo4j |

---

# 11. AI Analysis Workflow

Once uploaded, the curriculum is processed through the AI pipeline.

---

## Workflow

```text
Upload

↓

Extract Text

↓

Clean Text

↓

Chunk Document

↓

Gemini Extraction

↓

Generate Embeddings

↓

Store ChromaDB

↓

Build Neo4j Graph

↓

Gap Analysis

↓

Recommendations

↓

Store Results
```

---

## Processing Stages

### Stage 1

PDF Extraction

↓

Clean text

---

### Stage 2

Gemini

↓

Structured JSON

---

### Stage 3

Embedding Generation

↓

ChromaDB

---

### Stage 4

Knowledge Graph

↓

Neo4j

---

### Stage 5

Recommendation Engine

↓

Gemini + RAG

---

## Background Processing

Long-running tasks execute asynchronously.

Status values:

```text
Queued

↓

Processing

↓

Completed

↓

Failed
```

---

# 12. Database Interaction Workflow

Each database has a dedicated responsibility.

---

## PostgreSQL

Stores:

- Users
- Curricula
- Analysis metadata
- Reports
- Recommendations

---

## Neo4j

Stores:

- Skills
- Courses
- Topics
- Technologies
- Relationships

---

## ChromaDB

Stores:

- Curriculum embeddings
- Industry embeddings
- Semantic search vectors

---

## Database Flow

```text
Gemini

↓

Structured Data

↓

PostgreSQL

↓

Neo4j

↓

Embeddings

↓

ChromaDB
```

---

# 13. Recommendation Workflow

Recommendations combine multiple AI components.

---

## Workflow

```text
Curriculum

↓

Knowledge Graph

↓

Semantic Retrieval

↓

Industry Dataset

↓

Prompt Builder

↓

Gemini

↓

Recommendations
```

---

## Recommendation Validation

Every recommendation is verified using:

- Graph relationships
- Retrieved context
- Rule engine
- Confidence threshold

Only validated recommendations are stored.

---

# 14. Report Generation Workflow

Reports summarize the complete analysis.

---

## Workflow

```text
Analysis

↓

Scores

↓

Recommendations

↓

Evidence

↓

Template Engine

↓

PDF Generator

↓

Supabase Storage

↓

Download Link
```

---

## Generated Reports

Each report contains:

- Curriculum Overview
- Health Score
- Alignment Score
- Gap Analysis
- Recommendations
- Supporting Evidence
- Charts

---

# 15. Dashboard Workflow

The dashboard aggregates analytics from multiple sources.

---

## Dashboard Flow

```text
User

↓

Dashboard

↓

FastAPI

↓

PostgreSQL

Neo4j

↓

Analytics Service

↓

Charts
```

---

## Dashboard Widgets

Examples:

- Total Curricula
- Average Health Score
- Department Comparison
- Recommendation Trends
- Technology Coverage
- Analysis Progress

---

# 16. Background Workers

Resource-intensive operations execute independently from API requests.

---

## Worker Responsibilities

- PDF processing
- Embedding generation
- Knowledge graph updates
- AI analysis
- Report generation
- Email notifications (future)

---

## Worker Flow

```text
API Request

↓

Job Queue

↓

Worker

↓

AI Processing

↓

Database

↓

Status Update
```

---

# 17. Caching Strategy

Caching minimizes repeated computation and improves response times.

---

## Cached Data

- Embeddings
- Prompt templates
- Industry datasets
- Frequently accessed graphs
- Dashboard summaries

---

## Cache Flow

```text
Request

↓

Cache

↓

Hit

↓

Return

OR

↓

Miss

↓

Database

↓

Update Cache
```

---

## Benefits

Caching provides:

- Faster API responses
- Reduced AI API calls
- Lower infrastructure costs
- Improved scalability

---

# Part 2 Summary

This section describes how the primary application workflows are implemented, from user authentication and curriculum upload to AI analysis, recommendation generation, reporting, and dashboard visualization.

The implementation separates responsibilities across dedicated services, databases, and background workers, enabling scalable and maintainable development while ensuring efficient AI-powered curriculum analysis.

---

# 18. Environment Variables

The application uses environment variables to securely manage configuration and secrets.

---

## Backend Variables

```env
# Gemini
GEMINI_API_KEY=

# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# PostgreSQL
DATABASE_URL=

# Neo4j
NEO4J_URI=
NEO4J_USERNAME=
NEO4J_PASSWORD=

# ChromaDB
CHROMA_HOST=
CHROMA_PORT=

# JWT
JWT_SECRET=

# Storage
SUPABASE_STORAGE_BUCKET=
```

---

## Frontend Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=
```

---

## Best Practices

- Never commit `.env` files.
- Use separate configurations for development, staging, and production.
- Rotate API keys periodically.
- Store production secrets using a cloud secret manager.

---

# 19. Docker & Containerization

Docker provides a consistent runtime environment across development and production.

---

## Container Architecture

```text
Frontend (Next.js)

↓

Backend (FastAPI)

↓

Neo4j

↓

ChromaDB

↓

PostgreSQL

↓

Supabase (Managed)
```

---

## Docker Compose Services

```text
frontend

backend

neo4j

chromadb
```

---

## Development Commands

Build images:

```bash
docker compose build
```

Start services:

```bash
docker compose up
```

Run in background:

```bash
docker compose up -d
```

Stop services:

```bash
docker compose down
```

---

# 20. Deployment Architecture

The production environment is deployed on Google Cloud.

---

## Deployment Workflow

```text
GitHub

↓

GitHub Actions

↓

Docker Build

↓

Container Registry

↓

Cloud Run

↓

Production
```

---

## Production Components

| Component | Deployment |
|------------|------------|
| Frontend | Cloud Run |
| Backend | Cloud Run |
| PostgreSQL | Supabase |
| Storage | Supabase Storage |
| Neo4j | AuraDB / Self-hosted |
| ChromaDB | Dedicated Container |

---

## Deployment Steps

1. Push changes to GitHub.
2. CI pipeline builds Docker images.
3. Automated tests are executed.
4. Images are pushed to the container registry.
5. Cloud Run deploys the latest version.
6. Health checks verify deployment.

---

# 21. Logging & Monitoring

Logging enables troubleshooting and system monitoring.

---

## Application Logs

Each request logs:

- Timestamp
- User ID
- Endpoint
- Response time
- Status code

---

## AI Logs

AI-specific logs include:

- Prompt ID
- Processing duration
- Token usage
- Confidence score
- Errors

---

## Monitoring Metrics

Track:

- API latency
- CPU usage
- Memory usage
- AI response time
- Error rate
- Database performance

---

# 22. Security Considerations

Security is integrated into every layer of the application.

---

## Authentication

- JWT tokens
- Secure password hashing
- Refresh tokens
- Session expiration

---

## API Security

- HTTPS only
- Input validation
- Rate limiting
- CORS configuration
- Request size limits

---

## Database Security

- Parameterized queries
- Principle of least privilege
- Encrypted connections
- Regular backups

---

## File Security

Uploaded files are validated for:

- MIME type
- Extension
- Size
- Malicious content

---

## AI Security

The system protects against:

- Prompt injection
- Invalid JSON responses
- Excessive token usage
- Unsafe AI outputs

---

# 23. Performance Optimization

Performance is improved across all application layers.

---

## Frontend

- Server Components
- Image optimization
- Code splitting
- Lazy loading
- Route caching

---

## Backend

- Async endpoints
- Connection pooling
- Background workers
- Response compression

---

## Database

- Indexed queries
- Optimized joins
- Pagination
- Query caching

---

## AI

- Chunked processing
- Embedding cache
- Parallel execution
- Batched requests

---

# 24. Testing Strategy

The project follows a multi-level testing approach.

---

## Unit Testing

Tests:

- Utility functions
- Services
- AI helpers
- Validation logic

---

## Integration Testing

Verify:

- API endpoints
- Database operations
- Authentication
- AI pipeline integration

---

## End-to-End Testing

Simulate complete user workflows:

```text
Login

↓

Upload PDF

↓

Run Analysis

↓

Generate Report

↓

Download Report
```

---

## Performance Testing

Measure:

- Response time
- Concurrent users
- Memory usage
- Throughput

---

# 25. CI/CD Pipeline

Continuous Integration ensures code quality before deployment.

---

## Pipeline

```text
Developer

↓

GitHub Push

↓

GitHub Actions

↓

Lint

↓

Tests

↓

Build Docker Image

↓

Deploy

↓

Health Check
```

---

## CI Steps

- Install dependencies
- Run linters
- Execute tests
- Build application
- Build Docker image
- Deploy to Cloud Run

---

# 26. Development Workflow

The team follows a Git-based workflow.

---

## Branch Strategy

```text
main

│

├── develop

├── feature/auth

├── feature/upload

├── feature/analysis

└── feature/dashboard
```

---

## Development Process

1. Create feature branch.
2. Implement functionality.
3. Commit changes.
4. Open Pull Request.
5. Review code.
6. Merge into `develop`.
7. Release to `main`.

---

## Coding Standards

- TypeScript strict mode
- Python type hints
- Black formatting
- ESLint
- Meaningful commit messages
- Comprehensive documentation

---

# 27. Future Improvements

Potential enhancements include:

- Multi-language curriculum support
- OCR for scanned PDFs
- Real-time collaborative editing
- AI-powered curriculum generation
- LMS integrations
- Faculty recommendation engine
- Predictive curriculum analytics
- Mobile application
- Multi-tenant architecture

---

# 28. Implementation Guide Summary

This implementation guide provides a complete blueprint for developing, deploying, and maintaining CurricuAlign AI.

The implementation combines modern web technologies, scalable cloud infrastructure, and advanced AI techniques within a modular architecture that is easy to extend and maintain.

The complete implementation workflow is illustrated below:

```text
Repository Setup

↓

Frontend Development

↓

Backend APIs

↓

Authentication

↓

Database Integration

↓

AI Pipeline

↓

Knowledge Graph

↓

Recommendation Engine

↓

Dashboard

↓

Testing

↓

Docker

↓

CI/CD

↓

Google Cloud Deployment

↓

Production Monitoring
```

By following this guide, development teams can build a scalable, secure, and production-ready curriculum analysis platform that aligns academic programs with evolving industry requirements while maintaining high standards of code quality, performance, and reliability.

---

## Implementation Checklist

| Phase | Status |
|--------|:------:|
| Repository Setup | ✅ |
| Frontend Development | ✅ |
| Backend Development | ✅ |
| Database Integration | ✅ |
| AI Pipeline | ✅ |
| Authentication | ✅ |
| Report Generation | ✅ |
| Testing | ✅ |
| Dockerization | ✅ |
| CI/CD Pipeline | ✅ |
| Cloud Deployment | ✅ |
| Monitoring & Logging | ✅ |
| Production Ready | ✅ |

