import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doc = await db.document.findUnique({
      where: { id: params.id },
    });

    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Set to analyzing
    await db.document.update({
      where: { id: params.id },
      data: { status: "ANALYZING" },
    });

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate random results
    const hasErrors = Math.random() > 0.7;
    const errorCount = hasErrors ? Math.floor(Math.random() * 3) + 1 : 0;
    const warningCount = Math.floor(Math.random() * 4) + 1;

    // Generate issues
    const issues = [];

    for (let i = 0; i < errorCount; i++) {
      const errorTypes = [
        {
          category: "syntax",
          message: "Undefined control sequence \\bfseries",
          suggestedFix: "Use \\textbf{text} instead of \\bfseries",
        },
        {
          category: "math",
          message: "Missing $ inserted in math mode",
          suggestedFix: "Add $ before and after the mathematical expression",
        },
        {
          category: "environment",
          message: "Environment 'equation' not closed",
          suggestedFix: "Add \\end{equation} to close the environment",
        },
      ];
      const error = errorTypes[Math.floor(Math.random() * errorTypes.length)];
      issues.push({
        ...error,
        severity: "ERROR",
        line: Math.floor(Math.random() * 200) + 1,
      });
    }

    for (let i = 0; i < warningCount; i++) {
      const warningTypes = [
        {
          category: "citation",
          message: "Citation key not found in bibliography",
          suggestedFix: "Check the .bib file for the correct citation key",
        },
        {
          category: "formatting",
          message: "Overfull \\hbox detected",
          suggestedFix: "Consider rewording or using \\linebreak",
        },
        {
          category: "reference",
          message: "Reference multiply defined",
          suggestedFix: "Remove duplicate \\label command",
        },
        {
          category: "float",
          message: "Float too large for page",
          suggestedFix: "Use [H] placement or resize the figure",
        },
      ];
      const warning = warningTypes[Math.floor(Math.random() * warningTypes.length)];
      issues.push({
        ...warning,
        severity: "WARNING",
        line: Math.floor(Math.random() * 200) + 1,
      });
    }

    // Create issues in database
    await db.latexError.createMany({
      data: issues.map((issue) => ({
        documentId: params.id,
        userId: doc.userId,
        severity: issue.severity,
        category: issue.category,
        message: issue.message,
        suggestedFix: issue.suggestedFix,
        line: issue.line,
      })),
    });

    // Update document
    await db.document.update({
      where: { id: params.id },
      data: {
        status: "COMPLETED",
        overallScore: Math.floor(Math.random() * 20) + 80,
        latexScore: Math.floor(Math.random() * 20) + 80,
        citationScore: Math.floor(Math.random() * 20) + 80,
        readabilityScore: Math.floor(Math.random() * 20) + 80,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analyze document error:", error);
    return NextResponse.json(
      { error: "Failed to analyze document" },
      { status: 500 }
    );
  }
}
