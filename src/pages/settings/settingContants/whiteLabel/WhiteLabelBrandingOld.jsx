import React, { useEffect } from 'react';

const WhiteLabelBranding = () => {
  useEffect(() => {
    // Find the target parent container and apply custom styles
    const targetParent = document.querySelector('#root > div.App > div > div > div:nth-child(2)');
    
    if (targetParent) {
      // Store original styles to restore later
      const originalStyles = {
        overflow: targetParent.style.overflow,
        padding: targetParent.style.padding,
        margin: targetParent.style.margin
      };

      // Apply styles to make iframe fit properly within the target parent
      targetParent.style.overflow = 'hidden';
      targetParent.style.padding = '0';
      targetParent.style.margin = '0';

      // Cleanup function to restore original styles when component unmounts
      return () => {
        if (targetParent) {
          targetParent.style.overflow = originalStyles.overflow || '';
          targetParent.style.padding = originalStyles.padding || '';
          targetParent.style.margin = originalStyles.margin || '';
        }
      };
    }
  }, []);

  return (
    <div className="white-label-branding" style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      zIndex: 999,
      backgroundColor: '#0F1117'
    }}>
      {/* Full Screen Iframe */}
      <iframe
        src="https://whimsical-cranachan-2f9543.netlify.app/"
        title="White Label Branding Configuration"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          margin: 0,
          padding: 0
        }}
        frameBorder="0"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
      />
    </div>
  );
};

export default WhiteLabelBranding;