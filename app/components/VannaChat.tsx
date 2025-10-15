'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, BarChart3, Download, RefreshCw, ThumbsUp, ThumbsDown, 
  MessageCircle, Lightbulb, TrendingUp, AlertTriangle, Brain,
  FileText, Database, Code, ChevronDown, ChevronRight, Settings,
  Play, Check, X, Upload, Sparkles, LineChart, PieChart, Activity,
  Table, FileDown, FileJson, FileSpreadsheet, Zap, BookOpen,
  CheckCircle, XCircle, Info, Eye, EyeOff, Copy, ExternalLink,
  History, Trash2, Plus, Filter, Search, Clock, ArrowUp, 
  HelpCircle, GitBranch, Target, Layers, Award, TrendingDown
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  sql?: string;
  data?: any[];
  columns?: string[];
  chart?: any;
  summary?: string;
  explanation?: string;
  confidence?: number;
  followUpQuestions?: string[];
  similarQuestions?: Array<{question: string; sql?: string}>;
  feedback?: 'good' | 'bad' | null;
  timestamp: Date;
  error?: string;
  executionTime?: number;
  autoFixed?: boolean;
}

interface TrainingData {
  question?: string;
  sql?: string;
  ddl?: string;
  documentation?: string;
}

interface QueryHistoryItem {
  question: string;
  sql?: string;
  timestamp: string;
  success: boolean;
  execution_time?: number;
}

interface TrainingDataItem {
  id?: string;
  question?: string;
  content: string;
  type: string;
}

type ViewMode = 'chat' | 'history' | 'training' | 'schema';

interface VannaChatUltimateProps {
  className?: string;
}

