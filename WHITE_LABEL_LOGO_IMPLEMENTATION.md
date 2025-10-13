# White Label Logo Implementation

## Overview
This implementation ensures that logos are only rendered AFTER the API fetch is complete, with special handling for the hostbuddy.ai domain.

## Key Features

### 1. Domain Detection
- **hostbuddy.ai domain**: Uses local default logos
- **Other domains**: Fetches custom logos from the API
- **Loading state**: No logos are rendered until the API call completes

### 2. Logo Rendering Logic

#### For hostbuddy.ai (or localhost)
```
✓ Use local logos immediately after detection
✓ No API call needed
✓ Renders default HostBuddy branding
```

#### For White Label Domains (e.g., ai.example.com)
```
1. Detect domain name
2. Call POST /white_label/get_logo API
3. Wait for response
4. Render fetched logos
5. If API fails or no logos, show empty space
```

### 3. Logo Specifications

**Collapsed Navbar (Small Logo)**
- Size: 40px × 40px
- Used when navigation is collapsed
- Field from API: `logos_available.logo.url`

**Expanded Navbar (Full Logo)**
- Size: 134px × 34px
- Used when navigation is expanded
- Field from API: `logos_available.full_logo.url`

## Files Modified

### 1. `/src/helper/WhiteLabelLogoContext.jsx`
- Added `isHostBuddyDomain` flag to context state
- Domain detection logic:
  - Checks for `hostbuddy.ai`, `www.hostbuddy.ai`, or `localhost`
  - Skips API call for HostBuddy domains
  - Makes API call for all other domains
- API integration with `/white_label/get_logo` endpoint

### 2. `/src/component/newSideNavigationComponent/components/sideNavBarElements/logoComponent/logoComponent.js`
- Updated collapsed logo rendering
- Added loading state check (shows empty div during load)
- Domain-based logo selection:
  - `isHostBuddyDomain === true` → local logo
  - `logo !== null` → fetched white label logo
  - Otherwise → empty space

### 3. `/src/component/newSideNavigationComponent/components/sideNavBarElements/logoComponent/logoComponentNav.js`
- Updated expanded logo rendering
- Added loading state check
- Domain-based full logo selection:
  - `isHostBuddyDomain === true` → local full logo
  - `fullLogo !== null` → fetched white label full logo
  - Otherwise → empty space

### 4. `/src/App.jsx`
- Wrapped application with `WhiteLabelLogoProvider`
- Ensures logos are fetched before any component renders

## API Request Format

```json
POST /white_label/get_logo
{
  "domain": "example.com"
}
```

## API Response Format

```json
{
  "domain_name": "example.com",
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

## Flow Diagram

```
┌─────────────────────────────────────┐
│  Application Starts                 │
│  (index.jsx loads)                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  WhiteLabelLogoProvider Mounts      │
│  - Get domain name                  │
│  - Set loading = true               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Check Domain                       │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
       ▼               ▼
┌──────────┐    ┌──────────────┐
│hostbuddy │    │ Other Domain │
│   .ai    │    │              │
└────┬─────┘    └─────┬────────┘
     │                │
     │                ▼
     │         ┌──────────────────┐
     │         │ POST API Call    │
     │         │ /white_label/    │
     │         │ get_logo         │
     │         └─────┬────────────┘
     │               │
     │               ▼
     │         ┌──────────────────┐
     │         │ Receive Response │
     │         │ Extract URLs     │
     │         └─────┬────────────┘
     │               │
     ▼               ▼
┌─────────────────────────────────────┐
│  Set State:                         │
│  - logo (40x40)                     │
│  - fullLogo (134x34)                │
│  - loading = false                  │
│  - isHostBuddyDomain                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Components Render Logos            │
│  - Collapsed: logo (40x40)          │
│  - Expanded: fullLogo (134x34)      │
└─────────────────────────────────────┘
```

## Testing Scenarios

### Scenario 1: hostbuddy.ai Domain
```
Domain: hostbuddy.ai
Expected: Local default logos render immediately
No API call made
```

### Scenario 2: White Label Domain with Logos
```
Domain: ai.example.com
API Response: Contains logo and full_logo URLs
Expected: Custom logos render after API response
```

### Scenario 3: White Label Domain without Logos
```
Domain: ai.example.com
API Response: No logos_available or empty
Expected: Empty space (no logo shown)
```

### Scenario 4: API Failure
```
Domain: ai.example.com
API Response: Error/Timeout
Expected: Empty space (no logo shown)
```

## Browser Console Output

When the application loads, you'll see:
```
Domain Name: ai.example.com
Application launched on: ai.example.com
Fetching white label logos for domain: ai.example.com
Domain hostname: ai.example.com
```

For HostBuddy domain:
```
Domain Name: hostbuddy.ai
Application launched on: hostbuddy.ai
Fetching white label logos for domain: hostbuddy.ai
Domain hostname: hostbuddy.ai
HostBuddy domain detected - using local logos
```

For white label with successful fetch:
```
Domain Name: ai.example.com
Application launched on: ai.example.com
Fetching white label logos for domain: ai.example.com
Domain hostname: ai.example.com
White label logo API response: {...}
White label logos set successfully: { logo: "...", fullLogo: "..." }
```

## Important Notes

1. **No Initial Render**: Logos will NOT flash or show default images before the API call completes
2. **Domain Priority**: hostbuddy.ai always uses local logos, never calls the API
3. **Loading State**: Empty divs maintain layout during loading to prevent UI shift
4. **Object Fit**: All logos use `objectFit: 'contain'` to preserve aspect ratio
5. **Error Handling**: If API fails for non-HostBuddy domains, no logo is shown

## Production Deployment

Before deploying to production, ensure:
- [ ] Environment variables are set correctly:
  - `REACT_APP_API_ENDPOINT`
  - `REACT_APP_API_KEY`
- [ ] Domain detection includes all production domains
- [ ] API endpoint `/white_label/get_logo` is accessible
- [ ] CORS is configured for the API
- [ ] Logos are uploaded to GCS with proper permissions
- [ ] Logo URLs have appropriate expiration times

## Troubleshooting

**Issue**: Logos not showing on white label domain
- Check browser console for API errors
- Verify domain name is sent correctly in request
- Check API response has `logos_available` object
- Verify URL in response is accessible

**Issue**: Default logos showing instead of custom
- Check if domain matches hostbuddy.ai exactly
- Verify API returned valid logo URLs
- Check network tab for failed image loads

**Issue**: Logos flash/flicker on load
- Verify WhiteLabelLogoProvider is wrapping the app
- Check that loading state is being respected
- Ensure no hardcoded default logos in child components
