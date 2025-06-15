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

// Use Manrope font in all chat bubbles, iMessage style with bubble tails
const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages, isAiTyping, isDarkMode, messagesEndRef
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-0 pb-2 pt-3 space-y-3 w-full max-w-[430px] mx-auto font-manrope transition-colors">
      {messages.map((message, i) => {
        const isUser = message.isUser;
        const prevMsg = messages[i - 1];
        const nextMsg = messages[i + 1];
        // Show avatar only for AI and only if not grouped
        const showAvatar = !isUser && (!prevMsg || prevMsg.isUser);

        // Bubble tail logic: only on first/last in a sequence
        const isFirst = !prevMsg || prevMsg.isUser !== isUser;
        const isLast = !nextMsg || nextMsg.isUser !== isUser;

        // Bubble colors
        const bubbleBg = isUser ? "bg-[#26252A]" : "bg-[#E9E9EB]";
        const textColor = isUser ? "text-white" : "text-black";
        const borderStyle = isUser
          ? "border-[#26252A]"
          : "border-[#E9E9EB]";

        // Bubble alignment
        const justify = isUser ? "justify-end" : "justify-start";
        const alignItems = "items-end";
        const maxWidth = "max-w-[78%]";

        return (
          <div
            key={message.id}
            className={`flex w-full ${justify} ${alignItems}`}
          >
            <div className={`flex ${alignItems} gap-1 w-fit ${maxWidth} relative`}>
              {/* AI Avatar */}
              {showAvatar && (
                <div className="flex w-8 h-8 bg-[#F7B731] rounded-full items-center justify-center shrink-0 text-white font-bold text-lg mr-2 mt-auto mb-1 select-none">
                  🤖
                </div>
              )}
              {/* Bubble with tail */}
              <div className="relative group">
                <div
                  className={`px-4 py-2.5 text-[14px] font-normal font-manrope break-words ${bubbleBg} ${textColor} border ${borderStyle}
                  ${isUser
                    ? "rounded-3xl rounded-br-[10px] ml-auto"
                    : "rounded-3xl rounded-bl-[10px] mr-auto"
                  }
                  `}
                  style={{
                    outline: `0.7px ${isUser ? '#26252A' : '#E9E9EB'} solid`,
                    outlineOffset: '-1.5px',
                    fontFamily: "'Manrope', sans-serif",
                    minWidth: 48
                  }}
                >
                  {message.text}
                </div>
                {/* Bubble tail, show only for last in a sequence */}
                {isLast && (
                  isUser ? (
                    <svg className="absolute -right-2 bottom-0" width="16" height="22" viewBox="0 0 16 23" fill="none">
                      <path
                        d="M0 0C9 0 16 6 16 11.5C16 17 9 23 0 23V0Z"
                        fill="#26252A"
                      />
                    </svg>
                  ) : (
                    <svg className="absolute -left-2 bottom-0" width="16" height="22" viewBox="0 0 16 23" fill="none">
                      <path
                        d="M16 0C7 0 0 6 0 11.5C0 17 7 23 16 23V0Z"
                        fill="#E9E9EB"
                      />
                    </svg>
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isAiTyping && (
        <div className="flex justify-start w-full max-w-[78%]">
          <div className="px-4 py-2.5 font-manrope bg-[#E9E9EB] text-black rounded-3xl rounded-bl-[10px] border border-[#E9E9EB] relative">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
