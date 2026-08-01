# API Design

# CurricuAlign AI

**Version:** 1.0

**Status:** Draft

—

Frontend (Next.js)

↓

REST API

↓

FastAPI

├── Auth Service
├── Curriculum Service
├── AI Service
├── Report Service
└── Search Service

↓

PostgreSQL
Neo4j
ChromaDB
Supabase Storage
Gemini AI


# Table of Contents

# Table of Contents

1. API Overview
2. API Design Principles
3. Authentication & Authorization
4. API Architecture
5. API Request Lifecycle
6. API Summary
7. API Endpoints
8. Request & Response Schemas
9. Error Handling
10. HTTP Status Codes
11. Rate Limiting
12. API Security
13. API Versioning
14. Sequence Diagrams
15. OpenAPI Specification Notes
16. API Design Summary

---

# 1. API Overview

CurricuAlign AI exposes a RESTful API that enables communication between the Next.js frontend and the FastAPI backend.

The API provides endpoints for:

- User authentication
- Curriculum management
- AI-powered curriculum analysis
- Recommendation retrieval
- Report generation
- Dashboard analytics

All client interactions occur through HTTPS using JSON payloads.

---

# API Characteristics

| Property | Value |
|----------|-------|
| Architecture | REST |
| Data Format | JSON |
| Authentication | JWT |
| Transport | HTTPS |
| Backend | FastAPI |
| Versioning | URL Versioning |
| Base URL | `/api/v1` |

---

# Base URL

```text
/api/v1
```

Future versions can coexist.

Examples:

```text
/api/v1

/api/v2
```

---

# 2. API Design Principles

The API follows modern REST design practices.

## Stateless Communication

Every request contains all required information.

The server does not maintain client session state.

---

## Resource-Oriented Design

Resources include:

- Users
- Curricula
- Analyses
- Recommendations
- Reports

Example:

```text
GET /curricula

POST /curricula

GET /curricula/{id}
```

---

## Consistent JSON Structure

Successful responses follow a standard format.

```json
{
    "success": true,
    "data": {},
    "message": "Operation completed successfully"
}
```

Errors follow a consistent schema.

```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid PDF"
    }
}
```

---

## HTTP Method Usage

| Method | Purpose |
|---------|----------|
| GET | Retrieve resource |
| POST | Create resource |
| PUT | Replace resource |
| PATCH | Partial update |
| DELETE | Remove resource |

---

## Idempotency

GET

PUT

DELETE

must be idempotent.

POST creates new resources.

---

# 3. Authentication & Authorization

Authentication is handled by Supabase Auth.

After successful login, the client receives a JWT access token.

Example:

```text
Authorization:

Bearer <JWT_TOKEN>
```

Every protected endpoint validates this token before processing the request.

---

## User Roles

Supported roles include:

- Professor
- Curriculum Designer
- Department Head
- Administrator

Permissions are enforced using Role-Based Access Control (RBAC).

---

# Protected Endpoints

Examples:

```text
POST /curricula

POST /analysis

GET /reports

GET /dashboard
```

Public endpoints include:

```text
GET /health

GET /version
```

---

# 4. API Architecture

```text
Client

↓

Next.js

↓

HTTPS

↓

FastAPI

↓

API Layer

↓

Business Services

↓

Repositories

↓

PostgreSQL

Neo4j

ChromaDB

↓

JSON Response
```

The API layer validates requests, invokes business services, and returns structured JSON responses.

---

# 5. API Request Lifecycle

The following illustrates a typical request.

```text
User

↓

Frontend

↓

HTTP Request

↓

Authentication

↓

Validation

↓

Business Logic

↓

Database Queries

↓

AI Processing (if required)

↓

JSON Response

↓

Frontend Rendering
```

For AI-intensive endpoints, asynchronous processing may be used to improve responsiveness.

---

# 6. API Summary

The CurricuAlign AI API provides a secure, RESTful interface for all application functionality.

It emphasizes:

- Consistent endpoint design
- Secure JWT authentication
- Predictable JSON responses
- Versioned APIs
- Clear separation between frontend and backend
- Scalability for future enhancements

Subsequent sections define each endpoint in detail, including request parameters, response schemas, authentication requirements, and implementation notes.

---

# 7. API Endpoints

The following sections define the REST endpoints exposed by the CurricuAlign AI backend.

---

# 7.1 Authentication APIs

Authentication is handled using Supabase Auth. The backend validates JWT tokens for protected routes.

---

## Login

```http
POST /auth/login
```

### Authentication

Not Required

### Request Body

```json
{
    "email": "professor@example.edu",
    "password": "********"
}
```

### Success Response

```json
{
    "success": true,
    "data": {
        "access_token": "<jwt>",
        "refresh_token": "<refresh>",
        "user": {
            "id": "uuid",
            "name": "Dr. Jane Doe",
            "role": "Professor"
        }
    }
}
```

Status Code

```
200 OK
```

---

## Logout

```http
POST /auth/logout
```

Authentication Required

Response

```json
{
    "success": true,
    "message": "Logged out successfully."
}
```

