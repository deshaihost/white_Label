import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../../../../helper/Loader";
import ToastHandle from "../../../../../../helper/ToastMessage";

const ResStageModal = ({modalData, setModalData, handleModalSubmit, fileName, propertyName}) => {
  const hideForReservationDefault = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  const [hideGetArray, setHideGetArray] = useState([]); // array of stages to hide
  const [visibleStages, setVisibleStages] = useState(hideForReservationDefault); // array of stages not hidden. Basically the "inverse" of above
  const [selectedProperties, setSelectedProperties] = useState(new Set());
  const [isCopying, setIsCopying] = useState(false);
  const [showCopySection, setShowCopySection] = useState(false);

  const store = useSelector((state) => state);
  const allProperties = store?.getUserDataReducer?.getUserData?.data?.user?.properties || [];
  const accessToken = store?.getUserDataReducer?.getUserData?.data?.tokens?.access?.token;
  
  // Filter out the current property from the list
  const availableProperties = allProperties.filter(prop => prop !== propertyName);

  const {show, section, sourceId, hiddenResStages} = modalData;

  // Function to handle button clicks. If item is in hideGetArray, remove it; otherwise, add it
  const handleButtonClick = (item) => {
    let newHideGetArray;
    if (hideGetArray.includes(item)) {
      newHideGetArray = hideGetArray.filter((i) => i !== item);
      setVisibleStages([...visibleStages, item]);
    }
    else {
      //setHideGetArray([...hideGetArray, item]);
      newHideGetArray = [...hideGetArray, item];
      setVisibleStages(visibleStages.filter((i) => i !== item));
    }
    setHideGetArray(newHideGetArray);
    handleModalSubmit(section, sourceId, newHideGetArray);
  };

  // On page load, initialize hideGetArray to the hiddenResStages array
  useEffect(() => {
    if (hiddenResStages) {
      setHideGetArray(hiddenResStages);
      setVisibleStages(hideForReservationDefault.filter((i) => !hiddenResStages.includes(i)));
    }
  }, [hiddenResStages]);

  // Reset selected properties when modal closes
  useEffect(() => {
    if (!show) {
      setSelectedProperties(new Set());
      setShowCopySection(false);
    }
  }, [show]);

  // Toggle a single property selection
  const toggleProperty = (propertyName) => {
    setSelectedProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(propertyName)) {
        newSet.delete(propertyName);
      } else {
        newSet.add(propertyName);
      }
      return newSet;
    });
  };

  // Select or deselect all properties
  const handleSelectAll = () => {
    if (selectedProperties.size === availableProperties.length) {
      setSelectedProperties(new Set());
    } else {
      setSelectedProperties(new Set(availableProperties));
    }
  };

  // Handle save with optional copy to properties
  const handleSaveAndCopy = async () => {
    try {
      // First, save the reservation stages to the current property
      // This is already handled by handleModalSubmit which was called in handleButtonClick
      
      // If properties are selected, copy the file to those properties
      if (selectedProperties.size > 0 && section === 'Property Documents') {
        setIsCopying(true);
        
        const baseUrl = process.env.REACT_APP_API_ENDPOINT;
        
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const requestBody = {
          source_property: propertyName,
          to_properties: Array.from(selectedProperties),
          file_name: fileName
        };

        const response = await axios.post(
          `${baseUrl}/copy_file`,
          requestBody,
          config
        );

        if (response.status === 200) {
          ToastHandle("File copied successfully to selected properties", "success");
        }
        
        setIsCopying(false);
        setSelectedProperties(new Set());
      }
      
      // Close the modal
      setModalData({...modalData, show: false});
      
    } catch (error) {
      setIsCopying(false);
      console.error("Error copying file:", error);
      ToastHandle(error?.response?.data?.error || "Failed to copy file", "error");
    }
  };

  return (
    <div>
      <Modal 
        show={show} 
        size="lg" 
        onHide={() => setModalData({...modalData, show:false})} 
        centered 
        aria-labelledby="contained-modal-title-vcenter" 
        style={{zIndex: 9055}}
        dialogClassName="modern-modal"
      >
        <Modal.Body style={{ 
          backgroundColor: '#0F1117', 
          border: '2px solid #013280', 
          borderRadius: '16px',
          boxShadow: '0 0 25px rgba(62, 136, 247, 0.15)',
          padding: 0
        }}>
          {/* Header */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #013280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{ 
              color: 'white', 
              fontSize: '20px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              margin: 0
            }}>
              Reservation Phases
            </h2>
            <button
              onClick={() => setModalData({...modalData, show:false})}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#a6a9b2',
                cursor: 'pointer',
                padding: '8px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#a6a9b2'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '24px' }}>
            {/* Title */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ 
                color: 'white', 
                fontSize: '15px',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                marginBottom: '8px'
              }}>
                Reservation Stages
              </p>
              <p style={{ 
                color: '#a6a9b2', 
                fontSize: '13px',
                fontFamily: 'DM Sans, sans-serif',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Select which reservation stages should have access to this information. HostBuddy will ONLY have access to information in this source for the selected reservation stages.
              </p>
            </div>

            {/* Status Message */}
            <p style={{ 
              color: '#a6a9b2', 
              fontSize: '13px',
              fontFamily: 'DM Sans, sans-serif',
              marginBottom: '24px',
              textAlign: 'center',
              lineHeight: '1.5'
            }}>
              With this selection, HostBuddy
              {visibleStages.length === 3 ? (
                <> can share this source's information with <span style={{ color: '#10b981' }}>all guests</span> for this property.</>
              ) : visibleStages.length === 2 ? (
                <> can <span style={{ color: '#F97316' }}>ONLY</span> share this source's information with <span style={{ color: '#F97316' }}>{visibleStages[0]}</span> and <span style={{ color: '#F97316' }}>{visibleStages[1]}</span> guests.</>
              ) : visibleStages.length === 1 ? (
                <> can <span style={{ color: '#F97316' }}>ONLY</span> share this source's information with <span style={{ color: '#F97316' }}>{visibleStages[0]}</span> guests.</>
              ) : (
                <> <span style={{ color: '#ef4444' }}>cannot</span> share this source's information with <span style={{ color: '#ef4444' }}>any guests</span>.</>
              )}
            </p>

            {/* Buttons */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '12px',
              marginBottom: '24px'
            }}>
              {hideForReservationDefault.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => handleButtonClick(item)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 500,
                    border: '2px solid',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: hideGetArray.includes(item) ? '#0F1117' : '#3e88f7',
                    color: hideGetArray.includes(item) ? '#676a73' : 'white',
                    borderColor: hideGetArray.includes(item) ? '#013280' : '#3e88f7',
                    boxShadow: hideGetArray.includes(item) ? 'none' : '0 0 12px rgba(62, 136, 247, 0.15)'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Copy to Properties Section - Only show for Property Documents */}
            {section === 'Property Documents' && availableProperties.length > 0 && (
              <div style={{ 
                borderTop: '1px solid #013280', 
                paddingTop: '24px',
                marginBottom: '24px'
              }}>
                {/* Header - Always visible, clickable to expand/collapse */}
                <button
                  onClick={() => setShowCopySection(!showCopySection)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    marginBottom: showCopySection ? '16px' : '0',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <p style={{ 
                      color: 'white', 
                      fontSize: '15px',
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}>
                      Copy To Other Properties
                    </p>
                    <p style={{ 
                      color: '#a6a9b2', 
                      fontSize: '12px',
                      fontFamily: 'DM Sans, sans-serif',
                      margin: 0
                    }}>
                      {showCopySection ? 'Select properties to copy this file to' : 'Click to select properties'}
                    </p>
                  </div>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                    style={{
                      transform: showCopySection ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <path 
                      d="M5 7.5L10 12.5L15 7.5" 
                      stroke="#3e88f7" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Property List - Collapsible */}
                {showCopySection && (
                  <>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginBottom: '12px'
                    }}>
                      <button
                        onClick={handleSelectAll}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#3e88f7',
                          fontSize: '13px',
                          fontFamily: 'DM Sans, sans-serif',
                          fontWeight: 600,
                          cursor: 'pointer',
                          padding: '4px 8px',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                      >
                        {selectedProperties.size === availableProperties.length ? 'Deselect All' : 'Select All'}
                      </button>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px',
                      maxHeight: '180px',
                      overflowY: 'auto'
                    }}>
                      {availableProperties.map((property) => (
                        <button
                          key={property}
                          onClick={() => toggleProperty(property)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            textAlign: 'left',
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#17191f'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <div 
                            className={`modern-checkbox ${selectedProperties.has(property) ? 'checked' : ''}`}
                            style={{ flexShrink: 0 }}
                          >
                            {selectedProperties.has(property) && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span style={{ 
                            fontSize: '14px', 
                            color: 'white',
                            fontFamily: 'DM Sans, sans-serif'
                          }}>
                            {property}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '24px', borderTop: '1px solid #013280' }}>
              <button 
                onClick={() => setModalData({...modalData, show: false})} 
                style={{
                  backgroundColor: '#17191f',
                  color: 'white',
                  border: '1px solid #013280',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  minWidth: '100px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#24262e'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#17191f'}
              >
                Cancel
              </button>
              {!isCopying ? (
                <button 
                  onClick={handleSaveAndCopy}
                  className="modern-btn-primary"
                  style={{
                    minWidth: '120px',
                    padding: '10px 24px'
                  }}
                >
                  {selectedProperties.size > 0 && section === 'Property Documents'
                    ? `Save & Copy to ${selectedProperties.size} ${selectedProperties.size === 1 ? 'Property' : 'Properties'}`
                    : 'Save'
                  }
                </button>
              ) : (
                <div style={{ minWidth: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResStageModal;
