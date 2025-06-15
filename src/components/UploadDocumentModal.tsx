
import React, { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Upload, File, FileImage, FileText, ChevronLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface UploadDocumentModalProps {
  open: boolean;
  onClose: () => void;
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

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ open, onClose }) => {
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
      onClose();
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md w-full p-0 rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900"
        style={{ borderRadius: 24 }}
      >
        {/* Header style matching chat */}
        <div className="flex flex-col items-center justify-center pt-7 pb-2 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md">
          <span className="text-lg font-black text-gray-900 dark:text-white">Upload Document</span>
        </div>
        <div className="w-full h-[1.5px] bg-[#efe2bc] mb-0" />
        <div className="p-8 flex flex-col items-center justify-center text-center w-full min-h-[215px] bg-white dark:bg-gray-900 rounded-b-2xl">
          {/* Upload zone */}
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-yellow-300 bg-white rounded-2xl py-8 mb-6 shadow cursor-pointer transition hover:bg-yellow-50 w-full"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Drag and drop document here or click to select."
            style={{ minHeight: 130 }}
          >
            <Upload size={36} className="text-yellow-500 mb-3" />
            <span className="text-base font-semibold text-yellow-700 mb-1">Drag and drop document here</span>
            <span className="text-gray-500 text-xs mb-2">or click to select PDF, DOCX, or image file</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div className="mt-2 flex items-center gap-3">
                {iconForFile(selectedFile)}
                <span className="text-xs text-gray-800">{selectedFile.name}</span>
              </div>
            )}
          </div>
          {/* Upload button */}
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="w-full text-base font-semibold flex items-center justify-center gap-2 h-11 rounded-xl shadow bg-yellow-500 text-white hover:bg-yellow-600"
          >
            {uploading ? "Uploading..." : (
              <>
                <Upload className="mr-2" size={20} /> Upload Document
              </>
            )}
          </Button>
          <div className="mt-3 text-xs text-gray-400 text-center w-full">
            Allowed formats: PDF, DOCX, JPG, PNG, GIF. Max 10MB per file.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentModal;
