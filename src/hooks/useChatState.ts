
import { useState, useEffect } from 'react';

export const useChatState = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [featuresRotated, setFeaturesRotated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showDocsViewer, setShowDocsViewer] = useState(false);
  const [showHealMe, setShowHealMe] = useState(false);
  const [showCaptureReceipt, setShowCaptureReceipt] = useState(false);

  // Rotation effect for features btn in sync with menu open/close
  useEffect(() => {
    setFeaturesRotated(showFeaturesMenu);
  }, [showFeaturesMenu]);

  const toggleTheme = () => setIsDarkMode((d) => !d);

  const onFeaturesButtonClick = () => {
    setShowFeaturesMenu(prev => !prev);
  };

  return {
    showWelcome,
    setShowWelcome,
    featuresRotated,
    setFeaturesRotated,
    isDarkMode,
    setIsDarkMode,
    showFeaturesMenu,
    setShowFeaturesMenu,
    showDocsViewer,
    setShowDocsViewer,
    showHealMe,
    setShowHealMe,
    showCaptureReceipt,
    setShowCaptureReceipt,
    toggleTheme,
    onFeaturesButtonClick
  };
};
