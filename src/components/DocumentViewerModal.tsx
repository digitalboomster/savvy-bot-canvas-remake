
import React, { useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Upload } from "lucide-react";

interface DocumentViewerModalProps {
  open: boolean;
  onClose: () => void;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  open,
  onClose,
}) => {
  // File input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handler for upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handler for file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Here you would handle the file upload logic (API, storage, etc)
      // You can replace this with your desired upload handler
      alert(`Selected file: ${files[0].name}`);
      // Optionally reset input value so that same file selection can trigger handler again
      e.target.value = "";
    }
  };

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
        {/* Upload Button */}
        <div className="flex justify-end pr-8 pt-4">
          <button
            className="flex items-center gap-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition mb-2"
            onClick={handleUploadClick}
            type="button"
          >
            <Upload size={18} />
            Upload Document
          </button>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.csv,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
            multiple={false}
          />
        </div>
        {/* Body with "No documents yet" */}
        <div className="p-8 flex flex-col items-center justify-center text-center w-full min-h-[170px] bg-white dark:bg-gray-900 rounded-b-2xl">
          <span className="text-3xl mb-2" role="img" aria-label="Empty">📄</span>
          <span className="text-lg font-medium text-gray-600 dark:text-gray-300">No documents yet</span>
          <span className="text-sm text-gray-400 mt-1">
            Upload or create documents, and they’ll show up here.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewerModal;
