# DataMorph Website - Architecture Documentation

## 🏗 System Architecture

### Overview

DataMorph Website follows a modern, cloud-native architecture leveraging AWS services for scalability, reliability, and cost-effectiveness. The system is designed as a serverless, event-driven application with clear separation of concerns.

---

## 📐 Architecture Diagrams

### 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          End Users                                   │
│                    (Web Browsers / Mobile)                           │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTPS (Recommended) / HTTP
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     AWS S3 Static Website                            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  React SPA (Single Page Application)                          │  │
│  │  - HTML, CSS, JavaScript bundles                              │  │
│  │  - Images and static assets                                   │  │
│  │  - Client-side routing                                        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  Features:                                                            │
│  - Static website hosting                                            │
│  - Public read access                                                │
│  - SPA routing support                                               │
│  - Low latency delivery                                              │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ REST API Calls
                                │ (JSON over HTTP)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Flask API Server (EC2)                            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Gunicorn WSGI Server (6 workers)                             │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  Flask Application with CORS                            │  │  │
│  │  │                                                          │  │  │
│  │  │  Endpoints:                                             │  │  │
│  │  │  - POST /start                                          │  │  │
│  │  │  - GET  /get/logs/:run_id                              │  │  │
│  │  │  - POST /get/schemas                                    │  │  │
│  │  │  - POST /get/data                                       │  │  │
│  │  │  - POST /execute/query                                  │  │  │
│  │  │  - GET  /health                                         │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  Features:                                                            │
│  - RESTful API design                                                │
│  - CORS enabled                                                      │
│  - Request validation                                                │
│  - Error handling                                                    │
└─────────────────────────────────────────────────────────────────────┘
                    │                           │
                    │                           │
        ┌───────────┴──────────┐    ┌──────────┴──────────┐
        │                      │    │                     │
        ▼                      ▼    ▼                     ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  AWS Lambda      │  │  PostgreSQL      │  │  DynamoDB        │
│  (Orchestrator)  │  │  (RDS)           │  │  (Logs)          │
│                  │  │                  │  │                  │
│  - Specs Gen     │  │  - Source tables │  │  - Run logs      │
│  - Code Gen      │  │  - Target tables │  │  - Metadata      │
│  - Executor      │  │  - Metadata      │  │  - Timestamps    │
│  - Validator     │  │  - Schemas       │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
        │
        │
        ├─────────────┬─────────────┬─────────────┐
        │             │             │             │
        ▼             ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ AWS Bedrock  │ │ AWS Glue │ │   S3     │ │ Secrets  │
