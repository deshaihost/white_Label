# White Label Login Integration Guide

## Overview
Integrate HostBuddy authentication into your platform seamlessly with our white label login system.

## Quick Start

### 1. Authentication Methods
• **POST API (Recommended)**: Send credentials to `/login` endpoint
• **Token-based**: Use pre-generated access tokens
• **URL Parameters**: Pass credentials via URL (testing only)

### 2. API Endpoint
```
POST https://dev2-dot-select-stays-chatbot-v02.wl.r.appspot.com/login
Headers: 
  - Content-Type: application/json
  - X-API-Key: {YOUR_API_KEY}
Body: {"email": "user@domain.com", "password": "password"}
```

### 3. Response Format
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "gcs": true,  // Optional: indicates GCS user
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 4. Redirect URL Pattern
```
https://portal.testhostbuddy.live/white-label-login?token={TOKEN}&redirect={TARGET}&user={TYPE}
```

## User Types

### Regular Users
• **Redirect**: `redirect=dashboard`
• **Access**: Property management, bookings, analytics
• **URL**: `/white-label-login?token={TOKEN}&redirect=dashboard`

### GCS Users (Account Managers)
• **Redirect**: `redirect=gcs-users`
• **Access**: Sub-account management, host oversight
• **URL**: `/white-label-login?token={TOKEN}&redirect=gcs-users&user=gcs`
• **Auto-detection**: System checks for `"gcs": true` in API response

## Implementation Examples

### JavaScript Integration
```javascript
// Login and redirect
const response = await fetch('/login', {
  method: 'POST',
  headers: { 'X-API-Key': 'YOUR_KEY' },
  body: JSON.stringify({email, password})
});

const data = await response.json();
const isGcs = data.gcs === true;
const redirect = isGcs ? 'gcs-users' : 'dashboard';
const userParam = isGcs ? '&user=gcs' : '';

window.open(`https://portal.testhostbuddy.live/white-label-login?token=${data.access_token}&redirect=${redirect}${userParam}`);
```

### Direct URL (Testing)
```
https://portal.testhostbuddy.live/white-label-login?email=user@domain.com&password=password&user=gcs
```

## Configuration

### Environment Variables
• **Backend**: `https://dev2-dot-select-stays-chatbot-v02.wl.r.appspot.com`
• **Frontend**: `https://portal.testhostbuddy.live`
• **API Key**: Contact support for your unique key

### Test Credentials
• **Regular User**: `deshai@hostbuddy.ai` / `Ridhi@120$`
• **GCS User**: `00master@test.city` / `testPass1!`

## Security Notes
• Always use HTTPS in production
• Store API keys securely
• Tokens expire automatically
• Use POST method for credential transmission

## Demo
Test the integration: `acental-client-demo.html`

## Support
Contact: support@hostbuddy.ai