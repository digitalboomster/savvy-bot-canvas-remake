
import React from 'react';
import ChatFeaturesMenu from './ChatFeaturesMenu';
import ChatHeader from './ChatHeader';
import ChatWelcome from './ChatWelcome';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import DocumentViewerModal from './DocumentViewerModal';
import HealMeModal from "./HealMeModal";
import { useChatState } from '../hooks/useChatState';
import { useChatMessages } from '../hooks/useChatMessages';

const ChatContainer = () => {
  const {
    showWelcome,
    setShowWelcome,
    featuresRotated,
    isDarkMode,
    showFeaturesMenu,
    setShowFeaturesMenu,
    showDocsViewer,
    setShowDocsViewer,
    showHealMe,
    setShowHealMe,
    toggleTheme,
    onFeaturesButtonClick
  } = useChatState();

  const {
    messages,
    inputText,
    setInputText,
    isAiTyping,
    messagesEndRef,
    handleSendMessage
  } = useChatMessages();

  const starterPrompts = [
    "How can I start saving money",
    "Help me create a Budget", 
    "I'm feeling stressed about my finances.",
    "I want to track my spending"
  ];

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt, setShowWelcome);
  };

  const handleSendMessageWrapper = (text: string) => {
    handleSendMessage(text, setShowWelcome);
  };

  // Handler for features menu option click
  const handleFeatureSelect = (featureKey: string) => {
    if (featureKey === "documents") {
      setShowDocsViewer(true);
    }
    if (featureKey === "heal-me") {
      setShowHealMe(true);
    }
    // ... Optionally handle other features
  };

  const handleMoodSelect = (mood: string) => {
    setShowHealMe(false);
    // Optionally send message to AI or set state for further UI
    // e.g. handleSendMessage(`I am feeling ${mood}`);
    // Leave the actual backend/AI flow to user's logic as requested
  };

  const handleCloseDocsAndShowFeatures = () => {
    setShowDocsViewer(false);
    setShowFeaturesMenu(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <ChatHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Welcome Section */}
      {showWelcome && (
        <ChatWelcome 
          isDarkMode={isDarkMode}
          starterPrompts={starterPrompts}
          onPromptClick={handlePromptClick}
        />
      )}

      {/* Messages */}
      <ChatMessages
        messages={messages}
        isAiTyping={isAiTyping}
        isDarkMode={isDarkMode}
        messagesEndRef={messagesEndRef}
      />

      {/* Features Floating Menu */}
      <ChatFeaturesMenu
        open={showFeaturesMenu}
        onClose={() => setShowFeaturesMenu(false)}
        onFeatureClick={handleFeatureSelect}
      />

      {/* Document Viewer Modal */}
      <DocumentViewerModal open={showDocsViewer} onClose={handleCloseDocsAndShowFeatures} />

      {/* Heal Me Modal */}
      <HealMeModal
        open={showHealMe}
        onClose={() => setShowHealMe(false)}
        onMoodSelect={handleMoodSelect}
      />

      {/* Input Area */}
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        onSend={handleSendMessageWrapper}
        isDarkMode={isDarkMode}
        featuresRotated={featuresRotated}
        onFeaturesButtonClick={onFeaturesButtonClick}
      />
    </div>
  );
};

export default ChatContainer;
