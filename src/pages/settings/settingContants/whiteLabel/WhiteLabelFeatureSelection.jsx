import React, { useState, useEffect } from 'react';
import {Package, Zap, Clock, Copy, ExternalLink, Lock, Building2, FileText, Sparkles, DollarSign, MessageSquare, ListTodo, Activity, Settings as SettingsIcon, Grid3x3, ChevronDown, Loader2, Check} from 'lucide-react';
import './WhiteLabelFeatureSelection.css';
import { getDomains, setFeatures } from './whiteLabelServices';
import { useWhiteLabelCss } from '../../../../helper/WhiteLabelCssContext';

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
      enabled: false, 
      available: false, 
      version: 'v1',
      link: '/insights',
      path: '/statistics'
    },
    { 
      id: 'action-item-settings', 
      name: 'Action Item Settings', 
      description: 'Configure AI task generation rules', 
      enabled: false, 
      available: false, 
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
    const icons = [Building2, FileText, Sparkles, DollarSign, MessageSquare, ListTodo, Activity, SettingsIcon, Grid3x3];
    return icons[idx] || Package;
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
          <Check className="notification-icon" size={16} />
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
                  <Loader2 className="button-icon spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="button-icon" />
                  Save
                </>
              )}
            </button>
          </div>
          
          {loadingDomains ? (
            <div className="domain-selector-loading">
              <Loader2 className="spin" size={20} />
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
              <ChevronDown className="domain-selector-icon" />
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper gradient-blue">
              <Package className="stat-icon" />
            </div>
            <div className="stat-info">
              <div className="stat-value">{featureModules.filter(f => f.version === 'v1').length}</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-wrapper gradient-green">
              <Zap className="stat-icon" />
            </div>
            <div className="stat-info">
              <div className="stat-value">{featureModules.filter(f => f.enabled).length}</div>
              <div className="stat-label">Enabled</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-wrapper gradient-orange">
              <Clock className="stat-icon" />
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
                  <Loader2 className="button-icon spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="button-icon" />
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
                            <Copy className="copy-icon" />
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
                          <ExternalLink className="button-icon" />
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
                <Clock className="status-icon-svg" />
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
                            <Lock className="locked-icon" />
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
                            <Copy className="copy-icon" />
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
                          <ExternalLink className="button-icon" />
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
                    <Grid3x3 />
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
                <Sparkles className="note-icon" />
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
            <Package className="info-icon" />
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
                <Loader2 className="button-icon spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="button-icon" />
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
              <p>API documentation for {selectedFeatureForApi} will be available here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhiteLabelFeatureSelection;
