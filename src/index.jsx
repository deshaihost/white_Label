import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from "./redux/stores"; 
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { HelmetProvider } from 'react-helmet-async';
import { initializeFavicon } from './helper/faviconManager';

// Import App component properly
import App from "./App";

// ============================================================================
// CRITICAL: Apply cached CSS SYNCHRONOUSLY before React renders
// This prevents FOUC (Flash of Unstyled Content)
// ============================================================================
const applyCachedCssSync = () => {
  try {
    const domainName = window.location.hostname;
    const isHostBuddy = domainName === 'hostbuddy.ai' || domainName === 'www.hostbuddy.ai';
    
    if (isHostBuddy) {
      console.log('⏭️ [SYNC CSS] HostBuddy domain - no white label CSS needed');
      return;
    }
    
    // Check sessionStorage for cached CSS
    const cachedData = sessionStorage.getItem('whiteLabelCssCache');
    
    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      
      if (parsedCache.domain === domainName && parsedCache.cssConfig) {
        console.log('⚡ [SYNC CSS] APPLYING CACHED CSS SYNCHRONOUSLY (before React render)', {
          domain: domainName,
          timestamp: new Date().toISOString()
        });
        
        const cssConfig = parsedCache.cssConfig;
        const root = document.documentElement;
        
        // Apply css_data structure
        if (cssConfig.css_data) {
          const cssData = cssConfig.css_data;
          
          // Apply all CSS categories synchronously
          ['background', 'borders', 'components', 'interactive', 'buttons', 'status', 'text', 'charts', 'effects', 'typography'].forEach(category => {
            if (cssData[category]) {
              Object.entries(cssData[category]).forEach(([key, value]) => {
                const varName = category === 'typography' ? `--white-label-typography-${key}` :
                                category === 'effects' ? `--white-label-effect-${key}` :
                                category === 'charts' ? `--white-label-chart-${key}` :
                                category === 'buttons' ? `--white-label-button-${key}` :
                                category === 'status' ? `--white-label-status-${key}` :
                                category === 'interactive' ? `--white-label-interactive-${key}` :
                                category === 'components' ? `--white-label-component-${key}` :
                                category === 'borders' ? `--white-label-border-${key}` :
                                `--white-label-background-${key}`;
                root.style.setProperty(varName, value);
              });
            }
          });
          
          // Legacy support
          if (cssConfig.colors) {
            Object.entries(cssConfig.colors).forEach(([key, value]) => {
              root.style.setProperty(`--white-label-${key}`, value);
            });
          }
          
          console.log('✅ [SYNC CSS] Cached CSS applied successfully - NO FLASH!');
        }
      } else {
        console.log('⚠️ [SYNC CSS] Cache domain mismatch or invalid - will apply loading CSS');
        applyLoadingCssSync();
      }
    } else {
      console.log('⚠️ [SYNC CSS] No cache found - applying neutral loading CSS');
      applyLoadingCssSync();
    }
  } catch (error) {
    console.error('❌ [SYNC CSS] Error applying cached CSS:', error);
    applyLoadingCssSync();
  }
};

// Apply neutral loading CSS synchronously for white label domains without cache
const applyLoadingCssSync = () => {
  const root = document.documentElement;
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
  
  console.log('⏳ [SYNC CSS] Loading state CSS applied synchronously');
};

// Execute BEFORE React initialization
applyCachedCssSync();
// ============================================================================

// Print the domain name when the application is launched
const domainName = window.location.hostname;
const fullDomain = window.location.host; // includes port if present
const isHostBuddyDomain = domainName === 'hostbuddy.ai' || domainName === 'www.hostbuddy.ai';

console.log('='.repeat(60));
console.log('🌐 APPLICATION LAUNCHED');
console.log('Domain Name:', fullDomain);
console.log('Hostname:', domainName);
console.log('Is HostBuddy Domain:', isHostBuddyDomain);
console.log('Full URL:', window.location.href);
console.log('='.repeat(60));

// Initialize favicon immediately based on domain
initializeFavicon(isHostBuddyDomain);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={configureStore({})}>
        <BrowserRouter>
          <ReactNotifications />
          <App />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// reportWebVitals();
