import { useWhiteLabelCss } from './WhiteLabelCssContext';

/**
 * Hook to check if features are enabled based on white label settings
 * Returns helper functions for feature availability checks
 */
export const useFeatureAccess = () => {
  const { cssConfig, isHostBuddyDomain } = useWhiteLabelCss();

  /**
   * Check if a specific feature is enabled
   * @param {string} featureId - The feature ID to check
   * @returns {boolean} - True if feature is enabled or on HostBuddy domain
   */
  const isFeatureEnabled = (featureId) => {
    // On HostBuddy domain, all features are available
    if (isHostBuddyDomain) {
      return true;
    }

    // Check if feature settings exist
    // Note: features_settings comes from API as arrays: [features_object, status_code]
    let featuresSettings = cssConfig?.features_settings;
    
    // If it's an array, extract the first element (the actual features object)
    if (Array.isArray(featuresSettings) && featuresSettings.length > 0) {
      featuresSettings = featuresSettings[0];
    }
    
    // Ensure we have an object, fallback to empty object if not
    featuresSettings = featuresSettings || {};

    // If no feature settings found, allow access by default
    if (Object.keys(featuresSettings).length === 0) {
      return true;
    }

    // Check if the specific feature is enabled
    const feature = featuresSettings[featureId];
    
    // If feature not found in settings, allow access by default
    if (!feature) {
      console.log('⚠️ [FEATURE ACCESS] Feature not found in settings - defaulting to ALLOW: ' + featureId);
      return true;
    }

    // Default to true if not explicitly set to false
    return feature.enabled !== false;
  };

  /**
   * Get all enabled features
   * @returns {Object} - Object with feature IDs as keys and enabled status as values
   */
  const getAllFeatures = () => {
    if (isHostBuddyDomain) {
      // On HostBuddy domain, return all features as enabled
      return {
        'properties': { enabled: true },
        'property-profile': { enabled: true },
        'smart-templates': { enabled: true },
        'upsells': { enabled: true },
        'messaging-inbox': { enabled: true },
        'action-items': { enabled: true },
        'insights': { enabled: true },
        'action-item-settings': { enabled: true },
        'integrations': { enabled: true },
      };
    }

    return cssConfig?.features_settings || {};
  };

  /**
   * Check if features are currently loading
   * @returns {boolean}
   */
  const isFeaturesLoading = () => {
    return !isHostBuddyDomain && !cssConfig;
  };

  return {
    isFeatureEnabled,
    getAllFeatures,
    isFeaturesLoading,
    isHostBuddyDomain,
  };
};

export default useFeatureAccess;
