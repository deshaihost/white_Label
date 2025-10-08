# White Label Registration - Navigation Structure

## Side Navigation Hierarchy (GCS Users Only)

```
📋 Side Navigation (GCS Portal)
│
├── 👥 All Accounts
│   └── (navigates to /gcs-users)
│
├── ⚙️ Master Account Settings (dropdown) ▼
│   ├── 👤 Account
│   │   └── /gcs-settings/account
│   │
│   ├── 📞 Contact  
│   │   └── /gcs-settings/contact
│   │
│   ├── 🔔 Notifications
│   │   └── /gcs-settings/notifications
│   │
│   ├── 🔌 Integration
│   │   └── /gcs-settings/integrations
│   │
│   ├── 👥 Users
│   │   └── /gcs-settings/users
│   │
│   └── 👑 Subscription
│       └── /gcs-settings/subscription
│
└── 🏷️ White Label (dropdown) ▼     ← NEW! (Separate from Master Account Settings)
    └── 📝 Registration Page
        └── /gcs-settings/white-label-registration  ← NEW!
```

## Click Flow

1. **Login as GCS User** → Lands on `/gcs-users`
2. **Scroll down in side navigation** → See "White Label" below "Master Account Settings"
3. **Click "White Label"** → Dropdown expands showing "Registration Page"
4. **Click "Registration Page"** → Navigates to `/gcs-settings/white-label-registration`
5. **White Label Registration Page is displayed** → Configure white label settings

## Visual Indicators

- **Dropdown Arrow (▼)**: Indicates expandable menu
- **Selected State**: Highlighted when active
- **Nested Indentation**: Registration Page is indented under White Label
- **Active Route**: Navigation item is highlighted when on that page

## Access Control

✅ **Visible to**: GCS Master Account users only
❌ **Not visible to**: 
- Regular HostBuddy users
- Subaccount users (even when accessed by GCS user)
- Non-authenticated users

## Component Breakdown

```
WhiteLabelRegistration Component
│
├── Header Section
│   ├── Title: "White Label Registration Page"
│   └── Subtitle/Description
│
├── Company Information Section
│   ├── Company Name (text input)
│   └── Company Logo (file upload with preview)
│
├── Branding Colors Section
│   ├── Primary Color (color picker + hex input)
│   └── Secondary Color (color picker + hex input)
│
├── Registration Settings Section
│   ├── Custom Registration URL (subdomain input)
│   └── Welcome Message (textarea)
│
├── Legal Section
│   └── Terms and Conditions URL (URL input)
│
├── Live Preview Section
│   └── Visual preview of registration page with applied settings
│
└── Action Buttons Section
    ├── Reset to Default (secondary button)
    └── Save Configuration (primary button)
```

## State Management

All form data is managed in local component state:
- `formData` object contains all input values
- `logoPreview` contains base64 image data for preview
- Form is fully controlled with `onChange` handlers
- No external state management (Redux) needed for this static version

## Future Integration Points

When API integration is ready:
1. **On Component Mount**: Fetch existing configuration
2. **On Save Button**: POST configuration to backend
3. **On Success**: Show success message and refresh data
4. **On Error**: Show error message with details
