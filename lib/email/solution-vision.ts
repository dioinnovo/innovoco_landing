/**
 * Solution Vision
 * 
 * Generate personalized solution visions for clients
 */

import { ClientInfo } from './client-schema';

export interface SolutionVision {
  clientName: string;
  companyName?: string;
  challenges: string[];
  proposedSolutions: {
    title: string;
    description: string;
    benefits: string[];
    timeframe: string;
  }[];
  nextSteps: string[];
  estimatedROI?: string;
}

export function generateSolutionVision(clientInfo: ClientInfo): SolutionVision {
  const solutions = [];
  
  // Add AI solutions based on interest
  if (clientInfo.interestedSolutions?.includes('ai')) {
    solutions.push({
      title: 'AI-Powered Automation',
      description: 'Implement intelligent automation to streamline your operations',
      benefits: [
        'Reduce manual tasks by up to 70%',
        'Improve accuracy and consistency',
        'Free up team for strategic work'
      ],
      timeframe: '3-6 months'
    });
  }
  
  // Add data solutions
  if (clientInfo.interestedSolutions?.includes('data')) {
    solutions.push({
      title: 'Data Transformation Platform',
      description: 'Build a modern data infrastructure for better insights',
      benefits: [
        'Real-time business intelligence',
        'Data-driven decision making',
        'Predictive analytics capabilities'
      ],
      timeframe: '4-8 months'
    });
  }
  
  // Default solution if none specified
  if (solutions.length === 0) {
    solutions.push({
      title: 'Digital Transformation Assessment',
      description: 'Comprehensive evaluation of your digital maturity and opportunities',
      benefits: [
        'Clear roadmap for transformation',
        'Prioritized improvement areas',
        'ROI projections for initiatives'
      ],
      timeframe: '2-4 weeks'
    });
  }
  
  return {
    clientName: clientInfo.name,
    companyName: clientInfo.company,
    challenges: clientInfo.currentChallenges || ['Operational efficiency', 'Data silos', 'Manual processes'],
    proposedSolutions: solutions,
    nextSteps: [
      'Schedule a discovery call',
      'Deep-dive workshop on priority areas',
      'Develop proof of concept',
      'Create implementation roadmap'
    ],
    estimatedROI: '200-300% within first year'
  };
}

export function mapChallengesToSolutions(challenges: string[]): any[] {
  const solutionMap: Record<string, any> = {
    'efficiency': {
      title: 'Process Automation',
      description: 'Streamline operations with intelligent automation',
      priority: 'high'
    },
    'data': {
      title: 'Data Analytics Platform',
      description: 'Unlock insights from your data',
      priority: 'high'
    },
    'customer': {
      title: 'Customer Experience Enhancement',
      description: 'AI-powered customer engagement',
      priority: 'medium'
    }
  };
  
  return challenges.map(challenge => {
    const key = challenge.toLowerCase();
    for (const [mapKey, solution] of Object.entries(solutionMap)) {
      if (key.includes(mapKey)) {
        return solution;
      }
    }
    return {
      title: 'Custom Solution',
      description: `Tailored solution for ${challenge}`,
      priority: 'medium'
    };
  });
}

export function generateSuccessMetrics(solutions: any[]): any {
  return {
    expectedROI: '200-300%',
    timeToValue: '3-6 months',
    efficiencyGains: '40-60%',
    costReduction: '25-35%'
  };
}

export function generateIndustryProof(industry?: string): any {
  const proofs: Record<string, any> = {
    'finance': {
      cases: ['Automated 80% of loan processing', 'Reduced fraud by 65%'],
      companies: ['Major Bank', 'Insurance Provider']
    },
    'healthcare': {
      cases: ['Improved patient outcomes by 30%', 'Reduced admin time by 50%'],
      companies: ['Regional Hospital', 'Health Network']
    },
    'retail': {
      cases: ['Increased sales by 45%', 'Optimized inventory by 60%'],
      companies: ['E-commerce Leader', 'Retail Chain']
    }
  };
  
  return proofs[industry?.toLowerCase() || ''] || {
    cases: ['Improved efficiency by 40%', 'Reduced costs by 30%'],
    companies: ['Fortune 500 Company', 'Industry Leader']
  };
}

export function formatSolutionVisionHTML(vision: SolutionVision): string {
  return `
    <h2>Personalized Solution Vision for ${vision.clientName}</h2>
    ${vision.companyName ? `<h3>${vision.companyName}</h3>` : ''}
    
    <h3>Understanding Your Challenges</h3>
    <ul>
      ${vision.challenges.map(c => `<li>${c}</li>`).join('')}
    </ul>
    
    <h3>Proposed Solutions</h3>
    ${vision.proposedSolutions.map(solution => `
      <div>
        <h4>${solution.title}</h4>
        <p>${solution.description}</p>
        <p><strong>Key Benefits:</strong></p>
        <ul>
          ${solution.benefits.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <p><strong>Implementation Timeframe:</strong> ${solution.timeframe}</p>
      </div>
    `).join('')}
    
    <h3>Next Steps</h3>
    <ol>
      ${vision.nextSteps.map(step => `<li>${step}</li>`).join('')}
    </ol>
    
    ${vision.estimatedROI ? `<p><strong>Estimated ROI:</strong> ${vision.estimatedROI}</p>` : ''}
  `;
}