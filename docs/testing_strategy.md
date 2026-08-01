# 08_Testing_Strategy.md

# CurricuAlign AI

**Version:** 1.0

**Status:** Draft

---

# Table of Contents

1. Introduction
2. Testing Objectives
3. Testing Principles
4. Testing Strategy
5. Testing Stack
6. Testing Environment
7. Test Data Strategy
8. Unit Testing
9. Integration Testing
10. Part 1 Summary

---

# 1. Introduction

Testing is an essential part of the CurricuAlign AI development lifecycle. This document defines the testing strategy, methodologies, tools, and quality assurance practices adopted to ensure the application's reliability, security, performance, and maintainability.

The testing process validates every layer of the system, including the frontend, backend, AI pipeline, databases, authentication, and integrations. By combining automated and manual testing approaches, the project aims to detect defects early, improve development confidence, and deliver a stable application.

This document serves as the primary reference for developers and testers when implementing, executing, and maintaining test cases throughout the project lifecycle.

---

# 2. Testing Objectives

The primary objectives of testing are to:

- Verify that all functional requirements are correctly implemented.
- Ensure AI-generated outputs are valid, explainable, and consistent.
- Validate integrations between frontend, backend, databases, and AI services.
- Detect regressions before deployment.
- Verify application security and authentication mechanisms.
- Ensure acceptable performance under expected workloads.
- Improve maintainability through automated testing.
- Deliver a reliable and user-friendly experience.

---

# 3. Testing Principles

The testing process follows these guiding principles.

## Shift Left Testing

Testing should begin as early as possible during development. Developers are encouraged to write and execute tests alongside feature implementation rather than waiting until the end of the development cycle.

---

## Automation First

Automated tests should be preferred whenever practical. Manual testing should focus on exploratory testing, usability, and user acceptance scenarios.

---

## Independent Test Cases

Each test should verify a single behavior and should not depend on the execution of another test. This improves maintainability and simplifies debugging.

---

## Repeatability

Tests should produce consistent results regardless of when or where they are executed, provided the environment and inputs remain unchanged.

---

## Risk-Based Testing

Critical application areas receive higher testing priority, including:

- Authentication
- File uploads
- AI analysis pipeline
- Report generation
- Recommendation engine
- Database operations

---

# 4. Testing Strategy

CurricuAlign AI adopts a layered testing approach where each testing level validates a specific aspect of the system.

```text
                 User Acceptance Testing
                          ▲
                 End-to-End Testing
                          ▲
                Integration Testing
                          ▲
                  Unit Testing
```

Each layer builds confidence in the correctness of the application before progressing to the next.

---

## Testing Levels

| Level | Purpose |
|--------|---------|
| Unit Testing | Validate individual functions and components |
| Integration Testing | Verify interactions between modules |
| API Testing | Validate backend endpoints |
| End-to-End Testing | Simulate complete user workflows |
| Performance Testing | Measure scalability and responsiveness |
| Security Testing | Verify authentication and input validation |
| Accessibility Testing | Ensure inclusive user experience |
| User Acceptance Testing | Validate business requirements |

---

# 5. Testing Stack

The project uses a technology-specific testing stack aligned with the implementation architecture.

| Layer | Technology |
|--------|------------|
| Frontend Framework | Next.js 15 |
| Frontend Language | TypeScript |
| Component Testing | Vitest |
| UI Testing | React Testing Library |
| End-to-End Testing | Playwright |
| Backend Framework | FastAPI |
| Backend Testing | pytest |
| API Testing | FastAPI TestClient |
| AI Validation | Mock Gemini Responses + JSON Schema Validation |
| Performance Testing | Locust |
| Accessibility Testing | Lighthouse + axe-core |

---

## Continuous Testing

Automated tests should run:

- Before every pull request merge
- During CI/CD pipelines
- Before production deployments

No code should be merged if mandatory test suites fail.

---

# 6. Testing Environment

Separate environments reduce deployment risks and improve testing reliability.

| Environment | Purpose |
|------------|---------|
| Development | Feature implementation |
| Testing | Automated testing |
| Staging | Pre-production validation |
| Production | Live deployment |

