import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useWhiteLabelCss } from './WhiteLabelCssContext';
import { useWhiteLabelLogos } from './WhiteLabelLogoContext';

/**
 * WhiteLabelHelmet Component
 * 
 * Dynamically updates the page title and favicon based on white label branding data.
 * Uses the EXACT same pattern as RightSection inbox for consistency.
 * 
 * DOMAIN-BASED RENDERING LOGIC:
 * ================================
 * 
 * 1. HostBuddy Domain (hostbuddy.ai or www.hostbuddy.ai):
 *    - Shows DEFAULT favicon (/favicon.ico)
 *    - Shows DEFAULT title ("HostBuddy AI")
 *    - isHostBuddyDomain = true
 *    - logoUrl will be null/undefined
 * 
 * 2. Custom White-Label Domain (e.g., yourbrand.com):
 *    - Shows CUSTOM BRANDING favicon (logo from API/cache)
 *    - Shows CUSTOM BRANDING title (from CSS config)
 *    - isHostBuddyDomain = false
 *    - logoUrl will contain the custom logo URL from Google Cloud Storage
 * 
 * 3. localhost (development):
 *    - Behaves like white-label domain
 *    - Shows custom branding if configured in database for "localhost"
 *    - Falls back to default if no branding configured
 * 
 * FALLBACK BEHAVIOR:
 * ===================
 * - While loading: Shows default favicon and title
 * - If API fails: Shows default favicon and title
 * - If no branding data: Shows default favicon and title
 * - If branding exists: Shows custom favicon and title
 * 
 * @returns {JSX.Element} Helmet component with dynamic title and favicon
 */
