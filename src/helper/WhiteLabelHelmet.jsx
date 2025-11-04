import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useWhiteLabelCss } from './WhiteLabelCssContext';
import { useWhiteLabelLogos } from './WhiteLabelLogoContext';
import { updateWhiteLabelFavicon } from './faviconManager';

/**
 * WhiteLabelHelmet Component
 * 
 * SIMPLIFIED: Only manages page TITLE
 * Favicon is managed by faviconManager.js
 */
const WhiteLabelHelmet = () => {
  const { cssConfig, loading: cssLoading, isHostBuddyDomain } = useWhiteLabelCss();
  const { logo: logoUrl, loading: logoLoading } = useWhiteLabelLogos();
  const location = useLocation();
  
  // Update favicon when white-label logo loads
  useEffect(() => {
    if (!cssLoading && !logoLoading && !isHostBuddyDomain && logoUrl) {
      console.log('🎨 [WhiteLabelHelmet] White-label logo ready, updating favicon');
      updateWhiteLabelFavicon(logoUrl);
    }
  }, [logoUrl, cssLoading, logoLoading, isHostBuddyDomain]);
  
  // Helper function to get page name from route
  const getPageName = (pathname) => {
    const path = pathname.split('/')[1] || 'dashboard';
    
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
  
  const brandingName = cssConfig?.Branding_name;
  const pageName = getPageName(location.pathname);
  const defaultBrandName = "HostBuddy AI";
  
  const finalBrandName = (!cssLoading && brandingName && !isHostBuddyDomain) 
    ? brandingName 
    : defaultBrandName;
  
  const pageTitle = `${pageName} - ${finalBrandName}`;

  console.log('🎭 [WhiteLabelHelmet] Page title:', pageTitle);
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="application-name" content={finalBrandName} />
      <meta name="apple-mobile-web-app-title" content={finalBrandName} />
    </Helmet>
  );
};

export default WhiteLabelHelmet;
