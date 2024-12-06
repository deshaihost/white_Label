// Site support chatbot, from DocsHound
import React, { useEffect } from 'react';

const HostDaddy = () => {
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
};

export default HostDaddy;