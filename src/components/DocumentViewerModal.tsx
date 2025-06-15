
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DocumentViewerModalProps {
  open: boolean;
  onClose: () => void;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-sm p-0 rounded-[24px] border border-[#e9ddb9] bg-[#fffbea] shadow-2xl overflow-hidden"
        style={{ borderRadius: 24 }}
      >
        {/* Title, subtle and centered like the feature panel, no yellow header bar */}
        <div className="flex flex-col items-center justify-center pt-7 pb-2">
          <span className="text-lg font-bold text-gray-900">My Documents</span>
        </div>
        {/* Divider to mirror features panel */}
        <div className="w-full h-[1px] bg-[#efe2bc] mb-0" />
        {/* Body with "No documents yet" layout and color */}
        <div className="p-8 flex flex-col items-center justify-center text-center w-full min-h-[215px] bg-white rounded-b-2xl">
          <span className="text-3xl mb-2" role="img" aria-label="Empty">📄</span>
          <span className="text-lg font-medium text-gray-600">No documents yet</span>
          <span className="text-sm text-gray-400 mt-1">
            Upload or create documents, and they’ll show up here.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewerModal;
