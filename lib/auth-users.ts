import bcrypt from "bcryptjs";
import type { EnrollmentStatus, Role } from "@/lib/types";

/**
 * ============================================================================
 * MOCK USER STORE — NOT A REAL DATABASE
 * ============================================================================
 * This in-memory array stands in for `prisma.user` until a real database is
 * connected (see lib/db.ts and prisma/schema.prisma). It resets whenever the
 * server restarts and is NOT shared across serverless instances — it exists
 * purely so registration/login can be reviewed end-to-end in this demo.
 *
 * PROD: replace every function here with the equivalent Prisma call, e.g.
 *   findUserByEmail   -> prisma.user.findUnique({ where: { email } })
 *   createUser        -> prisma.user.create({ data: { ...,
 *                          passwordHash: await bcrypt.hash(password, 12) } })
 * Never store plaintext passwords — this file already hashes them with
 * bcrypt so the login flow behaves like the real thing.
 * ============================================================================
 */

export interface MockUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  /** El pago se coordina fuera de la plataforma — ver lib/types.ts. */
  enrollmentStatus: EnrollmentStatus;
  createdAt: string;
}

const seedHash = (plain: string) => bcrypt.hashSync(plain, 10);

// Next.js compiles each route into its own bundle, so a plain module-scope
// array would get re-initialized per bundle instead of being shared across
// requests (e.g. a user registered via /api/register wouldn't be found by
// the NextAuth credentials route). Attaching to `globalThis` keeps one
// shared array for the whole process — same trick as lib/store.ts.
const globalForUsers = globalThis as unknown as { __barberAcademyUsers?: MockUser[] };

// Demo accounts — documented here on purpose so reviewers can log in.
export const MOCK_USERS: MockUser[] =
  globalForUsers.__barberAcademyUsers ??
  (globalForUsers.__barberAcademyUsers = [
    {
      id: "demo-user-lucas",
      name: "Lucas",
      email: "alumno@demo.com",
      passwordHash: seedHash("alumno123"),
      role: "STUDENT",
      enrollmentStatus: "ACTIVE",
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-user-admin",
      name: "Instructor Demo",
      email: "admin@demo.com",
      passwordHash: seedHash("admin123"),
      role: "ADMIN",
      enrollmentStatus: "ACTIVE",
      createdAt: new Date().toISOString(),
    },
  ]);

export function findUserByEmail(email: string): MockUser | undefined {
  return MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): MockUser | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}

export function createUser(input: { name: string; email: string; password: string }): MockUser {
  const user: MockUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name,
    email: input.email,
    passwordHash: bcrypt.hashSync(input.password, 10),
    role: "STUDENT",
    // El pago se coordina fuera de la plataforma: todo alumno nuevo arranca
    // pendiente y un admin lo activa a mano desde /admin/alumnos.
    enrollmentStatus: "PENDING_PAYMENT",
    createdAt: new Date().toISOString(),
  };
  MOCK_USERS.push(user);
  return user;
}

export function verifyPassword(user: MockUser, password: string) {
  return bcrypt.compareSync(password, user.passwordHash);
}

/** Alumnos registrados (rol STUDENT), para /admin/alumnos. */
export function listStudents(): MockUser[] {
  return MOCK_USERS.filter((u) => u.role === "STUDENT").sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
}

/** Lo llama el admin al confirmar (o revertir) un pago recibido fuera de la plataforma. */
export function setEnrollmentStatus(
  userId: string,
  status: EnrollmentStatus
): MockUser | null {
  const user = MOCK_USERS.find((u) => u.id === userId);
  if (!user) return null;
  user.enrollmentStatus = status;
  return user;
}