---

## Test Infrastructure

The testing environment mirrors the production architecture wherever possible.

Components include:

- Next.js Frontend
- FastAPI Backend
- PostgreSQL
- Neo4j
- ChromaDB
- Supabase Storage
- Mock Gemini API

External AI services should be mocked during automated testing to ensure predictable and repeatable results.

---

# 7. Test Data Strategy

Reliable testing requires representative datasets.

---

## Sample Curriculum Documents

The project maintains a collection of test PDFs covering multiple scenarios, including:

- Valid curriculum documents
- Empty PDFs
- Corrupted PDFs
- Large files
- Duplicate uploads
- Scanned documents (future support)

---

## Mock AI Responses

Gemini API responses should be mocked during unit and integration tests.

Mock responses should include:

- Valid structured JSON
- Missing fields
- Invalid JSON
- Empty responses
- Timeout scenarios
- Error responses

---

## Database Fixtures

Testing databases should be seeded with predictable sample data, including:

- Users
- Departments
- Curricula
- Reports
- Recommendations
- Knowledge graph nodes

Fixtures should be reset between test runs to maintain consistency.

---

# 8. Unit Testing

Unit testing verifies individual functions, methods, and components in isolation.

---

## Frontend Unit Testing

The frontend uses **Vitest** together with **React Testing Library** to validate reusable components and utility functions.

Examples include:

- Button rendering
- Form validation
- Table filtering
- Chart components
- Custom hooks
- Utility functions
- Navigation components

Shared components should include unit tests alongside their implementation whenever practical.

---

## Backend Unit Testing

Backend services are tested using **pytest**.

Examples include:

- Service classes
- Repository methods
- Utility modules
- Authentication helpers
- Validation functions
- Report generation logic

Database and external service dependencies should be mocked to isolate business logic.

---

# 9. Integration Testing

Integration testing verifies that multiple modules interact correctly.

Unlike unit testing, integration tests validate real communication between application layers.

---

## Integration Scenarios

Key scenarios include:

- Frontend ↔ Backend communication
- Backend ↔ PostgreSQL
- Backend ↔ Neo4j
- Backend ↔ ChromaDB
- Backend ↔ Supabase Storage
- Backend ↔ Gemini API (mocked)
- AI Pipeline ↔ Recommendation Engine

---

## Example Workflow

```text
Upload PDF

↓

Store File

↓

Extract Text

↓

Generate Embeddings

↓

Build Knowledge Graph

↓

Generate Recommendations

↓

Store Results

↓

Display Dashboard
```

The entire workflow should execute successfully with all intermediate outputs validated.

---

# Part 1 Summary

This section establishes the overall testing philosophy, objectives, tooling, and foundational strategy for CurricuAlign AI.

By adopting a layered testing approach, leveraging automation, and using technology-specific testing tools, the project ensures that each component can be validated independently while maintaining confidence in the complete system. The following sections will build upon this foundation by defining detailed test cases for APIs, AI workflows, authentication, performance, security, and user acceptance testing.


---

# 10. API Testing

API testing verifies that backend endpoints function correctly, return expected responses, validate inputs, enforce authorization, and handle errors gracefully.

The backend APIs are tested using **FastAPI TestClient** together with **pytest**.

---

## Objectives

- Verify request validation
- Verify response schemas
- Validate authentication
- Verify business logic
- Test error handling
- Ensure consistent HTTP status codes

---

## API Categories

| Category | Examples |
|----------|----------|
| Authentication | Login, Logout, Refresh Token |
| Curriculum | Upload, Retrieve, Delete |
| Analysis | Start, Status, Results |
| Recommendations | List, Filter |
| Reports | Generate, Download |
| Dashboard | Metrics, Statistics |

---

## Common Test Cases

### Successful Request

Expected:

- HTTP 200/201
- Valid JSON
- Correct response schema

---

### Invalid Input

Examples:

- Missing required fields
- Invalid IDs
- Invalid file format

Expected:

- HTTP 400
- Validation errors

---

### Unauthorized Access

Expected:

- HTTP 401
- No sensitive information returned

---

### Forbidden Operations

