
import React from "react";
import { Camera, Upload } from "lucide-react";

// Custom SVG icons for My Documents, Heal Me, Analyze Me, Smart Assistant
const IconDocuments = () => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <rect x={5} y={2} width={14} height={20} rx={2} stroke="#AB26DF" strokeWidth={2} />
    <path d="M9 6h6M9 10h6M9 14h2" stroke="#AB26DF" strokeWidth={2} strokeLinecap="round" />
  </svg>
);
// Heal Me (heart)
const IconHeal = () => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <path d="M12 21c-3.866-4.302-7.5-6.918-7.5-10.212C4.5 7.319 7.019 5 10.005 5c1.419 0 2.784.595 3.734 1.561C14.211 5.597 15.576 5 16.995 5c2.986 0 5.505 2.319 5.505 5.788C21 14.082 17.366 16.698 13.5 21z" stroke="#FF3745" strokeWidth={2} />
    <circle cx="12" cy="14" r="0.5" fill="#FF3745"/>
  </svg>
);
// Analyze Me (medical cross)
const IconAnalyse = () => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <rect x={7} y={2} width={10} height={20} rx={5} stroke="#4264FF" strokeWidth={2}/>
    <path d="M12 7v5m0 0h-3m3 0h3" stroke="#4264FF" strokeWidth={2} strokeLinecap="round"/>
  </svg>
);
// Smart Assistant
const IconSmartAssistant = () => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <g stroke="#FFB13B" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" opacity="0.3"/>
      <path d="M8 16h4v-2m0 0V8m0 6h4" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <circle cx="12" cy="12" r="4" fill="none"/>
    <circle cx="12" cy="12" r="9" fill="none"/>
    <circle cx="12" cy="12" r="4" fill="none"/>
    <circle cx="12" cy="12" r="4" fill="none"/>
  </svg>
);

type Feature = {
  key: string;
  label: string;
  icon: React.ReactNode;
  iconBgClass: string; // for the background circle
  iconBorder: string;
};

const features: Feature[] = [
  {
    key: "capture-receipt",
    label: "Capture Receipt",
    icon: <Camera size={20} color="#379AFF" strokeWidth={2.2} />,
    iconBgClass: "bg-blue-100", // circle soft blue
    iconBorder: "border-blue-200"
  },
  {
    key: "documents",
    label: "My Documents",
    icon: <IconDocuments />,
    iconBgClass: "bg-purple-100",
    iconBorder: "border-purple-200"
  },
  {
    key: "heal-me",
    label: "Heal Me",
    icon: <IconHeal />,
    iconBgClass: "bg-red-100",
    iconBorder: "border-red-200"
  },
  {
    key: "analyse-me",
    label: "Analyze Me",
    icon: <IconAnalyse />,
    iconBgClass: "bg-blue-50",
    iconBorder: "border-blue-100"
  },
  {
    key: "upload",
    label: "Upload",
    icon: <Upload size={20} color="#1DD75B" strokeWidth={2.2} />,
    iconBgClass: "bg-green-100",
    iconBorder: "border-green-200"
  },
  {
    key: "smart-assistant",
    label: "Smart Assistant",
    icon: <IconSmartAssistant />,
    iconBgClass: "bg-amber-100",
    iconBorder: "border-amber-200"
  }
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
    <>
      <div 
        className={`
          fixed left-1/2 bottom-28 z-50 animate-fade-in
          transform -translate-x-1/2
          px-2 w-[340px] max-w-full
          ${className}
        `}
        tabIndex={-1}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="rounded-[32px] bg-white border border-neutral-100 shadow-2xl overflow-hidden transition-all duration-300 max-w-full min-w-[300px] relative">
          <div className="flex flex-col items-stretch px-0 pt-7 pb-4">
            <div className="flex flex-col gap-0">
              {features.map((feature, i) => (
                <button
                  key={feature.key}
                  className={`
                    flex items-center gap-4 w-full px-7 py-3 text-base font-medium focus:outline-none transition bg-transparent
                    border-0
                    hover:bg-neutral-50
                    text-gray-900
                    rounded-none
                    ${i === 0 ? "rounded-t-2xl" : ""}
                    ${i === features.length - 1 ? "rounded-b-2xl" : ""}
                  `}
                  aria-label={feature.label}
                  onClick={() => {
                    onClose();
                    onFeatureClick(feature.key);
                  }}
                  style={{
                    fontFamily: "Inter, Arial, sans-serif",
                    fontWeight: 500,
                    fontSize: "1.14rem"
                  }}
                >
                  <span
                    className={`w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm border ${feature.iconBgClass} ${feature.iconBorder}`}
                    style={{ backgroundClip: 'padding-box', transition: "box-shadow .18s" }}
                  >
                    {feature.icon}
                  </span>
                  <span className="ml-2">{feature.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Overlay for outside click */}
      <button
        className="fixed inset-0 z-40"
        tabIndex={-1}
        aria-label="Close features menu"
        style={{ background: "transparent", pointerEvents: "auto" }}
        onClick={onClose}
      />
    </>
  );
};

export default ChatFeaturesMenu;
