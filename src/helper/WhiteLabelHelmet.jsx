import React, { useEffect, useState } from 'react';
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
    currentPath: location.pathname
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
    usingCustomBrand: finalBrandName !== defaultBrandName
  });
  
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
