import type { CourseModule, CourseTask } from "@/lib/types";

/**
 * ============================================================================
 * DEMO COURSE CONTENT — "Barbería Profesional: Formación Integral"
 * ============================================================================
 * This is demo/editable content, not a hardcoded product. In production this
 * structure is fully editable from /admin/cursos, /admin/modulos and
 * /admin/lecciones, and persisted through Course / Module / Lesson / Task in
 * prisma/schema.prisma.
 *
 * PROD: replace this file's exports with:
 *   prisma.module.findMany({ where: { courseId }, orderBy: { order: "asc" },
 *     include: { lessons: { orderBy: { order: "asc" } }, tasks: true } })
 *
 * `videoUrl: null` everywhere — video hosting is not connected yet. See the
 * README section "Almacenamiento" for what's needed (S3 / Mux / Cloudinary).
 * ============================================================================
 */

export const COURSE_META = {
  id: "course-barberia-pro",
  slug: "barberia-profesional",
  title: "Barbería Profesional: Formación Integral",
  shortTitle: "Formación en Barbería",
  description:
    "Un camino estructurado desde los fundamentos hasta los degradados y cortes avanzados, con práctica evaluada, tutor de IA y proyecto final de barbería.",
  totalModules: 8,
};

export const MODULES: CourseModule[] = [
  {
    id: "m1",
    order: 1,
    title: "Introducción a la Barbería",
    subtitle: "Fundamentos, herramientas e higiene",
    description:
      "El punto de partida: historia del oficio, el kit completo del barbero y los protocolos de higiene que vas a usar en cada servicio.",
    taskIds: ["t1-1", "t1-2"],
    lessons: [
      { id: "l1-1", moduleId: "m1", order: 1, title: "Historia y fundamentos de la barbería", type: "VIDEO", durationSec: 520, xpReward: 10, summary: "De dónde viene el oficio y por qué la técnica clásica sigue vigente.", videoUrl: null },
      { id: "l1-2", moduleId: "m1", order: 2, title: "El kit del barbero: herramientas esenciales", type: "VIDEO", durationSec: 610, xpReward: 10, summary: "Qué necesitás para arrancar y qué es opcional al principio.", videoUrl: null },
      { id: "l1-3", moduleId: "m1", order: 3, title: "Máquinas de corte: tipos y mantenimiento", type: "VIDEO", durationSec: 700, xpReward: 10, summary: "Cortadoras, trimmers, cuchillas y cómo cuidarlas para que duren.", videoUrl: null },
      { id: "l1-4", moduleId: "m1", order: 4, title: "Peines, tijeras y navaja: uso correcto", type: "VIDEO", durationSec: 580, xpReward: 10, summary: "El agarre y la postura correcta de cada herramienta manual.", videoUrl: null },
      { id: "l1-5", moduleId: "m1", order: 5, title: "Higiene y bioseguridad en el sillón", type: "VIDEO", durationSec: 460, xpReward: 10, summary: "Desinfección, descarte de filo y protocolos entre clientes.", videoUrl: null },
      { id: "l1-6", moduleId: "m1", order: 6, title: "Preparación del puesto de trabajo", type: "TEXT", durationSec: 300, xpReward: 10, summary: "Checklist de estación lista para trabajar.", videoUrl: null },
    ],
  },
  {
    id: "m2",
    order: 2,
    title: "Fundamentos del Corte",
    subtitle: "Secciones, guías y técnica base",
    description:
      "La base técnica que sostiene todo lo demás: cómo seccionar, medir longitudes y manejar máquina y tijera con precisión.",
    taskIds: ["t2-1", "t2-2"],
    lessons: [
      { id: "l2-1", moduleId: "m2", order: 1, title: "Secciones y particiones del cabello", type: "VIDEO", durationSec: 540, xpReward: 10, summary: "Cómo dividir la cabeza en zonas de trabajo.", videoUrl: null },
      { id: "l2-2", moduleId: "m2", order: 2, title: "Guías y longitudes: el mapa del corte", type: "VIDEO", durationSec: 600, xpReward: 10, summary: "Guías fijas, móviles y cómo se conectan entre sí.", videoUrl: null },
      { id: "l2-3", moduleId: "m2", order: 3, title: "Uso correcto de la máquina", type: "VIDEO", durationSec: 650, xpReward: 10, summary: "Ángulo, tensión y recorrido de pasada.", videoUrl: null },
      { id: "l2-4", moduleId: "m2", order: 4, title: "Uso correcto de la tijera", type: "VIDEO", durationSec: 640, xpReward: 10, summary: "Tijera sobre peine y técnica de deslizado.", videoUrl: null },
      { id: "l2-5", moduleId: "m2", order: 5, title: "Técnicas básicas de corte", type: "VIDEO", durationSec: 590, xpReward: 10, summary: "Uniendo secciones, guías y herramientas en un corte simple.", videoUrl: null },
    ],
  },
  {
    id: "m3",
    order: 3,
    title: "Degradados",
    subtitle: "Fade, transiciones y terminaciones",
    description:
      "El módulo más técnico: todos los tipos de fade, cómo lograr transiciones limpias y cómo corregir errores comunes.",
    taskIds: ["t3-1", "t3-2"],
    lessons: [
      { id: "l3-1", moduleId: "m3", order: 1, title: "Introducción al degradado (fade)", type: "VIDEO", durationSec: 520, xpReward: 10, summary: "Qué es un fade y los principios que comparten todas sus variantes.", videoUrl: null },
      { id: "l3-2", moduleId: "m3", order: 2, title: "Low fade", type: "VIDEO", durationSec: 610, xpReward: 10, summary: "Degradado bajo: dónde empieza y cómo se difumina.", videoUrl: null },
      { id: "l3-3", moduleId: "m3", order: 3, title: "Mid fade", type: "VIDEO", durationSec: 610, xpReward: 10, summary: "El fade intermedio, el más versátil para empezar.", videoUrl: null },
      { id: "l3-4", moduleId: "m3", order: 4, title: "High fade", type: "VIDEO", durationSec: 610, xpReward: 10, summary: "Degradado alto y su mayor exigencia de transición.", videoUrl: null },
      { id: "l3-5", moduleId: "m3", order: 5, title: "Skin fade", type: "VIDEO", durationSec: 660, xpReward: 10, summary: "Llevar el degradado hasta piel sin marcar líneas.", videoUrl: null },
      { id: "l3-6", moduleId: "m3", order: 6, title: "Taper", type: "VIDEO", durationSec: 500, xpReward: 10, summary: "El afinado clásico de contorno y nuca.", videoUrl: null },
      { id: "l3-7", moduleId: "m3", order: 7, title: "Líneas y transiciones perfectas", type: "VIDEO", durationSec: 580, xpReward: 10, summary: "El detalle que separa un corte prolijo de uno amateur.", videoUrl: null },
      { id: "l3-8", moduleId: "m3", order: 8, title: "Corrección de errores comunes", type: "VIDEO", durationSec: 540, xpReward: 10, summary: "Marcas, escalones y cómo disimularlos mientras seguís practicando.", videoUrl: null },
      { id: "l3-9", moduleId: "m3", order: 9, title: "Terminaciones", type: "VIDEO", durationSec: 470, xpReward: 10, summary: "El acabado final que da la sensación de trabajo terminado.", videoUrl: null },
    ],
  },
  {
    id: "m4",
    order: 4,
    title: "Cortes",
    subtitle: "Clásicos, modernos y texturizado",
    description:
      "Aplicá la técnica de degradado a cortes reales: clásicos, modernos, con textura y adaptados a cada tipo de cabello.",
    taskIds: ["t4-1", "t4-2"],
    lessons: [
      { id: "l4-1", moduleId: "m4", order: 1, title: "Cortes clásicos", type: "VIDEO", durationSec: 560, xpReward: 10, summary: "Los cortes atemporales que todo barbero debe dominar.", videoUrl: null },
      { id: "l4-2", moduleId: "m4", order: 2, title: "Cortes modernos", type: "VIDEO", durationSec: 560, xpReward: 10, summary: "Tendencias actuales y cómo adaptarlas a cada cliente.", videoUrl: null },
      { id: "l4-3", moduleId: "m4", order: 3, title: "Texturizado", type: "VIDEO", durationSec: 500, xpReward: 10, summary: "Entresacado y técnicas para quitar peso sin perder forma.", videoUrl: null },
      { id: "l4-4", moduleId: "m4", order: 4, title: "Manejo de volumen", type: "VIDEO", durationSec: 490, xpReward: 10, summary: "Cómo compensar cabello fino, grueso, lacio u ondulado.", videoUrl: null },
      { id: "l4-5", moduleId: "m4", order: 5, title: "Adaptación al tipo de cabello", type: "VIDEO", durationSec: 520, xpReward: 10, summary: "Ajustes de técnica según textura y densidad capilar.", videoUrl: null },
    ],
  },
  {
    id: "m5",
    order: 5,
    title: "Barba",
    subtitle: "Perfilado, diseño y navaja",
    description:
      "Del recorte de mantenimiento al diseño de barba completo, incluyendo trabajo con navaja y terminaciones profesionales.",
    taskIds: ["t5-1", "t5-2"],
    lessons: [
      { id: "l5-1", moduleId: "m5", order: 1, title: "Preparación de la barba", type: "VIDEO", durationSec: 430, xpReward: 10, summary: "Vapor, productos previos y por qué importan.", videoUrl: null },
      { id: "l5-2", moduleId: "m5", order: 2, title: "Perfilado", type: "VIDEO", durationSec: 520, xpReward: 10, summary: "Líneas de contorno según la forma del rostro.", videoUrl: null },
      { id: "l5-3", moduleId: "m5", order: 3, title: "Diseño de barba", type: "VIDEO", durationSec: 600, xpReward: 10, summary: "Estilos completos, de candado a barba cerrada.", videoUrl: null },
      { id: "l5-4", moduleId: "m5", order: 4, title: "Máquina para barba", type: "VIDEO", durationSec: 460, xpReward: 10, summary: "Largos, cuchillas y técnica de recorrido.", videoUrl: null },
      { id: "l5-5", moduleId: "m5", order: 5, title: "Navaja: afeitado y contornos", type: "VIDEO", durationSec: 640, xpReward: 10, summary: "Ángulo de navaja, tensión de piel y seguridad.", videoUrl: null },
      { id: "l5-6", moduleId: "m5", order: 6, title: "Terminaciones", type: "VIDEO", durationSec: 400, xpReward: 10, summary: "El detalle final que hace ver la barba recién diseñada.", videoUrl: null },
    ],
  },
  {
    id: "m6",
    order: 6,
    title: "Práctica",
    subtitle: "Ejercicios guiados y evaluación",
    description:
      "Un módulo íntegramente práctico: ejercicios de repetición, prácticas guiadas y autoevaluación con corrección de errores.",
    taskIds: ["t6-1", "t6-2", "t6-3"],
    lessons: [
      { id: "l6-1", moduleId: "m6", order: 1, title: "Ejercicios de calentamiento y pulso", type: "VIDEO", durationSec: 380, xpReward: 10, summary: "Rutinas cortas para ganar firmeza y precisión.", videoUrl: null },
      { id: "l6-2", moduleId: "m6", order: 2, title: "Práctica guiada: modelo completo", type: "VIDEO", durationSec: 720, xpReward: 10, summary: "Un servicio completo de principio a fin, paso a paso.", videoUrl: null },
      { id: "l6-3", moduleId: "m6", order: 3, title: "Autoevaluación de técnica", type: "TEXT", durationSec: 300, xpReward: 10, summary: "Checklist para revisar tu propio trabajo con criterio profesional.", videoUrl: null },
      { id: "l6-4", moduleId: "m6", order: 4, title: "Corrección de errores frecuentes", type: "VIDEO", durationSec: 500, xpReward: 10, summary: "Los errores más comunes de un alumno y cómo evitarlos.", videoUrl: null },
    ],
  },
  {
    id: "m7",
    order: 7,
    title: "Trabajo Profesional",
    subtitle: "Cliente, higiene y marca personal",
    description:
      "Lo que rodea a la técnica: consulta previa, atención al cliente, higiene de estación, fotografía de trabajos y marca personal.",
    taskIds: ["t7-1", "t7-2"],
    lessons: [
      { id: "l7-1", moduleId: "m7", order: 1, title: "Atención al cliente y consulta previa", type: "VIDEO", durationSec: 480, xpReward: 10, summary: "Las preguntas correctas antes de tomar la máquina.", videoUrl: null },
      { id: "l7-2", moduleId: "m7", order: 2, title: "Higiene y organización del espacio", type: "VIDEO", durationSec: 400, xpReward: 10, summary: "Estándares profesionales entre un cliente y el siguiente.", videoUrl: null },
      { id: "l7-3", moduleId: "m7", order: 3, title: "Fotografía de tus trabajos", type: "VIDEO", durationSec: 420, xpReward: 10, summary: "Luz, ángulo y encuadre para mostrar bien un corte.", videoUrl: null },
      { id: "l7-4", moduleId: "m7", order: 4, title: "Redes sociales para barberos", type: "VIDEO", durationSec: 460, xpReward: 10, summary: "Cómo usar tus trabajos para construir presencia.", videoUrl: null },
      { id: "l7-5", moduleId: "m7", order: 5, title: "Construí tu marca personal", type: "TEXT", durationSec: 340, xpReward: 10, summary: "Qué te va a diferenciar como barbero.", videoUrl: null },
    ],
  },
  {
    id: "m8",
    order: 8,
    title: "Tu Proyecto de Barbería",
    subtitle: "De la técnica al negocio",
    description:
      "Cerrás la formación armando la base de tu proyecto: equipamiento, espacio, precios, agenda y captación de clientes.",
    taskIds: ["t8-1", "t8-2"],
    lessons: [
      { id: "l8-1", moduleId: "m8", order: 1, title: "Herramientas y equipamiento necesario", type: "TEXT", durationSec: 360, xpReward: 10, summary: "Lo mínimo indispensable para empezar a trabajar.", videoUrl: null },
      { id: "l8-2", moduleId: "m8", order: 2, title: "Organización del espacio de trabajo", type: "VIDEO", durationSec: 400, xpReward: 10, summary: "Cómo armar una estación funcional, tengas o no local propio.", videoUrl: null },
      { id: "l8-3", moduleId: "m8", order: 3, title: "Cómo definir tus precios", type: "TEXT", durationSec: 380, xpReward: 10, summary: "Criterios básicos para no regalar tu trabajo ni sobreestimarlo.", videoUrl: null },
      { id: "l8-4", moduleId: "m8", order: 4, title: "Agenda y gestión de turnos", type: "TEXT", durationSec: 320, xpReward: 10, summary: "Organización básica para no perder tiempo ni clientes.", videoUrl: null },
      { id: "l8-5", moduleId: "m8", order: 5, title: "Promociones y captación de clientes", type: "VIDEO", durationSec: 440, xpReward: 10, summary: "Primeras estrategias simples para conseguir tus primeros clientes.", videoUrl: null },
      { id: "l8-6", moduleId: "m8", order: 6, title: "Organización básica del negocio", type: "TEXT", durationSec: 360, xpReward: 10, summary: "Lo esencial para ordenar tus primeros pasos como profesional.", videoUrl: null },
    ],
  },
];

