# White Label Logo Rendering - Complete Guide

## 📋 Overview

When a user tries to login to the UI using white label domains, the system automatically detects the domain and fetches/renders the appropriate logo based on that domain. This document explains the complete flow of how logo rendering works.

---

## 🔄 Complete Flow Diagram

```
User visits domain (e.g., c.acental.com)
            │
            ▼
┌───────────────────────────────────────────────────────────────┐
│  1. Application Initializes (App.jsx)                         │
│     - WhiteLabelLogoProvider wraps entire application         │
│     - Provider starts before any components render            │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│  2. WhiteLabelLogoContext Detects Domain                      │
│     - Gets window.location.hostname                           │
│     - Examples: "c.acental.com", "hostbuddy.ai", "localhost"  │
└───────────────────────────────┬───────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
        ┌─────────────────────┐   ┌──────────────────────┐
        │  hostbuddy.ai       │   │  White Label Domain  │
        │  www.hostbuddy.ai   │   │  (e.g., c.acental.com)│
        │  localhost          │   └──────────┬───────────┘
        └──────────┬──────────┘              │
                   │                         │
                   │                         ▼
                   │              ┌────────────────────────────┐
                   │              │ 3. API Call Triggered      │
                   │              │    POST /white_label/      │
                   │              │         get_logo           │
                   │              │                            │
                   │              │    Body: {                 │
                   │              │      "domain": "c.acental  │
                   │              │               .com"        │
                   │              │    }                       │
                   │              └────────┬───────────────────┘
                   │                       │
                   │                       ▼
                   │              ┌────────────────────────────┐
                   │              │ 4. API Response Received   │
                   │              │    {                       │
                   │              │      "logos_available": {  │
                   │              │        "logo": {           │
                   │              │          "url": "https://  │
                   │              │           storage..."      │
                   │              │        },                  │
                   │              │        "full_logo": {      │
                   │              │          "url": "https://  │
                   │              │           storage..."      │
                   │              │        }                   │
                   │              │      }                     │
                   │              │    }                       │
                   │              └────────┬───────────────────┘
                   │                       │
                   ▼                       ▼
        ┌─────────────────────────────────────────────┐
        │  5. Context State Updated                   │
        │     HostBuddy Domain:                       │
        │     - logo: null                            │
        │     - fullLogo: null                        │
        │     - isHostBuddyDomain: true               │
        │     - loading: false                        │
        │                                             │
        │     White Label Domain:                     │
        │     - logo: "https://storage...logo.png"    │
        │     - fullLogo: "https://storage...full.png"│
        │     - isHostBuddyDomain: false              │
        │     - loading: false                        │
        └─────────────────┬───────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────────────┐
        │  6. Logo Components Render                  │
        │     - Read context values via               │
        │       useWhiteLabelLogos() hook             │
        │     - Render appropriate logo               │
        └─────────────────────────────────────────────┘
```

---

## 🎯 Key Components

### 1. **WhiteLabelLogoContext.jsx** (Main Controller)

**Location:** `/src/helper/WhiteLabelLogoContext.jsx`

**Purpose:** Global state management for white label logos

**State Variables:**
```javascript
{
  logo: null,              // Small logo URL (40x40) - for collapsed sidebar
  fullLogo: null,          // Full logo URL (134x34) - for expanded sidebar
  loading: true,           // Loading state during API call
  error: null,             // Error message if API fails
  isHostBuddyDomain: false // Flag to indicate HostBuddy domain
}
```

**Logic Flow:**
```javascript
1. Get domain: window.location.hostname
2. Check if domain is HostBuddy:
   - "hostbuddy.ai"
   - "www.hostbuddy.ai" 
   - "localhost"
   
3. If HostBuddy domain:
   - Set isHostBuddyDomain = true
   - Set loading = false
   - Skip API call
   - Return (use local logos)

4. If White Label domain:
   - Call POST /white_label/get_logo API
   - Send domain name in body
   - Wait for response
   - Extract logo URLs from response
   - Update state with URLs
   - Set loading = false
```

---

### 2. **Logo Components** (Renderers)

#### **A. logoComponent.js** (Collapsed Sidebar - Small Logo)

**Location:** `/src/component/newSideNavigationComponent/.../logoComponent.js`

**Size:** 40px × 40px

**Rendering Logic:**
```javascript
// While loading API response
if (loading) {
  return <empty div 40x40>; // Placeholder
}

// Determine logo source
if (isHostBuddyDomain) {
  logoSrc = localIcon; // Use local SVG
} else if (logo) {
  logoSrc = logo; // Use fetched URL
} else {
  return <empty div>; // No logo available
}

// Render logo
<img src={logoSrc} style={{ width: 40px, height: 40px }} />
```

