# Email Setup with SendGrid

This project uses SendGrid for sending emails. Follow these steps to set up email functionality:

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Create an API key in the SendGrid dashboard
3. Add the following environment variables to your `.env.local` file:

```
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_verified_sender_email@example.com
```

Note: The FROM_EMAIL must be a verified sender in your SendGrid account.

## Sender Verification

1. Go to the SendGrid dashboard
2. Navigate to Settings > Sender Authentication
3. Follow the steps to verify a single sender or set up domain authentication
4. Use the verified email address as the FROM_EMAIL in your environment variables
