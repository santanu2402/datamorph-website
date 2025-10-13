import React, { useState } from 'react';
import { getTableSchema, getTableData, TableSchema } from '../services/api';
import './TableViewModal.css';

interface TableViewModalProps {
  onClose: () => void;
}

const TableViewModal: React.FC<TableViewModalProps> = ({ onClose }) => {
  const [tableName, setTableName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [schema, setSchema] = useState<TableSchema[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const rowsPerPage = 20;

  const handleGetData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableName.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const [schemaData, tableData] = await Promise.all([
        getTableSchema(tableName.trim()),
        getTableData(tableName.trim(), 100)
      ]);

      setSchema(schemaData);
      setData(tableData);
      setIsExpanded(true);
      setCurrentPage(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content table-modal ${isExpanded ? 'expanded' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        
        {!isExpanded ? (
          <div className="table-input-section">
            <h2>📋 View Table Data</h2>
            <p>Enter the table name to view its schema and data</p>
            
            <form onSubmit={handleGetData}>
              <div className="form-group">
                <label htmlFor="tableName">Table Name</label>
                <input
                  type="text"
                  id="tableName"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="e.g., customer_orders_summary"
                  required
                  autoFocus
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Loading...
                    </>
                  ) : (
                    'Get Data'
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="table-data-section">
            <div className="table-header">
              <h2>📊 Table: {tableName}</h2>
              <div className="table-stats">
                <span>Total Rows: {data.length}</span>
                <span>Columns: {schema.length}</span>
              </div>
            </div>

            {/* Schema Section */}
            <div className="schema-section">
              <h3>📋 Schema</h3>
              <div className="schema-table-wrapper">
                <table className="schema-table">
                  <thead>
                    <tr>
                      <th>Column Name</th>
                      <th>Data Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schema.map((col, index) => (
                      <tr key={index}>
                        <td><code>{col.column_name}</code></td>
                        <td><span className="data-type">{col.data_type}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Data Section */}
            <div className="data-section">
              <h3>📊 Data (Page {currentPage} of {totalPages})</h3>
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      {schema.map((col, index) => (
                        <th key={index}>{col.column_name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {schema.map((col, colIndex) => (
                          <td key={colIndex}>
                            {row[col.column_name] !== null && row[col.column_name] !== undefined
                              ? String(row[col.column_name])
                              : <span className="null-value">NULL</span>
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="btn btn-secondary btn-small" 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>
                  <span className="page-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    className="btn btn-secondary btn-small" 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableViewModal;
