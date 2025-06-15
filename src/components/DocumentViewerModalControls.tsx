
import React from "react";
import { Trash2 } from "lucide-react";

interface DocumentViewerModalControlsProps {
  selectedCount: number;
  totalCount: number;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
  onSelectAll: () => void;
}

const DocumentViewerModalControls: React.FC<DocumentViewerModalControlsProps> = ({
  selectedCount,
  totalCount,
  onDeleteSelected,
  onClearSelection,
  onSelectAll,
}) => (
  <div className="flex items-center justify-between px-7 py-4 bg-[#fcf8ea] border-b border-[#efe2bc] gap-2">
    <div className="flex items-center gap-2 w-full justify-center">
      {selectedCount > 0 ? (
        <>
          <span className="text-gray-500 text-xs">{selectedCount} selected</span>
          <button
            className="text-xs flex items-center gap-1 text-red-600 px-3 h-9 rounded-md border border-red-200 bg-white hover:bg-red-50 transition font-medium"
            onClick={onDeleteSelected}
            type="button"
          >
            <Trash2 size={15} /> Delete
          </button>
          <button
            className="text-xs text-gray-600 rounded-md px-3 h-9 border border-gray-200 bg-white hover:bg-yellow-50 transition font-medium"
            onClick={onClearSelection}
            type="button"
          >
            Clear
          </button>
        </>
      ) : (
        <button
          className="text-xs text-gray-600 rounded-md px-3 h-9 border border-gray-200 bg-white hover:bg-yellow-50 transition font-medium"
          onClick={onSelectAll}
          type="button"
          disabled={totalCount === 0}
        >
          Select All
        </button>
      )}
    </div>
  </div>
);

export default DocumentViewerModalControls;

