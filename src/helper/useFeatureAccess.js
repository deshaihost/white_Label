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
    const featuresSettings = cssConfig?.features_settings || {};
    
    // If no feature settings found, allow access by default
    if (Object.keys(featuresSettings).length === 0) {
      return true;
    }

    // Check if the specific feature is enabled
    const feature = featuresSettings[featureId];
    
    // If feature not found in settings, allow access by default
    if (!feature) {
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
