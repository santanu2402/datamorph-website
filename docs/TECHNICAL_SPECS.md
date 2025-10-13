# DataMorph Website - Technical Specifications

## 📋 Document Information

**Version:** 1.0.0  
**Last Updated:** October 13, 2025  
**Status:** Production Ready  
**Team:** Elastic Thinkers

---

## 🎯 Technical Overview

DataMorph Website is a production-ready, cloud-native web application built with React and TypeScript, deployed on AWS infrastructure. It provides an intuitive interface for AI-powered ETL pipeline generation and monitoring.

---

## 🛠 Technology Stack

### Frontend Technologies

#### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 4.9.5 | Type safety |
| React Router | 6.x | Client-side routing |
| Axios | 1.6.0 | HTTP client |
| jsPDF | 2.5.1 | PDF generation |
| html2canvas | 1.4.1 | HTML to canvas |

#### Build Tools
| Tool | Version | Purpose |
|------|---------|---------|
| Create React App | 5.0.1 | Build configuration |
| Webpack | 5.x | Module bundling |
| Babel | 7.x | JavaScript transpilation |
| ESLint | 8.x | Code linting |

### Backend Technologies

#### API Server
| Technology | Version | Purpose |
|------------|---------|---------|
| Flask | 3.0.0 | Web framework |
| Flask-CORS | 4.0.0 | CORS handling |
| Gunicorn | Latest | WSGI server |
| Python | 3.10 | Runtime |

#### Database & Storage
| Service | Type | Purpose |
|---------|------|---------|
| PostgreSQL | RDS | Relational data |
| DynamoDB | NoSQL | Log storage |
| S3 | Object storage | Code & assets |

#### AWS Services
| Service | Purpose |
|---------|---------|
| Lambda | Serverless orchestration |
| Glue | ETL execution |
| Bedrock | AI/ML (Claude) |
| EC2 | API hosting |
| IAM | Access management |
| Secrets Manager | Credential storage |

---

## 📐 System Requirements

### Development Environment

#### Minimum Requirements
- **OS:** macOS, Linux, or Windows 10+
- **Node.js:** 16.x or higher
- **npm:** 8.x or higher
- **RAM:** 4 GB
- **Disk Space:** 2 GB

#### Recommended Requirements
- **OS:** macOS or Linux
- **Node.js:** 18.x LTS
- **npm:** 9.x
- **RAM:** 8 GB
- **Disk Space:** 5 GB
- **IDE:** VS Code with TypeScript support

### Production Environment

#### Frontend (S3)
- **Storage:** 500 MB
- **Bandwidth:** 10 GB/month (estimated)
- **Requests:** 100,000/month (estimated)

#### Backend (EC2)
- **Instance Type:** t3.micro or higher
- **vCPU:** 2
- **RAM:** 1 GB minimum, 2 GB recommended
- **Storage:** 8 GB EBS
- **OS:** Ubuntu 22.04 LTS

#### Database (RDS)
- **Instance Type:** db.t3.micro or higher
- **Storage:** 20 GB SSD
- **Backup:** 7-day retention
- **Multi-AZ:** Optional (recommended for production)

---

## 🏗 Application Structure

### Directory Structure

```
datamorph-website/
├── public/
│   ├── images/                    # Static images
│   │   ├── datamorph-logo-usage.svg
│   │   ├── santanu-circular-profile-picture.svg
│   │   ├── tanmana-circular-profile-picture.png
│   │   ├── anuska-circular-profile-picture.png
│   │   └── srinjoy-circular-profile-picture.png
│   ├── index.html                 # HTML template
│   └── manifest.json              # PWA manifest
│
├── src/
│   ├── components/                # Reusable components
│   │   ├── AccessCodeModal.tsx    # Authentication modal
│   │   ├── AccessCodeModal.css
│   │   ├── PromptModal.tsx        # ETL prompt input
│   │   ├── PromptModal.css
│   │   ├── TableViewModal.tsx     # Data viewer
│   │   ├── TableViewModal.css
│   │   └── ProtectedRoute.tsx     # Route guard
│   │
│   ├── pages/                     # Page components
│   │   ├── HomePage.tsx           # Landing page
│   │   ├── HomePage.css
│   │   ├── LogsPage.tsx           # Log viewer
│   │   └── LogsPage.css
│   │
│   ├── services/                  # API services
│   │   └── api.ts                 # API client
│   │
│   ├── context/                   # React context
│   │   └── AuthContext.tsx        # Auth state
│   │
│   ├── App.tsx                    # Root component
│   ├── App.css                    # Global styles
│   ├── index.tsx                  # Entry point
│   └── index.css                  # Base styles
│
├── docs/                          # Documentation
│   ├── OVERVIEW.md
│   ├── ARCHITECTURE.md
│   └── TECHNICAL_SPECS.md
│
├── build/                         # Production build (generated)
├── node_modules/                  # Dependencies (generated)
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript config
├── README.md                      # Project readme
├── DEPLOYMENT.md                  # Deployment guide
└── QUICKSTART.md                  # Quick start guide
```

