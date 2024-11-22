import React from "react";
import CopyableCode from "./copyableCode";

const widgetClosedImg = 'https://hostbuddylb.com/embed-doc/widget_closed.webp';
const widgetOpenImg = 'https://hostbuddylb.com/embed-doc/widget_open.webp';

const WidgetEmbedContent = ({ chatbotKey }) => {
  return (
    <div className="embed-modal-content">
      <h2>Embed a HostBuddy Popup Chat Widget On Your Website</h2>
      <div className='embed-modal-section' style={{marginTop:'10px'}}>
        <div className="widget-preview-images">
          <div>
            <img src={widgetClosedImg} alt="Widget closed" style={{maxWidth: '100%'}} />
            <p className="image-caption">Widget Closed</p>
          </div>
          <div>
            <img src={widgetOpenImg} alt="Widget open" style={{maxWidth: '100%'}} />
            <p className="image-caption">Widget Open</p>
          </div>
        </div>
        <p>
          <h4>
            Copy and paste the following code into your website:
          </h4>
        </p>
        <p>
          <strong>
            1: Configuration script. Add this script in the body of your page, after the above container div. Set your desired parameters to customize the appearance of the chat window.
          </strong>
        </p>
        <CopyableCode>{`<script>
window.chatWidgetOptions = {
  chatbot_key: '${chatbotKey}', // This is the chatbot key for your selected property

  // Widget appearance
  buttonImg: 'https://hostbuddylb.com/logo/logoNoText.webp',  // Optional
  buttonBackgroundColor: '#222222',
  buttonTextColor: '#ffffff',
  buttonText: 'Chat with us',
  headerText: 'Chat with our AI assistant',

  // Window dimensions when opened
  width: '400px',
  height: '800px',

  // Chat window customization
  userMsgBubbleColor: '#0084ff',
  userMsgTextColor: '#ffffff',
  botMsgBubbleColor: '#ffffff',
  botMsgTextColor: '#000000',
  chatWindowBackgroundColor: '#222222',
  inputBoxBackgroundColor: '#ffffff',
  inputBarTextColor: '#000000',
  sendButtonColor: '#0084ff',
  sendButtonTextColor: '#ffffff',
  bot_img: 'https://hostbuddylb.com/logo/logoNoText.webp'  // Optional
};
</script>`}</CopyableCode>
        <p>
          <strong>
            2: Loader script. Add this script in the body of your page, after the above configuration script.
          </strong>
        </p>
        <CopyableCode>{`<script src="https://storage.googleapis.com/frontend_media/embedded-chat/loaderWidget.js"></script>`}</CopyableCode>
        <p>
          That's it! Your chat widget should now be live on your website and connected to this HostBuddy property. Keep reading to learn how to style the widget to match your site's design.
        </p>
      </div>

      <div className='embed-modal-section'>
        <h2>Appearance Customization</h2>
        <p style={{marginBottom:'20px'}}>You can customize the appearance of both the chat widget (when minimized) and the chat window (when opened) by setting the respective parameters in the configuration script.</p>
        <p>Available Options:</p>
        <ul>
          <li style={{marginTop:'10px'}}>
            <strong>Required configuration:</strong>
            <ul>
              <li><code>chatbot_key</code>: Your unique chatbot key</li>
            </ul>
          </li>
          <li style={{marginTop:'18px'}}>
            <strong>Widget appearance:</strong>
            <ul>
              <li><code>buttonImg</code>: URL to an image to be displayed on the minimized chat widget (optional)</li>
              <li><code>buttonBackgroundColor</code>: Color of the minimized chat widget</li>
              <li><code>buttonTextColor</code>: Color of text on the minimized chat widget</li>
              <li><code>buttonText</code>: Text displayed on the minimized chat widget</li>
              <li><code>headerText</code>: Text displayed in the chat window header</li>
            </ul>
          </li>
          <li style={{marginTop:'18px'}}>
            <strong>Window dimensions:</strong>
            <ul>
              <li><code>width</code>: Width of the chat window when opened</li>
              <li><code>height</code>: Height of the chat window when opened</li>
            </ul>
          </li>
          <li style={{marginTop:'18px'}}>
            <strong>Chat window customization:</strong>
            <ul>
              <li><code>userMsgBubbleColor</code>: Color of user message bubbles</li>
              <li><code>userMsgTextColor</code>: Color of user message text</li>
              <li><code>botMsgBubbleColor</code>: Color of bot message bubbles</li>
              <li><code>botMsgTextColor</code>: Color of bot message text</li>
              <li><code>chatWindowBackgroundColor</code>: Main chat window background</li>
              <li><code>inputBoxBackgroundColor</code>: Color of message input box</li>
              <li><code>inputBarTextColor</code>: Color of text in input bar</li>
              <li><code>sendButtonColor</code>: Color of the send button</li>
              <li><code>sendButtonTextColor</code>: Color of text on send button</li>
              <li><code>bot_img</code>: URL of an image to be displayed next to each bot message (optional)</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WidgetEmbedContent;