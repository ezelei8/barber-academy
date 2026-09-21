import type { StudentProfile } from "@/lib/types";

/**
 * ============================================================================
 * DEMO DATA — REPLACE WITH REAL DATA ONCE THE DATABASE IS CONNECTED
 * ============================================================================
 * This is the single demo student used across the dashboard so every screen
 * (progreso, tareas, logros, Barber AI) tells a consistent story: "Lucas",
 * Nivel 3, 2.450 XP, en el módulo de Degradados.
 *
 * PROD: this becomes `prisma.profile.findUnique({ where: { userId } })`
 * joined with Progress / XPTransaction / UserAchievement as needed. See
 * lib/gamification.ts for the derived calculations (level, next mission,
 * achievement unlocks) that should run server-side against real rows.
 * ============================================================================
 */
export const DEMO_STUDENT: StudentProfile = {
  id: "demo-user-lucas",
  name: "Lucas",
  email: "lucas@example.com",
  role: "STUDENT",
  enrollmentStatus: "ACTIVE",
  avatarInitials: "LC",
  currentXP: 2450,
  streakDays: 6,
  completedLessonIds: [
    "l1-1", "l1-2", "l1-3", "l1-4", "l1-5", "l1-6",
    "l2-1", "l2-2", "l2-3", "l2-4", "l2-5",
    "l3-1", "l3-2", "l3-3",
  ],
  completedTaskIds: ["t1-1", "t1-2", "t2-1", "t2-2"],
  unlockedAchievementCodes: ["first-module", "first-practice"],
  lastActiveModuleId: "m3",
};

export const DEMO_ADMIN: StudentProfile = {
  id: "demo-user-admin",
  name: "Instructor Demo",
  email: "admin@example.com",
  role: "ADMIN",
  enrollmentStatus: "ACTIVE",
  avatarInitials: "IN",
  currentXP: 0,
  streakDays: 0,
  completedLessonIds: [],
  completedTaskIds: [],
  unlockedAchievementCodes: [],
  lastActiveModuleId: "m1",
};

/** Aggregate stats shown on the admin dashboard — demo numbers. */
export const DEMO_ADMIN_STATS = {
  totalStudents: 128,
  activeStudents: 74,
  avgProgress: 46,
  modulesCompletedTotal: 213,
  pendingReviews: 9,
  recentActivity: [
    { id: "act1", studentName: "Lucas", action: "Completó la lección \"Mid fade\"", time: "hace 12 min" },
    { id: "act2", studentName: "Martina", action: "Subió una entrega para \"Diseño de barba completo\"", time: "hace 40 min" },
    { id: "act3", studentName: "Bruno", action: "Desbloqueó el logro \"5 tareas completadas\"", time: "hace 1 h" },
    { id: "act4", studentName: "Ana", action: "Completó el Módulo 2 — Fundamentos del corte", time: "hace 3 h" },
    { id: "act5", studentName: "Diego", action: "Se inscribió en la academia", time: "hace 5 h" },
  ],
};

export const DEMO_STUDENTS_LIST = [
  { id: "s1", name: "Lucas", email: "lucas@example.com", level: 3, xp: 2450, progress: 68, lastActive: "hace 12 min" },
  { id: "s2", name: "Martina Gómez", email: "martina@example.com", level: 4, xp: 3820, progress: 81, lastActive: "hace 40 min" },
  { id: "s3", name: "Bruno Silva", email: "bruno@example.com", level: 2, xp: 1180, progress: 34, lastActive: "hace 1 h" },
  { id: "s4", name: "Ana Ferreira", email: "ana@example.com", level: 3, xp: 2100, progress: 55, lastActive: "hace 3 h" },
  { id: "s5", name: "Diego Ramos", email: "diego@example.com", level: 1, xp: 240, progress: 6, lastActive: "hace 5 h" },
];
