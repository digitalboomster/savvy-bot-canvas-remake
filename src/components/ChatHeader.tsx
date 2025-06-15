
import React from "react";
import { useTheme } from "../context/ThemeContext";

const ChatHeader = () => {
  const { isDark } = useTheme();

  // Color palette derived from your screenshots
  const bgColor = isDark
    ? "bg-[#232325]"
    : "bg-gradient-to-b from-yellow-100 via-yellow-50 to-white";
  const borderColor = isDark ? "border-none" : "border border-yellow-300";

  return (
    <div
      className={`rounded-b-3xl ${bgColor} w-full px-5 pt-7 pb-7 shadow-lg relative z-10 ${borderColor}`}
      style={{
        borderBottomLeftRadius: "2rem",
        borderBottomRightRadius: "2rem",
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center border-4 border-yellow-200 overflow-hidden shadow-inner">
          {/* Can swap this with an image in future if needed */}
          <span className="text-2xl">😎</span>
        </div>
        <span className="text-xl font-semibold text-white dark:text-white" style={{letterSpacing: 0.5}}>
          Hi There
        </span>
      </div>
      <div>
        <p className="text-white text-sm mt-1 opacity-90">
          This is private message, between you and budddy.<br />
          This chat is end to end encrypted...
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
