import { auth } from "@/auth";
import { getStudentState } from "@/lib/store";
import { findUserById } from "@/lib/auth-users";
import type { StudentProfile } from "@/lib/types";

/**
 * Returns the logged-in user's identity (name/email/role — real, from the
 * session) merged with demo gamification data (XP/progress/achievements —
 * from lib/data/demo-student.ts) so every dashboard screen has something
 * coherent to render without a database.
 *
 * PROD: replace the merge below with a single query:
 *   prisma.profile.findUnique({ where: { userId: session.user.id }, ... })
 * joined with Progress / XPTransaction / UserAchievement, keyed off the
 * real authenticated user instead of the shared demo profile.
 */
export async function getCurrentStudent(): Promise<StudentProfile> {
  const session = await auth();
  const demoState = getStudentState();

  if (!session?.user) {
    // Should not happen behind the dashboard proxy, but fail safe into the
    // demo profile rather than crashing a server component.
    return demoState;
  }

  const initials = (session.user.name ?? "Alumno")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // El JWT solo se actualiza cuando el usuario vuelve a iniciar sesión, así
  // que si un admin aprobó el pago recién ahora, el token todavía diría
  // PENDING_PAYMENT. Se busca el estado real en el store para no obligar a
  // reloguearse.
  const liveUser = session.user.id ? findUserById(session.user.id) : undefined;

  return {
    ...demoState,
    id: session.user.id ?? demoState.id,
    name: session.user.name ?? demoState.name,
    email: session.user.email ?? demoState.email,
    role: session.user.role ?? "STUDENT",
    enrollmentStatus: liveUser?.enrollmentStatus ?? session.user.enrollmentStatus ?? "ACTIVE",
    avatarInitials: initials || demoState.avatarInitials,
  };
}
