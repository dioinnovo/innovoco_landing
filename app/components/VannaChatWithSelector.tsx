'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
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
  Music,
  Package,
  Server,
  Globe,
  Sparkles
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

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

interface Database {
  id: string
  name: string
  type: string
  description: string
  icon: string
  connected: boolean
  current: boolean
  tables?: number
  records?: string
}

interface Message {
  id: string
  type: 'user' | 'assistant' | 'sql' | 'error'
  content: string
  sql?: string
  data?: any[]
  columns?: string[]
  chartConfig?: any
  database?: string
  timestamp: Date
}

export default function VannaChatWithSelector() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const [databases, setDatabases] = useState<Database[]>([])
  const [currentDatabase, setCurrentDatabase] = useState<string>('chinook')
  const [schema, setSchema] = useState<any>(null)
  const [selectedTable, setSelectedTable] = useState<string>('')
  const [switchingDatabase, setSwitchingDatabase] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const API_BASE = 'http://localhost:5004'

  useEffect(() => {
    fetchDatabases()
  }, [])

  useEffect(() => {
    if (currentDatabase) {
      fetchSchema()
    }
  }, [currentDatabase])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchDatabases = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/databases`)
      const data = await response.json()
      setDatabases(data.databases || [])
      setCurrentDatabase(data.current || 'chinook')
    } catch (error) {
      console.error('Failed to fetch databases:', error)
    }
  }

  const fetchSchema = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/schema?database=${currentDatabase}`)
      const data = await response.json()
      setSchema(data.schema)
      if (data.schema && Object.keys(data.schema).length > 0) {
        setSelectedTable(Object.keys(data.schema)[0])
      }
    } catch (error) {
      console.error('Failed to fetch schema:', error)
    }
  }

  const handleDatabaseSwitch = async (newDatabase: string) => {
    if (newDatabase === currentDatabase) return
    
    setSwitchingDatabase(true)
    try {
      const response = await fetch(`${API_BASE}/api/databases/switch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ database: newDatabase })
      })
      
      const result = await response.json()
      if (result.success) {
        setCurrentDatabase(newDatabase)
        await fetchDatabases()
        await fetchSchema()
        
        // Add system message about database switch
        const switchMessage: Message = {
          id: Date.now().toString(),
          type: 'assistant',
          content: `Switched to ${result.message}`,
          database: newDatabase,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, switchMessage])
      }
    } catch (error) {
      console.error('Failed to switch database:', error)
    } finally {
      setSwitchingDatabase(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      database: currentDatabase,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: input, 
          database: currentDatabase,
          auto_run: true 
        })
      })

      const result = await response.json()

      if (result.sql) {
        const sqlMessage: Message = {
          id: Date.now().toString() + '-sql',
          type: 'sql',
          content: result.sql,
          sql: result.sql,
          database: currentDatabase,
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
          database: currentDatabase,
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
        database: currentDatabase,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const renderChart = (data: any[], config: any) => {
    if (!config || !data || data.length === 0) return null

    const chartData = data.slice(0, 20)

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
              <Bar dataKey={config.y} fill={CHART_COLORS[0]} />
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
              <Line type="monotone" dataKey={config.y} stroke={CHART_COLORS[0]} />
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
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  const getDatabaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'music':
        return <Music className="w-4 h-4" />
      case 'package':
        return <Package className="w-4 h-4" />
      case 'database':
        return <Server className="w-4 h-4" />
      default:
        return <Database className="w-4 h-4" />
    }
  }

  const getCurrentDatabaseInfo = () => {
    return databases.find(db => db.id === currentDatabase)
  }

  const dbInfo = getCurrentDatabaseInfo()

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header with Database Selector */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image 
              src="/images/logos/innovoco-logo.png" 
              alt="Innovoco" 
              width={120} 
              height={40} 
              className="h-8 w-auto"
              priority
            />
            <div className="border-l border-gray-300 dark:border-gray-600 pl-4">
              <h2 className="text-xl font-bold">Multi-Database Text-to-SQL</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Query any database with natural language
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Database Selector */}
            <Select
              value={currentDatabase}
              onValueChange={handleDatabaseSwitch}
              disabled={switchingDatabase || isLoading}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue>
                  {dbInfo && (
                    <div className="flex items-center gap-2">
                      {getDatabaseIcon(dbInfo.icon)}
                      <span>{dbInfo.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {databases.map(db => (
                  <SelectItem key={db.id} value={db.id}>
                    <div className="flex items-center gap-2">
                      {getDatabaseIcon(db.icon)}
                      <div>
                        <div className="font-medium">{db.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {db.type === 'sqlite' ? 'SQLite' : 'SQL Server'} • 
                          {db.tables && ` ${db.tables} tables`}
                          {db.records && ` • ${db.records} records`}
                        </div>
                      </div>
                      {db.connected && (
                        <CheckCircle className="w-3 h-3 text-green-600 ml-auto" />
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {switchingDatabase && (
              <Badge variant="outline" className="gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                Switching...
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-fit grid-cols-3">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
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
                      <Database className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {dbInfo ? `${dbInfo.name} Ready` : 'Select a Database'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {dbInfo?.description || 'Choose a database from the selector above'}
                      </p>
                      {dbInfo && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
                          {currentDatabase === 'chinook' && [
                            "Show top customers by revenue",
                            "Which albums have the most tracks?",
                            "What are the sales by country?",
                            "Show artist popularity"
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
                          {currentDatabase === 'northwind' && [
                            "Show top customers by order value",
                            "Which products need reordering?",
                            "Show employee performance",
                            "What are the sales trends?"
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
                      )}
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                          {message.type === 'user' && (
                            <div className="bg-primary text-primary-foreground rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="secondary" className="text-xs">
                                  {getDatabaseIcon(databases.find(db => db.id === message.database)?.icon || 'database')}
                                  {databases.find(db => db.id === message.database)?.name}
                                </Badge>
                              </div>
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
                          
                          {message.type === 'assistant' && !message.data && (
                            <Card>
                              <CardContent className="p-4">
                                <p className="text-sm">{message.content}</p>
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
                    placeholder={`Ask about ${dbInfo?.name || 'your data'}...`}
                    disabled={isLoading || switchingDatabase}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim() || switchingDatabase}>
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
                {dbInfo ? `Explore ${dbInfo.name} structure` : 'Select a database to view schema'}
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
                          <Table className="w-3 h-3 mr-2" />
                          <span className="truncate">{table}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-3">
                    {selectedTable && schema[selectedTable] && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Table className="w-4 h-4" />
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

        <TabsContent value="history" className="flex-1 p-4 pt-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Query History</CardTitle>
              <CardDescription>
                Recent queries across all databases
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
                            <div className="flex items-center gap-2">
                              <Badge variant={message.type === 'user' ? 'default' : 'secondary'}>
                                {message.type === 'user' ? 'Question' : 'SQL'}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {getDatabaseIcon(databases.find(db => db.id === message.database)?.icon || 'database')}
                                {databases.find(db => db.id === message.database)?.name}
                              </Badge>
                            </div>
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