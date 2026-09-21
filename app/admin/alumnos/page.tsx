import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listStudents } from "@/lib/auth-users";
import { ApproveStudentButton } from "@/components/admin/approve-student-button";

export const metadata: Metadata = { title: "Alumnos" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-UY", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminAlumnosPage() {
  const students = listStudents();
  const pendingCount = students.filter((s) => s.enrollmentStatus === "PENDING_PAYMENT").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Alumnos</h1>
        <p className="mt-1 text-sm text-bone-500">
          {students.length} {students.length === 1 ? "alumno registrado" : "alumnos registrados"}
          {pendingCount > 0 && (
            <>
              {" · "}
              <span className="text-gold-400">{pendingCount} con pago pendiente de aprobar</span>
            </>
          )}
        </p>
      </div>

      <div className="rounded-xl border border-carbon-700 bg-carbon-900/50 p-4 text-xs leading-relaxed text-bone-500">
        El pago se coordina por fuera de la plataforma (transferencia, efectivo, WhatsApp, etc.).
        Cuando un alumno se registra queda en <strong className="text-bone-300">Pago pendiente</strong> y
        no ve el contenido del curso. Apretá <strong className="text-bone-300">Aprobar pago</strong> recién
        cuando confirmes que pagó — ahí se le habilita el acceso al toque, sin que tenga que volver a
        loguearse.
      </div>

      {students.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-sm text-bone-600">
            Todavía no se registró ningún alumno.
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop table */}
          <Card className="hidden overflow-hidden sm:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-carbon-700 bg-carbon-900/60 text-xs uppercase tracking-wide text-bone-600">
                <tr>
                  <th className="px-5 py-3 font-medium">Alumno</th>
                  <th className="px-5 py-3 font-medium">Registrado</th>
                  <th className="px-5 py-3 font-medium">Estado</th>
                  <th className="px-5 py-3 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-carbon-800">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-carbon-900/40">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-bone-100">{s.name}</p>
                      <p className="text-xs text-bone-600">{s.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-bone-600">{formatDate(s.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      {s.enrollmentStatus === "ACTIVE" ? (
                        <Badge variant="success">Activo</Badge>
                      ) : (
                        <Badge variant="warning">Pago pendiente</Badge>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <ApproveStudentButton studentId={s.id} status={s.enrollmentStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Mobile cards */}
          <div className="flex flex-col gap-3 sm:hidden">
            {students.map((s) => (
              <Card key={s.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-bone-100">{s.name}</p>
                      <p className="text-xs text-bone-600">{s.email}</p>
                    </div>
                    {s.enrollmentStatus === "ACTIVE" ? (
                      <Badge variant="success">Activo</Badge>
                    ) : (
                      <Badge variant="warning">Pendiente</Badge>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-bone-600">Registrado {formatDate(s.createdAt)}</span>
                    <ApproveStudentButton studentId={s.id} status={s.enrollmentStatus} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
