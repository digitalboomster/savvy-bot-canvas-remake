
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
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
      {messages.map((message) => {
        // Conditional classes for message bubbles
        const bubbleClasses = message.isUser
          ? `ml-auto ${isDarkMode ? "bg-blue-600 text-white" : "bg-black text-white"}`
          : isDarkMode
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-black";

        return (
          <div
            key={message.id}
            className={`flex items-end ${message.isUser ? 'justify-end' : 'justify-start'} gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out`}
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
              className={`max-w-[65%] px-4 py-3 rounded-[18px] ${bubbleClasses}`}
              style={{
                borderTopLeftRadius: !message.isUser ? 6 : 18,
                borderTopRightRadius: message.isUser ? 6 : 18,
                whiteSpace: "pre-wrap",
              }}
            >
              {message.text}
            </div>
          </div>
        );
      })}
      {/* Typing Indicator */}
      {isAiTyping && (
        <div className="flex items-end justify-start gap-2">
          <div
            style={{
              width: "47px",
              height: "47px",
              flexShrink: 0,
              background:
                "url(/lovable-uploads/1cfab2ec-5b69-4037-9238-241ebb26448f.png) lightgray -1.484px 1.295px / 108.574% 99.841% no-repeat",
              borderRadius: "50%",
              border: isDarkMode ? "2px solid #333" : "2px solid #fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          />
          <div
            className={`px-4 py-3 rounded-[18px] ${
              isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-black"
            }`}
            style={{
              borderTopLeftRadius: 6,
              borderTopRightRadius: 18,
            }}
          >
            <div className="flex space-x-1 pt-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
