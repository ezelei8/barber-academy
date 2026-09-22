import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser, findUserByEmail } from "@/lib/auth-users";

/**
 * Writes a real row to the `users` table (lib/auth-users.ts) plus its
 * associated `profiles` row. A verification email (see the `Notification`
 * model in prisma/schema.prisma, or an email provider like Resend) is a
 * future improvement — not required for the manual-approval flow this app
 * uses today.
 */
const RegisterSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.email("Ingresá un email válido."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = RegisterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos." },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;

  if (await findUserByEmail(email)) {
    return NextResponse.json({ error: "Ya existe una cuenta con ese email." }, { status: 409 });
  }

  const user = await createUser({ name, email, password });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
