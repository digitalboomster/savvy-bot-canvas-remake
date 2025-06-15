import React from "react";
import { Upload } from "lucide-react";

const IconSparkle = () => (
  <svg width={24} height={24} stroke="#B266FF" fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 3v3M12 18v3M4.2 5.8l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M5.8 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    <circle cx={12} cy={12} r={5} />
  </svg>
);
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
  iconColorClass: string;
  highlighted?: boolean;
};
// Smart Assistant and its subfeatures
const smartAssistantFeature: Feature = {
  key: "smart-assistant",
  label: "Smart Assistant",
  icon: <IconSparkle />,
  iconColorClass: "text-purple-500",
};

const features: Feature[] = [
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
    iconColorClass: "text-green-500"
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
          fixed left-1/2 bottom-28 z-50 animate-fade-in ${className}
          transform -translate-x-1/2
        `}
        style={{ minWidth: 330, maxWidth: 360 }}
        tabIndex={-1}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="rounded-[24px] bg-[#fffbea] border border-[#e9ddb9] shadow-2xl overflow-hidden transition-all duration-300 max-w-full min-w-[320px] relative">
          {/* Removed X close button */}

          <div className="flex flex-col items-stretch px-0 pt-7 pb-4">
            {/* Smart Assistant Feature - card style */}
            <button
              key={smartAssistantFeature.key}
              className={`
                flex items-center gap-4 w-[92%] mx-auto mb-3 px-5 py-3 text-lg font-bold transition
                rounded-xl border border-yellow-300 bg-white shadow-sm
                hover:shadow-md hover:bg-yellow-50 
                focus:outline-none
              `}
              aria-label={smartAssistantFeature.label}
              style={{ borderWidth: 2 }}
              onClick={() => {
                onClose();
                onFeatureClick(smartAssistantFeature.key);
              }}
            >
              <span className="w-7 h-7 flex items-center justify-center text-purple-500">{smartAssistantFeature.icon}</span>
              <span className="ml-2 text-gray-900">{smartAssistantFeature.label}</span>
            </button>

            <div className="flex flex-col divide-y divide-[#efe2bc] mt-1">
              {features.map((feature, i) => (
                <button
                  key={feature.key}
                  className={`
                    flex items-center gap-3 w-full px-7 py-4 text-base font-semibold focus:outline-none transition
                    bg-white
                    hover:bg-yellow-50
                    text-gray-900
                    ${i === 0 ? "rounded-t-none" : ""}
                    ${i === features.length - 1 ? "rounded-b-none" : ""}
                  `}
                  style={{
                    borderRadius:
                      i === 0
                        ? "0"
                        : i === features.length - 1
                        ? "0 0 24px 24px"
                        : undefined
                  }}
                  aria-label={feature.label}
                  onClick={() => {
                    onClose();
                    onFeatureClick(feature.key);
                  }}
                >
                  <span className={`w-7 h-7 flex items-center justify-center ${feature.iconColorClass}`}>{feature.icon}</span>
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
