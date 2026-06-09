import { z } from "zod";

export const documentUploadSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  targetJournal: z.string().optional(),
  documentType: z.enum([
    "ARTICLE",
    "REVIEW",
    "CONFERENCE",
    "THESIS",
    "PREPRINT",
    "BOOK_CHAPTER",
  ]),
  analysisOptions: z.object({
    latexCheck: z.boolean().default(true),
    citationValidation: z.boolean().default(true),
    formatCheck: z.boolean().default(true),
    readabilityAnalysis: z.boolean().default(true),
    generateReport: z.boolean().default(false),
  }),
});

export const teamCreateSchema = z.object({
  name: z.string().min(1, "Team name is required").max(100),
  description: z.string().max(500).optional(),
});

export const teamInviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["OWNER", "ADMIN", "MEMBER", "VIEWER"]),
});

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  institution: z.string().max(200).optional(),
  orcidId: z.string().max(50).optional(),
  bio: z.string().max(500).optional(),
});

export const apiKeyCreateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
});
