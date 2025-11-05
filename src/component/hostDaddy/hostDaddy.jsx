// Site support chatbot, from DocsHound
// Only renders on HostBuddy domain (hostbuddy.ai) and localhost, hidden on white label domains
import React from 'react';
import { DocsHoundChat } from '@docshound/chat-react';
import { useWhiteLabelCss } from '../../helper/WhiteLabelCssContext';

const HostDaddy = () => {
  const { isHostBuddyDomain } = useWhiteLabelCss();
  
  // Check if running on localhost
  const currentHostname = window.location.hostname;
  const isLocalHost = currentHostname === 'localhost' || currentHostname === '127.0.0.1';
  
  // Only render on HostBuddy domain or localhost
  if (!isHostBuddyDomain && !isLocalHost) {
    return null;
  }

  /* Non-React version
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://userguide.hostbuddy.ai/-/chat.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <docshound-chat></docshound-chat>;
  */
  return <DocsHoundChat src="https://userguide.hostbuddy.ai" />;
};

export default HostDaddy;



