
import React from 'react';
import ChatContainer from './ChatContainer';
import CaptureReceiptPage from "./CaptureReceiptPage";
import { useChatState } from '../hooks/useChatState';

const ChatPage = () => {
  const { showCaptureReceipt, setShowCaptureReceipt, isDarkMode } = useChatState();

  // Render capture receipt full page if activated
  if (showCaptureReceipt) {
    return (
      <CaptureReceiptPage
        onBack={() => setShowCaptureReceipt(false)}
        isDarkMode={isDarkMode}
      />
    );
  }

  return <ChatContainer />;
};

export default ChatPage;