---

## 🔌 API Specifications

### Base URL
```
Production: http://54.227.34.230
Development: http://localhost:5000
```

### Endpoints

#### 1. Start ETL Workflow
```
POST /start

Request:
{
  "prompt": "string (required)"
}

Response (200 OK):
{
  "status": "success",
  "run_id": "string",
  "message": "string",
  "details": {
    "glue_code_path": "string",
    "specs_path": "string",
    "target_table": "string",
    "validation_status": "string"
  }
}

Response (400 Bad Request):
{
  "status": "error",
  "message": "Missing prompt in request body"
}

Response (500 Internal Server Error):
{
  "status": "error",
  "message": "string",
  "run_id": "string"
}

Timeout: 400 seconds
```

#### 2. Get Logs
```
GET /get/logs/:run_id

Parameters:
- run_id: string (path parameter)

Response (200 OK):
{
  "status": "success",
  "run_id": "string",
  "logs": [
    {
      "timestamp": "ISO 8601 string",
      "type": "string",
      "title": "string",
      "description": "string",
      "metadata": {}
    }
  ],
  "created_at": "string",
  "updated_at": "string",
  "log_count": number
}

Response (404 Not Found):
{
  "status": "error",
  "message": "No logs found for run_id: {run_id}"
}
```

#### 3. Get Table Schemas
```
POST /get/schemas

Request:
{
  "table_names": ["string"]
}

Response (200 OK):
{
  "status": "success",
  "schemas": {
    "table_name": {
      "columns": [
        {
          "column_name": "string",
          "data_type": "string",
          "is_nullable": "string",
          "column_default": "string"
        }
      ]
    }
  }
}
```

#### 4. Get Table Data
```
POST /get/data

Request:
{
  "table_names": ["string"],
  "limit": number (optional, default: 10)
}

Response (200 OK):
{
  "status": "success",
  "data": {
    "table_name": [
      {
        "column1": "value1",
        "column2": "value2"
      }
    ]
  }
}
```

#### 5. Execute Query
```
POST /execute/query

Request:
{
  "query": "string (SQL query)"
}

Response (200 OK) - SELECT:
{
  "status": "success",
  "results": [{}],
  "row_count": number
}

Response (200 OK) - INSERT/UPDATE/DELETE:
{
  "status": "success",
  "message": "Query executed successfully",
  "affected_rows": number
}
```

#### 6. Health Check
```
GET /health

Response (200 OK):
{
  "status": "healthy",
  "service": "DataMorph Flask API",
  "timestamp": "ISO 8601 string",
  "version": "string"
}
```

---

## 🎨 UI/UX Specifications

### Design System

#### Color Palette
```css
/* Primary Colors */
--primary-purple: #667eea
--primary-dark: #764ba2

/* Text Colors */
--text-dark: #2d3748
--text-light: #718096

/* Background Colors */
--bg-light: #f7fafc
--bg-white: #ffffff

/* Status Colors */
--success: #48bb78
--error: #f56565
--warning: #ed8936
--info: #4299e1
```

#### Typography
```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif

/* Font Sizes */
--font-xs: 0.75rem    /* 12px */
--font-sm: 0.875rem   /* 14px */
--font-base: 1rem     /* 16px */
--font-lg: 1.125rem   /* 18px */
--font-xl: 1.25rem    /* 20px */
--font-2xl: 1.5rem    /* 24px */
--font-3xl: 1.875rem  /* 30px */
--font-4xl: 2.25rem   /* 36px */

/* Font Weights */
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

#### Spacing
```css
/* Spacing Scale */
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
```

#### Breakpoints
```css
/* Responsive Breakpoints */
--mobile: 320px
--tablet: 768px
--desktop: 1024px
--wide: 1280px
```

### Component Specifications

#### Button Styles
```css
.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.125rem;
}
```

#### Card Styles
```css
.card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}
```

#### Modal Styles
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
```

---

## 🔐 Security Specifications

### Authentication

#### Access Code
```typescript
const CORRECT_ACCESS_CODE = 'tansrianusan';
const AUTH_KEY = 'datamorph_auth';

// Stored in: sessionStorage
// Cleared on: Browser close or logout
```

