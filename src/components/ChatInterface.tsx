import React, { useState, useEffect } from 'react';
import { X, MoreVertical, MessageCircle, Trash2, ChevronLeft, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConversationHistory from './ConversationHistory';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from '@/components/ui/card';
import { useConversations } from '@/hooks/useConversations';

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

const ChatInterface = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { conversations, loading, createConversation, deleteConversation } = useConversations();
  const [showDeleteMode, setShowDeleteMode] = useState(false);

  const handleStartConversation = async () => {
    try {
      const newConversation = await createConversation(
        'New Conversation',
        'Started a new conversation with Savvy Bot.'
      );
      navigate('/chat', { state: { conversationId: newConversation.id } });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const themeClasses = isDarkMode 
    ? "bg-gray-900 text-white"
    : "bg-gray-50 text-gray-900";

  return (
    <div className={`${themeClasses} min-h-screen`}>
      <div className="relative w-full h-72 md:h-80">
        <div 
            className="absolute inset-0"
            style={{
                backgroundImage: 'url(/lovable-uploads/f380cc67-311b-47d2-b30c-42587fd6b690.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(2px)',
            }}
        />
        <div 
            className="absolute inset-0"
            style={{
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%)'
            }}
        />
        <div className="relative z-10 flex flex-col h-full text-white max-w-md mx-auto">
            <div className={`w-full flex items-center justify-between px-1 py-4`}>
                <button
                    onClick={() => navigate('/')}
                    className={`p-2 rounded-lg transition-colors duration-200`}
                >
                    <X size={22} />
                </button>
                <h1 className="text-xl font-black tracking-tight text-center flex-1">Savvy Bot</h1>
                <button
                    className={`p-2 rounded-lg transition-colors duration-200`}
                    aria-label="More options"
                >
                    <MoreVertical size={22} />
                </button>
            </div>
            <div className="w-full px-4 flex-grow flex flex-col justify-center">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  Hi there!
                  <span>👋</span>
                </h2>
                <p className={`leading-relaxed text-base`}>
                  Welcome to Savvy Bot. Feel free to ask me anything about your finances!
                </p>
              </div>
            </div>
        </div>
      </div>
      
      <div className="w-full max-w-md mx-auto px-4 relative z-10 -mt-12 md:-mt-16">
        <div className="bg-yellow-400 p-6 rounded-2xl mb-8 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-black font-semibold mb-4 text-lg">Start Conversation</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
              <MessageCircle size={20} className="text-black" />
            </div>
            <div>
              <p className="text-black font-medium">Typical Reply Time</p>
              <p className="text-black/70 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                2 Min
              </p>
            </div>
          </div>
          <button 
            onClick={handleStartConversation}
            className="w-full bg-white text-black font-medium py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Send a Message
          </button>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Monthly Reports</h3>
            <Card className="text-center shadow-md">
                <CardContent className="p-4 flex flex-col justify-center items-center">
                    <p className="text-lg font-medium text-muted-foreground">Coming soon</p>
                </CardContent>
            </Card>
        </div>
        
        <ConversationHistory 
          conversations={conversations} 
          onDeleteConversation={deleteConversation}
          showDeleteMode={showDeleteMode}
          onToggleDeleteMode={setShowDeleteMode}
          isDarkMode={isDarkMode}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
