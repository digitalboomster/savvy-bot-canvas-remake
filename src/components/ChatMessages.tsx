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
  messages,
  isAiTyping,
  isDarkMode,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-end ${message.isUser ? 'justify-end' : 'justify-start'} gap-2`}
        >
          {/* Avatar on left for AI */}
          {!message.isUser && (
            <div
              style={{
                width: "47px",
                height: "47px",
                flexShrink: 0,
                background: "url(/lovable-uploads/1cfab2ec-5b69-4037-9238-241ebb26448f.png) lightgray -1.484px 1.295px / 108.574% 99.841% no-repeat",
                borderRadius: "50%",
                border: isDarkMode ? "2px solid #333" : "2px solid #fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            />
          )}
          {/* Message bubble */}
          <div
            className={`max-w-[65%] px-4 py-3 rounded-[18px] ${
              message.isUser
                ? "bg-yellow-400 text-black ml-auto"
                : isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black border border-gray-200"
            }`}
            style={{
              borderTopLeftRadius: !message.isUser ? 6 : 18,
              borderTopRightRadius: message.isUser ? 6 : 18,
            }}
          >
            {message.text}
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
