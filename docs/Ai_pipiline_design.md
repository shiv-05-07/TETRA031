# AI Pipeline Design

# CurricuAlign AI

**Version:** 1.0

**Status:** Draft

---

# Table of Contents

1. AI Pipeline Overview
2. AI Objectives
3. Pipeline Architecture
4. End-to-End Workflow
5. Stage 1: Curriculum Ingestion
6. Stage 2: Document Processing
7. Stage 3: Structured Information Extraction
8. AI Pipeline Summary

---

# 1. AI Pipeline Overview

The AI Pipeline is the core intelligence engine of CurricuAlign AI. It transforms an uploaded curriculum PDF into structured educational knowledge, semantic embeddings, graph relationships, and actionable curriculum recommendations.

Unlike traditional document analysis systems, CurricuAlign AI combines:

- Large Language Models (Gemini)
- Semantic Embeddings
- Knowledge Graph Reasoning
- Retrieval-Augmented Generation (RAG)
- Rule-Based Validation

This hybrid architecture enables explainable, evidence-based curriculum recommendations.

---

# AI Goals

The pipeline aims to:

- Extract structured curriculum information from PDFs.
- Understand relationships between courses, topics, and skills.
- Compare curricula with current industry expectations.
- Detect knowledge gaps.
- Generate explainable recommendations.
- Produce downloadable reports.

---

# 2. AI Objectives

The AI engine is designed around six objectives.

| Objective | Description |
|-----------|-------------|
| Information Extraction | Convert PDFs into structured JSON |
| Knowledge Representation | Build educational knowledge graphs |
| Semantic Understanding | Generate embeddings for similarity search |
| Industry Alignment | Compare curricula with industry skills |
| Recommendation Generation | Suggest curriculum improvements |
| Explainability | Provide evidence for every recommendation |

---

# 3. Pipeline Architecture

```text
Curriculum PDF

↓

Document Processing

↓

Gemini Extraction

↓

Structured JSON

↓

───────────────

↓

Neo4j

Knowledge Graph

↓

ChromaDB

Embeddings

↓

Industry Dataset

↓

Recommendation Engine

↓

Gemini Reasoning

↓

Report Generator
```

The pipeline combines deterministic processing and AI reasoning to ensure consistent outputs.

---

# 4. End-to-End Workflow

```text
Upload PDF

↓

Extract Text

↓

Clean Text

↓

Split into Chunks

↓

Generate Embeddings

↓

Extract Structured Information

↓

Store Metadata

↓

Build Knowledge Graph

↓

Retrieve Similar Industry Skills

↓

Perform Gap Analysis

↓

Generate Recommendations

↓

Generate Report

↓

Dashboard
```

Each stage produces artifacts that are reused by downstream components.

---

# 5. Stage 1 – Curriculum Ingestion

The ingestion stage validates and stores uploaded curriculum documents.

## Input

- Curriculum PDF
- Program metadata
- Department
- Semester
- Academic year

---

## Validation

The uploaded document is checked for:

- PDF format
- Maximum file size
- Duplicate uploads
- Readability

---

## Storage

The original document is stored in Supabase Storage while metadata is stored in PostgreSQL.

Output:

```text
PDF

↓

Storage

↓

Metadata
```

---

# 6. Stage 2 – Document Processing

After validation, the curriculum document is processed into clean textual content.

---

## Text Extraction

The backend extracts text using:

- PyMuPDF (primary)
- OCR (future enhancement for scanned PDFs)

---

## Cleaning

The extracted text is normalized by:

- Removing headers and footers
- Eliminating page numbers
- Removing duplicate whitespace
- Preserving section hierarchy

---

## Chunking

Large documents are divided into manageable chunks.

Typical configuration:

- Chunk size: 500–800 words
- Overlap: 100 words

Example:

```text
Course Description

↓

Chunk 1

Chunk 2

Chunk 3
```

Chunking improves embedding quality and retrieval accuracy.

---

# 7. Stage 3 – Structured Information Extraction

Gemini receives the processed curriculum text and converts it into structured educational data.

The prompt instructs Gemini to extract:

- Program name
- Courses
- Topics
- Skills
- Learning outcomes
- Assessments
- Practical sessions
- Projects
- Technologies
- Prerequisites

---

## Example Output

