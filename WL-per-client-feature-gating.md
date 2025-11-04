# White Label Feature Restriction Framework

## Overview
This framework allows client domains to selectively enable/disable features via the WhiteLabelFeatureSelection page. Disabled features are removed from the navbar and show a 404 error when users attempt to access their URLs directly.

## How It Works

### 1. Configuration Storage
- Features are configured in `WhiteLabelFeatureSelection.jsx` and saved to the backend per domain
- Each feature has an `id`, `name`, `description`, `enabled` status, and `paths` (array of URL routes)
- The configuration is stored in the `features_settings` object with structure:
  ```javascript
  {
    'feature-id': {
      enabled: true/false,
      name: 'Feature Name',
      description: 'Description',
      paths: ['/feature-path', '/another-path']  // Array of paths
    }
  }
  ```

### 2. Configuration Distribution
- **Context Provider**: `WhiteLabelCssContext.jsx` fetches and caches feature settings on app load
- Settings are available globally via `useWhiteLabelCss()` hook
- On HostBuddy domains, all features are enabled by default
- On white label domains, feature settings are loaded from the backend API

### 3. Access Control - Three Mechanisms

#### A. Route Protection (URL Access)
**File**: `routes/FeatureProtectedRoute.jsx`

Wraps protected routes in `Routes.jsx`:
```jsx
<FeatureProtectedRoute featureId="properties">
  <Properties />
</FeatureProtectedRoute>
```

**Logic**:
- On HostBuddy domains: Allow all access
- On white label domains: Check if feature is enabled
- If disabled: Show 404 error page
- If enabled: Render the component

#### B. Navbar Filtering (UI Visibility)
**Files**: 
- `components/sideItemComponent/Side-item-component.js`
- `components/CollapsedNavbar.js`

**Logic**:
- Maps navigation item IDs to arrays of feature IDs via `itemToFeatureMap`
- Uses `useFeatureAccess()` hook to check feature status
- **Shows nav item if ANY of its mapped features are enabled** (OR logic)
- Filters out nav items where ALL mapped features are disabled
- Also filters dropdown sub-items based on their feature mappings

#### C. Conditional UI Rendering (Page Elements)
**Files**: 
- `pages/dashboard/Dashboard.jsx` (and other pages that conditionally show features)

**Logic**:
- Uses `useFeatureAccess()` hook to check feature status
- Wraps UI sections with `{isFeatureEnabled('feature-id') && (...)}`
- Hides entire sections when features are disabled
- Example: Action Items table on dashboard hidden when `action-items` feature is disabled

### 4. Helper Hooks

**`useWhiteLabelCss()`** - Provides:
- `cssConfig`: Full configuration including feature settings
- `isHostBuddyDomain`: Boolean flag for domain type
- `loading`: Loading state

**`useFeatureAccess()`** - Provides:
- `isFeatureEnabled(featureId)`: Check if specific feature is enabled
- `getAllFeatures()`: Get all feature settings
- `isHostBuddyDomain`: Boolean flag

## Key Files Reference

| File | Purpose |
|------|---------|
| `WhiteLabelFeatureSelection.jsx` | Admin UI to configure feature availability |
| `WhiteLabelCssContext.jsx` | Global context provider for feature settings |
| `FeatureProtectedRoute.jsx` | Route-level access control |
| `useFeatureAccess.js` | Hook for checking feature availability |
| `Side-item-component.js` | Filters navbar items based on features |
| `CollapsedNavbar.js` | Filters collapsed navbar icons |
| `Routes.jsx` | Wraps protected routes with FeatureProtectedRoute |
| `Dashboard.jsx` | Conditionally renders action items section |

## How to Add or Modify Features

### Adding a New Feature

#### Step 1: Add to Feature List
In `WhiteLabelFeatureSelection.jsx`, add to the `featureModules` state (around line 156):

```javascript
{
  id: 'new-feature',              // Unique feature identifier
  name: 'New Feature Name',       // Display name
  description: 'Feature description',
  enabled: true,                  // Default enabled state
  available: true,                // Whether available in this version
  version: 'v1',                  // 'v1' (available) or 'v2' (coming soon)
  link: '/newfeature',           // URL for "Copy Link" button
  paths: ['/new-feature', '/feature-alt-route']  // Array of routes to protect
}
```

