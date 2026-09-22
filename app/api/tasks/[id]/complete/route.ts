import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { completeTask } from "@/lib/store";

/**
 * Submits/completes a task for the current user — writes a real row to
 * task_submissions (content, completed_at). File uploads (PHOTO_UPLOAD /
 * VIDEO_UPLOAD) still need an object storage provider — see README
 * "Almacenamiento" — this only persists the `content` text field, not files.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const content = typeof body?.content === "string" ? body.content : undefined;

  const result = await completeTask(session.user.id, id, content);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 404 });

  return NextResponse.json({ ...result, receivedContent: Boolean(content) });
}
