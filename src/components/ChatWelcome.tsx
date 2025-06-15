
import React from 'react';

interface ChatWelcomeProps {
  isDarkMode: boolean;
  starterPrompts: string[];
  onPromptClick: (prompt: string) => void;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({
  isDarkMode,
  starterPrompts,
  onPromptClick
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 pb-32">
      <div className="w-full max-w-2xl mx-auto">
        {/* Bot Avatar and Welcome Message */}
        <div className="flex items-start gap-3 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex-shrink-0`}>
            <span className="text-lg">🐝</span>
          </div>
          <div className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl rounded-tl-md px-4 py-3`}>
            <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-base leading-relaxed`}>
              Hey there! 👋 I'm Savvy, your smart assistant here on SavvyBee — built to help you take control of your money, one simple step at a time.
            </p>
          </div>
        </div>

        {/* Starter Prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {starterPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onPromptClick(prompt)}
              className={`p-4 text-left rounded-xl border transition-all duration-200 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-750' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="text-sm font-medium">{prompt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWelcome;
