
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
  <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
    <div className="flex items-center gap-3">
      {/* Features Button (cross/plus rotated) */}
      <button
        onClick={onFeaturesButtonClick}
        className={`p-3 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'} backdrop-blur-sm border rounded-full transition-all duration-200 ${
          featuresRotated ? 'rotate-45' : ''
        }`}
        aria-label="Show chat features"
        type="button"
      >
        <Plus size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
      </button>
      {/* Input */}
      <div className={`flex-1 flex items-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-sm border rounded-full px-4 py-2`}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend(inputText)}
          placeholder="Message to Savvy..."
          className={`flex-1 bg-transparent ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} outline-none px-2`}
        />
        <button
          onClick={() => onSend(inputText)}
          className={`p-2 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-full transition-colors duration-200`}
        >
          <Mic size={20} className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"} />
        </button>
      </div>
    </div>
  </div>
);

export default ChatInput;
