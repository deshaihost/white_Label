import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WhiteLabelLogoContext = createContext();

// Cache key for localStorage
const LOGO_CACHE_KEY = 'whiteLabelLogosCache';
const CACHE_EXPIRY_KEY = 'whiteLabelLogosCacheExpiry';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const useWhiteLabelLogos = () => {
  const context = useContext(WhiteLabelLogoContext);
  if (!context) {
    throw new Error('useWhiteLabelLogos must be used within WhiteLabelLogoProvider');
  }
  return context;
};

// Helper function to get cached logos
const getCachedLogos = (domainName) => {
  const cacheStart = performance.now();
  console.log('🔍 [CACHE] Checking cache for domain...', {
    domain: domainName,
    timestamp: new Date().toISOString()
  });
  
  try {
    const cachedData = localStorage.getItem(LOGO_CACHE_KEY);
    const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    
    if (cachedData && cacheExpiry) {
      const expiryTime = parseInt(cacheExpiry, 10);
      const now = Date.now();
      
      if (now < expiryTime) {
        const parsedCache = JSON.parse(cachedData);
        if (parsedCache.domain === domainName) {
          const elapsed = performance.now() - cacheStart;
          const remainingTime = Math.floor((expiryTime - now) / 1000 / 60);
          console.log('✅ [CACHE] Cache HIT! Using cached logos', {
            domain: domainName,
            cachedTimestamp: new Date(parsedCache.timestamp).toISOString(),
            expiresIn: `${remainingTime} minutes`,
            cacheReadTime: `${elapsed.toFixed(2)}ms`,
            timestamp: new Date().toISOString()
          });
          return parsedCache;
        } else {
          const elapsed = performance.now() - cacheStart;
          console.log('❌ [CACHE] Cache MISS - Domain mismatch', {
            requestedDomain: domainName,
            cachedDomain: parsedCache.domain,
            cacheReadTime: `${elapsed.toFixed(2)}ms`,
            timestamp: new Date().toISOString()
          });
        }
      } else {
        const elapsed = performance.now() - cacheStart;
        console.log('⏰ [CACHE] Cache EXPIRED - Clearing old cache', {
          expiredAt: new Date(expiryTime).toISOString(),
          cacheReadTime: `${elapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });
        // Cache expired, clear it
        localStorage.removeItem(LOGO_CACHE_KEY);
        localStorage.removeItem(CACHE_EXPIRY_KEY);
      }
    } else {
      const elapsed = performance.now() - cacheStart;
      console.log('❌ [CACHE] Cache MISS - No cache found', {
        cacheReadTime: `${elapsed.toFixed(2)}ms`,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    const elapsed = performance.now() - cacheStart;
    console.error('❌ [CACHE] Error reading cache', {
      error: error.message,
      cacheReadTime: `${elapsed.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
  }
  return null;
};

// Helper function to cache logos
const cacheLogos = (domainName, logo, fullLogo) => {
  const cacheStart = performance.now();
  console.log('💾 [CACHE] Caching logos...', {
    domain: domainName,
    timestamp: new Date().toISOString()
  });
  
  try {
    const cacheData = {
      domain: domainName,
      logo,
      fullLogo,
      timestamp: Date.now()
    };
    localStorage.setItem(LOGO_CACHE_KEY, JSON.stringify(cacheData));
    localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
    
    const elapsed = performance.now() - cacheStart;
    const expiresAt = new Date(Date.now() + CACHE_DURATION);
    console.log('✅ [CACHE] Logos cached successfully', {
      domain: domainName,
      cacheWriteTime: `${elapsed.toFixed(2)}ms`,
      expiresAt: expiresAt.toISOString(),
      duration: `${CACHE_DURATION / 1000 / 60} minutes`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const elapsed = performance.now() - cacheStart;
    console.error('❌ [CACHE] Error caching logos', {
      error: error.message,
      cacheWriteTime: `${elapsed.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
  }
};

// Preload images to avoid render delays with optimized settings
const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      console.log('ℹ️ [PRELOAD] No URL provided, skipping preload');
      resolve();
      return;
    }
    
    const preloadStart = performance.now();
    console.log('⏳ [PRELOAD] Starting image preload...', {
      url: url.substring(0, 60) + (url.length > 60 ? '...' : ''),
      timestamp: new Date().toISOString()
    });
    
    const img = new Image();
    
    // Set high priority for faster loading
    if ('fetchPriority' in img) {
      img.fetchPriority = 'high';
    }
    
    // Decode image before resolving for smoother rendering
    img.onload = () => {
      const loadElapsed = performance.now() - preloadStart;
      console.log('✅ [PRELOAD] Image downloaded', {
        downloadTime: `${loadElapsed.toFixed(2)}ms`,
        timestamp: new Date().toISOString()
      });
      
      if ('decode' in img) {
        const decodeStart = performance.now();
        img.decode()
          .then(() => {
            const decodeElapsed = performance.now() - decodeStart;
            const totalElapsed = performance.now() - preloadStart;
            console.log('🎨 [PRELOAD] Image decoded successfully', {
              decodeTime: `${decodeElapsed.toFixed(2)}ms`,
              totalTime: `${totalElapsed.toFixed(2)}ms`,
              timestamp: new Date().toISOString()
            });
            resolve();
          })
          .catch((err) => {
            console.warn('⚠️ [PRELOAD] Decode failed, resolving anyway', {
              error: err.message
            });
            resolve(); // Resolve anyway if decode fails
          });
      } else {
        console.log('ℹ️ [PRELOAD] Decode API not supported', {
          totalTime: `${loadElapsed.toFixed(2)}ms`
        });
        resolve();
      }
    };
    
    img.onerror = (err) => {
      const errorElapsed = performance.now() - preloadStart;
      console.error('❌ [PRELOAD] Image preload failed', {
        url: url.substring(0, 60) + '...',
        errorTime: `${errorElapsed.toFixed(2)}ms`,
        timestamp: new Date().toISOString()
      });
      reject(err);
    };
    
    img.src = url;
  });
};

export const WhiteLabelLogoProvider = ({ children }) => {
  const [logos, setLogos] = useState(() => {
    // Initialize with cached data if available
    const domainName = window.location.hostname;
    const isHostBuddy = domainName === 'hostbuddy.ai' || 
                       domainName === 'www.hostbuddy.ai' || 
                       domainName === 'localhost';
    
    if (isHostBuddy) {
      return {
        logo: null,
        fullLogo: null,
        loading: false,
        error: null,
        isHostBuddyDomain: true,
      };
    }
    
    const cached = getCachedLogos(domainName);
    if (cached) {
      // Preload cached images in background
      Promise.all([
        preloadImage(cached.logo),
        preloadImage(cached.fullLogo)
      ]).catch(err => console.error('Error preloading cached images:', err));
      
      return {
        logo: cached.logo,
        fullLogo: cached.fullLogo,
        loading: false,
        error: null,
        isHostBuddyDomain: false,
      };
    }
    
    return {
      logo: null,
      fullLogo: null,
      loading: true,
      error: null,
      isHostBuddyDomain: false,
    };
  });

  useEffect(() => {
    const fetchWhiteLabelLogos = async () => {
      const startTime = performance.now();
      console.log('🚀 [LOGO API] Starting logo fetch process...', {
        timestamp: new Date().toISOString(),
        performanceStart: startTime
      });
      
      try {
        // Get the full domain name
        const fullDomain = window.location.host; // includes port if present
        const domainName = window.location.hostname; // just the hostname
        
        console.log('🌐 [LOGO API] Domain detected:', {
          fullDomain,
          domainName,
          timestamp: new Date().toISOString()
        });

        // Check if it's hostbuddy.ai domain (use local logos)
        const isHostBuddy = domainName === 'hostbuddy.ai' || 
                           domainName === 'www.hostbuddy.ai' || 
                           domainName === 'localhost';
        
        if (isHostBuddy) {
          const elapsed = performance.now() - startTime;
          console.log('✅ [LOGO API] HostBuddy domain detected - using local logos', {
            domain: domainName,
            elapsed: `${elapsed.toFixed(2)}ms`,
            timestamp: new Date().toISOString()
          });
          setLogos({
            logo: null,
            fullLogo: null,
            loading: false,
            error: null,
            isHostBuddyDomain: true,
          });
          return;
        }

        // Check cache first
        const cacheCheckStart = performance.now();
        const cached = getCachedLogos(domainName);
        const cacheCheckElapsed = performance.now() - cacheCheckStart;
        
        if (cached) {
          const totalElapsed = performance.now() - startTime;
          console.log('💾 [LOGO API] Cache HIT - Using cached logos', {
            domain: domainName,
            logo: cached.logo ? cached.logo.substring(0, 50) + '...' : null,
            fullLogo: cached.fullLogo ? cached.fullLogo.substring(0, 50) + '...' : null,
            cacheCheckTime: `${cacheCheckElapsed.toFixed(2)}ms`,
            totalElapsed: `${totalElapsed.toFixed(2)}ms`,
            timestamp: new Date().toISOString()
          });
          // Already set in initial state, just return
          return;
        }
        
        console.log('❌ [LOGO API] Cache MISS - Will fetch from API', {
          domain: domainName,
          cacheCheckTime: `${cacheCheckElapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });

        // For white label domains, call the API with timeout
        const requestBody = {
          domain: domainName
        };

        const baseUrl = process.env.REACT_APP_API_ENDPOINT;
        const apiUrl = `${baseUrl}/white_label/get_logo`;

        console.log('📡 [LOGO API] Sending API request...', {
          url: apiUrl,
          domain: domainName,
          timestamp: new Date().toISOString()
        });

        const apiCallStart = performance.now();
        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.REACT_APP_API_KEY,
          },
          timeout: 5000 // 5 second timeout for faster failure recovery
        });
        const apiCallElapsed = performance.now() - apiCallStart;

        console.log('✅ [LOGO API] API response received', {
          status: response.status,
          apiCallTime: `${apiCallElapsed.toFixed(2)}ms`,
          hasLogos: !!response.data?.logos_available,
          timestamp: new Date().toISOString()
        });

        if (response.data && response.data.logos_available) {
          const { logo, full_logo } = response.data.logos_available;
          const logoUrl = logo?.url || null;
          const fullLogoUrl = full_logo?.url || null;
          
          console.log('🖼️ [LOGO API] Logo URLs extracted', {
            logoUrl: logoUrl ? logoUrl.substring(0, 60) + '...' : 'None',
            fullLogoUrl: fullLogoUrl ? fullLogoUrl.substring(0, 60) + '...' : 'None',
            timestamp: new Date().toISOString()
          });
          
          // ⚡ OPTIMIZATION: Set state immediately, don't wait for preload
          // This allows components to start rendering while images download in background
          console.log('⚡ [LOGO API] Setting logos immediately (non-blocking)', {
            timestamp: new Date().toISOString()
          });
          
          setLogos({
            logo: logoUrl,
            fullLogo: fullLogoUrl,
            loading: false,
            error: null,
            isHostBuddyDomain: false,
          });

          // Cache the logos immediately
          const cacheStart = performance.now();
          cacheLogos(domainName, logoUrl, fullLogoUrl);
          const cacheElapsed = performance.now() - cacheStart;
          
          const totalElapsed = performance.now() - startTime;
          
          console.log('💾 [LOGO API] Logos cached successfully', {
            cacheTime: `${cacheElapsed.toFixed(2)}ms`,
            timestamp: new Date().toISOString()
          });
          
          console.log('🎉 [LOGO API] COMPLETE - Logos available for render!', {
            totalTime: `${totalElapsed.toFixed(2)}ms`,
            breakdown: {
              apiCall: `${apiCallElapsed.toFixed(2)}ms`,
              cache: `${cacheElapsed.toFixed(2)}ms`
            },
            note: 'Images will load in browser cache (non-blocking)',
            timestamp: new Date().toISOString()
          });
          
          // ⚡ Start preload in background (non-blocking)
          // This populates browser cache for future use
          console.log('🔄 [LOGO API] Starting background image preload (non-blocking)...', {
            timestamp: new Date().toISOString()
          });
          
          const preloadStart = performance.now();
          Promise.all([
            preloadImage(logoUrl),
            preloadImage(fullLogoUrl)
          ]).then(() => {
            const preloadElapsed = performance.now() - preloadStart;
            console.log('✅ [LOGO API] Background preload complete', {
              preloadTime: `${preloadElapsed.toFixed(2)}ms`,
              timestamp: new Date().toISOString()
            });
          }).catch(err => {
            console.error('⚠️ [LOGO API] Background preload error (non-critical):', err);
          });
        } else {
          const totalElapsed = performance.now() - startTime;
          console.log('⚠️ [LOGO API] No custom logos available in response', {
            totalTime: `${totalElapsed.toFixed(2)}ms`,
            timestamp: new Date().toISOString()
          });
          setLogos({
            logo: null,
            fullLogo: null,
            loading: false,
            error: 'No logos available',
            isHostBuddyDomain: false,
          });
        }
      } catch (error) {
        const totalElapsed = performance.now() - startTime;
        console.error('❌ [LOGO API] ERROR occurred', {
          error: error.message,
          errorType: error.name,
          totalTime: `${totalElapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });
        
        // On error, check if it's hostbuddy domain
        const domainName = window.location.hostname;
        const isHostBuddy = domainName === 'hostbuddy.ai' || 
                           domainName === 'www.hostbuddy.ai' || 
                           domainName === 'localhost';
        
        setLogos({
          logo: null,
          fullLogo: null,
          loading: false,
          error: error.message,
          isHostBuddyDomain: isHostBuddy,
        });
      }
    };

    fetchWhiteLabelLogos();
  }, []);

  return (
    <WhiteLabelLogoContext.Provider value={logos}>
      {children}
    </WhiteLabelLogoContext.Provider>
  );
};

export default WhiteLabelLogoProvider;
