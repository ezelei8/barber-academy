import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { setEnrollmentStatus } from "@/lib/auth-users";
import type { EnrollmentStatus } from "@/lib/types";

/**
 * El admin llama esto desde /admin/alumnos después de confirmar el pago por
 * fuera de la plataforma (transferencia, efectivo, WhatsApp, etc.). No hay
 * pasarela de pago conectada — esto es una aprobación manual, no un webhook.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "INSTRUCTOR")) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const status: EnrollmentStatus = body?.status === "PENDING_PAYMENT" ? "PENDING_PAYMENT" : "ACTIVE";

  const updated = setEnrollmentStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "Alumno no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ id: updated.id, enrollmentStatus: updated.enrollmentStatus });
}
