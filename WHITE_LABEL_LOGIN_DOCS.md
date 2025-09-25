# White Label Login Implementation

This implementation allows white-label domains like `c.acental.com` to authenticate users through `hostbuddy.ai` while maintaining a seamless user experience.

## How It Works

### 1. DNS Configuration
- The white-label domain `c.acental.com/login` points to `hostbuddy.ai/white-label-login` via CNAME in DNS
- This allows the white-label domain to serve content from hostbuddy.ai

### 2. Authentication Flow
When a user visits `c.acental.com/login`:

1. **URL Parameters Method**: 
   ```
   c.acental.com/login?email=user@example.com&password=userpassword
   ```

2. **POST Message Method** (for iframe scenarios):
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

3. **Direct POST API** (recommended):
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

### 3. Component Behavior

#### WhiteLabelLogin Component
- Automatically detects white-label login attempts
- Extracts credentials from URL parameters or POST messages
- Handles authentication through the existing Redux flow
- Provides appropriate redirects and error handling
- Shows loading states during authentication

#### Regular Login Component
- Detects white-label requests and redirects to WhiteLabelLogin
- Maintains existing functionality for direct hostbuddy.ai users

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
REACT_APP_ALLOWED_WHITE_LABEL_DOMAINS=c.acental.com,other-domain.com
REACT_APP_WHITE_LABEL_ENABLED=true
```

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

### Test URLs
1. **Direct white-label login**:
   ```
   https://hostbuddy.ai/white-label-login?email=test@example.com&password=testpass
   ```

2. **Through regular login (should redirect)**:
   ```
   https://hostbuddy.ai/login?email=test@example.com&password=testpass
   ```

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

1. **CORS Errors**: Ensure the backend allows requests from white-label domains
2. **Redirect Loops**: Check that the DNS configuration is correct
3. **Authentication Failures**: Verify that credentials are passed correctly
4. **Missing Parameters**: Ensure URL parameters or POST body contain required fields

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