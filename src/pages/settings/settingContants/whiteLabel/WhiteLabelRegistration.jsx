import React, { useState, useEffect } from 'react';
import './WhiteLabelRegistration.css';
import { createDomainMapping, getDomains, uploadCompanyLogo, updateDashboardColor } from './whiteLabelServices';
import { checkDomainOnly, checkAndAddDomain, checkDomainVerificationStatus } from './domainStatus';

const WhiteLabelRegistration = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const [domains, setDomains] = useState([]);

  // Print domain name on initial load
  useEffect(() => {
    const fullDomain = window.location.hostname;
    console.log('Full Domain:', fullDomain);
  }, []);

  return (
    <div className="white-label-registration-demo">
      {/* Header */}
      <div className="demo-header">
        <div className="demo-header-content">
          <div className="demo-header-title">
            <div className="demo-logo">
              <span>HB</span>
            </div>
            <h1>HostBuddy White Label System</h1>
          </div>
          <p className="demo-subtitle">
            Complete visual walkthrough of the white label configuration portal and branded end-user experience
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="demo-main-content">
        {/* Tabs */}
        <div className="demo-tabs">
          <div className="demo-tabs-list">
            <button
              className={`demo-tab-trigger ${activeTab === 'setup' ? 'active' : ''}`}
              onClick={() => setActiveTab('setup')}
            >
              Partner Setup Portal
            </button>
            <button
              className={`demo-tab-trigger ${activeTab === 'enduser' ? 'active' : ''}`}
              onClick={() => setActiveTab('enduser')}
            >
              End-User Experience
            </button>
          </div>

          {/* Partner Setup Portal Tab */}
          {activeTab === 'setup' && (
            <div className="demo-tab-content">
              <div className="demo-section">
                <div className="demo-section-header">
                  <div className="demo-section-icon">
                    <span>⚙️</span>
                  </div>
                  <div>
                    <h2>Partner Setup Portal</h2>
                    <p>Configure your branded HostBuddy instance within the Master Account framework</p>
                  </div>
                </div>

                <div className="demo-section-content">
                  {/* Branding Setup */}
                  <BrandingSetup />
                  
                  {/* Settings Setup */}
                  <SettingsSetup />
                  
                  {/* User Management */}
                  <UserManagement />
                </div>
              </div>
            </div>
          )}

          {/* End-User Experience Tab */}
          {activeTab === 'enduser' && (
            <div className="demo-tab-content">
              <BrandedPortalExperience />
            </div>
          )}
        </div>

        {/* System Flow Section */}
        <div className="demo-system-flow">
          <h2>System Architecture & Authentication Flow</h2>

          <div className="demo-flow-grid">
            {/* Publishing Flow */}
            <div className="demo-flow-card">
              <h3>Configuration Publishing</h3>
              <div className="demo-flow-steps">
                <div className="demo-flow-step primary">Master Account Portal</div>
                <div className="demo-flow-arrow">→</div>
                <div className="demo-flow-step">Branding + Settings</div>
                <div className="demo-flow-arrow">→</div>
                <div className="demo-flow-step success">Live Tenant (portal.partnername.com)</div>
              </div>
              <p className="demo-flow-note">
                Real-time updates: Changes to branding and feature toggles apply instantly to preview and live environments
              </p>
            </div>

            {/* SSO Flow */}
            <div className="demo-flow-card">
              <h3>End-User Authentication (SSO)</h3>
              <div className="demo-flow-steps">
                <div className="demo-flow-step">Partner PMS</div>
                <div className="demo-flow-arrow">→</div>
                <div className="demo-flow-step accent">JWT Token</div>
                <div className="demo-flow-arrow">→</div>
                <div className="demo-flow-step success">Branded Portal</div>
              </div>
              <p className="demo-flow-note">
                Uses <code>/get_subaccount_token</code> Master Account endpoint for secure session creation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Branding Setup Component
const BrandingSetup = () => {
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    fullDomainName: '',
    key: ''
  });

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Logo upload messages
  const [logoError, setLogoError] = useState('');
  const [logoSuccess, setLogoSuccess] = useState('');
  
  // Domain flow messages
  const [flowError, setFlowError] = useState('');
  const [flowSuccess, setFlowSuccess] = useState('');
  
  // Color palette messages
  const [colorError, setColorError] = useState('');
  const [colorSuccess, setColorSuccess] = useState('');
  
  // Domains state
  const [domains, setDomains] = useState([]);
  const [domainsLoading, setDomainsLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [fullLogo, setFullLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  
  // Domain status state for flow section
  const [flowDomainStatus, setFlowDomainStatus] = useState('Not Checked');
  const [flowSelectedDomain, setFlowSelectedDomain] = useState('');
  const [checkingStatus, setCheckingStatus] = useState(false);
  
  // Color palette domain selection
  const [colorPaletteDomain, setColorPaletteDomain] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#0F172A');

  // Preview iframe state
  const [showPreview, setShowPreview] = useState(false);

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
      }
    } catch (err) {
      console.error('Error fetching domains:', err);
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
    // Clear error when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  // Validate form
  const validateForm = () => {
    if (!formData.companyName.trim()) {
      setError('Company Name is required');
      return false;
    }
    if (!formData.fullDomainName.trim()) {
      setError('Full Domain Name is required');
      return false;
    }
    if (!formData.key.trim()) {
      setError('Key is required');
      return false;
    }
    return true;
  };

  // Handle file selection for full logo
  const handleFullLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('File size should not exceed 2MB');
        return;
      }
      setFullLogo(file);
      if (error) setError('');
    }
  };

  // Handle file selection for favicon
  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('File size should not exceed 2MB');
        return;
      }
      setFavicon(file);
      if (error) setError('');
    }
  };

  // Trigger file input click
  const triggerFileInput = (inputId) => {
    document.getElementById(inputId).click();
  };

  // Handle domain selection
  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
  };

  // Handle domain selection in flow section and check status
  const handleFlowDomainChange = async (e) => {
    const domain = e.target.value;
    setFlowSelectedDomain(domain);
    
    if (!domain) {
      setFlowDomainStatus('Not Checked');
      return;
    }

    // Check domain status automatically when domain is selected
    setCheckingStatus(true);
    setFlowDomainStatus('Checking...');
    
    try {
      const result = await checkDomainVerificationStatus(domain);
      
      if (result.success && result.exists) {
        if (result.verified && result.working) {
          setFlowDomainStatus('✅ Verified');
        } else if (result.verified) {
          setFlowDomainStatus('Added');
        } else {
          setFlowDomainStatus('⚠️ Not Verified');
        }
      } else {
        setFlowDomainStatus('Not Added');
      }
    } catch (err) {
      console.error('Error checking domain status:', err);
      setFlowDomainStatus('Error');
    } finally {
      setCheckingStatus(false);
    }
  };

  // Handle Submit button in Domain Configuration Flow
  const handleDomainSubmit = async () => {
    // Reset messages
    setFlowError('');
    setFlowSuccess('');

    // Validate domain selection
    if (!flowSelectedDomain) {
      setFlowError('Please select a domain from the dropdown');
      return;
    }

    setCheckingStatus(true);
    setFlowDomainStatus('Processing...');

    try {
      // Run the domain status script to add domain to Vercel
      const result = await checkAndAddDomain(flowSelectedDomain);

      if (result.success && result.added) {
        // After adding, check verification status
        const verifyResult = await checkDomainVerificationStatus(flowSelectedDomain);
        
        if (verifyResult.verified && verifyResult.working) {
          setFlowDomainStatus('✅ Verified');
          setFlowSuccess(`Domain "${flowSelectedDomain}" is verified and configured! Add CNAME record in DNS for full functionality.`);
        } else if (verifyResult.verified) {
          setFlowDomainStatus('Added');
          setFlowSuccess(`Domain "${flowSelectedDomain}" has been added to Vercel!`);
        } else {
          setFlowDomainStatus('⚠️ Not Verified');
          setFlowSuccess(`Domain "${flowSelectedDomain}" added but needs verification.`);
        }
      } else {
        setFlowDomainStatus('Not Added');
        setFlowError(result.message || 'Failed to add domain to Vercel');
      }
    } catch (err) {
      console.error('Error submitting domain:', err);
      setFlowDomainStatus('Error');
      setFlowError('An unexpected error occurred while adding domain to Vercel');
    } finally {
      setCheckingStatus(false);
    }
  };

  // Handle logo upload submission
  const handleLogoUpload = async () => {
    // Reset messages
    setLogoError('');
    setLogoSuccess('');

    // Validate domain selection
    if (!selectedDomain) {
      setLogoError('Please select a domain');
      return;
    }

    // Validate at least one file is selected
    if (!fullLogo && !favicon) {
      setLogoError('Please select at least one logo file to upload');
      return;
    }

    setLoading(true);

    try {
      const result = await uploadCompanyLogo({
        domain: selectedDomain,
        logo: favicon,
        full_logo: fullLogo
      });

      if (result.success) {
        setLogoSuccess('Logo(s) uploaded successfully!');
        // Reset file selections
        setFullLogo(null);
        setFavicon(null);
        setSelectedDomain('');
        // Clear file inputs
        const fullLogoInput = document.getElementById('fullLogoInput');
        const faviconInput = document.getElementById('faviconInput');
        if (fullLogoInput) fullLogoInput.value = '';
        if (faviconInput) faviconInput.value = '';
      } else {
        setLogoError(result.error);
      }
    } catch (err) {
      setLogoError('An unexpected error occurred while uploading. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle dashboard color submission
  const handleDashboardColorSubmit = async () => {
    // Reset messages
    setColorError('');
    setColorSuccess('');

    // Validate domain selection
    if (!colorPaletteDomain) {
      setColorError('Please select a domain');
      return;
    }

    // Validate color
    if (!backgroundColor) {
      setColorError('Please select a background color');
      return;
    }

    setLoading(true);

    try {
      const result = await updateDashboardColor({
        domain: colorPaletteDomain,
        dashboardcolor: backgroundColor
      });

      if (result.success) {
        setColorSuccess(`Dashboard color updated successfully for ${colorPaletteDomain}!`);
      } else {
        setColorError(result.error);
      }
    } catch (err) {
      setColorError('An unexpected error occurred while updating dashboard color. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Reset messages
    setError('');
    setSuccess('');

    // Validate
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await createDomainMapping({
        fullDomainName: formData.fullDomainName,
        key: formData.key,
        company: formData.companyName
      });

      if (result.success) {
        setSuccess('Domain mapping created successfully!');
        // Fetch updated domains list
        await fetchDomains();
        // Optionally reset form
        // setFormData({ companyName: '', fullDomainName: '', key: '' });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-config-card">
      <div className="demo-config-header">
        <div className="demo-config-title">
          <span className="demo-icon">🎨</span>
          <h3>Branding Configuration</h3>
        </div>
        <span className="demo-badge">V1</span>
      </div>

      <div className="demo-config-content">
        {/* Top Section - Two Configuration Panels Side by Side */}
        <div className="demo-config-top-grid">
          {/* Left Panel - Domain and Key Configuration */}
          <div className="demo-config-panel">
            {/* Domain and Key Configuration Section */}
            <div className="demo-domain-key-section">
              {/* Error/Success Messages */}
              {error && (
                <div className="demo-message demo-message-error">
                  {error}
                </div>
              )}
              {success && (
                <div className="demo-message demo-message-success">
                  {success}
                </div>
              )}

              <div className="demo-form-group">
                <label>Company Name <span className="demo-required">*</span></label>
                <input 
                  type="text" 
                  name="companyName"
                  className="demo-input" 
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="demo-form-group">
                <label>Full Domain Name <span className="demo-required">*</span></label>
                <input 
                  type="text" 
                  name="fullDomainName"
                  className="demo-input" 
                  placeholder="e.g., mycompany.hostbuddy.com"
                  value={formData.fullDomainName}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="demo-form-group">
                <label>Key <span className="demo-required">*</span></label>
                <input 
                  type="text" 
                  name="key"
                  className="demo-input" 
                  placeholder="Enter your key"
                  value={formData.key}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="demo-actions">
                <button 
                  className="demo-btn-primary" 
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Logo and Domain Configuration */}
          <div className="demo-config-panel">
            {/* Logo and Domain Configuration Section */}
            <div className="demo-logo-domain-section">
              <div className="demo-form-group">
                <label>Full Logo</label>
                <div 
                  className="demo-upload-area" 
                  onClick={() => triggerFileInput('fullLogoInput')}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="file"
                    id="fullLogoInput"
                    accept="image/svg+xml,image/png,image/jpeg,image/jpg"
                    onChange={handleFullLogoChange}
                    style={{ display: 'none' }}
                  />
                  <span className="demo-upload-icon">📁</span>
                  <p>{fullLogo ? fullLogo.name : 'Click to upload or drag and drop'}</p>
                  <p className="demo-upload-hint">SVG, PNG or JPG (max. 2MB)</p>
                </div>
              </div>

              <div className="demo-form-group">
                <label>Favicon or Logo</label>
                <div 
                  className="demo-upload-area-small"
                  onClick={() => triggerFileInput('faviconInput')}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="file"
                    id="faviconInput"
                    accept="image/x-icon,image/png,image/jpeg,image/jpg"
                    onChange={handleFaviconChange}
                    style={{ display: 'none' }}
                  />
                  <span className="demo-upload-icon-small">📁</span>
                  <p>{favicon ? favicon.name : 'Upload favicon.ico'}</p>
                </div>
              </div>

              <div className="demo-form-group">
                <label>Domains</label>
                <select 
                  className="demo-select" 
                  disabled={domainsLoading}
                  value={selectedDomain}
                  onChange={handleDomainChange}
                >
                  <option value="">{domainsLoading ? 'Loading domains...' : 'Select a domain'}</option>
                  {domains.map((domain, index) => (
                    <option key={index} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>

              <div className="demo-actions">
                <button 
                  className="demo-btn-primary" 
                  onClick={handleLogoUpload}
                  disabled={loading || domainsLoading}
                >
                  {loading ? 'Uploading...' : 'Submit'}
                </button>
              </div>

              {/* Logo Upload Messages */}
              {logoError && (
                <div className="demo-message demo-message-error" style={{ marginTop: '15px' }}>
                  {logoError}
                </div>
              )}
              {logoSuccess && (
                <div className="demo-message demo-message-success" style={{ marginTop: '15px' }}>
                  {logoSuccess}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Domain Configuration Flow Section */}
        <div className="demo-domain-flow">
          <div className="demo-flow-card">
            <h3>Domain Configuration Flow</h3>
            <div className="demo-flow-steps">
              <div className="demo-flow-step-with-input">
                <label className="demo-flow-label">Full Domain</label>
                <select 
                  className="demo-select demo-flow-input" 
                  disabled={domainsLoading || checkingStatus}
                  value={flowSelectedDomain}
                  onChange={handleFlowDomainChange}
                >
                  <option value="">{domainsLoading ? 'Loading domains...' : 'Select a domain'}</option>
                  {domains.map((domain, index) => (
                    <option key={index} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>
              <div className="demo-flow-arrow">→</div>
              <button 
                className="demo-btn-primary demo-flow-btn"
                onClick={handleDomainSubmit}
                disabled={checkingStatus || !flowSelectedDomain}
              >
                {checkingStatus ? 'Processing...' : 'Submit'}
              </button>
              <div className="demo-flow-arrow">→</div>
              <button 
                className={`demo-btn-status demo-flow-btn ${
                  flowDomainStatus.includes('✅') ? 'status-working' : 
                  flowDomainStatus === 'Added' ? 'status-added' : 
                  flowDomainStatus === 'Not Added' ? 'status-not-added' : 
                  flowDomainStatus.includes('⚠️') ? 'status-warning' :
                  ''
                }`}
                disabled={checkingStatus || !flowSelectedDomain}
              >
                {checkingStatus ? 'Checking...' : flowDomainStatus}
              </button>
            </div>
            <p className="demo-flow-note">
              Configure domain settings and check the current status of your white label portal
            </p>

            {/* Domain Flow Messages */}
            {flowError && (
              <div className="demo-message demo-message-error" style={{ marginTop: '15px' }}>
                {flowError}
              </div>
            )}
            {flowSuccess && (
              <div className="demo-message demo-message-success" style={{ marginTop: '15px' }}>
                {flowSuccess}
              </div>
            )}
          </div>
        </div>

        {/* Full Width Live Preview Section */}
        <div className="demo-preview-full-width">
          <div className="demo-preview-container">
            <p className="demo-preview-label">Live Preview - ACME Rentals Branded Inbox</p>
            
            {!showPreview ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                border: '2px dashed #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}>
                <button 
                  className="demo-btn-primary" 
                  onClick={() => setShowPreview(true)}
                  style={{
                    fontSize: '16px',
                    padding: '12px 32px'
                  }}
                >
                  Preview
                </button>
                <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
                  Click to load white label preview
                </p>
              </div>
            ) : (
              <div style={{ 
                width: '100%', 
                height: '600px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <iframe
                  src="https://testhostbuddy.online/white-label-login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjAzNzE2MjMsIm5iZiI6MTc2MDM3MTYyMywianRpIjoiOTZhOTU5Y2UtMWZkOS00Mzc4LWJjZDAtZWNkNTRhZmQ1YWVkIiwiZXhwIjoxNzYyOTYzNjIzLCJpZGVudGl0eSI6InRlc3RhY2NvdW50XzJfaG9zdGJ1ZGR5X2FpIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsicm9sZSI6ImFkbWluIiwiZW1haWwiOiJ0ZXN0YWNjb3VudF8yQGhvc3RidWRkeS5haSJ9fQ.oa_3pIL1Oy9HttSUS--XEapryU_4aeFYGVHFOc84ftg&redirect=dashboard"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  title="White Label Preview"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
                <button
                  onClick={() => setShowPreview(false)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    zIndex: 1000
                  }}
                >
                  Close Preview
                </button>
              </div>
            )}

            <p className="demo-preview-note">
              ✓ Updates reflect instantly as you make changes
            </p>
          </div>

          <div className="demo-alert">
            <p>
              <strong>Accessibility Check:</strong> All color combinations meet WCAG 2.1 AA standards (4.5:1 contrast ratio)
            </p>
          </div>
        </div>

        {/* Bottom Section - Color Palette and Typography */}
        <div className="demo-config-bottom">
          <div className="demo-form-group">
            <label>Color Palette</label>
            
            {/* Domains Dropdown */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Domains</label>
              <select 
                className="demo-select" 
                disabled={domainsLoading}
                value={colorPaletteDomain}
                onChange={(e) => setColorPaletteDomain(e.target.value)}
                style={{ width: 'auto', minWidth: '250px', display: 'inline-block' }}
              >
                <option value="">{domainsLoading ? 'Loading domains...' : 'Select a domain'}</option>
                {domains.map((domain, index) => (
                  <option key={index} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="demo-color-grid">
              <ColorInput 
                label="Background" 
                color={backgroundColor} 
                description="Main background"
                onChange={setBackgroundColor}
              />
            </div>
            <button 
              className="demo-btn-primary" 
              style={{ marginTop: '16px' }}
              onClick={handleDashboardColorSubmit}
              disabled={loading || domainsLoading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>

            {/* Color Palette Messages */}
            {colorError && (
              <div className="demo-message demo-message-error" style={{ marginTop: '15px' }}>
                {colorError}
              </div>
            )}
            {colorSuccess && (
              <div className="demo-message demo-message-success" style={{ marginTop: '15px' }}>
                {colorSuccess}
              </div>
            )}
          </div>

          <div className="demo-form-group">
            <label>Typography</label>
            <select className="demo-select">
              <option>Inter (Recommended)</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Poppins</option>
            </select>
            <p className="demo-hint">Choose from approved font families</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Color Input Component
const ColorInput = ({ label, color, description, onChange }) => {
  const [selectedColor, setSelectedColor] = React.useState(color);

  // Update local state when color prop changes
  React.useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  const handleTextChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  return (
    <div className="demo-color-input">
      <label>{label}</label>
      <div className="demo-color-row">
        <div className="demo-color-swatch" style={{ backgroundColor: selectedColor }}></div>
        <input 
          type="color" 
          value={selectedColor} 
          onChange={handleColorChange}
          style={{ cursor: 'pointer', height: '40px', border: 'none', borderRadius: '4px' }}
        />
        <input 
          type="text" 
          value={selectedColor} 
          onChange={handleTextChange}
          style={{ marginLeft: '8px', flex: 1 }}
        />
      </div>
      <p className="demo-color-desc">{description}</p>
    </div>
  );
};

// Settings Setup Component
const SettingsSetup = () => {
  return (
    <div className="demo-config-card">
      <div className="demo-config-header">
        <div className="demo-config-title">
          <span className="demo-icon">⚙️</span>
          <h3>Feature Configuration</h3>
        </div>
        <span className="demo-badge">V1</span>
      </div>

      <div className="demo-config-content">
        <div className="demo-feature-list">
          <FeatureToggle 
            name="AI Assistant" 
            description="Enable HostBuddy AI for automated guest responses"
            enabled={true}
          />
          <FeatureToggle 
            name="Multi-language Support" 
            description="Automatic translation for guest messages"
            enabled={true}
          />
          <FeatureToggle 
            name="Analytics Dashboard" 
            description="Advanced reporting and insights"
            enabled={false}
          />
          <FeatureToggle 
            name="Custom Integrations" 
            description="Connect to partner-specific systems"
            enabled={true}
          />
        </div>
      </div>
    </div>
  );
};

// Feature Toggle Component
const FeatureToggle = ({ name, description, enabled }) => {
  return (
    <div className="demo-feature-item">
      <div className="demo-feature-info">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div className={`demo-toggle ${enabled ? 'enabled' : ''}`}>
        <span className="demo-toggle-switch"></span>
      </div>
    </div>
  );
};

// User Management Component
const UserManagement = () => {
  return (
    <div className="demo-config-card">
      <div className="demo-config-header">
        <div className="demo-config-title">
          <span className="demo-icon">👥</span>
          <h3>User Management</h3>
        </div>
        <span className="demo-badge">V1</span>
      </div>

      <div className="demo-config-content">
        <div className="demo-users-grid">
          <UserCard name="Admin User" role="Administrator" status="Active" />
          <UserCard name="Support Agent" role="Support" status="Active" />
          <UserCard name="Property Manager" role="Manager" status="Invited" />
        </div>
        <button className="demo-btn-primary" style={{ marginTop: '16px' }}>
          + Invite New User
        </button>
      </div>
    </div>
  );
};

// User Card Component
const UserCard = ({ name, role, status }) => {
  return (
    <div className="demo-user-card">
      <div className="demo-user-avatar">{name.charAt(0)}</div>
      <div className="demo-user-info">
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
      <span className={`demo-user-status ${status.toLowerCase()}`}>{status}</span>
    </div>
  );
};

// Branded Portal Experience Component
const BrandedPortalExperience = () => {
  return (
    <div className="demo-section">
      <div className="demo-section-header">
        <div className="demo-section-icon">
          <span>👤</span>
        </div>
        <div>
          <h2>End-User Branded Experience</h2>
          <p>What property managers and guests see when using the ACME Rentals branded portal</p>
        </div>
      </div>

      <div className="demo-section-content">
        <div className="demo-experience-card">
          <h3>ACME Rentals Dashboard</h3>
          <p className="demo-experience-desc">
            Property managers experience a fully branded interface with ACME colors, logo, and custom features
          </p>
          
          <div className="demo-portal-mockup">
            <div className="demo-portal-header">
              <div className="demo-portal-logo">AR</div>
              <span>ACME Rentals Portal</span>
            </div>
            <div className="demo-portal-body">
              <div className="demo-portal-sidebar">
                <div className="demo-portal-nav-item active">Dashboard</div>
                <div className="demo-portal-nav-item">Properties</div>
                <div className="demo-portal-nav-item">Messages</div>
                <div className="demo-portal-nav-item">Calendar</div>
              </div>
              <div className="demo-portal-main">
                <h3>Welcome to ACME Rentals</h3>
                <div className="demo-portal-stats">
                  <div className="demo-stat-card">
                    <span className="demo-stat-value">24</span>
                    <span className="demo-stat-label">Active Properties</span>
                  </div>
                  <div className="demo-stat-card">
                    <span className="demo-stat-value">12</span>
                    <span className="demo-stat-label">New Messages</span>
                  </div>
                  <div className="demo-stat-card">
                    <span className="demo-stat-value">8</span>
                    <span className="demo-stat-label">Check-ins Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelRegistration;
