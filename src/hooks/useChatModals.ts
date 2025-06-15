
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const BACKEND_URL = "https://4d9a25eb-4793-482a-a348-2e1c21e2b286-00-2gfu2fuimic4.kirk.replit.dev";

export function useChatModals() {
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [featuresRotated, setFeaturesRotated] = useState(false);
  const [showDocsViewer, setShowDocsViewer] = useState(false);
  const [showHealMe, setShowHealMe] = useState(false);
  const [showCaptureReceipt, setShowCaptureReceipt] = useState(false);
  const [showUploadDocumentPage, setShowUploadDocumentPage] = useState(false);

  // Handler for features menu option click
  const handleFeatureSelect = (featureKey: string) => {
    if (featureKey === "capture-receipt") {
      setShowCaptureReceipt(true);
      setShowFeaturesMenu(false);
      return;
    }
    if (featureKey === "documents") setShowDocsViewer(true);
    if (featureKey === "heal-me") setShowHealMe(true);
    if (featureKey === "upload") setShowUploadDocumentPage(true);
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
        title: "Mood logged",
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
    showUploadDocumentPage, setShowUploadDocumentPage,
    handleFeatureSelect,
    handleMoodSelect,
    handleCloseDocsAndShowFeatures,
    onFeaturesButtonClick,
  };
}
