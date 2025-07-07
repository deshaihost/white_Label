import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./customJustificationModal.css";
import { ReactComponent as JustificationLogo } from "./icons/justificationLogo.svg";

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

const JustificationModal = ({
  show,
  handleClose,
  propertyName,
  justification,
}) => {
  console.log("jus:", justification);
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
              <JustificationLogo width="48" height="50" />
            </div>
          </div>
          <h5 className="custom-modal-title heading-xsmall">
            Hey HostBuddy, where did this response come from?
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
            margin-left: 40px; /* Adjust as needed based on logo size and desired indent */
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
      </div>
    </div>
  );
};

export default JustificationModal;
