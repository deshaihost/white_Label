import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WhiteLabelLogoContext = createContext();

export const useWhiteLabelLogos = () => {
  const context = useContext(WhiteLabelLogoContext);
  if (!context) {
    throw new Error('useWhiteLabelLogos must be used within WhiteLabelLogoProvider');
  }
  return context;
};

export const WhiteLabelLogoProvider = ({ children }) => {
  const [logos, setLogos] = useState({
    logo: null, // Collapsed navbar logo (40x40)
    fullLogo: null, // Expanded navbar logo (134x34)
    loading: true,
    error: null,
    isHostBuddyDomain: false, // Flag to indicate if it's hostbuddy domain
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
          
          setLogos({
            logo: logo?.url || null,
            fullLogo: full_logo?.url || null,
            loading: false,
            error: null,
            isHostBuddyDomain: false,
          });

          console.log('White label logos set successfully:', {
            logo: logo?.url,
            fullLogo: full_logo?.url,
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
