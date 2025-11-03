import React, { useState, useEffect } from 'react';
import './RegistrationPageNewDesign.css';
import { createDomainMapping, uploadCompanyLogo, getDomains } from './whiteLabelServices';
import { checkDomainVerificationStatus, checkAndAddDomain } from './domainStatus';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const RegistrationPageNewDesign = () => {
  // Form state
  const [formData, setFormData] = useState({
    productName: '',
    domainName: '',
    subdomain: '',
    key: ''
  });

  // File uploads
  const [fullLogo, setFullLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [fullLogoPreview, setFullLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Verification states
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState('');

  // Domain management states
  const [domains, setDomains] = useState([]);
  const [domainsLoading, setDomainsLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [isNewDomain, setIsNewDomain] = useState(true);
  const [domainCnameVerified, setDomainCnameVerified] = useState(false);
  const [domainRegisteredWithVercel, setDomainRegisteredWithVercel] = useState(false);
  const [showDNSReminder, setShowDNSReminder] = useState(false);
  const [showRegistrationReminder, setShowRegistrationReminder] = useState(false);
  const [domainsDetails, setDomainsDetails] = useState({});

  // Computed full subdomain
  const fullSubdomain = formData.subdomain && formData.domainName 
    ? `${formData.subdomain}.${formData.domainName}` 
    : '';

  // Fetch domains on component mount
  useEffect(() => {
    fetchDomains();
  }, []);

  // Fetch domains function
  const fetchDomains = async () => {
    setDomainsLoading(true);
    try {
      const result = await getDomains();
      if (result.success && result.data) {
        // Extract domain names from white_label.Domains object
        const domainsList = result.data.white_label?.Domains 
          ? Object.keys(result.data.white_label.Domains) 
          : [];
        setDomains(domainsList);
        
        // Store domain details including CNAME verification status
        if (result.data.domains_details) {
          setDomainsDetails(result.data.domains_details);
        }
      }
    } catch (err) {
      console.error('Error fetching domains:', err);
    } finally {
      setDomainsLoading(false);
    }
  };

  // Handle domain selection from dropdown
  const handleDomainSelection = async (e) => {
    const value = e.target.value;
    setSelectedDomain(value);
    
    if (value === '[Add New]') {
      // Reset to new domain mode
      setIsNewDomain(true);
      setDomainCnameVerified(false);
      setDomainRegisteredWithVercel(false);
      setShowDNSReminder(false);
      setShowRegistrationReminder(false);
      setRegistrationComplete(false);
      setFormData({
        productName: '',
        domainName: '',
        subdomain: '',
        key: ''
      });
      setFullLogo(null);
      setFavicon(null);
      setFullLogoPreview(null);
      setFaviconPreview(null);
      setError('');
      setSuccess('');
      setVerificationResult(null);
      setVerificationMessage('');
    } else if (value) {
      // Load existing domain
      setIsNewDomain(false);
      await loadDomainData(value);
    }
  };

  // Load domain data for existing domain
  const loadDomainData = async (domainName) => {
    setDomainsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Parse the domain to extract subdomain and base domain
      const parts = domainName.split('.');
      if (parts.length >= 2) {
        const subdomain = parts[0];
        const baseDomain = parts.slice(1).join('.');
        
        // Get domain details from stored data
        const domainDetails = domainsDetails[domainName] || {};
        
        setFormData({
          productName: domainDetails.company_name || '', 
          domainName: baseDomain,
          subdomain: subdomain,
          key: '' // We don't expose the key for security
        });
      }
      
      // Get CNAME verification status from stored data
      const domainDetails = domainsDetails[domainName] || {};
      const cnameVerified = domainDetails.cname_verified || false;
      
      setRegistrationComplete(true);
      
      // Check if domain is registered with Vercel (using checkDomainVerificationStatus)
      const vercelStatus = await checkDomainVerificationStatus(domainName);
      
      if (!vercelStatus.success || !vercelStatus.exists) {
        // Domain NOT registered with Vercel/HostBuddy system
        setDomainRegisteredWithVercel(false);
        setDomainCnameVerified(false);
        setShowRegistrationReminder(true);
        setShowDNSReminder(false);
        setError('');
      } else {
        // Domain IS registered with Vercel/HostBuddy system
        setDomainRegisteredWithVercel(true);
        setShowRegistrationReminder(false);
        
        if (cnameVerified) {
          // Domain is fully verified (both registered AND CNAME configured)
          setDomainCnameVerified(true);
          setShowDNSReminder(false);
          setSuccess(`Domain "${domainName}" is successfully set up and verified!`);
        } else {
          // Domain registered but CNAME not verified yet
          setDomainCnameVerified(false);
          setShowDNSReminder(true);
          setError('');
          // Scroll to DNS section after a brief delay
          setTimeout(() => {
            const dnsSection = document.getElementById('dns-section');
            if (dnsSection) {
              dnsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 500);
        }
      }
      
    } catch (err) {
      console.error('Error loading domain data:', err);
      setError('Failed to load domain information. Please try again.');
    } finally {
      setDomainsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  // Handle full logo selection
  const handleFullLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Full logo file size should not exceed 10MB');
        return;
      }
      setFullLogo(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFullLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      if (error) setError('');
    }
  };

  // Handle favicon selection
  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Favicon file size should not exceed 10MB');
        return;
      }
      setFavicon(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      if (error) setError('');
    }
  };

  // Remove logo
  const removeFullLogo = () => {
    setFullLogo(null);
    setFullLogoPreview(null);
    const fileInput = document.getElementById('fullLogoInput');
    if (fileInput) fileInput.value = '';
  };

  // Remove favicon
  const removeFavicon = () => {
    setFavicon(null);
    setFaviconPreview(null);
    const fileInput = document.getElementById('faviconInput');
    if (fileInput) fileInput.value = '';
  };

  // Validate form
  const validateForm = () => {
    if (!formData.productName.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.domainName.trim()) {
      setError('Domain name is required');
      return false;
    }
    if (!formData.subdomain.trim()) {
      setError('Subdomain is required');
      return false;
    }
    if (!formData.key.trim()) {
      setError('Key is required');
      return false;
    }
    if (!fullLogo) {
      setError('Full logo is required');
      return false;
    }
    if (!favicon) {
      setError('Small logo / favicon is required');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccess('');
    setVerificationResult(null);
    setVerificationMessage('');

    // Validate
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create domain mapping
      const domainResult = await createDomainMapping({
        fullDomainName: fullSubdomain,
        key: formData.key,
        company: formData.productName
      });

      if (!domainResult.success) {
        setError(domainResult.error || 'Failed to create domain mapping');
        setLoading(false);
        return;
      }

      // Step 2: Upload logos
      const logoResult = await uploadCompanyLogo({
        domain: fullSubdomain,
        logo: favicon,
        full_logo: fullLogo
      });

      if (!logoResult.success) {
        setError(logoResult.error || 'Failed to upload logos');
        setLoading(false);
        return;
      }

      // Step 3: Add domain to Vercel
      const vercelResult = await checkAndAddDomain(fullSubdomain);
      
      if (!vercelResult.success) {
        // Log warning but don't fail completely - domain was added to Firestore
        console.warn('Vercel registration warning:', vercelResult.message);
        setError(`Domain registered but Vercel setup incomplete: ${vercelResult.message || 'Please contact support.'}`);
        setRegistrationComplete(true);
        setShowRegistrationReminder(true);
        setLoading(false);
        return;
      }

      // Success!
      setSuccess('Registration completed successfully! Please proceed to configure your DNS settings below.');
      setRegistrationComplete(true);
      setDomainRegisteredWithVercel(true);
      setShowRegistrationReminder(false);
      
      // Refresh domain list to get updated details
      await fetchDomains();
      
      // Scroll to DNS instructions
      setTimeout(() => {
        const dnsSection = document.getElementById('dns-section');
        if (dnsSection) {
          dnsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);

    } catch (err) {
      console.error('Error during registration:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle domain verification
  const handleVerifyDomain = async () => {
    if (!fullSubdomain) {
      setVerificationMessage('Please complete the registration form first');
      setVerificationResult(false);
      return;
    }

    setVerifying(true);
    setVerificationMessage('');
    setVerificationResult(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/white_label/validate_cname`,
        { domain: fullSubdomain },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.is_valid) {
        setVerificationResult(true);
        setVerificationMessage(response.data.message || 'Domain verified successfully! Your CNAME record is correctly configured.');
        
        // Update state to reflect successful verification
        setDomainCnameVerified(true);
        setShowDNSReminder(false);
        
        // Refresh domain list to get updated verification status
        await fetchDomains();
        
        // If viewing an existing domain, update the success message
        if (!isNewDomain && selectedDomain) {
          setSuccess(`Domain "${selectedDomain}" is successfully set up and verified!`);
        } else if (fullSubdomain) {
          setSuccess(`Domain "${fullSubdomain}" is successfully set up and verified!`);
        }
      } else {
        setVerificationResult(false);
        setVerificationMessage(response.data.message || 'Domain verification failed. Please ensure your CNAME record is correctly configured.');
      }
    } catch (err) {
      console.error('Error verifying domain:', err);
      setVerificationResult(false);
      
      let errorMsg = 'Verification failed. ';
      if (err.response?.data?.message) {
        errorMsg += err.response.data.message;
      } else {
        errorMsg += 'Please ensure your CNAME record is correctly configured and has propagated (this can take up to 48 hours).';
      }
      
      setVerificationMessage(errorMsg);
    } finally {
      setVerifying(false);
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show temporary success message
      const elem = document.getElementById(`copy-success-${label}`);
      if (elem) {
        elem.style.display = 'inline';
        setTimeout(() => {
          elem.style.display = 'none';
        }, 2000);
      }
    });
  };

  return (
    <div className="registration-page-new">
      <div className="registration-container">
        {/* Header Section */}
        <div className="registration-header">
          <div className="header-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>White Label Domain Registration</h1>
          <p className="header-description">
            Set up your branded portal by registering your custom domain, uploading your logos, 
            and configuring DNS settings. This allows your users to access a fully white-labeled 
            version of HostBuddy under your own domain.
          </p>
        </div>

        {/* Registration Form Section */}
        <form onSubmit={handleSubmit} className="registration-form-section">
          <div className="section-header">
            <h2>Brand & Domain Details</h2>
            <p>Enter your branding information and domain configuration</p>
          </div>

          {/* Domain Selector Dropdown */}
          <div className="domain-selector-container">
            <label htmlFor="domainSelector">
              Select Existing Domain or Add New
            </label>
            <select
              id="domainSelector"
              value={selectedDomain}
              onChange={handleDomainSelection}
              disabled={domainsLoading}
              className="form-input domain-selector"
            >
              <option value="[Add New]">[Add New Domain]</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            <span className="input-hint">
              {domainsLoading ? 'Loading domains...' : 'Select an existing domain to view/edit, or choose "[Add New Domain]" to register a new one'}
            </span>
          </div>

          {/* Success Banner for Verified Domain */}
          {domainCnameVerified && !isNewDomain && (
            <div className="message-box success-message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>✅ This domain has been successfully set up and verified! Your white label portal is ready.</span>
            </div>
          )}

          {/* Registration Reminder Banner for domains not registered with Vercel */}
          {showRegistrationReminder && !isNewDomain && (
            <div className="message-box warning-message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="17" r="1" fill="currentColor"/>
              </svg>
              <span>⚠️ This domain needs to be registered with the HostBuddy system. Please click "Register Domain" below to complete the registration.</span>
            </div>
          )}

          <div className="form-grid">
            {/* Product Name */}
            <div className="form-group full-width">
              <label htmlFor="productName">
                Product Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="e.g., ACME Rentals"
                disabled={loading || (registrationComplete && !showRegistrationReminder)}
                className="form-input"
              />
              <span className="input-hint">This is your brand name that will appear in the portal</span>
            </div>

            {/* Domain Name */}
            <div className="form-group">
              <label htmlFor="domainName">
                Your Domain Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="domainName"
                name="domainName"
                value={formData.domainName}
                onChange={handleInputChange}
                placeholder="example.com"
                disabled={loading || registrationComplete}
                className="form-input"
              />
              <span className="input-hint">Your root domain (without subdomain)</span>
            </div>

            {/* Subdomain */}
            <div className="form-group">
              <label htmlFor="subdomain">
                Subdomain <span className="required">*</span>
              </label>
              <div className="subdomain-input-wrapper">
                <input
                  type="text"
                  id="subdomain"
                  name="subdomain"
                  value={formData.subdomain}
                  onChange={handleInputChange}
                  placeholder="ai"
                  disabled={loading || registrationComplete}
                  className="form-input subdomain-input"
                />
                <span className="subdomain-suffix">
                  {formData.domainName ? `.${formData.domainName}` : '.yourdomain.com'}
                </span>
              </div>
              <span className="input-hint">
                This is the subdomain where your users will access the white labeled portal. 
                {fullSubdomain && (
                  <> Your full domain will be: <strong>{fullSubdomain}</strong></>
                )}
              </span>
            </div>

            {/* Key */}
            <div className="form-group full-width">
              <label htmlFor="key">
                Configuration Key <span className="required">*</span>
              </label>
              <input
                type="text"
                id="key"
                name="key"
                value={formData.key}
                onChange={handleInputChange}
                placeholder="Enter your configuration key"
                disabled={loading || (registrationComplete && !showRegistrationReminder)}
                className="form-input"
              />
              <span className="input-hint">Your unique configuration key for this domain</span>
            </div>

            {/* Full Logo Upload */}
            <div className="form-group">
              <label htmlFor="fullLogoInput">
                Full Logo <span className="required">*</span>
              </label>
              <div className="upload-area">
                <input
                  type="file"
                  id="fullLogoInput"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  onChange={handleFullLogoChange}
                  disabled={loading || (registrationComplete && !showRegistrationReminder)}
                  style={{ display: 'none' }}
                />
                {!fullLogoPreview ? (
                  <button
                    type="button"
                    onClick={() => document.getElementById('fullLogoInput').click()}
                    disabled={loading || (registrationComplete && !showRegistrationReminder)}
                    className="upload-button"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Click to upload full logo</span>
                    <span className="upload-hint">PNG, JPG, SVG (max 10MB)</span>
                  </button>
                ) : (
                  <div className="preview-container">
                    <img src={fullLogoPreview} alt="Full logo preview" className="logo-preview" />
                    <button
                      type="button"
                      onClick={removeFullLogo}
                      disabled={loading || (registrationComplete && !showRegistrationReminder)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <span className="input-hint">Recommended: 134 × 34 pixels</span>
            </div>

            {/* Favicon Upload */}
            <div className="form-group">
              <label htmlFor="faviconInput">
                Small Logo / Favicon <span className="required">*</span>
              </label>
              <div className="upload-area">
                <input
                  type="file"
                  id="faviconInput"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  onChange={handleFaviconChange}
                  disabled={loading || (registrationComplete && !showRegistrationReminder)}
                  style={{ display: 'none' }}
                />
                {!faviconPreview ? (
                  <button
                    type="button"
                    onClick={() => document.getElementById('faviconInput').click()}
                    disabled={loading || (registrationComplete && !showRegistrationReminder)}
                    className="upload-button"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Click to upload favicon</span>
                    <span className="upload-hint">PNG, JPG, SVG (max 10MB)</span>
                  </button>
                ) : (
                  <div className="preview-container">
                    <img src={faviconPreview} alt="Favicon preview" className="logo-preview" />
                    <button
                      type="button"
                      onClick={removeFavicon}
                      disabled={loading || (registrationComplete && !showRegistrationReminder)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <span className="input-hint">Recommended: 40 × 40 pixels</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            {/* Error/Success Messages near button */}
            {error && (
              <div className="message-box error-message" style={{ marginBottom: '1rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1" fill="currentColor"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {success && !domainCnameVerified && (
              <div className="message-box success-message" style={{ marginBottom: '1rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (registrationComplete && !showRegistrationReminder)}
              className="submit-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Registering...</span>
                </>
              ) : (registrationComplete && !showRegistrationReminder) ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Registration Complete</span>
                </>
              ) : showRegistrationReminder ? (
                <>
                  <span>Retry Domain Registration</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              ) : (
                <>
                  <span>Register Domain</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* DNS Reminder Banner for Unverified Domains */}
        {showDNSReminder && !domainCnameVerified && !isNewDomain && (
          <div className="dns-reminder-banner">
            <div className="reminder-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div className="reminder-content">
              <h3>DNS Configuration Required</h3>
              <p>
                This domain has been registered but needs DNS configuration. 
                Please scroll down to the "Configure DNS Settings" section below to complete the setup 
                and verify your domain.
              </p>
            </div>
          </div>
        )}

        {/* DNS Configuration Section */}
        {registrationComplete && (
          <div id="dns-section" className="dns-section">
            <div className="section-header">
              <h2>Configure DNS Settings</h2>
              <p>Add a CNAME record to your DNS to complete the setup</p>
            </div>

            <div className="dns-instructions">
              <div className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Log in to your domain registrar</h3>
                  <p>Access your DNS management console at your domain registrar or DNS provider (e.g., GoDaddy, Namecheap, Cloudflare, etc.)</p>
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Add a new CNAME record</h3>
                  <p>Navigate to the DNS settings or DNS zone editor for your domain</p>
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Enter the following details</h3>
                  
                  <div className="dns-values-grid">
                    <div className="dns-value-row">
                      <div className="dns-label">Record Type:</div>
                      <div className="dns-value-container">
                        <code className="dns-value">CNAME</code>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('CNAME', 'type')}
                          className="copy-button"
                          title="Copy to clipboard"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                        <span id="copy-success-type" className="copy-success">Copied!</span>
                      </div>
                    </div>

                    <div className="dns-value-row">
                      <div className="dns-label">Name / Host:</div>
                      <div className="dns-value-container">
                        <code className="dns-value">{formData.subdomain}</code>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(formData.subdomain, 'name')}
                          className="copy-button"
                          title="Copy to clipboard"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                        <span id="copy-success-name" className="copy-success">Copied!</span>
                      </div>
                    </div>

                    <div className="dns-value-row">
                      <div className="dns-label">Value / Target:</div>
                      <div className="dns-value-container">
                        <code className="dns-value">hostbuddy.ai</code>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('hostbuddy.ai', 'value')}
                          className="copy-button"
                          title="Copy to clipboard"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                        <span id="copy-success-value" className="copy-success">Copied!</span>
                      </div>
                    </div>

                    <div className="dns-value-row">
                      <div className="dns-label">TTL:</div>
                      <div className="dns-value-container">
                        <code className="dns-value">3600 (or Automatic)</code>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('3600', 'ttl')}
                          className="copy-button"
                          title="Copy to clipboard"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                        <span id="copy-success-ttl" className="copy-success">Copied!</span>
                      </div>
                    </div>
                  </div>

                  <div className="dns-example-box">
                    <div className="example-header">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="8" r="1" fill="currentColor"/>
                      </svg>
                      <strong>Example Configuration</strong>
                    </div>
                    <p>When configured correctly, <code>{fullSubdomain}</code> will point to <code>hostbuddy.ai</code>, allowing your users to access the white labeled portal at your custom domain.</p>
                  </div>
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Save the record and wait for propagation</h3>
                  <p>DNS changes can take anywhere from a few seconds to 48 hours to propagate globally. Try verifying below once you've added the record, but if it doesn't verify immediately, you may need to wait and try again later.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verification Section */}
        {registrationComplete && (
          <div className="verification-section">
            <div className="section-header">
              <h2>Verify Your Domain</h2>
              <p>Once you've added the CNAME record, verify that it's configured correctly</p>
            </div>

            <div className="verification-content">
              <p className="verification-description">
                Click the button below to check if your CNAME record has been properly configured 
                and propagated. This will verify that <strong>{fullSubdomain}</strong> correctly 
                points to <strong>hostbuddy.ai</strong>.
              </p>

              <div className="verification-action">
                <button
                  type="button"
                  onClick={handleVerifyDomain}
                  disabled={verifying}
                  className="verify-button"
                >
                  {verifying ? (
                    <>
                      <span className="spinner"></span>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Verify Domain Configuration</span>
                    </>
                  )}
                </button>
              </div>

              {/* Verification Result */}
              {verificationResult !== null && (
                <div className={`message-box ${verificationResult ? 'success-message' : 'error-message'}`}>
                  {verificationResult ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    </svg>
                  )}
                  <span>{verificationMessage}</span>
                </div>
              )}

              {verificationResult === false && (
                <div className="troubleshooting-box">
                  <h4>Troubleshooting Tips:</h4>
                  <ul>
                    <li>Double-check that you've entered the CNAME record exactly as shown above</li>
                    <li>Ensure you're adding the record to the correct domain</li>
                    <li>DNS propagation can take up to 48 hours - try again later if it hasn't propagated yet</li>
                    <li>Some DNS providers require a trailing dot (e.g., <code>hostbuddy.ai.</code>)</li>
                    <li>Check with your DNS provider's documentation for specific formatting requirements</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPageNewDesign;
