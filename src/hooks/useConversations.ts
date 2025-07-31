
import { useState, useEffect } from 'react';
import { conversationsAPI } from '../api/database';
import { toast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  // Load conversations from database
  useEffect(() => {
    async function loadConversations() {
      try {
        const data = await conversationsAPI.getAll();
        setConversations(data);
      } catch (error) {
        console.error('Failed to load conversations:', error);
        toast({
          title: "Error",
          description: "Failed to load conversations"
        });
      } finally {
        setLoading(false);
      }
    }

    loadConversations();
  }, []);

  const createConversation = async (title: string, preview: string) => {
    try {
      const newConversation = await conversationsAPI.create({ title, preview });
      setConversations(prev => [newConversation, ...prev]);
      return newConversation;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create conversation"
      });
      throw error;
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await conversationsAPI.delete(id);
      setConversations(prev => prev.filter(conv => conv.id !== id));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete conversation"
      });
    }
  };

  return {
    conversations,
    loading,
    createConversation,
    deleteConversation
  };
}
