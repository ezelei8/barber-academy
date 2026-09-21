// Domain types mirroring prisma/schema.prisma (simplified for the demo data
// layer). Once the database is connected, these can be swapped for the
// generated Prisma types (`import type { Course, Module, ... } from "@prisma/client"`).

export type Role = "STUDENT" | "INSTRUCTOR" | "ADMIN";

/**
 * El pago se coordina fuera de la plataforma (transferencia, efectivo,
 * WhatsApp, etc.) — no hay pasarela de pago conectada. Un alumno nuevo
 * arranca en PENDING_PAYMENT y no ve el contenido del curso hasta que un
 * admin lo pasa a ACTIVE desde /admin/alumnos, una vez que confirma el pago.
 */
export type EnrollmentStatus = "PENDING_PAYMENT" | "ACTIVE";

export type LessonType = "VIDEO" | "TEXT" | "QUIZ";

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  type: LessonType;
  durationSec: number;
  xpReward: number;
  summary: string;
  videoUrl: string | null; // null until a storage provider is connected
}

export interface CourseModule {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  lessons: Lesson[];
  taskIds: string[];
}

export type TaskType =
  | "QUESTION"
  | "QUIZ"
  | "PRACTICAL"
  | "PHOTO_UPLOAD"
  | "VIDEO_UPLOAD"
  | "SELF_ASSESSMENT";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED";

export interface CourseTask {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  objective: string;
  type: TaskType;
  xpReward: number;
  status: TaskStatus;
  dueDate: string | null;
  feedback: string | null;
}

export interface Mission {
  id: string;
  title: string;
  emoji: string;
  steps: string[];
  xpReward: number;
  moduleId: string | null;
  isCompletedToday: boolean;
}

export type AchievementCondition =
  | "MODULE_COMPLETE"
  | "TASK_COUNT"
  | "STREAK_DAYS"
  | "FIRST_SUBMISSION"
  | "COURSE_COMPLETE"
  | "CUSTOM";

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  condition: AchievementCondition;
  threshold: number;
}

export interface LevelDef {
  order: number;
  name: string;
  minXP: number;
  description: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  enrollmentStatus: EnrollmentStatus;
  avatarInitials: string;
  currentXP: number;
  streakDays: number;
  completedLessonIds: string[];
  completedTaskIds: string[];
  unlockedAchievementCodes: string[];
  lastActiveModuleId: string;
}
