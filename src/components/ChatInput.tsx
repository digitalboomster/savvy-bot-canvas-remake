
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
  <div className="w-full px-0 pb-4 pt-2 bg-transparent">
    <div className="flex items-end justify-center w-full">
      <div className="relative w-full max-w-[402px] flex items-center">
        {/* Plus Button */}
        <button
          onClick={onFeaturesButtonClick}
          aria-label="Show chat features"
          type="button"
          className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border-none bg-[#E8E9EB] hover:bg-[#C5C5C7] transition ${featuresRotated ? 'rotate-45' : ''}`}
          style={{outline: 'none'}}
        >
          <Plus size={20} className="text-[#7D7F85]" />
        </button>
        {/* Input Field */}
        <div
          className={`mx-auto w-[328px] min-h-[42px] pl-12 pr-12 py-2.5 rounded-full border focus-within:border-[#C5C5C7] border-[#C5C5C7] bg-white flex items-center font-manrope transition-all`}
          style={{
            outline: '1px #C5C5C7 solid',
            outlineOffset: '-1px',
            fontFamily: "'Manrope', sans-serif"
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSend(inputText)}
            placeholder="Message to Savvy..."
            className="w-full border-none bg-transparent px-0 text-[15px] font-normal outline-none focus:outline-none placeholder:text-[#B4B8BF] text-[#1A1D20] font-manrope"
            style={{lineHeight: 1.45}}
          />
        </div>
        {/* Mic Button */}
        <button
          onClick={() => onSend(inputText)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition hover:bg-[#F2F3F5]"
          aria-label="Send by mic"
        >
          <Mic size={20} className="text-[#B4B8BF]" />
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

