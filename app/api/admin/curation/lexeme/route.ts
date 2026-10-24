// Sprint 2A.3 + S2-005 - Curation API: Lexeme PATCH (kopru)
// Tum guvenlik mantigi src/lib/curation/lexemeStore.ts icinde.
// ID, body icinden gelir (mevcut UI uyumlulugu korunur).

import { NextRequest, NextResponse } from "next/server";
import { updateLexeme, getLexemeById } from "@/lib/curation/lexemeStore";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Query param 'id' is required" },
      { status: 400 }
    );
  }
  const lexeme = getLexemeById(id);
  if (!lexeme) {
    return NextResponse.json(
      { success: false, error: `Lexeme not found: ${id}` },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, lexeme });
}

export async function PATCH(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const id = body.id;
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Field 'id' is required" },
      { status: 400 }
    );
  }

  const patch = body.patch ?? {
    rootIds: body.rootIds,
    wordFamilyId: body.wordFamilyId,
    conceptId: body.conceptId,
    partOfSpeech: body.partOfSpeech,
    ipa: body.ipa,
    technicalDebt: body.technicalDebt,
    notes: body.notes,
  };

  const result = updateLexeme(id, patch, {
    reason: body.reason,
    editor: body.editor,
    dryRun: body.dryRun === true,
  });

  if (!result.success) {
    const status = result.error?.startsWith("Lexeme not found") ? 404 : 400;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