```json
{
  "course": "Machine Learning",
  "topics": [
    "Regression",
    "Classification",
    "Neural Networks"
  ],
  "skills": [
    "Python",
    "TensorFlow"
  ],
  "learning_outcomes": [
    "Build ML models",
    "Evaluate model performance"
  ]
}
```

The extracted JSON is validated before being stored in PostgreSQL and used by downstream AI components.

---

# 8. AI Pipeline Summary

The first stages of the AI pipeline convert an unstructured curriculum document into validated, machine-readable educational data.

This structured foundation enables the subsequent stages of semantic retrieval, knowledge graph construction, industry comparison, and recommendation generation, which are covered in the following sections.

---

# 9. Stage 4 – Embedding Generation

After structured information extraction, the pipeline converts textual curriculum content into dense vector embeddings for semantic search.

Unlike keyword matching, embeddings capture the contextual meaning of educational content.

---

## Purpose

Embeddings enable the system to:

- Find semantically similar courses
- Compare curricula across universities
- Match industry requirements
- Retrieve relevant educational resources
- Support Retrieval-Augmented Generation (RAG)

---

## Embedding Workflow

```text
Curriculum Chunks

↓

Embedding Model

↓

Dense Vector

↓

Metadata

↓

ChromaDB
```

---

## Embedding Model

Recommended model:

```text
BAAI/bge-small-en-v1.5
```

Alternative models:

- BAAI/bge-base-en-v1.5
- multilingual-e5-small

Selection criteria:

- High semantic accuracy
- Lightweight inference
- Fast CPU execution
- Open-source deployment

---

## Stored Metadata

Each embedding contains associated metadata.

Example:

```json
{
  "curriculum_id": "uuid",
  "course": "Machine Learning",
  "semester": 5,
  "chunk": 3,
  "type": "course_description"
}
```

---

## Vector Storage

Embeddings are stored in ChromaDB collections.

Collections include:

- curriculum_embeddings
- industry_embeddings
- recommendation_embeddings
- project_embeddings
- lab_embeddings

---

## Benefits

Embedding generation enables:

- Fast semantic retrieval
- Context-aware search
- AI reasoning with relevant documents
- Reduced hallucinations

---

# 10. Stage 5 – Knowledge Graph Construction

The extracted curriculum is transformed into a knowledge graph stored in Neo4j.

Unlike relational databases, the graph models educational relationships explicitly.

---

## Objectives

The graph represents:

- Courses
- Topics
- Skills
- Learning Outcomes
- Projects
- Assessments
- Technologies

---

## Graph Construction Workflow

```text
Structured JSON

↓

Normalize Entities

↓

Create Nodes

↓

Create Relationships

↓

Neo4j
```

---

## Example Nodes

```text
Course

Machine Learning

↓

Topic

Neural Networks

↓

Skill

Python

↓

Technology

TensorFlow
```

---

## Relationships

Examples:

```text
Machine Learning

──COVERS──► Neural Networks

Neural Networks

──REQUIRES──► Python

Machine Learning

──USES──► TensorFlow

Machine Learning

──HAS_PROJECT──► Image Classification
```

---

## Graph Benefits

The knowledge graph enables:

- Prerequisite discovery
- Dependency analysis
- Curriculum visualization
- Explainable recommendations
- Graph traversal

---

## Example Query

Example question:

```text
Which prerequisite skills are missing for Deep Learning?
```

Traversal:

```text
Deep Learning

↓

Python

↓

Linear Algebra

↓

Probability

↓

TensorFlow
```

---

# 11. Stage 6 – Retrieval-Augmented Generation (RAG)

RAG combines semantic retrieval with Large Language Models to generate grounded recommendations.

Instead of asking Gemini to reason only from the uploaded PDF, the system first retrieves additional context.

---

## Why RAG?

Without retrieval:

```text
Prompt

↓

Gemini

↓

Answer
```

The model relies only on its internal knowledge.

With RAG:

```text
Prompt

↓

Semantic Search

↓

Relevant Context

↓

Gemini

↓

Evidence-Based Answer
```

---

## Retrieval Sources

Context is retrieved from:

- Curriculum embeddings
- Industry skill embeddings
- Knowledge graph
- Previous recommendations

---

## Retrieval Workflow

```text
Curriculum

↓

Embedding

↓

Similarity Search

↓

Top-K Results

↓

Knowledge Graph Expansion

↓

Prompt Builder

↓

Gemini
```

---

## Prompt Construction

The prompt contains:

- Curriculum summary
- Similar courses
- Missing industry skills
- Knowledge graph relationships
- Relevant learning outcomes

