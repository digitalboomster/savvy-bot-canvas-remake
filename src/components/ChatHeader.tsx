
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  return (
    <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
      <button 
        onClick={() => navigate('/')}
        className={`p-2 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg transition-colors duration-200`}
      >
        <ArrowLeft size={24} className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"} />
      </button>
      <h1 className="text-xl font-semibold">Savvy Bot</h1>
      <button 
        onClick={toggleTheme}
        className={`p-2 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg transition-colors duration-200`}
      >
        <div className="flex flex-col gap-1">
          <div className={`w-1 h-1 ${isDarkMode ? 'bg-gray-300' : 'bg-gray-600'} rounded-full`}></div>
          <div className={`w-1 h-1 ${isDarkMode ? 'bg-gray-300' : 'bg-gray-600'} rounded-full`}></div>
          <div className={`w-1 h-1 ${isDarkMode ? 'bg-gray-300' : 'bg-gray-600'} rounded-full`}></div>
        </div>
      </button>
    </div>
  );
};

export default ChatHeader;
