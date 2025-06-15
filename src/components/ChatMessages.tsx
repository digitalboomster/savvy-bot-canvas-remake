
import React from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isAiTyping: boolean;
  isDarkMode: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isAiTyping,
  isDarkMode,
  messagesEndRef
}) => {
  if (messages.length === 0) return null;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
      <div className="max-w-2xl mx-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {!message.isUser && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex-shrink-0 mt-1`}>
                <span className="text-sm">🐝</span>
              </div>
            )}
            
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.isUser
                  ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white'} rounded-tr-md`
                  : `${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} rounded-tl-md`
              }`}
            >
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {message.text}
              </p>
            </div>
          </div>
        ))}

        {isAiTyping && (
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex-shrink-0`}>
              <span className="text-sm">🐝</span>
            </div>
            <div className={`px-4 py-3 rounded-2xl rounded-tl-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