Example:

```text
Current Course:

Machine Learning

Missing Skills:

Docker

MLOps

Kubernetes

Industry Demand:

High

Recommend curriculum improvements.
```

---

## Benefits of RAG

Retrieval-Augmented Generation provides:

- Reduced hallucinations
- Higher recommendation accuracy
- Traceable evidence
- Explainable outputs
- Consistent reasoning

---

## AI Context Flow

```text
Curriculum

↓

ChromaDB

↓

Top-K Similar Chunks

↓

Neo4j

↓

Related Skills

↓

Gemini Prompt

↓

Recommendation
```

---

# Part 2 Summary

At this stage, the AI pipeline has transformed raw curriculum documents into semantically meaningful vectors and an interconnected educational knowledge graph.

Using Retrieval-Augmented Generation, the system enriches Gemini with relevant contextual information before reasoning, ensuring recommendations are accurate, explainable, and grounded in both curriculum content and industry knowledge.

The remaining stages focus on identifying curriculum gaps, generating actionable recommendations, explaining AI decisions, and producing comprehensive analysis reports.

---

# 12. Stage 7 – Industry Gap Analysis

After curriculum understanding is complete, the AI compares the extracted curriculum with current industry expectations.

The objective is to identify missing knowledge, outdated technologies, and opportunities for curriculum improvement.

---

## Inputs

The comparison engine uses multiple sources:

- Structured curriculum data
- Knowledge Graph (Neo4j)
- Curriculum embeddings (ChromaDB)
- Industry skill embeddings
- AI reasoning (Gemini)

---

## Gap Analysis Workflow

```text
Curriculum

↓

Extract Skills

↓

Industry Skill Database

↓

Similarity Matching

↓

Missing Skills

↓

Priority Scoring
```

---

## Types of Gaps

The AI identifies multiple categories of curriculum gaps.

### Skill Gaps

Example:

```text
Curriculum

Python

SQL

Machine Learning

↓

Missing

Docker

Kubernetes

GitHub Actions

MLOps
```

---

### Technology Gaps

Example:

```text
Current Curriculum

TensorFlow

↓

Industry Trend

TensorFlow

PyTorch

LLMs

LangChain
```

---

### Practical Exposure

The AI evaluates whether theoretical concepts are supported by:

- Laboratory exercises
- Mini-projects
- Capstone projects
- Industry case studies

---

### Assessment Gaps

Evaluation includes:

- Assignment diversity
- Project-based assessment
- Practical examinations
- Continuous assessment

---

## Gap Scoring

Each missing concept receives a priority score.

Factors include:

- Industry demand
- Curriculum relevance
- Learning dependency
- Frequency in similar curricula

Example:

| Skill | Priority |
|--------|---------:|
| Docker | High |
| Git | High |
| Kubernetes | Medium |
| Terraform | Low |

---

# 13. Stage 8 – Recommendation Generation

Once gaps are identified, the AI generates actionable recommendations.

Unlike simple rule-based systems, recommendations combine:

- Graph reasoning
- Semantic retrieval
- Gemini reasoning
- Rule validation

---

## Recommendation Workflow

```text
Detected Gaps

↓

Relevant Context

↓

Prompt Builder

↓

Gemini

↓

Structured Recommendations

↓

Validation

↓

Database
```

---

## Prompt Structure

The recommendation prompt contains:

- Current curriculum
- Missing skills
- Industry demand
- Similar university curricula
- Knowledge graph relationships

Example:

```text
Current Course

Machine Learning

Current Topics

Regression

Classification

Neural Networks

Missing Industry Skills

Docker

MLOps

CI/CD

Suggest improvements.
```

---

## Generated Recommendation

Example:

```json
{
  "category": "Technology Update",
  "title": "Introduce Docker Fundamentals",
  "priority": "High",
  "confidence": 95,
  "reason": "Containerization is required for modern ML deployment."
}
```

---

## Recommendation Categories

The AI classifies recommendations into:

- New Course
- Topic Addition
- Technology Update
- Skill Enhancement
- Laboratory Improvement
- Project Suggestion
- Assessment Enhancement
- Industry Collaboration

---

## Confidence Score

Each recommendation receives a confidence score between 0 and 100.

The score considers:

- Semantic similarity
- Knowledge graph evidence
- Gemini confidence
- Industry demand
- Historical consistency

---

# 14. Stage 9 – Explainability Engine