#### Session Management
```typescript
// Set session
sessionStorage.setItem(AUTH_KEY, 'true');

// Check session
const isAuth = sessionStorage.getItem(AUTH_KEY) === 'true';

// Clear session
sessionStorage.removeItem(AUTH_KEY);
```

### CORS Configuration

```python
CORS(app, origins=[
    'http://localhost:3000',
    'http://localhost:3001',
    'http://datamorph-website-2025.s3-website-us-east-1.amazonaws.com',
    'https://*.amazonaws.com',
    'https://*.amplifyapp.com',
    'https://*.netlify.app',
    'https://*.vercel.app'
])
```

### API Security

#### Request Validation
- Content-Type: application/json
- Request body validation
- SQL injection prevention
- XSS prevention (React escaping)

#### Timeout Configuration
```typescript
axios.post(url, data, {
  timeout: 400000  // 400 seconds
})
```

---

## 📊 Performance Specifications

### Frontend Performance

#### Target Metrics
| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | ~1s |
| Time to Interactive | < 3s | ~2.5s |
| Total Bundle Size | < 500 KB | 277 KB |
| Lighthouse Score | > 90 | 92 |

#### Optimization Techniques
- Code splitting
- Lazy loading
- Image optimization
- Minification
- Gzip compression

### Backend Performance

#### Target Metrics
| Endpoint | Target | Current |
|----------|--------|---------|
| /health | < 100ms | ~50ms |
| /start | < 180s | 90-180s |
| /get/logs | < 500ms | ~300ms |
| /execute/query | < 5s | 1-5s |

#### Optimization Techniques
- Connection pooling
- Query optimization
- Caching (future)
- Load balancing (future)

---

## 🧪 Testing Specifications

### Unit Testing
```bash
# Run tests
npm test

# Coverage
npm run test:coverage
```

### Integration Testing
```bash
# API tests
pytest tests/

# E2E tests (future)
npm run test:e2e
```

### Manual Testing Checklist

#### Frontend
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Navigation works
- [ ] Modals open/close
- [ ] Forms validate input
- [ ] Responsive design works

#### Authentication
- [ ] Access code validation
- [ ] Session persistence
- [ ] Protected routes work
- [ ] Logout functionality

#### ETL Workflow
- [ ] Prompt submission
- [ ] Loading states
- [ ] Error handling
- [ ] Navigation to logs

#### Logs Page
- [ ] Logs display correctly
- [ ] Auto-refresh works
- [ ] Code formatting
- [ ] Copy button works
- [ ] PDF export works

---

## 📦 Build & Deployment

### Build Process

```bash
# Install dependencies
npm install

# Development build
npm start

# Production build
npm run build

# Output directory
build/
```

### Build Configuration

```json
{
  "homepage": "/",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Deployment Steps

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Deploy to S3**
   ```bash
   aws s3 sync build/ s3://datamorph-website-2025 --delete
   ```

3. **Configure S3**
   ```bash
   aws s3 website s3://datamorph-website-2025 \
     --index-document index.html \
     --error-document index.html
   ```

4. **Set Permissions**
   ```bash
   aws s3api put-bucket-policy \
     --bucket datamorph-website-2025 \
     --policy file://bucket-policy.json
   ```

---

## 🔍 Monitoring & Logging

### Frontend Logging
```typescript
// Console logging
console.log('Info message');
console.error('Error message');
console.warn('Warning message');

// Error boundaries (future)
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Backend Logging
```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("Info message")
logger.error("Error message")
logger.warning("Warning message")
```

### Metrics to Track
- Page views
- User sessions
- API calls
- Error rates
- Response times
- ETL executions

---

## 🚀 Future Enhancements

### Phase 1 (1-3 months)
- HTTPS/SSL
- Custom domain
- CloudFront CDN
- Enhanced authentication
- Syntax highlighting

### Phase 2 (3-6 months)
- Real-time collaboration
- Advanced analytics
- Webhook support
- Scheduled pipelines
- Cost tracking

### Phase 3 (6-12 months)
- Mobile apps
- Multi-cloud support
- Plugin system
- Enterprise features
- AI enhancements

---

## 📞 Support & Maintenance

### Version Control
- **Repository:** GitHub (private)
- **Branching:** main, develop, feature/*
- **Releases:** Semantic versioning

### Maintenance Schedule
- **Security updates:** Weekly
- **Dependency updates:** Monthly
- **Feature releases:** Quarterly
- **Bug fixes:** As needed

### Support Channels
- **Email:** team@datamorph.com
- **LinkedIn:** Team member profiles
- **Documentation:** /docs folder
- **Issues:** GitHub Issues

---

**Document Version:** 1.0.0  
**Last Updated:** October 13, 2025  
**Next Review:** January 13, 2026
