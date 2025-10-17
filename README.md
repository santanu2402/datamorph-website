<div align="center">

# 🚀 DataMorph Website

### AI-Powered ETL Pipeline Interface

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Transform Natural Language into Production-Ready ETL Pipelines in Seconds**

[Live Demo](#-live-demo) • [Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Team](#-team)

</div>

---

## 📖 Overview

DataMorph Website is a modern, responsive web application that provides an intuitive interface for AI-powered ETL (Extract, Transform, Load) automation. Built with React and TypeScript, it enables users to create production-ready data pipelines using natural language prompts.

### ✨ Key Highlights

- 🤖 **AI-Powered**: Leverages Claude Sonnet 4.5 for intelligent code generation
- ⚡ **Lightning Fast**: Complete ETL workflows in 90-180 seconds
- 💰 **Cost-Effective**: Only $0.30 per pipeline execution
- 🔄 **Self-Healing**: 95% success rate with automatic error correction
- 📊 **Real-Time Monitoring**: Live log streaming and execution tracking
- 💻 **Professional Code Display**: Syntax-highlighted PySpark code with copy functionality

---

## 🎯 Features

### 🏠 Landing Page
- **Hero Section** with compelling value proposition
- **Feature Showcase** highlighting AI capabilities
- **How It Works** step-by-step process
- **Team Profiles** with LinkedIn integration
- **Responsive Design** for all devices

### 🔐 Authentication
- **Access Code Protection** for secure access
- **Session Management** with persistent login
- **Protected Routes** for sensitive pages

### 🚀 ETL Workflow
- **Natural Language Input** - Describe your ETL in plain English
- **Real-Time Execution** - Watch your pipeline execute live
- **Instant Feedback** - Get immediate results and validation

### 📊 Logs Viewer
- **Timeline Visualization** - Chronological log display
- **Code Formatting** - Professional syntax highlighting
- **Auto-Refresh** - Updates every 30 seconds
- **PDF Export** - Download logs for documentation
- **Copy Functionality** - One-click code copying

### 📱 Responsive Design
- **Mobile-Friendly** - Works on all screen sizes
- **Touch-Optimized** - Intuitive touch interactions
- **Fast Loading** - Optimized bundle size (277 KB gzipped)

---

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - Modern UI framework
- **TypeScript 4.9.5** - Type-safe development
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **jsPDF & html2canvas** - PDF export functionality

### Backend Integration
- **Flask API** - RESTful API server
- **AWS Lambda** - Serverless orchestration
- **AWS Glue** - ETL job execution
- **AWS Bedrock** - Claude AI integration
- **PostgreSQL** - Data storage
- **DynamoDB** - Log storage

### Build Tools
- **Create React App** - Build configuration
- **Webpack** - Module bundling
- **Babel** - JavaScript transpilation
- **ESLint** - Code linting

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 16.x
npm >= 8.x
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/datamorph-website.git

# Navigate to project directory
cd datamorph-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables
# Edit .env with your API URL and access code
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://your-api-endpoint.com

# Authentication
REACT_APP_ACCESS_CODE=your-access-code

# Optional: Analytics
REACT_APP_GA_ID=your-google-analytics-id
```

### Development

```bash
# Start development server
npm start

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Create optimized production build
npm run build

# The build folder is ready to be deployed
```

---

## 📦 Deployment

### AWS S3 + CloudFront (Recommended)

```bash
# Build the application
npm run build

# Deploy to S3
aws s3 sync build/ s3://your-bucket-name --delete

# Configure S3 for static website hosting
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

### Other Deployment Options

- **AWS Amplify** - Automated CI/CD
- **Netlify** - One-click deployment
- **Vercel** - Optimized for React
- **AWS EC2** - Full control with Nginx

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 📊 Performance

### Metrics

| Metric | Target | Achieved |
|--------|--------|----------|
| First Contentful Paint | < 1.5s | ~1s ✅ |
| Time to Interactive | < 3s | ~2.5s ✅ |
| Bundle Size (gzipped) | < 500 KB | 277 KB ✅ |
| Lighthouse Score | > 90 | 92 ✅ |

### Optimization Techniques

- ✅ Code splitting
- ✅ Lazy loading
- ✅ Image optimization
- ✅ Minification & compression
- ✅ Tree shaking

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[OVERVIEW.md](./docs/OVERVIEW.md)** - Complete project overview
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture and design
- **[TECHNICAL_SPECS.md](./docs/TECHNICAL_SPECS.md)** - Technical specifications
- **[BUSINESS_VALUE.md](./docs/BUSINESS_VALUE.md)** - Business value and ROI
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide

---

## 🎨 Screenshots

### Homepage
![Homepage](./docs/images/homepage-screenshot.png)
*Modern landing page with feature showcase*

### ETL Workflow
![ETL Workflow](./docs/images/workflow-screenshot.png)
*Natural language prompt submission*

### Logs Viewer
![Logs Viewer](./docs/images/logs-screenshot.png)
*Real-time log monitoring with code display*

---

## 🏗 Project Structure

```
datamorph-website/
├── public/                 # Static assets
│   ├── images/            # Images and logos
│   └── index.html         # HTML template
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
│   └── index.tsx          # Entry point
├── docs/                  # Documentation
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📈 Roadmap

### Phase 1 (Q1 2026)
- [ ] HTTPS/SSL implementation
- [ ] Custom domain setup
- [ ] CloudFront CDN integration
- [ ] Enhanced authentication (OAuth 2.0)
- [ ] Syntax highlighting improvements

### Phase 2 (Q2 2026)
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Webhook support
- [ ] Scheduled pipeline execution
- [ ] Cost tracking and optimization

### Phase 3 (Q3-Q4 2026)
- [ ] Mobile applications (iOS/Android)
- [ ] Multi-cloud support (Azure, GCP)
- [ ] Plugin system
- [ ] Enterprise features (SSO, RBAC)
- [ ] AI model customization

---

## 🐛 Known Issues

- Access code is currently client-side only (recommend server-side auth for production)
- PDF export may have layout issues on very long logs
- Auto-refresh stops after 10 minutes (by design)

See [Issues](https://github.com/yourusername/datamorph-website/issues) for more details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

### Team Elastic Thinkers

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/santanu-mandal-346a41238">
        <img src="https://res.cloudinary.com/dxrufinml/image/upload/v1760683016/santanu-circular-profile-picture_ojaqn4.png" width="100px;" alt="Santanu Mandal"/><br />
        <sub><b>Santanu Mandal</b></sub>
      </a><br />
      <sub>Lead Developer</sub>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/tanmana-das-b9b533229">
        <img src="https://res.cloudinary.com/dxrufinml/image/upload/v1760683012/tanmana-circular-profile-picture_duwvtm.png" width="100px;" alt="Tanmana Das"/><br />
        <sub><b>Tanmana Das</b></sub>
      </a><br />
      <sub>Developer</sub>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/anuska-paul-84b48b261">
        <img src="https://res.cloudinary.com/dxrufinml/image/upload/v1760683013/anuska-circular-profile-picture_v13xr5.png" width="100px;" alt="Anuska Paul"/><br />
        <sub><b>Anuska Paul</sub>
      </a><br />
      <sub>Developer</sub>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/srinjoy-roychowdhury-7912b11b8">
        <img src="https://res.cloudinary.com/dxrufinml/image/upload/v1760683013/srinjoy-circular-profile-picture_ob9uuk.png" width="100px;" alt="Srinjoy Roychowdhury"/><br />
        <sub><b>Srinjoy Roychowdhury</b></sub>
      </a><br />
      <sub>Developer</sub>
    </td>
  </tr>
</table>

---

## 🌟 Acknowledgments

- **AWS** for cloud infrastructure
- **Anthropic** for Claude AI
- **React Team** for the amazing framework
- **Open Source Community** for inspiration and tools

---

## 📞 Support

- **Documentation**: [/docs](./docs)
- **Issues**: [GitHub Issues](https://github.com/yourusername/datamorph-website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/datamorph-website/discussions)
- **Email**: thinkerselastic@gmail.com

---

## 💡 Fun Facts

- ⚡ **99.5% faster** than traditional ETL development
- 💰 **99.98% cheaper** than manual development
- 🎯 **95% success rate** with self-healing
- 🚀 **90-180 seconds** average execution time
- 💻 **$0.30** cost per pipeline

---

<div align="center">

### ⭐ Star us on GitHub — it motivates us a lot!

Made with ❤️ by Team Elastic Thinkers

[⬆ Back to Top](#-datamorph-website)

</div>
