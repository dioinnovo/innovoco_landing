/**
 * Client Email Template
 * 
 * Email templates for client communications
 */

import { ClientInfo } from './client-schema';
import { SolutionVision } from './solution-vision';

export function generateWelcomeEmail(clientInfo: ClientInfo): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Welcome to Innovoco, ${clientInfo.name}!`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f8f9fa; }
        .cta { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Innovoco</h1>
          <p>Your Journey to AI-Powered Transformation Begins Here</p>
        </div>
        <div class="content">
          <h2>Hello ${clientInfo.name},</h2>
          <p>Thank you for your interest in Innovoco's AI and automation solutions.</p>
          
          ${clientInfo.company ? `<p>We're excited to explore how we can help <strong>${clientInfo.company}</strong> achieve its digital transformation goals.</p>` : ''}
          
          <h3>What's Next?</h3>
          <ul>
            <li>Our team will review your requirements</li>
            <li>We'll prepare a personalized solution vision</li>
            <li>Schedule a discovery call to discuss your needs</li>
          </ul>
          
          <center>
            <a href="https://innovoco.com/schedule" class="cta">Schedule Your Discovery Call</a>
          </center>
          
          <p>In the meantime, explore our resources:</p>
          <ul>
            <li><a href="https://innovoco.com/case-studies">Success Stories</a></li>
            <li><a href="https://innovoco.com/ai-workshop">AI Workshop Materials</a></li>
            <li><a href="https://innovoco.com/resources">Knowledge Base</a></li>
          </ul>
        </div>
        <div class="footer">
          <p>© 2024 Innovoco - Transforming Business Through AI & Automation</p>
          <p>Questions? Reply to this email or call us at 1-800-INNOVOCO</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
Welcome to Innovoco, ${clientInfo.name}!

Thank you for your interest in Innovoco's AI and automation solutions.

${clientInfo.company ? `We're excited to explore how we can help ${clientInfo.company} achieve its digital transformation goals.\n` : ''}

What's Next?
- Our team will review your requirements
- We'll prepare a personalized solution vision
- Schedule a discovery call to discuss your needs

Schedule Your Discovery Call: https://innovoco.com/schedule

In the meantime, explore our resources:
- Success Stories: https://innovoco.com/case-studies
- AI Workshop Materials: https://innovoco.com/ai-workshop
- Knowledge Base: https://innovoco.com/resources

© 2024 Innovoco - Transforming Business Through AI & Automation
Questions? Reply to this email or call us at 1-800-INNOVOCO
  `;
  
  return { subject, html, text };
}

export function buildClientEmail(clientInfo: ClientInfo, solutions?: any[]): {
  subject: string;
  html: string;
  text: string;
} {
  return generateWelcomeEmail(clientInfo);
}

export function generateSolutionEmail(clientInfo: ClientInfo, vision: SolutionVision): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Your Personalized AI Solution Vision - Innovoco`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f8f9fa; }
        .solution-card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .cta { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Personalized Solution Vision</h1>
          <p>Tailored AI & Automation Strategy for ${vision.companyName || 'Your Organization'}</p>
        </div>
        <div class="content">
          <h2>Dear ${vision.clientName},</h2>
          <p>Based on our understanding of your needs, we've prepared a customized solution vision to address your challenges and accelerate your digital transformation.</p>
          
          <h3>Your Key Challenges</h3>
          <ul>
            ${vision.challenges.map(c => `<li>${c}</li>`).join('')}
          </ul>
          
          <h3>Recommended Solutions</h3>
          ${vision.proposedSolutions.map(solution => `
            <div class="solution-card">
              <h4>${solution.title}</h4>
              <p>${solution.description}</p>
              <p><strong>Expected Benefits:</strong></p>
              <ul>
                ${solution.benefits.map(b => `<li>${b}</li>`).join('')}
              </ul>
              <p><strong>Timeline:</strong> ${solution.timeframe}</p>
            </div>
          `).join('')}
          
          ${vision.estimatedROI ? `<p><strong>Projected ROI:</strong> ${vision.estimatedROI}</p>` : ''}
          
          <h3>Your Next Steps</h3>
          <ol>
            ${vision.nextSteps.map(step => `<li>${step}</li>`).join('')}
          </ol>
          
          <center>
            <a href="https://innovoco.com/schedule" class="cta">Schedule Your Strategy Session</a>
          </center>
        </div>
        <div class="footer">
          <p>© 2024 Innovoco - Transforming Business Through AI & Automation</p>
          <p>This solution vision is customized for you. Let's discuss how to make it reality.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
Your Personalized Solution Vision

Dear ${vision.clientName},

Based on our understanding of your needs, we've prepared a customized solution vision to address your challenges and accelerate your digital transformation.

YOUR KEY CHALLENGES:
${vision.challenges.map(c => `- ${c}`).join('\n')}

RECOMMENDED SOLUTIONS:
${vision.proposedSolutions.map(solution => `
${solution.title}
${solution.description}

Expected Benefits:
${solution.benefits.map(b => `- ${b}`).join('\n')}

Timeline: ${solution.timeframe}
`).join('\n')}

${vision.estimatedROI ? `Projected ROI: ${vision.estimatedROI}\n` : ''}

YOUR NEXT STEPS:
${vision.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

Schedule Your Strategy Session: https://innovoco.com/schedule

© 2024 Innovoco - Transforming Business Through AI & Automation
This solution vision is customized for you. Let's discuss how to make it reality.
  `;
  
  return { subject, html, text };
}