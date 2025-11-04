# Login & Authentication White Label Guide

This document explains the complete authentication and white label branding system for both `/login` and `/client-login` routes.

---

## Table of Contents
1. [Overview](#overview)
2. [/login - Standard Login Flow](#login---standard-login-flow)
3. [/client-login - Token-Based Login Flow](#client-login---token-based-login-flow)
4. [Event-Driven Architecture](#event-driven-architecture)
5. [Technical Implementation](#technical-implementation)
6. [Key Differences](#key-differences)

---

## Overview

The application supports two authentication methods:

| Route | Purpose | Authentication Method | White Label Timing |
|-------|---------|----------------------|-------------------|
| `/login` | Standard user login | Email + Password | After authentication |
| `/client-login` | Direct token authentication | URL token parameter | After authentication |

**Common Behavior:**
- Both routes show **default HostBuddy branding** BEFORE authentication
- Both routes show **white label branding** AFTER authentication
- White label APIs (`get_css`, `get_logo`) are called **only with valid tokens**

---

## /login - Standard Login Flow

### Step-by-Step Process

#### 1. **User Arrives at `/login`**
```
- Component: src/auth/login/Login.jsx
- State: Unauthenticated
- Branding: Default HostBuddy logo and colors
- White Label: NOT loaded (no token yet)
```

#### 2. **User Enters Credentials**
```
- User fills email/password
- Form validation
- Submit triggers login action
```

#### 3. **Login API Call**
```
- Redux action: loginActions({email, password, rememberMe})
- Backend validates credentials
- Returns: user object + token
```

#### 4. **Token Authorization**
```javascript
// In Login.jsx useEffect when loginStatus === 200
setAuthorization(user["token"]);
navigate('/dashboard');
```

**What `setAuthorization()` does:**
```javascript
// In apiCore.js
export const setAuthorization = (token) => {
  if (token) {
    api.setAuthorizationHeader(token);
    sessionStorage.setItem("hostBuddy_active_token", token);
    
    // 🎉 KEY: Dispatch event for white label contexts
    window.dispatchEvent(new CustomEvent('tokenAvailable', { 
      detail: { token } 
    }));
  }
};
```

#### 5. **Navigation to Dashboard**
```
- User navigated to /dashboard
- WhiteLabelCssContext and WhiteLabelLogoContext are active
- Both contexts check: "Are we on authenticated route?"
- Answer: YES (/dashboard is authenticated)
- Action: Set loading: true (show progress loader)
```

#### 6. **Token Event Received**
```javascript
// In WhiteLabelCssContext.jsx
const handleTokenAvailable = (event) => {
  console.log('🎉 [CSS API] Token available event received!');
  const token = getActiveToken();
  if (token && !fetchingRef.current) {
    setCssState(prev => ({ ...prev, loading: true, progress: 10 }));
    fetchWhiteLabelCss(); // Calls POST /white_label/get_css
  }
};
```

#### 7. **White Label APIs Called**
```
API 1: POST /white_label/get_css
- Headers: { Authorization: Bearer <token> }
- Body: { domain_name: 'localhost' }
- Response: CSS configuration (colors, fonts, etc.)

API 2: POST /white_label/get_logo
- Headers: { Authorization: Bearer <token> }
- Body: { domain_name: 'localhost' }
- Response: Logo URLs (logo_url, full_logo_url)
```

#### 8. **CSS Applied**
```javascript
// In WhiteLabelCssContext.jsx
// Apply CSS variables to :root
document.documentElement.style.setProperty('--primary-color', cssData.primary_color);
document.documentElement.style.setProperty('--primary-bg-color', cssData.background.primary_bg_color);
// ... all CSS variables

setCssState(prev => ({ ...prev, loading: false, cssConfig }));
```

#### 9. **Dashboard Renders**
```
- loading: false (hide progress loader)
- Dashboard renders with white label CSS applied
- No flash of default colors! ✨
- White label logos appear in navbar/sidebar
```

### Key Files Modified for /login

| File | Changes Made | Purpose |
|------|-------------|---------|
| `src/auth/login/Login.jsx` | Calls `setAuthorization()` after login success | Triggers token event |
| `src/helper/apiCore.js` | Added `CustomEvent('tokenAvailable')` dispatch | Notify contexts of token |
| `src/helper/WhiteLabelCssContext.jsx` | Added event listener + path-based loading | Wait for CSS on authenticated routes |
| `src/helper/WhiteLabelLogoContext.jsx` | Added event listener | Wait for logos on authenticated routes |

### Loading State Logic

```javascript
// In WhiteLabelCssContext.jsx - useEffect
const currentPath = window.location.pathname;
const isAuthenticatedRoute = !['/login', '/signup', '/forgot-password', '/reset-password', '/client-login'].includes(currentPath);

if (isAuthenticatedRoute) {
  // On /dashboard, /properties, etc.
  setCssState({ loading: true, progress: 5 }); // WAIT for CSS
} else {
  // On /login, /signup, etc.
  setCssState({ loading: false }); // DON'T WAIT
}
```

**Why this works:**
- ✅ On `/login`: No loading state, login form shows immediately
- ✅ After login navigates to `/dashboard`: Loading state active, waits for CSS
- ✅ Works with slow networks: No timeout, waits as long as needed
- ✅ No flash: Dashboard doesn't render until CSS is ready

---

## /client-login - Token-Based Login Flow

### Step-by-Step Process

#### 1. **User Accesses URL with Token**
```
URL Format: 
https://yourdomain.com/client-login?token=<jwt_token>&redirect=dashboard

Example:
https://localhost:3000/client-login?token=eyJhbGc...&redirect=dashboard&user=gcs
```

#### 2. **WhiteLabelLogin Component Mounts**
```javascript
// Component: src/auth/whiteLabelLogin/WhiteLabelLogin.jsx
// Parses URL parameters
const params = new URLSearchParams(location.search);
const token = params.get('token');
const redirect = params.get('redirect');
const userType = params.get('user'); // 'gcs' for GCS users
```

#### 3. **Token Authentication**
```javascript
// In WhiteLabelLogin.jsx
const handleTokenAuth = (token, redirectTo, isGcsUser) => {
  // Create user object
  const user = {
    data: "userData",
    id: 1,
    token: token,
    refreshToken: token,
  };
  
  if (isGcsUser) {
    user["gcs_access_token"] = token;
  }
  
  // Set session
  api.setLoggedInUser(user, false);
  setAuthorization(token); // 🎉 Triggers tokenAvailable event
  
  // Redirect
  const targetPath = isGcsUser ? '/gcs-users' : `/${redirectTo}`;
  setTimeout(() => navigate(targetPath), 1000);
};
```

#### 4. **Token Event Fires**
```
Same as /login flow:
- setAuthorization() dispatches 'tokenAvailable' event
- WhiteLabelCssContext receives event
- WhiteLabelLogoContext receives event
- Both start fetching white label data
```

#### 5. **White Label Loading**
```
- Context shows progress loader: "Loading branding..."
- CSS API called with token
- Logo API called with token
- User sees loading screen during authentication
```

#### 6. **Redirect to Target**
```
- User redirected to /dashboard or /gcs-users
- White label branding already loaded
- Page renders with custom colors and logos
```

### Special Features of /client-login

1. **Direct Token Authentication**
   - No email/password needed
   - Token passed in URL
   - Instant authentication

2. **GCS User Support**
   ```javascript
   // URL: /client-login?token=xxx&user=gcs
   if (userType === 'gcs') {
     user["gcs_access_token"] = token;
     navigate('/gcs-users');
   }
   ```

3. **White Label Branding During Auth**
   ```javascript
   // Shows progress loader with white label
   const { cssConfig, loading: cssLoading, progress } = useWhiteLabelCss();
   
   if (cssLoading || isLoading) {
     return <ProgressLoader progress={progress} message="Loading branding..." />;
   }
   ```

4. **Email/Password Fallback**
   ```
   URL: /client-login?email=user@example.com&password=secret
   - Falls back to normal login flow
   - Useful for testing
   ```

### Key Files for /client-login

| File | Purpose |
|------|---------|
| `src/auth/whiteLabelLogin/WhiteLabelLogin.jsx` | Main component, handles token auth |
| `src/helper/useWhiteLabelBranding.js` | Custom hook for brand name |
| `src/helper/WhiteLabelCssContext.jsx` | Provides CSS configuration |
| `src/helper/WhiteLabelLogoContext.jsx` | Provides logo URLs |

---

## Event-Driven Architecture

### The Token Event System

```
┌─────────────────────────────────────────────────────────────┐
│                     Login Success                            │
│         (either /login or /client-login)                     │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  setAuthorization()   │
              │   (apiCore.js)        │
              └───────────┬───────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │ window.dispatchEvent(              │
         │   new CustomEvent('tokenAvailable')│
         │ )                                   │
         └────────────┬───────────────────────┘
                      │
         ┌────────────┴────────────┐
         │                         │
         ▼                         ▼
┌─────────────────────┐   ┌─────────────────────┐
│ WhiteLabelCssContext│   │WhiteLabelLogoContext│
│  Event Listener     │   │  Event Listener     │
└─────────┬───────────┘   └─────────┬───────────┘
          │                         │
          ▼                         ▼
    ┌─────────────┐          ┌──────────────┐
    │ Fetch CSS   │          │ Fetch Logos  │
    │ API Call    │          │ API Call     │
    └─────┬───────┘          └──────┬───────┘
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
              ┌────────────────┐
              │ Apply Branding │
              │ to Dashboard   │
              └────────────────┘
```

### Why Event-Driven?

**Problem it solves:**
- Context Providers mount before token is available
- Polling with timeouts is unreliable
- Different timing between /login and /client-login

**Solution:**
- Token availability triggers an event
- Contexts listen for this event
- Immediate response when token is ready
- No polling, no timeouts, no guessing

---

## Technical Implementation

### 1. Token Authorization (apiCore.js)

```javascript
export const setAuthorization = (token) => {
  if (token) {
    api.setAuthorizationHeader(token);
    sessionStorage.setItem("hostBuddy_active_token", token);
    
    // Notify all contexts that token is available
    window.dispatchEvent(new CustomEvent('tokenAvailable', { 
      detail: { token } 
    }));
  }
};

export const getActiveToken = () => {
  return sessionStorage.getItem("hostBuddy_active_token");
};
```

### 2. CSS Context Event Listener (WhiteLabelCssContext.jsx)

```javascript
useEffect(() => {
  // Event listener for token availability
  const handleTokenAvailable = (event) => {
    console.log('🎉 [CSS API] Token available event received!');
    const token = getActiveToken();
    if (token && !fetchingRef.current) {
      setCssState(prev => ({ ...prev, loading: true, progress: 10 }));
      fetchWhiteLabelCss();
    }
  };
  
  window.addEventListener('tokenAvailable', handleTokenAvailable);
  
  // Check current state
  const token = getActiveToken();
  const isHostBuddy = window.location.hostname === 'hostbuddy.ai';
  const currentPath = window.location.pathname;
  const isAuthenticatedRoute = !['/login', '/signup', '/forgot-password'].includes(currentPath);
  
  if (token) {
    // Token already exists, fetch immediately
    fetchWhiteLabelCss();
  } else if (isHostBuddy) {
    // HostBuddy domain doesn't need white label
    setCssState(prev => ({ ...prev, loading: false, isHostBuddyDomain: true }));
  } else if (isAuthenticatedRoute) {
    // On authenticated route without token - WAIT
    setCssState(prev => ({ ...prev, loading: true, progress: 5 }));
  } else {
    // On unauthenticated route - DON'T WAIT
    setCssState(prev => ({ ...prev, loading: false }));
  }
  
  return () => {
    window.removeEventListener('tokenAvailable', handleTokenAvailable);
  };
}, []);
```

### 3. Logo Context Event Listener (WhiteLabelLogoContext.jsx)

```javascript
useEffect(() => {
  // Event listener for token availability
  const handleTokenAvailable = (event) => {
    console.log('🎉 [LOGO API] Token available event received!');
    const token = getActiveToken();
    if (token && !fetchingRef.current) {
      fetchWhiteLabelLogos();
    }
  };
  
  window.addEventListener('tokenAvailable', handleTokenAvailable);
  
  // Similar logic to CSS context...
  
  return () => {
    window.removeEventListener('tokenAvailable', handleTokenAvailable);
  };
}, []);
```

### 4. Loading State Management (AuthenticatedLayout.jsx)

```javascript
const AuthenticatedLayout = ({ children }) => {
  const { cssConfig, loading: cssLoading, progress } = useWhiteLabelCss();
  
  // Show progress loader while CSS is loading
  if (cssLoading) {
    return <ProgressLoader progress={progress} message="Loading your workspace..." />;
  }
  
  // Render children with white label CSS applied
  return (
    <div className="authenticated-layout">
      {children}
    </div>
  );
};
```

---

## Key Differences

### /login vs /client-login

| Aspect | /login | /client-login |
|--------|--------|---------------|
| **Authentication** | Email + Password form | Token in URL |
| **User Input** | Required | Not required |
| **Before Auth** | Shows login form | Shows loading screen |
| **Token Source** | Login API response | URL parameter |
| **White Label Timing** | After form submission | Immediately with token |
| **Use Case** | Regular users | Direct access links, integrations |
| **Redirect** | To /dashboard or state.from | To URL redirect parameter |
| **GCS Support** | Via login response | Via ?user=gcs parameter |

### Common Features

Both routes share:
- ✅ Event-driven token detection
- ✅ White label branding after authentication
- ✅ Context-based state management
- ✅ Loading states during CSS fetch
- ✅ 1-hour localStorage caching
- ✅ Domain-based configuration

---

## Flow Diagrams

### /login Flow
```
User visits /login
    ↓
Shows default branding (HostBuddy)
    ↓
User enters email/password
    ↓
Submit → Login API
    ↓
Success → setAuthorization(token)
    ↓
'tokenAvailable' event dispatched
    ↓
Navigate to /dashboard
    ↓
Dashboard loading: true
    ↓
Contexts receive event → Fetch CSS/Logos
    ↓
CSS loaded → loading: false
    ↓
Dashboard renders with white label branding ✨
```

### /client-login Flow
```
User visits /client-login?token=xxx
    ↓
WhiteLabelLogin component mounts
    ↓
Extract token from URL
    ↓
setAuthorization(token)
    ↓
'tokenAvailable' event dispatched
    ↓
Show loading screen
    ↓
Contexts receive event → Fetch CSS/Logos
    ↓
CSS/Logos loaded
    ↓
Navigate to target route
    ↓
Page renders with white label branding ✨
```

---

## Configuration Examples

### Backend Configuration for localhost

**CSS Configuration:**
```json
{
  "domain_name": "localhost",
  "Branding_name": "Testing Local Host",
  "css_data": {
    "primary_color": "#e43e07",
    "primary_bg_color": "#e43e07",
    "secondary_color": "#ffffff",
    "background": {
      "primary_bg_color": "#e43e07",
      "secondary_bg_color": "#f5f5f5"
    },
    "borders": {
      "primary_border_color": "#e43e07",
      "border_radius": "8px"
    }
  }
}
```

**Logo Configuration:**
```json
{
  "domain_name": "localhost",
  "logo_url": "https://storage.googleapis.com/.../logo.png",
  "full_logo_url": "https://storage.googleapis.com/.../full_logo.png"
}
```

---

## Testing Guide

### Test /login
1. Clear session storage
2. Visit `http://localhost:3000/login`
3. Should see: Default HostBuddy branding
4. Enter credentials and submit
5. Should see: "Loading your workspace..." progress bar
6. Should see: Dashboard with white label colors (no flash!)

### Test /client-login
1. Get a valid JWT token
2. Visit `http://localhost:3000/client-login?token=<YOUR_TOKEN>`
3. Should see: "Loading branding..." progress bar
4. Should see: Dashboard with white label colors

### Test Slow Network
1. Open DevTools → Network → Throttling → Slow 3G
2. Login via /login
3. Progress bar should stay visible longer
4. Eventually loads with white label (no timeout!)
5. No flash of default colors

---

## Troubleshooting

### Issue: Flash of default colors on /login
**Cause:** CSS Context not in loading state
**Fix:** Check path detection in WhiteLabelCssContext.jsx line ~548

### Issue: White label not loading after login
**Cause:** Token event not firing
**Fix:** Check setAuthorization() in apiCore.js has event dispatch

### Issue: Infinite loading on /login page
**Cause:** Path not recognized as unauthenticated
**Fix:** Add path to unauthenticated routes array in WhiteLabelCssContext.jsx

### Issue: /client-login shows error
**Cause:** Token invalid or expired
**Fix:** Generate new token from backend

---

## Summary

**What we built:**
1. ✅ Event-driven token detection system
2. ✅ Path-based loading state management
3. ✅ Smooth white label transitions (no flash)
4. ✅ Works with any network speed
5. ✅ Supports both /login and /client-login
6. ✅ Maintains /client-login functionality unchanged

**Key Innovation:**
- **Before:** Polling with timeouts, unreliable, race conditions
- **After:** Event-driven, immediate response, always works

**Result:**
- Users see branded experience immediately after authentication
- No flash of default colors
- Works reliably regardless of network conditions
- Clean, maintainable code architecture

---

*Last Updated: November 4, 2025*
