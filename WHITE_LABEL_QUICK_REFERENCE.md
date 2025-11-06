# White Label System - Quick Reference Guide

## 🚀 How It Works Now

### **Flow for Cached Users (Zero Flash)**
```
1. Browser loads index.jsx
2. applyCachedCssSync() reads sessionStorage
3. CSS applied to :root SYNCHRONOUSLY
4. React renders with correct colors
5. Components display - ZERO FLASH ✅
```

### **Flow for First-Time Users**
```
1. Browser loads index.jsx
2. No cache found
3. applyLoadingCssSync() applies neutral colors
4. React renders with neutral colors
5. Token available → API called
6. Brand CSS fetched
7. CSS applied to :root
8. Components update with brand colors
9. CSS cached in sessionStorage
```

### **Flow for API Failure**
```
1. Browser loads index.jsx
2. No cache found
3. Neutral colors applied
4. API called → Fails
5. Neutral colors remain (no default HostBuddy colors)
6. Placeholder favicon applied
7. Clean error state (no retries)
8. User can refresh to retry
```

## 📦 Cache Strategy

| Storage | Key | Data | Expiry |
|---------|-----|------|--------|
| `sessionStorage` | `whiteLabelCssCache` | CSS config | Session end |
| `sessionStorage` | `whiteLabelLogosCache` | Logo URLs | Session end |

**Why sessionStorage?**
- Persists for entire browser session
- No time-based expiry
- Fresh start on new tab/window
- Eliminates hourly flashes

## 🔧 Key Functions

### `applyCachedCssSync()` - index.jsx
**Purpose:** Apply cached CSS before React renders  
**When:** Runs synchronously at app start  
**Effect:** Eliminates FOUC completely

### `applyLoadingCssSync()` - index.jsx
**Purpose:** Apply neutral colors when no cache  
**Colors:** White/gray neutrals  
**Effect:** Prevents default HostBuddy colors

### `applyPlaceholderFavicon()` - faviconManager.js
**Purpose:** Show generic favicon on logo failure  
**Icon:** Gray square with "?" symbol  
**Effect:** Better than empty favicon

## 🎯 Important Rules

### ✅ DO:
- Use `sessionStorage` for white label cache
- Apply CSS synchronously before React
- Use neutral colors for loading state
- Apply placeholder favicon on error
- Rely on `hasAttemptedFetch` ref for deduplication

### ❌ DON'T:
- Use `setTimeout` for retries
- Use hardcoded delays
- Use time-based cache expiry
- Use hardcoded API timeouts
- Allow multiple simultaneous fetches

## 🐛 Debugging

### Check if CSS is cached:
```javascript
// In browser console
sessionStorage.getItem('whiteLabelCssCache')
```

### Check if logo is cached:
```javascript
// In browser console
sessionStorage.getItem('whiteLabelLogosCache')
```

### Force fresh fetch:
```javascript
// In browser console
sessionStorage.clear()
location.reload()
```

### Check applied CSS variables:
```javascript
// In browser console
getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-primary')
```

## 📊 Console Logs to Watch

### Successful cached load:
```
⚡ [SYNC CSS] APPLYING CACHED CSS SYNCHRONOUSLY (before React render)
✅ [SYNC CSS] Cached CSS applied successfully - NO FLASH!
💾 [CSS API] Cache HIT - Using cached CSS config
💾 [LOGO API] Cache HIT - Using cached logos
```

### First-time load:
```
⚠️ [SYNC CSS] No cache found - applying neutral loading CSS
⏳ [SYNC CSS] Loading state CSS applied synchronously
🚀 [CSS API] Starting CSS config fetch process...
📡 [CSS API] Sending API request...
✅ [CSS API] API response received
🎉 [CSS API] COMPLETE - CSS config applied!
```

### API failure:
```
❌ [CSS API] ERROR occurred
❌ [CSS API] White label CSS fetch failed - keeping neutral loading state
⚠️ [WhiteLabelHelmet] Logo fetch failed, applying placeholder favicon
```

## 🔍 Troubleshooting

### Issue: Seeing flash of default colors
**Check:**
1. Is cache present? Check `sessionStorage.getItem('whiteLabelCssCache')`
2. Is domain correct in cache? Verify domain matches
3. Check console for "SYNC CSS" logs

**Fix:** Clear sessionStorage and reload

### Issue: CSS not updating after changes
**Cause:** sessionStorage cache is persistent  
**Fix:** Clear cache: `sessionStorage.clear()` and reload

### Issue: Logos not loading
**Check:**
1. Is token available? Check `getActiveToken()`
2. Check console for API errors
3. Verify API endpoint is reachable

**Fix:** Check network tab, verify API response

### Issue: Multiple API calls
**Check:** Look for `hasAttemptedFetch` in logs  
**Expected:** Should only see one fetch attempt  
**Fix:** If seeing duplicates, check component mounting

## 🎓 Code Examples

### How to use white label CSS in components:
```css
.my-component {
  background: var(--white-label-background-primary, #0F1117);
  color: var(--white-label-text-primary, #FFFFFF);
  border: 1px solid var(--white-label-border-primary, #2d3548);
}
```

### How to use white label logo in components:
```jsx
import { useWhiteLabelLogos } from './helper/WhiteLabelLogoContext';

function MyComponent() {
  const { logo, fullLogo, loading, isHostBuddyDomain } = useWhiteLabelLogos();
  
  const logoToShow = isHostBuddyDomain 
    ? '/local-hostbuddy-logo.png' 
    : (fullLogo || logo || '/fallback.png');
    
  return <img src={logoToShow} alt="Logo" />;
}
```

### How to check if white label domain:
```jsx
import { useWhiteLabelCss } from './helper/WhiteLabelCssContext';

function MyComponent() {
  const { isHostBuddyDomain } = useWhiteLabelCss();
  
  if (isHostBuddyDomain) {
    return <div>HostBuddy specific content</div>;
  }
  
  return <div>White label content</div>;
}
```

## 📈 Performance Metrics

| Scenario | Time to Brand Display | Flash? |
|----------|----------------------|--------|
| **Cached session** | 0ms (instant) | ❌ No |
| **First visit** | ~200-500ms (API) | ⚠️ Neutral colors only |
| **API failure** | N/A | ⚠️ Neutral colors remain |
| **Slow network** | Variable (waits) | ⚠️ Neutral colors only |

## 🔐 Security Notes

- API keys handled securely via env variables
- Token-based authentication for logo/CSS endpoints
- No sensitive data in sessionStorage
- Cache cleared on browser close

## 🚨 Common Mistakes to Avoid

1. ❌ Adding `setTimeout` for retries → Use single fetch
2. ❌ Using `localStorage` → Use `sessionStorage`
3. ❌ Adding cache expiry → Let session handle it
4. ❌ Multiple useEffect calls → Use `hasAttemptedFetch` ref
5. ❌ Hardcoding colors → Use CSS variables with fallbacks

## ✅ Success Checklist

- [ ] No flash of default colors on cached loads
- [ ] Neutral colors (not HostBuddy colors) on first load
- [ ] Placeholder favicon appears on logo failure
- [ ] No setTimeout calls in white label code
- [ ] No hardcoded retry delays
- [ ] Single API fetch per session
- [ ] sessionStorage used for cache
- [ ] CSS applied synchronously in index.jsx

---

**Remember:** The system is designed to fail gracefully. API failures should show neutral colors, not default HostBuddy branding. User refresh is the retry mechanism.
