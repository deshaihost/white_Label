import React from "react";
import { Navigate } from "react-router-dom";
import { useWhiteLabelCss } from "../helper/WhiteLabelCssContext";
import ThankError from "../component/thankError/ThankError";
import ErrorImg from "../public/img/404.png";

/**
 * HostBuddyOnlyRoute - Protects routes that should only be accessible on hostbuddy.ai
 * Shows 404 or redirects on white label domains
 * 
 * Use this for landing pages, marketing pages, and content that should only 
 * appear on the HostBuddy domain (e.g., home, pricing, blog, about, etc.)
 * 
 * @param {ReactNode} children - The component to render if on HostBuddy domain
 * @param {string} redirectTo - Optional path to redirect to instead of showing 404
 * @param {boolean} blockLocalHost - If true, blocks localhost access (default: false, allowing localhost)
 */
const HostBuddyOnlyRoute = ({ children, redirectTo, blockLocalHost = false }) => {
  const { isHostBuddyDomain, loading } = useWhiteLabelCss();
  
  // Check if current hostname is localhost
  const currentHostname = window.location.hostname;
  const isLocalHost = currentHostname === 'localhost' || currentHostname === '127.0.0.1';

  console.log("🔐 [HOSTBUDDY ONLY] Checking domain access", {
    isHostBuddyDomain,
    isLocalHost,
    blockLocalHost,
    currentHostname,
    loading,
    timestamp: new Date().toISOString()
  });

  // While loading, show children to avoid flash
  if (loading) {
    return children;
  }
  
  // Allow localhost access unless explicitly blocked
  if (isLocalHost && !blockLocalHost) {
    console.log("✅ [HOSTBUDDY ONLY] Access granted - localhost (not blocked)");
    return children;
  }

  // If not HostBuddy domain (and not allowed localhost), redirect or show 404
  if (!isHostBuddyDomain) {
    console.log("❌ [HOSTBUDDY ONLY] Access denied - not on HostBuddy domain");
    
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
    
    return (
      <ThankError
        imgSrc={ErrorImg}
        text="This page is only available on HostBuddy.ai"
      />
    );
  }

  console.log("✅ [HOSTBUDDY ONLY] Access granted - rendering content");
  return children;
};

export default HostBuddyOnlyRoute;