#### **B. logoComponentNav.js** (Expanded Sidebar - Full Logo)

**Location:** `/src/component/newSideNavigationComponent/.../logoComponentNav.js`

**Size:** 134px × 34px

**Rendering Logic:**
```javascript
// While loading API response
if (loading) {
  return <empty div 134x34>; // Placeholder
}

// Determine logo source
if (isHostBuddyDomain) {
  logoSrc = localFullLogo; // Use local SVG
} else if (fullLogo) {
  logoSrc = fullLogo; // Use fetched URL
} else {
  return <empty div>; // No logo available
}

// Render full logo
<img src={logoSrc} style={{ width: 134px, height: 34px }} />
```

---

### 3. **useWhiteLabelBranding Hook** (Brand Name)

**Location:** `/src/helper/useWhiteLabelBranding.js`

**Purpose:** Manages brand name and white label detection

**Features:**
- Detects white label domains
- Maps domains to brand names (e.g., "c.acental.com" → "Acental")
- Stores brand info in localStorage
- Provides brand name for UI text

**Domain to Brand Mapping:**
```javascript
{
  'c.acental.com': 'Acental',
  'app.acental.com': 'Acental',
  'acental.com': 'Acental',
  // More domains can be added
}
```

---

## 📡 API Integration

### **Endpoint:** POST `/white_label/get_logo`

**Request Format:**
```json
POST /white_label/get_logo
Headers:
  Content-Type: application/json
  X-API-Key: {API_KEY}

Body:
{
  "domain": "c.acental.com"
}
```

**Response Format:**
```json
{
  "domain_name": "c.acental.com",
  "logos_available": {
    "logo": {
      "format": "png",
      "gcs_path": "guest_app_data:path/to/logo.png",
      "type": "gcs",
      "url": "https://storage.googleapis.com/.../logo.png?Expires=..."
    },
    "full_logo": {
      "format": "png",
      "gcs_path": "guest_app_data:path/to/fullLogo.png",
      "type": "gcs",
      "url": "https://storage.googleapis.com/.../fullLogo.png?Expires=..."
    }
  },
  "logos_count": 2,
  "message": "Logos retrieved successfully",
  "timestamp": "2025-10-13 11:48:52",
  "user_id": "00master_test_city"
}
```

**Key Fields Extracted:**
- `logos_available.logo.url` → Used for collapsed sidebar (40×40)
- `logos_available.full_logo.url` → Used for expanded sidebar (134×34)

---

## 🎨 Logo Specifications

### **Small Logo (Collapsed Sidebar)**
- **Size:** 40px × 40px
- **Format:** PNG, SVG, JPG
- **Use Case:** When sidebar is collapsed
- **Object Fit:** contain (preserves aspect ratio)

### **Full Logo (Expanded Sidebar)**
- **Size:** 134px × 34px
- **Format:** PNG, SVG, JPG
- **Use Case:** When sidebar is expanded
- **Object Fit:** fill (stretches to fit)

---

## 🔍 How Logo Rendering Works - Step by Step

### **Scenario 1: User visits hostbuddy.ai**

```
1. Domain detected: "hostbuddy.ai"
2. isHostBuddyDomain = true
3. No API call made
4. Logo component checks isHostBuddyDomain flag
5. Renders local SVG logos from assets
6. Result: HostBuddy branding shown
```

### **Scenario 2: User visits c.acental.com**

```
1. Domain detected: "c.acental.com"
2. isHostBuddyDomain = false
3. API call triggered: POST /white_label/get_logo
4. Request body: { "domain": "c.acental.com" }
5. API responds with logo URLs
6. Context updates: 
   - logo = "https://storage.googleapis.com/.../logo.png"
   - fullLogo = "https://storage.googleapis.com/.../full_logo.png"
7. Logo component checks isHostBuddyDomain flag (false)
8. Logo component checks if logo exists (yes)
9. Renders fetched logo from GCS URL
10. Result: Acental branding shown
```

### **Scenario 3: White Label domain with no logos**

```
1. Domain detected: "example.com"
2. API call triggered
3. API responds with no logos_available
4. Context updates:
   - logo = null
   - fullLogo = null
5. Logo component checks both flags
6. Neither condition met
7. Renders empty div (no logo)
8. Result: No logo shown (empty space)
```

---

## 🛡️ Important Features

### **1. No Logo Flashing**
- Logos are NOT rendered until API completes
- Loading state prevents premature rendering
- Empty placeholders maintain layout during load

### **2. Domain Priority**
- HostBuddy domains ALWAYS use local logos
- Never makes API call for HostBuddy domains
- White label domains ALWAYS fetch from API

