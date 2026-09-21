import { DEMO_STUDENT } from "@/lib/data/demo-student";
import { MODULES, TASKS, getModuleById } from "@/lib/data/course-content";
import { XP_VALUES } from "@/lib/data/gamification-config";
import { evaluateAchievements, getModuleProgress } from "@/lib/gamification";
import type { StudentProfile } from "@/lib/types";

/**
 * ============================================================================
 * IN-MEMORY PROGRESS STORE — process memory, not a database
 * ============================================================================
 * This mutates a single shared object per server process so the demo is
 * genuinely interactive (mark a lesson watched, submit a task, complete a
 * mission and see XP/level/achievements update immediately) without
 * pretending a database is connected. It resets on every server restart and
 * is NOT safe for concurrent users in production — it exists purely to make
 * this review buildable and clickable end to end.
 *
 * PROD: every function below becomes a Prisma write, e.g.
 *   completeLesson -> prisma.$transaction([
 *     prisma.progress.upsert({ where: { userId_lessonId: {...} }, ... }),
 *     prisma.xPTransaction.create({ data: { userId, amount, source: "LESSON_VIEW", refId: lessonId } }),
 *   ])
 * Achievement/level evaluation (lib/gamification.ts) stays the same — it's
 * already written as pure functions over a StudentProfile shape so it works
 * unchanged against real data.
 * ============================================================================
 */

// Next.js compiles each route/page into its own bundle; a plain module-scope
// `const` would get re-initialized per bundle and silently stop sharing
// state across routes. Attaching to `globalThis` (the same trick used for
// the Prisma client singleton) keeps a single instance for the whole
// process, the same way it would with a real database connection pool.
const globalForStore = globalThis as unknown as {
  __barberAcademyState?: StudentProfile;
  __barberAcademyMissionCompletions?: Set<string>;
};

const state: StudentProfile =
  globalForStore.__barberAcademyState ??
  (globalForStore.__barberAcademyState = {
    ...DEMO_STUDENT,
    completedLessonIds: [...DEMO_STUDENT.completedLessonIds],
    completedTaskIds: [...DEMO_STUDENT.completedTaskIds],
    unlockedAchievementCodes: [...DEMO_STUDENT.unlockedAchievementCodes],
  });

const missionCompletions =
  globalForStore.__barberAcademyMissionCompletions ??
  (globalForStore.__barberAcademyMissionCompletions = new Set<string>());

export function getStudentState(): StudentProfile {
  return state;
}

function grantXP(amount: number) {
  state.currentXP += amount;
}

function unlockNewAchievements() {
  const newlyUnlocked = evaluateAchievements(state);
  for (const code of newlyUnlocked) {
    if (!state.unlockedAchievementCodes.includes(code)) {
      state.unlockedAchievementCodes.push(code);
    }
  }
  return newlyUnlocked;
}

export function completeLesson(lessonId: string) {
  if (state.completedLessonIds.includes(lessonId)) {
    return { alreadyCompleted: true, xpAwarded: 0, newAchievements: [] as string[] };
  }
  state.completedLessonIds.push(lessonId);
  grantXP(XP_VALUES.LESSON_VIEW);

  // Module-complete bonus
  let moduleBonus = 0;
  for (const courseModule of MODULES) {
    if (courseModule.lessons.some((l) => l.id === lessonId)) {
      const progress = getModuleProgress(state, courseModule.id);
      if (progress.isComplete) moduleBonus = XP_VALUES.MODULE_COMPLETE;
    }
  }
  if (moduleBonus) grantXP(moduleBonus);

  const newAchievements = unlockNewAchievements();
  return { alreadyCompleted: false, xpAwarded: XP_VALUES.LESSON_VIEW + moduleBonus, newAchievements };
}

export function completeTask(taskId: string) {
  const task = TASKS.find((t) => t.id === taskId);
  if (!task) return { ok: false as const, error: "Tarea no encontrada." };
  if (state.completedTaskIds.includes(taskId)) {
    return { ok: true as const, alreadyCompleted: true, xpAwarded: 0, newAchievements: [] as string[] };
  }
  state.completedTaskIds.push(taskId);
  const xp = task.type === "QUIZ" ? XP_VALUES.QUIZ_PASS : XP_VALUES.TASK_COMPLETE;
  grantXP(xp);
  const newAchievements = unlockNewAchievements();
  return { ok: true as const, alreadyCompleted: false, xpAwarded: xp, newAchievements };
}

export function completeMission(missionId: string) {
  if (missionCompletions.has(missionId)) {
    return { alreadyCompleted: true, xpAwarded: 0, newAchievements: [] as string[] };
  }
  missionCompletions.add(missionId);
  grantXP(XP_VALUES.MISSION_COMPLETE);
  const newAchievements = unlockNewAchievements();
  return { alreadyCompleted: false, xpAwarded: XP_VALUES.MISSION_COMPLETE, newAchievements };
}

export function isMissionCompleted(missionId: string) {
  return missionCompletions.has(missionId);
}

export function getModuleForTask(taskId: string) {
  const task = TASKS.find((t) => t.id === taskId);
  return task ? getModuleById(task.moduleId) : null;
}

/**
 * Instructor feedback on a task, from /admin/tareas. Mutates the shared
 * in-memory TASKS array (same caveats as above — process memory only).
 * PROD: prisma.submission.update({ where: { taskId_userId: {...} },
 *   data: { feedback, grade, reviewedById, reviewedAt: new Date() } })
 */
export function setTaskFeedback(taskId: string, feedback: string) {
  const task = TASKS.find((t) => t.id === taskId);
  if (!task) return { ok: false as const, error: "Tarea no encontrada." };
  task.feedback = feedback;
  return { ok: true as const, task };
}
