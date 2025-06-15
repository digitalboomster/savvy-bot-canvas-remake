
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Message type
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const BACKEND_URL = "https://4d9a25eb-4793-482a-a348-2e1c21e2b286-00-2gfu2fuimic4.kirk.replit.dev";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  useEffect(() => {
    if (messages.length > 0) {
      const conversationId = location.state?.conversationId || 'default';
      localStorage.setItem(`savvy-chat-${conversationId}`, JSON.stringify(messages));
    }
  }, [messages, location.state]);

  // Send message to AI backend
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

  return {
    messages,
    setMessages,
    inputText,
    setInputText,
    isAiTyping,
    showWelcome,
    setShowWelcome,
    messagesEndRef,
    handleSendMessage,
  };
}
