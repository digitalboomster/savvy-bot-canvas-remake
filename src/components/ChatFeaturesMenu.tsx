
import React from "react";
import { Upload } from "lucide-react"; // Only allowed lucide icon per project constraints

// Icon SVG stubs to visually match screenshot (replace as needed)
const IconCamera = () => (
  <svg width={24} height={24} fill="none" stroke="#FFA726" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x={3} y={7} width={18} height={13} rx={2} /><circle cx={12} cy={13.5} r={3} /><path d="M5 7l2.5-3h9L19 7" />
  </svg>
);
const IconDocuments = () => (
  <svg width={24} height={24} fill="none" stroke="#2979FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x={5} y={2} width={14} height={20} rx={2} /><path d="M9 6h6M9 10h6M9 14h2" />
  </svg>
);
const IconHeal = () => (
  <svg width={24} height={24} fill="none" stroke="#33C481" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 21C12 21 4.5 13.65 4.5 9.5A4.5 4.5 0 0112 5a4.5 4.5 0 017.5 4.5c0 4.15-7.5 11.5-7.5 11.5z" />
  </svg>
);
const IconAnalyse = () => (
  <svg width={24} height={24} fill="none" stroke="#40C4FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="4 17 10 11 14 15 20 9" /><circle cx={20} cy={9} r={2} />
  </svg>
);

type Feature = {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  iconColorClass: string; // Used for accessibility
  highlighted?: boolean; // For yellow highlight
};

const features: Feature[] = [
  {
    key: "capture-receipt",
    label: "Capture Receipt",
    icon: <IconCamera />,
    iconColorClass: "text-yellow-500"
  },
  {
    key: "documents",
    label: "My Documents",
    icon: <IconDocuments />,
    iconColorClass: "text-blue-500"
  },
  {
    key: "heal-me",
    label: "Heal Me",
    icon: <IconHeal />,
    iconColorClass: "text-green-500"
  },
  {
    key: "analyse-me",
    label: "Analyse Me",
    icon: <IconAnalyse />,
    iconColorClass: "text-sky-400"
  },
  {
    key: "upload",
    label: "Upload",
    icon: <Upload size={22} color="#4CAF50" />,
    iconColorClass: "text-green-500",
    highlighted: true
  }
  // 'Smart Assistant' omitted as per your instructions
];

interface ChatFeaturesMenuProps {
  open: boolean;
  onClose: () => void;
  onFeatureClick?: (key: string) => void;
  className?: string;
}
const ChatFeaturesMenu: React.FC<ChatFeaturesMenuProps> = ({
  open,
  onClose,
  onFeatureClick = () => {},
  className = "",
}) => {
  if (!open) return null;
  return (
    <div 
      className={`fixed left-6 bottom-32 z-50 drop-shadow-xl`}
      style={{ minWidth: 260 }}
      tabIndex={-1}
      onMouseDown={e => e.stopPropagation()}
    >
      <div className={`rounded-2xl bg-white border border-yellow-300 shadow-2xl overflow-hidden animate-fade-in ${className}`}>
        <div className="py-2">
          {features.map((feature, i) => (
            <button
              key={feature.key}
              className={`flex items-center gap-3 w-full px-6 py-3 text-[1.08rem] font-semibold focus:outline-none transition
                ${
                  feature.highlighted
                    ? 'bg-yellow-50'
                    : 'bg-white'
                }
                ${i !== 0 ? "border-t border-yellow-100" : ""}
                hover:bg-yellow-100
                text-gray-900
              `}
              style={{
                borderRadius:
                  i === 0
                    ? "16px 16px 0 0"
                    : i === features.length - 1
                    ? "0 0 16px 16px"
                    : undefined
              }}
              aria-label={feature.label}
              onClick={() => {
                onClose();
                onFeatureClick(feature.key);
              }}
            >
              <span className={"w-6 h-6 flex items-center justify-center"}>{feature.icon}</span>
              <span className="ml-2">{feature.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Transparent overlay for outside click */}
      <button
        className="fixed inset-0 z-40"
        tabIndex={-1}
        aria-label="Close features menu"
        style={{ background: "transparent", pointerEvents: "auto" }}
        onClick={onClose}
      />
    </div>
  );
};

export default ChatFeaturesMenu;
