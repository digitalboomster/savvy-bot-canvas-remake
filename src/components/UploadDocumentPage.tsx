
import React, { useRef, useState } from "react";
import { ChevronLeft, Upload, File, FileImage, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface UploadDocumentPageProps {
  onBack: () => void;
}

const BACKEND_URL = "https://4d9a25eb-4793-482a-a348-2e1c21e2b286-00-2gfu2fuimic4.kirk.replit.dev";
const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'gif'];

function checkFileType(file: File) {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!ext) return false;
  return ALLOWED_EXTENSIONS.includes(ext);
}

const iconForFile = (file: File) => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext === "pdf") return <FileText className="text-red-600" size={32} />;
  if (ext === "docx") return <FileText className="text-blue-600" size={32} />;
  if (["jpg", "jpeg", "png", "gif", "webp", "heic"].includes(ext || "")) return <FileImage className="text-yellow-600" size={32} />;
  return <File className="text-gray-400" size={32} />;
};

const UploadDocumentPage: React.FC<UploadDocumentPageProps> = ({ onBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && checkFileType(file)) {
      setSelectedFile(file);
    } else if (file) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a PDF, DOCX or image file.",
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && checkFileType(file)) {
      setSelectedFile(file);
    } else if (file) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a PDF, DOCX or image file.",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      const res = await fetch(`${BACKEND_URL}/upload-document`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload");
      toast({
        title: "Upload successful",
        description: `Your document "${selectedFile.name}" has been uploaded.`,
      });
      setSelectedFile(null);
    } catch (e) {
      toast({
        title: "Error",
        description: "Could not upload document. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between px-1 py-4 border-b border-black/10 bg-white/80 backdrop-blur-md shadow-sm">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-black/5 transition-colors duration-200"
          aria-label="Back"
        >
          <ChevronLeft size={22} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black tracking-tight text-neutral-900 text-center flex-1">Upload Document</h1>
        <span className="block w-[40px] h-[28px]" />
      </div>
      <main className="flex-1 flex flex-col pt-12 w-full max-w-md px-4">
        {/* Upload zone */}
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-yellow-300 bg-white rounded-2xl py-12 mb-10 shadow-lg cursor-pointer transition hover:bg-yellow-50"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Drag and drop document here or click to select."
        >
          <Upload size={40} className="text-yellow-500 mb-4" />
          <span className="text-lg font-semibold text-yellow-700 mb-2">Drag and drop document here</span>
          <span className="text-gray-500 text-sm mb-3">or click to select PDF, DOCX, or image file</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className="mt-4 flex items-center gap-3">
              {iconForFile(selectedFile)}
              <span className="text-sm text-gray-800">{selectedFile.name}</span>
            </div>
          )}
        </div>
        {/* Upload button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full text-base font-semibold flex items-center justify-center gap-2 h-12 rounded-xl shadow-lg bg-yellow-500 text-white hover:bg-yellow-600"
        >
          {uploading ? "Uploading..." : <><Upload className="mr-2" size={22} /> Upload Document</>}
        </Button>
        <div className="mt-6 text-xs text-gray-400 text-center">
          Allowed formats: PDF, DOCX, JPG, PNG, GIF. Max 10MB per file.
        </div>
      </main>
    </div>
  );
};

export default UploadDocumentPage;
