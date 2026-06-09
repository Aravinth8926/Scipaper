"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, ArrowLeft, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { documentStore } from "@/lib/document-store";
import { authStore } from "@/lib/auth-store";
import { formatRelativeTime } from "@/lib/format";

export default function DocumentsPage() {
  const router = useRouter();
  const currentUser = authStore.getCurrentUser();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authStore.isAuthenticated()) {
      router.push("/sign-in");
      return;
    }

    const loadDocuments = async () => {
      if (currentUser) {
        const docs = await documentStore.getAll(currentUser.id);
        setDocuments(docs);
        setLoading(false);
      }
    };

    loadDocuments();
  }, [router, currentUser]);

  if (!currentUser || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="glass border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Documents</h1>
          </div>
          <Button variant="default" asChild>
            <Link href="/dashboard/upload">Upload New</Link>
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-3 rounded-lg glass text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Documents Table */}
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Issues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Citations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doc.status === "completed"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : doc.status === "analyzing"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(() => {
                      const totalIssues = doc.errors + doc.warnings;
                      return (
                        <span className={totalIssues > 0 ? "text-amber-600 dark:text-amber-400 font-medium" : "text-green-600 dark:text-green-400"}>
                          {totalIssues === 0 ? "0" : `${doc.errors > 0 ? `${doc.errors} error${doc.errors !== 1 ? 's' : ''}` : ''}${doc.errors > 0 && doc.warnings > 0 ? ', ' : ''}${doc.warnings > 0 ? `${doc.warnings} warning${doc.warnings !== 1 ? 's' : ''}` : ''}`}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {doc.citations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(doc.uploadedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/documents/${doc.id}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
