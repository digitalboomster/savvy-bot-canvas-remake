
import React, { useState, useEffect } from 'react';
import { X, MoreVertical, MessageCircle, Trash2, ChevronLeft, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConversationHistory from './ConversationHistory';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from '@/components/ui/card';

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

const ChatInterface = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showDeleteMode, setShowDeleteMode] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme();

  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem('savvy-conversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    } else {
      // Default conversations
      const defaultConversations = [
        {
          id: '1',
          title: 'Tips on Savings',
          timestamp: '2d ago',
          preview: 'How can I improve my savings rate?'
        },
        {
          id: '2',
          title: 'Budget Analysis',
          timestamp: '2d ago',
          preview: 'Please analyze my monthly expenses.'
        }
      ];
      setConversations(defaultConversations);
      localStorage.setItem('savvy-conversations', JSON.stringify(defaultConversations));
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savvy-conversations', JSON.stringify(conversations));
  }, [conversations]);

  const handleStartConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      timestamp: 'now',
      preview: 'Started a new conversation with Savvy Bot.'
    };
    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    navigate('/chat', { state: { conversationId: newConversation.id } });
  };

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    setShowDeleteMode(false);
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
            {/* Header */}
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
            {/* Greeting */}
            <div className="w-full px-4 flex-grow flex flex-col justify-center">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  Hi there 
                  <span className="animate-bounce">👋</span>
                </h2>
                <p className={`leading-relaxed text-base`}>
                  Welcome to Savvy Bot. Feel free to ask me anything about your finances!
                </p>
              </div>
            </div>
        </div>
      </div>
      
      {/* Content in centralized container */}
      <div className="w-full max-w-md mx-auto px-4 relative z-10 -mt-12 md:-mt-16">
        {/* Conversation Starter */}
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
        
        {/* Monthly Reports */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Monthly Reports</h3>
            <Card className="text-center shadow-md">
                <CardContent className="p-4 flex flex-col justify-center items-center">
                    <p className="text-lg font-medium text-muted-foreground">Coming soon</p>
                </CardContent>
            </Card>
        </div>
        
        {/* Recent Conversations */}
        <ConversationHistory 
          conversations={conversations} 
          onDeleteConversation={handleDeleteConversation}
          showDeleteMode={showDeleteMode}
          onToggleDeleteMode={setShowDeleteMode}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
