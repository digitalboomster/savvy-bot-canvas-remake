
import React from "react";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaptureReceiptPageProps {
  onBack: () => void;
  isDarkMode: boolean;
}

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
  const border = isDarkMode ? "border-white/10" : "border-black/10";
  const text = isDarkMode ? "text-white" : "text-gray-900";
  const bg = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    : "bg-gradient-to-br from-gray-100 via-white to-gray-50";

  return (
    <div className={`min-h-screen flex flex-col ${bg} transition-colors duration-200`}>
      {/* HEADER */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${border} bg-background z-10`}>
        <Button
          onClick={onBack}
          size="icon"
          variant="ghost"
          className="rounded-lg"
          aria-label="Back"
        >
          <ArrowLeft className={isDarkMode ? "text-gray-300" : "text-gray-600"} size={24} />
        </Button>
        <h1 className="text-base sm:text-lg font-semibold tracking-tight flex items-center gap-2">
          <span role="img" aria-label="bee" className="text-2xl">🐝</span>
          <span>Capture Receipt</span>
        </h1>
        <span className="text-xs font-medium opacity-60">{formattedDate}</span>
      </div>

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center mt-8 px-3 pb-12 w-full">
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          {/* Camera Preview (Minimal, glassy, like card/input) */}
          <div className={`w-full aspect-[16/11] rounded-2xl border ${border} bg-background/85 shadow-md flex items-center justify-center relative`}>
            <div className="flex flex-col items-center">
              <div className={`p-4 bg-background/50 rounded-full border ${border}`}>
                <Camera size={40} className={isDarkMode ? "text-gray-300" : "text-gray-500"} />
              </div>
              <span className={`mt-4 text-base font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"} text-center`}>
                Place your receipt inside the frame
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-3">
            <Button
              className="w-full rounded-lg font-semibold text-base py-2"
              variant={isDarkMode ? "secondary" : "default"}
              aria-label="Capture Receipt"
            >
              <Camera size={20} className={isDarkMode ? "text-gray-200" : "text-gray-700"} />
              <span>Capture Photo</span>
            </Button>
            <Button
              className="w-full rounded-lg font-semibold text-base py-2"
              variant={isDarkMode ? "ghost" : "outline"}
              aria-label="Upload from gallery"
            >
              <Upload size={18} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
              <span>Upload from device</span>
            </Button>
          </div>

          {/* Instructions */}
          <div className="w-full">
            <p className={`text-center leading-snug text-[15px] mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Capture a clear photo of your receipt, bill, or bank statement.
              <br />
              <span className="font-medium">Make sure all details are visible.</span>
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={`w-full py-2 border-t text-center text-xs font-medium ${border} ${isDarkMode ? "bg-background/60 text-gray-400" : "bg-background/85 text-gray-500"}`}>
        This chatbot is for guidance only &mdash; seek professional help when needed.
      </footer>
    </div>
  );
};

export default CaptureReceiptPage;
