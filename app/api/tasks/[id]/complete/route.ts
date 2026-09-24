import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { completeTask } from "@/lib/store";

/**
 * Marca una tarea como completada para el usuario actual (demo en memoria —
 * ver lib/store.ts). File uploads (PHOTO_UPLOAD / VIDEO_UPLOAD) todavía
 * necesitan un proveedor de almacenamiento — esto solo registra el campo
 * `content` de texto, no archivos.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const content = typeof body?.content === "string" ? body.content : undefined;

  const result = completeTask(id);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 404 });

  return NextResponse.json({ ...result, receivedContent: Boolean(content) });
}
