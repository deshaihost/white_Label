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
       // Avoid adding <br/> if the line is empty or just whitespace after processing
      if (line.trim().length > 0) {
        result += line + '<br/>';
      } else if (result.endsWith('<br/>')) {
         // Prevent multiple <br/> for consecutive empty lines
      } else {
         result += '<br/>'; // Add break for intentional empty lines
      }
    }
  });

  if (inList) {
    result += '</ul>';
  }

  // Remove trailing <br/> if it exists
  if (result.endsWith('<br/>')) {
    result = result.substring(0, result.length - 5);
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
              {/* Use dangerouslySetInnerHTML to render formatted justification */}
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
      {/* Add style tag for markdown list styling */}
      <style jsx="true">{`
        .markdown-list {
          margin-left: 20px; /* Adjust left margin for indent relative to the container div */
          list-style-type: disc;
          padding-left: 20px; /* Add padding for list items */
          color: white; /* Ensure list text color matches */
          font-family: 'Samsung Sharp Sans Medium'; /* Match font */
        }
        .markdown-content ul {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .markdown-list li {
          margin-bottom: 15px; /* Spacing between list items */
        }
         /* Ensure spans within the content inherit the base styles */
        .markdown-content span {
           font-family: inherit; /* Default to parent font */
        }
        .markdown-content span[style*="Samsung Sharp Sans Bold"] {
           font-family: 'Samsung Sharp Sans Bold'; /* Override for bold */
        }
      `}</style>
    </Modal>
  );
};

export default JustificationModal;
