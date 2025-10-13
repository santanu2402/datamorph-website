import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { startETL } from '../services/api';
import AccessCodeModal from '../components/AccessCodeModal';
import PromptModal from '../components/PromptModal';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teamMembers = [
    {
      name: 'Santanu Mandal',
      image: '/images/santanu-circular-profile-picture.png',
      linkedin: 'https://www.linkedin.com/in/santanu-mandal-346a41238'
    },
    {
      name: 'Tanmana Das',
      image: '/images/tanmana-circular-profile-picture.png',
      linkedin: 'https://www.linkedin.com/in/tanmana-das-b9b533229'
    },
    {
      name: 'Anuska Paul',
      image: '/images/anuska-circular-profile-picture.png',
      linkedin: 'https://www.linkedin.com/in/anuska-paul-84b48b261'
    },
    {
      name: 'Srinjoy Roychowdhury',
      image: '/images/srinjoy-circular-profile-picture.png',
      linkedin: 'https://www.linkedin.com/in/srinjoy-roychowdhury-7912b11b8'
    }
  ];

  const handleTryAgent = () => {
    if (isAuthenticated) {
      setShowPromptModal(true);
    } else {
      setShowAccessModal(true);
    }
  };

  const handleAccessGranted = () => {
    setShowAccessModal(false);
    setShowPromptModal(true);
  };

  const handleSubmitPrompt = async (prompt: string) => {
    setIsSubmitting(true);
    try {
      const response = await startETL(prompt);
      
      // Wait 5 seconds for orchestrator to start
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Navigate to logs page with run_id
      navigate('/logs', { state: { runId: response.run_id, prompt } });
    } catch (error: any) {
      alert('Error starting ETL: ' + error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <img src="/images/datamorph-logo-usage.png" alt="DataMorph Logo" className="hero-logo" />
          </div>
          <h1 className="hero-title">
            Transform Natural Language into
            <span className="gradient-text"> Production-Ready ETL Pipelines</span>
          </h1>
          <p className="hero-subtitle">
            AI-Powered Autonomous ETL System with Self-Healing Capabilities
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat">
              <div className="stat-value">90-180s</div>
              <div className="stat-label">Execution Time</div>
            </div>
            <div className="stat">
              <div className="stat-value">$0.30</div>
              <div className="stat-label">Cost per Pipeline</div>
            </div>
          </div>
          <button className="btn btn-primary btn-large" onClick={handleTryAgent}>
            🚀 Try Our Agent
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why DataMorph?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Intelligence</h3>
            <p>Uses Claude Sonnet 4.5 for natural language understanding and intelligent code generation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Self-Healing</h3>
            <p>Automatically detects and fixes errors with 95% success rate across multiple iterations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Hybrid Validation</h3>
            <p>5-phase validation combining rule-based checks and AI-generated data quality tests</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Complete ETL workflows in 90-180 seconds from prompt to validated pipeline</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Cost-Effective</h3>
            <p>Only ~$0.30 per ETL pipeline execution with AWS serverless architecture</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Production-Ready</h3>
            <p>Generates battle-tested PySpark code with comprehensive error handling</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Describe Your ETL</h3>
            <p>Simply describe what you want in plain English. No coding required!</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Generates Code</h3>
            <p>Claude Sonnet 4.5 creates production-ready PySpark code automatically</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Execute & Validate</h3>
            <p>AWS Glue executes the code and our hybrid validator ensures quality</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Self-Heal if Needed</h3>
            <p>If issues arise, the system automatically fixes them and retries</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-title">Meet Team Elastic Thinkers</h2>
        <p className="team-subtitle">The brilliant minds behind DataMorph</p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.image} alt={member.name} className="team-photo" />
              <h3 className="team-name">{member.name}</h3>
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="linkedin-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn Profile
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your ETL Workflows?</h2>
        <p>Start building production-ready ETL pipelines in seconds</p>
        <button className="btn btn-primary btn-large" onClick={handleTryAgent}>
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 DataMorph by Team Elastic Thinkers. All rights reserved.</p>
        <p>Powered by AWS Bedrock, Lambda, Glue & Claude Sonnet 4.5</p>
      </footer>

      {/* Modals */}
      {showAccessModal && (
        <AccessCodeModal
          onClose={() => setShowAccessModal(false)}
          onSuccess={handleAccessGranted}
        />
      )}

      {showPromptModal && (
        <PromptModal
          onClose={() => setShowPromptModal(false)}
          onSubmit={handleSubmitPrompt}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default HomePage;
