// A utility module for managing AbortController instances for API calls
// This helps cancel in-flight requests when a user rapidly switches conversations

// Store AbortController instances by conversation ID and request type
const abortControllers = {
  // Structure: { [conversationId]: { [requestType]: AbortController } }
};

/**
 * Creates a new AbortController for a specific conversation and request type
 * @param {string} conversationId - The conversation ID
 * @param {string} requestType - Type of request (e.g., 'fetch', 'notes', 'message')
 * @returns {AbortController} The new AbortController instance
 */
export const createAbortController = (conversationId, requestType) => {
  // Cancel any existing request of the same type for this conversation
  if (abortControllers[conversationId]?.[requestType]) {
    abortControllers[conversationId][requestType].abort();
  }

  // Initialize the structure if needed
  if (!abortControllers[conversationId]) {
    abortControllers[conversationId] = {};
  }

  // Create a new AbortController
  const controller = new AbortController();
  abortControllers[conversationId][requestType] = controller;
  
  return controller;
};

/**
 * Gets the existing AbortController's signal or creates a new one
 * @param {string} conversationId - The conversation ID
 * @param {string} requestType - Type of request
 * @returns {AbortSignal} The AbortSignal to use with the request
 */
export const getAbortSignal = (conversationId, requestType) => {
  if (!conversationId || !requestType) {
    return null;
  }
  
  return createAbortController(conversationId, requestType).signal;
};

/**
 * Cancels all requests for a specific conversation
 * @param {string} conversationId - The conversation ID
 */
export const abortAllForConversation = (conversationId) => {
  if (abortControllers[conversationId]) {
    Object.values(abortControllers[conversationId]).forEach(controller => {
      if (controller && !controller.signal.aborted) {
        controller.abort();
      }
    });
    
    // Clean up
    delete abortControllers[conversationId];
  }
};

/**
 * Cancels all requests of a specific type across all conversations
 * @param {string} requestType - Type of request
 */
export const abortAllByType = (requestType) => {
  Object.keys(abortControllers).forEach(conversationId => {
    if (abortControllers[conversationId][requestType]) {
      abortControllers[conversationId][requestType].abort();
      delete abortControllers[conversationId][requestType];
    }
  });
};

/**
 * Cleans up all abort controllers
 */
export const cleanupAllAbortControllers = () => {
  Object.keys(abortControllers).forEach(conversationId => {
    abortAllForConversation(conversationId);
  });
};

/**
 * Handles conversation change by aborting previous conversation's requests
 * @param {string} previousConversationId - The previous conversation ID
 * @param {string} newConversationId - The new conversation ID
 */
function handleConversationChange(previousConversationId, newConversationId) {
  // If there was a previous conversation, abort all its requests
  if (previousConversationId && previousConversationId !== newConversationId) {
    abortAllForConversation(previousConversationId);
  }
}

// Export at the end of the file to avoid potential hoisting issues
export { handleConversationChange }
