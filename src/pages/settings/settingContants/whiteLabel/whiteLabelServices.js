import axios from 'axios';

// Base URL - using the same environment variable as other parts of the app
const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

/**
 * Create domain mapping for white label configuration
 * @param {Object} data - Request body
 * @param {string} data.fullDomainName - Full domain name (e.g., mycompany.hostbuddy.com)
 * @param {string} data.key - Authentication/Configuration key
 * @param {string} data.company - Company name
 * @returns {Promise} API response
 */
export const createDomainMapping = async (data) => {
  try {
    // Construct request body with company field last
    const requestBody = {};
    requestBody[data.fullDomainName] = data.key;
    requestBody.company = data.company;

    console.log('Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(
      `${API_BASE_URL}/white_label/create_domain_mapping`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('API Error:', error);
    
    let errorMessage = 'Failed to create domain mapping';
    
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server. Please check your connection.';
    } else {
      // Error setting up the request
      errorMessage = error.message || errorMessage;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Get all domains for white label configuration
 * @returns {Promise} API response with domains list
 */
export const getDomains = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/white_label/get_domains`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('Get Domains Response:', response.data);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get Domains API Error:', error);
    
    let errorMessage = 'Failed to fetch domains';
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection.';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    return {
      success: false,
      error: errorMessage,
      data: null
    };
  }
};
