# White Label Demo Integration

## Overview
The White Label Registration page (`/gcs-settings/white-label-registration`) now displays an interactive demo of the HostBuddy White Label System, converted from TypeScript to JavaScript and integrated into the main React application.

## What's New

### Replaced Component
- **Old**: Simple form with Company Name, Sub Domain, Logo Upload, and Full Logo Upload
- **New**: Comprehensive white label demo showcasing the complete system

## Features

### 1. **Partner Setup Portal Tab**
Shows configuration options available to white label partners:

#### Branding Configuration
- **Company Logo Upload**: Drag and drop interface for logo upload
- **Favicon Upload**: Upload custom favicon
- **Color Palette**: Configure 4 main colors:
  - Primary (#7C3AED) - Buttons and CTAs
  - Accent (#3B82F6) - Highlights
  - Background (#0F172A) - Main background
  - Surface (#1E293B) - Cards and panels
- **Typography**: Select from approved font families
- **Live Preview**: Real-time preview of ACME Rentals branded inbox
- **Actions**: Preview in Sandbox or Publish Live

#### Feature Configuration
Toggle features for the white label instance:
- ✅ AI Assistant - Automated guest responses
- ✅ Multi-language Support - Automatic translation
- ❌ Analytics Dashboard - Advanced reporting
- ✅ Custom Integrations - Partner-specific systems

#### User Management
Manage users with roles and statuses:
- Admin User (Administrator) - Active
- Support Agent (Support) - Active
- Property Manager (Manager) - Invited
- "Invite New User" action button

### 2. **End-User Experience Tab**
Demonstrates what property managers and guests see:

#### ACME Rentals Dashboard
- Fully branded interface mockup
- Custom navigation with:
  - Dashboard (active)
  - Properties
  - Messages
  - Calendar
- Statistics cards:
  - 24 Active Properties
  - 12 New Messages
  - 8 Check-ins Today

### 3. **System Architecture & Authentication Flow**

#### Configuration Publishing Flow
```
Master Account Portal → Branding + Settings → Live Tenant (portal.partnername.com)
```
Real-time updates apply instantly to preview and live environments

#### End-User Authentication (SSO)
```
Partner PMS → JWT Token → Branded Portal
```
Uses `/get_subaccount_token` Master Account endpoint for secure session creation

## Technical Details

### Component Structure
```
WhiteLabelRegistration (Main Component)
├── Header Section
│   ├── Logo
│   └── Title & Description
├── Tabs Component
│   ├── Partner Setup Portal Tab
│   │   ├── BrandingSetup
│   │   │   ├── Logo Upload
│   │   │   ├── Favicon Upload
│   │   │   ├── Color Palette (4 colors)
│   │   │   ├── Typography Selector
│   │   │   └── Live Preview (ACME Inbox)
│   │   ├── SettingsSetup
│   │   │   └── Feature Toggles (4 features)
│   │   └── UserManagement
│   │       └── User Cards (3 users)
│   └── End-User Experience Tab
│       └── BrandedPortalExperience
│           └── Dashboard Mockup
└── System Flow Section
    ├── Configuration Publishing
    └── SSO Authentication
```

### Sub-Components

#### `BrandingSetup`
- Handles branding configuration UI
- Displays logo/favicon upload areas
- Color palette with 4 configurable colors
- Typography dropdown
- Live preview of branded inbox
- Accessibility check notification

#### `ColorInput`
- Reusable color picker component
- Color swatch + hex input
- Description text

#### `SettingsSetup`
- Feature toggle list
- Each feature has name, description, and toggle state

#### `FeatureToggle`
- Individual feature toggle component
- Visual on/off switch

#### `UserManagement`
- User cards grid
- "Invite New User" button

#### `UserCard`
- Displays user avatar, name, role, and status
- Status badges (Active/Invited)

#### `BrandedPortalExperience`
- End-user portal mockup
- Navigation sidebar
- Statistics dashboard

### State Management
```javascript
const [activeTab, setActiveTab] = useState('setup');
```
- Controls which tab (setup/enduser) is displayed
- Default: 'setup' (Partner Setup Portal)

### Styling
- **Theme**: Dark mode with purple/blue gradients
- **Typography**: DM Sans font family
- **Colors**:
  - Primary: #7C3AED (Purple)
  - Accent: #3B82F6 (Blue)
  - Success: #22C55E (Green)
  - Warning: #F59E0B (Amber)
  - Background: #020617 (Very dark blue)
- **Responsive**: Mobile-friendly with breakpoints at 768px and 1200px

## Files Modified

### 1. WhiteLabelRegistration.jsx
**Location**: `src/pages/settings/settingContants/whiteLabel/WhiteLabelRegistration.jsx`

**Changes**:
- Completely replaced with new demo component
- Converted from TypeScript to JavaScript
- Added interactive tabs for different views
- Implemented mockups for branding, settings, and user management
- Added system flow visualization

### 2. WhiteLabelRegistration.css
**Location**: `src/pages/settings/settingContants/whiteLabel/WhiteLabelRegistration.css`

**Changes**:
- Completely replaced CSS to support new demo design
- Added dark theme styling
- Responsive grid layouts
- Gradient backgrounds
- Tab navigation styles
- Mockup component styles (inbox, portal, etc.)

## How It Works

### Navigation
1. User navigates to GCS Settings
2. Clicks on "White Label" in navigation
3. Selects "Registration Page" sub-item
4. Route: `/gcs-settings/white-label-registration`
5. Demo component renders

### Tab Switching
- Click "Partner Setup Portal" to see configuration options
- Click "End-User Experience" to see branded portal mockup
- Tab state managed by `activeTab` useState hook

### Visual Design
- **Header**: Purple to blue gradient with HB logo
- **Content**: Dark slate background with semi-transparent cards
- **Mockups**: Realistic preview of ACME Rentals branding
- **Flows**: Step-by-step visualization with arrows

## Benefits

### For Partners
- Visual understanding of white label capabilities
- See real-time branding preview
- Understand feature toggles
- Learn about user management

### For End Users
- Preview of branded experience
- Understanding of portal structure
- See how customization appears

### For Development
- Living documentation
- Design reference
- Integration guide
- No external dependencies (pure React + CSS)

## Responsive Design

### Desktop (>1200px)
- Two-column grid for branding configuration
- Side-by-side preview
- Full-width stats

### Tablet (768px - 1200px)
- Single column layout
- Stacked configuration and preview
- Reduced spacing

### Mobile (<768px)
- Full mobile optimization
- Stacked tabs
- Vertical flow steps
- Collapsed navigation
- Single column grids

## Future Enhancements

### Phase 2 (Potential)
- Make color pickers functional
- Add actual file upload capability
- Connect to real API endpoints
- Save configuration to backend
- Live preview with real data
- Export configuration as JSON

### Phase 3 (Potential)
- Multi-tenant support
- Preview mode selector (mobile/desktop/tablet)
- Theme templates library
- A/B testing for branding
- Analytics integration

## Integration Notes

- ✅ No external dependencies required
- ✅ Pure JavaScript (converted from TypeScript)
- ✅ Uses existing routing structure
- ✅ Follows project's CSS conventions
- ✅ Mobile responsive
- ✅ No breaking changes to existing code
- ✅ Self-contained component

## Route Configuration
The component automatically renders when navigating to:
```
http://localhost:3000/gcs-settings/white-label-registration
```

No route changes needed - uses existing GCS Settings routing structure.

## Testing Checklist

- [x] Component renders without errors
- [x] Tab switching works correctly
- [x] All mockups display properly
- [x] Responsive design works on mobile
- [x] Color swatches display correctly
- [x] Toggle states show properly
- [x] User cards render with correct data
- [x] System flow arrows align properly
- [x] No console errors
- [x] CSS doesn't conflict with existing styles

## Conclusion

The White Label Demo provides a comprehensive, interactive showcase of the HostBuddy White Label System. It serves as both documentation and a visual guide for partners to understand the capabilities and configuration options available in the white label platform.
