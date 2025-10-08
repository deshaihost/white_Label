import React, { useState } from 'react';
import './WhiteLabelRegistration.css';

const WhiteLabelRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: null,
    primaryColor: '#146EF5',
    secondaryColor: '#000426',
    registrationUrl: '',
    welcomeMessage: '',
    termsAndConditions: '',
  });

  const [logoPreview, setLogoPreview] = useState(null);

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
      setFormData(prev => ({
        ...prev,
        companyLogo: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
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
      companyLogo: null,
      primaryColor: '#146EF5',
      secondaryColor: '#000426',
      registrationUrl: '',
      welcomeMessage: '',
      termsAndConditions: '',
    });
    setLogoPreview(null);
  };

  return (
    <div className="white-label-registration">
      <div className="white-label-header">
        <h2>White Label Registration Page</h2>
        <p className="subtitle">Customize the registration page for your white label solution</p>
      </div>

      <form onSubmit={handleSubmit} className="white-label-form">
        {/* Company Information Section */}
        <div className="form-section">
          <h3 className="section-title">Company Information</h3>
          
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

          <div className="form-group">
            <label htmlFor="companyLogo">Company Logo</label>
            <div className="logo-upload-container">
              <input
                type="file"
                id="companyLogo"
                name="companyLogo"
                accept="image/*"
                onChange={handleLogoUpload}
                className="file-input"
              />
              {logoPreview && (
                <div className="logo-preview">
                  <img src={logoPreview} alt="Logo Preview" />
                  <button 
                    type="button" 
                    onClick={() => {
                      setLogoPreview(null);
                      setFormData(prev => ({ ...prev, companyLogo: null }));
                    }}
                    className="remove-logo-btn"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <small className="form-hint">Recommended size: 200x200px, Max file size: 2MB</small>
          </div>
        </div>

        {/* Branding Section */}
        <div className="form-section">
          <h3 className="section-title">Branding Colors</h3>
          
          <div className="color-picker-row">
            <div className="form-group">
              <label htmlFor="primaryColor">Primary Color</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="primaryColor"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleInputChange}
                  className="color-picker"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={handleInputChange}
                  name="primaryColor"
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="secondaryColor">Secondary Color</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="secondaryColor"
                  name="secondaryColor"
                  value={formData.secondaryColor}
                  onChange={handleInputChange}
                  className="color-picker"
                />
                <input
                  type="text"
                  value={formData.secondaryColor}
                  onChange={handleInputChange}
                  name="secondaryColor"
                  className="color-text-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Registration URL Section */}
        <div className="form-section">
          <h3 className="section-title">Registration Settings</h3>
          
          <div className="form-group">
            <label htmlFor="registrationUrl">Custom Registration URL (Subdomain)</label>
            <div className="url-input-wrapper">
              <span className="url-prefix">https://</span>
              <input
                type="text"
                id="registrationUrl"
                name="registrationUrl"
                value={formData.registrationUrl}
                onChange={handleInputChange}
                placeholder="your-company"
                className="form-input url-input"
              />
              <span className="url-suffix">.hostbuddy.com/register</span>
            </div>
            <small className="form-hint">This will be your custom registration URL</small>
          </div>

          <div className="form-group">
            <label htmlFor="welcomeMessage">Welcome Message</label>
            <textarea
              id="welcomeMessage"
              name="welcomeMessage"
              value={formData.welcomeMessage}
              onChange={handleInputChange}
              placeholder="Enter a welcome message for new users..."
              className="form-textarea"
              rows="4"
            />
          </div>
        </div>

        {/* Terms and Conditions Section */}
        <div className="form-section">
          <h3 className="section-title">Legal</h3>
          
          <div className="form-group">
            <label htmlFor="termsAndConditions">Terms and Conditions URL</label>
            <input
              type="url"
              id="termsAndConditions"
              name="termsAndConditions"
              value={formData.termsAndConditions}
              onChange={handleInputChange}
              placeholder="https://yourcompany.com/terms"
              className="form-input"
            />
            <small className="form-hint">Link to your company's terms and conditions</small>
          </div>
        </div>

        {/* Preview Section */}
        <div className="form-section preview-section">
          <h3 className="section-title">Preview</h3>
          <div className="registration-preview" style={{
            borderColor: formData.primaryColor,
            background: `linear-gradient(135deg, ${formData.secondaryColor}ee, ${formData.primaryColor}22)`
          }}>
            {logoPreview && (
              <div className="preview-logo">
                <img src={logoPreview} alt="Company Logo" />
              </div>
            )}
            <h4 style={{ color: formData.primaryColor }}>
              {formData.companyName || 'Your Company Name'}
            </h4>
            <p className="preview-welcome">
              {formData.welcomeMessage || 'Welcome! Please register to get started.'}
            </p>
            <div className="preview-form">
              <div className="preview-input">Email</div>
              <div className="preview-input">Password</div>
              <button 
                type="button" 
                className="preview-button"
                style={{ 
                  backgroundColor: formData.primaryColor,
                  borderColor: formData.primaryColor
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" onClick={handleReset} className="btn-secondary">
            Reset to Default
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
