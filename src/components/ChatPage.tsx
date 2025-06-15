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

// Message type
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const BACKEND_URL = "https://4d9a25eb-4793-482a-a348-2e1c21e2b286-00-2gfu2fuimic4.kirk.replit.dev";

const ChatPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [featuresRotated, setFeaturesRotated] = useState(false);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showDocsViewer, setShowDocsViewer] = useState(false);
  const [showHealMe, setShowHealMe] = useState(false);
  const [showCaptureReceipt, setShowCaptureReceipt] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const starterPrompts = [
    "How can I start saving money",
    "Help me create a Budget", 
    "I'm feeling stressed about my finances.",
    "I want to track my spending"
  ];

  // ---- Use theme from context! ----
  const { isDarkMode, toggleTheme } = useTheme();

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

  // Handle AI send message with Replit backend
  const handleSendMessage = async (text: string) => {
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

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: data.reply || 'Sorry, I had trouble responding.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having connection issues. Please try again.",
        isUser: false,
        timestamp: new Date()
      }]);
      toast({
        title: "Error",
        description: "Failed to connect to AI. Please try again."
      });
    } finally {
      setIsAiTyping(false);
    }
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

  // Handler for features menu option click
  const handleFeatureSelect = (featureKey: string) => {
    if (featureKey === "capture-receipt") {
      setShowCaptureReceipt(true);
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

  // Mood select with checkin API call
  const handleMoodSelect = async (mood) => {
    setShowHealMe(false);
    try {
      const response = await fetch(`${BACKEND_URL}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: mood.toLowerCase(), note: '' })
      });
      if (!response.ok) {
        throw new Error("Mood check-in failed");
      }
      toast({
        title: "Mood logged",
        description: `Your mood (${mood}) has been recorded.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log your mood. Please try again."
      });
    }
  };

  const handleCloseDocsAndShowFeatures = () => {
    setShowDocsViewer(false);
    setShowFeaturesMenu(true);
  };

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
