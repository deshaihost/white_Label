import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getCssConfig } from '../pages/settings/settingContants/whiteLabel/whiteLabelServices';
import { getActiveToken } from './apiCore';

const WhiteLabelCssContext = createContext();

// Cache key for sessionStorage (persists for session, not time-based)
const CSS_CACHE_KEY = 'whiteLabelCssCache';
const CSS_FETCH_STATUS_KEY = 'whiteLabelCssFetchStatus';

export const useWhiteLabelCss = () => {
  const context = useContext(WhiteLabelCssContext);
  if (!context) {
    throw new Error('useWhiteLabelCss must be used within WhiteLabelCssProvider');
  }
  return context;
};

// Helper function to get cached CSS config
const getCachedCssConfig = (domainName) => {
  const cacheStart = performance.now();
  console.log('🔍 [CSS CACHE] Checking cache for domain...', {
    domain: domainName,
    timestamp: new Date().toISOString()
  });
  
  try {
    const cachedData = sessionStorage.getItem(CSS_CACHE_KEY);
    
    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      if (parsedCache.domain === domainName) {
        const elapsed = performance.now() - cacheStart;
        console.log('✅ [CSS CACHE] Cache HIT! Using cached CSS config', {
          domain: domainName,
          cachedTimestamp: new Date(parsedCache.timestamp).toISOString(),
          cacheReadTime: `${elapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });
        return parsedCache;
      } else {
        const elapsed = performance.now() - cacheStart;
        console.log('❌ [CSS CACHE] Cache MISS - Domain mismatch', {
          requestedDomain: domainName,
          cachedDomain: parsedCache.domain,
          cacheReadTime: `${elapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });
      }
    } else {
      const elapsed = performance.now() - cacheStart;
      console.log('❌ [CSS CACHE] Cache MISS - No cache found', {
        cacheReadTime: `${elapsed.toFixed(2)}ms`,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    const elapsed = performance.now() - cacheStart;
    console.error('❌ [CSS CACHE] Error reading cache', {
      error: error.message,
      cacheReadTime: `${elapsed.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
  }
  return null;
};

// Helper function to cache CSS config
const cacheCssConfig = (domainName, cssConfig) => {
  const cacheStart = performance.now();
  console.log('💾 [CSS CACHE] Caching CSS config...', {
    domain: domainName,
    timestamp: new Date().toISOString()
  });
  
  try {
    const cacheData = {
      domain: domainName,
      cssConfig,
      timestamp: Date.now()
    };
    sessionStorage.setItem(CSS_CACHE_KEY, JSON.stringify(cacheData));
    
    const elapsed = performance.now() - cacheStart;
    console.log('✅ [CSS CACHE] CSS config cached successfully (session)', {
      domain: domainName,
      cacheWriteTime: `${elapsed.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const elapsed = performance.now() - cacheStart;
    console.error('❌ [CSS CACHE] Error caching CSS config', {
      error: error.message,
      cacheWriteTime: `${elapsed.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
  }
};

// Helper function to apply CSS variables to the root element
const applyCssVariables = (cssConfig) => {
  if (!cssConfig) return;
  
  const root = document.documentElement;
  
  try {
    // Handle css_data structure from API response
    if (cssConfig.css_data) {
      const cssData = cssConfig.css_data;
      
      // Apply background colors
      if (cssData.background) {
        Object.entries(cssData.background).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-background-${key}`, value);
        });
      }
      
      // Apply border colors
      if (cssData.borders) {
        Object.entries(cssData.borders).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-border-${key}`, value);
        });
      }
      
      // Apply component colors
      if (cssData.components) {
        Object.entries(cssData.components).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-component-${key}`, value);
        });
      }
      
      // Apply interactive colors (includes action_link)
      if (cssData.interactive) {
        Object.entries(cssData.interactive).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-interactive-${key}`, value);
        });
      }
      
      // Apply button colors (new expanded section)
      if (cssData.buttons) {
        Object.entries(cssData.buttons).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-button-${key}`, value);
        });
      }
      
      // Apply status colors (includes badge colors, online/offline)
      if (cssData.status) {
        Object.entries(cssData.status).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-status-${key}`, value);
        });
      }
      
      // Apply text colors
      if (cssData.text) {
        Object.entries(cssData.text).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-text-${key}`, value);
        });
      }
      
      // Apply charts colors (new section)
      if (cssData.charts) {
        Object.entries(cssData.charts).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-chart-${key}`, value);
        });
      }
      
      // Apply effects (shadows)
      if (cssData.effects) {
        Object.entries(cssData.effects).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-effect-${key}`, value);
        });
      }
      
      // Apply typography
      if (cssData.typography) {
        Object.entries(cssData.typography).forEach(([key, value]) => {
          root.style.setProperty(`--white-label-typography-${key}`, value);
        });
      }
    }
    
    // Legacy support: Apply custom CSS properties to :root
    if (cssConfig.colors) {
      Object.entries(cssConfig.colors).forEach(([key, value]) => {
        root.style.setProperty(`--white-label-${key}`, value);
      });
    }
    
    if (cssConfig.fonts) {
      Object.entries(cssConfig.fonts).forEach(([key, value]) => {
        root.style.setProperty(`--white-label-font-${key}`, value);
      });
    }
    
    if (cssConfig.spacing) {
      Object.entries(cssConfig.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--white-label-spacing-${key}`, value);
      });
    }
    
    // Apply any other CSS variables from the config
    if (cssConfig.variables) {
      Object.entries(cssConfig.variables).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    }
    
    console.log('🎨 [CSS APPLY] CSS variables applied to :root', {
      applied: Object.keys(cssConfig).length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ [CSS APPLY] Error applying CSS variables', {
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

// Helper function to apply neutral loading CSS variables for white label domains
// This prevents flash of default HostBuddy colors while fetching
const applyLoadingCssVariables = () => {
  const root = document.documentElement;
  
  // Apply neutral colors that won't clash with any brand
  const loadingColors = {
    '--white-label-background-primary': '#ffffff',
    '--white-label-background-secondary': '#f5f5f5',
    '--white-label-background-tertiary': '#e5e5e5',
    '--white-label-border-primary': '#d0d0d0',
    '--white-label-border-secondary': '#e0e0e0',
    '--white-label-text-primary': '#000000',
    '--white-label-text-secondary': '#666666',
    '--white-label-interactive-primary': '#808080',
    '--white-label-button-primary': '#808080',
    '--white-label-button-primary-hover': '#696969',
  };
  
  Object.entries(loadingColors).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  console.log('⏳ [CSS APPLY] Loading state CSS applied (neutral colors)', {
    timestamp: new Date().toISOString()
  });
};

export const WhiteLabelCssProvider = ({ children }) => {
  // Add request deduplication to prevent multiple simultaneous API calls
  const fetchingRef = useRef(false);
  const mountCountRef = useRef(0);
  const hasAttemptedFetch = useRef(false);
  
  const [cssState, setCssState] = useState(() => {
    // Initialize with cached data if available
    const domainName = window.location.hostname;
    const isHostBuddy = domainName === 'hostbuddy.ai' || 
                       domainName === 'www.hostbuddy.ai';
    
    if (isHostBuddy) {
      return {
        cssConfig: null,
        loading: false,
        progress: 0,
        error: null,
        isHostBuddyDomain: true,
        featuresSettings: null,
      };
    }
    
    const cached = getCachedCssConfig(domainName);
    if (cached) {
      // Apply cached CSS immediately
      applyCssVariables(cached.cssConfig);
      
      return {
        cssConfig: cached.cssConfig,
        loading: false,
        progress: 100,
        error: null,
        isHostBuddyDomain: false,
        featuresSettings: cached.cssConfig?.features_settings || null,
      };
    }
    
    // No cache - apply loading CSS to prevent flash
    applyLoadingCssVariables();
    
    return {
      cssConfig: null,
      loading: true,
      progress: 0,
      error: null,
      isHostBuddyDomain: false,
      featuresSettings: null,
    };
  });

  useEffect(() => {
    // Increment mount counter for debugging multiple instances
    mountCountRef.current += 1;
    const currentMount = mountCountRef.current;
    
    console.log('🔍 [CSS PROVIDER] WhiteLabelCssProvider mounted', {
      mountNumber: currentMount,
      isFetching: fetchingRef.current,
      hasAttemptedFetch: hasAttemptedFetch.current,
      timestamp: new Date().toISOString()
    });

    const fetchWhiteLabelCss = async () => {
      // Prevent multiple simultaneous requests
      if (fetchingRef.current || hasAttemptedFetch.current) {
        console.log('⏸️ [CSS API] Request already attempted, skipping duplicate', {
          isFetching: fetchingRef.current,
          hasAttemptedFetch: hasAttemptedFetch.current,
          mountNumber: currentMount,
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      fetchingRef.current = true;
      hasAttemptedFetch.current = true;
      
      const startTime = performance.now();
      console.log('🚀 [CSS API] Starting CSS config fetch process...', {
        mountNumber: currentMount,
        timestamp: new Date().toISOString(),
        performanceStart: startTime
      });
      
      try {
        // Get the domain name
        const domainName = window.location.hostname;
        
        console.log('🌐 [CSS API] Domain detected:', {
          domainName,
          mountNumber: currentMount,
          timestamp: new Date().toISOString()
        });

        // Check if it's hostbuddy.ai domain (use default styles)
        const isHostBuddy = domainName === 'hostbuddy.ai' || 
                           domainName === 'www.hostbuddy.ai';
        
        if (isHostBuddy) {
          const elapsed = performance.now() - startTime;
          console.log('✅ [CSS API] HostBuddy domain detected - using default styles', {
            domain: domainName,
            elapsed: `${elapsed.toFixed(2)}ms`,
            mountNumber: currentMount,
            timestamp: new Date().toISOString()
          });
          setCssState({
            cssConfig: null,
            loading: false,
            error: null,
            isHostBuddyDomain: true,
            featuresSettings: null,
          });
          fetchingRef.current = false;
          return;
        }

        // Check cache first
        const cacheCheckStart = performance.now();
        const cached = getCachedCssConfig(domainName);
        const cacheCheckElapsed = performance.now() - cacheCheckStart;
        
        if (cached) {
          const totalElapsed = performance.now() - startTime;
          console.log('💾 [CSS API] Cache HIT - Using cached CSS config', {
            domain: domainName,
            cacheCheckTime: `${cacheCheckElapsed.toFixed(2)}ms`,
            totalElapsed: `${totalElapsed.toFixed(2)}ms`,
            mountNumber: currentMount,
            timestamp: new Date().toISOString()
          });
          fetchingRef.current = false;
          setCssState(prevState => ({
            ...prevState,
            loading: false,
            progress: 100
          }));
          return;
        }
        
        console.log('❌ [CSS API] Cache MISS - Will fetch from API', {
          domain: domainName,
          cacheCheckTime: `${cacheCheckElapsed.toFixed(2)}ms`,
          mountNumber: currentMount,
          timestamp: new Date().toISOString()
        });

        // For white label domains, call the API
        console.log('📡 [CSS API] Sending API request...', {
          domain: domainName,
          mountNumber: currentMount,
          timestamp: new Date().toISOString()
        });

        setCssState(prev => ({
          ...prev,
          progress: 50
        }));

        const apiCallStart = performance.now();
        const response = await getCssConfig({ domain: domainName });
        const apiCallElapsed = performance.now() - apiCallStart;

        console.log('✅ [CSS API] API response received', {
          success: response.success,
          apiCallTime: `${apiCallElapsed.toFixed(2)}ms`,
          hasData: !!response.data,
          mountNumber: currentMount,
          timestamp: new Date().toISOString()
        });

        if (response.success && response.data) {
          const cssConfig = response.data;
          
          console.log('🎨 [CSS API] CSS config extracted', {
            configKeys: Object.keys(cssConfig),
            timestamp: new Date().toISOString()
          });
          
          // Apply CSS variables immediately
          applyCssVariables(cssConfig);
          
          // Set state
          setCssState({
            cssConfig,
            loading: false,
            progress: 100,
            error: null,
            isHostBuddyDomain: false,
            featuresSettings: cssConfig?.features_settings || null,
          });

          // Cache the CSS config
          const cacheStart = performance.now();
          cacheCssConfig(domainName, cssConfig);
          const cacheElapsed = performance.now() - cacheStart;
          
          const totalElapsed = performance.now() - startTime;
          
          console.log('🎉 [CSS API] COMPLETE - CSS config applied!', {
            totalTime: `${totalElapsed.toFixed(2)}ms`,
            breakdown: {
              apiCall: `${apiCallElapsed.toFixed(2)}ms`,
              cache: `${cacheElapsed.toFixed(2)}ms`
            },
            mountNumber: currentMount,
            timestamp: new Date().toISOString()
          });
          
          fetchingRef.current = false;
        } else {
          const totalElapsed = performance.now() - startTime;
          console.log('⚠️ [CSS API] No CSS config available in response', {
            error: response.error,
            totalTime: `${totalElapsed.toFixed(2)}ms`,
            mountNumber: currentMount,
            timestamp: new Date().toISOString()
          });
          
          // Keep loading CSS applied, don't revert to defaults
          setCssState({
            cssConfig: null,
            loading: false,
            progress: 0,
            error: response.error || 'No CSS config available',
            isHostBuddyDomain: false,
            featuresSettings: null,
          });
          fetchingRef.current = false;
        }
      } catch (error) {
        const totalElapsed = performance.now() - startTime;
        console.error('❌ [CSS API] ERROR occurred', {
          error: error.message,
          errorType: error.name,
          totalTime: `${totalElapsed.toFixed(2)}ms`,
          mountNumber: currentMount,
          timestamp: new Date().toISOString()
        });
        
        fetchingRef.current = false;
        
        const domainName = window.location.hostname;
        const isHostBuddy = domainName === 'hostbuddy.ai' || 
                           domainName === 'www.hostbuddy.ai';
        
        if (isHostBuddy) {
          setCssState({
            cssConfig: null,
            loading: false,
            progress: 0,
            error: error.message,
            isHostBuddyDomain: true,
            featuresSettings: null,
          });
        } else {
          // For white label domains, keep neutral loading CSS applied
          // Don't retry with timeouts - rely on user refresh or navigation
          console.log('❌ [CSS API] White label CSS fetch failed - keeping neutral loading state', {
            mountNumber: currentMount,
            error: error.message,
            timestamp: new Date().toISOString()
          });
          
          setCssState({
            cssConfig: null,
            loading: false,
            progress: 0,
            error: error.message,
            isHostBuddyDomain: false,
            featuresSettings: null,
          });
        }
      }
    };

    // Listen for token availability event
    const handleTokenAvailable = (event) => {
      console.log('🎉 [CSS API] Token available event received!', { hasToken: !!event.detail?.token });
      const token = getActiveToken();
      if (token && !fetchingRef.current && !hasAttemptedFetch.current) {
        console.log('🔄 [CSS API] Token confirmed, fetching CSS...');
        setCssState(prevState => ({
          ...prevState,
          loading: true,
          progress: 10
        }));
        fetchWhiteLabelCss();
      }
    };
    
    window.addEventListener('tokenAvailable', handleTokenAvailable);

    // Check if we have a token before fetching
    const token = getActiveToken();
    const domainName = window.location.hostname;
    const isHostBuddy = domainName === 'hostbuddy.ai' || 
                       domainName === 'www.hostbuddy.ai';
    
    if (token) {
      console.log('🔄 [CSS API] Token found immediately, fetching CSS...');
      fetchWhiteLabelCss();
    } else if (isHostBuddy) {
      console.log('⏭️ [CSS API] HostBuddy domain, no CSS fetch needed');
      setCssState(prevState => ({
        ...prevState,
        loading: false,
        isHostBuddyDomain: true
      }));
      hasAttemptedFetch.current = true;
    } else {
      // For white label domains without token yet
      const currentPath = window.location.pathname;
      const isAuthenticatedRoute = !['/login', '/signup', '/forgot-password', '/reset-password', '/client-login'].includes(currentPath);
      
      if (isAuthenticatedRoute) {
        console.log('⏳ [CSS API] No token yet on authenticated route, waiting for authentication...');
        console.log('🔒 [CSS API] Loading state ACTIVE - will wait for tokenAvailable event');
        setCssState(prevState => ({
          ...prevState,
          loading: true,
          progress: 5
        }));
      } else {
        console.log('✅ [CSS API] On unauthenticated page, no loading needed');
        setCssState(prevState => ({
          ...prevState,
          loading: false
        }));
      }
    }
    
    return () => {
      window.removeEventListener('tokenAvailable', handleTokenAvailable);
    };
  }, []);

  return (
    <WhiteLabelCssContext.Provider value={cssState}>
      {children}
    </WhiteLabelCssContext.Provider>
  );
};

export default WhiteLabelCssProvider;