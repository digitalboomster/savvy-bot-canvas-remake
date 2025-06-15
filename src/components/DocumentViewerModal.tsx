
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DocumentViewerModalHeader from "./DocumentViewerModalHeader";

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
      <DialogContent className="max-w-sm p-0 rounded-2xl overflow-hidden shadow-2xl border-none" style={{ borderRadius: 24 }}>
        {/* HEADER */}
        <div className="bg-yellow-400 flex items-center justify-center px-5 py-4 text-center relative" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <span className="text-lg font-bold w-full">My Documents</span>
          {/* Removed custom close button - inside DialogContent from shadcn/ui, a close button is already rendered */}
        </div>
        {/* NO DOCS */}
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

