
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const BACKEND_URL = "https://4d9a25eb-4793-482a-a348-2e1c21e2b286-00-2gfu2fuimic4.kirk.replit.dev";

// This type needs to be available for the hook's arguments
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Type for the analysis response from the backend
interface AnalysisSection {
  title: string;
  description: string;
  emoji: string;
}

interface AnalysisResponse {
  personality_sketch: AnalysisSection;
  spending_habit_profile: AnalysisSection;
  interests_themes: AnalysisSection;
  savvy_insight: AnalysisSection;
}

export function useChatModals(
  messages: Message[],
  setMessages: (updater: (prevMessages: Message[]) => Message[]) => void,
  setShowWelcome: (show: boolean) => void
) {
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [featuresRotated, setFeaturesRotated] = useState(false);
  const [showDocsViewer, setShowDocsViewer] = useState(false);
  const [showHealMe, setShowHealMe] = useState(false);
  const [showCaptureReceipt, setShowCaptureReceipt] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeMe = async () => {
    if (isAnalyzing) return;

    setShowWelcome(false);
    setIsAnalyzing(true);
    setShowFeaturesMenu(false);

    const analysisBotMessage: Message = {
      id: `analysis-pending-${Date.now()}`,
      text: "Hold on, I'm analyzing our conversation... 🤔",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, analysisBotMessage]);

    try {
      const response = await fetch(`${BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_history: messages.slice(-20) }) // Send last 20 messages
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis request failed");
      }
      
      const rawAnalysisData = await response.json();
      const analysisData: AnalysisResponse = typeof rawAnalysisData === 'string' ? JSON.parse(rawAnalysisData) : rawAnalysisData;

      const formattedText = [
        `${analysisData.personality_sketch.emoji} ${analysisData.personality_sketch.title}`,
        analysisData.personality_sketch.description,
        ``,
        `${analysisData.spending_habit_profile.emoji} ${analysisData.spending_habit_profile.title}`,
        analysisData.spending_habit_profile.description,
        ``,
        `${analysisData.interests_themes.emoji} ${analysisData.interests_themes.title}`,
        analysisData.interests_themes.description,
        ``,
        `${analysisData.savvy_insight.emoji} ${analysisData.savvy_insight.title}`,
        analysisData.savvy_insight.description
      ].join('\n');
      
      const analysisResult: Message = {
        id: `analysis-result-${Date.now()}`,
        text: formattedText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev.filter(m => m.id !== analysisBotMessage.id), analysisResult]);

    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "I couldn't complete the analysis. Please try again later.",
        variant: "destructive",
      });
      setMessages(prev => prev.filter(m => m.id !== analysisBotMessage.id));
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handler for features menu option click
  const handleFeatureSelect = (featureKey: string) => {
    if (featureKey === "capture-receipt") {
      setShowCaptureReceipt(true);
      setShowFeaturesMenu(false);
      return;
    }
    if (featureKey === "documents") setShowDocsViewer(true);
    if (featureKey === "heal-me") setShowHealMe(true);
    if (featureKey === "analyse-me") {
      handleAnalyzeMe();
    }
    // ... option for additional features
  };

  // Mood select with checkin API call
  const handleMoodSelect = async (mood: string) => {
    setShowHealMe(false);
    try {
      const response = await fetch(`${BACKEND_URL}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: mood.toLowerCase(), note: '' })
      });
      if (!response.ok) throw new Error("Mood check-in failed");
      toast({
        title: "Mood Logged",
        description: `Your mood (${mood}) has been recorded.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log your mood. Please try again."
      });
    }
  };

  const handleCloseDocsAndShowFeatures = () => {
    setShowDocsViewer(false);
    setShowFeaturesMenu(true);
  };

  // Features button toggle
  const onFeaturesButtonClick = () => setShowFeaturesMenu((prev) => !prev);

  return {
    showFeaturesMenu, setShowFeaturesMenu,
    featuresRotated, setFeaturesRotated,
    showDocsViewer, setShowDocsViewer,
    showHealMe, setShowHealMe,
    showCaptureReceipt, setShowCaptureReceipt,
    handleFeatureSelect,
    handleMoodSelect,
    handleCloseDocsAndShowFeatures,
    onFeaturesButtonClick,
  };
}
