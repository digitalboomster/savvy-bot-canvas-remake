
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UploadDocumentPage from "./UploadDocumentPage";

interface DocumentViewerModalProps {
  open: boolean;
  onClose: () => void;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  open,
  onClose,
}) => {
  const [showUpload, setShowUpload] = useState(false);

  if (showUpload) {
    return (
      <UploadDocumentPage onBack={() => setShowUpload(false)} />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md w-full p-0 rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 transition-colors duration-300"
        style={{ borderRadius: 24 }}
      >
        {/* Header style matching chat */}
        <div className="flex flex-col items-center justify-center pt-7 pb-2 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md">
          <span className="text-lg font-black text-gray-900 dark:text-white">My Documents</span>
        </div>
        {/* Divider to mirror features panel */}
        <div className="w-full h-[1px] bg-[#efe2bc] mb-0" />
        {/* Body with "No documents yet" and upload button */}
        <div className="p-8 flex flex-col items-center justify-center text-center w-full min-h-[215px] bg-white dark:bg-gray-900 rounded-b-2xl">
          <span className="text-3xl mb-2" role="img" aria-label="Empty">📄</span>
          <span className="text-lg font-medium text-gray-600 dark:text-gray-300">No documents yet</span>
          <span className="text-sm text-gray-400 mt-1">
            Upload or create documents, and they’ll show up here.
          </span>
          <button
            onClick={() => setShowUpload(true)}
            className="mt-6 px-5 py-2 rounded-lg bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 transition"
          >
            Upload Document
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewerModal;