#### Step 2: Wrap the Route(s)
In `routes/Routes.jsx`, wrap ALL routes from the `paths` array with `FeatureProtectedRoute`:

```jsx
<Route
  path="/new-feature"
  element={
    <ProtectedRoute>
      <FeatureProtectedRoute featureId="new-feature">
        <NewFeatureComponent />
      </FeatureProtectedRoute>
    </ProtectedRoute>
  }
/>
<Route
  path="/feature-alt-route"
  element={
    <ProtectedRoute>
      <FeatureProtectedRoute featureId="new-feature">
        <AlternateFeatureView />
      </FeatureProtectedRoute>
    </ProtectedRoute>
  }
/>
```

#### Step 3: Add Navbar Mapping
In `Side-item-component.js`, add to `itemToFeatureMap` (around line 407):

```javascript
const itemToFeatureMap = {
  // ... existing mappings
  99: ['new-feature'],  // Single feature - shows if this feature is enabled
  // OR for multiple features:
  100: ['feature-a', 'feature-b'],  // Shows if ANY feature is enabled
};
```

Also update `CollapsedNavbar.js` `iconToFeatureMap` if adding a collapsed icon:

```javascript
const iconToFeatureMap = {
  // ... existing mappings
  9: ['new-feature'],  // Where 9 is your icon's ID
};
```

#### Step 4: Update Navbar Data (if needed)
If adding a new top-level nav item, update the navigation data in:
- `sideItemComponent/data.js` (for regular users)
- `sideItemComponent/gcsData.js` (for GCS/admin users)

Add your item with a unique `id` that matches the `itemToFeatureMap`.

### Modifying Existing Features

#### Change Feature Display Name/Description
Edit the feature object in `WhiteLabelFeatureSelection.jsx`:
```javascript
{
  id: 'properties',
  name: 'Updated Name',           // Change this
  description: 'New description', // Or this
  // ... rest stays the same
}
```

#### Add/Remove Protected Routes
Update the `paths` array in `WhiteLabelFeatureSelection.jsx`:
```javascript
{
  id: 'properties',
  paths: ['/properties', '/properties-list', '/property-view']  // Add or remove paths
  // ... rest of config
}
```

Then ensure all paths are wrapped with `FeatureProtectedRoute` in `Routes.jsx`.

#### Map Multiple Features to One Nav Item
Update the `itemToFeatureMap` in `Side-item-component.js` to use an array:
```javascript
const itemToFeatureMap = {
  3: ['properties', 'property-profile'],  // Shows if ANY feature is enabled
};
```

#### Map One Feature to Multiple Nav Items
Add the same feature ID to multiple nav items:
```javascript
const itemToFeatureMap = {
  3: ['properties'],   // Properties page nav item
  10: ['properties'],  // Another nav item also tied to properties
};
```

### Advanced: One-to-Many and Many-to-Many Relationships

#### Example 1: One Feature → Multiple Routes & Multiple Nav Items
```javascript
// In WhiteLabelFeatureSelection.jsx
{
  id: 'messaging-inbox',
  paths: ['/inbox', '/inbox/sms', '/inbox/email']  // Multiple routes
}

// In Side-item-component.js
const itemToFeatureMap = {
  5: ['messaging-inbox'],   // Main messaging nav item
  51: ['messaging-inbox'],  // Inbox sub-item
  52: ['messaging-inbox'],  // Messages sub-item
};

// In Routes.jsx - wrap ALL routes
<Route path="/inbox" element={<FeatureProtectedRoute featureId="messaging-inbox">...</>} />
<Route path="/inbox/sms" element={<FeatureProtectedRoute featureId="messaging-inbox">...</>} />
<Route path="/inbox/email" element={<FeatureProtectedRoute featureId="messaging-inbox">...</>} />
```

#### Example 2: Multiple Features → One Nav Item (Show if ANY enabled)
```javascript
// In WhiteLabelFeatureSelection.jsx
{ id: 'analytics', paths: ['/analytics'] }
{ id: 'reports', paths: ['/reports'] }

// In Side-item-component.js
const itemToFeatureMap = {
  6: ['analytics', 'reports'],  // Shows nav item if EITHER feature enabled
};
```

