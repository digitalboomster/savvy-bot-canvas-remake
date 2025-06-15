import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
        className="max-w-sm p-0 rounded-2xl overflow-hidden shadow-2xl border-none"
        style={{ borderRadius: 24 }}
      >
        {/* HEADER */}
        <div className="bg-yellow-400 flex items-center justify-center px-5 py-4 text-center relative" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <span className="text-lg font-bold w-full">Bee Counsellor</span>
          <button
            aria-label="Close"
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-yellow-300 hover:bg-yellow-200 rounded-full p-1"
            onClick={onClose}
            style={{ border: "none" }}
          >
            <span className="sr-only">Close</span>
            <span aria-hidden>×</span>
          </button>
        </div>
        {/* PROMPT */}
        <div className="px-8 pt-7 pb-2 text-center bg-white rounded-b-2xl">
          <h2 className="text-lg font-semibold mb-5 text-gray-900">How are you feeling?</h2>
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
