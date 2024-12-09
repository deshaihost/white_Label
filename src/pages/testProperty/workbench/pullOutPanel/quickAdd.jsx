import React, { useState } from 'react';
import './pullOutPanel.css'
import Loader from '../../../../helper/Loader';
import axios from 'axios';
import ToastHandle from '../../../../helper/ToastMessage';
import SelectPropertiesModal from './selectPropertiesModal/SelectPropertiesModal';

const QuickAdd = ({ propertyName, setPanelContent, setHasUnsavedChanges }) => {
  const [addToKbLoading, setAddToKbLoading] = useState(false);
  const [label, setLabel] = useState('');
  const [content, setContent] = useState('');
  const [showSelectPropertiesModal, setShowSelectPropertiesModal] = useState(false);

  // Assemble the data in the "questionnaire question" format to be passed to the API, and add the rest of the body data
  const assembleRequestBody = (properties) => {
    const question_data = {question_text:label || 'Extra information', response_text:content, question_type:'long_answer', hide_for_reservations:[], placeholder_text:'Type or paste any information about your property that you would like HostBuddy to know.'};
    const bodyData = {section_name:'SOPs', subsection_name:'Other', question:question_data, properties};
    return bodyData;
  };

  const callAddToKbApi = async (properties) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setAddToKbLoading(true);
  
    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const bodyData = assembleRequestBody(properties);
      const response = await axios.post(`${baseUrl}/add_questionnaire_question`, bodyData, config);

      if (response.status === 200) { ToastHandle('Successfully added to knowledge base', 'success'); }
      else { ToastHandle(response?.data?.error || 'Failed to add to knowledge base', 'danger'); }
    } catch (error) { ToastHandle('Failed to add to knowledge base', 'danger'); }
    finally { setAddToKbLoading(false); }
  }

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    setHasUnsavedChanges(e.target.value.trim() !== '' || content.trim() !== '');
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setHasUnsavedChanges(label.trim() !== '' || e.target.value.trim() !== '');
  };

  const handleAddToThisProperty = () => {
    if (!content.trim()) { return; }
    callAddToKbApi([propertyName]);
    setHasUnsavedChanges(false);
  };

  const handleSave = (selectedProperties) => {
    if (!content.trim()) { return; }
    callAddToKbApi(selectedProperties);
    setHasUnsavedChanges(false);
  };

  const handleViewPrevious = () => {
    setPanelContent('viewPrevious');
  }

  return (
    <div className="quick-add-container">
      <h2 className="quick-add-title">Quick Add To Knowledge Base</h2>
      <p className="quick-add-description">Type or paste any information about your property that you would like HostBuddy to know.</p>

      <label className="quick-add-label">Label (optional)</label>
      <input type="text" className="form-control quick-add-input" placeholder="Enter a label for this information..." value={label} onChange={handleLabelChange}/>

      <label className="quick-add-label">Content for knowledge base</label>
      <textarea className="quick-add-textarea" placeholder="Enter anything you'd like HostBuddy to know..." value={content} onChange={handleContentChange}/>

      <div className="quick-add-buttons-container">
        {!addToKbLoading ? (
          <>
            <button className="btn btn-primary quick-add-button" onClick={handleAddToThisProperty}>Add to this property</button>
            <button className="btn btn-primary quick-add-button" onClick={() => setShowSelectPropertiesModal(true)}>Add to multiple properties...</button>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <button className="view-previous-button" onClick={handleViewPrevious}>View previously added</button>

      <SelectPropertiesModal show={showSelectPropertiesModal} setShow={setShowSelectPropertiesModal} currentProperty={propertyName} handleSave={handleSave} />
    </div>
  );
}

export default QuickAdd;