// Site support chatbot, from DocsHound
import React from 'react';
import { DocsHoundChat } from '@docshound/chat-react';

const HostDaddy = () => {
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