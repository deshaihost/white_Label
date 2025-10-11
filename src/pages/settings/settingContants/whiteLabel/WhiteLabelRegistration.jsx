import React, { useState } from 'react';
import './WhiteLabelRegistration.css';

const WhiteLabelRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    subDomain: '',
    logo: null,
    fullLogo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [fullLogoPreview, setFullLogoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate SVG file
      if (!file.type.includes('svg')) {
        alert('Please upload an SVG file');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFullLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate SVG file
      if (!file.type.includes('svg')) {
        alert('Please upload an SVG file');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        fullLogo: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFullLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call will be implemented later
    console.log('Form data:', formData);
    alert('White Label Registration settings saved! (Static preview - API integration pending)');
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      subDomain: '',
      logo: null,
      fullLogo: null,
    });
    setLogoPreview(null);
    setFullLogoPreview(null);
  };

  return (
    <div className="white-label-registration">
      <div className="white-label-header">
        <h2>White Label Registration Page</h2>
        <p className="subtitle">Configure your white label registration settings</p>
      </div>

      <form onSubmit={handleSubmit} className="white-label-form">
        {/* Company Name Input */}
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter your company name"
              className="form-input"
              required
            />
          </div>

          {/* Sub Domain Input */}
          <div className="form-group">
            <label htmlFor="subDomain">Sub Domain *</label>
            <input
              type="text"
              id="subDomain"
              name="subDomain"
              value={formData.subDomain}
              onChange={handleInputChange}
              placeholder="Enter subdomain"
              className="form-input"
              required
            />
            <small className="form-hint">Enter your custom subdomain</small>
          </div>

          {/* Logo Upload (SVG only) */}
          <div className="form-group">
            <label htmlFor="logo">Logo Upload (SVG) *</label>
            <div className="logo-upload-container">
              <input
                type="file"
                id="logo"
                name="logo"
                accept=".svg,image/svg+xml"
                onChange={handleLogoUpload}
                className="file-input"
                required
              />
              <label htmlFor="logo" className="file-input-label">
                <span className="upload-icon">📁</span>
                <span>{formData.logo ? formData.logo.name : 'Choose SVG file...'}</span>
              </label>
              {logoPreview && (
                <div className="logo-preview">
                  <img src={logoPreview} alt="Logo Preview" />
                  <button 
                    type="button" 
                    onClick={() => {
                      setLogoPreview(null);
                      setFormData(prev => ({ ...prev, logo: null }));
                      document.getElementById('logo').value = '';
                    }}
                    className="remove-logo-btn"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <small className="form-hint">SVG format only, recommended size: 200x200px</small>
          </div>

          {/* Full Logo Upload (SVG only) */}
          <div className="form-group">
            <label htmlFor="fullLogo">Full Logo Upload (SVG) *</label>
            <div className="logo-upload-container">
              <input
                type="file"
                id="fullLogo"
                name="fullLogo"
                accept=".svg,image/svg+xml"
                onChange={handleFullLogoUpload}
                className="file-input"
                required
              />
              <label htmlFor="fullLogo" className="file-input-label">
                <span className="upload-icon">📁</span>
                <span>{formData.fullLogo ? formData.fullLogo.name : 'Choose SVG file...'}</span>
              </label>
              {fullLogoPreview && (
                <div className="logo-preview">
                  <img src={fullLogoPreview} alt="Full Logo Preview" />
                  <button 
                    type="button" 
                    onClick={() => {
                      setFullLogoPreview(null);
                      setFormData(prev => ({ ...prev, fullLogo: null }));
                      document.getElementById('fullLogo').value = '';
                    }}
                    className="remove-logo-btn"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <small className="form-hint">SVG format only, full horizontal logo with text</small>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" onClick={handleReset} className="btn-secondary">
            Reset
          </button>
          <button type="submit" className="btn-primary">
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

export default WhiteLabelRegistration;
