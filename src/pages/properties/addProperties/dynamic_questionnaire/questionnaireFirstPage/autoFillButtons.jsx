import React, { useState } from 'react';
import AutoFillModal from './autoFillModal';
import CopyExistingPropertyModel from './CopyExistingPropertyModel';
import "../questionnaire.css";

const AutoFillButtons = ({ property_name, apiPropertyData }) => {
    const [showCopyExistingPropModal, setShowCopyExistingPropModal] = useState(false);
    const [showAutoFillModal, setShowAutoFillModal] = useState(false);

    const handleAutoFillModalClose = (autoFillApiLoading) => {
        if (!autoFillApiLoading) {
            setShowAutoFillModal(false);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center w-100" style={{ gap: '16px' }}>
                <button 
                    style={{ 
                        backgroundColor: '#3e88f7',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 32px',
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)',
                        maxWidth: '380px',
                        flex: 1
                    }} 
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#5296f8'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3e88f7'}
                    onClick={() => { setShowAutoFillModal(true); }}
                >
                    Auto-Fill Property Details
                </button>
                <button 
                    style={{ 
                        backgroundColor: '#01255e',
                        color: '#3e88f7',
                        border: '1px solid #013280',
                        borderRadius: '8px',
                        padding: '12px 32px',
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        maxWidth: '380px',
                        flex: 1
                    }} 
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#013280'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#01255e'}
                    onClick={() => { setShowCopyExistingPropModal(true); }}
                >
                    Copy Data From Other Property
                </button>
            </div>

            <AutoFillModal show={showAutoFillModal} handleClose={handleAutoFillModalClose} apiPropertyData={apiPropertyData} />
            <CopyExistingPropertyModel show={showCopyExistingPropModal} curr_property_name={property_name} handleClose={() => setShowCopyExistingPropModal(false)} />
        </>
    );
};

export default AutoFillButtons;
