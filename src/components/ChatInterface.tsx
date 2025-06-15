
import React, { useState, useEffect } from 'react';
import { X, MoreVertical, MessageCircle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConversationHistory from './ConversationHistory';

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

const ChatInterface = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showDeleteMode, setShowDeleteMode] = useState(false);

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
          title: 'Analysis on your Budget',
          timestamp: '2d ago',
          preview: 'Please analyze my monthly expenses'
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
      preview: 'Started a new conversation with Savvy Bot'
    };
    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    console.log('Starting new conversation:', newConversation);
    navigate('/chat', { state: { conversationId: newConversation.id } });
  };

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    setShowDeleteMode(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900";

  return (
    <div className={themeClasses}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className={`p-2 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg transition-colors duration-200`}>
            <X size={24} className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"} />
          </button>
          <h1 className="text-xl font-semibold">Savvy Bot</h1>
          <button 
            onClick={toggleTheme}
            className={`p-2 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg transition-colors duration-200`}
          >
            <MoreVertical size={24} className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"} />
          </button>
        </div>

        {/* Greeting Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            Hi There 
            <span className="animate-bounce">👋</span>
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
            Hey There! Welcome to Savvy Bot. I have a response to every message, thoughts. So feel to ask anything!
          </p>
        </div>

        {/* Conversation Starter */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-2xl mb-8 shadow-xl transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-black font-semibold mb-4 text-lg">Start Conversation</h3>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
              <MessageCircle size={20} className="text-black" />
            </div>
            <div>
              <p className="text-black font-medium">Savvy Usual Reply Time</p>
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
            Send Message to Savvy
          </button>
        </div>

        {/* Monthly Reports */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Monthly Reports</h3>
          <div className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-sm border rounded-xl p-6`}>
            <div className="text-center">
              <span className="inline-block bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium">
                Coming Soon
              </span>
            </div>
          </div>
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
