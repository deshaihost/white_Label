# White Label Login Implementation

This implementation allows white-label domains like `c.acental.com` to authenticate users through `hostbuddy.ai` while maintaining a seamless user experience.

## How It Works

### 1. DNS Configuration
- The white-label domain `c.acental.com/login` points to `hostbuddy.ai/white-label-login` via CNAME in DNS
- This allows the white-label domain to serve content from hostbuddy.ai

### 2. Authentication Flow
When a user visits a white-label domain, there are multiple authentication methods available:

## White Label Login Methods

### Method 1: Email & Password Parameters
**URL Format:**
```
/white-label-login?email=user@example.com&password=userpassword
```

**Example:**
```
https://c.acental.com/white-label-login?email=john@example.com&password=mypass123
```

**Use Case:** Direct login with credentials in URL parameters

---

### Method 2: JWT Token Authentication (Regular Users)
**URL Format:**
```
/white-label-login?token=JWT_TOKEN_HERE
```

**Example:**
```
https://c.acental.com/white-label-login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Use Case:** Single sign-on with pre-generated JWT tokens
**Redirect:** After authentication → `/dashboard`

---

### Method 3: GCS User Authentication
**URL Format:**
```
/white-label-login?token=JWT_TOKEN_HERE&user=gcs
```

**Example:**
```
https://c.acental.com/white-label-login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&user=gcs
```

**Use Case:** Guest Communication System (GCS) user authentication
**Redirect:** After authentication → `/gcs-users`
**Special Handling:** 
- Sets `gcs_access_token` in session storage
- Shows "Logging in as GCS user..." message
- Supports both regular GCS users and master account access

---

### Method 4: Redirect Parameter (Optional)
**URL Format:**
```
/white-label-login?token=JWT_TOKEN&redirect=/specific-page
```

**Example:**
```
https://c.acental.com/white-label-login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&redirect=/properties
```

**Use Case:** Direct specific page after authentication
**Note:** Can be combined with any authentication method above

---

### Method 5: POST Message Method (iframe scenarios)
```javascript
// From parent window (c.acental.com)
iframe.contentWindow.postMessage({
  type: 'WHITE_LABEL_LOGIN',
  credentials: {
    email: 'user@example.com',
    password: 'userpassword'
  }
}, 'https://hostbuddy.ai');
```

**Use Case:** Embedded iframe authentication

---

### Method 6: Direct API Authentication
```javascript
fetch('https://hostbuddy.ai/api/white-label-login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://c.acental.com'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'userpassword',
    whiteLabelDomain: 'c.acental.com'
  })
});
```

**Use Case:** Backend-to-backend authentication

### 3. Component Behavior

#### WhiteLabelLogin Component
- **Multi-Method Support**: Handles email/password, JWT tokens, and GCS authentication
- **Automatic Detection**: Detects authentication method from URL parameters
- **GCS User Support**: Special handling for `user=gcs` parameter
- **Token Storage**: Manages both regular and GCS tokens in session storage
- **Smart Redirects**: Routes users to appropriate pages based on user type
- **Loading States**: Shows contextual loading messages during authentication
- **White Label Branding**: Applies custom branding based on domain
- **Error Handling**: Provides user-friendly error messages

#### Regular Login Component  
- **Domain Detection**: Only redirects to white-label-login for known white-label domains
- **Anti-Flickering**: Prevents URL flickering between /login and /white-label-login
- **Main Domain Protection**: Never redirects users on hostbuddy.ai main domains
- **Logout State Management**: Handles white-label logout state properly

## File Structure

```
src/
├── auth/
│   ├── login/
│   │   └── Login.jsx (modified)
│   └── whiteLabelLogin/
│       └── WhiteLabelLogin.jsx (new)
├── redux/
│   └── auth/
│       └── whiteLabelLogin/
│           └── api.js (new)
└── routes/
    └── Routes.jsx (modified)
