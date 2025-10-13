# DataMorph Website - Setup Guide

Complete guide to set up and run the DataMorph Website locally and in production.

---

## 📋 Prerequisites

### Required Software

- **Node.js**: >= 16.x (18.x recommended)
- **npm**: >= 8.x (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### Optional Tools

- **AWS CLI**: For deployment to AWS
- **Docker**: For containerized development
- **Postman**: For API testing

---

## 🚀 Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/datamorph-website.git

# Navigate to project directory
cd datamorph-website
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# This will install:
# - React and React DOM
# - TypeScript
# - React Router
# - Axios
# - jsPDF and html2canvas
# - And all other dependencies
```

### Step 3: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env  # or use your preferred editor
```

**Required Environment Variables:**

```env
# API Configuration
REACT_APP_API_URL=http://your-api-endpoint.com

# Authentication
REACT_APP_ACCESS_CODE=your-access-code
```

**Optional Environment Variables:**

```env
# Google Analytics
REACT_APP_GA_ID=UA-XXXXXXXXX-X

# Sentry Error Tracking
REACT_APP_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Feature Flags
REACT_APP_ENABLE_PDF_EXPORT=true
REACT_APP_ENABLE_TABLE_VIEWER=true
```

### Step 4: Start Development Server

```bash
# Start the development server
npm start

# The application will open at http://localhost:3000
# Hot reload is enabled - changes will reflect automatically
```

### Step 5: Verify Setup

1. Open http://localhost:3000 in your browser
2. You should see the DataMorph homepage
3. Click "Try Our Agent" button
4. Enter your access code
5. Try submitting an ETL prompt

---

## 🏗 Project Structure

```
datamorph-website/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── public/
│   ├── images/            # Static images
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable components
│   │   ├── AccessCodeModal.tsx
│   │   ├── PromptModal.tsx
│   │   ├── TableViewModal.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/             # Page components
│   │   ├── HomePage.tsx
│   │   └── LogsPage.tsx
│   ├── services/          # API services
│   │   └── api.ts
│   ├── context/           # React context
│   │   └── AuthContext.tsx
│   ├── App.tsx            # Root component
│   ├── App.css            # Global styles
│   ├── index.tsx          # Entry point
│   └── index.css          # Base styles
├── docs/                  # Documentation
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- HomePage.test.tsx
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Type Checking

```bash
# Run TypeScript compiler check
npx tsc --noEmit
```

---

## 📦 Building for Production

### Create Production Build

```bash
# Create optimized production build
npm run build

# Output will be in the 'build' folder
# Files are minified and optimized
```

### Test Production Build Locally

```bash
# Install serve globally
npm install -g serve

# Serve the production build
serve -s build

# Open http://localhost:3000
```

### Build Optimization

The production build includes:

- ✅ Code minification
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Gzip compression
- ✅ Source maps (for debugging)

---

## 🚀 Deployment

### Option 1: AWS S3 + CloudFront

#### Prerequisites
- AWS account
- AWS CLI configured
- S3 bucket created

#### Deploy

```bash
# Build the application
npm run build

# Deploy to S3
aws s3 sync build/ s3://your-bucket-name --delete

# Configure S3 for static website hosting
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html

# Set bucket policy for public access
aws s3api put-bucket-policy \
  --bucket your-bucket-name \
  --policy file://bucket-policy.json
```

#### CloudFront Setup (Optional)

```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name your-bucket-name.s3.amazonaws.com \
  --default-root-object index.html
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the application
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

### Option 3: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

### Option 4: AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Publish
amplify publish
```

---

## 🔧 Configuration

### API Configuration

Update `src/services/api.ts`:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

### Authentication Configuration

Update `src/context/AuthContext.tsx`:

```typescript
const CORRECT_ACCESS_CODE = process.env.REACT_APP_ACCESS_CODE || 'default-code';
```

### Routing Configuration

Update `src/App.tsx` for custom routes:

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/logs" element={<ProtectedRoute><LogsPage /></ProtectedRoute>} />
  <Route path="/custom" element={<CustomPage />} />
</Routes>
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Error: Port 3000 is already in use

# Solution: Kill the process or use a different port
PORT=3001 npm start
```

#### 2. Module Not Found

```bash
# Error: Cannot find module 'xyz'

# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 3. Build Fails

```bash
# Error: Build failed

# Solution: Clear cache and rebuild
npm run build -- --reset-cache
```

#### 4. Environment Variables Not Working

```bash
# Issue: Environment variables not loading

# Solution: Restart development server
# Environment variables are loaded at startup
```

#### 5. CORS Errors

```bash
# Error: CORS policy blocked

# Solution: Configure CORS on your API server
# Or use a proxy in package.json:
"proxy": "http://your-api-endpoint.com"
```

---

## 🔐 Security Setup

### Production Security Checklist

- [ ] Use HTTPS/SSL certificates
- [ ] Implement server-side authentication
- [ ] Configure proper CORS settings
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting on API
- [ ] Implement Content Security Policy
- [ ] Regular security audits
- [ ] Keep dependencies updated

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

---

## 📊 Monitoring

### Performance Monitoring

```bash
# Analyze bundle size
npm run build -- --stats

# Use webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
```

### Error Tracking

Integrate Sentry for error tracking:

```bash
npm install @sentry/react

# Configure in src/index.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
});
```

---

## 🤝 Development Workflow

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add your feature"

# Push to remote
git push origin feature/your-feature

# Create pull request on GitHub
```

### Code Review Process

1. Create pull request
2. Automated tests run
3. Code review by team member
4. Address feedback
5. Merge to main branch
6. Automatic deployment (if configured)

---

## 📞 Support

### Getting Help

- **Documentation**: Check `/docs` folder
- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Email**: team@datamorph.com

### Useful Commands

```bash
# Development
npm start              # Start dev server
npm test               # Run tests
npm run build          # Create production build

# Maintenance
npm install            # Install dependencies
npm update             # Update dependencies
npm audit              # Check security
npm run lint           # Run linter

# Deployment
npm run build          # Build for production
serve -s build         # Test production build
```

---

## ✅ Setup Verification

After setup, verify everything works:

- [ ] Development server starts without errors
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Navigation works
- [ ] Access code modal opens
- [ ] ETL prompt can be submitted
- [ ] Logs page displays
- [ ] Tests pass
- [ ] Build completes successfully

---

## 🎉 Next Steps

1. **Customize**: Update branding and content
2. **Configure**: Set up your API endpoint
3. **Test**: Run all tests and verify functionality
4. **Deploy**: Choose deployment platform
5. **Monitor**: Set up monitoring and analytics
6. **Iterate**: Gather feedback and improve

---

**Happy Coding! 🚀**

---

**Last Updated**: October 13, 2025  
**Version**: 1.0.0
