
import React, { useRef, useState } from "react";
import { Plus, Mic } from "lucide-react";

interface ChatInputProps {
  inputText: string;
  setInputText: (v: string) => void;
  onSend: (text: string) => void;
  isDarkMode: boolean;
  featuresRotated: boolean;
  onFeaturesButtonClick: () => void;
}

const BACKEND_URL = "https://4d9a25eb-4793-482a-a348-2e1c21e2b286-00-2gfu2fuimic4.kirk.replit.dev";

const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  setInputText,
  onSend,
  isDarkMode,
  featuresRotated,
  onFeaturesButtonClick
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Start/stop recording for transcription
  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunks.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      recorder.onstop = async () => {
        setLoadingTranscript(true);
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "audio.webm");

        try {
          const response = await fetch(`${BACKEND_URL}/transcribe`, {
            method: "POST",
            body: formData
          });
          const result = await response.json();
          if (result.transcription) {
            setInputText(result.transcription);
          } else {
            setInputText("");
          }
        } catch {
          setInputText("");
        } finally {
          setLoadingTranscript(false);
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
        }
      };
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      // Denied mic permissions or failed
      setIsRecording(false);
    }
  };

  return (
    <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
      <div className="flex items-center gap-3">
        {/* Features Button */}
        <button
          onClick={onFeaturesButtonClick}
          className={`p-3 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'} backdrop-blur-sm border rounded-full transition-all duration-200 ${
            featuresRotated ? 'rotate-45' : ''
          }`}
          aria-label="Show chat features"
          type="button"
        >
          <Plus size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
        </button>
        {/* Input */}
        <div className={`flex-1 flex items-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-sm border rounded-full px-4 py-2`}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend(inputText)}
            placeholder={loadingTranscript ? "Transcribing..." : "Message to Savvy..."}
            disabled={loadingTranscript}
            className={`flex-1 bg-transparent ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} outline-none px-2`}
          />
          <button
            onClick={handleMicClick}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isRecording
                ? "bg-yellow-400/70 text-black animate-pulse"
                : isDarkMode
                ? "hover:bg-white/10"
                : "hover:bg-black/10"
            }`}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
            type="button"
            disabled={loadingTranscript}
          >
            <Mic size={20} className={isRecording ? "text-red-600" : (isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black")} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
