import type { Metadata } from "next";
import { Users, UserCheck, TrendingUp, Layers, ClipboardList, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_ADMIN_STATS } from "@/lib/data/demo-student";

export const metadata: Metadata = { title: "Panel de administración" };

export default function AdminDashboardPage() {
  const stats = DEMO_ADMIN_STATS;

  const cards = [
    { icon: Users, label: "Total de alumnos", value: stats.totalStudents },
    { icon: UserCheck, label: "Alumnos activos (7 días)", value: stats.activeStudents },
    { icon: TrendingUp, label: "Progreso promedio", value: `${stats.avgProgress}%` },
    { icon: Layers, label: "Módulos completados", value: stats.modulesCompletedTotal },
    { icon: ClipboardList, label: "Tareas por revisar", value: stats.pendingReviews },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Panel de administración</h1>
        <p className="mt-1 text-sm text-bone-500">Datos de ejemplo — se reemplazan por métricas reales al conectar la base de datos.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-4">
              <c.icon className="h-4 w-4 text-gold-400" />
              <p className="mt-2 text-2xl font-semibold text-bone-100">{c.value}</p>
              <p className="text-[11px] leading-tight text-bone-600">{c.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-gold-400" />
            <h2 className="text-sm font-semibold text-bone-100">Actividad reciente</h2>
          </div>
          <ul className="mt-4 divide-y divide-carbon-800">
            {stats.recentActivity.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="text-bone-300">
                  <strong className="font-medium text-bone-100">{a.studentName}</strong> {a.action}
                </span>
                <span className="flex-none text-xs text-bone-600">{a.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
