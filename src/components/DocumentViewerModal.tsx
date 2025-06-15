
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trash2, CheckSquare, ChevronDown } from "lucide-react";

// Removed: type DocType, since type is unused now.
type Document = {
  id: number;
  name: string;
  added: Date;
  type: string;
  previewImg?: string;
};

const initialMockDocs: Document[] = []; // No mock docs

interface DocumentViewerModalProps {
  open: boolean;
  onClose: () => void;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  open,
  onClose,
}) => {
  // Store docs in state for deletable UI
  const [docs, setDocs] = useState<Document[]>(initialMockDocs);
  const [sortBy, setSortBy] = useState<"date" | "type">("date");
  const [selected, setSelected] = useState<number[]>([]);

  React.useEffect(() => {
    if (open) {
      setDocs(initialMockDocs); // Will be []
      setSelected([]);
    }
  }, [open]);

  // Sorting logic (will just return [] if docs empty)
  const displayDocs = [...docs].sort((a, b) => {
    if (sortBy === "date") return b.added.getTime() - a.added.getTime();
    if (sortBy === "type") return a.type.localeCompare(b.type) || b.added.getTime() - a.added.getTime();
    return 0;
  });

  // Select logic
  const toggleSelect = (id: number) =>
    setSelected((curr) =>
      curr.includes(id) ? curr.filter((sid) => sid !== id) : [...curr, id]
    );
  const selectAll = () => setSelected(displayDocs.map((doc) => doc.id));
  const clearSelection = () => setSelected([]);
  const handleDeleteSelected = () => {
    setDocs((prev) => prev.filter((doc) => !selected.includes(doc.id)));
    setSelected([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#fffcf4] border-[#e9ddb9] rounded-3xl p-0 shadow-xl">
        {/* Dialog Title for accessibility */}
        <span className="sr-only">
          <span id="my-documents-modal-title">My Documents</span>
        </span>
        {/* Header */}
        <div className="flex flex-row items-center justify-between px-7 pt-6 pb-3 border-b border-[#efe2bc] bg-[#fffbea]">
          <span className="font-bold text-lg text-gray-800" id="my-documents-modal-title">
            My Documents
          </span>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-7 py-3 bg-[#fcf8ea] border-b border-[#efe2bc] gap-2">
          {/* Sorting */}
          <div className="flex flex-row items-center gap-2 mb-1 sm:mb-0">
            <span className="text-gray-700 text-sm">Sort by</span>
            <button
              onClick={() => setSortBy(sortBy === "date" ? "type" : "date")}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#e9ddb9] bg-white rounded-lg text-gray-700 hover:bg-yellow-100 transition text-sm shadow-sm"
              type="button"
            >
              {sortBy === "date" ? "Date Added" : "Type"}
              <ChevronDown size={17} className="ml-0.5 text-gray-400" />
            </button>
          </div>
          {/* Selection/Deletion */}
          <div className="flex items-center gap-2">
            {selected.length > 0 ? (
              <>
                <span className="text-gray-500 text-xs">{selected.length} selected</span>
                <button
                  className="text-xs flex items-center gap-1 text-red-600 px-2.5 py-1.5 rounded-md border border-red-200 bg-white hover:bg-red-50 transition"
                  onClick={handleDeleteSelected}
                  type="button"
                >
                  <Trash2 size={15} /> Delete
                </button>
                <button
                  className="text-xs text-gray-600 rounded-md px-2.5 py-1.5 border border-gray-200 bg-white hover:bg-yellow-50 transition"
                  onClick={clearSelection}
                  type="button"
                >
                  Clear
                </button>
              </>
            ) : (
              <button
                className="text-xs text-gray-600 rounded-md px-2.5 py-1.5 border border-gray-200 bg-white hover:bg-yellow-50 transition"
                onClick={selectAll}
                type="button"
              >
                Select All
              </button>
            )}
          </div>
        </div>

        {/* Document Previews */}
        <div className="p-7 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[420px] overflow-y-auto">
          {displayDocs.map((doc) => (
            <div
              key={doc.id}
              className={`
                relative p-4 pt-7 rounded-2xl border border-[#efe2bc] bg-white transition-shadow shadow-sm
                ${selected.includes(doc.id) ? "ring-2 ring-yellow-400" : ""}
                hover:shadow-lg
              `}
              style={{ minHeight: 175 }}
              onClick={() => toggleSelect(doc.id)}
              tabIndex={0}
              role="button"
              aria-pressed={selected.includes(doc.id)}
            >
              {/* Bookmark tab */}
              <span className="absolute top-3 right-3">
                <svg
                  width={24}
                  height={24}
                  fill="none"
                  stroke="#CAA443"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <rect
                    x={19}
                    y={3}
                    width={3}
                    height={18}
                    rx={1.5}
                    fill="#FFE082"
                    stroke="none"
                  />
                  <path d="M5 3a2 2 0 0 0-2 2v14.5a1 1 0 0 0 1.52.86l6.48-3.7 6.48 3.7A1 1 0 0 0 21 19.5V5a2 2 0 0 0-2-2H5z" />
                </svg>
              </span>
              {/* Preview Img */}
              {doc.previewImg && (
                <img
                  src={doc.previewImg}
                  alt="Preview"
                  className="rounded-md border border-[#efe2bc] object-cover w-full h-24 mb-3 mx-auto"
                />
              )}
              <div className="flex flex-col gap-0.5 mt-1">
                <span className="font-semibold text-gray-800 leading-tight">{doc.name}</span>
              </div>
              {selected.includes(doc.id) && (
                <CheckSquare className="absolute bottom-3 right-4 text-yellow-500 bg-white rounded-full" size={20} />
              )}
            </div>
          ))}
          {displayDocs.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center w-full col-span-2 min-h-[180px]">
              <span className="text-3xl mb-2" role="img" aria-label="Empty">📄</span>
              <span className="text-lg font-medium text-gray-500">No documents yet</span>
              <span className="text-sm text-gray-400 mt-1">Upload or create documents, and they’ll show up here.</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewerModal;