CurricuAlign AI emphasizes transparent and explainable recommendations.

Every recommendation includes supporting evidence.

---

## Explainability Workflow

```text
Recommendation

↓

Knowledge Graph

↓

Retrieved Context

↓

Evidence

↓

Explanation
```

---

## Example

Recommendation:

```text
Add Docker to Machine Learning curriculum
```

Supporting evidence:

```text
Industry demand: High

Found in 82% of reference curricula

Required for MLOps deployment

Depends on Linux and Containers
```

---

## Evidence Sources

The explanation may reference:

- Curriculum content
- Knowledge graph relationships
- Semantic retrieval results
- Industry benchmark datasets
- AI reasoning

---

## Benefits

Explainability enables users to:

- Trust recommendations
- Understand AI reasoning
- Verify evidence
- Make informed curriculum decisions

---

# 15. Stage 10 – Report Generation

The final stage converts analysis results into a structured report.

---

## Report Contents

Generated reports include:

- Curriculum summary
- Health score
- Industry alignment score
- Practical learning score
- Emerging technology score
- Gap analysis
- Recommendations
- Supporting evidence

---

## Report Workflow

```text
Analysis Results

↓

Recommendation Engine

↓

Template Generator

↓

PDF Report

↓

Supabase Storage

↓

Dashboard
```

---

## Report Formats

Supported formats:

- PDF
- JSON
- CSV (Recommendations)

Future support:

- DOCX
- PowerPoint

---

# 16. Pipeline Optimization

Several optimization techniques improve speed and reliability.

---

## Parallel Processing

Independent tasks execute simultaneously.

Example:

```text
Extract JSON

||

Generate Embeddings

||

Build Knowledge Graph
```

---

## Caching

The system caches:

- Embeddings
- Prompt templates
- Frequently accessed graph queries
- Industry datasets

---

## Background Processing

Long-running operations execute asynchronously.

Examples:

- Curriculum analysis
- Report generation
- Embedding generation

---

## Batch Processing

Multiple curriculum chunks are processed together to reduce API calls and improve throughput.

---

# 17. Failure Handling & Retry Strategy

The pipeline is designed to recover gracefully from failures.

---

## Retry Strategy

Transient failures are retried automatically.

Examples:

- AI API timeout
- Temporary database connection issues
- Storage upload failures

---

## Validation Failures

If extraction produces invalid JSON:

```text
Gemini

↓

Validation Failed

↓

Automatic Re-prompt

↓

Validated JSON
```

---

## Partial Recovery

If one stage fails:

- Completed stages are preserved.
- Failed stages are retried.
- The pipeline resumes from the failure point.

---

## Logging

Every stage records:

- Processing duration
- Success/failure status
- Error messages
- Retry count

These logs support debugging and monitoring.

---

# 18. Performance Metrics

The pipeline is evaluated using measurable indicators.

| Metric | Target |
|---------|--------|
| PDF Processing Time | < 15 s |
| Structured Extraction Accuracy | > 90% |
| Embedding Generation Time | < 5 s |
| Recommendation Generation | < 20 s |
| End-to-End Analysis | < 60 s |
| API Availability | > 99% |

---

## Quality Metrics

The AI is assessed on:

- Recommendation relevance
- Industry alignment accuracy
- Explainability quality
- Retrieval precision
- User feedback
- Processing consistency

---

# 19. AI Pipeline Summary

The CurricuAlign AI pipeline combines modern AI techniques with structured software engineering to transform curriculum documents into actionable educational insights.

The complete workflow consists of:

```text
PDF Upload

↓

Document Processing

↓

Information Extraction

↓

Embedding Generation

↓

Knowledge Graph Construction

↓

Semantic Retrieval (RAG)

↓

Industry Gap Analysis

↓

Recommendation Generation

↓

Explainability Engine

↓

Report Generation

↓

Dashboard
```

Unlike conventional document analysis systems, the pipeline integrates Large Language Models, vector search, graph reasoning, and retrieval-augmented generation to produce transparent, evidence-based recommendations.

This hybrid architecture provides:

- Accurate curriculum understanding
- Semantic comparison across institutions
- Industry-aware gap detection
- Explainable AI recommendations
- Scalable processing
- Extensibility for future educational domains

The AI pipeline serves as the intelligence backbone of CurricuAlign AI, enabling curriculum designers and educators to make informed, data-driven decisions that align academic programs with evolving industry needs.


