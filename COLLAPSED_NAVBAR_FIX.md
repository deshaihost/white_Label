# Collapsed Navbar Highlighting Fix

## Issue
When navigating to `/gcs-settings/white-label-registration` with the navbar collapsed, the **Master Account Settings icon (ID: 7)** was being highlighted instead of the **White Label icon (ID: 8)**.

## Root Cause
The `CollapsedNavbar.js` component had a hardcoded `pathToIdMap` that mapped `/gcs-settings` to ID 7 (Master Account Settings). When checking paths, it would match `/gcs-settings` BEFORE checking for the more specific `/gcs-settings/white-label-registration` path.

### Problem Code (Before)
```javascript
const pathToIdMap = {
  "/getstarted": 1,
  "/dashboard": 2,
  "/properties": 3,
  "/action-item": 4,
  "/inbox": 5,
  "/statistics": 6,
  "/setting": 7,
  "/gcs-settings": 7,  // ❌ This matched white-label paths too!
};

const currentPath = Object.keys(pathToIdMap).find((path) =>
  location.pathname.startsWith(path)
);
```

## Solution
Added **early path checking** for White Label paths BEFORE the general `/gcs-settings` check in the `useEffect` hook of `CollapsedNavbar.js`.

### Fixed Code (After)
```javascript
useEffect(() => {
  console.log("🔍 CollapsedNavbar - Checking path:", location.pathname);
  
  // Check White Label paths FIRST (before general /gcs-settings)
  if (location.pathname.startsWith("/gcs-settings/white-label")) {
    console.log("✅ CollapsedNavbar - WHITE LABEL path matched, setting selected to 8");
    setSelected(8);
    return; // Early return prevents further path checking
  }
  
  // Map paths to IDs based on navigation structure
  const pathToIdMap = {
    "/getstarted": 1,
    "/dashboard": 2,
    "/properties": 3,
    "/action-item": 4,
    "/inbox": 5,
    "/statistics": 6,
    "/setting": 7,
    "/gcs-settings": 7,
  };

  const currentPath = Object.keys(pathToIdMap).find((path) =>
    location.pathname.startsWith(path)
  );

  if (currentPath) {
    console.log("📍 CollapsedNavbar - Path matched:", currentPath, "ID:", pathToIdMap[currentPath]);
    setSelected(pathToIdMap[currentPath]);
  }
}, [location.pathname]);
```

## Additional Changes

### 1. Added White Label Navigation Handler
Updated `handleIconClick` to handle White Label icon clicks (ID: 8):

```javascript
case 8: // White Label
  handleNavigation("/gcs-settings/white-label-registration");
  break;
```

### 2. Added White Label to Hover List
Updated `shouldHaveHover` to include White Label icon (ID: 8):

```javascript
const shouldHaveHover = (iconId) => {
  // 1=Get Started, 2=Dashboard, 3=Properties, 4=Action Items, 5=Messaging, 6=Insights, 7=Settings, 8=White Label
  return [1, 2, 3, 4, 5, 6, 7, 8].includes(iconId);
};
```

## Files Modified
- `src/component/newSideNavigationComponent/components/CollapsedNavbar.js`

## Testing
1. Navigate to `/gcs-settings/white-label-registration`
2. Collapse the navbar
3. Verify that the **White Label icon (tag with sparkle)** is highlighted, NOT the Master Account Settings icon
4. Check browser console for debug logs:
   - `🔍 CollapsedNavbar - Checking path: /gcs-settings/white-label-registration`
   - `✅ CollapsedNavbar - WHITE LABEL path matched, setting selected to 8`

## Debug Logs Added
Console logs were added to trace the path matching logic:
- `🔍 CollapsedNavbar - Checking path:` - Shows the current pathname
- `✅ CollapsedNavbar - WHITE LABEL path matched` - Confirms White Label path detection
- `📍 CollapsedNavbar - Path matched:` - Shows which general path matched
- `🖱️ CollapsedNavbar - Icon clicked:` - Shows which icon was clicked

## Result
✅ White Label icon now correctly highlights when on white-label-registration page with collapsed navbar
✅ Path checking order is correct (specific paths before general paths)
✅ Navigation works from collapsed navbar icon clicks
✅ Hover behavior includes White Label icon
