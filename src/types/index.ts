export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type DocumentStatus =
  | "UPLOADED"
  | "PROCESSING"
  | "ANALYZING"
  | "COMPLETED"
  | "ERROR"
  | "ARCHIVED";

export type DocumentType =
  | "ARTICLE"
  | "REVIEW"
  | "CONFERENCE"
  | "THESIS"
  | "PREPRINT"
  | "BOOK_CHAPTER";

export type FileType = "TEX" | "PDF" | "DOCX" | "BIB";

export type Severity = "ERROR" | "WARNING" | "INFO" | "SUGGESTION";

export type CitationStatus = "UNCHECKED" | "CHECKING" | "VALID" | "WARNING" | "INVALID" | "NOT_FOUND";

export type FormatStatus = "PASS" | "FAIL" | "WARNING";
