import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/auth";
import { getCurrentStudent } from "@/lib/get-current-student";
import {
  BARBER_AI_SYSTEM_PROMPT_INTRO,
  buildCourseKnowledgeBlock,
  buildStudentContextBlock,
} from "@/lib/barber-ai";

/**
 * ============================================================================
 * BARBER AI — secure backend endpoint
 * ============================================================================
 * The API key lives ONLY here (server-side env var), never in client code.
 * If ANTHROPIC_API_KEY is not set, this endpoint does NOT fake a response —
 * it tells the caller plainly that the tutor isn't connected yet, so the UI
 * can show an honest state instead of a scripted "AI" reply.
 *
 * PROD checklist:
 *   - Set ANTHROPIC_API_KEY in the server environment (never NEXT_PUBLIC_*).
 *   - Optionally set ANTHROPIC_MODEL to pin a specific model version.
 *   - Persist conversations to AIConversation (prisma/schema.prisma) instead
 *     of being stateless per-request as it is now.
 *   - Populate AIKnowledge from /admin/barber-ai and merge it into
 *     buildCourseKnowledgeBlock() so answers stay grounded in real,
 *     instructor-authored content instead of the demo lesson summaries.
 * ============================================================================
 */

export const runtime = "nodejs";

const MAX_HISTORY_MESSAGES = 12;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const messages: { role: "user" | "assistant"; content: string }[] = body?.messages ?? [];

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Falta el mensaje." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      connected: false,
      reply:
        "Barber AI todavía no está conectado a un modelo de lenguaje en este entorno. " +
        "Para activarlo, configurá la variable de entorno ANTHROPIC_API_KEY en el servidor " +
        "(nunca en el frontend) y volvé a intentar. El resto de la plataforma funciona con " +
        "normalidad mientras tanto.",
    });
  }

  try {
    const student = await getCurrentStudent();
    const anthropic = new Anthropic({ apiKey });

    const system = [
      BARBER_AI_SYSTEM_PROMPT_INTRO,
      "\n\n--- CONTENIDO AUTORIZADO DEL CURSO ---\n",
      buildCourseKnowledgeBlock(),
      "\n\n--- PROGRESO ACTUAL DEL ALUMNO ---\n",
      buildStudentContextBlock(student),
    ].join("");

    const trimmedHistory = messages.slice(-MAX_HISTORY_MESSAGES);

    const response = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
      max_tokens: 700,
      system,
      messages: trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply = textBlock && "text" in textBlock ? textBlock.text : "No pude generar una respuesta.";

    return NextResponse.json({ connected: true, reply });
  } catch (error) {
    console.error("[barber-ai] error calling Anthropic API:", error);
    return NextResponse.json(
      {
        connected: false,
        reply:
          "Hubo un problema al conectar con el modelo de IA. Revisá que ANTHROPIC_API_KEY " +
          "sea válida y que la cuenta tenga crédito disponible.",
      },
      { status: 200 }
    );
  }
}
