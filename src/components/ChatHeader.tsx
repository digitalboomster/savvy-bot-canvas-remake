import React from 'react';
import { ChevronLeft, Moon, Sun, Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isAlwaysDark?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isDarkMode, toggleTheme, isAlwaysDark }) => {
  const navigate = useNavigate();
  const onDarkBg = isAlwaysDark || isDarkMode;

  return (
    <div className={`flex items-center justify-between p-4`}>
      <button 
        onClick={() => navigate('/')}
        className={`p-2 hover:${onDarkBg ? 'bg-white/10' : 'bg-black/10'} rounded-lg transition-colors duration-200`}
      >
        <ChevronLeft size={24} className={onDarkBg ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"} />
      </button>
      <h1 className="text-xl font-semibold">Savvy Bot</h1>
      <div className="flex items-center gap-2">
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors duration-200 ${onDarkBg ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode 
            ? <Sun size={22} className="text-yellow-400" />
            : <Moon size={22} className={onDarkBg ? "text-gray-300" : "text-gray-800"} />
          }
        </button>
        {/* Existing three dots menu (static visual) */}
        <button
          className={`p-2 rounded-lg transition-colors duration-200 ${onDarkBg ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
          aria-label="More options"
        >
          <Ellipsis size={22} className={onDarkBg ? "text-gray-300" : "text-gray-600"} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