const WhiteLabelHelmet = () => {
  // Use EXACT same pattern as RightSection.jsx line 143-144
  const { cssConfig, loading: cssLoading, isHostBuddyDomain } = useWhiteLabelCss();
  const { logo: logoUrl, loading: logoLoading } = useWhiteLabelLogos();
  const location = useLocation();
  
  // Helper function to get page name from route
  const getPageName = (pathname) => {
    // Remove leading slash and get first segment
    const path = pathname.split('/')[1] || 'dashboard';
    
    // Map routes to friendly page names
    const pageNames = {
      'dashboard': 'Dashboard',
      'inbox': 'Inbox',
      'properties': 'Properties',
      'statistics': 'Statistics',
      'integrations': 'Integrations',
      'settings': 'Settings',
      'account': 'Account',
      'subscription': 'Subscription',
      'pricing': 'Pricing',
      'agreements': 'Agreements',
      'action-items': 'Action Items',
      'customer-journey': 'Customer Journey',
      'ai-messaging': 'AI Messaging',
      'smart-templates': 'Smart Templates',
      'user-guides': 'User Guides',
      'faq': 'FAQ',
      'about-us': 'About Us',
      'get-started': 'Get Started',
      'login': 'Login',
      'signup': 'Sign Up',
      'forgot-password': 'Forgot Password',
      'reset-password': 'Reset Password',
    };
    
    return pageNames[path] || path.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  // AGGRESSIVE DEBUG - Log on every render
  console.log('🎭 [WhiteLabelHelmet] RENDER:', {
    cssLoading,
    logoLoading,
    cssConfig,
    logoUrl,
    isHostBuddyDomain,
    currentPath: location.pathname,
    timestamp: new Date().toISOString()
  });
  
  // Extract branding name from CSS config (same as RightSection)
  const brandingName = cssConfig?.Branding_name;
  
  // Get current page name from route
  const pageName = getPageName(location.pathname);
  
  // Fallback values - ALWAYS have defaults
  const defaultBrandName = "HostBuddy AI";
  const defaultFavicon = "/favicon-hostbuddy.ico"; // Renamed to prevent auto-loading
  
  // DOMAIN-BASED LOGIC:
  // -------------------
  // 1. HostBuddy Domain (hostbuddy.ai): isHostBuddyDomain=true, logoUrl=null
  //    → Result: Shows DEFAULT favicon and title
  // 
  // 2. Custom Domain (yourbrand.com): isHostBuddyDomain=false, logoUrl=<custom_url>
  //    → Result: Shows CUSTOM favicon and title
  // 
  // 3. localhost: Treated as custom domain, uses database branding if configured
  //    → Result: Shows CUSTOM if configured, DEFAULT if not
  
  // Determine brand name with proper fallbacks
  // Only use custom branding if NOT loading AND data exists AND not HostBuddy domain
  const finalBrandName = (!cssLoading && brandingName && !isHostBuddyDomain) 
    ? brandingName 
    : defaultBrandName;
  
  // Build complete page title: "PageName - BrandName"
  const pageTitle = `${pageName} - ${finalBrandName}`;
  
  // For favicon: Use custom logo ONLY if not HostBuddy domain and logo exists
  // This ensures HostBuddy domain ALWAYS shows default favicon
  const faviconUrl = (!logoLoading && logoUrl && !isHostBuddyDomain) 
    ? logoUrl 
    : defaultFavicon;
  
  console.log('🎭 [WhiteLabelHelmet] COMPUTED VALUES:', {
    pageName,
    brandingName,
    finalBrandName,
    pageTitle,
    faviconUrl,
    usingCustomFavicon: faviconUrl !== defaultFavicon,
    usingCustomBrand: finalBrandName !== defaultBrandName,
    timestamp: new Date().toISOString()
  });
  
  // LOG: Current state of favicon links in DOM BEFORE any updates
  const currentFavicons = document.querySelectorAll('link[rel*="icon"]');
  console.log('📋 [WhiteLabelHelmet] Current favicon links in DOM:', {
    count: currentFavicons.length,
    hrefs: Array.from(currentFavicons).map(link => ({
      rel: link.rel,
      href: link.href,
      type: link.type
    })),
    timestamp: new Date().toISOString()
  });
  
  // CRITICAL: Use useLayoutEffect to update favicon BEFORE browser paints
  // This runs synchronously after DOM updates but BEFORE browser renders
  // Prevents any visual flash of wrong favicon
  useLayoutEffect(() => {
    console.log('⚡ [WhiteLabelHelmet] useLayoutEffect TRIGGERED:', {
      cssLoading,
      logoLoading,
      faviconUrl,
      willUpdate: !cssLoading && !logoLoading && !!faviconUrl,
      timestamp: new Date().toISOString()
    });
    
    if (!cssLoading && !logoLoading && faviconUrl) {
      const updateFavicon = () => {
        console.log('🔧 [WhiteLabelHelmet] BEFORE favicon update:', {
          faviconUrl,
          existingLinks: document.querySelectorAll('link[rel*="icon"]').length,
          timestamp: new Date().toISOString()
        });
        
        // Remove all existing favicon links
        const existingLinks = document.querySelectorAll('link[rel*="icon"]');
        existingLinks.forEach(link => {
          console.log('🗑️ [WhiteLabelHelmet] Removing link:', {
            rel: link.rel,
            href: link.href,
            timestamp: new Date().toISOString()
          });
          link.remove();
        });
        
        // Add new favicon links immediately
        const createLink = (rel, type) => {
          const link = document.createElement('link');
          link.rel = rel;
          if (type) link.type = type;
          link.href = faviconUrl;
          document.head.appendChild(link);
          console.log('➕ [WhiteLabelHelmet] Added link:', {
            rel,
            type,
            href: faviconUrl,
            timestamp: new Date().toISOString()
          });
        };
        
        createLink('icon', 'image/png');
        createLink('shortcut icon', 'image/png');
        createLink('apple-touch-icon');
        
        console.log('✅ [WhiteLabelHelmet] useLayoutEffect favicon update COMPLETE:', {
          faviconUrl,
          totalLinks: document.querySelectorAll('link[rel*="icon"]').length,
          timestamp: new Date().toISOString()
        });
      };
      
      updateFavicon();
    }
  }, [faviconUrl, cssLoading, logoLoading]); // Re-run whenever favicon URL changes
  
  // ADDITIONAL: Listen to route changes and force favicon update
  // This handles lazy-loaded routes and async component mounting
  useLayoutEffect(() => {
    console.log('🚦 [WhiteLabelHelmet] Route change effect TRIGGERED:', {
      pathname: location.pathname,
      cssLoading,
      logoLoading,
      faviconUrl,
      timestamp: new Date().toISOString()
    });
    
    if (!cssLoading && !logoLoading && faviconUrl) {
      // Force immediate update on route change
      const existingLinks = document.querySelectorAll('link[rel*="icon"]');
      const needsUpdate = !existingLinks.length || 
                         Array.from(existingLinks).every(link => link.href !== faviconUrl);
      
      console.log('🔍 [WhiteLabelHelmet] Route change check:', {
        existingLinksCount: existingLinks.length,
        needsUpdate,
        currentHrefs: Array.from(existingLinks).map(l => l.href),
        targetHref: faviconUrl,
        timestamp: new Date().toISOString()
      });
      
      if (needsUpdate) {
        console.log('🔄 [WhiteLabelHelmet] Route change - updating favicon...');
        
        existingLinks.forEach(link => {
          console.log('🗑️ [WhiteLabelHelmet] (Route) Removing link:', link.href);
          link.remove();
        });
        
        const createLink = (rel, type) => {
          const link = document.createElement('link');
          link.rel = rel;
          if (type) link.type = type;
          link.href = faviconUrl;
          document.head.appendChild(link);
          console.log('➕ [WhiteLabelHelmet] (Route) Added link:', rel, faviconUrl);
        };
        
        createLink('icon', 'image/png');
        createLink('shortcut icon', 'image/png');
        createLink('apple-touch-icon');
        
        console.log('✅ [WhiteLabelHelmet] Route change favicon update COMPLETE:', {
          pathname: location.pathname,
          faviconUrl,
          timestamp: new Date().toISOString()
        });
      } else {
        console.log('⏭️ [WhiteLabelHelmet] Route change - favicon already correct, skipping update');
      }
    }
  }, [location.pathname, faviconUrl, cssLoading, logoLoading]); // Re-run on route change
  
  // CRITICAL: MutationObserver to watch for other Helmet components trying to override
  // This prevents individual page Helmets from resetting the favicon
  useEffect(() => {
    console.log('👁️ [WhiteLabelHelmet] MutationObserver setup:', {
      cssLoading,
      logoLoading,
      faviconUrl,
      willObserve: !cssLoading && !logoLoading && !!faviconUrl,
      timestamp: new Date().toISOString()
    });
    
    if (!cssLoading && !logoLoading && faviconUrl) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.removedNodes.forEach((node) => {
              // If a favicon link was removed, immediately restore it
              if (node.nodeName === 'LINK' && node.rel && node.rel.includes('icon')) {
                console.warn('⚠️ [WhiteLabelHelmet] FAVICON REMOVED BY ANOTHER COMPONENT!', {
                  removedLink: {
                    rel: node.rel,
                    href: node.href,
                    type: node.type
                  },
                  willRestore: true,
                  targetFavicon: faviconUrl,
                  timestamp: new Date().toISOString()
                });
                
                const createLink = (rel, type) => {
                  const link = document.createElement('link');
                  link.rel = rel;
                  if (type) link.type = type;
                  link.href = faviconUrl;
                  document.head.appendChild(link);
                  console.log('🔄 [WhiteLabelHelmet] (Observer) Restored link:', rel, faviconUrl);
                };
                
                createLink('icon', 'image/png');
                createLink('shortcut icon', 'image/png');
                createLink('apple-touch-icon');
                
                console.log('✅ [WhiteLabelHelmet] (Observer) Favicon restored successfully');
              }
            });
          }
        });
      });
      
      observer.observe(document.head, {
        childList: true,
        subtree: false
      });
      
      console.log('✅ [WhiteLabelHelmet] MutationObserver ACTIVE - watching for favicon changes');
      
      return () => {
        observer.disconnect();
        console.log('🛑 [WhiteLabelHelmet] MutationObserver DISCONNECTED');
      };
    }
  }, [faviconUrl, cssLoading, logoLoading]);
  
  // Debug logging (same pattern as RightSection)
  useEffect(() => {
    if (!cssLoading && !logoLoading) {
      console.log('🎭 [WhiteLabelHelmet] ✅ Branding data ready:', {
        isHostBuddyDomain,
        currentPage: pageName,
        brandingName: brandingName || 'HostBuddy AI (default)',
        logoUrl: logoUrl || 'default favicon',
        finalTitle: pageTitle,
        faviconUrl,
        usingCustomBranding: !!brandingName && !!logoUrl,
        timestamp: new Date().toISOString()
      });
    }
  }, [cssLoading, logoLoading, brandingName, logoUrl, isHostBuddyDomain, pageTitle, faviconUrl, pageName]);
  
  return (
    <Helmet>
      {/* Dynamic Page Title - Format: "PageName - BrandName" */}
      <title>{pageTitle}</title>
      
      {/* Dynamic Favicon - uses SAME logo as RightSection inbox */}
      <link rel="icon" type="image/png" href={faviconUrl} />
      <link rel="shortcut icon" type="image/png" href={faviconUrl} />
      <link rel="apple-touch-icon" href={faviconUrl} />
      
      {/* Meta tags for branding */}
      <meta name="application-name" content={finalBrandName} />
      <meta name="apple-mobile-web-app-title" content={finalBrandName} />
    </Helmet>
  );
};

export default WhiteLabelHelmet;
