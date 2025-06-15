
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
  <div className={`fixed bottom-0 left-0 right-0 p-4 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
    <div className="max-w-4xl mx-auto flex items-center gap-3">
      {/* Features Button */}
      <button
        onClick={onFeaturesButtonClick}
        className={`p-3 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-full transition-all duration-200 ${
          featuresRotated ? 'rotate-45' : ''
        }`}
        aria-label="Show chat features"
        type="button"
      >
        <Plus size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
      </button>
      
      {/* Input Container */}
      <div className={`flex-1 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full px-4 py-3`}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend(inputText)}
          placeholder="Message to Savvy..."
          className={`flex-1 bg-transparent ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} outline-none px-2 text-base`}
        />
        <button
          onClick={() => onSend(inputText)}
          className={`p-2 hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full transition-colors duration-200`}
        >
          <Mic size={18} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
        </button>
      </div>
    </div>
    
    {/* Safe area for mobile devices */}
    <div className="h-safe-area-inset-bottom"></div>
  </div>
);

export default ChatInput;
