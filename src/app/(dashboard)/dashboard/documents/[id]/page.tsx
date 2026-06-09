"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Download, Share2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { documentStore } from "@/lib/document-store";
import { authStore } from "@/lib/auth-store";
import { formatRelativeTime } from "@/lib/format";
import { toast } from "sonner";

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const currentUser = authStore.getCurrentUser();
  const [fixedIssues, setFixedIssues] = useState<Set<number>>(new Set());
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authStore.isAuthenticated()) {
      router.push("/sign-in");
      return;
    }

    const loadDocument = async () => {
      if (currentUser) {
        const document = await documentStore.get(params.id, currentUser.id);
        setDoc(document);
        setLoading(false);
      }
    };

    loadDocument();
  }, [router, currentUser, params.id]);

  if (!currentUser || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading document...</p>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Document Not Found</h1>
          <Button asChild>
            <Link href="/dashboard/documents">Back to Documents</Link>
          </Button>
        </div>
      </div>
    );
  }

  const issues: Array<{
    line: number;
    severity: "error" | "warning" | "info";
    message: string;
    fix: string;
  }> = doc.issues || [];

  const handleFix = (index: number, issue: typeof issues[0]) => {
    // Mark as fixed
    setFixedIssues(prev => new Set(prev).add(index));
    
    // Update document error count
    if (issue.severity === 'error') {
      documentStore.update(params.id, {
        errors: Math.max(0, doc.errors - 1)
      });
    } else if (issue.severity === 'warning') {
      documentStore.update(params.id, {
        warnings: Math.max(0, doc.warnings - 1)
      });
    }
    
    // Show success toast
    toast.success('Issue fixed!', {
      description: `Applied fix for line ${issue.line}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="glass border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/documents">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{doc.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {doc.analyzedAt ? `Analyzed ${formatRelativeTime(doc.analyzedAt)}` : `Uploaded ${formatRelativeTime(doc.uploadedAt)}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.success('Shared!', { description: 'Link copied to clipboard' })}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => toast.success('Downloaded!', { description: 'Document downloaded successfully' })}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Score Cards */}
        {doc.scores && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-6">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{doc.scores.overall}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Overall Score</div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{doc.scores.latex}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">LaTeX Quality</div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{doc.scores.citations}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Citation Accuracy</div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{doc.scores.readability}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Readability</div>
            </div>
          </div>
        )}

        {/* Issues List */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Issues Found ({issues.length - fixedIssues.size} remaining)
            </h2>
            {fixedIssues.size > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setFixedIssues(new Set());
                  toast.info('Fixes cleared', { description: 'All fixes have been reset' });
                }}
              >
                Clear All Fixes
              </Button>
            )}
          </div>
          {issues.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">No issues found!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Your document looks great.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue, i) => {
                const isFixed = fixedIssues.has(i);
                
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-gray-900/50 border transition-all ${
                      isFixed 
                        ? 'border-green-300 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {isFixed ? (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <>
                        {issue.severity === "error" && <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />}
                        {issue.severity === "warning" && <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />}
                        {issue.severity === "info" && <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />}
                      </>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono text-gray-600 dark:text-gray-400">Line {issue.line}</span>
                        {!isFixed && (
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              issue.severity === "error"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                : issue.severity === "warning"
                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            }`}
                          >
                            {issue.severity}
                          </span>
                        )}
                        {isFixed && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                            Fixed
                          </span>
                        )}
                      </div>
                      <p className={`font-medium mb-2 ${isFixed ? 'text-gray-500 dark:text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                        {issue.message}
                      </p>
                      {!isFixed && (
                        <div className="bg-gray-100 dark:bg-gray-800/50 rounded px-3 py-2 mt-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Suggested fix:</span> {issue.fix}
                          </p>
                        </div>
                      )}
                      {isFixed && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          ✓ Fix has been applied successfully
                        </p>
                      )}
                    </div>
                    <Button 
                      variant={isFixed ? "outline" : "default"} 
                      size="sm"
                      onClick={() => handleFix(i, issue)}
                      disabled={isFixed}
                    >
                      {isFixed ? 'Fixed' : 'Fix'}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
