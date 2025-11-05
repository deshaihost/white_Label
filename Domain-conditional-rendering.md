# HostBuddy Domain-Specific Components

## Overview

This guide explains how to restrict components to only appear on the HostBuddy domain (`hostbuddy.ai`) and hide them from white label client domains.

---

## Option 1: Conditional Rendering (Recommended)

Use the `useWhiteLabelCss` hook to conditionally render components based on domain.

### Implementation

```jsx
import { useWhiteLabelCss } from "../helper/WhiteLabelCssContext";

const YourComponent = () => {
  const { isHostBuddyDomain } = useWhiteLabelCss();
  
  return (
    <div>
      {/* Common content visible on all domains */}
      <h1>Welcome</h1>
      
      {/* HostBuddy-only content */}
      {isHostBuddyDomain && (
        <div className="hostbuddy-only">
          <AdvancedFeature />
        </div>
      )}
    </div>
  );
};
```

### When to Use

- Hiding specific UI sections or widgets
- Conditional banners or promotions
- Internal tools or analytics
- Beta features
- Any component that should be invisible to white label clients

### Localhost Behavior

**By default, localhost is treated as HostBuddy domain** for developer convenience. This means:
- ✅ Components render on localhost during development
- ✅ No need to constantly test on production domains
- ✅ Full feature access for local testing

### Examples in Codebase

- **HostDaddy** (support chatbot): Visible on HostBuddy domain + localhost, hidden on white label
- **NoltWidget** (product roadmap): Visible on HostBuddy domain + localhost, hidden on white label
- Logo components: Show different logos based on domain

---

## Option 2: Route Protection

Protect entire pages from being accessible on white label domains. This is ideal for landing pages, marketing content, and public-facing pages.

### Implementation

The `HostBuddyOnlyRoute` component is available at `src/routes/HostBuddyOnlyRoute.jsx`:

```jsx
import HostBuddyOnlyRoute from "./routes/HostBuddyOnlyRoute";

// In Routes.jsx - with redirect to login:
<Route path="/pricing" element={
  <HostBuddyOnlyRoute redirectTo="/client-login">
    <Pricing />
  </HostBuddyOnlyRoute>
} />

// Or without redirect (shows 404):
<Route path="/blog" element={
  <HostBuddyOnlyRoute>
    <BlogPage />
  </HostBuddyOnlyRoute>
} />

// Block localhost access (rare case):
<Route path="/production-only" element={
  <HostBuddyOnlyRoute blockLocalHost={true}>
    <ProductionOnlyPage />
  </HostBuddyOnlyRoute>
} />
```

### Parameters

- **`children`** (required): The component to render on HostBuddy domain
- **`redirectTo`** (optional): Path to redirect to instead of showing 404
- **`blockLocalHost`** (optional, default: `false`): If `true`, blocks localhost access
  - **Default behavior (`false`)**: Localhost is allowed (treated as HostBuddy domain)
  - **Use case for `true`**: Production-only pages that shouldn't be tested locally

### Localhost Behavior

**By default, `blockLocalHost` is `false`**, meaning:
- ✅ Pages are accessible on `localhost` and `127.0.0.1` during development
- ✅ Developers can view and test all HostBuddy-only pages locally
- ✅ No need to constantly switch to production domain for testing

Set `blockLocalHost={true}` only for pages that:
- Should truly only exist in production
- Require production-specific data or APIs
- Need to be explicitly blocked from local development

### Real-World Usage

The following pages are protected with `HostBuddyOnlyRoute`:

**Landing Pages** (redirect to `/client-login`):
- `/` - Home
- `/pricing` - Pricing page
- `/meet-hostbuddy` - Meet HostBuddy
- `/faqs` - FAQs
- `/about-us` - About Us

**Marketing Pages:**
- `/blog` and `/blog/:article_name` - Blog
- `/ai-messaging` - AI Messaging feature
- `/smart-templates` - Smart Templates feature
- `/become-an-affiliate` - Affiliate program
- `/software-solutions` - Software solutions
- `/integrations` - Integrations page
- `/turno` - Turno integration

**Setup & User Guides:**
- `/setup-guide`, `/getstarted`, `/hostaway-setup`
- `/tips-and-tricks`, `/best-practices`, `/schedule-guide`
- `/pms-instructions/*` - All PMS instruction pages
- And more...

**Note:** Auth pages (`/login`, `/signup`, `/forgot`) remain accessible on all domains to allow white label clients to authenticate users.

---

## Option 3: Navigation Filtering

Hide navigation items from white label domains.

### Implementation

```jsx
const { isHostBuddyDomain } = useWhiteLabelCss();

const navItems = allNavItems.filter(item => {
  if (isHostBuddyDomain) return true;
  return !item.hostBuddyOnly; // Hide flagged items on client domains
});
```

---

## Domain Detection

The system automatically detects:

**HostBuddy domains:**
- `hostbuddy.ai`
- `www.hostbuddy.ai`

**Localhost (development):**
- `localhost`
- `127.0.0.1`
- **By default, treated as HostBuddy domain** for development convenience
- Can be explicitly blocked using `blockLocalHost` parameter in `HostBuddyOnlyRoute`

**White label domains:**
- Any other domain (e.g., `c.acental.com`)

---

## Best Practices

✅ Use Option 1 (conditional rendering) for most use cases  
✅ Implement checks inside reusable components (not on every page)  
✅ Check `loading` state when protecting routes  
✅ **Leave `blockLocalHost` as default (`false`)** for developer convenience  
✅ Only use `blockLocalHost={true}` for production-only pages  
✅ Add console logs for debugging domain-specific behavior  
✅ Test on both HostBuddy and white label domains  
✅ Test on localhost to ensure development workflow is smooth  

---

## Related Documentation

- `WHITE_LABEL_DOCUMENTATION.md` - Full white label system overview
- `WHITE_LABEL_FEATURE_RESTRICTION_GUIDE.md` - Feature-based restrictions
- `white_label_dynamic_colors.md` - Dynamic styling system
