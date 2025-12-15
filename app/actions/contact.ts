'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';

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

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactFormState> {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(formData);

    // Create formatted email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0A58D0 0%, #3B82F6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #555; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #ddd; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Book My Call Request</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${validatedData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${validatedData.company}</div>
              </div>
              <div class="field">
                <div class="label">Position</div>
                <div class="value">${validatedData.position}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap;">${validatedData.message}</div>
              </div>
              <div class="footer">
                <p>Submitted on ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}</p>
                <p>This email was sent from the Innovoco website contact form.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create plain text version for better compatibility
    const emailText = `
New Contact Form Submission - Book My Call Request

Name: ${validatedData.name}
Email: ${validatedData.email}
Company: ${validatedData.company}
Position: ${validatedData.position}

Message:
${validatedData.message}

---
Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
This email was sent from the Innovoco website contact form.
    `;

    // Send email using Resend
    const { data, error } = await getResendClient().emails.send({
      from: 'Innovoco Contact Form <onboarding@resend.dev>', // You'll need to verify your domain with Resend
      to: ['dio.delahoz@innovoco.com'],
      subject: `New Contact Form Submission from ${validatedData.name} - ${validatedData.company}`,
      html: emailHtml,
      text: emailText,
      replyTo: validatedData.email,
    });

    if (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: 'Failed to send your message. Please try again or contact us directly.',
      };
    }

    // Optional: Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Email sent successfully:', data);
    }

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you within 1 hour during business hours.',
    };

  } catch (error) {
    console.error('Form submission error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please check your form inputs.',
        errors: error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    // Handle other errors
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}