│ (Claude AI)  │ │ (ETL)    │ │ (Storage)│ │ Manager  │
│              │ │          │ │          │ │          │
│ - Code gen   │ │ - PySpark│ │ - Code   │ │ - Config │
│ - NLP        │ │ - Jobs   │ │ - Specs  │ │ - Creds  │
│ - Validation │ │ - Catalog│ │ - Data   │ │          │
└──────────────┘ └──────────┘ └──────────┘ └──────────┘
```

### 2. Frontend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Application                         │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    App.tsx (Root)                       │ │
│  │  - Router configuration                                 │ │
│  │  - Auth provider                                        │ │
│  │  - Global state                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│              ┌────────────┴────────────┐                    │
│              │                         │                    │
│              ▼                         ▼                    │
│  ┌──────────────────────┐  ┌──────────────────────┐       │
│  │   HomePage.tsx       │  │   LogsPage.tsx       │       │
│  │                      │  │                      │       │
│  │  - Hero section      │  │  - Log timeline      │       │
│  │  - Features          │  │  - Auto-refresh      │       │
│  │  - Team info         │  │  - Code display      │       │
│  │  - CTA buttons       │  │  - PDF export        │       │
│  └──────────────────────┘  └──────────────────────┘       │
│              │                         │                    │
│              ▼                         ▼                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Components Layer                         │  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │ AccessCode   │  │ PromptModal  │  │ TableView  │ │  │
│  │  │ Modal        │  │              │  │ Modal      │ │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │  │
│  │                                                        │  │
│  │  ┌──────────────┐                                     │  │
│  │  │ Protected    │                                     │  │
│  │  │ Route        │                                     │  │
│  │  └──────────────┘                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│              ┌────────────┴────────────┐                    │
│              │                         │                    │
│              ▼                         ▼                    │
│  ┌──────────────────────┐  ┌──────────────────────┐       │
│  │   Services Layer     │  │   Context Layer      │       │
│  │                      │  │                      │       │
│  │  - api.ts            │  │  - AuthContext       │       │
│  │  - HTTP client       │  │  - State management  │       │
│  │  - API calls         │  │  - Session storage   │       │
│  └──────────────────────┘  └──────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 3. Backend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Flask API (EC2)                           │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Gunicorn WSGI Server                   │ │
│  │  - 6 worker processes                                   │ │
│  │  - Load balancing                                       │ │
│  │  - Process management                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Flask Application (app.py)                 │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │           Middleware Layer                        │  │ │
│  │  │  - CORS (Flask-CORS)                             │  │ │
│  │  │  - Request logging                                │  │ │
│  │  │  - Error handling                                 │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │           Route Handlers                          │  │ │
│  │  │                                                    │  │ │
│  │  │  /start          → start_etl()                    │  │ │
│  │  │  /get/logs/:id   → get_logs()                     │  │ │
│  │  │  /get/schemas    → get_schemas()                  │  │ │
│  │  │  /get/data       → get_data()                     │  │ │
│  │  │  /execute/query  → execute_query()                │  │ │
│  │  │  /health         → health_check()                 │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │           Business Logic Layer                    │  │ │
│  │  │  - Request validation                             │  │ │
│  │  │  - Data transformation                            │  │ │
│  │  │  - Response formatting                            │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │           Data Access Layer                       │  │ │
│  │  │  - AWS SDK (boto3)                                │  │ │
│  │  │  - PostgreSQL (psycopg2)                          │  │ │
│  │  │  - Connection pooling                             │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                    │              │              │
                    ▼              ▼              ▼
        ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
        │   Lambda     │  │  PostgreSQL  │  │  DynamoDB    │
        │ Orchestrator │  │     RDS      │  │              │
        └──────────────┘  └──────────────┘  └──────────────┘
```

### 4. Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ETL Workflow Data Flow                    │
└─────────────────────────────────────────────────────────────┘

1. User Submits Prompt
   │
   ├─→ React Component (PromptModal)
   │   └─→ Validates input
   │       └─→ Shows loading state
   │
   ├─→ API Service (api.ts)
   │   └─→ POST /start
   │       └─→ Timeout: 400s
   │
   ├─→ Flask API (EC2)
   │   └─→ Validates request
   │       └─→ Generates run_id
   │           └─→ Invokes Lambda
   │
   ├─→ Lambda Orchestrator
   │   │
   │   ├─→ Step 1: Specs Generator
   │   │   └─→ Bedrock (Claude AI)
   │   │       └─→ Generates ETL specs
   │   │           └─→ Stores in S3
   │   │               └─→ Logs to DynamoDB
   │   │
   │   ├─→ Step 2: Fetch Source Data
   │   │   └─→ PostgreSQL RDS
   │   │       └─→ Get schemas
   │   │           └─→ Get sample data
   │   │               └─→ Logs to DynamoDB
   │   │
   │   ├─→ Step 3: Code Generator
   │   │   └─→ Bedrock (Claude AI)
   │   │       └─→ Generates PySpark code
   │   │           └─→ Stores in S3
   │   │               └─→ Logs to DynamoDB
   │   │
   │   ├─→ Step 4: Glue Executor
   │   │   └─→ Creates Glue job
   │   │       └─→ Executes PySpark
   │   │           └─→ Transforms data
   │   │               └─→ Loads to target table
   │   │                   └─→ Logs to DynamoDB
   │   │
   │   └─→ Step 5: Validator
   │       └─→ Bedrock (Claude AI)
   │           └─→ Generates validation code
   │               └─→ Executes validation
   │                   └─→ Checks data quality
   │                       └─→ Logs to DynamoDB
   │
   ├─→ Response to Flask API
   │   └─→ Success/Failure status
   │       └─→ run_id
   │           └─→ Execution details
   │
   └─→ Response to React
       └─→ Navigate to LogsPage
           └─→ Display run_id
               └─→ Start auto-refresh