Expected:

- HTTP 403

---

### Server Failure

Expected:

- HTTP 500
- Friendly error message
- Error logged internally

---

# 11. Authentication Testing

Authentication is a critical security component.

Testing validates identity verification, authorization, and session management.

---

## Scenarios

- Valid login
- Invalid password
- Invalid email
- Expired session
- Logout
- Refresh token
- Unauthorized API access
- Password reset (future)

---

## Expected Results

- JWT issued correctly
- Protected routes inaccessible without authentication
- Expired tokens rejected
- User session cleared after logout

---

# 12. File Upload Testing

Curriculum upload is the primary user workflow.

Testing verifies correctness, validation, and storage.

---

## Supported Files

- PDF

---

## Test Cases

### Valid Upload

Expected:

- File stored
- Metadata saved
- Analysis queued

---

### Invalid File Type

Expected:

- Upload rejected

---

### Corrupted PDF

Expected:

- Parsing failure handled gracefully

---

### Large File

Expected:

- Upload accepted within configured limits

---

### Duplicate Upload

Expected:

- Warning displayed
- Duplicate handled according to application rules

---

### Missing Metadata

Expected:

- Validation error

---

# 13. Database Testing

The application uses multiple databases for different responsibilities.

Each integration should be verified independently.

---

## PostgreSQL

Verify:

- CRUD operations
- Relationships
- Constraints
- Transactions

---

## Neo4j

Verify:

- Node creation
- Relationship creation
- Query accuracy
- Graph traversal

---

## ChromaDB

Verify:

- Embedding insertion
- Similarity search
- Retrieval accuracy

---

## Supabase Storage

Verify:

- Upload
- Retrieval
- File deletion
- Access permissions

---

# 14. AI Pipeline Testing

The AI pipeline represents the core functionality of CurricuAlign AI.

Each processing stage should be validated independently and as part of the complete workflow.

---

## Pipeline Stages

```text
Upload PDF

↓

Extract Text

↓

Chunk Content

↓

Generate Embeddings

↓

Store Vectors

↓

LLM Analysis

↓

Knowledge Graph

↓

Recommendations

↓

Generate Report
```

---

## Validation Points

### Text Extraction

Verify:

- Complete extraction
- Proper formatting
- No unexpected truncation

---

### Chunking

Verify:

- Chunk size
- Chunk overlap
- Boundary correctness

---

### Embedding Generation

Verify:

- Embeddings generated
- Correct dimensions
- Successfully stored

---

### LLM Analysis

Verify:

- JSON schema validity
- Required fields
- Consistent structure

---

### Knowledge Graph

Verify:

- Nodes created
- Relationships connected
- No orphan nodes

---

### Recommendation Engine

Verify:

- Recommendations generated
- Confidence scores assigned
- Categories identified

---

### Report Generation

Verify:

- PDF generated successfully
- Charts rendered
- Recommendations included

---

# 15. Recommendation Validation

AI recommendations should be technically valid, understandable, and actionable.

---

## Validation Criteria

Each recommendation should include:

- Title
- Description
- Category
- Priority
- Confidence Score
- Supporting Evidence

---

## Quality Checks

Verify:

- No duplicate recommendations
- No empty fields
- Proper categorization
- Human-readable language
- Relevant supporting evidence

---

## Edge Cases

Test:

- Empty curriculum
- Minimal curriculum
- Highly specialized curriculum
- Large curriculum documents

---

# 16. Frontend Testing

The frontend is tested using **Vitest** and **React Testing Library**.

Testing focuses on reusable components, user interactions, rendering behavior, and state management.

---

## Components to Test

- Buttons
- Forms
- Tables
- Charts
- Dialogs
- Sidebar
- Navigation
- Upload Components
- Dashboard Cards
- Recommendation Cards

---

## User Interaction Tests

Verify:

- Click events
- Form submission
- Search
- Filtering
- Sorting
- Pagination
- Keyboard navigation

---

## Rendering Tests

Verify:

- Correct data displayed
- Loading states
- Empty states
- Error states
- Responsive layouts

---

# 17. End-to-End Testing

