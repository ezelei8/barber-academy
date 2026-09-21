import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { setTaskFeedback } from "@/lib/store";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "INSTRUCTOR")) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const feedback = typeof body?.feedback === "string" ? body.feedback : "";

  const result = setTaskFeedback(id, feedback);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 404 });

  return NextResponse.json({ ok: true });
}