```

## Security Considerations

1. **CORS Validation**: Only allow requests from approved white-label domains
2. **Origin Verification**: Validate the origin header in API requests
3. **Domain Whitelist**: Maintain a list of approved white-label domains
4. **Rate Limiting**: Implement rate limiting for login attempts
5. **SSL/TLS**: Ensure all communications are over HTTPS

## Configuration

### Environment Variables
Add these to your environment configuration:

```env
REACT_APP_ALLOWED_WHITE_LABEL_DOMAINS=c.acental.com,app.acental.com,acental.com
REACT_APP_WHITE_LABEL_ENABLED=true
```

### Known White Label Domains
Currently supported domains (configurable in Login.jsx):
- `c.acental.com`
- `app.acental.com` 
- `acental.com`

### User Types Supported
1. **Regular Users**: Standard HostBuddy users → redirect to `/dashboard`
2. **GCS Users**: Guest Communication System users → redirect to `/gcs-users`
3. **GCS Master Users**: Admin role GCS users with elevated permissions

### Token Storage Strategy
- **Regular Users**: `token` in localStorage/sessionStorage
- **GCS Users**: `gcs_access_token` in sessionStorage
- **White Label State**: `whiteLabelDomain` and `whiteLabelBrand` in localStorage

### Backend API Updates
Your backend should be updated to handle the white-label login requests:

```javascript
// Example backend endpoint
app.post('/api/white-label-login', (req, res) => {
  const { email, password, whiteLabelDomain } = req.body;
  const origin = req.headers.origin;
  
  // Validate origin
  if (!validateOrigin(origin)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }
  
  // Validate white-label domain
  if (!validateWhiteLabelDomain(whiteLabelDomain)) {
    return res.status(403).json({ error: 'Invalid white-label domain' });
  }
  
  // Process login...
  authenticateUser(email, password)
    .then(result => {
      // Add white-label domain info to response
      result.whiteLabelDomain = whiteLabelDomain;
      res.json(result);
    })
    .catch(error => {
      res.status(401).json({ error: 'Authentication failed' });
    });
});
```

## Testing

### Test URLs for Different Authentication Methods

#### 1. Email & Password Authentication
```
https://hostbuddy.ai/white-label-login?email=test@example.com&password=testpass
```

#### 2. JWT Token Authentication (Regular User)
```
https://hostbuddy.ai/white-label-login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 3. GCS User Authentication
```
https://hostbuddy.ai/white-label-login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&user=gcs
```

#### 4. GCS Master User Authentication
```
https://hostbuddy.ai/white-label-login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&user=gcs
```
*Note: Master users have "admin" role in JWT claims*

#### 5. With Custom Redirect
```
https://hostbuddy.ai/white-label-login?token=JWT_TOKEN&redirect=/properties
```

#### 6. On Actual White Label Domain
```
https://c.acental.com/white-label-login?token=JWT_TOKEN&user=gcs
```

### Test Scenarios

#### Regular User Flow
1. User clicks login → stays on `/login` (no flickering)
2. Token authentication → redirects to `/dashboard`
3. Logout → returns to white-label login page

#### GCS User Flow  
1. GCS token with `user=gcs` → shows "Logging in as GCS user..."
2. Authentication success → redirects to `/gcs-users`
3. Token stored as `gcs_access_token` in session storage

#### White Label Domain Flow
1. Known white-label domain → auto-redirects to white-label-login
2. Unknown domain → stays on regular login
3. Main hostbuddy.ai domain → never redirects to white-label

### Test with cURL
```bash
curl -X POST https://hostbuddy.ai/api/white-label-login \
  -H "Content-Type: application/json" \
  -H "Origin: https://c.acental.com" \
  -d '{
    "email": "test@example.com",
    "password": "testpass",
    "whiteLabelDomain": "c.acental.com"
  }'
```

## Implementation Steps

1. **DNS Setup**: Configure CNAME record for `c.acental.com/login` → `hostbuddy.ai`
2. **Backend Updates**: Add white-label domain validation and logging
3. **Frontend Deployment**: Deploy the updated React components
4. **Testing**: Test the authentication flow from the white-label domain
5. **Monitoring**: Set up monitoring for white-label login attempts

## Troubleshooting

### Common Issues

1. **URL Flickering Between /login and /white-label-login**
   - **Cause**: Aggressive redirect logic in Login component
   - **Fix**: Only redirect for known white-label domains, never on main hostbuddy domains

2. **GCS Token Not Working**
   - **Cause**: Missing `user=gcs` parameter
   - **Fix**: Always include `user=gcs` parameter for GCS authentication

3. **Regular Login Redirecting to White Label**
   - **Cause**: User on main domain being redirected unnecessarily  
   - **Fix**: Check current domain, not referrer domain

4. **CORS Errors**: Ensure the backend allows requests from white-label domains

5. **Authentication Failures**: Verify that credentials/tokens are passed correctly

6. **Missing Parameters**: Ensure URL parameters contain required fields

7. **Token Storage Issues**
   - **Regular Users**: Token stored as `token`
   - **GCS Users**: Token stored as `gcs_access_token`

### Debug Mode
Add debug logging to track white-label login attempts:

```javascript
if (process.env.NODE_ENV === 'development') {
  console.log('White-label login attempt:', {
    referrer: document.referrer,
    origin: window.location.origin,
    credentials: { email: '***', password: '***' }
  });
}
```

## Future Enhancements

1. **Multiple White-Label Domains**: Support multiple client domains
2. **Custom Branding**: Allow white-label domains to customize the login page
3. **SSO Integration**: Add SAML/OAuth support for enterprise clients
4. **Analytics**: Track login success rates by white-label domain
5. **API Rate Limiting**: Implement domain-specific rate limits