---

## Get Current User

```http
GET /auth/me
```

Authentication Required

Response

```json
{
    "success": true,
    "data": {
        "id": "uuid",
        "name": "Dr. Jane Doe",
        "email": "jane@example.edu",
        "role": "Professor"
    }
}
```

---

# 7.2 User APIs

---

## Get User Profile

```http
GET /users/{user_id}
```

Returns complete profile information.

---

## Update Profile

```http
PATCH /users/{user_id}
```

Request

```json
{
    "full_name": "Dr. Jane Doe",
    "department": "Computer Science"
}
```

---

# 7.3 Curriculum APIs

These endpoints manage uploaded curricula.

---

## Upload Curriculum

```http
POST /curricula/upload
```

Authentication Required

Consumes

```
multipart/form-data
```

Request

```
pdf_file
program
semester
academic_year
department_id
```

Response

```json
{
    "success": true,
    "data": {
        "curriculum_id": "uuid",
        "status": "Uploaded"
    }
}
```

Status

```
201 Created
```

---

## Get Curriculum

```http
GET /curricula/{curriculum_id}
```

Returns metadata for a curriculum.

---

## List Curricula

```http
GET /curricula
```

Optional Query Parameters

```
department

semester

year

status

page

limit
```

Example

```
GET /curricula?page=1&limit=10
```

---

## Delete Curriculum

```http
DELETE /curricula/{curriculum_id}
```

Response

```json
{
    "success": true,
    "message": "Curriculum deleted."
}
```

---

# 7.4 Analysis APIs

These endpoints invoke the AI pipeline.

---

## Start Analysis

```http
POST /analysis
```

Request

```json
{
    "curriculum_id": "uuid"
}
```

Response

```json
{
    "success": true,
    "data": {
        "analysis_id": "uuid",
        "status": "Processing"
    }
}
```

---

## Analysis Status

```http
GET /analysis/{analysis_id}/status
```

Example Response

```json
{
    "status": "Processing",
    "progress": 63
}
```

---

## Get Analysis

```http
GET /analysis/{analysis_id}
```

Returns

- Scores
- Gap Analysis
- Recommendations
- Charts
- Metadata

Example

```json
{
    "health_score": 86,
    "alignment_score": 91,
    "recommendations": []
}
```

---

## Re-run Analysis

```http
POST /analysis/{analysis_id}/rerun
```

Creates a new analysis using the latest AI pipeline.

---

# 7.5 Recommendation APIs

---

## List Recommendations

```http
GET /recommendations/{analysis_id}
```

Optional Filters

```
priority

category

status
```

---

## Update Recommendation

```http
PATCH /recommendations/{recommendation_id}
```

Request

```json
{
    "status": "Accepted"
}
```

---

## Export Recommendations

```http
GET /recommendations/{analysis_id}/export
```

Returns

```
CSV

Excel

JSON
```

---

# 7.6 Report APIs

---

## Generate Report

```http
POST /reports/generate
```

Request

```json
{
    "analysis_id": "uuid"
}
```

Response

```json
{
    "report_id": "uuid",
    "status": "Generating"
}
```

---

## Get Report

```http
GET /reports/{report_id}
```

Returns report metadata.

---

## Download Report

```http
GET /reports/{report_id}/download
```

Response

```
application/pdf
```

---

# 7.7 Dashboard APIs

---

## Dashboard Summary

```http
GET /dashboard/summary
```

Returns

```json
{
    "total_curricula": 18,
    "completed_analyses": 15,
    "pending": 3,
    "average_health_score": 84.7
}
```

---

## Dashboard Analytics

```http
GET /dashboard/analytics
```

Returns

- Health score trends
- Technology coverage
- Recommendation distribution
- Department statistics

---

# 7.8 Search APIs

---

## Semantic Search

```http
POST /search/semantic
```

Request

```json
{
    "query": "Cloud Computing"
}
```

Response

```json
{
    "results": [
        {
            "course": "Distributed Systems",
            "similarity": 0.93
        }
    ]
}
```

Uses ChromaDB.

---

## Skill Graph Search

```http
GET /search/skills
```

Query

```
keyword=Python
```

Returns graph neighbors from Neo4j.

---

# 7.9 System APIs

---

## Health Check

```http
GET /health
```

Response

```json
{
    "status": "healthy"
}
```

---

## Version

```http
GET /version
```

Response

```json
{
    "version": "1.0.0"
}
```

---

# Endpoint Summary

| Module | Endpoints |
|---------|----------:|
| Authentication | 3 |
| Users | 2 |
| Curriculum | 4 |
| Analysis | 4 |
| Recommendations | 3 |
| Reports | 3 |
| Dashboard | 2 |
| Search | 2 |
| System | 2 |

**Total REST Endpoints:** **25**

---

# Service Mapping

