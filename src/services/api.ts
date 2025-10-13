import axios from 'axios';

// Configure your API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://your-api-endpoint.com';

export interface StartETLRequest {
  prompt: string;
}

export interface StartETLResponse {
  status: string;
  run_id: string;
  message: string;
  details?: any;
}

export interface LogEntry {
  timestamp: string;
  type: string;
  title: string;
  description: string;
  metadata?: any;
}

export interface LogsResponse {
  run_id: string;
  logs: LogEntry[];
  created_at: string;
  updated_at: string;
  log_count: number;
  status: string;
}

export interface TableSchema {
  column_name: string;
  data_type: string;
}

export interface TableDataResponse {
  results: any[];
  row_count: number;
}

// Start ETL workflow
export const startETL = async (prompt: string): Promise<StartETLResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/start`,
      { prompt },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 400000 // 400 seconds
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to start ETL workflow');
  }
};

// Get logs for a specific run_id
export const getLogs = async (runId: string): Promise<LogsResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get/logs/${runId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch logs');
  }
};

// Get table schema
export const getTableSchema = async (tableName: string): Promise<TableSchema[]> => {
  try {
    const query = `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${tableName}' ORDER BY ordinal_position`;
    const response = await axios.post(
      `${API_BASE_URL}/execute/query`,
      { query },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.results;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch table schema');
  }
};

// Get table data
export const getTableData = async (tableName: string, limit: number = 100): Promise<any[]> => {
  try {
    const query = `SELECT * FROM ${tableName} LIMIT ${limit}`;
    const response = await axios.post(
      `${API_BASE_URL}/execute/query`,
      { query },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.results;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch table data');
  }
};

// Get latest run_id (within last 2 minutes)
export const getLatestRunId = async (): Promise<string | null> => {
  try {
    // This is a workaround - we'll need to implement a proper endpoint
    // For now, we'll return null and handle it in the component
    return null;
  } catch (error) {
    return null;
  }
};
