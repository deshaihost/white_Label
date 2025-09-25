// White Label Login API Handler
// This file demonstrates how to handle POST requests from white-label domains

import { APICore } from '../../../helper/apiCore';
import * as URL from '../../../helper/apiEndPoint';

const api = new APICore();

/**
 * Handles white-label login requests
 * @param {Object} params - Login parameters including email, password, and whiteLabelDomain
 * @returns {Promise} API response
 */
function whiteLabelLoginEndPoint(params) {
    // Add white-label domain information to the login payload
    const loginPayload = {
        email: params.email,
        password: params.password,
        whiteLabelDomain: params.whiteLabelDomain || null,
        loginType: 'white-label'
    };
    
    return api.create(URL.LOGIN, loginPayload);
}

/**
 * Validates white-label domain
 * @param {string} domain - The domain to validate
 * @returns {boolean} Whether the domain is allowed
 */
function validateWhiteLabelDomain(domain) {
    // Add your white-label domain validation logic here
    const allowedDomains = [
        'c.acental.com',
        // Add more white-label domains as needed
    ];
    
    return allowedDomains.includes(domain);
}

/**
 * Handles CORS for white-label domains
 * @param {string} origin - Request origin
 * @returns {boolean} Whether origin is allowed
 */
function validateOrigin(origin) {
    const allowedOrigins = [
        'https://c.acental.com',
        'https://hostbuddy.ai',
        'https://www.hostbuddy.ai'
    ];
    
    return allowedOrigins.includes(origin);
}

export {
    whiteLabelLoginEndPoint,
    validateWhiteLabelDomain,
    validateOrigin
};