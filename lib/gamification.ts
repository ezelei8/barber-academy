import { MODULES, TASKS } from "@/lib/data/course-content";
import { ACHIEVEMENTS } from "@/lib/data/gamification-config";
import type { StudentProfile } from "@/lib/types";

/**
 * Pure, server-safe gamification calculations derived from a student's
 * recorded progress. In production these run against real Progress /
 * Submission / XPTransaction rows (see prisma/schema.prisma) instead of the
 * in-memory `StudentProfile` demo object — the math itself doesn't change.
 */

export function getModuleProgress(student: StudentProfile, moduleId: string) {
  const courseModule = MODULES.find((m) => m.id === moduleId);
  if (!courseModule) return { completed: 0, total: 0, percent: 0, isComplete: false };
  const total = courseModule.lessons.length;
  const completed = courseModule.lessons.filter((l) => student.completedLessonIds.includes(l.id)).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent, isComplete: completed === total && total > 0 };
}

export function getCourseProgress(student: StudentProfile) {
  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = student.completedLessonIds.length;
  const percent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
  const modulesComplete = MODULES.filter((m) => getModuleProgress(student, m.id).isComplete).length;
  return {
    completedLessons,
    totalLessons,
    percent,
    modulesComplete,
    totalModules: MODULES.length,
    remainingLessons: totalLessons - completedLessons,
  };
}

export function getNextLesson(student: StudentProfile) {
  for (const courseModule of MODULES) {
    const next = courseModule.lessons.find((l) => !student.completedLessonIds.includes(l.id));
    if (next) return { lesson: next, module: courseModule };
  }
  return null;
}

export function getTaskCounts(student: StudentProfile) {
  const total = TASKS.length;
  const completed = student.completedTaskIds.length;
  const pending = TASKS.filter(
    (t) => !student.completedTaskIds.includes(t.id) && t.status === "PENDING"
  ).length;
  const inProgress = TASKS.filter(
    (t) => !student.completedTaskIds.includes(t.id) && t.status === "IN_PROGRESS"
  ).length;
  return { total, completed, pending, inProgress };
}

/**
 * Achievement unlock evaluation. Runs whenever XP-granting events happen
 * (lesson viewed, task completed, module finished...).
 * PROD: call this inside the same transaction that writes the triggering
 * event, then insert any newly-unlocked rows into UserAchievement and emit
 * a Notification (type: ACHIEVEMENT_UNLOCKED).
 */
export function evaluateAchievements(student: StudentProfile) {
  const unlocked = new Set(student.unlockedAchievementCodes);
  const courseProgress = getCourseProgress(student);
  const taskCounts = getTaskCounts(student);

  const newlyUnlocked: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (unlocked.has(achievement.code)) continue;
    let earned = false;
    switch (achievement.condition) {
      case "MODULE_COMPLETE":
        earned = courseProgress.modulesComplete >= achievement.threshold;
        break;
      case "TASK_COUNT":
        earned = taskCounts.completed >= achievement.threshold;
        break;
      case "STREAK_DAYS":
        earned = student.streakDays >= achievement.threshold;
        break;
      case "COURSE_COMPLETE":
        earned = courseProgress.percent >= 100;
        break;
      case "FIRST_SUBMISSION":
        earned = taskCounts.completed >= 1;
        break;
      case "CUSTOM":
        if (achievement.code === "first-fade") {
          // Completed the Módulo 3 fade task specifically.
          earned = student.completedTaskIds.includes("t3-1");
        } else if (achievement.code === "first-submission-work") {
          // At least one photo/video evidence task submitted.
          const evidenceTaskIds = ["t3-1", "t4-1", "t5-1", "t7-2"];
          earned = evidenceTaskIds.some((id) => student.completedTaskIds.includes(id));
        }
        break;
    }
    if (earned) newlyUnlocked.push(achievement.code);
  }

  return newlyUnlocked;
}

export function getUnlockedAchievements(student: StudentProfile) {
  return ACHIEVEMENTS.filter((a) => student.unlockedAchievementCodes.includes(a.code));
}

export function getLockedAchievements(student: StudentProfile) {
  return ACHIEVEMENTS.filter((a) => !student.unlockedAchievementCodes.includes(a.code));
}
