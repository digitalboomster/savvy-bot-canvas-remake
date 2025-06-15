
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
      <DialogContent className="max-w-2xl bg-[#fffcf4] border-[#e9ddb9] rounded-3xl p-0 shadow-xl">
        <span className="sr-only">
          <span id="my-documents-modal-title">My Documents</span>
        </span>
        <DocumentViewerModalHeader onBack={onClose} />
        <div className="p-7 pt-4 flex flex-col items-center justify-center text-center w-full min-h-[250px]">
          <span className="text-3xl mb-2" role="img" aria-label="Empty">📄</span>
          <span className="text-lg font-medium text-gray-500">No documents yet</span>
          <span className="text-sm text-gray-400 mt-1">
            Upload or create documents, and they’ll show up here.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewerModal;

