import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatFeaturesMenu from "./ChatFeaturesMenu";
import ChatWelcome from "./ChatWelcome";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import DocumentViewerModal from "./DocumentViewerModal";
import HealMeModal from "./HealMeModal";

// Message type
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [featuresRotated, setFeaturesRotated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Start with light as default
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showDocsViewer, setShowDocsViewer] = useState(false);
  const [showHealMe, setShowHealMe] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const starterPrompts = [
    "How can I start saving money",
    "Help me create a Budget",
    "I'm feeling stressed about my finances.",
    "I want to track my spending",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  useEffect(() => {
    if (messages.length > 0) {
      const conversationId = location.state?.conversationId || "default";
      localStorage.setItem(
        `savvy-chat-${conversationId}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, location.state]);

  useEffect(() => {
    setFeaturesRotated(showFeaturesMenu);
  }, [showFeaturesMenu]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setShowWelcome(false);
    setIsAiTyping(true);
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: getAiResponse(text),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsAiTyping(false);
    }, 2000);
  };

  // Basic AI response sim
  const getAiResponse = (userText: string) => {
    if (userText.toLowerCase().includes("saving")) {
      return "Great question! I'm Savvy, your smart assistant here on SavvyBee — built to help you take control of your money, one simple step at a time. Let's start with creating a budget and identifying areas where you can cut expenses.";
    }
    if (userText.toLowerCase().includes("budget")) {
      return "I'd love to help you create a budget! Let's start by understanding your monthly income and expenses. This will help us identify opportunities for savings.";
    }
    if (userText.toLowerCase().includes("stressed")) {
      return "I understand that financial stress can be overwhelming. Let's break this down into manageable steps. What specific aspect of your finances is causing you the most concern?";
    }
    if (userText.toLowerCase().includes("spending")) {
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
    setShowFeaturesMenu((prev) => !prev);
    // Rotation is now managed by useEffect above
  };

  // Handler for feature menu feature click
  const handleFeatureSelect = (featureKey: string) => {
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

  // --- UI OVERHAUL STARTS HERE ---
  // Remove the ChatHeader import and usage entirely
  // Implement a finance-app style chat card container and interactive UI with subtle gradients

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-neutral-950"
          : "bg-gradient-to-b from-neutral-100 via-white to-neutral-100"
      } transition-colors duration-300`}
      style={{
        minHeight: "100dvh",
        width: "100vw",
        padding: "0",
      }}
    >
      <main className="relative w-full max-w-md flex flex-col justify-end flex-1 min-h-screen mx-auto">
        {/* Accent brand shape/background */}
        <div
          className={`absolute inset-0 pointer-events-none z-0 ${
            isDarkMode
              ? "bg-gradient-to-br from-[#181920] via-[#26304a] to-[#1e1f25] opacity-90"
              : "bg-gradient-to-br from-[#fff5da] via-[#fff8ed] to-white opacity-95"
          }`}
          style={{ borderRadius: 0 }}
        />
        {/* Modern Chat Card */}
        <section
          className={`
            relative z-10 mx-auto w-full
            flex flex-col
            min-h-[600px]
            h-[90dvh] 
            max-h-[900px]
            shadow-2xl
            bg-white/80
            rounded-2xl
            border border-[#efe2bc]
            overflow-hidden
            transition-all
            mt-3
          `}
        >
          {/* Top bar: (No app bar! But top area for theme toggle maybe) */}
          <div className="py-2 px-3 bg-transparent flex items-center justify-between">
            {/* Left: Branding Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center ring-2 ring-[#fae28b66] shadow-sm">
                <span className="text-2xl">🤖</span>
              </div>
              <span
                className="font-semibold text-gray-900 text-xl"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  letterSpacing: "0.01em",
                }}
              >
                SavvyBee
              </span>
            </div>
            {/* Right: Theme toggle */}
            <button
              onClick={() => setIsDarkMode((d) => !d)}
              className={`p-2 rounded-lg border border-transparent transition-all duration-200 shadow-none ${
                isDarkMode
                  ? "bg-neutral-800 hover:bg-neutral-700"
                  : "bg-neutral-100 hover:bg-neutral-200"
              }`}
              title="Toggle light/dark mode"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <span className="sr-only">Toggle theme</span>
              {isDarkMode ? (
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="gold"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={12} cy={12} r={5} />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
          {/* Welcome Section */}
          {showWelcome && (
            <ChatWelcome
              isDarkMode={isDarkMode}
              starterPrompts={starterPrompts}
              onPromptClick={handlePromptClick}
            />
          )}
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto mt-2 mb-1 px-1 md:px-2">
            <ChatMessages
              messages={messages}
              isAiTyping={isAiTyping}
              isDarkMode={isDarkMode}
              messagesEndRef={messagesEndRef}
            />
          </div>
          {/* Features Menu (Floating, not top app bar) */}
          <ChatFeaturesMenu
            open={showFeaturesMenu}
            onClose={() => setShowFeaturesMenu(false)}
            onFeatureClick={handleFeatureSelect}
          />
          {/* Document Viewer Modal (still overlays) */}
          <DocumentViewerModal
            open={showDocsViewer}
            onClose={handleCloseDocsAndShowFeatures}
          />
          {/* Heal Me Modal */}
          <HealMeModal
            open={showHealMe}
            onClose={() => setShowHealMe(false)}
            onMoodSelect={handleMoodSelect}
          />
          {/* Chat input - sticky footer for touch UX */}
          <div className="sticky bottom-0 w-full z-20 bg-white/85 backdrop-blur">
            <ChatInput
              inputText={inputText}
              setInputText={setInputText}
              onSend={handleSendMessage}
              isDarkMode={isDarkMode}
              featuresRotated={featuresRotated}
              onFeaturesButtonClick={onFeaturesButtonClick}
            />
          </div>
        </section>
        {/* For a full-bleed look, add some safe-area below on mobile */}
        <div className="h-4 md:h-12" />
      </main>
    </div>
  );
};

export default ChatPage;
