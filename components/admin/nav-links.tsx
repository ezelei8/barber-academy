import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  PlayCircle,
  ClipboardList,
  Target,
  Trophy,
  Bot,
} from "lucide-react";

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/alumnos", label: "Alumnos", icon: Users },
  { href: "/admin/cursos", label: "Cursos", icon: BookOpen },
  { href: "/admin/modulos", label: "Módulos", icon: Layers },
  { href: "/admin/lecciones", label: "Lecciones", icon: PlayCircle },
  { href: "/admin/tareas", label: "Tareas", icon: ClipboardList },
  { href: "/admin/misiones", label: "Misiones", icon: Target },
  { href: "/admin/logros", label: "Logros", icon: Trophy },
  { href: "/admin/barber-ai", label: "Barber AI", icon: Bot },
];
