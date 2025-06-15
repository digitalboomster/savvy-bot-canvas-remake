
import React, { useState, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DocumentViewerModalHeader from "./DocumentViewerModalHeader";
import DocumentViewerModalControls from "./DocumentViewerModalControls";
import DocumentCard from "./DocumentCard";

type Document = {
  id: number;
  name: string;
  added: Date;
  type: string;
  previewImg?: string;
};

const initialMockDocs: Document[] = []; // NO MOCKS

interface DocumentViewerModalProps {
  open: boolean;
  onClose: () => void;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  open,
  onClose,
}) => {
  const [docs, setDocs] = useState<Document[]>(initialMockDocs);
  const [sortBy, setSortBy] = useState<"date" | "type">("date");
  const [selected, setSelected] = useState<number[]>([]);

  React.useEffect(() => {
    if (open) {
      setDocs(initialMockDocs);
      setSelected([]);
    }
  }, [open]);

  const displayDocs = useMemo(() => {
    return [...docs].sort((a, b) => {
      if (sortBy === "date") return b.added.getTime() - a.added.getTime();
      if (sortBy === "type") return a.type.localeCompare(b.type) || b.added.getTime() - a.added.getTime();
      return 0;
    });
  }, [docs, sortBy]);

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
        <span className="sr-only">
          <span id="my-documents-modal-title">My Documents</span>
        </span>
        <DocumentViewerModalHeader onBack={onClose} />
        <DocumentViewerModalControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCount={selected.length}
          totalCount={displayDocs.length}
          onDeleteSelected={handleDeleteSelected}
          onClearSelection={clearSelection}
          onSelectAll={selectAll}
        />
        <div className="p-7 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[420px] overflow-y-auto">
          {displayDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              selected={selected.includes(doc.id)}
              onClick={toggleSelect}
            />
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
