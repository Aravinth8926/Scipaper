import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET single document
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 400 }
      );
    }

    const doc = await db.document.findFirst({
      where: {
        id: params.id,
        userId,
      },
      include: {
        latexErrors: true,
      },
    });

    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const transformedDoc = {
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
    };

    return NextResponse.json({ document: transformedDoc });
  } catch (error) {
    console.error("Get document error:", error);
    return NextResponse.json(
      { error: "Failed to fetch document" },
      { status: 500 }
    );
  }
}
