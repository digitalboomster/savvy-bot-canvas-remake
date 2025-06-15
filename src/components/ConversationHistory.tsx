
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

interface ConversationHistoryProps {
  conversations: Conversation[];
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ conversations }) => {
  const getConversationIcon = (title: string) => {
    if (title.toLowerCase().includes('savings')) {
      return '💰';
    } else if (title.toLowerCase().includes('budget') || title.toLowerCase().includes('analysis')) {
      return '📊';
    }
    return '💬';
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Recent Conversation</h3>
      <div className="space-y-3">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-200">
                {getConversationIcon(conversation.title)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-white truncate group-hover:text-yellow-400 transition-colors duration-200">
                    {conversation.title}
                  </h4>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  Savvy • {conversation.preview}
                </p>
              </div>
            </div>
          </div>
        ))}

        {conversations.length === 0 && (
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
