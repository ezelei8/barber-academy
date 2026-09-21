"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button variant="danger" onClick={() => signOut({ callbackUrl: "/" })} className="w-full sm:w-auto">
      <LogOut className="h-4 w-4" />
      Cerrar sesión
    </Button>
  );
}
