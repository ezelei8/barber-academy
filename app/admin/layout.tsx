import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminMobileTopbar } from "@/components/admin/mobile-topbar";
import { XPToastProvider } from "@/components/dashboard/xp-toast-provider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "ADMIN" && session.user.role !== "INSTRUCTOR") {
    redirect("/dashboard");
  }

  return (
    <XPToastProvider>
      <div className="min-h-screen bg-carbon-950">
        <AdminSidebar />
        <AdminMobileTopbar />
        <div className="lg:pl-64">
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            {children}
          </main>
        </div>
      </div>
    </XPToastProvider>
  );
}
