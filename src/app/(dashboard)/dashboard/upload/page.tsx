"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, FileText, X, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { documentStore } from "@/lib/document-store";
import { authStore } from "@/lib/auth-store";
import { toast } from "sonner";

export default function UploadPage() {
  const router = useRouter();
  const currentUser = authStore.getCurrentUser();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadedDocId, setUploadedDocId] = useState<string>("");
  const [recentDocs, setRecentDocs] = useState<any[]>([]);

  useEffect(() => {
    if (!authStore.isAuthenticated()) {
      router.push("/sign-in");
      return;
    }

    const loadRecentDocs = async () => {
      if (currentUser) {
        const docs = await documentStore.getAll(currentUser.id);
        setRecentDocs(docs.slice(0, 3));
      }
    };

    loadRecentDocs();
  }, [router, currentUser, uploaded]); // Reload when a document is uploaded

  if (!currentUser) {
    return null;
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".tex"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/x-bibtex": [".bib"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false,
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    const currentUser = authStore.getCurrentUser();
    if (!currentUser) {
      toast.error("Please sign in to upload documents");
      router.push("/sign-in");
      return;
    }
    
    setUploading(true);
    
    try {
      // Create document entry with user association
      const file = files[0];
      
      const docId = await documentStore.add({
        userId: currentUser.id,
        name: file.name,
        status: "uploaded",
        errors: 0,
        warnings: 0,
        citations: 0,
        size: file.size,
        type: file.name.split('.').pop() || 'unknown',
      });

      // Start analysis
      await documentStore.analyze(docId);
      
      setUploading(false);
      setUploaded(true);
      setUploadedDocId(docId);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document");
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFiles([]);
    setUploaded(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Document</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {!uploaded ? (
          <>
            {/* Upload Zone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                isDragActive
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-950/20 scale-[1.02]"
                  : "border-gray-300 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600"
              }`}
            >
              <input {...getInputProps()} />
              <Upload
                className={`h-16 w-16 mx-auto mb-4 transition-colors ${
                  isDragActive ? "text-primary-500" : "text-gray-400"
                }`}
              />
              {isDragActive ? (
                <p className="text-lg font-medium text-primary-600 dark:text-primary-400">
                  Drop to upload
                </p>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Drag and drop your document here
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">or click to browse</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Supports .tex, .pdf, .docx, .bib — Max 50MB
                  </p>
                </>
              )}
            </div>

            {/* Selected File */}
            {files.length > 0 && (
              <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileText className="h-10 w-10 text-primary-500" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {files[0].name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {(files[0].size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={removeFile}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Analysis Options */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Analysis Options
                  </h4>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      LaTeX Error Detection
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Citation Validation
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Journal Formatting Check
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Readability Analysis
                    </span>
                  </label>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Document...
                    </>
                  ) : (
                    "Start Analysis →"
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Success State */
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Analysis Complete!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your document has been analyzed successfully.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="default" asChild>
                <Link href={`/dashboard/documents/${uploadedDocId}`}>View Results</Link>
              </Button>
              <Button variant="outline" onClick={() => { setFiles([]); setUploaded(false); setUploadedDocId(""); }}>
                Upload Another
              </Button>
            </div>
          </div>
        )}

        {/* Recent Uploads */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Uploads
          </h3>
          <div className="space-y-3">
            {recentDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <FileText className="h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">{doc.name}</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/documents/${doc.id}`}>View</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
