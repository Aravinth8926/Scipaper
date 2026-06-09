"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { documentStore } from "@/lib/document-store";
import { authStore } from "@/lib/auth-store";
import { formatRelativeTime } from "@/lib/format";

export default function DashboardPage() {
  const router = useRouter();
  const [allDocs, setAllDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    if (!authStore.isAuthenticated()) {
      router.push("/sign-in");
      return;
    }

    // Load documents
    const loadDocuments = async () => {
      const currentUser = authStore.getCurrentUser();
      if (currentUser) {
        const docs = await documentStore.getAll(currentUser.id);
        setAllDocs(docs);
        setLoading(false);
      }
    };

    loadDocuments();
  }, [router]);

  if (!authStore.isAuthenticated() || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentUser = authStore.getCurrentUser();
  const recentDocs = allDocs.slice(0, 5);
  
  const totalDocs = allDocs.length;
  const totalIssues = allDocs.reduce((sum, doc) => sum + doc.errors + doc.warnings, 0);
  const completedDocs = allDocs.filter(d => d.status === 'completed').length;
  
  const stats = [
    { label: "Total Documents", value: totalDocs.toString(), icon: FileText, color: "text-blue-600 dark:text-blue-400" },
    { label: "Completed Analysis", value: completedDocs.toString(), icon: CheckCircle, color: "text-green-600 dark:text-green-400" },
    { label: "Issues Found", value: totalIssues.toString(), icon: AlertCircle, color: "text-amber-600 dark:text-amber-400" },
    { label: "Avg Score", value: allDocs.length > 0 ? Math.round(allDocs.reduce((sum, d) => sum + (d.scores?.overall || 0), 0) / allDocs.length).toString() : "0", icon: CheckCircle, color: "text-purple-600 dark:text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Simple Header */}
      <header className="glass border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SciPaper AI</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
              {currentUser?.email}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                authStore.signOut();
                router.push("/");
              }}
            >
              Sign Out
            </Button>
            <Button variant="default" asChild>
              <Link href="/dashboard/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {currentUser?.name}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You have {recentDocs.filter(d => d.status !== 'completed').length} documents pending review
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Documents */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Documents
          </h3>
          {recentDocs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No documents yet</p>
              <Button asChild>
                <Link href="/dashboard/upload">Upload Your First Document</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {recentDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-10 w-10 text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{doc.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatRelativeTime(doc.uploadedAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
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
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.errors + doc.warnings} {doc.errors + doc.warnings === 1 ? 'issue' : 'issues'}
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/documents/${doc.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/documents">View All Documents</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
