/**
 * Send Lead Notification Emails
 *
 * Handles sending internal sales notifications and customer welcome emails
 */

import { Resend } from 'resend';
import { generateLeadReportEmail, generateLeadWelcomeEmail, type LeadData } from './lead-notification';

// Lazy-initialize Resend client to avoid build-time errors when API key is not set
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not configured');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

/**
 * Send lead qualification notification to sales team
 * AND send welcome email to the lead
 */
export async function sendLeadNotification(leadData: LeadData): Promise<{
  salesEmailSent: boolean;
  welcomeEmailSent: boolean;
  errors: string[];
}> {
  const errors: string[] = [];
  let salesEmailSent = false;
  let welcomeEmailSent = false;

  // PART 1: Send internal lead report to sales team
  try {
    const salesEmail = generateLeadReportEmail(leadData);
    const salesRecipient = process.env.RESEND_NOTIFICATION_EMAIL || process.env.RESEND_SUPPORT_EMAIL || 'dio.delahoz@innovoco.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    console.log(`📧 Sending lead report to sales team: ${salesRecipient}`);

    const { data, error } = await getResendClient().emails.send({
      from: `Innovoco Lead Alerts <${fromEmail}>`,
      to: [salesRecipient],
      subject: salesEmail.subject,
      html: salesEmail.html,
      text: salesEmail.text,
    });

    if (error) {
      console.error('❌ Failed to send sales notification:', error);
      errors.push(`Sales notification failed: ${error.message}`);
    } else {
      console.log('✅ Lead report sent to sales team:', data?.id);
      salesEmailSent = true;
    }
  } catch (error) {
    console.error('❌ Exception sending sales notification:', error);
    errors.push(`Sales notification exception: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // PART 2: Send welcome email to the lead (if email exists)
  if (leadData.email) {
    try {
      const welcomeEmail = generateLeadWelcomeEmail(leadData);
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

      console.log(`📧 Sending welcome email to lead: ${leadData.email}`);

      const { data, error } = await getResendClient().emails.send({
        from: `Innovoco AI Team <${fromEmail}>`,
        to: [leadData.email],
        subject: welcomeEmail.subject,
        html: welcomeEmail.html,
        text: welcomeEmail.text,
        replyTo: process.env.RESEND_SUPPORT_EMAIL || 'dio.delahoz@innovoco.com',
      });

      if (error) {
        console.error('❌ Failed to send welcome email:', error);
        errors.push(`Welcome email failed: ${error.message}`);
      } else {
        console.log('✅ Welcome email sent to lead:', data?.id);
        welcomeEmailSent = true;
      }
    } catch (error) {
      console.error('❌ Exception sending welcome email:', error);
      errors.push(`Welcome email exception: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } else {
    console.warn('⚠️ No email address provided for lead, skipping welcome email');
    errors.push('No email address for welcome email');
  }

  return {
    salesEmailSent,
    welcomeEmailSent,
    errors
  };
}

/**
 * Send only the sales team notification (without customer welcome email)
 */
export async function sendSalesNotificationOnly(leadData: LeadData): Promise<boolean> {
  try {
    const salesEmail = generateLeadReportEmail(leadData);
    const salesRecipient = process.env.RESEND_NOTIFICATION_EMAIL || process.env.RESEND_SUPPORT_EMAIL || 'dio.delahoz@innovoco.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    console.log(`📧 Sending lead report to sales team: ${salesRecipient}`);

    const { data, error } = await getResendClient().emails.send({
      from: `Innovoco Lead Alerts <${fromEmail}>`,
      to: [salesRecipient],
      subject: salesEmail.subject,
      html: salesEmail.html,
      text: salesEmail.text,
    });

    if (error) {
      console.error('❌ Failed to send sales notification:', error);
      return false;
    }

    console.log('✅ Lead report sent to sales team:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Exception sending sales notification:', error);
    return false;
  }
}

/**
 * Send only the welcome email to the lead
 */
export async function sendWelcomeEmailOnly(leadData: LeadData): Promise<boolean> {
  if (!leadData.email) {
    console.warn('⚠️ No email address provided for lead');
    return false;
  }

  try {
    const welcomeEmail = generateLeadWelcomeEmail(leadData);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    console.log(`📧 Sending welcome email to lead: ${leadData.email}`);

    const { data, error } = await getResendClient().emails.send({
      from: `Innovoco AI Team <${fromEmail}>`,
      to: [leadData.email],
      subject: welcomeEmail.subject,
      html: welcomeEmail.html,
      text: welcomeEmail.text,
      replyTo: process.env.RESEND_SUPPORT_EMAIL || 'dio.delahoz@innovoco.com',
    });

    if (error) {
      console.error('❌ Failed to send welcome email:', error);
      return false;
    }

    console.log('✅ Welcome email sent to lead:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Exception sending welcome email:', error);
    return false;
  }
}
