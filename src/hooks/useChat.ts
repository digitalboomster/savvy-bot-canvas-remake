
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useMessages } from "./useMessages";

const BACKEND_URL = "https://4d9a25eb-4793-482a-a348-2e1c21e2b286-00-2gfu2fuimic4.kirk.replit.dev";

export function useChat() {
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  const conversationId = location.state?.conversationId || null;
  const { messages, loading, addMessage, setMessages } = useMessages(conversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false);
    }
  }, [messages]);

  // Send message to AI backend
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      // Add user message to database
      await addMessage(text.trim(), true);
      setInputText('');
      setShowWelcome(false);
      setIsAiTyping(true);

      // Send to AI backend
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() })
      });

      let aiResponseText = "Sorry, I'm having connection issues. Please try again.";
      if (response.ok) {
        const data = await response.json();
        aiResponseText = data.reply || aiResponseText;
      }

      // Add AI response to database
      await addMessage(aiResponseText, false);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again."
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
    loading
  };
}
