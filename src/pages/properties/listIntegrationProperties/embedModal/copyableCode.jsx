import React, { useState, useCallback } from 'react';

const CopyableCode = ({ children }) => {
  const [showCopyConfirm, setShowCopyConfirm] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children);
    setShowCopyConfirm(true);
    setTimeout(() => setShowCopyConfirm(false), 2000);
  }, [children]);

  return (
    <div className="copyable-code-container">
      <button className="copy-button" onClick={handleCopy}>
        {showCopyConfirm ? (
          <span className="copy-confirm">Copied!</span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 4v10h10V4H4zm9 9H5V5h8v8zm-3-12H0v10h2V3h8V1z"/>
          </svg>
        )}
      </button>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CopyableCode;