import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all documents for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 400 }
      );
    }

    // Add sample documents if user has none
    const existingDocs = await db.document.count({
      where: { userId },
    });

    if (existingDocs === 0) {
      // Create sample documents
      await db.document.createMany({
        data: [
          {
            userId,
            title: "quantum-entanglement.tex",
            fileName: "quantum-entanglement.tex",
            fileUrl: "/uploads/quantum-entanglement.tex",
            fileSize: 45678,
            fileType: "TEX",
            mimeType: "text/x-tex",
            status: "COMPLETED",
            overallScore: 92,
            latexScore: 95,
            citationScore: 88,
            readabilityScore: 93,
          },
          {
            userId,
            title: "neural-networks-review.tex",
            fileName: "neural-networks-review.tex",
            fileUrl: "/uploads/neural-networks-review.tex",
            fileSize: 89234,
            fileType: "TEX",
            mimeType: "text/x-tex",
            status: "COMPLETED",
            overallScore: 85,
            latexScore: 82,
            citationScore: 91,
            readabilityScore: 87,
          },
          {
            userId,
            title: "climate-model-paper.tex",
            fileName: "climate-model-paper.tex",
            fileUrl: "/uploads/climate-model-paper.tex",
            fileSize: 67890,
            fileType: "TEX",
            mimeType: "text/x-tex",
            status: "COMPLETED",
            overallScore: 94,
            latexScore: 96,
            citationScore: 92,
            readabilityScore: 94,
          },
        ],
      });

      // Add sample issues
      const docs = await db.document.findMany({ where: { userId } });
      
      if (docs[0]) {
        await db.latexError.createMany({
          data: [
            {
              documentId: docs[0].id,
              userId,
              severity: "WARNING",
              category: "citation",
              message: "Citation 'Author2023' not found in bibliography",
              suggestedFix: "Add the reference to your .bib file",
              line: 47,
            },
            {
              documentId: docs[0].id,
              userId,
              severity: "INFO",
              category: "style",
              message: "Consider using \\emph{} for emphasis",
              suggestedFix: "Replace \\textit{text} with \\emph{text}",
              line: 89,
            },
          ],
        });
      }

      if (docs[1]) {
        await db.latexError.createMany({
          data: [
            {
              documentId: docs[1].id,
              userId,
              severity: "ERROR",
              category: "syntax",
              message: "Undefined control sequence \\bfseries",
              suggestedFix: "Use \\textbf{text} instead",
              line: 23,
            },
            {
              documentId: docs[1].id,
              userId,
              severity: "ERROR",
              category: "math",
              message: "Missing $ inserted in math mode",
              suggestedFix: "Add $ before and after the expression",
              line: 45,
            },
            {
              documentId: docs[1].id,
              userId,
              severity: "ERROR",
              category: "environment",
              message: "Environment 'equation' not closed",
              suggestedFix: "Add \\end{equation}",
              line: 67,
            },
          ],
        });
      }

      if (docs[2]) {
        await db.latexError.create({
          data: {
            documentId: docs[2].id,
            userId,
            severity: "WARNING",
            category: "reference",
            message: "Reference 'fig:temperature-trend' multiply defined",
            suggestedFix: "Remove duplicate \\label command",
            line: 156,
          },
        });
      }
    }

    // Fetch all documents with errors
    const documents = await db.document.findMany({
      where: { userId },
      include: {
        latexErrors: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform to match frontend interface
    const transformedDocs = documents.map((doc) => ({
      id: doc.id,
      userId: doc.userId,
      name: doc.fileName,
      status: doc.status.toLowerCase(),
      errors: doc.latexErrors.filter((e) => e.severity === "ERROR").length,
      warnings: doc.latexErrors.filter((e) => e.severity === "WARNING").length,
      citations: 0,
      uploadedAt: doc.createdAt,
      analyzedAt: doc.updatedAt !== doc.createdAt ? doc.updatedAt : undefined,
      size: doc.fileSize,
      type: doc.fileType.toLowerCase(),
      scores: {
        overall: doc.overallScore || 0,
        latex: doc.latexScore || 0,
        citations: doc.citationScore || 0,
        readability: doc.readabilityScore || 0,
      },
      issues: doc.latexErrors.map((e) => ({
        line: e.line || 0,
        severity: e.severity.toLowerCase(),
        message: e.message,
        fix: e.suggestedFix || "",
      })),
    }));

    return NextResponse.json({ documents: transformedDocs });
  } catch (error) {
    console.error("Get documents error:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

// POST - Create new document
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, size, type } = body;

    if (!userId || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const doc = await db.document.create({
      data: {
        userId,
        title: name,
        fileName: name,
        fileUrl: `/uploads/${name}`,
        fileSize: size || 0,
        fileType: type?.toUpperCase() || "TEX",
        mimeType: `text/x-${type}`,
        status: "UPLOADED",
      },
    });

    return NextResponse.json({ documentId: doc.id });
  } catch (error) {
    console.error("Create document error:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}
