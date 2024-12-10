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
            <div className="d-flex justify-content-center w-100">
                <div className="auto-fill-buttons-container d-flex flex-column align-items-center w-100">
                    <button className="btn btn-primary auto-fill-btn w-100" onClick={() => { setShowAutoFillModal(true); }}>
                        Auto-Fill Property Details
                    </button>
                    <button className="shadow-none border-0 mt-3 font-weight-bold underline-btn w-100" onClick={() => { setShowCopyExistingPropModal(true); }}>
                        Copy Data From Other Property
                    </button>
                </div>
            </div>

            <AutoFillModal show={showAutoFillModal} handleClose={handleAutoFillModalClose} apiPropertyData={apiPropertyData} />
            <CopyExistingPropertyModel show={showCopyExistingPropModal} curr_property_name={property_name} handleClose={() => setShowCopyExistingPropModal(false)} />
        </>
    );
};

export default AutoFillButtons;
