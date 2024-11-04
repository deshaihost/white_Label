import React, { useState } from 'react';
import './pullOutPanel.css'
import Loader from '../../../../helper/Loader';
import axios from 'axios';
import ToastHandle from '../../../../helper/ToastMessage';

const QuickAdd = ({propertyName}) => {
  const [addToKbLoading, setAddToKbLoading] = useState(false);
  const [label, setLabel] = useState('');
  const [content, setContent] = useState('');
  const [selectedStages, setSelectedStages] = useState([]);
  const reservationStages = ["CURRENT", "FUTURE", "INQUIRY/PAST"];

  const callAddToKbApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const bodyData = { label:label, response_text:content };
      const response = await axios.post(`${baseUrl}/properties/${propertyName}`, bodyData, config);

      if (response.status === 200) { ToastHandle('Successfully added to knowledge base', 'success'); }
      else { ToastHandle(response?.data?.error || 'Failed to add to knowledge base', 'error'); }
    } catch (error) { ToastHandle('Failed to add to knowledge base', 'error'); }
  }

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="quick-add-container">
      <h2 className="quick-add-title">Quick Add To Knowledge Base</h2>
      <p className="quick-add-description">Type or paste any information about your property that you would like HostBuddy to know.</p>

      <label className="quick-add-label">Label (optional)</label>
      <input type="text" className="form-control quick-add-input" placeholder="Enter a label for this information..." value={label} onChange={handleLabelChange}/>

      <label className="quick-add-label">Content for knowledge base</label>
      <textarea className="quick-add-textarea" placeholder="Enter anything you'd like HostBuddy to know..." value={content} onChange={handleContentChange}/>

      <div className="quick-add-buttons-container">
        <button className="btn btn-primary quick-add-button">Add to this property</button>
        <button className="btn btn-primary quick-add-button">Add to multiple properties...</button>
      </div>
      <button className="view-previous-button">View previously added</button>
    </div>
  );
}

export default QuickAdd;