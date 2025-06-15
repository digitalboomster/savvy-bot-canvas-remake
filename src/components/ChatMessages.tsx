
import React, { RefObject } from "react";

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
  messagesEndRef: RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages, isAiTyping, isDarkMode, messagesEndRef
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div className="flex items-start gap-3 max-w-[80%]">
            {!message.isUser && (
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shrink-0">
                <span className="text-lg">🤖</span>
              </div>
            )}
            <div
              className={`px-4 py-3 rounded-2xl ${
                message.isUser
                  ? isDarkMode 
                    ? 'bg-gray-700 text-white ml-auto'
                    : 'bg-blue-500 text-white ml-auto'
                  : isDarkMode 
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        </div>
      ))}
      {/* Typing Indicator */}
      {isAiTyping && (
        <div className="flex justify-start">
          <div className="flex items-start gap-3 max-w-[80%]">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shrink-0">
              <span className="text-lg">🤖</span>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-100' : 'bg-white border border-gray-200'} px-4 py-3 rounded-2xl`}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
