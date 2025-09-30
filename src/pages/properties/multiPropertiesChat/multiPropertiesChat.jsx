import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ToastHandle from "../../../helper/ToastMessage";
import Loader from "../../../helper/Loader";
import axios from "axios";
import './multiProperties.css';
import EmbedModal from "../listIntegrationProperties/embedModal/embedModal";
import Authorized from '../../../helper/Authorized';
import { getActiveToken } from '../../../helper/apiCore';

const MultiPropertiesChat = () => {
  const navigate = useNavigate();
  const [allMultiProps, setAllMultiProps] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState([]);
  const [embedModalData, setEmbedModalData] = useState({show:false, chatbotKey:""});

  const handleAddNew = () => {
    navigate('/edit-multi-property');
  };

  const handleEdit = (id) => {
    navigate(`/edit-multi-property/${id}`);
  };

  const handleTest = (id) => {
    navigate(`/workbench-multi/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this multi property?")) return;
    setDeletingIds(prev => [...prev, id]);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const config = {
      headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
      validateStatus: (status) => status >= 200 && status < 500
    };
    try {
      const response = await axios.delete(`${baseUrl}/remove_multi_property?multi_property_id=${id}`, config);
      if (response.status === 200) {
        setAllMultiProps(prev => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
        ToastHandle("Multi property deleted successfully", "success");
      } else {
        ToastHandle(response?.data?.error || "Failed to delete multi property", "danger");
      }
    } catch (error) {
      ToastHandle("An error occurred while deleting", "danger");
    } finally {
      setDeletingIds(prev => prev.filter(x => x !== id));
    }
  };

  const callRegenerateChatbotLink = async (id) => {
    if (!window.confirm('WARNING: This will invalidate any existing chat links for this multi property. Proceed?')) return;
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { type: 'multi_property', multi_property_id: id };

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: (status) => status >= 200 && status < 500
      };
      const response = await axios.post(`${baseUrl}/regenerate_chatbot_key`, dataToSend, config);
      if (response.status === 200) {
        ToastHandle("Chat link regenerated", "success");
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
    } catch (error) {
      ToastHandle(error, "danger");
    }
  };

  const callGetMultiPropsApi = async () => {
    setIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Debug logs for authentication
    console.log('🔍 [DEBUG] MultiPropertiesChat - callGetMultiPropsApi');
    console.log('🔑 API_KEY:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'MISSING');
    console.log('🌐 Base URL:', baseUrl);

    // Check authentication state
    const authData = Authorized();
    console.log('🔐 Auth Data:', authData ? 'Present' : 'MISSING');
    if (authData) {
      console.log('🎫 JWT Token:', authData.token ? `${authData.token.substring(0, 20)}...` : 'MISSING');
    }

    const activeToken = getActiveToken();
    console.log('🔓 Active Token from helper:', activeToken ? `${activeToken.substring(0, 20)}...` : 'MISSING');

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      // Add Authorization header if we have a token
      if (authData && authData.token) {
        config.headers["Authorization"] = `Bearer ${authData.token}`;
        console.log('✅ Added Authorization header to config');
      } else {
        console.log('❌ No JWT token available for Authorization header');
      }

      console.log('📤 Request Headers:', JSON.stringify(config.headers, null, 2));
      console.log('🎯 API URL: GET', `${baseUrl}/get_multi_properties`);

      const response = await axios.get(`${baseUrl}/get_multi_properties`, config);

      console.log('📥 Response Status:', response.status);
      console.log('📥 Response Data:', JSON.stringify(response.data, null, 2));

      if (response.status === 200) {
        setAllMultiProps(response.data.multi_properties);
        console.log('✅ Get multi properties API call successful');
      } else {
        console.log('⚠️ Get multi properties API call returned non-200 status:', response.status);
        ToastHandle(response?.data?.error || "An error occurred.", "danger");
      }
    }
    catch (error) { 
      console.error('❌ Get multi properties API call failed:', error);
      if (error.response) {
        console.error('❌ Error Response Status:', error.response.status);
        console.error('❌ Error Response Data:', error.response.data);
      }
      ToastHandle("An error occurred", "danger"); 
    }
    finally { setIsLoading(false); }
  }

  useEffect(() => {
    callGetMultiPropsApi();
  }, []);

  const handleEmbedClick = (chatbot_key) => {
    setEmbedModalData({show:true, chatbotKey: chatbot_key});
  };

  return (
    <div className='multi-properties-chat'>
      <div className='description'>
        <h4>Multi Properties Chat <span className="beta-label">(Beta)</span></h4>
        <p>
          This functionality lets you configure HostBuddy to handle conversations that require simultaneous knowledge of multiple properties.
        </p>

        <div className='multi-property-entries'>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <Loader />
            </div>
          ) : (
            Object.entries(allMultiProps)
              .sort(([, a], [, b]) => a.name.localeCompare(b.name))
              .map(([id, prop]) => (
                <div key={id} className='multi-property-entry'>
                  {deletingIds.includes(id) ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                      <Loader />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span>{prop.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '100%' }}>
                        <button className="property-edit-btn" onClick={() => handleTest(id)}>Test</button>
                        <button className="property-edit-btn" onClick={() => handleEdit(id)}>Edit</button>
                        <Dropdown className="property-dropdown">
                          <Dropdown.Toggle variant="link" className="dropdown-toggle-vertical">
                            <HiOutlineDotsVertical />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleEmbedClick(prop.chatbot_key)}>
                              Get Chat Link or Embed
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => callRegenerateChatbotLink(id)}>
                              Regenerate Chat Link
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(id)}>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  )}
                </div>
              ))
          )}
        </div>

        <button className="add-new-button" onClick={handleAddNew}>+ Add New</button>
      </div>
      <EmbedModal show={embedModalData.show} handleClose={() => setEmbedModalData({show:false, chatbotKey:""})} chatbotKey={embedModalData.chatbotKey}/>
    </div>
  );
};

export default MultiPropertiesChat;