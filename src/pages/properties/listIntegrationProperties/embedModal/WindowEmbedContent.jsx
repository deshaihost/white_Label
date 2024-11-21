
import React from "react";
import CopyableCode from "./copyableCode";

const WindowEmbedContent = ({ chatbotKey }) => {
  return (
    <div className="embed-modal-content">
      <div className='embed-modal-section' style={{marginTop:'10px'}}>
        <h2>Copy and paste the following code into your website to embed a HostBuddy chat window:</h2>
        <p>
          <strong>
            1: Container div. Add this to your page wherever you want the chat window to appear. The chat window will fill the dimensions of this div, so you can adjust the height and width parameters here to control sizing.
          </strong>
        </p>
        <CopyableCode>{`<div id="hostbuddy-embed-target" style="width: 400px; height: 600px;"></div>`}</CopyableCode>
        <p>
          <strong>
            2: Configuration script. Add this script in the body of your page, after the above container div. Set your desired parameters to customize the appearance of the chat window.
          </strong>
        </p>
        <CopyableCode>{`<script>
  window.chatWindowOptions = {
    // Required configuration
    chatbot_key: '${chatbotKey}', // This is the chatbot key for your selected property

    // Optional appearance customization
    userMsgBubbleColor: '#dcf8c6',
    userMsgTextColor: '#000000',
    botMsgBubbleColor: '#ffffff',
    botMsgTextColor: '#000000',
    chatWindowBackgroundColor: '#e5ddd5',
    inputBoxBackgroundColor: '#ffffff',
    inputBarTextColor: '#000000',
    sendButtonColor: '#0084ff',
    sendButtonTextColor: '#ffffff',
    bot_img: 'https://www.hostbuddy.ai/static/media/logoGraphicOnlySquare.3250db87b6a576ab347a.webp'
  };
  </script>`}</CopyableCode>
        <p>
          <strong>
            3: Loader script. Add this script in the body of your page, after the above configuration script.
          </strong>
        </p>
        <CopyableCode>{`<script src="https://storage.googleapis.com/frontend_media/embedded-chat/loader.js"></script>`}</CopyableCode>
        <p>
          That's it! Your chat window should now be live on your website and connected to this HostBuddy property. Keep reading to learn how to style the chat window to match your site's design.
        </p>
      </div>

      <div className='embed-modal-section'>
        <h2>Appearance Customization</h2>
        <p style={{marginBottom:'20px'}}>You can customize the appearance of the chat window by setting the following parameters in the configuration script. All values are optional (meaning: if you don't specify a parameter, a default value will be used).</p>
        <p style={{marginBottom:'20px'}}>The bot image (bot_img) is the "sender" image that appears next to each bot message. It is also optional - if you don't include anything here, then no image will be displayed.</p>
        <p>Available Options:</p>
        <ul>
          <li>
            <code>userMsgBubbleColor</code>: Color of user message bubbles
          </li>
          <li>
            <code>userMsgTextColor</code>: Color of user message text
          </li>
          <li>
            <code>botMsgBubbleColor</code>: Color of bot message bubbles
          </li>
          <li>
            <code>botMsgTextColor</code>: Color of bot message text
          </li>
          <li>
            <code>chatWindowBackgroundColor</code>: Main chat window background
          </li>
          <li>
            <code>inputBoxBackgroundColor</code>: Color of message input box
          </li>
          <li>
            <code>inputBarTextColor</code>: Color of text in input bar
          </li>
          <li>
            <code>sendButtonColor</code>: Color of the send button
          </li>
          <li>
            <code>sendButtonTextColor</code>: Color of text on send button
          </li>
          <li>
            <code>chatbot_key</code>: Your unique chatbot key
          </li>
          <li>
            <code>bot_img</code>: URL to an image that appears next to bot
            messages
          </li>
        </ul>
      </div>

      <div className='embed-modal-section'>
        <h2>Example Style Configurations</h2>
        <p>
          <strong>1. Basic Setup (Default Appearance):</strong>
        </p>
        <CopyableCode>{`window.chatWindowOptions = {
    chatbot_key: '${chatbotKey}', // This is the chatbot key for your selected property. It is always required.
};`}</CopyableCode>
        <p>
          <strong>2. Custom Colors:</strong>
        </p>
        <CopyableCode>{`window.chatWindowOptions = {
    chatbot_key: '${chatbotKey}',
    userMsgBubbleColor: '#e3f2fd',
    botMsgBubbleColor: '#f5f5f5',
    chatWindowBackgroundColor: '#ffffff'
  };`}</CopyableCode>
        <p>
          <strong>3. Full Customization:</strong>
        </p>
        <CopyableCode>{`window.chatWindowOptions = {
    chatbot_key: '${chatbotKey}',
    userMsgBubbleColor: '#dcf8c6',
    userMsgTextColor: '#000000',
    botMsgBubbleColor: '#ffffff',
    botMsgTextColor: '#000000',
    chatWindowBackgroundColor: '#e5ddd5',
    inputBoxBackgroundColor: '#ffffff',
    inputBarTextColor: '#000000',
    sendButtonColor: '#0084ff',
    sendButtonTextColor: '#ffffff',
    bot_img: 'https://example.com/bot-avatar.png'  // Optional bot image URL
  };`}</CopyableCode>
      </div>
    </div>
  );
};

export default WindowEmbedContent;