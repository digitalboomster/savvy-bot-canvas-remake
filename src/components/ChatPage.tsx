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
import UploadDocumentPage from "./UploadDocumentPage";
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
  "How can I start saving money",
  "Help me create a Budget", 
  "I'm feeling stressed about my finances.",
  "I want to track my spending"
];

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
    showUploadDocumentPage, setShowUploadDocumentPage,
    handleFeatureSelect,
    handleMoodSelect,
    handleCloseDocsAndShowFeatures,
    onFeaturesButtonClick,
  } = useChatModals();

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

  // Render upload document page when upload is triggered
  if (showUploadDocumentPage) {
    return (
      <UploadDocumentPage
        onBack={() => setShowUploadDocumentPage(false)}
      />
    );
  }

  return (
    <div className={`${themeClasses} flex flex-col`}>
      <ChatHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      {showWelcome && (
        <ChatWelcome 
          isDarkMode={isDarkMode}
          starterPrompts={starterPrompts}
          onPromptClick={handlePromptClick}
        />
      )}

      <ChatMessages
        messages={messages}
        isAiTyping={isAiTyping}
        isDarkMode={isDarkMode}
        messagesEndRef={messagesEndRef}
      />

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
