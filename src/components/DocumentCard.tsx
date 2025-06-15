
import React from "react";
import { CheckSquare } from "lucide-react";

type Document = {
  id: number;
  name: string;
  added: Date;
  type: string;
  previewImg?: string;
};

interface DocumentCardProps {
  doc: Document;
  selected: boolean;
  onClick: (id: number) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, selected, onClick }) => (
  <div
    key={doc.id}
    className={`
      relative p-4 pt-7 rounded-2xl border border-[#efe2bc] bg-white transition-shadow shadow-sm
      ${selected ? "ring-2 ring-yellow-400" : ""}
      hover:shadow-lg
    `}
    style={{ minHeight: 175 }}
    onClick={() => onClick(doc.id)}
    tabIndex={0}
    role="button"
    aria-pressed={selected}
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
    {selected && (
      <CheckSquare className="absolute bottom-3 right-4 text-yellow-500 bg-white rounded-full" size={20} />
    )}
  </div>
);

export default DocumentCard;
