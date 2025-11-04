import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useWhiteLabelCss } from "../helper/WhiteLabelCssContext";
import ThankError from "../component/thankError/ThankError";
import ErrorImg from "../public/img/404.png";

/**
 * FeatureProtectedUnauthRoute - Protects unauthenticated routes (auth pages) based on white label feature settings
 * Works on white label domains without requiring authentication
 * 
 * @param {string} featureId - The feature ID to check (e.g., 'auth-pages')
 * @param {ReactNode} children - The component to render if feature is enabled
 * @param {string} redirectTo - Optional redirect path if feature is disabled (defaults to 404)
 */
const FeatureProtectedUnauthRoute = ({ featureId, children, redirectTo }) => {
  const location = useLocation();
  const { cssConfig, isHostBuddyDomain, loading } = useWhiteLabelCss();

  console.log("🔐 [UNAUTH FEATURE PROTECTION] Checking feature access", {
    featureId,
    pathname: location.pathname,
    isHostBuddyDomain,
    loading,
    hasConfig: !!cssConfig,
    timestamp: new Date().toISOString()
  });

  // On HostBuddy domain, all features are available
  if (isHostBuddyDomain) {
    console.log("✅ [UNAUTH FEATURE PROTECTION] HostBuddy domain - access granted", {
      featureId,
      timestamp: new Date().toISOString()
    });
    return children;
  }

  // While loading, show children (prevent flash of 404)
  if (loading) {
    console.log("⏳ [UNAUTH FEATURE PROTECTION] Loading feature settings...", {
      featureId,
      timestamp: new Date().toISOString()
    });
    return children;
  }

  // Check if feature settings exist
  let featuresSettings = cssConfig?.features_settings;
  
  // If it's an array, extract the first element (the actual features object)
  if (Array.isArray(featuresSettings) && featuresSettings.length > 0) {
    featuresSettings = featuresSettings[0];
  }
  
  // Ensure we have an object, fallback to empty object if not
  featuresSettings = featuresSettings || {};
  
  // If no feature settings found, allow access by default
  if (Object.keys(featuresSettings).length === 0) {
    console.log("⚠️ [UNAUTH FEATURE PROTECTION] No feature settings found - allowing access", {
      featureId,
      timestamp: new Date().toISOString()
    });
    return children;
  }

  // Check if the specific feature is enabled
  const feature = featuresSettings[featureId];
  
  if (!feature) {
    console.log("⚠️ [UNAUTH FEATURE PROTECTION] Feature not found in settings - allowing access", {
      featureId,
      availableFeatures: Object.keys(featuresSettings),
      timestamp: new Date().toISOString()
    });
    return children;
  }

  const isEnabled = feature.enabled !== false; // Default to true if not explicitly set to false

  if (!isEnabled) {
    console.log("❌ [UNAUTH FEATURE PROTECTION] Feature disabled - access denied", {
      featureId,
      feature,
      redirectTo,
      timestamp: new Date().toISOString()
    });
    
    // If redirect path is specified, redirect there
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
    
    // Otherwise show 404 page for disabled features
    return (
      <ThankError
        imgSrc={ErrorImg}
        text="This feature is not available"
      />
    );
  }

  console.log("✅ [UNAUTH FEATURE PROTECTION] Feature enabled - access granted", {
    featureId,
    timestamp: new Date().toISOString()
  });

  return children;
};

export default FeatureProtectedUnauthRoute;
