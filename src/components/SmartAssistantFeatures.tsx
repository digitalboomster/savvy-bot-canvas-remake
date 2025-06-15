
import React from "react";
import { ArrowLeft, ListChecks, PiggyBank, Activity, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

type Feature = {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const assistantFeatures: Feature[] = [
  {
    key: "budget-smarter",
    title: "Budget Smarter",
    description: "Build a custom budget that works for you.",
    icon: <PieChart className="text-purple-600" size={32} />,
  },
  {
    key: "track-spending",
    title: "Track Spending",
    description: "See where your money goes every month.",
    icon: <Activity className="text-amber-600" size={32} />,
  },
  {
    key: "save-money",
    title: "Save More",
    description: "Personalized tips to increase your savings.",
    icon: <PiggyBank className="text-green-500" size={32} />,
  },
  {
    key: "to-do-list",
    title: "Financial To-Do List",
    description: "Stay on top of important money tasks.",
    icon: <ListChecks className="text-sky-500" size={32} />,
  },
];

export interface SmartAssistantFeaturesProps {
  onBack: () => void;
  onFeatureSelect?: (featureKey: string) => void;
}

const SmartAssistantFeatures: React.FC<SmartAssistantFeaturesProps> = ({
  onBack,
  onFeatureSelect = () => {},
}) => {
  return (
    <div className="flex flex-col pt-5 px-3 pb-6 min-h-[70vh]">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold ml-2 text-neutral-900">Smart Assistant</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {assistantFeatures.map((feature) => (
          <button
            key={feature.key}
            onClick={() => onFeatureSelect(feature.key)}
            className="bg-white rounded-2xl shadow p-5 flex flex-col items-start hover:bg-yellow-50 border border-yellow-100 transition"
          >
            {feature.icon}
            <span className="mt-3 text-lg font-bold text-gray-900">{feature.title}</span>
            <span className="mt-1 text-gray-500 text-sm">{feature.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SmartAssistantFeatures;
