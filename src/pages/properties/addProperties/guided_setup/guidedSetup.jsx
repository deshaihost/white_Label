import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';
import './guidedSetup.css';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getQuestionnaireActions, stateEmptyActions } from "../../../../redux/actions";
import axios from 'axios';
import { Link } from 'react-router-dom';
import dummyPropertyImg from "../../../../public/img/dummyPropertyImg.png";
import Loader, {BoxLoader} from '../../../../helper/Loader';

import IntegrationsForm from '../dynamic_questionnaire/questionnaireFirstPage/integrationsForm';
import DocumentForm from '../dynamic_questionnaire/questionnaireFirstPage/documentForm';
import AutoFillButtons from '../dynamic_questionnaire/questionnaireFirstPage/autoFillButtons';
import HostBuddyKnowledgeBase from '../dynamic_questionnaire/questionnaireFirstPage/knowledgeBase/hbKnowledgeBase';
import QuestionnairePage from '../dynamic_questionnaire/complete_questionnaire';

function GuidedSetup({ property_name:propPropertyName }) {
    const { property_name:paramPropertyName } = useParams();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);

    /*
    const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
    const section_order_data = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire?.metadata?.section_order
    */
    
    // Use path param first, fall back to prop
    const property_name = paramPropertyName || propPropertyName;

    const [activeKey, setActiveKey] = useState(null);
    const [apiPropertyData, setApiPropertyData] = useState(null);
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);
    const [stepsCompleted, setStepsCompleted] = useState([false, false, false, false]);

    // Compute the index of the first incomplete step
    const firstIncompleteIndex = stepsCompleted.findIndex(step => !step);

    const propertyImg = apiPropertyData?.thumbnail_image?.url;

    // Add this helper component at the top of the function
    const LoadingSubtitle = () => (
        <div className="subtitle loading">
            <Loader color="var(--white-label-text-tertiary, #CCC)" />
        </div>
    );

    // Define status order for forward-only validation
    const STATUS_ORDER = ['no_progress', 'pms_integrated', 'files_added', 'auto_fill_done', 'review_complete'];

    // Helper function to check if status change is valid for forward-only
    const isValidStatusChange = (currentStatus, newStatus, forwardOnly = true) => {
        if (!forwardOnly) return true;
        if (!currentStatus) return false; // if currentStatus key is not present in apiPropertyData, we treat that as all steps being completed
        
        const currentIndex = STATUS_ORDER.indexOf(currentStatus);
        const newIndex = STATUS_ORDER.indexOf(newStatus);
        
        return newIndex >= currentIndex;
    };

    // Determine completed steps based on setup_status
    useEffect(() => {
        if (apiPropertyData) {
            const getStepsCompleted = (status) => {
                switch(status) {
                    case 'no_progress':
                        return [false, false, false, false];
                    case 'pms_integrated':
                        return [true, false, false, false];
                    case 'files_added':
                        return [true, true, false, false];
                    case 'auto_fill_done':
                        return [true, true, true, false];
                    case 'review_complete':
                    default:
                        return [true, true, true, true];
                }
            };
            setStepsCompleted(getStepsCompleted(apiPropertyData.setup_status));
        }
    }, [apiPropertyData]);

    // Determine which accordion to open based on completed steps
    const determineActiveAccordion = () => {
        if (!apiPropertyData) return null;
        const firstIncompleteIndex = stepsCompleted.findIndex(step => !step);
        return firstIncompleteIndex !== -1 ? String(firstIncompleteIndex) : null;
    };

    // Update active accordion when stepsCompleted changes or when apiPropertyData loads
    useEffect(() => {
        setActiveKey(determineActiveAccordion());
    }, [stepsCompleted, apiPropertyData]);

    useEffect(() => {
        console.log('activeKey is', activeKey);
    }, [activeKey]);

    // Get the questionnaire data from the API. Should run once, immediately when the page loads
    useEffect(() => {
      if (property_name) {
        dispatch(getQuestionnaireActions(property_name));
        return () => { dispatch(stateEmptyActions("getQuestionnaire")); } // Clear the state when the component unmounts
      }
    }, [property_name]);

    // Get property data from the API
    const getPropertyDataFromAPI = async (propertyName) => {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      try {
        const config = {
          headers: {"X-API-Key": API_KEY},
          validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
        };
        const response = await axios.get(`${baseUrl}/properties/${propertyName}`, config);

        if (response.status === 200) {
          setApiPropertyData(response.data.property);
        } else {  }
      } catch (error) {  }
    };

    // Update the setup status to whatever specified value
    // all_possible_statuses: 'no_progress', 'pms_integrated', 'files_added', 'auto_fill_done', 'review_complete'
    const callUpdateSetupStatusAPI = async (propertyName, newStatus, forward_only = true) => {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      try {
        const config = {
          headers: {"X-API-Key": API_KEY},
          validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
        };
        const bodyData = {new_status:newStatus, forward_only};
        const response = await axios.put(`${baseUrl}/properties/${propertyName}/update_setup_status`, bodyData, config);

        if (response.status === 200) { }
        else {  }
      } catch (error) {  }
    };

    // Helper function to update setup status both locally and in API
    const updateSetupStatus = async (newStatus, forward_only = true) => {
        if (!isValidStatusChange(apiPropertyData.setup_status, newStatus, forward_only)) {
            return;
        }

        await callUpdateSetupStatusAPI(property_name, newStatus, forward_only);
        setApiPropertyData(prev => ({...prev, setup_status: newStatus}));
    };

    const handleButtonClick = async (newStatus, forward_only = true) => {
        await updateSetupStatus(newStatus, forward_only);
        setActiveKey(null); // Close the current accordion
    };

    // On page load, get the property data from the API, if we have the property name and not done already
    useEffect(() => {
      if (property_name && !apiPropertyData) {
        getPropertyDataFromAPI(property_name);
      }
    }, [property_name, apiPropertyData]);

    return (
        <>
            {showQuestionnaire ? (
                <QuestionnairePage property_name={property_name} startAtPage={1} exitFunct={() => setShowQuestionnaire(false)}/> // Questionnaire starts at page 1 (don't show the questionnaire first page)
            ) : (
                <div className="pst">
                    <Helmet>
                        <title>Property Setup – HostBuddy AI</title>
                        <link rel="canonical" href="https://www.hostbuddy.ai/faqs" />
                    </Helmet>

                    <div className='header-information'>
                        <div className='header-content'>
                            <img src={propertyImg || dummyPropertyImg} alt='Property' onError={(e) => { e.target.onerror = null; e.target.src = dummyPropertyImg; }} />
                            <div className='header-text'>
                                <h2 style={{marginBottom:'5px'}}>{property_name}</h2>
                                <Link to='/properties'>&larr; Back to Properties</Link>
                            </div>
                        </div>
                    </div>

                    <div className="setup-tile blur-background-top-right">

                        <h2>Guided Setup</h2>

                        <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                            <Accordion.Item eventKey="0" className={stepsCompleted[0] ? "completed" : ""}>
                                <Accordion.Header>
                                    1. Link to your PMS
                                    {apiPropertyData ? (
                                        <div className="subtitle">Property details, past conversations, guest data, and availability data are automatically pulled when you connect your property management software.</div>
                                    ) : <LoadingSubtitle />}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="accordion-content-tile">
                                        <IntegrationsForm property_name={property_name} apiPropertyData={apiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
                                        {firstIncompleteIndex === 0 && (
                                            <button className="underline-btn" onClick={() => handleButtonClick('pms_integrated')}>
                                                I'm not connecting this property to a PMS
                                            </button>
                                        )}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1" className={stepsCompleted[1] ? "completed" : ""}>
                                <Accordion.Header>
                                    2. Upload documents
                                    {apiPropertyData ? (
                                        <div className="subtitle">You can upload existing documents such as house manuals, welcome docs, or anything else that contains information about your property.</div>
                                    ) : <LoadingSubtitle />}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="accordion-content-tile">
                                        <DocumentForm property_name={property_name} apiPropertyData={apiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
                                        {(true || firstIncompleteIndex === 1) && (
                                            <button className="underline-btn" onClick={() => handleButtonClick('files_added')}>
                                                I'm done uploading documents for now
                                            </button>
                                        )}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2" className={stepsCompleted[2] ? "completed" : ""}>
                                <Accordion.Header>
                                    3. Auto-fill property profile
                                    {apiPropertyData ? (
                                        <div className="subtitle">Auto-fill the property profile form using your PMS and document data to make HostBuddy's knowledge base easier to view and manage.</div>
                                    ) : <LoadingSubtitle />}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="accordion-content-tile">
                                        <AutoFillButtons property_name={property_name} apiPropertyData={apiPropertyData} />
                                        {firstIncompleteIndex === 2 && (
                                            <button className="underline-btn" onClick={() => handleButtonClick('auto_fill_done')}>
                                                Skip this step
                                            </button>
                                        )}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3" className={stepsCompleted[3] ? "completed" : ""}>
                                <Accordion.Header>
                                    4. Review property profile
                                    {apiPropertyData ? (
                                        <div className="subtitle">Review the property profile to make sure HostBuddy has all the information it needs to serve your guests.</div>
                                    ) : <LoadingSubtitle />}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="accordion-content-tile">
                                        <button className="primary-btn" onClick={() => setShowQuestionnaire(true)}>Review Property Profile →</button>
                                        {(true || firstIncompleteIndex === 3) && ( // always show this option
                                            <button className="underline-btn" onClick={() => handleButtonClick('review_complete')}>
                                                I've finished reviewing
                                            </button>
                                        )}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        {stepsCompleted.every(step => step) && (
                            <div className="other-content-tile">
                                <p className="completion-message">
                                    Property setup complete! You can <Link to={`/workbench/${property_name}`}>test HostBuddy's responses</Link> for this property, or go live by setting the schedule on the <Link to="/properties">properties page</Link>.
                                </p>
                            </div>
                        )}

                        <div style={{ marginBottom: '50px' }}></div> {/* Spacer */}
                        <HostBuddyKnowledgeBase apiPropertyData={apiPropertyData} setApiPropertyData={setApiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI} property_name={property_name}/>

                        {apiPropertyData?.calry_property_id && (
                            <p className="text-muted mt-6 fs-14 text-center">
                                Property ID: {apiPropertyData.calry_property_id}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default GuidedSetup;