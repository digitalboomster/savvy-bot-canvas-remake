
import React from "react";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaptureReceiptPageProps {
  onBack: () => void;
  isDarkMode: boolean;
}

// Date formatting as before
const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const CaptureReceiptPage: React.FC<CaptureReceiptPageProps> = ({
  onBack,
  isDarkMode
}) => {
  // color and background setup for theme
  const headerBg = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    : "bg-gradient-to-br from-gray-100 via-white to-gray-50";

  const shadowClass = isDarkMode
    ? "shadow-lg shadow-black/40"
    : "shadow-md shadow-gray-600/10";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900"
      }`}
    >
      {/* HEADER (matches chat header style) */}
      <div
        className={`relative z-10 w-full flex items-center justify-between px-4 py-3 md:py-4 ${headerBg} border-b ${isDarkMode ? "border-white/10" : "border-black/10"} backdrop-blur`}
      >
        <Button
          onClick={onBack}
          size="icon"
          variant="ghost"
          className={`rounded-full p-2 ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}
          aria-label="Back"
        >
          <ArrowLeft className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"} size={26} />
        </Button>
        <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <span role="img" aria-label="bee" className="text-2xl">🐝</span>
          Capture Receipt
        </h1>
        <div className="text-xs md:text-base font-medium opacity-70">{formattedDate}</div>
      </div>

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center mt-8 px-3 pb-12 w-full transition-colors">
        <div className="w-full max-w-lg flex flex-col items-center gap-8">
          {/* Camera Preview Area */}
          <div
            className={`
              w-full max-w-md aspect-[16/11] rounded-xl overflow-hidden border
              border-muted ${shadowClass}
              flex items-center justify-center relative
              ${isDarkMode
                ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-white/10"
                : "bg-gradient-to-br from-gray-100 via-white to-gray-50 border-black/10"
              }
              backdrop-blur-md
            `}
          >
            {/* Camera target frame overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <svg width="90%" height="90%" viewBox="0 0 320 220" className="rounded-lg">
                <rect
                  x="8"
                  y="8"
                  width="304"
                  height="204"
                  rx="16"
                  fill="none"
                  stroke={isDarkMode ? "#FFD062" : "#f7a900"}
                  strokeWidth="3.5"
                  opacity="0.85"
                />
              </svg>
            </div>
            {/* Placeholder camera icon/instructions */}
            <div className="z-10 flex flex-col items-center">
              <div className="p-4 rounded-full bg-black/30">
                <Camera size={48} className={`mb-2 ${isDarkMode ? "text-[#FFD062]/70" : "text-yellow-400/50"}`} />
              </div>
              <span className={`mt-2 font-medium text-center text-base ${isDarkMode ? "text-white/90" : "text-gray-800/80"}`}>
                Position your receipt<br />fully inside the frame
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              className={`
                w-full py-3 rounded-xl font-semibold text-base justify-center gap-2
                ${isDarkMode
                  ? "bg-secondary/70 text-yellow-200 hover:bg-secondary/90"
                  : "bg-[#fffcee] text-yellow-700 hover:bg-yellow-100"
                }
                border-2 ${isDarkMode ? "border-white/10" : "border-yellow-200"}
                transition
                shadow-md
              `}
              variant="secondary"
              aria-label="Capture Receipt"
            >
              <Camera size={22} className={isDarkMode ? "text-yellow-300" : "text-yellow-600"} />
              Capture
            </Button>
            <Button
              className={`
                w-full py-3 rounded-xl font-semibold text-base justify-center gap-2
                ${isDarkMode
                  ? "bg-white/5 text-yellow-200 hover:bg-white/10"
                  : "bg-white text-yellow-700 hover:bg-yellow-50 border border-yellow-200"
                }
                transition
                shadow-md
              `}
              variant={isDarkMode ? "ghost" : "outline"}
              aria-label="Upload from gallery"
            >
              <Upload size={20} className={isDarkMode ? "text-yellow-200" : "text-yellow-600"} />
              Upload from gallery
            </Button>
          </div>

          {/* Instructions */}
          <div className="w-full mt-2">
            <p className={`text-center font-medium leading-snug ${isDarkMode ? "text-white/80" : "text-gray-800/90"} px-4`}>
              Take a clear photo of your receipt, bill, or bank statement.<br />
              <span className={`font-semibold ${isDarkMode ? "text-yellow-200" : "text-yellow-700"}`}>Ensure all details are readable for best results.</span>
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER to match app style */}
      <footer className={`w-full py-2 border-t text-center text-xs font-medium backdrop-blur
        ${isDarkMode
          ? "bg-black/40 border-white/10 text-gray-400"
          : "bg-white/60 border-black/10 text-gray-500"
        }
      `}>
        This chatbot is for guidance only &mdash; seek professional help when needed.
      </footer>
    </div>
  );
};

export default CaptureReceiptPage;
