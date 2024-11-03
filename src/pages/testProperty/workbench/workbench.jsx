import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatWindow from "./chatWindow/chatWindow";
import PullOutPanel from './pullOutPanel/pullOutPanel';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import './workbench.css';
//import dummyPropertyImg from "../../../public/img/dummyPropertyImg.png";
import hostBuddyLogo from "../../../public/img/logo/logoGraphicOnlySquare.webp";

/* Dummy icons for now */
import { FaHome, FaPencilAlt, FaBook, FaCog } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";

const leo_img = 'https://orbirental-images.s3.amazonaws.com/4ca3b355-c04e-4fb8-a593-e3a50b721d58_604.png';

const Workbench = () => {
  const { id } = useParams();
  const chatbot_key = id; // path param
  let urlData = { chatbot_key };

  const [reservationStage, setReservationStage] = useState('current');
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State for panel visibility
  const [panelContent, setPanelContent] = useState(null); // State for panel content

  // Function to open the panel
  const handleActionClick = (content) => {
    setPanelContent(content);
    setIsPanelOpen(true);
  };

  // Function to close the panel
  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setPanelContent(null);
  };

  const handleReset = () => {
    setReservationStage('current');
  };

  return (
    <div className='workbench'>
      <Helmet>
        <title>Test Property - HostBuddy AI</title>
      </Helmet>

      <div className='left-container'>
        <div className='control-section'>
          <button onClick={handleReset} className='reset-button'>
            <FaRotateRight /> Reset
          </button>
          <div className='reservation-stage'>
            <h6 style={{marginBottom:'2px'}}>Reservation Stage</h6>
            <select id='reservation-stage-select' className='reservation-stage-select' value={reservationStage} onChange={(e) => setReservationStage(e.target.value)}>
              <option value='' disabled>Select...</option>
              <option value='current'>Current</option>
              <option value='inquiry'>Inquiry</option>
              <option value='future'>Future</option>
              <option value='past'>Past</option>
            </select>
          </div>
        </div>
        <ChatWindow urlData={urlData} />
      </div>

      <div className='right-container'>
        <div className='right-content'>
          <div className='header-information'>
            <div className='header-content'>
              <img src={leo_img} alt='dummy property' />
              <div className='header-text'>
                <h2 style={{marginBottom:'5px'}}>The Leo - 604</h2>
                <h4 style={{marginBottom:'5px'}}>1281 Broadway, San Diego</h4>
                <Link to='/properties'>&larr; Back to Properties</Link>
              </div>
            </div>
          </div>

          <div className='chat-information'>
            <h3><img src={hostBuddyLogo} /> Conversation Analysis</h3>
            <div className='chat-information-content blur-background-bottom-right smaller-blur'>
              <h5 style={{marginTop:'0'}}>Where did this response come from?</h5>
              <p>From "Hostfully Data", I can confirm the property location at 715 15th Street, San Diego, CA 92101. While exact drive times to Tijuana aren't listed, having the precise property location allows me to provide accurate information about the approximate driving distance.</p>
              <h5>Suggestions</h5>
              <ul>
                <li>Add information about typical travel times and the best routes for driving to Tijuana from the property.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='actions-section'>
          <h3>Actions</h3>
          <div className='actions-container'>
            <div className='clickable-div action-content' onClick={() => handleActionClick('quickAdd')}>
              <FaPencilAlt />
              <h6>Quick Add To Knowledge Base</h6>
            </div>
            <div className='clickable-div action-content' onClick={() => handleActionClick('editProperty')}>
              <FaHome />
              <h6>Edit Property Profile</h6>
            </div>
            <div className='clickable-div action-content' onClick={() => handleActionClick('manageSources')}>
              <FaBook />
              <h6>Manage Knowledge Base Sources</h6>
            </div>
            <div className='clickable-div action-content' onClick={() => handleActionClick('conversationPreferences')}>
              <FaCog />
              <h6>Conversation Preferences</h6>
            </div>
          </div>
        </div>
      </div>
      {/* Remove conditional rendering, always mount the panel */}
      <PullOutPanel 
        onClose={handleClosePanel} 
        content={panelContent} 
        className={isPanelOpen ? 'open' : ''} 
      />
    </div>
  )
}

export default Workbench