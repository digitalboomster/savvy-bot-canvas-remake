
import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

interface CaptureReceiptPageProps {
  onBack: () => void;
}

const FRAME_WIDTH = 340;
const FRAME_HEIGHT = 400;

const CaptureReceiptPage: React.FC<CaptureReceiptPageProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setError(null);
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setCameraReady(true);
        }
      } catch {
        setError("Cannot access camera. Please allow camera access.");
        setCameraReady(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = FRAME_WIDTH - 44;
    canvas.height = FRAME_HEIGHT - 44;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      console.log('Captured image', dataUrl);
    }
  };

  const mainBg =
    isDarkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
      : "bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col items-center ${mainBg} transition-colors duration-300`}>
      {/* Header - unified */}
      <div className={`w-full max-w-md flex items-center justify-between px-1 py-4 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'} bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-sm`}>
        <button
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors duration-200 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}
          aria-label="Back"
        >
          <ArrowLeft size={22} className={isDarkMode ? "text-gray-300" : "text-neutral-950"} />
        </button>
        <h1 className="text-xl font-black tracking-tight text-neutral-900 dark:text-white text-center flex-1">Capture Receipt</h1>
        <span className="block w-[40px] h-[28px]" />
      </div>
      {/* Main container */}
      <main className="w-full flex flex-col items-center mt-8 px-4">
        <section
          className={`relative rounded-2xl flex items-center justify-center overflow-visible shadow-xl border ${isDarkMode ? "border-white/10 bg-[#181818]/90" : "border-black/10 bg-white"} mb-8`}
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
          }}
        >
          {/* Yellow Corner SVGs */}
          <svg
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
            viewBox={`0 0 ${FRAME_WIDTH} ${FRAME_HEIGHT}`}
            className="absolute pointer-events-none select-none z-10"
          >
            {/* Top Left */}
            <path d="M20,60 Q20,20 60,20" stroke="#F7A900" strokeWidth="6" fill="none" />
            {/* Top Right */}
            <path d={`M${FRAME_WIDTH - 60},20 Q${FRAME_WIDTH - 20},20 ${FRAME_WIDTH - 20},60`} stroke="#F7A900" strokeWidth="6" fill="none" />
            {/* Bottom Left */}
            <path d={`M20,${FRAME_HEIGHT - 60} Q20,${FRAME_HEIGHT - 20} 60,${FRAME_HEIGHT - 20}`} stroke="#F7A900" strokeWidth="6" fill="none" />
            {/* Bottom Right */}
            <path d={`M${FRAME_WIDTH - 60},${FRAME_HEIGHT - 20} Q${FRAME_WIDTH - 20},${FRAME_HEIGHT - 20} ${FRAME_WIDTH - 20},${FRAME_HEIGHT - 60}`} stroke="#F7A900" strokeWidth="6" fill="none" />
          </svg>
          {/* Camera Video */}
          <div
            className="absolute left-[20px] top-[20px] w-[calc(100%-40px)] h-[calc(100%-40px)] rounded-[17px] bg-black flex items-center justify-center overflow-hidden z-0"
          >
            {!isCameraReady && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white font-medium text-center z-30 text-base">
                Loading camera...
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white font-medium text-center z-30 px-4 rounded-xl">
                {error}
              </div>
            )}
            <video
              ref={videoRef}
              className="w-full h-full object-contain rounded-[17px] transition-opacity duration-200 bg-[#181818] min-h-0"
              autoPlay
              playsInline
              muted
              aria-label="Camera preview"
              style={{
                opacity: isCameraReady ? 1 : 0,
              }}
            />
            {/* Overlay Instruction */}
            {isCameraReady && !error && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-[6px] rounded-full text-[15px] text-white font-medium z-20 pointer-events-none select-none shadow-sm">
                Position receipt in frame
              </div>
            )}
          </div>
        </section>
        {/* Action Buttons */}
        <div className="w-full max-w-xs flex flex-col gap-3">
          <Button
            className="w-full text-base font-bold flex items-center justify-center gap-2 h-12 rounded-xl shadow-lg"
            onClick={handleCapture}
            variant={isDarkMode ? "default" : "secondary"}
            size="lg"
          >
            <Camera size={22} className="mr-1" />
            Capture Receipt
          </Button>
          <Button
            className="w-full text-base font-medium flex items-center justify-center gap-2 h-12 rounded-xl shadow-lg"
            variant={isDarkMode ? "outline" : "default"}
            size="lg"
          >
            <Upload size={22} className="mr-1" />
            Upload from gallery
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CaptureReceiptPage;