#### Example 3: Feature Suite with Shared Navigation
```javascript
// Property management suite
{ id: 'property-list', paths: ['/properties'] }
{ id: 'property-edit', paths: ['/edit-property/:id'] }
{ id: 'property-add', paths: ['/add-property'] }

// Single nav item shows if ANY property feature is enabled
const itemToFeatureMap = {
  3: ['property-list', 'property-edit', 'property-add'],
};
```

### Important Notes

1. **Feature IDs must match** across all files:
   - `featureModules[].id` in WhiteLabelFeatureSelection.jsx
   - `featureId` prop in FeatureProtectedRoute wrapper
   - Values in array in `itemToFeatureMap` in Side-item-component.js

2. **Arrays everywhere**:
   - `paths` is always an array (even for single path: `paths: ['/single-path']`)
   - `itemToFeatureMap` values are always arrays (even for single feature: `3: ['feature-id']`)

3. **Nav item visibility uses OR logic**: A nav item shows if **ANY** of its mapped features are enabled.

4. **Route protection uses AND logic**: Each route is protected by a single feature ID.

5. **Dropdown items** are also filtered. If a dropdown item should be gated, add its ID to `itemToFeatureMap`:
   ```javascript
   75: ['action-item-settings'],  // Sub-item in Settings dropdown
   ```

6. **HostBuddy domain bypass**: All features are automatically enabled on `hostbuddy.ai` regardless of settings.

7. **Default behavior**: If a feature isn't found in settings, access is **allowed by default** (fail-open for safety).

8. **Coming Soon features** (`version: 'v2'`): These are displayed but locked in the UI and cannot be enabled yet.

9. **Conditional UI rendering**: Use `isFeatureEnabled()` to conditionally show/hide page sections:
   ```javascript
   const { isFeatureEnabled } = useFeatureAccess();
   
   // In your JSX
   {isFeatureEnabled('action-items') && (
     <div>Action Items Section</div>
   )}
   ```

## Hiding Page Sections Based on Features

### When to Use Conditional Rendering

Use conditional rendering when you want to hide specific UI sections on a page (not the entire page) when a feature is disabled:

**Examples:**
- Action Items table on the dashboard
- Upsells widget in a settings page
- Feature-specific cards or panels

### Implementation Pattern

```javascript
// 1. Import the hook
import { useFeatureAccess } from "../../helper/useFeatureAccess";

// 2. Use the hook in your component
const YourComponent = () => {
  const { isFeatureEnabled } = useFeatureAccess();
  
  return (
    <div>
      {/* Always visible content */}
      <h1>Dashboard</h1>
      
      {/* Conditionally visible section */}
      {isFeatureEnabled('action-items') && (
        <div className="action-items-section">
          {/* Action items content */}
        </div>
      )}
      
      {/* More content */}
    </div>
  );
};
```

### Real-World Example: Dashboard Action Items

The dashboard (`pages/dashboard/Dashboard.jsx`) conditionally renders the Action Items table:

```javascript
{isFeatureEnabled('action-items') && (
  <div className="row">
    {!actionItemsCovertationLoading ? (
      <div style={{...}}>
        {/* Action items table */}
      </div>
    ) : (
      <BoxLoader />
    )}
  </div>
)}
```

**Result**: When `action-items` is disabled, the entire Action Items section is hidden from the dashboard on white label domains.

## Protecting Unauthenticated Pages (Login, Signup, etc.)

### Overview

Some features, like authentication pages, exist outside the authenticated portal. You can still gate these pages using the white label feature framework because the `WhiteLabelCssContext` is available globally throughout the app.

### FeatureProtectedUnauthRoute Component

For unauthenticated pages, use the `FeatureProtectedUnauthRoute` component:

**Location**: `react-frontend/src/component/FeatureProtectedUnauthRoute.jsx`

```javascript
import { useFeatureAccess } from "../helper/useFeatureAccess";
import { Navigate } from "react-router-dom";
import NotFoundPage from "./notFoundPage/NotFoundPage";

// Protects unauthenticated routes based on feature availability
const FeatureProtectedUnauthRoute = ({ children, featureId, redirectTo }) => {
  const { isFeatureEnabled, loading } = useFeatureAccess();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isFeatureEnabled(featureId)) {
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
    return <NotFoundPage />;
  }

  return children;
};

export default FeatureProtectedUnauthRoute;
```

### Usage in Routes.jsx

Wrap unauthenticated routes with `FeatureProtectedUnauthRoute`:

