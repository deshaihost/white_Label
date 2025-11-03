import axios from 'axios';
import { getActiveToken } from '../../../../helper/apiCore';

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
      console.error('Response content:', error.request);
      errorMessage = 'No response from server. Please check your connection. (POST domain mapping)';
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
      errorMessage = 'No response from server. Please check your connection. (GET domains)';
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

/**
 * Upload company logos for white label configuration
 * @param {Object} data - Upload data
 * @param {string} data.domain - Domain name
 * @param {File} data.logo - Logo file
 * @param {File} data.full_logo - Full logo file
 * @returns {Promise} API response
 */
export const uploadCompanyLogo = async (data) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('domain', data.domain);
    
    if (data.logo) {
      formData.append('logo', data.logo);
    }
    
    if (data.full_logo) {
      formData.append('full_logo', data.full_logo);
    }

    console.log('Uploading logos for domain:', data.domain);

    const response = await axios.post(
      `${API_BASE_URL}/white_label/upload_company_logo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    );

    console.log('Upload Logo Response:', response.data);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Upload Logo API Error:', error);
    
    let errorMessage = 'Failed to upload company logos';
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection. (POST upload logo)';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Update dashboard color for white label configuration
 * @param {Object} data - Request body
 * @param {string} data.domain - Domain name
 * @param {string} data.dashboardcolor - Dashboard color in hex format (e.g., #FF5733)
 * @returns {Promise} API response
 */
export const updateDashboardColor = async (data) => {
  try {
    console.log('Updating dashboard color:', data);

    const response = await axios.post(
      `${API_BASE_URL}/white_label/dashboard`,
      {
        domain: data.domain,
        dashboardcolor: data.dashboardcolor
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('Dashboard Color Response:', response.data);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Dashboard Color API Error:', error);
    
    let errorMessage = 'Failed to update dashboard color';
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection. (POST dashboard color)';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Get CSS configuration for white label
 * @param {Object} data - Request body
 * @param {string} data.domain - Domain name (e.g., "Acental")
 * @returns {Promise} API response with CSS configuration
 */
export const getCssConfig = async (data) => {
  try {
    console.log('Getting CSS config for domain:', data.domain);

    // Get the auth token from session
    const token = getActiveToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.post(
      `${API_BASE_URL}/white_label/get_css`,
      {
        domain: data.domain
      },
      { headers }
    );

    console.log('Get CSS Config Response:', response.data);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get CSS Config API Error:', error.response?.data || error.message);
    
    
    let errorMessage = 'Failed to get CSS configuration';
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection. (POST get CSS)';
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

/**
 * Save CSS configuration for white label
 * @param {Object} data - Request body
 * @param {string} data.domain - Domain name
 * @param {string} data.key - Authentication key for the domain
 * @param {Object} data.css_properties - CSS properties object with nested structure
 * @returns {Promise} API response
 */
export const saveCssConfig = async (data) => {
  try {
    console.log('Saving CSS config for domain:', data.domain);

    // Get the auth token from session
    const token = getActiveToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.post(
      `${API_BASE_URL}/white_label/css`,
      {
        domain: data.domain,
        key: data.key,
        css_properties: data.css_properties,
        dark_mode_css_properties: data.dark_mode_css_properties
      },
      { headers }
    );

    console.log('Save CSS Config Response:', response.data);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Save CSS Config API Error:', error.response?.data || error.message);
    
    let errorMessage = 'Failed to save CSS configuration';
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection. (POST save CSS)';
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

/**
 * Set feature settings for white label configuration
 * @param {Object} data - Request body
 * @param {string} data.domain - Domain name
 * @param {Object} data.features_settings - Feature settings object
 * @returns {Promise} API response
 */
export const setFeatures = async (data) => {
  try {
    console.log('Setting feature settings for domain:', data.domain);

    // Get the auth token from session
    const token = getActiveToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.post(
      `${API_BASE_URL}/white_label/set_features`,
      {
        domain: data.domain,
        features_settings: data.features_settings
      },
      { headers }
    );

    console.log('Set Features Response:', response.data);

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Set Features API Error:', error.response?.data || error.message);
    
    let errorMessage = 'Failed to set feature settings';
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection. (POST set features)';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

