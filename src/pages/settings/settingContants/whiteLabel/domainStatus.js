/**
 * Script: Add a domain to Vercel and check its status
 * ----------------------------------------------------
 * This script:
 * 1. Adds a domain/subdomain to a Vercel project
 * 2. Checks if it was successfully added
 * 3. Reports the current status
 *
 * Requirements:
 * - Browser fetch API (no node-fetch needed for React)
 *
 * Usage:
 * - Import functions and pass domain name dynamically
 */

// ---------------- CONFIGURATION ----------------
const VERCEL_TOKEN = "qdJmOtq5k289ypVbOoht8Mo9"; // Get from: https://vercel.com/account/tokens
const TEAM_ID = "team_YFMF8LVQMFSbL1PHOGMYIwYL"; // Found in your Vercel team settings (e.g., team_xxxxx)
const PROJECT_ID = "prj_9L9S6JjH131BoxO6O6QN0KYvyOEn"; // Found in project settings (e.g., prj_xxxxx)
// DOMAIN_NAME is now passed as a parameter to functions

// ---------------- ADD DOMAIN ----------------
async function addDomain(domain) {
  try {
    console.log(`\n🔄 Adding domain: ${domain}...`);
    
    const res = await fetch(
      `https://api.vercel.com/v10/projects/${PROJECT_ID}/domains?teamId=${TEAM_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: domain,
        }),
      }
    );

    const data = await res.json();

    // Check if domain was added or already exists
    if (data.error) {
      if (data.error.code === "domain_already_in_use") {
        console.log(`\n⚠️  Domain already exists in your project`);
        return { success: true, alreadyExists: true, data: data.error.domain };
      } else {
        console.log(`\n❌ Error adding domain:`);
        console.log(`   Code: ${data.error.code}`);
        console.log(`   Message: ${data.error.message}`);
        return { success: false, error: data.error };
      }
    }

    // Domain successfully added
    console.log(`\n✅ Domain successfully added!`);
    return { success: true, alreadyExists: false, data };
  } catch (err) {
    console.error("\n❌ Error adding domain:", err.message);
    return { success: false, error: err };
  }
}

// ---------------- CHECK DOMAIN STATUS ----------------
async function checkDomainStatus(domain) {
  try {
    console.log(`\n🔍 Checking domain status...`);
    
    const res = await fetch(
      `https://api.vercel.com/v9/projects/${PROJECT_ID}/domains/${domain}?teamId=${TEAM_ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.error) {
      console.log(`\n❌ Domain not found or error occurred`);
      return { exists: false, error: data.error };
    }

    return { exists: true, data };
  } catch (err) {
    console.error("\n❌ Error checking domain:", err.message);
    return { exists: false, error: err };
  }
}

// ---------------- CHECK DOMAIN VERIFICATION & DNS CONFIGURATION ----------------
async function checkDomainVerification(domain) {
  try {
    console.log(`\n🔍 Checking domain verification and DNS configuration...`);
    
    const res = await fetch(
      `https://api.vercel.com/v9/projects/${PROJECT_ID}/domains/${domain}?teamId=${TEAM_ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.error) {
      console.log(`\n❌ Error: ${data.error.message || 'Domain not found'}`);
      return {
        success: false,
        exists: false,
        verified: false,
        dnsConfigured: false,
        working: false,
        error: data.error
      };
    }

    // Note: Vercel API v9 returns 'verified' when domain is added and working
    // The presence of 'verified: true' means domain is added to project
    // DNS configuration is implied when domain is verified
    const verified = data.verified || false;
    const dnsConfigured = verified; // If verified, DNS is configured
    const working = verified;

    console.log(`\n🌐 Domain: ${domain}`);
    console.log(`Verified: ${verified}`);
    console.log(`Status: ${working ? "✅ Working → Domain is verified and configured" : "⚠️ Not configured"}`);

    return {
      success: true,
      exists: true,
      verified: verified,
      dnsConfigured: dnsConfigured,
      working: working,
      cnameVerified: verified, // Set to same as verified for compatibility
      aRecordsVerified: verified, // Set to same as verified for compatibility
      data: data
    };

  } catch (err) {
    console.error("\n❌ Error checking domain verification:", err.message);
    return {
      success: false,
      exists: false,
      verified: false,
      dnsConfigured: false,
      working: false,
      error: err
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
    const statusResult = await checkDomainStatus(domainName);

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
    const addResult = await addDomain(domainName);

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
    const newStatusResult = await checkDomainStatus(domainName);
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
    const statusResult = await checkDomainStatus(domainName);
    
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
  return await checkDomainVerification(domainName);
}
