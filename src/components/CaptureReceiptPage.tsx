
import React from "react";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

// Get today's date in DD/MM/YYYY
const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

interface CaptureReceiptPageProps {
  onBack: () => void;
}

const CaptureReceiptPage: React.FC<CaptureReceiptPageProps> = ({ onBack }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* HEADER */}
      <header className="w-full flex items-center justify-between px-4 py-3 md:py-4 bg-[#f7a900] md:rounded-b-3xl shadow-sm z-10">
        <Button
          onClick={onBack}
          size="icon"
          variant="ghost"
          className="bg-[#f7a900] hover:bg-[#ffd18a] rounded-full"
          aria-label="Back"
        >
          <ArrowLeft className="text-white" size={28} />
        </Button>
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl" role="img" aria-label="bee">🐝</span>
          </span>
          <span className="text-white text-lg md:text-xl font-bold tracking-tight select-none">
            Capture Receipt
          </span>
        </div>
        <span className="text-white text-xs md:text-base font-medium select-none">{formattedDate}</span>
      </header>

      {/* MAIN (camera area, explanations, actions) */}
      <main className="flex-1 w-full flex flex-col items-center justify-start px-3 py-6 md:py-10 bg-background">
        {/* Camera area */}
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <div className="w-full">
            <div className="relative w-full mx-auto flex justify-center">
              <div className="w-full aspect-[16/11] max-w-md bg-black rounded-xl flex items-center justify-center shadow-lg overflow-hidden border-4 border-transparent">
                {/* Camera visual anchor: yellow corners SVG */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 320 220"
                  className="absolute left-0 top-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 2, borderRadius: "14px" }}
                >
                  <rect
                    x="8"
                    y="8"
                    width="304"
                    height="204"
                    rx="13"
                    fill="none"
                    stroke="#f7a900"
                    strokeWidth="3"
                  />
                  {/* Corner accents */}
                  <line x1="8" y1="24" x2="8" y2="8" stroke="#f7a900" strokeWidth="6"/>
                  <line x1="8" y1="8" x2="36" y2="8" stroke="#f7a900" strokeWidth="6"/>
                  <line x1="312" y1="8" x2="284" y2="8" stroke="#f7a900" strokeWidth="6"/>
                  <line x1="312" y1="8" x2="312" y2="36" stroke="#f7a900" strokeWidth="6"/>
                  <line x1="8" y1="212" x2="8" y2="184" stroke="#f7a900" strokeWidth="6"/>
                  <line x1="8" y1="212" x2="36" y2="212" stroke="#f7a900" strokeWidth="6"/>
                  <line x1="312" y1="212" x2="284" y2="212" stroke="#f7a900" strokeWidth="6"/>
                  <line x1="312" y1="212" x2="312" y2="184" stroke="#f7a900" strokeWidth="6"/>
                </svg>
                {/* Placeholder for camera preview: just a subtlely faded icon */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  <Camera size={56} className="text-[#f7a900]/50 mb-2 animate-bounce" />
                  <span className="text-white text-base font-semibold drop-shadow text-center">
                    Position your receipt<br/>fully inside the frame
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Camera and upload actions */}
          <div className="w-full flex flex-col gap-4 mt-8 max-w-md">
            {/* Capture */}
            <Button
              className="w-full bg-[#ffd8a3] text-[#222] font-bold text-lg gap-3 rounded-xl py-4 shadow hover:bg-[#f7a900]/80 transition"
              aria-label="Capture Receipt"
              variant="secondary"
            >
              <Camera size={22} className="text-[#E08800]" />
              Capture Receipt
            </Button>
            {/* Upload option */}
            <Button
              className="w-full bg-white border border-gray-300 text-[#333] font-semibold rounded-lg py-3 gap-2 shadow-sm hover:bg-gray-50 transition"
              aria-label="Upload from gallery"
              variant="outline"
            >
              <Upload size={20} className="text-[#059470]" />
              Upload from gallery
            </Button>
          </div>

          {/* Instructions */}
          <div className="w-full max-w-md mt-6">
            <p className="text-gray-500 text-center text-base md:text-lg font-medium leading-snug px-3">
              Take a clear photo of your receipt, bill, or bank statement.<br/>
              <span className="font-semibold text-[#f7a900]">Ensure all details are readable for best results.</span>
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-2 bg-[#f9f9f9] border-t border-muted text-center text-gray-400 text-xs md:text-sm font-medium select-none">
        This chatbot is for guidance only &mdash; seek professional help when needed.
      </footer>
    </div>
  );
};

export default CaptureReceiptPage;

