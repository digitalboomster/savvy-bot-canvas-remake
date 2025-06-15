
import React from "react";
import { ChevronDown, Trash2 } from "lucide-react";

interface DocumentViewerModalControlsProps {
  sortBy: "date" | "type";
  setSortBy: (s: "date" | "type") => void;
  selectedCount: number;
  totalCount: number;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
  onSelectAll: () => void;
}

const DocumentViewerModalControls: React.FC<DocumentViewerModalControlsProps> = ({
  sortBy,
  setSortBy,
  selectedCount,
  totalCount,
  onDeleteSelected,
  onClearSelection,
  onSelectAll,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-7 py-3 bg-[#fcf8ea] border-b border-[#efe2bc] gap-2">
    <div className="flex items-center gap-2 mb-1 sm:mb-0">
      <span className="text-gray-700 text-sm font-medium h-9 flex items-center px-2">Sort by</span>
      <button
        onClick={() => setSortBy(sortBy === "date" ? "type" : "date")}
        className="flex items-center gap-1 px-3 h-9 border border-[#e9ddb9] bg-white rounded-lg text-gray-700 hover:bg-yellow-100 transition text-sm font-medium shadow-sm"
        type="button"
        style={{ minWidth: 110 }}
      >
        {sortBy === "date" ? "Date Added" : "Type"}
        <ChevronDown size={17} className="ml-0.5 text-gray-400" />
      </button>
    </div>
    <div className="flex items-center gap-2">
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
