import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCurrentStudent } from "@/lib/get-current-student";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { MobileBottomNav } from "@/components/dashboard/mobile-nav";
import { MobileTopbar } from "@/components/dashboard/mobile-topbar";
import { XPToastProvider } from "@/components/dashboard/xp-toast-provider";
import { PendingPaymentScreen } from "@/components/dashboard/pending-payment-screen";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");

  const student = await getCurrentStudent();

  // El pago se coordina fuera de la plataforma — hasta que un admin lo
  // aprueba desde /admin/alumnos, el alumno ve esta pantalla en vez del
  // dashboard (cubre todas las subrutas de /dashboard/* porque es el layout
  // compartido). El staff (ADMIN/INSTRUCTOR) nunca queda bloqueado acá.
  if (student.role === "STUDENT" && student.enrollmentStatus === "PENDING_PAYMENT") {
    return <PendingPaymentScreen student={student} />;
  }

  return (
    <XPToastProvider>
      <div className="min-h-screen bg-carbon-950">
        <DashboardSidebar student={student} />
        <MobileTopbar student={student} />
        <div className="lg:pl-64">
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
            {children}
          </main>
        </div>
        <MobileBottomNav />
      </div>
    </XPToastProvider>
  );
}
