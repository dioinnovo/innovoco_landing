# Email Setup Instructions

## Overview
The contact form on the landing page now sends emails to `support@innovoco.com` using Resend email service and Next.js server actions.

## Setup Steps

### 1. Create Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (10,000 emails/month free)
3. Verify your email address

### 2. Get API Key
1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Innovoco Contact Form")
4. Copy the API key (starts with `re_`)

### 3. Configure Environment Variables
Create a `.env.local` file in the `nextjs-app` directory:

```bash
# Resend API Key
RESEND_API_KEY=re_your_actual_api_key_here
```

### 4. Domain Verification (Optional but Recommended)
For production, verify your domain to send from `@innovoco.com`:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter `innovoco.com`
4. Add the DNS records shown to your domain provider
5. Once verified, update the server action to use your domain:

```typescript
// In app/actions/contact.ts
from: 'Innovoco Contact Form <noreply@innovoco.com>',
```

## Features Implemented

### ✅ Form Validation
- Client-side validation with Zod schema
- Required fields: name, email, company, position, message
- Email format validation
- Minimum/maximum character limits

### ✅ Server Action
- Secure server-side form processing
- No API routes exposed to client
- Automatic CSRF protection
- Type-safe with TypeScript

### ✅ Email Formatting
- Professional HTML email template
- Plain text fallback for compatibility
- Reply-to header set to submitter's email
- Informative subject line with company name

### ✅ User Experience
- Loading states during submission
- Success/error messages
- Form reset after successful submission
- Auto-close modal after success
- Responsive design

### ✅ Error Handling
- Graceful error handling
- User-friendly error messages
- Console logging for debugging
- Field-specific validation errors

## Testing

### Development Testing
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the landing page
3. Click "Book My Call" button
4. Fill out the form
5. Check console for email logs (in development mode)

### Production Testing
1. Deploy to production with environment variables
2. Submit a test form
3. Check `support@innovoco.com` inbox

## Email Template Preview
The email includes:
- Professional header with gradient
- Structured data display
- Contact information
- Submission timestamp
- Reply-to functionality

## Monitoring
- Check Resend dashboard for email delivery status
- View email logs and analytics
- Monitor bounce rates and engagement

## Troubleshooting

### Email not sending?
1. Check API key is correct in `.env.local`
2. Verify Resend account is active
3. Check console for error messages
4. Ensure you're not exceeding rate limits

### Form not submitting?
1. Check browser console for errors
2. Verify all required fields are filled
3. Check network tab for server errors
4. Ensure server actions are enabled

## Security Notes
- Never commit `.env.local` to version control
- API keys should only be on server-side
- Form data is validated on both client and server
- Consider adding rate limiting for production
- Add CAPTCHA for spam prevention if needed