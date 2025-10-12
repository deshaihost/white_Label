import React, { useState } from 'react';
import './WhiteLabelRegistration.css';

const WhiteLabelRegistration = () => {
  const [activeTab, setActiveTab] = useState('setup');

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
              <div className="demo-form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  className="demo-input" 
                  placeholder="Enter your company name"
                />
              </div>

              <div className="demo-form-group">
                <label>Full Domain Name</label>
                <input 
                  type="text" 
                  className="demo-input" 
                  placeholder="e.g., mycompany.hostbuddy.com"
                />
              </div>

              <div className="demo-form-group">
                <label>Key</label>
                <input 
                  type="text" 
                  className="demo-input" 
                  placeholder="Enter your key"
                />
              </div>

              <div className="demo-actions">
                <button className="demo-btn-primary">Submit</button>
              </div>
            </div>
          </div>

          {/* Right Panel - Logo and Domain Configuration */}
          <div className="demo-config-panel">
            {/* Logo and Domain Configuration Section */}
            <div className="demo-logo-domain-section">
              <div className="demo-form-group">
                <label>Full Logo</label>
                <div className="demo-upload-area">
                  <span className="demo-upload-icon">📁</span>
                  <p>Click to upload or drag and drop</p>
                  <p className="demo-upload-hint">SVG, PNG or JPG (max. 2MB)</p>
                </div>
              </div>

              <div className="demo-form-group">
                <label>Favicon or Logo</label>
                <div className="demo-upload-area-small">
                  <span className="demo-upload-icon-small">📁</span>
                  <p>Upload favicon.ico</p>
                </div>
              </div>

              <div className="demo-form-group">
                <label>Domains</label>
                <select className="demo-select">
                  <option value="">Select a domain</option>
                  <option value="domain1.hostbuddy.com">domain1.hostbuddy.com</option>
                  <option value="domain2.hostbuddy.com">domain2.hostbuddy.com</option>
                  <option value="domain3.hostbuddy.com">domain3.hostbuddy.com</option>
                </select>
              </div>

              <div className="demo-actions">
                <button className="demo-btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Color Palette and Typography */}
        <div className="demo-config-bottom">
          <div className="demo-form-group">
            <label>Color Palette</label>
            <div className="demo-color-grid">
              <ColorInput label="Primary" color="#7C3AED" description="Used for buttons and CTAs" />
              <ColorInput label="Accent" color="#3B82F6" description="Used for highlights" />
              <ColorInput label="Background" color="#0F172A" description="Main background" />
              <ColorInput label="Surface" color="#1E293B" description="Cards and panels" />
            </div>
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

        {/* Full Width Live Preview Section */}
        <div className="demo-preview-full-width">
          <div className="demo-preview-container">
            <p className="demo-preview-label">Live Preview - ACME Rentals Branded Inbox</p>
            
            {/* Mock ACME Branded Inbox */}
            <div className="demo-inbox-preview">
              {/* Header */}
              <div className="demo-inbox-header">
                <div className="demo-inbox-logo">
                  <span>AR</span>
                </div>
                <div className="demo-inbox-title">
                  <span>ACME Rentals</span>
                  <p>Guest Messaging</p>
                </div>
              </div>

              {/* Inbox Content */}
              <div className="demo-inbox-content">
                {/* Conversation List */}
                <div className="demo-inbox-list">
                  <div className="demo-conversation active">
                    <p className="demo-conv-name">Sarah Johnson</p>
                    <p className="demo-conv-msg">Check-in question...</p>
                  </div>
                  <div className="demo-conversation">
                    <p className="demo-conv-name">Mike Chen</p>
                    <p className="demo-conv-msg">Parking info needed</p>
                  </div>
                  <div className="demo-conversation">
                    <p className="demo-conv-name">Emma Davis</p>
                    <p className="demo-conv-msg">Thank you message</p>
                  </div>
                </div>
                
                {/* Message Thread */}
                <div className="demo-inbox-thread">
                  <div className="demo-messages">
                    <div className="demo-message-received">
                      <p>Hi! What time is check-in?</p>
                    </div>
                    <div className="demo-message-sent">
                      <p>Check-in is at 3:00 PM</p>
                    </div>
                  </div>
                  <div className="demo-message-input">
                    <input type="text" placeholder="Type a message..." readOnly />
                  </div>
                </div>
              </div>
            </div>

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
      </div>
    </div>
  );
};

// Color Input Component
const ColorInput = ({ label, color, description }) => {
  return (
    <div className="demo-color-input">
      <label>{label}</label>
      <div className="demo-color-row">
        <div className="demo-color-swatch" style={{ backgroundColor: color }}></div>
        <input type="text" value={color} readOnly />
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
