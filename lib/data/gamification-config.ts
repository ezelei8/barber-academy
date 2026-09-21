import type { Achievement, LevelDef, Mission } from "@/lib/types";

/**
 * Configurable XP values. In production these live in a settings table (or
 * the `Level`/admin-config models) and are edited from /admin — never
 * hardcoded in the frontend. Kept centralized here so the whole app reads
 * from one place.
 *
 * PROD: prisma has no single "XPConfig" table by default — store this as
 * rows keyed by action in a small `settings` table, or extend `Level`'s
 * sibling config. `XPTransaction.source` in the schema already enumerates
 * these sources for the transaction log.
 */
export const XP_VALUES = {
  LESSON_VIEW: 10,
  TASK_COMPLETE: 50,
  QUIZ_PASS: 100,
  MODULE_COMPLETE: 500,
  MISSION_COMPLETE: 250,
} as const;

/**
 * Levels are purely an in-platform progress indicator. They must NEVER be
 * presented as a professional certification — see README "Certificado" and
 * the disclaimer rendered next to the level badge in the UI.
 */
export const LEVELS: LevelDef[] = [
  { order: 1, name: "Principiante", minXP: 0, description: "Estás dando tus primeros pasos en la formación." },
  { order: 2, name: "Aprendiz", minXP: 1000, description: "Ya manejás los fundamentos del corte." },
  { order: 3, name: "Barbero en formación", minXP: 2000, description: "Estás avanzando en técnicas de degradado y cortes." },
  { order: 4, name: "Barbero avanzado", minXP: 3500, description: "Dominás la mayoría de las técnicas del programa." },
  { order: 5, name: "Formación completada", minXP: 5000, description: "Completaste el recorrido educativo de la academia." },
];

export function getLevelForXP(xp: number): LevelDef {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.minXP) current = level;
  }
  return current;
}

export function getNextLevel(xp: number): LevelDef | null {
  const current = getLevelForXP(xp);
  return LEVELS.find((l) => l.order === current.order + 1) ?? null;
}

export function getLevelProgress(xp: number) {
  const current = getLevelForXP(xp);
  const next = getNextLevel(xp);
  if (!next) return { current, next: null, percent: 100, xpIntoLevel: xp - current.minXP, xpForLevel: 0 };
  const xpIntoLevel = xp - current.minXP;
  const xpForLevel = next.minXP - current.minXP;
  return { current, next, percent: Math.min(100, (xpIntoLevel / xpForLevel) * 100), xpIntoLevel, xpForLevel };
}

export const MISSIONS: Mission[] = [
  {
    id: "mission-1",
    title: "Realizá tu primer Mid Fade",
    emoji: "🎯",
    steps: [
      "Mirá la clase de Mid Fade en el Módulo 3.",
      "Practicá la técnica de transición.",
      "Realizá el corte en un modelo o cabeza de práctica.",
      "Subí una foto o video del resultado.",
      "Completá la autoevaluación.",
    ],
    xpReward: 250,
    moduleId: "m3",
    isCompletedToday: false,
  },
  {
    id: "mission-2",
    title: "Repasá higiene de estación",
    emoji: "🧼",
    steps: [
      "Mirá de nuevo la lección de bioseguridad.",
      "Revisá tu checklist de estación.",
      "Marcá qué te falta implementar.",
    ],
    xpReward: 100,
    moduleId: "m1",
    isCompletedToday: false,
  },
];

/**
 * Achievements unlock automatically based on `condition` + `threshold`,
 * evaluated by lib/gamification.ts. Fully configurable from /admin/logros.
 */
export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", code: "first-module", title: "Primer módulo completado", description: "Completaste tu primer módulo del curso.", icon: "🏆", condition: "MODULE_COMPLETE", threshold: 1 },
  { id: "a2", code: "first-practice", title: "Primera práctica", description: "Enviaste tu primera tarea práctica.", icon: "🥇", condition: "FIRST_SUBMISSION", threshold: 1 },
  { id: "a3", code: "first-fade", title: "Primer fade", description: "Completaste tu primer degradado evaluado.", icon: "✂️", condition: "CUSTOM", threshold: 1 },
  { id: "a4", code: "five-tasks", title: "5 tareas completadas", description: "Completaste 5 tareas del curso.", icon: "📋", condition: "TASK_COUNT", threshold: 5 },
  { id: "a5", code: "ten-day-streak", title: "10 días aprendiendo", description: "Mantuviste una racha de 10 días activos.", icon: "🔥", condition: "STREAK_DAYS", threshold: 10 },
  { id: "a6", code: "first-submission-work", title: "Primer trabajo enviado", description: "Subiste tu primera evidencia de trabajo (foto o video).", icon: "📸", condition: "CUSTOM", threshold: 1 },
  { id: "a7", code: "course-complete", title: "Curso completado", description: "Completaste todos los módulos de la formación.", icon: "🎓", condition: "COURSE_COMPLETE", threshold: 1 },
];
