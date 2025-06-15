
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, Camera, Upload } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import ReceiptCameraFrame from "./ReceiptCameraFrame";
import { toast } from "@/hooks/use-toast";

interface CaptureReceiptPageProps {
  onBack: () => void;
}

const BACKEND_URL = "https://4d9a25eb-4793-482a-a348-2e1c21e2b286-00-2gfu2fuimic4.kirk.replit.dev";
const FRAME_WIDTH = 340;
const FRAME_HEIGHT = 400;

// Helper: base64 => Blob
function dataURLtoBlob(dataurl: string) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)?.[1] || '';
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}

const CaptureReceiptPage: React.FC<CaptureReceiptPageProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleCapture = async () => {
    if (!videoRef.current || !isCameraReady) return;
    try {
      setUploading(true);
      const canvas = document.createElement('canvas');
      canvas.width = FRAME_WIDTH - 40;
      canvas.height = FRAME_HEIGHT - 40;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/png');
      const formData = new FormData();
      formData.append('file', dataURLtoBlob(dataUrl), 'receipt.png');

      const response = await fetch(`${BACKEND_URL}/upload-receipt`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Upload failed');
      toast({
        title: "Receipt uploaded",
        description: "Your receipt photo has been sent!"
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Could not upload receipt. Try again."
      });
    } finally {
      setUploading(false);
    }
  };

  // Handle file upload from gallery for images only
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file, file.name || "receipt.png");
      const response = await fetch(`${BACKEND_URL}/upload-receipt`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error("Upload failed");
      toast({
        title: "Receipt uploaded",
        description: "Image from gallery sent!"
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Could not upload file. Try again."
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const mainBg =
    isDarkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
      : "bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col items-center ${mainBg} transition-colors duration-300`}>
      {/* Header */}
      <div className={`w-full max-w-md flex items-center justify-between px-1 py-4 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'} bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-sm`}>
        <button
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors duration-200 hover:${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}
          aria-label="Back"
        >
          <ChevronLeft size={22} className={isDarkMode ? "text-gray-300" : "text-neutral-950"} />
        </button>
        <h1 className="text-xl font-black tracking-tight text-neutral-900 dark:text-white text-center flex-1">Capture Receipt</h1>
        <span className="block w-[40px] h-[28px]" />
      </div>
      {/* Main container */}
      <main className="w-full flex flex-col items-center mt-8 px-4">
        <section
          className={`relative rounded-2xl flex items-center justify-center overflow-visible shadow-xl border ${isDarkMode ? "border-white/10 bg-[#181818]/90" : "border-black/10 bg-white"} mb-6`}
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
          }}
        >
          <ReceiptCameraFrame
            isCameraReady={isCameraReady}
            error={error}
            videoRef={videoRef}
            isDarkMode={isDarkMode}
          />
        </section>
        <div className="w-full max-w-xs grid grid-cols-1 sm:grid-cols-2 gap-3 ">
          {/* Camera Capture Button */}
          <Button
            className="text-base font-bold flex items-center justify-center gap-2 h-12 rounded-xl shadow-lg"
            onClick={handleCapture}
            variant={isDarkMode ? "default" : "secondary"}
            size="lg"
            disabled={uploading || !isCameraReady}
          >
            <Camera size={22} className="mr-1" />
            {uploading ? "Uploading..." : "Capture Receipt"}
          </Button>
          {/* Upload from Gallery Button */}
          <Button
            className="text-base font-medium flex items-center justify-center gap-2 h-12 rounded-xl shadow-lg relative"
            variant={isDarkMode ? "outline" : "default"}
            size="lg"
            type="button"
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
          >
            <Upload size={22} className="mr-1" />
            Upload from Gallery
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              style={{ zIndex: 2 }}
              tabIndex={-1}
              onChange={handleFileChange}
              disabled={uploading}
            />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CaptureReceiptPage;