export default function VannaChatUltimate({ className = '' }: VannaChatUltimateProps) {
  // State Management
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSQL, setShowSQL] = useState<{[key: string]: boolean}>({});
  const [showChart, setShowChart] = useState<{[key: string]: boolean}>({});
  const [showTable, setShowTable] = useState<{[key: string]: boolean}>({});
  const [showSimilar, setShowSimilar] = useState<{[key: string]: boolean}>({});
  const [showFollowUp, setShowFollowUp] = useState<{[key: string]: boolean}>({});
  const [serviceStatus, setServiceStatus] = useState<'stopped' | 'starting' | 'running' | 'error'>('running');
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [trainingData, setTrainingData] = useState<TrainingData>({});
  const [suggestions, setSuggestions] = useState<Array<{question: string; sql?: string}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedChartType, setSelectedChartType] = useState<string>('auto');
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);
  const [trainingDataList, setTrainingDataList] = useState<TrainingDataItem[]>([]);
  const [databaseSchema, setDatabaseSchema] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load initial data on mount
  useEffect(() => {
    loadSuggestions();
    if (viewMode === 'history') loadQueryHistory();
    if (viewMode === 'training') loadTrainingData();
    if (viewMode === 'schema') loadDatabaseSchema();
  }, [viewMode]);

  const loadSuggestions = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ n_results: 8 })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.suggestions) {
          setSuggestions(data.suggestions);
        }
      }
    } catch (error) {
      // Use mock suggestions when backend is not available
      setSuggestions([
        { question: "What is the total revenue?" },
        { question: "Show top 10 customers by sales" },
        { question: "What are the best selling products?" },
        { question: "Display monthly sales trend" },
        { question: "Which categories perform best?" },
        { question: "Show revenue by region" },
        { question: "List most profitable items" },
        { question: "Compare this year to last year" }
      ]);
    }
  };

  const loadQueryHistory = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/history');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setQueryHistory(data.history);
        }
      }
    } catch (error) {
      console.error('Failed to load query history:', error);
    }
  };

  const loadTrainingData = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/training_data');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTrainingDataList(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to load training data:', error);
    }
  };

  const loadDatabaseSchema = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/database_schema');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setDatabaseSchema(data.schema);
        }
      }
    } catch (error) {
      console.error('Failed to load database schema:', error);
    }
  };

  const handleSubmit = async (question?: string) => {
    const q = question || input.trim();
    if (!q || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: q,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const response = await fetch('http://localhost:5002/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: q,
          auto_train: true,
          generate_followups: true,
          generate_charts: true,
          allow_auto_fix: true,
          chart_type: selectedChartType
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.summary || (data.results ? `Found ${data.results.row_count || 0} results` : 'No results'),
        sql: data.sql,
        data: data.results?.rows,
        columns: data.results?.columns,
        chart: data.chart,
        summary: data.summary,
        explanation: data.explanation,
        confidence: data.confidence,
        followUpQuestions: data.followup_questions,
        similarQuestions: data.similar_questions,
        executionTime: data.execution_time,
        autoFixed: data.auto_fixed,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-show features if available
      if (data.chart) {
        setShowChart(prev => ({ ...prev, [assistantMessage.id]: true }));
      }
      if (data.results && data.results.rows && data.results.rows.length > 0) {
        setShowTable(prev => ({ ...prev, [assistantMessage.id]: true }));
      }
      if (data.followup_questions && data.followup_questions.length > 0) {
        setShowFollowUp(prev => ({ ...prev, [assistantMessage.id]: true }));
      }

      // Refresh history if in history view
      if (viewMode === 'history') {
        loadQueryHistory();
      }

    } catch (error) {
      const isConnectionError = error instanceof TypeError && error.message.includes('Failed to fetch');
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: isConnectionError 
          ? 'The backend service is not running. Start it with: ./start_vanna_enhanced.sh'
          : 'Sorry, I encountered an error processing your question.',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
      
      // Add demo response for connection errors
      if (isConnectionError) {
        errorMessage.content += '\n\nShowing demo data for illustration:';
        errorMessage.sql = 'SELECT category, SUM(revenue) as total FROM sales GROUP BY category';
        errorMessage.data = [
          { category: 'Electronics', total: 125000 },
          { category: 'Clothing', total: 89000 },
          { category: 'Home', total: 67000 }
        ];
        errorMessage.columns = ['category', 'total'];
        errorMessage.confidence = 0.85;
        errorMessage.followUpQuestions = [
          "Show trend over time",
          "Break down by region",
          "Compare to last year"
        ];
      }
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, feedback: 'good' | 'bad') => {
    const message = messages.find(msg => msg.id === messageId);
    if (!message || !message.sql) return;

    // Update UI immediately
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ));

    // Send feedback to backend
    try {
      const response = await fetch('http://localhost:5002/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: messages[messages.findIndex(m => m.id === messageId) - 1]?.content || '',
          sql: message.sql,
          feedback_type: feedback,
          comment: feedback === 'bad' ? 'User marked as incorrect' : null
        })
      });

      const result = await response.json();
      if (result.success && viewMode === 'training') {
        loadTrainingData(); // Refresh training data
      }
    } catch (error) {
      // Silently ignore errors
    }
  };

  const handleTrain = async () => {
    if (!trainingData.question && !trainingData.sql && !trainingData.ddl && !trainingData.documentation) {
      alert('Please provide at least one training input');
      return;
    }

    try {
      const response = await fetch('http://localhost:5002/api/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainingData)
      });

      const result = await response.json();
      if (result.success) {
        alert('Training completed successfully!');
        setShowTrainingModal(false);
        setTrainingData({});
        loadSuggestions();
        if (viewMode === 'training') loadTrainingData();
      } else {
        alert('Training failed: ' + result.error);
      }
    } catch (error) {
      alert('Backend service is not running. Please start the Vanna service.');
    }
  };

  const handleBulkUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5002/api/bulk_train', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.success) {
        alert(`Successfully trained on ${result.count} items`);
        loadTrainingData();
        loadSuggestions();
      } else {
        alert('Bulk training failed: ' + result.message);
      }
    } catch (error) {
      alert('Failed to upload training file');
    }
  };

  const removeTrainingData = async (itemId: string) => {
    if (!confirm('Are you sure you want to remove this training data?')) return;

    try {
      const response = await fetch(`http://localhost:5002/api/training_data/${itemId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        loadTrainingData();
        loadSuggestions();
      }
    } catch (error) {
      alert('Failed to remove training data');
    }
  };

  const exportData = async (messageId: string, format: 'csv' | 'json' | 'excel') => {
    const message = messages.find(msg => msg.id === messageId);
    if (!message || !message.data) return;

    try {
      // For JSON and CSV, handle locally
      if (format === 'json') {
        const blob = new Blob([JSON.stringify(message.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data_${new Date().getTime()}.json`;
        a.click();
        return;
      }

      if (format === 'csv' && message.columns) {
        const csvContent = [
          message.columns.join(','),
          ...message.data.map(row => 
            message.columns!.map(col => JSON.stringify(row[col] ?? '')).join(',')
          )
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data_${new Date().getTime()}.csv`;
        a.click();
        return;
      }

      // For Excel, use backend
      const response = await fetch(`http://localhost:5002/api/export/${format}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results: message.data })
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `data_${new Date().getTime()}.${format}`;
      a.click();
    } catch (error) {
      if (format === 'excel') {
        alert('Excel export requires the backend service.');
      }
    }
  };

  const copySQL = (sql: string) => {
    navigator.clipboard.writeText(sql);
    // Could add toast notification
  };

  const regenerateChart = async (messageId: string, chartType: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (!message || !message.data) return;

    try {
      const response = await fetch('http://localhost:5002/api/generate_chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          results: message.data,
          question: message.content,
          chart_type: chartType
        })
      });

      const result = await response.json();
      if (result.success && result.chart) {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, chart: result.chart } : msg
        ));
      }
    } catch (error) {
      console.error('Chart generation error:', error);
    }
  };

  // Render different views based on mode
  const renderContent = () => {
    switch (viewMode) {
      case 'history':
        return renderHistoryView();
      case 'training':
        return renderTrainingView();
      case 'schema':
        return renderSchemaView();
      default:
        return renderChatView();
    }
  };

  const renderHistoryView = () => (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Query History</h2>
          <p className="text-gray-600">Review and rerun your previous queries</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <input
              type="text"
              placeholder="Search queries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="divide-y divide-gray-200">
            {queryHistory
              .filter(item => 
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.sql && item.sql.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map((item, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                        {item.execution_time && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            {item.execution_time.toFixed(2)}s
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          item.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      <p className="font-medium text-gray-800 mb-1">{item.question}</p>
                      {item.sql && (
                        <pre className="text-xs text-gray-600 bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
                          {item.sql}
                        </pre>
                      )}
                    </div>
                    <button
                      onClick={() => handleSubmit(item.question)}
                      className="ml-4 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                    >
                      Rerun
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrainingView = () => (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Training Data Management</h2>
            <p className="text-gray-600">Manage and improve the AI training data</p>
          </div>
          <div className="flex gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.sql"
              onChange={handleBulkUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Bulk Upload
            </button>
            <button
              onClick={() => setShowTrainingModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Training Data
            </button>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg ${filterType === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('question')}
            className={`px-3 py-1 rounded-lg ${filterType === 'question' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
          >
            Questions
          </button>
          <button
            onClick={() => setFilterType('ddl')}
            className={`px-3 py-1 rounded-lg ${filterType === 'ddl' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
          >
            DDL
          </button>
          <button
            onClick={() => setFilterType('documentation')}
            className={`px-3 py-1 rounded-lg ${filterType === 'documentation' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
          >
            Documentation
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {trainingDataList
              .filter(item => filterType === 'all' || item.type === filterType)
              .map((item, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.type === 'question' ? 'bg-blue-100 text-blue-700' :
                          item.type === 'ddl' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      {item.question && (
                        <p className="font-medium text-gray-800 mb-2">{item.question}</p>
                      )}
                      <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded overflow-x-auto">
                        {item.content}
                      </pre>
                    </div>
                    {item.id && (
                      <button
                        onClick={() => removeTrainingData(item.id)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchemaView = () => (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Database Schema</h2>
          <p className="text-gray-600">Explore your database structure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(databaseSchema).map(([tableName, tableInfo]: [string, any]) => (
            <div key={tableName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-600" />
                    {tableName}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {tableInfo.row_count} rows
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {tableInfo.columns.map((col: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        {col.primary_key && <Key className="w-3 h-3 text-yellow-600" />}
                        <span className="font-medium text-gray-700">{col.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {col.type}
                        </span>
                        {col.nullable && (
                          <span className="text-xs text-gray-500">nullable</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChatView = () => (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Screen */}
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  Ultimate AI SQL Assistant
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Full-featured text-to-SQL with advanced analytics, visualizations, and learning capabilities
                </p>
                
                {/* Feature Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                    <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-800 text-sm">Smart Charts</h3>
                    <p className="text-xs text-gray-500 mt-1">Auto visualization</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                    <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-800 text-sm">Self-Learning</h3>
                    <p className="text-xs text-gray-500 mt-1">Improves over time</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                    <GitBranch className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-800 text-sm">Follow-ups</h3>
                    <p className="text-xs text-gray-500 mt-1">Smart suggestions</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                    <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-800 text-sm">Confidence</h3>
                    <p className="text-xs text-gray-500 mt-1">Accuracy scoring</p>
                  </div>
                </div>

                {/* Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Try asking:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSubmit(suggestion.question)}
                          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm shadow-sm"
                        >
                          {suggestion.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((message, index) => (
            <div key={message.id} className="animate-fadeIn">
              {message.type === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-2xl">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl rounded-tr-sm shadow-lg">
                      <p className="text-white">{message.content}</p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Confidence & Execution Time Header */}
                    {(message.confidence || message.executionTime) && (
                      <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          {message.confidence && (
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-600">Confidence:</span>
                              <div className="flex items-center gap-2">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                                    style={{ width: `${message.confidence * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                  {Math.round((message.confidence || 0) * 100)}%
                                </span>
                              </div>
                            </div>
                          )}
                          {message.executionTime && (
                            <span className="text-sm text-gray-600">
                              Executed in {message.executionTime.toFixed(2)}s
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Main Content */}
                    <div className="px-6 py-4">
                      {message.error ? (
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-gray-800">{message.content}</p>
                            <p className="text-sm text-red-600 mt-2">{message.error}</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-800 mb-3">{message.content}</p>
                          
                          {message.autoFixed && (
                            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg mb-3">
                              <CheckCircle className="w-4 h-4" />
                              SQL was automatically corrected
                            </div>
                          )}

                          {message.explanation && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                              <p className="text-sm text-blue-800">{message.explanation}</p>
                            </div>
                          )}

                          {/* Action Buttons */}
                          {(message.sql || message.data || message.chart) && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {message.sql && (
                                <button
                                  onClick={() => setShowSQL(prev => ({ ...prev, [message.id]: !prev[message.id] }))}
                                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
                                >
                                  <Code className="w-3 h-3" />
                                  {showSQL[message.id] ? 'Hide SQL' : 'Show SQL'}
                                </button>
                              )}
                              
                              {message.data && message.data.length > 0 && (
                                <button
                                  onClick={() => setShowTable(prev => ({ ...prev, [message.id]: !prev[message.id] }))}
                                  className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1"
                                >
                                  <Table className="w-3 h-3" />
                                  {showTable[message.id] ? 'Hide Table' : 'Show Table'}
                                </button>
                              )}
                              
                              {message.chart && (
                                <button
                                  onClick={() => setShowChart(prev => ({ ...prev, [message.id]: !prev[message.id] }))}
                                  className="px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-1"
                                >
                                  <BarChart3 className="w-3 h-3" />
                                  {showChart[message.id] ? 'Hide Chart' : 'Show Chart'}
                                </button>
                              )}

                              {/* Export Options */}
                              {message.data && message.data.length > 0 && (
                                <>
                                  <button
                                    onClick={() => exportData(message.id, 'csv')}
                                    className="px-3 py-1.5 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors flex items-center gap-1"
                                  >
                                    <FileSpreadsheet className="w-3 h-3" />
                                    CSV
                                  </button>
                                  <button
                                    onClick={() => exportData(message.id, 'json')}
                                    className="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center gap-1"
                                  >
                                    <FileJson className="w-3 h-3" />
                                    JSON
                                  </button>
                                  <button
                                    onClick={() => exportData(message.id, 'excel')}
                                    className="px-3 py-1.5 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors flex items-center gap-1"
                                  >
                                    <FileDown className="w-3 h-3" />
                                    Excel
                                  </button>
                                </>
                              )}

                              {/* Feedback Buttons */}
                              {message.sql && (
                                <div className="flex gap-1 ml-auto">
                                  <button
                                    onClick={() => handleFeedback(message.id, 'good')}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                      message.feedback === 'good' 
                                        ? 'bg-green-100 text-green-600' 
                                        : 'hover:bg-gray-100 text-gray-500'
                                    }`}
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleFeedback(message.id, 'bad')}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                      message.feedback === 'bad' 
                                        ? 'bg-red-100 text-red-600' 
                                        : 'hover:bg-gray-100 text-gray-500'
                                    }`}
                                  >
                                    <ThumbsDown className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* SQL Display */}
                    {showSQL[message.id] && message.sql && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-700">Generated SQL</h4>
                          <button
                            onClick={() => copySQL(message.sql!)}
                            className="px-2 py-1 text-xs bg-white text-gray-600 rounded hover:bg-gray-100 flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{message.sql}</code>
                        </pre>
                      </div>
                    )}

                    {/* Data Table */}
                    {showTable[message.id] && message.data && message.columns && (
                      <div className="px-6 py-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Results</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                {message.columns.map((col, idx) => (
                                  <th key={idx} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {message.data.slice(0, 10).map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-gray-50">
                                  {message.columns!.map((col, colIdx) => (
                                    <td key={colIdx} className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap">
                                      {row[col]?.toString() || '-'}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {message.data.length > 10 && (
                            <div className="text-center py-2 text-sm text-gray-500">
                              Showing 10 of {message.data.length} rows
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Interactive Chart */}
                    {showChart[message.id] && message.chart && (
                      <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-700">Visualization</h4>
                          <div className="flex gap-1">
                            {['bar', 'line', 'scatter', 'pie', 'heatmap', 'indicator'].map(type => (
                              <button
                                key={type}
                                onClick={() => regenerateChart(message.id, type)}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 capitalize"
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <Plot
                            data={message.chart.data}
                            layout={{
                              ...message.chart.layout,
                              autosize: true,
                              margin: { l: 40, r: 40, t: 40, b: 40 }
                            }}
                            config={{ responsive: true }}
                            style={{ width: '100%', height: '400px' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Follow-up Questions */}
                    {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                      <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
                        <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Suggested Follow-ups
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {message.followUpQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSubmit(q)}
                              className="px-3 py-1.5 bg-white text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Similar Questions */}
                  {message.similarQuestions && message.similarQuestions.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gray-500" />
                        Similar Questions
                      </h4>
                      <div className="space-y-2">
                        {message.similarQuestions.slice(0, 3).map((sq, idx) => (
                          <div key={idx} className="text-sm">
                            <button
                              onClick={() => handleSubmit(sq.question)}
                              className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                            >
                              {sq.question}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600" />
                  <span className="text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex gap-3">
            <div className="flex items-center gap-2">
              <select
                value={selectedChartType}
                onChange={(e) => setSelectedChartType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="auto">Auto Chart</option>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="scatter">Scatter</option>
                <option value="pie">Pie</option>
                <option value="heatmap">Heatmap</option>
              </select>
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your data..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </form>
          
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>Powered by Azure OpenAI • Full feature parity with Vanna Flask</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                Auto-training enabled
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-500" />
                Auto-fix enabled
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={`flex flex-col h-full bg-gray-50 ${className}`}>
      {/* Header with View Switcher */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Ultimate SQL Assistant
            </h1>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('chat')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'chat' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'history' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setViewMode('training')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'training' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Training
              </button>
              <button
                onClick={() => setViewMode('schema')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'schema' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Schema
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {viewMode === 'chat' && (
              <button
                onClick={() => setShowTrainingModal(true)}
                className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Brain className="w-4 h-4" />
                Train AI
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                serviceStatus === 'running' ? 'bg-green-500' : 
                serviceStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
              <span className="text-sm text-gray-600">
                {serviceStatus === 'running' ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {renderContent()}

      {/* Training Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  Train AI Model
                </h3>
                <button
                  onClick={() => setShowTrainingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Improve the AI by providing examples and documentation
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Question & SQL Pair */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Question & SQL Training</h4>
                <input
                  type="text"
                  placeholder="e.g. 'Show me the top 10 selling artists by revenue', 'What are the most popular music genres?', 'List all customers from Canada'"
                  value={trainingData.question || ''}
                  onChange={(e) => setTrainingData(prev => ({ ...prev, question: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="e.g. SELECT ar.Name as Artist, SUM(il.UnitPrice * il.Quantity) as Revenue FROM Artist ar JOIN Album al ON ar.ArtistId = al.ArtistId JOIN Track t ON al.AlbumId = t.AlbumId JOIN InvoiceLine il ON t.TrackId = il.TrackId GROUP BY ar.ArtistId ORDER BY Revenue DESC LIMIT 10"
                  value={trainingData.sql || ''}
                  onChange={(e) => setTrainingData(prev => ({ ...prev, sql: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 font-mono text-sm"
                />
              </div>

              {/* DDL Training */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">DDL Schema Training</h4>
                <textarea
                  placeholder="e.g. CREATE TABLE [Artist] ([ArtistId] INTEGER NOT NULL, [Name] NVARCHAR(120), CONSTRAINT [PK_Artist] PRIMARY KEY ([ArtistId])); CREATE TABLE [Album] ([AlbumId] INTEGER NOT NULL, [Title] NVARCHAR(160) NOT NULL, [ArtistId] INTEGER NOT NULL, CONSTRAINT [PK_Album] PRIMARY KEY ([AlbumId]), FOREIGN KEY ([ArtistId]) REFERENCES [Artist] ([ArtistId]))"
                  value={trainingData.ddl || ''}
                  onChange={(e) => setTrainingData(prev => ({ ...prev, ddl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32 font-mono text-sm"
                />
              </div>

              {/* Documentation Training */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Business Context</h4>
                <textarea
                  placeholder="e.g. 'Music Store Database (Chinook): Artists create Albums containing Tracks. Customers purchase Tracks via Invoices. Tracks have Genre and MediaType. Employees support Customers. All prices in USD, durations in milliseconds. Key business questions: Sales performance by artist, customer purchase patterns, popular music trends.'"
                  value={trainingData.documentation || ''}
                  onChange={(e) => setTrainingData(prev => ({ ...prev, documentation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowTrainingModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTrain}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Train Model
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}