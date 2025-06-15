
import React from "react";
import { Plus, Mic } from "lucide-react";

interface ChatInputProps {
  inputText: string;
  setInputText: (v: string) => void;
  onSend: (text: string) => void;
  isDarkMode: boolean;
  featuresRotated: boolean;
  onFeaturesButtonClick: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  setInputText,
  onSend,
  isDarkMode,
  featuresRotated,
  onFeaturesButtonClick
}) => (
  <div className={`w-full px-0 pb-4 pt-2 bg-transparent`}>
    <div className="flex items-end justify-center w-full">
      <div className="relative w-full max-w-[402px] flex items-center">
        {/* Plus Button */}
        <button
          onClick={onFeaturesButtonClick}
          aria-label="Show chat features"
          type="button"
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full flex items-center justify-center border-none transition transform-gpu
            ${isDarkMode ? 'bg-[#E8E9EB] hover:bg-[#C5C5C7]' : 'bg-[#E8E9EB] hover:bg-[#C5C5C7]'}
            ${featuresRotated ? 'rotate-45' : ''}
          `}
          style={{outline: 'none'}}
        >
          <Plus size={18} className="text-[#7D7F85]" />
        </button>
        {/* Input Field */}
        <div
          className={`mx-auto w-[328px] pl-14 pr-12 py-2.5 rounded-full
            border outline-none focus-within:outline-none
            ${isDarkMode
              ? 'bg-white dark:bg-[#181818]/90 border-[#C5C5C7] shadow'
              : 'bg-white border-[#C5C5C7] shadow'}
            flex items-center
            transition-all
            font-manrope
          `}
          style={{outlineWidth: '1px', outlineOffset: '-1px'}}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSend(inputText)}
            placeholder="Message to Savvy..."
            className="w-full border-none bg-transparent px-0 text-[14px] font-normal outline-none focus:outline-none placeholder:text-[#C5C5C7] text-[#1A1D20] font-manrope"
            style={{
              fontFamily: "'Manrope', sans-serif"
            }}
          />
        </div>
        {/* Mic Button */}
        <button
          onClick={() => onSend(inputText)}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition hover:bg-[#F2F3F5]"
          aria-label="Send by mic"
        >
          <Mic size={18} className="text-[#B4B8BF]" />
        </button>
      </div>
    </div>
    {/* Drag Handle (like iOS home bar) */}
    <div className="flex justify-center items-center mt-[8px]">
      <div className="w-[135px] h-[5px] bg-black/75 rounded-full opacity-60"></div>
    </div>
  </div>
);

export default ChatInput;