2. User Views Logs
   │
   ├─→ React Component (LogsPage)
   │   └─→ Fetches logs every 30s
   │
   ├─→ API Service (api.ts)
   │   └─→ GET /get/logs/:run_id
   │
   ├─→ Flask API (EC2)
   │   └─→ Queries DynamoDB
   │       └─→ Parses log format
   │           └─→ Returns JSON
   │
   └─→ React Component
       └─→ Displays timeline
           └─→ Formats code blocks
               └─→ Enables copy button
                   └─→ Auto-refreshes
```

### 5. Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
└─────────────────────────────────────────────────────────────┘

Layer 1: Frontend Security
┌─────────────────────────────────────────────────────────────┐
│  - Access code authentication                                │
│  - Session storage (client-side)                             │
│  - Protected routes (React Router)                           │
│  - Input validation                                          │
│  - XSS prevention (React escaping)                           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
Layer 2: Network Security
┌─────────────────────────────────────────────────────────────┐
│  - CORS configuration                                        │
│  - Origin validation                                         │
│  - Request timeout                                           │
│  - HTTPS (recommended)                                       │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
Layer 3: API Security
┌─────────────────────────────────────────────────────────────┐
│  - Request validation                                        │
│  - Error handling                                            │
│  - Rate limiting (future)                                    │
│  - API keys (future)                                         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
Layer 4: AWS Security
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐   │
│  │  IAM (Identity & Access Management)                  │   │
│  │  - Service roles                                     │   │
│  │  - Least privilege policies                          │   │
│  │  - Resource-based policies                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  VPC (Virtual Private Cloud)                         │   │
│  │  - Security groups                                   │   │
│  │  - Network ACLs                                      │   │
│  │  - Private subnets (RDS)                             │   │
│  │  - Public subnets (EC2)                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Encryption                                           │   │
│  │  - RDS encryption at rest                            │   │
│  │  - S3 encryption                                     │   │
│  │  - DynamoDB encryption                               │   │
│  │  - TLS in transit                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
Layer 5: Data Security
┌─────────────────────────────────────────────────────────────┐
│  - Database credentials in Secrets Manager                   │
│  - No sensitive data in frontend                             │
│  - Secure connection strings                                 │
│  - Audit logging                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Component Interactions

### 1. Authentication Flow

```
User → AccessCodeModal → AuthContext → SessionStorage
                              │
                              ├─→ isAuthenticated = true
                              │
                              └─→ ProtectedRoute allows access
                                      │
                                      └─→ LogsPage renders
```

### 2. ETL Submission Flow

```
User Input
    │
    ├─→ PromptModal (validation)
    │       │
    │       └─→ api.startETL()
    │               │
    │               └─→ POST /start
    │                       │
    │                       └─→ Flask API
    │                               │
    │                               └─→ Lambda Orchestrator
    │                                       │
    │                                       ├─→ Specs Generator
    │                                       ├─→ Code Generator
    │                                       ├─→ Glue Executor
    │                                       └─→ Validator
    │                                               │
    │                                               └─→ DynamoDB (logs)
    │
    └─→ Navigate to LogsPage with run_id
```

### 3. Log Viewing Flow

```
LogsPage Component
    │
    ├─→ useEffect (on mount)
    │       │
    │       └─→ fetchLogs(run_id)
    │               │
    │               └─→ api.getLogs()
    │                       │
    │                       └─→ GET /get/logs/:run_id
    │                               │
    │                               └─→ Flask API
    │                                       │
    │                                       └─→ DynamoDB query
    │                                               │
    │                                               └─→ Parse & format
    │                                                       │
    │                                                       └─→ Return JSON
    │
    ├─→ Display logs in timeline
    │       │
    │       ├─→ Format timestamps
    │       ├─→ Color-code by type
    │       ├─→ Render code blocks
    │       └─→ Add copy buttons
    │
    └─→ Auto-refresh (every 30s)
            │
            └─→ Repeat fetchLogs()
