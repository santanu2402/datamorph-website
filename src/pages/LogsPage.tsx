import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLogs, LogEntry, LogsResponse } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TableViewModal from '../components/TableViewModal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './LogsPage.css';

const LogsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [runId, setRunId] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showTableModal, setShowTableModal] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
  const [unchangedCount, setUnchangedCount] = useState(0);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const previousLogsRef = useRef<string>('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const state = location.state as { runId?: string; prompt?: string };
    if (state?.runId) {
      setRunId(state.runId);
      setPrompt(state.prompt || '');
      fetchLogs(state.runId);
    } else {
      setError('No run ID provided');
      setIsLoading(false);
    }
  }, [location, isAuthenticated, navigate]);

  const fetchLogs = async (id: string) => {
    try {
      const response = await getLogs(id);
      const currentLogsString = JSON.stringify(response.logs);
      
      // Check if logs have changed
      if (currentLogsString === previousLogsRef.current) {
        setUnchangedCount(prev => prev + 1);
      } else {
        setUnchangedCount(0);
        previousLogsRef.current = currentLogsString;
      }

      setLogs(response.logs);
      setLastUpdateTime(Date.now());
      setIsLoading(false);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Auto-refresh logs every 30 seconds
  useEffect(() => {
    if (!runId || unchangedCount >= 20) return; // Stop after 10 minutes (20 * 30s)

    const interval = setInterval(() => {
      fetchLogs(runId);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [runId, unchangedCount]);

  const exportToPDF = async () => {
    if (!logsContainerRef.current) return;

    try {
      const canvas = await html2canvas(logsContainerRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`datamorph-logs-${runId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to export PDF');
    }
  };

  const getLogIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      start: '🚀',
      status: '📊',
      info: 'ℹ️',
      result: '✅',
      success: '🎉',
      error: '❌',
      warning: '⚠️',
      code: '💻',
      end: '🏁'
    };
    return icons[type.toLowerCase()] || '📝';
  };

  const getLogColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      start: '#667eea',
      status: '#4299e1',
      info: '#48bb78',
      result: '#38b2ac',
      success: '#48bb78',
      error: '#f56565',
      warning: '#ed8936',
      code: '#9f7aea',
      end: '#667eea'
    };
    return colors[type.toLowerCase()] || '#718096';
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="logs-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading logs...</p>
        </div>
      </div>
    );
  }

  if (error && logs.length === 0) {
    return (
      <div className="logs-page">
        <div className="error-container">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="logs-page">
      <div className="logs-header">
        <div className="logs-header-content">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
          <div className="logs-title-section">
            <h1>📊 ETL Workflow Logs</h1>
            <div className="logs-meta">
              <span className="run-id">Run ID: {runId}</span>
              {prompt && <span className="prompt-text">Prompt: {prompt}</span>}
            </div>
          </div>
          <div className="logs-actions">
            <button className="btn btn-secondary" onClick={() => setShowTableModal(true)}>
              📋 View Table
            </button>
            <button className="btn btn-primary" onClick={exportToPDF}>
              📥 Export PDF
            </button>
          </div>
        </div>
        <div className="logs-status-bar">
          <span className="status-item">
            Total Logs: <strong>{logs.length}</strong>
          </span>
          <span className="status-item">
            Last Updated: <strong>{formatTimestamp(new Date(lastUpdateTime).toISOString())}</strong>
          </span>
          {unchangedCount < 20 && (
            <span className="status-item refreshing">
              🔄 Auto-refreshing every 30s
            </span>
          )}
        </div>
      </div>

      <div className="logs-container" ref={logsContainerRef}>
        <div className="logs-timeline">
          {logs.map((log, index) => (
            <div key={index} className="log-entry" style={{ borderLeftColor: getLogColor(log.type) }}>
              <div className="log-header">
                <span className="log-icon">{getLogIcon(log.type)}</span>
                <span className="log-type" style={{ color: getLogColor(log.type) }}>
                  {log.type.toUpperCase()}
                </span>
                <span className="log-timestamp">{formatTimestamp(log.timestamp)}</span>
              </div>
              <h3 className="log-title">{log.title}</h3>
              <p className="log-description">{log.description}</p>
              
              {log.metadata && Object.keys(log.metadata).length > 0 && (
                <div className="log-metadata">
                  <details>
                    <summary>View Metadata</summary>
                    {log.metadata.generated_item ? (
                      <div className="code-block">
                        <div className="code-header">
                          <span>Generated PySpark Code</span>
                          <button 
                            className="copy-btn"
                            onClick={() => {
                              navigator.clipboard.writeText(log.metadata.generated_item);
                              alert('Code copied to clipboard!');
                            }}
                          >
                            📋 Copy
                          </button>
                        </div>
                        <pre className="code-content"><code>{log.metadata.generated_item}</code></pre>
                      </div>
                    ) : (
                      <pre className="metadata-json">{JSON.stringify(log.metadata, null, 2)}</pre>
                    )}
                  </details>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showTableModal && (
        <TableViewModal
          onClose={() => setShowTableModal(false)}
        />
      )}
    </div>
  );
};

export default LogsPage;
