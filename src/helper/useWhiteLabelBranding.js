import { useState, useEffect } from 'react';

/**
 * Custom hook to manage white-label branding
 * Returns brand information based on the white-label domain
 */
export const useWhiteLabelBranding = () => {
  const [brandInfo, setBrandInfo] = useState({
    isWhiteLabel: false,
    brandName: 'HostBuddy',
    domain: null,
    displayName: 'HostBuddy'
  });

  useEffect(() => {
    const whiteLabelDomain = localStorage.getItem('whiteLabelDomain');
    const whiteLabelBrand = localStorage.getItem('whiteLabelBrand');

    if (whiteLabelDomain && whiteLabelBrand) {
      setBrandInfo({
        isWhiteLabel: true,
        brandName: whiteLabelBrand,
        domain: whiteLabelDomain,
        displayName: whiteLabelBrand
      });
    } else {
      // Check if current domain is a white-label domain (for direct access)
      const currentDomain = window.location.hostname;
      
      // Only consider it white-label if it's not the main hostbuddy domains
      if (currentDomain !== 'hostbuddy.ai' && 
          currentDomain !== 'www.hostbuddy.ai' && 
          currentDomain !== 'localhost' && 
          currentDomain !== '127.0.0.1') {
        
        const brandName = getDomainBrandName(currentDomain);
        setBrandInfo({
          isWhiteLabel: true,
          brandName: brandName,
          domain: currentDomain,
          displayName: brandName
        });
        
        // Auto-store the detected white-label info
        localStorage.setItem('whiteLabelDomain', currentDomain);
        localStorage.setItem('whiteLabelBrand', brandName);
        console.log('Auto-detected white-label domain:', currentDomain, '→', brandName);
      }
    }
  }, []);

  // Function to get brand name from domain
  const getDomainBrandName = (domain) => {
    // Map of domains to brand names
    const domainToBrandMap = {
      'c.acental.com': 'Acental',
      'app.acental.com': 'Acental',
      'acental.com': 'Acental',
      // Add more white-label domains and their brand names here
    };
    
    return domainToBrandMap[domain] || domain.charAt(0).toUpperCase() + domain.slice(1).split('.')[0];
  };

  // Function to clear white-label branding (for logout)
  const clearWhiteLabelBranding = () => {
    localStorage.removeItem('whiteLabelDomain');
    localStorage.removeItem('whiteLabelBrand');
    setBrandInfo({
      isWhiteLabel: false,
      brandName: 'HostBuddy',
      domain: null,
      displayName: 'HostBuddy'
    });
  };

  // Function to manually set white-label branding
  const setWhiteLabelBranding = (domain, brandName) => {
    localStorage.setItem('whiteLabelDomain', domain);
    localStorage.setItem('whiteLabelBrand', brandName);
    setBrandInfo({
      isWhiteLabel: true,
      brandName: brandName,
      domain: domain,
      displayName: brandName
    });
  };

  return {
    ...brandInfo,
    clearWhiteLabelBranding,
    setWhiteLabelBranding
  };
};

export default useWhiteLabelBranding;