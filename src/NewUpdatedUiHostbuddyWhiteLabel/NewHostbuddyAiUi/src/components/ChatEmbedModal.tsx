import { X, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import windowEmbedImage from 'figma:asset/59d5429d8fbb3460330ab263f490fa7b93ae1f79.png';
import widgetEmbedImage from 'figma:asset/c1fb4d004d856559a65da7564e90a0da26e30993.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { showSaveSuccess } from './useSaveNotification';

interface ChatEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
}

export function ChatEmbedModal({ isOpen, onClose, propertyName }: ChatEmbedModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const chatbotKey = 'f7b1cb688578';

  const handleCopy = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    showSaveSuccess('Code copied to clipboard');
  };

  const CodeBlock = ({ code, index }: { code: string; index: string }) => (
    <div className="relative bg-[#17191f] border border-[#013280] rounded-lg p-4 pr-12">
      <pre className="text-[#d0d3db] text-[13px] font-['Courier_New',_monospace] overflow-x-auto whitespace-pre-wrap break-all">
        {code}
      </pre>
      <button
        onClick={() => handleCopy(code, index)}
        className="absolute top-3 right-3 p-2 rounded-lg bg-[#0F1117] border border-[#013280] hover:bg-[#1a1f2e] transition-colors"
      >
        {copiedIndex === index ? (
          <Check className="w-4 h-4 text-[#3e88f7]" />
        ) : (
          <Copy className="w-4 h-4 text-[#a6a9b2]" />
        )}
      </button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[2000px] max-h-[90vh] overflow-y-auto bg-[#0F1117] border-2 border-[#013280] p-0">
        <DialogTitle className="sr-only">Embed HostBuddy Into Your Website</DialogTitle>
        <DialogDescription className="sr-only">
          Get the chat link or embed code for your property chatbot. Choose between window embed, widget embed, or a direct chat link.
        </DialogDescription>
        
        {/* Header */}
        <div className="sticky top-0 bg-[#0F1117] border-b border-[#013280] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-white text-[20px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Embed HostBuddy Into Your Website
            </h2>
            <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-1" style={{ fontVariationSettings: "'opsz' 14" }}>
              Chatbot key for this property: {chatbotKey}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#a6a9b2] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="window" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-transparent border-b border-[#013280] rounded-none h-auto p-0">
            <TabsTrigger
              value="window"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3e88f7] data-[state=active]:bg-transparent bg-transparent text-[#a6a9b2] data-[state=active]:text-white px-6 py-3 text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Window Embed
            </TabsTrigger>
            <TabsTrigger
              value="widget"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3e88f7] data-[state=active]:bg-transparent bg-transparent text-[#a6a9b2] data-[state=active]:text-white px-6 py-3 text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Widget Embed
            </TabsTrigger>
            <TabsTrigger
              value="link"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3e88f7] data-[state=active]:bg-transparent bg-transparent text-[#a6a9b2] data-[state=active]:text-white px-6 py-3 text-[14px] font-['DM_Sans:SemiBold',_sans-serif]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Chatbot Link
            </TabsTrigger>
          </TabsList>

          {/* Window Embed Tab */}
          <TabsContent value="window" className="px-6 py-6 space-y-6">
            <div>
              <h3 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Embed a HostBuddy Chat Window On Your Website
              </h3>
              
              {/* Example Image */}
              <div className="mb-6">
                <ImageWithFallback src={windowEmbedImage} alt="Chat Window Example" className="w-full rounded-lg border border-[#013280]" />
              </div>

              <h4 className="text-[#d0d3db] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Copy and paste the following code into your website:
              </h4>

              <div className="space-y-6">
                {/* Step 1 */}
                <div>
                  <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    1. Container div. Add this to your page wherever you want the chat window to appear. The chat window will fill the dimensions of this div, so you can adjust the height and width parameters here to control sizing.
                  </p>
                  <CodeBlock
                    code={`<div id="hostbuddy-embed-target" style="width: 400px; height: 600px;"></div>`}
                    index="window-1"
                  />
                </div>

                {/* Step 2 */}
                <div>
                  <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    2. Configuration script. Add this script in the body of your page, after the above container div. Set your desired parameters to customize the appearance of the chat window.
                  </p>
                  <CodeBlock
                    code={`<script>
  window.chatWindowOptions = {
    // Required configuration
    chatbot_key: '${chatbotKey}', // This is the chatbot key for your selected property

    // Optional appearance customization
    userMsgBubbleColor: '#4a90e2',
    userMsgTextColor: '#FFF',
    botMsgBubbleColor: '#2c3e50',
    botMsgTextColor: '#FFF',
    chatWindowBackgroundColor: '#1a1a1a',
    inputBoxBackgroundColor: '#333',
    inputBarTextColor: '#CCC',
    sendButtonColor: '#4a90e2',
    sendButtonTextColor: '#FFF',
    bot_img: 'https://hostbuddylb.com/logo/logoNoText.webp'
  };
</script>`}
                    index="window-2"
                  />
                </div>

                {/* Step 3 */}
                <div>
                  <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    3. Loader script. Add this script in the body of your page, after the above configuration script.
                  </p>
                  <CodeBlock
                    code={`<script src="https://storage.googleapis.com/frontend_media/embedded-chat/loader.js"></script>`}
                    index="window-3"
                  />
                </div>

                <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  That's it! Your chat window should now be live on your website and connected to this HostBuddy property. Keep reading to learn how to style the chat window to match your site's design.
                </p>
              </div>

              {/* Appearance Customization */}
              <div className="mt-8">
                <h4 className="text-[#d0d3db] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Appearance Customization
                </h4>
                <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                  You can customize the appearance of the chat window by setting the following parameters in the configuration script. All values are optional (meaning: if you don't specify a parameter, a default value will be used).
                </p>
                <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                  The bot image (bot_img) is the "sender" image that appears next to each bot message. It is also optional - if you don't include anything here, then no image will be displayed.
                </p>

                <div className="bg-[#17191f] border border-[#013280] rounded-lg p-4 mb-4">
                  <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Available Options:
                  </p>
                  <ul className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] space-y-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <li>• userMsgBubbleColor: Color of user message bubbles</li>
                    <li>• userMsgTextColor: Color of user message text</li>
                    <li>• botMsgBubbleColor: Color of bot message bubbles</li>
                    <li>• botMsgTextColor: Color of bot message text</li>
                    <li>• chatWindowBackgroundColor: Main chat window background</li>
                    <li>• inputBoxBackgroundColor: Color of message input box</li>
                    <li>• inputBarTextColor: Color of text in input bar</li>
                    <li>• sendButtonColor: Color of the send button</li>
                    <li>• sendButtonTextColor: Color of text on send button</li>
                    <li>• chatbot_key: Your unique chatbot key</li>
                    <li>• bot_img: URL to an image that appears next to bot messages</li>
                  </ul>
                </div>

                <h5 className="text-[#d0d3db] text-[15px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Example Style Configurations
                </h5>

                <div className="space-y-4">
                  <div>
                    <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      1. Basic Setup (Default Appearance):
                    </p>
                    <CodeBlock
                      code={`window.chatWindowOptions = {
    chatbot_key: '${chatbotKey}', // This is the chatbot key for your selected property. It is always required.
};`}
                      index="window-ex1"
                    />
                  </div>

                  <div>
                    <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      2. Custom Colors:
                    </p>
                    <CodeBlock
                      code={`window.chatWindowOptions = {
    chatbot_key: '${chatbotKey}',
    userMsgBubbleColor: '#4a90e2',
    botMsgBubbleColor: '#2c3e50',
    chatWindowBackgroundColor: '#1a1a1a',
};`}
                      index="window-ex2"
                    />
                  </div>

                  <div>
                    <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      3. Full Customization:
                    </p>
                    <CodeBlock
                      code={`window.chatWindowOptions = {
    chatbot_key: '${chatbotKey}',
    userMsgBubbleColor: '#4a90e2',
    userMsgTextColor: '#FFF',
    botMsgBubbleColor: '#2c3e50',
    botMsgTextColor: '#FFF',
    chatWindowBackgroundColor: '#1a1a1a',
    inputBoxBackgroundColor: '#333',
    inputBarTextColor: '#CCC',
    sendButtonColor: '#4a90e2',
    sendButtonTextColor: '#FFF',
    bot_img: 'https://hostbuddylb.com/logo/logoNoText.webp'
};`}
                      index="window-ex3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Widget Embed Tab */}
          <TabsContent value="widget" className="px-6 py-6 space-y-6">
            <div>
              <h3 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Embed a HostBuddy Popup Chat Widget On Your Website
              </h3>

              {/* Example Image */}
              <div className="mb-6">
                <ImageWithFallback src={widgetEmbedImage} alt="Chat Widget Example" className="w-full rounded-lg border border-[#013280]" />
              </div>

              <h4 className="text-[#d0d3db] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Copy and paste the following code into your website:
              </h4>

              <div className="space-y-6">
                {/* Step 1 */}
                <div>
                  <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    1. Configuration script. Add this script in the body of your page, after the above container div. Set your desired parameters to customize the appearance of the chat window.
                  </p>
                  <CodeBlock
                    code={`<script>
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
  chatWindowHeaderBackground: '#0084ff',
  chatWindowHeaderTextColor: '#ffffff',
  bot_img: 'https://hostbuddylb.com/logo/logoNoText.webp'  // Optional
};
</script>`}
                    index="widget-1"
                  />
                </div>

                {/* Step 2 */}
                <div>
                  <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    2. Loader script. Add this script in the body of your page, after the above configuration script.
                  </p>
                  <CodeBlock
                    code={`<script src="https://storage.googleapis.com/frontend_media/embedded-chat/loaderWidget.js"></script>`}
                    index="widget-2"
                  />
                </div>

                <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  That's it! Your chat widget should now be live on your website and connected to this HostBuddy property. Keep reading to learn how to style the widget to match your site's design.
                </p>
              </div>

              {/* Appearance Customization */}
              <div className="mt-8">
                <h4 className="text-[#d0d3db] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Appearance Customization
                </h4>
                <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                  You can customize the appearance of both the chat widget (when minimized) and the chat window (when opened) by setting the respective parameters in the configuration script.
                </p>

                <div className="bg-[#17191f] border border-[#013280] rounded-lg p-4 mb-4">
                  <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Available Options:
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-[#d0d3db] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Required configuration:
                      </p>
                      <ul className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] space-y-1 ml-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                        <li>• chatbot_key: Your unique chatbot key</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-[#d0d3db] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Widget appearance:
                      </p>
                      <ul className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] space-y-1 ml-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                        <li>• buttonImg: URL to an image to be displayed on the minimized chat widget (optional)</li>
                        <li>• buttonBackgroundColor: Color of the minimized chat widget</li>
                        <li>• buttonTextColor: Color of text on the minimized chat widget</li>
                        <li>• buttonText: Text displayed on the minimized chat widget</li>
                        <li>• headerText: Text displayed in the chat window header</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-[#d0d3db] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Window dimensions:
                      </p>
                      <ul className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] space-y-1 ml-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                        <li>• width: Width of the chat window when opened</li>
                        <li>• height: Height of the chat window when opened</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-[#d0d3db] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Chat window customization:
                      </p>
                      <ul className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] space-y-1 ml-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                        <li>• userMsgBubbleColor: Color of user message bubbles</li>
                        <li>• userMsgTextColor: Color of user message text</li>
                        <li>• botMsgBubbleColor: Color of bot message bubbles</li>
                        <li>• botMsgTextColor: Color of bot message text</li>
                        <li>• chatWindowBackgroundColor: Main chat window background</li>
                        <li>• inputBoxBackgroundColor: Color of message input box</li>
                        <li>• inputBarTextColor: Color of text in input bar</li>
                        <li>• sendButtonColor: Color of the send button</li>
                        <li>• sendButtonTextColor: Color of text on send button</li>
                        <li>• chatWindowHeaderBackground: Background color of the chat window header bar</li>
                        <li>• chatWindowHeaderTextColor: Color of the text in the chat window header bar</li>
                        <li>• bot_img: URL of an image to be displayed next to each bot message (optional)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Chatbot Link Tab */}
          <TabsContent value="link" className="px-6 py-6 space-y-6">
            <div>
              <h3 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Share a HostBuddy Chat Link With Your Guests
              </h3>

              {/* Example Image */}
              <div className="mb-6">
                <ImageWithFallback src="https://images.unsplash.com/photo-1614680376739-414d95ff43df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwaW50ZXJmYWNlJTIwYmx1ZXxlbnwxfHx8fDE3NjA2NjY3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Chat Link Preview" className="w-full rounded-lg border border-[#013280]" />
              </div>

              <h4 className="text-[#d0d3db] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Your HostBuddy Chat Link:
              </h4>

              <div className="space-y-6">
                <div>
                  <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                    This is a link to a HostBuddy chat window for this property that you can share with your guests. Simply copy the link below and send it to your guests via email, text message, or any other communication method.
                  </p>

                  <div className="relative bg-[#17191f] border border-[#013280] rounded-lg p-4 pr-12">
                    <p className="text-[#3e88f7] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      https://hostbuddy.ai/property-chat/{chatbotKey}
                    </p>
                    <button
                      onClick={() => handleCopy(`https://hostbuddy.ai/property-chat/${chatbotKey}`, 'link')}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-[#0F1117] border border-[#013280] hover:bg-[#1a1f2e] transition-colors"
                    >
                      {copiedIndex === 'link' ? (
                        <Check className="w-4 h-4 text-[#3e88f7]" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#a6a9b2]" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  When your guests click this link, they'll be taken to a dedicated chat page where they can communicate with your HostBuddy AI assistant for this property.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
