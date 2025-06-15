
import React from "react";
import { ArrowLeft, Camera, Upload } from "lucide-react";

interface CaptureReceiptPageProps {
  onBack: () => void;
}

const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const CaptureReceiptPage: React.FC<CaptureReceiptPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] relative">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#f7a900]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="Back"
        >
          <ArrowLeft className="text-white" size={26} />
        </button>
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center bg-white">
            {/* bee emoji (replace with logo if needed) */}
            <span className="text-2xl" role="img" aria-label="bee">🐝</span>
          </span>
          <span className="text-white text-lg font-semibold">
            Capture Receipt
          </span>
        </div>
        <span className="text-white text-sm">{formattedDate}</span>
      </div>
      {/* Camera Frame */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-black p-5 flex flex-col items-center mb-6 shadow-lg">
            <div className="w-full flex flex-col gap-3 items-center">
              <span className="text-white font-medium mb-2 text-center">
                Position receipt in frame
              </span>
              <div className="relative w-full h-[300px] bg-black rounded-2xl flex items-center justify-center border-4 border-transparent">
                {/* Yellow border corners, SVG overlays */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 320 300"
                  className="absolute left-0 top-0 pointer-events-none"
                  style={{ zIndex: 3, borderRadius: "18px" }}
                >
                  <rect
                    x="10"
                    y="10"
                    width="300"
                    height="280"
                    rx="14"
                    fill="none"
                    stroke="#F7A900"
                    strokeWidth="3"
                  />
                  {/* Four corner accents */}
                  <line x1="10" y1="20" x2="10" y2="10" stroke="#F7A900" strokeWidth="6"/>
                  <line x1="10" y1="10" x2="35" y2="10" stroke="#F7A900" strokeWidth="6"/>
                  
                  <line x1="310" y1="10" x2="285" y2="10" stroke="#F7A900" strokeWidth="6"/>
                  <line x1="310" y1="10" x2="310" y2="35" stroke="#F7A900" strokeWidth="6"/>

                  <line x1="10" y1="290" x2="10" y2="265" stroke="#F7A900" strokeWidth="6"/>
                  <line x1="10" y1="290" x2="35" y2="290" stroke="#F7A900" strokeWidth="6"/>

                  <line x1="310" y1="290" x2="310" y2="265" stroke="#F7A900" strokeWidth="6"/>
                  <line x1="310" y1="290" x2="285" y2="290" stroke="#F7A900" strokeWidth="6"/>
                </svg>
                {/* Camera preview would go here in real implementation */}
                <div className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
        {/* Capture Button */}
        <button
          className="w-full max-w-md flex items-center justify-center gap-2 rounded-xl bg-[#ffd8a3] text-[#333] font-semibold py-3 px-4 mb-4 transition-colors duration-150 active:scale-95 shadow"
          aria-label="Capture Receipt"
        >
          <Camera size={22} className="mr-2" />
          Capture Receipt
        </button>
        <p className="text-gray-500 text-center mb-5 max-w-md">
          Position your receipt or bank statement within the frame and ensure all text is clearly visible
        </p>
        {/* Upload from Gallery  */}
        <button
          className="w-full max-w-xs flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2 px-4 shadow-sm text-[#222] font-medium hover:bg-gray-50 transition-colors duration-150"
          aria-label="Upload from gallery"
        >
          <Upload size={20} />
          Upload from gallery
        </button>
      </div>
      {/* Footer help note */}
      <div className="absolute bottom-0 left-0 w-full py-2 bg-[#f9f9f9] border-t text-center text-gray-400 text-sm">
        This chatbot is for guidance only; seek professional help when needed.
      </div>
    </div>
  );
};

export default CaptureReceiptPage;
