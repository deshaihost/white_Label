import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useWhiteLabelCss } from "../helper/WhiteLabelCssContext";
import ThankError from "../component/thankError/ThankError";
import ErrorImg from "../public/img/404.png";

/**
 * FeatureProtectedRoute - Protects routes based on white label feature settings
 * Only applies on white label domains (not hostbuddy.ai)
 * 
 * @param {string} featureId - The feature ID to check (e.g., 'properties', 'messaging-inbox')
 * @param {ReactNode} children - The component to render if feature is enabled
 */
const FeatureProtectedRoute = ({ featureId, children }) => {
  const location = useLocation();
  const { cssConfig, isHostBuddyDomain, loading } = useWhiteLabelCss();

  console.log("🔐 [FEATURE PROTECTION] Checking feature access", {
    featureId,
    pathname: location.pathname,
    isHostBuddyDomain,
    loading,
    hasConfig: !!cssConfig,
    timestamp: new Date().toISOString()
  });

  // On HostBuddy domain, all features are available
  if (isHostBuddyDomain) {
    console.log("✅ [FEATURE PROTECTION] HostBuddy domain - access granted", {
      featureId,
      timestamp: new Date().toISOString()
    });
    return children;
  }

  // While loading, show children (or you could show a loading spinner)
  if (loading) {
    console.log("⏳ [FEATURE PROTECTION] Loading feature settings...", {
      featureId,
      timestamp: new Date().toISOString()
    });
    return children; // Show content while loading
  }

  // Check if feature settings exist
  const featuresSettings = cssConfig?.features_settings || {};
  
  // If no feature settings found, allow access by default
  if (Object.keys(featuresSettings).length === 0) {
    console.log("⚠️ [FEATURE PROTECTION] No feature settings found - allowing access", {
      featureId,
      timestamp: new Date().toISOString()
    });
    return children;
  }

  // Check if the specific feature is enabled
  const feature = featuresSettings[featureId];
  
  if (!feature) {
    console.log("⚠️ [FEATURE PROTECTION] Feature not found in settings - allowing access", {
      featureId,
      availableFeatures: Object.keys(featuresSettings),
      timestamp: new Date().toISOString()
    });
    return children;
  }

  const isEnabled = feature.enabled !== false; // Default to true if not explicitly set to false

  if (!isEnabled) {
    console.log("❌ [FEATURE PROTECTION] Feature disabled - access denied", {
      featureId,
      feature,
      timestamp: new Date().toISOString()
    });
    
    // Show 404 page for disabled features
    return (
      <ThankError
        imgSrc={ErrorImg}
        text="This feature is not available on your plan"
      />
    );
  }

  console.log("✅ [FEATURE PROTECTION] Feature enabled - access granted", {
    featureId,
    timestamp: new Date().toISOString()
  });

  return children;
};

export default FeatureProtectedRoute;
