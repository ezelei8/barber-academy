import { MODULES } from "@/lib/data/course-content";
import { getCourseProgress, getModuleProgress, getNextLesson } from "@/lib/gamification";
import { getLevelProgress } from "@/lib/data/gamification-config";
import type { StudentProfile } from "@/lib/types";

/**
 * Builds the "authorized knowledge" block Barber AI must ground its answers
 * in before falling back to general knowledge, plus the student's live
 * progress so the tutor can personalize recommendations and point back to
 * specific lessons ("Módulo 3 — Lección 2").
 *
 * PROD: once ai_knowledge rows exist (see prisma/schema.prisma
 * `AIKnowledge`, managed from /admin/barber-ai), merge them in here instead
 * of / in addition to the course outline below — e.g. real lesson
 * transcripts, technique notes, FAQs written by the instructor.
 */
export function buildCourseKnowledgeBlock() {
  return MODULES.map((m) => {
    const lessons = m.lessons.map((l, i) => `   ${i + 1}. ${l.title} — ${l.summary}`).join("\n");
    return `Módulo ${m.order} — ${m.title}\n${m.description}\nLecciones:\n${lessons}`;
  }).join("\n\n");
}

export function buildStudentContextBlock(student: StudentProfile) {
  const courseProgress = getCourseProgress(student);
  const levelProgress = getLevelProgress(student.currentXP);
  const next = getNextLesson(student);
  const currentModule = MODULES.find((m) => m.id === student.lastActiveModuleId);
  const currentModuleProgress = currentModule ? getModuleProgress(student, currentModule.id) : null;

  return [
    `Nombre del alumno: ${student.name}`,
    `Nivel: ${levelProgress.current.order} — ${levelProgress.current.name} (${student.currentXP} XP)`,
    `Progreso general del curso: ${courseProgress.percent}% (${courseProgress.completedLessons}/${courseProgress.totalLessons} lecciones)`,
    `Módulos completados: ${courseProgress.modulesComplete}/${courseProgress.totalModules}`,
    currentModule
      ? `Módulo actual: Módulo ${currentModule.order} — ${currentModule.title} (${currentModuleProgress?.completed}/${currentModuleProgress?.total} lecciones vistas)`
      : "Módulo actual: no iniciado.",
    next
      ? `Próxima lección sugerida: Módulo ${next.module.order} — ${next.module.title}, Lección "${next.lesson.title}".`
      : "El alumno completó todas las lecciones disponibles.",
    `Racha actual: ${student.streakDays} días.`,
  ].join("\n");
}

export const BARBER_AI_SYSTEM_PROMPT_INTRO = `Sos "Barber AI", el tutor de inteligencia artificial de Barber Academy, una academia online de barbería.

Tu rol es doble:
1. Responder preguntas técnicas de barbería (fades, tijera, máquina, navaja, barba, etc.) usando PRIMERO el contenido autorizado del curso que se te da a continuación. Si la pregunta no está cubierta por el curso, podés usar tu conocimiento general de barbería, pero aclarando que es información complementaria, no parte oficial del programa.
2. Funcionar como tutor: cuando sea relevante, usá el progreso real del alumno para orientarlo — qué módulo/lección le conviene repasar, qué le falta, y adaptá tu nivel de explicación a su nivel actual. Cuando recomiendes contenido del curso, indicalo con el formato exacto "Módulo X — Nombre del módulo" y, si aplica, "Lección Y — Nombre de la lección", para que el alumno pueda ubicarlo fácilmente.

También podés, cuando el alumno lo pida o tenga sentido: generar preguntas de práctica, mini quizzes, resúmenes de una lección, explicaciones alternativas de una técnica, y recomendaciones de qué estudiar a continuación.

Nunca prometas resultados económicos ni garantices que el alumno está listo para ejercer profesionalmente solo por su nivel o XP — esos son indicadores de progreso educativo, no certificaciones.

Sé claro, directo y profesional. Español rioplatense (voseo), tono cercano pero técnico. Respuestas concisas — este es un chat, no un ensayo.`;
