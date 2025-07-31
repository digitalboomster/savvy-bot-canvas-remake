import React from 'react';
import { MessageCircle, Trash2 } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

interface ConversationHistoryProps {
  conversations: Conversation[];
  onDeleteConversation: (id: string) => void;
  showDeleteMode: boolean;
  onToggleDeleteMode: (show: boolean) => void;
  isDarkMode: boolean;
  loading?: boolean;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ 
  conversations, 
  onDeleteConversation, 
  showDeleteMode, 
  onToggleDeleteMode,
  isDarkMode,
  loading = false
}) => {
  const getConversationIcon = (title: string) => {
    if (title.toLowerCase().includes('savings')) {
      return '💰';
    } else if (title.toLowerCase().includes('budget') || title.toLowerCase().includes('analysis')) {
      return '📊';
    }
    return '💬';
  };

  const handleLongPress = (conversationId: string) => {
    onToggleDeleteMode(true);
  };

  if (loading) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Conversation</h3>
        <div className="space-y-3">
          <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} rounded-xl p-4 animate-pulse`}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Conversation</h3>
        {showDeleteMode && (
          <button
            onClick={() => onToggleDeleteMode(false)}
            className="text-sm text-yellow-400 hover:text-yellow-300"
          >
            Done
          </button>
        )}
      </div>
      <div className="space-y-3">
        {conversations.map((conversation, index) => (
          <div 
            key={conversation.id}
            className={`${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'} backdrop-blur-sm border rounded-xl p-4 transition-all duration-200 cursor-pointer group relative animate-in fade-in-0`}
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            onTouchStart={() => handleLongPress(conversation.id)}
            onMouseDown={() => handleLongPress(conversation.id)}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-200">
                {getConversationIcon(conversation.title)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-medium truncate group-hover:text-yellow-400 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {conversation.title}
                  </h4>
                  <span className={`text-xs shrink-0 ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {conversation.timestamp}
                  </span>
                </div>
                <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Savvy • {conversation.preview}
                </p>
              </div>
              {showDeleteMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                  className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              )}
            </div>
          </div>
        ))}

        {conversations.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-400">
            <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>No conversations yet</p>
            <p className="text-sm">Start your first conversation above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationHistory;
