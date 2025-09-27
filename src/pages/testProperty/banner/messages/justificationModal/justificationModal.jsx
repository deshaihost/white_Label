import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./customJustificationModal.css";
import JustificationLogoSvg from "./icons/justificationLogo.svg";

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
      // Avoid adding <br/> if the line is empty or just whitespace, or if it's the last line before a list starts
      const nextLineIsListItem = processedLines[processedLines.indexOf(line) + 1]?.startsWith('<li>');
      if (line.trim() !== '' && !nextLineIsListItem) {
        result += line + '<br/>';
      } else if (line.trim() !== '') {
         result += line; // Add line without <br/> if it's followed by a list item
      }
    }
  });
  
  if (inList) {
    result += '</ul>';
  }
  
  // Remove trailing <br/> if present
  if (result.endsWith('<br/>')) {
    result = result.slice(0, -5);
  }

  return result;
};

const JustificationModal = ({
  show,
  handleClose,
  propertyName,
  justification,
}) => {
  const modalRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && show) {
        handleClose("addPropertyClose");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleClose, show]);
  // If not showing, don't render
  if (!show) return null;

  // Format the justification text using the markdown formatter
  const formattedJustification = justification ? formatMarkdownText(justification) : "No justification available.";
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-container" ref={modalRef}>
        <div className="custom-modal-header">
          <div className="custom-modal-logo">
            <div className="logo-badge">
              <img src={JustificationLogoSvg} width="48" height="50" alt="Justification Logo" />
            </div>
          </div>
          <h5 className="custom-modal-title heading-xsmall">
            Hey HostBuddy , where did this response come from?
          </h5>
          <button
            className="custom-modal-close"
            onClick={() => handleClose("addPropertyClose")}
          >
            ×
          </button>
        </div>        <div className="custom-modal-body">
          <div className="justification-block">
            <div className="justification-content" style={{ display:'flex', alignItems:'center' }}>
              {/* <JustificationLogo width="48" height="50" /> */}
              {/* Use dangerouslySetInnerHTML to render formatted justification */}
              <div
                className="markdown-content justification-text"
                style={{ marginTop:'0px', marginBottom:'0px', fontSize:'16px', textAlign:'left', color:'rgba(166, 169, 178, 1)', fontFamily: "'Samsung Sharp Sans Medium'" }}
                dangerouslySetInnerHTML={{ __html: formattedJustification }}
              />
            </div>
          </div>
         
          <div className="custom-modal-footer">
            <p style={{marginTop:"0px", marginBottom:"0px", fontSize:"16px", color:"#999"}}>
              HostBuddy's responses are based on the information in its
              knowledge base for this property. If something is missing or
              incorrect, you can{" "}
              <Link
                to={`/edit-property/${propertyName}`}
                className="custom-link"
              >
                manage the knowledge base
              </Link>{" "}
              or{" "}
              <Link
                to={`/edit-property/${propertyName}`}
                className="custom-link"
              >
                add to the property profile
              </Link>
              .
            </p>
            <p style={{
              marginTop:"0px", 
              marginBottom:"0px", fontSize:"16px", color:"#999"}}>
              You can also adjust your{" "}
              <Link to="/inbox/preferences" className="custom-link">
                conversation preferences
              </Link>{" "}
              to change HostBuddy's behavior.
            </p>
          </div>
        </div>
        {/* Add style tag for markdown list styling */}
        <style jsx="true">{`
          .markdown-list {
            margin-left: 0px; 
            list-style-type: disc;
            padding-left: 20px; 
            color: rgba(166, 169, 178, 1); 
            font-family: 'Samsung Sharp Sans Medium'; 
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .markdown-content ul {
            margin-top: 8px;
            margin-bottom: 8px;
          }
          .markdown-list li {
            margin-bottom: 12px; 
            line-height: 1.5;
            color: rgba(166, 169, 178, 1);
          }
          /* Source reference styling */
          .source-reference {
            color: rgba(166, 169, 178, 0.8);
            font-style: italic;
            font-size: 14px;
            font-family: 'Samsung Sharp Sans Medium';
          }
          /* Ensure spans within the content inherit the base styles */
          .markdown-content span {
             font-family: inherit; /* Default to parent font */
             color: inherit;
          }
          .markdown-content span[style*="Samsung Sharp Sans Bold"] {
             font-family: 'Samsung Sharp Sans Bold'; /* Override for bold */
             color: rgba(166, 169, 178, 1);
          }
          /* Better spacing for justified content */
          .justification-text {
            line-height: 1.6;
          }
          .justification-text p {
            margin-bottom: 8px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default JustificationModal;