| Endpoint Group | Primary Service | Databases Used |
|----------------|-----------------|----------------|
| Authentication | Auth Service | Supabase Auth |
| Users | User Service | PostgreSQL |
| Curriculum | Curriculum Service | PostgreSQL, Storage |
| Analysis | AI Service | PostgreSQL, Neo4j, ChromaDB |
| Recommendations | Recommendation Service | PostgreSQL, Neo4j |
| Reports | Report Service | PostgreSQL, Storage |
| Dashboard | Analytics Service | PostgreSQL |
| Search | Search Service | ChromaDB, Neo4j |
| System | Health Service | All Services |

---

# 8. Request & Response Schemas

To ensure consistency across all endpoints, CurricuAlign AI uses standardized request and response formats.

---

## Standard Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

---

## Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Uploaded file is not a valid PDF."
  }
}
```

---

## Pagination Response

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42,
      "pages": 5
    }
  }
}
```

---

## Upload Request Schema

```json
{
  "program": "B.Tech AI",
  "semester": 5,
  "academic_year": "2025-26",
  "department_id": "uuid"
}
```

---

## Analysis Response Schema

```json
{
  "analysis_id": "uuid",
  "health_score": 86,
  "alignment_score": 91,
  "practical_score": 82,
  "emerging_tech_score": 78,
  "recommendation_count": 14
}
```

---

## Recommendation Schema

```json
{
  "recommendation_id": "uuid",
  "category": "Technology Update",
  "priority": "High",
  "title": "Introduce Docker Fundamentals",
  "description": "Add containerization concepts and hands-on labs.",
  "confidence": 94.6
}
```

---

## Report Schema

```json
{
  "report_id": "uuid",
  "status": "Completed",
  "download_url": "/reports/uuid/download"
}
```

---

# 9. Error Handling

The API returns meaningful error messages with appropriate HTTP status codes.

---

## Validation Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Semester must be between 1 and 8."
  }
}
```

---

## Authentication Error

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired access token."
  }
}
```

---

## Resource Not Found

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Curriculum not found."
  }
}
```

---

## AI Processing Error

```json
{
  "success": false,
  "error": {
    "code": "AI_PROCESSING_FAILED",
    "message": "Unable to complete curriculum analysis."
  }
}
```

---

## Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Unexpected server error."
  }
}
```

---

# 10. HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource Created |
| 202 | Accepted (Background Processing) |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 413 | File Too Large |
| 415 | Unsupported Media Type |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

# 11. Rate Limiting

To protect backend resources, rate limiting is applied.

| Endpoint | Limit |
|----------|------:|
| Authentication | 10 requests/minute |
| Upload Curriculum | 5 requests/minute |
| Start Analysis | 5 requests/minute |
| Dashboard | 60 requests/minute |
| Search | 30 requests/minute |
| Health | Unlimited |

When exceeded:

```http
429 Too Many Requests
```

---

# 12. API Security

Security is enforced at multiple layers.

---

## HTTPS

All requests must use HTTPS.

---

## JWT Authentication

Protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Input Validation

Every request is validated for:

- Required fields
- Data types
- File size
- Allowed MIME types
- UUID format

---

## File Upload Validation

Checks include:

- PDF only
- Maximum 25 MB
- Malware scanning (future enhancement)
- Duplicate detection using file hash

---

## SQL Injection Prevention

- Parameterized queries
- ORM validation
- Input sanitization

---

## API Key Protection

External AI service credentials remain server-side and are never exposed to the client.

---

# 13. API Versioning

CurricuAlign AI uses URL-based versioning.

Example:

```text
/api/v1
```

Future versions:

```text
/ api/v2
```

Version changes will not break existing clients.

---

# 14. Sequence Diagrams

## Curriculum Upload

```text
User

↓

Next.js

↓

POST /curricula/upload

↓

FastAPI

↓

Validate File

↓

Supabase Storage

↓

PostgreSQL

↓

Response
```

---

## Curriculum Analysis

```text
User

↓

POST /analysis

↓

FastAPI

↓

Extract PDF

↓

Gemini AI

↓

Neo4j

↓

ChromaDB

↓

Recommendation Engine

↓

PostgreSQL

↓

Response
```

---

## Report Generation

```text
User

↓

POST /reports/generate

↓

Analysis Service

↓

Generate PDF

↓

Supabase Storage

↓

Download URL

↓

User
```

---

# 15. OpenAPI Specification Notes

The backend will expose interactive API documentation using FastAPI.

Available endpoints:

```text
/docs
```

Swagger UI provides:

- Interactive endpoint testing
- Request schemas
- Response schemas
- Authentication support
- Error documentation

ReDoc documentation:

```text
/redoc
```

OpenAPI JSON:

```text
/ openapi.json
```

This enables automatic client generation and simplifies API testing.

---

# 16. API Design Summary

The CurricuAlign AI API provides a secure, scalable, and RESTful interface that connects the Next.js frontend with the FastAPI backend.

Key characteristics include:

- RESTful resource-oriented design
- JWT-based authentication
- Consistent JSON responses
- Standardized error handling
- Comprehensive request validation
- Role-based authorization
- URL-based API versioning
- OpenAPI-compliant documentation

The API acts as the communication layer between the user interface, AI processing pipeline, and persistence layer, ensuring a clean separation of concerns and enabling independent frontend and backend development.


