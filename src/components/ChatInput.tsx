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

// Utility to check if SpeechRecognition is available
function getSpeechRecognition() {
  return (
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition ||
    null
  );
}

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
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Start/stop recording for transcription using Web Speech API
  const handleMicClick = () => {
    setRecognitionError(null);
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setRecognitionError("Microphone transcription not supported in this browser.");
      return;
    }
    if (isRecording) {
      // Stop recognition and finalise
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      setLoadingTranscript(false);

      let finalTranscript = "";

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setInputText((finalTranscript + interimTranscript).trim());
      };

      recognition.onerror = (event: any) => {
        setRecognitionError(`Mic error: ${event.error || "Unknown error"}.`);
        setIsRecording(false);
        setLoadingTranscript(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setLoadingTranscript(false);
      };

      recognition.start();
      setIsRecording(true);
    } catch (err) {
      setRecognitionError("Failed to start microphone.");
      setIsRecording(false);
      setLoadingTranscript(false);
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
        <div className={`flex-1 flex items-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-sm border rounded-full px-4 py-2 transition-all duration-200 focus-within:ring-2 ${isDarkMode ? 'focus-within:ring-blue-400/70' : 'focus-within:ring-blue-500/70'}`}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend(inputText)}
            placeholder={loadingTranscript ? "Transcribing..." : "Message Savvy..."}
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

      {/* Show transcription or browser errors */}
      {recognitionError && (
        <div className="mt-2 text-sm text-red-500">{recognitionError}</div>
      )}
      {isRecording && (
        <div className="mt-2 text-xs text-yellow-700 dark:text-yellow-200 animate-pulse">
          Listening... Tap the mic again to stop.
        </div>
      )}
    </div>
  );
};

export default ChatInput;
