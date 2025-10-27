import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCssConfig } from '../pages/settings/settingContants/whiteLabel/whiteLabelServices';

const WhiteLabelCssContext = createContext();

// Cache key for localStorage
const CSS_CACHE_KEY = 'whiteLabelCssCache';
const CSS_CACHE_EXPIRY_KEY = 'whiteLabelCssCacheExpiry';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

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
    const cachedData = localStorage.getItem(CSS_CACHE_KEY);
    const cacheExpiry = localStorage.getItem(CSS_CACHE_EXPIRY_KEY);
    
    if (cachedData && cacheExpiry) {
      const expiryTime = parseInt(cacheExpiry, 10);
      const now = Date.now();
      
      if (now < expiryTime) {
        const parsedCache = JSON.parse(cachedData);
        if (parsedCache.domain === domainName) {
          const elapsed = performance.now() - cacheStart;
          const remainingTime = Math.floor((expiryTime - now) / 1000 / 60);
          console.log('✅ [CSS CACHE] Cache HIT! Using cached CSS config', {
            domain: domainName,
            cachedTimestamp: new Date(parsedCache.timestamp).toISOString(),
            expiresIn: `${remainingTime} minutes`,
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
        console.log('⏰ [CSS CACHE] Cache EXPIRED - Clearing old cache', {
          expiredAt: new Date(expiryTime).toISOString(),
          cacheReadTime: `${elapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });
        // Cache expired, clear it
        localStorage.removeItem(CSS_CACHE_KEY);
        localStorage.removeItem(CSS_CACHE_EXPIRY_KEY);
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
    localStorage.setItem(CSS_CACHE_KEY, JSON.stringify(cacheData));
    localStorage.setItem(CSS_CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
    
    const elapsed = performance.now() - cacheStart;
    const expiresAt = new Date(Date.now() + CACHE_DURATION);
    console.log('✅ [CSS CACHE] CSS config cached successfully', {
      domain: domainName,
      cacheWriteTime: `${elapsed.toFixed(2)}ms`,
      expiresAt: expiresAt.toISOString(),
      duration: `${CACHE_DURATION / 1000 / 60} minutes`,
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
    // Apply custom CSS properties to :root
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

export const WhiteLabelCssProvider = ({ children }) => {
  const [cssState, setCssState] = useState(() => {
    // Initialize with cached data if available
    const domainName = window.location.hostname;
    const isHostBuddy = domainName === 'hostbuddy.ai' || 
                       domainName === 'www.hostbuddy.ai';
    
    if (isHostBuddy) {
      return {
        cssConfig: null,
        loading: false,
        error: null,
        isHostBuddyDomain: true,
      };
    }
    
    const cached = getCachedCssConfig(domainName);
    if (cached) {
      // Apply cached CSS immediately
      applyCssVariables(cached.cssConfig);
      
      return {
        cssConfig: cached.cssConfig,
        loading: false,
        error: null,
        isHostBuddyDomain: false,
      };
    }
    
    return {
      cssConfig: null,
      loading: true,
      error: null,
      isHostBuddyDomain: false,
    };
  });

  useEffect(() => {
    const fetchWhiteLabelCss = async () => {
      const startTime = performance.now();
      console.log('🚀 [CSS API] Starting CSS config fetch process...', {
        timestamp: new Date().toISOString(),
        performanceStart: startTime
      });
      
      try {
        // Get the domain name
        const domainName = window.location.hostname;
        
        console.log('🌐 [CSS API] Domain detected:', {
          domainName,
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
            timestamp: new Date().toISOString()
          });
          setCssState({
            cssConfig: null,
            loading: false,
            error: null,
            isHostBuddyDomain: true,
          });
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
            timestamp: new Date().toISOString()
          });
          // Already set in initial state, just return
          return;
        }
        
        console.log('❌ [CSS API] Cache MISS - Will fetch from API', {
          domain: domainName,
          cacheCheckTime: `${cacheCheckElapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });

        // For white label domains, call the API
        console.log('📡 [CSS API] Sending API request...', {
          domain: "Acental", // Hardcoded domain
          timestamp: new Date().toISOString()
        });

        const apiCallStart = performance.now();
        const response = await getCssConfig({ domain: "Acental" }); // Hardcoded domain
        const apiCallElapsed = performance.now() - apiCallStart;

        console.log('✅ [CSS API] API response received', {
          success: response.success,
          apiCallTime: `${apiCallElapsed.toFixed(2)}ms`,
          hasData: !!response.data,
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
            error: null,
            isHostBuddyDomain: false,
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
            timestamp: new Date().toISOString()
          });
        } else {
          const totalElapsed = performance.now() - startTime;
          console.log('⚠️ [CSS API] No CSS config available in response', {
            error: response.error,
            totalTime: `${totalElapsed.toFixed(2)}ms`,
            timestamp: new Date().toISOString()
          });
          setCssState({
            cssConfig: null,
            loading: false,
            error: response.error || 'No CSS config available',
            isHostBuddyDomain: false,
          });
        }
      } catch (error) {
        const totalElapsed = performance.now() - startTime;
        console.error('❌ [CSS API] ERROR occurred', {
          error: error.message,
          errorType: error.name,
          totalTime: `${totalElapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });
        
        // On error, check if it's hostbuddy domain
        const domainName = window.location.hostname;
        const isHostBuddy = domainName === 'hostbuddy.ai' || 
                           domainName === 'www.hostbuddy.ai';
        
        setCssState({
          cssConfig: null,
          loading: false,
          error: error.message,
          isHostBuddyDomain: isHostBuddy,
        });
      }
    };

    fetchWhiteLabelCss();
  }, []);

  return (
    <WhiteLabelCssContext.Provider value={cssState}>
      {children}
    </WhiteLabelCssContext.Provider>
  );
};

export default WhiteLabelCssProvider;