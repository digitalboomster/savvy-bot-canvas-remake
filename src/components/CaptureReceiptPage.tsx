import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, Camera, Upload } from "lucide-react";

interface CaptureReceiptPageProps {
  onBack: () => void;
}

const FRAME_WIDTH = 360;
const FRAME_HEIGHT = 420;

const CaptureReceiptPage: React.FC<CaptureReceiptPageProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
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
    // Optionally: Take a frame and show a toast or do something
    const canvas = document.createElement("canvas");
    canvas.width = FRAME_WIDTH - 50;
    canvas.height = FRAME_HEIGHT - 50;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      // Optionally trigger a callback with the screenshot or show a preview
      // For demo: just log to console
      const dataUrl = canvas.toDataURL("image/png");
      console.log('Captured image', dataUrl);
    }
  };

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
        <h1 className="text-xl font-bold text-black text-center flex-1" style={{ letterSpacing: "-0.01em" }}>
          Capture Receipt
        </h1>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="block w-7 h-7" />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-0 px-5">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Camera Frame + Corners */}
          <div
            className="relative w-full h-[420px] max-w-[400px] rounded-2xl overflow-visible flex items-center justify-center mb-8"
            style={{
              background: "transparent",
              width: `${FRAME_WIDTH}px`,
              height: `${FRAME_HEIGHT}px`,
            }}
          >
            {/* SVG yellow corners */}
            <svg
              width={FRAME_WIDTH}
              height={FRAME_HEIGHT}
              viewBox={`0 0 ${FRAME_WIDTH} ${FRAME_HEIGHT}`}
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            >
              {/* Top Left */}
              <path d="M25,72 Q25,25 72,25" stroke="#F7A900" strokeWidth="8" fill="none" />
              {/* Top Right */}
              <path d={`M${FRAME_WIDTH - 72},25 Q${FRAME_WIDTH - 25},25 ${FRAME_WIDTH - 25},72`} stroke="#F7A900" strokeWidth="8" fill="none" />
              {/* Bottom Left */}
              <path d={`M25,${FRAME_HEIGHT - 72} Q25,${FRAME_HEIGHT - 25} 72,${FRAME_HEIGHT - 25}`} stroke="#F7A900" strokeWidth="8" fill="none" />
              {/* Bottom Right */}
              <path d={`M${FRAME_WIDTH - 72},${FRAME_HEIGHT - 25} Q${FRAME_WIDTH - 25},${FRAME_HEIGHT - 25} ${FRAME_WIDTH - 25},${FRAME_HEIGHT - 72}`} stroke="#F7A900" strokeWidth="8" fill="none" />
            </svg>
            {/* Camera Video Feed */}
            <div className="absolute left-[25px] top-[25px] right-[25px] bottom-[25px] bg-black flex items-center justify-center rounded-2xl overflow-hidden z-0">
              {!isCameraReady && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 text-white font-medium text-center">
                  Loading camera...
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 text-white text-center p-4 rounded-2xl">
                  {error}
                </div>
              )}
              {/* Video keeps 16:9 aspect ratio, fills container */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-2xl"
                autoPlay
                playsInline
                muted
                aria-label="Camera preview"
                style={{
                  opacity: isCameraReady ? 1 : 0,
                  transition: "opacity .2s",
                  background: "#171717",
                  minHeight: 0,
                }}
              />
            </div>
            {/* Overlay label (optional, but keep for good UX) */}
            <span className="z-20 absolute top-9 left-1/2 -translate-x-1/2 text-white font-medium text-lg bg-black/40 px-3 py-1 rounded-full pointer-events-none select-none">
              Position Receipt in frame
            </span>
          </div>
        </div>
        {/* Capture Button */}
        <button
          className="w-full max-w-md h-14 rounded-xl border-2 border-[#F7A900] bg-[#FFD426] hover:bg-[#ffc800] text-black font-bold text-lg flex items-center justify-center gap-2 shadow-sm transition active:scale-98 mb-4"
          aria-label="Capture Receipt"
          onClick={handleCapture}
        >
          <Camera size={22} className="mr-2" />
          Capture Receipt
        </button>

        {/* Upload Button */}
        <button
          className="w-full max-w-md h-14 rounded-xl border-2 border-[#F7A900] bg-black hover:bg-neutral-900 text-white font-medium text-lg flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
          aria-label="Upload from gallery"
          style={{ marginBottom: "12px" }}
        >
          <Upload size={22} className="mr-2" />
          Upload from gallery
        </button>
      </div>
    </div>
  );
};

export default CaptureReceiptPage;
