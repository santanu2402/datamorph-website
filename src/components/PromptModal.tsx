import React, { useState } from 'react';
import './PromptModal.css';

interface PromptModalProps {
  onClose: () => void;
  onSubmit: (prompt: string) => void;
  isSubmitting: boolean;
}

const PromptModal: React.FC<PromptModalProps> = ({ onClose, onSubmit, isSubmitting }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  const examplePrompts = [
    "Join customers and orders on customer_id, calculate total order amount per customer",
    "Extract transactions from transactions table and customers from customers. Join on cust_id. Aggregate by cust_id to calculate total_spent",
    "Aggregate sales by product category, include product count and total revenue"
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content prompt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} disabled={isSubmitting}>×</button>
        <h2>🚀 Describe Your ETL Pipeline</h2>
        <p>Tell us what data transformation you need in plain English</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="prompt">ETL Description</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Join customers and orders tables on customer_id, calculate total order amount per customer, filter customers with total > 1000"
              rows={6}
              required
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className="example-prompts">
            <p className="example-title">💡 Example Prompts:</p>
            {examplePrompts.map((example, index) => (
              <div
                key={index}
                className="example-prompt"
                onClick={() => !isSubmitting && setPrompt(example)}
              >
                {example}
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !prompt.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner-small"></div>
                  Processing...
                </>
              ) : (
                'Start ETL Pipeline'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptModal;
