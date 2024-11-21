import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import WindowEmbedContent from "./WindowEmbedContent";
import WidgetEmbedContent from "./WidgetEmbedContent";
import ChatbotLinkContent from "./ChatbotLinkContent";

import "./embedModal.css";

const EmbedModal = ({ show, handleClose, chatbotKey }) => {
  const [activeTab, setActiveTab] = useState('window');

  const renderContent = () => {
    switch(activeTab) {
      case 'window':
        return <WindowEmbedContent chatbotKey={chatbotKey} />;
      case 'widget':
        return <WidgetEmbedContent chatbotKey={chatbotKey} />;
      case 'link':
        return <ChatbotLinkContent chatbotKey={chatbotKey} />;
      default:
        return null;
    }
  };

  return (
    <Modal show={show} size="xl" onHide={handleClose} aria-labelledby="embed-modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="embed-modal-title" style={{ color: 'white' }}>
          Embed HostBuddy Into Your Website
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="embed-modal-tabs">
          <button className={activeTab === 'window' ? 'active' : ''} onClick={() => setActiveTab('window')}>
            Window Embed
          </button>
          <button className={activeTab === 'widget' ? 'active' : ''} onClick={() => setActiveTab('widget')}>
            Widget Embed
          </button>
          <button className={activeTab === 'link' ? 'active' : ''} onClick={() => setActiveTab('link')}>
            Chatbot Link
          </button>
        </div>
        {renderContent()}
      </Modal.Body>
    </Modal>
  );
};

export default EmbedModal;
