
import { useState, useEffect } from 'react';
import { messagesAPI } from '../api/database';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Load messages when conversationId changes
  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    async function loadMessages() {
      setLoading(true);
      try {
        const data = await messagesAPI.getForConversation(conversationId);
        const formattedMessages = data.map((msg: any) => ({
          id: msg.id,
          text: msg.text,
          isUser: msg.is_user,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error('Failed to load messages:', error);
        toast({
          title: "Error",
          description: "Failed to load conversation messages"
        });
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, [conversationId]);

  const addMessage = async (text: string, isUser: boolean) => {
    if (!conversationId) return;

    try {
      const newMessage = await messagesAPI.create(conversationId, { text, isUser });
      const formattedMessage = {
        id: newMessage.id,
        text: newMessage.text,
        isUser: newMessage.is_user,
        timestamp: new Date(newMessage.timestamp)
      };
      setMessages(prev => [...prev, formattedMessage]);
      return formattedMessage;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save message"
      });
      throw error;
    }
  };

  return {
    messages,
    loading,
    addMessage,
    setMessages
  };
}
