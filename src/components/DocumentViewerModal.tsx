
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
        <div className="flex flex-row items-center justify-between px-6 pt-6 pb-3 border-b border-[#efe2bc]">
          <span className="font-bold text-lg text-gray-800">My Documents</span>
          <button className="hover:bg-yellow-100 p-1 rounded transition" onClick={onClose}><X size={22} /></button>
        </div>
        {/* Controls */}
        <div className="flex items-center justify-between px-6 py-2 text-xs gap-2 bg-[#fcf8ea] border-b border-[#efe2bc]">
          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by</span>
            <button
              onClick={() => setSortBy(sortBy === "date" ? "type" : "date")}
              className="flex items-center gap-1 px-2 py-1 border border-[#e9ddb9] bg-white rounded-md text-gray-700 hover:bg-yellow-100 transition text-xs"
            >
              {sortBy === "date" ? "Date Added" : "Type"}
              <ChevronDown size={16} />
            </button>
          </div>
          {/* Select/Clear/Delete */}
          <div className="flex items-center gap-1">
            {selected.length > 0
              ? (
                <>
                  <span className="text-gray-500">{selected.length} selected</span>
                  <button
                    className="text-xs text-red-600 px-2 py-1 rounded hover:bg-red-100 border border-red-200"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 size={16} className="inline-block mr-1" />Delete
                  </button>
                  <button
                    className="text-xs text-gray-600 rounded px-2 py-1 border border-gray-200 hover:bg-yellow-50"
                    onClick={clearSelection}
                  >Clear</button>
                </>
              )
              : (
                <button
                  className="text-xs text-gray-600 rounded px-2 py-1 border border-gray-200 hover:bg-yellow-50"
                  onClick={selectAll}
                >Select All</button>
              )
            }
          </div>
        </div>
        {/* Document Previews */}
        <div className="p-6 pt-4 grid grid-cols-2 gap-4 max-h-[420px] overflow-y-auto">
          {docs.map(doc => (
            <div key={doc.id}
              className={`
                relative p-3 pt-5 rounded-xl border border-[#efe2bc] bg-white transition shadow
                ${selected.includes(doc.id) ? "ring-2 ring-yellow-400" : ""}
                hover:shadow-md hover:-translate-y-1
              `}
              style={{ minHeight: 180 }}
              onClick={() => toggleSelect(doc.id)}
              tabIndex={0}
              role="button"
              aria-pressed={selected.includes(doc.id)}
            >
              {/* Bookmark tab */}
              <span className="absolute top-2 right-2">
                <svg width={24} height={24} fill="none" stroke="#CAA443" strokeWidth={2.2} viewBox="0 0 24 24">
                  <rect x={19} y={3} width={3} height={18} rx={1.5} fill="#FFE082" stroke="none"/>
                  <path d="M5 3a2 2 0 0 0-2 2v14.5a1 1 0 0 0 1.52.86l6.48-3.7 6.48 3.7A1 1 0 0 0 21 19.5V5a2 2 0 0 0-2-2H5z" />
                </svg>
              </span>
              {/* Preview Img */}
              {doc.previewImg &&
                <img src={doc.previewImg} alt="Preview" className="rounded-md border border-[#efe2bc] object-cover w-full h-24 mb-3" />
              }
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 mb-1">{doc.name}</span>
                <span className="text-xs text-gray-500">{doc.type}</span>
                <span className="text-xs text-gray-500">{format(doc.added, "PP")}</span>
              </div>
              {selected.includes(doc.id) && (
                <CheckSquare className="absolute bottom-2 right-2 text-yellow-500" size={20} />
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
