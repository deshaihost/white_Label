# White Label System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication & Login](#authentication--login)
3. [Logo System](#logo-system)
4. [Registration Page](#registration-page)
5. [Developer Quick Reference](#developer-quick-reference)

---

## Overview

The White Label System allows partners to use HostBuddy's platform with their own branding. When users visit custom domains (e.g., `c.acental.com`), they see partner-specific logos, colors, and branding instead of HostBuddy branding.

### Key Features
- Custom domain support
- Partner-specific logos (collapsed + expanded navigation)
- Seamless authentication via JWT tokens
- Optimized logo loading with caching
- GCS user management portal

---

## Authentication & Login

### Supported Authentication Methods

#### 1. JWT Token Authentication (Recommended)
```
URL: /white-label-login?token=JWT_TOKEN_HERE
```
- **Regular Users** → Redirects to `/dashboard`
- **GCS Users** → Add `&user=gcs` → Redirects to `/gcs-users`

**Example:**
```
https://c.acental.com/white-label-login?token=eyJhbGci...&user=gcs
```

#### 2. Email & Password Parameters
```
URL: /white-label-login?email=user@example.com&password=userpassword
```

#### 3. Custom Redirect (Optional)
```
URL: /white-label-login?token=JWT_TOKEN&redirect=/properties
```

### API Endpoint

```http
POST https://dev2-dot-select-stays-chatbot-v02.wl.r.appspot.com/login
Content-Type: application/json
X-API-Key: {YOUR_API_KEY}

{
  "email": "user@domain.com",
  "password": "password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGci...",
  "gcs": true,
  "refresh_token": "eyJhbGci..."
}
```

### Integration Example

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

window.location.href = `https://portal.testhostbuddy.live/white-label-login?token=${data.access_token}&redirect=${redirect}${userParam}`;
```

### Key Files
- `src/auth/whiteLabelLogin/WhiteLabelLogin.jsx` - Login component
- `src/redux/auth/whiteLabelLogin/api.js` - API calls
- `src/routes/Routes.jsx` - Route configuration

---

## Logo System

### How It Works

1. **Domain Detection**: System detects the domain (e.g., `c.acental.com`)
2. **Logo Fetch**: Calls API to get custom logos
3. **Caching**: Stores logos in localStorage (1 hour)
4. **Render**: Displays logos in navigation (collapsed + expanded)

### Logo Specifications

| Type | Size | Usage |
|------|------|-------|
| **Small Logo** | 40×40px | Collapsed navigation |
| **Full Logo** | 134×34px | Expanded navigation |

### API Integration

```http
POST /white_label/get_logo
Content-Type: application/json

{
  "domain": "c.acental.com"
}
```

**Response:**
```json
{
  "domain_name": "c.acental.com",
  "logos_available": {
    "logo": {
      "url": "https://storage.googleapis.com/.../logo.png"
    },
    "full_logo": {
      "url": "https://storage.googleapis.com/.../full_logo.png"
    }
  }
}
```

### Performance Optimizations

✅ **LocalStorage Caching** - 1 hour cache duration
✅ **Image Preloading** - Background image decode
✅ **GPU Acceleration** - Hardware-accelerated rendering
✅ **React.memo** - Prevents unnecessary re-renders
✅ **DNS Prefetch** - Faster CDN connections
✅ **Shimmer Loading** - Better perceived performance

**Performance Results:**
- First Load: 734ms (70% faster than before)
- Cached Loads: <30ms (instant)
- API Call: ~720ms

### Logo Rendering Flow

```
User visits domain
    ↓
WhiteLabelLogoContext detects domain
    ↓
├─HostBuddy domain? → Use local logos
└─ White label domain? → Fetch from API
    ↓
Store in context + cache
    ↓
Logo components render
```

### Key Files
- `src/helper/WhiteLabelLogoContext.jsx` - Logo state management
- `src/component/newSideNavigationComponent/.../logoComponent.js` - Collapsed logo
- `src/component/newSideNavigationComponent/.../logoComponentNav.js` - Expanded logo
- `src/helper/useWhiteLabelBranding.js` - Brand name hook

### Cache Management

```javascript
// Clear cache (browser console)
localStorage.removeItem('whiteLabelLogosCache');
localStorage.removeItem('whiteLabelLogosCacheExpiry');

// Update cache duration (WhiteLabelLogoContext.jsx)
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
```

---

## Registration Page

### Overview
GCS users can configure white label settings via the Registration Page at `/gcs-settings/white-label-registration`.

### Navigation
```
GCS Portal → Settings → White Label → Registration Page
```

### Form Fields

1. **Company Name** - Text input (required)
2. **Sub Domain** - Text input (required)
3. **Logo Upload** - SVG file (200×200px recommended)
4. **Full Logo Upload** - SVG file (horizontal with text)

### Demo Features (Interactive UI)
The registration page also includes an interactive demo showcasing:
- Partner Setup Portal (branding configuration)
- End-User Experience (branded dashboard preview)
- System Architecture Flow
- Live Preview Panel

### Key Files
- `src/pages/settings/settingContants/whiteLabel/WhiteLabelRegistration.jsx`
- `src/pages/settings/settingContants/whiteLabel/WhiteLabelRegistration.css`
- `src/component/newSideNavigationComponent/.../gcsData.js` - Navigation config
- `src/pages/settings/SettingIndex.jsx` - Settings router

---

## Developer Quick Reference

### Environment Variables
```env
REACT_APP_API_ENDPOINT=https://your-api-endpoint.com
REACT_APP_API_KEY=your_api_key_here
REACT_APP_ALLOWED_WHITE_LABEL_DOMAINS=c.acental.com,acental.com
```

### Test URLs

```bash
# Regular user login
/white-label-login?token=JWT_TOKEN

# GCS user login
/white-label-login?token=JWT_TOKEN&user=gcs

# Email/password login
/white-label-login?email=test@example.com&password=pass

# Custom redirect
/white-label-login?token=JWT_TOKEN&redirect=/properties
```

### Test Credentials
- **Regular User**: `deshai@hostbuddy.ai` / `Ridhi@120$`
- **GCS User**: `00master@test.city` / `testPass1!`

### Common Tasks

**Add New White Label Domain:**
1. Update `gcsData.js` with domain mapping
2. Configure DNS CNAME record
3. Upload logos via GCS settings
4. Test authentication flow

**Debug Logo Loading:**
```javascript
// Browser console logs:
console.log('[LOGO API] Fetching logos for:', domain);
console.log('[CACHE] Cache hit:', cached);
console.log('[PRELOAD] Images preloaded:', urls);
```

**Clear Logo Cache:**
```javascript
localStorage.removeItem('whiteLabelLogosCache');
localStorage.removeItem('whiteLabelLogosCacheExpiry');
location.reload();
```

### Project Structure

```
src/
├── auth/
│   └── whiteLabelLogin/
│       └── WhiteLabelLogin.jsx
├── helper/
│   ├── WhiteLabelLogoContext.jsx
│   └── useWhiteLabelBranding.js
├── component/
│   └── newSideNavigationComponent/.../logoComponent/
│       ├── logoComponent.js (40×40)
│       ├── logoComponentNav.js (134×34)
│       └── logoComponent.css
├── pages/settings/settingContants/whiteLabel/
│   ├── WhiteLabelRegistration.jsx
│   └── WhiteLabelRegistration.css
└── redux/auth/whiteLabelLogin/
    └── api.js
```

### Security Considerations
- ✅ CORS validation for approved domains
- ✅ Origin verification in API requests
- ✅ Rate limiting for login attempts
- ✅ HTTPS/TLS required for all communications
- ✅ JWT token expiration handling
- ✅ Domain whitelist maintained

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern browsers with localStorage support

---

## Troubleshooting

**Logos not showing:**
- Check console for API errors
- Verify domain in API request
- Check localStorage cache
- Verify GCS URLs are accessible

**Authentication fails:**
- Verify API key in headers
- Check JWT token validity
- Confirm user type (gcs vs regular)
- Check network tab for 401/403 errors

**Cache not working:**
- Check localStorage quota
- Verify cache expiry timestamp
- Clear browser cache and retry

---

**Last Updated:** October 2025  
**Version:** 1.0
