
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

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
        className={`max-w-md w-full p-0 rounded-2xl overflow-hidden shadow-2xl border 
          ${isDarkMode ? "border-white/10 bg-gray-900" : "border-black/10 bg-white"} transition-colors duration-300`}
        style={{ borderRadius: 24 }}
      >
        {/* Header (less bottom padding) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md">
          <span className="text-lg font-black text-gray-900 dark:text-white flex-1 text-center">Bee Counsellor</span>
        </div>
        {/* Prompt & content (less top padding) */}
        <div className={`px-8 pt-4 pb-8 text-center rounded-b-2xl ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <h2 className="text-lg font-semibold mb-5 text-gray-900 dark:text-white">How are you feeling?</h2>
          <div className="grid grid-cols-2 gap-4">
            {moodOptions.map(({ key, label, img }) => (
              <Button
                key={key}
                className={`flex flex-col items-center w-full py-5 px-2 rounded-xl group transition shadow-lg gap-2
                  ${isDarkMode
                    ? "bg-white/5 border border-white/10 hover:bg-gray-700"
                    : "bg-black/5 border border-black/10 hover:bg-yellow-100"
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
                    background: `url(${img}) lightgray 50% / cover no-repeat`,
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

