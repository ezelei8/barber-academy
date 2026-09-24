import type { Metadata } from "next";
import { Mail, Shield, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrentStudent } from "@/lib/get-current-student";
import { getLevelProgress } from "@/lib/data/gamification-config";
import { formatNumber } from "@/lib/utils";
import { LogoutButton } from "@/components/dashboard/logout-button";

export const metadata: Metadata = { title: "Perfil" };

const ROLE_LABEL: Record<string, string> = {
  STUDENT: "Alumno",
  INSTRUCTOR: "Instructor",
  ADMIN: "Administrador",
};

export default async function PerfilPage() {
  const student = await getCurrentStudent();
  const levelProgress = getLevelProgress(student.currentXP);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Perfil</h1>
        <p className="mt-1 text-sm text-bone-500">Tu información y estado dentro de la academia.</p>
      </div>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-carbon-800 text-lg font-semibold text-bone-200">
            {student.avatarInitials}
          </div>
          <div>
            <p className="text-lg font-semibold text-bone-100">{student.name}</p>
            <p className="text-sm text-bone-500">{student.email}</p>
            <Badge variant="gold" className="mt-2">{ROLE_LABEL[student.role]}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Mail className="h-4 w-4 text-bone-600" />
            <div>
              <p className="text-xs text-bone-600">Email</p>
              <p className="text-sm text-bone-200">{student.email}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Shield className="h-4 w-4 text-bone-600" />
            <div>
              <p className="text-xs text-bone-600">Nivel actual</p>
              <p className="text-sm text-bone-200">{levelProgress.current.name}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Calendar className="h-4 w-4 text-bone-600" />
            <div>
              <p className="text-xs text-bone-600">XP total</p>
              <p className="text-sm text-bone-200">{formatNumber(student.currentXP)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold text-bone-200">Datos de la cuenta</h2>
          <p className="mt-2 text-xs leading-relaxed text-bone-600">
            La edición de perfil (foto, teléfono, país, cambio de contraseña) se conecta al
            modelo <code className="text-bone-400">Profile</code> una vez la base de datos esté
            activa — ver README.
          </p>
        </CardContent>
      </Card>

      <LogoutButton />
    </div>
  );
}
