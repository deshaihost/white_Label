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

  // Handle source references with special styling
  formattedText = formattedText.replace(/\[source:\s*"([^"]+)"\]/g, '<span class="source-reference">[source: "$1"]</span>');

  // Since the justification doesn't have explicit line breaks, we need to intelligently break it into bullet points
  // Split the text into meaningful chunks for bullet points
  
  // First, split on common transition words and phrases
  let chunks = formattedText.split(/\b(Additionally|Furthermore|Also|Moreover|In addition|The most relevant|This information)\b/i);
  
  // Filter and clean chunks
  let meaningfulChunks = [];
  let currentChunk = '';
  
  for (let i = 0; i < chunks.length; i++) {
    let chunk = chunks[i];
    
    // Skip transition words themselves
    if (chunk.match(/^(Additionally|Furthermore|Also|Moreover|In addition|The most relevant|This information)$/i)) {
      continue;
    }
    
    // Combine with previous chunk if it's too short
    if (chunk.trim().length < 50 && currentChunk) {
      currentChunk += chunk;
    } else {
      if (currentChunk.trim().length > 0) {
        meaningfulChunks.push(currentChunk.trim());
      }
      currentChunk = chunk;
    }
  }
  
  // Add the last chunk
  if (currentChunk.trim().length > 0) {
    meaningfulChunks.push(currentChunk.trim());
  }
  
  // Clean up the chunks and create bullet points
  let bulletPoints = meaningfulChunks.map(chunk => {
    let cleaned = chunk.trim();
    
    // Remove leading comma, space, or period
    cleaned = cleaned.replace(/^[,.\s]+/, '');
    
    // Ensure it starts with capital letter
    if (cleaned.length > 0) {
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }
    
    // Ensure it ends with period
    if (!cleaned.match(/[.!?]$/)) {
      cleaned += '.';
    }
    
    return cleaned;
  }).filter(chunk => chunk.length > 10); // Filter very short chunks
  
  // If we have meaningful bullet points, create the list
  if (bulletPoints.length > 1) {
    let result = '<ul class="markdown-list">';
    bulletPoints.forEach(point => {
      result += `<li>${point}</li>`;
    });
    result += '</ul>';
    return result;
  } else {
    // If we can't break it into meaningful bullets, just format as paragraphs
    return formattedText.replace(/\n/g, '<br/>');
  }
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
