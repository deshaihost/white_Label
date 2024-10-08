import React from 'react';
import './pmsInstructions.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const PmsInstructionsMain = () => {
  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>PMS Instructions - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/pms-instructions" />
        </Helmet>
        <div className="container" style={{ padding: '20px' }}>
          <div className="banner-heading">
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Connect Your PMS</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Connecting HostBuddy AI to your PMS</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                      
                        <div className="step-box section">
                          <h4 style={{ marginBottom: '20px' }}>Choose your PMS to get started:</h4>
                        </div>

                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.8em' }}>
                          <li style={{ marginBottom: '10px' }}>
                            <Link to="/pms-instructions/guesty" style={{ color: '#007bff', textDecoration: 'none' }}>
                              Guesty
                            </Link>
                          </li>
                          <li style={{ marginBottom: '10px' }}>
                            <Link to="/pms-instructions/beds24" style={{ color: '#007bff', textDecoration: 'none' }}>
                              Beds24
                            </Link>
                          </li>
                          <li style={{ marginBottom: '10px' }}>
                            <Link to="/pms-instructions/hostaway" style={{ color: '#007bff', textDecoration: 'none' }}>
                              Hostaway
                            </Link>
                          </li>
                          <li style={{ marginBottom: '10px' }}>
                            <Link to="/pms-instructions/lodgify" style={{ color: '#007bff', textDecoration: 'none' }}>
                              Lodgify
                            </Link>
                          </li>
                          <li style={{ marginBottom: '10px' }}>
                            <Link to="/pms-instructions/smoobu" style={{ color: '#007bff', textDecoration: 'none' }}>
                              Smoobu
                            </Link>
                          </li>
                          <li style={{ marginBottom: '10px' }}>
                            <Link to="/pms-instructions/hostify" style={{ color: '#007bff', textDecoration: 'none' }}>
                              Hostify
                            </Link>
                          </li>
                          <li style={{ marginBottom: '10px' }}>
                            <Link to="/pms-instructions/hospitable" style={{ color: '#007bff', textDecoration: 'none' }}>
                              Hospitable
                            </Link>
                          </li>
                          <li style={{ marginBottom: '10px' }}>
                            <Link to="/pms-instructions/hostfully" style={{ color: '#007bff', textDecoration: 'none' }}>
                              Hostfully
                            </Link>
                          </li>
                          <li style={{ marginBottom: '10px' }}>
                            <Link to="/pms-instructions/ownerrez" style={{ color: '#007bff', textDecoration: 'none' }}>
                              OwnerRez
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
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

export default PmsInstructionsMain;
