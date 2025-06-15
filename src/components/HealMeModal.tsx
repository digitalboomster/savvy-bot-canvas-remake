
import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HealMeModalProps {
  open: boolean;
  onClose: () => void;
  onMoodSelect?: (mood: MoodOption) => void;
}

type MoodOption = "Good" | "Okay" | "Stressed" | "Anxious";

const moodOptions: { key: MoodOption; label: string; img: string }[] = [
  { key: "Good", label: "Good", img: "/lovable-uploads/db49d954-992b-47ef-8a05-3e02524e0a86.png" },
  { key: "Okay", label: "Okay", img: "/lovable-uploads/6d5b7eb4-e9dc-4296-8eb0-65909e395b7b.png" },
  { key: "Stressed", label: "Stressed", img: "/lovable-uploads/72b47c28-5e46-4d93-9528-29b636bb6291.png" },
  { key: "Anxious", label: "Anxious", img: "/lovable-uploads/989613d1-0781-43ed-aa68-658222a3280e.png" }
];

const HealMeModal: React.FC<HealMeModalProps> = ({ open, onClose, onMoodSelect }) => {
  const { isDarkMode } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton
        className={`max-w-md w-full p-0 rounded-2xl overflow-hidden shadow-2xl border-2
          ${isDarkMode ? "border-yellow-600 bg-gray-900" : "border-yellow-400 bg-white"} 
          transition-colors duration-300`}
        style={{ borderRadius: 24 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-yellow-400">
           <DialogClose asChild>
            <button
              aria-label="Close"
              className="flex items-center justify-center rounded-full border border-black h-8 w-8 hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            >
              <X size={20} className="text-black" />
            </button>
          </DialogClose>
          <span className="text-lg font-black text-black flex-1 text-center">Bee Counsellor</span>
          <div className="w-8 h-8" /> {/* Spacer to keep title centered */}
        </div>
        
        {/* Prompt & content */}
        <div className={`px-8 pt-4 pb-8 text-center rounded-b-2xl ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <h2 className="text-lg font-semibold mb-5 text-gray-900 dark:text-white">How are you feeling?</h2>
          <div className="grid grid-cols-2 gap-4">
            {moodOptions.map(({ key, label, img }) => (
              <Button
                key={key}
                className={`flex flex-col items-center w-full py-5 px-2 rounded-xl group transition shadow-lg gap-2 h-auto
                  ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                      : "bg-white border border-yellow-300 hover:bg-yellow-50"
                  }`}
                style={{ minHeight: 108 }}
                onClick={() => onMoodSelect?.(key)}
                tabIndex={0}
              >
                <div
                  aria-label={label}
                  className="rounded-full mb-2"
                  style={{
                    width: 100,
                    height: 100,
                    background: `url(${img}) 50% / cover no-repeat`,
                  }}
                />
                <span className={`font-semibold text-base ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HealMeModal;
