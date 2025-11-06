/**
 * Favicon Manager
 * 
 * Simple, performant favicon management without React component overhead.
 * Sets favicon once based on domain and only updates when branding changes.
 * 
 * No MutationObserver, no useEffect loops, no performance issues.
 */

let currentFaviconUrl = null;
let isUpdating = false;

/**
 * Update favicon in DOM
 * @param {string} faviconUrl - URL of the favicon to set
 */
export const updateFavicon = (faviconUrl) => {
  // Prevent redundant updates
  if (currentFaviconUrl === faviconUrl || isUpdating) {
    return;
  }

  isUpdating = true;
  currentFaviconUrl = faviconUrl;

  try {
    // Remove ALL existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(link => link.remove());

    // Add new favicon links
    const createFaviconLink = (rel, type = null) => {
      const link = document.createElement('link');
      link.rel = rel;
      if (type) link.type = type;
      link.href = faviconUrl;
      document.head.appendChild(link);
    };

    createFaviconLink('icon', 'image/png');
    createFaviconLink('shortcut icon', 'image/png');
    createFaviconLink('apple-touch-icon');

    console.log('✅ [FaviconManager] Favicon updated:', faviconUrl);
  } catch (error) {
    console.error('❌ [FaviconManager] Error updating favicon:', error);
  } finally {
    isUpdating = false;
  }
};

/**
 * Remove all favicon links from DOM
 * Used for white-label domains before custom logo loads
 */
const removeAllFavicons = () => {
  try {
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(link => link.remove());
    console.log('🗑️ [FaviconManager] All favicons removed (waiting for custom logo)');
  } catch (error) {
    console.error('❌ [FaviconManager] Error removing favicons:', error);
  }
};

/**
 * Initialize favicon based on domain and branding
 * @param {boolean} isHostBuddyDomain - Whether current domain is hostbuddy.ai
 * @param {string|null} customLogoUrl - Custom logo URL for white-label
 */
export const initializeFavicon = (isHostBuddyDomain, customLogoUrl = null) => {
  console.log('🚀 [FaviconManager] Initializing favicon:', {
    isHostBuddyDomain,
    hasCustomLogo: !!customLogoUrl,
  });

  const defaultFavicon = '/favicon-hostbuddy.ico';
  
  if (isHostBuddyDomain) {
    // HostBuddy domain: immediately show default favicon
    updateFavicon(defaultFavicon);
  } else if (customLogoUrl) {
    // White-label domain WITH logo: show custom favicon
    updateFavicon(customLogoUrl);
  } else {
    // White-label domain WITHOUT logo yet: remove all favicons initially
    console.log('⏳ [FaviconManager] White-label domain - waiting for custom logo...');
    removeAllFavicons();
  }
};

/**
 * Update favicon when branding data loads (for white-label domains)
 * @param {string} logoUrl - Custom logo URL
 */
export const updateWhiteLabelFavicon = (logoUrl) => {
  if (logoUrl && logoUrl !== currentFaviconUrl) {
    console.log('🎨 [FaviconManager] Updating white-label favicon:', logoUrl);
    updateFavicon(logoUrl);
  }
};

/**
 * Apply a generic placeholder favicon when white-label logo fetch fails
 * This prevents empty favicon state on API failures
 * Shows a pulsing/loading indicator instead of empty or default favicon
 */
export const applyPlaceholderFavicon = () => {
  console.log('🔄 [FaviconManager] Applying loading placeholder favicon for white-label domain');
  
  // Create an animated loading indicator SVG favicon
  // Simple pulsing circle to indicate loading state
  const loadingFaviconSvg = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="%23808080" stroke-width="8"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/></circle></svg>`;
  
  updateFavicon(loadingFaviconSvg);
};

/**
 * Get current favicon URL
 */
export const getCurrentFavicon = () => currentFaviconUrl;

/**
 * Reset to default favicon
 */
export const resetToDefaultFavicon = () => {
  updateFavicon('/favicon-hostbuddy.ico');
};
