
import React from "react";
import { ArrowLeft, Camera, Upload } from "lucide-react";

interface CaptureReceiptPageProps {
  onBack: () => void;
}

const CaptureReceiptPage: React.FC<CaptureReceiptPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Header */}
      <div className="relative flex items-center justify-center py-6 px-2 border-b border-black/10">
        <button
          onClick={onBack}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-black/5 transition"
          aria-label="Back"
        >
          <ArrowLeft size={26} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black text-center flex-1" style={{letterSpacing: "-0.01em"}}>
          Capture Receipt
        </h1>
        {/* Placeholder for three dots (right align, hidden visually for now) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="block w-7 h-7" />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-0 px-5">
        {/* Camera Frame */}
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Dark gray area with bold yellow corners and white label */}
          <div className="relative w-full h-[420px] max-w-[400px] rounded-2xl overflow-visible bg-transparent flex items-center justify-center mb-8">
            {/* SVG border corners */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 360 420"
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            >
              {/* Corner paths: 8px thick yellow */}
              {/* Top Left */}
              <path d="M25,72 Q25,25 72,25" stroke="#F7A900" strokeWidth="8" fill="none" />
              {/* Top Right */}
              <path d="M288,25 Q335,25 335,72" stroke="#F7A900" strokeWidth="8" fill="none" />
              {/* Bottom Left */}
              <path d="M25,348 Q25,395 72,395" stroke="#F7A900" strokeWidth="8" fill="none" />
              {/* Bottom Right */}
              <path d="M288,395 Q335,395 335,348" stroke="#F7A900" strokeWidth="8" fill="none" />
            </svg>
            {/* Dark gray frame area */}
            <div className="absolute left-[25px] top-[25px] right-[25px] bottom-[25px] bg-neutral-700 rounded-2xl flex items-start justify-center z-0" />
            {/* Label */}
            <span className="z-10 absolute top-9 left-1/2 -translate-x-1/2 text-white font-medium text-lg pointer-events-none select-none">
              Position Receipt in frame
            </span>
          </div>
        </div>

        {/* Capture Button */}
        <button
          className="w-full max-w-md h-14 rounded-xl border-2 border-[#F7A900] bg-[#FFD426] hover:bg-[#ffc800] text-black font-bold text-lg flex items-center justify-center gap-2 shadow-sm transition active:scale-98 mb-4"
          aria-label="Capture Receipt"
        >
          <Camera size={22} className="mr-2" />
          Capture Receipt
        </button>

        {/* Upload Button */}
        <button
          className="w-full max-w-md h-14 rounded-xl border-2 border-[#F7A900] bg-black hover:bg-neutral-900 text-white font-medium text-lg flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
          aria-label="Upload from gallery"
          style={{marginBottom: "12px"}}
        >
          <Upload size={22} className="mr-2" />
          Upload from gallery
        </button>
      </div>

      {/* (Hidden) Footer help note */}
      {/* <div className="absolute bottom-0 left-0 w-full py-2 bg-[#f9f9f9] border-t text-center text-gray-400 text-sm">
        This chatbot is for guidance only; seek professional help when needed.
      </div> */}
    </div>
  );
};

export default CaptureReceiptPage;