End-to-end testing validates complete user workflows from the browser to the backend.

The project uses **Playwright** for browser automation.

---

## Critical User Flows

### User Login

Login

↓

Dashboard

Expected:

Dashboard displayed successfully.

---

### Upload Workflow

Login

↓

Upload Curriculum

↓

Analysis

↓

Results

Expected:

Entire workflow completes successfully.

---

### Report Workflow

Results

↓

Generate Report

↓

Download PDF

Expected:

Valid report downloaded.

---

### Recommendation Workflow

Dashboard

↓

Recommendations

↓

Open Details

↓

Apply Filters

Expected:

Correct recommendations displayed.

---

# Part 2 Summary

This section defines the functional testing requirements for every major module of CurricuAlign AI, including APIs, authentication, file uploads, databases, the AI processing pipeline, recommendation generation, frontend components, and complete user workflows.

Together with the foundational strategy defined in Part 1, these test scenarios ensure that every critical feature is validated individually and as part of the integrated system, providing confidence in the application's correctness, stability, and overall user experience.

---

# 18. Performance Testing

Performance testing evaluates the responsiveness, stability, and scalability of CurricuAlign AI under expected and peak workloads.

The project uses **Locust** to simulate concurrent users and measure system performance.

---

## Objectives

- Measure API response times
- Evaluate concurrent user handling
- Identify system bottlenecks
- Validate scalability
- Ensure acceptable user experience

---

## Performance Metrics

| Metric | Target |
|---------|--------|
| Login Response | < 2 seconds |
| Dashboard Load | < 3 seconds |
| PDF Upload | < 10 seconds |
| AI Analysis Start | < 5 seconds |
| Recommendation Retrieval | < 3 seconds |
| Report Generation | < 30 seconds |

---

## Load Testing

Simulate multiple users performing:

- Login
- Upload curriculum
- View dashboard
- Generate reports
- Download reports

---

## Stress Testing

Gradually increase concurrent users until:

- Performance degradation is observed
- Error rates increase
- Resource limits are reached

Results should be documented for future optimization.

---

# 19. Security Testing

Security testing verifies that the application protects user data and resists common attack vectors.

---

## Authentication Security

Verify:

- JWT validation
- Token expiration
- Protected routes
- Session termination
- Unauthorized access prevention

---

## Input Validation

Test:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Invalid file uploads
- Malicious filenames

---

## File Upload Security

Verify:

- MIME type validation
- File extension validation
- File size limits
- Virus scanning (future enhancement)

---

## AI Security

Since the application relies on LLM-generated responses, AI-specific testing is essential.

### Prompt Injection

Verify that prompts attempting to manipulate or override system behavior are safely handled.

Examples:

- Ignore previous instructions
- Reveal internal prompts
- Generate unrelated content

---

### Response Validation

Verify:

- Valid JSON output
- Required fields present
- No malformed responses
- No unsafe generated content

---

## Secrets Management

Ensure:

- API keys are stored securely
- Environment variables are not exposed
- Sensitive configuration is excluded from client-side bundles

---

# 20. Accessibility Testing

Accessibility testing ensures that the application can be used by individuals with diverse abilities.

The project aims to align with **WCAG 2.2 AA** recommendations wherever practical.

---

## Accessibility Checklist

Verify:

- Keyboard navigation
- Screen reader compatibility
- Focus visibility
- Semantic HTML
- Sufficient color contrast
- Accessible forms
- Descriptive labels

---

## Automated Tools

Accessibility validation includes:

- Lighthouse
- axe-core

Manual testing should complement automated audits.

---

# 21. User Acceptance Testing (UAT)

User Acceptance Testing verifies that the application satisfies business requirements and user expectations.

Testing should involve representative users such as faculty members, department heads, or academic administrators.

---

## Acceptance Criteria

Users should be able to:

- Log in successfully
- Upload curriculum documents
- Monitor analysis progress
- Review recommendations
- Explore the knowledge graph
- Generate reports
- Download reports

---

## Success Criteria

The application is accepted when:

- All critical workflows succeed
- No high-severity defects remain
- Reports are generated correctly
- AI recommendations are meaningful and relevant

