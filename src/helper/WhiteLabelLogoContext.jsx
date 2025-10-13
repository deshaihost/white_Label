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
  });

  useEffect(() => {
    const fetchWhiteLabelLogos = async () => {
      try {
        // Get the full domain name
        const fullDomain = window.location.host; // includes port if present
        const domainName = window.location.hostname; // just the hostname
        
        console.log('Fetching white label logos for domain:', fullDomain);
        console.log('Domain hostname:', domainName);

        // Prepare the request body
        const requestBody = {
          domain: domainName // Send just the hostname without port
        };

        // Get the API endpoint from environment
        const baseUrl = process.env.REACT_APP_API_ENDPOINT;
        const apiUrl = `${baseUrl}/white_label/get_logo`;

        // Make the POST request to get logos
        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.REACT_APP_API_KEY,
          }
        });

        console.log('White label logo API response:', response.data);

        // Extract logos from response
        if (response.data && response.data.logos_available) {
          const { logo, full_logo } = response.data.logos_available;
          
          setLogos({
            logo: logo?.url || null,
            fullLogo: full_logo?.url || null,
            loading: false,
            error: null,
          });

          console.log('Logos set successfully:', {
            logo: logo?.url,
            fullLogo: full_logo?.url,
          });
        } else {
          // No logos available, use defaults
          setLogos({
            logo: null,
            fullLogo: null,
            loading: false,
            error: null,
          });
          console.log('No custom logos available, using defaults');
        }
      } catch (error) {
        console.error('Error fetching white label logos:', error);
        
        // Set default logos on error
        setLogos({
          logo: null,
          fullLogo: null,
          loading: false,
          error: error.message,
        });
      }
    };

    // Fetch logos immediately when provider mounts
    fetchWhiteLabelLogos();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <WhiteLabelLogoContext.Provider value={logos}>
      {children}
    </WhiteLabelLogoContext.Provider>
  );
};

export default WhiteLabelLogoProvider;
