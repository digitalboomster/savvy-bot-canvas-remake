
import React from "react";
import { Brain, ListChecks, Wallet, BarChart2, Gamepad2, ChevronLeft } from "lucide-react";

const smartFeatures = [
  {
    key: "budget",
    title: "Budget Smarter",
    icon: <Wallet size={24} className="text-blue-600" />,
    desc: "Create your custom budget and track spending easily.",
  },
  {
    key: "track-spending",
    title: "Track Spending",
    icon: <BarChart2 size={24} className="text-green-600" />,
    desc: "Effortlessly monitor purchases and analyze habits.",
  },
  {
    key: "savings",
    title: "Build Savings Habits",
    icon: <ListChecks size={24} className="text-yellow-600" />,
    desc: "Set savings goals and let Savvy help you reach them.",
  },
  {
    key: "learn-basics",
    title: "Learn Financial Basics",
    icon: <Gamepad2 size={24} className="text-purple-600" />,
    desc: "Play interactive games to boost your financial literacy.",
  },
  {
    key: "tools",
    title: "Useful Tools",
    icon: <Brain size={24} className="text-fuchsia-600" />,
    desc: "Discover calculators for taxes, retirement, and investments.",
  },
];

interface Props {
  onBack: () => void;
  onFeatureSelect?: (key: string) => void;
}
const SmartAssistantFeatures: React.FC<Props> = ({ onBack, onFeatureSelect }) => {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-start items-center bg-gradient-to-b from-yellow-50 via-white/90 to-gray-50 animate-fade-in">
      <div className="relative w-full max-w-md mx-auto mt-8 mb-4 px-4">
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute left-0 top-0 flex items-center gap-2 text-gray-700 hover:text-yellow-700 font-semibold"
        >
          <ChevronLeft size={24} />
          Back
        </button>
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800" style={{fontFamily: "Manrope, sans-serif"}}>Savvy Smart Assistant</h2>
        <div className="flex flex-col gap-5">
          {smartFeatures.map((feature) => (
            <button
              key={feature.key}
              className="w-full flex items-center gap-4 bg-white border-2 border-yellow-100 hover:border-yellow-300 rounded-2xl shadow hover:shadow-lg px-5 py-4 transition-all duration-200 focus:ring-2 focus:ring-yellow-200 group"
              onClick={() => onFeatureSelect?.(feature.key)}
            >
              <div className="rounded-full bg-yellow-50 p-2 flex-shrink-0 group-hover:bg-yellow-100 transition">{feature.icon}</div>
              <div className="text-left flex-1">
                <div className="text-lg font-bold text-gray-900">{feature.title}</div>
                <div className="text-sm text-gray-600">{feature.desc}</div>
              </div>
              {/* Right-facing chevron, for "more" */}
              <ChevronLeft size={20} className="rotate-180 text-gray-300 group-hover:text-yellow-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartAssistantFeatures;