```

---

## 📦 Deployment Architecture

### Production Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                    Production Environment                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  CloudFront CDN (Optional)                                   │
│  - Global edge locations                                     │
│  - SSL/TLS termination                                       │
│  - Caching                                                   │
│  - DDoS protection                                           │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  S3 Static Website                                           │
│  - React build artifacts                                     │
│  - Images and assets                                         │
│  - Public read access                                        │
│  - Website hosting enabled                                   │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  Application Load Balancer (Optional)                        │
│  - Health checks                                             │
│  - SSL termination                                           │
│  - Auto-scaling integration                                  │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  EC2 Auto Scaling Group                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │
│  │  EC2 Instance  │  │  EC2 Instance  │  │  EC2 Instance  │ │
│  │  (Flask API)   │  │  (Flask API)   │  │  (Flask API)   │ │
│  └────────────────┘  └────────────────┘  └────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  RDS Multi-AZ                                                │
│  ┌────────────────┐          ┌────────────────┐             │
│  │  Primary DB    │  ──────→ │  Standby DB    │             │
│  │  (PostgreSQL)  │          │  (PostgreSQL)  │             │
│  └────────────────┘          └────────────────┘             │
└──────────────────────────────────────────────────────────────┘
```

### Current Deployment (Simplified)

```
S3 Static Website → EC2 (Flask) → Lambda → RDS/DynamoDB
```

---

## 🔧 Technology Stack Details

### Frontend Stack

```
React 18.2.0
├── TypeScript 4.9.5
├── React Router 6.x
├── Axios 1.6.0
├── jsPDF 2.5.1
├── html2canvas 1.4.1
└── Custom CSS
```

### Backend Stack

```
Flask 3.0.0
├── Flask-CORS 4.0.0
├── Gunicorn (WSGI)
├── boto3 (AWS SDK)
├── psycopg2-binary 2.9.9
└── Python 3.10
```

### AWS Services

```
Compute:
├── Lambda (Serverless functions)
├── EC2 (API hosting)
└── Glue (ETL execution)

Storage:
├── S3 (Static hosting, code storage)
├── RDS PostgreSQL (Relational data)
└── DynamoDB (Logs, NoSQL)

AI/ML:
└── Bedrock (Claude Sonnet 4.5)

Security:
├── IAM (Access management)
├── Secrets Manager (Credentials)
└── VPC (Network isolation)

Monitoring:
├── CloudWatch (Logs, metrics)
└── CloudTrail (Audit logs)
```

---

## 📊 Scalability Considerations

### Horizontal Scaling

```
Current: Single EC2 instance
Future:  Auto Scaling Group
         ├── Min: 2 instances
         ├── Max: 10 instances
         └── Target: CPU 70%
```

### Vertical Scaling

```
Current: t3.micro
Options: t3.small → t3.medium → t3.large
```

### Database Scaling

```
Current: Single RDS instance
Options: 
├── Read replicas
├── Multi-AZ deployment
└── Larger instance types
```

### Caching Strategy

```
Future Enhancements:
├── CloudFront CDN
├── ElastiCache (Redis)
├── API response caching
└── Database query caching
```

---

## 🔍 Monitoring & Observability

### Metrics to Track

```
Frontend:
├── Page load time
├── Time to interactive
├── Error rate
└── User sessions

Backend:
├── API response time
├── Request rate
├── Error rate
└── CPU/Memory usage

ETL:
├── Execution time
├── Success rate
├── Cost per pipeline
└── Data volume processed
```

### Logging Strategy

```
Application Logs:
├── Flask API logs
├── Lambda execution logs
├── Glue job logs
└── Frontend console logs

Audit Logs:
├── CloudTrail (AWS API calls)
├── DynamoDB access logs
└── RDS query logs
```

---

## 🚀 Performance Optimization

### Frontend Optimizations

- Code splitting
- Lazy loading
- Image optimization
- Minification & compression
- CDN delivery

### Backend Optimizations

- Connection pooling
- Query optimization
- Caching
- Async processing
- Load balancing

### Database Optimizations

- Indexing
- Query optimization
- Connection pooling
- Read replicas
- Partitioning

---

## 📝 Architecture Decisions

### Why React?
- Component reusability
- Large ecosystem
- Virtual DOM performance
- Strong TypeScript support

### Why Flask?
- Lightweight and fast
- Easy to deploy
- Python ecosystem
- Good for microservices

### Why AWS?
- Comprehensive service offering
- Serverless capabilities
- Global infrastructure
- Cost-effective

### Why Serverless?
- Auto-scaling
- Pay-per-use
- No server management
- High availability

---

**Last Updated:** October 13, 2025  
**Version:** 1.0.0
