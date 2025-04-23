import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

// Utility function to format markdown-like text
const formatMarkdownText = (text) => {
  if (!text) return "";
  
  // Process the text in stages
  let formattedText = text;
  
  // Handle bold text (convert **text** to <span style="font-family: 'Samsung Sharp Sans Bold';">text</span>)
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<span style="font-family: \'Samsung Sharp Sans Bold\';">$1</span>');
  
  // Split into lines to handle bullet points properly
  const lines = formattedText.split('\n');
  const processedLines = lines.map(line => {
    // Check if line starts with bullet point (* or -)
    if (line.trim().match(/^\s*[\*\-]\s+/)) {
      // Convert bullet point to HTML list item
      return `<li>${line.trim().replace(/^\s*[\*\-]\s+/, '')}</li>`;
    }
    return line;
  });
  
  // Join lines back together, wrapping lists in <ul> tags
  let result = '';
  let inList = false;
  
  processedLines.forEach(line => {
    if (line.startsWith('<li>')) {
      if (!inList) {
        result += '<ul class="markdown-list">';
        inList = true;
      }
      result += line;
    } else {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      result += line + '<br/>';
    }
  });
  
  if (inList) {
    result += '</ul>';
  }
  
  return result;
};

const JustificationModal = ({ show, handleClose, propertyName, justification }) => {
  const logo = "https://hostbuddylb.com/logo/logoNoText.png";
  const closeFeedBackModel=()=>{
    handleClose("addPropertyClose");
  }
  
  // Format the justification text
  const formattedJustification = formatMarkdownText(justification);
  
  return (
    <Modal show={show} size="xl" onHide={() => closeFeedBackModel()} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Hey HostBuddy, where did this response come from?</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="justification-modal">
          <div className="justification-block">
            <div className="justification-block" style={{ display:'flex', alignItems:'center' }}>
              <img src={logo} alt="Logo" style={{ marginRight:'30px', height:'50px' }} />
              <div 
                className="markdown-content" 
                style={{ marginTop:'30px', marginBottom:'30px', fontSize:'18px', textAlign:'left', color:'white', fontFamily: "'Samsung Sharp Sans Medium'" }}
                dangerouslySetInnerHTML={{ __html: formattedJustification }}
              />
            </div>
          </div>
          <hr/>
          <p className="text-center" style={{marginTop:"30px", marginBottom:"30px", fontSize:"16px", color:"#999"}}>HostBuddy's responses are based on the information in its knowledge base for this property. If something is missing or incorrect, you can <Link to={`/edit-property/${propertyName}`}>manage the knowledge base or add to the property profile</Link>.</p>
          <p className="text-center" style={{marginTop:"30px", marginBottom:"30px", fontSize:"16px", color:"#999"}}>You can also adjust your <Link to='/inbox/preferences'>conversation preferences</Link> to change HostBuddy's behavior.</p>
        </div>
      </Modal.Body>
      <style jsx="true">{`
        .markdown-list {
          margin-left: 40px;
          list-style-type: disc;
        }
        .markdown-content ul {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .markdown-list li {
          margin-bottom: 15px;
        }
      `}</style>
    </Modal>
  );
};

export default JustificationModal;
