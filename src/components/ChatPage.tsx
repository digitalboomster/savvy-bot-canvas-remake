
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [featuresRotated, setFeaturesRotated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const starterPrompts = [
    "How can I start saving money",
    "Help me create a Budget", 
    "I'm feeling stressed about my finances.",
    "I want to track my spending"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  // Save conversation when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const conversationId = location.state?.conversationId || 'default';
      localStorage.setItem(`savvy-chat-${conversationId}`, JSON.stringify(messages));
    }
  }, [messages, location.state]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowWelcome(false);
    setIsAiTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAiResponse(text),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsAiTyping(false);
    }, 2000);
  };

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

  const handleFeaturesClick = () => {
    setFeaturesRotated(!featuresRotated);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900";

  return (
    <div className={`${themeClasses} flex flex-col`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <button 
          onClick={() => navigate('/')}
          className={`p-2 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg transition-colors duration-200`}
        >
          <ArrowLeft size={24} className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"} />
        </button>
        <h1 className="text-xl font-semibold">Savvy Bot</h1>
        <button 
          onClick={toggleTheme}
          className={`p-2 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg transition-colors duration-200`}
        >
          <div className="flex flex-col gap-1">
            <div className={`w-1 h-1 ${isDarkMode ? 'bg-gray-300' : 'bg-gray-600'} rounded-full`}></div>
            <div className={`w-1 h-1 ${isDarkMode ? 'bg-gray-300' : 'bg-gray-600'} rounded-full`}></div>
            <div className={`w-1 h-1 ${isDarkMode ? 'bg-gray-300' : 'bg-gray-600'} rounded-full`}></div>
          </div>
        </button>
      </div>

      {/* Welcome Section */}
      {showWelcome && (
        <div className="p-6 space-y-6">
          {/* Privacy Message */}
          <div className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-sm border rounded-2xl p-6`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className="flex-1">
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  This is private message, between you and buddy. This chat is end to end encrypted...
                </p>
              </div>
            </div>
          </div>

          {/* AI Welcome Message */}
          <div className={`${isDarkMode ? 'bg-gray-100' : 'bg-white shadow-sm border border-gray-200'} rounded-2xl p-4`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800">
                  Hey there! 👋 I'm Savvy, your smart assistant here on SavvyBee — built to help you take control of your money, one simple step at a time.
                </p>
              </div>
            </div>
          </div>

          {/* Starter Prompts */}
          <div className="grid grid-cols-2 gap-3">
            {starterPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className={`${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'} backdrop-blur-sm border rounded-xl p-4 text-left transition-all duration-200 text-sm`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start gap-3 max-w-[80%]">
              {!message.isUser && (
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-lg">🤖</span>
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? isDarkMode 
                      ? 'bg-gray-700 text-white ml-auto'
                      : 'bg-blue-500 text-white ml-auto'
                    : isDarkMode 
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isAiTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-100' : 'bg-white border border-gray-200'} px-4 py-3 rounded-2xl`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-center gap-3">
          {/* Features Button (Cross/Plus that rotates) */}
          <button
            onClick={handleFeaturesClick}
            className={`p-3 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'} backdrop-blur-sm border rounded-full transition-all duration-200 ${
              featuresRotated ? 'rotate-45' : ''
            }`}
          >
            <Plus size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
          </button>

          {/* Input Field */}
          <div className={`flex-1 flex items-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-sm border rounded-full px-4 py-2`}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder="Message to Savvy..."
              className={`flex-1 bg-transparent ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} outline-none px-2`}
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              className={`p-2 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-full transition-colors duration-200`}
            >
              <Mic size={20} className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