// Next.js compiles each route into its own server bundle. Without this,
// admin feedback written via lib/store.ts's setTaskFeedback() (which
// mutates a task object in place) would only be visible from whichever
// bundle happened to run that mutation, not from the student-facing
// /dashboard/tareas bundle reading the "same" array. globalThis keeps one
// shared array instance for the whole process instead.
const globalForTasks = globalThis as unknown as { __barberAcademyTasks?: CourseTask[] };

const TASKS_SEED: CourseTask[] = [
  { id: "t1-1", moduleId: "m1", title: "Cuestionario: herramientas y bioseguridad", description: "Repasá los conceptos clave de higiene y herramientas del Módulo 1.", objective: "Confirmar que entendés los protocolos básicos de bioseguridad.", type: "QUIZ", xpReward: 100, status: "COMPLETED", dueDate: null, feedback: null },
  { id: "t1-2", moduleId: "m1", title: "Armá tu kit de barbero", description: "Hacé una lista de tu kit actual (o el que planeás conseguir) y marcá qué te falta.", objective: "Tener claridad sobre el equipamiento inicial necesario.", type: "SELF_ASSESSMENT", xpReward: 50, status: "COMPLETED", dueDate: null, feedback: "Buen punto de partida. Priorizá máquina y tijera de calidad antes que accesorios." },
  { id: "t2-1", moduleId: "m2", title: "Secciones y guías en modelo", description: "Practicá el seccionado completo de una cabeza y definí tus guías principales.", objective: "Dominar el seccionado como base de cualquier corte.", type: "PRACTICAL", xpReward: 50, status: "COMPLETED", dueDate: null, feedback: null },
  { id: "t2-2", moduleId: "m2", title: "Cuestionario: fundamentos del corte", description: "Evaluación sobre secciones, guías y uso de herramientas.", objective: "Verificar comprensión de los fundamentos técnicos.", type: "QUIZ", xpReward: 100, status: "COMPLETED", dueDate: null, feedback: null },
  { id: "t3-1", moduleId: "m3", title: "Realizá tu primer Mid Fade", description: "Aplicá lo aprendido en un modelo real o de práctica y subí evidencia del resultado.", objective: "Ejecutar un degradado medio con transición limpia.", type: "VIDEO_UPLOAD", xpReward: 250, status: "IN_PROGRESS", dueDate: null, feedback: null },
  { id: "t3-2", moduleId: "m3", title: "Cuestionario: tipos de fade", description: "Diferenciá low, mid, high y skin fade según sus características.", objective: "Consolidar la teoría detrás de cada variante de degradado.", type: "QUIZ", xpReward: 100, status: "PENDING", dueDate: null, feedback: null },
  { id: "t4-1", moduleId: "m4", title: "Subí tu corte clásico", description: "Fotografiá un corte clásico terminado, con buena luz y ángulos claros.", objective: "Demostrar dominio de un corte clásico completo.", type: "PHOTO_UPLOAD", xpReward: 50, status: "PENDING", dueDate: null, feedback: null },
  { id: "t4-2", moduleId: "m4", title: "Cuestionario: cortes y texturizado", description: "Evaluación sobre técnicas de texturizado y adaptación capilar.", objective: "Verificar comprensión de manejo de volumen y textura.", type: "QUIZ", xpReward: 100, status: "PENDING", dueDate: null, feedback: null },
  { id: "t5-1", moduleId: "m5", title: "Diseño de barba completo", description: "Registrá en video un diseño de barba de principio a fin.", objective: "Aplicar perfilado, máquina y navaja en un solo servicio.", type: "VIDEO_UPLOAD", xpReward: 250, status: "PENDING", dueDate: null, feedback: null },
  { id: "t5-2", moduleId: "m5", title: "Cuestionario: técnica de barba", description: "Repaso de preparación, perfilado y uso de navaja.", objective: "Confirmar los fundamentos de seguridad y técnica con navaja.", type: "QUIZ", xpReward: 100, status: "PENDING", dueDate: null, feedback: null },
  { id: "t6-1", moduleId: "m6", title: "Práctica guiada: servicio completo", description: "Repetí el servicio completo mostrado en la práctica guiada.", objective: "Integrar corte y terminación en un solo flujo de trabajo.", type: "PRACTICAL", xpReward: 50, status: "PENDING", dueDate: null, feedback: null },
  { id: "t6-2", moduleId: "m6", title: "Autoevaluación de técnica", description: "Completá el checklist de autoevaluación sobre tu propio trabajo.", objective: "Desarrollar criterio propio para detectar errores.", type: "SELF_ASSESSMENT", xpReward: 50, status: "PENDING", dueDate: null, feedback: null },
  { id: "t6-3", moduleId: "m6", title: "Corrección de errores", description: "Identificá un error propio reciente y explicá cómo lo corregirías.", objective: "Reforzar el pensamiento crítico sobre la propia técnica.", type: "QUESTION", xpReward: 50, status: "PENDING", dueDate: null, feedback: null },
  { id: "t7-1", moduleId: "m7", title: "Simulá una consulta previa", description: "Escribí cómo abordarías la consulta previa con un cliente nuevo.", objective: "Practicar las preguntas clave antes de cortar.", type: "QUESTION", xpReward: 50, status: "PENDING", dueDate: null, feedback: null },
  { id: "t7-2", moduleId: "m7", title: "Fotografiá y publicá un trabajo", description: "Aplicá lo visto sobre fotografía para mostrar uno de tus trabajos.", objective: "Practicar la presentación profesional de tu trabajo.", type: "PHOTO_UPLOAD", xpReward: 50, status: "PENDING", dueDate: null, feedback: null },
  { id: "t8-1", moduleId: "m8", title: "Tu plan de proyecto", description: "Respondé: ¿qué necesitás, dónde vas a trabajar y qué precios manejarías al empezar?", objective: "Bosquejar tu propio proyecto de barbería.", type: "QUESTION", xpReward: 50, status: "PENDING", dueDate: null, feedback: null },
  { id: "t8-2", moduleId: "m8", title: "Evaluación final del curso", description: "Cuestionario integrador de todos los módulos.", objective: "Confirmar que estás preparado para completar la formación.", type: "QUIZ", xpReward: 500, status: "PENDING", dueDate: null, feedback: null },
];

export const TASKS: CourseTask[] = globalForTasks.__barberAcademyTasks ?? (globalForTasks.__barberAcademyTasks = TASKS_SEED);

export function getModuleById(id: string) {
  return MODULES.find((m) => m.id === id) ?? null;
}

export function getLessonById(id: string) {
  for (const m of MODULES) {
    const lesson = m.lessons.find((l) => l.id === id);
    if (lesson) return { lesson, module: m };
  }
  return null;
}

export function getTasksForModule(moduleId: string) {
  return TASKS.filter((t) => t.moduleId === moduleId);
}

export function getModuleTotalLessons(moduleId: string) {
  return getModuleById(moduleId)?.lessons.length ?? 0;
}
