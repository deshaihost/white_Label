import PropTypes from "prop-types";
import React, { useState, useEffect, memo } from "react";
import logoHeading from "../../NavBarIcons/1_Expanded_Nav_Icon.svg";
import { useWhiteLabelLogos } from "../../../../../helper/WhiteLabelLogoContext";
import "./logoComponent.css";

const LogoNavComponent = ({ type, colour, onlyIcon }) => {
  const { fullLogo, loading, isHostBuddyDomain, isRetrying } = useWhiteLabelLogos();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // CRITICAL: For white label domains, never show default HostBuddy logo during loading/retry
  // Only show the logo if we're actually on HostBuddy domain OR we have a successful logo URL
  const shouldShowLogo = isHostBuddyDomain || (!loading && !isRetrying && fullLogo);
  const logoSrc = isHostBuddyDomain ? logoHeading : fullLogo;
  
  // Track component mount/unmount
  useEffect(() => {
    console.log('🔵 [LOGO COMPONENT - Expanded] Component mounted', {
      loading,
      isHostBuddyDomain,
      hasFullLogo: !!fullLogo,
      isRetrying,
      shouldShowLogo,
      timestamp: new Date().toISOString()
    });
    
    return () => {
      console.log('🔴 [LOGO COMPONENT - Expanded] Component unmounted', {
        timestamp: new Date().toISOString()
      });
    };
  }, []);
  
  // Preload and decode image when logo URL changes
  useEffect(() => {
    if (logoSrc && shouldShowLogo) {
      const loadStart = performance.now();
      console.log('⏳ [LOGO COMPONENT - Expanded] Starting image load...', {
        logoSrc: logoSrc.substring(0, 60) + (logoSrc.length > 60 ? '...' : ''),
        isLocalIcon: logoSrc === logoHeading,
        shouldShowLogo,
        timestamp: new Date().toISOString()
      });
      
      setImageLoaded(false);
      setImageError(false);
      
      const img = new Image();
      
      // Set high priority for faster loading
      if ('fetchPriority' in img) {
        img.fetchPriority = 'high';
      }
      
      img.onload = () => {
        const loadElapsed = performance.now() - loadStart;
        console.log('✅ [LOGO COMPONENT - Expanded] Image downloaded', {
          loadTime: `${loadElapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });
        
        // Use decode API for smoother rendering
        if ('decode' in img) {
          const decodeStart = performance.now();
          img.decode()
            .then(() => {
              const decodeElapsed = performance.now() - decodeStart;
              const totalElapsed = performance.now() - loadStart;
              console.log('🎨 [LOGO COMPONENT - Expanded] Image decoded and ready to render', {
                decodeTime: `${decodeElapsed.toFixed(2)}ms`,
                totalTime: `${totalElapsed.toFixed(2)}ms`,
                timestamp: new Date().toISOString()
              });
              setImageLoaded(true);
            })
            .catch(() => {
              console.warn('⚠️ [LOGO COMPONENT - Expanded] Decode failed, showing anyway');
              setImageLoaded(true);
            });
        } else {
          console.log('ℹ️ [LOGO COMPONENT - Expanded] Decode API not supported, showing image', {
            totalTime: `${loadElapsed.toFixed(2)}ms`
          });
          setImageLoaded(true);
        }
      };
      
      img.onerror = () => {
        const errorElapsed = performance.now() - loadStart;
        console.error('❌ [LOGO COMPONENT - Expanded] Image load error', {
          logoSrc: logoSrc.substring(0, 60) + '...',
          errorTime: `${errorElapsed.toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });
        setImageError(true);
        setImageLoaded(true); // Show fallback
      };
      
      img.src = logoSrc;
    } else {
      // Reset states when we shouldn't show logo (white label domain loading)
      setImageLoaded(false);
      setImageError(false);
    }
  }, [logoSrc, shouldShowLogo]);
  
  // Track when image actually renders (becomes visible)
  useEffect(() => {
    if (imageLoaded && !loading && shouldShowLogo) {
      console.log('👁️ [LOGO COMPONENT - Expanded] Image now VISIBLE to user', {
        isHostBuddyDomain,
        timestamp: new Date().toISOString()
      });
      
      // Dispatch event to notify WhiteLabelHelmet that logo is visible
      const event = new CustomEvent('logoComponentVisible', {
        detail: { isHostBuddyDomain, logoUrl: logoSrc }
      });
      document.dispatchEvent(event);
    } else if (!shouldShowLogo || loading) {
      // Logo is hidden or loading
      const event = new CustomEvent('logoComponentHidden', {
        detail: { isHostBuddyDomain }
      });
      document.dispatchEvent(event);
    }
  }, [imageLoaded, loading, shouldShowLogo, isHostBuddyDomain, logoSrc]);
  
  // If we're on white label domain and still loading/retrying, show skeleton only
  if (!isHostBuddyDomain && (loading || isRetrying || !shouldShowLogo)) {
    return (
      <div
        className="logo-container"
        style={{
          width: "184px",
          height: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          willChange: "opacity",
          position: "relative"
        }}
      >
        <div 
          className="logo-skeleton"
          style={{
            width: "134px",
            height: "34px",
            borderRadius: "4px",
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            animation: 'pulse 1.5s ease-in-out infinite alternate'
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="logo-container"
      style={{
        width: "184px",
        height: "34px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        willChange: "opacity",
        position: "relative"
      }}
    >
      {(loading || !imageLoaded) && shouldShowLogo && (
        <div 
          className="logo-skeleton"
          style={{
            width: "134px",
            height: "34px",
            position: "absolute",
            borderRadius: "4px"
          }}
        />
      )}
      {shouldShowLogo && (
        <img
          className="logo-icon"
          alt="Logo"
          src={logoSrc}
          style={{
            width: "134px",
            height: "34px",
            objectFit: "fill",
            opacity: (loading || !imageLoaded) ? 0 : 1,
            transition: 'opacity 0.15s ease-in-out',
            willChange: "opacity"
          }}
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      )}
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export const Logo = memo(LogoNavComponent);

// Logo.propTypes = {
//     type: PropTypes.oneOf(["icon"]),
//     colour: PropTypes.oneOf(["default"]),
//     onlyIcon: PropTypes.bool,
// };
export default Logo;
