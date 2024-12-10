import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';
import './guidedSetup.css';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getQuestionnaireActions, stateEmptyActions } from "../../../../redux/actions";
import axios from 'axios';

import IntegrationsForm from '../dynamic_questionnaire/questionnaireFirstPage/integrationsForm';
import DocumentForm from '../dynamic_questionnaire/questionnaireFirstPage/documentForm';
import AutoFillButtons from '../dynamic_questionnaire/questionnaireFirstPage/autoFillButtons';

function GuidedSetup({ property_name:propPropertyName }) {
    const { property_name:paramPropertyName } = useParams();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
    const section_order_data = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire?.metadata?.section_order
    
    // Use path param first, fall back to prop
    const property_name = paramPropertyName || propPropertyName;

    const [liveQuestionnaireData, setLiveQuestionnaireData] = useState({});
    const [apiPropertyData, setApiPropertyData] = useState(null);

    // Get the questionnaire data from the API. Should run once, immediately when the page loads
    useEffect(() => {
      if (property_name) {
        dispatch(getQuestionnaireActions(property_name));
        return () => { dispatch(stateEmptyActions("getQuestionnaire")); } // Clear the state when the component unmounts
      }
    }, [property_name]);

    // When the API questionnaire data is available, set it to our local state
    useEffect(() => {
      if (apiQuestionnaireData) {
        setLiveQuestionnaireData(JSON.parse(JSON.stringify(apiQuestionnaireData))); // ensure deep copy
      }
    }, [apiQuestionnaireData]);

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

    // On page load, get the property data from the API, if we have the property name and not done already
    useEffect(() => {
      if (property_name && !apiPropertyData) {
        getPropertyDataFromAPI(property_name);
      }
    }, [property_name, apiPropertyData]);

    return (
        <section className="pst">
            <Helmet>
                <title>Property Setup – HostBuddy AI</title>
                <link rel="canonical" href="https://www.hostbuddy.ai/faqs" />
            </Helmet>

            <div className="banner-heading">
                <h1>{property_name}</h1>
            </div>

            <div className="setup-tile blur-background-top-right">

            <h2>Guided Setup</h2>

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="completed">
                        <Accordion.Header>
                            1. Link to your PMS
                            <div className="subtitle">Property details, past conversations, guest data, and availability data are automatically pulled when you connect your property management software.</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <IntegrationsForm property_name={property_name} apiPropertyData={apiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="completed">
                        <Accordion.Header>
                            2. Upload documents
                            <div className="subtitle">You can upload existing documents such as house manuals, welcome docs, or anything else that contains information about your property.</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <DocumentForm property_name={property_name} apiPropertyData={apiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            3. Auto-fill property profile
                            <div className="subtitle">Auto-fill the property profile form using your PMS and document data to make HostBuddy's knowledge base easier to view and manage.</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <AutoFillButtons property_name={property_name} apiPropertyData={apiPropertyData} />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            4. Review property profile
                            <div className="subtitle">Review the property profile to make sure HostBuddy has all the information it needs to serve your guests.</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            Dummy content
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </section>
    );
}

export default GuidedSetup;