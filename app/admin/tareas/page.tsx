import type { Metadata } from "next";
import { TASKS, MODULES } from "@/lib/data/course-content";
import { TaskReviewCard } from "@/components/admin/task-review-card";

export const metadata: Metadata = { title: "Tareas" };

export default function AdminTareasPage() {
  const moduleTitleByTaskId = new Map<string, string>();
  for (const m of MODULES) for (const taskId of m.taskIds) moduleTitleByTaskId.set(taskId, m.title);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Tareas</h1>
        <p className="mt-1 text-sm text-bone-500">
          Revisá entregas y dejá feedback. El feedback guardado acá se refleja en tiempo real en
          /dashboard/tareas del alumno (en esta demo, en memoria del servidor).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {TASKS.map((task) => (
          <TaskReviewCard key={task.id} task={task} moduleTitle={moduleTitleByTaskId.get(task.id) ?? ""} />
        ))}
      </div>
    </div>
  );
}
