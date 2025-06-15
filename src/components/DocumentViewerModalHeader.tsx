
import React from "react";
import { ChevronLeft } from "lucide-react";

interface DocumentViewerModalHeaderProps {
  onBack: () => void;
}

const DocumentViewerModalHeader: React.FC<DocumentViewerModalHeaderProps> = ({ onBack }) => (
  <div className="flex flex-row items-center justify-between px-7 pt-6 pb-3 border-b border-[#efe2bc] bg-[#fffbea] relative">
    <button
      onClick={onBack}
      aria-label="Back to Features"
      className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full hover:bg-yellow-100 transition p-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      style={{ lineHeight: 0 }}
      type="button"
    >
      <ChevronLeft size={23} className="text-yellow-700" />
    </button>
    <span className="font-bold text-lg text-gray-800 mx-auto" id="my-documents-modal-title">
      My Documents
    </span>
    <span className="w-[38px] h-[38px]"></span>
  </div>
);

export default DocumentViewerModalHeader;
