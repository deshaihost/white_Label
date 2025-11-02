import React from "react";
import { File, Home, List, ConciergeBell, FileText, ShieldAlert } from 'lucide-react';

// Icon mapping for sections based on design reference PropertySetup.tsx
const getSectionIcon = (sectionName) => {
  const iconMap = {
    'Resources': File,
    'Basics': Home,
    'Listing Details': List,
    'Amenities': ConciergeBell,
    'SOPs': FileText,
    'Extras': FileText, // Extras acts as SOPs when SOPs doesn't exist
    'Topics to Avoid': ShieldAlert,
  };
  return iconMap[sectionName] || Home;
};

const QuestionnaireHeader = ({ property_name, section_names, selectedSection, setSelectedSection }) => {
  const hasResources = section_names?.includes("Resources");
  
  return (
    <div className="questionnaire-modern-header">
      {/* Property Name */}
      {property_name !== undefined && (
        <h1 className="text-white text-center mb-3" style={{ 
          fontSize: '28px', 
          fontWeight: 700, 
          fontFamily: '"DM Sans", sans-serif'
        }}>
          {property_name}
        </h1>
      )}

      {/* Tab Navigation */}
      <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%'
        }}>
          {section_names?.map((section_name) => {
            const Icon = getSectionIcon(section_name);
            const isActive = selectedSection === section_name;
            
            return (
              <button
                key={section_name}
                onClick={() => setSelectedSection(section_name)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  flex: '1',
                  minWidth: '0'
                }}
              >
                {/* Icon Circle */}
                <div 
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? '#3e88f7' : '#17191f',
                    border: isActive ? 'none' : '1px solid #013280',
                    boxShadow: isActive ? '0 0 10px rgba(62, 136, 247, 0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon 
                    size={24} 
                    color={isActive ? 'white' : '#676a73'}
                    style={{ transition: 'color 0.2s ease' }}
                  />
                </div>
                
                {/* Label */}
                <span style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: isActive ? '#3e88f7' : '#676a73',
                  fontFamily: '"DM Sans", sans-serif',
                  transition: 'color 0.2s ease',
                  textAlign: 'center',
                  width: '100%',
                  lineHeight: '1.3'
                }}>
                  {section_name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireHeader;
