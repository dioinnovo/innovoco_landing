'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Send, 
  Database, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  Code2,
  BarChart3,
  History,
  BookOpen,
  Brain,
  RefreshCw,
  Download,
  ChevronDown,
  ChevronRight,
  Table,
  Package,
  Users,
  ShoppingCart,
  Truck,
  Globe
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts'

// Northwind theme colors
const NORTHWIND_COLORS = {
  primary: '#2E7D32',
  secondary: '#558B2F',
  accent: '#8BC34A',
  warning: '#FFC107',
  error: '#F44336',
  chart: ['#2E7D32', '#558B2F', '#8BC34A', '#C5E1A5', '#DCEDC8']
}

interface Message {
  id: string
  type: 'user' | 'assistant' | 'sql' | 'error'
  content: string
  sql?: string
  data?: any[]
  columns?: string[]
  chartConfig?: any
  timestamp: Date
}

interface DatabaseInfo {
  connected: boolean
  database: string
  metadata: {
    database_name: string
    database_type: string
    total_records: number
    size_mb: number
    tables: Record<string, any>
  }
}

export default function VannaNorthwindChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const [databaseInfo, setDatabaseInfo] = useState<DatabaseInfo | null>(null)
  const [schema, setSchema] = useState<any>(null)
  const [trainingData, setTrainingData] = useState<any[]>([])
  const [selectedTable, setSelectedTable] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const API_BASE = 'http://localhost:5004'

  useEffect(() => {
    fetchDatabaseInfo()
    fetchSchema()
    if (activeTab === 'training') {
      fetchTrainingData()
    }
  }, [activeTab])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchDatabaseInfo = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/database/info`)
      const data = await response.json()
      setDatabaseInfo(data)
    } catch (error) {
      console.error('Failed to fetch database info:', error)
    }
  }

  const fetchSchema = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/schema?database=northwind`)
      const data = await response.json()
      setSchema(data.schema)
      if (data.schema && Object.keys(data.schema).length > 0) {
        setSelectedTable(Object.keys(data.schema)[0])
      }
    } catch (error) {
      console.error('Failed to fetch schema:', error)
    }
  }

  const fetchTrainingData = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/training-data`)
      const data = await response.json()
      setTrainingData(data.data || [])
    } catch (error) {
      console.error('Failed to fetch training data:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, database: 'northwind', auto_run: true })
      })

      const result = await response.json()

      if (result.sql) {
        const sqlMessage: Message = {
          id: Date.now().toString() + '-sql',
          type: 'sql',
          content: result.sql,
          sql: result.sql,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, sqlMessage])
      }

      if (result.data) {
        const assistantMessage: Message = {
          id: Date.now().toString() + '-result',
          type: 'assistant',
          content: `Found ${result.data.length} results`,
          data: result.data,
          columns: result.columns,
          chartConfig: result.chart_config,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      } else if (result.error) {
        throw new Error(result.error)
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        type: 'error',
        content: error instanceof Error ? error.message : 'An error occurred',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const renderChart = (data: any[], config: any) => {
    if (!config || !data || data.length === 0) return null

    const chartData = data.slice(0, 20) // Limit to 20 items for readability

    switch (config.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={config.x} angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={config.y} fill={NORTHWIND_COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={config.x} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={config.y} stroke={NORTHWIND_COLORS.primary} />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={config.values}
                nameKey={config.labels}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={NORTHWIND_COLORS.chart[index % NORTHWIND_COLORS.chart.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={config.x} />
              <YAxis dataKey={config.y} />
              <Tooltip />
              <Scatter data={chartData} fill={NORTHWIND_COLORS.primary} />
            </ScatterChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  const getTableIcon = (tableName: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Customers': <Users className="w-4 h-4" />,
      'Orders': <ShoppingCart className="w-4 h-4" />,
      'Order Details': <Package className="w-4 h-4" />,
      'Products': <Package className="w-4 h-4" />,
      'Categories': <Table className="w-4 h-4" />,
      'Suppliers': <Truck className="w-4 h-4" />,
      'Employees': <Users className="w-4 h-4" />
    }
    return icons[tableName] || <Table className="w-4 h-4" />
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Northwind Supply Chain Analytics</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                E-commerce & Order Management Database
              </p>
            </div>
          </div>
          
          {databaseInfo && (
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-2">
                <Database className="w-3 h-3" />
                {databaseInfo.metadata?.total_records?.toLocaleString()} Records
              </Badge>
              <Badge variant="outline" className="gap-2">
                <CheckCircle className="w-3 h-3 text-green-600" />
                Connected
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-fit grid-cols-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col p-4 pt-2">
          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Northwind Database Ready</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Ask questions about customers, orders, products, and suppliers
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
                        {[
                          "Show top 5 customers by revenue",
                          "Which products need reordering?",
                          "What are monthly sales trends?",
                          "Show employee performance metrics"
                        ].map((q, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="text-left justify-start"
                            onClick={() => setInput(q)}
                          >
                            <ChevronRight className="w-3 h-3 mr-1" />
                            {q}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                          {message.type === 'user' && (
                            <div className="bg-green-600 text-white rounded-lg p-3">
                              {message.content}
                            </div>
                          )}
                          
                          {message.type === 'sql' && (
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2">
                                  <Code2 className="w-4 h-4" />
                                  Generated SQL
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                                  <code>{message.sql}</code>
                                </pre>
                              </CardContent>
                            </Card>
                          )}
                          
                          {message.type === 'assistant' && message.data && (
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">{message.content}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                {message.chartConfig && renderChart(message.data, message.chartConfig)}
                                
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b">
                                        {message.columns?.map((col: string) => (
                                          <th key={col} className="text-left p-2 font-medium">
                                            {col}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {message.data.slice(0, 10).map((row: any, idx: number) => (
                                        <tr key={idx} className="border-b">
                                          {message.columns?.map((col: string) => (
                                            <td key={col} className="p-2">
                                              {row[col]?.toString() || '-'}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                  {message.data.length > 10 && (
                                    <p className="text-sm text-gray-500 mt-2">
                                      Showing 10 of {message.data.length} rows
                                    </p>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                          
                          {message.type === 'error' && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{message.content}</AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about customers, orders, products, suppliers..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema" className="flex-1 p-4 pt-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Database Schema</CardTitle>
              <CardDescription>
                Explore the Northwind database structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              {schema && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <h3 className="font-semibold mb-3 text-sm">Tables</h3>
                    <div className="space-y-1">
                      {Object.keys(schema).map((table) => (
                        <Button
                          key={table}
                          variant={selectedTable === table ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedTable(table)}
                        >
                          {getTableIcon(table)}
                          <span className="ml-2">{table}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-3">
                    {selectedTable && schema[selectedTable] && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          {getTableIcon(selectedTable)}
                          {selectedTable}
                        </h3>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th className="text-left p-3">Column</th>
                                <th className="text-left p-3">Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {schema[selectedTable].map((col: any, idx: number) => (
                                <tr key={idx} className="border-t">
                                  <td className="p-3 font-mono text-sm">
                                    {col.column_name}
                                  </td>
                                  <td className="p-3">
                                    <Badge variant="outline">
                                      {col.data_type}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="flex-1 p-4 pt-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Training Data</CardTitle>
              <CardDescription>
                View and manage AI training examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingData.length > 0 ? (
                  <div className="space-y-3">
                    {trainingData.slice(0, 20).map((item: any, idx: number) => (
                      <Card key={idx}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <p className="font-medium text-sm">{item.question}</p>
                            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                              <code>{item.sql}</code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No training data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="flex-1 p-4 pt-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Query History</CardTitle>
              <CardDescription>
                Recent queries and results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {messages.filter(m => m.type === 'user' || m.type === 'sql').map((message) => (
                    <Card key={message.id}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant={message.type === 'user' ? 'default' : 'secondary'}>
                              {message.type === 'user' ? 'Question' : 'SQL'}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          {message.type === 'user' ? (
                            <p className="text-sm">{message.content}</p>
                          ) : (
                            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                              <code>{message.sql}</code>
                            </pre>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {messages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No query history yet</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}