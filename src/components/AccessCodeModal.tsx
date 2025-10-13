import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AccessCodeModal.css';

interface AccessCodeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AccessCodeModal: React.FC<AccessCodeModalProps> = ({ onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(code)) {
      onSuccess();
    } else {
      setError('Invalid access code. Please try again.');
      setCode('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content access-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>🔐 Access Required</h2>
        <p>Please enter the access code to use DataMorph Agent</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="accessCode">Access Code</label>
            <input
              type="password"
              id="accessCode"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="Enter access code"
              autoFocus
              required
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccessCodeModal;
