import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { completeLesson } from "@/lib/store";
import { getLessonById } from "@/lib/data/course-content";

/** Marks a lesson as watched/completed for the current user (real DB write). */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const { id } = await params;
  const found = getLessonById(id);
  if (!found) return NextResponse.json({ error: "Lección no encontrada." }, { status: 404 });

  const result = await completeLesson(session.user.id, id);
  return NextResponse.json(result);
}