```javascript
import FeatureProtectedUnauthRoute from "./FeatureProtectedUnauthRoute";

// In your routes configuration:
<Route path="/login" element={
  <FeatureProtectedUnauthRoute featureId="auth-pages" redirectTo="/client-login">
    <Login />
  </FeatureProtectedUnauthRoute>
} />

<Route path="/signup" element={
  <FeatureProtectedUnauthRoute featureId="auth-pages">
    <Signup />
  </FeatureProtectedUnauthRoute>
} />

<Route path="/forgot" element={
  <FeatureProtectedUnauthRoute featureId="auth-pages">
    <ForgotPassword />
  </FeatureProtectedUnauthRoute>
} />
```

### Props

- **`featureId`** (required): The feature ID to check
- **`redirectTo`** (optional): A path to redirect to when feature is disabled. If not provided, shows 404 page.
- **`children`**: The page component to render when feature is enabled

### Real-World Example: Auth Pages

The login, signup, and forgot password pages are protected with the `auth-pages` feature:

**Feature Configuration** (`WhiteLabelFeatureSelection.jsx`):
```javascript
{
  id: 'auth-pages',
  name: 'Authentication Pages',
  description: 'Enable standard login, signup, and forgot password pages',
  paths: ['/login', '/signup', '/forgot'],
  version: 'v1'
}
```

**Routes Configuration** (`Routes.jsx`):
```javascript
<Route path="/login" element={
  <FeatureProtectedUnauthRoute featureId="auth-pages" redirectTo="/client-login">
    <Login />
  </FeatureProtectedUnauthRoute>
} />
```

**Result**:
- When `auth-pages` is disabled on a white label domain:
  - Visiting `/login` redirects to `/client-login` (alternative auth page)
  - Visiting `/signup` or `/forgot` shows 404 page
- On `hostbuddy.ai`, all auth pages are always accessible

## Protecting Settings Tabs

Some features appear as tabs within the settings page. You can conditionally render both the sidebar tab and the content section.

### Real-World Example: Subscription Tab

**Sidebar** (`pages/settings/settingSideBar/SettingSideBarIndex.jsx`):
```javascript
import { useFeatureAccess } from "../../../helper/useFeatureAccess";

const SettingSideBarIndex = (props) => {
  const { isFeatureEnabled } = useFeatureAccess();
  
  return (
    <div>
      {/* Other tabs... */}
      
      {isFeatureEnabled('subscriptions') && (
        <div className={`setting-tab-link ${activeTab === subscription && "active"}`} 
             onClick={() => changeHndl(subscription)}>
          <h6>
            <FaChessQueen />
            Subscription
          </h6>
        </div>
      )}
    </div>
  );
};
```

**Content** (`pages/settings/SettingIndex.jsx`):
```javascript
import { useFeatureAccess } from "../../helper/useFeatureAccess";

const SettingIndex = () => {
  const { isFeatureEnabled } = useFeatureAccess();
  
  return (
    <div>
      {/* Other setting sections... */}
      
      {isFeatureEnabled('subscriptions') && interFaceTypes?.subscription === interFaceSettings && (
        <SubscriptionIndex />
      )}
    </div>
  );
};
```

**Result**: When `subscriptions` is disabled, both the tab in the sidebar and the subscription settings page are hidden.

## Protecting Dashboard Banners and Widgets

### Real-World Example: Subscription Banner

**Dashboard** (`component/dashboard/Dashboard.jsx`):
```javascript
import { useFeatureAccess } from "../../helper/useFeatureAccess";

const Dashboard = () => {
  const { isFeatureEnabled } = useFeatureAccess();
  
  return (
    <div>
      {/* Dashboard content */}
      
      {isFeatureEnabled('subscriptions') && (
        <SubscriptionBanner userData={userDataGet} />
      )}
      
      {/* More dashboard content */}
    </div>
  );
};
```

**Result**: The subscription status banner only appears when the `subscriptions` feature is enabled.

## Testing

To test feature restrictions:

1. Navigate to White Label > Feature Selection in settings
2. Toggle a feature off for a domain
3. Click "Save"
4. On that white label domain:
   - The feature should disappear from the navbar
   - Directly visiting the feature's URL should show 404
   - Any conditionally rendered sections (like Action Items on dashboard) should be hidden
5. On `hostbuddy.ai`, the feature should still be visible and accessible everywhere
