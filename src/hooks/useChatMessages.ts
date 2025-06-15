
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

  const handleSendMessage = (text: string, setShowWelcome: (show: boolean) => void) => {
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

  return {
    messages,
    inputText,
    setInputText,
    isAiTyping,
    messagesEndRef,
    handleSendMessage
  };
};