---

# 22. Regression Testing

Regression testing ensures that newly introduced features do not negatively impact existing functionality.

Regression tests should be executed:

- Before every release
- After significant refactoring
- After dependency upgrades
- Following bug fixes

---

## Regression Coverage

Include:

- Authentication
- Upload workflow
- AI pipeline
- Dashboard
- Recommendations
- Reports
- Knowledge graph

Automated regression testing should be integrated into the CI/CD pipeline.

---

# 23. Continuous Integration Testing

Automated testing should be executed for every code change.

---

## CI Pipeline

```text
Developer Commit

↓

GitHub Pull Request

↓

Static Analysis

↓

Unit Tests

↓

Integration Tests

↓

Build Application

↓

End-to-End Tests

↓

Deploy
```

Code should not be merged unless all mandatory quality gates pass successfully.

---

# 24. Test Coverage Goals

The project aims to maintain comprehensive test coverage while balancing development effort.

| Module | Target Coverage |
|---------|----------------:|
| Frontend Components | ≥ 80% |
| Backend Services | ≥ 90% |
| Utility Functions | ≥ 95% |
| API Endpoints | 100% |
| AI Pipeline | Critical Paths |
| End-to-End Workflows | All Primary Flows |

Coverage reports should be reviewed regularly to identify untested functionality.

---

# 25. Bug Reporting Workflow

All defects should be documented consistently.

---

## Bug Report Template

Include:

- Title
- Description
- Environment
- Steps to Reproduce
- Expected Result
- Actual Result
- Severity
- Screenshots (if applicable)

---

## Severity Levels

| Severity | Description |
|----------|-------------|
| Critical | Application unusable |
| High | Major functionality broken |
| Medium | Feature partially affected |
| Low | Cosmetic or minor issue |

---

# 26. Testing Checklist

Before a release, verify the following:

---

## Functional Testing

- Authentication
- File Upload
- Dashboard
- Recommendations
- Reports
- Knowledge Graph

---

## Non-Functional Testing

- Performance
- Accessibility
- Security
- Error Handling
- Responsive Design

---

## Quality Checks

- No critical defects
- Automated tests passing
- API validation complete
- AI output validated
- Documentation updated

---

# 27. Future Testing Improvements

Future versions of the project may include:

- Visual regression testing
- Snapshot testing
- Chaos engineering
- Cross-browser compatibility testing
- Mobile device testing
- AI output benchmarking
- Automated security scanning
- Continuous performance monitoring

These enhancements will strengthen the application's long-term reliability and maintainability.

---

# 28. Testing Strategy Summary

The CurricuAlign AI testing strategy combines automated testing, manual validation, and continuous quality assurance to ensure that every layer of the application functions correctly and reliably.

Testing encompasses frontend components, backend services, databases, APIs, AI processing pipelines, authentication, and complete user workflows. By integrating testing throughout the development lifecycle and enforcing automated quality gates, the project minimizes defects, improves maintainability, and increases confidence in every release.

This strategy supports the project's goals of delivering a secure, scalable, accessible, and production-ready application while providing a robust foundation for future enhancements.

---

## Testing Completion Checklist

| Section | Status |
|---------|:------:|
| Testing Objectives | ✅ |
| Testing Principles | ✅ |
| Testing Strategy | ✅ |
| Testing Stack | ✅ |
| Testing Environment | ✅ |
| Unit Testing | ✅ |
| Integration Testing | ✅ |
| API Testing | ✅ |
| Authentication Testing | ✅ |
| File Upload Testing | ✅ |
| Database Testing | ✅ |
| AI Pipeline Testing | ✅ |
| Frontend Testing | ✅ |
| End-to-End Testing | ✅ |
| Performance Testing | ✅ |
| Security Testing | ✅ |
| Accessibility Testing | ✅ |
| User Acceptance Testing | ✅ |
| Regression Testing | ✅ |
| CI Integration | ✅ |
| Test Coverage Goals | ✅ |
| Bug Reporting | ✅ |
| QA Checklist | ✅ |
| Future Improvements | ✅ |
| Ready for Implementation | ✅ |


