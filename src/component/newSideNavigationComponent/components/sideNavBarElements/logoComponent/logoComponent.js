import PropTypes from "prop-types";
import React, { useState, useEffect, memo } from "react";
import icon from "../sectionIndicatorComponent/navIcons/NewLogoCollapse.svg";
import useWhiteLabelBranding from "../../../../../helper/useWhiteLabelBranding";
import { useWhiteLabelLogos } from "../../../../../helper/WhiteLabelLogoContext";
import "./logoComponent.css";

const LogoComponent = ({ type, colour, onlyIcon }) => {
    const { isWhiteLabel, brandName } = useWhiteLabelBranding();
    const { logo, fullLogo, loading, isHostBuddyDomain } = useWhiteLabelLogos();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    // Determine which logo to use
    const logoSrc = isHostBuddyDomain ? icon : (logo || icon);
    
    // Track component mount/unmount
    useEffect(() => {
        console.log('🔵 [LOGO COMPONENT - Collapsed] Component mounted', {
            onlyIcon,
            loading,
            isHostBuddyDomain,
            hasLogo: !!logo,
            timestamp: new Date().toISOString()
        });
        
        return () => {
            console.log('🔴 [LOGO COMPONENT - Collapsed] Component unmounted', {
                timestamp: new Date().toISOString()
            });
        };
    }, []);
    
    // Preload and decode image when logo URL changes
    useEffect(() => {
        if (logoSrc) {
            const loadStart = performance.now();
            console.log('⏳ [LOGO COMPONENT - Collapsed] Starting image load...', {
                logoSrc: logoSrc.substring(0, 60) + (logoSrc.length > 60 ? '...' : ''),
                isLocalIcon: logoSrc === icon,
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
                console.log('✅ [LOGO COMPONENT - Collapsed] Image downloaded', {
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
                            console.log('🎨 [LOGO COMPONENT - Collapsed] Image decoded and ready to render', {
                                decodeTime: `${decodeElapsed.toFixed(2)}ms`,
                                totalTime: `${totalElapsed.toFixed(2)}ms`,
                                timestamp: new Date().toISOString()
                            });
                            setImageLoaded(true);
                        })
                        .catch(() => {
                            console.warn('⚠️ [LOGO COMPONENT - Collapsed] Decode failed, showing anyway');
                            setImageLoaded(true);
                        });
                } else {
                    console.log('ℹ️ [LOGO COMPONENT - Collapsed] Decode API not supported, showing image', {
                        totalTime: `${loadElapsed.toFixed(2)}ms`
                    });
                    setImageLoaded(true);
                }
            };
            
            img.onerror = () => {
                const errorElapsed = performance.now() - loadStart;
                console.error('❌ [LOGO COMPONENT - Collapsed] Image load error', {
                    logoSrc: logoSrc.substring(0, 60) + '...',
                    errorTime: `${errorElapsed.toFixed(2)}ms`,
                    timestamp: new Date().toISOString()
                });
                setImageError(true);
                setImageLoaded(true); // Show fallback
            };
            
            img.src = logoSrc;
        }
    }, [logoSrc]);
    
    // Track when image actually renders (becomes visible)
    useEffect(() => {
        if (imageLoaded && !loading) {
            console.log('👁️ [LOGO COMPONENT - Collapsed] Image now VISIBLE to user', {
                onlyIcon,
                timestamp: new Date().toISOString()
            });
        }
    }, [imageLoaded, loading, onlyIcon]);
    
    // For collapsed navigation, show the small logo (40x40)
    if (onlyIcon) {
        return (
            <div className="logo-container" style={{ willChange: 'opacity' }}>
                {(loading || !imageLoaded) && (
                    <div 
                        className="logo-skeleton"
                        style={{
                            width: '40px',
                            height: '40px',
                            position: 'absolute',
                            borderRadius: '4px'
                        }}
                    />
                )}
                <img 
                    className="logo-icon" 
                    alt={`${brandName} Icon`} 
                    src={logoSrc}
                    style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain',
                        opacity: (loading || !imageLoaded) ? 0 : 1,
                        transition: 'opacity 0.15s ease-in-out',
                        willChange: 'opacity'
                    }}
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                />
            </div>
        );
    }
    
    // For expanded navigation, show branding text
    return (
        <div className="logo-container" style={{ willChange: 'opacity' }}>
            {(loading || !imageLoaded) && (
                <div 
                    className="logo-skeleton"
                    style={{
                        width: '40px',
                        height: '40px',
                        position: 'absolute',
                        borderRadius: '4px'
                    }}
                />
            )}
            <img 
                className="logo-icon" 
                alt={`${brandName} Icon`} 
                src={logoSrc}
                style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain',
                    opacity: (loading || !imageLoaded) ? 0 : 1,
                    transition: 'opacity 0.15s ease-in-out',
                    willChange: 'opacity'
                }}
                loading="eager"
                fetchpriority="high"
                decoding="async"
            />
            <span className="logo-text" style={{
                opacity: (loading || !imageLoaded) ? 0 : 1,
                transition: 'opacity 0.15s ease-in-out',
                willChange: 'opacity'
            }}>
                {brandName} AI
            </span>
        </div>
    );
};

// Memoize to prevent unnecessary re-renders
export const Logo = memo(LogoComponent);

Logo.propTypes = {
    type: PropTypes.oneOf(["icon"]),
    colour: PropTypes.oneOf(["default"]),
    onlyIcon: PropTypes.bool,
};
export default Logo;