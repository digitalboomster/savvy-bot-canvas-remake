
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import ChatFeaturesMenu from './ChatFeaturesMenu';
import ChatHeader from './ChatHeader';
import ChatWelcome from './ChatWelcome';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import DocumentViewerModal from './DocumentViewerModal';
import HealMeModal from "./HealMeModal";
import CaptureReceiptPage from "./CaptureReceiptPage";
import { toast } from "@/hooks/use-toast";
import { useChat } from "@/hooks/useChat";
import { useChatModals } from "@/hooks/useChatModals";

// Message type
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const BACKEND_URL = "https://4d9a25eb-4793-482a-a348-2e1c21e2b286-00-2gfu2fuimic4.kirk.replit.dev";

const starterPrompts = [
  "How can I start saving money?",
  "Help me create a budget.",
  "I'm feeling stressed about my finances.",
  "I want to track my spending."
];

// Local AiAvatar for the header
const AiAvatar = () => (
    <div
      style={{
        width: "47px",
        height: "47px",
        flexShrink: 0,
        background:
          "url(/lovable-uploads/1cfab2ec-5b69-4037-9238-241ebb26448f.png) lightgray -1.484px 1.295px / 108.574% 99.841% no-repeat",
        borderRadius: "50%",
        border: "2px solid #333",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    />
);

const ChatPage = () => {
  const {
    messages,
    setMessages,
    inputText,
    setInputText,
    isAiTyping,
    showWelcome,
    setShowWelcome,
    messagesEndRef,
    handleSendMessage,
  } = useChat();

  const {
    showFeaturesMenu, setShowFeaturesMenu,
    featuresRotated, setFeaturesRotated,
    showDocsViewer, setShowDocsViewer,
    showHealMe, setShowHealMe,
    showCaptureReceipt, setShowCaptureReceipt,
    handleFeatureSelect,
    handleMoodSelect,
    handleCloseDocsAndShowFeatures,
    onFeaturesButtonClick,
  } = useChatModals(messages, setMessages, setShowWelcome);

  // ---- Use theme from context! ----
  const { isDarkMode, toggleTheme } = useTheme();

  // On features menu open/close: rotation effect
  useEffect(() => {
    setFeaturesRotated(showFeaturesMenu);
  }, [showFeaturesMenu]);

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900";

  // Render capture receipt full page if activated
  if (showCaptureReceipt) {
    return (
      <CaptureReceiptPage
        onBack={() => setShowCaptureReceipt(false)}
      />
    );
  }

  return (
    <div className={`${themeClasses} flex flex-col`}>
      {showWelcome ? (
        <>
          <div className="w-full bg-[#212226] rounded-b-[32px] text-white">
              <div className="max-w-md mx-auto h-[200px] flex flex-col">
                  <ChatHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} isAlwaysDark />
                  <div className="px-6 flex-grow flex items-center">
                      <div className="flex items-start gap-3">
                          <AiAvatar />
                          <div className="flex-1">
                              <p className="leading-relaxed text-gray-300">
                                This is a private and secure chat. All messages are end-to-end encrypted to protect your privacy.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="w-full max-w-md mx-auto relative z-10">
            <ChatWelcome 
              isDarkMode={isDarkMode}
              starterPrompts={starterPrompts}
              onPromptClick={handlePromptClick}
            />
          </div>
        </>
      ) : (
        <>
          <div className={`sticky top-0 z-20 w-full bg-background/80 backdrop-blur-sm border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
            <div className='max-w-md mx-auto'>
              <ChatHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>
          </div>
          <ChatMessages
            messages={messages}
            isAiTyping={isAiTyping}
            isDarkMode={isDarkMode}
            messagesEndRef={messagesEndRef}
          />
        </>
      )}

      <ChatFeaturesMenu
        open={showFeaturesMenu}
        onClose={() => setShowFeaturesMenu(false)}
        onFeatureClick={handleFeatureSelect}
      />

      <DocumentViewerModal open={showDocsViewer} onClose={handleCloseDocsAndShowFeatures} />
      <HealMeModal
        open={showHealMe}
        onClose={() => setShowHealMe(false)}
        onMoodSelect={handleMoodSelect}
      />

      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        onSend={handleSendMessage}
        isDarkMode={isDarkMode}
        featuresRotated={featuresRotated}
        onFeaturesButtonClick={onFeaturesButtonClick}
      />
    </div>
  );
};

export default ChatPage;
