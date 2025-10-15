/**
 * Monitoring API for LangGraph Orchestrator
 * 
 * Provides endpoints for:
 * - Real-time metrics
 * - Agent performance stats
 * - Session logs
 * - System health checks
 * - Flow visualization data
 */

import { NextRequest, NextResponse } from 'next/server';
import { monitor, LogLevel } from '@/lib/orchestrator/monitoring';

/**
 * GET /api/monitoring
 * Get monitoring data based on query parameters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'metrics';
    
    switch (type) {
      case 'metrics':
        // Get system metrics
        return NextResponse.json({
          system: monitor.getSystemMetrics(),
          agents: monitor.getAgentMetrics(),
          timestamp: new Date().toISOString(),
        });
        
      case 'logs':
        // Get filtered logs
        const sessionId = searchParams.get('sessionId');
        const level = searchParams.get('level') as LogLevel | undefined;
        const agent = searchParams.get('agent');
        const hours = parseInt(searchParams.get('hours') || '1');
        
        const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
        
        const logs = monitor.exportLogs('json');
        
        return NextResponse.json({
          logs,
          count: logs.length,
          filters: {
            sessionId,
            level,
            agent,
            hours,
          },
        });
        
      case 'session':
        // Get specific session data
        const sid = searchParams.get('sessionId');
        if (!sid) {
          return NextResponse.json(
            { error: 'Session ID required' },
            { status: 400 }
          );
        }
        
        const sessionLogs = monitor.getSessionLogs(sid);
        const flowData = monitor.generateFlowVisualization(sid);
        
        return NextResponse.json({
          sessionId: sid,
          logs: sessionLogs,
          flow: flowData,
          logsCount: sessionLogs.length,
        });
        
      case 'agents':
        // Get agent-specific metrics
        const agentName = searchParams.get('agent');
        const agentMetrics = monitor.getAgentMetrics(agentName || undefined);
        
        return NextResponse.json({
          agent: agentName || 'all',
          metrics: agentMetrics,
          timestamp: new Date().toISOString(),
        });
        
      case 'health':
        // Health check endpoint
        const systemMetrics = monitor.getSystemMetrics();
        const isHealthy = systemMetrics.errorRate < 10; // Less than 10% error rate
        
        return NextResponse.json({
          status: isHealthy ? 'healthy' : 'degraded',
          metrics: {
            activeSessions: systemMetrics.activeSessions,
            errorRate: systemMetrics.errorRate,
            conversionRate: systemMetrics.conversionRate,
            avgSessionDuration: systemMetrics.avgSessionDuration,
          },
          timestamp: new Date().toISOString(),
        }, {
          status: isHealthy ? 200 : 503,
        });
        
      case 'export':
        // Export all data for analysis
        const exportHours = parseInt(searchParams.get('hours') || '24');
        const exportStartTime = new Date(Date.now() - exportHours * 60 * 60 * 1000);
        
        const exportData = {
          logs: monitor.exportLogs({ startTime: exportStartTime }),
          metrics: {
            system: monitor.getSystemMetrics(),
            agents: monitor.getAgentMetrics(),
          },
          exportedAt: new Date().toISOString(),
          period: {
            start: exportStartTime.toISOString(),
            end: new Date().toISOString(),
          },
        };
        
        // Return as downloadable JSON
        return new NextResponse(JSON.stringify(exportData, null, 2), {
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="langgraph-monitor-${Date.now()}.json"`,
          },
        });
        
      default:
        return NextResponse.json(
          { error: 'Invalid monitoring type' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Monitoring API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/monitoring
 * Trigger monitoring actions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    switch (action) {
      case 'cleanup':
        // Clean up old data
        const days = body.days || 7;
        const cleanupDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        monitor.cleanup(cleanupDate);
        
        return NextResponse.json({
          success: true,
          message: `Cleaned up data older than ${days} days`,
          cleanupDate: cleanupDate.toISOString(),
        });
        
      case 'track':
        // Track custom event
        const { sessionId, event, data } = body;
        if (!sessionId || !event) {
          return NextResponse.json(
            { error: 'Session ID and event are required' },
            { status: 400 }
          );
        }
        
        monitor.trackSession(sessionId, event);
        
        return NextResponse.json({
          success: true,
          sessionId,
          event,
          timestamp: new Date().toISOString(),
        });
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Monitoring action error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Server-sent events for real-time monitoring
 * Note: This is an internal function, not a route export
 */
async function* streamMetrics() {
  while (true) {
    yield {
      type: 'metrics',
      data: {
        system: monitor.getSystemMetrics(),
        timestamp: new Date().toISOString(),
      },
    };
    
    // Wait 5 seconds before next update
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}