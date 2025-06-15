import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatFeaturesMenu from './ChatFeaturesMenu';
import ChatHeader from './ChatHeader';
import ChatWelcome from './ChatWelcome';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import DocumentViewerModal from './DocumentViewerModal';
import HealMeModal from "./HealMeModal";
import SmartAssistantFeatures from './SmartAssistantFeatures';

// Message type
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [featuresRotated, setFeaturesRotated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showDocsViewer, setShowDocsViewer] = useState(false);
  const [showHealMe, setShowHealMe] = useState(false);
  const [showSmartAssistant, setShowSmartAssistant] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const starterPrompts = [
    "How can I start saving money",
    "Help me create a Budget", 
    "I'm feeling stressed about my finances.",
    "I want to track my spending"
  ];

  // Scroll to latest message or typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const conversationId = location.state?.conversationId || 'default';
      localStorage.setItem(`savvy-chat-${conversationId}`, JSON.stringify(messages));
    }
  }, [messages, location.state]);

  // Rotation effect for features btn in sync with menu open/close
  useEffect(() => {
    setFeaturesRotated(showFeaturesMenu);
  }, [showFeaturesMenu]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowWelcome(false);
    setIsAiTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: getAiResponse(text),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsAiTyping(false);
    }, 2000);
  };

  // Basic AI response sim
  const getAiResponse = (userText: string) => {
    if (userText.toLowerCase().includes('saving')) {
      return "Great question! I'm Savvy, your smart assistant here on SavvyBee — built to help you take control of your money, one simple step at a time. Let's start with creating a budget and identifying areas where you can cut expenses.";
    }
    if (userText.toLowerCase().includes('budget')) {
      return "I'd love to help you create a budget! Let's start by understanding your monthly income and expenses. This will help us identify opportunities for savings.";
    }
    if (userText.toLowerCase().includes('stressed')) {
      return "I understand that financial stress can be overwhelming. Let's break this down into manageable steps. What specific aspect of your finances is causing you the most concern?";
    }
    if (userText.toLowerCase().includes('spending')) {
      return "Tracking spending is a fantastic first step! I can help you categorize your expenses and identify patterns. Would you like to start by listing your main spending categories?";
    }
    return "Hey there! 👋 I'm Savvy, your smart assistant here on SavvyBee — built to help you take control of your money, one simple step at a time.";
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const toggleTheme = () => setIsDarkMode((d) => !d);

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900";

  // On features menu open/close: ensure featuresRotated always matches menu state
  useEffect(() => {
    if (showFeaturesMenu) setFeaturesRotated(true);
    else setFeaturesRotated(false);
  }, [showFeaturesMenu]);

  // Handler for features button
  const onFeaturesButtonClick = () => {
    setShowFeaturesMenu(prev => !prev);
    // Rotation is now managed by useEffect above
  };

  // Handler for feature menu feature click
  const handleFeatureSelect = (featureKey: string) => {
    if (featureKey === "smart-assistant") {
      setShowSmartAssistant(true);
      setShowFeaturesMenu(false);
      return;
    }
    if (featureKey === "documents") {
      setShowDocsViewer(true);
    }
    if (featureKey === "heal-me") {
      setShowHealMe(true);
    }
    // ... Optionally handle other features
  };

  // Handles mood selection in HealMeModal
  const handleMoodSelect = (mood) => {
    setShowHealMe(false);
    // Optionally send message to AI or set state for further UI
    // e.g. handleSendMessage(`I am feeling ${mood}`);
    // Leave the actual backend/AI flow to user's logic as requested
  };

  // THIS is the updated handler for the Document Modal close/back chevron:
  const handleCloseDocsAndShowFeatures = () => {
    setShowDocsViewer(false);
    setShowFeaturesMenu(true);
  };

  // Handler to close Smart Assistant sub-page
  const handleBackFromSmartAssistant = () => {
    setShowSmartAssistant(false);
  };

  return (
    <div className={`${themeClasses} flex flex-col`}>
      <ChatHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Show Smart Assistant subpage if open */}
      {showSmartAssistant ? (
        <SmartAssistantFeatures
          onBack={handleBackFromSmartAssistant}
          // Optionally, add onFeatureSelect to drill down further
          onFeatureSelect={(featureKey) => {
            // For now, just return to chat
            setShowSmartAssistant(false);
            // You can implement further logic here if needed
          }}
        />
      ) : (
        <>
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
        </>
      )}

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

      {/* Input Area only if not in Smart Assistant subpage */}
      {!showSmartAssistant && (
        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          onSend={handleSendMessage}
          isDarkMode={isDarkMode}
          featuresRotated={featuresRotated}
          onFeaturesButtonClick={onFeaturesButtonClick}
        />
      )}
    </div>
  );
};

export default ChatPage;
