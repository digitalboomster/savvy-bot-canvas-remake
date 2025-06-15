
import React from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`flex items-center justify-between px-4 py-3 border-b ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
      <button 
        onClick={() => navigate('/')}
        className={`p-2 hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg transition-colors duration-200`}
      >
        <ArrowLeft size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
      </button>
      
      <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Savvy Bot
      </h1>
      
      <button
        onClick={toggleTheme}
        className={`p-2 hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg transition-colors duration-200`}
        aria-label="More options"
      >
        <MoreVertical size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
      </button>
    </div>
  );
};

export default ChatHeader;
