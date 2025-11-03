/**
 * Script: Add a domain to Vercel and check its status
 * ----------------------------------------------------
 * This script:
 * 1. Adds a domain/subdomain to a Vercel project via backend API
 * 2. Checks if it was successfully added
 * 3. Reports the current status
 *
 * Requirements:
 * - Backend API endpoints for Vercel operations
 * - Authentication token
 *
 * Usage:
 * - Import functions and pass domain name dynamically
 */

import axios from 'axios';

// Base URL - using the same environment variable as other parts of the app
const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// ---------------- INTERNAL API CALL FUNCTIONS ----------------

/**
 * Add a domain to Vercel via backend API
 * @param {string} domain - The domain to add
 * @returns {Promise<Object>} - Result object
 */
async function addDomainViaBackend(domain) {
  try {
    console.log(`\n🔄 Adding domain: ${domain}...`);
    
    const response = await axios.post(
      `${API_BASE_URL}/white_label/vercel/add_domain`,
      { domain },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const data = response.data;

    // Check if domain was added or already exists
    if (data.alreadyExists) {
      console.log(`\n⚠️  Domain already exists in your project`);
      return { success: true, alreadyExists: true, data: data.data };
    }

    // Domain successfully added
    console.log(`\n✅ Domain successfully added!`);
    return { success: true, alreadyExists: false, data };
  } catch (err) {
    console.error("\n❌ Error adding domain:", err.message);
    const errorData = err.response?.data;
    return { 
      success: false, 
      error: errorData?.error || { message: err.message }
    };
  }
}

/**
 * Check domain status via backend API
 * @param {string} domain - The domain to check
 * @returns {Promise<Object>} - Status object
 */
async function checkDomainStatusViaBackend(domain) {
  try {
    console.log(`\n🔍 Checking domain status...`);
    
    const response = await axios.post(
      `${API_BASE_URL}/white_label/vercel/check_domain`,
      { domain },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const data = response.data;
    return { exists: true, data: data.data };
  } catch (err) {
    if (err.response?.status === 404) {
      console.log(`\n❌ Domain not found`);
      return { exists: false, error: err.response.data.error };
    }
    console.error("\n❌ Error checking domain:", err.message);
    return { exists: false, error: { message: err.message } };
  }
}

/**
 * Check domain verification via backend API
 * @param {string} domain - The domain to check
 * @returns {Promise<Object>} - Verification object
 */
async function checkDomainVerificationViaBackend(domain) {
  try {
    console.log(`\n🔍 Checking domain verification and DNS configuration...`);
    
    const response = await axios.post(
      `${API_BASE_URL}/white_label/vercel/check_verification`,
      { domain },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const data = response.data;
    
    console.log(`\n🌐 Domain: ${domain}`);
    console.log(`Verified: ${data.verified}`);
    console.log(`Status: ${data.working ? "✅ Working → Domain is verified and configured" : "⚠️ Not configured"}`);

    return data;
  } catch (err) {
    console.error("\n❌ Error checking domain verification:", err.message);
    const errorData = err.response?.data;
    return {
      success: false,
      exists: false,
      verified: false,
      dnsConfigured: false,
      working: false,
      error: errorData?.error || { message: err.message }
    };
  }
}

// ---------------- DISPLAY STATUS ----------------
function displayStatus(statusData) {
  if (!statusData.exists) {
    console.log(`\n❌ DOMAIN NOT ADDED`);
    console.log(`   The domain does not exist in your Vercel project.`);
    return;
  }

  const domain = statusData.data;
  const verified = domain.verified || false;
  
  console.log(`\n${"=".repeat(50)}`);
  console.log(`📊 DOMAIN STATUS REPORT`);
  console.log(`${"=".repeat(50)}`);
  console.log(`Domain:        ${domain.name}`);
  console.log(`Apex Domain:   ${domain.apexName}`);
  console.log(`Verified:      ${verified ? "✅ Yes" : "❌ No"}`);
  console.log(`Project ID:    ${domain.projectId}`);
  console.log(`Created:       ${new Date(domain.createdAt).toLocaleString()}`);
  console.log(`Updated:       ${new Date(domain.updatedAt).toLocaleString()}`);
  console.log(`${"=".repeat(50)}`);
  
  if (verified) {
    console.log(`\n✅ STATUS: Domain is successfully added and verified!`);
    console.log(`\n📝 Next Steps (if DNS not configured yet):`);
    console.log(`   1. Add a CNAME record in your DNS provider:`);
    console.log(`      Type:  CNAME`);
    console.log(`      Name:  ${domain.name.split('.')[0]}`);
    console.log(`      Value: cname.vercel-dns.com`);
    console.log(`   2. Wait 5-30 minutes for DNS propagation`);
    console.log(`   3. Your domain will be live!`);
  } else {
    console.log(`\n⚠️  STATUS: Domain added but not verified`);
    console.log(`   Please check your Vercel dashboard for verification steps.`);
  }
}

// ---------------- EXPORTED FUNCTIONS FOR REACT INTEGRATION ----------------

/**
 * Check if domain exists in Vercel and add it if not
 * @param {string} domainName - The domain to check/add (passed dynamically)
 * @returns {Promise<Object>} - Status object with domain info
 */
export async function checkAndAddDomain(domainName) {
  try {
    console.log(`\n${"=".repeat(50)}`);
    console.log(`🚀 CHECKING AND ADDING DOMAIN: ${domainName}`);
    console.log(`${"=".repeat(50)}`);

    // Step 1: Check if domain already exists
    const statusResult = await checkDomainStatusViaBackend(domainName);

    if (statusResult.exists) {
      console.log(`\n✅ Domain already added to Vercel`);
      displayStatus(statusResult);
      return {
        success: true,
        added: true,
        verified: statusResult.data.verified,
        data: statusResult.data,
        message: "Domain is already added"
      };
    }

    // Step 2: Domain doesn't exist, try to add it
    console.log(`\n📝 Domain not found. Attempting to add...`);
    const addResult = await addDomainViaBackend(domainName);

    if (!addResult.success) {
      return {
        success: false,
        added: false,
        verified: false,
        error: addResult.error,
        message: addResult.error?.message || "Failed to add domain"
      };
    }

    // Step 3: Check status after adding
    const newStatusResult = await checkDomainStatusViaBackend(domainName);
    displayStatus(newStatusResult);

    console.log(`\n${"=".repeat(50)}`);
    console.log(`✅ Domain successfully added to Vercel!`);
    console.log(`${"=".repeat(50)}\n`);

    return {
      success: true,
      added: true,
      verified: newStatusResult.exists ? newStatusResult.data.verified : false,
      data: newStatusResult.data,
      message: "Domain successfully added"
    };

  } catch (err) {
    console.error("\n❌ Error in checkAndAddDomain:", err.message);
    return {
      success: false,
      added: false,
      verified: false,
      error: err,
      message: "An error occurred while processing domain"
    };
  }
}

/**
 * Check domain status only (without adding)
 * @param {string} domainName - The domain to check
 * @returns {Promise<Object>} - Status object
 */
export async function checkDomainOnly(domainName) {
  try {
    const statusResult = await checkDomainStatusViaBackend(domainName);
    
    if (statusResult.exists) {
      const verified = statusResult.data.verified || false;
      
      return {
        success: true,
        added: true,
        verified: verified,
        dnsConfigured: verified,
        working: verified,
        data: statusResult.data,
        message: verified ? "Domain is working" : "Domain added but not verified"
      };
    }

    return {
      success: true,
      added: false,
      verified: false,
      dnsConfigured: false,
      working: false,
      message: "Domain not added"
    };
  } catch (err) {
    return {
      success: false,
      added: false,
      verified: false,
      dnsConfigured: false,
      working: false,
      error: err,
      message: "Error checking domain status"
    };
  }
}

/**
 * Check domain verification and DNS configuration
 * This function provides detailed verification status
 * @param {string} domainName - The domain to check
 * @returns {Promise<Object>} - Detailed verification status
 */
export async function checkDomainVerificationStatus(domainName) {
  return await checkDomainVerificationViaBackend(domainName);
}
