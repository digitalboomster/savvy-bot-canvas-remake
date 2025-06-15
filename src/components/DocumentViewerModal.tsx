
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trash2, CheckSquare, X, ChevronDown } from "lucide-react";
import { format } from "date-fns";

// ----------- MOCKED DATA ----------------
type DocType = "Note" | "PDF" | "Scan";
type Document = {
  id: number;
  name: string;
  added: Date;
  type: DocType;
  previewImg?: string;
};

const mockDocs: Document[] = [
  {
    id: 1,
    name: "Roadmap",
    added: new Date("2024-05-05"),
    type: "Note",
    previewImg: "/lovable-uploads/542b0725-969c-413d-a578-6a0798e82e14.png",
  },
  {
    id: 2,
    name: "Finance Plan",
    added: new Date("2024-05-07"),
    type: "Note",
    previewImg: "/lovable-uploads/542b0725-969c-413d-a578-6a0798e82e14.png",
  },
  {
    id: 3,
    name: "Scan_0001",
    added: new Date("2024-05-09"),
    type: "Scan",
    previewImg: "/lovable-uploads/542b0725-969c-413d-a578-6a0798e82e14.png",
  },
];

// ----------- MAIN MODAL COMPONENT ----------------
interface DocumentViewerModalProps {
  open: boolean;
  onClose: () => void;
}
const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ open, onClose }) => {
  const [sortBy, setSortBy] = useState<'date' | 'type'>('date');
  const [selected, setSelected] = useState<number[]>([]);

  // Sort docs
  const docs = [...mockDocs].sort((a, b) => {
    if (sortBy === "date") return b.added.getTime() - a.added.getTime();
    if (sortBy === "type") return a.type.localeCompare(b.type) || b.added.getTime() - a.added.getTime();
    return 0;
  });

  // Toggle selection
  const toggleSelect = (id: number) =>
    setSelected((curr) => curr.includes(id)
      ? curr.filter(sid => sid !== id)
      : [...curr, id]
    );
  const selectAll = () => setSelected(docs.map(doc => doc.id));
  const clearSelection = () => setSelected([]);
  const handleDeleteSelected = () => {
    // For demo: NOT actually deleting mockDocs
    clearSelection();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#fffcf4] border-[#e9ddb9] rounded-3xl p-0 shadow-xl">
        {/* Header */}
        <div className="flex flex-row items-center justify-between px-7 pt-6 pb-3 border-b border-[#efe2bc] bg-[#fffbea]">
          <span className="font-bold text-lg text-gray-800">My Documents</span>
          <button 
            className="hover:bg-yellow-100 rounded-full transition p-2 ml-2"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <X size={23} />
          </button>
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
            {selected.length > 0
              ? (
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
                  >Clear</button>
                </>
              ) : (
                <button
                  className="text-xs text-gray-600 rounded-md px-2.5 py-1.5 border border-gray-200 bg-white hover:bg-yellow-50 transition"
                  onClick={selectAll}
                  type="button"
                >Select All</button>
              )
            }
          </div>
        </div>
        
        {/* Document Previews */}
        <div className="p-7 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[420px] overflow-y-auto">
          {docs.map(doc => (
            <div key={doc.id}
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
                <svg width={24} height={24} fill="none" stroke="#CAA443" strokeWidth={2.2} viewBox="0 0 24 24">
                  <rect x={19} y={3} width={3} height={18} rx={1.5} fill="#FFE082" stroke="none"/>
                  <path d="M5 3a2 2 0 0 0-2 2v14.5a1 1 0 0 0 1.52.86l6.48-3.7 6.48 3.7A1 1 0 0 0 21 19.5V5a2 2 0 0 0-2-2H5z" />
                </svg>
              </span>
              {/* Preview Img */}
              {doc.previewImg &&
                <img src={doc.previewImg} alt="Preview" className="rounded-md border border-[#efe2bc] object-cover w-full h-24 mb-3 mx-auto" />
              }
              <div className="flex flex-col gap-0.5 mt-1">
                <span className="font-semibold text-gray-800 leading-tight">{doc.name}</span>
                <span className="text-xs text-gray-500">{doc.type}</span>
                <span className="text-xs text-gray-500">{format(doc.added, "PP")}</span>
              </div>
              {selected.includes(doc.id) && (
                <CheckSquare className="absolute bottom-3 right-4 text-yellow-500 bg-white rounded-full" size={20} />
              )}
            </div>
          ))}
          {docs.length === 0 &&
            <div className="text-center text-gray-400 col-span-2">No documents</div>
          }
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewerModal;
