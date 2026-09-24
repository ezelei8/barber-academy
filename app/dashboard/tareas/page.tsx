import type { Metadata } from "next";
import { getCurrentStudent } from "@/lib/get-current-student";
import { getTaskCounts } from "@/lib/gamification";
import { getTaskFeedbackMap } from "@/lib/store";
import { MODULES, TASKS } from "@/lib/data/course-content";
import { TaskCard } from "@/components/dashboard/task-card";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Mis tareas" };

export default async function TareasPage() {
  const student = await getCurrentStudent();
  const counts = getTaskCounts(student);
  const feedbackMap = await getTaskFeedbackMap(student.id);

  const moduleTitleByTaskId = new Map<string, string>();
  for (const m of MODULES) for (const taskId of m.taskIds) moduleTitleByTaskId.set(taskId, m.title);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Mis tareas</h1>
        <p className="mt-1 text-sm text-bone-500">
          Cuestionarios, ejercicios y entregas de cada módulo.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-semibold text-bone-100">{counts.completed}</p><p className="text-[11px] text-bone-600">Completadas</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-semibold text-bone-100">{counts.pending}</p><p className="text-[11px] text-bone-600">Pendientes</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-semibold text-bone-100">{counts.total}</p><p className="text-[11px] text-bone-600">Total</p></CardContent></Card>
      </div>

      <div className="flex flex-col gap-3">
        {TASKS.map((task) => (
          <TaskCard
            key={task.id}
            task={{ ...task, feedback: feedbackMap[task.id] ?? task.feedback }}
            completed={student.completedTaskIds.includes(task.id)}
            moduleTitle={moduleTitleByTaskId.get(task.id) ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
