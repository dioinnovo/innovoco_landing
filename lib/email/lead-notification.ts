/**
 * Lead Notification Email Templates
 *
 * Internal notifications for sales team and welcome emails for leads
 */

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  painPoint?: string;
  budget?: string;
  timeline?: string;
  conversationHistory: Array<{ role: string; content: string; timestamp: Date }>;
  qualifiedAt: Date;
}

/**
 * Generate internal lead report email for sales team
 */
export function generateLeadReportEmail(leadData: LeadData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `🔥 New Qualified Lead: ${leadData.name || 'Unknown'} ${leadData.company ? `from ${leadData.company}` : ''}`;

  // Format conversation history
  const conversationHtml = leadData.conversationHistory
    .slice(-10) // Last 10 messages
    .map(msg => `
      <div style="margin-bottom: 12px; padding: 10px; background: ${msg.role === 'user' ? '#f0f9ff' : '#f9fafb'}; border-left: 3px solid ${msg.role === 'user' ? '#3b82f6' : '#6b7280'}; border-radius: 4px;">
        <div style="font-weight: 600; color: ${msg.role === 'user' ? '#1e40af' : '#374151'}; margin-bottom: 4px;">
          ${msg.role === 'user' ? '👤 Customer' : '🤖 Luci'}
        </div>
        <div style="color: #1f2937;">${msg.content}</div>
        <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">
          ${new Date(msg.timestamp).toLocaleString()}
        </div>
      </div>
    `).join('');

  const conversationText = leadData.conversationHistory
    .slice(-10)
    .map(msg => `[${msg.role === 'user' ? 'Customer' : 'Luci'}] ${msg.content}`)
    .join('\n\n');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; }
        .container { max-width: 650px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #0A58D0 0%, #3B82F6 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 10px 0 0; opacity: 0.95; font-size: 14px; }
        .priority-badge { background: #ef4444; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin-top: 10px; }
        .content { padding: 30px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .info-item { background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
        .info-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 6px; }
        .info-value { font-size: 16px; color: #111827; font-weight: 500; }
        .cta-button { display: inline-block; background: #0A58D0; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 10px 10px 10px 0; }
        .cta-button:hover { background: #084298; }
        .conversation { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; max-height: 400px; overflow-y: auto; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
        .quick-action { background: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .quick-action strong { color: #92400e; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔥 New Qualified Lead</h1>
          <p>Voice AI Assistant - Lead Qualification Complete</p>
          <div class="priority-badge">IMMEDIATE ACTION REQUIRED</div>
        </div>

        <div class="content">
          <div class="quick-action">
            <strong>⚡ Next Step:</strong> Contact this lead within 1 hour for best conversion rate!
          </div>

          <div class="section">
            <div class="section-title">Lead Information</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Name</div>
                <div class="info-value">${leadData.name || 'Not provided'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Company</div>
                <div class="info-value">${leadData.company || 'Not provided'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">
                  ${leadData.email ? `<a href="mailto:${leadData.email}" style="color: #0A58D0;">${leadData.email}</a>` : 'Not provided'}
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">Phone</div>
                <div class="info-value">
                  ${leadData.phone ? `<a href="tel:${leadData.phone}" style="color: #0A58D0;">${leadData.phone}</a>` : 'Not provided'}
                </div>
              </div>
            </div>
          </div>

          ${leadData.painPoint ? `
          <div class="section">
            <div class="section-title">Challenge / Pain Point</div>
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; font-size: 15px; color: #78350f;">${leadData.painPoint}</p>
            </div>
          </div>
          ` : ''}

          ${leadData.budget || leadData.timeline ? `
          <div class="section">
            <div class="section-title">Project Details</div>
            <div class="info-grid">
              ${leadData.budget ? `
              <div class="info-item">
                <div class="info-label">Budget</div>
                <div class="info-value">${leadData.budget}</div>
              </div>
              ` : ''}
              ${leadData.timeline ? `
              <div class="info-item">
                <div class="info-label">Timeline</div>
                <div class="info-value">${leadData.timeline}</div>
              </div>
              ` : ''}
            </div>
          </div>
          ` : ''}

          <div class="section">
            <div class="section-title">Conversation Transcript</div>
            <div class="conversation">
              ${conversationHtml}
            </div>
          </div>

          <div class="section" style="text-align: center; margin-top: 30px;">
            <a href="mailto:${leadData.email || ''}" class="cta-button">📧 Email Lead</a>
            <a href="tel:${leadData.phone || ''}" class="cta-button">📞 Call Lead</a>
          </div>
        </div>

        <div class="footer">
          <p><strong>Qualified at:</strong> ${new Date(leadData.qualifiedAt).toLocaleString()}</p>
          <p>This lead was qualified by Luci, your AI voice assistant</p>
          <p style="margin-top: 15px;">Innovoco AI & Automation Platform</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
🔥 NEW QUALIFIED LEAD - IMMEDIATE ACTION REQUIRED

${leadData.name || 'Unknown'} ${leadData.company ? `from ${leadData.company}` : ''}

LEAD INFORMATION:
- Name: ${leadData.name || 'Not provided'}
- Email: ${leadData.email || 'Not provided'}
- Phone: ${leadData.phone || 'Not provided'}
- Company: ${leadData.company || 'Not provided'}

${leadData.painPoint ? `CHALLENGE/PAIN POINT:\n${leadData.painPoint}\n` : ''}

${leadData.budget ? `Budget: ${leadData.budget}\n` : ''}
${leadData.timeline ? `Timeline: ${leadData.timeline}\n` : ''}

CONVERSATION TRANSCRIPT:
${conversationText}

---
Qualified at: ${new Date(leadData.qualifiedAt).toLocaleString()}
This lead was qualified by Luci, your AI voice assistant.

⚡ NEXT STEP: Contact this lead within 1 hour for best conversion rate!
  `;

  return { subject, html, text };
}

/**
 * Generate welcome email for the lead (customer-facing)
 */
export function generateLeadWelcomeEmail(leadData: LeadData): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = leadData.name?.split(' ')[0] || 'there';
  const subject = `${firstName}, thank you for connecting with Innovoco`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.7; color: #1f2937; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #0A58D0 0%, #3B82F6 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 12px 0 0; opacity: 0.95; font-size: 16px; }
        .content { padding: 35px 30px; }
        .greeting { font-size: 18px; margin-bottom: 20px; }
        .highlight-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 25px 0; }
        .cta-button { display: inline-block; background: #0A58D0; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .cta-button:hover { background: #084298; }
        .footer { background: #f9fafb; padding: 25px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; }
        .footer a { color: #0A58D0; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Innovoco</h1>
          <p>Your AI & Automation Partner</p>
        </div>

        <div class="content">
          <p class="greeting">Hi ${firstName},</p>

          <p>Thank you for reaching out to us today about ${leadData.painPoint ? leadData.painPoint.toLowerCase() : 'your AI and automation needs'}. We're excited to help you transform your business with intelligent automation.</p>

          <div class="highlight-box">
            <strong>🎯 What Happens Next:</strong>
            <ul style="margin: 12px 0 0; padding-left: 20px;">
              <li>One of our AI consultants will contact you within <strong>24 hours</strong></li>
              <li>We'll discuss your specific challenges and goals in detail</li>
              <li>You'll receive a personalized solution proposal tailored to your needs</li>
            </ul>
          </div>

          <p>In the meantime, here are some resources you might find valuable:</p>
          <ul>
            <li><strong>Case Studies:</strong> See how we've helped companies like yours</li>
            <li><strong>AI Workshop Materials:</strong> Learn about the latest in AI & automation</li>
            <li><strong>ROI Calculator:</strong> Estimate your potential savings</li>
          </ul>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://innovoco.com/case-studies" class="cta-button">View Success Stories</a>
          </div>

          <p>If you have any immediate questions, feel free to reply to this email or call us directly.</p>

          <p style="margin-top: 30px;">Looking forward to working with you!</p>

          <p style="margin-top: 20px;">
            <strong>The Innovoco Team</strong><br>
            <span style="color: #6b7280;">Transforming Business Through AI & Automation</span>
          </p>
        </div>

        <div class="footer">
          <p><strong>Innovoco AI & Automation</strong></p>
          <p>
            <a href="https://innovoco.com">innovoco.com</a> |
            <a href="mailto:dio.delahoz@innovoco.com">Contact Us</a>
          </p>
          <p style="margin-top: 15px; font-size: 11px; color: #9ca3af;">
            You're receiving this email because you connected with our AI assistant.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Hi ${firstName},

Thank you for reaching out to us today about ${leadData.painPoint ? leadData.painPoint.toLowerCase() : 'your AI and automation needs'}. We're excited to help you transform your business with intelligent automation.

WHAT HAPPENS NEXT:

- One of our AI consultants will contact you within 24 hours
- We'll discuss your specific challenges and goals in detail
- You'll receive a personalized solution proposal tailored to your needs

In the meantime, here are some resources you might find valuable:

- Case Studies: See how we've helped companies like yours
  https://innovoco.com/case-studies

- AI Workshop Materials: Learn about the latest in AI & automation
  https://innovoco.com/ai-workshop

- ROI Calculator: Estimate your potential savings
  https://innovoco.com/roi-calculator

If you have any immediate questions, feel free to reply to this email or call us directly.

Looking forward to working with you!

The Innovoco Team
Transforming Business Through AI & Automation

---
Innovoco AI & Automation
innovoco.com | dio.delahoz@innovoco.com

You're receiving this email because you connected with our AI assistant.
  `;

  return { subject, html, text };
}
