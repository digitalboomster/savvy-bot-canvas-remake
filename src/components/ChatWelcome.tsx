
import React from "react";

interface ChatWelcomeProps {
  isDarkMode: boolean;
  starterPrompts: string[];
  onPromptClick: (prompt: string) => void;
}

const AiAvatar = ({ isDarkMode }: { isDarkMode: boolean }) => (
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
);

const ChatWelcome: React.FC<ChatWelcomeProps> = ({
  isDarkMode, starterPrompts, onPromptClick
}) => {
  return (
    <div className="p-6 space-y-6">
      {/* AI Welcome Message */}
      <div className={`${isDarkMode ? 'bg-gray-100' : 'bg-white shadow-sm border border-gray-200'} rounded-2xl p-4`}>
        <div className="flex items-start gap-3">
          <AiAvatar isDarkMode={isDarkMode} />
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
