import React, { useState, useEffect } from 'react';
import './WhiteLabelFeatureSelection.css';
import { getDomains, setFeatures } from './whiteLabelServices';
import { useWhiteLabelCss } from '../../../../helper/WhiteLabelCssContext';

// Icon Components (SVG)
const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const Building2Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
    <path d="M10 6h4"></path>
    <path d="M10 10h4"></path>
    <path d="M10 14h4"></path>
    <path d="M10 18h4"></path>
  </svg>
);

const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
    <path d="M5 3v4"></path>
    <path d="M19 17v4"></path>
    <path d="M3 5h4"></path>
    <path d="M17 19h4"></path>
  </svg>
);

const DollarSignIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const MessageSquareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ListTodoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="6" height="6" rx="1"></rect>
    <path d="m3 17 2 2 4-4"></path>
    <path d="M13 6h8"></path>
    <path d="M13 12h8"></path>
    <path d="M13 18h8"></path>
  </svg>
);

const ActivityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const Grid3x3Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="9" y1="3" x2="9" y2="21"></line>
    <line x1="15" y1="3" x2="15" y2="21"></line>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="3" y1="15" x2="21" y2="15"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Loader2Icon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const WhiteLabelFeatureSelection = () => {
  const { cssConfig } = useWhiteLabelCss();
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [loadingDomains, setLoadingDomains] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setShowSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Feature modules state - will be updated when domain is selected
  const [featureModules, setFeatureModules] = useState([
    { 
      id: 'properties', 
      name: 'Properties Page', 
      description: 'List view with AI automation controls', 
      enabled: true, 
      available: true, 
      version: 'v1', 
      link: '/properties',
      path: '/properties'
    },
    { 
      id: 'property-profile', 
      name: 'Property Profile', 
      description: 'Resources, Basics, SOPs, Conversation Preferences (3 tabs)', 
      enabled: true, 
      available: true, 
      version: 'v1', 
      link: '/propertyprofile',
      path: '/edit-property/:property_name'
    },
    { 
      id: 'smart-templates', 
      name: 'Smart Templates', 
      description: 'Manage AI message templates', 
      enabled: true, 
      available: true, 
      version: 'v1', 
      link: '/smarttemplates',
      path: '/smart-templates'
    },
    { 
      id: 'upsells', 
      name: 'Upsells', 
      description: 'Gap Night Upsells & Inquiry Followups', 
      enabled: true, 
      available: true, 
      version: 'v1', 
      link: '/upsells',
      path: '/setting/upsells'
    },
    { 
      id: 'messaging-inbox', 
      name: 'Messaging Inbox', 
      description: 'All HostBuddy messaging features', 
      enabled: true, 
      available: true, 
      version: 'v1', 
      link: '/inbox',
      path: '/inbox'
    },
    { 
      id: 'action-items', 
      name: 'Action Items', 
      description: 'Track AI-generated operational tasks', 
      enabled: true, 
      available: true, 
      version: 'v1', 
      link: '/actionitems',
      path: '/action-item'
    },
    { 
      id: 'insights', 
      name: 'Insights', 
      description: 'Analytics and reporting dashboard', 
      enabled: true, 
      available: true, 
      version: 'v1',
      link: '/insights',
      path: '/statistics'
    },
    { 
      id: 'action-item-settings', 
      name: 'Action Item Settings', 
      description: 'Configure AI task generation rules', 
      enabled: true, 
      available: true, 
      version: 'v1', 
      link: '/actionitemsettings',
      path: '/setting/action-item-settings'
    },
    { 
      id: 'integrations', 
      name: 'Integrations', 
      description: 'WhatsApp, OpenTable, Resy, Turo, Webhooks', 
      enabled: false, 
      available: false, 
      version: 'v2', 
      link: '/integrations',
      path: '/integrations'
    },
  ]);

  const [customDomain] = useState('');
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [selectedFeatureForApi, setSelectedFeatureForApi] = useState('');

  // Load domains on component mount
  useEffect(() => {
    const fetchDomains = async () => {
      setLoadingDomains(true);
      try {
        const response = await getDomains();
        if (response.success && response.data) {
          const domainList = response.data.domains || [];
          setDomains(domainList);
          
          // Auto-select first domain if available
          if (domainList.length > 0) {
            setSelectedDomain(domainList[0]);
          }
        } else {
          console.error('Failed to load domains:', response.error);
        }
      } catch (error) {
        console.error('Error fetching domains:', error);
      } finally {
        setLoadingDomains(false);
      }
    };

    fetchDomains();
  }, []);

  // Load feature settings when domain is selected or cssConfig changes
  useEffect(() => {
    if (selectedDomain && cssConfig?.features_settings) {
      // Load features from cssConfig
      const loadedFeatures = cssConfig.features_settings;
      
      // Update feature modules with loaded settings
      setFeatureModules(prev => prev.map(feature => {
        const savedFeature = loadedFeatures[feature.id];
        if (savedFeature !== undefined) {
          return {
            ...feature,
            enabled: savedFeature.enabled !== undefined ? savedFeature.enabled : feature.enabled
          };
        }
        return feature;
      }));
    }
  }, [selectedDomain, cssConfig]);

  const handleFeatureToggle = (featureId) => {
    setFeatureModules(prev => prev.map(feature => 
      feature.id === featureId && feature.available
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ));
  };

  const handleSaveFeatures = async () => {
    if (!selectedDomain) {
      setSaveError('Please select a domain first');
      return;
    }

    setSaving(true);
    setSaveError('');
    setShowSaveSuccess(false);

    try {
      // Convert feature modules to the format expected by the API
      const featuresSettings = {};
      featureModules.forEach(feature => {
        featuresSettings[feature.id] = {
          enabled: feature.enabled,
          name: feature.name,
          description: feature.description,
          path: feature.path
        };
      });

      const response = await setFeatures({
        domain: selectedDomain,
        features_settings: featuresSettings
      });

      if (response.success) {
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
      } else {
        setSaveError(response.error || 'Failed to save features');
      }
    } catch (error) {
      console.error('Error saving features:', error);
      setSaveError('An error occurred while saving features');
    } finally {
      setSaving(false);
    }
  };

  const getFeatureLink = (featureId) => {
    const baseDomain = customDomain || selectedDomain || 'whitelabel.hostbuddy.ai';
    const feature = featureModules.find(f => f.id === featureId);
    const path = feature?.link || '';
    return `https://${baseDomain}${path}`;
  };

  const handleConfigureClick = (featureName) => {
    setSelectedFeatureForApi(featureName);
    setApiModalOpen(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const getIcon = (idx) => {
    const icons = [Building2Icon, FileTextIcon, SparklesIcon, DollarSignIcon, MessageSquareIcon, ListTodoIcon, ActivityIcon, SettingsIcon, Grid3x3Icon];
    return icons[idx] || PackageIcon;
  };

  return (
    <div className="feature-selection-container">
      {showSaveNotification && (
        <div className="save-notification">
          Link copied to clipboard
        </div>
      )}

      {saveSuccess && (
        <div className="save-notification" style={{ backgroundColor: '#10b981' }}>
          <CheckIcon />
          Features saved successfully!
        </div>
      )}

      {saveError && (
        <div className="save-notification" style={{ backgroundColor: '#ef4444' }}>
          {saveError}
        </div>
      )}

      <div className="feature-selection-content">
        {/* Domain Selector */}
        <div className="domain-selector-section">
          <div className="domain-selector-header">
            <h3 className="domain-selector-title">Select Domain</h3>
            <button
              onClick={handleSaveFeatures}
              disabled={saving || !selectedDomain}
              className="save-button save-button-top"
            >
              {saving ? (
                <>
                  <Loader2Icon className="button-icon spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon />
                  Save
                </>
              )}
            </button>
          </div>
          
          {loadingDomains ? (
            <div className="domain-selector-loading">
              <Loader2Icon className="spin" />
              <span>Loading domains...</span>
            </div>
          ) : domains.length === 0 ? (
            <div className="domain-selector-empty">
              <p>No domains found. Please create a domain first in the Registration page.</p>
            </div>
          ) : (
            <div className="domain-selector-wrapper">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="domain-selector"
              >
                {domains.map(domain => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              <div className="domain-selector-icon">
                <ChevronDownIcon />
              </div>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper gradient-blue">
              <PackageIcon />
            </div>
            <div className="stat-info">
              <div className="stat-value">{featureModules.filter(f => f.version === 'v1').length}</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-wrapper gradient-green">
              <ZapIcon />
            </div>
            <div className="stat-info">
              <div className="stat-value">{featureModules.filter(f => f.enabled).length}</div>
              <div className="stat-label">Enabled</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-wrapper gradient-orange">
              <ClockIcon />
            </div>
            <div className="stat-info">
              <div className="stat-value">{featureModules.filter(f => f.version === 'v2').length}</div>
              <div className="stat-label">Coming Soon</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="description-text">
          Configure which modules are available to your end users. Toggle features on/off and access API documentation for custom integrations.
        </p>

        {/* V1 Modules */}
        <div className="modules-section">
          <div className="section-header">
            <div className="section-title-group">
              <h3 className="section-title">Available Modules</h3>
              <div className="status-badge status-ready">
                <div className="status-dot"></div>
                <span>READY NOW</span>
              </div>
            </div>
            <button
              onClick={handleSaveFeatures}
              disabled={saving || !selectedDomain}
              className="save-button save-button-inline"
            >
              {saving ? (
                <>
                  <Loader2Icon className="button-icon spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon />
                  Save
                </>
              )}
            </button>
          </div>

          <div className="modules-grid">
            {featureModules.filter(f => f.version === 'v1').map((feature, idx) => {
              const IconComponent = getIcon(idx);
              
              return (
                <div 
                  key={feature.id}
                  className={`feature-card ${feature.enabled ? 'feature-enabled' : ''}`}
                >
                  <div className="feature-card-content">
                    {/* Icon */}
                    <div className={`feature-icon ${feature.enabled ? 'icon-enabled' : ''}`}>
                      <IconComponent />
                    </div>

                    {/* Content */}
                    <div className="feature-details">
                      <div className="feature-header">
                        <div className="feature-title-row">
                          <h4 className="feature-name">{feature.name}</h4>
                          {feature.enabled && <div className="active-indicator"></div>}
                        </div>
                        <p className="feature-description">{feature.description}</p>
                      </div>

                      {/* Module Link */}
                      <div className="module-link-container">
                        <div className="module-link-box">
                          <span className="module-link-text">{getFeatureLink(feature.id)}</span>
                          <button
                            onClick={() => copyToClipboard(getFeatureLink(feature.id))}
                            className="copy-button"
                          >
                            <CopyIcon />
                            Copy
                          </button>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="feature-controls">
                        <button
                          onClick={() => handleConfigureClick(feature.name)}
                          className="api-docs-button"
                        >
                          <ExternalLinkIcon />
                          API Docs
                        </button>
                        
                        <div className="toggle-control">
                          <span className="toggle-label">
                            {feature.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <div 
                            onClick={() => handleFeatureToggle(feature.id)}
                            className={`toggle-switch ${feature.enabled ? 'toggle-on' : 'toggle-off'}`}
                          >
                            <div className="toggle-slider"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* V2 Modules */}
        <div className="modules-section">
          <div className="section-header">
            <div className="section-title-group">
              <h3 className="section-title">Upcoming Modules</h3>
              <div className="status-badge status-upcoming">
                <ClockIcon />
                <span>Q1 2026</span>
              </div>
            </div>
          </div>

          <div className="modules-grid">
            {featureModules.filter(f => f.version === 'v2').map((feature, idx) => {
              const IconComponent = getIcon(idx + 6);
              
              return (
                <div 
                  key={feature.id}
                  className="feature-card feature-locked"
                >
                  <div className="feature-card-content">
                    {/* Icon */}
                    <div className="feature-icon icon-locked">
                      <IconComponent />
                    </div>

                    {/* Content */}
                    <div className="feature-details">
                      <div className="feature-header">
                        <div className="feature-title-row">
                          <h4 className="feature-name">{feature.name}</h4>
                          <div className="locked-badge">
                            <LockIcon />
                            <span>LOCKED</span>
                          </div>
                        </div>
                        <p className="feature-description">{feature.description}</p>
                      </div>

                      {/* Module Link */}
                      <div className="module-link-container module-link-disabled">
                        <div className="module-link-box">
                          <span className="module-link-text">{getFeatureLink(feature.id)}</span>
                          <button
                            disabled
                            className="copy-button copy-button-disabled"
                          >
                            <CopyIcon />
                            Copy
                          </button>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="feature-controls">
                        <button
                          disabled
                          className="api-docs-button api-docs-button-disabled"
                        >
                          <ExternalLinkIcon />
                          API Docs
                        </button>
                        
                        <div className="toggle-control toggle-control-disabled">
                          <span className="toggle-label">Disabled</span>
                          <div className="toggle-switch toggle-off toggle-disabled">
                            <div className="toggle-slider"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration Options */}
        {false && (
            <div className="integration-options">
            <div className="integration-glow"></div>
            
            <div className="integration-content">
                <div className="integration-header">
                <div className="integration-icon">
                    <Grid3x3Icon />
                </div>
                <h4 className="integration-title">Integration Options</h4>
                </div>
                
                <div className="integration-cards">
                {/* Option 1 */}
                <div className="integration-card">
                    <div className="integration-card-content">
                    <div className="integration-number">1</div>
                    <div className="integration-details">
                        <p className="integration-name">Hosted White-Label Portal</p>
                        <p className="integration-desc">
                        Deploy instantly with our fully managed infrastructure. Your branding, our technology—no development required.
                        </p>
                    </div>
                    </div>
                </div>

                {/* Option 2 */}
                <div className="integration-card">
                    <div className="integration-card-content">
                    <div className="integration-number">2</div>
                    <div className="integration-details">
                        <p className="integration-name">Custom API Integration</p>
                        <p className="integration-desc">
                        Build your own interface while leveraging our AI engine. Access API documentation via "API Docs" buttons above.
                        </p>
                    </div>
                    </div>
                </div>
                </div>

                <div className="integration-note">
                <SparklesIcon />
                <p className="note-text">
                    Mix and match: Use our hosted portal for some features while integrating others via API into your existing platform.
                </p>
                </div>
            </div>
            </div>
        )}

        {/* Info Box */}
        <div className="info-box">
          <div className="info-icon-wrapper">
            <PackageIcon />
          </div>
          <p className="info-text">
            <strong>Tenant-Wide Settings:</strong> Feature availability applies to all users in your organization. Enabled modules will be immediately accessible to your end users.
          </p>
        </div>

        {/* Bottom Save Button */}
        <div className="bottom-save-section">
          <button
            onClick={handleSaveFeatures}
            disabled={saving || !selectedDomain}
            className="save-button save-button-bottom"
          >
            {saving ? (
              <>
                <Loader2Icon className="button-icon spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckIcon />
                Save Feature Settings
              </>
            )}
          </button>
        </div>
      </div>

      {/* API Modal (placeholder) */}
      {apiModalOpen && (
        <div className="api-modal-overlay" onClick={() => setApiModalOpen(false)}>
          <div className="api-modal" onClick={(e) => e.stopPropagation()}>
            <div className="api-modal-header">
              <h3>API Documentation - {selectedFeatureForApi}</h3>
              <button onClick={() => setApiModalOpen(false)} className="api-modal-close">×</button>
            </div>
            <div className="api-modal-body">
              {/* <p>API documentation for {selectedFeatureForApi} will be available here.</p> */}
              <p>API documentation is coming soon. Stay tuned!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhiteLabelFeatureSelection;
