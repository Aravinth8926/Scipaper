// Client-side document store that calls API routes

export interface Document {
  id: string;
  userId: string;
  name: string;
  status: "uploaded" | "analyzing" | "completed" | "error";
  errors: number;
  warnings: number;
  citations: number;
  uploadedAt: Date;
  analyzedAt?: Date;
  size: number;
  type: string;
  scores?: {
    overall: number;
    latex: number;
    citations: number;
    readability: number;
  };
  issues?: Array<{
    line: number;
    severity: "error" | "warning" | "info";
    message: string;
    fix: string;
  }>;
}

class DocumentStore {
  async add(doc: Omit<Document, "id" | "uploadedAt">): Promise<string> {
    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create document");
      }

      return data.documentId;
    } catch (error) {
      console.error("Add document error:", error);
      throw error;
    }
  }

  async getAll(userId: string): Promise<Document[]> {
    try {
      const response = await fetch(`/api/documents?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch documents");
      }

      return data.documents.map((doc: any) => ({
        ...doc,
        uploadedAt: new Date(doc.uploadedAt),
        analyzedAt: doc.analyzedAt ? new Date(doc.analyzedAt) : undefined,
      }));
    } catch (error) {
      console.error("Get documents error:", error);
      return [];
    }
  }

  async get(id: string, userId: string): Promise<Document | undefined> {
    try {
      const response = await fetch(`/api/documents/${id}?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        return undefined;
      }

      return {
        ...data.document,
        uploadedAt: new Date(data.document.uploadedAt),
        analyzedAt: data.document.analyzedAt
          ? new Date(data.document.analyzedAt)
          : undefined,
      };
    } catch (error) {
      console.error("Get document error:", error);
      return undefined;
    }
  }

  async update(id: string, updates: Partial<Document>): Promise<void> {
    // For now, updates are handled through other specific endpoints
    // This is used for fixing issues, which doesn't need server update
  }

  async delete(id: string): Promise<void> {
    // TODO: Implement delete endpoint if needed
  }

  async analyze(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/documents/${id}/analyze`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to analyze document");
      }
    } catch (error) {
      console.error("Analyze document error:", error);
      throw error;
    }
  }
}

export const documentStore = new DocumentStore();
