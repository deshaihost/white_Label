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
  try {
    const cachedData = localStorage.getItem(LOGO_CACHE_KEY);
    const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    
    if (cachedData && cacheExpiry) {
      const expiryTime = parseInt(cacheExpiry, 10);
      const now = Date.now();
      
      if (now < expiryTime) {
        const parsedCache = JSON.parse(cachedData);
        if (parsedCache.domain === domainName) {
          console.log('✅ Using cached white label logos');
          return parsedCache;
        }
      } else {
        // Cache expired, clear it
        localStorage.removeItem(LOGO_CACHE_KEY);
        localStorage.removeItem(CACHE_EXPIRY_KEY);
      }
    }
  } catch (error) {
    console.error('Error reading logo cache:', error);
  }
  return null;
};

// Helper function to cache logos
const cacheLogos = (domainName, logo, fullLogo) => {
  try {
    const cacheData = {
      domain: domainName,
      logo,
      fullLogo,
      timestamp: Date.now()
    };
    localStorage.setItem(LOGO_CACHE_KEY, JSON.stringify(cacheData));
    localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
    console.log('✅ White label logos cached successfully');
  } catch (error) {
    console.error('Error caching logos:', error);
  }
};

// Preload images to avoid render delays
const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve();
      return;
    }
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
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
      try {
        // Get the full domain name
        const fullDomain = window.location.host; // includes port if present
        const domainName = window.location.hostname; // just the hostname
        
        console.log('Fetching white label logos for domain:', fullDomain);
        console.log('Domain hostname:', domainName);

        // Check if it's hostbuddy.ai domain (use local logos)
        const isHostBuddy = domainName === 'hostbuddy.ai' || 
                           domainName === 'www.hostbuddy.ai' || 
                           domainName === 'localhost';
        
        if (isHostBuddy) {
          console.log('HostBuddy domain detected - using local logos');
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
        const cached = getCachedLogos(domainName);
        if (cached) {
          // Already set in initial state, just return
          return;
        }

        // For white label domains, call the API
        const requestBody = {
          domain: domainName
        };

        const baseUrl = process.env.REACT_APP_API_ENDPOINT;
        const apiUrl = `${baseUrl}/white_label/get_logo`;

        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.REACT_APP_API_KEY,
          }
        });

        console.log('White label logo API response:', response.data);

        if (response.data && response.data.logos_available) {
          const { logo, full_logo } = response.data.logos_available;
          const logoUrl = logo?.url || null;
          const fullLogoUrl = full_logo?.url || null;
          
          // Preload images before setting state
          await Promise.all([
            preloadImage(logoUrl),
            preloadImage(fullLogoUrl)
          ]).catch(err => console.error('Error preloading images:', err));
          
          setLogos({
            logo: logoUrl,
            fullLogo: fullLogoUrl,
            loading: false,
            error: null,
            isHostBuddyDomain: false,
          });

          // Cache the logos
          cacheLogos(domainName, logoUrl, fullLogoUrl);

          console.log('White label logos set successfully:', {
            logo: logoUrl,
            fullLogo: fullLogoUrl,
          });
        } else {
          console.log('No custom logos available in response');
          setLogos({
            logo: null,
            fullLogo: null,
            loading: false,
            error: 'No logos available',
            isHostBuddyDomain: false,
          });
        }
      } catch (error) {
        console.error('Error fetching white label logos:', error);
        
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