### **3. Graceful Degradation**
- If API fails → no logo shown
- If no logos available → empty space
- Never crashes the application

### **4. Performance**
- Single API call on app initialization
- Logo URLs cached in context
- No repeated API calls on navigation

### **5. Security**
- API requires X-API-Key header
- GCS URLs have expiration timestamps
- Domain validation on backend

---

## 📱 Usage in Components

Any component can access logo information using the hook:

```javascript
import { useWhiteLabelLogos } from '../helper/WhiteLabelLogoContext';

function MyComponent() {
  const { logo, fullLogo, loading, isHostBuddyDomain } = useWhiteLabelLogos();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (isHostBuddyDomain) {
    return <div>Using HostBuddy branding</div>;
  }
  
  if (logo) {
    return <img src={logo} alt="Logo" />;
  }
  
  return <div>No logo available</div>;
}
```

---

## 🔧 Configuration

### **Environment Variables:**
```env
REACT_APP_API_ENDPOINT=https://your-api-endpoint.com
REACT_APP_API_KEY=your_api_key_here
```

### **Adding New White Label Domains:**

1. **Register domain in backend** (domain mapping)
2. **Upload logos via White Label Registration UI:**
   - Small logo (40×40 recommended)
   - Full logo (134×34 recommended)
3. **Add domain to brand mapping** (optional - in useWhiteLabelBranding.js):
   ```javascript
   const domainToBrandMap = {
     'c.acental.com': 'Acental',
     'yournew.domain': 'YourBrand', // Add here
   };
   ```

---

## 🐛 Troubleshooting

### **Issue: Logos not showing on white label domain**

**Check:**
1. Browser console for API errors
2. Verify domain sent correctly in request: `{ "domain": "example.com" }`
3. Check API response has `logos_available` object
4. Verify URLs in response are accessible
5. Check CORS headers allow the domain

**Solution:**
```bash
# Check API response manually
curl -X POST https://your-api/white_label/get_logo \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_KEY" \
  -d '{"domain": "c.acental.com"}'
```

### **Issue: HostBuddy logos showing instead of custom**

**Check:**
1. Domain detection: `console.log(window.location.hostname)`
2. Verify domain is NOT "hostbuddy.ai", "localhost"
3. Check API is being called (network tab)
4. Verify `isHostBuddyDomain` flag is false

### **Issue: Logos flash/flicker on load**

**Check:**
1. WhiteLabelLogoProvider wraps entire app in App.jsx
2. Loading state is being respected in components
3. No hardcoded default logos in child components

---

## 📊 Console Output Examples

### **HostBuddy Domain:**
```
Fetching white label logos for domain: hostbuddy.ai
Domain hostname: hostbuddy.ai
HostBuddy domain detected - using local logos
```

### **White Label Domain (Success):**
```
Fetching white label logos for domain: c.acental.com
Domain hostname: c.acental.com
White label logo API response: {
  domain_name: "c.acental.com",
  logos_available: { logo: {...}, full_logo: {...} }
}
White label logos set successfully: {
  logo: "https://storage.googleapis.com/.../logo.png",
  fullLogo: "https://storage.googleapis.com/.../full_logo.png"
}
```

### **White Label Domain (No Logos):**
```
Fetching white label logos for domain: example.com
Domain hostname: example.com
White label logo API response: { logos_available: null }
No custom logos available in response
```

---

## 🎯 Summary

**The logo rendering system:**

1. ✅ **Automatically detects** the domain when user visits
2. ✅ **Distinguishes** between HostBuddy and white label domains
3. ✅ **Fetches logos** via API for white label domains only
4. ✅ **Uses local assets** for HostBuddy domains
5. ✅ **Prevents flashing** by waiting for API before rendering
6. ✅ **Handles errors gracefully** with empty states
7. ✅ **Caches in context** for performance
8. ✅ **Works universally** across all components using the hook

**No manual configuration needed by users** - everything is automatic based on the domain they visit!

---

## 📚 Related Documentation

- [WHITE_LABEL_LOGIN_README.md](./WHITE_LABEL_LOGIN_README.md) - Login integration
- [WHITE_LABEL_LOGIN_DOCS.md](./WHITE_LABEL_LOGIN_DOCS.md) - Authentication flow
- [WHITE_LABEL_LOGO_IMPLEMENTATION.md](./WHITE_LABEL_LOGO_IMPLEMENTATION.md) - Technical implementation
- [WHITE_LABEL_REGISTRATION_IMPLEMENTATION.md](./WHITE_LABEL_REGISTRATION_IMPLEMENTATION.md) - Logo upload

---

**For Support:** support@hostbuddy.ai
