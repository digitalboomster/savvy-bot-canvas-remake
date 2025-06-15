import React, { useEffect, useRef, useState } from "react";
import { Camera, Upload } from "lucide-react";

// Custom SVG icons for My Documents, Heal Me, Analyze Me
const IconDocuments = () => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <rect x={5} y={2} width={14} height={20} rx={2} stroke="#AB26DF" strokeWidth={2} />
    <path d="M9 6h6M9 10h6M9 14h2" stroke="#AB26DF" strokeWidth={2} strokeLinecap="round" />
  </svg>
);
const IconHeal = () => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <path d="M12 21c-3.866-4.302-7.5-6.918-7.5-10.212C4.5 7.319 7.019 5 10.005 5c1.419 0 2.784.595 3.734 1.561C14.211 5.597 15.576 5 16.995 5c2.986 0 5.505 2.319 5.505 5.788C21 14.082 17.366 16.698 13.5 21z" stroke="#FF3745" strokeWidth={2} />
    <circle cx="12" cy="14" r="0.5" fill="#FF3745"/>
  </svg>
);
const IconAnalyse = () => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <rect x={7} y={2} width={10} height={20} rx={5} stroke="#4264FF" strokeWidth={2}/>
    <path d="M12 7v5m0 0h-3m3 0h3" stroke="#4264FF" strokeWidth={2} strokeLinecap="round"/>
  </svg>
);

type Feature = {
  key: string;
  label: string;
  icon: React.ReactNode;
  iconBgClass: string;
  iconBorder: string;
};

const features: Feature[] = [
  {
    key: "capture-receipt",
    label: "Capture Receipt",
    icon: <Camera size={20} color="#379AFF" strokeWidth={2.2} />,
    iconBgClass: "bg-blue-100",
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
  }
];

interface ChatFeaturesMenuProps {
  open: boolean;
  onClose: () => void;
  onFeatureClick?: (key: string) => void;
  className?: string;
}

// Keyframes for sliding up w/ bounce
const SPRING_ANIMATION = `
@keyframes imsg-slide-up {
  0% { transform: translateY(60%) scale(0.97); opacity: 0; }
  70% { transform: translateY(-4%) scale(1.03); opacity: 1; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
}
@keyframes imsg-slide-down {
  0%   { transform: translateY(0%) scale(1); opacity: 1;}
  100% { transform: translateY(50%) scale(0.98); opacity: 0;}
}
`;

const ANIMATION_DURATION = 410; // ms

const ChatFeaturesMenu: React.FC<ChatFeaturesMenuProps> = ({
  open,
  onClose,
  onFeatureClick = () => {},
  className = "",
}) => {
  // Internal state for mounting/unmounting with animation
  const [visible, setVisible] = useState(open);
  const [animatingOut, setAnimatingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Play mount anim on open
  useEffect(() => {
    if (open) {
      setVisible(true);
      setAnimatingOut(false);
    } else if (visible) {
      setAnimatingOut(true);
      // wait for animation out, then actually hide
      const timeout = setTimeout(() => {
        setVisible(false);
        setAnimatingOut(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Trap focus inside when open for a11y (basic)
  useEffect(() => {
    if (visible) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // ESC to close
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  // Animation class depends on animatingOut
  const animClass = animatingOut
    ? "imsg-slide-down"
    : "imsg-slide-up";

  return (
    <>
      {/* Anim keyframes injected only once per app */}
      <style>{SPRING_ANIMATION}</style>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${animatingOut ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        aria-hidden="true"
        onClick={onClose}
      />
      {/* Menu */}
      <div
        className={`
          fixed left-1/2 bottom-7 z-50
          transform -translate-x-1/2
          w-[344px] max-w-[96vw] px-2
          transition-all
          select-none
          ${className}
        `}
        style={{
          pointerEvents: animatingOut ? "none" : "auto"
        }}
        tabIndex={-1}
        ref={containerRef}
        onMouseDown={e => e.stopPropagation()}
      >
        <div
          className={`
            relative
            rounded-[28px]
            border border-white/30 dark:border-white/15
            shadow-2xl
            overflow-hidden
            min-w-[300px] max-w-full
            animate-none
            glassy-ios
          `}
          style={{
            background: "linear-gradient(135deg, rgba(252,252,254,0.84) 57%, rgba(240,244,255,0.8) 100%)",
            boxShadow: "0 6px 40px 0 rgba(30,30,40,0.19)",
            backdropFilter: "blur(18px) saturate(1.25)",
            WebkitBackdropFilter: "blur(18px) saturate(1.25)",
            animation: `${animClass} ${ANIMATION_DURATION}ms cubic-bezier(.28,1.12,.39,.92)`,
            willChange: "transform, opacity"
          }}
        >
          {/* iMessage handlebar */}
          <div className="w-12 h-[6px] rounded-full bg-zinc-300/80 dark:bg-white/20 mx-auto my-2 mb-1 mt-3 opacity-80 pointer-events-none" />
          <div className="flex flex-col items-stretch pt-2 pb-2 px-0">
            <div className="flex flex-col gap-0">
              {features.map((feature, i) => (
                <button
                  key={feature.key}
                  className={`
                    flex items-center gap-4 w-full px-7 py-3 text-base font-medium focus:outline-none
                    transition-all
                    bg-transparent
                    border-0
                    hover:bg-black/5 dark:hover:bg-white/5
                    active:scale-[0.96]
                    text-gray-900 dark:text-white
                    rounded-none
                    ${i === 0 ? "rounded-t-2xl" : ""}
                    ${i === features.length - 1 ? "rounded-b-2xl" : ""}
                  `}
                  aria-label={feature.label}
                  style={{
                    fontFamily: "Inter, Arial, sans-serif",
                    fontWeight: 500,
                    fontSize: "1.14rem",
                    transition: "background .16s, transform .19s cubic-bezier(.44,.99,.56,1.16)",
                  }}
                  tabIndex={0}
                  onClick={() => {
                    onClose();
                    onFeatureClick(feature.key);
                  }}
                >
                  <span
                    className={`w-12 h-12 flex items-center justify-center rounded-full border shadow-sm ${feature.iconBgClass} ${feature.iconBorder}`}
                    style={{
                      backgroundClip: 'padding-box',
                      transition: "box-shadow .14s cubic-bezier(.44,.99,.56,1.16)",
                      boxShadow: "0 4px 16px 0 rgba(95,123,160,0.10)"
                    }}
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
      {/* Accessible close button offscreen for a11y */}
      <button
        className="fixed inset-0 z-40"
        tabIndex={-1}
        aria-label="Close features menu"
        style={{ background: "transparent", pointerEvents: "none" }}
        onClick={onClose}
      />
    </>
  );
};

export default ChatFeaturesMenu;
