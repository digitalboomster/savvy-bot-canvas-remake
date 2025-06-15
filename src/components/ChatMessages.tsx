
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

// Use Manrope font in all chat bubbles, iMessage style.
const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages, isAiTyping, isDarkMode, messagesEndRef
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-1 pb-2 pt-3 space-y-3 w-full max-w-[430px] mx-auto font-manrope">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex w-full ${message.isUser ? 'justify-end' : 'justify-start'} items-end`}
        >
          <div className="flex items-end gap-1 w-fit max-w-[78%]">
            {/* Avatar for AI only */}
            {!message.isUser && (
              <div className="hidden lg:flex w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full items-center justify-center shrink-0 text-white font-semibold text-lg mr-1">
                🤖
              </div>
            )}
            <div
              className={`relative px-4 py-2.5 text-[14px] font-normal font-manrope break-words
                ${message.isUser
                  ? isDarkMode
                    ? 'bg-[#26252A] text-white shadow-md'
                    : 'bg-[#26252A] text-white shadow-md'
                  : isDarkMode
                    ? 'bg-[#E9E9EB] text-black shadow-md'
                    : 'bg-[#E9E9EB] text-black shadow-md'
                }
                ${message.isUser ? 'rounded-[22px] rounded-br-[6px] ml-auto' : 'rounded-[22px] rounded-bl-[6px] mr-auto'}
                border border-transparent
              `}
              style={{
                outline: '0.7px #C5C5C7 solid',
                outlineOffset: '-1.5px',
                fontFamily: "'Manrope', sans-serif"
              }}
            >
              {message.text}
            </div>
          </div>
        </div>
      ))}
      {/* Typing Indicator */}
      {isAiTyping && (
        <div className="flex justify-start w-full max-w-[78%]">
          <div className={`px-4 py-2.5 font-manrope bg-[#E9E9EB] text-black rounded-[22px] rounded-bl-[6px] border border-transparent shadow-md`}>
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
