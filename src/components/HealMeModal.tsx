
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HealMeModalProps {
  open: boolean;
  onClose: () => void;
  onMoodSelect?: (mood: MoodOption) => void;
}

type MoodOption = "Good" | "Okay" | "Stressed" | "Anxious";

const moodOptions: { key: MoodOption; label: string; img: string }[] = [
  { key: "Good", label: "Good", img: "/lovable-uploads/c2c65a6b-2512-4c8b-8ffd-68a16dd851a5.png" },
  { key: "Okay", label: "Okay", img: "/lovable-uploads/c2c65a6b-2512-4c8b-8ffd-68a16dd851a5.png" },
  { key: "Stressed", label: "Stressed", img: "/lovable-uploads/c2c65a6b-2512-4c8b-8ffd-68a16dd851a5.png" },
  { key: "Anxious", label: "Anxious", img: "/lovable-uploads/c2c65a6b-2512-4c8b-8ffd-68a16dd851a5.png" }
];

const HealMeModal: React.FC<HealMeModalProps> = ({ open, onClose, onMoodSelect }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md w-full p-0 rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 transition-colors duration-300"
        style={{ borderRadius: 24 }}
      >
        {/* Header matching chat style */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md">
          <span className="text-lg font-black text-gray-900 dark:text-white flex-1 text-center">Bee Counsellor</span>
          {/* Close button maintains as handled by DialogContent */}
        </div>
        {/* Prompt & content */}
        <div className="px-8 pt-7 pb-8 text-center bg-white dark:bg-gray-900 rounded-b-2xl">
          <h2 className="text-lg font-semibold mb-5 text-gray-900 dark:text-white">How are you feeling?</h2>
          <div className="grid grid-cols-2 gap-4">
            {moodOptions.map(({ key, label, img }) => (
              <button
                key={key}
                className="flex flex-col items-center bg-[#fffbea] border-2 border-yellow-200 rounded-xl py-5 px-2 hover:bg-yellow-100 transition"
                onClick={() => onMoodSelect?.(key)}
                style={{ minHeight: 108 }}
              >
                <img
                  src={img}
                  alt={label}
                  className="w-16 h-16 rounded-full mb-2"
                  style={{ objectFit: "contain", background: "#fffbea" }}
                />
                <span className="font-semibold text-base text-gray-900">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HealMeModal;

