
import React from "react";

interface ChatWelcomeProps {
  isDarkMode: boolean;
  starterPrompts: string[];
  onPromptClick: (prompt: string) => void;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({
  isDarkMode, starterPrompts, onPromptClick
}) => {
  return (
    <div className="p-6 space-y-6">
      {/* Privacy Message */}
      <div className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-sm border rounded-2xl p-6`}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shrink-0">
            <span className="text-lg">🤖</span>
          </div>
          <div className="flex-1">
            <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              This is private message, between you and buddy. This chat is end to end encrypted...
            </p>
          </div>
        </div>
      </div>
      {/* AI Welcome Message */}
      <div className={`${isDarkMode ? 'bg-gray-100' : 'bg-white shadow-sm border border-gray-200'} rounded-2xl p-4`}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shrink-0">
            <span className="text-lg">🤖</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-800">
              Hey there! 👋 I'm Savvy, your smart assistant here on SavvyBee — built to help you take control of your money, one simple step at a time.
            </p>
          </div>
        </div>
      </div>
      {/* Starter Prompts */}
      <div className="grid grid-cols-2 gap-3">
        {starterPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className={`${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'} backdrop-blur-sm border rounded-xl p-4 text-left transition-all duration-200 text-sm`}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatWelcome;
